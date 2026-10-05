import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/plugin/launcher.ts
import { spawn } from "node:child_process";
import { mkdirSync as mkdirSync2, openSync, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { createInterface } from "node:readline";
import path3 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// src/server/runtime.ts
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
var pluginBundle = true;
var here = path.dirname(fileURLToPath(import.meta.url));
var appRoot = pluginBundle ? here : path.resolve(here, "..", "..");
var staticRoot = path.join(appRoot, pluginBundle ? "public" : "dist");
var projectRoot = path.resolve(process.env.KGS_ROOT ?? (pluginBundle ? path.join(os.homedir(), ".kallob-growth") : path.join(appRoot, "dev")));
var port = Number(process.env.PORT ?? (pluginBundle ? 8795 : 8790));
var production = pluginBundle || process.env.KGS_MODE === "production";
var buildId = true ? "f900ed0-muvk1odi" : "source";
var cloudApiOrigin = new URL(process.env.KALLOB_CLOUD_API_ORIGIN ?? "https://api.kallob.net").origin;

// src/plugin/app-versions.ts
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import path2 from "node:path";
var appHome = (dataRoot) => path2.join(dataRoot, "app");
function packageHome(dataRoot, pkg) {
  if (pkg === void 0) return appHome(dataRoot);
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(pkg)) throw new Error(`Not a mini-app package id: ${pkg}`);
  return path2.join(appHome(dataRoot), "mini-apps", pkg);
}
var versionsDirectory = (dataRoot, pkg) => path2.join(packageHome(dataRoot, pkg), "versions");
var versionDirectory = (dataRoot, version, pkg) => path2.join(versionsDirectory(dataRoot, pkg), version);
var pointerFile = (dataRoot, pkg) => path2.join(packageHome(dataRoot, pkg), "current.json");
var VERSION = /^\d+\.\d+\.\d+$/;
function compareVersions(a, b) {
  const left = a.split(".").map(Number);
  const right = b.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    const difference = (left[index] ?? 0) - (right[index] ?? 0);
    if (difference) return Math.sign(difference);
  }
  return 0;
}
function readVersionInfo(directory) {
  try {
    const info = JSON.parse(readFileSync(path2.join(directory, "VERSION.json"), "utf8"));
    if (!VERSION.test(info.version) || typeof info.buildId !== "string" || !info.buildId) return null;
    if (!existsSync(path2.join(directory, "server.mjs"))) return null;
    return info;
  } catch {
    return null;
  }
}
function readCurrent(dataRoot, pkg) {
  try {
    const pointer = JSON.parse(readFileSync(pointerFile(dataRoot, pkg), "utf8"));
    if (!VERSION.test(pointer.current)) return null;
    return { current: pointer.current, previous: pointer.previous && VERSION.test(pointer.previous) ? pointer.previous : null };
  } catch {
    return null;
  }
}
function writeCurrent(dataRoot, pointer, pkg) {
  mkdirSync(packageHome(dataRoot, pkg), { recursive: true });
  const temporary = `${pointerFile(dataRoot, pkg)}.${process.pid}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(pointer, null, 2)}
`);
  renameSync(temporary, pointerFile(dataRoot, pkg));
}
function currentApp(dataRoot, pkg) {
  const pointer = readCurrent(dataRoot, pkg);
  if (!pointer) return null;
  const directory = versionDirectory(dataRoot, pointer.current, pkg);
  const info = readVersionInfo(directory);
  return info && info.version === pointer.current ? { version: info.version, directory, info } : null;
}
function installFromDirectory(dataRoot, source, pkg) {
  const info = readVersionInfo(source);
  if (!info) throw new Error(`${source} is not a built Growth Studio (VERSION.json and server.mjs are required)`);
  const target = versionDirectory(dataRoot, info.version, pkg);
  const existing = readVersionInfo(target);
  if (existing?.buildId === info.buildId) return { version: info.version, directory: target, info: existing };
  mkdirSync(versionsDirectory(dataRoot, pkg), { recursive: true });
  const staging = `${target}.${process.pid}-${Date.now().toString(36)}.staging`;
  cpSync(source, staging, { recursive: true, filter: (from) => path2.basename(from) !== ".DS_Store" });
  if (existing) {
    const replaced = `${target}.${process.pid}-${Date.now().toString(36)}.replaced`;
    renameSync(target, replaced);
    renameSync(staging, target);
    rmSync(replaced, { recursive: true, force: true });
  } else {
    try {
      renameSync(staging, target);
    } catch (error) {
      rmSync(staging, { recursive: true, force: true });
      if (readVersionInfo(target)?.buildId !== info.buildId) throw error;
    }
  }
  return { version: info.version, directory: target, info };
}
function resolveApp(dataRoot, seedDirectory, pkg) {
  const installed = currentApp(dataRoot, pkg);
  const seed = seedDirectory ? readVersionInfo(seedDirectory) : null;
  const adoptSeed = seed && (!installed || compareVersions(seed.version, installed.version) > 0 || seed.version === installed.version && seed.buildId !== installed.info.buildId);
  if (adoptSeed) {
    const app = installFromDirectory(dataRoot, seedDirectory, pkg);
    const pointer = readCurrent(dataRoot, pkg);
    writeCurrent(dataRoot, { current: app.version, previous: pointer && pointer.current !== app.version ? pointer.current : pointer?.previous ?? null }, pkg);
    if (pkg === void 0 && pointer && pointer.current !== app.version) writeUpdateNotice(dataRoot, { from: pointer.current, to: app.version });
    pruneVersions(dataRoot, pkg);
    return app;
  }
  if (installed) return installed;
  throw new Error("Growth Studio is not installed: the plugin has no seed app and nothing is installed yet");
}
var noticeFile = (dataRoot) => path2.join(appHome(dataRoot), "update-notice.json");
function addUpdateNotice(dataRoot, items) {
  if (!items.length) return;
  const merged = new Map((readUpdateNotice(dataRoot)?.items ?? []).map((item) => [item.id, item]));
  for (const item of items) {
    const known = merged.get(item.id);
    merged.set(item.id, known ? { id: item.id, from: known.from, to: item.to } : item);
  }
  mkdirSync(appHome(dataRoot), { recursive: true });
  writeFileSync(noticeFile(dataRoot), `${JSON.stringify({ items: [...merged.values()], at: (/* @__PURE__ */ new Date()).toISOString() }, null, 2)}
`);
}
function writeUpdateNotice(dataRoot, notice) {
  addUpdateNotice(dataRoot, [{ id: "core", from: notice.from, to: notice.to }]);
}
function readUpdateNotice(dataRoot) {
  try {
    const raw = JSON.parse(readFileSync(noticeFile(dataRoot), "utf8"));
    const items = Array.isArray(raw.items) ? raw.items : raw.from && raw.to ? [{ id: "core", from: raw.from, to: raw.to }] : [];
    const valid = items.filter((item) => typeof item?.id === "string" && VERSION.test(item.to) && (item.from === null || VERSION.test(item.from)));
    return valid.length ? { items: valid, at: raw.at ?? (/* @__PURE__ */ new Date()).toISOString() } : null;
  } catch {
    return null;
  }
}
function pruneVersions(dataRoot, pkg) {
  const pointer = readCurrent(dataRoot, pkg);
  if (!pointer) return;
  const keep = new Set([pointer.current, pointer.previous].filter(Boolean));
  let entries = [];
  try {
    entries = readdirSync(versionsDirectory(dataRoot, pkg));
  } catch {
    return;
  }
  const now = Date.now();
  for (const entry of entries) {
    if (keep.has(entry)) continue;
    const full = path2.join(versionsDirectory(dataRoot, pkg), entry);
    if (VERSION.test(entry)) {
      if (compareVersions(entry, pointer.current) < 0) rmSync(full, { recursive: true, force: true });
      continue;
    }
    try {
      if (now - statSync(full).mtimeMs > 10 * 6e4) rmSync(full, { recursive: true, force: true });
    } catch {
    }
  }
}

