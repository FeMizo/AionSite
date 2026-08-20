function setStatus(message) {
  const status = document.getElementById("status");
  if (status) {
    status.textContent = message;
  }
}

function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0] ?? null);
    });
  });
}

function sendMessage(tabId, message) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      resolve(response ?? null);
    });
  });
}

document.getElementById("options")?.addEventListener("click", (event) => {
  event.preventDefault();
  chrome.runtime.openOptionsPage();
});

document.getElementById("sync")?.addEventListener("click", async () => {
  const tab = await getActiveTab();
  if (!tab?.id) {
    setStatus("No pude detectar la pestaña activa.");
    return;
  }

  setStatus("Sincronizando perfil...");
  const response = await sendMessage(tab.id, { type: "AIONSITE_JOB_AUTOFILL_SYNC" });
  if (response?.ok) {
    setStatus("Perfil sincronizado.");
  } else {
    setStatus(`Error: ${response?.error ?? "sync_failed"}`);
  }
});

document.getElementById("fill")?.addEventListener("click", async () => {
  const tab = await getActiveTab();
  if (!tab?.id) {
    setStatus("No pude detectar la pestaña activa.");
    return;
  }

  setStatus("Rellenando...");
  const response = await sendMessage(tab.id, {
    type: "AIONSITE_JOB_AUTOFILL_RUN",
    force: true,
  });

  if (response?.status === "filled") {
    setStatus(`Listo: ${response.filled} campos.`);
  } else {
    setStatus(response?.status ? `Estado: ${response.status}` : "No se pudo rellenar.");
  }
});
