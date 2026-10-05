import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/research/manifest.ts
var manifest = {
  id: "research",
  version: "1.1.0",
  requiresCore: ">=1.8.0 <2"
};

// src/mini-apps/research/release-notes.json
var release_notes_default = [
  {
    version: "1.1.0",
    vi: "Research Studio gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Research Studio is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/research/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS research_runs (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL UNIQUE REFERENCES tasks(id),
        title TEXT NOT NULL,
        objective TEXT NOT NULL,
        domain TEXT NOT NULL CHECK (domain IN ('market', 'competitor')),
        intent TEXT NOT NULL DEFAULT 'market',
        mode TEXT NOT NULL DEFAULT 'deep_research',
        monitor_id TEXT,
        lenses_json TEXT NOT NULL DEFAULT '[]',
        coverage_mode TEXT NOT NULL DEFAULT 'search_first',
        brand_context_snapshot_id TEXT,
        baseline_run_id TEXT,
        target TEXT NOT NULL,
        questions_json TEXT NOT NULL DEFAULT '[]',
        source_urls_json TEXT NOT NULL DEFAULT '[]',
        connection_ids_json TEXT NOT NULL DEFAULT '[]',
        profile_ids_json TEXT NOT NULL DEFAULT '[]',
        profile_snapshots_json TEXT NOT NULL DEFAULT '[]',
        lookback_days INTEGER NOT NULL,
        max_sources INTEGER NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
        coverage_json TEXT NOT NULL DEFAULT '{"summary":"","gaps":[],"channels":[]}',
        last_error TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        started_at TEXT,
        completed_at TEXT,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS research_runs_status_idx ON research_runs(archived_at, status, created_at DESC);
      CREATE TABLE IF NOT EXISTS research_monitors (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        objective TEXT NOT NULL,
        intent TEXT NOT NULL,
        target TEXT NOT NULL,
        questions_json TEXT NOT NULL DEFAULT '[]',
        source_urls_json TEXT NOT NULL DEFAULT '[]',
        connection_ids_json TEXT NOT NULL DEFAULT '[]',
        profile_ids_json TEXT NOT NULL DEFAULT '[]',
        lenses_json TEXT NOT NULL DEFAULT '[]',
        coverage_mode TEXT NOT NULL DEFAULT 'search_first',
        lookback_days INTEGER NOT NULL,
        max_sources INTEGER NOT NULL,
        cadence TEXT NOT NULL CHECK (cadence IN ('daily', 'weekly')),
        weekday INTEGER NOT NULL DEFAULT 1,
        local_time TEXT NOT NULL,
        timezone TEXT NOT NULL,
        change_threshold TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'paused')),
        last_run_at TEXT,
        next_run_at TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS research_monitors_due_idx ON research_monitors(archived_at, status, next_run_at);
      CREATE TABLE IF NOT EXISTS research_profiles (
        id TEXT PRIMARY KEY,
        intent TEXT NOT NULL CHECK (intent IN ('market', 'competitor', 'customer_voice', 'industry')),
        name TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        origin TEXT NOT NULL CHECK (origin IN ('manual', 'brand_profile')),
        source_brand_record_id TEXT,
        source_brand_record_revision INTEGER,
        source_brand_record_name TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS research_profiles_intent_idx ON research_profiles(intent, archived_at, updated_at DESC);
      CREATE TABLE IF NOT EXISTS research_sources (
        id TEXT PRIMARY KEY,
        canonical_url TEXT NOT NULL UNIQUE,
        source_type TEXT NOT NULL,
        title TEXT NOT NULL,
        publisher TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS research_snapshots (
        id TEXT PRIMARY KEY,
        source_id TEXT NOT NULL REFERENCES research_sources(id),
        content_type TEXT NOT NULL CHECK (content_type IN ('article', 'post', 'video', 'other')),
        platform TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT '',
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        body TEXT NOT NULL,
        published_at TEXT,
        captured_at TEXT NOT NULL,
        content_hash TEXT NOT NULL,
        metadata_json TEXT NOT NULL DEFAULT '{}',
        UNIQUE(source_id, content_hash)
      );
      CREATE INDEX IF NOT EXISTS research_snapshots_source_idx ON research_snapshots(source_id, captured_at DESC);
      CREATE TABLE IF NOT EXISTS research_run_snapshots (
        run_id TEXT NOT NULL REFERENCES research_runs(id),
        snapshot_id TEXT NOT NULL REFERENCES research_snapshots(id),
        PRIMARY KEY(run_id, snapshot_id)
      );
      CREATE TABLE IF NOT EXISTS research_items (
        id TEXT PRIMARY KEY,
        run_id TEXT NOT NULL REFERENCES research_runs(id),
        item_key TEXT NOT NULL,
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'entity_profile', 'topic_profile', 'trend_signal', 'insight', 'coverage_gap', 'customer_signal')),
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        confidence TEXT NOT NULL CHECK (confidence IN ('unknown', 'low', 'medium', 'high')),
        evidence_status TEXT NOT NULL CHECK (evidence_status IN ('observed', 'inferred', 'hypothesis', 'unknown')),
        observed_at TEXT NOT NULL,
        metadata_json TEXT NOT NULL DEFAULT '{}',
        created_at TEXT NOT NULL,
        archived_at TEXT,
        UNIQUE(run_id, item_key)
      );
      CREATE INDEX IF NOT EXISTS research_items_run_idx ON research_items(run_id, kind, archived_at);
      CREATE TABLE IF NOT EXISTS research_item_evidence (
        item_id TEXT NOT NULL REFERENCES research_items(id),
        snapshot_id TEXT NOT NULL REFERENCES research_snapshots(id),
        source_span TEXT NOT NULL DEFAULT '',
        content_hash TEXT NOT NULL,
        PRIMARY KEY(item_id, snapshot_id)
      );
      CREATE TABLE IF NOT EXISTS research_item_support (
        item_id TEXT NOT NULL REFERENCES research_items(id),
        support_item_id TEXT NOT NULL REFERENCES research_items(id),
        PRIMARY KEY(item_id, support_item_id),
        CHECK(item_id != support_item_id)
      );
      CREATE TABLE IF NOT EXISTS research_item_states (
        item_id TEXT PRIMARY KEY REFERENCES research_items(id),
        state TEXT NOT NULL CHECK (state IN ('new', 'reviewed', 'selected', 'used', 'supported', 'rejected', 'stale')),
        state_reason TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS research_notes (
        id TEXT PRIMARY KEY,
        item_id TEXT NOT NULL REFERENCES research_items(id),
        body TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS research_item_usage (
        id TEXT PRIMARY KEY,
        item_id TEXT NOT NULL REFERENCES research_items(id),
        consumer_type TEXT NOT NULL,
        consumer_id TEXT NOT NULL,
        consumer_revision INTEGER NOT NULL,
        usage_type TEXT NOT NULL CHECK (usage_type IN ('inspiration', 'evidence', 'hypothesis', 'counter_signal')),
        created_at TEXT NOT NULL,
        UNIQUE(item_id, consumer_type, consumer_id, consumer_revision, usage_type)
      );
      CREATE INDEX IF NOT EXISTS research_usage_consumer_idx ON research_item_usage(consumer_type, consumer_id, consumer_revision);
    `);
    migrateResearchStudioSchema(db);
  }
};
function migrateResearchStudioSchema(db) {
  const columns = new Set(
    db.prepare("PRAGMA table_info(research_runs)").all().map((column) => column.name)
  );
  const additions = [
    ["intent", "TEXT NOT NULL DEFAULT 'market'"],
    ["mode", "TEXT NOT NULL DEFAULT 'deep_research'"],
    ["monitor_id", "TEXT"],
    ["lenses_json", "TEXT NOT NULL DEFAULT '[]'"],
    ["coverage_mode", "TEXT NOT NULL DEFAULT 'search_first'"],
    ["brand_context_snapshot_id", "TEXT"],
    ["baseline_run_id", "TEXT"],
    ["profile_ids_json", "TEXT NOT NULL DEFAULT '[]'"],
    ["profile_snapshots_json", "TEXT NOT NULL DEFAULT '[]'"]
  ];
  for (const [name, definition] of additions) if (!columns.has(name)) db.exec(`ALTER TABLE research_runs ADD COLUMN ${name} ${definition}`);
  const monitorColumns = new Set(
    db.prepare("PRAGMA table_info(research_monitors)").all().map((column) => column.name)
  );
  if (!monitorColumns.has("profile_ids_json")) db.exec("ALTER TABLE research_monitors ADD COLUMN profile_ids_json TEXT NOT NULL DEFAULT '[]'");
  const researchItemsTable = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'research_items'").get();
  if (researchItemsTable?.sql && !researchItemsTable.sql.includes("'customer_signal'")) {
    db.exec("PRAGMA foreign_keys = OFF; BEGIN IMMEDIATE;");
    try {
      db.exec(`
        CREATE TABLE research_items_next (
          id TEXT PRIMARY KEY,
          run_id TEXT NOT NULL REFERENCES research_runs(id),
          item_key TEXT NOT NULL,
          kind TEXT NOT NULL CHECK (kind IN ('observation', 'entity_profile', 'topic_profile', 'trend_signal', 'insight', 'coverage_gap', 'customer_signal')),
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          confidence TEXT NOT NULL CHECK (confidence IN ('unknown', 'low', 'medium', 'high')),
          evidence_status TEXT NOT NULL CHECK (evidence_status IN ('observed', 'inferred', 'hypothesis', 'unknown')),
          observed_at TEXT NOT NULL,
          metadata_json TEXT NOT NULL DEFAULT '{}',
          created_at TEXT NOT NULL,
          archived_at TEXT,
          UNIQUE(run_id, item_key)
        );
        INSERT INTO research_items_next SELECT * FROM research_items;
        DROP TABLE research_items;
        ALTER TABLE research_items_next RENAME TO research_items;
        CREATE INDEX research_items_run_idx ON research_items(run_id, kind, archived_at);
      `);
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    } finally {
      db.exec("PRAGMA foreign_keys = ON");
    }
  }
  db.exec("UPDATE research_runs SET intent = domain WHERE intent = 'market' AND domain = 'competitor'");
}

// src/mini-apps/research/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/research/server/store.ts
import { createHash, randomUUID } from "node:crypto";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
function boundedText(value, field, limit, required = false) {
  if (value !== void 0 && typeof value !== "string") throw new Error(`${field} must be text`);
  const normalized = String(value ?? "").trim();
  if (normalized.length > limit) throw new Error(`${field} exceeds ${limit} characters`);
  if (required && !normalized) throw new Error(`${field} is required`);
  return normalized;
}
function boundedStringList(value, field, limit, itemLimit) {
  if (!Array.isArray(value) || value.length > limit) throw new Error(`${field} must be a list with at most ${limit} entries`);
  const normalized = value.map((item) => boundedText(item, field, itemLimit, true));
  return [...new Set(normalized)];
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
var researchDomains = /* @__PURE__ */ new Set(["market", "competitor", "customer_voice", "industry"]);
var researchLenses = /* @__PURE__ */ new Set(["market", "customer", "competitor", "content", "opportunity", "risk", "benchmark", "evidence_gap"]);
var researchCoverageModes = /* @__PURE__ */ new Set(["search_first", "public_social", "connected"]);
var researchConnectionProviders = /* @__PURE__ */ new Set(["composio-app", "scrape-creators", "browser-session"]);
var researchComposioToolkits = /* @__PURE__ */ new Set(["facebook", "linkedin", "metaads", "instagram", "tiktok", "youtube", "reddit", "twitter", "x"]);
var researchItemKinds = /* @__PURE__ */ new Set(["observation", "entity_profile", "topic_profile", "trend_signal", "insight", "coverage_gap", "customer_signal"]);
var researchEngagementFields = /* @__PURE__ */ new Set(["impressions", "reach", "reactions", "likes", "comments", "shares", "views", "saves", "clicks", "leads"]);
var researchItemKindsByDomain = {
  market: /* @__PURE__ */ new Set(["observation", "topic_profile", "trend_signal", "insight", "coverage_gap"]),
  competitor: /* @__PURE__ */ new Set(["observation", "entity_profile", "topic_profile", "insight", "coverage_gap"]),
  industry: /* @__PURE__ */ new Set(["observation", "topic_profile", "trend_signal", "insight", "coverage_gap"]),
  customer_voice: /* @__PURE__ */ new Set(["observation", "customer_signal", "coverage_gap"])
};
var researchItemStates = /* @__PURE__ */ new Set(["new", "reviewed", "selected", "used", "supported", "rejected", "stale"]);
var researchConfidences = /* @__PURE__ */ new Set(["unknown", "low", "medium", "high"]);
var researchEvidenceStatuses = /* @__PURE__ */ new Set(["observed", "inferred", "hypothesis", "unknown"]);
var researchContentTypes = /* @__PURE__ */ new Set(["article", "post", "video", "other"]);
function isActiveResearchConnection(connection) {
  return Boolean(connection && connection.kind === "source" && connection.status === "active" && researchConnectionProviders.has(connection.provider) && (connection.provider !== "composio-app" || researchComposioToolkits.has(connection.scope.toolkitSlug?.toLowerCase() ?? "")));
}
function normalizeResearchBrief(input) {
  if (!researchDomains.has(input.domain)) throw new Error("Research intent is unsupported");
  const sourceUrls = boundedStringList(input.sourceUrls ?? [], "Research source URL", 30, 2e3).map((value) => publicUrl(value, "Research source URL"));
  const lookbackDays = Number(input.lookbackDays ?? 30);
  const maxSources = Number(input.maxSources ?? 12);
  if (!Number.isInteger(lookbackDays) || lookbackDays < 1 || lookbackDays > 365) throw new Error("Research lookback must be between 1 and 365 days");
  if (!Number.isInteger(maxSources) || maxSources < 3 || maxSources > 50) throw new Error("Research source limit must be between 3 and 50");
  return {
    title: boundedText(input.title, "Research title", 220, true),
    objective: boundedText(input.objective, "Research objective", 4e3, true),
    domain: input.domain,
    target: boundedText(input.target, "Research target", 500, true),
    questions: boundedStringList(input.questions ?? [], "Research question", 12, 1e3),
    sourceUrls,
    connectionIds: boundedStringList(input.connectionIds ?? [], "Research connection ID", 20, 100),
    profileIds: boundedStringList(input.profileIds ?? [], "Research profile ID", 30, 100),
    lookbackDays,
    maxSources,
    lenses: boundedStringList(input.lenses ?? [], "Research lens", 8, 80).map((value) => {
      if (!researchLenses.has(value)) throw new Error("Research lens is unsupported");
      return value;
    }),
    coverageMode: researchCoverageModes.has(input.coverageMode) ? input.coverageMode : "search_first"
  };
}
function normalizeResearchProfile(input) {
  if (!researchDomains.has(input.domain)) throw new Error("Research profile intent is unsupported");
  const legacy = input;
  const providedScope = legacy.scope && typeof legacy.scope === "object" ? legacy.scope : {};
  const list = (field, fallback = []) => boundedStringList(providedScope[field] ?? fallback, `Research profile ${field}`, 80, 2e3);
  const channels = (field, fallback = []) => list(field, fallback).map((value) => value.includes("://") ? publicUrl(value, `Research profile ${field}`) : value);
  const base = {
    name: boundedText(input.name, "Research profile name", 220, true),
    summary: boundedText(input.summary, "Research profile summary", 4e3),
    primaryUrl: publicUrl(input.primaryUrl, "Research profile primary URL"),
    notes: boundedText(input.notes, "Research profile notes", 2e4)
  };
  if (input.domain === "market") {
    return {
      ...base,
      domain: "market",
      scope: {
        geographies: list("geographies", legacy.locations),
        languages: list("languages"),
        segments: list("segments", legacy.audiences),
        buyerRoles: list("buyerRoles"),
        categories: list("categories", legacy.offerings),
        useCases: list("useCases"),
        priceBands: list("priceBands"),
        searchTerms: list("searchTerms", legacy.keywords),
        demandSignals: list("demandSignals", legacy.watchTopics),
        priorityChannels: channels("priorityChannels", legacy.channels),
        exclusions: list("exclusions", legacy.exclusions)
      }
    };
  }
  if (input.domain === "competitor") {
    return {
      ...base,
      domain: "competitor",
      scope: {
        aliases: list("aliases", legacy.keywords),
        companyType: boundedText(providedScope.companyType, "Research profile company type", 300),
        headquarters: list("headquarters"),
        servedMarkets: list("servedMarkets", legacy.locations),
        customerSegments: list("customerSegments", legacy.audiences),
        offerings: list("offerings", legacy.offerings),
        pricingSignals: list("pricingSignals"),
        positioningClaims: list("positioningClaims"),
        comparisonCriteria: list("comparisonCriteria"),
        officialChannels: channels("officialChannels", legacy.channels),
        watchEvents: list("watchEvents", legacy.watchTopics),
        exclusions: list("exclusions", legacy.exclusions)
      }
    };
  }
  if (input.domain === "industry") {
    return {
      ...base,
      domain: "industry",
      scope: {
        geographies: list("geographies", legacy.locations),
        subIndustries: list("subIndustries", legacy.offerings),
        valueChainStages: list("valueChainStages"),
        companyTypes: list("companyTypes", legacy.audiences),
        technologies: list("technologies", legacy.keywords),
        regulations: list("regulations"),
        policyBodies: list("policyBodies"),
        economicIndicators: list("economicIndicators"),
        prioritySources: channels("prioritySources", legacy.channels),
        watchEvents: list("watchEvents", legacy.watchTopics),
        exclusions: list("exclusions", legacy.exclusions)
      }
    };
  }
  return {
    ...base,
    domain: "customer_voice",
    scope: {
      audiences: list("audiences", legacy.audiences),
      personas: list("personas"),
      geographies: list("geographies", legacy.locations),
      languages: list("languages"),
      communities: list("communities"),
      channels: channels("channels", legacy.channels),
      consentBoundary: boundedText(providedScope.consentBoundary, "Research profile consent boundary", 4e3),
      sensitiveTopics: list("sensitiveTopics"),
      exclusions: list("exclusions", legacy.exclusions)
    }
  };
}
function normalizeResearchMonitor(input) {
  const brief = normalizeResearchBrief(input);
  const cadence = input.cadence === "weekly" ? "weekly" : input.cadence === "daily" ? "daily" : null;
  if (!cadence) throw new Error("Research monitor cadence must be daily or weekly");
  const weekday = Number(input.weekday ?? 1);
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) throw new Error("Research monitor weekday must be between 0 and 6");
  const localTime = boundedText(input.localTime, "Research monitor time", 5, true);
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(localTime)) throw new Error("Research monitor time must use HH:MM");
  const timezone = boundedText(input.timezone || "Asia/Ho_Chi_Minh", "Research monitor timezone", 100, true);
  try {
    new Intl.DateTimeFormat("en", { timeZone: timezone }).format(/* @__PURE__ */ new Date());
  } catch {
    throw new Error("Research monitor timezone is invalid");
  }
  return {
    ...brief,
    cadence,
    weekday,
    localTime,
    timezone,
    changeThreshold: boundedText(input.changeThreshold, "Research change threshold", 2e3, true)
  };
}
function nextResearchMonitorAt(input, after = /* @__PURE__ */ new Date()) {
  const [hour, minute] = input.localTime.split(":").map(Number);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: input.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(after);
  const value = (type) => parts.find((part) => part.type === type)?.value ?? "";
  const local = /* @__PURE__ */ new Date(`${value("year")}-${value("month")}-${value("day")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
  const observedLocal = /* @__PURE__ */ new Date(`${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}:00`);
  const offset = after.getTime() - observedLocal.getTime();
  let candidate = new Date(local.getTime() + offset);
  if (input.cadence === "weekly") {
    const dayMap = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6
    };
    const currentWeekday = dayMap[value("weekday")] ?? after.getDay();
    let days = (input.weekday - currentWeekday + 7) % 7;
    candidate = new Date(candidate.getTime() + days * 864e5);
    if (candidate <= after) candidate = new Date(candidate.getTime() + 7 * 864e5);
  } else if (candidate <= after) candidate = new Date(candidate.getTime() + 864e5);
  return candidate.toISOString();
}
function isoTimestamp(value, field, nullable = false) {
  if ((value === null || value === void 0 || value === "") && nullable) return null;
  const normalized = boundedText(value, field, 60, true);
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.valueOf())) throw new Error(`${field} must be a valid date or timestamp`);
  return parsed.toISOString();
}
var ResearchStore = class {
  constructor(db, ports) {
    this.db = db;
    this.tasks = ports.tasks;
    this.connections = ports.connections;
    this.brand = ports.brand;
  }
  db;
  tasks;
  connections;
  brand;
  toResearchProfile(row) {
    const payload = normalizeResearchProfile(JSON.parse(row.payload_json));
    return {
      ...payload,
      id: row.id,
      origin: row.origin,
      sourceBrandRecordId: row.source_brand_record_id,
      sourceBrandRecordRevision: row.source_brand_record_revision === null ? null : Number(row.source_brand_record_revision),
      sourceBrandRecordName: row.source_brand_record_name,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  listResearchProfiles(input = {}) {
    const where = [input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
    if (input.domain) {
      if (!researchDomains.has(input.domain)) throw new Error("Unsupported research profile intent");
      where.push("intent = ?");
      values.push(input.domain);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      where.push("(name LIKE ? OR payload_json LIKE ?)");
      values.push(pattern, pattern);
    }
    const limit = Math.max(1, Math.min(500, Number(input.limit ?? 200)));
    const rows = this.db.prepare(`SELECT * FROM research_profiles WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    return {
      items: rows.map((row) => this.toResearchProfile(row)),
      total: rows.length
    };
  }
  getResearchProfile(id) {
    const row = this.db.prepare("SELECT * FROM research_profiles WHERE id = ?").get(id);
    return row ? this.toResearchProfile(row) : null;
  }
  createResearchProfile(input, provenance = {}) {
    const payload = normalizeResearchProfile(input);
    const id = randomUUID();
    const timestamp = now();
    this.db.prepare(
      `INSERT INTO research_profiles (id, intent, name, payload_json, origin, source_brand_record_id, source_brand_record_revision, source_brand_record_name, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(id, payload.domain, payload.name, JSON.stringify(payload), provenance.origin ?? "manual", provenance.sourceBrandRecordId ?? null, provenance.sourceBrandRecordRevision ?? null, provenance.sourceBrandRecordName ?? null, timestamp, timestamp);
    return this.getResearchProfile(id);
  }
  importResearchProfile(domain, brandRecordId) {
    if (!researchDomains.has(domain)) throw new Error("Unsupported research profile intent");
    const brand = this.brand();
    if (!brand) throw new Error("Brand Profile is not available; open Brand Profile to import from its records");
    const record = brand.record(brandRecordId);
    if (!record || record.archivedAt || record.status !== "active") throw new Error("Brand Profile source must be an active record");
    const allowed = {
      competitor: ["competitor"],
      market: ["segment"],
      customer_voice: ["segment", "persona"],
      industry: ["offering"]
    };
    if (!allowed[domain].includes(record.kind)) throw new Error("Brand Profile record is not compatible with this research intent");
    const duplicate = this.db.prepare("SELECT id FROM research_profiles WHERE intent = ? AND source_brand_record_id = ? AND source_brand_record_revision = ? AND archived_at IS NULL").get(domain, record.id, record.currentRevision);
    if (duplicate) throw new Error("This Brand Profile revision has already been imported");
    const officialChannels = [record.websiteUrl, record.facebookUrl, record.linkedinUrl, record.instagramUrl, record.tiktokUrl, record.youtubeUrl, record.zaloUrl].filter((value) => Boolean(value));
    const common = {
      name: record.name,
      summary: record.summary,
      primaryUrl: record.websiteUrl || record.url || "",
      notes: record.content
    };
    const input = domain === "competitor" ? {
      ...common,
      domain,
      scope: {
        aliases: [],
        companyType: record.subtype,
        headquarters: [],
        servedMarkets: [],
        customerSegments: [],
        offerings: [record.category || record.subtype].filter(Boolean),
        pricingSignals: record.options?.map((option) => [option.name, option.price].filter(Boolean).join(" \xB7 ")).filter(Boolean) ?? [],
        positioningClaims: [record.value].filter((value) => Boolean(value)),
        comparisonCriteria: [],
        officialChannels,
        watchEvents: [],
        exclusions: []
      }
    } : domain === "market" ? {
      ...common,
      domain,
      scope: {
        geographies: [],
        languages: [],
        segments: [record.name],
        buyerRoles: [record.subtype].filter(Boolean),
        categories: [],
        useCases: [record.summary].filter(Boolean),
        priceBands: [],
        searchTerms: [],
        demandSignals: [],
        priorityChannels: [],
        exclusions: []
      }
    } : domain === "industry" ? {
      ...common,
      domain,
      scope: {
        geographies: [],
        subIndustries: [record.category || record.subtype].filter(Boolean),
        valueChainStages: [record.fulfillment].filter((value) => Boolean(value)),
        companyTypes: [],
        technologies: [],
        regulations: [],
        policyBodies: [],
        economicIndicators: [],
        prioritySources: officialChannels,
        watchEvents: [],
        exclusions: []
      }
    } : {
      ...common,
      domain,
      scope: {
        audiences: [record.name],
        personas: record.kind === "persona" ? [record.name] : [],
        geographies: [],
        languages: [],
        communities: [],
        channels: officialChannels,
        consentBoundary: "",
        sensitiveTopics: [],
        exclusions: []
      }
    };
    return this.createResearchProfile(
      input,
      {
        origin: "brand_profile",
        sourceBrandRecordId: record.id,
        sourceBrandRecordRevision: record.currentRevision,
        sourceBrandRecordName: record.name
      }
    );
  }
  updateResearchProfile(id, input, expectedRevision) {
    const current = this.getResearchProfile(id);
    if (!current) throw new Error("Research profile not found");
    if (current.archivedAt) throw new Error("Restore this research profile before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Research profile changed since it was opened");
    const payload = normalizeResearchProfile(input);
    if (payload.domain !== current.domain) throw new Error("Research profile intent cannot change");
    const timestamp = now();
    const changed = this.db.prepare("UPDATE research_profiles SET name = ?, payload_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.name, JSON.stringify(payload), timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("Research profile changed since it was opened");
    return this.getResearchProfile(id);
  }
  archiveResearchProfile(id, expectedRevision, restore = false) {
    const current = this.getResearchProfile(id);
    if (!current) throw new Error("Research profile not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Research profile changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Research profile archive state changed since it was opened");
    const timestamp = now();
    const changed = this.db.prepare("UPDATE research_profiles SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("Research profile changed since it was opened");
    return this.getResearchProfile(id);
  }
  createResearchRun(input, options = {}) {
    const brief = normalizeResearchBrief(input);
    for (const connectionId of brief.connectionIds) {
      const connection = this.connections.getConnection(connectionId);
      if (!isActiveResearchConnection(connection)) throw new Error("Research connection must be an active supported source");
    }
    const profileSnapshots = this.activeResearchProfiles(brief.domain, brief.profileIds, Boolean(options.monitorId));
    const runId = randomUUID();
    const timestamp = now();
    const brand = this.brand();
    const brandContextSnapshotId = brand?.profile() ? brand.createContextSnapshot().id : null;
    const mode = options.monitorId ? "monitor" : "deep_research";
    const legacyDomain = brief.domain === "competitor" ? "competitor" : "market";
    const referenceId = `research-run:${runId}`;
    const source = {
      type: "research-run",
      referenceId,
      label: "Research Studio \xB7 Codex",
      evidence: brief.sourceUrls,
      affectedGroups: ["marketing"],
      researchRunId: runId,
      researchDomain: brief.domain,
      researchMonitorId: options.monitorId
    };
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const taskId = this.tasks.createTask({ title: `Nghi\xEAn c\u1EE9u \xB7 ${brief.title}`.slice(0, 180), description: brief.objective, priority: "medium", source }).id;
      this.db.prepare(
        `INSERT INTO research_runs (id, task_id, title, objective, domain, intent, mode, monitor_id, lenses_json, coverage_mode, brand_context_snapshot_id, baseline_run_id, target, questions_json, source_urls_json, connection_ids_json, profile_ids_json, profile_snapshots_json, lookback_days, max_sources, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'queued', ?)`
      ).run(runId, taskId, brief.title, brief.objective, legacyDomain, brief.domain, mode, options.monitorId ?? null, JSON.stringify(brief.lenses), brief.coverageMode, brandContextSnapshotId, options.baselineRunId ?? null, brief.target, JSON.stringify(brief.questions), JSON.stringify(brief.sourceUrls), JSON.stringify(brief.connectionIds), JSON.stringify(brief.profileIds), JSON.stringify(profileSnapshots), brief.lookbackDays, brief.maxSources, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getResearchRunSummary(runId);
  }
  researchRunRows(where = "", values = [], limit = 200) {
    return this.db.prepare(
      `SELECT r.*,
      (SELECT COUNT(DISTINCT sn.source_id) FROM research_run_snapshots s JOIN research_snapshots sn ON sn.id = s.snapshot_id WHERE s.run_id = r.id) AS source_count,
      (SELECT COUNT(*) FROM research_run_snapshots s WHERE s.run_id = r.id) AS snapshot_count,
      (SELECT COUNT(*) FROM research_items i WHERE i.run_id = r.id AND i.kind = 'observation' AND i.archived_at IS NULL) AS observation_count,
      (SELECT COUNT(*) FROM research_items i WHERE i.run_id = r.id AND i.kind NOT IN ('observation', 'coverage_gap') AND i.archived_at IS NULL) AS insight_count,
      (SELECT COUNT(*) FROM research_items i WHERE i.run_id = r.id AND i.kind = 'coverage_gap' AND i.archived_at IS NULL) AS gap_count
      FROM research_runs r ${where} ORDER BY CASE WHEN r.archived_at IS NULL THEN 0 ELSE 1 END, r.created_at DESC LIMIT ?`
    ).all(...values, limit);
  }
  toResearchRunSummary(row) {
    return {
      id: row.id,
      taskId: row.task_id,
      title: row.title,
      objective: row.objective,
      domain: row.intent ?? row.domain,
      target: row.target,
      questions: JSON.parse(row.questions_json),
      sourceUrls: JSON.parse(row.source_urls_json),
      connectionIds: JSON.parse(row.connection_ids_json),
      profileIds: JSON.parse(row.profile_ids_json || "[]"),
      profileSnapshots: JSON.parse(row.profile_snapshots_json || "[]"),
      lookbackDays: Number(row.lookback_days),
      maxSources: Number(row.max_sources),
      status: row.status,
      mode: row.mode ?? "deep_research",
      monitorId: row.monitor_id,
      lenses: JSON.parse(row.lenses_json || "[]"),
      coverageMode: row.coverage_mode ?? "search_first",
      brandContextSnapshotId: row.brand_context_snapshot_id,
      baselineRunId: row.baseline_run_id,
      coverage: JSON.parse(row.coverage_json),
      sourceCount: Number(row.source_count ?? 0),
      snapshotCount: Number(row.snapshot_count ?? 0),
      observationCount: Number(row.observation_count ?? 0),
      insightCount: Number(row.insight_count ?? 0),
      gapCount: Number(row.gap_count ?? 0),
      lastError: row.last_error,
      revision: Number(row.revision),
      createdAt: row.created_at,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      archivedAt: row.archived_at
    };
  }
  getResearchRunSummary(id) {
    const rows = this.researchRunRows("WHERE r.id = ?", [id], 1);
    return rows[0] ? this.toResearchRunSummary(rows[0]) : null;
  }
  listResearchRuns(input = {}) {
    const where = [input.archived ? "r.archived_at IS NOT NULL" : "r.archived_at IS NULL"];
    const values = [];
    const query = String(input.query ?? "").trim();
    if (query) {
      where.push("(r.title LIKE ? OR r.objective LIKE ? OR r.target LIKE ?)");
      const value = `%${query}%`;
      values.push(value, value, value);
    }
    if (input.domain) {
      if (!researchDomains.has(input.domain)) throw new Error("Unsupported research intent");
      where.push("r.intent = ?");
      values.push(input.domain);
    }
    if (input.status) {
      if (!["queued", "running", "completed", "failed"].includes(input.status)) throw new Error("Unsupported research status");
      where.push("r.status = ?");
      values.push(input.status);
    }
    const limit = Math.max(1, Math.min(500, Number(input.limit ?? 200)));
    const clause = `WHERE ${where.join(" AND ")}`;
    const total = Number(this.db.prepare(`SELECT COUNT(*) AS total FROM research_runs r ${clause}`).get(...values).total);
    return {
      items: this.researchRunRows(clause, values, limit).map((row) => this.toResearchRunSummary(row)),
      total
    };
  }
  getResearchRun(id) {
    const run = this.getResearchRunSummary(id);
    if (!run) return null;
    const task = this.tasks.getTask(run.taskId);
    if (!task) throw new Error("Research run task is missing");
    return {
      ...run,
      task,
      snapshots: this.listResearchSnapshots({ runId: id, limit: 500 }).items,
      items: this.listResearchItems({
        runId: id,
        includeArchived: true,
        limit: 1e3
      }).items
    };
  }
  updateResearchRunStatus(id, status, error = null) {
    const current = this.getResearchRunSummary(id);
    if (!current) throw new Error("Research run not found");
    if (current.archivedAt) throw new Error("Restore this research run first");
    if (current.status === "completed") throw new Error("Completed research evidence is immutable");
    const timestamp = now();
    this.db.prepare(`UPDATE research_runs SET status = ?, last_error = ?, started_at = COALESCE(started_at, ?), completed_at = ?, revision = revision + 1 WHERE id = ?`).run(status, error, timestamp, status === "failed" ? timestamp : null, id);
    return this.getResearchRunSummary(id);
  }
  archiveResearchRun(id, expectedRevision, restore = false) {
    const current = this.getResearchRunSummary(id);
    if (!current) throw new Error("Research run not found");
    if (current.revision !== expectedRevision) throw new Error("Research run changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Research run archive state changed since it was opened");
    const timestamp = now();
    const changed = this.db.prepare("UPDATE research_runs SET archived_at = ?, revision = revision + 1 WHERE id = ? AND revision = ?").run(restore ? null : timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("Research run changed since it was opened");
    return this.getResearchRunSummary(id);
  }
  researchSummary() {
    const value = (sql) => Number(this.db.prepare(sql).get().total);
    return {
      runs: value("SELECT COUNT(*) AS total FROM research_runs WHERE archived_at IS NULL"),
      running: value("SELECT COUNT(*) AS total FROM research_runs WHERE archived_at IS NULL AND status IN ('queued','running')"),
      sources: value("SELECT COUNT(*) AS total FROM research_sources"),
      snapshots: value("SELECT COUNT(*) AS total FROM research_snapshots"),
      insights: value("SELECT COUNT(*) AS total FROM research_items WHERE archived_at IS NULL AND kind NOT IN ('observation', 'coverage_gap')"),
      needsReview: value("SELECT COUNT(*) AS total FROM research_items i JOIN research_item_states s ON s.item_id = i.id WHERE i.archived_at IS NULL AND s.state = 'new'"),
      coverageGaps: value("SELECT COUNT(*) AS total FROM research_items WHERE archived_at IS NULL AND kind = 'coverage_gap'"),
      monitors: value("SELECT COUNT(*) AS total FROM research_monitors WHERE archived_at IS NULL"),
      activeMonitors: value("SELECT COUNT(*) AS total FROM research_monitors WHERE archived_at IS NULL AND status = 'active'"),
      newSignals: value("SELECT COUNT(*) AS total FROM research_items i JOIN research_runs r ON r.id = i.run_id JOIN research_item_states s ON s.item_id = i.id WHERE i.archived_at IS NULL AND r.archived_at IS NULL AND r.mode = 'monitor' AND i.kind IN ('observation', 'trend_signal', 'customer_signal') AND s.state = 'new'")
    };
  }
  toResearchMonitor(row) {
    return {
      id: row.id,
      title: row.title,
      objective: row.objective,
      domain: row.intent,
      target: row.target,
      questions: JSON.parse(row.questions_json),
      sourceUrls: JSON.parse(row.source_urls_json),
      connectionIds: JSON.parse(row.connection_ids_json),
      profileIds: JSON.parse(row.profile_ids_json || "[]"),
      lenses: JSON.parse(row.lenses_json),
      coverageMode: row.coverage_mode,
      lookbackDays: Number(row.lookback_days),
      maxSources: Number(row.max_sources),
      cadence: row.cadence,
      weekday: Number(row.weekday),
      localTime: row.local_time,
      timezone: row.timezone,
      changeThreshold: row.change_threshold,
      status: row.status,
      runCount: Number(row.run_count ?? 0),
      lastRunAt: row.last_run_at,
      nextRunAt: row.next_run_at,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  researchMonitorRows(where = "", values = [], limit = 200) {
    return this.db.prepare(
      `SELECT m.*, (SELECT COUNT(*) FROM research_runs r WHERE r.monitor_id = m.id) AS run_count
      FROM research_monitors m ${where}
      ORDER BY CASE WHEN m.archived_at IS NULL THEN 0 ELSE 1 END, CASE WHEN m.status = 'active' THEN 0 ELSE 1 END, m.updated_at DESC LIMIT ?`
    ).all(...values, limit);
  }
  listResearchMonitors(input = {}) {
    const where = [input.archived ? "m.archived_at IS NOT NULL" : "m.archived_at IS NULL"];
    const values = [];
    const query = String(input.query ?? "").trim();
    if (query) {
      where.push("(m.title LIKE ? OR m.objective LIKE ? OR m.target LIKE ?)");
      const value = `%${query}%`;
      values.push(value, value, value);
    }
    if (input.status) {
      if (!["active", "paused"].includes(input.status)) throw new Error("Unsupported research monitor status");
      where.push("m.status = ?");
      values.push(input.status);
    }
    const limit = Math.max(1, Math.min(500, Number(input.limit ?? 200)));
    const clause = `WHERE ${where.join(" AND ")}`;
    const total = Number(this.db.prepare(`SELECT COUNT(*) AS total FROM research_monitors m ${clause}`).get(...values).total);
    return {
      items: this.researchMonitorRows(clause, values, limit).map((row) => this.toResearchMonitor(row)),
      total
    };
  }
  getResearchMonitor(id) {
    const row = this.researchMonitorRows("WHERE m.id = ?", [id], 1)[0];
    return row ? this.toResearchMonitor(row) : null;
  }
  createResearchMonitor(input) {
    const monitor = normalizeResearchMonitor(input);
    for (const connectionId of monitor.connectionIds) {
      const connection = this.connections.getConnection(connectionId);
      if (!isActiveResearchConnection(connection)) throw new Error("Research connection must be an active supported source");
    }
    this.activeResearchProfiles(monitor.domain, monitor.profileIds);
    const id = randomUUID();
    const timestamp = now();
    const nextRunAt = nextResearchMonitorAt(monitor, new Date(timestamp));
    this.db.prepare(
      `INSERT INTO research_monitors (id, title, objective, intent, target, questions_json, source_urls_json, connection_ids_json, profile_ids_json, lenses_json, coverage_mode, lookback_days, max_sources, cadence, weekday, local_time, timezone, change_threshold, status, next_run_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)`
    ).run(id, monitor.title, monitor.objective, monitor.domain, monitor.target, JSON.stringify(monitor.questions), JSON.stringify(monitor.sourceUrls), JSON.stringify(monitor.connectionIds), JSON.stringify(monitor.profileIds), JSON.stringify(monitor.lenses), monitor.coverageMode, monitor.lookbackDays, monitor.maxSources, monitor.cadence, monitor.weekday, monitor.localTime, monitor.timezone, monitor.changeThreshold, nextRunAt, timestamp, timestamp);
    return this.getResearchMonitor(id);
  }
  updateResearchMonitor(id, input, expectedRevision) {
    const current = this.getResearchMonitor(id);
    if (!current) throw new Error("Research monitor not found");
    if (current.archivedAt) throw new Error("Restore this research monitor first");
    if (current.revision !== expectedRevision) throw new Error("Research monitor changed since it was opened");
    const monitor = normalizeResearchMonitor({ ...current, ...input });
    for (const connectionId of monitor.connectionIds) {
      const connection = this.connections.getConnection(connectionId);
      if (!isActiveResearchConnection(connection)) throw new Error("Research connection must be an active supported source");
    }
    this.activeResearchProfiles(monitor.domain, monitor.profileIds);
    const timestamp = now();
    const nextRunAt = current.status === "active" ? nextResearchMonitorAt(monitor, new Date(timestamp)) : null;
    const changed = this.db.prepare(`UPDATE research_monitors SET title = ?, objective = ?, intent = ?, target = ?, questions_json = ?, source_urls_json = ?, connection_ids_json = ?, profile_ids_json = ?, lenses_json = ?, coverage_mode = ?, lookback_days = ?, max_sources = ?, cadence = ?, weekday = ?, local_time = ?, timezone = ?, change_threshold = ?, next_run_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?`).run(monitor.title, monitor.objective, monitor.domain, monitor.target, JSON.stringify(monitor.questions), JSON.stringify(monitor.sourceUrls), JSON.stringify(monitor.connectionIds), JSON.stringify(monitor.profileIds), JSON.stringify(monitor.lenses), monitor.coverageMode, monitor.lookbackDays, monitor.maxSources, monitor.cadence, monitor.weekday, monitor.localTime, monitor.timezone, monitor.changeThreshold, nextRunAt, timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("Research monitor changed since it was opened");
    return this.getResearchMonitor(id);
  }
  activeResearchProfiles(domain, profileIds, required = true) {
    if (!profileIds.length) {
      if (required) throw new Error("Recurring research requires at least one active scope or profile for the selected intent");
      return [];
    }
    return profileIds.map((profileId) => {
      const profile = this.getResearchProfile(profileId);
      if (!profile || profile.archivedAt || profile.domain !== domain) throw new Error("Research profile must be active and match the selected intent");
      return profile;
    });
  }
  transitionResearchMonitor(id, status, expectedRevision) {
    if (!["active", "paused"].includes(status)) throw new Error("Unsupported research monitor status");
    const current = this.getResearchMonitor(id);
    if (!current) throw new Error("Research monitor not found");
    if (current.archivedAt) throw new Error("Restore this research monitor first");
    if (current.revision !== expectedRevision) throw new Error("Research monitor changed since it was opened");
    const nextRunAt = status === "active" ? nextResearchMonitorAt(current) : null;
    const changed = this.db.prepare("UPDATE research_monitors SET status = ?, next_run_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(status, nextRunAt, now(), id, expectedRevision);
    if (!changed.changes) throw new Error("Research monitor changed since it was opened");
    return this.getResearchMonitor(id);
  }
  archiveResearchMonitor(id, expectedRevision, restore = false) {
    const current = this.getResearchMonitor(id);
    if (!current) throw new Error("Research monitor not found");
    if (current.revision !== expectedRevision) throw new Error("Research monitor changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Research monitor archive state changed since it was opened");
    const timestamp = now();
    const changed = this.db.prepare("UPDATE research_monitors SET archived_at = ?, status = ?, next_run_at = NULL, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, "paused", timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("Research monitor changed since it was opened");
    return this.getResearchMonitor(id);
  }
  listDueResearchMonitors(at = now()) {
    return this.researchMonitorRows("WHERE m.archived_at IS NULL AND m.status = 'active' AND m.next_run_at IS NOT NULL AND m.next_run_at <= ?", [at], 100).map((row) => this.toResearchMonitor(row));
  }
  recordResearchMonitorRun(id) {
    const current = this.getResearchMonitor(id);
    if (!current) throw new Error("Research monitor not found");
    if (current.archivedAt) throw new Error("Restore this research monitor first");
    const timestamp = now();
    const nextRunAt = current.status === "active" ? nextResearchMonitorAt(current, new Date(timestamp)) : null;
    this.db.prepare("UPDATE research_monitors SET last_run_at = ?, next_run_at = ?, revision = revision + 1, updated_at = ? WHERE id = ?").run(timestamp, nextRunAt, timestamp, id);
    return this.getResearchMonitor(id);
  }
  latestResearchMonitorRun(id) {
    const row = this.researchRunRows("WHERE r.monitor_id = ? AND r.status = 'completed' AND r.archived_at IS NULL", [id], 1)[0];
    return row ? this.toResearchRunSummary(row) : null;
  }
  listResearchSources(input = {}) {
    const query = String(input.query ?? "").trim();
    const where = [];
    const values = [];
    if (input.domain) {
      if (!researchDomains.has(input.domain)) throw new Error("Unsupported research intent");
      where.push("r.intent = ?");
      values.push(input.domain);
    }
    if (query) {
      where.push("(s.title LIKE ? OR s.publisher LIKE ? OR s.canonical_url LIKE ?)");
      const value = `%${query}%`;
      values.push(value, value, value);
    }
    const joins = input.domain ? "JOIN research_snapshots sn ON sn.source_id = s.id JOIN research_run_snapshots rs ON rs.snapshot_id = sn.id JOIN research_runs r ON r.id = rs.run_id" : "LEFT JOIN research_snapshots sn ON sn.source_id = s.id";
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const limit = Math.max(1, Math.min(500, Number(input.limit ?? 200)));
    const rows = this.db.prepare(`SELECT s.*, COUNT(DISTINCT sn.id) AS snapshot_count, MAX(sn.captured_at) AS latest_captured_at FROM research_sources s ${joins} ${clause} GROUP BY s.id ORDER BY latest_captured_at DESC, s.created_at DESC LIMIT ?`).all(...values, limit);
    const total = Number(this.db.prepare(`SELECT COUNT(DISTINCT s.id) AS total FROM research_sources s ${joins} ${clause}`).get(...values).total);
    return {
      items: rows.map((row) => ({
        id: row.id,
        canonicalUrl: row.canonical_url,
        sourceType: row.source_type,
        title: row.title,
        publisher: row.publisher,
        createdAt: row.created_at,
        snapshotCount: Number(row.snapshot_count ?? 0),
        latestCapturedAt: row.latest_captured_at ?? null
      })),
      total
    };
  }
  listResearchSnapshots(input = {}) {
    const where = [];
    const values = [];
    if (input.runId) {
      where.push("rs.run_id = ?");
      values.push(input.runId);
    }
    if (input.sourceId) {
      where.push("sn.source_id = ?");
      values.push(input.sourceId);
    }
    if (input.domain) {
      if (!researchDomains.has(input.domain)) throw new Error("Unsupported research intent");
      where.push("r.intent = ?");
      values.push(input.domain);
    }
    if (input.contentType) {
      if (!["article", "post", "video", "other"].includes(input.contentType)) throw new Error("Unsupported research content type");
      where.push("sn.content_type = ?");
      values.push(input.contentType);
    }
    const query = String(input.query ?? "").trim();
    if (query) {
      where.push("(sn.title LIKE ? OR sn.excerpt LIKE ? OR sn.author LIKE ? OR s.title LIKE ? OR s.publisher LIKE ?)");
      const value = `%${query}%`;
      values.push(value, value, value, value, value);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const limit = Math.max(1, Math.min(1e3, Number(input.limit ?? 200)));
    const joins = "JOIN research_sources s ON s.id = sn.source_id JOIN research_run_snapshots rs ON rs.snapshot_id = sn.id JOIN research_runs r ON r.id = rs.run_id";
    const rows = this.db.prepare(`SELECT sn.*, s.title AS source_title, s.canonical_url, MIN(rs.run_id) AS run_id FROM research_snapshots sn ${joins} ${clause} GROUP BY sn.id ORDER BY sn.captured_at DESC LIMIT ?`).all(...values, limit);
    const total = Number(this.db.prepare(`SELECT COUNT(DISTINCT sn.id) AS total FROM research_snapshots sn ${joins} ${clause}`).get(...values).total);
    return { items: rows.map((row) => this.toResearchSnapshot(row)), total };
  }
  toResearchSnapshot(row) {
    const metadata = JSON.parse(row.metadata_json);
    const imageUrl = (() => {
      try {
        return publicUrl(metadata.imageUrl, "Research image URL");
      } catch {
        return "";
      }
    })();
    return {
      id: row.id,
      sourceId: row.source_id,
      sourceTitle: row.source_title,
      canonicalUrl: row.canonical_url,
      runId: row.run_id,
      contentType: row.content_type,
      platform: row.platform,
      author: row.author,
      title: row.title,
      excerpt: row.excerpt,
      body: row.body,
      imageUrl,
      language: typeof metadata.language === "string" ? metadata.language : "",
      publishedAt: row.published_at,
      capturedAt: row.captured_at,
      contentHash: row.content_hash,
      metadata
    };
  }
  updateResearchSnapshotMedia(id, input) {
    const row = this.db.prepare("SELECT source_id, metadata_json FROM research_snapshots WHERE id = ?").get(id);
    if (!row) throw new Error("Research snapshot not found");
    const imageUrl = publicUrl(input.imageUrl, "Research image URL");
    const checkedAt = isoTimestamp(input.checkedAt, "Research media check time");
    const metadata = JSON.parse(row.metadata_json);
    this.db.prepare("UPDATE research_snapshots SET metadata_json = ? WHERE id = ?").run(
      JSON.stringify({ ...metadata, mediaCheckedAt: checkedAt, ...imageUrl ? { imageUrl } : {} }),
      id
    );
    const snapshot = this.listResearchSnapshots({ sourceId: row.source_id, limit: 500 }).items.find((item) => item.id === id);
    if (!snapshot) throw new Error("Research snapshot media update could not be read back");
    return snapshot;
  }
  researchItemRows(where = "", values = [], limit = 200) {
    return this.db.prepare(
      `SELECT i.*, r.title AS run_title, r.intent AS domain, st.state, st.state_reason, st.revision AS state_revision,
      (SELECT COUNT(*) FROM research_item_evidence e WHERE e.item_id = i.id) AS evidence_count,
      (SELECT COUNT(*) FROM research_item_support s WHERE s.item_id = i.id) AS support_count,
      (SELECT COUNT(*) FROM research_item_usage u WHERE u.item_id = i.id) AS usage_count
      FROM research_items i JOIN research_runs r ON r.id = i.run_id JOIN research_item_states st ON st.item_id = i.id ${where}
      ORDER BY i.observed_at DESC, i.created_at DESC LIMIT ?`
    ).all(...values, limit);
  }
  toResearchItemSummary(row) {
    return {
      id: row.id,
      runId: row.run_id,
      runTitle: row.run_title,
      domain: row.domain,
      kind: row.kind,
      title: row.title,
      body: row.body,
      confidence: row.confidence,
      evidenceStatus: row.evidence_status,
      observedAt: row.observed_at,
      state: row.state,
      stateReason: row.state_reason,
      evidenceCount: Number(row.evidence_count),
      supportCount: Number(row.support_count),
      usageCount: Number(row.usage_count),
      revision: Number(row.state_revision),
      createdAt: row.created_at,
      archivedAt: row.archived_at
    };
  }
  listResearchItems(input = {}) {
    const where = [input.includeArchived ? "1 = 1" : "i.archived_at IS NULL"];
    const values = [];
    const query = String(input.query ?? "").trim();
    if (query) {
      where.push("(i.title LIKE ? OR i.body LIKE ?)");
      const value = `%${query}%`;
      values.push(value, value);
    }
    if (input.runId) {
      where.push("i.run_id = ?");
      values.push(input.runId);
    }
    if (input.domain) {
      if (!researchDomains.has(input.domain)) throw new Error("Unsupported research intent");
      where.push("r.intent = ?");
      values.push(input.domain);
    }
    if (input.kind) {
      if (!researchItemKinds.has(input.kind)) throw new Error("Unsupported research item kind");
      where.push("i.kind = ?");
      values.push(input.kind);
    }
    if (input.state) {
      if (!researchItemStates.has(input.state)) throw new Error("Unsupported research item state");
      where.push("st.state = ?");
      values.push(input.state);
    }
    const clause = `WHERE ${where.join(" AND ")}`;
    const limit = Math.max(1, Math.min(1e3, Number(input.limit ?? 200)));
    const total = Number(this.db.prepare(`SELECT COUNT(*) AS total FROM research_items i JOIN research_runs r ON r.id = i.run_id JOIN research_item_states st ON st.item_id = i.id ${clause}`).get(...values).total);
    return {
      items: this.researchItemRows(clause, values, limit).map((row) => this.toResearchItemSummary(row)),
      total
    };
  }
  getResearchItem(id) {
    const row = this.researchItemRows("WHERE i.id = ?", [id], 1)[0];
    if (!row) return null;
    const evidence = this.db.prepare(
      `SELECT sn.id AS snapshot_id, s.id AS source_id, s.title AS source_title, s.canonical_url, sn.captured_at, e.source_span, e.content_hash
      FROM research_item_evidence e JOIN research_snapshots sn ON sn.id = e.snapshot_id JOIN research_sources s ON s.id = sn.source_id WHERE e.item_id = ? ORDER BY sn.captured_at DESC`
    ).all(id).map((item) => ({
      snapshotId: item.snapshot_id,
      sourceId: item.source_id,
      sourceTitle: item.source_title,
      canonicalUrl: item.canonical_url,
      capturedAt: item.captured_at,
      sourceSpan: item.source_span,
      contentHash: item.content_hash
    }));
    const supports = this.db.prepare(`SELECT i.id, i.kind, i.title, i.archived_at FROM research_item_support s JOIN research_items i ON i.id = s.support_item_id WHERE s.item_id = ?`).all(id).map((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      archivedAt: item.archived_at
    }));
    const notes = this.db.prepare("SELECT id, body, created_at FROM research_notes WHERE item_id = ? ORDER BY created_at DESC").all(id).map((note) => ({
      id: note.id,
      body: note.body,
      createdAt: note.created_at
    }));
    return {
      ...this.toResearchItemSummary(row),
      metadata: JSON.parse(row.metadata_json),
      evidence,
      supports,
      notes
    };
  }
  transitionResearchItemState(id, state, reason, expectedRevision) {
    if (!researchItemStates.has(state)) throw new Error("Unsupported research item state");
    const current = this.getResearchItem(id);
    if (!current) throw new Error("Research item not found");
    if (current.archivedAt) throw new Error("Restore this research item first");
    if (current.revision !== expectedRevision) throw new Error("Research item changed since it was opened");
    const changed = this.db.prepare("UPDATE research_item_states SET state = ?, state_reason = ?, revision = revision + 1, updated_at = ? WHERE item_id = ? AND revision = ?").run(state, boundedText(reason, "Research state reason", 2e3), now(), id, expectedRevision);
    if (!changed.changes) throw new Error("Research item changed since it was opened");
    return this.getResearchItem(id);
  }
  addResearchNote(id, body) {
    const current = this.getResearchItem(id);
    if (!current) throw new Error("Research item not found");
    if (current.archivedAt) throw new Error("Restore this research item first");
    this.db.prepare("INSERT INTO research_notes (id, item_id, body, created_at) VALUES (?, ?, ?, ?)").run(randomUUID(), id, boundedText(body, "Research note", 8e3, true), now());
    return this.getResearchItem(id);
  }
  archiveResearchItem(id, expectedRevision, restore = false) {
    const current = this.getResearchItem(id);
    if (!current) throw new Error("Research item not found");
    if (current.revision !== expectedRevision) throw new Error("Research item changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Research item archive state changed since it was opened");
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("UPDATE research_items SET archived_at = ? WHERE id = ?").run(restore ? null : timestamp, id);
      const changed = this.db.prepare("UPDATE research_item_states SET revision = revision + 1, updated_at = ? WHERE item_id = ? AND revision = ?").run(timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Research item changed since it was opened");
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getResearchItem(id);
  }
  applyResearchResult(taskId, input) {
    const task = this.tasks.getTask(taskId);
    const source = task?.source;
    if (!task || !source || source.type !== "research-run" || !source.researchRunId) throw new Error("Research artifact references an invalid task");
    const run = this.getResearchRunSummary(source.researchRunId);
    if (!run || run.id !== input.runId) throw new Error("Research artifact run does not match its task");
    if (run.status === "completed") throw new Error("Completed research evidence is immutable");
    if (!input || !Array.isArray(input.sources) || !Array.isArray(input.items) || input.sources.length > 50 || input.items.length > 1e3) throw new Error("Research artifact exceeds the supported bundle size");
    const failedAccess = (input.coverage?.failedAccess ?? []).map((failure) => ({
      locator: boundedText(failure?.locator, "Research failed-access locator", 2e3, true),
      reason: boundedText(failure?.reason, "Research failed-access reason", 1e3, true)
    }));
    if (failedAccess.length > 100) throw new Error("Research failed-access list exceeds 100 entries");
    const curationProfile = input.coverage?.curation?.profile;
    if (curationProfile !== run.domain) throw new Error("Research curation profile must match the run intent");
    const coverage = {
      summary: boundedText(input.coverage?.summary, "Research coverage summary", 8e3),
      gaps: boundedStringList(input.coverage?.gaps ?? [], "Research coverage gap", 100, 2e3),
      channels: boundedStringList(input.coverage?.channels ?? [], "Research coverage channel", 100, 500),
      queries: boundedStringList(input.coverage?.queries ?? [], "Research query", 100, 1e3),
      failedAccess,
      curation: {
        profile: curationProfile,
        summary: boundedText(input.coverage?.curation?.summary, "Research curation summary", 2e3, true)
      },
      sourceCapture: {
        requested: input.sources.length + failedAccess.length,
        captured: input.sources.length,
        failed: failedAccess.length,
        method: "ai-cleaned-original-v1"
      }
    };
    const sourceKeys = input.sources.map((source2) => boundedText(source2?.key, "Research source key", 120, true));
    if (new Set(sourceKeys).size !== sourceKeys.length) throw new Error("Research source keys must be unique");
    const normalizedSources = input.sources.map((source2, index) => {
      if (!researchContentTypes.has(source2.contentType)) throw new Error("Unsupported research content type");
      const canonicalUrl = publicUrl(source2.canonicalUrl, "Research canonical URL");
      const body = boundedText(source2.body, "Research captured body", 5e5, true);
      if (body.length < 80) throw new Error("Research captured body is too short to be reliable evidence");
      const rawMetadata = source2.metadata && typeof source2.metadata === "object" && !Array.isArray(source2.metadata) ? source2.metadata : {};
      const { imageUrl: _metadataImageUrl, language: _metadataLanguage, sourceCapture: _metadataSourceCapture, engagement: _metadataEngagement, missingData: _metadataMissingData, ...metadata } = rawMetadata;
      const imageUrl = publicUrl(source2.imageUrl, "Research image URL");
      const language = boundedText(source2.language, "Research source language", 35);
      const publishedAt = isoTimestamp(source2.publishedAt, "Research publication date", true);
      const capturedAt = isoTimestamp(source2.capturedAt, "Research capture date");
      const missingDataInput = source2.missingData;
      if (!missingDataInput || typeof missingDataInput !== "object" || Array.isArray(missingDataInput)) throw new Error("Research source missing data must explain unavailable fields");
      const missingDataKeys = Object.keys(missingDataInput);
      if (missingDataKeys.some((key) => !["body", "image", "engagement", "published_at"].includes(key))) throw new Error("Research source missing data contains an unsupported field");
      const missingData = Object.fromEntries(missingDataKeys.map((key) => [key, boundedText(missingDataInput[key], `Research missing ${key} reason`, 600, true)]));
      delete missingData.body;
      if (!imageUrl && !missingData.image) throw new Error("Research source missing image must include a reason");
      if (!publishedAt && !missingData.published_at) throw new Error("Research source missing publication date must include a reason");
      const engagementInput = source2.engagement;
      if (!engagementInput || typeof engagementInput !== "object" || Array.isArray(engagementInput)) throw new Error("Research source engagement must be an object");
      if (Object.keys(engagementInput).some((key) => !researchEngagementFields.has(key))) throw new Error("Research source engagement contains an unsupported metric");
      const engagement = {};
      for (const [name, value] of Object.entries(engagementInput)) {
        if (value !== null && (!Number.isInteger(value) || value < 0 || value > 1e12)) throw new Error(`Research engagement ${name} must be a non-negative integer or null`);
        engagement[name] = value;
      }
      const hasMeasuredEngagement = Object.values(engagement).some((value) => typeof value === "number");
      if (!hasMeasuredEngagement && !missingData.engagement) throw new Error("Research source missing engagement must include a reason");
      const engagementObservedAt = hasMeasuredEngagement ? isoTimestamp(source2.engagementObservedAt ?? capturedAt, "Research engagement observation date") : null;
      const engagementContext = boundedText(source2.engagementContext, "Research engagement context", 500);
      const contentHash = createHash("sha256").update(body).digest("hex");
      const sourceCapture = {
        status: "captured",
        method: "ai-cleaned-original-v1",
        requestedUrl: canonicalUrl,
        finalUrl: canonicalUrl,
        capturedAt,
        httpStatus: 0,
        responseContentType: "text/ai-cleaned-original",
        contentSha256: contentHash,
        charCount: body.length,
        wordCount: body.match(/\S+/g)?.length ?? 0
      };
      return {
        key: sourceKeys[index],
        canonicalUrl,
        sourceType: boundedText(source2.sourceType, "Research source type", 80, true),
        contentType: source2.contentType,
        platform: boundedText(source2.platform, "Research platform", 120),
        author: boundedText(source2.author, "Research author", 300),
        title: boundedText(source2.title, "Research source title", 500, true),
        publisher: boundedText(source2.publisher, "Research publisher", 300),
        excerpt: boundedText(source2.excerpt, "Research excerpt", 4e3, true),
        body,
        publishedAt,
        capturedAt,
        metadata: {
          ...metadata,
          ...imageUrl ? { imageUrl } : {},
          ...language ? { language } : {},
          engagement,
          engagementObservedAt,
          engagementContext,
          missingData,
          sourceCapture
        },
        contentHash
      };
    });
    if (new Set(normalizedSources.map((source2) => source2.canonicalUrl)).size !== normalizedSources.length) throw new Error("A research bundle cannot repeat the same canonical URL");
    const itemKeys = input.items.map((item) => boundedText(item?.key, "Research item key", 120, true));
    if (new Set(itemKeys).size !== itemKeys.length) throw new Error("Research item keys must be unique");
    const sourceKeySet = new Set(sourceKeys);
    const itemKeySet = new Set(itemKeys);
    const normalizedItems = input.items.map((item, index) => {
      if (!researchItemKinds.has(item.kind) || !researchItemKindsByDomain[run.domain].has(item.kind) || !researchConfidences.has(item.confidence) || !researchEvidenceStatuses.has(item.evidenceStatus)) throw new Error("Research item classification is invalid for this intent");
      if (!Array.isArray(item.evidence) || !Array.isArray(item.supportKeys)) throw new Error("Research item links must be lists");
      const evidence = item.evidence.map((link) => ({
        sourceKey: boundedText(link?.sourceKey, "Research evidence source key", 120, true),
        sourceSpan: boundedText(link?.sourceSpan, "Research evidence span", 2e3)
      }));
      const supportKeys = boundedStringList(item.supportKeys, "Research support key", 100, 120);
      if (evidence.some((link) => !sourceKeySet.has(link.sourceKey)) || supportKeys.some((key) => !itemKeySet.has(key) || key === itemKeys[index])) throw new Error("Research item links point outside the bundle");
      if (item.kind === "observation" && (!evidence.length || evidence.some((link) => !link.sourceSpan))) throw new Error("Research observations require exact captured evidence and source spans");
      if (item.kind === "observation" && item.evidenceStatus !== "observed") throw new Error("Research observations must remain observed evidence");
      if (item.kind === "insight" && (/* @__PURE__ */ new Set([...evidence.map((link) => `source:${link.sourceKey}`), ...supportKeys.map((key) => `item:${key}`)])).size < 2) throw new Error("Research insights require at least two support points");
      const metadata = item.metadata && typeof item.metadata === "object" && !Array.isArray(item.metadata) ? item.metadata : {};
      return {
        key: itemKeys[index],
        kind: item.kind,
        title: boundedText(item.title, "Research item title", 500, true),
        body: boundedText(item.body, "Research item body", 2e4, true),
        confidence: item.confidence,
        evidenceStatus: item.evidenceStatus,
        observedAt: isoTimestamp(item.observedAt, "Research observation date"),
        evidence,
        supportKeys,
        metadata
      };
    });
    const itemByKey = new Map(normalizedItems.map((item) => [item.key, item]));
    const observedSourceKeys = new Set(normalizedItems.filter((item) => item.kind === "observation").flatMap((item) => item.evidence.map((link) => link.sourceKey)));
    if (sourceKeys.some((key) => !observedSourceKeys.has(key))) throw new Error("Every captured source requires at least one source-level observation");
    for (const item of normalizedItems) {
      if (item.kind !== "customer_signal") continue;
      const supported = item.supportKeys.map((key) => itemByKey.get(key)).filter(Boolean);
      if (!supported.some((support) => support?.kind === "observation")) throw new Error("Customer signals require a supporting source observation");
      if (!["question", "pain", "objection", "trigger", "desired_outcome", "wording", "feedback", "emerging"].includes(String(item.metadata.signalType ?? ""))) throw new Error("Customer signals require a valid signal type");
      if (!["unknown", "not_required", "granted", "restricted", "withdrawn"].includes(String(item.metadata.consentState ?? "unknown"))) throw new Error("Customer signals require a valid consent state");
      if (!["normal", "sensitive", "restricted"].includes(String(item.metadata.sensitivity ?? "normal"))) throw new Error("Customer signals require a valid sensitivity");
    }
    if (run.domain === "customer_voice" && !normalizedItems.some((item) => item.kind === "customer_signal")) throw new Error("Customer Voice research requires at least one customer signal");
    const timestamp = now();
    const snapshotBySourceKey = /* @__PURE__ */ new Map();
    const itemIdByKey = /* @__PURE__ */ new Map();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      for (const source2 of normalizedSources) {
        let sourceRow = this.db.prepare("SELECT id FROM research_sources WHERE canonical_url = ?").get(source2.canonicalUrl);
        const sourceId = sourceRow?.id ?? randomUUID();
        if (sourceRow) this.db.prepare("UPDATE research_sources SET source_type = ?, title = ?, publisher = ? WHERE id = ?").run(source2.sourceType, source2.title, source2.publisher, sourceId);
        else this.db.prepare("INSERT INTO research_sources (id, canonical_url, source_type, title, publisher, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(sourceId, source2.canonicalUrl, source2.sourceType, source2.title, source2.publisher, timestamp);
        let snapshot = this.db.prepare("SELECT id FROM research_snapshots WHERE source_id = ? AND content_hash = ?").get(sourceId, source2.contentHash);
        const snapshotId = snapshot?.id ?? randomUUID();
        if (!snapshot) this.db.prepare(`INSERT INTO research_snapshots (id, source_id, content_type, platform, author, title, excerpt, body, published_at, captured_at, content_hash, metadata_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(snapshotId, sourceId, source2.contentType, source2.platform, source2.author, source2.title, source2.excerpt, source2.body, source2.publishedAt, source2.capturedAt, source2.contentHash, JSON.stringify(source2.metadata));
        this.db.prepare("INSERT OR IGNORE INTO research_run_snapshots (run_id, snapshot_id) VALUES (?, ?)").run(run.id, snapshotId);
        snapshotBySourceKey.set(source2.key, {
          id: snapshotId,
          hash: source2.contentHash
        });
      }
      for (const item of normalizedItems) {
        const id = randomUUID();
        itemIdByKey.set(item.key, id);
        this.db.prepare(`INSERT INTO research_items (id, run_id, item_key, kind, title, body, confidence, evidence_status, observed_at, metadata_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(id, run.id, item.key, item.kind, item.title, item.body, item.confidence, item.evidenceStatus, item.observedAt, JSON.stringify(item.metadata), timestamp);
        this.db.prepare("INSERT INTO research_item_states (item_id, state, updated_at) VALUES (?, 'new', ?)").run(id, timestamp);
      }
      for (const item of normalizedItems) {
        const itemId = itemIdByKey.get(item.key);
        for (const link of item.evidence) {
          const snapshot = snapshotBySourceKey.get(link.sourceKey);
          this.db.prepare("INSERT INTO research_item_evidence (item_id, snapshot_id, source_span, content_hash) VALUES (?, ?, ?, ?)").run(itemId, snapshot.id, link.sourceSpan, snapshot.hash);
        }
        for (const key of item.supportKeys) this.db.prepare("INSERT INTO research_item_support (item_id, support_item_id) VALUES (?, ?)").run(itemId, itemIdByKey.get(key));
      }
      this.db.prepare("UPDATE research_runs SET status = 'completed', coverage_json = ?, last_error = NULL, started_at = COALESCE(started_at, ?), completed_at = ?, revision = revision + 1 WHERE id = ?").run(JSON.stringify(coverage), timestamp, timestamp, run.id);
      this.tasks.updateTask(taskId, { status: "review", lastError: null });
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getResearchRun(run.id);
  }
};

// src/mini-apps/research/server/repository.ts
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.2" };
function createResearchRepository(sdk) {
  const brand = () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range);
  return Object.assign(new ResearchStore(sdk.db, { tasks: sdk.tasks, connections: sdk.connections, brand }), {
    getTask: (id) => sdk.tasks.getTask(id),
    updateTask: (...args) => sdk.tasks.updateTask(...args),
    addEvent: (input) => sdk.events.addEvent(input),
    getConnection: (id) => sdk.connections.getConnection(id)
  });
}

// src/mini-apps/research/server/routes.ts
function createResearchRouter({ service, store, port, router }) {
  router.get("/api/research/summary", async (_request, response, next) => {
    try {
      response.json(await service.researchSummary());
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/profiles", (request, response, next) => {
    try {
      response.json(
        store.listResearchProfiles({
          domain: String(request.query.domain ?? ""),
          query: String(request.query.q ?? ""),
          archived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 200)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/profiles", (request, response, next) => {
    try {
      response.status(201).json(store.createResearchProfile(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/profiles/import", (request, response, next) => {
    try {
      response.status(201).json(store.importResearchProfile(request.body?.domain, String(request.body?.brandRecordId ?? "")));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/profiles/:id", (request, response, next) => {
    try {
      const profile = store.getResearchProfile(request.params.id);
      if (!profile) return response.status(404).json({ error: "Research profile not found" });
      response.json(profile);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/research/profiles/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateResearchProfile(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/profiles/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveResearchProfile(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/profiles/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveResearchProfile(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/runs", async (request, response, next) => {
    try {
      response.json(
        await service.listResearchRuns({
          query: String(request.query.q ?? ""),
          domain: String(request.query.domain ?? ""),
          status: String(request.query.status ?? ""),
          archived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 200)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/runs", async (request, response, next) => {
    try {
      const sourceUrl = `http://127.0.0.1:${port}/mini-apps/research/overview`;
      response.status(201).json(await service.startResearch(request.body ?? {}, sourceUrl));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/runs/:id", async (request, response, next) => {
    try {
      response.json(await service.getResearchRun(request.params.id));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/runs/:id/archive", (request, response, next) => {
    try {
      response.json(service.archiveResearchRun(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/runs/:id/restore", (request, response, next) => {
    try {
      response.json(service.archiveResearchRun(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/monitors", (request, response, next) => {
    try {
      response.json(
        service.listResearchMonitors({
          query: String(request.query.q ?? ""),
          status: String(request.query.status ?? ""),
          archived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 200)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/monitors", (request, response, next) => {
    try {
      response.status(201).json(service.createResearchMonitor(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/monitors/:id", (request, response, next) => {
    try {
      const monitor = store.getResearchMonitor(request.params.id);
      if (!monitor) return response.status(404).json({ error: "Research monitor not found" });
      response.json(monitor);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/research/monitors/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(service.updateResearchMonitor(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/monitors/:id/transition", (request, response, next) => {
    try {
      response.json(service.transitionResearchMonitor(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/monitors/:id/run", async (request, response, next) => {
    try {
      response.status(201).json(await service.runResearchMonitor(request.params.id, `http://127.0.0.1:${port}/mini-apps/research/monitors`));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/monitors/:id/archive", (request, response, next) => {
    try {
      response.json(service.archiveResearchMonitor(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/monitors/:id/restore", (request, response, next) => {
    try {
      response.json(service.archiveResearchMonitor(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/items", async (request, response, next) => {
    try {
      response.json(
        await service.listResearchItems({
          query: String(request.query.q ?? ""),
          runId: String(request.query.runId ?? ""),
          domain: String(request.query.domain ?? ""),
          kind: String(request.query.kind ?? ""),
          state: String(request.query.state ?? ""),
          includeArchived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 500)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/items/:id", (request, response, next) => {
    try {
      const item = store.getResearchItem(request.params.id);
      if (!item) return response.status(404).json({ error: "Research item not found" });
      response.json(item);
    } catch (error) {
      next(error);
    }
  });
  router.put("/api/research/items/:id/state", (request, response, next) => {
    try {
      response.json(service.transitionResearchItemState(request.params.id, request.body?.state, request.body?.reason, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/items/:id/notes", (request, response, next) => {
    try {
      response.status(201).json(store.addResearchNote(request.params.id, request.body?.body));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/items/:id/archive", (request, response, next) => {
    try {
      response.json(service.archiveResearchItem(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/items/:id/restore", (request, response, next) => {
    try {
      response.json(service.archiveResearchItem(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/sources", async (request, response, next) => {
    try {
      response.json(
        await service.listResearchSources({
          query: String(request.query.q ?? ""),
          domain: String(request.query.domain ?? ""),
          limit: Number(request.query.limit ?? 500)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/research/snapshots", async (request, response, next) => {
    try {
      response.json(
        await service.listResearchSnapshots({
          runId: request.query.runId ? String(request.query.runId) : void 0,
          sourceId: request.query.sourceId ? String(request.query.sourceId) : void 0,
          domain: String(request.query.domain ?? ""),
          query: String(request.query.q ?? ""),
          contentType: String(request.query.contentType ?? ""),
          limit: Number(request.query.limit ?? 500)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/research/snapshots/media/backfill", async (request, response, next) => {
    try {
      response.json(
        await service.backfillResearchSnapshotMedia({
          domain: String(request.body?.domain ?? "")
        })
      );
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/research/server/service.ts
import fs from "node:fs/promises";
import path from "node:path";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
function configuredProfileLine(profile) {
  const scope = Object.entries(profile.scope).map(([field, value]) => {
    if (Array.isArray(value)) return value.length ? `${field}=${value.join(", ")}` : "";
    return value ? `${field}=${String(value)}` : "";
  }).filter(Boolean).join(" | ");
  const provenance = `${profile.origin}${profile.sourceBrandRecordId ? `:${profile.sourceBrandRecordId}@${profile.sourceBrandRecordRevision}` : ""}`;
  return `  - ${profile.name}: ${profile.summary || "No summary"} | URL=${profile.primaryUrl || "none"} | ${scope || "scope details not supplied"} | notes=${profile.notes || "none"} | provenance=${provenance}`;
}
var mediaFetchHeaders = {
  accept: "text/html,application/xhtml+xml",
  "user-agent": "Kallob-Growth-Studio/0.1 (+local research media enrichment)"
};
function isPrivateAddress(address) {
  const normalized = address.toLowerCase();
  if (normalized.startsWith("::ffff:")) return isPrivateAddress(normalized.slice("::ffff:".length));
  if (normalized === "::1" || normalized === "::" || normalized.startsWith("fc") || normalized.startsWith("fd") || /^fe[89ab]/.test(normalized)) return true;
  const parts = normalized.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) return false;
  return parts[0] === 0 || parts[0] === 10 || parts[0] === 127 || parts[0] === 169 && parts[1] === 254 || parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31 || parts[0] === 192 && parts[1] === 168 || parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127;
}
async function assertPublicRemoteUrl(value) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Research media source must use HTTP or HTTPS");
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".local")) throw new Error("Research media source must be public");
  if (isIP(hostname)) {
    if (isPrivateAddress(hostname)) throw new Error("Research media source must be public");
    return url;
  }
  const addresses = await lookup(hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) throw new Error("Research media source must resolve publicly");
  return url;
}
function decodeHtmlAttribute(value) {
  return value.replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16))).replace(/&#([0-9]+);/g, (_match, code) => String.fromCodePoint(Number.parseInt(code, 10)));
}
function representativeImageFromHtml(html, pageUrl) {
  const tags = html.match(/<(?:meta|link)\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attributes = /* @__PURE__ */ new Map();
    for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)) attributes.set(match[1].toLowerCase(), decodeHtmlAttribute(match[2] ?? match[3] ?? match[4] ?? ""));
    const key = (attributes.get("property") || attributes.get("name") || attributes.get("rel") || "").toLowerCase();
    if (!["og:image", "og:image:url", "twitter:image", "twitter:image:src", "image_src"].includes(key)) continue;
    const value = attributes.get("content") || attributes.get("href") || "";
    if (!value) continue;
    try {
      const imageUrl = new URL(value, pageUrl);
      if (["http:", "https:"].includes(imageUrl.protocol) && !["localhost", "127.0.0.1", "::1"].includes(imageUrl.hostname.toLowerCase())) return imageUrl.toString();
    } catch {
    }
  }
  return "";
}
async function readBoundedHtml(response, maxBytes = 512e3) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let html = "";
  while (bytes < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    html += decoder.decode(value, { stream: true });
    if (bytes >= maxBytes) {
      await reader.cancel();
      break;
    }
  }
  return html + decoder.decode();
}
async function discoverRepresentativeImage(value, redirects = 0) {
  if (redirects > 4) return "";
  const url = await assertPublicRemoteUrl(value);
  const response = await fetch(url, { headers: mediaFetchHeaders, redirect: "manual", signal: AbortSignal.timeout(8e3) });
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    return location ? discoverRepresentativeImage(new URL(location, url).toString(), redirects + 1) : "";
  }
  if (!response.ok || !response.headers.get("content-type")?.toLowerCase().includes("text/html")) return "";
  return representativeImageFromHtml(await readBoundedHtml(response), url.toString());
}
var RESEARCH_APPLICATION_KEY = "research-studio";
var ResearchService = class {
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
  researchMonitorInterval = null;
  async startResearch(input, sourceUrl, options = {}) {
    const parsedSource = new URL(sourceUrl);
    if (parsedSource.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(parsedSource.hostname)) throw new Error("Research Studio source must be the local Growth Studio");
    await this.prompts.assertApplication(RESEARCH_APPLICATION_KEY);
    const run = this.store.createResearchRun(input, options);
    const task = this.store.getTask(run.taskId);
    const resultDirectory = path.join(this.projectRoot, ".growth-studio", "task-results");
    const resultPath = path.join(resultDirectory, `${task.id}.json`);
    const temporaryResultPath = `${resultPath}.tmp`;
    await fs.mkdir(resultDirectory, { recursive: true });
    const connections = run.connectionIds.map((id) => this.store.getConnection(id)).filter((item) => Boolean(item));
    const profiles = run.profileSnapshots;
    const baseline2 = run.baselineRunId ? this.store.getResearchRun(run.baselineRunId) : null;
    const baselineContext = baseline2 ? [
      `Previous run: ${baseline2.title} (${baseline2.completedAt ?? baseline2.createdAt})`,
      `Previous coverage: ${baseline2.coverage.summary || "No coverage summary"}`,
      `Previous captures:
${baseline2.snapshots.slice(0, 50).map((snapshot) => `  - ${snapshot.canonicalUrl} | hash=${snapshot.contentHash} | captured=${snapshot.capturedAt}`).join("\n") || "  - None"}`,
      `Previous findings:
${baseline2.items.slice(0, 100).map((item) => `  - [${item.kind}] ${item.title}: ${item.body.slice(0, 400)}`).join("\n") || "  - None"}`
    ].join("\n") : "No previous run is available; establish the first evidence baseline.";
    const connectionAccess = connections.map((connection) => {
      if (connection.provider === "browser-session") return `Logged-in website | ${connection.name} | platform=${connection.scope.platform || "website"} | identity=${connection.scope.identityLabel || "unspecified"} | start=${connection.scope.startUrl || "unspecified"} | access=supervised IAB`;
      if (connection.provider === "scrape-creators") return `Platform connection | ${connection.name} | provider=ScrapeCreators | endpoint=${connection.scope.mcpEndpoint || "not exposed"} | access=${connection.scope.access || "public-read-only"} | credits=${connection.scope.creditsRemaining || "unknown"}`;
      return `Platform connection | ${connection.name} | provider=Composio | toolkit=${connection.scope.toolkitSlug || "unspecified"} | user=${connection.scope.userId || "unspecified"} | connectedAccount=${connection.scope.externalId || "unspecified"} | status=${connection.scope.providerStatus || "unknown"}`;
    });
    const prompt = await this.prompts.application(RESEARCH_APPLICATION_KEY, "research-run", {
      sourceUrl,
      runId: run.id,
      runIdJson: run.id,
      domain: run.domain,
      mode: run.mode,
      lenses: run.lenses.join(" | ") || "general evidence review",
      coverageMode: run.coverageMode,
      baselineRun: run.baselineRunId ?? "None; establish the first baseline.",
      title: run.title,
      objective: run.objective,
      target: run.target,
      profileList: profiles.length ? profiles.map(configuredProfileLine).join("\n") : "  - None selected; use only the explicit target and brief.",
      baselineContext,
      domainJson: run.domain,
      questions: run.questions.length ? run.questions.join(" | ") : "Derive only the smallest questions needed for the objective.",
      lookbackDays: run.lookbackDays,
      maxSources: run.maxSources,
      preferredUrls: run.sourceUrls.length ? run.sourceUrls.join(" | ") : "None; discover relevant public sources.",
      connectionList: connectionAccess.length ? connectionAccess.map((item) => `  - ${item}`).join("\n") : "  - None selected; use public web only.",
      temporaryResultPathJson: temporaryResultPath,
      resultPathJson: resultPath,
      taskIdJson: task.id
    });
    void (async () => {
      try {
        const needsBrowser = connections.some((connection) => connection.provider === "browser-session");
        const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${task.id}`, `Growth Studio \xB7 Research \xB7 ${run.title}`, prompt.text + this.codex.studioChannel(task.id), this.projectRoot, { openOnCreate: needsBrowser && (options.openOnCreate ?? true) });
        const latestTask = this.store.getTask(task.id);
        if (!latestTask) return;
        this.store.updateTask(
          task.id,
          {
            status: "active",
            codexThreadId: receipt.threadId,
            codexMessageId: receipt.messageId,
            codexAssignedAt: receipt.queuedAt,
            lastError: null
          },
          latestTask.revision
        );
        this.store.updateResearchRunStatus(run.id, "running");
        this.store.addEvent({
          level: "success",
          eventType: "research.started",
          title: "Research Studio opened in Codex",
          detail: `${run.title} \xB7 ${receipt.threadId}`
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not start Research Studio in Codex";
        const latestTask = this.store.getTask(task.id);
        if (latestTask) this.store.updateTask(task.id, { lastError: message }, latestTask.revision);
        this.store.updateResearchRunStatus(run.id, "failed", message);
        this.store.addEvent({
          level: "failed",
          eventType: "research.failed",
          title: "Could not start Research Studio",
          detail: message
        });
      }
    })();
    return {
      run: this.store.getResearchRunSummary(run.id),
      task: this.store.getTask(task.id)
    };
  }
  listResearchMonitors(input = {}) {
    return this.store.listResearchMonitors(input);
  }
  createResearchMonitor(input) {
    const monitor = this.store.createResearchMonitor(input);
    this.store.addEvent({
      level: "success",
      eventType: "research.monitor.created",
      title: "Research monitor created",
      detail: monitor.title
    });
    return monitor;
  }
  updateResearchMonitor(id, input, expectedRevision) {
    const monitor = this.store.updateResearchMonitor(id, input, expectedRevision);
    this.store.addEvent({
      level: "success",
      eventType: "research.monitor.updated",
      title: "Research monitor updated",
      detail: monitor.title
    });
    return monitor;
  }
  transitionResearchMonitor(id, status, expectedRevision) {
    const monitor = this.store.transitionResearchMonitor(id, status, expectedRevision);
    this.store.addEvent({
      level: status === "active" ? "success" : "warning",
      eventType: `research.monitor.${status}`,
      title: status === "active" ? "Research monitor resumed" : "Research monitor paused",
      detail: monitor.title
    });
    return monitor;
  }
  archiveResearchMonitor(id, expectedRevision, restore = false) {
    const monitor = this.store.archiveResearchMonitor(id, expectedRevision, restore);
    this.store.addEvent({
      level: restore ? "success" : "warning",
      eventType: restore ? "research.monitor.restored" : "research.monitor.archived",
      title: restore ? "Research monitor restored" : "Research monitor archived",
      detail: monitor.title
    });
    return monitor;
  }
  async runResearchMonitor(id, sourceUrl, openOnCreate = true) {
    const monitor = this.store.getResearchMonitor(id);
    if (!monitor || monitor.archivedAt) throw new Error("Research monitor not found");
    const baseline2 = this.store.latestResearchMonitorRun(id);
    this.store.recordResearchMonitorRun(id);
    return this.startResearch(monitor, sourceUrl, {
      monitorId: id,
      baselineRunId: baseline2?.id ?? null,
      openOnCreate
    });
  }
  async runDueResearchMonitors(sourceUrl) {
    const due = this.store.listDueResearchMonitors();
    for (const monitor of due) await this.runResearchMonitor(monitor.id, sourceUrl, false);
    return due.length;
  }
  startResearchMonitorLifecycle(sourceUrl) {
    if (this.researchMonitorInterval) return;
    const run = () => void this.runDueResearchMonitors(sourceUrl).catch(
      (error) => this.store.addEvent({
        level: "failed",
        eventType: "research.monitor.scheduler_failed",
        title: "Research monitor scheduler failed",
        detail: error instanceof Error ? error.message : String(error)
      })
    );
    run();
    this.researchMonitorInterval = setInterval(run, 6e4);
    this.researchMonitorInterval.unref();
  }
  stopResearchMonitorLifecycle() {
    if (this.researchMonitorInterval) clearInterval(this.researchMonitorInterval);
    this.researchMonitorInterval = null;
  }
  async listResearchRuns(input = {}) {
    await this.reconcileResults();
    return this.store.listResearchRuns(input);
  }
  async researchSummary() {
    await this.reconcileResults();
    return this.store.researchSummary();
  }
  async getResearchRun(id) {
    await this.reconcileResults();
    const run = this.store.getResearchRun(id);
    if (!run) throw new Error("Research run not found");
    return run;
  }
  async listResearchItems(input = {}) {
    await this.reconcileResults();
    return this.store.listResearchItems(input);
  }
  async listResearchSources(input = {}) {
    await this.reconcileResults();
    return this.store.listResearchSources(input);
  }
  async listResearchSnapshots(input = {}) {
    await this.reconcileResults();
    return this.store.listResearchSnapshots(input);
  }
  async backfillResearchSnapshotMedia(input = {}) {
    await this.reconcileResults();
    const snapshots = this.store.listResearchSnapshots({ domain: input.domain, limit: 500 }).items;
    const pending = snapshots.filter((snapshot) => !snapshot.imageUrl && typeof snapshot.metadata.mediaCheckedAt !== "string");
    let updated = 0;
    let failed = 0;
    let cursor = 0;
    const workers = Array.from({ length: Math.min(4, pending.length) }, async () => {
      while (cursor < pending.length) {
        const snapshot = pending[cursor++];
        const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
        try {
          const imageUrl = await discoverRepresentativeImage(snapshot.canonicalUrl);
          this.store.updateResearchSnapshotMedia(snapshot.id, { imageUrl, checkedAt });
          if (imageUrl) updated += 1;
        } catch {
          failed += 1;
          this.store.updateResearchSnapshotMedia(snapshot.id, { checkedAt });
        }
      }
    });
    await Promise.all(workers);
    return { checked: pending.length, updated, failed };
  }
  transitionResearchItemState(id, state, reason, expectedRevision) {
    const item = this.store.transitionResearchItemState(id, state, reason, expectedRevision);
    this.store.addEvent({
      level: "success",
      eventType: `research.item.${state}`,
      title: "Research item state updated",
      detail: item.title
    });
    return item;
  }
  archiveResearchItem(id, expectedRevision, restore = false) {
    const item = this.store.archiveResearchItem(id, expectedRevision, restore);
    this.store.addEvent({
      level: restore ? "success" : "warning",
      eventType: restore ? "research.item.restored" : "research.item.archived",
      title: restore ? "Research item restored" : "Research item archived",
      detail: item.title
    });
    return item;
  }
  archiveResearchRun(id, expectedRevision, restore = false) {
    const run = this.store.archiveResearchRun(id, expectedRevision, restore);
    this.store.addEvent({
      level: restore ? "success" : "warning",
      eventType: restore ? "research.run.restored" : "research.run.archived",
      title: restore ? "Research run restored" : "Research run archived",
      detail: run.title
    });
    return run;
  }
};

// src/mini-apps/research/server/task-kind.ts
function researchTaskKinds(repository, prompts) {
  return [
    {
      type: "research-run",
      result: {
        envelope: "research",
        envelopeOptional: true,
        apply({ task, envelope }) {
          const source = task.source;
          const run = source.researchRunId ? repository.getResearchRunSummary(source.researchRunId) : null;
          if (!run) throw new Error("Research Studio task references a missing run");
          if (run.status !== "completed") {
            if (!envelope) throw new Error("Initial Research Studio result must include the research evidence envelope");
            const imported = repository.applyResearchResult(task.id, envelope);
            repository.addEvent({
              level: "success",
              eventType: "research.imported",
              title: "Research Studio evidence ready for review",
              detail: `${imported.title} \xB7 ${imported.snapshotCount} snapshots \xB7 ${imported.insightCount} insights`
            });
          } else if (envelope) throw new Error("Completed Research Studio evidence is immutable; revise the report without a research envelope");
        },
        revisionNote: async () => (await prompts.application(RESEARCH_APPLICATION_KEY, "result-revision-note", {})).text
      }
    }
  ];
}

// src/mini-apps/research/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createResearchRepository(sdk);
    const service = new ResearchService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    return {
      router: createResearchRouter({ service, store: repository, port: sdk.port, router: sdk.router() }),
      taskKinds: researchTaskKinds(repository, sdk.prompts),
      start: () => service.startResearchMonitorLifecycle(`http://127.0.0.1:${sdk.port}/mini-apps/research/monitors`),
      stop: () => service.stopResearchMonitorLifecycle()
    };
  }
});
export {
  index_default as default
};
