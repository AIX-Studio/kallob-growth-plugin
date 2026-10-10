import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/websites/manifest.ts
var manifest = {
  id: "websites",
  version: "1.1.0",
  // Its Codex tasks need network in their sandbox (the bridge's `network` option, core 2.5.0).
  requiresCore: ">=2.18.0 <3",
  entitlement: "websites"
};

// src/mini-apps/websites/release-notes.json
var release_notes_default = [
  {
    version: "1.1.0",
    vi: "Ph\u1EA7n m\xF4 t\u1EA3 s\u1EA3n ph\u1EA9m t\u1EEB th\u01B0 vi\u1EC7n n\u1EB1m trong prompt c\u1EE7a g\xF3i.",
    en: "The product library section lives in the package's prompts."
  },
  {
    version: "1.0.2",
    vi: "\u201CChi ti\u1EBFt h\u01A1n\u201D c\u1EE7a m\u1ED9t s\u1EA3n ph\u1EA9m gi\u1EDD m\u1EDF S\u1EA3n ph\u1EA9m & D\u1ECBch v\u1EE5 trong Mini CRM (Brand Profile kh\xF4ng c\xF2n trang n\xE0y). Th\u01B0 vi\u1EC7n s\u1EA3n ph\u1EA9m v\u1EABn l\xE0 m\u1ED9t, d\xF9ng chung.",
    en: "A product's \u201CMore detail\u201D now opens Products & Services in Mini CRM (Brand Profile no longer has that page). The product library is still the same shared one."
  },
  {
    version: "1.0.1",
    vi: "T\xEAn v\xE0 m\xF4 t\u1EA3 c\u1EE7a mini-app trong danh s\xE1ch nay do Kallob qu\u1EA3n l\xFD; c\u1EA7n Growth Studio 0.29.0.",
    en: "The mini-app's name and description in the list now come from Kallob; needs Growth Studio 0.29.0."
  },
  {
    version: "1.0.0",
    vi: "Mini-app Websites: l\xE0m landing page, mini game hay website th\u01B0\u01A1ng hi\u1EC7u tr\xEAn ChatGPT Sites b\u1EB1ng v\xE0i \xF4 \u0111i\u1EC1n, n\xF3i m\u1ED9t c\xE2u \u0111\u1EC3 s\u1EEDa, quay l\u1EA1i b\u1EA3n c\u0169, g\u1EAFn t\xEAn mi\u1EC1n ri\xEAng, v\xE0 gi\u1EEF th\u01B0 vi\u1EC7n s\u1EA3n ph\u1EA9m (t\xEAn, m\xF4 t\u1EA3, gi\xE1, \u1EA3nh th\u1EADt) d\xF9ng chung v\u1EDBi Brand Profile.",
    en: "The Websites mini-app: landing pages, mini games and brand websites on ChatGPT Sites from a few fields; change them with a sentence, roll back, connect your own domain, and keep a product library (name, description, price, real photos) shared with Brand Profile."
  }
];

// src/mini-apps/websites/server/store.ts
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var toSite = (row) => ({ ...JSON.parse(row.snapshot_json), syncedAt: row.synced_at });
var WebsitesStore = class {
  constructor(db) {
    this.db = db;
  }
  db;
  /**
   * Stores what Sites reported. A complete list (a sync) also drops the sites
   * Sites no longer has; a partial one only refreshes its own.
   */
  saveWebsiteSites(sites, complete) {
    const at = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const upsert = this.db.prepare("INSERT INTO website_sites (project_id, snapshot_json, synced_at) VALUES (?, ?, ?) ON CONFLICT(project_id) DO UPDATE SET snapshot_json = excluded.snapshot_json, synced_at = excluded.synced_at");
      for (const site of sites) upsert.run(site.projectId, JSON.stringify(site), at);
      if (complete) {
        const keep = new Set(sites.map((site) => site.projectId));
        const remove = this.db.prepare("DELETE FROM website_sites WHERE project_id = ?");
        for (const row of this.db.prepare("SELECT project_id FROM website_sites").all()) if (!keep.has(row.project_id)) remove.run(row.project_id);
      }
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.listWebsiteSites();
  }
  listWebsiteSites() {
    return this.db.prepare("SELECT snapshot_json, synced_at FROM website_sites").all().map(toSite).sort((a, b) => String(b.updatedAt ?? "").localeCompare(String(a.updatedAt ?? "")) || a.title.localeCompare(b.title));
  }
  getWebsiteSite(projectId) {
    const row = this.db.prepare("SELECT snapshot_json, synced_at FROM website_sites WHERE project_id = ?").get(projectId);
    return row ? toSite(row) : null;
  }
  /** Which library products a site shows (set when Studio builds or changes it with them). */
  linkWebsiteProducts(projectId, recordIds) {
    const insert = this.db.prepare("INSERT OR IGNORE INTO website_site_products (project_id, record_id, created_at) VALUES (?, ?, ?)");
    const at = now();
    for (const recordId of recordIds) insert.run(projectId, recordId, at);
  }
  listWebsiteProductLinks() {
    return this.db.prepare("SELECT project_id, record_id FROM website_site_products ORDER BY created_at, project_id").all().map((row) => ({ projectId: row.project_id, recordId: row.record_id }));
  }
};

// src/mini-apps/websites/server/repository.ts
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.0" };
var PRODUCT_LIBRARY = { name: "brand-profile.context", range: "^1.5" };
var WEBSITES_TASK_TYPE = "websites";
function createWebsitesRepository(sdk) {
  const store = new WebsitesStore(sdk.db);
  const websiteTask = (taskId) => {
    const task = sdk.tasks.getTask(taskId);
    return task && task.source.type === WEBSITES_TASK_TYPE ? task : null;
  };
  return Object.assign(store, {
    createTask: (input) => sdk.tasks.createTask(input),
    getTask: (id) => sdk.tasks.getTask(id),
    updateTask: (...args) => sdk.tasks.updateTask(...args),
    addEvent: (input) => sdk.events.addEvent(input),
    websiteTask,
    /** Websites' own tasks, most recently changed first. */
    websiteTasks: () => sdk.tasks.findTasks({ sourceType: WEBSITES_TASK_TYPE, limit: 500 }),
    getBrandProfile: () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range)?.profile() ?? null,
    /** Brand Profile's Products & Services, or null while no Brand Profile 1.5+ is running. */
    productLibrary: () => sdk.miniApps.use(PRODUCT_LIBRARY.name, PRODUCT_LIBRARY.range)
  });
}

// src/mini-apps/websites/server/codex.ts
function websiteReportTool(service) {
  return {
    definition: {
      name: "website_report",
      title: "Report a Websites task to Growth Studio",
      description: "For a Websites task (the founder's ChatGPT Sites): report the outcome to Growth Studio once the work is done or cannot be done, with a fresh snapshot of every Site you touched, built from Sites tool results you just read. This is the task's only return channel. Never include credentials or tokens. After a successful call, end your turn.",
      inputSchema: {
        type: "object",
        properties: {
          task_id: { type: "string", description: "Growth Studio task id from the task prompt." },
          outcome: { type: "string", enum: ["done", "failed"] },
          message: { type: "string", description: "One or two short, plain sentences for the founder, in their language: what changed and where to see it, or why it failed and what to do." },
          project_id: { type: ["string", "null"], description: "The Site this task created or changed (exact Sites project id), or null." },
          complete: { type: "boolean", description: 'True only when "sites" is every Site of the account (a sync).' },
          sites: {
            type: "array",
            maxItems: 200,
            description: "Site snapshots: {project_id, kind, slug, title, description, status, access_mode, live_url, preview_url, screenshot_url, latest_version_number, live_version_number, created_at, updated_at, domains: [{hostname, status, ssl_status, cname_target, apex_ipv4_targets, validation_records: [{type, name, value}], last_error}], versions: [{id, number, screenshot_url, created_at}] (newest first, at most 10)}.",
            items: { type: "object" }
          }
        },
        required: ["task_id", "outcome", "message", "sites"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false }
    },
    async call(args) {
      const taskId = String(args.task_id ?? "").trim();
      if (!taskId) throw new Error("task_id is required.");
      const { task_id: _taskId, ...report } = args;
      try {
        service.report(taskId, report);
        return { text: "Growth Studio has the report and shows it to the founder. End your turn now." };
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`${/[.!?]$/.test(reason) ? reason : `${reason}.`} Fix this and call website_report again.`);
      }
    }
  };
}
var websiteTaskKind = {
  type: WEBSITES_TASK_TYPE,
  deliver: (task) => `When the work is done or cannot be done, report it with the website_report tool (task_id ${JSON.stringify(task.id)}), then end your turn.`
};

