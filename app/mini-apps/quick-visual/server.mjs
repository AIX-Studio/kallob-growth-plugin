import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/quick-visual/manifest.ts
var manifest = {
  id: "quick-visual",
  version: "1.6.1",
  requiresCore: ">=2.22.0 <3",
  entitlement: "quick-visual",
  exports: { "quick-visual.images": "1.0" }
};

// src/mini-apps/quick-visual/release-notes.json
var release_notes_default = [
  {
    version: "1.6.1",
    vi: "C\xE1ch thi\u1EBFt k\u1EBF \u1EA3nh d\xF9ng chung v\u1EDBi Image Studio: m\u1ED7i \u1EA3nh Codex t\u1EA1o m\u1ED9t l\u1EA7n cho nhanh, ki\u1EC3m tra ch\u1EA5t l\u01B0\u1EE3ng ngay khi thi\u1EBFt k\u1EBF; mu\u1ED1n s\u1EEDa th\xEC ghi nh\u1EADn x\xE9t. Khi \u0111\u01B0\u1EE3c giao v\u1EBD ch\u1EEF, Codex v\u1EBD \u0111\xFAng c\xE1c ch\u1EEF \u0111\xF3 nh\u01B0 m\u1ED9t ph\u1EA7n c\u1EE7a thi\u1EBFt k\u1EBF.",
    en: "The image design method shared with Image Studio: Codex makes each image once, for speed, checking quality while it designs; ask for changes with a note. When asked to draw words, Codex draws exactly those words as part of the design."
  },
  {
    version: "1.6.0",
    vi: "C\xE1ch thi\u1EBFt k\u1EBF \u1EA3nh (gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m v\xE0 khu\xF4n m\u1EB7t, nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF, l\u1EDBp ch\u1EEF) gi\u1EDD l\xE0 m\u1ED9t prompt c\u1EE7a Quick Visual, g\u1EEDi k\xE8m cho Codex m\u1ED7i l\u1EA7n. C\u1EA7n Growth Studio 0.43.0.",
    en: "The image design method (keeping the product and face exact, design principles, text layer) is one of Quick Visual's own prompts, sent to Codex every time. Needs Growth Studio 0.43.0."
  },
  {
    version: "1.5.0",
    vi: "\u1EA2nh d\xF9ng engine Social Image Design (gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m v\xE0 khu\xF4n m\u1EB7t, nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF, l\u1EDBp ch\u1EEF) thay v\xEC Content Production.",
    en: "Images use the Social Image Design engine (keeping the product and face exact, design principles, text layer) instead of Content Production."
  },
  {
    version: "1.4.1",
    vi: "T\xEAn v\xE0 m\xF4 t\u1EA3 c\u1EE7a mini-app trong danh s\xE1ch nay do Kallob qu\u1EA3n l\xFD; c\u1EA7n Growth Studio 0.29.0.",
    en: "The mini-app's name and description in the list now come from Kallob; needs Growth Studio 0.29.0."
  },
  {
    version: "1.4.0",
    vi: "Prompt v\xE0 h\u01B0\u1EDBng d\u1EABn engine c\u1EE7a Quick Visual gi\u1EDD \u0111i k\xE8m mini-app n\xE0y, c\u1EADp nh\u1EADt c\xF9ng m\u1ED7i b\u1EA3n ph\xE1t h\xE0nh n\xEAn lu\xF4n kh\u1EDBp v\u1EDBi \u1EE9ng d\u1EE5ng.",
    en: "Quick Visual's prompts and engine guides now come with this mini-app and update with each release, so they always match it."
  },
  {
    version: "1.3.0",
    vi: "\u1EA2nh \u0111\xE3 t\u1EA1o c\xF3 th\u1EC3 \u0111\u01B0\u1EE3c ch\u1ECDn trong th\u01B0 vi\u1EC7n H\xECnh \u1EA3nh c\u1EE7a Personal Brand.",
    en: "Generated images can be picked in Personal Brand's Images library."
  },
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
var server_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createQuickVisualRepository(sdk);
    const service = new QuickVisualService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    const images = {
      image: (id) => repository.getQuickVisualImage(id),
      images: () => repository.listQuickVisualBatches({ limit: 500 }).items.flatMap((batch) => repository.getQuickVisualBatch(batch.id)?.images ?? []).filter((image) => !image.archivedAt)
    };
    return {
      router: createQuickVisualRouter({ service, port: sdk.port, router: sdk.router() }),
      exports: { "quick-visual.images": images },
      taskKinds: [quickVisualTaskKind(repository, sdk.dataRoot)]
    };
  }
});

