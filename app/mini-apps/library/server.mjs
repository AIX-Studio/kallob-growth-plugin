import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/library/contract.ts
var LIBRARY_ITEM_KINDS = ["image", "article", "document"];
var LIBRARY_DOCUMENT_TYPES = ["ebook", "checklist", "report", "guide", "template", "other"];
var librarySourceInterface = (app) => `${app}.library-source`;
var LIBRARY_ASSETS = { name: "library.assets", version: "1.0" };

// src/mini-apps/library/manifest.ts
var manifest = {
  id: "library",
  version: "1.0.0",
  requiresCore: ">=2.8.0 <3",
  exports: { "library.assets": "1.0" }
};

// src/mini-apps/library/release-notes.json
var release_notes_default = [
  {
    version: "1.0.0",
    vi: "Th\u01B0 vi\u1EC7n: m\u1ED9t n\u01A1i chung cho \u1EA3nh, b\xE0i vi\u1EBFt v\xE0 t\xE0i li\u1EC7u (ebook, checklist, b\xE1o c\xE1o\u2026) m\xE0 c\xE1c mini-app l\xE0m ra v\xE0 d\xF9ng l\u1EA1i. \u1EA2nh \u0111\xE3 duy\u1EC7t trong Image Studio v\xE0 b\xE0i vi\u1EBFt \u0111\xE3 duy\u1EC7t trong Personal Brand t\u1EF1 c\xF3 m\u1EB7t trong Th\u01B0 vi\u1EC7n, k\xE8m n\u01A1i ch\xFAng \u0111\u01B0\u1EE3c t\u1EA1o; nh\u1EEFng g\xEC \u0111\xE3 c\xF3 t\u1EEB tr\u01B0\u1EDBc c\u0169ng \u0111\u01B0\u1EE3c \u0111\u01B0a v\xE0o (kh\xF4ng tr\xF9ng). M\u1ED7i th\u1EE9 ch\u1EC9 c\xF3 m\u1ED9t b\u1EA3n: Th\u01B0 vi\u1EC7n kh\xF4ng sao ch\xE9p t\u1EC7p hay ch\u1EEF, b\xE0i vi\u1EBFt lu\xF4n hi\u1EC7n \u0111\xFAng b\u1EA3n \u0111ang c\xF3 trong Personal Brand, v\xE0 n\u1ED9i dung c\u1EE7a ch\xFAng s\u1EEDa \u1EDF n\u01A1i t\u1EA1o ra (n\xFAt S\u1EEDa trong Personal Brand); \u1EDF Th\u01B0 vi\u1EC7n b\u1EA1n \u0111\u1ED5i t\xEAn hi\u1EC3n th\u1ECB, nh\xE3n, \u0111\u01B0\u1EDDng d\u1EABn c\xF4ng khai v\xE0 l\u01B0u tr\u1EEF. B\u1EA1n c\u0169ng t\u1EF1 th\xEAm ebook, checklist, \u1EA3nh c\u1EE7a m\xECnh r\u1ED3i s\u1EEDa, thay t\u1EC7p, l\u01B0u tr\u1EEF, kh\xF4i ph\u1EE5c; m\u1ED7i l\u1EA7n s\u1EEDa gi\u1EEF l\u1EA1i m\u1ED9t phi\xEAn b\u1EA3n. T\xECm theo ch\u1EEF, l\u1ECDc theo lo\u1EA1i, ngu\u1ED3n v\xE0 nh\xE3n, xem d\u1EA1ng l\u01B0\u1EDBi ho\u1EB7c danh s\xE1ch. C\xE1c mini-app kh\xE1c m\u1EDF n\xFAt Ch\u1ECDn t\u1EEB Th\u01B0 vi\u1EC7n \u0111\u1EC3 d\xF9ng l\u1EA1i m\u1ED9t m\u1EE5c.",
    en: "Library: one shared place for the images, articles and documents (ebooks, checklists, reports\u2026) your mini-apps make and reuse. Images approved in Image Studio and articles approved in Personal Brand appear in the Library by themselves, with where they were made; what you already had is brought in too (no duplicates). Each thing exists once: the Library copies no file and no text, an article always shows what Personal Brand has now, and its content is edited where it was made (Edit in Personal Brand); in the Library you change the display title, tags, public link and archive. You can also add your own ebooks, checklists and pictures and edit, replace, archive and restore them; every edit is kept as a version. Search by words, filter by kind, source and tag, view as a grid or a list. Other mini-apps open Choose from Library to reuse an item."
  }
];

