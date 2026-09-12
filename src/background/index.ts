/**
 * MV3 service worker: anonymous Premium11 heartbeat + uninstall farewell.
 */
const PRODUCT = "idont-care-tweets";
const ENDPOINT = "https://www.premium11.com/api/heartbeat";
// Public client identifier sent as X-Heartbeat-Key; it ships in every build.
const HEARTBEAT_KEY = "0xathm93deqzsbw6u1folgj7kric4ynv";
const THROTTLE_MS = 24 * 60 * 60 * 1000;
const INSTALL_ID_KEY = "idcaytInstallId";
const LAST_AT_KEY = "idcaytLastHeartbeatAt";
const FAREWELL_BASE = "https://www.premium11.com/goodbye/idont-care-tweets";

async function ensureInstallId(): Promise<string> {
  const cur = await chrome.storage.local.get(INSTALL_ID_KEY);
  const existing = cur[INSTALL_ID_KEY];
  if (typeof existing === "string" && existing.length >= 32) return existing;
  const id = crypto.randomUUID();
  await chrome.storage.local.set({ [INSTALL_ID_KEY]: id });
  return id;
}

function resolveExtVersion(): string {
  try {
    return chrome.runtime.getManifest()?.version ?? "unknown";
  } catch {
    return "unknown";
  }
}

function resolveLocale(): string {
  try {
    return chrome.i18n?.getUILanguage?.() ?? "und";
  } catch {
    return "und";
  }
}

function resolveTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (typeof tz === "string" && tz.length > 0 && tz.length <= 64) return tz;
    return "unknown";
  } catch {
    return "unknown";
  }
}

async function resolveInstallChannel(): Promise<string> {
  try {
    const selfInfo = await chrome.management?.getSelf?.();
    const t = selfInfo?.installType;
    if (t === "development") return "unpacked";
    if (t === "normal") return "store";
    if (t === "sideload") return "sideload";
    if (t === "admin") return "admin";
    return "unknown";
  } catch {
    return "unknown";
  }
}

async function sendAnonymousHeartbeat(event: "install" | "update" | "ping"): Promise<void> {
  try {
    const now = Date.now();
    if (event === "ping") {
      const cur = await chrome.storage.local.get(LAST_AT_KEY);
      const last = cur[LAST_AT_KEY];
      if (typeof last === "number" && now - last < THROTTLE_MS) return;
    }

    const body = {
      v: 1,
      product: PRODUCT,
      event,
      extVersion: resolveExtVersion(),
      installId: await ensureInstallId(),
      installChannel: await resolveInstallChannel(),
      locale: resolveLocale(),
      timezone: resolveTimezone(),
      ts: now
    };

    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Heartbeat-Key": HEARTBEAT_KEY
      },
      body: JSON.stringify(body),
      keepalive: true
    });

    if (!response.ok) return;
    let throttled = false;
    try {
      const data = (await response.json()) as { throttled?: boolean };
      throttled = data.throttled === true;
    } catch {
      /* ignore */
    }
    if (throttled) return;
    if (event === "ping") {
      await chrome.storage.local.set({ [LAST_AT_KEY]: now });
    }
  } catch {
    /* never block */
  }
}

async function registerUninstallFarewellUrl(): Promise<void> {
  try {
    if (!chrome.runtime?.setUninstallURL) return;
    const installId = await ensureInstallId();
    const url = new URL(FAREWELL_BASE);
    url.searchParams.set("id", installId);
    url.searchParams.set("v", resolveExtVersion());
    await chrome.runtime.setUninstallURL(url.toString());
  } catch {
    /* never block */
  }
}

void registerUninstallFarewellUrl();

chrome.runtime.onStartup?.addListener?.(() => {
  void registerUninstallFarewellUrl();
});

chrome.runtime.onInstalled.addListener((details) => {
  void registerUninstallFarewellUrl();
  if (details.reason === "install") void sendAnonymousHeartbeat("install");
  else if (details.reason === "update") void sendAnonymousHeartbeat("update");
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "HEARTBEAT_PING") {
    void sendAnonymousHeartbeat("ping");
    sendResponse({ ok: true });
    return false;
  }
  return false;
});
