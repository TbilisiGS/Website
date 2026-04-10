const { createHash } = require("crypto");

const parseAllowedOrigins = () =>
  (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

const buildHeaders = (origin, allowedOrigins) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
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

const parseBody = (event) => {
  const rawBody = event.body || "";
  const contentType = (event.headers["content-type"] || event.headers["Content-Type"] || "").toLowerCase();

  if (!rawBody) return {};

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody);
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(rawBody);
    return Object.fromEntries(params.entries());
  }

  return JSON.parse(rawBody);
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

  if (allowedOrigins.length && origin && !allowedOrigins.includes(origin)) {
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
    const language = sanitizeText(payload.language, 20) || "en";

    if (honeypot) {
      return jsonResponse(200, { ok: true }, origin, allowedOrigins);
    }

    if (!name || !business || !contact || !message) {
      return jsonResponse(400, { ok: false, error: "Missing required fields." }, origin, allowedOrigins);
    }

    const forwardedFor =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["client-ip"] ||
      event.headers["x-forwarded-for"] ||
      "";
    const ip = forwardedFor.split(",")[0].trim();
    const userAgent = sanitizeText(event.headers["user-agent"] || "", 500);
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex") : null;

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
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
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
    return jsonResponse(500, { ok: false, error: "Unexpected server error." }, origin, allowedOrigins);
  }
};