// src/mini-apps/library/server/files.ts
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
var MAX_LIBRARY_FILE_BYTES = 25 * 1024 * 1024;
var extensions = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "text/plain": "txt",
  "text/markdown": "md",
  "text/csv": "csv",
  "application/epub+zip": "epub",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx"
};
var byExtension = Object.fromEntries(Object.entries(extensions).map(([mime, extension]) => [extension, mime]));
byExtension.jpeg = "image/jpeg";
byExtension.markdown = "text/markdown";
var isImageType = (mimeType) => mimeType.startsWith("image/");
function libraryFileType(data, name) {
  const bytes = Buffer.from(data.buffer, data.byteOffset, Math.min(data.byteLength, 16));
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "image/png";
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
  if (bytes.subarray(0, 4).toString("latin1") === "GIF8") return "image/gif";
  if (bytes.subarray(0, 4).toString("latin1") === "RIFF" && bytes.subarray(8, 12).toString("latin1") === "WEBP") return "image/webp";
  if (bytes.subarray(0, 4).toString("latin1") === "%PDF") return "application/pdf";
  const extension = path.extname(name).slice(1).toLowerCase();
  const named = byExtension[extension];
  if (!named || isImageType(named) || named === "application/pdf") return null;
  if (["docx", "pptx", "xlsx", "epub"].includes(extension)) return bytes[0] === 80 && bytes[1] === 75 ? named : null;
  const text2 = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  if (text2.includes(0)) return null;
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(text2);
  } catch {
    return null;
  }
  return named;
}
var sha256 = (data) => createHash("sha256").update(data).digest("hex");
var cleanName = (name, fallback) => path.basename(name.replace(/\\/g, "/")).replace(/[\u0000-\u001f]/g, "").trim().slice(0, 200) || fallback;
var LibraryFiles = class {
  constructor(dataRoot, brandAssets) {
    this.brandAssets = brandAssets;
    this.root = path.resolve(dataRoot);
    this.own = path.join(this.root, ".growth-studio", "library", "files");
  }
  brandAssets;
  root;
  own;
  inside(file) {
    const real = realpathSync(file);
    const root = realpathSync(this.root);
    if (real !== root && !real.startsWith(root + path.sep)) throw new Error("A Library file must be inside the Growth Studio data folder.");
    return real;
  }
  /** Checks a file given for an item and records where it is (storing bytes only when they are new). */
  prepare(input) {
    if ("brandAssetId" in input) {
      const found = this.brandAssets()?.assetData(String(input.brandAssetId));
      if (!found) throw new Error("Brand Profile asset not found (Brand Profile must be running).");
      return { storage: "brand-asset", ref: found.asset.id, name: cleanName(found.asset.filename, "anh"), mimeType: found.asset.mimeType, bytes: found.data.byteLength, sha256: found.asset.sha256 || sha256(found.data) };
    }
    if ("path" in input) {
      const real = this.inside(path.resolve(String(input.path)));
      const stat = statSync(real);
      if (!stat.isFile()) throw new Error("A Library file must be a file.");
      if (stat.size > MAX_LIBRARY_FILE_BYTES) throw new Error("The file is larger than 25 MB.");
      const data2 = readFileSync(real);
      const name2 = cleanName(input.name ?? path.basename(real), path.basename(real));
      const mimeType2 = libraryFileType(data2, real) ?? libraryFileType(data2, name2);
      if (!mimeType2) throw new Error("The Library keeps pictures (PNG, JPEG, GIF, WebP), PDF, text and Office documents.");
      return { storage: "data-root", ref: path.relative(realpathSync(this.root), real).split(path.sep).join("/"), name: name2, mimeType: mimeType2, bytes: data2.byteLength, sha256: sha256(data2) };
    }
    const data = input.data;
    if (!(data instanceof Uint8Array) || !data.byteLength) throw new Error("The file is empty.");
    if (data.byteLength > MAX_LIBRARY_FILE_BYTES) throw new Error("The file is larger than 25 MB.");
    const name = cleanName(String(input.name ?? ""), "tep");
    const mimeType = libraryFileType(data, name);
    if (!mimeType) throw new Error("The Library keeps pictures (PNG, JPEG, GIF, WebP), PDF, text and Office documents.");
    const digest = sha256(data);
    const ref = `${digest}.${extensions[mimeType]}`;
    const file = path.join(this.own, ref);
    if (!existsSync(file)) {
      mkdirSync(this.own, { recursive: true });
      writeFileSync(file, data);
    }
    return { storage: "library", ref, name, mimeType, bytes: data.byteLength, sha256: digest };
  }
  /** Whether a stored reference can still be read (no bytes read for a file). */
  exists(storage, ref) {
    try {
      if (storage === "brand-asset") return Boolean(this.brandAssets()?.assetData(ref));
      return existsSync(storage === "library" ? path.join(this.own, path.basename(ref)) : path.join(this.root, ...ref.split("/")));
    } catch {
      return false;
    }
  }
  /** The bytes of a stored reference, with its path when it is a file; null when it is gone. */
  read(storage, ref) {
    try {
      if (storage === "brand-asset") {
        const found = this.brandAssets()?.assetData(ref);
        return found ? { data: found.data, path: null } : null;
      }
      const file = storage === "library" ? path.join(this.own, path.basename(ref)) : path.join(this.root, ...ref.split("/"));
      if (!existsSync(file)) return null;
      const real = this.inside(file);
      return { data: readFileSync(real), path: real };
    } catch {
      return null;
    }
  }
};
var fileExtension = (mimeType) => extensions[mimeType] ?? "bin";

