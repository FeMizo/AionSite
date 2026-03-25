import { cpSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const apiDir = path.join(rootDir, "app", "api");
const apiBackupDir = path.join(rootDir, "app", "__api_static_backup__");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

if (existsSync(apiBackupDir)) {
  console.error(
    "No se puede ejecutar build:static porque ya existe app/__api_static_backup__.",
  );
  process.exit(1);
}

let apiMoved = false;

try {
  if (existsSync(apiDir)) {
    cpSync(apiDir, apiBackupDir, { recursive: true });
    rmSync(apiDir, { recursive: true, force: true });
    apiMoved = true;
  }

  const result = spawnSync(npmCommand, ["run", "build"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      NEXT_STATIC_EXPORT: "true",
    },
  });

  if (result.error) {
    throw result.error;
  }

  process.exit(result.status ?? 1);
} finally {
  if (apiMoved && existsSync(apiBackupDir)) {
    cpSync(apiBackupDir, apiDir, { recursive: true });
    rmSync(apiBackupDir, { recursive: true, force: true });
  }
}
