import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/personal-brand/manifest.ts
var manifest = {
  id: "personal-brand",
  version: "1.2.0",
  requiresCore: ">=2.0.0 <3"
};

// src/mini-apps/personal-brand/release-notes.json
var release_notes_default = [
  {
    version: "1.2.0",
    vi: "Ch\u1EA1y tr\xEAn Growth Studio 0.21: \u0111\u01B0\u1EE3c c\xE0i c\xF9ng l\xFAc khi Growth Studio c\u1EADp nh\u1EADt, kh\xF4ng ph\u1EA3i ch\u1EDD t\u1EA3i th\xEAm.",
    en: "Runs on Growth Studio 0.21: installed together with Growth Studio updates, with no extra download afterwards."
  },
  {
    version: "1.1.0",
    vi: "Personal Brand gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Personal Brand is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/personal-brand/server/audit-service.ts
import path from "node:path";
import { randomUUID } from "node:crypto";

// src/mini-apps/personal-brand/contract.ts
var personalBrandValueTypes = ["knowledge", "information", "motivation", "connection", "direct_support"];
var personalBrandChannelIds = [
  "facebook",
  "zalo",
  "instagram",
  "tiktok",
  "youtube",
  "threads",
  "x",
  "linkedin"
];

// src/mini-apps/personal-brand/server/audit-service.ts
var APPLICATION_KEY = "personal-brand";
var PersonalBrandAuditService = class {
  constructor(store, codex, codexDesktop, prompts, projectRoot, reconcileResults) {
    this.store = store;
    this.codex = codex;
    this.codexDesktop = codexDesktop;
    this.prompts = prompts;
    this.projectRoot = projectRoot;
    this.reconcileResults = reconcileResults;
  }
  store;
  codex;
  codexDesktop;
  prompts;
  projectRoot;
  reconcileResults;
  async listAudits(input = {}) {
    await this.reconcileResults();
    return this.store.listPersonalBrandAudits(input);
  }
  async getAudit(id) {
    await this.reconcileResults();
    return this.store.getPersonalBrandAudit(id);
  }
  async createAudit(input, sourceUrl) {
    const channels = this.normalizeChannels(input.channels);
    if (this.store.listPersonalBrandAudits().items.some((audit2) => audit2.status === "queued" || audit2.status === "running")) {
      throw new Error("M\u1ED9t l\u1EA7n Audit hi\u1EC7n di\u1EC7n kh\xE1c \u0111ang ch\u1EA1y. H\xE3y ch\u1EDD l\u1EA7n \u0111\xF3 ho\xE0n t\u1EA5t.");
    }
    await this.prompts.assertApplication(APPLICATION_KEY);
    const id = randomUUID();
    const channelNames = channels.map((channel) => this.channelName(channel.id)).join(", ");
    const task = this.store.createTask({
      title: `Personal Brand \xB7 Audit hi\u1EC7n di\u1EC7n \xB7 ${channelNames}`.slice(0, 180),
      description: `Qu\xE9t l\u1EA1i ${channels.length} k\xEAnh c\xE1 nh\xE2n b\u1EB1ng tr\xECnh duy\u1EC7t IAB \u0111\xE3 \u0111\u0103ng nh\u1EADp.`,
      priority: "high",
      source: { type: "personal-brand-audit", referenceId: id, label: "Personal Brand \xB7 Audit hi\u1EC7n di\u1EC7n", evidence: channels.map((channel) => channel.profileUrl), affectedGroups: ["marketing"], personalBrandAuditId: id }
    });
    const audit = this.store.createPersonalBrandAudit({ id, taskId: task.id, channels });
    void this.dispatchAudit(audit.id, task.id, channels, sourceUrl);
    return { audit };
  }
  async dispatchAudit(auditId, taskId, channels, sourceUrl) {
    try {
      const resultPath = path.join(this.projectRoot, ".growth-studio", "task-results", `${taskId}.json`);
      const prompt = await this.prompts.application(APPLICATION_KEY, "presence-audit", {
        sourceUrl,
        channelsJson: JSON.stringify(channels.map((channel) => ({ channel: this.channelName(channel.id), profileUrl: channel.profileUrl })), null, 2),
        taskIdJson: taskId,
        resultTitleJson: `Audit hi\u1EC7n di\u1EC7n \xB7 ${new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(/* @__PURE__ */ new Date())}`,
        temporaryResultPathJson: `${resultPath}.tmp`,
        resultPathJson: resultPath
      });
      const receipt = await this.codexDesktop.dispatch(
        `growth-studio.task.${taskId}`,
        `Personal Brand \xB7 Audit hi\u1EC7n di\u1EC7n`,
        prompt.text + this.codex.studioChannel(taskId),
        this.projectRoot,
        { delivery: "foreground", browserUrl: channels[0].profileUrl }
      );
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, current.revision);
      this.store.markPersonalBrandAuditRunning(auditId);
      this.store.addEvent({ level: "success", eventType: "personal_brand.audit.started", title: "Personal Brand presence audit started", detail: `${channels.length} channels \xB7 supervised IAB` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { lastError: message }, current.revision);
      this.store.markPersonalBrandAuditFailed(auditId, message);
      this.store.addEvent({ level: "failed", eventType: "personal_brand.audit.failed", title: "Personal Brand presence audit failed", detail: message });
    }
  }
  normalizeChannels(input) {
    if (!Array.isArray(input) || input.length === 0) throw new Error("H\xE3y ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t k\xEAnh v\xE0 l\u01B0u \u0111\u01B0\u1EDDng d\u1EABn profile tr\u01B0\u1EDBc khi Audit.");
    const seen = /* @__PURE__ */ new Set();
    return input.map((candidate) => {
      const value = candidate && typeof candidate === "object" ? candidate : {};
      const id = String(value.id ?? "");
      if (!personalBrandChannelIds.includes(id) || seen.has(id)) throw new Error("Danh s\xE1ch k\xEAnh Audit kh\xF4ng h\u1EE3p l\u1EC7.");
      seen.add(id);
      const profileUrl = String(value.profileUrl ?? "").trim();
      let parsed;
      try {
        parsed = new URL(profileUrl);
      } catch {
        throw new Error(`\u0110\u01B0\u1EDDng d\u1EABn profile ${this.channelName(id)} kh\xF4ng h\u1EE3p l\u1EC7.`);
      }
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error(`\u0110\u01B0\u1EDDng d\u1EABn profile ${this.channelName(id)} ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng http:// ho\u1EB7c https://.`);
      return { id, profileUrl: parsed.toString() };
    });
  }
  channelName(id) {
    return id === "facebook" ? "Facebook" : id === "zalo" ? "Zalo" : id === "instagram" ? "Instagram" : id === "tiktok" ? "TikTok" : id === "youtube" ? "YouTube" : id === "threads" ? "Threads" : id === "x" ? "X" : "LinkedIn";
  }
};

// src/mini-apps/personal-brand/server/library-service.ts
import path2 from "node:path";
var APPLICATION_KEY2 = "personal-brand";
var PersonalBrandLibraryService = class {
  constructor(store, codex, codexDesktop, prompts, projectRoot) {
    this.store = store;
    this.codex = codex;
    this.codexDesktop = codexDesktop;
    this.prompts = prompts;
    this.projectRoot = projectRoot;
  }
  store;
  codex;
  codexDesktop;
  prompts;
  projectRoot;
  async createMaterial(input, sourceUrl) {
    await this.prompts.assertApplication(APPLICATION_KEY2);
    const material = this.store.createPersonalBrandMaterial(input);
    return this.queueAnalysis(material, sourceUrl);
  }
  async updateMaterial(id, input, expectedRevision, sourceUrl) {
    await this.prompts.assertApplication(APPLICATION_KEY2);
    const material = this.store.updatePersonalBrandMaterial(id, input, expectedRevision);
    return this.queueAnalysis(material, sourceUrl);
  }
  async retryMaterialAnalysis(materialId, taskId, sourceUrl) {
    await this.prompts.assertApplication(APPLICATION_KEY2);
    const material = this.store.getPersonalBrandMaterial(materialId);
    if (!material) throw new Error("Personal Brand material not found");
    const task = this.store.getTask(taskId);
    const source = task?.source;
    if (!task || source?.type !== "personal-brand-material" || source.personalBrandMaterialId !== materialId) {
      throw new Error("Personal Brand material task not found");
    }
    if (task.status !== "inbox" && task.status !== "active") throw new Error("Personal Brand material task cannot be retried");
    this.store.updateTask(taskId, { lastError: null }, task.revision);
    const dispatched = await this.dispatchMaterial(material, taskId, sourceUrl);
    if (dispatched.lastError) throw new Error(dispatched.lastError);
    return { material, taskId, startedAt: dispatched.codexAssignedAt ?? dispatched.updatedAt };
  }
  queueAnalysis(material, sourceUrl) {
    const task = this.store.createTask({
      title: `Personal Brand \xB7 B\xF3c t\xE1ch \xFD t\u01B0\u1EDFng \xB7 ${material.title}`.slice(0, 180),
      description: material.format === "research" ? `Nghi\xEAn c\u1EE9u v\xE0 t\u1EA1o Content Seeds: ${material.content}` : `Ph\xE2n t\xEDch t\u01B0 li\u1EC7u v\xE0 t\u1EA1o Content Seeds: ${material.title}`,
      priority: "medium",
      source: {
        type: "personal-brand-material",
        referenceId: `${material.id}:v${material.revision}`,
        label: "Personal Brand \xB7 B\xF3c t\xE1ch Content Seeds",
        evidence: material.sourceUrl ? [material.sourceUrl] : [],
        affectedGroups: ["marketing"],
        personalBrandMaterialId: material.id
      }
    });
    void this.dispatchMaterial(material, task.id, sourceUrl);
    return { material, taskId: task.id, startedAt: task.createdAt };
  }
  async dispatchMaterial(material, taskId, sourceUrl) {
    try {
      const resultPath = path2.join(this.projectRoot, ".growth-studio", "task-results", `${taskId}.json`);
      const prompt = await this.prompts.application(APPLICATION_KEY2, "material-seeds", {
        sourceUrl,
        taskIdJson: taskId,
        materialIdJson: material.id,
        resultTitleJson: `Content Seeds \xB7 ${material.title}`,
        materialTitle: material.title,
        materialOrigin: material.origin,
        materialType: material.format,
        materialSourceUrl: material.sourceUrl || "(kh\xF4ng c\xF3)",
        materialContent: material.content || "(kh\xF4ng c\xF3 tr\xEDch \u0111o\u1EA1n)",
        temporaryResultPathJson: `${resultPath}.tmp`,
        resultPathJson: resultPath
      });
      const beforeDispatch = this.store.getTask(taskId);
      const taskKey = beforeDispatch?.codexThreadId ? `kgs.pb.${taskId}.r${beforeDispatch.revision}` : `growth-studio.task.${taskId}`;
      const receipt = await this.codexDesktop.dispatch(
        taskKey,
        `Personal Brand \xB7 B\xF3c t\xE1ch Content Seeds`,
        prompt.text + this.codex.studioChannel(taskId),
        this.projectRoot,
        { openOnCreate: false }
      );
      const current = this.store.getTask(taskId);
      const dispatched = current ? this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, current.revision) : null;
      this.store.addEvent({ level: "success", eventType: "personal_brand.material.analysis_started", title: "Personal Brand material analysis started", detail: material.title });
      return dispatched ?? this.store.getTask(taskId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const current = this.store.getTask(taskId);
      const failed = current ? this.store.updateTask(taskId, { lastError: message }, current.revision) : null;
      this.store.addEvent({ level: "failed", eventType: "personal_brand.material.analysis_failed", title: "Personal Brand material analysis failed", detail: message });
      return failed ?? this.store.getTask(taskId);
    }
  }
};

// src/mini-apps/personal-brand/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS personal_brand_articles (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL UNIQUE REFERENCES tasks(id),
        title TEXT NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        idea TEXT NOT NULL,
        supporting_context TEXT NOT NULL DEFAULT '',
        core_message TEXT NOT NULL,
        angle_json TEXT NOT NULL,
        value_type TEXT NOT NULL CHECK (value_type IN ('knowledge', 'information', 'motivation', 'connection', 'direct_support')),
        audience TEXT NOT NULL DEFAULT '',
        channel TEXT NOT NULL,
        brand_context_snapshot_id TEXT,
        body TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'review', 'approved', 'failed')),
        version INTEGER NOT NULL DEFAULT 0,
        revision INTEGER NOT NULL DEFAULT 1,
        last_error TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT,
        approved_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS personal_brand_articles_listing_idx ON personal_brand_articles(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS personal_brand_article_versions (
        article_id TEXT NOT NULL REFERENCES personal_brand_articles(id) ON DELETE CASCADE,
        version INTEGER NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        body TEXT NOT NULL,
        action TEXT NOT NULL CHECK (action IN ('generate', 'edit', 'regenerate', 'migrate')),
        created_at TEXT NOT NULL,
        PRIMARY KEY(article_id, version)
      );
      CREATE TABLE IF NOT EXISTS personal_brand_materials (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        origin TEXT NOT NULL CHECK (origin IN ('own', 'reference')),
        format TEXT NOT NULL CHECK (format IN ('note', 'link', 'research')),
        source_url TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        note TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL CHECK (status IN ('inbox', 'ready', 'used')),
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS personal_brand_materials_listing_idx ON personal_brand_materials(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS personal_brand_material_versions (
        material_id TEXT NOT NULL REFERENCES personal_brand_materials(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('inbox', 'ready', 'used')),
        action TEXT NOT NULL CHECK (action IN ('create', 'update', 'transition', 'archive', 'restore')),
        created_at TEXT NOT NULL,
        PRIMARY KEY(material_id, revision)
      );
      CREATE TABLE IF NOT EXISTS personal_brand_seeds (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        idea TEXT NOT NULL,
        value_type TEXT CHECK (value_type IN ('knowledge', 'information', 'motivation', 'connection', 'direct_support')),
        audience TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL CHECK (status IN ('new', 'developing', 'used')),
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT,
        source_task_id TEXT,
        source_material_id TEXT
      );
      CREATE INDEX IF NOT EXISTS personal_brand_seeds_listing_idx ON personal_brand_seeds(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS personal_brand_seed_materials (
        seed_id TEXT NOT NULL REFERENCES personal_brand_seeds(id) ON DELETE CASCADE,
        material_id TEXT NOT NULL REFERENCES personal_brand_materials(id),
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY(seed_id, material_id)
      );
      CREATE INDEX IF NOT EXISTS personal_brand_seed_materials_material_idx ON personal_brand_seed_materials(material_id, seed_id);
      CREATE TABLE IF NOT EXISTS personal_brand_seed_versions (
        seed_id TEXT NOT NULL REFERENCES personal_brand_seeds(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('new', 'developing', 'used')),
        action TEXT NOT NULL CHECK (action IN ('create', 'update', 'transition', 'archive', 'restore')),
        created_at TEXT NOT NULL,
        PRIMARY KEY(seed_id, revision)
      );
      CREATE TABLE IF NOT EXISTS personal_brand_audits (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL UNIQUE REFERENCES tasks(id),
        title TEXT NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        channels_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
        report TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        last_error TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS personal_brand_audits_listing_idx ON personal_brand_audits(archived_at, status, updated_at DESC);
    `);
    migratePersonalBrandArticles(db);
    migratePersonalBrandLibrarySchema(db);
  }
};
var columns = (db, table) => new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));
function boundedText(value, field, limit, required = false) {
  if (value !== void 0 && typeof value !== "string") throw new Error(`${field} must be text`);
  const normalized = String(value ?? "").trim();
  if (normalized.length > limit) throw new Error(`${field} exceeds ${limit} characters`);
  if (required && !normalized) throw new Error(`${field} is required`);
  return normalized;
}
var quickContentObjectives = /* @__PURE__ */ new Set(["educate", "authority", "discussion", "conversion"]);
var quickContentStructures = /* @__PURE__ */ new Set(["automatic", "aida", "pas", "bab", "story", "list"]);
var quickContentLengths = /* @__PURE__ */ new Set(["short", "standard", "long"]);
function normalizeQuickContentAngles(input, quantity) {
  if (input === void 0) return [];
  if (!Array.isArray(input)) throw new Error("Quick Content selected angles must be an array");
  const angles = input.map((angle, index) => {
    const value = angle;
    return {
      id: boundedText(value.id, `Quick Content angle ${index + 1} ID`, 120, true),
      title: boundedText(value.title, `Quick Content angle ${index + 1} title`, 240, true),
      rationale: boundedText(value.rationale, `Quick Content angle ${index + 1} rationale`, 2e3, true),
      approach: boundedText(value.approach, `Quick Content angle ${index + 1} approach`, 2e3, true)
    };
  });
  if (angles.length && quantity !== void 0 && angles.length !== quantity) throw new Error(`Quick Content requires exactly ${quantity} selected angles`);
  if (new Set(angles.map((angle) => angle.id)).size !== angles.length || new Set(angles.map((angle) => angle.title.toLocaleLowerCase())).size !== angles.length) throw new Error("Quick Content selected angles must be distinct");
  return angles;
}
function normalizeQuickContentOptions(input) {
  const objective = boundedText(input.objective, "Quick Content objective", 40, true);
  const structure = boundedText(input.structure, "Quick Content structure", 40, true);
  const length = boundedText(input.length, "Quick Content length", 40, true);
  const quantity = Number(input.quantity);
  if (!quickContentObjectives.has(objective)) throw new Error("Unsupported Quick Content objective");
  if (!quickContentStructures.has(structure)) throw new Error("Unsupported Quick Content structure");
  if (!quickContentLengths.has(length)) throw new Error("Unsupported Quick Content length");
  if (quantity !== 1 && quantity !== 3 && quantity !== 5) throw new Error("Quick Content quantity must be 1, 3, or 5");
  return {
    audience: boundedText(input.audience, "Quick Content audience", 2e3, true),
    objective,
    channel: boundedText(input.channel, "Quick Content channel", 120, true),
    structure,
    length,
    tone: boundedText(input.tone, "Quick Content tone", 240, true),
    callToAction: boundedText(input.callToAction, "Quick Content call to action", 240),
    quantity,
    offerId: input.offerId ? boundedText(input.offerId, "Quick Content Offer ID", 80, true) : null
  };
}
function migratePersonalBrandArticles(db) {
  if (!columns(db, "quick_content_batches").has("source_app")) return;
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const rows = db.prepare(`
    SELECT b.*, d.id AS draft_id, d.angle, d.rationale, d.body, d.status AS draft_status,
           d.version AS draft_version, d.approved_at AS draft_approved_at
    FROM quick_content_batches b
    LEFT JOIN quick_content_drafts d ON d.batch_id = b.id AND d.archived_at IS NULL
    WHERE b.source_app = 'personal-brand'
    ORDER BY d.created_at, d.id
  `).all();
  const insertArticle = db.prepare(`INSERT OR IGNORE INTO personal_brand_articles
    (id, task_id, title, summary, idea, supporting_context, core_message, angle_json, value_type, audience, channel, brand_context_snapshot_id, body, status, version, revision, last_error, created_at, updated_at, completed_at, approved_at, archived_at)
    VALUES (?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)`);
  const insertVersion = db.prepare(`INSERT OR IGNORE INTO personal_brand_article_versions
    (article_id, version, title, summary, body, action, created_at) VALUES (?, ?, ?, '', ?, 'migrate', ?)`);
  for (const row of rows) {
    const options = normalizeQuickContentOptions(JSON.parse(row.options_json));
    const selected = normalizeQuickContentAngles(JSON.parse(row.angles_json || "[]"))[0];
    const angle = selected ?? { id: "angle-1", title: row.angle || row.title, rationale: row.rationale || "", approach: "" };
    const body = row.body || "";
    const version = body ? Number(row.draft_version ?? 1) : 0;
    const status = row.status === "failed" ? "failed" : row.status === "running" ? "running" : row.status === "queued" ? "queued" : row.draft_status === "approved" ? "approved" : "review";
    insertArticle.run(row.id, row.task_id, row.angle || row.title, row.idea, row.supporting_context, row.core_message, JSON.stringify(angle), row.value_type || "knowledge", options.audience, options.channel, row.brand_context_snapshot_id, body, status, version, row.last_error, row.created_at, row.updated_at, row.completed_at, row.draft_approved_at, row.archived_at);
    if (body) insertVersion.run(row.id, version, row.angle || row.title, body, row.updated_at || timestamp);
  }
}
function migratePersonalBrandLibrarySchema(db) {
  const materialSql = String(db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'personal_brand_materials'").get()?.sql ?? "");
  if (materialSql && !materialSql.includes("'research'")) {
    db.exec("PRAGMA foreign_keys = OFF");
    try {
      db.exec(`
        BEGIN IMMEDIATE;
        DROP INDEX IF EXISTS personal_brand_materials_listing_idx;
        CREATE TABLE personal_brand_materials_next (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          origin TEXT NOT NULL CHECK (origin IN ('own', 'reference')),
          format TEXT NOT NULL CHECK (format IN ('note', 'link', 'research')),
          source_url TEXT NOT NULL DEFAULT '',
          content TEXT NOT NULL DEFAULT '',
          note TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL CHECK (status IN ('inbox', 'ready', 'used')),
          revision INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          archived_at TEXT
        );
        INSERT INTO personal_brand_materials_next SELECT * FROM personal_brand_materials;
        DROP TABLE personal_brand_materials;
        ALTER TABLE personal_brand_materials_next RENAME TO personal_brand_materials;
        CREATE INDEX personal_brand_materials_listing_idx ON personal_brand_materials(archived_at, status, updated_at DESC);
        COMMIT;
      `);
    } catch (error) {
      try {
        db.exec("ROLLBACK");
      } catch {
      }
      throw error;
    } finally {
      db.exec("PRAGMA foreign_keys = ON");
    }
  }
  const seedColumns = new Set(db.prepare("PRAGMA table_info(personal_brand_seeds)").all().map((column) => column.name));
  if (!seedColumns.has("source_task_id")) db.exec("ALTER TABLE personal_brand_seeds ADD COLUMN source_task_id TEXT");
  if (!seedColumns.has("source_material_id")) db.exec("ALTER TABLE personal_brand_seeds ADD COLUMN source_material_id TEXT");
  db.exec("CREATE INDEX IF NOT EXISTS personal_brand_seeds_source_task_idx ON personal_brand_seeds(source_task_id)");
  const violations = db.prepare("PRAGMA foreign_key_check").all().filter((violation) => violation.table.startsWith("personal_brand_"));
  if (violations.length) throw new Error("Personal Brand library schema migration produced invalid references");
}

// src/mini-apps/personal-brand/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/personal-brand/server/store.ts
import { randomUUID as randomUUID2 } from "node:crypto";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
function boundedText2(value, field, limit, required = false) {
  if (value !== void 0 && typeof value !== "string") throw new Error(`${field} must be text`);
  const normalized = String(value ?? "").trim();
  if (normalized.length > limit) throw new Error(`${field} exceeds ${limit} characters`);
  if (required && !normalized) throw new Error(`${field} is required`);
  return normalized;
}
function boundedStringList(value, field, limit, itemLimit) {
  if (!Array.isArray(value) || value.length > limit) throw new Error(`${field} must be a list with at most ${limit} entries`);
  const normalized = value.map((item) => boundedText2(item, field, itemLimit, true));
  return [...new Set(normalized)];
}
function publicUrl(value, field) {
  const normalized = boundedText2(value, field, 2e3);
  if (!normalized) return "";
  let url;
  try {
    url = new URL(normalized);
  } catch {
    throw new Error(`${field} must be a valid public URL`);
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error(`${field} must use HTTP or HTTPS`);
  return url.toString();
}
var personalBrandArticleStatuses = /* @__PURE__ */ new Set(["queued", "running", "review", "approved", "failed"]);
var personalBrandValueTypes2 = /* @__PURE__ */ new Set(["knowledge", "information", "motivation", "connection", "direct_support"]);
var personalBrandMaterialOrigins = /* @__PURE__ */ new Set(["own", "reference"]);
var personalBrandMaterialFormats = /* @__PURE__ */ new Set(["note", "link", "research"]);
var personalBrandMaterialStatuses = /* @__PURE__ */ new Set(["inbox", "ready", "used"]);
var personalBrandSeedStatuses = /* @__PURE__ */ new Set(["new", "developing", "used"]);
function normalizePersonalBrandArticleAngle(input) {
  const angle = input && typeof input === "object" ? input : {};
  return {
    id: boundedText2(angle.id, "Personal Brand angle ID", 120, true),
    title: boundedText2(angle.title, "Personal Brand angle title", 240, true),
    rationale: boundedText2(angle.rationale, "Personal Brand angle rationale", 2e3, true),
    approach: boundedText2(angle.approach, "Personal Brand angle approach", 2e3, true)
  };
}
function normalizePersonalBrandArticleInput(input) {
  const valueType = input.valueType;
  if (!personalBrandValueTypes2.has(valueType)) throw new Error("Unsupported Personal Brand value type");
  return {
    idea: boundedText2(input.idea, "Personal Brand article idea", 8e3, true),
    supportingContext: boundedText2(input.supportingContext, "Personal Brand supporting context", 2e4),
    coreMessage: boundedText2(input.coreMessage, "Personal Brand core message", 3e3, true),
    angle: normalizePersonalBrandArticleAngle(input.angle),
    valueType,
    audience: boundedText2(input.audience, "Personal Brand audience", 2e3),
    channel: boundedText2(input.channel, "Personal Brand channel", 120, true)
  };
}
function normalizePersonalBrandMaterialInput(input) {
  const origin = String(input.origin ?? "");
  const format = String(input.format ?? "");
  if (!personalBrandMaterialOrigins.has(origin)) throw new Error("Unsupported Personal Brand material origin");
  if (!personalBrandMaterialFormats.has(format)) throw new Error("Unsupported Personal Brand material format");
  const sourceUrl = format === "link" ? publicUrl(input.sourceUrl, "Personal Brand material source URL") : "";
  const content = boundedText2(input.content, "Personal Brand material content", 12e4, format !== "link");
  if (format === "link" && !sourceUrl) throw new Error("Personal Brand link material needs a source URL");
  return {
    title: boundedText2(input.title, "Personal Brand material title", 220, true),
    origin,
    format,
    sourceUrl,
    content,
    note: boundedText2(input.note, "Personal Brand material note", 8e3)
  };
}
function normalizePersonalBrandSeedInput(input) {
  const rawValueType = input.valueType;
  const valueType = rawValueType === null || rawValueType === void 0 || rawValueType === "" ? null : rawValueType;
  if (valueType && !personalBrandValueTypes2.has(valueType)) throw new Error("Unsupported Personal Brand seed value type");
  return {
    title: boundedText2(input.title, "Personal Brand seed title", 220, true),
    idea: boundedText2(input.idea, "Personal Brand seed idea", 2e4, true),
    valueType,
    audience: boundedText2(input.audience, "Personal Brand seed audience", 3e3),
    materialIds: boundedStringList(input.materialIds ?? [], "Personal Brand seed material IDs", 100, 80)
  };
}
var PersonalBrandStore = class {
  constructor(db, ports) {
    this.db = db;
    this.tasks = ports.tasks;
    this.events = ports.events;
    this.results = ports.results;
  }
  db;
  tasks;
  events;
  results;
  toPersonalBrandArticle(row) {
    const status = personalBrandArticleStatuses.has(row.status) ? row.status : "failed";
    return {
      id: row.id,
      taskId: row.task_id,
      title: row.title,
      summary: row.summary,
      idea: row.idea,
      supportingContext: row.supporting_context,
      coreMessage: row.core_message,
      angle: normalizePersonalBrandArticleAngle(JSON.parse(row.angle_json)),
      valueType: personalBrandValueTypes2.has(row.value_type) ? row.value_type : "knowledge",
      audience: row.audience,
      channel: row.channel,
      brandContextSnapshotId: row.brand_context_snapshot_id,
      body: row.body,
      status,
      version: Number(row.version),
      revision: Number(row.revision),
      lastError: row.last_error,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
      approvedAt: row.approved_at,
      archivedAt: row.archived_at
    };
  }
  listPersonalBrandArticles(input = {}) {
    const where = [`archived_at IS ${input.archived ? "NOT " : ""}NULL`];
    const values = [];
    if (input.query?.trim()) {
      where.push("(title LIKE ? OR summary LIKE ? OR idea LIKE ? OR core_message LIKE ? OR channel LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern, pattern, pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM personal_brand_articles WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    return { items: rows.map((row) => this.toPersonalBrandArticle(row)), total: rows.length };
  }
  getPersonalBrandArticle(id) {
    const row = this.db.prepare("SELECT * FROM personal_brand_articles WHERE id = ?").get(id);
    if (!row) return null;
    const versions = this.db.prepare("SELECT version, title, summary, body, action, created_at FROM personal_brand_article_versions WHERE article_id = ? ORDER BY version DESC").all(id).map((version) => ({ version: Number(version.version), title: version.title, summary: version.summary, body: version.body, action: version.action, createdAt: version.created_at }));
    return { ...this.toPersonalBrandArticle(row), versions };
  }
  createPersonalBrandArticle(input) {
    const payload = normalizePersonalBrandArticleInput(input);
    if (!this.tasks.getTask(input.taskId)) throw new Error("Personal Brand article task not found");
    const timestamp = now();
    this.db.prepare(`INSERT INTO personal_brand_articles
      (id, task_id, title, summary, idea, supporting_context, core_message, angle_json, value_type, audience, channel, brand_context_snapshot_id, body, status, version, revision, created_at, updated_at)
      VALUES (?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, '', 'queued', 0, 1, ?, ?)`).run(input.id, input.taskId, payload.angle.title, payload.idea, payload.supportingContext, payload.coreMessage, JSON.stringify(payload.angle), payload.valueType, payload.audience, payload.channel, input.brandContextSnapshotId, timestamp, timestamp);
    return this.getPersonalBrandArticle(input.id);
  }
  markPersonalBrandArticleRunning(id) {
    const current = this.getPersonalBrandArticle(id);
    if (!current || current.archivedAt) throw new Error("Personal Brand article is unavailable");
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_articles SET status = 'running', last_error = NULL, revision = revision + 1, updated_at = ? WHERE id = ?").run(timestamp, id);
    return this.getPersonalBrandArticle(id);
  }
  markPersonalBrandArticleFailed(id, message) {
    const current = this.getPersonalBrandArticle(id);
    if (!current) throw new Error("Personal Brand article not found");
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_articles SET status = 'failed', last_error = ?, revision = revision + 1, updated_at = ? WHERE id = ?").run(boundedText2(message, "Personal Brand article error", 4e3, true), timestamp, id);
    return this.getPersonalBrandArticle(id);
  }
  applyPersonalBrandArticleResult(taskId, input) {
    const source = this.tasks.getTask(taskId)?.source;
    if (!source || source.type !== "personal-brand" || !source.personalBrandArticleId) throw new Error("Personal Brand result references an invalid task");
    const current = this.getPersonalBrandArticle(source.personalBrandArticleId);
    if (!current || current.archivedAt) throw new Error("Personal Brand result references an unavailable article");
    const title = boundedText2(input.title, "Personal Brand article title", 220, true);
    const summary = boundedText2(input.summary, "Personal Brand article summary", 3e3, true);
    const body = boundedText2(input.content, "Personal Brand article body", 75e4, true);
    if (current.title === title && current.summary === summary && current.body === body && ["review", "approved"].includes(current.status)) return { article: current, applied: false };
    const version = current.version + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("UPDATE personal_brand_articles SET title = ?, summary = ?, body = ?, status = 'review', version = ?, revision = revision + 1, last_error = NULL, completed_at = COALESCE(completed_at, ?), approved_at = NULL, updated_at = ? WHERE id = ? AND revision = ?").run(title, summary, body, version, timestamp, timestamp, current.id, current.revision);
      this.db.prepare("INSERT INTO personal_brand_article_versions (article_id, version, title, summary, body, action, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(current.id, version, title, summary, body, current.version ? "regenerate" : "generate", timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return { article: this.getPersonalBrandArticle(current.id), applied: true };
  }
  updatePersonalBrandArticle(id, input, expectedRevision) {
    const current = this.getPersonalBrandArticle(id);
    if (!current) throw new Error("Personal Brand article not found");
    if (current.archivedAt) throw new Error("Restore the article before editing it");
    if (!["review", "approved"].includes(current.status)) throw new Error("The article is not ready to edit");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand article changed since it was opened");
    const body = boundedText2(input.body, "Personal Brand article body", 75e4, true);
    if (body === current.body) throw new Error("Personal Brand article has no changes to save");
    const version = current.version + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("UPDATE personal_brand_articles SET body = ?, status = 'review', version = ?, revision = revision + 1, approved_at = NULL, updated_at = ? WHERE id = ? AND revision = ?").run(body, version, timestamp, id, expectedRevision);
      this.db.prepare("INSERT INTO personal_brand_article_versions (article_id, version, title, summary, body, action, created_at) VALUES (?, ?, ?, ?, ?, 'edit', ?)").run(id, version, current.title, current.summary, body, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "personal_brand.article.edited", title: "Personal Brand article edited", detail: `${current.title} \xB7 v${version}` });
    return this.getPersonalBrandArticle(id);
  }
  transitionPersonalBrandArticle(id, status, expectedRevision) {
    if (status !== "review" && status !== "approved") throw new Error("Unsupported Personal Brand article status");
    const current = this.getPersonalBrandArticle(id);
    if (!current) throw new Error("Personal Brand article not found");
    if (current.archivedAt) throw new Error("Restore the article before reviewing it");
    if (!current.body) throw new Error("The article has no draft to review");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand article changed since it was opened");
    if (current.status === status) throw new Error(`Personal Brand article is already ${status}`);
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_articles SET status = ?, approved_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(status, status === "approved" ? timestamp : null, timestamp, id, expectedRevision);
    this.events.addEvent({ level: "success", eventType: `personal_brand.article.${status}`, title: status === "approved" ? "Personal Brand article approved" : "Personal Brand article returned to review", detail: current.title });
    return this.getPersonalBrandArticle(id);
  }
  archivePersonalBrandArticle(id, expectedRevision, restore = false) {
    const current = this.getPersonalBrandArticle(id);
    if (!current) throw new Error("Personal Brand article not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand article changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Personal Brand article archive state changed since it was opened");
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_articles SET archived_at = ?, status = CASE WHEN ? THEN 'review' ELSE status END, approved_at = CASE WHEN ? THEN NULL ELSE approved_at END, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, restore ? 1 : 0, restore ? 1 : 0, timestamp, id, expectedRevision);
    this.events.addEvent({ level: "success", eventType: restore ? "personal_brand.article.restored" : "personal_brand.article.archived", title: restore ? "Personal Brand article restored" : "Personal Brand article archived", detail: current.title });
    return this.getPersonalBrandArticle(id);
  }
  personalBrandMaterialPayload(material) {
    return { title: material.title, origin: material.origin, format: material.format, sourceUrl: material.sourceUrl, content: material.content, note: material.note };
  }
  toPersonalBrandMaterial(row) {
    return {
      id: row.id,
      title: row.title,
      origin: personalBrandMaterialOrigins.has(row.origin) ? row.origin : "own",
      format: personalBrandMaterialFormats.has(row.format) ? row.format : "note",
      sourceUrl: row.source_url,
      content: row.content,
      note: row.note,
      status: personalBrandMaterialStatuses.has(row.status) ? row.status : "inbox",
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  listPersonalBrandMaterials(input = {}) {
    const where = [`archived_at IS ${input.archived ? "NOT " : ""}NULL`];
    const values = [];
    if (input.origin) {
      if (!personalBrandMaterialOrigins.has(input.origin)) throw new Error("Unsupported Personal Brand material origin");
      where.push("origin = ?");
      values.push(input.origin);
    }
    if (input.status) {
      if (!personalBrandMaterialStatuses.has(input.status)) throw new Error("Unsupported Personal Brand material status");
      where.push("status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      where.push("(title LIKE ? OR content LIKE ? OR note LIKE ? OR source_url LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern, pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM personal_brand_materials WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    return { items: rows.map((row) => this.toPersonalBrandMaterial(row)), total: rows.length };
  }
  /** The kernel's result of the latest analysis task of a material (its Codex report), if any. */
  materialAnalysis(materialId) {
    let latest = null;
    for (const task of this.tasks.findTasks({ sourceType: "personal-brand-material", limit: 1e4 })) {
      if (task.source.personalBrandMaterialId !== materialId) continue;
      const result = this.results.getResultByTaskId(task.id);
      if (result && (!latest || result.updatedAt > latest.updatedAt || result.updatedAt === latest.updatedAt && result.id > latest.id)) latest = result;
    }
    return latest;
  }
  getPersonalBrandMaterial(id) {
    const row = this.db.prepare("SELECT * FROM personal_brand_materials WHERE id = ?").get(id);
    if (!row) return null;
    const versions = this.db.prepare("SELECT revision, payload_json, status, action, created_at FROM personal_brand_material_versions WHERE material_id = ? ORDER BY revision DESC").all(id).map((version) => ({
      ...normalizePersonalBrandMaterialInput(JSON.parse(version.payload_json)),
      revision: Number(version.revision),
      status: personalBrandMaterialStatuses.has(version.status) ? version.status : "inbox",
      action: version.action,
      createdAt: version.created_at
    }));
    return { ...this.toPersonalBrandMaterial(row), versions, analysis: this.materialAnalysis(id) };
  }
  createPersonalBrandMaterial(input) {
    const payload = normalizePersonalBrandMaterialInput(input);
    const id = randomUUID2();
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare(`INSERT INTO personal_brand_materials (id, title, origin, format, source_url, content, note, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'inbox', 1, ?, ?)`).run(id, payload.title, payload.origin, payload.format, payload.sourceUrl, payload.content, payload.note, timestamp, timestamp);
      this.db.prepare(`INSERT INTO personal_brand_material_versions (material_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'inbox', 'create', ?)`).run(id, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "personal_brand.material.created", title: "Personal Brand material created", detail: payload.title });
    return this.getPersonalBrandMaterial(id);
  }
  updatePersonalBrandMaterial(id, input, expectedRevision) {
    const current = this.getPersonalBrandMaterial(id);
    if (!current) throw new Error("Personal Brand material not found");
    if (current.archivedAt) throw new Error("Restore the material before editing it");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand material changed since it was opened");
    const payload = normalizePersonalBrandMaterialInput({ ...this.personalBrandMaterialPayload(current), ...input });
    if (JSON.stringify(payload) === JSON.stringify(this.personalBrandMaterialPayload(current))) throw new Error("Personal Brand material has no changes to save");
    const revision = current.revision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare(`UPDATE personal_brand_materials SET title = ?, origin = ?, format = ?, source_url = ?, content = ?, note = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?`).run(payload.title, payload.origin, payload.format, payload.sourceUrl, payload.content, payload.note, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Personal Brand material changed since it was opened");
      this.db.prepare(`INSERT INTO personal_brand_material_versions (material_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'update', ?)`).run(id, revision, JSON.stringify(payload), current.status, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "personal_brand.material.updated", title: "Personal Brand material updated", detail: payload.title });
    return this.getPersonalBrandMaterial(id);
  }
  transitionPersonalBrandMaterial(id, status, expectedRevision) {
    if (!personalBrandMaterialStatuses.has(status)) throw new Error("Unsupported Personal Brand material status");
    const current = this.getPersonalBrandMaterial(id);
    if (!current) throw new Error("Personal Brand material not found");
    if (current.archivedAt) throw new Error("Restore the material before changing its status");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand material changed since it was opened");
    if (current.status === status) throw new Error(`Personal Brand material is already ${status}`);
    const revision = current.revision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE personal_brand_materials SET status = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(status, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Personal Brand material changed since it was opened");
      this.db.prepare(`INSERT INTO personal_brand_material_versions (material_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'transition', ?)`).run(id, revision, JSON.stringify(this.personalBrandMaterialPayload(current)), status, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getPersonalBrandMaterial(id);
  }
  archivePersonalBrandMaterial(id, expectedRevision, restore = false) {
    const current = this.getPersonalBrandMaterial(id);
    if (!current) throw new Error("Personal Brand material not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand material changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Personal Brand material archive state changed since it was opened");
    const revision = current.revision + 1;
    const timestamp = now();
    const action = restore ? "restore" : "archive";
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE personal_brand_materials SET archived_at = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Personal Brand material changed since it was opened");
      this.db.prepare("INSERT INTO personal_brand_material_versions (material_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(id, revision, JSON.stringify(this.personalBrandMaterialPayload(current)), current.status, action, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: restore ? "personal_brand.material.restored" : "personal_brand.material.archived", title: restore ? "Personal Brand material restored" : "Personal Brand material archived", detail: current.title });
    return this.getPersonalBrandMaterial(id);
  }
  personalBrandSeedMaterialIds(seedId) {
    return this.db.prepare("SELECT material_id FROM personal_brand_seed_materials WHERE seed_id = ? ORDER BY position, material_id").all(seedId).map((row) => row.material_id);
  }
  personalBrandSeedPayload(seed) {
    return { title: seed.title, idea: seed.idea, valueType: seed.valueType, audience: seed.audience, materialIds: [...seed.materialIds] };
  }
  assertPersonalBrandSeedMaterials(materialIds) {
    for (const materialId of materialIds) if (!this.getPersonalBrandMaterial(materialId)) throw new Error("Personal Brand seed references a missing material");
  }
  replacePersonalBrandSeedMaterials(seedId, materialIds) {
    this.db.prepare("DELETE FROM personal_brand_seed_materials WHERE seed_id = ?").run(seedId);
    const insert = this.db.prepare("INSERT INTO personal_brand_seed_materials (seed_id, material_id, position) VALUES (?, ?, ?)");
    materialIds.forEach((materialId, position) => insert.run(seedId, materialId, position));
  }
  toPersonalBrandSeed(row) {
    return {
      id: row.id,
      title: row.title,
      idea: row.idea,
      valueType: row.value_type && personalBrandValueTypes2.has(row.value_type) ? row.value_type : null,
      audience: row.audience,
      materialIds: this.personalBrandSeedMaterialIds(row.id),
      status: personalBrandSeedStatuses.has(row.status) ? row.status : "new",
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at,
      sourceTaskId: row.source_task_id,
      sourceMaterialId: row.source_material_id
    };
  }
  listPersonalBrandSeeds(input = {}) {
    const where = [`archived_at IS ${input.archived ? "NOT " : ""}NULL`];
    const values = [];
    if (input.status) {
      if (!personalBrandSeedStatuses.has(input.status)) throw new Error("Unsupported Personal Brand seed status");
      where.push("status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      where.push("(title LIKE ? OR idea LIKE ? OR audience LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM personal_brand_seeds WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    return { items: rows.map((row) => this.toPersonalBrandSeed(row)), total: rows.length };
  }
  getPersonalBrandSeed(id) {
    const row = this.db.prepare("SELECT * FROM personal_brand_seeds WHERE id = ?").get(id);
    if (!row) return null;
    const versions = this.db.prepare("SELECT revision, payload_json, status, action, created_at FROM personal_brand_seed_versions WHERE seed_id = ? ORDER BY revision DESC").all(id).map((version) => ({
      ...normalizePersonalBrandSeedInput(JSON.parse(version.payload_json)),
      revision: Number(version.revision),
      status: personalBrandSeedStatuses.has(version.status) ? version.status : "new",
      action: version.action,
      createdAt: version.created_at
    }));
    return { ...this.toPersonalBrandSeed(row), versions };
  }
  createPersonalBrandSeed(input) {
    const payload = normalizePersonalBrandSeedInput(input);
    this.assertPersonalBrandSeedMaterials(payload.materialIds);
    const id = randomUUID2();
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare(`INSERT INTO personal_brand_seeds (id, title, idea, value_type, audience, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'new', 1, ?, ?)`).run(id, payload.title, payload.idea, payload.valueType, payload.audience, timestamp, timestamp);
      this.replacePersonalBrandSeedMaterials(id, payload.materialIds);
      this.db.prepare(`INSERT INTO personal_brand_seed_versions (seed_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'new', 'create', ?)`).run(id, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "personal_brand.seed.created", title: "Personal Brand content seed created", detail: payload.title });
    return this.getPersonalBrandSeed(id);
  }
  applyPersonalBrandMaterialSeedResult(taskId, input) {
    const source = this.tasks.getTask(taskId)?.source;
    if (!source || source.type !== "personal-brand-material" || !source.personalBrandMaterialId) throw new Error("Personal Brand material result references an invalid task");
    if (input.schemaVersion !== "personal-brand-material-seeds-v1" || input.materialId !== source.personalBrandMaterialId) throw new Error("Personal Brand material result has an invalid envelope");
    const material = this.getPersonalBrandMaterial(input.materialId);
    if (!material) throw new Error("Personal Brand material result references a missing material");
    const existingRows = this.db.prepare("SELECT * FROM personal_brand_seeds WHERE source_task_id = ? ORDER BY created_at, id").all(taskId);
    if (existingRows.length) return { seeds: existingRows.map((row) => this.getPersonalBrandSeed(row.id)), applied: false };
    if (!Array.isArray(input.seeds) || input.seeds.length < 1 || input.seeds.length > 8) throw new Error("Personal Brand material result must include 1 to 8 Content Seeds");
    const payloads = input.seeds.map((seed) => normalizePersonalBrandSeedInput({ ...seed, materialIds: [material.id] }));
    if (new Set(payloads.map((seed) => seed.title.toLocaleLowerCase())).size !== payloads.length) throw new Error("Personal Brand material result contains duplicate Content Seed titles");
    const timestamp = now();
    const ids = payloads.map(() => randomUUID2());
    this.db.exec("BEGIN IMMEDIATE");
    try {
      payloads.forEach((payload, index) => {
        const id = ids[index];
        this.db.prepare(`INSERT INTO personal_brand_seeds (id, title, idea, value_type, audience, status, revision, created_at, updated_at, source_task_id, source_material_id) VALUES (?, ?, ?, ?, ?, 'new', 1, ?, ?, ?, ?)`).run(id, payload.title, payload.idea, payload.valueType, payload.audience, timestamp, timestamp, taskId, material.id);
        this.replacePersonalBrandSeedMaterials(id, payload.materialIds);
        this.db.prepare(`INSERT INTO personal_brand_seed_versions (seed_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'new', 'create', ?)`).run(id, JSON.stringify(payload), timestamp);
      });
      if (material.status === "inbox") {
        const revision = material.revision + 1;
        const changed = this.db.prepare("UPDATE personal_brand_materials SET status = 'ready', revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(revision, timestamp, material.id, material.revision);
        if (!changed.changes) throw new Error("Personal Brand material changed while its analysis was being imported");
        this.db.prepare(`INSERT INTO personal_brand_material_versions (material_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, 'ready', 'transition', ?)`).run(material.id, revision, JSON.stringify(this.personalBrandMaterialPayload(material)), timestamp);
      }
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return { seeds: ids.map((id) => this.getPersonalBrandSeed(id)), applied: true };
  }
  updatePersonalBrandSeed(id, input, expectedRevision) {
    const current = this.getPersonalBrandSeed(id);
    if (!current) throw new Error("Personal Brand seed not found");
    if (current.archivedAt) throw new Error("Restore the seed before editing it");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand seed changed since it was opened");
    const payload = normalizePersonalBrandSeedInput({ ...this.personalBrandSeedPayload(current), ...input });
    this.assertPersonalBrandSeedMaterials(payload.materialIds);
    if (JSON.stringify(payload) === JSON.stringify(this.personalBrandSeedPayload(current))) throw new Error("Personal Brand seed has no changes to save");
    const revision = current.revision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE personal_brand_seeds SET title = ?, idea = ?, value_type = ?, audience = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(payload.title, payload.idea, payload.valueType, payload.audience, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Personal Brand seed changed since it was opened");
      this.replacePersonalBrandSeedMaterials(id, payload.materialIds);
      this.db.prepare(`INSERT INTO personal_brand_seed_versions (seed_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'update', ?)`).run(id, revision, JSON.stringify(payload), current.status, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "personal_brand.seed.updated", title: "Personal Brand content seed updated", detail: payload.title });
    return this.getPersonalBrandSeed(id);
  }
  transitionPersonalBrandSeed(id, status, expectedRevision) {
    if (!personalBrandSeedStatuses.has(status)) throw new Error("Unsupported Personal Brand seed status");
    const current = this.getPersonalBrandSeed(id);
    if (!current) throw new Error("Personal Brand seed not found");
    if (current.archivedAt) throw new Error("Restore the seed before changing its status");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand seed changed since it was opened");
    if (current.status === status) throw new Error(`Personal Brand seed is already ${status}`);
    const revision = current.revision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE personal_brand_seeds SET status = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(status, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Personal Brand seed changed since it was opened");
      this.db.prepare(`INSERT INTO personal_brand_seed_versions (seed_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'transition', ?)`).run(id, revision, JSON.stringify(this.personalBrandSeedPayload(current)), status, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getPersonalBrandSeed(id);
  }
  archivePersonalBrandSeed(id, expectedRevision, restore = false) {
    const current = this.getPersonalBrandSeed(id);
    if (!current) throw new Error("Personal Brand seed not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand seed changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Personal Brand seed archive state changed since it was opened");
    const revision = current.revision + 1;
    const timestamp = now();
    const action = restore ? "restore" : "archive";
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE personal_brand_seeds SET archived_at = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Personal Brand seed changed since it was opened");
      this.db.prepare("INSERT INTO personal_brand_seed_versions (seed_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(id, revision, JSON.stringify(this.personalBrandSeedPayload(current)), current.status, action, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: restore ? "personal_brand.seed.restored" : "personal_brand.seed.archived", title: restore ? "Personal Brand content seed restored" : "Personal Brand content seed archived", detail: current.title });
    return this.getPersonalBrandSeed(id);
  }
  toPersonalBrandAudit(row) {
    let channels = [];
    try {
      channels = JSON.parse(row.channels_json);
    } catch {
      channels = [];
    }
    const status = ["queued", "running", "completed", "failed"].includes(row.status) ? row.status : "failed";
    return {
      id: row.id,
      taskId: row.task_id,
      title: row.title,
      summary: row.summary,
      channels,
      status,
      report: row.report,
      revision: Number(row.revision),
      lastError: row.last_error,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
      archivedAt: row.archived_at
    };
  }
  listPersonalBrandAudits(input = {}) {
    const where = [`archived_at IS ${input.archived ? "NOT " : ""}NULL`];
    const values = [];
    if (input.query?.trim()) {
      where.push("(title LIKE ? OR summary LIKE ? OR channels_json LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM personal_brand_audits WHERE ${where.join(" AND ")} ORDER BY created_at DESC, id LIMIT ?`).all(...values, limit);
    return { items: rows.map((row) => this.toPersonalBrandAudit(row)), total: rows.length };
  }
  getPersonalBrandAudit(id) {
    const row = this.db.prepare("SELECT * FROM personal_brand_audits WHERE id = ?").get(id);
    return row ? this.toPersonalBrandAudit(row) : null;
  }
  createPersonalBrandAudit(input) {
    if (!this.tasks.getTask(input.taskId)) throw new Error("Personal Brand audit task not found");
    if (!input.channels.length) throw new Error("Personal Brand audit needs at least one channel");
    const timestamp = now();
    const title = `Audit hi\u1EC7n di\u1EC7n \xB7 ${new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(timestamp))}`;
    this.db.prepare(`INSERT INTO personal_brand_audits
      (id, task_id, title, summary, channels_json, status, report, revision, created_at, updated_at)
      VALUES (?, ?, ?, '', ?, 'queued', '', 1, ?, ?)`).run(input.id, input.taskId, title, JSON.stringify(input.channels), timestamp, timestamp);
    return this.getPersonalBrandAudit(input.id);
  }
  markPersonalBrandAuditRunning(id) {
    const current = this.getPersonalBrandAudit(id);
    if (!current || current.archivedAt) throw new Error("Personal Brand audit is unavailable");
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_audits SET status = 'running', last_error = NULL, revision = revision + 1, updated_at = ? WHERE id = ?").run(timestamp, id);
    return this.getPersonalBrandAudit(id);
  }
  markPersonalBrandAuditFailed(id, message) {
    const current = this.getPersonalBrandAudit(id);
    if (!current) throw new Error("Personal Brand audit not found");
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_audits SET status = 'failed', last_error = ?, revision = revision + 1, updated_at = ? WHERE id = ?").run(boundedText2(message, "Personal Brand audit error", 4e3, true), timestamp, id);
    return this.getPersonalBrandAudit(id);
  }
  applyPersonalBrandAuditResult(taskId, input) {
    const source = this.tasks.getTask(taskId)?.source;
    if (!source || source.type !== "personal-brand-audit" || !source.personalBrandAuditId) throw new Error("Personal Brand audit result references an invalid task");
    const current = this.getPersonalBrandAudit(source.personalBrandAuditId);
    if (!current) throw new Error("Personal Brand audit result references a missing audit");
    const title = boundedText2(input.title, "Personal Brand audit title", 220, true);
    const summary = boundedText2(input.summary, "Personal Brand audit summary", 5e3, true);
    const report = boundedText2(input.content, "Personal Brand audit report", 1e6, true);
    if (current.title === title && current.summary === summary && current.report === report && current.status === "completed") return { audit: current, applied: false };
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_audits SET title = ?, summary = ?, report = ?, status = 'completed', last_error = NULL, completed_at = COALESCE(completed_at, ?), revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(title, summary, report, timestamp, timestamp, current.id, current.revision);
    return { audit: this.getPersonalBrandAudit(current.id), applied: true };
  }
  archivePersonalBrandAudit(id, expectedRevision, restore = false) {
    const current = this.getPersonalBrandAudit(id);
    if (!current) throw new Error("Personal Brand audit not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Personal Brand audit changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Personal Brand audit archive state changed since it was opened");
    if (!restore && (current.status === "queued" || current.status === "running")) throw new Error("H\xE3y ch\u1EDD Audit ho\xE0n t\u1EA5t tr\u01B0\u1EDBc khi l\u01B0u tr\u1EEF.");
    const timestamp = now();
    this.db.prepare("UPDATE personal_brand_audits SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    this.events.addEvent({ level: "success", eventType: restore ? "personal_brand.audit.restored" : "personal_brand.audit.archived", title: restore ? "Personal Brand audit restored" : "Personal Brand audit archived", detail: current.title });
    return this.getPersonalBrandAudit(id);
  }
};

// src/mini-apps/personal-brand/server/repository.ts
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.3" };
function createPersonalBrandRepository(sdk) {
  const brand = () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range);
  return Object.assign(new PersonalBrandStore(sdk.db, { tasks: sdk.tasks, events: sdk.events, results: sdk.results }), {
    createTask: (input) => sdk.tasks.createTask(input),
    getTask: (id) => sdk.tasks.getTask(id),
    updateTask: (...args) => sdk.tasks.updateTask(...args),
    addEvent: (input) => sdk.events.addEvent(input),
    getBrandProfile: () => brand()?.profile() ?? null,
    /** Null while Brand Profile is not running. */
    createBrandContextSnapshot: () => brand()?.createContextSnapshot() ?? null,
    getBrandContextSnapshot: (id) => brand()?.contextSnapshot(id) ?? null
  });
}

// src/mini-apps/personal-brand/server/routes.ts
function createPersonalBrandArticleRouter({ service, audits, library, port, router }) {
  router.post("/api/personal-brand/article-plans", (request, response, next) => {
    void service.createPlan(request.body ?? {}).then((value) => response.status(202).json(value)).catch(next);
  });
  router.get("/api/personal-brand/article-plans/:id", (request, response, next) => {
    void service.getPlan(request.params.id).then((value) => response.json(value)).catch(next);
  });
  router.get("/api/personal-brand/articles", (request, response, next) => {
    void service.listArticles({ query: String(request.query.q ?? ""), archived: request.query.archived === "1" }).then((value) => response.json(value)).catch(next);
  });
  router.get("/api/personal-brand/articles/:id", (request, response, next) => {
    void service.getArticle(request.params.id).then((value) => value ? response.json(value) : response.status(404).json({ error: "Personal Brand article not found" })).catch(next);
  });
  router.post("/api/personal-brand/articles", (request, response, next) => {
    void service.createArticle(request.body ?? {}, `http://127.0.0.1:${port}/mini-apps/personal-brand/content`).then((value) => response.status(201).json(value)).catch(next);
  });
  router.patch("/api/personal-brand/articles/:id", (request, response, next) => {
    try {
      response.json(service.store.updatePersonalBrandArticle(request.params.id, { body: request.body?.body }, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/articles/:id/transition", (request, response, next) => {
    try {
      response.json(service.store.transitionPersonalBrandArticle(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/articles/:id/archive", (request, response, next) => {
    try {
      response.json(service.store.archivePersonalBrandArticle(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/articles/:id/restore", (request, response, next) => {
    try {
      response.json(service.store.archivePersonalBrandArticle(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/personal-brand/materials", (request, response, next) => {
    try {
      response.json(library.store.listPersonalBrandMaterials({ query: String(request.query.q ?? ""), archived: request.query.archived === "1", origin: request.query.origin ? String(request.query.origin) : void 0, status: request.query.status ? String(request.query.status) : void 0 }));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/personal-brand/materials/:id", (request, response, next) => {
    try {
      const value = library.store.getPersonalBrandMaterial(request.params.id);
      value ? response.json(value) : response.status(404).json({ error: "Personal Brand material not found" });
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/materials", (request, response, next) => {
    void library.createMaterial(request.body ?? {}, `http://127.0.0.1:${port}/mini-apps/personal-brand/materials`).then((value) => response.status(202).json(value)).catch(next);
  });
  router.patch("/api/personal-brand/materials/:id", (request, response, next) => {
    void library.updateMaterial(request.params.id, request.body ?? {}, request.body?.revision, `http://127.0.0.1:${port}/mini-apps/personal-brand/materials`).then((value) => response.status(202).json(value)).catch(next);
  });
  router.post("/api/personal-brand/materials/:id/analysis/retry", (request, response, next) => {
    void library.retryMaterialAnalysis(request.params.id, String(request.body?.taskId ?? ""), `http://127.0.0.1:${port}/mini-apps/personal-brand/materials`).then((value) => response.status(202).json(value)).catch(next);
  });
  router.post("/api/personal-brand/materials/:id/transition", (request, response, next) => {
    try {
      response.json(library.store.transitionPersonalBrandMaterial(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/materials/:id/archive", (request, response, next) => {
    try {
      response.json(library.store.archivePersonalBrandMaterial(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/materials/:id/restore", (request, response, next) => {
    try {
      response.json(library.store.archivePersonalBrandMaterial(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/personal-brand/seeds", (request, response, next) => {
    try {
      response.json(library.store.listPersonalBrandSeeds({ query: String(request.query.q ?? ""), archived: request.query.archived === "1", status: request.query.status ? String(request.query.status) : void 0 }));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/personal-brand/seeds/:id", (request, response, next) => {
    try {
      const value = library.store.getPersonalBrandSeed(request.params.id);
      value ? response.json(value) : response.status(404).json({ error: "Personal Brand seed not found" });
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/seeds", (request, response, next) => {
    try {
      response.status(201).json(library.store.createPersonalBrandSeed(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/personal-brand/seeds/:id", (request, response, next) => {
    try {
      response.json(library.store.updatePersonalBrandSeed(request.params.id, request.body ?? {}, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/seeds/:id/transition", (request, response, next) => {
    try {
      response.json(library.store.transitionPersonalBrandSeed(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/seeds/:id/archive", (request, response, next) => {
    try {
      response.json(library.store.archivePersonalBrandSeed(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/seeds/:id/restore", (request, response, next) => {
    try {
      response.json(library.store.archivePersonalBrandSeed(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/personal-brand/audits", (request, response, next) => {
    void audits.listAudits({ query: String(request.query.q ?? ""), archived: request.query.archived === "1" }).then((value) => response.json(value)).catch(next);
  });
  router.get("/api/personal-brand/audits/:id", (request, response, next) => {
    void audits.getAudit(request.params.id).then((value) => value ? response.json(value) : response.status(404).json({ error: "Personal Brand audit not found" })).catch(next);
  });
  router.post("/api/personal-brand/audits", (request, response, next) => {
    void audits.createAudit(request.body ?? {}, `http://127.0.0.1:${port}/mini-apps/personal-brand/audits`).then((value) => response.status(201).json(value)).catch(next);
  });
  router.post("/api/personal-brand/audits/:id/archive", (request, response, next) => {
    try {
      response.json(audits.store.archivePersonalBrandAudit(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/personal-brand/audits/:id/restore", (request, response, next) => {
    try {
      response.json(audits.store.archivePersonalBrandAudit(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/personal-brand/server/service.ts
import fs from "node:fs/promises";
import path3 from "node:path";
import { randomUUID as randomUUID3 } from "node:crypto";
var APPLICATION_KEY3 = "personal-brand";
var PLAN_FAILURE = "Codex ch\u01B0a t\u1EA1o \u0111\u01B0\u1EE3c h\u01B0\u1EDBng vi\u1EBFt h\u1EE3p l\u1EC7. H\xE3y th\u1EED l\u1EA1i.";
var PersonalBrandArticleService = class {
  constructor(store, codex, codexDesktop, prompts, projectRoot, reconcileResults) {
    this.store = store;
    this.codex = codex;
    this.codexDesktop = codexDesktop;
    this.prompts = prompts;
    this.projectRoot = projectRoot;
    this.reconcileResults = reconcileResults;
  }
  store;
  codex;
  codexDesktop;
  prompts;
  projectRoot;
  reconcileResults;
  async listArticles(input = {}) {
    await this.reconcileResults();
    return this.store.listPersonalBrandArticles(input);
  }
  async getArticle(id) {
    await this.reconcileResults();
    return this.store.getPersonalBrandArticle(id);
  }
  async createPlan(input) {
    const idea = this.text(input.idea, "Nguy\xEAn li\u1EC7u ch\xEDnh", 8e3, true);
    const supportingContext = this.text(input.supportingContext, "Th\xF4ng tin th\xEAm", 2e4);
    const audience = this.text(input.audience, "Ng\u01B0\u1EDDi \u0111\u1ECDc", 2e3);
    const channel = this.text(input.channel, "K\xEAnh", 120, true);
    const valueType = String(input.valueType ?? "");
    if (!personalBrandValueTypes.includes(valueType)) throw new Error("H\xE3y ch\u1ECDn m\u1ED9t lo\u1EA1i gi\xE1 tr\u1ECB h\u1EE3p l\u1EC7.");
    await this.prompts.assertApplication(APPLICATION_KEY3);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const state = { id: randomUUID3(), idea, supportingContext, audience, channel, valueType, coreMessage: "", angles: [], status: "queued", error: null, createdAt: timestamp, updatedAt: timestamp };
    await this.writePlan(state);
    void this.dispatchPlan(state);
    return this.publicPlan(state);
  }
  async getPlan(id) {
    if (!/^[a-f0-9-]{36}$/i.test(id)) throw new Error("Kh\xF4ng t\xECm th\u1EA5y h\u01B0\u1EDBng vi\u1EBFt.");
    const state = await this.readJson(this.planPaths(id).state);
    if (!state) throw new Error("Kh\xF4ng t\xECm th\u1EA5y h\u01B0\u1EDBng vi\u1EBFt.");
    if (state.status === "failed") return this.publicPlan(state);
    const result = await this.readJson(this.planPaths(id).result);
    if (result) return this.acceptPlan(state, result);
    if (state.status === "running" && state.codexThreadId && this.codexDesktop.isRunning && !this.codexDesktop.isRunning(state.codexThreadId)) {
      return this.acceptPlan(state, null);
    }
    return this.publicPlan(state);
  }
  async createArticle(input, sourceUrl) {
    const valueType = String(input.valueType ?? "");
    if (!personalBrandValueTypes.includes(valueType)) throw new Error("H\xE3y ch\u1ECDn m\u1ED9t lo\u1EA1i gi\xE1 tr\u1ECB h\u1EE3p l\u1EC7.");
    const angle = this.normalizeAngle(input.angle);
    const payload = {
      idea: this.text(input.idea, "Nguy\xEAn li\u1EC7u ch\xEDnh", 8e3, true),
      supportingContext: this.text(input.supportingContext, "Th\xF4ng tin th\xEAm", 2e4),
      coreMessage: this.text(input.coreMessage, "Th\xF4ng \u0111i\u1EC7p c\u1ED1t l\xF5i", 3e3, true),
      angle,
      valueType,
      audience: this.text(input.audience, "Ng\u01B0\u1EDDi \u0111\u1ECDc", 2e3),
      channel: this.text(input.channel, "K\xEAnh", 120, true)
    };
    await this.prompts.assertApplication(APPLICATION_KEY3);
    const id = randomUUID3();
    const task = this.store.createTask({
      title: `Personal Brand \xB7 ${angle.title}`.slice(0, 180),
      description: payload.idea,
      priority: "medium",
      source: { type: "personal-brand", referenceId: id, label: "Personal Brand \xB7 Trao gi\xE1 tr\u1ECB", evidence: [], affectedGroups: ["marketing"], personalBrandArticleId: id }
    });
    const snapshot = this.store.getBrandProfile() ? this.store.createBrandContextSnapshot() : null;
    const article = this.store.createPersonalBrandArticle({ ...payload, id, taskId: task.id, brandContextSnapshotId: snapshot?.id ?? null });
    const paths = await this.resultPaths(task.id);
    const brandContext = snapshot ? JSON.stringify({ profile: snapshot.profile, records: snapshot.records, claims: snapshot.claims, guidelines: snapshot.guidelines, gaps: snapshot.gaps }) : "No approved Brand Profile snapshot is available.";
    void this.dispatchArticle(article.id, task.id, angle.title, async () => {
      const prompt = await this.prompts.application(APPLICATION_KEY3, "article-draft", {
        sourceUrl,
        idea: payload.idea,
        supportingContext: payload.supportingContext || "none",
        coreMessage: payload.coreMessage,
        angle: payload.angle.title,
        rationale: payload.angle.rationale,
        approach: payload.angle.approach,
        valueType: payload.valueType,
        audience: payload.audience || "the intended Personal Brand audience",
        channel: payload.channel,
        brandContext,
        taskIdJson: task.id,
        resultTitleJson: payload.angle.title,
        temporaryResultPathJson: paths.temporary,
        resultPathJson: paths.final
      });
      return prompt.text;
    });
    return { article };
  }
  async dispatchPlan(state) {
    const paths = this.planPaths(state.id);
    try {
      await this.writePlan({ ...state, status: "running", error: null, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      const prompt = await this.prompts.application(APPLICATION_KEY3, "angle-plan", {
        idea: state.idea,
        supportingContext: state.supportingContext || "none",
        audience: state.audience || "the intended Personal Brand audience",
        channel: state.channel,
        valueType: state.valueType,
        planIdJson: state.id,
        temporaryResultPathJson: paths.temporary,
        resultPathJson: paths.result
      });
      const receipt = await this.codexDesktop.dispatch(`growth-studio.pb-plan.${state.id}`, `Personal Brand \xB7 H\u01B0\u1EDBng vi\u1EBFt \xB7 ${state.idea.slice(0, 55)}`, prompt.text, this.projectRoot, { openOnCreate: false });
      const running = { ...state, status: "running", error: null, updatedAt: (/* @__PURE__ */ new Date()).toISOString(), codexThreadId: receipt.threadId, codexMessageId: receipt.messageId };
      await this.writePlan(running);
      if (!this.codexDesktop.isRunning) return;
      for (let attempt = 0; attempt < 1200 && this.codexDesktop.isRunning(receipt.threadId); attempt += 1) await new Promise((resolve) => setTimeout(resolve, 500));
      const raw = await this.readJson(paths.result);
      if (!raw) throw new Error("Codex finished without a Personal Brand angle plan");
      await this.acceptPlan(running, raw);
    } catch (error) {
      await fs.rm(paths.temporary, { force: true }).catch(() => void 0);
      await fs.rm(paths.result, { force: true }).catch(() => void 0);
      await this.writePlan({ ...state, status: "failed", error: PLAN_FAILURE, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      this.store.addEvent({ level: "failed", eventType: "personal_brand.article_plan.failed", title: "Personal Brand angle planning failed", detail: error instanceof Error ? error.message : String(error) });
    }
  }
  async dispatchArticle(articleId, taskId, title, makePrompt) {
    try {
      const message = await makePrompt() + this.codex.studioChannel(taskId);
      const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${taskId}`, `Personal Brand \xB7 ${title}`, message, this.projectRoot, { openOnCreate: false });
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, current.revision);
      this.store.markPersonalBrandArticleRunning(articleId);
      this.store.addEvent({ level: "success", eventType: "personal_brand.article.started", title: "Personal Brand article started", detail: `${title} \xB7 ${receipt.threadId}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { lastError: message }, current.revision);
      this.store.markPersonalBrandArticleFailed(articleId, message);
      this.store.addEvent({ level: "failed", eventType: "personal_brand.article.failed", title: "Personal Brand article failed", detail: message });
    }
  }
  publicPlan(state) {
    return { id: state.id, idea: state.idea, coreMessage: state.coreMessage, angles: state.angles, status: state.status, error: state.error, createdAt: state.createdAt, updatedAt: state.updatedAt };
  }
  async acceptPlan(state, input) {
    try {
      if (!input || typeof input !== "object") throw new Error("Codex finished without a Personal Brand angle plan");
      const result = input;
      if (result.schemaVersion !== "personal-brand-angle-plan-v1" || result.planId !== state.id) throw new Error("Invalid Personal Brand plan");
      const coreMessage = this.text(result.coreMessage, "Th\xF4ng \u0111i\u1EC7p c\u1ED1t l\xF5i", 3e3, true);
      if (!Array.isArray(result.angles) || result.angles.length !== 3) throw new Error("Personal Brand plan must contain exactly three angles");
      const angles = result.angles.map((value) => this.normalizeAngle(value));
      if (angles.some((angle, index) => angle.id !== `angle-${index + 1}`) || new Set(angles.map((angle) => angle.title.toLocaleLowerCase())).size !== angles.length) throw new Error("Personal Brand angles must be distinct and sequential");
      const ready = { ...state, coreMessage, angles, status: "ready", error: null, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.writePlan(ready);
      this.store.addEvent({ level: "success", eventType: "personal_brand.article_plan.ready", title: "Personal Brand angles ready", detail: state.idea.slice(0, 160) });
      return this.publicPlan(ready);
    } catch (error) {
      await fs.rm(this.planPaths(state.id).result, { force: true }).catch(() => void 0);
      const failed = { ...state, coreMessage: "", angles: [], status: "failed", error: PLAN_FAILURE, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.writePlan(failed);
      this.store.addEvent({ level: "failed", eventType: "personal_brand.article_plan.failed", title: "Personal Brand angle planning failed", detail: error instanceof Error ? error.message : String(error) });
      return this.publicPlan(failed);
    }
  }
  normalizeAngle(input) {
    const value = input && typeof input === "object" ? input : {};
    return {
      id: this.text(value.id, "M\xE3 h\u01B0\u1EDBng vi\u1EBFt", 120, true),
      title: this.text(value.title, "T\xEAn h\u01B0\u1EDBng vi\u1EBFt", 240, true),
      rationale: this.text(value.rationale, "L\xFD do ch\u1ECDn h\u01B0\u1EDBng vi\u1EBFt", 2e3, true),
      approach: this.text(value.approach, "C\xE1ch tri\u1EC3n khai", 2e3, true)
    };
  }
  text(value, label, limit, required = false) {
    const normalized = typeof value === "string" ? value.trim() : "";
    if (required && !normalized) throw new Error(`${label} l\xE0 b\u1EAFt bu\u1ED9c.`);
    if (normalized.length > limit) throw new Error(`${label} v\u01B0\u1EE3t qu\xE1 ${limit} k\xFD t\u1EF1.`);
    return normalized;
  }
  planPaths(id) {
    const directory = path3.join(this.projectRoot, ".growth-studio", "personal-brand-angle-plans");
    return { directory, state: path3.join(directory, `${id}.state.json`), temporary: path3.join(directory, `${id}.json.tmp`), result: path3.join(directory, `${id}.json`) };
  }
  async resultPaths(taskId) {
    const directory = path3.join(this.projectRoot, ".growth-studio", "task-results");
    await fs.mkdir(directory, { recursive: true });
    const final = path3.join(directory, `${taskId}.json`);
    return { final, temporary: `${final}.tmp` };
  }
  async readJson(file) {
    try {
      return JSON.parse(await fs.readFile(file, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async writePlan(state) {
    const paths = this.planPaths(state.id);
    await fs.mkdir(paths.directory, { recursive: true });
    await fs.writeFile(paths.state, JSON.stringify(state, null, 2), "utf8");
  }
};

// src/mini-apps/personal-brand/server/task-kind.ts
function personalBrandTaskKinds(repository) {
  return [
    {
      type: "personal-brand",
      result: {
        apply({ task, result }) {
          const imported = repository.applyPersonalBrandArticleResult(task.id, result);
          if (imported.applied) repository.addEvent({ level: "success", eventType: "personal_brand.article.imported", title: "Personal Brand article ready for review", detail: `${imported.article.title} \xB7 v${imported.article.version}` });
        }
      }
    },
    {
      type: "personal-brand-audit",
      result: {
        apply({ task, result }) {
          const imported = repository.applyPersonalBrandAuditResult(task.id, result);
          if (imported.applied) repository.addEvent({ level: "success", eventType: "personal_brand.audit.imported", title: "Personal Brand presence audit ready", detail: `${imported.audit.title} \xB7 ${imported.audit.channels.length} channels` });
        }
      }
    },
    {
      type: "personal-brand-material",
      result: {
        envelope: "personalBrandSeeds",
        apply({ task, envelope }) {
          if (!envelope || typeof envelope !== "object") throw new Error("Personal Brand material results must include the structured Content Seeds envelope");
          const imported = repository.applyPersonalBrandMaterialSeedResult(task.id, envelope);
          if (imported.applied) repository.addEvent({ level: "success", eventType: "personal_brand.material.seeds_imported", title: "Personal Brand Content Seeds ready", detail: `${imported.seeds.length} seeds created` });
        }
      }
    }
  ];
}

// src/mini-apps/personal-brand/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createPersonalBrandRepository(sdk);
    const service = new PersonalBrandArticleService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    const audits = new PersonalBrandAuditService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    const library = new PersonalBrandLibraryService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot);
    return {
      router: createPersonalBrandArticleRouter({ service, audits, library, port: sdk.port, router: sdk.router() }),
      taskKinds: personalBrandTaskKinds(repository)
    };
  }
});
export {
  index_default as default
};
