import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/quick-content/manifest.ts
var manifest = {
  id: "quick-content",
  version: "1.1.0",
  requiresCore: ">=1.6.0 <2",
  exports: { "quick-content.drafts": "1.0" }
};

// src/mini-apps/quick-content/release-notes.json
var release_notes_default = [
  {
    version: "1.1.0",
    vi: "Quick Content gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Quick Content is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/quick-content/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS quick_content_batches (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL REFERENCES tasks(id),
        title TEXT NOT NULL,
        idea TEXT NOT NULL,
        core_message TEXT NOT NULL,
        supporting_context TEXT NOT NULL DEFAULT '',
        angles_json TEXT NOT NULL DEFAULT '[]',
        source_app TEXT NOT NULL DEFAULT 'quick-content',
        value_type TEXT,
        options_json TEXT NOT NULL,
        brand_context_snapshot_id TEXT,
        offer_revision INTEGER,
        status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'review', 'failed')),
        last_error TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS quick_content_batches_listing_idx ON quick_content_batches(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS quick_content_drafts (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL REFERENCES quick_content_batches(id) ON DELETE CASCADE,
        angle TEXT NOT NULL,
        rationale TEXT NOT NULL,
        body TEXT NOT NULL,
        hook TEXT NOT NULL DEFAULT '',
        call_to_action TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL CHECK (status IN ('review', 'approved')),
        version INTEGER NOT NULL DEFAULT 1,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        approved_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS quick_content_drafts_batch_idx ON quick_content_drafts(batch_id, archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS quick_content_draft_versions (
        id TEXT PRIMARY KEY,
        draft_id TEXT NOT NULL REFERENCES quick_content_drafts(id) ON DELETE CASCADE,
        version INTEGER NOT NULL,
        angle TEXT NOT NULL,
        rationale TEXT NOT NULL,
        body TEXT NOT NULL,
        hook TEXT NOT NULL DEFAULT '',
        call_to_action TEXT NOT NULL DEFAULT '',
        action TEXT NOT NULL CHECK (action IN ('generate', 'edit', 'regenerate')),
        created_at TEXT NOT NULL,
        UNIQUE(draft_id, version)
      );
      CREATE TABLE IF NOT EXISTS quick_content_recipes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        options_json TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS quick_content_recipes_listing_idx ON quick_content_recipes(archived_at, updated_at DESC);
      CREATE TABLE IF NOT EXISTS quick_content_settings (
        id TEXT PRIMARY KEY CHECK (id = 'default'),
        payload_json TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS quick_content_imports (
        task_id TEXT PRIMARY KEY REFERENCES tasks(id),
        batch_id TEXT NOT NULL REFERENCES quick_content_batches(id),
        draft_id TEXT REFERENCES quick_content_drafts(id),
        applied_at TEXT NOT NULL
      );
    `);
    const batchColumns = columns(db, "quick_content_batches");
    if (!batchColumns.has("angles_json")) db.exec("ALTER TABLE quick_content_batches ADD COLUMN angles_json TEXT NOT NULL DEFAULT '[]'");
    if (!batchColumns.has("source_app")) db.exec("ALTER TABLE quick_content_batches ADD COLUMN source_app TEXT NOT NULL DEFAULT 'quick-content'");
    if (!batchColumns.has("value_type")) db.exec("ALTER TABLE quick_content_batches ADD COLUMN value_type TEXT");
  }
};
var columns = (db, table) => new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));

// src/mini-apps/quick-content/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/sdk/offer-reads.ts
function offerReads(sdk) {
  const catalog = () => sdk.miniApps.use("offers.catalog", "^1.0");
  return {
    getOffer: (id, revision) => catalog()?.get(id, revision) ?? null,
    listOffers: (filter) => catalog()?.list(filter) ?? { items: [], total: 0, facets: { active: 0, disabled: 0 } }
  };
}

// src/mini-apps/quick-content/server/store.ts
import { createHash, randomUUID } from "node:crypto";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
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
var quickContentSourceApps = /* @__PURE__ */ new Set(["quick-content", "personal-brand"]);
var quickContentValueTypes = /* @__PURE__ */ new Set(["knowledge", "information", "motivation", "connection", "direct_support"]);
var defaultQuickContentSettings = {
  audience: "Kh\xE1ch h\xE0ng m\u1EE5c ti\xEAu trong Brand Profile",
  objective: "educate",
  channel: "Facebook",
  structure: "automatic",
  length: "standard",
  tone: "Theo Brand Profile",
  callToAction: "",
  quantity: 5,
  offerId: null
};
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
function normalizeQuickContentBatchInput(input) {
  const options = normalizeQuickContentOptions(input);
  const sourceApp = input.sourceApp ?? "quick-content";
  if (!quickContentSourceApps.has(sourceApp)) throw new Error("Unsupported Quick Content source app");
  const valueType = input.valueType ?? null;
  if (valueType !== null && !quickContentValueTypes.has(valueType)) throw new Error("Unsupported Quick Content value type");
  return {
    ...options,
    idea: boundedText(input.idea, "Quick Content idea", 8e3, true),
    coreMessage: boundedText(input.coreMessage, "Quick Content Core Message", 3e3, true),
    supportingContext: boundedText(input.supportingContext, "Quick Content supporting context", 2e4),
    selectedAngles: normalizeQuickContentAngles(input.selectedAngles, options.quantity),
    recipeName: input.recipeName ? boundedText(input.recipeName, "Quick Content recipe name", 200, true) : void 0,
    sourceApp,
    valueType
  };
}
function normalizeQuickContentRecipeInput(input) {
  return { name: boundedText(input.name, "Quick Content recipe name", 200, true), ...normalizeQuickContentOptions(input) };
}
function normalizeQuickContentArtifact(input, quantity) {
  if (input?.schemaVersion !== "quick-content-v1") throw new Error("Unsupported Quick Content artifact schema");
  const coreMessage = boundedText(input.coreMessage, "Quick Content artifact Core Message", 3e3, true);
  if (!Array.isArray(input.drafts) || input.drafts.length !== quantity) throw new Error(`Quick Content artifact must contain exactly ${quantity} drafts`);
  const drafts = input.drafts.map((draft, index) => ({
    draftId: draft.draftId ? boundedText(draft.draftId, `Draft ${index + 1} ID`, 80, true) : void 0,
    angle: boundedText(draft.angle, `Draft ${index + 1} angle`, 240, true),
    rationale: boundedText(draft.rationale, `Draft ${index + 1} rationale`, 2e3, true),
    body: boundedText(draft.body, `Draft ${index + 1} body`, 4e4, true),
    hook: boundedText(draft.hook, `Draft ${index + 1} hook`, 1e3),
    callToAction: boundedText(draft.callToAction, `Draft ${index + 1} call to action`, 1e3)
  }));
  if (new Set(drafts.map((draft) => draft.angle.toLocaleLowerCase())).size !== drafts.length) throw new Error("Quick Content drafts must use distinct angles");
  if (new Set(drafts.map((draft) => draft.body.toLocaleLowerCase())).size !== drafts.length) throw new Error("Quick Content drafts must not duplicate one another");
  return { coreMessage, drafts };
}
var QuickContentStore = class {
  constructor(db, links) {
    this.db = db;
    this.tasks = links.tasks;
    this.events = links.events;
  }
  db;
  tasks;
  events;
  quickContentOptions(encoded) {
    return normalizeQuickContentOptions(JSON.parse(encoded));
  }
  getQuickContentSettings() {
    let row = this.db.prepare("SELECT payload_json, revision, created_at, updated_at FROM quick_content_settings WHERE id = 'default'").get();
    if (!row) {
      const timestamp = now();
      this.db.prepare("INSERT INTO quick_content_settings (id, payload_json, revision, created_at, updated_at) VALUES ('default', ?, 1, ?, ?)").run(JSON.stringify(defaultQuickContentSettings), timestamp, timestamp);
      row = this.db.prepare("SELECT payload_json, revision, created_at, updated_at FROM quick_content_settings WHERE id = 'default'").get();
    }
    return { ...this.quickContentOptions(row.payload_json), revision: Number(row.revision), createdAt: row.created_at, updatedAt: row.updated_at };
  }
  updateQuickContentSettings(input, expectedRevision) {
    const current = this.getQuickContentSettings();
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content settings changed since they were opened");
    const payload = normalizeQuickContentOptions(input);
    const timestamp = now();
    const changed = this.db.prepare("UPDATE quick_content_settings SET payload_json = ?, revision = revision + 1, updated_at = ? WHERE id = 'default' AND revision = ?").run(JSON.stringify(payload), timestamp, expectedRevision);
    if (!changed.changes) throw new Error("Quick Content settings changed since they were opened");
    this.events.addEvent({ level: "success", eventType: "quick_content.settings.updated", title: "Quick Content settings updated", detail: `${payload.channel} \xB7 ${payload.objective} \xB7 ${payload.quantity} posts` });
    return this.getQuickContentSettings();
  }
  toQuickContentBatchSummary(row) {
    return {
      id: row.id,
      taskId: row.task_id,
      title: row.title,
      idea: row.idea,
      coreMessage: row.core_message,
      supportingContext: row.supporting_context,
      selectedAngles: normalizeQuickContentAngles(JSON.parse(row.angles_json || "[]")),
      sourceApp: quickContentSourceApps.has(row.source_app) ? row.source_app : "quick-content",
      valueType: row.value_type && quickContentValueTypes.has(row.value_type) ? row.value_type : null,
      ...this.quickContentOptions(row.options_json),
      brandContextSnapshotId: row.brand_context_snapshot_id,
      offerRevision: row.offer_revision === null ? null : Number(row.offer_revision),
      status: row.status,
      draftCount: Number(row.draft_count ?? 0),
      approvedCount: Number(row.approved_count ?? 0),
      lastError: row.last_error,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
      archivedAt: row.archived_at
    };
  }
  toQuickContentDraftSummary(row) {
    return {
      id: row.id,
      batchId: row.batch_id,
      angle: row.angle,
      rationale: row.rationale,
      body: row.body,
      hook: row.hook,
      callToAction: row.call_to_action,
      status: row.status,
      version: Number(row.version),
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      approvedAt: row.approved_at,
      archivedAt: row.archived_at
    };
  }
  listQuickContentBatches(input = {}) {
    const where = [input.archived ? "b.archived_at IS NOT NULL" : "b.archived_at IS NULL"];
    const values = [];
    const sourceApp = input.sourceApp ?? "quick-content";
    if (!quickContentSourceApps.has(sourceApp)) throw new Error("Unsupported Quick Content source app");
    where.push("b.source_app = ?");
    values.push(sourceApp);
    if (input.status) {
      if (!["queued", "running", "review", "failed"].includes(input.status)) throw new Error("Unsupported Quick Content batch status");
      where.push("b.status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      where.push("(b.title LIKE ? OR b.idea LIKE ? OR b.core_message LIKE ? OR b.options_json LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern, pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT b.*, COUNT(d.id) AS draft_count, SUM(CASE WHEN d.status = 'approved' AND d.archived_at IS NULL THEN 1 ELSE 0 END) AS approved_count FROM quick_content_batches b LEFT JOIN quick_content_drafts d ON d.batch_id = b.id AND d.archived_at IS NULL WHERE ${where.join(" AND ")} GROUP BY b.id ORDER BY b.updated_at DESC, b.id LIMIT ?`).all(...values, limit);
    const facets = { queued: 0, running: 0, review: 0, failed: 0 };
    for (const row of this.db.prepare("SELECT status, COUNT(*) AS total FROM quick_content_batches WHERE archived_at IS NULL AND source_app = ? GROUP BY status").all(sourceApp)) facets[row.status] = Number(row.total);
    return { items: rows.map((row) => this.toQuickContentBatchSummary(row)), total: rows.length, facets };
  }
  getQuickContentInsights() {
    const batches = this.listQuickContentBatches({ limit: 500, sourceApp: "quick-content" }).items;
    const ideas = /* @__PURE__ */ new Map();
    const channels = /* @__PURE__ */ new Map();
    let drafts = 0;
    let approvedDrafts = 0;
    for (const batch of batches) {
      drafts += batch.draftCount;
      approvedDrafts += batch.approvedCount;
      const normalizedIdea = batch.idea.trim().replace(/\s+/g, " ").toLocaleLowerCase();
      const key = createHash("sha256").update(normalizedIdea).digest("hex").slice(0, 16);
      const current = ideas.get(key);
      if (current) {
        current.batchCount += 1;
        current.draftCount += batch.draftCount;
        current.approvedCount += batch.approvedCount;
        current.channelSet.add(batch.channel);
        current.objectiveSet.add(batch.objective);
        if (batch.updatedAt > current.lastUsedAt) {
          current.idea = batch.idea;
          current.coreMessage = batch.coreMessage;
          current.lastUsedAt = batch.updatedAt;
        }
      } else {
        ideas.set(key, {
          key,
          idea: batch.idea,
          coreMessage: batch.coreMessage,
          batchCount: 1,
          draftCount: batch.draftCount,
          approvedCount: batch.approvedCount,
          approvalRate: 0,
          channels: [],
          objectives: [],
          lastUsedAt: batch.updatedAt,
          channelSet: /* @__PURE__ */ new Set([batch.channel]),
          objectiveSet: /* @__PURE__ */ new Set([batch.objective])
        });
      }
      const channel = channels.get(batch.channel) ?? { channel: batch.channel, batchCount: 0, draftCount: 0, approvedCount: 0 };
      channel.batchCount += 1;
      channel.draftCount += batch.draftCount;
      channel.approvedCount += batch.approvedCount;
      channels.set(batch.channel, channel);
    }
    const ideaItems = Array.from(ideas.values()).map(({ channelSet, objectiveSet, ...idea }) => ({
      ...idea,
      approvalRate: idea.draftCount ? Math.round(idea.approvedCount / idea.draftCount * 100) : 0,
      channels: Array.from(channelSet).sort((left, right) => left.localeCompare(right)),
      objectives: Array.from(objectiveSet)
    })).sort((left, right) => right.lastUsedAt.localeCompare(left.lastUsedAt) || left.idea.localeCompare(right.idea));
    return {
      totals: {
        ideas: ideaItems.length,
        reusedIdeas: ideaItems.filter((idea) => idea.batchCount > 1).length,
        batches: batches.length,
        drafts,
        approvedDrafts,
        approvalRate: drafts ? Math.round(approvedDrafts / drafts * 100) : 0,
        generating: batches.filter((batch) => batch.status === "queued" || batch.status === "running").length,
        readyForReview: batches.filter((batch) => batch.status === "review").length,
        failed: batches.filter((batch) => batch.status === "failed").length
      },
      ideas: ideaItems,
      channels: Array.from(channels.values()).sort((left, right) => right.batchCount - left.batchCount || left.channel.localeCompare(right.channel)),
      recentBatches: batches.slice(0, 5)
    };
  }
  getQuickContentBatch(id) {
    const row = this.db.prepare("SELECT b.*, COUNT(d.id) AS draft_count, SUM(CASE WHEN d.status = 'approved' AND d.archived_at IS NULL THEN 1 ELSE 0 END) AS approved_count FROM quick_content_batches b LEFT JOIN quick_content_drafts d ON d.batch_id = b.id AND d.archived_at IS NULL WHERE b.id = ? GROUP BY b.id").get(id);
    if (!row) return null;
    const drafts = this.db.prepare("SELECT * FROM quick_content_drafts WHERE batch_id = ? ORDER BY created_at, id").all(id).map((draft) => this.toQuickContentDraftSummary(draft));
    return { ...this.toQuickContentBatchSummary(row), drafts };
  }
  createQuickContentBatch(input) {
    const payload = normalizeQuickContentBatchInput(input);
    if (!this.tasks.getTask(input.taskId)) throw new Error("Quick Content task not found");
    const timestamp = now();
    const title = payload.coreMessage.slice(0, 180);
    this.db.prepare("INSERT INTO quick_content_batches (id, task_id, title, idea, core_message, supporting_context, angles_json, source_app, value_type, options_json, brand_context_snapshot_id, offer_revision, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'queued', 1, ?, ?)").run(input.id, input.taskId, title, payload.idea, payload.coreMessage, payload.supportingContext, JSON.stringify(payload.selectedAngles ?? []), payload.sourceApp ?? "quick-content", payload.valueType ?? null, JSON.stringify(normalizeQuickContentOptions(payload)), input.brandContextSnapshotId, input.offerRevision, timestamp, timestamp);
    if (payload.recipeName) this.createQuickContentRecipe({ ...payload, name: payload.recipeName });
    return this.getQuickContentBatch(input.id);
  }
  markQuickContentBatchRunning(id) {
    const batch = this.getQuickContentBatch(id);
    if (!batch) throw new Error("Quick Content batch not found");
    if (batch.archivedAt) throw new Error("Archived Quick Content batches cannot run");
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_batches SET status = 'running', last_error = NULL, revision = revision + 1, updated_at = ? WHERE id = ?").run(timestamp, id);
    return this.getQuickContentBatch(id);
  }
  markQuickContentBatchFailed(id, message) {
    const batch = this.getQuickContentBatch(id);
    if (!batch) throw new Error("Quick Content batch not found");
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_batches SET status = 'failed', last_error = ?, revision = revision + 1, updated_at = ? WHERE id = ?").run(boundedText(message, "Quick Content error", 4e3, true), timestamp, id);
    return this.getQuickContentBatch(id);
  }
  applyQuickContentResult(taskId, input) {
    const task = this.tasks.getTask(taskId);
    const source = task?.source;
    if (!task || !source || source.type !== "quick-content" || !source.quickContentBatchId) throw new Error("Quick Content result references an invalid task");
    const batch = this.getQuickContentBatch(source.quickContentBatchId);
    if (!batch) throw new Error("Quick Content task references a missing batch");
    const prior = this.db.prepare("SELECT draft_id FROM quick_content_imports WHERE task_id = ?").get(taskId);
    if (prior) return { batch, draft: prior.draft_id ? this.getQuickContentDraft(prior.draft_id) : null, applied: false };
    if (input.batchId !== batch.id) throw new Error("Quick Content artifact batchId does not match its task");
    if (input.coreMessage.trim() !== batch.coreMessage) throw new Error("Quick Content artifact changed the confirmed Core Message");
    const regeneratingDraftId = source.quickContentDraftId ?? null;
    const normalized = normalizeQuickContentArtifact(input, regeneratingDraftId ? 1 : batch.quantity);
    if (!regeneratingDraftId && batch.selectedAngles.length) {
      const confirmed = batch.selectedAngles.map((angle) => angle.title.toLocaleLowerCase());
      const returned = normalized.drafts.map((draft) => draft.angle.toLocaleLowerCase());
      if (confirmed.some((angle, index) => returned[index] !== angle)) throw new Error("Quick Content artifact changed the confirmed angle plan");
    }
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    let changedDraftId = null;
    try {
      if (regeneratingDraftId) {
        const draft = this.getQuickContentDraft(regeneratingDraftId);
        if (!draft || draft.batchId !== batch.id || draft.archivedAt) throw new Error("Quick Content regeneration references an unavailable draft");
        const next = normalized.drafts[0];
        if (next.draftId && next.draftId !== draft.id) throw new Error("Quick Content regeneration changed the draft identity");
        const version = draft.version + 1;
        const revision = draft.revision + 1;
        this.db.prepare("UPDATE quick_content_drafts SET angle = ?, rationale = ?, body = ?, hook = ?, call_to_action = ?, status = 'review', version = ?, revision = ?, approved_at = NULL, updated_at = ? WHERE id = ? AND revision = ?").run(next.angle, next.rationale, next.body, next.hook, next.callToAction, version, revision, timestamp, draft.id, draft.revision);
        this.db.prepare("INSERT INTO quick_content_draft_versions (id, draft_id, version, angle, rationale, body, hook, call_to_action, action, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'regenerate', ?)").run(randomUUID(), draft.id, version, next.angle, next.rationale, next.body, next.hook, next.callToAction, timestamp);
        changedDraftId = draft.id;
      } else {
        if (batch.drafts.length) throw new Error("Quick Content batch already has generated drafts");
        for (const item of normalized.drafts) {
          const id = randomUUID();
          this.db.prepare("INSERT INTO quick_content_drafts (id, batch_id, angle, rationale, body, hook, call_to_action, status, version, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'review', 1, 1, ?, ?)").run(id, batch.id, item.angle, item.rationale, item.body, item.hook, item.callToAction, timestamp, timestamp);
          this.db.prepare("INSERT INTO quick_content_draft_versions (id, draft_id, version, angle, rationale, body, hook, call_to_action, action, created_at) VALUES (?, ?, 1, ?, ?, ?, ?, ?, 'generate', ?)").run(randomUUID(), id, item.angle, item.rationale, item.body, item.hook, item.callToAction, timestamp);
        }
      }
      this.db.prepare("UPDATE quick_content_batches SET status = 'review', last_error = NULL, completed_at = COALESCE(completed_at, ?), revision = revision + 1, updated_at = ? WHERE id = ?").run(timestamp, timestamp, batch.id);
      this.tasks.updateTask(taskId, { status: "done", lastError: null });
      this.db.prepare("INSERT INTO quick_content_imports (task_id, batch_id, draft_id, applied_at) VALUES (?, ?, ?, ?)").run(taskId, batch.id, changedDraftId, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return { batch: this.getQuickContentBatch(batch.id), draft: changedDraftId ? this.getQuickContentDraft(changedDraftId) : null, applied: true };
  }
  getQuickContentDraft(id) {
    const row = this.db.prepare("SELECT * FROM quick_content_drafts WHERE id = ?").get(id);
    if (!row) return null;
    const versions = this.db.prepare("SELECT version, angle, rationale, body, hook, call_to_action, action, created_at FROM quick_content_draft_versions WHERE draft_id = ? ORDER BY version DESC").all(id).map((version) => ({ version: Number(version.version), angle: version.angle, rationale: version.rationale, body: version.body, hook: version.hook, callToAction: version.call_to_action, action: version.action, createdAt: version.created_at }));
    return { ...this.toQuickContentDraftSummary(row), versions };
  }
  updateQuickContentDraft(id, input, expectedRevision) {
    const current = this.getQuickContentDraft(id);
    if (!current) throw new Error("Quick Content draft not found");
    if (current.archivedAt) throw new Error("Archived Quick Content drafts must be restored before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content draft changed since it was opened");
    const body = boundedText(input.body, "Quick Content draft body", 4e4, true);
    if (body === current.body) throw new Error("Quick Content draft has no changes to save");
    const version = current.version + 1;
    const revision = current.revision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("UPDATE quick_content_drafts SET body = ?, status = 'review', version = ?, revision = ?, approved_at = NULL, updated_at = ? WHERE id = ? AND revision = ?").run(body, version, revision, timestamp, id, expectedRevision);
      this.db.prepare("INSERT INTO quick_content_draft_versions (id, draft_id, version, angle, rationale, body, hook, call_to_action, action, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'edit', ?)").run(randomUUID(), id, version, current.angle, current.rationale, body, current.hook, current.callToAction, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "quick_content.draft.edited", title: "Quick Content draft edited", detail: `${current.angle} \xB7 v${version}` });
    return this.getQuickContentDraft(id);
  }
  transitionQuickContentDraft(id, status, expectedRevision) {
    if (!["review", "approved"].includes(status)) throw new Error("Unsupported Quick Content draft status");
    const current = this.getQuickContentDraft(id);
    if (!current) throw new Error("Quick Content draft not found");
    if (current.archivedAt) throw new Error("Archived Quick Content drafts must be restored before review");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content draft changed since it was opened");
    if (current.status === status) throw new Error(`Quick Content draft is already ${status}`);
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_drafts SET status = ?, approved_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(status, status === "approved" ? timestamp : null, timestamp, id, expectedRevision);
    this.events.addEvent({ level: "success", eventType: `quick_content.draft.${status}`, title: status === "approved" ? "Quick Content draft approved" : "Quick Content draft returned to review", detail: `${current.angle} \xB7 v${current.version}` });
    return this.getQuickContentDraft(id);
  }
  archiveQuickContentDraft(id, expectedRevision, restore = false) {
    const current = this.getQuickContentDraft(id);
    if (!current) throw new Error("Quick Content draft not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content draft changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Quick Content draft archive state changed since it was opened");
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_drafts SET archived_at = ?, status = 'review', approved_at = NULL, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    this.events.addEvent({ level: "success", eventType: restore ? "quick_content.draft.restored" : "quick_content.draft.archived", title: restore ? "Quick Content draft restored" : "Quick Content draft archived", detail: current.angle });
    return this.getQuickContentDraft(id);
  }
  archiveQuickContentBatch(id, expectedRevision, restore = false) {
    const current = this.getQuickContentBatch(id);
    if (!current) throw new Error("Quick Content batch not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content batch changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Quick Content batch archive state changed since it was opened");
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_batches SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    this.events.addEvent({ level: "success", eventType: restore ? "quick_content.batch.restored" : "quick_content.batch.archived", title: restore ? "Quick Content batch restored" : "Quick Content batch archived", detail: current.title });
    return this.getQuickContentBatch(id);
  }
  listQuickContentRecipes(input = {}) {
    const rows = this.db.prepare(`SELECT * FROM quick_content_recipes WHERE archived_at IS ${input.archived ? "NOT " : ""}NULL ORDER BY updated_at DESC, id LIMIT ?`).all(Math.max(1, Math.min(Number(input.limit ?? 200), 500)));
    return { items: rows.map((row) => ({ id: row.id, name: row.name, ...this.quickContentOptions(row.options_json), revision: Number(row.revision), createdAt: row.created_at, updatedAt: row.updated_at, archivedAt: row.archived_at })), total: rows.length };
  }
  getQuickContentRecipe(id) {
    const row = this.db.prepare("SELECT * FROM quick_content_recipes WHERE id = ?").get(id);
    return row ? { id: row.id, name: row.name, ...this.quickContentOptions(row.options_json), revision: Number(row.revision), createdAt: row.created_at, updatedAt: row.updated_at, archivedAt: row.archived_at } : null;
  }
  createQuickContentRecipe(input) {
    const payload = normalizeQuickContentRecipeInput(input);
    const id = randomUUID();
    const timestamp = now();
    const options = normalizeQuickContentOptions(payload);
    this.db.prepare("INSERT INTO quick_content_recipes (id, name, options_json, revision, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?)").run(id, payload.name, JSON.stringify(options), timestamp, timestamp);
    return this.getQuickContentRecipe(id);
  }
  updateQuickContentRecipe(id, input, expectedRevision) {
    const current = this.getQuickContentRecipe(id);
    if (!current) throw new Error("Quick Content recipe not found");
    if (current.archivedAt) throw new Error("Archived Quick Content recipes must be restored before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content recipe changed since it was opened");
    const payload = normalizeQuickContentRecipeInput(input);
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_recipes SET name = ?, options_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(payload.name, JSON.stringify(normalizeQuickContentOptions(payload)), timestamp, id, expectedRevision);
    return this.getQuickContentRecipe(id);
  }
  archiveQuickContentRecipe(id, expectedRevision, restore = false) {
    const current = this.getQuickContentRecipe(id);
    if (!current) throw new Error("Quick Content recipe not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Content recipe changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Quick Content recipe archive state changed since it was opened");
    const timestamp = now();
    this.db.prepare("UPDATE quick_content_recipes SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    return this.getQuickContentRecipe(id);
  }
};

// src/mini-apps/quick-content/server/repository.ts
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.3" };
function createQuickContentRepository(sdk) {
  const brand = () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range);
  return Object.assign(new QuickContentStore(sdk.db, { tasks: sdk.tasks, events: sdk.events }), offerReads(sdk), {
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

// src/mini-apps/quick-content/server/routes.ts
function createQuickContentRouter({ service, port, router }) {
  router.get("/api/quick-content/context-options", (_request, response) => response.json(service.contextOptions()));
  router.get("/api/quick-content/insights", (_request, response, next) => {
    try {
      response.json(service.insights());
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/quick-content/settings", (_request, response, next) => {
    try {
      response.json(service.store.getQuickContentSettings());
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/quick-content/settings", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(service.store.updateQuickContentSettings(input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/angle-plans", (request, response, next) => {
    void service.createAnglePlan(request.body ?? {}).then((value) => response.status(202).json(value)).catch(next);
  });
  router.get("/api/quick-content/angle-plans/:id", (request, response, next) => {
    void service.getAnglePlan(request.params.id).then((value) => response.json(value)).catch(next);
  });
  router.get("/api/quick-content/batches", (request, response, next) => {
    void service.listBatches({ query: String(request.query.q ?? ""), status: String(request.query.status ?? ""), archived: request.query.archived === "1", sourceApp: String(request.query.sourceApp ?? "quick-content") }).then((value) => response.json(value)).catch(next);
  });
  router.get("/api/quick-content/batches/:id", (request, response, next) => {
    void service.getBatch(request.params.id).then((value) => value ? response.json(value) : response.status(404).json({ error: "Quick Content batch not found" })).catch(next);
  });
  router.post("/api/quick-content/batches", (request, response, next) => {
    void service.createBatch(request.body ?? {}, `http://127.0.0.1:${port}/mini-apps/quick-content/batches`).then((value) => response.status(201).json(value)).catch(next);
  });
  router.post("/api/quick-content/batches/:id/archive", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickContentBatch(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/batches/:id/restore", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickContentBatch(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/quick-content/drafts/:id", (request, response, next) => {
    try {
      const value = service.store.getQuickContentDraft(request.params.id);
      value ? response.json(value) : response.status(404).json({ error: "Quick Content draft not found" });
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/quick-content/drafts/:id", (request, response, next) => {
    try {
      response.json(service.store.updateQuickContentDraft(request.params.id, { body: request.body?.body }, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/drafts/:id/transition", (request, response, next) => {
    try {
      response.json(service.store.transitionQuickContentDraft(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/drafts/:id/archive", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickContentDraft(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/drafts/:id/restore", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickContentDraft(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/drafts/:id/regenerate", (request, response, next) => {
    void service.regenerateDraft(request.params.id, request.body?.note, `http://127.0.0.1:${port}/mini-apps/quick-content/batches`).then((value) => response.status(201).json(value)).catch(next);
  });
  router.get("/api/quick-content/recipes", (request, response, next) => {
    try {
      response.json(service.store.listQuickContentRecipes({ archived: request.query.archived === "1" }));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/recipes", (request, response, next) => {
    try {
      response.status(201).json(service.store.createQuickContentRecipe(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/quick-content/recipes/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(service.store.updateQuickContentRecipe(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/recipes/:id/archive", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickContentRecipe(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-content/recipes/:id/restore", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickContentRecipe(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/quick-content/server/service.ts
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID as randomUUID2 } from "node:crypto";
var QUICK_CONTENT_APPLICATION_KEY = "quick-content";
var ANGLE_PLAN_FAILURE = "Codex ch\u01B0a t\u1EA1o \u0111\u01B0\u1EE3c h\u01B0\u1EDBng vi\u1EBFt h\u1EE3p l\u1EC7. H\xE3y th\u1EED l\u1EA1i.";
var QuickContentService = class {
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
  async listBatches(input = {}) {
    await this.reconcileResults();
    return this.store.listQuickContentBatches(input);
  }
  async getBatch(id) {
    await this.reconcileResults();
    return this.store.getQuickContentBatch(id);
  }
  contextOptions() {
    const offers = this.store.listOffers({ status: "active", limit: 200 }).items.map((offer) => ({ id: offer.id, name: offer.name, summary: offer.summary, revision: offer.revision }));
    return { offers };
  }
  insights() {
    return this.store.getQuickContentInsights();
  }
  async createAnglePlan(input) {
    const idea = String(input.idea ?? "").trim();
    const supportingContext = String(input.supportingContext ?? "").trim();
    if (!idea || idea.length > 8e3) throw new Error("Quick Content idea is required and must stay under 8000 characters");
    if (supportingContext.length > 2e4) throw new Error("Quick Content supporting context must stay under 20000 characters");
    const angleCount = Number(input.angleCount ?? 6);
    if (angleCount !== 3 && angleCount !== 6) throw new Error("Quick Content angle count must be 3 or 6");
    await this.prompts.assertApplication(QUICK_CONTENT_APPLICATION_KEY);
    const id = randomUUID2();
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const plan = { id, idea, coreMessage: "", angles: [], angleCount, status: "queued", error: null, createdAt: timestamp, updatedAt: timestamp };
    await this.writeAnglePlanState({ ...plan, supportingContext });
    void this.dispatchAnglePlan(plan, supportingContext);
    return plan;
  }
  async getAnglePlan(id) {
    if (!/^[a-f0-9-]{36}$/i.test(id)) throw new Error("Quick Content angle plan not found");
    const paths = this.anglePlanPaths(id);
    const state = await this.readJson(paths.state);
    if (!state) throw new Error("Quick Content angle plan not found");
    if (state.status === "failed") return this.publicAnglePlan(state);
    const result = await this.readJson(paths.result);
    if (result) return this.acceptAnglePlanResult(state, result);
    if (state.status === "running" && state.codexThreadId && this.codexDesktop.isRunning && !this.codexDesktop.isRunning(state.codexThreadId)) {
      return this.acceptAnglePlanResult(state, null);
    }
    return this.publicAnglePlan(state);
  }
  publicAnglePlan(state) {
    return { id: state.id, idea: state.idea, coreMessage: state.coreMessage, angles: state.angles, angleCount: state.angleCount ?? 6, status: state.status, error: state.error, createdAt: state.createdAt, updatedAt: state.updatedAt };
  }
  async acceptAnglePlanResult(state, result) {
    try {
      if (!result || typeof result !== "object") throw new Error("Codex task finished without a Quick Content angle plan artifact");
      const normalized = this.normalizeAnglePlanResult(state.id, result, state.angleCount ?? 6);
      const ready = { ...state, ...normalized, status: "ready", error: null, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.writeAnglePlanState(ready);
      return this.publicAnglePlan(ready);
    } catch (error) {
      await fs.rm(this.anglePlanPaths(state.id).result, { force: true }).catch(() => void 0);
      const failed = { ...state, coreMessage: "", angles: [], status: "failed", error: ANGLE_PLAN_FAILURE, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.writeAnglePlanState(failed);
      this.store.addEvent({ level: "failed", eventType: "quick_content.angle_plan.failed", title: "Quick Content angle planning failed", detail: error instanceof Error ? error.message : String(error) });
      return this.publicAnglePlan(failed);
    }
  }
  normalizeAnglePlanResult(id, input, angleCount) {
    const result = input;
    const coreMessage = String(result.coreMessage ?? "").trim();
    if (result.schemaVersion !== "quick-content-angle-plan-v1" || result.planId !== id || !coreMessage || coreMessage.length > 3e3 || !Array.isArray(result.angles) || result.angles.length !== angleCount) throw new Error("Quick Content angle plan result is invalid");
    const angles = result.angles.map((raw, index) => {
      const angle = raw;
      const normalized = { id: String(angle.id ?? `angle-${index + 1}`).trim(), title: String(angle.title ?? "").trim(), rationale: String(angle.rationale ?? "").trim(), approach: String(angle.approach ?? "").trim() };
      if (normalized.id !== `angle-${index + 1}` || !normalized.title || normalized.title.length > 240 || !normalized.rationale || normalized.rationale.length > 2e3 || !normalized.approach || normalized.approach.length > 2e3) throw new Error("Quick Content angle plan contains an invalid angle");
      return normalized;
    });
    if (new Set(angles.map((angle) => angle.id)).size !== angles.length || new Set(angles.map((angle) => angle.title.toLocaleLowerCase())).size !== angles.length) throw new Error("Quick Content angle plan must contain distinct angles");
    const operationalBlocker = [coreMessage, ...angles.flatMap((angle) => [angle.title, angle.rationale, angle.approach])].join("\n");
    const blockerTitles = /* @__PURE__ */ new Set(["b\u1ECB ch\u1EB7n", "ch\u01B0a x\u1EED l\xFD", "\u0111\xFAng ph\u1EA1m vi"]);
    const onlyBlockerTitles = angles.every((angle) => blockerTitles.has(angle.title.toLocaleLowerCase()));
    if (onlyBlockerTitles || /growth_catalog|growth_engine_get|kallob cloud is not connected|không thể lập kế hoạch|công cụ.{0,40}không.{0,20}khả dụng/i.test(operationalBlocker)) throw new Error("Quick Content angle plan returned an operational blocker instead of content angles");
    return { coreMessage, angles };
  }
  async createBatch(input, sourceUrl) {
    const batchId = randomUUID2();
    const parsedSource = new URL(sourceUrl);
    if (parsedSource.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(parsedSource.hostname)) throw new Error("Quick Content source must be the local Growth Studio");
    if (input.sourceApp === "personal-brand") parsedSource.pathname = "/mini-apps/personal-brand/content";
    sourceUrl = parsedSource.toString();
    const offer = input.offerId ? this.store.getOffer(String(input.offerId)) : null;
    if (input.offerId && (!offer || offer.archivedAt || offer.status !== "active")) throw new Error("Quick Content requires an active Offer when one is selected");
    await this.prompts.assertApplication(QUICK_CONTENT_APPLICATION_KEY);
    const brandSnapshot = this.store.getBrandProfile() ? this.store.createBrandContextSnapshot() : null;
    const task = this.store.createTask({
      title: `${input.sourceApp === "personal-brand" ? "Personal Brand" : "Quick Content"} \xB7 ${String(input.coreMessage ?? input.idea ?? "").trim().slice(0, 140) || "Untitled batch"}`,
      description: String(input.idea ?? "").trim(),
      priority: "medium",
      source: { type: "quick-content", referenceId: batchId, label: input.sourceApp === "personal-brand" ? "Personal Brand \xB7 Trao gi\xE1 tr\u1ECB" : "Quick Content \xB7 Content Production", evidence: [], affectedGroups: ["marketing"], quickContentBatchId: batchId }
    });
    const batch = this.store.createQuickContentBatch({ ...input, id: batchId, taskId: task.id, brandContextSnapshotId: brandSnapshot?.id ?? null, offerRevision: offer?.revision ?? null });
    const resultPath = await this.prepareResultPath(task.id);
    const context = brandSnapshot ? JSON.stringify({ profile: brandSnapshot.profile, records: brandSnapshot.records, claims: brandSnapshot.claims, guidelines: brandSnapshot.guidelines, gaps: brandSnapshot.gaps }) : "No approved Brand Profile snapshot is available.";
    void this.dispatch(task.id, batch.id, `Growth Studio \xB7 Quick Content \xB7 ${batch.title}`, () => this.batchPrompt(batch, context, offer ? JSON.stringify(offer) : "No Offer selected.", sourceUrl, resultPath.temporary, resultPath.final));
    return { batch };
  }
  anglePlanPaths(id) {
    const directory = path.join(this.projectRoot, ".growth-studio", "quick-content-angle-plans");
    return { directory, state: path.join(directory, `${id}.state.json`), result: path.join(directory, `${id}.json`), temporary: path.join(directory, `${id}.json.tmp`) };
  }
  async readJson(file) {
    try {
      return JSON.parse(await fs.readFile(file, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async writeAnglePlanState(state) {
    const paths = this.anglePlanPaths(state.id);
    await fs.mkdir(paths.directory, { recursive: true });
    await fs.writeFile(paths.state, JSON.stringify(state, null, 2), "utf8");
  }
  async dispatchAnglePlan(plan, supportingContext) {
    const paths = this.anglePlanPaths(plan.id);
    try {
      await this.writeAnglePlanState({ ...plan, status: "running", error: null, updatedAt: (/* @__PURE__ */ new Date()).toISOString(), supportingContext });
      this.store.addEvent({ level: "success", eventType: "quick_content.angle_plan.started", title: "Quick Content angle planning started", detail: `${plan.idea.slice(0, 120)} \xB7 durable Codex task` });
      const prompt = await this.anglePlanPrompt(plan, supportingContext, paths.temporary, paths.result);
      const receipt = await this.codexDesktop.dispatch(`growth-studio.angle.${plan.id}`, `Growth Studio \xB7 Content angles \xB7 ${plan.idea.slice(0, 60)}`, prompt, this.projectRoot, { openOnCreate: false });
      const running = { ...plan, status: "running", error: null, updatedAt: (/* @__PURE__ */ new Date()).toISOString(), supportingContext, codexThreadId: receipt.threadId, codexMessageId: receipt.messageId };
      await this.writeAnglePlanState(running);
      if (!this.codexDesktop.isRunning) return;
      for (let attempt = 0; attempt < 1200 && this.codexDesktop.isRunning(receipt.threadId); attempt += 1) await new Promise((resolve) => setTimeout(resolve, 500));
      const rawResult = await this.readJson(paths.result);
      if (!rawResult) throw new Error("Codex task finished without a Quick Content angle plan artifact");
      const settled = await this.acceptAnglePlanResult(running, rawResult);
      if (settled.status !== "ready") return;
      this.store.addEvent({ level: "success", eventType: "quick_content.angle_plan.ready", title: "Quick Content angle plan ready", detail: plan.idea.slice(0, 160) });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      await fs.rm(paths.temporary, { force: true }).catch(() => void 0);
      await fs.rm(paths.result, { force: true }).catch(() => void 0);
      await this.writeAnglePlanState({ ...plan, status: "failed", error: ANGLE_PLAN_FAILURE, updatedAt: (/* @__PURE__ */ new Date()).toISOString(), supportingContext });
      this.store.addEvent({ level: "failed", eventType: "quick_content.angle_plan.failed", title: "Quick Content angle planning failed", detail });
    }
  }
  async regenerateDraft(id, note, sourceUrl) {
    const draft = this.store.getQuickContentDraft(id);
    if (!draft || draft.archivedAt) throw new Error("Quick Content draft is unavailable");
    const batch = this.store.getQuickContentBatch(draft.batchId);
    if (!batch || batch.archivedAt) throw new Error("Quick Content batch is unavailable");
    const instruction = String(note ?? "").trim();
    if (!instruction || instruction.length > 4e3) throw new Error("Regeneration note is required and must stay under 4000 characters");
    await this.prompts.assertApplication(QUICK_CONTENT_APPLICATION_KEY);
    const task = this.store.createTask({
      title: `Quick Content revision \xB7 ${draft.angle}`.slice(0, 180),
      description: instruction,
      priority: "medium",
      source: { type: "quick-content", referenceId: `${batch.id}:${draft.id}:${draft.version + 1}`, label: "Quick Content \xB7 Draft revision", evidence: [], affectedGroups: ["marketing"], quickContentBatchId: batch.id, quickContentDraftId: draft.id }
    });
    const resultPath = await this.prepareResultPath(task.id);
    void this.dispatch(task.id, batch.id, `Growth Studio \xB7 Quick Content revision \xB7 ${draft.angle}`, () => this.regenerationPrompt(batch, draft, instruction, sourceUrl, resultPath.temporary, resultPath.final, task.id));
    return { taskId: task.id };
  }
  async prepareResultPath(taskId) {
    const directory = path.join(this.projectRoot, ".growth-studio", "task-results");
    await fs.mkdir(directory, { recursive: true });
    const final = path.join(directory, `${taskId}.json`);
    return { final, temporary: `${final}.tmp` };
  }
  /** Runs in the background: Codex never comes to the front for a Quick Content run. */
  async dispatch(taskId, batchId, title, prompt) {
    try {
      const message = await prompt() + this.codex.studioChannel(taskId);
      const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${taskId}`, title, message, this.projectRoot, { openOnCreate: false });
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, current.revision);
      this.store.markQuickContentBatchRunning(batchId);
      this.store.addEvent({ level: "success", eventType: "quick_content.started", title: "Quick Content generation started", detail: `${title} \xB7 ${receipt.threadId}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { lastError: message }, current.revision);
      this.store.markQuickContentBatchFailed(batchId, message);
      this.store.addEvent({ level: "failed", eventType: "quick_content.failed", title: "Quick Content generation failed", detail: message });
    }
  }
  async anglePlanPrompt(plan, supportingContext, temporaryResultPath, resultPath) {
    const settings = this.store.getQuickContentSettings();
    const prompt = await this.prompts.application(QUICK_CONTENT_APPLICATION_KEY, "angle-plan", {
      idea: plan.idea,
      supportingContext: supportingContext || "none",
      audience: settings.audience,
      objective: settings.objective,
      channel: settings.channel,
      tone: settings.tone,
      angleCount: plan.angleCount,
      planIdJson: plan.id,
      temporaryResultPathJson: temporaryResultPath,
      resultPathJson: resultPath
    });
    return prompt.text;
  }
  async batchPrompt(batch, context, offer, sourceUrl, temporaryResultPath, resultPath) {
    const confirmedAngles = batch.selectedAngles.length ? batch.selectedAngles.map((angle, index) => `${index + 1}. ${angle.title}
Why: ${angle.rationale}
Approach: ${angle.approach}`).join("\n\n") : "No angle plan was confirmed; derive distinct angles from the brief.";
    const prompt = await this.prompts.application(QUICK_CONTENT_APPLICATION_KEY, "content-batch", {
      quantity: batch.quantity,
      sourceUrl,
      idea: batch.idea,
      coreMessage: batch.coreMessage,
      audience: batch.audience,
      objective: batch.objective,
      channel: batch.channel,
      structure: batch.structure,
      length: batch.length,
      tone: batch.tone,
      callToAction: batch.callToAction || "none",
      supportingContext: batch.supportingContext || "none",
      confirmedAngles,
      brandContext: context,
      offer,
      temporaryResultPathJson: temporaryResultPath,
      resultPathJson: resultPath,
      taskIdJson: batch.taskId,
      resultTitleJson: `Quick Content \xB7 ${batch.title}`,
      batchIdJson: batch.id,
      coreMessageJson: batch.coreMessage
    });
    return prompt.text;
  }
  async regenerationPrompt(batch, draft, note, sourceUrl, temporaryResultPath, resultPath, taskId) {
    const prompt = await this.prompts.application(QUICK_CONTENT_APPLICATION_KEY, "draft-revision", {
      sourceUrl,
      coreMessage: batch.coreMessage,
      audience: batch.audience,
      channel: batch.channel,
      tone: batch.tone,
      structure: batch.structure,
      angle: draft.angle,
      currentBody: draft.body,
      note,
      temporaryResultPathJson: temporaryResultPath,
      resultPathJson: resultPath,
      taskIdJson: taskId,
      resultTitleJson: `Quick Content revision \xB7 ${draft.angle}`,
      batchIdJson: batch.id,
      coreMessageJson: batch.coreMessage,
      draftIdJson: draft.id,
      angleJson: draft.angle,
      rationaleJson: draft.rationale
    });
    return prompt.text;
  }
};

// src/mini-apps/quick-content/server/task-kind.ts
function quickContentTaskKind(repository) {
  return {
    type: "quick-content",
    result: {
      envelope: "quickContent",
      apply({ task, envelope }) {
        if (!envelope || typeof envelope !== "object") throw new Error("Quick Content results must include the structured Quick Content envelope");
        const imported = repository.applyQuickContentResult(task.id, envelope);
        if (imported.applied) {
          repository.addEvent({
            level: "success",
            eventType: "quick_content.imported",
            title: imported.draft ? "Quick Content draft revision ready" : "Quick Content batch ready for review",
            detail: imported.draft ? `${imported.draft.angle} \xB7 v${imported.draft.version}` : `${imported.batch.title} \xB7 ${imported.batch.draftCount} drafts`
          });
        }
      }
    }
  };
}

// src/mini-apps/quick-content/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createQuickContentRepository(sdk);
    const service = new QuickContentService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    const drafts = {
      batches: (filter) => repository.listQuickContentBatches(filter),
      batch: (id) => repository.getQuickContentBatch(id),
      draft: (id) => repository.getQuickContentDraft(id)
    };
    return {
      router: createQuickContentRouter({ service, port: sdk.port, router: sdk.router() }),
      exports: { "quick-content.drafts": drafts },
      taskKinds: [quickContentTaskKind(repository)]
    };
  }
});
export {
  index_default as default
};