// src/mini-apps/library/server/migrations/0001-library-items.ts
var libraryItems = {
  id: "0001-library-items",
  up(db) {
    db.exec(`
      CREATE TABLE library_items (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL CHECK (kind IN ('image', 'article', 'document')),
        document_type TEXT,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        tags TEXT NOT NULL DEFAULT '[]',
        public_url TEXT,
        source_app TEXT,
        source_type TEXT,
        source_id TEXT,
        source_revision INTEGER,
        source_url TEXT,
        file_storage TEXT CHECK (file_storage IN ('library', 'data-root', 'brand-asset')),
        file_ref TEXT,
        file_name TEXT,
        file_mime TEXT,
        file_bytes INTEGER,
        file_sha256 TEXT,
        search_text TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        created_by TEXT NOT NULL,
        updated_by TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE UNIQUE INDEX library_items_source_idx ON library_items(source_app, source_type, source_id) WHERE source_app IS NOT NULL;
      CREATE INDEX library_items_list_idx ON library_items(archived_at, kind, updated_at DESC);
      CREATE TABLE library_item_versions (
        item_id TEXT NOT NULL REFERENCES library_items(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        action TEXT NOT NULL CHECK (action IN ('create', 'update', 'archive', 'restore')),
        actor TEXT NOT NULL,
        note TEXT NOT NULL DEFAULT '',
        snapshot TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY (item_id, revision)
      );
    `);
  }
};

