import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const envPath = path.resolve(".env.local");

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing ${filePath}`);
  }

  const parsed = {};
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

function requireEnv(env, key) {
  if (!env[key]) {
    throw new Error(`Missing ${key} in .env.local`);
  }
  return env[key];
}

function normalizeRemotePath(remoteDir, fileName) {
  const normalizedDir = remoteDir.replaceAll("\\", "/").replace(/\/+$/g, "");
  const cleanDir = normalizedDir.replace(/^\/+/g, "");
  return {
    publicPath: `${cleanDir}/${fileName}`,
    uploadPath: `${normalizedDir.startsWith("/") ? "/" : ""}${cleanDir}/${fileName}`,
  };
}

function normalizeFtpHost(host) {
  if (!host.includes("://")) {
    return host.replace(/\/+$/g, "").split("/")[0].split(":")[0];
  }

  const url = new URL(host);
  return url.hostname;
}

function normalizePublicUrl(baseUrl, remotePath) {
  const normalizedBaseUrl = baseUrl.includes("://") ? baseUrl : `https://${baseUrl}`;
  const url = new URL(normalizedBaseUrl);
  const pathParts = remotePath.split("/").filter(Boolean);
  const publicHtmlIndex = pathParts.lastIndexOf("public_html");
  if (publicHtmlIndex >= 0) {
    pathParts.splice(0, publicHtmlIndex + 1);
  }
  url.pathname = `/${pathParts.map(encodeURIComponent).join("/")}`;
  return url.toString();
}

async function run() {
  const localFile = process.argv[2];
  if (!localFile) {
    throw new Error("Usage: node scripts/upload-social-asset.mjs <local-file>");
  }

  const absoluteFile = path.resolve(localFile);
  if (!existsSync(absoluteFile)) {
    throw new Error(`File not found: ${absoluteFile}`);
  }

  const env = { ...process.env, ...loadDotEnv(envPath) };
  const host = normalizeFtpHost(requireEnv(env, "FTP_HOST"));
  const user = requireEnv(env, "FTP_USER");
  const password = requireEnv(env, "FTP_PASSWORD");
  const appUrl = requireEnv(env, "APP_URL");
  const port = env.FTP_PORT || "21";
  const remoteDir = env.FTP_REMOTE_DIR || "public_html/social";
  const fileName = path.basename(absoluteFile);
  const remotePath = normalizeRemotePath(remoteDir, fileName);
  const ftpUrl = `ftp://${host}:${port}/${remotePath.uploadPath}`;

  await new Promise((resolve, reject) => {
    const child = spawn(
      "curl.exe",
      ["--fail", "--ftp-create-dirs", "--upload-file", absoluteFile, "--user", `${user}:${password}`, ftpUrl],
      { stdio: ["ignore", "ignore", "pipe"] },
    );

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`FTP upload failed with code ${code}: ${stderr.trim()}`));
    });
  });

  console.log(normalizePublicUrl(appUrl, remotePath.publicPath));
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
