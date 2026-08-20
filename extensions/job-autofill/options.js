const DEFAULT_SETTINGS = {
  enabled: true,
  autoFillOnLoad: true,
  sourceUrl: "http://localhost:2666",
};

const STORAGE_KEYS = {
  profile: "aionsite-job-autofill-profile",
  profileUpdatedAt: "aionsite-job-autofill-profile-updated-at",
};

const status = document.getElementById("status");
const sourceUrl = document.getElementById("sourceUrl");
const enabled = document.getElementById("enabled");
const autoFillOnLoad = document.getElementById("autoFillOnLoad");

function setStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
      resolve({ ...DEFAULT_SETTINGS, ...stored });
    });
  });
}

function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, resolve);
  });
}

function syncProfile() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
      const baseUrl = String(stored.sourceUrl ?? "").replace(/\/$/, "");
      fetch(`${baseUrl}/api/admin/jobs/content`, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("fetch_failed");
          }

          return response.json();
        })
        .then((payload) => {
          chrome.storage.local.set(
            {
              [STORAGE_KEYS.profile]: payload?.profile ?? null,
              [STORAGE_KEYS.profileUpdatedAt]: new Date().toISOString(),
            },
            () => resolve(true),
          );
        })
        .catch(() => resolve(false));
    });
  });
}

getSettings().then((settings) => {
  if (sourceUrl) sourceUrl.value = settings.sourceUrl;
  if (enabled) enabled.checked = Boolean(settings.enabled);
  if (autoFillOnLoad) autoFillOnLoad.checked = Boolean(settings.autoFillOnLoad);
});

document.getElementById("save")?.addEventListener("click", async () => {
  await saveSettings({
    sourceUrl:
      String(sourceUrl?.value ?? DEFAULT_SETTINGS.sourceUrl).trim() ||
      DEFAULT_SETTINGS.sourceUrl,
    enabled: Boolean(enabled?.checked),
    autoFillOnLoad: Boolean(autoFillOnLoad?.checked),
  });
  setStatus("Ajustes guardados.");
});

document.getElementById("sync")?.addEventListener("click", async () => {
  setStatus("Sincronizando...");
  const result = await syncProfile();
  setStatus(result ? "Perfil sincronizado." : "No se pudo sincronizar.");
});
