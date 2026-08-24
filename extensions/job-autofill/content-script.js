(function () {
  const DEFAULT_SETTINGS = {
    enabled: true,
    autoFillOnLoad: true,
    sourceUrl: "http://localhost:2666",
  };

  const STORAGE_KEYS = {
    settings: "aionsite-job-autofill-settings",
    profile: "aionsite-job-autofill-profile",
    profileUpdatedAt: "aionsite-job-autofill-profile-updated-at",
  };

  const SITE_LABEL = "AionSite Autofill";
  const FIELD_WAIT_MS = 12000;
  const RETRY_DELAY_MS = 450;

  let autoFillRunning = false;
  let autoFillDone = false;
  let observer = null;
  let stopTimer = null;
  let retryTimer = null;

  function normalizeText(value) {
    return String(value ?? "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function isVisible(element) {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      element.offsetParent !== null
    );
  }

  function splitName(fullName) {
    const cleaned = String(fullName ?? "").trim();
    if (!cleaned) {
      return { firstName: "", lastName: "" };
    }

    const parts = cleaned.split(/\s+/);
    return {
      firstName: parts[0] ?? cleaned,
      lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
    };
  }

  function makeToast() {
    let toast = document.getElementById("aionsite-autofill-toast");
    if (toast) {
      return toast;
    }

    toast = document.createElement("div");
    toast.id = "aionsite-autofill-toast";
    toast.style.position = "fixed";
    toast.style.top = "16px";
    toast.style.right = "16px";
    toast.style.zIndex = "2147483647";
    toast.style.maxWidth = "340px";
    toast.style.padding = "12px 14px";
    toast.style.borderRadius = "16px";
    toast.style.background = "rgba(2, 6, 23, 0.96)";
    toast.style.border = "1px solid rgba(96, 165, 250, 0.35)";
    toast.style.color = "#e2e8f0";
    toast.style.boxShadow = "0 24px 48px -28px rgba(15, 23, 42, 0.9)";
    toast.style.font = "12px/1.5 system-ui, sans-serif";
    toast.style.whiteSpace = "pre-wrap";
    toast.style.pointerEvents = "none";
    document.documentElement.appendChild(toast);
    return toast;
  }

  function showToast(message) {
    const toast = makeToast();
    toast.textContent = `${SITE_LABEL}\n${message}`;
    toast.style.opacity = "1";
    clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.style.opacity = "0";
    }, 4500);
  }

  async function getSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
        resolve({
          ...DEFAULT_SETTINGS,
          ...stored,
        });
      });
    });
  }

  async function getCachedProfile() {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        [STORAGE_KEYS.profile, STORAGE_KEYS.profileUpdatedAt],
        (stored) => {
          resolve({
            profile: stored[STORAGE_KEYS.profile] ?? null,
            updatedAt: stored[STORAGE_KEYS.profileUpdatedAt] ?? null,
          });
        },
      );
    });
  }

  async function setCachedProfile(profile) {
    return new Promise((resolve) => {
      chrome.storage.local.set(
        {
          [STORAGE_KEYS.profile]: profile,
          [STORAGE_KEYS.profileUpdatedAt]: new Date().toISOString(),
        },
        resolve,
      );
    });
  }

  async function fetchProfile(sourceUrl) {
    const baseUrl = String(sourceUrl ?? "").replace(/\/$/, "");
    if (!baseUrl) {
      throw new Error("missing_source");
    }

    const response = await fetch(`${baseUrl}/api/admin/jobs/content`, {
      cache: "no-store",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error("fetch_failed");
    }

    const payload = await response.json();
    return payload?.profile ?? null;
  }

  async function syncProfileFromSource() {
    const settings = await getSettings();
    const profile = await fetchProfile(settings.sourceUrl);
    if (!profile) {
      throw new Error("missing_profile");
    }

    await setCachedProfile(profile);
    return profile;
  }

  function getLabelText(element) {
    const id = element.getAttribute("id");
    if (id) {
      const labels = document.querySelectorAll(`label[for="${CSS.escape(id)}"]`);
      for (const label of labels) {
        return label.textContent ?? "";
      }
    }

    const parentLabel = element.closest("label");
    if (parentLabel) {
      return parentLabel.textContent ?? "";
    }

    const ariaLabelledBy = element.getAttribute("aria-labelledby");
    if (ariaLabelledBy) {
      return ariaLabelledBy
        .split(/\s+/)
        .map((ref) => document.getElementById(ref)?.textContent ?? "")
        .join(" ");
    }

    return "";
  }

  function getCandidateText(element) {
    const attrs = [
      element.getAttribute("aria-label"),
      element.getAttribute("placeholder"),
      element.getAttribute("name"),
      element.getAttribute("id"),
      element.getAttribute("autocomplete"),
      element.getAttribute("data-testid"),
      element.getAttribute("data-test"),
      element.getAttribute("data-automation-id"),
      element.getAttribute("data-qa"),
      element.getAttribute("role"),
    ]
      .filter(Boolean)
      .join(" ");

    const label = getLabelText(element);
    return normalizeText([attrs, label].filter(Boolean).join(" "));
  }

  function setNativeValue(element, value) {
    const prototype = Object.getPrototypeOf(element);
    const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    const prototypePrototype = Object.getPrototypeOf(prototype);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototypePrototype,
      "value",
    )?.set;

    const setter = valueSetter ?? prototypeValueSetter;
    if (setter) {
      setter.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setNativeChecked(element, checked) {
    const prototype = Object.getPrototypeOf(element);
    const checkedSetter = Object.getOwnPropertyDescriptor(prototype, "checked")?.set;
    const prototypePrototype = Object.getPrototypeOf(prototype);
    const prototypeCheckedSetter = Object.getOwnPropertyDescriptor(
      prototypePrototype,
      "checked",
    )?.set;

    const setter = checkedSetter ?? prototypeCheckedSetter;
    if (setter) {
      setter.call(element, checked);
    } else {
      element.checked = checked;
    }

    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function truthyAnswer(value) {
    const normalized = normalizeText(value);
    if (!normalized) {
      return null;
    }

    if (
      normalized.includes("no") ||
      normalized.includes("not ") ||
      normalized.startsWith("no") ||
      normalized.includes("does not") ||
      normalized.includes("dont") ||
      normalized.includes("don't") ||
      normalized.includes("ning")
    ) {
      return false;
    }

    if (
      normalized.includes("yes") ||
      normalized.includes("si") ||
      normalized.includes("sí") ||
      normalized.includes("true") ||
      normalized.includes("authorized") ||
      normalized.includes("authorized to work")
    ) {
      return true;
    }

    return null;
  }

  function pickValue(text, profile) {
    const { firstName, lastName } = splitName(profile?.name);
    const checks = [
      { keys: ["first name", "firstname", "given name", "forename"], value: firstName },
      { keys: ["last name", "lastname", "surname", "family name"], value: lastName },
      { keys: ["full name", "your name", "legal name", "name"], value: profile?.name ?? "" },
      { keys: ["email", "e-mail"], value: profile?.email ?? "" },
      { keys: ["phone", "telephone", "mobile", "cell"], value: profile?.phone ?? "" },
      { keys: ["linkedin", "linked in", "linkedin url"], value: profile?.linkedin ?? "" },
      { keys: ["location", "city", "country", "where are you located"], value: profile?.location ?? profile?.country ?? "" },
      { keys: ["visa", "sponsorship", "work authorization", "work authorisation", "authorized to work"], value: profile?.visaSponsorship ?? "" },
      { keys: ["salary", "compensation", "pay expectation", "desired salary", "salary expectation"], value: profile?.salaryExpectation ?? "" },
      { keys: ["experience", "years of experience", "total experience"], value: profile?.experience ?? "" },
      { keys: ["about", "bio", "summary", "tell us about yourself"], value: profile?.about ?? "" },
      { keys: ["stack", "skills", "tech stack"], value: profile?.stackSummary ?? "" },
    ];

    for (const rule of checks) {
      if (rule.keys.some((key) => text.includes(key)) && rule.value) {
        return rule.value;
      }
    }

    return "";
  }

  function fillSelect(element, profile) {
    const text = getCandidateText(element);
    const directValue = pickValue(text, profile);
    const possibleValues = [directValue];

    if (!normalizeText(directValue) && text.includes("country")) {
      possibleValues.push(profile?.country ?? "");
    }

    if (!normalizeText(directValue) && text.includes("location")) {
      possibleValues.push(profile?.location ?? "");
      possibleValues.push(profile?.country ?? "");
    }

    const options = Array.from(element.options ?? []);
    for (const rawValue of possibleValues) {
      const normalizedValue = normalizeText(rawValue);
      if (!normalizedValue) {
        continue;
      }

      const matchingOption = options.find((option) => {
        const optionText = normalizeText(`${option.textContent ?? ""} ${option.value}`);
        return (
          optionText === normalizedValue ||
          optionText.includes(normalizedValue) ||
          normalizedValue.includes(optionText)
        );
      });

      if (matchingOption) {
        setNativeValue(element, matchingOption.value);
        return true;
      }
    }

    return false;
  }

  function fillBooleanLikeControl(element, profile) {
    const text = getCandidateText(element);
    if (
      !text.includes("visa") &&
      !text.includes("sponsorship") &&
      !text.includes("work authorization") &&
      !text.includes("work authorisation") &&
      !text.includes("authorized to work") &&
      !text.includes("eligibility to work")
    ) {
      return false;
    }

    const answer = truthyAnswer(profile?.visaSponsorship ?? "");
    if (answer === null) {
      return false;
    }

    const label = normalizeText(
      `${getLabelText(element)} ${element.getAttribute("value") ?? ""}`,
    );

    if (answer === true && /yes|true|eligible|authorized|can work/.test(label)) {
      setNativeChecked(element, true);
      return true;
    }

    if (answer === false && /no|false|not|cannot|can't|dont|don't/.test(label)) {
      setNativeChecked(element, true);
      return true;
    }

    return false;
  }

  function fillControl(element, profile) {
    if (!element || !isVisible(element) || element.disabled || element.readOnly) {
      return false;
    }

    if (element.matches('input[type="hidden"], input[type="submit"], input[type="button"], input[type="file"], input[type="password"], button')) {
      return false;
    }

    if (
      element.matches('input[type="checkbox"], input[type="radio"]') &&
      fillBooleanLikeControl(element, profile)
    ) {
      return true;
    }

    if (element.matches('input, textarea') && element.value && String(element.value).trim()) {
      return false;
    }

    if (element.matches('[contenteditable="true"]') && String(element.textContent ?? "").trim()) {
      return false;
    }

    const candidateText = getCandidateText(element);
    const value = pickValue(candidateText, profile);
    if (!value) {
      return false;
    }

    if (element.tagName === "SELECT") {
      return fillSelect(element, profile);
    }

    if (element.matches('[contenteditable="true"]')) {
      element.textContent = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }

    if (element.matches('input[type="checkbox"], input[type="radio"]')) {
      return false;
    }

    setNativeValue(element, value);
    return true;
  }

  function collectControls() {
    return Array.from(
      document.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]',
      ),
    ).filter((element) => isVisible(element));
  }

  function looksLikeApplicationPage() {
    const host = normalizeText(window.location.hostname);
    const path = normalizeText(`${window.location.pathname} ${window.location.search}`);
    const knownHost =
      host.includes("greenhouse") ||
      host.includes("ashby") ||
      host.includes("wellfound") ||
      host.includes("himalayas") ||
      host.includes("lever") ||
      host.includes("workable") ||
      host.includes("smartrecruiters") ||
      host.includes("workday") ||
      host.includes("icims") ||
      host.includes("linkedin") ||
      host.includes("indeed") ||
      host.includes("computrabajo");

    if (knownHost) {
      return true;
    }

    if (/apply|careers|career|jobs|job|hiring|vacancy|employment/.test(path)) {
      return true;
    }

    const controls = collectControls().slice(0, 24);
    let signals = 0;

    for (const control of controls) {
      const text = getCandidateText(control);
      if (
        text.includes("email") ||
        text.includes("name") ||
        text.includes("phone") ||
        text.includes("location") ||
        text.includes("country") ||
        text.includes("first name") ||
        text.includes("last name") ||
        text.includes("visa") ||
        text.includes("sponsorship")
      ) {
        signals += 1;
      }
    }

    return signals >= 2;
  }

  function fillPage(profile) {
    const controls = collectControls();
    let filledCount = 0;

    for (const control of controls) {
      if (fillControl(control, profile)) {
        filledCount += 1;
      }
    }

    return filledCount;
  }

  function stopWatcher() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (stopTimer) {
      window.clearTimeout(stopTimer);
      stopTimer = null;
    }

    if (retryTimer) {
      window.clearTimeout(retryTimer);
      retryTimer = null;
    }
  }

  function watchForFields(profile, resolve) {
    const tryFill = () => {
      if (autoFillDone) {
        resolve({ filled: 0, status: "already-filled" });
        return true;
      }

      const filled = fillPage(profile);
      if (filled > 0) {
        autoFillDone = true;
        showToast(`Autofill aplicado: ${filled} campos.`);
        resolve({ filled, status: "filled" });
        return true;
      }

      return false;
    };

    const schedule = () => {
      if (retryTimer || autoFillDone) {
        return;
      }

      retryTimer = window.setTimeout(() => {
        retryTimer = null;
        tryFill();
      }, RETRY_DELAY_MS);
    };

    observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    stopTimer = window.setTimeout(() => {
      stopWatcher();
      resolve({ filled: 0, status: "no-fields" });
    }, FIELD_WAIT_MS);

    if (tryFill()) {
      stopWatcher();
      return;
    }
  }

  async function runAutofill({ force = false } = {}) {
    if (autoFillRunning) {
      return { filled: 0, status: "busy" };
    }

    autoFillRunning = true;

    try {
      const settings = await getSettings();
      if (!settings.enabled) {
        return { filled: 0, status: "disabled" };
      }

      if (autoFillDone && !force) {
        return { filled: 0, status: "already-filled" };
      }

      if (!force && !looksLikeApplicationPage()) {
        return { filled: 0, status: "not-application" };
      }

      let profile = (await getCachedProfile()).profile;
      if (!profile) {
        try {
          profile = await syncProfileFromSource();
        } catch {
          profile = null;
        }
      }

      if (!profile) {
        showToast("No encontré perfil guardado. Sincroniza desde AionSite.");
        return { filled: 0, status: "missing-profile" };
      }

      return await new Promise((resolve) => {
        watchForFields(profile, resolve);
      });
    } finally {
      autoFillRunning = false;
      stopWatcher();
    }
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "AIONSITE_JOB_AUTOFILL_RUN") {
      void runAutofill({ force: Boolean(message.force) }).then(sendResponse);
      return true;
    }

    if (message?.type === "AIONSITE_JOB_AUTOFILL_SYNC") {
      void (async () => {
        try {
          const profile = await syncProfileFromSource();
          sendResponse({ ok: true, profile });
        } catch (error) {
          sendResponse({
            ok: false,
            error: error instanceof Error ? error.message : "sync_failed",
          });
        }
      })();
      return true;
    }

    return false;
  });

  async function init() {
    const settings = await getSettings();
    if (!settings.enabled || !settings.autoFillOnLoad) {
      return;
    }

    void runAutofill().catch(() => {
      // No bloquea la página si falla el intento automático.
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      void init();
    });
  } else {
    void init();
  }
})();