// src/server/kallob-cloud/client.ts
var PENDING_TTL_MS = 10 * 60 * 1e3;
var REFRESH_MARGIN_MS = 30 * 1e3;

// src/server/kallob-cloud/codex-tools.ts
var LAUNCHER_HEADER = "x-kallob-growth-launcher";

// src/plugin/cloud-tools.ts
var readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
var cloudTools = [
  {
    name: "growth_catalog",
    title: "Growth Catalog",
    description: "List Kallob Growth applications, engine packs and engines (no guide bodies) with the person's access: `access` is free or paid, `available` says whether they may use the item now. Also returns reference document versions and the shared kernel prompt templates.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: readOnly
  },
  {
    name: "growth_engine_get",
    title: "Growth Engine Guide",
    description: "Read the full current guide of one Kallob Growth engine (markdown, parsed sections and version) with its pack context and the reference contracts an engine run needs. Fails when the person's plan does not include the engine.",
    inputSchema: {
      type: "object",
      properties: { engine_id: { type: "string", pattern: "^[a-z0-9][a-z0-9-]*/[a-z0-9][a-z0-9-]*$", description: "Engine id like pack/02-slug." } },
      required: ["engine_id"],
      additionalProperties: false
    },
    annotations: readOnly
  },
  {
    name: "growth_application_get",
    title: "Growth Application",
    description: "Read one Kallob Growth application with its bound engines and its method prompt templates. Fails when the person's plan does not include the application.",
    inputSchema: {
      type: "object",
      properties: { application_key: { type: "string", pattern: "^[a-z0-9][a-z0-9-]*$", description: "Application key." } },
      required: ["application_key"],
      additionalProperties: false
    },
    annotations: readOnly
  }
];
var cloudToolNames = new Set(cloudTools.map((tool) => tool.name));
var NOT_CONNECTED_HINT = 'Kallob engines need a Kallob connection. Call growth_studio_open with view "settings", open the url, and ask the person to click Connect Kallob; then try again.';
function toMcpResult(status, body) {
  const toolResult = status >= 200 && status < 300 && body && typeof body === "object" ? body.toolResult : void 0;
  if (toolResult && typeof toolResult.text === "string") {
    return { content: [{ type: "text", text: toolResult.text }], ...toolResult.structured === void 0 ? {} : { structuredContent: toolResult.structured } };
  }
  if (status >= 200 && status < 300) {
    return { content: [{ type: "text", text: JSON.stringify(body) }], structuredContent: body };
  }
  const error = body && typeof body === "object" ? body : {};
  const message = error.code === "not_connected" ? `${error.error ?? "Kallob is not connected."} ${NOT_CONNECTED_HINT}` : error.error ?? `Growth Studio answered ${status}.`;
  return { isError: true, content: [{ type: "text", text: message }] };
}

