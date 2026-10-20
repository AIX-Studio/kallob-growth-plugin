import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/brand-profile/manifest.ts
var manifest = {
  id: "brand-profile",
  version: "1.7.0",
  // The sidebar brand picker and the editing lock (core 2.31.0, spec 050).
  requiresCore: ">=2.31.0 <3",
  exports: { "brand-profile.context": "1.6" }
};

// src/mini-apps/brand-profile/release-notes.json
var release_notes_default = [
  {
    version: "1.7.0",
    vi: "Brand Profile th\xE0nh Brand Studio: qu\u1EA3n l\xFD nhi\u1EC1u th\u01B0\u01A1ng hi\u1EC7u (c\xF4ng ty, s\u1EA3n ph\u1EA9m, d\u1ECBch v\u1EE5, th\u01B0\u01A1ng hi\u1EC7u con) trong Brand Portfolio, ch\u1ECDn th\u01B0\u01A1ng hi\u1EC7u \u0111ang l\xE0m \u1EDF \u0111\u1EA7u thanh b\xEAn. M\u1ED7i th\u01B0\u01A1ng hi\u1EC7u c\xF3 \u0111\u1ECBnh v\u1ECB, nh\u1EADn di\u1EC7n, gi\u1ECDng, kh\xE1ch h\xE0ng, th\u1ECB tr\u01B0\u1EDDng, tuy\xEAn b\u1ED1 v\xE0 b\u1ED1i c\u1EA3nh ri\xEAng; th\xEAm m\u1EE5c ti\xEAu, h\xECnh \u1EA3nh mong mu\u1ED1n v\xE0 gi\xE1 tr\u1ECB trao \u0111i trong ph\u1EA7n \u0111\u1ECBnh v\u1ECB. M\u1ECDi d\u1EEF li\u1EC7u c\u0169 thu\u1ED9c th\u01B0\u01A1ng hi\u1EC7u doanh nghi\u1EC7p \u0111\u1EA7u ti\xEAn, v\xE0 c\xE1c mini-app kh\xE1c v\u1EABn \u0111\u1ECDc th\u01B0\u01A1ng hi\u1EC7u \u0111\xF3 nh\u01B0 tr\u01B0\u1EDBc. C\u1EA7n Growth Studio c\xF3 kernel 2.31.0.",
    en: "Brand Profile becomes Brand Studio: manage several brands (company, product, service, sub-brand) in a Brand Portfolio and pick the one you work on at the top of the sidebar. Each brand has its own positioning, identity, voice, customers, market, claims and context, with goals, desired image and value offered added to positioning. Everything you had belongs to the first company brand, which other mini-apps keep reading as before. Needs Growth Studio with kernel 2.31.0."
  },
  {
    version: "1.6.0",
    vi: "S\u1EA3n ph\u1EA9m & D\u1ECBch v\u1EE5 chuy\u1EC3n sang Mini CRM (Mini CRM \u2192 S\u1EA3n ph\u1EA9m & D\u1ECBch v\u1EE5): Brand Profile kh\xF4ng c\xF2n trang n\xE0y v\xE0 m\u1EE9c s\u1EB5n s\xE0ng (c\xF9ng hai c\u1ED5ng Nghi\xEAn c\u1EE9u, Xu\u1EA5t b\u1EA3n) kh\xF4ng c\xF2n \u0111\xF2i ph\u1EA3i c\xF3 s\u1EA3n ph\u1EA9m. D\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m v\xE0 \u1EA3nh v\u1EABn gi\u1EEF nguy\xEAn, v\u1EABn ch\u1ECDn \u0111\u01B0\u1EE3c v\xE0o Brand Context; Mini CRM, Websites v\xE0 c\xE1c mini-app kh\xE1c c\xF9ng d\xF9ng m\u1ED9t ngu\u1ED3n.",
    en: "Products & Services moved to Mini CRM (Mini CRM \u2192 Products & Services): Brand Profile no longer has that page and its readiness (and the Research and Publishing gates) no longer needs products. Product records and photos stay as they are and can still be chosen for Brand Context; Mini CRM, Websites and the other mini-apps share one source."
  },
  {
    version: "1.5.0",
    vi: "Danh s\xE1ch s\u1EA3n ph\u1EA9m/d\u1ECBch v\u1EE5 hi\u1EC7n gi\xE1 c\u1EE7a t\u1EEBng m\u1EE5c (c\u1EA3 tr\xEAn \u0111i\u1EC7n tho\u1EA1i) thay cho c\u1ED9t Lo\u1EA1i.",
    en: "The offerings list shows each item's price (on phones too) instead of the Type column."
  },
  {
    version: "1.4.1",
    vi: "T\xEAn v\xE0 m\xF4 t\u1EA3 c\u1EE7a mini-app trong danh s\xE1ch nay do Kallob qu\u1EA3n l\xFD; c\u1EA7n Growth Studio 0.29.0.",
    en: "The mini-app's name and description in the list now come from Kallob; needs Growth Studio 0.29.0."
  },
  {
    version: "1.4.0",
    vi: "Th\u01B0 vi\u1EC7n s\u1EA3n ph\u1EA9m c\u1EE7a Websites d\xF9ng chung S\u1EA3n ph\u1EA9m & D\u1ECBch v\u1EE5 c\u1EE7a Brand Profile: th\xEAm, s\u1EEDa t\xEAn, m\xF4 t\u1EA3, gi\xE1 v\xE0 \u1EA3nh s\u1EA3n ph\u1EA9m \u1EDF Websites l\xE0 c\u1EADp nh\u1EADt ngay trong Brand Profile.",
    en: "Websites' product library is Brand Profile's Products & Services: adding a product or changing its name, description, price or photos in Websites updates Brand Profile at once."
  },
  {
    version: "1.3.0",
    vi: "L\u01B0u \u1EA3nh c\u1EE7a th\u01B0 vi\u1EC7n Personal Brand c\xF9ng kho \u1EA3nh th\u01B0\u01A1ng hi\u1EC7u, nh\u01B0ng kh\xF4ng tr\u1ED9n v\xE0o danh s\xE1ch \u1EA3nh c\u1EE7a th\u01B0\u01A1ng hi\u1EC7u.",
    en: "Stores Personal Brand library images alongside the brand's image store, without mixing them into the brand's own image lists."
  },
  {
    version: "1.2.0",
    vi: "Ch\u1EA1y tr\xEAn Growth Studio 0.21: \u0111\u01B0\u1EE3c c\xE0i c\xF9ng l\xFAc khi Growth Studio c\u1EADp nh\u1EADt, kh\xF4ng ph\u1EA3i ch\u1EDD t\u1EA3i th\xEAm.",
    en: "Runs on Growth Studio 0.21: installed together with Growth Studio updates, with no extra download afterwards."
  },
  {
    version: "1.1.0",
    vi: "Brand Profile gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Brand Profile is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/brand-profile/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS brand_profiles (
        id TEXT PRIMARY KEY CHECK (id = 'default'),
        payload_json TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS brand_profile_versions (
        profile_id TEXT NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY(profile_id, revision)
      );
      CREATE TABLE IF NOT EXISTS brand_guidelines (
        kind TEXT PRIMARY KEY CHECK (kind IN ('identity', 'voice')),
        payload_json TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        active_revision INTEGER,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS brand_guideline_versions (
        kind TEXT NOT NULL REFERENCES brand_guidelines(kind) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        action TEXT NOT NULL CHECK (action IN ('create', 'update', 'restore')),
        activated_at TEXT,
        created_at TEXT NOT NULL,
        PRIMARY KEY(kind, revision)
      );
      CREATE TABLE IF NOT EXISTS brand_records (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL CHECK (kind IN ('segment', 'persona', 'offering', 'competitor')),
        name TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'disabled')),
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS brand_records_listing_idx ON brand_records(kind, archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS brand_record_versions (
        record_id TEXT NOT NULL REFERENCES brand_records(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL,
        action TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY(record_id, revision)
      );
      CREATE TABLE IF NOT EXISTS brand_claims (
        id TEXT PRIMARY KEY,
        claim TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('draft', 'approved')),
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS brand_claims_listing_idx ON brand_claims(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS brand_claim_versions (
        claim_id TEXT NOT NULL REFERENCES brand_claims(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL,
        action TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY(claim_id, revision)
      );
      CREATE TABLE IF NOT EXISTS brand_assets (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL CHECK (role IN ('logo', 'visual_reference', 'product_media', 'competitor_logo')),
        record_id TEXT REFERENCES brand_records(id),
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        byte_size INTEGER NOT NULL,
        sha256 TEXT NOT NULL,
        data BLOB NOT NULL,
        created_at TEXT NOT NULL,
        archived_at TEXT,
        UNIQUE(role, record_id, sha256)
      );
      CREATE INDEX IF NOT EXISTS brand_assets_listing_idx ON brand_assets(role, record_id, archived_at, created_at DESC);
      CREATE UNIQUE INDEX IF NOT EXISTS brand_assets_dedupe_idx ON brand_assets(role, IFNULL(record_id, ''), sha256);
      CREATE TABLE IF NOT EXISTS brand_context_snapshots (
        id TEXT PRIMARY KEY,
        payload_json TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    const brandAssetTableSql = String(db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'brand_assets'").get()?.sql ?? "");
    if (!brandAssetTableSql.includes("competitor_logo")) {
      db.exec("BEGIN IMMEDIATE");
      try {
        db.exec(`
          DROP INDEX IF EXISTS brand_assets_listing_idx;
          DROP INDEX IF EXISTS brand_assets_dedupe_idx;
          ALTER TABLE brand_assets RENAME TO brand_assets_legacy;
          CREATE TABLE brand_assets (
            id TEXT PRIMARY KEY,
            role TEXT NOT NULL CHECK (role IN ('logo', 'visual_reference', 'product_media', 'competitor_logo')),
            record_id TEXT REFERENCES brand_records(id),
            filename TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            byte_size INTEGER NOT NULL,
            sha256 TEXT NOT NULL,
            data BLOB NOT NULL,
            created_at TEXT NOT NULL,
            archived_at TEXT,
            UNIQUE(role, record_id, sha256)
          );
          INSERT INTO brand_assets SELECT * FROM brand_assets_legacy;
          DROP TABLE brand_assets_legacy;
          CREATE INDEX brand_assets_listing_idx ON brand_assets(role, record_id, archived_at, created_at DESC);
          CREATE UNIQUE INDEX brand_assets_dedupe_idx ON brand_assets(role, IFNULL(record_id, ''), sha256);
        `);
        db.exec("COMMIT");
      } catch (error) {
        try {
          db.exec("ROLLBACK");
        } catch {
        }
        throw error;
      }
    }
  }
};

// src/mini-apps/sdk/schema.ts
var quote = (name) => `"${name.replace(/"/g, '""')}"`;
function withForeignKeysOff(db, tables, change) {
  db.exec("PRAGMA foreign_keys = OFF");
  try {
    db.exec("BEGIN IMMEDIATE");
    try {
      change();
      const broken = tables.flatMap((table) => db.prepare(`PRAGMA foreign_key_check(${quote(table)})`).all());
      if (broken.length) throw new Error(`Foreign keys broken after the change: ${[...new Set(broken.map((item) => `${item.table} \u2192 ${item.parent}`))].join(", ")}`);
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  } finally {
    db.exec("PRAGMA foreign_keys = ON");
  }
}

// src/mini-apps/brand-profile/server/migrations/0002-personal-media-role.ts
var personalMediaRole = {
  id: "0002-personal-media-role",
  transaction: false,
  up(db) {
    const sql = String(db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'brand_assets'").get()?.sql ?? "");
    if (!sql || sql.includes("personal_media")) return;
    withForeignKeysOff(db, ["brand_assets"], () => {
      db.exec(`
        DROP INDEX IF EXISTS brand_assets_listing_idx;
        DROP INDEX IF EXISTS brand_assets_dedupe_idx;
        CREATE TABLE brand_assets__rebuild (
          id TEXT PRIMARY KEY,
          role TEXT NOT NULL CHECK (role IN ('logo', 'visual_reference', 'product_media', 'competitor_logo', 'personal_media')),
          record_id TEXT REFERENCES brand_records(id),
          filename TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          byte_size INTEGER NOT NULL,
          sha256 TEXT NOT NULL,
          data BLOB NOT NULL,
          created_at TEXT NOT NULL,
          archived_at TEXT,
          UNIQUE(role, record_id, sha256)
        );
        INSERT INTO brand_assets__rebuild (id, role, record_id, filename, mime_type, byte_size, sha256, data, created_at, archived_at)
          SELECT id, role, record_id, filename, mime_type, byte_size, sha256, data, created_at, archived_at FROM brand_assets;
        DROP TABLE brand_assets;
        ALTER TABLE brand_assets__rebuild RENAME TO brand_assets;
        CREATE INDEX brand_assets_listing_idx ON brand_assets(role, record_id, archived_at, created_at DESC);
        CREATE UNIQUE INDEX brand_assets_dedupe_idx ON brand_assets(role, IFNULL(record_id, ''), sha256);
      `);
    });
  }
};

// src/mini-apps/brand-profile/server/migrations/0003-brand-studio.ts
var DEFAULT_BRAND_NAME = "Th\u01B0\u01A1ng hi\u1EC7u doanh nghi\u1EC7p";
var brandStudio = {
  id: "0003-brand-studio",
  transaction: false,
  up(db) {
    withForeignKeysOff(db, ["brands", "brand_versions", "brand_profiles", "brand_profile_versions", "brand_records", "brand_claims", "brand_assets", "brand_studio_guidelines", "brand_studio_guideline_versions"], () => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS brands (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('company', 'product', 'service', 'sub_brand')),
          summary TEXT NOT NULL DEFAULT '',
          parent_brand_id TEXT REFERENCES brands(id),
          relationship TEXT NOT NULL CHECK (relationship IN ('independent', 'sub_brand_of', 'product_brand_of', 'service_brand_of', 'endorsed_by', 'powered_by')),
          linked_entity_type TEXT CHECK (linked_entity_type IS NULL OR linked_entity_type IN ('product', 'service')),
          linked_entity_id TEXT,
          status TEXT NOT NULL CHECK (status IN ('draft', 'active')),
          revision INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          archived_at TEXT
        );
        CREATE INDEX IF NOT EXISTS brands_listing_idx ON brands(archived_at, status, type, updated_at DESC);
        CREATE INDEX IF NOT EXISTS brands_parent_idx ON brands(parent_brand_id, archived_at, updated_at DESC);
        CREATE TABLE IF NOT EXISTS brand_versions (
          brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
          revision INTEGER NOT NULL,
          payload_json TEXT NOT NULL,
          status TEXT NOT NULL,
          action TEXT NOT NULL,
          created_at TEXT NOT NULL,
          PRIMARY KEY(brand_id, revision)
        );
        CREATE TABLE IF NOT EXISTS brand_studio_guidelines (
          brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
          kind TEXT NOT NULL CHECK (kind IN ('identity', 'voice')),
          payload_json TEXT NOT NULL,
          revision INTEGER NOT NULL DEFAULT 1,
          active_revision INTEGER,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          PRIMARY KEY(brand_id, kind)
        );
        CREATE TABLE IF NOT EXISTS brand_studio_guideline_versions (
          brand_id TEXT NOT NULL,
          kind TEXT NOT NULL,
          revision INTEGER NOT NULL,
          payload_json TEXT NOT NULL,
          action TEXT NOT NULL CHECK (action IN ('create', 'update', 'restore')),
          activated_at TEXT,
          created_at TEXT NOT NULL,
          PRIMARY KEY(brand_id, kind, revision),
          FOREIGN KEY(brand_id, kind) REFERENCES brand_studio_guidelines(brand_id, kind) ON DELETE CASCADE
        );
      `);
      const profileSql = String(db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'brand_profiles'").get()?.sql ?? "");
      if (profileSql.includes("CHECK (id = 'default')")) {
        db.exec(`
          CREATE TABLE brand_profiles__rebuild (
            id TEXT PRIMARY KEY,
            payload_json TEXT NOT NULL,
            revision INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
          );
          INSERT INTO brand_profiles__rebuild SELECT id, payload_json, revision, created_at, updated_at FROM brand_profiles;
          CREATE TABLE brand_profile_versions__rebuild (
            profile_id TEXT NOT NULL REFERENCES brand_profiles__rebuild(id) ON DELETE CASCADE,
            revision INTEGER NOT NULL,
            payload_json TEXT NOT NULL,
            created_at TEXT NOT NULL,
            PRIMARY KEY(profile_id, revision)
          );
          INSERT INTO brand_profile_versions__rebuild SELECT profile_id, revision, payload_json, created_at FROM brand_profile_versions;
          DROP TABLE brand_profile_versions;
          DROP TABLE brand_profiles;
          ALTER TABLE brand_profiles__rebuild RENAME TO brand_profiles;
          ALTER TABLE brand_profile_versions__rebuild RENAME TO brand_profile_versions;
        `);
      }
      const columns = (table) => new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));
      if (!columns("brand_records").has("brand_id")) db.exec("ALTER TABLE brand_records ADD COLUMN brand_id TEXT NOT NULL DEFAULT 'default'");
      db.exec("DROP INDEX IF EXISTS brand_records_listing_idx; CREATE INDEX brand_records_listing_idx ON brand_records(brand_id, kind, archived_at, status, updated_at DESC)");
      if (!columns("brand_claims").has("brand_id")) db.exec("ALTER TABLE brand_claims ADD COLUMN brand_id TEXT NOT NULL DEFAULT 'default'");
      db.exec("DROP INDEX IF EXISTS brand_claims_listing_idx; CREATE INDEX brand_claims_listing_idx ON brand_claims(brand_id, archived_at, status, updated_at DESC)");
      if (!columns("brand_assets").has("brand_id")) {
        db.exec(`
          DROP INDEX IF EXISTS brand_assets_listing_idx;
          DROP INDEX IF EXISTS brand_assets_dedupe_idx;
          CREATE TABLE brand_assets__rebuild (
            id TEXT PRIMARY KEY,
            brand_id TEXT NOT NULL DEFAULT 'default',
            role TEXT NOT NULL CHECK (role IN ('logo', 'visual_reference', 'product_media', 'competitor_logo', 'personal_media')),
            record_id TEXT REFERENCES brand_records(id),
            filename TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            byte_size INTEGER NOT NULL,
            sha256 TEXT NOT NULL,
            data BLOB NOT NULL,
            created_at TEXT NOT NULL,
            archived_at TEXT,
            UNIQUE(brand_id, role, record_id, sha256)
          );
          INSERT INTO brand_assets__rebuild (id, brand_id, role, record_id, filename, mime_type, byte_size, sha256, data, created_at, archived_at)
            SELECT id, 'default', role, record_id, filename, mime_type, byte_size, sha256, data, created_at, archived_at FROM brand_assets;
          DROP TABLE brand_assets;
          ALTER TABLE brand_assets__rebuild RENAME TO brand_assets;
        `);
      }
      db.exec(`
        DROP INDEX IF EXISTS brand_assets_listing_idx;
        DROP INDEX IF EXISTS brand_assets_dedupe_idx;
        CREATE INDEX brand_assets_listing_idx ON brand_assets(brand_id, role, record_id, archived_at, created_at DESC);
        CREATE UNIQUE INDEX brand_assets_dedupe_idx ON brand_assets(brand_id, role, IFNULL(record_id, ''), sha256);
      `);
      const profile = db.prepare("SELECT payload_json, created_at, updated_at FROM brand_profiles WHERE id = 'default'").get();
      const hasData = Boolean(profile) || Boolean(db.prepare("SELECT 1 FROM brand_records WHERE brand_id = 'default' LIMIT 1").get()) || Boolean(db.prepare("SELECT 1 FROM brand_claims WHERE brand_id = 'default' LIMIT 1").get()) || Boolean(db.prepare("SELECT 1 FROM brand_guidelines LIMIT 1").get()) || Boolean(db.prepare("SELECT 1 FROM brand_assets WHERE brand_id = 'default' AND role != 'personal_media' LIMIT 1").get());
      if (hasData && !db.prepare("SELECT 1 FROM brands WHERE id = 'default'").get()) {
        let name = DEFAULT_BRAND_NAME;
        let summary = "";
        try {
          const payload = profile ? JSON.parse(profile.payload_json) : null;
          if (typeof payload?.name === "string" && payload.name.trim()) name = payload.name.trim().slice(0, 200);
          if (typeof payload?.summary === "string") summary = payload.summary.trim().slice(0, 4e3);
        } catch {
        }
        const createdAt = profile?.created_at ?? (/* @__PURE__ */ new Date()).toISOString();
        const updatedAt = profile?.updated_at ?? createdAt;
        const status = profile ? "active" : "draft";
        const brand = { name, type: "company", summary, parentBrandId: null, relationship: "independent", linkedEntityType: null, linkedEntityId: null };
        db.prepare("INSERT INTO brands (id, name, type, summary, parent_brand_id, relationship, linked_entity_type, linked_entity_id, status, revision, created_at, updated_at) VALUES ('default', ?, 'company', ?, NULL, 'independent', NULL, NULL, ?, 1, ?, ?)").run(name, summary, status, createdAt, updatedAt);
        db.prepare("INSERT INTO brand_versions (brand_id, revision, payload_json, status, action, created_at) VALUES ('default', 1, ?, ?, 'migrate', ?)").run(JSON.stringify(brand), status, updatedAt);
      }
      if (db.prepare("SELECT 1 FROM brands WHERE id = 'default'").get()) {
        db.exec(`
          INSERT OR IGNORE INTO brand_studio_guidelines (brand_id, kind, payload_json, revision, active_revision, created_at, updated_at)
            SELECT 'default', kind, payload_json, revision, active_revision, created_at, updated_at FROM brand_guidelines;
          INSERT OR IGNORE INTO brand_studio_guideline_versions (brand_id, kind, revision, payload_json, action, activated_at, created_at)
            SELECT 'default', kind, revision, payload_json, action, activated_at, created_at FROM brand_guideline_versions;
        `);
      }
    });
  }
};

// src/mini-apps/brand-profile/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline, personalMediaRole, brandStudio]
};

// src/mini-apps/brand-profile/server/store.ts
import { createHash, randomUUID } from "node:crypto";
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
var brandProfileTextLimits = {
  goals: 8e3,
  desiredImage: 8e3,
  valueOffers: 12e3,
  name: 200,
  tagline: 300,
  summary: 4e3,
  positioning: 4e3,
  websiteUrl: 2e3,
  facebookUrl: 2e3,
  linkedinUrl: 2e3,
  instagramUrl: 2e3,
  tiktokUrl: 2e3,
  youtubeUrl: 2e3,
  zaloUrl: 2e3,
  content: 12e4,
  marketContext: 12e4
};
var brandRecordKinds = /* @__PURE__ */ new Set(["segment", "persona", "offering", "competitor"]);
var brandClaimTypes = /* @__PURE__ */ new Set(["capability", "outcome", "differentiation", "testimonial", "case_result", "factual_description", "industry_research", "market_trend", "analogous_case", "expert_opinion"]);
var borrowedClaimTypes = /* @__PURE__ */ new Set(["industry_research", "market_trend", "analogous_case", "expert_opinion"]);
var brandClaimUses = /* @__PURE__ */ new Set(["education", "sales", "landing_page", "social", "email", "ads"]);
function boundedText(value, field, limit, required = false) {
  if (value !== void 0 && typeof value !== "string") throw new Error(`${field} must be text`);
  const normalized = String(value ?? "").trim();
  if (normalized.length > limit) throw new Error(`${field} exceeds ${limit} characters`);
  if (required && !normalized) throw new Error(`${field} is required`);
  return normalized;
}
function publicUrl(value, field) {
  const normalized = boundedText(value, field, 2e3);
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
function boundedStringList(value, field, limit, itemLimit) {
  if (!Array.isArray(value) || value.length > limit) throw new Error(`${field} must be a list with at most ${limit} entries`);
  const normalized = value.map((item) => boundedText(item, field, itemLimit, true));
  return [...new Set(normalized)];
}
function guidelineDate(value, field) {
  const normalized = boundedText(value, field, 10);
  if (normalized && !/^\d{4}-\d{2}-\d{2}$/.test(normalized)) throw new Error(`${field} must use YYYY-MM-DD`);
  return normalized;
}
function normalizeGuidelineSources(value) {
  if (!Array.isArray(value) || value.length > 30) throw new Error("Guideline sources must be a list with at most 30 entries");
  const sources = value.map((item) => {
    if (!item || typeof item !== "object") throw new Error("Guideline source is invalid");
    const source = item;
    const basis = source.basis === "observed" || source.basis === "owner_decision" || source.basis === "inferred" ? source.basis : "owner_decision";
    return {
      id: boundedText(source.id, "Guideline source ID", 80) || randomUUID(),
      title: boundedText(source.title, "Guideline source title", 300),
      url: publicUrl(source.url, "Guideline source URL"),
      basis,
      checkedAt: guidelineDate(source.checkedAt, "Guideline source date")
    };
  });
  if (new Set(sources.map((source) => source.id)).size !== sources.length) throw new Error("Guideline source IDs must be unique");
  return sources;
}
function normalizeBrandGuidelineInput(kind, input) {
  if (input.kind && input.kind !== kind) throw new Error("Guideline kind cannot be changed");
  const sources = normalizeGuidelineSources(input.sources ?? []);
  if (kind === "identity") {
    const value2 = input;
    const palette = value2.palette ?? [];
    const typography = value2.typography ?? [];
    if (!Array.isArray(palette) || palette.length > 24) throw new Error("Identity palette supports at most 24 colors");
    if (!Array.isArray(typography) || typography.length > 24) throw new Error("Identity typography supports at most 24 entries");
    const normalizedPalette = palette.map((item) => {
      const hex = boundedText(item?.hex, "Palette hex", 7);
      if (hex && !/^#[0-9a-fA-F]{6}$/.test(hex)) throw new Error("Palette colors must use #RRGGBB");
      return {
        id: boundedText(item?.id, "Palette ID", 80) || randomUUID(),
        name: boundedText(item?.name, "Palette name", 120),
        hex,
        role: boundedText(item?.role, "Palette role", 200)
      };
    });
    const normalizedTypography = typography.map((item) => ({
      id: boundedText(item?.id, "Typography ID", 80) || randomUUID(),
      role: boundedText(item?.role, "Typography role", 200),
      font: boundedText(item?.font, "Typography font", 200),
      weight: boundedText(item?.weight, "Typography weight", 120)
    }));
    return {
      kind,
      tagline: boundedText(value2.tagline, "Identity tagline", 500),
      mission: boundedText(value2.mission, "Identity mission", 4e3),
      values: boundedStringList(value2.values ?? [], "Identity value", 40, 1e3),
      personality: boundedStringList(value2.personality ?? [], "Identity personality", 40, 1e3),
      logoAssetId: boundedText(value2.logoAssetId, "Identity logo asset ID", 80),
      palette: normalizedPalette,
      typography: normalizedTypography,
      logoUsage: boundedText(value2.logoUsage, "Identity logo usage", 8e3),
      layout: boundedText(value2.layout, "Identity layout", 8e3),
      imagery: boundedText(value2.imagery, "Identity imagery", 8e3),
      avoid: boundedStringList(value2.avoid ?? [], "Identity avoid rule", 40, 1e3),
      visualAssetIds: boundedStringList(value2.visualAssetIds ?? [], "Identity visual asset ID", 12, 80),
      notes: boundedText(value2.notes, "Identity notes", 12e3),
      sources
    };
  }
  const value = input;
  const tones = value.tones ?? [];
  const examples = value.examples ?? [];
  if (!Array.isArray(tones) || tones.length > 30) throw new Error("Voice guideline supports at most 30 tones");
  if (!Array.isArray(examples) || examples.length > 30) throw new Error("Voice guideline supports at most 30 examples");
  return {
    kind,
    core: boundedText(value.core, "Core voice", 6e3),
    traits: boundedStringList(value.traits ?? [], "Voice trait", 40, 1e3),
    address: boundedText(value.address, "Voice address", 4e3),
    language: boundedText(value.language, "Voice language", 4e3),
    sentenceStyle: boundedText(value.sentenceStyle, "Voice sentence style", 6e3),
    terminology: boundedText(value.terminology, "Voice terminology", 8e3),
    do: boundedStringList(value.do ?? [], "Voice do rule", 60, 2e3),
    avoid: boundedStringList(value.avoid ?? [], "Voice avoid rule", 60, 2e3),
    tones: tones.map((item) => ({
      id: boundedText(item?.id, "Tone ID", 80) || randomUUID(),
      context: boundedText(item?.context, "Tone context", 300),
      platform: boundedText(item?.platform, "Tone platform", 80),
      tone: boundedText(item?.tone, "Tone", 3e3),
      opening: boundedText(item?.opening, "Tone opening", 2e3),
      cta: boundedText(item?.cta, "Tone CTA", 2e3)
    })),
    examples: examples.map((item) => ({
      id: boundedText(item?.id, "Voice example ID", 80) || randomUUID(),
      label: boundedText(item?.label, "Voice example label", 300),
      text: boundedText(item?.text, "Voice example text", 6e3),
      kind: item?.kind === "avoid" ? "avoid" : "good",
      explanation: boundedText(item?.explanation, "Voice example explanation", 4e3)
    })),
    notes: boundedText(value.notes, "Voice notes", 12e3),
    sources
  };
}
function brandGuidelineGaps(payload) {
  const gaps = [];
  if (payload.kind === "identity") {
    if (!payload.tagline) gaps.push("Tagline");
    if (!payload.personality.length) gaps.push("T\xEDnh c\xE1ch th\u01B0\u01A1ng hi\u1EC7u");
    if (!payload.logoAssetId) gaps.push("Logo \u0111ang d\xF9ng");
    if (!payload.palette.some((item) => item.name && item.hex && item.role)) gaps.push("B\u1EA3ng m\xE0u");
    if (!payload.typography.some((item) => item.role && item.font)) gaps.push("Typography");
    if (!payload.logoUsage) gaps.push("Quy t\u1EAFc d\xF9ng logo");
    if (!payload.layout) gaps.push("Quy t\u1EAFc b\u1ED1 c\u1EE5c");
    if (!payload.imagery) gaps.push("Phong c\xE1ch h\xECnh \u1EA3nh");
  } else {
    if (!payload.core) gaps.push("Gi\u1ECDng c\u1ED1t l\xF5i");
    if (!payload.traits.length) gaps.push("\u0110\u1EB7c t\xEDnh gi\u1ECDng");
    if (!payload.address) gaps.push("C\xE1ch x\u01B0ng h\xF4");
    if (!payload.language) gaps.push("Ng\xF4n ng\u1EEF");
    if (!payload.sentenceStyle) gaps.push("Nh\u1ECBp v\xE0 c\u1EA5u tr\xFAc c\xE2u");
    if (!payload.do.length) gaps.push("\u0110i\u1EC1u n\xEAn vi\u1EBFt");
    if (!payload.avoid.length) gaps.push("\u0110i\u1EC1u c\u1EA7n tr\xE1nh");
    if (!payload.tones.some((item) => item.context && item.tone)) gaps.push("Tone theo ng\u1EEF c\u1EA3nh");
  }
  if (!payload.sources.some((source) => source.title)) gaps.push("Ngu\u1ED3n ho\u1EB7c quy\u1EBFt \u0111\u1ECBnh th\u01B0\u01A1ng hi\u1EC7u");
  if (payload.sources.some((source) => source.basis === "observed" && (!source.url || !source.checkedAt))) gaps.push("URL v\xE0 ng\xE0y \u0111\u1ED1i chi\u1EBFu cho ngu\u1ED3n quan s\xE1t");
  return gaps;
}
var brandTypes = /* @__PURE__ */ new Set(["company", "product", "service", "sub_brand"]);
var brandStatuses = /* @__PURE__ */ new Set(["draft", "active"]);
var brandRelationships = /* @__PURE__ */ new Set(["independent", "sub_brand_of", "product_brand_of", "service_brand_of", "endorsed_by", "powered_by"]);
function normalizeBrandInput(input) {
  if (!brandTypes.has(input.type)) throw new Error("Unsupported Brand type");
  const type = input.type;
  const parentBrandId = boundedText(input.parentBrandId ?? void 0, "Parent Brand ID", 100) || null;
  const relationship = input.relationship || (parentBrandId ? "sub_brand_of" : "independent");
  if (!brandRelationships.has(relationship)) throw new Error("Unsupported Brand relationship");
  if (parentBrandId && relationship === "independent") throw new Error("A Brand with a parent must define its relationship");
  if (!parentBrandId && relationship !== "independent") throw new Error("An independent Brand cannot define a parent relationship");
  const linkedEntityType = input.linkedEntityType === void 0 || input.linkedEntityType === null ? null : input.linkedEntityType;
  if (linkedEntityType !== null && !["product", "service"].includes(linkedEntityType)) throw new Error("Unsupported linked business entity type");
  const linkedEntityId = boundedText(input.linkedEntityId ?? void 0, "Linked business entity ID", 100) || null;
  if (Boolean(linkedEntityType) !== Boolean(linkedEntityId)) throw new Error("Linked business entity type and ID must be provided together");
  return {
    name: boundedText(input.name, "Brand name", 200, true),
    type,
    summary: boundedText(input.summary, "Brand summary", 4e3),
    parentBrandId,
    relationship,
    linkedEntityType,
    linkedEntityId
  };
}
function normalizeBrandProfileInput(input) {
  const normalized = {};
  for (const [field, limit] of Object.entries(brandProfileTextLimits)) {
    const value = field.endsWith("Url") ? publicUrl(input[field], `Brand profile field ${field}`) : boundedText(input[field], `Brand profile field ${field}`, limit, field === "name");
    Object.assign(normalized, { [field]: value });
  }
  return normalized;
}
function normalizeBrandRecordInput(input) {
  if (!brandRecordKinds.has(input.kind)) throw new Error("Unsupported Brand Profile record kind");
  const kind = input.kind;
  const offeringTypes = /* @__PURE__ */ new Set(["unclassified", "physical", "digital", "service", "hybrid"]);
  const offeringStatuses = /* @__PURE__ */ new Set(["draft", "testing", "active", "paused", "retired"]);
  const rawSubtype = boundedText(input.subtype, "Brand record subtype", 80);
  const subtype = kind === "offering" && !offeringTypes.has(rawSubtype) ? "unclassified" : rawSubtype;
  const offeringStatus = kind === "offering" ? boundedText(input.offeringStatus || "active", "Offering lifecycle status", 20) : "";
  if (offeringStatus && !offeringStatuses.has(offeringStatus)) throw new Error("Unsupported product or service lifecycle status");
  const segmentIds = input.segmentIds ?? [];
  if (!Array.isArray(segmentIds) || segmentIds.length > 30 || segmentIds.some((id) => typeof id !== "string" || !id.trim()) || new Set(segmentIds).size !== segmentIds.length) throw new Error("Offering segment links are invalid");
  const options = input.options ?? [];
  if (!Array.isArray(options) || options.length > 50) throw new Error("An offering supports at most 50 options");
  const normalizedOptions = options.map((option) => ({
    id: boundedText(option?.id, "Offering option ID", 80) || randomUUID(),
    name: boundedText(option?.name, "Offering option name", 200, true),
    price: boundedText(option?.price, "Offering option price", 500),
    description: boundedText(option?.description, "Offering option description", 2e3)
  }));
  if (new Set(normalizedOptions.map((option) => option.id)).size !== normalizedOptions.length) throw new Error("Offering option IDs must be unique");
  return {
    kind,
    name: boundedText(input.name, "Brand record name", 200, true),
    summary: boundedText(input.summary, "Brand record summary", 4e3),
    subtype: kind === "offering" ? subtype || "unclassified" : subtype,
    content: boundedText(input.content, "Brand record content", 12e4),
    offeringStatus,
    value: kind === "offering" ? boundedText(input.value, "Offering value", 4e3) : "",
    details: kind === "offering" ? boundedText(input.details, "Offering details", 2e4) : "",
    fulfillment: kind === "offering" ? boundedText(input.fulfillment, "Offering fulfillment", 12e3) : "",
    constraints: kind === "offering" ? boundedText(input.constraints, "Offering constraints", 12e3) : "",
    url: kind === "offering" ? publicUrl(input.url, "Offering public URL") : "",
    category: kind === "offering" ? boundedText(input.category, "Offering category", 200) : "",
    code: kind === "offering" ? boundedText(input.code, "Offering code", 160) : "",
    notes: kind === "offering" ? boundedText(input.notes, "Offering notes", 12e3) : "",
    segmentIds: kind === "offering" ? segmentIds.map((id) => id.trim()) : [],
    options: kind === "offering" ? normalizedOptions : [],
    websiteUrl: kind === "competitor" ? publicUrl(input.websiteUrl, "Competitor website URL") : "",
    facebookUrl: kind === "competitor" ? publicUrl(input.facebookUrl, "Competitor Facebook URL") : "",
    linkedinUrl: kind === "competitor" ? publicUrl(input.linkedinUrl, "Competitor LinkedIn URL") : "",
    instagramUrl: kind === "competitor" ? publicUrl(input.instagramUrl, "Competitor Instagram URL") : "",
    tiktokUrl: kind === "competitor" ? publicUrl(input.tiktokUrl, "Competitor TikTok URL") : "",
    youtubeUrl: kind === "competitor" ? publicUrl(input.youtubeUrl, "Competitor YouTube URL") : "",
    zaloUrl: kind === "competitor" ? publicUrl(input.zaloUrl, "Competitor Zalo URL") : ""
  };
}
function normalizeBrandClaimInput(input) {
  if (!brandClaimTypes.has(input.claimType)) throw new Error("Unsupported brand claim type");
  const allowedUses = input.allowedUses ?? [];
  if (!Array.isArray(allowedUses) || allowedUses.some((value) => !brandClaimUses.has(value)) || new Set(allowedUses).size !== allowedUses.length) throw new Error("Brand claim uses are invalid");
  const proof = input.proof ?? [];
  if (!Array.isArray(proof) || proof.length > 20) throw new Error("A brand claim supports at most 20 proof entries");
  const normalizedProof = proof.map((item) => {
    if (!item || typeof item !== "object") throw new Error("Brand claim proof is invalid");
    const title = boundedText(item.title, "Proof title", 300);
    const sourceUrl = publicUrl(item.sourceUrl, "Proof source URL");
    const summary = boundedText(item.summary, "Proof summary", 4e3);
    if (!title && !sourceUrl && !summary) throw new Error("Proof needs a title, source URL, or summary");
    return {
      id: boundedText(item.id, "Proof ID", 80) || randomUUID(),
      title,
      sourceUrl,
      summary
    };
  });
  if (new Set(normalizedProof.map((item) => item.id)).size !== normalizedProof.length) throw new Error("Proof IDs must be unique");
  const claimType = input.claimType;
  const requiredDisclosure = boundedText(input.requiredDisclosure, "Required disclosure", 4e3);
  if (borrowedClaimTypes.has(claimType) && !requiredDisclosure) throw new Error("Third-party claims require a disclosure");
  const reviewAfter = boundedText(input.reviewAfter, "Review date", 10);
  if (reviewAfter && !/^\d{4}-\d{2}-\d{2}$/.test(reviewAfter)) throw new Error("Review date must use YYYY-MM-DD");
  return {
    claim: boundedText(input.claim, "Brand claim", 4e3, true),
    claimType,
    allowedUses,
    limitations: boundedText(input.limitations, "Claim limitations", 4e3),
    requiredDisclosure,
    reviewAfter,
    notes: boundedText(input.notes, "Claim notes", 8e3),
    proof: normalizedProof
  };
}
function detectImageAsset(data) {
  const bytes = Buffer.from(data);
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { mimeType: "image/png", extension: "png" };
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return { mimeType: "image/jpeg", extension: "jpg" };
  if (bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP") return { mimeType: "image/webp", extension: "webp" };
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString())) return { mimeType: "image/gif", extension: "gif" };
  throw new Error("Images must be PNG, JPEG, WebP, or GIF");
}
var BrandProfileStore = class {
  constructor(db) {
    this.db = db;
  }
  db;
  brandPayload(row) {
    return normalizeBrandInput({
      name: row.name,
      type: row.type,
      summary: row.summary,
      parentBrandId: row.parent_brand_id,
      relationship: row.relationship,
      linkedEntityType: row.linked_entity_type,
      linkedEntityId: row.linked_entity_id
    });
  }
  ensureBrandScope(brandId, input = {}) {
    if (this.getBrand(brandId)) return;
    if (brandId !== "default") throw new Error("Brand not found");
    const timestamp = now();
    const payload = normalizeBrandInput({ name: input.name || "Th\u01B0\u01A1ng hi\u1EC7u doanh nghi\u1EC7p", type: "company", summary: input.summary || "", parentBrandId: null, relationship: "independent", linkedEntityType: null, linkedEntityId: null });
    this.db.prepare("INSERT INTO brands (id, name, type, summary, parent_brand_id, relationship, linked_entity_type, linked_entity_id, status, revision, created_at, updated_at) VALUES ('default', ?, 'company', ?, NULL, 'independent', NULL, NULL, 'draft', 1, ?, ?)").run(payload.name, payload.summary, timestamp, timestamp);
    this.db.prepare("INSERT INTO brand_versions (brand_id, revision, payload_json, status, action, created_at) VALUES ('default', 1, ?, 'draft', 'create', ?)").run(JSON.stringify(payload), timestamp);
  }
  toBrandSummary(row, payload = this.brandPayload(row), status = row.status, revision = Number(row.revision), updatedAt = row.updated_at) {
    const childCount = Number(this.db.prepare("SELECT count(*) AS total FROM brands WHERE parent_brand_id = ? AND archived_at IS NULL").get(row.id).total);
    return {
      ...payload,
      id: row.id,
      status,
      revision,
      childCount,
      hasProfile: Boolean(this.db.prepare("SELECT 1 FROM brand_profiles WHERE id = ?").get(row.id)),
      createdAt: row.created_at,
      updatedAt,
      archivedAt: row.archived_at
    };
  }
  listBrands(input = {}) {
    const where = [input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
    if (input.type) {
      if (!brandTypes.has(input.type)) throw new Error("Unsupported Brand type");
      where.push("type = ?");
      values.push(input.type);
    }
    if (input.status) {
      if (!brandStatuses.has(input.status)) throw new Error("Unsupported Brand status");
      where.push("status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      where.push("(name LIKE ? OR summary LIKE ?)");
      values.push(pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM brands WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    const facets = {
      types: { company: 0, product: 0, service: 0, sub_brand: 0 },
      statuses: { draft: 0, active: 0 }
    };
    const scope = input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL";
    for (const row of this.db.prepare(`SELECT type, count(*) AS total FROM brands WHERE ${scope} GROUP BY type`).all()) facets.types[row.type] = Number(row.total);
    for (const row of this.db.prepare(`SELECT status, count(*) AS total FROM brands WHERE ${scope} GROUP BY status`).all()) facets.statuses[row.status] = Number(row.total);
    return { items: rows.map((row) => this.toBrandSummary(row)), total: rows.length, facets };
  }
  getBrand(id, revision) {
    const current = this.db.prepare("SELECT * FROM brands WHERE id = ?").get(id);
    if (!current) return null;
    let payload = this.brandPayload(current);
    let status = current.status;
    let selectedRevision = Number(current.revision);
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT revision, payload_json, status, action, created_at FROM brand_versions WHERE brand_id = ? AND revision = ?").get(id, revision);
      if (!version) throw new Error("Brand revision not found");
      payload = normalizeBrandInput(JSON.parse(version.payload_json));
      status = version.status;
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, status, action, created_at FROM brand_versions WHERE brand_id = ? ORDER BY revision DESC").all(id).map((version) => ({
      revision: Number(version.revision),
      status: version.status,
      action: version.action ?? "",
      createdAt: version.created_at
    }));
    return {
      ...this.toBrandSummary(current, payload, status, selectedRevision, selectedAt),
      currentRevision: Number(current.revision),
      isHistorical: selectedRevision !== Number(current.revision),
      versions
    };
  }
  assertBrandRelationships(input, currentId) {
    if (input.parentBrandId) {
      if (input.parentBrandId === currentId) throw new Error("A Brand cannot be its own parent");
      const parent = this.getBrand(input.parentBrandId);
      const retainedParent = currentId ? this.getBrand(currentId)?.parentBrandId === input.parentBrandId : false;
      if (!parent || parent.archivedAt && !retainedParent) throw new Error("Parent Brand is unavailable");
      let ancestorId = parent.parentBrandId;
      const visited = /* @__PURE__ */ new Set([input.parentBrandId]);
      while (ancestorId) {
        if (ancestorId === currentId) throw new Error("Brand relationships cannot form a cycle");
        if (visited.has(ancestorId)) throw new Error("Brand relationships cannot form a cycle");
        visited.add(ancestorId);
        ancestorId = this.db.prepare("SELECT parent_brand_id FROM brands WHERE id = ?").get(ancestorId)?.parent_brand_id ?? null;
      }
    }
    if (input.linkedEntityId) {
      const linked = this.getBrandRecord(input.linkedEntityId);
      if (!linked || linked.kind !== "offering" || linked.archivedAt) throw new Error("Linked Product or Service is unavailable");
    }
    const duplicate = this.db.prepare(`SELECT id FROM brands WHERE lower(name) = lower(?) AND parent_brand_id IS ? AND archived_at IS NULL ${currentId ? "AND id != ?" : ""}`).get(input.name, input.parentBrandId, ...currentId ? [currentId] : []);
    if (duplicate) throw new Error("A Brand with this name already exists at the same level");
  }
  createBrand(input) {
    const payload = normalizeBrandInput(input);
    this.assertBrandRelationships(payload);
    const id = randomUUID();
    const timestamp = now();
    const profile = normalizeBrandProfileInput({ name: payload.name, summary: payload.summary });
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO brands (id, name, type, summary, parent_brand_id, relationship, linked_entity_type, linked_entity_id, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft', 1, ?, ?)").run(id, payload.name, payload.type, payload.summary, payload.parentBrandId, payload.relationship, payload.linkedEntityType, payload.linkedEntityId, timestamp, timestamp);
      this.db.prepare("INSERT INTO brand_versions (brand_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'draft', 'create', ?)").run(id, JSON.stringify(payload), timestamp);
      this.db.prepare("INSERT INTO brand_profiles (id, payload_json, revision, created_at, updated_at) VALUES (?, ?, 1, ?, ?)").run(id, JSON.stringify(profile), timestamp, timestamp);
      this.db.prepare("INSERT INTO brand_profile_versions (profile_id, revision, payload_json, created_at) VALUES (?, 1, ?, ?)").run(id, JSON.stringify(profile), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrand(id);
  }
  updateBrand(id, input, expectedRevision) {
    const current = this.getBrand(id);
    if (!current) throw new Error("Brand not found");
    if (current.archivedAt) throw new Error("Archived Brands must be restored before editing");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand changed since it was opened");
    const payload = normalizeBrandInput(input);
    this.assertBrandRelationships(payload, id);
    const revision = current.currentRevision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brands SET name = ?, type = ?, summary = ?, parent_brand_id = ?, relationship = ?, linked_entity_type = ?, linked_entity_id = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.name, payload.type, payload.summary, payload.parentBrandId, payload.relationship, payload.linkedEntityType, payload.linkedEntityId, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Brand changed since it was opened");
      this.db.prepare("INSERT INTO brand_versions (brand_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'update', ?)").run(id, revision, JSON.stringify(payload), current.status, timestamp);
      const foundation = this.getBrandProfile(void 0, id);
      if (foundation && (foundation.name !== payload.name || foundation.summary !== payload.summary)) {
        const updated = normalizeBrandProfileInput({ ...foundation, name: payload.name, summary: payload.summary });
        const profileRevision = foundation.currentRevision + 1;
        this.db.prepare("UPDATE brand_profiles SET payload_json = ?, revision = ?, updated_at = ? WHERE id = ?").run(JSON.stringify(updated), profileRevision, timestamp, id);
        this.db.prepare("INSERT INTO brand_profile_versions (profile_id, revision, payload_json, created_at) VALUES (?, ?, ?, ?)").run(id, profileRevision, JSON.stringify(updated), timestamp);
      }
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrand(id);
  }
  transitionBrand(id, status, expectedRevision) {
    if (!brandStatuses.has(status)) throw new Error("Unsupported Brand status");
    const current = this.getBrand(id);
    if (!current) throw new Error("Brand not found");
    if (current.archivedAt) throw new Error("Archived Brands must be restored before activation");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand changed since it was opened");
    if (current.status === status) throw new Error(`Brand is already ${status}`);
    return this.reviseBrandState(current, status, null, `transition:${status}`);
  }
  archiveBrand(id, expectedRevision, restore = false) {
    const current = this.getBrand(id);
    if (!current) throw new Error("Brand not found");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Brand archive state changed since it was opened");
    return this.reviseBrandState(current, restore ? "draft" : current.status, restore ? null : now(), restore ? "restore" : "archive");
  }
  reviseBrandState(current, status, archivedAt, action) {
    const revision = current.currentRevision + 1;
    const timestamp = now();
    const payload = normalizeBrandInput(current);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brands SET status = ?, archived_at = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(status, archivedAt, revision, timestamp, current.id, current.currentRevision);
      if (!changed.changes) throw new Error("Brand changed since it was opened");
      this.db.prepare("INSERT INTO brand_versions (brand_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(current.id, revision, JSON.stringify(payload), status, action, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrand(current.id);
  }
  getBrandProfile(revision, brandId = "default") {
    const current = this.db.prepare("SELECT * FROM brand_profiles WHERE id = ?").get(brandId);
    if (!current) return null;
    let payload = normalizeBrandProfileInput(JSON.parse(current.payload_json));
    let selectedRevision = current.revision;
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT revision, payload_json, created_at FROM brand_profile_versions WHERE profile_id = ? AND revision = ?").get(brandId, revision);
      if (!version) throw new Error("Brand Profile revision not found");
      payload = normalizeBrandProfileInput(JSON.parse(version.payload_json));
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, created_at FROM brand_profile_versions WHERE profile_id = ? ORDER BY revision DESC").all(brandId).map((version) => ({
      revision: Number(version.revision),
      createdAt: version.created_at
    }));
    return {
      ...payload,
      id: current.id,
      revision: selectedRevision,
      currentRevision: Number(current.revision),
      isHistorical: selectedRevision !== Number(current.revision),
      versions,
      createdAt: current.created_at,
      updatedAt: selectedAt
    };
  }
  saveBrandProfile(input, expectedRevision, brandId = "default") {
    const current = this.getBrandProfile(void 0, brandId);
    const payload = normalizeBrandProfileInput({ ...input, goals: input.goals ?? current?.goals, desiredImage: input.desiredImage ?? current?.desiredImage, valueOffers: input.valueOffers ?? current?.valueOffers });
    this.ensureBrandScope(brandId, { name: payload.name, summary: payload.summary });
    const timestamp = now();
    if (!current) {
      if (expectedRevision !== void 0) throw new Error("Brand Profile does not exist yet");
      this.db.exec("BEGIN IMMEDIATE");
      try {
        this.db.prepare("INSERT INTO brand_profiles (id, payload_json, revision, created_at, updated_at) VALUES (?, ?, 1, ?, ?)").run(brandId, JSON.stringify(payload), timestamp, timestamp);
        this.db.prepare("INSERT INTO brand_profile_versions (profile_id, revision, payload_json, created_at) VALUES (?, 1, ?, ?)").run(brandId, JSON.stringify(payload), timestamp);
        this.syncBrandIdentity(brandId, payload, timestamp);
        this.db.exec("COMMIT");
      } catch (error) {
        this.db.exec("ROLLBACK");
        throw error;
      }
      return this.getBrandProfile(void 0, brandId);
    }
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile changed since it was opened");
    const revision = current.currentRevision + 1;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_profiles SET payload_json = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(JSON.stringify(payload), revision, timestamp, brandId, expectedRevision);
      if (!changed.changes) throw new Error("Brand Profile changed since it was opened");
      this.db.prepare("INSERT INTO brand_profile_versions (profile_id, revision, payload_json, created_at) VALUES (?, ?, ?, ?)").run(brandId, revision, JSON.stringify(payload), timestamp);
      this.syncBrandIdentity(brandId, payload, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandProfile(void 0, brandId);
  }
  syncBrandIdentity(brandId, profile, timestamp) {
    const current = this.getBrand(brandId);
    if (current.name === profile.name && current.summary === profile.summary) return;
    const duplicate = this.db.prepare("SELECT id FROM brands WHERE lower(name) = lower(?) AND parent_brand_id IS ? AND archived_at IS NULL AND id != ?").get(profile.name, current.parentBrandId, brandId);
    if (duplicate) throw new Error("A Brand with this name already exists at the same level");
    const payload = normalizeBrandInput({ ...current, name: profile.name, summary: profile.summary });
    const revision = current.currentRevision + 1;
    this.db.prepare("UPDATE brands SET name = ?, summary = ?, revision = ?, updated_at = ? WHERE id = ?").run(payload.name, payload.summary, revision, timestamp, brandId);
    this.db.prepare("INSERT INTO brand_versions (brand_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'update:foundation', ?)").run(brandId, revision, JSON.stringify(payload), current.status, timestamp);
  }
  getBrandGuideline(kind, revision, brandId = "default") {
    if (!["identity", "voice"].includes(kind)) throw new Error("Unsupported Brand guideline kind");
    const current = this.db.prepare("SELECT * FROM brand_studio_guidelines WHERE brand_id = ? AND kind = ?").get(brandId, kind);
    if (!current) return null;
    let payload = normalizeBrandGuidelineInput(kind, JSON.parse(current.payload_json));
    let selectedRevision = Number(current.revision);
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT * FROM brand_studio_guideline_versions WHERE brand_id = ? AND kind = ? AND revision = ?").get(brandId, kind, revision);
      if (!version) throw new Error("Brand guideline revision not found");
      payload = normalizeBrandGuidelineInput(kind, JSON.parse(version.payload_json));
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, action, activated_at, created_at FROM brand_studio_guideline_versions WHERE brand_id = ? AND kind = ? ORDER BY revision DESC").all(brandId, kind).map((version) => ({
      revision: Number(version.revision),
      action: version.action,
      activatedAt: version.activated_at,
      createdAt: version.created_at
    }));
    const activeRevision = current.active_revision === null ? null : Number(current.active_revision);
    return {
      ...payload,
      revision: selectedRevision,
      currentRevision: Number(current.revision),
      activeRevision,
      status: selectedRevision === activeRevision ? "active" : "draft",
      isHistorical: selectedRevision !== Number(current.revision),
      gaps: brandGuidelineGaps(payload),
      versions,
      createdAt: current.created_at,
      updatedAt: selectedAt
    };
  }
  getActiveBrandGuideline(kind, brandId = "default") {
    const row = this.db.prepare("SELECT active_revision FROM brand_studio_guidelines WHERE brand_id = ? AND kind = ?").get(brandId, kind);
    return row?.active_revision ? this.getBrandGuideline(kind, Number(row.active_revision), brandId) : null;
  }
  saveBrandGuideline(kind, input, expectedRevision, brandId = "default") {
    if (!this.getBrandProfile(void 0, brandId)) throw new Error("Create Brand Profile before adding brand guidelines");
    const payload = normalizeBrandGuidelineInput(kind, input);
    const current = this.getBrandGuideline(kind, void 0, brandId);
    const timestamp = now();
    if (!current) {
      if (expectedRevision !== void 0) throw new Error("Brand guideline does not exist yet");
      this.db.exec("BEGIN IMMEDIATE");
      try {
        this.db.prepare("INSERT INTO brand_studio_guidelines (brand_id, kind, payload_json, revision, active_revision, created_at, updated_at) VALUES (?, ?, ?, 1, NULL, ?, ?)").run(brandId, kind, JSON.stringify(payload), timestamp, timestamp);
        this.db.prepare("INSERT INTO brand_studio_guideline_versions (brand_id, kind, revision, payload_json, action, activated_at, created_at) VALUES (?, ?, 1, ?, 'create', NULL, ?)").run(brandId, kind, JSON.stringify(payload), timestamp);
        this.db.exec("COMMIT");
      } catch (error) {
        this.db.exec("ROLLBACK");
        throw error;
      }
      return this.getBrandGuideline(kind, void 0, brandId);
    }
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand guideline changed since it was opened");
    const revision = current.currentRevision + 1;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_studio_guidelines SET payload_json = ?, revision = ?, updated_at = ? WHERE brand_id = ? AND kind = ? AND revision = ?").run(JSON.stringify(payload), revision, timestamp, brandId, kind, expectedRevision);
      if (!changed.changes) throw new Error("Brand guideline changed since it was opened");
      this.db.prepare("INSERT INTO brand_studio_guideline_versions (brand_id, kind, revision, payload_json, action, activated_at, created_at) VALUES (?, ?, ?, ?, 'update', NULL, ?)").run(brandId, kind, revision, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandGuideline(kind, void 0, brandId);
  }
  activateBrandGuideline(kind, expectedRevision, brandId = "default") {
    const current = this.getBrandGuideline(kind, void 0, brandId);
    if (!current) throw new Error("Create a brand guideline draft before activating it");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand guideline changed since it was opened");
    if (current.gaps.length) throw new Error(`Complete the guideline before activating it: ${current.gaps.join(", ")}`);
    if (current.kind === "identity") {
      const assets = this.listBrandAssets({ brandId });
      if (!assets.some((asset) => asset.id === current.logoAssetId && asset.role === "logo")) throw new Error("The selected logo is unavailable");
      if (current.visualAssetIds.some((id) => !assets.some((asset) => asset.id === id && asset.role === "visual_reference"))) throw new Error("A selected visual reference is unavailable");
    }
    if (current.activeRevision === current.currentRevision) return current;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_studio_guidelines SET active_revision = ?, updated_at = ? WHERE brand_id = ? AND kind = ? AND revision = ?").run(current.currentRevision, timestamp, brandId, kind, expectedRevision);
      if (!changed.changes) throw new Error("Brand guideline changed since it was opened");
      this.db.prepare("UPDATE brand_studio_guideline_versions SET activated_at = ? WHERE brand_id = ? AND kind = ? AND revision = ?").run(timestamp, brandId, kind, current.currentRevision);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandGuideline(kind, void 0, brandId);
  }
  restoreBrandGuideline(kind, sourceRevision, expectedRevision, brandId = "default") {
    const current = this.getBrandGuideline(kind, void 0, brandId);
    if (!current) throw new Error("Brand guideline does not exist");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand guideline changed since it was opened");
    const source = this.db.prepare("SELECT payload_json FROM brand_studio_guideline_versions WHERE brand_id = ? AND kind = ? AND revision = ?").get(brandId, kind, sourceRevision);
    if (!source) throw new Error("Brand guideline revision not found");
    const payload = normalizeBrandGuidelineInput(kind, JSON.parse(source.payload_json));
    const revision = current.currentRevision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_studio_guidelines SET payload_json = ?, revision = ?, updated_at = ? WHERE brand_id = ? AND kind = ? AND revision = ?").run(JSON.stringify(payload), revision, timestamp, brandId, kind, expectedRevision);
      if (!changed.changes) throw new Error("Brand guideline changed since it was opened");
      this.db.prepare("INSERT INTO brand_studio_guideline_versions (brand_id, kind, revision, payload_json, action, activated_at, created_at) VALUES (?, ?, ?, ?, 'restore', NULL, ?)").run(brandId, kind, revision, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandGuideline(kind, void 0, brandId);
  }
  toBrandRecordSummary(row, payload) {
    return {
      ...payload ?? normalizeBrandRecordInput(JSON.parse(row.payload_json)),
      id: row.id,
      status: row.status,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  assertBrandRecordReferences(payload, brandId = "default") {
    if (payload.kind !== "offering" || !payload.segmentIds?.length) return;
    const placeholders = payload.segmentIds.map(() => "?").join(", ");
    const rows = this.db.prepare(`SELECT id, kind FROM brand_records WHERE brand_id = ? AND id IN (${placeholders})`).all(brandId, ...payload.segmentIds);
    const validSegmentIds = new Set(rows.filter((row) => row.kind === "segment").map((row) => row.id));
    if (payload.segmentIds.some((id) => !validSegmentIds.has(id))) throw new Error("Offering segment links must reference existing customer segments");
  }
  listBrandRecords(input = {}) {
    const brandId = input.brandId ?? "default";
    const where = ["brand_id = ?", input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [brandId];
    if (input.kind) {
      if (!brandRecordKinds.has(input.kind)) throw new Error("Unsupported Brand Profile record kind");
      where.push("kind = ?");
      values.push(input.kind);
    }
    if (input.status) {
      if (!["active", "disabled"].includes(input.status)) throw new Error("Unsupported Brand Profile record status");
      where.push("status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      where.push("(name LIKE ? OR payload_json LIKE ?)");
      values.push(pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM brand_records WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    const facets = {
      segment: 0,
      persona: 0,
      offering: 0,
      competitor: 0
    };
    for (const row of this.db.prepare("SELECT kind, count(*) AS total FROM brand_records WHERE brand_id = ? AND archived_at IS NULL GROUP BY kind").all(brandId)) facets[row.kind] = Number(row.total);
    return {
      items: rows.map((row) => this.toBrandRecordSummary(row)),
      total: rows.length,
      facets
    };
  }
  getBrandRecord(id, revision, brandId) {
    const current = this.db.prepare(`SELECT * FROM brand_records WHERE id = ?${brandId ? " AND brand_id = ?" : ""}`).get(id, ...brandId ? [brandId] : []);
    if (!current) return null;
    let payload = normalizeBrandRecordInput(JSON.parse(current.payload_json));
    let status = current.status;
    let selectedRevision = Number(current.revision);
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT revision, payload_json, status, action, created_at FROM brand_record_versions WHERE record_id = ? AND revision = ?").get(id, revision);
      if (!version) throw new Error("Brand Profile record revision not found");
      payload = normalizeBrandRecordInput(JSON.parse(version.payload_json));
      status = version.status;
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, status, action, created_at FROM brand_record_versions WHERE record_id = ? ORDER BY revision DESC").all(id).map((version) => ({
      revision: Number(version.revision),
      status: version.status,
      action: version.action ?? "",
      createdAt: version.created_at
    }));
    return {
      ...payload,
      id,
      status,
      revision: selectedRevision,
      currentRevision: Number(current.revision),
      isHistorical: selectedRevision !== Number(current.revision),
      versions,
      createdAt: current.created_at,
      updatedAt: selectedAt,
      archivedAt: current.archived_at
    };
  }
  createBrandRecord(input, brandId = "default") {
    this.ensureBrandScope(brandId);
    const payload = normalizeBrandRecordInput(input);
    this.assertBrandRecordReferences(payload, brandId);
    const id = randomUUID();
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO brand_records (id, brand_id, kind, name, payload_json, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'active', 1, ?, ?)").run(id, brandId, payload.kind, payload.name, encoded, timestamp, timestamp);
      this.db.prepare("INSERT INTO brand_record_versions (record_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'active', 'create', ?)").run(id, encoded, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandRecord(id);
  }
  updateBrandRecord(id, input, expectedRevision, brandId) {
    const current = this.getBrandRecord(id, void 0, brandId);
    if (!current) throw new Error("Brand Profile record not found");
    if (current.archivedAt) throw new Error("Archived Brand Profile records must be restored before editing");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile record changed since it was opened");
    const payload = normalizeBrandRecordInput(input);
    if (payload.kind !== current.kind) throw new Error("Brand Profile record kind cannot change");
    const ownerBrandId = brandId ?? this.db.prepare("SELECT brand_id FROM brand_records WHERE id = ?").get(id).brand_id;
    this.assertBrandRecordReferences(payload, ownerBrandId);
    const revision = current.currentRevision + 1;
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_records SET name = ?, payload_json = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.name, encoded, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Brand Profile record changed since it was opened");
      this.db.prepare("INSERT INTO brand_record_versions (record_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, 'update', ?)").run(id, revision, encoded, current.status, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandRecord(id);
  }
  transitionBrandRecord(id, status, expectedRevision, brandId) {
    if (!["active", "disabled"].includes(status)) throw new Error("Unsupported Brand Profile record status");
    const current = this.getBrandRecord(id, void 0, brandId);
    if (!current) throw new Error("Brand Profile record not found");
    if (current.archivedAt) throw new Error("Archived Brand Profile records must be restored before changing status");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile record changed since it was opened");
    if (current.status === status) throw new Error(`Brand Profile record is already ${status}`);
    return this.reviseBrandRecordState(current, status, null, `transition:${status}`);
  }
  archiveBrandRecord(id, expectedRevision, restore = false, brandId) {
    const current = this.getBrandRecord(id, void 0, brandId);
    if (!current) throw new Error("Brand Profile record not found");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile record changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Brand Profile record archive state changed since it was opened");
    return this.reviseBrandRecordState(current, "disabled", restore ? null : now(), restore ? "restore" : "archive");
  }
  reviseBrandRecordState(current, status, archivedAt, action) {
    const revision = current.currentRevision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_records SET status = ?, archived_at = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(status, archivedAt, revision, timestamp, current.id, current.currentRevision);
      if (!changed.changes) throw new Error("Brand Profile record changed since it was opened");
      this.db.prepare("INSERT INTO brand_record_versions (record_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(current.id, revision, JSON.stringify(normalizeBrandRecordInput(current)), status, action, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandRecord(current.id);
  }
  toBrandClaimSummary(row, payload) {
    return {
      ...payload ?? normalizeBrandClaimInput(JSON.parse(row.payload_json)),
      id: row.id,
      status: row.status,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  listBrandClaims(input = {}) {
    const brandId = input.brandId ?? "default";
    const where = ["brand_id = ?", input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [brandId];
    if (input.status) {
      if (!["draft", "approved"].includes(input.status)) throw new Error("Unsupported Brand Claim status");
      where.push("status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      where.push("(claim LIKE ? OR payload_json LIKE ?)");
      values.push(pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM brand_claims WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    const facets = { draft: 0, approved: 0 };
    for (const row of this.db.prepare("SELECT status, count(*) AS total FROM brand_claims WHERE brand_id = ? AND archived_at IS NULL GROUP BY status").all(brandId)) facets[row.status] = Number(row.total);
    return {
      items: rows.map((row) => this.toBrandClaimSummary(row)),
      total: rows.length,
      facets
    };
  }
  getBrandClaim(id, revision, brandId) {
    const current = this.db.prepare(`SELECT * FROM brand_claims WHERE id = ?${brandId ? " AND brand_id = ?" : ""}`).get(id, ...brandId ? [brandId] : []);
    if (!current) return null;
    let payload = normalizeBrandClaimInput(JSON.parse(current.payload_json));
    let status = current.status;
    let selectedRevision = Number(current.revision);
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT revision, payload_json, status, action, created_at FROM brand_claim_versions WHERE claim_id = ? AND revision = ?").get(id, revision);
      if (!version) throw new Error("Brand Claim revision not found");
      payload = normalizeBrandClaimInput(JSON.parse(version.payload_json));
      status = version.status;
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, status, action, created_at FROM brand_claim_versions WHERE claim_id = ? ORDER BY revision DESC").all(id).map((version) => ({
      revision: Number(version.revision),
      status: version.status,
      action: version.action ?? "",
      createdAt: version.created_at
    }));
    return {
      ...payload,
      id,
      status,
      revision: selectedRevision,
      currentRevision: Number(current.revision),
      isHistorical: selectedRevision !== Number(current.revision),
      versions,
      createdAt: current.created_at,
      updatedAt: selectedAt,
      archivedAt: current.archived_at
    };
  }
  createBrandClaim(input, brandId = "default") {
    this.ensureBrandScope(brandId);
    const payload = normalizeBrandClaimInput(input);
    const id = randomUUID();
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO brand_claims (id, brand_id, claim, payload_json, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, 'draft', 1, ?, ?)").run(id, brandId, payload.claim, encoded, timestamp, timestamp);
      this.db.prepare("INSERT INTO brand_claim_versions (claim_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'draft', 'create', ?)").run(id, encoded, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandClaim(id);
  }
  updateBrandClaim(id, input, expectedRevision, brandId) {
    const current = this.getBrandClaim(id, void 0, brandId);
    if (!current) throw new Error("Brand Claim not found");
    if (current.archivedAt) throw new Error("Archived Brand Claims must be restored before editing");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Claim changed since it was opened");
    const payload = normalizeBrandClaimInput(input);
    const revision = current.currentRevision + 1;
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_claims SET claim = ?, payload_json = ?, status = 'draft', revision = ?, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.claim, encoded, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Brand Claim changed since it was opened");
      this.db.prepare("INSERT INTO brand_claim_versions (claim_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, 'draft', 'update', ?)").run(id, revision, encoded, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandClaim(id);
  }
  transitionBrandClaim(id, status, expectedRevision, brandId) {
    if (!["draft", "approved"].includes(status)) throw new Error("Unsupported Brand Claim status");
    const current = this.getBrandClaim(id, void 0, brandId);
    if (!current) throw new Error("Brand Claim not found");
    if (current.archivedAt) throw new Error("Archived Brand Claims must be restored before approval");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Claim changed since it was opened");
    if (current.status === status) throw new Error(`Brand Claim is already ${status}`);
    if (status === "approved" && !current.proof.length) throw new Error("Brand Claim needs proof before approval");
    return this.reviseBrandClaimState(current, status, null, `transition:${status}`);
  }
  archiveBrandClaim(id, expectedRevision, restore = false, brandId) {
    const current = this.getBrandClaim(id, void 0, brandId);
    if (!current) throw new Error("Brand Claim not found");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Claim changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Brand Claim archive state changed since it was opened");
    return this.reviseBrandClaimState(current, "draft", restore ? null : now(), restore ? "restore" : "archive");
  }
  reviseBrandClaimState(current, status, archivedAt, action) {
    const revision = current.currentRevision + 1;
    const timestamp = now();
    const payload = normalizeBrandClaimInput(current);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_claims SET status = ?, archived_at = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(status, archivedAt, revision, timestamp, current.id, current.currentRevision);
      if (!changed.changes) throw new Error("Brand Claim changed since it was opened");
      this.db.prepare("INSERT INTO brand_claim_versions (claim_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(current.id, revision, JSON.stringify(payload), status, action, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandClaim(current.id);
  }
  toBrandAsset(row) {
    return {
      id: row.id,
      role: row.role,
      recordId: row.record_id,
      filename: row.filename,
      mimeType: row.mime_type,
      byteSize: Number(row.byte_size),
      sha256: row.sha256,
      createdAt: row.created_at,
      archivedAt: row.archived_at,
      url: `/api/brand-assets/${row.id}/file`
    };
  }
  listBrandAssets(input = {}) {
    const brandId = input.brandId ?? "default";
    const where = ["brand_id = ?", input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [brandId];
    if (input.role) {
      if (!["logo", "visual_reference", "product_media", "competitor_logo", "personal_media"].includes(input.role)) throw new Error("Unsupported Brand asset role");
      where.push("role = ?");
      values.push(input.role);
    } else where.push("role != 'personal_media'");
    if (input.recordId) {
      where.push("record_id = ?");
      values.push(input.recordId);
    }
    return this.db.prepare(`SELECT id, brand_id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE ${where.join(" AND ")} ORDER BY created_at DESC, id`).all(...values).map((row) => this.toBrandAsset(row));
  }
  createBrandAsset(input, brandId = "default") {
    if (!["logo", "visual_reference", "product_media", "competitor_logo", "personal_media"].includes(input.role)) throw new Error("Unsupported Brand asset role");
    if (input.role !== "personal_media") this.ensureBrandScope(brandId);
    const bytes = Buffer.from(input.data);
    if (!bytes.length || bytes.length > 8e6) throw new Error("Brand assets must be between 1 byte and 8 MB");
    const detected = detectImageAsset(bytes);
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    const recordId = input.recordId || null;
    if (input.role === "product_media") {
      const record = recordId ? this.getBrandRecord(recordId, void 0, brandId) : null;
      if (!record || record.kind !== "offering" || record.archivedAt) throw new Error("Product media requires an active Product/Service record");
    } else if (input.role === "competitor_logo") {
      const record = recordId ? this.getBrandRecord(recordId, void 0, brandId) : null;
      if (!record || record.kind !== "competitor" || record.archivedAt) throw new Error("Competitor logos require an active Competitor record");
    } else if (recordId) throw new Error("Only product media and competitor logos may be linked to a Brand Profile record");
    const existing = this.db.prepare("SELECT id, brand_id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE brand_id = ? AND role = ? AND record_id IS ? AND sha256 = ?").get(brandId, input.role, recordId, sha256);
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      if (input.role === "logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE brand_id = ? AND role = 'logo' AND archived_at IS NULL AND sha256 != ?").run(timestamp, brandId, sha256);
      if (input.role === "competitor_logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE brand_id = ? AND role = 'competitor_logo' AND record_id = ? AND archived_at IS NULL AND sha256 != ?").run(timestamp, brandId, recordId, sha256);
      if (existing) this.db.prepare("UPDATE brand_assets SET archived_at = NULL WHERE id = ?").run(existing.id);
      else this.db.prepare("INSERT INTO brand_assets (id, brand_id, role, record_id, filename, mime_type, byte_size, sha256, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(randomUUID(), brandId, input.role, recordId, boundedText(input.filename, "Asset filename", 300, true), detected.mimeType, bytes.length, sha256, bytes, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.listBrandAssets({
      role: input.role,
      recordId: recordId ?? void 0,
      brandId
    }).find((asset) => asset.sha256 === sha256);
  }
  getBrandAssetData(id) {
    const row = this.db.prepare("SELECT * FROM brand_assets WHERE id = ?").get(id);
    return row ? { asset: this.toBrandAsset(row), data: row.data } : null;
  }
  archiveBrandAsset(id, restore = false) {
    const row = this.db.prepare("SELECT id, brand_id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE id = ?").get(id);
    if (!row) throw new Error("Brand asset not found");
    if (restore ? !row.archived_at : Boolean(row.archived_at)) throw new Error("Brand asset archive state changed");
    if (restore && row.role === "logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE brand_id = ? AND role = 'logo' AND archived_at IS NULL").run(now(), row.brand_id);
    if (restore && row.role === "competitor_logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE brand_id = ? AND role = 'competitor_logo' AND record_id = ? AND archived_at IS NULL").run(now(), row.brand_id, row.record_id);
    this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE id = ?").run(restore ? null : now(), id);
    const result = this.db.prepare("SELECT id, brand_id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE id = ?").get(id);
    return this.toBrandAsset(result);
  }
  brandProfileOverview(brandId = "default") {
    const profile = this.getBrandProfile(void 0, brandId);
    const counts = {
      segment: 0,
      persona: 0,
      offering: 0,
      competitor: 0,
      approvedClaims: 0,
      visualAssets: 0
    };
    for (const row of this.db.prepare("SELECT kind, count(*) total FROM brand_records WHERE brand_id = ? AND archived_at IS NULL AND status = 'active' GROUP BY kind").all(brandId)) counts[row.kind] = Number(row.total);
    counts.approvedClaims = Number(this.db.prepare("SELECT count(*) total FROM brand_claims WHERE brand_id = ? AND archived_at IS NULL AND status = 'approved'").get(brandId).total);
    const assets = this.listBrandAssets({ brandId });
    counts.visualAssets = assets.filter((asset) => asset.role === "visual_reference").length;
    const identity = this.getActiveBrandGuideline("identity", brandId);
    const voice = this.getActiveBrandGuideline("voice", brandId);
    const guidelineDetail = (kind, active) => {
      const current = this.getBrandGuideline(kind, void 0, brandId);
      if (!active) return current ? `Draft v${current.currentRevision} ch\u01B0a k\xEDch ho\u1EA1t` : "Ch\u01B0a t\u1EA1o quy chu\u1EA9n";
      return current && current.currentRevision !== active.revision ? `Active v${active.revision} \xB7 Draft v${current.currentRevision}` : `Active v${active.revision}`;
    };
    const areas = [
      {
        key: "profile",
        label: "N\u1EC1n t\u1EA3ng th\u01B0\u01A1ng hi\u1EC7u",
        complete: Boolean(profile?.summary && profile?.positioning),
        detail: profile ? "T\xF3m t\u1EAFt v\xE0 \u0111\u1ECBnh v\u1ECB" : "Ch\u01B0a t\u1EA1o h\u1ED3 s\u01A1"
      },
      {
        key: "identity",
        label: "Nh\u1EADn di\u1EC7n",
        complete: Boolean(identity),
        detail: guidelineDetail("identity", identity)
      },
      {
        key: "voice",
        label: "Gi\u1ECDng th\u01B0\u01A1ng hi\u1EC7u",
        complete: Boolean(voice),
        detail: guidelineDetail("voice", voice)
      },
      {
        key: "audience",
        label: "Kh\xE1ch h\xE0ng",
        complete: Boolean(counts.segment && counts.persona),
        detail: `${counts.segment} ph\xE2n kh\xFAc \xB7 ${counts.persona} persona`
      },
      {
        key: "claims",
        label: "Claims & Proof",
        complete: Boolean(counts.approvedClaims),
        detail: `${counts.approvedClaims} claim \u0111\xE3 duy\u1EC7t`
      },
      {
        key: "market",
        label: "Th\u1ECB tr\u01B0\u1EDDng & \u0110\u1ED1i th\u1EE7",
        complete: Boolean(counts.competitor || profile?.marketContext),
        detail: profile?.marketContext ? `C\xF3 market context \xB7 ${counts.competitor} \u0111\u1ED1i th\u1EE7` : `${counts.competitor} \u0111\u1ED1i th\u1EE7 \u0111ang theo d\xF5i`
      }
    ];
    const gapActions = {
      profile: "B\u1ED5 sung t\xF3m t\u1EAFt v\xE0 \u0111\u1ECBnh v\u1ECB th\u01B0\u01A1ng hi\u1EC7u.",
      identity: "Ho\xE0n thi\u1EC7n v\xE0 k\xEDch ho\u1EA1t Quy chu\u1EA9n nh\u1EADn di\u1EC7n.",
      voice: "Ho\xE0n thi\u1EC7n v\xE0 k\xEDch ho\u1EA1t Quy chu\u1EA9n gi\u1ECDng th\u01B0\u01A1ng hi\u1EC7u.",
      audience: "T\u1EA1o \xEDt nh\u1EA5t m\u1ED9t ph\xE2n kh\xFAc v\xE0 m\u1ED9t persona Active.",
      claims: "Duy\u1EC7t \xEDt nh\u1EA5t m\u1ED9t claim c\xF3 proof.",
      market: "B\u1ED5 sung b\u1ED1i c\u1EA3nh th\u1ECB tr\u01B0\u1EDDng ho\u1EB7c h\u1ED3 s\u01A1 \u0111\u1ED1i th\u1EE7."
    };
    const gaps = areas.filter((area) => !area.complete).map((area) => ({
      key: area.key,
      title: area.label,
      action: gapActions[area.key]
    }));
    const complete = new Set(areas.filter((area) => area.complete).map((area) => area.key));
    return {
      profile,
      readinessScore: Math.round(complete.size / areas.length * 100),
      areas,
      researchReady: ["profile", "audience", "market"].every((key) => complete.has(key)),
      publishingReady: ["profile", "identity", "voice", "claims"].every((key) => complete.has(key)),
      gaps,
      counts,
      assets
    };
  }
  createBrandContextSnapshot(input = {}, brandId = "default") {
    const profile = this.getBrandProfile(void 0, brandId);
    if (!profile) throw new Error("Create Brand Profile before generating context");
    const eligibleRecords = this.listBrandRecords({
      status: "active",
      limit: 500,
      brandId
    }).items;
    const eligibleClaims = this.listBrandClaims({
      status: "approved",
      limit: 500,
      brandId
    }).items;
    const gaps = [];
    const defaultRecords = [];
    for (const kind of brandRecordKinds) {
      const candidates = eligibleRecords.filter((record) => record.kind === kind);
      if (candidates.length === 1) defaultRecords.push(candidates[0]);
      else if (candidates.length > 1) gaps.push(`Ch\u1ECDn ${kind} ph\xF9 h\u1EE3p; kh\xF4ng t\u1EF1 tr\u1ED9n ${candidates.length} h\u1ED3 s\u01A1.`);
    }
    const selectedRecords = input.recordIds === void 0 ? defaultRecords : input.recordIds.map(
      (id2) => eligibleRecords.find((record) => record.id === id2) ?? (() => {
        throw new Error("Selected Brand Profile record is unavailable");
      })()
    );
    const selectedClaims = input.claimIds === void 0 ? eligibleClaims.length === 1 ? eligibleClaims : [] : input.claimIds.map(
      (id2) => eligibleClaims.find((claim) => claim.id === id2) ?? (() => {
        throw new Error("Selected Brand Claim is unavailable");
      })()
    );
    if (input.claimIds === void 0 && eligibleClaims.length > 1) gaps.push(`Ch\u1ECDn claim ph\xF9 h\u1EE3p; kh\xF4ng t\u1EF1 \u0111\u01B0a c\u1EA3 ${eligibleClaims.length} claim v\xE0o context.`);
    const allowedRecordIds = new Set(selectedRecords.map((record) => record.id));
    const identity = this.getActiveBrandGuideline("identity", brandId);
    const voice = this.getActiveBrandGuideline("voice", brandId);
    if (!identity) gaps.push("Ch\u01B0a c\xF3 Quy chu\u1EA9n nh\u1EADn di\u1EC7n Active.");
    if (!voice) gaps.push("Ch\u01B0a c\xF3 Quy chu\u1EA9n gi\u1ECDng th\u01B0\u01A1ng hi\u1EC7u Active.");
    const guidelineAssetIds = new Set(identity?.kind === "identity" ? [identity.logoAssetId, ...identity.visualAssetIds].filter(Boolean) : []);
    const currentAssets = this.listBrandAssets({ brandId });
    const allAssets = [...currentAssets, ...this.listBrandAssets({ archived: true, brandId })];
    const assets = allAssets.filter((asset) => guidelineAssetIds.has(asset.id) || !asset.archivedAt && asset.role === "product_media" && asset.recordId && allowedRecordIds.has(asset.recordId));
    const profilePayload = normalizeBrandProfileInput(profile);
    const guidelines = {};
    if (identity)
      guidelines.identity = {
        ...normalizeBrandGuidelineInput("identity", identity),
        revision: identity.revision
      };
    if (voice)
      guidelines.voice = {
        ...normalizeBrandGuidelineInput("voice", voice),
        revision: voice.revision
      };
    const snapshotPayload = {
      profile: {
        ...profilePayload,
        id: profile.id,
        revision: profile.currentRevision
      },
      records: selectedRecords.map((record) => ({
        ...normalizeBrandRecordInput(record),
        id: record.id,
        revision: record.revision,
        status: record.status
      })),
      claims: selectedClaims.map((claim) => ({
        ...normalizeBrandClaimInput(claim),
        id: claim.id,
        revision: claim.revision,
        status: claim.status
      })),
      guidelines,
      assets: assets.map(({ id: id2, role, recordId, filename, mimeType, sha256 }) => ({
        id: id2,
        role,
        recordId,
        filename,
        mimeType,
        sha256
      })),
      selection: {
        recordIds: selectedRecords.map((record) => record.id),
        claimIds: selectedClaims.map((claim) => claim.id)
      },
      gaps,
      manifest: {
        profile: { id: profile.id, revision: profile.currentRevision },
        records: selectedRecords.map((record) => ({
          id: record.id,
          revision: record.revision
        })),
        claims: selectedClaims.map((claim) => ({
          id: claim.id,
          revision: claim.revision
        })),
        guidelines: [identity, voice].filter((item) => Boolean(item)).map((item) => ({ kind: item.kind, revision: item.revision })),
        assets: assets.map((asset) => ({ id: asset.id, sha256: asset.sha256 }))
      }
    };
    const encoded = JSON.stringify(snapshotPayload);
    if (Buffer.byteLength(encoded, "utf8") > 5e5) throw new Error("Brand Context snapshot exceeds 500 KB; narrow the selected context");
    const id = createHash("sha256").update(encoded).digest("hex");
    const timestamp = now();
    this.db.prepare("INSERT OR IGNORE INTO brand_context_snapshots (id, payload_json, created_at) VALUES (?, ?, ?)").run(id, encoded, timestamp);
    return this.getBrandContextSnapshot(id);
  }
  getBrandContextSnapshot(id) {
    if (!/^[a-f0-9]{64}$/.test(id)) throw new Error("Brand Context snapshot ID is invalid");
    const row = this.db.prepare("SELECT payload_json, created_at FROM brand_context_snapshots WHERE id = ?").get(id);
    if (!row) return null;
    if (createHash("sha256").update(row.payload_json).digest("hex") !== id) throw new Error("Brand Context snapshot checksum does not match");
    return {
      id,
      createdAt: row.created_at,
      ...JSON.parse(row.payload_json)
    };
  }
};

// src/mini-apps/brand-profile/server/repository.ts
function createBrandProfileRepository(sdk) {
  return new BrandProfileStore(sdk.db);
}
function recordInput(record) {
  const { id: _id, status: _status, revision: _revision, currentRevision: _current, isHistorical: _historical, versions: _versions, createdAt: _created, updatedAt: _updated, archivedAt: _archived, ...input } = record;
  return input;
}
function offering(store, id) {
  const record = store.getBrandRecord(id);
  if (!record || record.kind !== "offering" || record.archivedAt) throw new Error("This product is not in Brand Profile's Products & Services");
  return record;
}
function anyProduct(store, id) {
  const record = store.getBrandRecord(id);
  if (!record || record.kind !== "offering") throw new Error("This product is not in Products & Services");
  return record;
}
function productMedia(store, id) {
  const asset = store.getBrandAssetData(id)?.asset;
  if (!asset || asset.role !== "product_media") throw new Error("Only product photos may be changed here");
  return asset;
}
function brandProducts(store) {
  return {
    list: (filter = {}) => store.listBrandRecords({ kind: "offering", query: filter.query ?? "", status: filter.status ?? "", archived: Boolean(filter.archived), limit: 500 }),
    get: (id, revision) => {
      const record = store.getBrandRecord(id, revision);
      return record && record.kind === "offering" ? record : null;
    },
    create: (input) => store.createBrandRecord({ ...input, kind: "offering" }),
    update: (id, input, revision) => {
      anyProduct(store, id);
      return store.updateBrandRecord(id, { ...input, kind: "offering" }, revision);
    },
    transition: (id, status, revision) => {
      anyProduct(store, id);
      return store.transitionBrandRecord(id, status, revision);
    },
    archive: (id, revision) => {
      anyProduct(store, id);
      return store.archiveBrandRecord(id, revision);
    },
    restore: (id, revision) => {
      anyProduct(store, id);
      return store.archiveBrandRecord(id, revision, true);
    },
    segments: () => store.listBrandRecords({ kind: "segment", status: "active", limit: 500 }).items,
    media: (filter = {}) => store.listBrandAssets({ role: "product_media", recordId: filter.recordId, archived: Boolean(filter.archived) }),
    uploadMedia: (recordId, filename, data) => {
      offering(store, recordId);
      return store.createBrandAsset({ role: "product_media", recordId, filename, data });
    },
    archiveMedia: (id) => {
      productMedia(store, id);
      return store.archiveBrandAsset(id);
    },
    restoreMedia: (id) => {
      productMedia(store, id);
      return store.archiveBrandAsset(id, true);
    }
  };
}
function brandProfileContext(store) {
  return {
    profile: () => store.getBrandProfile(),
    guideline: (kind) => store.getBrandGuideline(kind),
    assets: (filter) => store.listBrandAssets(filter),
    record: (id) => store.getBrandRecord(id),
    records: (filter) => store.listBrandRecords({ kind: filter?.kind, query: filter?.query, archived: filter?.archived, limit: 500 }).items,
    assetData: (id) => store.getBrandAssetData(id),
    createAsset: (input) => {
      if (input.role !== "personal_media" && input.role !== "product_media") throw new Error("Only personal_media and product_media assets may be stored by another mini-app");
      if (input.role === "product_media") offering(store, input.recordId);
      return store.createBrandAsset({ role: input.role, recordId: input.role === "product_media" ? input.recordId : null, filename: input.filename, data: input.data });
    },
    archiveAsset: (id) => {
      const asset = store.getBrandAssetData(id)?.asset;
      if (!asset || asset.role !== "product_media" && asset.role !== "personal_media") throw new Error("Only product_media and personal_media assets may be archived by another mini-app");
      return store.archiveBrandAsset(id);
    },
    createOffering: (input) => store.createBrandRecord({ kind: "offering", name: input.name, summary: input.summary ?? "", subtype: "", content: "", offeringStatus: "active", options: input.options ?? [] }),
    updateOffering: (id, input, revision) => {
      const current = offering(store, id);
      return store.updateBrandRecord(id, {
        ...recordInput(current),
        ...input.name === void 0 ? {} : { name: input.name },
        ...input.summary === void 0 ? {} : { summary: input.summary },
        ...input.options === void 0 ? {} : { options: input.options }
      }, revision);
    },
    archiveOffering: (id, revision) => {
      offering(store, id);
      return store.archiveBrandRecord(id, revision);
    },
    createContextSnapshot: (input) => store.createBrandContextSnapshot(input),
    contextSnapshot: (id) => store.getBrandContextSnapshot(id),
    products: brandProducts(store)
  };
}

// src/mini-apps/brand-profile/server/routes.ts
function createBrandProfileRouter(store, router) {
  const scopedBrandId = (request) => String(request.query.brandId ?? "default").trim() || "default";
  router.get("/api/brands", (request, response, next) => {
    try {
      response.json(store.listBrands({
        query: String(request.query.q ?? ""),
        type: String(request.query.type ?? ""),
        status: String(request.query.status ?? ""),
        archived: request.query.archived === "1",
        limit: Number(request.query.limit ?? 200)
      }));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brands", (request, response, next) => {
    try {
      response.status(201).json(store.createBrand(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brands/:id", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const brand = store.getBrand(request.params.id, revision);
      if (!brand) return response.status(404).json({ error: "Brand not found" });
      response.json(brand);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/brands/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateBrand(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brands/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionBrand(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brands/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveBrand(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brands/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveBrand(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-profile/overview", (_request, response, next) => {
    try {
      response.json(store.brandProfileOverview(scopedBrandId(_request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-profile", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      if (revision !== void 0 && (!Number.isInteger(revision) || revision < 1)) throw new Error("Brand Profile revision must be a positive integer");
      const profile = store.getBrandProfile(revision, scopedBrandId(request));
      if (!profile) return response.status(404).json({ error: "Brand Profile not found" });
      response.json(profile);
    } catch (error) {
      next(error);
    }
  });
  router.put("/api/brand-profile", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.saveBrandProfile(input, revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-guidelines/:kind", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const guideline = store.getBrandGuideline(request.params.kind, revision, scopedBrandId(request));
      if (!guideline) return response.status(404).json({ error: "Brand guideline not found" });
      response.json(guideline);
    } catch (error) {
      next(error);
    }
  });
  router.put("/api/brand-guidelines/:kind", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.saveBrandGuideline(request.params.kind, input, revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-guidelines/:kind/activate", (request, response, next) => {
    try {
      response.json(store.activateBrandGuideline(request.params.kind, request.body?.revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-guidelines/:kind/restore", (request, response, next) => {
    try {
      response.json(store.restoreBrandGuideline(request.params.kind, request.body?.sourceRevision, request.body?.revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-records", (request, response, next) => {
    try {
      response.json(
        store.listBrandRecords({
          query: String(request.query.q ?? ""),
          kind: String(request.query.kind ?? ""),
          status: String(request.query.status ?? ""),
          archived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 200),
          brandId: scopedBrandId(request)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records", (request, response, next) => {
    try {
      response.status(201).json(store.createBrandRecord(request.body ?? {}, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-records/:id", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const record = store.getBrandRecord(request.params.id, revision, scopedBrandId(request));
      if (!record) return response.status(404).json({ error: "Brand Profile record not found" });
      response.json(record);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/brand-records/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateBrandRecord(request.params.id, input, revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionBrandRecord(request.params.id, request.body?.status, request.body?.revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveBrandRecord(request.params.id, request.body?.revision, false, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveBrandRecord(request.params.id, request.body?.revision, true, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-claims", (request, response, next) => {
    try {
      response.json(
        store.listBrandClaims({
          query: String(request.query.q ?? ""),
          status: String(request.query.status ?? ""),
          archived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 200),
          brandId: scopedBrandId(request)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims", (request, response, next) => {
    try {
      response.status(201).json(store.createBrandClaim(request.body ?? {}, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-claims/:id", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const claim = store.getBrandClaim(request.params.id, revision, scopedBrandId(request));
      if (!claim) return response.status(404).json({ error: "Brand Claim not found" });
      response.json(claim);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/brand-claims/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateBrandClaim(request.params.id, input, revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionBrandClaim(request.params.id, request.body?.status, request.body?.revision, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveBrandClaim(request.params.id, request.body?.revision, false, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveBrandClaim(request.params.id, request.body?.revision, true, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-assets", (request, response, next) => {
    try {
      response.json(
        store.listBrandAssets({
          role: request.query.role ? String(request.query.role) : void 0,
          recordId: request.query.recordId ? String(request.query.recordId) : void 0,
          archived: request.query.archived === "1",
          brandId: scopedBrandId(request)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-assets", (request, response, next) => {
    try {
      const dataBase64 = String(request.body?.dataBase64 ?? "");
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(dataBase64)) throw new Error("Brand asset data must be valid Base64");
      response.status(201).json(
        store.createBrandAsset({
          role: request.body?.role,
          recordId: request.body?.recordId,
          filename: String(request.body?.filename ?? ""),
          data: Buffer.from(dataBase64, "base64")
        }, scopedBrandId(request))
      );
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-assets/:id/file", (request, response, next) => {
    try {
      const result = store.getBrandAssetData(request.params.id);
      if (!result) return response.status(404).json({ error: "Brand asset not found" });
      response.set("content-type", result.asset.mimeType).set("cache-control", "private, max-age=3600").send(Buffer.from(result.data));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-assets/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveBrandAsset(request.params.id));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-assets/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveBrandAsset(request.params.id, true));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-context-snapshots", (request, response, next) => {
    try {
      response.status(201).json(store.createBrandContextSnapshot(request.body ?? {}, scopedBrandId(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-context-snapshots/:id", (request, response, next) => {
    try {
      const snapshot = store.getBrandContextSnapshot(request.params.id);
      if (!snapshot) return response.status(404).json({ error: "Brand Context snapshot not found" });
      response.json(snapshot);
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/brand-profile/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createBrandProfileRepository(sdk);
    return {
      router: createBrandProfileRouter(repository, sdk.router()),
      exports: { "brand-profile.context": brandProfileContext(repository) }
    };
  }
});
export {
  index_default as default
};
