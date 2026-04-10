(() => {
  const STATUS_VALUES = ["new", "contacted", "qualified", "won", "lost"];
  const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const elements = {
    status: document.getElementById("status"),
    authPanel: document.getElementById("auth-panel"),
    dashboard: document.getElementById("dashboard"),
    loginForm: document.getElementById("login-form"),
    loginButton: document.getElementById("login-button"),
    refreshButton: document.getElementById("refresh-button"),
    signoutButton: document.getElementById("signout-button"),
    searchInput: document.getElementById("search-input"),
    statusFilter: document.getElementById("status-filter"),
    leadSummary: document.getElementById("lead-summary"),
    leadList: document.getElementById("lead-list"),
    metricTotal: document.getElementById("metric-total"),
    metricNew: document.getElementById("metric-new"),
    metricQualified: document.getElementById("metric-qualified"),
    metricFollowUp: document.getElementById("metric-follow-up")
  };

  let supabaseClient = null;
  let leads = [];

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return map[char] || char;
    });

  const nl2br = (value) => escapeHtml(value).replace(/\n/g, "<br>");

  const setStatus = (message, tone = "info") => {
    if (!message) {
      elements.status.hidden = true;
      elements.status.textContent = "";
      elements.status.className = "status";
      return;
    }

    elements.status.hidden = false;
    elements.status.textContent = message;
    elements.status.className = `status is-${tone}`;
  };

  const setView = (view) => {
    const isDashboard = view === "dashboard";
    elements.authPanel.hidden = isDashboard;
    elements.dashboard.hidden = !isDashboard;
  };

  const setButtonBusy = (button, isBusy, busyLabel) => {
    if (!button) return;
    if (!button.dataset.defaultLabel) {
      button.dataset.defaultLabel = button.textContent.trim();
    }

    button.disabled = isBusy;
    button.textContent = isBusy ? busyLabel : button.dataset.defaultLabel;
  };

  const formatDate = (value) => {
    if (!value) return "Not set";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return DATE_FORMATTER.format(parsed);
  };

  const toDateTimeLocalValue = (value) => {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "";

    const pad = (number) => String(number).padStart(2, "0");
    return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
  };

  const getFilteredLeads = () => {
    const query = (elements.searchInput.value || "").trim().toLowerCase();
    const status = elements.statusFilter.value || "all";

    return leads.filter((lead) => {
      const matchesStatus = status === "all" || lead.status === status;
      if (!matchesStatus) return false;

      if (!query) return true;

      return [
        lead.name,
        lead.business,
        lead.contact,
        lead.service,
        lead.message,
        lead.notes,
        lead.source_page,
        lead.page_language
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  };

  const renderMetrics = () => {
    const now = Date.now();
    const dueFollowUps = leads.filter((lead) => {
      if (!lead.follow_up_at) return false;
      const parsed = new Date(lead.follow_up_at);
      if (Number.isNaN(parsed.getTime())) return false;
      return parsed.getTime() <= now && !["won", "lost"].includes(lead.status);
    }).length;

    elements.metricTotal.textContent = String(leads.length);
    elements.metricNew.textContent = String(leads.filter((lead) => lead.status === "new").length);
    elements.metricQualified.textContent = String(leads.filter((lead) => lead.status === "qualified").length);
    elements.metricFollowUp.textContent = String(dueFollowUps);
  };

  const renderLeadList = () => {
    renderMetrics();

    const filteredLeads = getFilteredLeads();
    elements.leadSummary.textContent = `${filteredLeads.length} of ${leads.length} lead${leads.length === 1 ? "" : "s"} visible.`;

    if (!filteredLeads.length) {
      elements.leadList.innerHTML = '<div class="panel empty-state">No leads match the current search or filter.</div>';
      return;
    }

    elements.leadList.innerHTML = filteredLeads
      .map((lead) => {
        const statusOptions = STATUS_VALUES.map(
          (status) =>
            `<option value="${status}"${lead.status === status ? " selected" : ""}>${status[0].toUpperCase()}${status.slice(1)}</option>`
        ).join("");

        return `
          <article class="lead-card panel" data-id="${lead.id}">
            <div class="lead-header">
              <div class="lead-title">
                <span class="eyebrow">${escapeHtml(lead.source_page || "Website form")}</span>
                <strong>${escapeHtml(lead.name || "Unnamed lead")}</strong>
                <span>${escapeHtml(lead.business || "No business name")}</span>
              </div>
              <span class="status-pill">${escapeHtml(lead.status || "new")}</span>
            </div>

            <dl class="lead-meta">
              <div>
                <dt>Contact</dt>
                <dd>${escapeHtml(lead.contact || "Not provided")}</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>${escapeHtml(lead.service || "Not specified")}</dd>
              </div>
              <div>
                <dt>Submitted</dt>
                <dd>${escapeHtml(formatDate(lead.submitted_at))}</dd>
              </div>
            </dl>

            <div class="lead-message">
              <p>${nl2br(lead.message || "")}</p>
            </div>

            <div class="editor-grid">
              <label>
                <span>Status</span>
                <select class="lead-status">${statusOptions}</select>
              </label>

              <label>
                <span>Follow-up</span>
                <input class="lead-follow-up" type="datetime-local" value="${escapeHtml(toDateTimeLocalValue(lead.follow_up_at))}">
              </label>

              <label>
                <span>Notes</span>
                <textarea class="lead-notes" placeholder="Add internal notes">${escapeHtml(lead.notes || "")}</textarea>
              </label>
            </div>

            <div class="lead-actions">
              <span class="save-state">Language: ${escapeHtml(lead.page_language || "n/a")}</span>
              <button class="button" type="button" data-action="save">Save changes</button>
            </div>
          </article>
        `;
      })
      .join("");
  };

  const loadLeads = async () => {
    const { data, error } = await supabaseClient
      .from("contact_submissions")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      throw error;
    }

    leads = Array.isArray(data) ? data : [];
    renderLeadList();
  };

  const ensureAdmin = async (session) => {
    const email = session?.user?.email ? session.user.email.trim().toLowerCase() : "";
    if (!email) return false;

    const { data, error } = await supabaseClient
      .from("crm_admins")
      .select("email")
      .ilike("email", email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return Boolean(data);
  };

  const syncFromSession = async () => {
    const {
      data: { session },
      error
    } = await supabaseClient.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session) {
      leads = [];
      renderLeadList();
      setView("auth");
      setStatus("Sign in to view the CRM.");
      return;
    }

    const allowed = await ensureAdmin(session);
    if (!allowed) {
      await supabaseClient.auth.signOut();
      setView("auth");
      setStatus("This email is authenticated, but it is not listed in crm_admins.", "error");
      return;
    }

    setView("dashboard");
    setStatus(`Signed in as ${session.user.email}.`, "success");
    await loadLeads();
  };

  const boot = async () => {
    const response = await fetch("/api/admin-config", {
      headers: {
        Accept: "application/json"
      }
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "Admin configuration could not be loaded.");
    }

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      throw new Error("Supabase browser client failed to load.");
    }

    supabaseClient = window.supabase.createClient(payload.supabaseUrl, payload.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    supabaseClient.auth.onAuthStateChange(() => {
      void syncFromSession().catch((error) => {
        console.error(error);
        setStatus(error.message || "Unable to refresh the CRM session.", "error");
      });
    });

    await syncFromSession();
  };

  elements.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setButtonBusy(elements.loginButton, true, "Signing in...");
    setStatus("");

    const formData = new FormData(elements.loginForm);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }

      elements.loginForm.reset();
      await syncFromSession();
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Sign-in failed.", "error");
    } finally {
      setButtonBusy(elements.loginButton, false, "Signing in...");
    }
  });

  elements.refreshButton.addEventListener("click", async () => {
    setButtonBusy(elements.refreshButton, true, "Refreshing...");

    try {
      await loadLeads();
      setStatus("Lead list refreshed.", "success");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Unable to refresh leads.", "error");
    } finally {
      setButtonBusy(elements.refreshButton, false, "Refreshing...");
    }
  });

  elements.signoutButton.addEventListener("click", async () => {
    setButtonBusy(elements.signoutButton, true, "Signing out...");

    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw error;
      }

      setView("auth");
      setStatus("Signed out.");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Unable to sign out.", "error");
    } finally {
      setButtonBusy(elements.signoutButton, false, "Signing out...");
    }
  });

  elements.searchInput.addEventListener("input", renderLeadList);
  elements.statusFilter.addEventListener("change", renderLeadList);

  elements.leadList.addEventListener("click", async (event) => {
    const button = event.target.closest('[data-action="save"]');
    if (!button) return;

    const card = button.closest("[data-id]");
    if (!card) return;

    const leadId = Number(card.dataset.id);
    const status = card.querySelector(".lead-status").value;
    const notes = card.querySelector(".lead-notes").value.trim();
    const followUpInput = card.querySelector(".lead-follow-up").value.trim();
    const followUpAt = followUpInput ? new Date(followUpInput) : null;

    if (followUpInput && Number.isNaN(followUpAt.getTime())) {
      setStatus("Follow-up date is invalid.", "error");
      return;
    }

    setButtonBusy(button, true, "Saving...");
    const saveState = card.querySelector(".save-state");
    saveState.textContent = "Saving changes...";

    try {
      const updates = {
        status,
        notes: notes || null,
        follow_up_at: followUpAt ? followUpAt.toISOString() : null
      };

      const { error } = await supabaseClient
        .from("contact_submissions")
        .update(updates)
        .eq("id", leadId);

      if (error) {
        throw error;
      }

      leads = leads.map((lead) => (lead.id === leadId ? { ...lead, ...updates } : lead));
      renderLeadList();
      setStatus("Lead updated.", "success");
    } catch (error) {
      console.error(error);
      saveState.textContent = "Save failed.";
      setStatus(error.message || "Unable to save lead changes.", "error");
    } finally {
      setButtonBusy(button, false, "Saving...");
    }
  });

  void boot().catch((error) => {
    console.error(error);
    setView("auth");
    setStatus(error.message || "CRM failed to load.", "error");
  });
})();