// src/mini-apps/websites/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS website_sites (
        project_id TEXT PRIMARY KEY,
        snapshot_json TEXT NOT NULL,
        synced_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS website_site_products (
        project_id TEXT NOT NULL,
        record_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY (project_id, record_id)
      );
    `);
  }
};

// src/mini-apps/websites/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/websites/server/routes.ts
function createWebsitesRouter({ service, router }) {
  const handle = (status, action) => async (request, response, next) => {
    try {
      response.status(status).json(await action(request));
    } catch (error) {
      next(error);
    }
  };
  router.get("/api/websites", handle(200, () => service.overview()));
  router.get("/api/websites/kinds", handle(200, () => service.kinds()));
  router.get("/api/websites/products", handle(200, () => service.products.list()));
  router.post("/api/websites/products", handle(201, (request) => service.products.create(request.body ?? {})));
  router.patch("/api/websites/products/:id", handle(200, (request) => service.products.update(String(request.params.id), request.body ?? {})));
  router.post("/api/websites/products/:id/photos", handle(201, (request) => service.products.addPhoto(String(request.params.id), request.body ?? {})));
  router.delete("/api/websites/products/:id/photos/:assetId", handle(200, (request) => service.products.removePhoto(String(request.params.id), String(request.params.assetId))));
  router.post("/api/websites/products/:id/archive", handle(200, (request) => {
    service.products.archive(String(request.params.id), request.body?.revision);
    return { ok: true };
  }));
  router.post("/api/websites/products/:id/update-sites", handle(201, (request) => service.updateSitesWithProduct(String(request.params.id))));
  router.post("/api/websites/sync", handle(201, () => service.sync()));
  router.post("/api/websites/sites", handle(201, (request) => service.create(request.body ?? {})));
  router.get("/api/websites/sites/:projectId", handle(200, (request) => service.site(String(request.params.projectId))));
  router.get("/api/websites/sites/:projectId/screenshot", async (request, response, next) => {
    try {
      const file = await service.screenshotFile(String(request.params.projectId));
      if (!file) return void response.status(404).set("cache-control", "no-store").json({ error: "No screenshot yet" });
      response.sendFile(file.path, { dotfiles: "allow", headers: { "content-type": file.mimeType, "cache-control": "no-cache" } });
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/websites/sites/:projectId/change", handle(201, (request) => service.change(String(request.params.projectId), request.body?.request)));
  router.post("/api/websites/sites/:projectId/hosting", handle(201, (request) => service.hosting(String(request.params.projectId), request.body ?? {})));
  router.post("/api/websites/tasks/:taskId/resend", handle(200, (request) => service.resend(String(request.params.taskId))));
  return router;
}

// src/mini-apps/websites/server/service.ts
import fs from "node:fs/promises";
import path from "node:path";

// src/mini-apps/websites/server/products.ts
var MAX_PHOTOS_PER_PRODUCT = 12;
var text = (value, max, label) => {
  const result = typeof value === "string" ? value.trim() : "";
  if (result.length > max) throw new Error(`${label} must be at most ${max} characters`);
  return result;
};
var WebsiteProducts = class {
  constructor(store) {
    this.store = store;
  }
  store;
  /** The library, or an error the founder can act on when Brand Profile is not there to keep it. */
  library() {
    const library = this.store.productLibrary();
    if (!library) throw new Error("The product library lives in Brand Profile; update or turn on Brand Profile to use it");
    return library;
  }
  list() {
    const library = this.store.productLibrary();
    if (!library) return [];
    const usedBy = this.usage();
    return library.records({ kind: "offering" }).map((record) => this.toProduct(record, usedBy.get(record.id) ?? []));
  }
  get(id) {
    return this.toProduct(this.record(id), this.usage().get(id) ?? []);
  }
  create(input) {
    const name = text(input?.name, 200, "Name");
    if (!name) throw new Error("A product needs a name");
    const price = text(input?.price, 500, "Price");
    const record = this.library().createOffering({
      name,
      summary: text(input?.description, 4e3, "Description"),
      options: price ? [{ id: "", name, price, description: "" }] : []
    });
    return this.get(record.id);
  }
  /** Changes the simple fields only; everything Brand Profile adds stays as it is. */
  update(id, input) {
    const current = this.record(id);
    const name = input.name === void 0 ? current.name : text(input.name, 200, "Name");
    if (!name) throw new Error("A product needs a name");
    const summary = input.description === void 0 ? current.summary : text(input.description, 4e3, "Description");
    let options = current.options ?? [];
    if (input.price !== void 0) {
      const price = text(input.price, 500, "Price");
      options = options.length ? options.map((option, index) => index === 0 ? { ...option, price } : option) : price ? [{ id: "", name, price, description: "" }] : [];
    }
    this.library().updateOffering(id, { name, summary, options }, Number(input.revision ?? current.currentRevision));
    return this.get(id);
  }
  addPhoto(id, photo) {
    this.record(id);
    if (this.photos(id).length >= MAX_PHOTOS_PER_PRODUCT) throw new Error(`A product keeps at most ${MAX_PHOTOS_PER_PRODUCT} photos`);
    const dataBase64 = String(photo?.dataBase64 ?? "");
    if (!dataBase64 || !/^[A-Za-z0-9+/]*={0,2}$/.test(dataBase64)) throw new Error("The photo must be sent as Base64");
    this.library().createAsset({ role: "product_media", recordId: id, filename: String(photo?.name ?? "").trim().slice(0, 200) || "photo", data: Buffer.from(dataBase64, "base64") });
    return this.get(id);
  }
  removePhoto(id, assetId) {
    if (!this.photos(id).some((photo) => photo.id === assetId)) throw new Error("This photo is not on the product");
    this.library().archiveAsset(assetId);
    return this.get(id);
  }
  archive(id, revision) {
    const record = this.record(id);
    this.library().archiveOffering(id, Number(revision ?? record.currentRevision));
  }
  /** The products a site or a task uses, read fresh for a prompt. */
  pick(ids) {
    const unique = [...new Set(ids)];
    if (unique.length > 30) throw new Error("Pick at most 30 products");
    return unique.map((id) => this.get(id));
  }
  /** A photo's bytes, for handing to Codex. */
  photoData(assetId) {
    return this.store.productLibrary()?.assetData(assetId) ?? null;
  }
  record(id) {
    const record = this.library().record(id);
    if (!record || record.kind !== "offering" || record.archivedAt) throw new Error("This product is not in the library");
    return record;
  }
  photos(id) {
    return this.store.productLibrary()?.assets({ role: "product_media", recordId: id }) ?? [];
  }
  usage() {
    const usedBy = /* @__PURE__ */ new Map();
    for (const link of this.store.listWebsiteProductLinks()) usedBy.set(link.recordId, [...usedBy.get(link.recordId) ?? [], link.projectId]);
    return usedBy;
  }
  toProduct(record, usedBy) {
    const options = (record.options ?? []).map((option) => ({ name: option.name, price: option.price }));
    return {
      id: record.id,
      name: record.name,
      description: record.summary,
      price: options[0]?.price ?? "",
      options,
      // Oldest first: the photo the founder added first is the product's main one.
      photos: this.photos(record.id).reverse().map((asset) => ({ id: asset.id, url: asset.url, filename: asset.filename })),
      revision: "currentRevision" in record ? record.currentRevision : record.revision,
      updatedAt: record.updatedAt,
      usedBy
    };
  }
};

// src/mini-apps/websites/contract.ts
var hostingOperations = ["rollback", "add_domain", "refresh_domain", "remove_domain", "set_access", "change_slug", "rename"];
var websiteKindKeys = ["landing", "game", "brand"];

// src/mini-apps/websites/server/service.ts
var WEBSITES_APPLICATION_KEY = "websites";
function sniffImageType(bytes) {
  if (bytes.length >= 8 && bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) return "image/png";
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" && String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP") return "image/webp";
  if (bytes.length >= 6 && /^GIF8[79]a$/.test(String.fromCharCode(...bytes.subarray(0, 6)))) return "image/gif";
  return null;
}
var PROJECT_ID = /^[A-Za-z0-9_~-]{3,200}$/;
var KIND_PREFIX = "website-kind-";
var siteKinds = ["landing", "game", "brand", "other"];
var bilingual = (input) => ({ vi: String(input?.vi ?? ""), en: String(input?.en ?? "") });
function parseKind(template) {
  try {
    const raw = JSON.parse(template);
    const key = String(raw.key ?? "");
    if (!websiteKindKeys.includes(key) || typeof raw.buildGuide !== "string" || !Array.isArray(raw.fields)) return null;
    const fields = raw.fields.map((field) => ({
      key: String(field.key ?? ""),
      type: field.type === "longtext" || field.type === "choice" ? field.type : "text",
      label: bilingual(field.label),
      placeholder: bilingual(field.placeholder),
      ...field.required ? { required: true } : {},
      ...Array.isArray(field.options) ? { options: field.options.map((option) => ({ value: String(option.value ?? ""), label: bilingual(option.label) })).filter((option) => option.value) } : {}
    })).filter((field) => /^[a-z][a-zA-Z0-9]{0,40}$/.test(field.key));
    return {
      key,
      name: bilingual(raw.name),
      lead: bilingual(raw.lead),
      promise: bilingual(raw.promise),
      icon: String(raw.icon ?? ""),
      useBrandProfile: raw.useBrandProfile !== false,
      fields,
      products: {
        max: Math.max(0, Math.min(30, Number(raw.products?.max ?? 0) || 0)),
        label: bilingual(raw.products?.label),
        hint: bilingual(raw.products?.hint)
      },
      changeIdeas: Array.isArray(raw.changeIdeas) ? raw.changeIdeas.map(bilingual) : [],
      buildGuide: raw.buildGuide,
      order: Number(raw.order ?? 0)
    };
  } catch {
    return null;
  }
}
var SLUG = /^[a-z](?:[a-z0-9]|-(?=[a-z0-9])){1,62}$/;
var HOSTNAME = /^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
var MAX_SITES_PER_REPORT = 200;
var OPEN_STATUSES = ["inbox", "active"];
var SCREENSHOT_HOST = /(^|\.)oaiusercontent\.com$/;
var MAX_SCREENSHOT_BYTES = 8 * 1024 * 1024;
var SCREENSHOT_EXTENSIONS = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
var fetchPicture = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(15e3), redirect: "follow" });
  if (!response.ok) return null;
  if (Number(response.headers.get("content-length") ?? 0) > MAX_SCREENSHOT_BYTES) return null;
  const bytes = new Uint8Array(await response.arrayBuffer());
  return bytes.byteLength <= MAX_SCREENSHOT_BYTES ? bytes : null;
};
var text2 = (value, max) => {
  const result = typeof value === "string" ? value.trim() : "";
  if (result.length > max) throw new Error(`A value is longer than ${max} characters`);
  return result;
};
var optionalText = (value, max) => value === null || value === void 0 ? null : text2(value, max) || null;
var shortLine = (value, max) => {
  const line = value.replace(/\s+/g, " ").trim();
  return line.length > max ? `${line.slice(0, max - 1)}\u2026` : line;
};
var webUrl = (value) => {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
};
var count = (value, fallback) => typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : fallback;
function normalizeSite(raw) {
  const site = raw ?? {};
  const projectId = text2(site.project_id, 200);
  if (!PROJECT_ID.test(projectId)) throw new Error("Each site needs its exact Sites project_id");
  const domains = (Array.isArray(site.domains) ? site.domains : []).slice(0, 20).map((entry) => {
    const domain = entry ?? {};
    const hostname = text2(domain.hostname, 253).toLowerCase();
    if (!hostname) throw new Error("Each domain needs its hostname");
    const records = (Array.isArray(domain.validation_records) ? domain.validation_records : []).slice(0, 10).map((record) => {
      const value = record ?? {};
      return { type: text2(value.type ?? value.record_type, 20) || "TXT", name: text2(value.name, 300), value: text2(value.value, 2e3) };
    });
    return {
      hostname,
      status: text2(domain.status, 40) || "pending",
      sslStatus: optionalText(domain.ssl_status, 40),
      cnameTarget: optionalText(domain.cname_target, 300),
      apexIpv4Targets: (Array.isArray(domain.apex_ipv4_targets) ? domain.apex_ipv4_targets : []).map((ip) => text2(ip, 45)).filter(Boolean).slice(0, 8),
      validationRecords: records,
      lastError: optionalText(domain.last_error, 1e3)
    };
  });
  const versions = (Array.isArray(site.versions) ? site.versions : []).map((entry) => {
    const version = entry ?? {};
    const id = text2(version.id, 300);
    if (!PROJECT_ID.test(id)) throw new Error("Each version needs its exact Sites id");
    const number = count(version.number ?? version.version_number, null);
    if (number === null) throw new Error("Each version needs its number");
    return { id, number, screenshotUrl: webUrl(version.screenshot_url), createdAt: optionalText(version.created_at, 60) };
  }).sort((a, b) => b.number - a.number).slice(0, 10);
  return {
    projectId,
    kind: siteKinds.includes(site.kind) ? site.kind : "other",
    slug: text2(site.slug, 100),
    title: text2(site.title, 300) || text2(site.slug, 100) || "Website",
    description: optionalText(site.description, 2e3),
    status: text2(site.status, 40) || "active",
    accessMode: optionalText(site.access_mode, 40),
    liveUrl: webUrl(site.live_url ?? site.current_live_url),
    previewUrl: webUrl(site.preview_url ?? site.current_preview_url),
    screenshotUrl: webUrl(site.screenshot_url),
    latestVersionNumber: count(site.latest_version_number, 0),
    liveVersionNumber: count(site.live_version_number, null),
    createdAt: optionalText(site.created_at, 60),
    updatedAt: optionalText(site.updated_at, 60),
    domains,
    versions
  };
}
var operationTitles = {
  sync: "C\u1EADp nh\u1EADt danh s\xE1ch website",
  create: "T\u1EA1o website",
  change: "S\u1EEDa website",
  rollback: "Quay l\u1EA1i b\u1EA3n c\u0169",
  add_domain: "G\u1EAFn t\xEAn mi\u1EC1n",
  refresh_domain: "Ki\u1EC3m tra t\xEAn mi\u1EC1n",
  remove_domain: "G\u1EE1 t\xEAn mi\u1EC1n",
  set_access: "\u0110\u1ED5i ai xem \u0111\u01B0\u1EE3c",
  change_slug: "\u0110\u1ED5i \u0111\u1ECBa ch\u1EC9",
  rename: "\u0110\u1ED5i t\xEAn"
};
var WebsitesService = class {
  constructor(store, codex, codexDesktop, prompts, projectRoot, downloadPicture = fetchPicture) {
    this.store = store;
    this.codex = codex;
    this.codexDesktop = codexDesktop;
    this.prompts = prompts;
    this.projectRoot = projectRoot;
    this.downloadPicture = downloadPicture;
    this.products = new WebsiteProducts(store);
  }
  store;
  codex;
  codexDesktop;
  prompts;
  projectRoot;
  downloadPicture;
  /** The founder's product library (Brand Profile's Products & Services). */
  products;
  screenshots = Promise.resolve();
  get screenshotDirectory() {
    return path.join(this.projectRoot, ".growth-studio", "websites", "screenshots");
  }
  /** The kept copy of a site's screenshot, if Studio has one. */
  async screenshotFile(projectId) {
    if (!PROJECT_ID.test(projectId)) return null;
    for (const [mimeType, extension] of Object.entries(SCREENSHOT_EXTENSIONS)) {
      const file = path.join(this.screenshotDirectory, `${projectId}.${extension}`);
      if (await fs.stat(file).then(() => true, () => false)) return { path: file, mimeType };
    }
    return null;
  }
  /** Resolves when the screenshots of earlier reports are saved (tests, shutdown). */
  screenshotsSettled() {
    return this.screenshots;
  }
  /** Keeps a copy of each reported screenshot before its signed link expires. */
  keepScreenshots(sites) {
    const jobs = sites.filter((site) => site.screenshotUrl && SCREENSHOT_HOST.test(new URL(site.screenshotUrl).hostname));
    this.screenshots = this.screenshots.then(async () => {
      for (const site of jobs) {
        try {
          const bytes = await this.downloadPicture(site.screenshotUrl);
          const mimeType = bytes ? sniffImageType(bytes) : null;
          if (!bytes || !mimeType || !SCREENSHOT_EXTENSIONS[mimeType]) continue;
          await fs.mkdir(this.screenshotDirectory, { recursive: true });
          const target = path.join(this.screenshotDirectory, `${site.projectId}.${SCREENSHOT_EXTENSIONS[mimeType]}`);
          await fs.writeFile(`${target}.tmp`, bytes);
          await fs.rename(`${target}.tmp`, target);
          for (const extension of Object.values(SCREENSHOT_EXTENSIONS)) {
            const other = path.join(this.screenshotDirectory, `${site.projectId}.${extension}`);
            if (other !== target) await fs.rm(other, { force: true });
          }
        } catch {
        }
      }
    });
  }
  /** Where Codex checks out the founder's Site sources. */
  get sitesDirectory() {
    return path.join(this.projectRoot, "websites");
  }
  overview() {
    const tasks = this.tasks();
    const lastSync = tasks.find((task) => task.operation === "sync" && task.outcome === "done");
    return { sites: this.store.listWebsiteSites(), tasks, lastSyncedAt: lastSync?.updatedAt ?? null };
  }
  site(projectId) {
    const site = this.store.getWebsiteSite(projectId);
    if (!site) throw new Error("This website is not in Studio; update the list first");
    return { site, tasks: this.tasks().filter((task) => task.projectId === projectId) };
  }
  /** Reads every Site into Studio; one sync at a time. */
  async sync() {
    const running = this.tasks().find((task) => task.operation === "sync" && OPEN_STATUSES.includes(task.status) && !task.lastError);
    if (running) return running;
    return this.start("sync", null, operationTitles.sync, "", {});
  }
  /** The kinds of site Kallob builds (shipped with the package), as the founder sees them. */
  async kinds() {
    return (await this.kindDefinitions()).map(({ buildGuide: _guide, order: _order, ...kind }) => kind);
  }
  async kindDefinitions() {
    const prompts = await this.prompts.applicationPromptsWithPrefix(WEBSITES_APPLICATION_KEY, KIND_PREFIX);
    return prompts.map((prompt) => parseKind(prompt.template)).filter((kind) => Boolean(kind)).sort((a, b) => a.order - b.order);
  }
  async create(input) {
    const kind = (await this.kindDefinitions()).find((candidate) => candidate.key === input?.kind);
    if (!kind) throw new Error("Choose a landing page, a game or a brand website");
    const raw = input?.values ?? {};
    const lines = [];
    const values = {};
    for (const field of kind.fields) {
      let value = text2(raw[field.key], field.type === "longtext" ? 4e3 : 300);
      if (field.type === "choice") {
        if (value && !field.options?.some((option) => option.value === value)) throw new Error(`${field.label.en}: choose one of the options`);
        value ||= field.options?.[0]?.value ?? "";
      }
      if (field.required && !value) throw new Error(`${field.label.en} is required`);
      if (!value) continue;
      values[field.key] = value;
      const shown = field.type === "choice" ? field.options?.find((option) => option.value === value)?.label.vi ?? value : value;
      lines.push(`${field.label.vi}: ${shown}`);
    }
    const products = this.products.pick(Array.isArray(input?.productIds) ? input.productIds.map(String) : []);
    if (products.length > kind.products.max) throw new Error(kind.products.max ? `Pick at most ${kind.products.max} products for this kind of site` : "This kind of site takes no products");
    if (products.length) lines.push(`S\u1EA3n ph\u1EA9m t\u1EEB th\u01B0 vi\u1EC7n: ${products.map((product) => product.name).join(", ")}`);
    const slug = text2(input?.slug, 63).toLowerCase();
    if (slug && !SLUG.test(slug)) throw new Error("The address may use only lowercase letters, digits and single hyphens");
    const audience = input?.audience === "private" ? "private" : "public";
    const useBrand = input?.useBrandProfile ?? kind.useBrandProfile;
    const headline = values.name ?? values.offer ?? values.theme ?? kind.name.vi;
    return this.start("create", null, `${operationTitles.create} \xB7 ${kind.name.vi} \xB7 ${shortLine(headline, 90)}`, lines.join("\n"), {
      audience,
      slug: slug || slugFrom(values.name?.split(/\s[—–-]\s/)[0] ?? `${kind.key} ${shortLine(headline, 40)}`),
      ...useBrand ? {} : { brand: "no" }
    }, kind.key, products.map((product) => product.id));
  }
  async change(projectId, requestInput) {
    const site = this.site(projectId).site;
    const request = text2(requestInput, 3e3);
    if (request.length < 3) throw new Error("Say what you want to change");
    return this.start("change", site.projectId, `${operationTitles.change} \xB7 ${shortLine(site.title, 60)}: ${shortLine(request, 80)}`, request, {});
  }
  async hosting(projectId, input) {
    const site = this.site(projectId).site;
    const operation = String(input?.operation ?? "");
    if (!hostingOperations.includes(operation)) throw new Error("Unsupported website operation");
    const details = {};
    let label = "";
    if (input.operation === "rollback") {
      const version = site.versions.find((candidate) => candidate.id === input.versionId);
      if (!version) throw new Error("This version is not in Studio; update the list first");
      details.version_id = version.id;
      details.version_number = String(version.number);
      label = `b\u1EA3n ${version.number}`;
    } else if (input.operation === "add_domain" || input.operation === "refresh_domain" || input.operation === "remove_domain") {
      const hostname = text2(input.hostname, 253).toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\.$/, "");
      if (!HOSTNAME.test(hostname)) throw new Error("Enter a domain such as www.tencuahang.vn");
      if (hostname.endsWith(".chatgpt.site")) throw new Error("That is already the free ChatGPT Sites address");
      const known = site.domains.some((domain) => domain.hostname === hostname);
      if (input.operation === "add_domain" && known) throw new Error("This domain is already connected to the website");
      if (input.operation !== "add_domain" && !known) throw new Error("This domain is not connected to the website");
      details.hostname = hostname;
      label = hostname;
    } else if (input.operation === "set_access") {
      if (input.mode !== "public" && input.mode !== "private") throw new Error("Choose public or private");
      details.mode = input.mode;
      label = input.mode === "public" ? "c\xF4ng khai" : "ch\u1EC9 m\xECnh t\xF4i";
    } else if (input.operation === "change_slug") {
      const slug = text2(input.slug, 63).toLowerCase();
      if (!SLUG.test(slug)) throw new Error("The address may use only lowercase letters, digits and single hyphens");
      if (slug === site.slug) throw new Error("That is already the address");
      details.slug = slug;
      label = slug;
    } else if (input.operation === "rename") {
      const title = text2(input.title, 120);
      if (!title) throw new Error("The website needs a name");
      details.title = title;
      details.description = text2(input.description, 500);
      label = title;
    }
    if (!label) throw new Error("Unsupported website operation");
    const busy = this.tasks().find((task) => task.projectId === site.projectId && task.operation === operation && OPEN_STATUSES.includes(task.status) && !task.lastError && task.request === JSON.stringify(details));
    if (busy) return busy;
    return this.start(operation, site.projectId, `${operationTitles[operation]} \xB7 ${shortLine(site.title, 60)} \xB7 ${label}`, JSON.stringify(details), details);
  }
  /** A task that never reached Codex (the hand-off failed) is sent again, as it was asked. */
  async resend(taskId) {
    const task = this.websiteTask(taskId);
    if (task.status === "archived" || task.status === "done") throw new Error("This task is closed");
    if (task.codexThreadId) throw new Error("Codex already has this task; ask it to continue instead");
    await this.dispatch(task.id);
    return this.toTask(this.store.getTask(task.id));
  }
  /** Codex's `website_report`, posted by the plugin launcher. */
  report(taskId, body) {
    const task = this.websiteTask(taskId);
    if (task.status === "archived") throw new Error("This task is archived");
    const input = body ?? {};
    const outcome = input.outcome === "failed" ? "failed" : input.outcome === "done" ? "done" : null;
    if (!outcome) throw new Error('outcome must be "done" or "failed"');
    const message = text2(input.message, 2e3);
    if (!message) throw new Error("message is required: one or two plain Vietnamese sentences for the founder");
    const rawSites = Array.isArray(input.sites) ? input.sites : [];
    if (rawSites.length > MAX_SITES_PER_REPORT) throw new Error(`Report at most ${MAX_SITES_PER_REPORT} sites`);
    const madeAs = /* @__PURE__ */ new Map();
    for (const made of this.store.websiteTasks()) if (made.source.websiteOperation === "create" && made.source.websiteKind && made.source.websiteProjectId) madeAs.set(made.source.websiteProjectId, made.source.websiteKind);
    if (task.source.websiteOperation === "create" && task.source.websiteKind && typeof input.project_id === "string") madeAs.set(input.project_id, task.source.websiteKind);
    const sites = rawSites.map(normalizeSite).map((site) => madeAs.has(site.projectId) ? { ...site, kind: madeAs.get(site.projectId) } : site);
    const complete = input.complete === true;
    if (complete && task.source.websiteOperation !== "sync") throw new Error("Only a sync reports the complete list of sites");
    const projectId = input.project_id === null || input.project_id === void 0 || input.project_id === "" ? null : text2(input.project_id, 200);
    if (projectId && !PROJECT_ID.test(projectId)) throw new Error("project_id must be the exact Sites project id");
    const expected = task.source.websiteProjectId;
    if (expected && projectId && projectId !== expected) throw new Error(`This task works on ${expected}; report that project_id`);
    if (outcome === "done" && task.source.websiteOperation === "create" && !projectId) throw new Error("A created website needs its project_id");
    const touched = projectId ?? expected ?? null;
    if (outcome === "done" && touched && !sites.some((site) => site.projectId === touched)) throw new Error('Include a fresh snapshot of the site you worked on in "sites"');
    if (sites.length || complete) this.store.saveWebsiteSites(sites, complete);
    this.keepScreenshots(sites);
    if (outcome === "done" && touched && task.source.websiteProductIds?.length) this.store.linkWebsiteProducts(touched, task.source.websiteProductIds);
    const source = { ...task.source, websiteOutcome: outcome, websiteMessage: message, ...touched ? { websiteProjectId: touched } : {} };
    if (outcome === "done") {
      this.store.updateTask(taskId, { status: "done", question: null, lastError: null, source }, task.revision);
      this.store.addEvent({ level: "success", eventType: "website.task_done", title: "Website task done", detail: `${task.title} \xB7 ${shortLine(message, 300)}` });
    } else {
      this.store.updateTask(taskId, { question: null, lastError: message, source }, task.revision);
      this.store.addEvent({ level: "failed", eventType: "website.task_failed", title: "Website task could not finish", detail: `${task.title} \xB7 ${shortLine(message, 300)}` });
    }
    return this.toTask(this.store.getTask(taskId));
  }
  tasks() {
    return this.store.websiteTasks().filter((task) => task.status !== "archived").map((task) => this.toTask(task));
  }
  toTask(task) {
    const source = task.source;
    const running = this.codex.withRunning(task);
    return {
      id: task.id,
      operation: source.websiteOperation ?? "sync",
      kind: source.websiteKind ?? null,
      projectId: source.websiteProjectId ?? null,
      title: task.title,
      request: source.websiteRequest ?? "",
      status: task.status,
      revision: task.revision,
      inCodex: Boolean(task.codexThreadId),
      codexRunning: Boolean(running.codexRunning),
      question: task.question ?? null,
      lastError: task.lastError ?? null,
      message: source.websiteMessage ?? null,
      outcome: source.websiteOutcome ?? null,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }
  websiteTask(taskId) {
    const task = this.store.websiteTask(taskId);
    if (!task) throw new Error("Website task not found");
    return task;
  }
  async start(operation, projectId, title, request, details, kind, productIds = []) {
    await this.prompts.assertApplication(WEBSITES_APPLICATION_KEY);
    const task = this.store.createTask({
      title: `Website \xB7 ${title}`,
      description: operation === "change" || operation === "create" ? request : "",
      priority: "medium",
      source: {
        type: "websites",
        referenceId: null,
        label: "Websites \xB7 Codex",
        evidence: [],
        affectedGroups: ["marketing"],
        websiteOperation: operation,
        ...kind ? { websiteKind: kind } : {},
        ...productIds.length ? { websiteProductIds: productIds } : {},
        ...projectId ? { websiteProjectId: projectId } : {},
        websiteRequest: request,
        ...Object.keys(details).length ? { websiteDetails: details } : {}
      }
    });
    this.store.addEvent({ level: "success", eventType: "website.task_created", title: "Website task created", detail: task.title });
    void this.dispatch(task.id);
    return this.toTask(this.store.getTask(task.id));
  }
  async dispatch(taskId) {
    const task = this.store.websiteTask(taskId);
    if (!task) return;
    const source = task.source;
    const operation = source.websiteOperation ?? "sync";
    const details = source.websiteDetails ?? {};
    try {
      const site = source.websiteProjectId ? this.store.getWebsiteSite(source.websiteProjectId) : null;
      const prompt = operation === "sync" ? await this.prompts.application(WEBSITES_APPLICATION_KEY, "website-sync", { taskIdJson: taskId }) : operation === "create" ? await this.prompts.application(WEBSITES_APPLICATION_KEY, "website-create", {
        taskIdJson: taskId,
        ...await this.kindPromptValues(source.websiteKind),
        brief: source.websiteRequest ?? task.description,
        products: await this.productBlock(taskId, source.websiteProductIds),
        brandContext: details.brand === "no" ? "none" : this.brandContext(),
        audience: details.audience ?? "public",
        slugHint: details.slug ?? "website",
        sitesDirJson: this.sitesDirectory
      }) : operation === "change" ? await this.prompts.application(WEBSITES_APPLICATION_KEY, "website-change", {
        taskIdJson: taskId,
        sitesDirJson: this.sitesDirectory,
        projectIdJson: source.websiteProjectId ?? "",
        siteTitle: site?.title ?? "Website",
        liveUrl: site?.liveUrl ?? "not published yet",
        request: source.websiteRequest ?? task.description,
        products: await this.productBlock(taskId, source.websiteProductIds)
      }) : await this.prompts.application(WEBSITES_APPLICATION_KEY, "website-hosting", {
        taskIdJson: taskId,
        projectIdJson: source.websiteProjectId ?? "",
        siteTitle: site?.title ?? "Website",
        operation: JSON.stringify({ operation, ...details })
      });
      const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${taskId}`, `Growth Studio \xB7 ${task.title}`, prompt.text + this.codex.studioChannel(taskId), this.projectRoot, { openOnCreate: false, network: true });
      const latest = this.store.getTask(taskId);
      if (!latest) return;
      this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, latest.revision);
      this.store.addEvent({ level: "success", eventType: "website.task_started", title: "Codex is working on a website", detail: `${latest.title} \xB7 ${receipt.threadId} \xB7 ${prompt.label}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not start the website task in Codex";
      const latest = this.store.getTask(taskId);
      if (latest) this.store.updateTask(taskId, { lastError: message }, latest.revision);
      this.store.addEvent({ level: "failed", eventType: "website.task_failed", title: "Could not start the website task", detail: message });
    }
  }
  /**
   * The library products a task uses, with their photos written to files
   * Codex can copy into the site (the library keeps them in Studio's database).
   */
  async productBlock(taskId, ids) {
    if (!ids?.length) return "";
    const folder = path.join(this.sitesDirectory, "media", taskId);
    const lines = [];
    for (const product of this.products.pick(ids)) {
      const photos = [];
      for (const [index, photo] of product.photos.entries()) {
        const data = this.products.photoData(photo.id);
        if (!data) continue;
        const extension = SCREENSHOT_EXTENSIONS[data.asset.mimeType] ?? (data.asset.mimeType === "image/gif" ? "gif" : "img");
        const file = path.join(folder, `${product.id.slice(0, 8)}-${index + 1}.${extension}`);
        await fs.mkdir(folder, { recursive: true });
        await fs.writeFile(file, data.data);
        photos.push(file);
      }
      lines.push([
        `- ${product.name}`,
        product.options.length > 1 ? `  Gi\xE1: ${product.options.map((option) => `${option.name}: ${option.price}`).join("; ")}` : product.price ? `  Gi\xE1: ${product.price}` : "  Gi\xE1: (ch\u01B0a c\xF3 \u2014 kh\xF4ng t\u1EF1 ghi gi\xE1)",
        product.description ? `  M\xF4 t\u1EA3: ${product.description}` : "",
        photos.length ? `  \u1EA2nh th\u1EADt c\u1EE7a s\u1EA3n ph\u1EA9m: ${photos.map((file) => JSON.stringify(file)).join(", ")}` : "  \u1EA2nh: (ch\u01B0a c\xF3)"
      ].filter(Boolean).join("\n"));
    }
    return lines.join("\n");
  }
  /** Puts a product's current name, price, description and photos on every site that shows it. */
  async updateSitesWithProduct(productId) {
    const product = this.products.get(productId);
    const sites = product.usedBy.map((id) => this.store.getWebsiteSite(id)).filter((site) => Boolean(site));
    if (!sites.length) throw new Error("No website shows this product yet");
    const tasks = [];
    for (const site of sites) {
      const request = `C\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m \u201C${product.name}\u201D tr\xEAn website cho kh\u1EDBp v\u1EDBi th\u01B0 vi\u1EC7n (t\xEAn, gi\xE1, m\xF4 t\u1EA3 v\xE0 \u1EA3nh b\xEAn d\u01B0\u1EDBi). Gi\u1EEF nguy\xEAn m\u1ECDi ph\u1EA7n kh\xE1c.`;
      tasks.push(await this.start("change", site.projectId, `${operationTitles.change} \xB7 ${shortLine(site.title, 60)}: c\u1EADp nh\u1EADt ${shortLine(product.name, 60)}`, request, {}, void 0, [product.id]));
    }
    return tasks;
  }
  /** The kind's name and build guide for the create prompt. */
  async kindPromptValues(key) {
    const kind = (await this.kindDefinitions()).find((candidate) => candidate.key === key);
    if (!kind) throw new Error("This kind of website is no longer offered; update Websites");
    return { kindName: `${kind.name.vi} (${kind.name.en})`, kindJson: kind.key, buildGuide: kind.buildGuide };
  }
  /** What Brand Profile says about the business, for a new site's copy. */
  brandContext() {
    const profile = this.store.getBrandProfile();
    if (!profile?.name?.trim()) return "none";
    const lines = [
      ["Name", profile.name],
      ["Tagline", profile.tagline],
      ["Summary", profile.summary],
      ["Positioning", profile.positioning],
      ["Current website", profile.websiteUrl],
      ["Facebook", profile.facebookUrl],
      ["Instagram", profile.instagramUrl],
      ["TikTok", profile.tiktokUrl],
      ["Zalo", profile.zaloUrl],
      ["Brand notes", profile.content.slice(0, 3e3)]
    ].filter(([, value]) => value?.trim()).map(([label, value]) => `${label}: ${value.trim()}`);
    return lines.join("\n");
  }
};
function slugFrom(name) {
  const slug = name.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50).replace(/-+$/, "");
  return /^[a-z]/.test(slug) && slug.length >= 2 ? slug : `web-${slug || "site"}`.slice(0, 50);
}

// src/mini-apps/websites/server/index.ts
var server_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const service = new WebsitesService(createWebsitesRepository(sdk), sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot);
    return {
      router: createWebsitesRouter({ service, router: sdk.router() }),
      stop: () => service.screenshotsSettled(),
      codexTools: [websiteReportTool(service)],
      taskKinds: [websiteTaskKind]
    };
  }
});

// websites-package.js
var websites_package_default = { ...server_default, content: { "prompts": { "website-change": 'You are working for a solo founder in Kallob Growth Studio\'s Websites mini-app. Their websites are ChatGPT Sites: use the `sites` Codex plugin (its skill and the Sites connector tools) for everything; never host, build or publish a site any other way. This runs in the background: there is no visible preview to show and no browser tab to open, so skip preview handoff and open_in_codex, and still verify what you can.\nPhotos given as absolute file paths are the founder\'s real photos: copy them into the Site\'s assets (optimize to WebP, at most 1600 px wide), use each one for the product it belongs to, and never replace them with generated, stock or invented product images. Products from the founder\'s library come with their exact name, price and description: show them as given.\nBefore you need anything from the founder (a fact, a choice, a sign-in or a real-world step such as changing DNS at their registrar), call `growth_task_ask` (task_id {{taskIdJson}}) with one plain Vietnamese question and up to four short choices, then end your turn. Never guess phone numbers, addresses, prices, opening hours, names or claims.\n\nTASK: CHANGE A WEBSITE\nSite: {{siteTitle}} (project_id {{projectIdJson}}, live at {{liveUrl}})\nWhat the founder asked, in their words:\n{{request}}{{#products}}\n\nS\u1EA3n ph\u1EA9m t\u1EEB th\u01B0 vi\u1EC7n c\u1EE7a ch\u1EE7 shop (t\xEAn, gi\xE1, m\xF4 t\u1EA3 ch\xEDnh x\xE1c nh\u01B0 d\u01B0\u1EDBi \u0111\xE2y; \u1EA3nh l\xE0 \u1EA3nh th\u1EADt: ch\xE9p v\xE0o website, t\u1ED1i \u01B0u sang WebP, d\xF9ng \u0111\xFAng s\u1EA3n ph\u1EA9m, kh\xF4ng thay b\u1EB1ng \u1EA3nh t\u1EA1o ra hay \u1EA3nh m\u1EABu):\n{{products}}{{/products}}\n\nFollow the Sites skill workflow for an existing hosted Site: get_site, a fresh source write credential, and open its source with the source helper into an empty folder inside {{sitesDirJson}} (reuse that folder when it already holds this Site\'s checkout). Make exactly the change asked and nothing else: keep the design, the content and the audience as they are. When the request is ambiguous or needs a fact you do not have (a new phone number, a photo, a price), ask first. Then package, save a version and deploy it exactly as the skill says, keeping the Site\'s current audience.\n\nHOW TO REPORT (the only return channel; there is no result file)\nWhen you finish, or when the work cannot be done, call the `website_report` tool of the `kallob-growth` MCP server exactly once with:\n- task_id: {{taskIdJson}}\n- outcome: "done", or "failed" when the operation could not be completed;\n- message: one or two short, plain Vietnamese sentences for a founder who knows nothing about websites: what changed and where to see it, or why it failed and what they can do. No jargon (no "deploy", "commit", "DNS record" without explaining it), no IDs;\n- project_id: the Site this task created or changed, or null;\n- complete: true only when "sites" is the full list of the account\'s Sites;\n- sites: a fresh snapshot of every Site you touched (for a full sync, every Site), each built from Sites tool results you just read, never from memory:\n  {"project_id", "kind" ("landing" for a one-page offer or sign-up page, "game" for a mini game or quiz, "brand" for a site presenting a business, "other" for anything else; judge from the Site\'s title, description and content), "slug", "title", "description", "status", "access_mode", "live_url" (current_live_url), "preview_url" (current_preview_url), "screenshot_url" (copy the picture link exactly as Sites returned it, query string included: it is a short-lived image link, not a secret, and Studio keeps a copy of the picture), "latest_version_number", "live_version_number" (the version now serving at live_url when you know it, else null), "created_at", "updated_at",\n   "domains": from list_custom_domains, each {"hostname", "status", "ssl_status", "cname_target", "apex_ipv4_targets", "validation_records": [{"type", "name", "value"}], "last_error"},\n   "versions": from list_site_versions, newest first, at most 10, each {"id", "number", "screenshot_url", "created_at"}}\nCopy IDs exactly as Sites returned them. Never put source credentials, tokens, bypass tokens or passwords in the report, in files or in your messages.\nIf the tool returns an error, fix the payload and call it again. Then end your turn.\nFor this task "project_id" is {{projectIdJson}} and "sites" holds its snapshot after the change.\n', "website-create": 'You are working for a solo founder in Kallob Growth Studio\'s Websites mini-app. Their websites are ChatGPT Sites: use the `sites` Codex plugin (its skill and the Sites connector tools) for everything; never host, build or publish a site any other way. This runs in the background: there is no visible preview to show and no browser tab to open, so skip preview handoff and open_in_codex, and still verify what you can.\nPhotos given as absolute file paths are the founder\'s real photos: copy them into the Site\'s assets (optimize to WebP, at most 1600 px wide), use each one for the product it belongs to, and never replace them with generated, stock or invented product images. Products from the founder\'s library come with their exact name, price and description: show them as given.\nBefore you need anything from the founder (a fact, a choice, a sign-in or a real-world step such as changing DNS at their registrar), call `growth_task_ask` (task_id {{taskIdJson}}) with one plain Vietnamese question and up to four short choices, then end your turn. Never guess phone numbers, addresses, prices, opening hours, names or claims.\n\nTASK: CREATE A NEW WEBSITE \u2014 {{kindName}}\nThe founder\'s answers (their own words; the facts here are the only facts you may publish):\n{{brief}}{{#products}}\n\nS\u1EA3n ph\u1EA9m t\u1EEB th\u01B0 vi\u1EC7n c\u1EE7a ch\u1EE7 shop (t\xEAn, gi\xE1, m\xF4 t\u1EA3 ch\xEDnh x\xE1c nh\u01B0 d\u01B0\u1EDBi \u0111\xE2y; \u1EA3nh l\xE0 \u1EA3nh th\u1EADt: ch\xE9p v\xE0o website, t\u1ED1i \u01B0u sang WebP, d\xF9ng \u0111\xFAng s\u1EA3n ph\u1EA9m, kh\xF4ng thay b\u1EB1ng \u1EA3nh t\u1EA1o ra hay \u1EA3nh m\u1EABu):\n{{products}}{{/products}}\n\nBrand context from Growth Studio ("none" means there is none):\n{{brandContext}}\n\nWho should see it once published: {{audience}} ("public" = anyone with the link, "private" = only the founder).\nPreferred address label: {{slugHint}} (lowercase letters, digits and single hyphens; if it is taken, add a short suffix).\n\nKALLOB\'S BUILD GUIDE FOR THIS KIND OF SITE (follow it; it wins over generic defaults):\n{{buildGuide}}\n\nFollow the Sites skill workflow for a new Site. Create the project folder inside {{sitesDirJson}} (one folder named after the address label). Write real Vietnamese copy from the answers (no lorem ipsum, no invented facts, testimonials, prices or awards) and make it work well on phones first. Publish it; new Sites start private, so when the audience above is "public" change its access to public after the first deployment with update_site_access.\n\nHOW TO REPORT (the only return channel; there is no result file)\nWhen you finish, or when the work cannot be done, call the `website_report` tool of the `kallob-growth` MCP server exactly once with:\n- task_id: {{taskIdJson}}\n- outcome: "done", or "failed" when the operation could not be completed;\n- message: one or two short, plain Vietnamese sentences for a founder who knows nothing about websites: what changed and where to see it, or why it failed and what they can do. No jargon (no "deploy", "commit", "DNS record" without explaining it), no IDs;\n- project_id: the Site this task created or changed, or null;\n- complete: true only when "sites" is the full list of the account\'s Sites;\n- sites: a fresh snapshot of every Site you touched (for a full sync, every Site), each built from Sites tool results you just read, never from memory:\n  {"project_id", "kind" ("landing" for a one-page offer or sign-up page, "game" for a mini game or quiz, "brand" for a site presenting a business, "other" for anything else; judge from the Site\'s title, description and content), "slug", "title", "description", "status", "access_mode", "live_url" (current_live_url), "preview_url" (current_preview_url), "screenshot_url" (copy the picture link exactly as Sites returned it, query string included: it is a short-lived image link, not a secret, and Studio keeps a copy of the picture), "latest_version_number", "live_version_number" (the version now serving at live_url when you know it, else null), "created_at", "updated_at",\n   "domains": from list_custom_domains, each {"hostname", "status", "ssl_status", "cname_target", "apex_ipv4_targets", "validation_records": [{"type", "name", "value"}], "last_error"},\n   "versions": from list_site_versions, newest first, at most 10, each {"id", "number", "screenshot_url", "created_at"}}\nCopy IDs exactly as Sites returned them. Never put source credentials, tokens, bypass tokens or passwords in the report, in files or in your messages.\nIf the tool returns an error, fix the payload and call it again. Then end your turn.\nFor this task "project_id" is the new Site, its "kind" is {{kindJson}}, and "sites" holds its snapshot.\n', "website-hosting": 'You are working for a solo founder in Kallob Growth Studio\'s Websites mini-app. Their websites are ChatGPT Sites: use the `sites` Codex plugin (its skill and the Sites connector tools) for everything; never host, build or publish a site any other way. This runs in the background: there is no visible preview to show and no browser tab to open, so skip preview handoff and open_in_codex, and still verify what you can.\nPhotos given as absolute file paths are the founder\'s real photos: copy them into the Site\'s assets (optimize to WebP, at most 1600 px wide), use each one for the product it belongs to, and never replace them with generated, stock or invented product images. Products from the founder\'s library come with their exact name, price and description: show them as given.\nBefore you need anything from the founder (a fact, a choice, a sign-in or a real-world step such as changing DNS at their registrar), call `growth_task_ask` (task_id {{taskIdJson}}) with one plain Vietnamese question and up to four short choices, then end your turn. Never guess phone numbers, addresses, prices, opening hours, names or claims.\n\nTASK: HOSTING OPERATION (no source change, so do not open or build the source)\nSite: {{siteTitle}} (project_id {{projectIdJson}})\nOperation (JSON): {{operation}}\n\nDo exactly this one operation with the Sites connector tools, confirm the returned state, and change nothing else:\n- "rollback": make saved version "version_id" the live one again with deploy_site_version (deploy_private_site_version when the Site is owner-private), then poll get_deployment_status while it is pending, building or publishing.\n- "add_domain": add_custom_domain with "hostname". In the message, tell the founder in plain words which records to add at the company where they bought the domain (type, name, value), that it can take from a few minutes to a day, and to press "Ki\u1EC3m tra l\u1EA1i" afterwards.\n- "refresh_domain": refresh_custom_domain_status for "hostname" (find its id with list_custom_domains). Say plainly whether it works now and, if not, what is still missing.\n- "remove_domain": remove_custom_domain for "hostname"; the Site keeps its chatgpt.site address.\n- "set_access": "mode" "public" makes the Site visible to anyone with the link; "private" makes it visible only to the founder (the owner-only access mode get_site offers). Use update_site_access.\n- "change_slug": change_site_slug to "slug", then get_site until the change is complete; say the new address and that the old one stops working.\n- "rename": update_site_metadata with "title" and "description".\n\nHOW TO REPORT (the only return channel; there is no result file)\nWhen you finish, or when the work cannot be done, call the `website_report` tool of the `kallob-growth` MCP server exactly once with:\n- task_id: {{taskIdJson}}\n- outcome: "done", or "failed" when the operation could not be completed;\n- message: one or two short, plain Vietnamese sentences for a founder who knows nothing about websites: what changed and where to see it, or why it failed and what they can do. No jargon (no "deploy", "commit", "DNS record" without explaining it), no IDs;\n- project_id: the Site this task created or changed, or null;\n- complete: true only when "sites" is the full list of the account\'s Sites;\n- sites: a fresh snapshot of every Site you touched (for a full sync, every Site), each built from Sites tool results you just read, never from memory:\n  {"project_id", "kind" ("landing" for a one-page offer or sign-up page, "game" for a mini game or quiz, "brand" for a site presenting a business, "other" for anything else; judge from the Site\'s title, description and content), "slug", "title", "description", "status", "access_mode", "live_url" (current_live_url), "preview_url" (current_preview_url), "screenshot_url" (copy the picture link exactly as Sites returned it, query string included: it is a short-lived image link, not a secret, and Studio keeps a copy of the picture), "latest_version_number", "live_version_number" (the version now serving at live_url when you know it, else null), "created_at", "updated_at",\n   "domains": from list_custom_domains, each {"hostname", "status", "ssl_status", "cname_target", "apex_ipv4_targets", "validation_records": [{"type", "name", "value"}], "last_error"},\n   "versions": from list_site_versions, newest first, at most 10, each {"id", "number", "screenshot_url", "created_at"}}\nCopy IDs exactly as Sites returned them. Never put source credentials, tokens, bypass tokens or passwords in the report, in files or in your messages.\nIf the tool returns an error, fix the payload and call it again. Then end your turn.\nFor this task "project_id" is {{projectIdJson}} and "sites" holds its snapshot after the operation.\n', "website-kind-brand": `{
  "key": "brand",
  "name": {
    "vi": "Website th\u01B0\u01A1ng hi\u1EC7u",
    "en": "Brand website"
  },
  "lead": {
    "vi": "Website gi\u1EDBi thi\u1EC7u c\u1EEDa h\xE0ng hay doanh nghi\u1EC7p: b\u1EA1n l\xE0 ai, b\xE1n g\xEC, \u1EDF \u0111\xE2u.",
    "en": "A site that presents your shop or business: who you are, what you sell, where to find you."
  },
  "promise": {
    "vi": "M\u1ED9t website g\u1ECDn g\xE0ng, \u0111\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u: gi\u1EDBi thi\u1EC7u, s\u1EA3n ph\u1EA9m / d\u1ECBch v\u1EE5, c\xE2u chuy\u1EC7n, b\u1EA3n \u0111\u1ED3 v\xE0 li\xEAn h\u1EC7, \u0111\u1EB9p tr\xEAn \u0111i\u1EC7n tho\u1EA1i v\xE0 d\u1EC5 \u0111\u01B0\u1EE3c t\xECm th\u1EA5y tr\xEAn Google.",
    "en": "A tidy site in your brand colours: intro, products / services, your story, map and contact, great on phones and easy to find on Google."
  },
  "icon": "store",
  "useBrandProfile": true,
  "products": {
    "max": 20,
    "label": {
      "vi": "S\u1EA3n ph\u1EA9m / d\u1ECBch v\u1EE5 hi\u1EC7n tr\xEAn website",
      "en": "Products / services on the site"
    },
    "hint": {
      "vi": "Ch\u1ECDn t\u1EEB th\u01B0 vi\u1EC7n; t\xEAn, gi\xE1, m\xF4 t\u1EA3 v\xE0 \u1EA3nh l\u1EA5y \u0111\xFAng nh\u01B0 b\u1EA1n \u0111\xE3 l\u01B0u.",
      "en": "Pick from your library; names, prices, descriptions and photos come exactly as saved."
    }
  },
  "fields": [
    {
      "key": "name",
      "type": "text",
      "required": true,
      "label": {
        "vi": "T\xEAn shop v\xE0 m\u1ED9t c\xE2u gi\u1EDBi thi\u1EC7u",
        "en": "Business name and a one-line description"
      },
      "placeholder": {
        "vi": "VD: Ti\u1EC7m G\u1ED1m M\u1ED9c \u2014 g\u1ED1m th\u1EE7 c\xF4ng l\xE0m t\u1EA1i B\xE1t Tr\xE0ng",
        "en": "E.g. Moc Pottery \u2014 handmade ceramics from Bat Trang"
      }
    },
    {
      "key": "offerings",
      "type": "longtext",
      "label": {
        "vi": "S\u1EA3n ph\u1EA9m / d\u1ECBch v\u1EE5 kh\xE1c ch\u01B0a c\xF3 trong th\u01B0 vi\u1EC7n",
        "en": "Other products / services not in your library"
      },
      "placeholder": {
        "vi": "VD: C\u1ED1c g\u1ED1m men lam 150.000\u0111; B\u1ED9 \u1EA5m ch\xE9n 890.000\u0111\u2026",
        "en": "E.g. Blue-glaze mug 150,000\u0111; tea set 890,000\u0111\u2026"
      }
    },
    {
      "key": "contact",
      "type": "longtext",
      "required": true,
      "label": {
        "vi": "Kh\xE1ch li\xEAn h\u1EC7 b\u1EA1n qua \u0111\xE2u?",
        "en": "How do customers reach you?"
      },
      "placeholder": {
        "vi": "S\u1ED1 Zalo / \u0111i\u1EC7n tho\u1EA1i, trang Facebook\u2026 VD: Zalo 0912 345 678, fb.com/tiemgommoc",
        "en": "Zalo / phone number, Facebook page\u2026 e.g. Zalo 0912 345 678"
      }
    },
    {
      "key": "place",
      "type": "text",
      "label": {
        "vi": "\u0110\u1ECBa ch\u1EC9 c\u1EEDa h\xE0ng v\xE0 gi\u1EDD m\u1EDF c\u1EEDa",
        "en": "Shop address and opening hours"
      },
      "placeholder": {
        "vi": "VD: 25 H\xE0ng Gai, Ho\xE0n Ki\u1EBFm, H\xE0 N\u1ED9i \u2014 8h\u201321h h\u1EB1ng ng\xE0y",
        "en": "E.g. 25 Hang Gai, Hanoi \u2014 8am\u20139pm daily"
      }
    },
    {
      "key": "story",
      "type": "longtext",
      "label": {
        "vi": "C\xE2u chuy\u1EC7n c\u1EE7a b\u1EA1n (v\xEC sao b\u1EAFt \u0111\u1EA7u, \u0111i\u1EC1u g\xEC kh\xE1c bi\u1EC7t)",
        "en": "Your story (why you started, what makes you different)"
      },
      "placeholder": {
        "vi": "VD: M\xECnh l\xE0m g\u1ED1m 10 n\u0103m, m\u1ED7i s\u1EA3n ph\u1EA9m \u0111\u1EC1u n\u1EB7n tay\u2026",
        "en": "E.g. I have made pottery for 10 years, every piece by hand\u2026"
      }
    },
    {
      "key": "proof",
      "type": "longtext",
      "label": {
        "vi": "\u0110\xE1nh gi\xE1 / kh\xE1ch h\xE0ng ti\xEAu bi\u1EC3u c\xF3 th\u1EADt",
        "en": "Real reviews / notable customers"
      },
      "placeholder": {
        "vi": "VD: D\xE1n \u0111\xE1nh gi\xE1 Google ho\u1EB7c Facebook k\xE8m t\xEAn kh\xE1ch",
        "en": "E.g. paste Google or Facebook reviews with the customer's name"
      }
    }
  ],
  "buildGuide": "Build a small brand website (one page with anchor navigation, or a few short pages when the content clearly needs them) that makes a local customer trust the business and contact it. Sections in order: (1) hero \u2014 the name, a one-line value proposition that is clear within about ten seconds, a visual, and \\"Nh\u1EAFn Zalo\\" / \\"G\u1ECDi ngay\\" buttons; (2) products or services as cards \u2014 name, price if given, \\"H\u1ECFi gi\xE1 / \u0110\u1EB7t h\xE0ng qua Zalo\\"; (3) story / about \u2014 who is behind the shop, in the founder's words; (4) proof \u2014 only real reviews with the reviewer's name, linked to their Google or Facebook source when given; (5) location and hours \u2014 address text, the Maps link and opening hours; (6) contact \u2014 Zalo, phone and Messenger links; (7) footer with the same name, address and phone (NAP) as everywhere else. Keep a sticky contact bar on phones. Follow Brand Profile's colours, voice and positioning when available. Use stock or generated imagery only as neutral backgrounds or illustrations, never as \\"our team\\", \\"our shop\\" or product photos. Add SEO basics: Vietnamese title and meta description, Open Graph tags and image, a favicon, and LocalBusiness structured data (name, address, phone, hours) that matches the page exactly.\\nShared rules: design at 360\u2013390 px first, single column, body text \u2265 16 px, buttons \u2265 44 px, a font with the Vietnamese subset (e.g. Be Vietnam Pro), lang=\\"vi\\", contrast \u2265 4.5:1, Vietnamese alt text; target LCP \u2264 2.5 s and CLS \u2264 0.1 (WebP images with width/height, lazy-load below the fold, no heavy libraries). Write warm, spoken Vietnamese at a simple reading level with full diacritics; prices like 199.000\u0111, dates dd/mm/yyyy, times 9h\u201321h. Contact links: Zalo https://zalo.me/84<number without the leading 0>, phone tel:+84<number> (shown grouped, 0912 345 678), Messenger https://m.me/<page>, maps https://www.google.com/maps/search/?api=1&query=<URL-encoded name + address>; click-test every one. Never invent prices, discounts, deadlines, stock, testimonials, customer counts, awards, certifications, press, history or odds: leave a section out when the founder gave no material, and use a neutral call to action (\\"Nh\u1EAFn Zalo \u0111\u1EC3 \u0111\u01B0\u1EE3c t\u01B0 v\u1EA5n\\") when a price is missing. Collect no personal data unless the founder asks; then only what is needed, with an unticked consent box stating the purpose and that deletion can be requested (Vietnam's Personal Data Protection Law 2025).",
  "changeIdeas": [
    {
      "vi": "Th\xEAm / s\u1EEDa s\u1EA3n ph\u1EA9m v\xE0 gi\xE1: ",
      "en": "Add or edit products and prices: "
    },
    {
      "vi": "\u0110\u1ED5i gi\u1EDD m\u1EDF c\u1EEDa / \u0111\u1ECBa ch\u1EC9: ",
      "en": "Update the opening hours / address: "
    },
    {
      "vi": "\u0110\u1ED5i s\u1ED1 \u0111i\u1EC7n tho\u1EA1i th\xE0nh ",
      "en": "Change the phone number to "
    },
    {
      "vi": "Th\xEAm \u0111\xE1nh gi\xE1 c\xF3 th\u1EADt c\u1EE7a kh\xE1ch: ",
      "en": "Add a real customer review: "
    },
    {
      "vi": "Th\xEAm m\u1EE5c c\xE2u chuy\u1EC7n c\u1EE7a shop: ",
      "en": "Add our story: "
    },
    {
      "vi": "\u0110\u1ED5i m\xE0u, ph\xF4ng ch\u1EEF theo logo: ",
      "en": "Match colours and fonts to my logo: "
    }
  ],
  "order": 2
}
`, "website-kind-game": `{
  "key": "game",
  "name": {
    "vi": "Game",
    "en": "Game"
  },
  "lead": {
    "vi": "Mini game cho kh\xE1ch ch\u01A1i v\xE0 chia s\u1EBB: quiz, v\xF2ng quay may m\u1EAFn, l\u1EADt th\u1EBB, c\xE0o th\u1EBB.",
    "en": "A mini game customers play and share: a quiz, a lucky wheel, flip cards, a scratch card."
  },
  "promise": {
    "vi": "M\u1ED9t game ch\u01A1i m\u01B0\u1EE3t tr\xEAn \u0111i\u1EC7n tho\u1EA1i, mang m\xE0u th\u01B0\u01A1ng hi\u1EC7u c\u1EE7a b\u1EA1n, ch\u01A1i xong kh\xE1ch \u0111\u01B0\u1EE3c m\u1EDDi nh\u1EAFn Zalo ho\u1EB7c gh\xE9 shop.",
    "en": "A smooth phone game in your brand colours that ends by inviting players to message you or visit."
  },
  "icon": "gamepad",
  "useBrandProfile": true,
  "products": {
    "max": 6,
    "label": {
      "vi": "S\u1EA3n ph\u1EA9m xu\u1EA5t hi\u1EC7n trong game (n\u1EBFu c\xF3)",
      "en": "Products in the game (optional)"
    },
    "hint": {
      "vi": "VD: m\u1ED7i k\u1EBFt qu\u1EA3 quiz g\u1EE3i \xFD m\u1ED9t m\xF3n, ho\u1EB7c \u1EA3nh s\u1EA3n ph\u1EA9m tr\xEAn th\u1EBB l\u1EADt.",
      "en": "E.g. each quiz result suggests one, or product photos on the cards."
    }
  },
  "fields": [
    {
      "key": "game",
      "type": "choice",
      "required": true,
      "label": {
        "vi": "B\u1EA1n mu\u1ED1n l\xE0m tr\xF2 ch\u01A1i g\xEC?",
        "en": "Which game?"
      },
      "placeholder": {
        "vi": "",
        "en": ""
      },
      "options": [
        {
          "value": "personality",
          "label": {
            "vi": "Quiz \u201CB\u1EA1n h\u1EE3p v\u1EDBi\u2026?\u201D",
            "en": "\u201CWhich one are you?\u201D quiz"
          }
        },
        {
          "value": "quiz",
          "label": {
            "vi": "Quiz ki\u1EBFn th\u1EE9c c\xF3 \u0111i\u1EC3m",
            "en": "Scored knowledge quiz"
          }
        },
        {
          "value": "wheel",
          "label": {
            "vi": "V\xF2ng quay may m\u1EAFn",
            "en": "Lucky wheel"
          }
        },
        {
          "value": "memory",
          "label": {
            "vi": "L\u1EADt th\u1EBB t\xECm c\u1EB7p",
            "en": "Memory flip cards"
          }
        },
        {
          "value": "scratch",
          "label": {
            "vi": "C\xE0o th\u1EBB",
            "en": "Scratch card"
          }
        }
      ]
    },
    {
      "key": "theme",
      "type": "longtext",
      "required": true,
      "label": {
        "vi": "Tr\xF2 ch\u01A1i v\u1EC1 ch\u1EE7 \u0111\u1EC1 g\xEC, c\u1EE7a shop n\xE0o?",
        "en": "What is it about, and for which shop?"
      },
      "placeholder": {
        "vi": "VD: \u201CB\u1EA1n h\u1EE3p v\u1EDBi lo\u1EA1i c\xE0 ph\xEA n\xE0o?\u201D c\u1EE7a qu\xE1n C\xE0 Ph\xEA Gi\xF3",
        "en": "E.g. \u201CWhich coffee are you?\u201D for Gi\xF3 Coffee"
      }
    },
    {
      "key": "reward",
      "type": "choice",
      "required": true,
      "label": {
        "vi": "Ng\u01B0\u1EDDi ch\u01A1i nh\u1EADn \u0111\u01B0\u1EE3c g\xEC?",
        "en": "What does the player get?"
      },
      "placeholder": {
        "vi": "",
        "en": ""
      },
      "options": [
        {
          "value": "fun",
          "label": {
            "vi": "Ch\u1EC9 \u0111\u1EC3 vui",
            "en": "Just for fun"
          }
        },
        {
          "value": "code",
          "label": {
            "vi": "M\xE3 gi\u1EA3m gi\xE1 cho m\u1ECDi ng\u01B0\u1EDDi ch\u01A1i",
            "en": "A discount code for every player"
          }
        },
        {
          "value": "prize",
          "label": {
            "vi": "Qu\xE0 th\u1EADt (c\xF3 may r\u1EE7i)",
            "en": "Real prizes (by chance)"
          }
        }
      ]
    },
    {
      "key": "rewardDetail",
      "type": "text",
      "label": {
        "vi": "M\xF4 t\u1EA3 ph\u1EA7n th\u01B0\u1EDFng (n\u1EBFu c\xF3)",
        "en": "The reward (if any)"
      },
      "placeholder": {
        "vi": "VD: M\xE3 gi\u1EA3m 10% cho l\u1EA7n mua ti\u1EBFp theo",
        "en": "E.g. 10% off the next purchase"
      }
    },
    {
      "key": "content",
      "type": "longtext",
      "label": {
        "vi": "C\xE2u h\u1ECFi ho\u1EB7c c\xE1c \xF4 tr\xEAn v\xF2ng quay (\u0111\u1EC3 tr\u1ED1ng th\xEC Codex so\u1EA1n, b\u1EA1n duy\u1EC7t l\u1EA1i)",
        "en": "Questions or wheel slices (leave empty and Codex drafts them for you to check)"
      },
      "placeholder": {
        "vi": "VD: \xD4 1: Gi\u1EA3m 5% \u2014 \xD4 2: Ch\xFAc may m\u1EAFn l\u1EA7n sau\u2026",
        "en": "E.g. Slice 1: 5% off \u2014 Slice 2: better luck next time\u2026"
      }
    },
    {
      "key": "leaderboard",
      "type": "choice",
      "label": {
        "vi": "C\xF3 b\u1EA3ng x\u1EBFp h\u1EA1ng kh\xF4ng? (ng\u01B0\u1EDDi ch\u01A1i t\u1EF1 \u0111\u1EB7t bi\u1EC7t danh)",
        "en": "Leaderboard? (players pick a nickname)"
      },
      "placeholder": {
        "vi": "",
        "en": ""
      },
      "options": [
        {
          "value": "no",
          "label": {
            "vi": "Kh\xF4ng",
            "en": "No"
          }
        },
        {
          "value": "yes",
          "label": {
            "vi": "C\xF3",
            "en": "Yes"
          }
        }
      ]
    },
    {
      "key": "contact",
      "type": "longtext",
      "required": true,
      "label": {
        "vi": "Kh\xE1ch li\xEAn h\u1EC7 b\u1EA1n qua \u0111\xE2u?",
        "en": "How do customers reach you?"
      },
      "placeholder": {
        "vi": "S\u1ED1 Zalo / \u0111i\u1EC7n tho\u1EA1i, trang Facebook\u2026 VD: Zalo 0912 345 678, fb.com/tiemgommoc",
        "en": "Zalo / phone number, Facebook page\u2026 e.g. Zalo 0912 345 678"
      }
    }
  ],
  "buildGuide": "Build one polished, phone-first mini game playable in under two minutes. Screens: (1) intro \u2014 title, one line on what the player gets, a big \\"Ch\u01A1i ngay\\" button; never put a form before the game; (2) the game; (3) result \u2014 the outcome or score, the code or reward if any, a share button (Web Share API with copy-link fallback), the founder's next step (Zalo, call or visit) and \\"Ch\u01A1i l\u1EA1i\\" for quizzes. Personality quiz: 4\u20136 one-tap questions mapping to 3\u20134 specific, flattering outcomes that each point to a real product. Knowledge quiz: 5\u201310 one-tap questions with a progress indicator, instant feedback and a one-line explanation; facts must be correct. When the founder gave no questions or slices, draft them from the theme and confirm them with growth_task_ask before publishing. Wheel and scratch: outcomes random with the real odds (slice size is not probability); a no-prize wheel may have \\"Ch\xFAc may m\u1EAFn l\u1EA7n sau\\". Rewards: \\"fun\\" = no reward; \\"code\\" = every player gets the same modest code (not a chance draw); \\"prize\\" = a chance promotion under Vietnam's Decree 81/2018 as amended by Decrees 128/2024 and 239/2026, so before publishing ask with growth_task_ask that the founder confirms they have handled the filing with their S\u1EDF C\xF4ng Th\u01B0\u01A1ng, the prize list with quantities or odds, and the end date; then publish posted rules (th\u1EC3 l\u1EC7: prizes, quantity, odds, time window, how to claim), decide outcomes on the server in the Worker, and never show \\"almost won\\". Memory: 6\u20138 pairs from the brand's products or simple icons, a timer and move counter. Storage in the site's D1 only as needed: plays(game_id, device_hash, result, score, nickname, created_at), prize codes when real; leaderboard = nickname + score only, length-capped and profanity-filtered. Anti-abuse: one play per device (local storage + device hash), Workers rate limiting, Turnstile for real prizes or leaderboards. Animations \u2264 3 s and respect prefers-reduced-motion; brand colours; no external game engines.\\nShared rules: design at 360\u2013390 px first, single column, body text \u2265 16 px, buttons \u2265 44 px, a font with the Vietnamese subset (e.g. Be Vietnam Pro), lang=\\"vi\\", contrast \u2265 4.5:1, Vietnamese alt text; target LCP \u2264 2.5 s and CLS \u2264 0.1 (WebP images with width/height, lazy-load below the fold, no heavy libraries). Write warm, spoken Vietnamese at a simple reading level with full diacritics; prices like 199.000\u0111, dates dd/mm/yyyy, times 9h\u201321h. Contact links: Zalo https://zalo.me/84<number without the leading 0>, phone tel:+84<number> (shown grouped, 0912 345 678), Messenger https://m.me/<page>, maps https://www.google.com/maps/search/?api=1&query=<URL-encoded name + address>; click-test every one. Never invent prices, discounts, deadlines, stock, testimonials, customer counts, awards, certifications, press, history or odds: leave a section out when the founder gave no material, and use a neutral call to action (\\"Nh\u1EAFn Zalo \u0111\u1EC3 \u0111\u01B0\u1EE3c t\u01B0 v\u1EA5n\\") when a price is missing. Collect no personal data unless the founder asks; then only what is needed, with an unticked consent box stating the purpose and that deletion can be requested (Vietnam's Personal Data Protection Law 2025).",
  "changeIdeas": [
    {
      "vi": "S\u1EEDa / th\xEAm c\xE2u h\u1ECFi: ",
      "en": "Edit or add questions: "
    },
    {
      "vi": "\u0110\u1ED5i ph\u1EA7n qu\xE0 v\xE0 t\u1EC9 l\u1EC7 tr\xFAng: ",
      "en": "Change prizes and odds: "
    },
    {
      "vi": "Th\xEAm b\u1EA3ng x\u1EBFp h\u1EA1ng",
      "en": "Add a leaderboard"
    },
    {
      "vi": "Cho m\u1ED7i ng\u01B0\u1EDDi ch\u01A1i 1 l\u1EA7n m\u1ED7i ng\xE0y",
      "en": "One play per person per day"
    },
    {
      "vi": "Th\xEAm n\xFAt chia s\u1EBB l\xEAn Facebook / Zalo",
      "en": "Add Facebook / Zalo share buttons"
    },
    {
      "vi": "\u0110\u1ED5i m\xE0u v\xE0 logo theo th\u01B0\u01A1ng hi\u1EC7u: ",
      "en": "Apply my brand colours and logo: "
    }
  ],
  "order": 1
}
`, "website-kind-landing": `{
  "key": "landing",
  "name": {
    "vi": "Landing page",
    "en": "Landing page"
  },
  "lead": {
    "vi": "M\u1ED9t trang \u0111\u1EC3 b\xE1n m\u1ED9t s\u1EA3n ph\u1EA9m, m\u1ED9t \u01B0u \u0111\xE3i hay m\u1EDDi \u0111\u0103ng k\xFD s\u1EF1 ki\u1EC7n.",
    "en": "One page to sell one product or offer, or to fill an event."
  },
  "promise": {
    "vi": "M\u1ED9t trang g\u1ECDn tr\xEAn \u0111i\u1EC7n tho\u1EA1i: \u01B0u \u0111\xE3i r\xF5 ngay \u0111\u1EA7u trang, kh\xE1ch \u0111\u01B0\u1EE3c g\xEC, chi ti\u1EBFt, c\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p v\xE0 n\xFAt nh\u1EAFn Zalo / g\u1ECDi lu\xF4n n\u1EB1m d\u01B0\u1EDBi tay.",
    "en": "A tight phone-first page: the offer up top, what customers get, the details, FAQs and a Zalo / call button always within reach."
  },
  "icon": "megaphone",
  "useBrandProfile": true,
  "products": {
    "max": 1,
    "label": {
      "vi": "S\u1EA3n ph\u1EA9m trong th\u01B0 vi\u1EC7n",
      "en": "Product from your library"
    },
    "hint": {
      "vi": "Ch\u1ECDn s\u1EA3n ph\u1EA9m \u0111\u1EC3 trang d\xF9ng \u0111\xFAng t\xEAn, gi\xE1 v\xE0 \u1EA3nh th\u1EADt.",
      "en": "Pick the product so the page uses its exact name, price and real photos."
    }
  },
  "fields": [
    {
      "key": "offer",
      "type": "longtext",
      "required": true,
      "label": {
        "vi": "B\u1EA1n mu\u1ED1n b\xE1n / gi\u1EDBi thi\u1EC7u g\xEC?",
        "en": "What are you selling or promoting?"
      },
      "placeholder": {
        "vi": "VD: Kho\xE1 h\u1ECDc l\xE0m b\xE1nh m\xEC 3 bu\u1ED5i cu\u1ED1i tu\u1EA7n",
        "en": "E.g. a 3-session weekend bread-making class"
      }
    },
    {
      "key": "benefits",
      "type": "longtext",
      "required": true,
      "label": {
        "vi": "Kh\xE1ch \u0111\u01B0\u1EE3c l\u1EE3i g\xEC khi mua?",
        "en": "What does the customer get out of it?"
      },
      "placeholder": {
        "vi": "VD: T\u1EF1 l\xE0m b\xE1nh m\xEC gi\xF2n t\u1EA1i nh\xE0 sau 3 bu\u1ED5i, c\xF3 c\xF4ng th\u1EE9c mang v\u1EC1",
        "en": "E.g. bake crusty bread at home after 3 sessions, recipes to take home"
      }
    },
    {
      "key": "price",
      "type": "text",
      "label": {
        "vi": "Gi\xE1 b\xE1n (v\xE0 gi\xE1 \u01B0u \u0111\xE3i n\u1EBFu c\xF3)",
        "en": "Price (and promo price, if any)"
      },
      "placeholder": {
        "vi": "VD: 590.000\u0111, \u01B0u \u0111\xE3i c\xF2n 450.000\u0111 \u0111\u1EBFn h\u1EBFt 31/10",
        "en": "E.g. 590,000\u0111, 450,000\u0111 until 31/10"
      }
    },
    {
      "key": "when",
      "type": "text",
      "label": {
        "vi": "Th\u1EDDi gian, \u0111\u1ECBa \u0111i\u1EC3m ho\u1EB7c h\u1EA1n ch\xF3t (n\u1EBFu c\xF3)",
        "en": "Date, place or deadline (if any)"
      },
      "placeholder": {
        "vi": "VD: S\xE1ng th\u1EE9 7, 9h\u201311h, 12 L\xFD T\u1EF1 Tr\u1ECDng, Q.1",
        "en": "E.g. Saturday 9\u201311am, 12 Ly Tu Trong, D.1"
      }
    },
    {
      "key": "proof",
      "type": "longtext",
      "label": {
        "vi": "B\u1EB1ng ch\u1EE9ng c\xF3 th\u1EADt (\u0111\xE1nh gi\xE1 kh\xE1ch, s\u1ED1 kh\xE1ch \u0111\xE3 mua, ch\u1EE9ng nh\u1EADn)",
        "en": "Real proof (reviews, customer count, certificates)"
      },
      "placeholder": {
        "vi": "VD: \u201CH\u01A1n 300 h\u1ECDc vi\xEAn t\u1EEB 2023\u201D \u2014 ch\u1EC9 ghi \u0111i\u1EC1u c\xF3 th\u1EADt",
        "en": "E.g. \u201C300+ students since 2023\u201D \u2014 only what is true"
      }
    },
    {
      "key": "action",
      "type": "choice",
      "label": {
        "vi": "Kh\xE1ch b\u1EA5m n\xFAt \u0111\u1EC3 l\xE0m g\xEC?",
        "en": "What does the button do?"
      },
      "placeholder": {
        "vi": "",
        "en": ""
      },
      "options": [
        {
          "value": "zalo",
          "label": {
            "vi": "Nh\u1EAFn Zalo",
            "en": "Message on Zalo"
          }
        },
        {
          "value": "call",
          "label": {
            "vi": "G\u1ECDi \u0111i\u1EC7n",
            "en": "Call"
          }
        },
        {
          "value": "messenger",
          "label": {
            "vi": "Nh\u1EAFn Messenger",
            "en": "Message on Messenger"
          }
        },
        {
          "value": "form",
          "label": {
            "vi": "\u0110\u1EC3 l\u1EA1i t\xEAn v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
            "en": "Leave name and phone"
          }
        }
      ]
    },
    {
      "key": "contact",
      "type": "longtext",
      "required": true,
      "label": {
        "vi": "Kh\xE1ch li\xEAn h\u1EC7 b\u1EA1n qua \u0111\xE2u?",
        "en": "How do customers reach you?"
      },
      "placeholder": {
        "vi": "S\u1ED1 Zalo / \u0111i\u1EC7n tho\u1EA1i, trang Facebook\u2026 VD: Zalo 0912 345 678, fb.com/tiemgommoc",
        "en": "Zalo / phone number, Facebook page\u2026 e.g. Zalo 0912 345 678"
      }
    }
  ],
  "buildGuide": "Build one single-page, phone-first conversion page about exactly one offer, with one goal and one primary action repeated, and no navigation menu. Sections in order: (1) hero \u2014 a headline that says the founder's offer in plain words (it should match the post or ad that sends traffic), one benefit sub-line, a visual and the primary button; (2) what you get \u2014 3\u20135 short benefit bullets from the founder's answers; (3) details \u2014 price, schedule, place, what is included, only as given; (4) proof \u2014 only the real proof the founder supplied, otherwise no proof section; (5) FAQ \u2014 3\u20134 items with answers the founder gave or neutral process answers (how to order, how to contact); (6) a final call to action repeating the hero action; (7) footer with shop name, phone and address. Pin a sticky bottom action bar on phones. The button does what the founder chose: Zalo, call, Messenger, or a form asking only name and phone (stored in the site's D1, with the consent box, a thank-you state and the founder told where to read submissions). A countdown appears only for a real deadline and never resets; no fake scarcity. No price given means the call to action is \\"Nh\u1EAFn Zalo \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1\\".\\nShared rules: design at 360\u2013390 px first, single column, body text \u2265 16 px, buttons \u2265 44 px, a font with the Vietnamese subset (e.g. Be Vietnam Pro), lang=\\"vi\\", contrast \u2265 4.5:1, Vietnamese alt text; target LCP \u2264 2.5 s and CLS \u2264 0.1 (WebP images with width/height, lazy-load below the fold, no heavy libraries). Write warm, spoken Vietnamese at a simple reading level with full diacritics; prices like 199.000\u0111, dates dd/mm/yyyy, times 9h\u201321h. Contact links: Zalo https://zalo.me/84<number without the leading 0>, phone tel:+84<number> (shown grouped, 0912 345 678), Messenger https://m.me/<page>, maps https://www.google.com/maps/search/?api=1&query=<URL-encoded name + address>; click-test every one. Never invent prices, discounts, deadlines, stock, testimonials, customer counts, awards, certifications, press, history or odds: leave a section out when the founder gave no material, and use a neutral call to action (\\"Nh\u1EAFn Zalo \u0111\u1EC3 \u0111\u01B0\u1EE3c t\u01B0 v\u1EA5n\\") when a price is missing. Collect no personal data unless the founder asks; then only what is needed, with an unticked consent box stating the purpose and that deletion can be requested (Vietnam's Personal Data Protection Law 2025).",
  "changeIdeas": [
    {
      "vi": "\u0110\u1ED5i ti\xEAu \u0111\u1EC1 cho h\u1EA5p d\u1EABn h\u01A1n: ",
      "en": "Make the headline more compelling: "
    },
    {
      "vi": "C\u1EADp nh\u1EADt gi\xE1 / \u01B0u \u0111\xE3i m\u1EDBi: ",
      "en": "Update the price / promotion: "
    },
    {
      "vi": "Gia h\u1EA1n \u01B0u \u0111\xE3i \u0111\u1EBFn ",
      "en": "Extend the offer until "
    },
    {
      "vi": "Th\xEAm \u0111\xE1nh gi\xE1 c\xF3 th\u1EADt c\u1EE7a kh\xE1ch: ",
      "en": "Add a real customer review: "
    },
    {
      "vi": "Th\xEAm c\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p: ",
      "en": "Add an FAQ: "
    },
    {
      "vi": "\u0110\u1ED5i m\xE0u theo logo c\u1EE7a shop: ",
      "en": "Match the colours to my logo: "
    }
  ],
  "order": 0
}
`, "website-sync": 'You are working for a solo founder in Kallob Growth Studio\'s Websites mini-app. Their websites are ChatGPT Sites: use the `sites` Codex plugin (its skill and the Sites connector tools) for everything; never host, build or publish a site any other way. This runs in the background: there is no visible preview to show and no browser tab to open, so skip preview handoff and open_in_codex, and still verify what you can.\nPhotos given as absolute file paths are the founder\'s real photos: copy them into the Site\'s assets (optimize to WebP, at most 1600 px wide), use each one for the product it belongs to, and never replace them with generated, stock or invented product images. Products from the founder\'s library come with their exact name, price and description: show them as given.\nBefore you need anything from the founder (a fact, a choice, a sign-in or a real-world step such as changing DNS at their registrar), call `growth_task_ask` (task_id {{taskIdJson}}) with one plain Vietnamese question and up to four short choices, then end your turn. Never guess phone numbers, addresses, prices, opening hours, names or claims.\n\nTASK: SYNC\nRead the founder\'s Sites without changing anything: call list_sites (follow the cursor until there are no more), then for each Site call get_site, list_custom_domains and list_site_versions. Do not create, edit, deploy, rename or delete anything.\n\nHOW TO REPORT (the only return channel; there is no result file)\nWhen you finish, or when the work cannot be done, call the `website_report` tool of the `kallob-growth` MCP server exactly once with:\n- task_id: {{taskIdJson}}\n- outcome: "done", or "failed" when the operation could not be completed;\n- message: one or two short, plain Vietnamese sentences for a founder who knows nothing about websites: what changed and where to see it, or why it failed and what they can do. No jargon (no "deploy", "commit", "DNS record" without explaining it), no IDs;\n- project_id: the Site this task created or changed, or null;\n- complete: true only when "sites" is the full list of the account\'s Sites;\n- sites: a fresh snapshot of every Site you touched (for a full sync, every Site), each built from Sites tool results you just read, never from memory:\n  {"project_id", "kind" ("landing" for a one-page offer or sign-up page, "game" for a mini game or quiz, "brand" for a site presenting a business, "other" for anything else; judge from the Site\'s title, description and content), "slug", "title", "description", "status", "access_mode", "live_url" (current_live_url), "preview_url" (current_preview_url), "screenshot_url" (copy the picture link exactly as Sites returned it, query string included: it is a short-lived image link, not a secret, and Studio keeps a copy of the picture), "latest_version_number", "live_version_number" (the version now serving at live_url when you know it, else null), "created_at", "updated_at",\n   "domains": from list_custom_domains, each {"hostname", "status", "ssl_status", "cname_target", "apex_ipv4_targets", "validation_records": [{"type", "name", "value"}], "last_error"},\n   "versions": from list_site_versions, newest first, at most 10, each {"id", "number", "screenshot_url", "created_at"}}\nCopy IDs exactly as Sites returned them. Never put source credentials, tokens, bypass tokens or passwords in the report, in files or in your messages.\nIf the tool returns an error, fix the payload and call it again. Then end your turn.\nFor this task "complete" is true, "project_id" is null, and "message" says how many websites the founder has.\n' } } };
export {
  websites_package_default as default
};