// quick-visual-package.js
var quick_visual_package_default = { ...server_default, content: { "prompts": { "social-image-design": 'C\xC1CH L\xC0M: SOCIAL IMAGE DESIGN\n\nL\xE0m vi\u1EC7c n\xE0y theo c\xE1ch l\xE0m d\u01B0\u1EDBi \u0111\xE2y. Kh\xF4ng d\xF9ng skill, playbook hay framework n\xE0o kh\xE1c \u0111\u01B0\u1EE3c c\xE0i trong Codex. Ch\u1ED7 n\xE0o kh\xE1c v\u1EDBi ph\u1EA7n giao vi\u1EC7c c\u1EE7a task (d\u1EEF li\u1EC7u, gi\u1EDBi h\u1EA1n, khu\xF4n k\u1EBFt qu\u1EA3), l\xE0m theo ph\u1EA7n giao vi\u1EC7c.\n\n## K\u1EBFt qu\u1EA3 c\u1EA7n \u0111\u1EA1t\n\nT\u1EA1o \u1EA3nh cho m\u1EA1ng x\xE3 h\u1ED9i v\xE0 b\xE1n h\xE0ng m\xE0 ng\u01B0\u1EDDi xem hi\u1EC3u trong v\xE0i gi\xE2y tr\xEAn m\xE0n h\xECnh \u0111i\u1EC7n tho\u1EA1i, gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m, \u0111\xFAng ng\u01B0\u1EDDi v\xE0 \u0111\xFAng d\u1EEF ki\u1EC7n founder \u0111\u01B0a ra.\n\nPrimary deliverable: **Review-ready social image options**.\n\nVi\u1EC7c n\xE0y ho\xE0n th\xE0nh khi m\u1ED7i ph\u01B0\u01A1ng \xE1n \u0111\u1EA1t m\u1EE5c \u0111\xEDch \u0111\xE3 h\u1EE9a, gi\u1EEF \u0111\xFAng \u1EA3nh g\u1ED1c theo quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o, kh\xF4ng c\xF3 ch\u1EEF hay d\u1EEF ki\u1EC7n b\u1ECBa, v\xE0 c\xE1c ph\u01B0\u01A1ng \xE1n kh\xE1c nhau th\u1EADt s\u1EF1.\n\n## Khi n\xE0o d\xF9ng\n\n- \u1EA2nh qu\u1EA3ng b\xE1, \u1EA3nh s\u1EA3n ph\u1EA9m, \u1EA3nh \u0111\u1EA1i di\u1EC7n, \u1EA3nh b\xECa, \u1EA3nh d\u1ECBp l\u1EC5, \u1EA3nh tuy\u1EC3n d\u1EE5ng, \u1EA3nh tr\xEDch d\u1EABn hay \u1EA3nh minh h\u1ECDa cho b\xE0i vi\u1EBFt.\n- C\xF3 brief, m\u1EE5c \u0111\xEDch v\xE0 n\u01A1i \u0111\u0103ng; c\xF3 th\u1EC3 c\xF3 \u1EA3nh \u0111\u1EA7u v\xE0o v\xE0 d\u1EEF ki\u1EC7n ch\xEDnh x\xE1c (gi\xE1, ng\xE0y, \u01B0u \u0111\xE3i).\n\nKh\xF4ng d\xF9ng c\xE1ch l\xE0m n\xE0y khi:\n\n- c\u1EA7n video, b\u1ED9 nh\u1EADn di\u1EC7n th\u01B0\u01A1ng hi\u1EC7u \u0111\u1EA7y \u0111\u1EE7 hay thi\u1EBFt k\u1EBF in \u1EA5n k\u1EF9 thu\u1EADt;\n- y\xEAu c\u1EA7u \u0111\xF2i t\u1EA1o \u1EA3nh gi\u1EA3 m\u1EA1o ng\u01B0\u1EDDi th\u1EADt, gi\u1EA5y t\u1EDD hay b\u1EB1ng ch\u1EE9ng.\n\n## \u0110\u1ECBnh ngh\u0129a c\xF4ng vi\u1EC7c\n\n| Th\xE0nh ph\u1EA7n | \u0110\u1ECBnh ngh\u0129a |\n|---|---|\n| Khi b\u1EAFt \u0111\u1EA7u | C\xF3 brief \u1EA3nh, m\u1EE5c \u0111\xEDch v\xE0 n\u01A1i \u0111\u0103ng |\n| Ng\u01B0\u1EDDi ch\u1ECBu tr\xE1ch nhi\u1EC7m | Founder ho\u1EB7c ng\u01B0\u1EDDi ph\u1EE5 tr\xE1ch n\u1ED9i dung |\n| \u0110\u01A1n v\u1ECB c\xF4ng vi\u1EC7c | M\u1ED9t l\u01B0\u1EE3t t\u1EA1o g\u1ED3m s\u1ED1 ph\u01B0\u01A1ng \xE1n task y\xEAu c\u1EA7u, ho\u1EB7c m\u1ED9t l\u01B0\u1EE3t s\u1EEDa |\n| \u0110\u1EA7u ra | C\xE1c ph\u01B0\u01A1ng \xE1n \u1EA3nh m\u1EA1ng x\xE3 h\u1ED9i s\u1EB5n s\xE0ng \u0111\u1EC3 duy\u1EC7t |\n| B\u1EB1ng ch\u1EE9ng ho\xE0n th\xE0nh | M\u1ED7i ph\u01B0\u01A1ng \xE1n \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EF1 ki\u1EC3m theo m\u1EE5c \u0111\xEDch, quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o, l\u1EDBp ch\u1EEF, \u0111\u1ECBnh d\u1EA1ng v\xE0 l\u1ED7i h\xECnh |\n| \u0110i\u1EC3m duy\u1EC7t c\u1EE7a con ng\u01B0\u1EDDi | Founder ch\u1ECDn ph\u01B0\u01A1ng \xE1n ho\u1EB7c y\xEAu c\u1EA7u s\u1EEDa tr\u01B0\u1EDBc khi d\xF9ng |\n| \u0110i\u1EC1u h\u1ECDc \u0111\u01B0\u1EE3c | H\u01B0\u1EDBng thi\u1EBFt k\u1EBF n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn v\xE0 v\xEC sao \u0111\u01B0\u1EE3c \u0111\u1EC1 xu\u1EA5t v\xE0o content learnings |\n\n## Ph\u1EA1m vi\n\n- C\xE1ch l\xE0m n\xE0y lo c\xE1ch thi\u1EBFt k\u1EBF: b\u1ED1 c\u1EE5c, th\u1EE9 b\u1EADc, m\xE0u, \xE1nh s\xE1ng, \u0111\u1EA1o c\u1EE5, gi\u1EEF \u1EA3nh g\u1ED1c v\xE0 t\u1EF1 ki\u1EC3m.\n- Task quy\u1EBFt \u0111\u1ECBnh d\u1EEF ki\u1EC7n ch\xEDnh x\xE1c, l\u1EDBp ch\u1EEF do Studio v\u1EBD, s\u1ED1 ph\u01B0\u01A1ng \xE1n, \u0111\u1ECBnh d\u1EA1ng v\xE0 c\xE1ch l\u01B0u k\u1EBFt qu\u1EA3.\n- Kh\xF4ng \u0111\u0103ng, l\xEAn l\u1ECBch hay g\u1EEDi \u1EA3nh.\n\n## B\u1ED1i c\u1EA3nh c\u1EA7n \u0111\u1ECDc\n\n\u0110\u1ECDc ch\u1ECDn l\u1ECDc m\xE0u th\u01B0\u01A1ng hi\u1EC7u, phong c\xE1ch h\xECnh \u1EA3nh, kh\xE1n gi\u1EA3 v\xE0 \u0111i\u1EC1u c\u1EA7n tr\xE1nh; ch\u1EC9 m\u1EDF v\xE0i t\u1EC7p quan tr\u1ECDng v\xE0 kh\xF4ng b\u1ECBa quy t\u1EAFc th\u01B0\u01A1ng hi\u1EC7u. \u1EA2nh phong c\xE1ch founder l\u01B0u l\xE0 chu\u1EA9n v\u1EC1 b\u1EA3ng m\xE0u, \xE1nh s\xE1ng, b\u1ED1 c\u1EE5c v\xE0 c\xE1ch d\u1EF1ng h\xECnh, kh\xF4ng ph\u1EA3i ch\u1EE7 th\u1EC3 hay ch\u1EEF \u0111\u1EC3 sao ch\xE9p.\n\n- brand colours and visual style\n- audience\n- things to avoid\n- style images\n\n## \u0110\u1EA7u v\xE0o t\u1ED1i thi\u1EC3u\n\n- M\u1EE5c \u0111\xEDch \u1EA3nh, \u0111i\u1EC1u founder \u0111\u01B0\u1EE3c h\u1EE9a v\xE0 n\u01A1i \u0111\u0103ng.\n- \u0110\u1ECBnh d\u1EA1ng v\xE0 t\u1EC9 l\u1EC7 khung.\n- \u1EA2nh \u0111\u1EA7u v\xE0o v\xE0 lo\u1EA1i c\u1EE7a ch\xFAng, n\u1EBFu c\xF3.\n- D\u1EEF ki\u1EC7n ch\xEDnh x\xE1c v\xE0 k\u1EBF ho\u1EA1ch l\u1EDBp ch\u1EEF, n\u1EBFu c\xF3.\n\n## C\xE2u h\u1ECFi \u0111\u1ECBnh h\u01B0\u1EDBng\n\n- Ng\u01B0\u1EDDi xem c\u1EA7n hi\u1EC3u \u0111i\u1EC1u g\xEC trong n\u0103m gi\xE2y \u0111\u1EA7u, \u1EDF k\xEDch th\u01B0\u1EDBc thumbnail \u0111i\u1EC7n tho\u1EA1i?\n- \u0110\xE2u l\xE0 ch\u1EE7 th\u1EC3 ch\xEDnh, v\xE0 \u0111i\u1EC1u g\xEC ph\u1EA3i gi\u1EEF nguy\xEAn tuy\u1EC7t \u0111\u1ED1i t\u1EEB \u1EA3nh g\u1ED1c?\n- \u1EA2nh n\xE0y sang tr\u1ECDng, kh\u1EA9n c\u1EA5p hay \u1EA5m \xE1p nh\u1EDD \u0111\xE2u: \xE1nh s\xE1ng, ch\u1EA5t li\u1EC7u, kho\u1EA3ng tr\u1ED1ng hay m\xE0u?\n\n## Quy tr\xECnh\n\n1. M\u1EDF v\xE0 xem k\u1EF9 t\u1EEBng \u1EA3nh \u0111\u1EA7u v\xE0o; \xE1p d\u1EE5ng quy t\u1EAFc gi\u1EEF \u1EA3nh g\u1ED1c theo lo\u1EA1i (m\u1EE5c 14.1).\n2. \u0110\u1ECDc ghi ch\xFA thi\u1EBFt k\u1EBF c\u1EE7a lo\u1EA1i \u1EA3nh v\xE0 b\u1ED1i c\u1EA3nh th\u01B0\u01A1ng hi\u1EC7u; khi task y\xEAu c\u1EA7u nghi\xEAn c\u1EE9u m\u1EDBi, t\xECm c\xE1c v\xED d\u1EE5 m\u1EA1nh g\u1EA7n \u0111\xE2y cho kh\xE1n gi\u1EA3 Vi\u1EC7t Nam v\xE0 ghi l\u1EA1i \u0111i\u1EC1u l\xE0m ch\xFAng hi\u1EC7u qu\u1EA3 (b\u1ED1 c\u1EE5c, th\u1EE9 b\u1EADc, b\u1EA3ng m\xE0u, \xE1nh s\xE1ng, \u0111\u1EA1o c\u1EE5).\n3. C\xE2n nh\u1EAFc hai \u0111\u1EBFn ba h\u01B0\u1EDBng thi\u1EBFt k\u1EBF (b\u1ED1 c\u1EE5c, b\u1ED1i c\u1EA3nh, c\u1EA3m x\xFAc) v\xE0 ch\u1ECDn h\u01B0\u1EDBng m\u1EA1nh nh\u1EA5t; khi c\u1EA7n nhi\u1EC1u ph\u01B0\u01A1ng \xE1n, m\u1ED7i ph\u01B0\u01A1ng \xE1n l\xE0 m\u1ED9t h\u01B0\u1EDBng kh\xE1c nhau th\u1EADt s\u1EF1.\n4. T\u1EA1o \u1EA3nh theo nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF (m\u1EE5c 14.2) v\xE0 quy t\u1EAFc l\u1EDBp ch\u1EEF (m\u1EE5c 14.3).\n5. Ki\u1EC3m theo m\u1EE5c 10 ngay khi thi\u1EBFt k\u1EBF v\xE0 vi\u1EBFt y\xEAu c\u1EA7u t\u1EA1o \u1EA3nh; m\u1ED7i \u1EA3nh ch\u1EC9 t\u1EA1o m\u1ED9t l\u1EA7n, kh\xF4ng m\u1EDF l\u1EA1i \u0111\u1EC3 s\u1EEDa hay t\u1EA1o l\u1EA1i. Founder y\xEAu c\u1EA7u s\u1EEDa trong Studio.\n\n## C\u1EA5u tr\xFAc k\u1EBFt qu\u1EA3\n\nC\xE1c t\u1EC7p \u1EA3nh theo \u0111\u1ECBnh d\u1EA1ng task y\xEAu c\u1EA7u, m\u1ED7i ph\u01B0\u01A1ng \xE1n k\xE8m m\u1ED9t d\xF2ng m\xF4 t\u1EA3 ng\u1EAFn \u0111i\u1EC1u l\xE0m n\xF3 kh\xE1c c\xE1c ph\u01B0\u01A1ng \xE1n c\xF2n l\u1EA1i.\n\n## Ti\xEAu ch\xED ki\u1EC3m tra\n\n- [ ] \u0110\u1EA1t m\u1EE5c \u0111\xEDch v\xE0 \u0111i\u1EC1u founder \u0111\u01B0\u1EE3c h\u1EE9a.\n- [ ] Gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m, \u0111\xFAng khu\xF4n m\u1EB7t, \u0111\xFAng \u1EA3nh ch\u1EE5p m\xE0n h\xECnh theo quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o.\n- [ ] L\u1EDBp ch\u1EEF \u0111\xFAng k\u1EBF ho\u1EA1ch: kh\xF4ng c\xF3 ch\u1EEF l\u1EA1c, v\xF9ng \u0111\u1EC3 ch\u1EEF \u0111\u01B0\u1EE3c gi\u1EEF s\u1EA1ch, ch\u1EEF trong \u1EA3nh (n\u1EBFu c\xF3) \u0111\xFAng ch\xEDnh t\u1EA3 v\xE0 d\u1EA5u ti\u1EBFng Vi\u1EC7t.\n- [ ] \u0110\xFAng \u0111\u1ECBnh d\u1EA1ng v\xE0 t\u1EC9 l\u1EC7 khung.\n- [ ] Kh\xF4ng l\u1ED7i h\xECnh: s\u1EA3n ph\u1EA9m m\xE9o, th\u1EEBa ng\xF3n tay, ch\u1EEF v\u1EE1.\n- [ ] C\xE1c ph\u01B0\u01A1ng \xE1n kh\xE1c nhau th\u1EADt s\u1EF1.\n\n## Gi\u1EDBi h\u1EA1n v\xE0 khi n\xE0o c\u1EA7n h\u1ECFi l\u1EA1i\n\n- Kh\xF4ng b\u1ECBa gi\xE1, \u01B0u \u0111\xE3i, ng\xE0y, claim hay l\u1EDDi ch\u1EE9ng th\u1EF1c ngo\xE0i d\u1EEF ki\u1EC7n founder nh\u1EADp.\n- Kh\xF4ng bi\u1EBFn s\u1EA3n ph\u1EA9m th\xE0nh s\u1EA3n ph\u1EA9m kh\xE1c hay "\u0111\u1EB9p h\u01A1n"; kh\xF4ng l\xE0m \u0111\u1EB9p, l\xE0m m\u1ECBn da, l\xE0m thon ng\u01B0\u1EDDi khi kh\xF4ng \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- Kh\xF4ng th\xEAm d\u1EA5u hi\u1EC7u s\xE0n th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED, logo hay huy hi\u1EC7u kh\xF4ng \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- H\u1ECFi l\u1EA1i khi kh\xF4ng r\xF5 ng\u01B0\u1EDDi n\xE0o trong \u1EA3nh l\xE0 ng\u01B0\u1EDDi c\u1EA7n gi\u1EEF.\n\n## D\u1EA5u hi\u1EC7u l\xE0m t\u1ED1t\n\n- Ph\u01B0\u01A1ng \xE1n \u0111\u01B0\u1EE3c ch\u1ECDn ngay, kh\xF4ng c\u1EA7n s\u1EEDa.\n- S\u1ED1 l\u01B0\u1EE3t s\u1EEDa trung b\xECnh tr\u01B0\u1EDBc khi duy\u1EC7t.\n- H\u01B0\u1EDBng thi\u1EBFt k\u1EBF \u0111\u01B0\u1EE3c ch\u1ECDn l\u1EB7p l\u1EA1i theo lo\u1EA1i \u1EA3nh.\n\n## Ph\u01B0\u01A1ng ph\xE1p chi ti\u1EBFt\n\n### 14.1 Gi\u1EEF \u1EA3nh g\u1ED1c theo lo\u1EA1i \u1EA3nh \u0111\u1EA7u v\xE0o\n\n- **product** \u2014 t\xE1ch s\u1EA3n ph\u1EA9m: b\u1ECF n\u1EC1n g\u1ED1c v\xE0 m\u1ECDi th\u1EE9 \u0111\xE8 l\xEAn \u1EA3nh (ch\u1EEF, sticker, watermark, tem gi\xE1, khung). Gi\u1EEF ch\xEDnh x\xE1c s\u1EA3n ph\u1EA9m: h\xECnh d\xE1ng, t\u1EC9 l\u1EC7, m\xE0u, ch\u1EA5t li\u1EC7u, logo v\xE0 ch\u1EEF in tr\xEAn s\u1EA3n ph\u1EA9m ho\u1EB7c bao b\xEC. Kh\xF4ng bi\u1EBFn n\xF3 th\xE0nh s\u1EA3n ph\u1EA9m kh\xE1c hay "c\u1EA3i ti\u1EBFn".\n- **portrait** \u2014 ng\u01B0\u1EDDi trong \u1EA3nh ph\u1EA3i nh\u1EADn ra \u0111\u01B0\u1EE3c l\xE0 c\xF9ng m\u1ED9t ng\u01B0\u1EDDi. Gi\u1EEF n\xE9t m\u1EB7t v\xE0 khu\xF4n m\u1EB7t, m\xE0u da v\xE0 k\u1EBFt c\u1EA5u da th\u1EADt, tu\u1ED5i, ch\xE2n t\xF3c, r\xE2u, d\u1EA5u ri\xEAng (n\u1ED1t ru\u1ED3i, s\u1EB9o), k\xEDnh (c\xF9ng g\u1ECDng), t\u1EC9 l\u1EC7 c\u01A1 th\u1EC3 v\xE0 m\xE0u t\xF3c. T\u01B0 th\u1EBF, c\u1EED ch\u1EC9, trang ph\u1EE5c, ph\u1EE5 ki\u1EC7n, ki\u1EC3u t\xF3c, b\u1ED1i c\u1EA3nh, \xE1nh s\xE1ng v\xE0 g\xF3c m\xE1y c\xF3 th\u1EC3 \u0111\u1ED5i cho h\u1EE3p lo\u1EA1i \u1EA3nh; bi\u1EC3u c\u1EA3m ch\u1EC9 ch\u1EC9nh nh\u1EB9. Kh\xF4ng l\xE0m m\u1ECBn hay l\xE0m s\xE1ng da, kh\xF4ng l\xE0m thon m\u1EB7t hay ng\u01B0\u1EDDi, kh\xF4ng th\xEAm trang \u0111i\u1EC3m hay trang s\u1EE9c, kh\xF4ng l\xE0m \u0111\u1EB9p tr\u1EEB khi \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u. B\u1ECF n\u1EC1n g\u1ED1c, ng\u01B0\u1EDDi kh\xE1c v\xE0 m\u1ECDi ch\u1EEF. Nhi\u1EC1u \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi: d\xF9ng t\u1EA5t c\u1EA3 \u0111\u1EC3 gi\u1EEF n\xE9t gi\u1ED1ng.\n- **screenshot** \u2014 gi\u1EEF \u1EA3nh ch\u1EE5p m\xE0n h\xECnh y nguy\xEAn, t\u1EEBng ch\u1EEF, t\xEAn, emoji v\xE0 m\u1ED1c gi\u1EDD; ch\u1EC9 \u0111\xF3ng khung v\xE0 tr\xECnh b\xE0y. Kh\xF4ng g\xF5 l\u1EA1i, d\u1ECBch hay l\xE0m m\u1EDD g\xEC tr\u1EEB khi \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- **shop** \u2014 d\xF9ng \u0111\u1ECBa \u0111i\u1EC3m l\xE0m b\u1ED1i c\u1EA3nh th\u1EADt v\xE0 gi\u1EEF c\xE1c \u0111\u1EB7c \u0111i\u1EC3m nh\u1EADn ra \u0111\u01B0\u1EE3c.\n- **any** \u2014 d\xF9ng \u1EA3nh theo brief v\xE0 ghi ch\xFA (m\u1ED9t ch\u1EE7 th\u1EC3 c\u1EA7n c\xF3, m\u1ED9t s\u1EA3n ph\u1EA9m, ho\u1EB7c ch\xEDnh founder).\n- **none** \u2014 kh\xF4ng c\xF3 \u1EA3nh \u0111\u1EA7u v\xE0o.\n\n### 14.2 Nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF cho m\u1ECDi \u1EA3nh\n\n- M\u1ED9t ch\u1EE7 th\u1EC3 ch\xEDnh v\xE0 th\u1EE9 b\u1EADc r\xF5 (\u01B0u \u0111\xE3i, r\u1ED3i s\u1EA3n ph\u1EA9m, r\u1ED3i trang tr\xED), t\u1ED1i \u0111a ba m\xE0u; ph\u1EA3i \u0111\u1ECDc \u0111\u01B0\u1EE3c trong d\u01B0\u1EDBi n\u0103m gi\xE2y \u1EDF k\xEDch th\u01B0\u1EDBc thumbnail \u0111i\u1EC7n tho\u1EA1i.\n- Sang tr\u1ECDng \u0111\u1EBFn t\u1EEB \xE1nh s\xE1ng d\u1ECBu, ch\u1EA5t li\u1EC7u v\xE0 kho\u1EA3ng tr\u1ED1ng; kh\u1EA9n c\u1EA5p \u0111\u1EBFn t\u1EEB m\xE0u v\xE0 \xE1nh s\xE1ng, kh\xF4ng bao gi\u1EDD t\u1EEB vi\u1EC7c ch\u1ED3ng hi\u1EC7u \u1EE9ng. \u1EA2nh trang tr\xED qu\xE1 tay tr\xF4ng r\u1EBB.\n- Hi\u1EC7n s\u1EA3n ph\u1EA9m \u0111\xFAng nh\u01B0 \u1EA3nh ch\u1EE5p v\xE0 th\u1EA5y tr\u1ECDn v\u1EB9n; kh\xF4ng nh\xE2n b\u1EA3n s\u1EA3n ph\u1EA9m, kh\xF4ng th\xEAm d\u1EA5u hi\u1EC7u s\xE0n.\n- Gi\u1EEF v\u0103n h\xF3a Vi\u1EC7t Nam c\u1EE5 th\u1EC3: hoa mai \u1EDF mi\u1EC1n Nam, hoa \u0111\xE0o \u1EDF mi\u1EC1n B\u1EAFc, b\xE1nh ch\u01B0ng v\xE0 b\xE1nh t\xE9t, l\xEC x\xEC, \u0111\xE8n \xF4ng sao, \xE1o d\xE0i. Kh\xF4ng d\xF9ng ch\u1EEF H\xE1n, r\u1ED3ng ki\u1EC3u Trung Qu\u1ED1c hay con th\u1ECF trong m\u01B0\u1EDDi hai con gi\xE1p (Vi\u1EC7t Nam l\xE0 con m\xE8o).\n- N\u1ED5i b\u1EADt kh\u1ECFi m\xE0u cam c\u1EE7a s\xE0n th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED thay v\xEC h\xF2a l\u1EABn v\xE0o \u0111\xF3.\n\n### 14.3 L\u1EDBp ch\u1EEF\n\n- Khi task giao cho b\u1EA1n t\u1EF1 v\u1EBD m\u1ED9t s\u1ED1 ch\u1EEF: v\u1EBD \u0111\xFAng c\xE1c ch\u1EEF \u0111\xF3 nh\u01B0 m\u1ED9t ph\u1EA7n c\u1EE7a thi\u1EBFt k\u1EBF (th\u1EE9 b\u1EADc r\xF5, \u0111\u1EE7 l\u1EDBn \u0111\u1EC3 \u0111\u1ECDc tr\xEAn \u0111i\u1EC7n tho\u1EA1i, t\u01B0\u01A1ng ph\u1EA3n m\u1EA1nh v\u1EDBi n\u1EC1n, m\xE0u th\u01B0\u01A1ng hi\u1EC7u), \u0111\u1EB7t ch\u1EE7 y\u1EBFu trong v\xF9ng \u0111\u01B0\u1EE3c ch\u1EC9 \u0111\u1ECBnh v\xE0 kh\xF4ng che m\u1EB7t, s\u1EA3n ph\u1EA9m hay \u1EA3nh ch\u1EE5p m\xE0n h\xECnh. Ngo\xE0i c\xE1c ch\u1EEF \u0111\xF3, kh\xF4ng th\xEAm ch\u1EEF n\xE0o kh\xE1c.\n- Khi Studio s\u1EBD v\u1EBD ch\u1EEF l\xEAn tr\xEAn \u1EA3nh: kh\xF4ng v\u1EBD ch\u1EEF, s\u1ED1, gi\xE1, logo, huy hi\u1EC7u hay tem gi\xE1 n\xE0o trong \u1EA3nh. Gi\u1EEF v\xF9ng \u0111\u01B0\u1EE3c ch\u1EC9 \u0111\u1ECBnh y\xEAn, \xEDt chi ti\u1EBFt, \u0111\u1EC1u t\xF4ng \u0111\u1EC3 ch\u1EEF \u0111\u1ECDc \u0111\u01B0\u1EE3c ngay, v\xE0 thi\u1EBFt k\u1EBF b\u1EE9c \u1EA3nh quanh kho\u1EA3ng tr\u1ED1ng \u0111\xF3 (t\u01B0\u01A1ng ph\u1EA3n, \xE1nh s\xE1ng, kho\u1EA3ng tr\u1ED1ng). \u1EA2nh v\u1EABn ph\u1EA3i tr\xF4ng ho\xE0n ch\u1EC9nh tr\u01B0\u1EDBc khi th\xEAm ch\u1EEF.\n- Khi kh\xF4ng c\xF3 l\u1EDBp ch\u1EEF: ch\u1EC9 \u0111\u01B0a ch\u1EEF v\xE0o \u1EA3nh khi brief ho\u1EB7c ghi ch\xFA y\xEAu c\u1EA7u, vi\u1EBFt \u0111\xFAng ch\xEDnh x\xE1c v\u1EDBi d\u1EA5u ti\u1EBFng Vi\u1EC7t.\n- Khi c\xF3 ch\u1EEF \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u: gi\u1EEF nguy\xEAn ch\xEDnh t\u1EA3, d\u1EA5u, ng\xE0y, gi\u1EDD, gi\xE1, t\xEAn v\xE0 l\u1EDDi k\xEAu g\u1ECDi h\xE0nh \u0111\u1ED9ng.\n', "visual-batch": 'Create a review-ready image batch for Kallob Growth Studio.\n\n{{> social-image-design}}\n\nUse the runtime image generation capability.\n\nSOURCE UI\n{{sourceUrl}}\n\nCONFIRMED INPUT\nUse case: {{useCase}}\nBrief: {{brief}}\nStyle direction: {{style}}\nAspect ratio: {{aspectRatio}}\nCustom instruction: {{customInstruction}}\nReference images: {{referenceList}}\nFrozen Brand Context: {{brandContext}}\nSelected Offer: {{offer}}\nApproved Quick Content draft: {{contentDraft}}\n\nEXECUTION RULES\n- Generate exactly {{quantity}} genuinely distinct image variants from the same brief.\n- Treat the supplied information as semantic intent. Do not over-specify or micromanage the composition.\n- When text is requested, preserve spelling, accents, dates, times, prices, names, and calls to action exactly.\n- Use reference images as visual/source references, not as permission to invent facts.\n- Do not publish, schedule, or modify any other KGS record.\n- Save final PNG images at these exact paths: {{outputPaths}}\n\nFINALIZATION\nAfter the image files exist, write plain JSON to {{temporaryResultPathJson}} and atomically rename it to {{resultPathJson}}. Use exactly this shape:\n{\n  "taskId": {{taskIdJson}},\n  "title": {{resultTitleJson}},\n  "summary": "{{quantity}} bi\u1EBFn th\u1EC3 h\xECnh \u1EA3nh \u0111\xE3 s\u1EB5n s\xE0ng \u0111\u1EC3 duy\u1EC7t.",\n  "owner": "Founder",\n  "deliverableType": "Quick Visual batch",\n  "content": "\u0110\xE3 t\u1EA1o {{quantity}} bi\u1EBFn th\u1EC3 h\xECnh \u1EA3nh t\u1EEB brief \u0111\xE3 x\xE1c nh\u1EADn.",\n  "sources": ["Quick Visual brief, selected context, and reference images"],\n  "qualityChecks": ["brief reflected", "requested copy preserved", "variants are distinct", "human review required"],\n  "quickVisual": { "schemaVersion": "quick-visual-v1", "batchId": {{batchIdJson}}, "images": {{imagesShape}} }\n}\nThe images array must contain exactly {{quantity}} objects. After writing the artifact, stop.\n', "visual-revision": 'Revise one generated image for Kallob Growth Studio.\n\n{{> social-image-design}}\n\nUse the runtime image generation capability.\n\nSource UI: {{sourceUrl}}\nConfirmed brief: {{brief}}\nStyle: {{style}}\nAspect ratio: {{aspectRatio}}\nThe first reference image is the current image to revise.\nRevision note: {{note}}\nReference images: {{referenceList}}\n\nGenerate exactly one revised image. Treat the brief and note as semantic intent; do not micromanage layout. Preserve exact supplied copy when the image contains text. Save the final image as PNG at {{outputPathJson}}. Then write plain JSON to {{temporaryResultPathJson}} and atomically rename it to {{resultPathJson}} with this shape:\n{\n  "taskId": {{taskIdJson}},\n  "title": {{resultTitleJson}},\n  "summary": "M\u1ED9t bi\u1EBFn th\u1EC3 h\xECnh \u1EA3nh \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o l\u1EA1i v\xE0 \u0111ang ch\u1EDD duy\u1EC7t.",\n  "owner": "Founder",\n  "deliverableType": "Quick Visual image revision",\n  "content": "\u0110\xE3 t\u1EA1o l\u1EA1i m\u1ED9t h\xECnh \u1EA3nh theo y\xEAu c\u1EA7u v\xE0 l\u01B0u v\xE0o th\u01B0 vi\u1EC7n Quick Visual.",\n  "sources": ["Quick Visual brief and revision note"],\n  "qualityChecks": ["requested change reflected", "human review required"],\n  "quickVisual": { "schemaVersion": "quick-visual-v1", "batchId": {{batchIdJson}}, "images": {{imagesShape}} }\n}\nAfter writing the artifact, stop.\n' } } };
export {
  quick_visual_package_default as default
};