// src/plugin/launcher.ts
var SERVER_NAME = "kallob-growth";
var origin = `http://127.0.0.1:${port}`;
var stateDir = path3.join(projectRoot, ".growth-studio");
var pidFile = path3.join(stateDir, "server.pid");
var VIEWS = ["overview", "work", "results", "mini-apps", "engines", "knowledge", "settings"];
var MINI_APPS = ["offers", "image-studio", "brand-profile", "research", "quick-content", "quick-visual", "personal-brand", "crm", "zalo-chatbot"];
var MINI_APP_ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
function targetApp() {
  const here2 = path3.dirname(fileURLToPath2(import.meta.url));
  if (!pluginBundle) return { serverEntry: path3.join(here2, "server.mjs"), buildId };
  const app = resolveApp(projectRoot, here2);
  return { serverEntry: path3.join(app.directory, "server.mjs"), buildId: app.info.buildId };
}
var isCurrent = (running, target) => Boolean(running && running.buildId === target.buildId && running.apiOrigin === cloudApiOrigin);
async function health() {
  try {
    const response = await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(1500) });
    if (!response.ok) return null;
    const body = await response.json();
    return body.app === "Kallob Growth Studio" ? body : null;
  } catch {
    return null;
  }
}
function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
async function stopOutdated(running) {
  const pid = running.pid ?? Number(readFileSafe(pidFile));
  if (!pid || !alive(pid)) return;
  process.kill(pid, "SIGTERM");
  for (let attempt = 0; attempt < 50 && alive(pid); attempt += 1) await delay(100);
}
function readFileSafe(file) {
  try {
    return readFileSync2(file, "utf8").trim();
  } catch {
    return "";
  }
}
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var starting = null;
async function ensureServer() {
  if (starting) return starting;
  starting = (async () => {
    const target = targetApp();
    const running = await health();
    if (running && isCurrent(running, target)) return noteServer(running);
    if (running) await stopOutdated(running);
    mkdirSync2(stateDir, { recursive: true });
    const log = openSync(path3.join(stateDir, "server.log"), "a");
    const child = spawn(process.execPath, [target.serverEntry], {
      cwd: projectRoot,
      env: { ...process.env, KGS_ROOT: projectRoot, PORT: String(port) },
      detached: true,
      // Windows: no console window flashes up for the background server.
      windowsHide: true,
      stdio: ["ignore", log, log]
    });
    child.unref();
    if (child.pid) writeFileSync2(pidFile, String(child.pid));
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const ready = await health();
      if (ready && isCurrent(ready, target)) return noteServer(ready);
      await delay(150);
    }
    throw new Error(`Growth Studio did not start; see ${path3.join(stateDir, "server.log")}`);
  })().finally(() => {
    starting = null;
  });
  return starting;
}
var servedBuild = null;
function noteServer(server) {
  if (server.buildId && servedBuild && servedBuild !== server.buildId) send({ jsonrpc: "2.0", method: "notifications/tools/list_changed" });
  if (server.buildId) servedBuild = server.buildId;
  return server;
}
async function studioTools() {
  try {
    await ensureServer();
    const response = await fetch(`${origin}/api/plugin/tools`, { headers: { [LAUNCHER_HEADER]: "1" }, signal: AbortSignal.timeout(3e3) });
    if (response.ok) {
      const body = await response.json();
      if (Array.isArray(body.tools)) return body.tools.filter((tool) => Boolean(tool && typeof tool.name === "string"));
    }
  } catch {
  }
  return cloudTools;
}
async function listTools() {
  const own = tools.filter((tool) => !cloudToolNames.has(tool.name));
  const served = (await studioTools()).filter((tool) => !own.some((local) => local.name === tool.name));
  return [...own, ...served];
}
async function callStudioTool(name, args, meta) {
  await ensureServer();
  const response = await fetch(`${origin}/api/plugin/tools/${encodeURIComponent(name)}`, {
    method: "POST",
    headers: { "content-type": "application/json", [LAUNCHER_HEADER]: "1" },
    body: JSON.stringify({ arguments: args, threadId: callingThreadId(meta) }),
    signal: AbortSignal.timeout(6e4)
  });
  if (response.status === 404 && cloudToolNames.has(name)) return callCloudTool(name, args);
  return toMcpResult(response.status, await response.json().catch(() => ({})));
}
var tools = [
  {
    name: "growth_studio_open",
    title: "Open Kallob Growth Studio",
    description: "Start Kallob Growth Studio on this machine if it is not running and return the URL to open in the in-app browser. Use when the person wants to see or work in Growth Studio (work, results, mini-apps such as Offers, Image Studio, Brand Profile or Research Studio, the engine library, settings). After calling, open the returned url in the in-app browser.",
    inputSchema: {
      type: "object",
      properties: {
        view: { type: "string", enum: [...VIEWS], description: "Page to open; defaults to overview." },
        mini_app: { type: "string", pattern: MINI_APP_ID.source, description: `Opens that mini-app directly (its id, e.g. ${MINI_APPS.join(", ")}); view is then ignored.` }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false }
  },
  {
    name: "growth_studio_status",
    title: "Kallob Growth Studio status",
    description: "Report whether Growth Studio is running on this machine, where its data lives, and whether it is connected to Kallob Cloud.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
  },
  {
    name: "growth_task_ask",
    title: "Ask the founder in Growth Studio",
    description: "While working on a Growth Studio task, ask the founder something you need to go on (a missing fact, a decision, an approval, a sign-in or a real-world step). Studio shows the question on the task; the answer arrives as the next message in this conversation. After calling, end your turn and do nothing else until the answer arrives. Use the task id from the task prompt.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string", description: "Growth Studio task id from the task prompt." },
        question: { type: "string", description: "One concise question, in the founder's language." },
        choices: { type: "array", items: { type: "string" }, maxItems: 4, description: "Up to four short answers to pick from, when they help." },
        kind: { type: "string", enum: ["question", "action"], description: '"action" when the founder must do something outside Studio (sign in, approve, a real-world step).' }
      },
      required: ["task_id", "question"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
  },
  ...cloudTools
];
async function studioPost(pathname, body) {
  return fetch(`${origin}${pathname}`, {
    method: "POST",
    headers: { "content-type": "application/json", [LAUNCHER_HEADER]: "1" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15e3)
  });
}
function callingThreadId(meta) {
  const value = meta?.threadId ?? meta?.sessionId;
  return typeof value === "string" && value ? value : null;
}
async function callCloudTool(name, args) {
  await ensureServer();
  const response = await fetch(`${origin}/api/kallob-cloud/tools/${name}`, {
    method: "POST",
    headers: { "content-type": "application/json", [LAUNCHER_HEADER]: "1" },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(3e4)
  });
  return toMcpResult(response.status, await response.json().catch(() => ({})));
}
async function callTool(name, args, meta) {
  if (name === "growth_task_ask") {
    await ensureServer();
    const taskId = String(args.task_id ?? "").trim();
    if (!taskId) return { isError: true, content: [{ type: "text", text: "task_id is required." }] };
    const response = await studioPost(`/api/tasks/${encodeURIComponent(taskId)}/question`, { question: args.question, choices: args.choices, kind: args.kind });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) return { isError: true, content: [{ type: "text", text: `${body.error ?? `Growth Studio answered ${response.status}.`} Ask the founder in this conversation instead.` }] };
    return { content: [{ type: "text", text: "The question is shown to the founder in Growth Studio. End your turn now and do nothing else; the answer will arrive as the next message." }] };
  }
  if (name === "growth_studio_open") {
    const server = await ensureServer();
    const threadId = callingThreadId(meta);
    if (threadId) await studioPost("/api/codex/origin", { threadId }).catch(() => void 0);
    const url = new URL(origin);
    const miniApp = MINI_APP_ID.test(String(args.mini_app ?? "")) ? String(args.mini_app) : null;
    const view = typeof args.view === "string" && VIEWS.includes(args.view) ? args.view : "overview";
    if (miniApp) url.pathname = `/mini-apps/${miniApp}`;
    else if (view === "mini-apps") url.pathname = "/mini-apps";
    else url.searchParams.set("view", view);
    const result = { url: url.toString(), dataRoot: projectRoot, buildId: server.buildId };
    return { content: [{ type: "text", text: `Growth Studio is running. Open ${result.url} in the in-app browser.` }], structuredContent: result };
  }
  if (name === "growth_studio_status") {
    const running = await health();
    let cloud = null;
    if (running) {
      try {
        cloud = await (await fetch(`${origin}/api/kallob-cloud/status`, { signal: AbortSignal.timeout(3e3) })).json();
      } catch {
        cloud = null;
      }
    }
    let target = null;
    try {
      target = targetApp();
    } catch {
      target = null;
    }
    const result = { running: Boolean(running), current: Boolean(target && isCurrent(running, target)), version: running?.version ?? null, url: origin, cloudApiOrigin, dataRoot: projectRoot, kallobCloud: cloud };
    return { content: [{ type: "text", text: JSON.stringify(result) }], structuredContent: result };
  }
  return callStudioTool(name, args, meta);
}
function send(message) {
  process.stdout.write(`${JSON.stringify(message)}
`);
}
async function handle(request) {
  const { id, method, params } = request;
  if (method === "initialize") {
    void ensureServer().catch(() => void 0);
    return send({ jsonrpc: "2.0", id, result: { protocolVersion: params?.protocolVersion ?? "2025-06-18", capabilities: { tools: { listChanged: true } }, serverInfo: { name: SERVER_NAME, version: buildId } } });
  }
  if (method === "tools/list") return send({ jsonrpc: "2.0", id, result: { tools: await listTools() } });
  if (method === "tools/call") {
    try {
      const result = await callTool(String(params?.name ?? ""), params?.arguments ?? {}, params?._meta);
      return send({ jsonrpc: "2.0", id, result });
    } catch (error) {
      return send({ jsonrpc: "2.0", id, result: { isError: true, content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }] } });
    }
  }
  if (method === "ping") return send({ jsonrpc: "2.0", id, result: {} });
  if (id !== void 0 && method && !method.startsWith("notifications/")) {
    send({ jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } });
  }
}
createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    return;
  }
  void handle(request);
});
