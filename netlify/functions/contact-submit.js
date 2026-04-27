const { createHash } = require("crypto");

const parseAllowedOrigins = () =>
  (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => {
      try {
        return new URL(value.trim()).origin;
      } catch {
        return value.trim();
      }
    })
    .map((value) => value.trim())
    .filter(Boolean);

const RATE_LIMIT_WINDOW_MINUTES = Math.max(1, Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MINUTES) || 15);
const RATE_LIMIT_MAX_PER_IP = Math.max(1, Number(process.env.CONTACT_RATE_LIMIT_MAX_PER_IP) || 5);
const RATE_LIMIT_MAX_PER_CONTACT = Math.max(1, Number(process.env.CONTACT_RATE_LIMIT_MAX_PER_CONTACT) || 3);
const MAX_REQUEST_BYTES = 12 * 1024;

const buildSecurityHeaders = () => ({
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
});

const buildHeaders = (origin, allowedOrigins) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    ...buildSecurityHeaders()
  };

  if (origin && (!allowedOrigins.length || allowedOrigins.includes(origin))) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }

  return headers;
};

const jsonResponse = (statusCode, payload, origin, allowedOrigins) => ({
  statusCode,
  headers: buildHeaders(origin, allowedOrigins),
  body: JSON.stringify(payload)
});

const sanitizeText = (value, maxLength) =>
  typeof value === "string" ? value.replace(/\u0000/g, "").trim().slice(0, maxLength) : "";

const hasMinLength = (value, minLength) => value.length >= minLength;

const isReasonableContact = (value) => {
  if (!value) return false;

  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const digitsOnly = value.replace(/\D/g, "");
  const phoneLike = digitsOnly.length >= 7;

  return emailLike || phoneLike;
};

const parseBody = (event) => {
  const rawBody = event.body || "";
  const contentType = (event.headers["content-type"] || event.headers["Content-Type"] || "").toLowerCase();

  if (!rawBody) return {};
  if (rawBody.length > MAX_REQUEST_BYTES) {
    const error = new Error("Request body is too large.");
    error.statusCode = 413;
    throw error;
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody);
  }

  const error = new Error("Content type must be application/json.");
  error.statusCode = 415;
  throw error;
};

const buildSupabaseHeaders = () => ({
  "Content-Type": "application/json",
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
});

const queryRecentSubmissions = async (field, value, maxResults) => {
  if (!value) return [];

  const params = new URLSearchParams();
  params.set("select", "id");
  params.set(field, `eq.${value}`);
  params.set("submitted_at", `gte.${new Date(Date.now() - (RATE_LIMIT_WINDOW_MINUTES * 60 * 1000)).toISOString()}`);
  params.set("limit", String(maxResults));

  const response = await fetch(
    `${process.env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/contact_submissions?${params.toString()}`,
    {
      method: "GET",
      headers: buildSupabaseHeaders()
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase rate-limit query failed: ${errorText}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
};

exports.handler = async (event) => {
  const allowedOrigins = parseAllowedOrigins();
  const origin = event.headers.origin || event.headers.Origin || "";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: buildHeaders(origin, allowedOrigins),
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed." }, origin, allowedOrigins);
  }

  if (allowedOrigins.length && (!origin || !allowedOrigins.includes(origin))) {
    return jsonResponse(403, { ok: false, error: "Origin not allowed." }, origin, allowedOrigins);
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(500, { ok: false, error: "Storage is not configured." }, origin, allowedOrigins);
  }

  try {
    const payload = parseBody(event);
    const name = sanitizeText(payload.name, 160);
    const business = sanitizeText(payload.business, 160);
    const contact = sanitizeText(payload.contact, 160);
    const service = sanitizeText(payload.service, 160);
    const message = sanitizeText(payload.message, 4000);
    const honeypot = sanitizeText(payload.website, 200);
    const page = sanitizeText(payload.page, 120);
    const rawLanguage = sanitizeText(payload.language, 20).toLowerCase();
    const language = rawLanguage === "ka" ? "ka" : "en";

    if (honeypot) {
      return jsonResponse(200, { ok: true }, origin, allowedOrigins);
    }

    if (!name || !business || !contact || !message) {
      return jsonResponse(400, { ok: false, error: "Missing required fields." }, origin, allowedOrigins);
    }

    if (
      !hasMinLength(name, 2) ||
      !hasMinLength(business, 2) ||
      !hasMinLength(message, 5) ||
      !isReasonableContact(contact)
    ) {
      return jsonResponse(400, { ok: false, error: "Submitted fields are invalid." }, origin, allowedOrigins);
    }

    const forwardedFor =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["client-ip"] ||
      event.headers["x-forwarded-for"] ||
      "";
    const ip = forwardedFor.split(",")[0].trim();
    const userAgent = sanitizeText(event.headers["user-agent"] || "", 500);
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex") : null;

    const recentIpSubmissions = await queryRecentSubmissions("ip_hash", ipHash, RATE_LIMIT_MAX_PER_IP);
    if (recentIpSubmissions.length >= RATE_LIMIT_MAX_PER_IP) {
      return jsonResponse(429, { ok: false, error: "Too many recent submissions. Try again later." }, origin, allowedOrigins);
    }

    const recentContactSubmissions = await queryRecentSubmissions("contact", contact, RATE_LIMIT_MAX_PER_CONTACT);
    if (recentContactSubmissions.length >= RATE_LIMIT_MAX_PER_CONTACT) {
      return jsonResponse(429, { ok: false, error: "Too many recent submissions. Try again later." }, origin, allowedOrigins);
    }

    const submission = {
      name,
      business,
      contact,
      service: service || null,
      message,
      source_page: page || null,
      page_language: language || null,
      origin: origin || null,
      user_agent: userAgent || null,
      ip_hash: ipHash,
      submitted_at: new Date().toISOString()
    };

    const response = await fetch(
      `${process.env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/contact_submissions`,
      {
        method: "POST",
        headers: {
          ...buildSupabaseHeaders(),
          Prefer: "return=minimal"
        },
        body: JSON.stringify(submission)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase insert failed:", errorText);
      return jsonResponse(500, { ok: false, error: "Unable to store submission." }, origin, allowedOrigins);
    }

    return jsonResponse(200, { ok: true }, origin, allowedOrigins);
  } catch (error) {
    console.error("Contact submission failed:", error);
    if (error instanceof SyntaxError) {
      return jsonResponse(400, { ok: false, error: "Request body is invalid." }, origin, allowedOrigins);
    }

    if (error.statusCode === 413 || error.statusCode === 415) {
      return jsonResponse(error.statusCode, { ok: false, error: error.message }, origin, allowedOrigins);
    }

    return jsonResponse(500, { ok: false, error: "Unexpected server error." }, origin, allowedOrigins);
  }
};
