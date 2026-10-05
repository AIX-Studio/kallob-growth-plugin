import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/quick-visual/manifest.ts
var manifest = {
  id: "quick-visual",
  version: "1.2.0",
  requiresCore: ">=2.0.0 <3"
};

// src/mini-apps/quick-visual/release-notes.json
var release_notes_default = [
  {
    version: "1.2.0",
    vi: "Ch\u1EA1y tr\xEAn Growth Studio 0.21: \u0111\u01B0\u1EE3c c\xE0i c\xF9ng l\xFAc khi Growth Studio c\u1EADp nh\u1EADt, kh\xF4ng ph\u1EA3i ch\u1EDD t\u1EA3i th\xEAm.",
    en: "Runs on Growth Studio 0.21: installed together with Growth Studio updates, with no extra download afterwards."
  },
  {
    version: "1.1.0",
    vi: "Quick Visual gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Quick Visual is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/quick-visual/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS quick_visual_batches (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL REFERENCES tasks(id),
        title TEXT NOT NULL,
        use_case TEXT NOT NULL CHECK (use_case IN ('personal_brand', 'event', 'product', 'content', 'creative')),
        brief_json TEXT NOT NULL,
        style TEXT NOT NULL,
        aspect_ratio TEXT NOT NULL CHECK (aspect_ratio IN ('1:1', '4:5', '16:9', '9:16')),
        quantity INTEGER NOT NULL CHECK (quantity IN (1, 2, 4)),
        custom_instruction TEXT NOT NULL DEFAULT '',
        use_brand_context INTEGER NOT NULL DEFAULT 0,
        brand_context_snapshot_id TEXT,
        offer_id TEXT,
        offer_revision INTEGER,
        quick_content_draft_id TEXT,
        quick_content_draft_version INTEGER,
        status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'review', 'failed')),
        last_error TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS quick_visual_batches_listing_idx ON quick_visual_batches(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS quick_visual_references (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL REFERENCES quick_visual_batches(id) ON DELETE CASCADE,
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        byte_size INTEGER NOT NULL,
        data BLOB NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS quick_visual_images (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL REFERENCES quick_visual_batches(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        alt_text TEXT NOT NULL DEFAULT '',
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        byte_size INTEGER NOT NULL,
        data BLOB NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('review', 'approved')),
        version INTEGER NOT NULL DEFAULT 1,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        approved_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS quick_visual_images_batch_idx ON quick_visual_images(batch_id, archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS quick_visual_image_versions (
        id TEXT PRIMARY KEY,
        image_id TEXT NOT NULL REFERENCES quick_visual_images(id) ON DELETE CASCADE,
        version INTEGER NOT NULL,
        title TEXT NOT NULL,
        alt_text TEXT NOT NULL DEFAULT '',
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        byte_size INTEGER NOT NULL,
        data BLOB NOT NULL,
        action TEXT NOT NULL CHECK (action IN ('generate', 'regenerate')),
        created_at TEXT NOT NULL,
        UNIQUE(image_id, version)
      );
      CREATE TABLE IF NOT EXISTS quick_visual_imports (
        task_id TEXT PRIMARY KEY REFERENCES tasks(id),
        batch_id TEXT NOT NULL REFERENCES quick_visual_batches(id),
        image_id TEXT REFERENCES quick_visual_images(id),
        applied_at TEXT NOT NULL
      );
    `);
    migrateQuickVisualSchema(db);
  }
};
function migrateQuickVisualSchema(db) {
  const tableSql = String(db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'quick_visual_batches'").get()?.sql ?? "");
  if (!tableSql || tableSql.includes("'creative'")) return;
  db.exec("PRAGMA foreign_keys = OFF");
  try {
    db.exec(`
      BEGIN IMMEDIATE;
      DROP INDEX IF EXISTS quick_visual_batches_listing_idx;
      CREATE TABLE quick_visual_batches_next (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL REFERENCES tasks(id),
        title TEXT NOT NULL,
        use_case TEXT NOT NULL CHECK (use_case IN ('personal_brand', 'event', 'product', 'content', 'creative')),
        brief_json TEXT NOT NULL,
        style TEXT NOT NULL,
        aspect_ratio TEXT NOT NULL CHECK (aspect_ratio IN ('1:1', '4:5', '16:9', '9:16')),
        quantity INTEGER NOT NULL CHECK (quantity IN (1, 2, 4)),
        custom_instruction TEXT NOT NULL DEFAULT '',
        use_brand_context INTEGER NOT NULL DEFAULT 0,
        brand_context_snapshot_id TEXT,
        offer_id TEXT,
        offer_revision INTEGER,
        quick_content_draft_id TEXT,
        quick_content_draft_version INTEGER,
        status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'review', 'failed')),
        last_error TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT,
        archived_at TEXT
      );
      INSERT INTO quick_visual_batches_next SELECT * FROM quick_visual_batches;
      DROP TABLE quick_visual_batches;
      ALTER TABLE quick_visual_batches_next RENAME TO quick_visual_batches;
      CREATE INDEX quick_visual_batches_listing_idx ON quick_visual_batches(archived_at, status, updated_at DESC);
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
  const violations = db.prepare("PRAGMA foreign_key_check").all().filter((violation) => violation.table.startsWith("quick_visual_"));
  if (violations.length) throw new Error("Quick Visual schema migration produced invalid references");
}

// src/mini-apps/quick-visual/server/migrations/index.ts
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

// src/mini-apps/quick-visual/server/store.ts
import { randomUUID } from "node:crypto";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
function boundedText(value, field, limit, required = false) {
  if (value !== void 0 && typeof value !== "string") throw new Error(`${field} must be text`);
  const normalized = String(value ?? "").trim();
  if (normalized.length > limit) throw new Error(`${field} exceeds ${limit} characters`);
  if (required && !normalized) throw new Error(`${field} is required`);
  return normalized;
}
function detectImageAsset(data) {
  const bytes = Buffer.from(data);
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { mimeType: "image/png", extension: "png" };
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return { mimeType: "image/jpeg", extension: "jpg" };
  if (bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP") return { mimeType: "image/webp", extension: "webp" };
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString())) return { mimeType: "image/gif", extension: "gif" };
  throw new Error("Images must be PNG, JPEG, WebP, or GIF");
}
var quickVisualUseCases = /* @__PURE__ */ new Set(["personal_brand", "event", "product", "content", "creative"]);
var quickVisualAspectRatios = /* @__PURE__ */ new Set(["1:1", "4:5", "16:9", "9:16"]);
function normalizeQuickVisualBatchInput(input) {
  const useCase = String(input.useCase ?? "");
  const aspectRatio = String(input.aspectRatio ?? "");
  const quantity = Number(input.quantity);
  if (!quickVisualUseCases.has(useCase)) throw new Error("Unsupported Quick Visual use case");
  if (!quickVisualAspectRatios.has(aspectRatio)) throw new Error("Unsupported Quick Visual aspect ratio");
  if (![1, 2, 4].includes(quantity)) throw new Error("Quick Visual quantity must be 1, 2, or 4");
  if (!input.brief || typeof input.brief !== "object" || Array.isArray(input.brief)) throw new Error("Quick Visual brief is required");
  const brief = Object.fromEntries(Object.entries(input.brief).map(([key, value]) => [boundedText(key, "Quick Visual brief field", 80, true), boundedText(value, `Quick Visual ${key}`, 8e3)]).filter(([, value]) => value));
  if (!Object.keys(brief).length) throw new Error("Quick Visual brief needs at least one filled field");
  const references = Array.isArray(input.references) ? input.references : [];
  if (references.length > 8) throw new Error("Quick Visual accepts at most 8 reference images");
  return {
    useCase,
    brief,
    style: boundedText(input.style, "Quick Visual style", 240, true),
    aspectRatio,
    quantity,
    customInstruction: boundedText(input.customInstruction, "Quick Visual custom instruction", 8e3),
    useBrandContext: Boolean(input.useBrandContext),
    offerId: input.offerId ? boundedText(input.offerId, "Quick Visual Offer ID", 80, true) : null,
    quickContentDraftId: input.quickContentDraftId ? boundedText(input.quickContentDraftId, "Quick Visual content draft ID", 80, true) : null,
    brandAssetIds: Array.isArray(input.brandAssetIds) ? [...new Set(input.brandAssetIds.map((id) => boundedText(id, "Quick Visual Brand Asset ID", 80, true)))].slice(0, 8) : [],
    references
  };
}
var QuickVisualStore = class {
  constructor(db, tasks) {
    this.db = db;
    this.tasks = tasks;
  }
  db;
  tasks;
  toQuickVisualBatchSummary(row) {
    return {
      id: row.id,
      taskId: row.task_id,
      title: row.title,
      useCase: row.use_case,
      brief: JSON.parse(row.brief_json),
      style: row.style,
      aspectRatio: row.aspect_ratio,
      quantity: Number(row.quantity),
      customInstruction: row.custom_instruction,
      useBrandContext: Boolean(row.use_brand_context),
      brandContextSnapshotId: row.brand_context_snapshot_id,
      offerId: row.offer_id,
      offerRevision: row.offer_revision === null ? null : Number(row.offer_revision),
      quickContentDraftId: row.quick_content_draft_id,
      quickContentDraftVersion: row.quick_content_draft_version === null ? null : Number(row.quick_content_draft_version),
      status: row.status,
      imageCount: Number(row.image_count ?? 0),
      approvedCount: Number(row.approved_count ?? 0),
      lastError: row.last_error,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
      archivedAt: row.archived_at
    };
  }
  toQuickVisualImageSummary(row) {
    return {
      id: row.id,
      batchId: row.batch_id,
      title: row.title,
      altText: row.alt_text,
      filename: row.filename,
      mimeType: row.mime_type,
      byteSize: Number(row.byte_size),
      url: `/api/quick-visual/images/${row.id}/file`,
      status: row.status,
      version: Number(row.version),
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      approvedAt: row.approved_at,
      archivedAt: row.archived_at
    };
  }
  listQuickVisualBatches(input = {}) {
    const where = [input.archived ? "b.archived_at IS NOT NULL" : "b.archived_at IS NULL"];
    const values = [];
    if (input.status) {
      if (!["queued", "running", "review", "failed"].includes(input.status)) throw new Error("Unsupported Quick Visual batch status");
      where.push("b.status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      where.push("(b.title LIKE ? OR b.brief_json LIKE ? OR b.style LIKE ?)");
      values.push(pattern, pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT b.*, COUNT(i.id) AS image_count, SUM(CASE WHEN i.status = 'approved' AND i.archived_at IS NULL THEN 1 ELSE 0 END) AS approved_count FROM quick_visual_batches b LEFT JOIN quick_visual_images i ON i.batch_id = b.id AND i.archived_at IS NULL WHERE ${where.join(" AND ")} GROUP BY b.id ORDER BY b.updated_at DESC, b.id LIMIT ?`).all(...values, limit);
    const facets = { queued: 0, running: 0, review: 0, failed: 0 };
    for (const row of this.db.prepare("SELECT status, COUNT(*) AS total FROM quick_visual_batches WHERE archived_at IS NULL GROUP BY status").all()) facets[row.status] = Number(row.total);
    return { items: rows.map((row) => this.toQuickVisualBatchSummary(row)), total: rows.length, facets };
  }
  getQuickVisualBatch(id) {
    const row = this.db.prepare("SELECT b.*, COUNT(i.id) AS image_count, SUM(CASE WHEN i.status = 'approved' AND i.archived_at IS NULL THEN 1 ELSE 0 END) AS approved_count FROM quick_visual_batches b LEFT JOIN quick_visual_images i ON i.batch_id = b.id AND i.archived_at IS NULL WHERE b.id = ? GROUP BY b.id").get(id);
    if (!row) return null;
    const references = this.db.prepare("SELECT id, batch_id, filename, mime_type, byte_size, created_at FROM quick_visual_references WHERE batch_id = ? ORDER BY created_at, id").all(id).map((item) => ({ id: item.id, batchId: item.batch_id, filename: item.filename, mimeType: item.mime_type, byteSize: Number(item.byte_size), url: `/api/quick-visual/references/${item.id}/file`, createdAt: item.created_at }));
    const images = this.db.prepare("SELECT * FROM quick_visual_images WHERE batch_id = ? ORDER BY created_at, id").all(id).map((item) => this.toQuickVisualImageSummary(item));
    return { ...this.toQuickVisualBatchSummary(row), references, images };
  }
  createQuickVisualBatch(input) {
    const payload = normalizeQuickVisualBatchInput(input);
    if (!this.tasks.getTask(input.taskId)) throw new Error("Quick Visual task not found");
    const title = Object.values(payload.brief).find(Boolean)?.slice(0, 180) || "Quick Visual";
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO quick_visual_batches (id, task_id, title, use_case, brief_json, style, aspect_ratio, quantity, custom_instruction, use_brand_context, brand_context_snapshot_id, offer_id, offer_revision, quick_content_draft_id, quick_content_draft_version, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'queued', 1, ?, ?)").run(input.id, input.taskId, title, payload.useCase, JSON.stringify(payload.brief), payload.style, payload.aspectRatio, payload.quantity, payload.customInstruction, payload.useBrandContext ? 1 : 0, input.brandContextSnapshotId, payload.offerId, input.offerRevision, payload.quickContentDraftId, input.quickContentDraftVersion, timestamp, timestamp);
      for (const reference of input.referenceData) {
        const bytes = Buffer.from(reference.data);
        if (!bytes.length || bytes.length > 8 * 1024 * 1024) throw new Error("Each Quick Visual reference must be between 1 byte and 8 MB");
        const detected = detectImageAsset(bytes);
        this.db.prepare("INSERT INTO quick_visual_references (id, batch_id, filename, mime_type, byte_size, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(randomUUID(), input.id, boundedText(reference.filename, "Reference filename", 240, true), detected.mimeType, bytes.length, bytes, timestamp);
      }
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getQuickVisualBatch(input.id);
  }
  markQuickVisualBatchRunning(id) {
    return this.setQuickVisualBatchState(id, "running", null);
  }
  markQuickVisualBatchFailed(id, message) {
    return this.setQuickVisualBatchState(id, "failed", boundedText(message, "Quick Visual error", 4e3, true));
  }
  setQuickVisualBatchState(id, status, lastError) {
    const batch = this.getQuickVisualBatch(id);
    if (!batch) throw new Error("Quick Visual batch not found");
    if (batch.archivedAt) throw new Error("Archived Quick Visual batches cannot run");
    this.db.prepare("UPDATE quick_visual_batches SET status = ?, last_error = ?, revision = revision + 1, updated_at = ? WHERE id = ?").run(status, lastError, now(), id);
    return this.getQuickVisualBatch(id);
  }
  applyQuickVisualResult(taskId, input) {
    const task = this.tasks.getTask(taskId);
    const source = task?.source;
    if (!task || !source || source.type !== "quick-visual" || !source.quickVisualBatchId) throw new Error("Quick Visual result references an invalid task");
    const batch = this.getQuickVisualBatch(source.quickVisualBatchId);
    if (!batch) throw new Error("Quick Visual task references a missing batch");
    const prior = this.db.prepare("SELECT image_id FROM quick_visual_imports WHERE task_id = ?").get(taskId);
    if (prior) return { batch, image: prior.image_id ? this.getQuickVisualImage(prior.image_id) : null, applied: false };
    if (input.schemaVersion !== "quick-visual-v1" || input.batchId !== batch.id) throw new Error("Quick Visual artifact does not match its batch");
    const regeneratingImageId = source.quickVisualImageId ?? null;
    const expected = regeneratingImageId ? 1 : batch.quantity;
    if (!Array.isArray(input.images) || input.images.length !== expected) throw new Error(`Quick Visual artifact must contain exactly ${expected} images`);
    const normalized = input.images.map((item, index) => {
      const bytes = Buffer.from(item.data);
      if (!bytes.length || bytes.length > 20 * 1024 * 1024) throw new Error(`Generated image ${index + 1} exceeds the 20 MB limit`);
      const detected = detectImageAsset(bytes);
      return { imageId: item.imageId, title: boundedText(item.title, `Image ${index + 1} title`, 240, true), altText: boundedText(item.altText, `Image ${index + 1} alt text`, 2e3), filename: boundedText(item.filename, `Image ${index + 1} filename`, 240, true), mimeType: detected.mimeType, bytes };
    });
    const timestamp = now();
    let changedImageId = null;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      if (regeneratingImageId) {
        const current = this.getQuickVisualImage(regeneratingImageId);
        if (!current || current.batchId !== batch.id || current.archivedAt) throw new Error("Quick Visual regeneration references an unavailable image");
        const next = normalized[0];
        if (next.imageId && next.imageId !== current.id) throw new Error("Quick Visual regeneration changed the image identity");
        const version = current.version + 1;
        this.db.prepare("UPDATE quick_visual_images SET title = ?, alt_text = ?, filename = ?, mime_type = ?, byte_size = ?, data = ?, status = 'review', version = ?, revision = revision + 1, approved_at = NULL, updated_at = ? WHERE id = ?").run(next.title, next.altText, next.filename, next.mimeType, next.bytes.length, next.bytes, version, timestamp, current.id);
        this.db.prepare("INSERT INTO quick_visual_image_versions (id, image_id, version, title, alt_text, filename, mime_type, byte_size, data, action, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'regenerate', ?)").run(randomUUID(), current.id, version, next.title, next.altText, next.filename, next.mimeType, next.bytes.length, next.bytes, timestamp);
        changedImageId = current.id;
      } else {
        if (batch.images.length) throw new Error("Quick Visual batch already has generated images");
        for (const item of normalized) {
          const id = randomUUID();
          this.db.prepare("INSERT INTO quick_visual_images (id, batch_id, title, alt_text, filename, mime_type, byte_size, data, status, version, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'review', 1, 1, ?, ?)").run(id, batch.id, item.title, item.altText, item.filename, item.mimeType, item.bytes.length, item.bytes, timestamp, timestamp);
          this.db.prepare("INSERT INTO quick_visual_image_versions (id, image_id, version, title, alt_text, filename, mime_type, byte_size, data, action, created_at) VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, 'generate', ?)").run(randomUUID(), id, item.title, item.altText, item.filename, item.mimeType, item.bytes.length, item.bytes, timestamp);
        }
      }
      this.db.prepare("UPDATE quick_visual_batches SET status = 'review', last_error = NULL, completed_at = COALESCE(completed_at, ?), revision = revision + 1, updated_at = ? WHERE id = ?").run(timestamp, timestamp, batch.id);
      this.tasks.updateTask(taskId, { status: "done", lastError: null });
      this.db.prepare("INSERT INTO quick_visual_imports (task_id, batch_id, image_id, applied_at) VALUES (?, ?, ?, ?)").run(taskId, batch.id, changedImageId, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return { batch: this.getQuickVisualBatch(batch.id), image: changedImageId ? this.getQuickVisualImage(changedImageId) : null, applied: true };
  }
  getQuickVisualImage(id) {
    const row = this.db.prepare("SELECT * FROM quick_visual_images WHERE id = ?").get(id);
    if (!row) return null;
    const versions = this.db.prepare("SELECT version, title, alt_text, filename, mime_type, byte_size, action, created_at FROM quick_visual_image_versions WHERE image_id = ? ORDER BY version DESC").all(id).map((item) => ({ version: Number(item.version), title: item.title, altText: item.alt_text, filename: item.filename, mimeType: item.mime_type, byteSize: Number(item.byte_size), url: `/api/quick-visual/images/${id}/versions/${item.version}/file`, action: item.action, createdAt: item.created_at }));
    return { ...this.toQuickVisualImageSummary(row), versions };
  }
  getQuickVisualImageData(id, version) {
    const row = version === void 0 ? this.db.prepare("SELECT filename, mime_type, data FROM quick_visual_images WHERE id = ?").get(id) : this.db.prepare("SELECT filename, mime_type, data FROM quick_visual_image_versions WHERE image_id = ? AND version = ?").get(id, version);
    return row;
  }
  getQuickVisualReferenceData(id) {
    return this.db.prepare("SELECT filename, mime_type, data FROM quick_visual_references WHERE id = ?").get(id);
  }
  transitionQuickVisualImage(id, status, expectedRevision) {
    if (!["review", "approved"].includes(status)) throw new Error("Unsupported Quick Visual image status");
    const current = this.getQuickVisualImage(id);
    if (!current) throw new Error("Quick Visual image not found");
    if (current.archivedAt) throw new Error("Archived Quick Visual images must be restored before review");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Visual image changed since it was opened");
    if (current.status === status) throw new Error(`Quick Visual image is already ${status}`);
    const timestamp = now();
    this.db.prepare("UPDATE quick_visual_images SET status = ?, approved_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(status, status === "approved" ? timestamp : null, timestamp, id, expectedRevision);
    return this.getQuickVisualImage(id);
  }
  archiveQuickVisualImage(id, expectedRevision, restore = false) {
    const current = this.getQuickVisualImage(id);
    if (!current) throw new Error("Quick Visual image not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Visual image changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Quick Visual image archive state changed since it was opened");
    const timestamp = now();
    this.db.prepare("UPDATE quick_visual_images SET archived_at = ?, status = 'review', approved_at = NULL, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    return this.getQuickVisualImage(id);
  }
  archiveQuickVisualBatch(id, expectedRevision, restore = false) {
    const current = this.getQuickVisualBatch(id);
    if (!current) throw new Error("Quick Visual batch not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Quick Visual batch changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Quick Visual batch archive state changed since it was opened");
    const timestamp = now();
    this.db.prepare("UPDATE quick_visual_batches SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    return this.getQuickVisualBatch(id);
  }
};

// src/mini-apps/quick-visual/server/repository.ts
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.2" };
var QUICK_CONTENT_DRAFTS = { name: "quick-content.drafts", range: "^1.0" };
function createQuickVisualRepository(sdk) {
  const brand = () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range);
  const drafts = () => sdk.miniApps.use(QUICK_CONTENT_DRAFTS.name, QUICK_CONTENT_DRAFTS.range);
  return Object.assign(new QuickVisualStore(sdk.db, sdk.tasks), offerReads(sdk), {
    createTask: (input) => sdk.tasks.createTask(input),
    getTask: (id) => sdk.tasks.getTask(id),
    updateTask: (...args) => sdk.tasks.updateTask(...args),
    addEvent: (input) => sdk.events.addEvent(input),
    getBrandProfile: () => brand()?.profile() ?? null,
    listBrandAssets: () => brand()?.assets() ?? [],
    getBrandAssetData: (id) => brand()?.assetData(id) ?? null,
    /** Null while Brand Profile is not running. */
    createBrandContextSnapshot: () => brand()?.createContextSnapshot() ?? null,
    listQuickContentBatches: (filter) => drafts()?.batches(filter) ?? { items: [], total: 0, facets: { queued: 0, running: 0, review: 0, failed: 0 } },
    getQuickContentBatch: (id) => drafts()?.batch(id) ?? null,
    getQuickContentDraft: (id) => drafts()?.draft(id) ?? null
  });
}

// src/mini-apps/quick-visual/server/routes.ts
function sendImage(response, value) {
  if (!value) return response.status(404).json({ error: "Image not found" });
  response.setHeader("Content-Type", value.mime_type);
  response.setHeader("Content-Disposition", `inline; filename="${value.filename.replace(/["\r\n]/g, "")}"`);
  response.setHeader("Cache-Control", "private, max-age=60");
  return response.send(Buffer.from(value.data));
}
function createQuickVisualRouter({ service, port, router }) {
  router.get("/api/quick-visual/context-options", (_request, response, next) => {
    try {
      response.json(service.contextOptions());
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/quick-visual/batches", (request, response, next) => {
    void service.listBatches({ query: String(request.query.q ?? ""), status: String(request.query.status ?? ""), archived: request.query.archived === "1" }).then((value) => response.json(value)).catch(next);
  });
  router.get("/api/quick-visual/batches/:id", (request, response, next) => {
    void service.getBatch(request.params.id).then((value) => value ? response.json(value) : response.status(404).json({ error: "Quick Visual batch not found" })).catch(next);
  });
  router.post("/api/quick-visual/batches", (request, response, next) => {
    void service.createBatch(request.body ?? {}, `http://127.0.0.1:${port}/mini-apps/quick-visual/images`).then((value) => response.status(201).json(value)).catch(next);
  });
  router.post("/api/quick-visual/batches/:id/archive", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickVisualBatch(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-visual/batches/:id/restore", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickVisualBatch(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/quick-visual/references/:id/file", (request, response) => sendImage(response, service.store.getQuickVisualReferenceData(request.params.id)));
  router.get("/api/quick-visual/images/:id/file", (request, response) => sendImage(response, service.store.getQuickVisualImageData(request.params.id)));
  router.get("/api/quick-visual/images/:id/versions/:version/file", (request, response) => sendImage(response, service.store.getQuickVisualImageData(request.params.id, Number(request.params.version))));
  router.get("/api/quick-visual/images/:id", (request, response) => {
    const value = service.store.getQuickVisualImage(request.params.id);
    return value ? response.json(value) : response.status(404).json({ error: "Quick Visual image not found" });
  });
  router.post("/api/quick-visual/images/:id/transition", (request, response, next) => {
    try {
      response.json(service.store.transitionQuickVisualImage(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-visual/images/:id/archive", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickVisualImage(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-visual/images/:id/restore", (request, response, next) => {
    try {
      response.json(service.store.archiveQuickVisualImage(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/quick-visual/images/:id/regenerate", (request, response, next) => {
    void service.regenerateImage(request.params.id, request.body?.note, `http://127.0.0.1:${port}/mini-apps/quick-visual/images`).then((value) => response.status(201).json(value)).catch(next);
  });
  return router;
}

// src/mini-apps/quick-visual/server/service.ts
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID as randomUUID2 } from "node:crypto";
function safeFilename(value, fallback) {
  const cleaned = path.basename(value).replace(/[^A-Za-z0-9._-]+/g, "-").slice(0, 120);
  return cleaned || fallback;
}
var QUICK_VISUAL_APPLICATION_KEY = "quick-visual";
var QuickVisualService = class {
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
    return this.store.listQuickVisualBatches(input);
  }
  async getBatch(id) {
    await this.reconcileResults();
    return this.store.getQuickVisualBatch(id);
  }
  contextOptions() {
    const offers = this.store.listOffers({ status: "active", limit: 200 }).items.map((offer) => ({ id: offer.id, name: offer.name, summary: offer.summary, revision: offer.revision }));
    const contentDrafts = this.store.listQuickContentBatches({ status: "review", limit: 100 }).items.flatMap((batch) => (this.store.getQuickContentBatch(batch.id)?.drafts ?? []).filter((draft) => draft.status === "approved" && !draft.archivedAt).map((draft) => ({ id: draft.id, label: `${batch.title} \xB7 ${draft.angle}`, body: draft.body, version: draft.version })));
    const brandAssets = this.store.listBrandAssets().map((asset) => ({ id: asset.id, label: asset.filename, role: asset.role, url: asset.url }));
    return { offers, contentDrafts, brandAssets };
  }
  async createBatch(input, sourceUrl) {
    const batchId = randomUUID2();
    const parsedSource = new URL(sourceUrl);
    if (parsedSource.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(parsedSource.hostname)) throw new Error("Quick Visual source must be the local Growth Studio");
    const offer = input.offerId ? this.store.getOffer(String(input.offerId)) : null;
    if (input.offerId && (!offer || offer.archivedAt || offer.status !== "active")) throw new Error("Quick Visual requires an active Offer when one is selected");
    const contentDraft = input.quickContentDraftId ? this.store.getQuickContentDraft(String(input.quickContentDraftId)) : null;
    if (input.quickContentDraftId && (!contentDraft || contentDraft.archivedAt || contentDraft.status !== "approved")) throw new Error("Quick Visual requires an approved Quick Content draft when one is selected");
    await this.prompts.assertApplication(QUICK_VISUAL_APPLICATION_KEY);
    const brandSnapshot = input.useBrandContext && this.store.getBrandProfile() ? this.store.createBrandContextSnapshot() : null;
    const uploads = (Array.isArray(input.references) ? input.references : []).map((reference) => ({ filename: String(reference.filename ?? ""), data: Buffer.from(String(reference.dataBase64 ?? ""), "base64") }));
    const selectedAssets = (Array.isArray(input.brandAssetIds) ? input.brandAssetIds : []).map((id) => this.store.getBrandAssetData(String(id))).map((value, index) => {
      if (!value || value.asset.archivedAt) throw new Error(`Selected Brand Asset ${index + 1} is unavailable`);
      return { filename: value.asset.filename, data: value.data };
    });
    const task = this.store.createTask({ title: `Quick Visual \xB7 ${Object.values(input.brief ?? {}).find(Boolean)?.slice(0, 130) || "Untitled visual"}`, description: JSON.stringify(input.brief ?? {}), priority: "medium", source: { type: "quick-visual", referenceId: batchId, label: "Quick Visual \xB7 Content Production", evidence: [], affectedGroups: ["marketing"], quickVisualBatchId: batchId } });
    const batch = this.store.createQuickVisualBatch({ ...input, references: input.references ?? [], brandAssetIds: input.brandAssetIds ?? [], id: batchId, taskId: task.id, brandContextSnapshotId: brandSnapshot?.id ?? null, offerRevision: offer?.revision ?? null, quickContentDraftVersion: contentDraft?.version ?? null, referenceData: [...selectedAssets, ...uploads] });
    const run = await this.prepareRun(batch.id, task.id, [...selectedAssets, ...uploads]);
    const context = brandSnapshot ? JSON.stringify({ profile: brandSnapshot.profile, records: brandSnapshot.records, claims: brandSnapshot.claims, guidelines: brandSnapshot.guidelines, gaps: brandSnapshot.gaps }) : "No Brand Profile context selected.";
    void this.dispatch(task.id, batch.id, `Growth Studio \xB7 Quick Visual \xB7 ${batch.title}`, () => this.batchPrompt(batch, context, offer ? JSON.stringify(offer) : "No Offer selected.", contentDraft?.body ?? "No Quick Content draft selected.", sourceUrl, run));
    return { batch };
  }
  async regenerateImage(id, note, sourceUrl) {
    const image = this.store.getQuickVisualImage(id);
    if (!image || image.archivedAt) throw new Error("Quick Visual image is unavailable");
    const batch = this.store.getQuickVisualBatch(image.batchId);
    if (!batch || batch.archivedAt) throw new Error("Quick Visual batch is unavailable");
    const instruction = String(note ?? "").trim();
    if (!instruction || instruction.length > 4e3) throw new Error("Regeneration note is required and must stay under 4000 characters");
    await this.prompts.assertApplication(QUICK_VISUAL_APPLICATION_KEY);
    const task = this.store.createTask({ title: `Quick Visual revision \xB7 ${image.title}`.slice(0, 180), description: instruction, priority: "medium", source: { type: "quick-visual", referenceId: `${batch.id}:${image.id}:${image.version + 1}`, label: "Quick Visual \xB7 Image revision", evidence: [], affectedGroups: ["marketing"], quickVisualBatchId: batch.id, quickVisualImageId: image.id } });
    const currentData = this.store.getQuickVisualImageData(image.id);
    const run = await this.prepareRun(batch.id, task.id, [{ filename: `current-${currentData.filename}`, data: currentData.data }, ...batch.references.map((reference) => {
      const stored = this.store.getQuickVisualReferenceData(reference.id);
      return { filename: stored.filename, data: stored.data };
    })]);
    const output = run.outputs[0];
    const prompt = () => this.prompts.application(QUICK_VISUAL_APPLICATION_KEY, "visual-revision", {
      sourceUrl,
      brief: JSON.stringify(batch.brief),
      style: batch.style,
      aspectRatio: batch.aspectRatio,
      note: instruction,
      referenceList: run.references.join(", "),
      outputPathJson: output,
      temporaryResultPathJson: run.temporary,
      resultPathJson: run.final,
      taskIdJson: task.id,
      resultTitleJson: `Quick Visual revision \xB7 ${image.title}`,
      batchIdJson: batch.id,
      imagesShape: JSON.stringify([{ imageId: image.id, title: image.title, altText: image.altText, path: output }])
    }).then((rendered) => rendered.text);
    void this.dispatch(task.id, batch.id, `Growth Studio \xB7 Quick Visual revision \xB7 ${image.title}`, prompt);
    return { taskId: task.id };
  }
  async prepareRun(batchId, taskId, references) {
    const directory = path.join(this.projectRoot, ".growth-studio", "quick-visual-runs", taskId);
    await fs.mkdir(directory, { recursive: true });
    const referencePaths = [];
    for (const [index, reference] of references.entries()) {
      const target = path.join(directory, `reference-${index + 1}-${safeFilename(reference.filename, "image")}`);
      await fs.writeFile(target, reference.data);
      referencePaths.push(target);
    }
    const resultDirectory = path.join(this.projectRoot, ".growth-studio", "quick-visual-results", batchId, taskId);
    await fs.mkdir(resultDirectory, { recursive: true });
    const final = path.join(this.projectRoot, ".growth-studio", "task-results", `${taskId}.json`);
    await fs.mkdir(path.dirname(final), { recursive: true });
    return { references: referencePaths, outputs: [1, 2, 3, 4].map((index) => path.join(resultDirectory, `visual-${index}.png`)), final, temporary: `${final}.tmp` };
  }
  /** Runs in the background: Codex never comes to the front for a Quick Visual run. */
  async dispatch(taskId, batchId, title, prompt) {
    try {
      const message = await prompt() + this.codex.studioChannel(taskId);
      const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${taskId}`, title, message, this.projectRoot, { openOnCreate: false });
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, current.revision);
      this.store.markQuickVisualBatchRunning(batchId);
      this.store.addEvent({ level: "success", eventType: "quick_visual.started", title: "Quick Visual generation started", detail: `${title} \xB7 ${receipt.threadId}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const current = this.store.getTask(taskId);
      if (current) this.store.updateTask(taskId, { lastError: message }, current.revision);
      this.store.markQuickVisualBatchFailed(batchId, message);
      this.store.addEvent({ level: "failed", eventType: "quick_visual.failed", title: "Quick Visual generation failed", detail: message });
    }
  }
  async batchPrompt(batch, brand, offer, contentDraft, sourceUrl, run) {
    const outputs = run.outputs.slice(0, batch.quantity);
    const prompt = await this.prompts.application(QUICK_VISUAL_APPLICATION_KEY, "visual-batch", {
      sourceUrl,
      useCase: batch.useCase,
      brief: JSON.stringify(batch.brief),
      style: batch.style,
      aspectRatio: batch.aspectRatio,
      customInstruction: batch.customInstruction || "none",
      referenceList: run.references.length ? run.references.join(", ") : "none",
      brandContext: brand,
      offer,
      contentDraft,
      quantity: batch.quantity,
      outputPaths: outputs.map((item, index) => `${index + 1}. ${item}`).join(" ; "),
      temporaryResultPathJson: run.temporary,
      resultPathJson: run.final,
      taskIdJson: batch.taskId,
      resultTitleJson: `Quick Visual \xB7 ${batch.title}`,
      batchIdJson: batch.id,
      imagesShape: JSON.stringify(outputs.map((output, index) => ({ title: `Bi\u1EBFn th\u1EC3 ${index + 1}`, altText: `H\xECnh \u1EA3nh ${batch.title}, bi\u1EBFn th\u1EC3 ${index + 1}`, path: output })))
    });
    return prompt.text;
  }
};

// src/mini-apps/quick-visual/server/task-kind.ts
import fs2 from "node:fs/promises";
import path2 from "node:path";
var MAX_IMAGE_BYTES = 20 * 1024 * 1024;
async function readQuickVisualArtifact(envelope, dataRoot) {
  if (!envelope || typeof envelope !== "object") throw new Error("Quick Visual results must include the structured Quick Visual envelope");
  const input = envelope;
  return {
    schemaVersion: String(input.schemaVersion),
    batchId: String(input.batchId ?? "").trim(),
    images: await Promise.all((Array.isArray(input.images) ? input.images : []).map(async (image, index) => {
      const requested = String(image?.path ?? "").trim();
      const absolute = path2.resolve(dataRoot, requested);
      const relative = path2.relative(dataRoot, absolute);
      if (!requested || relative.startsWith("..") || path2.isAbsolute(relative)) throw new Error(`Quick Visual image ${index + 1} must stay inside the Growth Studio project`);
      const data = await fs2.readFile(absolute);
      if (!data.length || data.length > MAX_IMAGE_BYTES) throw new Error(`Quick Visual image ${index + 1} must be between 1 byte and 20 MB`);
      return { imageId: image.imageId ? String(image.imageId).trim() : void 0, title: String(image.title ?? "").trim(), altText: String(image.altText ?? "").trim(), filename: path2.basename(absolute), data };
    }))
  };
}
function quickVisualTaskKind(repository, dataRoot) {
  return {
    type: "quick-visual",
    result: {
      envelope: "quickVisual",
      async apply({ task, envelope }) {
        const imported = repository.applyQuickVisualResult(task.id, await readQuickVisualArtifact(envelope, dataRoot));
        if (imported.applied) {
          repository.addEvent({
            level: "success",
            eventType: "quick_visual.imported",
            title: imported.image ? "Quick Visual image revision ready" : "Quick Visual batch ready for review",
            detail: imported.image ? `${imported.image.title} \xB7 v${imported.image.version}` : `${imported.batch.title} \xB7 ${imported.batch.imageCount} images`
          });
        }
      }
    }
  };
}

// src/mini-apps/quick-visual/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createQuickVisualRepository(sdk);
    const service = new QuickVisualService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    return {
      router: createQuickVisualRouter({ service, port: sdk.port, router: sdk.router() }),
      taskKinds: [quickVisualTaskKind(repository, sdk.dataRoot)]
    };
  }
});
export {
  index_default as default
};