// src/mini-apps/library/server/store.ts
function fold(text2) {
  return text2.normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase();
}
var toRecord = (row) => ({
  id: row.id,
  kind: row.kind,
  documentType: row.document_type,
  title: row.title,
  titleOverride: row.title_override ?? null,
  description: row.description,
  content: row.content,
  tags: JSON.parse(row.tags),
  publicUrl: row.public_url,
  source: row.source_app ? { app: row.source_app, recordType: row.source_type ?? "", recordId: row.source_id ?? "", revision: row.source_revision === null ? null : Number(row.source_revision), url: row.source_url } : null,
  file: row.file_storage && row.file_ref ? { storage: row.file_storage, ref: row.file_ref, name: row.file_name ?? "", mimeType: row.file_mime ?? "", bytes: Number(row.file_bytes ?? 0), sha256: row.file_sha256 ?? "" } : null,
  revision: Number(row.revision),
  createdBy: row.created_by,
  updatedBy: row.updated_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  archivedAt: row.archived_at
});
var snapshotOf = (record) => ({
  title: record.title,
  titleOverride: record.titleOverride,
  description: record.description,
  content: record.content,
  tags: record.tags,
  documentType: record.documentType,
  publicUrl: record.publicUrl,
  file: record.file,
  sourceRevision: record.source?.revision ?? null
});
var searchText = (record) => fold([record.titleOverride ?? "", record.title, record.tags.join(" "), record.description, record.content.slice(0, 2e4)].join("\n"));
var LibraryStore = class {
  constructor(db) {
    this.db = db;
  }
  db;
  get(id) {
    const row = this.db.prepare("SELECT * FROM library_items WHERE id = ?").get(id);
    return row ? toRecord(row) : null;
  }
  bySource(app, recordType, recordId) {
    const row = this.db.prepare("SELECT * FROM library_items WHERE source_app = ? AND source_type = ? AND source_id = ?").get(app, recordType, recordId);
    return row ? toRecord(row) : null;
  }
  where(filter) {
    const clauses = [filter.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
    if (filter.kind) {
      clauses.push("kind = ?");
      values.push(filter.kind);
    }
    if (filter.documentType) {
      clauses.push("document_type = ?");
      values.push(filter.documentType);
    }
    if (filter.tag) {
      clauses.push("EXISTS (SELECT 1 FROM json_each(library_items.tags) WHERE lower(json_each.value) = lower(?))");
      values.push(filter.tag);
    }
    if (filter.sourceApp === "founder") clauses.push("source_app IS NULL");
    else if (filter.sourceApp) {
      clauses.push("source_app = ?");
      values.push(filter.sourceApp);
    }
    if (filter.source) {
      clauses.push("source_app = ? AND source_type = ? AND source_id = ?");
      values.push(filter.source.app, filter.source.recordType, filter.source.recordId);
    }
    for (const word of fold(filter.query ?? "").split(/\s+/).filter(Boolean).slice(0, 8)) {
      clauses.push("search_text LIKE ? ESCAPE '\\'");
      values.push(`%${word.replace(/[\\%_]/g, (match) => `\\${match}`)}%`);
    }
    return { sql: clauses.join(" AND "), values };
  }
  list(filter = {}) {
    const { sql, values } = this.where(filter);
    const limit = Math.max(1, Math.min(Number(filter.limit ?? 100) || 100, 500));
    const offset = Math.max(0, Number(filter.offset ?? 0) || 0);
    const rows = this.db.prepare(`SELECT * FROM library_items WHERE ${sql} ORDER BY updated_at DESC, rowid DESC LIMIT ? OFFSET ?`).all(...values, limit, offset);
    const total = Number(this.db.prepare(`SELECT COUNT(*) AS count FROM library_items WHERE ${sql}`).get(...values).count);
    return { items: rows.map(toRecord), total };
  }
  facets(archived = false) {
    const scope = archived ? "archived_at IS NOT NULL" : "archived_at IS NULL";
    const tags = this.db.prepare(`SELECT json_each.value AS tag, COUNT(*) AS count FROM library_items, json_each(library_items.tags) WHERE ${scope} GROUP BY lower(json_each.value) ORDER BY count DESC, tag LIMIT 200`).all();
    const sources = this.db.prepare(`SELECT COALESCE(source_app, 'founder') AS app, COUNT(*) AS count FROM library_items WHERE ${scope} GROUP BY COALESCE(source_app, 'founder') ORDER BY count DESC`).all();
    const kinds = { image: 0, article: 0, document: 0 };
    for (const row of this.db.prepare(`SELECT kind, COUNT(*) AS count FROM library_items WHERE ${scope} GROUP BY kind`).all()) kinds[row.kind] = Number(row.count);
    return { tags: tags.map((row) => ({ tag: row.tag, count: Number(row.count) })), sources: sources.map((row) => ({ app: row.app, count: Number(row.count) })), kinds };
  }
  /** Writes a new item and its first version in one transaction. */
  insert(record, note) {
    this.transaction(() => {
      this.db.prepare(`INSERT INTO library_items (id, kind, document_type, title, title_override, description, content, tags, public_url, source_app, source_type, source_id, source_revision, source_url,
        file_storage, file_ref, file_name, file_mime, file_bytes, file_sha256, search_text, revision, created_by, updated_by, created_at, updated_at, archived_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        record.id,
        record.kind,
        record.documentType,
        record.title,
        record.titleOverride,
        record.description,
        record.content,
        JSON.stringify(record.tags),
        record.publicUrl,
        record.source?.app ?? null,
        record.source?.recordType ?? null,
        record.source?.recordId ?? null,
        record.source?.revision ?? null,
        record.source?.url ?? null,
        record.file?.storage ?? null,
        record.file?.ref ?? null,
        record.file?.name ?? null,
        record.file?.mimeType ?? null,
        record.file?.bytes ?? null,
        record.file?.sha256 ?? null,
        searchText(record),
        record.revision,
        record.createdBy,
        record.updatedBy,
        record.createdAt,
        record.updatedAt,
        record.archivedAt
      );
      this.addVersion(record, "create", record.createdBy, note);
    });
  }
  /** Saves the item at its next revision, only if it is still at `expectedRevision`; records the version. */
  save(record, expectedRevision, action, actor, note) {
    this.transaction(() => {
      const changed = this.db.prepare(`UPDATE library_items SET document_type = ?, title = ?, title_override = ?, description = ?, content = ?, tags = ?, public_url = ?, source_revision = ?,
        file_storage = ?, file_ref = ?, file_name = ?, file_mime = ?, file_bytes = ?, file_sha256 = ?, search_text = ?, revision = ?, updated_by = ?, updated_at = ?, archived_at = ?
        WHERE id = ? AND revision = ?`).run(
        record.documentType,
        record.title,
        record.titleOverride,
        record.description,
        record.content,
        JSON.stringify(record.tags),
        record.publicUrl,
        record.source?.revision ?? null,
        record.file?.storage ?? null,
        record.file?.ref ?? null,
        record.file?.name ?? null,
        record.file?.mimeType ?? null,
        record.file?.bytes ?? null,
        record.file?.sha256 ?? null,
        searchText(record),
        record.revision,
        record.updatedBy,
        record.updatedAt,
        record.archivedAt,
        record.id,
        expectedRevision
      );
      if (!Number(changed.changes)) throw new Error("This Library item changed meanwhile. Open it again.");
      this.addVersion(record, action, actor, note);
    });
  }
  addVersion(record, action, actor, note) {
    this.db.prepare("INSERT INTO library_item_versions (item_id, revision, action, actor, note, snapshot, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(record.id, record.revision, action, actor, note.slice(0, 500), JSON.stringify(snapshotOf(record)), record.updatedAt);
  }
  versions(id) {
    const rows = this.db.prepare("SELECT * FROM library_item_versions WHERE item_id = ? ORDER BY revision DESC").all(id);
    return rows.map((row) => {
      const snapshot = JSON.parse(row.snapshot);
      return {
        version: { revision: Number(row.revision), action: row.action, actor: row.actor, note: row.note, createdAt: row.created_at, title: snapshot.titleOverride ?? snapshot.title, description: snapshot.description, content: snapshot.content, tags: snapshot.tags, documentType: snapshot.documentType, publicUrl: snapshot.publicUrl, sourceRevision: snapshot.sourceRevision },
        file: snapshot.file
      };
    });
  }
  transaction(work) {
    this.db.exec("SAVEPOINT library_write");
    try {
      work();
      this.db.exec("RELEASE library_write");
    } catch (error) {
      this.db.exec("ROLLBACK TO library_write");
      this.db.exec("RELEASE library_write");
      throw error;
    }
  }
};

// src/mini-apps/library/server/migrations/0002-app-items-are-references.ts
var columns = (db) => new Set(db.prepare("PRAGMA table_info(library_items)").all().map((column) => column.name));
var appItemsAreReferences = {
  id: "0002-app-items-are-references",
  up(db) {
    if (!columns(db).has("title_override")) db.exec("ALTER TABLE library_items ADD COLUMN title_override TEXT");
    const items = db.prepare("SELECT id, title, tags FROM library_items WHERE source_app IS NOT NULL AND file_storage IS NULL").all();
    const clear = db.prepare("UPDATE library_items SET content = '', description = '', search_text = ? WHERE id = ?");
    const versions = db.prepare("SELECT revision, snapshot FROM library_item_versions WHERE item_id = ?");
    const scrub = db.prepare("UPDATE library_item_versions SET snapshot = ? WHERE item_id = ? AND revision = ?");
    for (const item of items) {
      clear.run(fold([item.title, JSON.parse(item.tags).join(" ")].join("\n")), item.id);
      for (const version of versions.all(item.id)) {
        const snapshot = JSON.parse(version.snapshot);
        if (!snapshot.content && !snapshot.description) continue;
        scrub.run(JSON.stringify({ ...snapshot, content: "", description: "" }), item.id, version.revision);
      }
    }
  }
};

// src/mini-apps/library/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [libraryItems, appItemsAreReferences]
};

// src/mini-apps/library/server/service.ts
import { randomUUID } from "node:crypto";
var FOUNDER = "founder";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var text = (value, label, max, required = false) => {
  const result = typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : value === void 0 || value === null ? "" : null;
  if (result === null) throw new Error(`${label} must be text.`);
  if (required && !result) throw new Error(`${label} is required.`);
  if (result.length > max) throw new Error(`${label} is longer than ${max} characters.`);
  return result;
};
var tagsOf = (value) => {
  if (value === void 0 || value === null) return [];
  if (!Array.isArray(value)) throw new Error("Tags must be a list.");
  const seen = /* @__PURE__ */ new Set();
  const tags = [];
  for (const raw of value) {
    const tag = text(raw, "A tag", 40).replace(/\s+/g, " ");
    if (!tag || seen.has(fold(tag))) continue;
    seen.add(fold(tag));
    tags.push(tag);
  }
  if (tags.length > 20) throw new Error("An item keeps at most 20 tags.");
  return tags;
};
var publicUrlOf = (value) => {
  const raw = text(value, "The public link", 2e3);
  if (!raw) return null;
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("The public link must be a full https:// address.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("The public link must be a full https:// address.");
  return url.toString();
};
var documentTypeOf = (kind, value, current = null) => {
  if (kind !== "document") return null;
  if (value === void 0) return current ?? "other";
  if (value === null || value === "") return "other";
  if (!LIBRARY_DOCUMENT_TYPES.includes(value)) throw new Error(`Unknown document type ${String(value)}.`);
  return value;
};
var LibraryService = class {
  constructor(store, files, events = null, sources = () => null) {
    this.store = store;
    this.files = files;
    this.events = events;
    this.sources = sources;
  }
  store;
  files;
  events;
  sources;
  listeners = /* @__PURE__ */ new Set();
  /** An app's item without a file: its text lives in the app and is read live. */
  live(record) {
    return Boolean(record.source && !record.file);
  }
  readSource(record) {
    if (!record.source) return null;
    try {
      return this.sources(record.source.app)?.read(record.source.recordType, record.source.recordId) ?? null;
    } catch {
      return null;
    }
  }
  /**
   * The item as pages and apps see it. The founder's item is the Library's own
   * record; an app's item is a reference: its text read live from the app (or
   * none while unavailable — never stale text), its file the app's own file.
   */
  toItem(record) {
    const { file, titleOverride: _override, ...rest } = record;
    const base = {
      ...rest,
      file: file ? { name: file.name, mimeType: file.mimeType, bytes: file.bytes, sha256: file.sha256, storage: file.storage } : null,
      fileUrl: file ? `/api/library/items/${encodeURIComponent(record.id)}/file?v=${file.sha256.slice(0, 12)}` : null,
      reference: null
    };
    if (!record.source) return base;
    if (this.live(record)) {
      const found = this.readSource(record);
      return {
        ...base,
        title: record.titleOverride ?? found?.title ?? record.title,
        description: found?.description ?? "",
        content: found?.content ?? "",
        reference: { state: !found ? "unavailable" : found.ready ? "ready" : "changed", live: true, editUrl: found?.url ?? record.source.url, sourceTitle: found?.title ?? record.title, titleOverridden: Boolean(record.titleOverride) }
      };
    }
    const readable = file ? this.files.exists(file.storage, file.ref) : false;
    return { ...base, title: record.titleOverride ?? record.title, reference: { state: readable ? "ready" : "unavailable", live: false, editUrl: record.source.url, sourceTitle: record.title, titleOverridden: Boolean(record.titleOverride) } };
  }
  list(filter = {}) {
    const result = this.store.list(filter);
    return { items: result.items.map((record) => this.toItem(record)), total: result.total };
  }
  /** Best matches first: words in the title count most, then tags, then the description and text. */
  search(query2, filter = {}) {
    const words = fold(query2).split(/\s+/).filter(Boolean);
    const found = this.store.list({ ...filter, query: query2, limit: filter.limit ?? 200 }).items;
    const score = (record) => words.reduce((sum, word) => sum + (fold(record.titleOverride ?? record.title).includes(word) ? 3 : 0) + (record.tags.some((tag) => fold(tag).includes(word)) ? 2 : 0) + (fold(record.description).includes(word) ? 1 : 0), 0);
    return found.map((record) => ({ record, score: score(record) })).sort((a, b) => b.score - a.score).map((entry) => this.toItem(entry.record));
  }
  facets(archived = false) {
    return this.store.facets(archived);
  }
  get(id) {
    const record = this.store.get(id);
    if (!record) return null;
    return {
      ...this.toItem(record),
      versions: this.store.versions(id).map(({ version, file }) => ({ ...version, file: file ? { name: file.name, mimeType: file.mimeType, bytes: file.bytes, sha256: file.sha256, storage: file.storage } : null }))
    };
  }
  record(id) {
    const record = this.store.get(id);
    if (!record) throw new Error("Library item not found.");
    return record;
  }
  file(kind, input) {
    if (!input) return null;
    const prepared = this.files.prepare(input);
    if (kind === "image" && !isImageType(prepared.mimeType)) throw new Error("An image item needs a picture (PNG, JPEG, GIF or WebP).");
    return prepared;
  }
  check(record) {
    if (record.kind === "image" && !record.file) throw new Error("An image item needs its picture.");
    if (this.live(record)) {
      if (record.kind === "image") throw new Error("An image item needs its picture.");
      if (!this.readSource(record)) throw new Error(`Mini-app ${record.source.app} must serve ${record.source.recordType} ${record.source.recordId} through ${record.source.app}.library-source 1.0; the Library keeps no copy of its text.`);
      return;
    }
    if (record.kind === "article" && !record.content) throw new Error("An article needs its text.");
    if (record.kind === "document" && !record.file && !record.content) throw new Error("A document needs a file or its text.");
  }
  /** Adds an item as `actor` (an app id, with its source record, or the founder); an app's record that already has one gets it back unchanged. */
  create(actor, input) {
    const kind = input?.kind;
    if (!LIBRARY_ITEM_KINDS.includes(kind)) throw new Error(`Unknown Library item kind ${String(kind)}.`);
    let source = null;
    if (actor !== FOUNDER) {
      if (!input.source) throw new Error(`Mini-app ${actor} must say which of its records a Library item comes from.`);
      const recordType = text(input.source.recordType, "The source record type", 60, true);
      if (!/^[a-z0-9][a-z0-9-]*$/.test(recordType)) throw new Error("The source record type must be lower-case words joined by dashes.");
      const recordId = text(input.source.recordId, "The source record id", 200, true);
      const url = text(input.source.url, "The source link", 1e3) || null;
      if (url && !url.startsWith("/")) throw new Error("The source link must be a Studio path.");
      const revision = input.source.revision === void 0 || input.source.revision === null ? null : Number(input.source.revision);
      if (revision !== null && !Number.isInteger(revision)) throw new Error("The source revision must be a whole number.");
      const existing = this.store.bySource(actor, recordType, recordId);
      if (existing) return this.toItem(existing);
      if (text(input.content, "The text", 75e4)) throw new Error(`Mini-app ${actor} may not copy text into the Library: serve it through ${actor}.library-source.`);
      source = { app: actor, recordType, recordId, revision, url };
    }
    const file = this.file(kind, input.file);
    const timestamp = now();
    const record = {
      id: randomUUID(),
      kind,
      documentType: documentTypeOf(kind, input.documentType),
      title: text(input.title, "The title", 240) || file?.name.slice(0, 240) || "",
      titleOverride: null,
      // An app's text item keeps no description of its own either: both come live from the app.
      description: source && !file ? "" : text(input.description, "The description", 4e3),
      content: text(input.content, "The text", 75e4),
      tags: tagsOf(input.tags),
      publicUrl: publicUrlOf(input.publicUrl),
      source,
      file,
      revision: 1,
      createdBy: actor,
      updatedBy: actor,
      createdAt: timestamp,
      updatedAt: timestamp,
      archivedAt: null
    };
    if (source && !file && !record.title) record.title = this.readSource(record)?.title.slice(0, 240) ?? "";
    if (!record.title) throw new Error("The title is required.");
    this.check(record);
    try {
      this.store.insert(record, text(input.note, "The note", 500));
    } catch (error) {
      const existing = source ? this.store.bySource(source.app, source.recordType, source.recordId) : null;
      if (existing) return this.toItem(existing);
      throw error;
    }
    this.changed("created", record, actor);
    return this.toItem(record);
  }
  /**
   * Changes an item; `ownOnly` (an app) may change only the items it added.
   * An app's item is a reference: the founder changes only the Library's own
   * metadata (a title override, tags, public link); its app changes its label,
   * file reference and source revision, never text. Nothing changed → no new version.
   */
  update(actor, id, input, ownOnly = false) {
    const current = this.record(id);
    if (ownOnly && current.source?.app !== actor) throw new Error(`Mini-app ${actor} may change only the Library items it added.`);
    if (input.expectedRevision !== void 0 && Number(input.expectedRevision) !== current.revision) throw new Error("This Library item changed meanwhile. Open it again.");
    if (current.archivedAt) throw new Error("Restore the item before changing it.");
    const founderOnReference = Boolean(current.source) && actor === FOUNDER;
    if (current.source) {
      const owner = current.source.app;
      if (input.content !== void 0 && text(input.content, "The text", 75e4) !== "") throw new Error(founderOnReference ? `N\u1ED9i dung c\u1EE7a m\u1EE5c n\xE0y s\u1EEDa trong ${owner}; Th\u01B0 vi\u1EC7n kh\xF4ng gi\u1EEF b\u1EA3n sao.` : `Mini-app ${actor} may not copy text into the Library: serve it through ${actor}.library-source.`);
      if (founderOnReference && (input.file || input.documentType !== void 0 || input.description !== void 0 || input.sourceRevision !== void 0)) throw new Error(`M\u1EE5c n\xE0y \u0111\u1EBFn t\u1EEB ${owner}: h\xE3y s\u1EEDa n\u1ED9i dung, t\u1EC7p v\xE0 m\xF4 t\u1EA3 trong ${owner}. Th\u01B0 vi\u1EC7n ch\u1EC9 \u0111\u1ED5i t\xEAn hi\u1EC3n th\u1ECB, nh\xE3n v\xE0 \u0111\u01B0\u1EDDng d\u1EABn c\xF4ng khai.`);
      if (!founderOnReference && this.live(current) && input.description !== void 0 && text(input.description, "The description", 4e3) !== "") throw new Error(`Mini-app ${actor} may not copy text into the Library: serve it through ${actor}.library-source.`);
    }
    const file = input.file ? this.file(current.kind, input.file) : current.file;
    const title = input.title === void 0 ? void 0 : text(input.title, "The title", 240, !founderOnReference);
    const appTitle = current.source && this.live(current) ? this.readSource(current)?.title ?? current.title : current.title;
    const next = {
      ...current,
      documentType: documentTypeOf(current.kind, input.documentType, current.documentType),
      // The founder's title on an app's item is an override (cleared when it matches the app's title again).
      title: founderOnReference || title === void 0 ? current.title : title,
      titleOverride: founderOnReference && title !== void 0 ? title && title !== appTitle ? title : null : current.titleOverride,
      description: input.description === void 0 || this.live(current) ? current.description : text(input.description, "The description", 4e3),
      content: current.source || input.content === void 0 ? current.content : text(input.content, "The text", 75e4),
      tags: input.tags === void 0 ? current.tags : tagsOf(input.tags),
      publicUrl: input.publicUrl === void 0 ? current.publicUrl : publicUrlOf(input.publicUrl),
      source: current.source && input.sourceRevision !== void 0 ? { ...current.source, revision: input.sourceRevision === null ? null : Number(input.sourceRevision) } : current.source,
      file
    };
    const same = (a, b) => a.documentType === b.documentType && a.title === b.title && a.titleOverride === b.titleOverride && a.description === b.description && a.content === b.content && JSON.stringify(a.tags) === JSON.stringify(b.tags) && a.publicUrl === b.publicUrl && (a.source?.revision ?? null) === (b.source?.revision ?? null) && (a.file?.storage ?? null) === (b.file?.storage ?? null) && (a.file?.ref ?? null) === (b.file?.ref ?? null) && (a.file?.sha256 ?? null) === (b.file?.sha256 ?? null);
    if (same(current, next)) return this.toItem(current);
    this.check(next);
    const saved = { ...next, revision: current.revision + 1, updatedBy: actor, updatedAt: now() };
    this.store.save(saved, current.revision, "update", actor, text(input.note, "The note", 500));
    this.changed("updated", saved, actor);
    return this.toItem(saved);
  }
  archive(actor, id, options = {}, ownOnly = false) {
    const current = this.record(id);
    if (ownOnly && current.source?.app !== actor) throw new Error(`Mini-app ${actor} may change only the Library items it added.`);
    if (options.expectedRevision !== void 0 && Number(options.expectedRevision) !== current.revision) throw new Error("This Library item changed meanwhile. Open it again.");
    const restore = Boolean(options.restore);
    if (restore ? !current.archivedAt : current.archivedAt) return this.toItem(current);
    const timestamp = now();
    const saved = { ...current, revision: current.revision + 1, updatedBy: actor, updatedAt: timestamp, archivedAt: restore ? null : timestamp };
    this.store.save(saved, current.revision, restore ? "restore" : "archive", actor, text(options.note, "The note", 500));
    this.changed(restore ? "restored" : "archived", saved, actor);
    return this.toItem(saved);
  }
  /** An item's file (or the file of one of its versions) with its bytes. */
  readFile(id, revision) {
    const record = this.store.get(id);
    if (!record) return null;
    const file = revision === void 0 || revision === record.revision ? record.file : this.store.versions(id).find((entry) => entry.version.revision === revision)?.file ?? null;
    if (!file) return null;
    const found = this.files.read(file.storage, file.ref);
    return found ? { name: file.name, mimeType: file.mimeType, bytes: file.bytes, sha256: file.sha256, storage: file.storage, data: found.data, path: found.path } : null;
  }
  fileUrl(id) {
    return `/api/library/items/${encodeURIComponent(id)}/file`;
  }
  onChanged(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  changed(action, record, actor) {
    const item = this.toItem(record);
    this.events?.addEvent({ level: "success", eventType: `library.item.${action}`, title: `Library item ${action}`, detail: `${item.title} \xB7 ${actor}`.slice(0, 500) });
    for (const listener of this.listeners) {
      try {
        listener({ action, item, actor });
      } catch (error) {
        console.error("A Library change listener failed", error);
      }
    }
  }
  /** `library.assets` 1.0 for one app: its declared operations only, its own items only for changes. */
  forApp(app) {
    if (!app?.id || app.id === FOUNDER) throw new Error("The Library needs the calling mini-app.");
    const operations = new Set(app.uses?.["library.assets"]?.operations ?? []);
    const need = (operation) => {
      if (!operations.has(operation)) throw new Error(`Mini-app ${app.id} did not declare library.assets: ${operation} in its manifest`);
    };
    return {
      list: (filter) => {
        need("read");
        return this.list(filter);
      },
      search: (query2, filter) => {
        need("read");
        return this.search(query2, filter);
      },
      get: (id) => {
        need("read");
        return this.get(id);
      },
      readFile: (id) => {
        need("read");
        return this.readFile(id);
      },
      fileUrl: (id) => {
        need("read");
        return this.fileUrl(id);
      },
      onChanged: (listener) => {
        need("read");
        return this.onChanged(listener);
      },
      create: (input) => {
        need("write");
        return this.create(app.id, input);
      },
      update: (id, input) => {
        need("write");
        return this.update(app.id, id, input, true);
      },
      archive: (id, options) => {
        need("write");
        return this.archive(app.id, id, options, true);
      }
    };
  }
  provider() {
    return { forApp: (app) => this.forApp(app) };
  }
};

// src/mini-apps/library/server/routes.ts
var query = (request, key) => typeof request.query[key] === "string" && request.query[key] ? String(request.query[key]) : void 0;
function filterOf(request) {
  const source = query(request, "source");
  return {
    kind: query(request, "kind"),
    documentType: query(request, "documentType"),
    tag: query(request, "tag"),
    sourceApp: source,
    query: query(request, "q"),
    archived: request.query.archived === "1",
    limit: Number(query(request, "limit") ?? 100),
    offset: Number(query(request, "offset") ?? 0)
  };
}
function uploaded(value) {
  if (value === void 0 || value === null) return void 0;
  const file = value;
  const data = typeof file.dataBase64 === "string" ? file.dataBase64 : "";
  if (!data || !/^[A-Za-z0-9+/]*={0,2}$/.test(data)) throw new Error("The file is not valid.");
  return { name: String(file.name ?? ""), data: Buffer.from(data, "base64") };
}
function sendFile(response, file, download) {
  if (download) response.attachment(/\.[a-z0-9]+$/i.test(file.name) ? file.name : `${file.name || "thu-vien"}.${fileExtension(file.mimeType)}`);
  response.set("cache-control", "private, no-cache").type(file.mimeType).send(Buffer.from(file.data.buffer, file.data.byteOffset, file.data.byteLength));
}
function createLibraryRouter(service, router) {
  router.get("/api/library/items", (request, response, next) => {
    try {
      response.json(service.list(filterOf(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/library/facets", (request, response, next) => {
    try {
      response.json(service.facets(request.query.archived === "1"));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/library/items/:id", (request, response, next) => {
    try {
      const item = service.get(request.params.id);
      if (!item) return void response.status(404).json({ error: "Kh\xF4ng t\xECm th\u1EA5y m\u1EE5c trong Th\u01B0 vi\u1EC7n." });
      response.json(item);
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/library/items/:id/file", (request, response) => {
    const file = service.readFile(request.params.id);
    if (!file) return void response.status(404).set("cache-control", "no-store").json({ error: "Kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c t\u1EC7p c\u1EE7a m\u1EE5c n\xE0y." });
    sendFile(response, file, request.query.download === "1");
  });
  router.get("/api/library/items/:id/versions/:revision/file", (request, response) => {
    const file = service.readFile(request.params.id, Number(request.params.revision));
    if (!file) return void response.status(404).set("cache-control", "no-store").json({ error: "Kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c t\u1EC7p c\u1EE7a phi\xEAn b\u1EA3n n\xE0y." });
    sendFile(response, file, request.query.download === "1");
  });
  router.post("/api/library/items", (request, response, next) => {
    try {
      const body = request.body ?? {};
      const input = {
        kind: body.kind,
        title: String(body.title ?? ""),
        description: body.description,
        content: body.content,
        tags: body.tags,
        documentType: body.documentType,
        publicUrl: body.publicUrl,
        file: uploaded(body.file)
      };
      response.status(201).json(service.create(FOUNDER, input));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/library/items/:id", (request, response, next) => {
    try {
      const body = request.body ?? {};
      if (body.revision === void 0) throw new Error("Open the item again before saving.");
      const input = {
        title: body.title,
        description: body.description,
        content: body.content,
        tags: body.tags,
        documentType: body.documentType,
        publicUrl: body.publicUrl,
        file: uploaded(body.file),
        note: body.note,
        expectedRevision: Number(body.revision)
      };
      response.json(service.update(FOUNDER, request.params.id, input));
    } catch (error) {
      next(error);
    }
  });
  for (const action of ["archive", "restore"]) router.post(`/api/library/items/:id/${action}`, (request, response, next) => {
    try {
      const revision = request.body?.revision;
      response.json(service.archive(FOUNDER, request.params.id, { restore: action === "restore", expectedRevision: revision === void 0 ? void 0 : Number(revision) }));
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/library/server/index.ts
var BRAND_ASSETS = { name: "brand-profile.context", range: "^1.2" };
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const files = new LibraryFiles(sdk.dataRoot, () => sdk.miniApps.use(BRAND_ASSETS.name, BRAND_ASSETS.range));
    const sources = (app) => sdk.miniApps.use(librarySourceInterface(app), "^1.0");
    const service = new LibraryService(new LibraryStore(sdk.db), files, sdk.events, sources);
    return {
      router: createLibraryRouter(service, sdk.router()),
      // Each app gets the interface bound to what its manifest declares (`uses`).
      exports: { [LIBRARY_ASSETS.name]: service.provider() }
    };
  }
});
export {
  index_default as default
};
