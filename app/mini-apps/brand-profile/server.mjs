import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/brand-profile/manifest.ts
var manifest = {
  id: "brand-profile",
  version: "1.2.0",
  requiresCore: ">=2.0.0 <3",
  exports: { "brand-profile.context": "1.3" }
};

// src/mini-apps/brand-profile/release-notes.json
var release_notes_default = [
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

// src/mini-apps/brand-profile/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/brand-profile/server/store.ts
import { createHash, randomUUID } from "node:crypto";
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
var brandProfileTextLimits = {
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
  getBrandProfile(revision) {
    const current = this.db.prepare("SELECT * FROM brand_profiles WHERE id = 'default'").get();
    if (!current) return null;
    let payload = normalizeBrandProfileInput(JSON.parse(current.payload_json));
    let selectedRevision = current.revision;
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT revision, payload_json, created_at FROM brand_profile_versions WHERE profile_id = 'default' AND revision = ?").get(revision);
      if (!version) throw new Error("Brand Profile revision not found");
      payload = normalizeBrandProfileInput(JSON.parse(version.payload_json));
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, created_at FROM brand_profile_versions WHERE profile_id = 'default' ORDER BY revision DESC").all().map((version) => ({
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
  saveBrandProfile(input, expectedRevision) {
    const payload = normalizeBrandProfileInput(input);
    const current = this.getBrandProfile();
    const timestamp = now();
    if (!current) {
      if (expectedRevision !== void 0) throw new Error("Brand Profile does not exist yet");
      this.db.exec("BEGIN IMMEDIATE");
      try {
        this.db.prepare("INSERT INTO brand_profiles (id, payload_json, revision, created_at, updated_at) VALUES ('default', ?, 1, ?, ?)").run(JSON.stringify(payload), timestamp, timestamp);
        this.db.prepare("INSERT INTO brand_profile_versions (profile_id, revision, payload_json, created_at) VALUES ('default', 1, ?, ?)").run(JSON.stringify(payload), timestamp);
        this.db.exec("COMMIT");
      } catch (error) {
        this.db.exec("ROLLBACK");
        throw error;
      }
      return this.getBrandProfile();
    }
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile changed since it was opened");
    const revision = current.currentRevision + 1;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_profiles SET payload_json = ?, revision = ?, updated_at = ? WHERE id = 'default' AND revision = ?").run(JSON.stringify(payload), revision, timestamp, expectedRevision);
      if (!changed.changes) throw new Error("Brand Profile changed since it was opened");
      this.db.prepare("INSERT INTO brand_profile_versions (profile_id, revision, payload_json, created_at) VALUES ('default', ?, ?, ?)").run(revision, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandProfile();
  }
  getBrandGuideline(kind, revision) {
    if (!["identity", "voice"].includes(kind)) throw new Error("Unsupported Brand guideline kind");
    const current = this.db.prepare("SELECT * FROM brand_guidelines WHERE kind = ?").get(kind);
    if (!current) return null;
    let payload = normalizeBrandGuidelineInput(kind, JSON.parse(current.payload_json));
    let selectedRevision = Number(current.revision);
    let selectedAt = current.updated_at;
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT * FROM brand_guideline_versions WHERE kind = ? AND revision = ?").get(kind, revision);
      if (!version) throw new Error("Brand guideline revision not found");
      payload = normalizeBrandGuidelineInput(kind, JSON.parse(version.payload_json));
      selectedRevision = Number(version.revision);
      selectedAt = version.created_at;
    }
    const versions = this.db.prepare("SELECT revision, action, activated_at, created_at FROM brand_guideline_versions WHERE kind = ? ORDER BY revision DESC").all(kind).map((version) => ({
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
  getActiveBrandGuideline(kind) {
    const row = this.db.prepare("SELECT active_revision FROM brand_guidelines WHERE kind = ?").get(kind);
    return row?.active_revision ? this.getBrandGuideline(kind, Number(row.active_revision)) : null;
  }
  saveBrandGuideline(kind, input, expectedRevision) {
    if (!this.getBrandProfile()) throw new Error("Create Brand Profile before adding brand guidelines");
    const payload = normalizeBrandGuidelineInput(kind, input);
    const current = this.getBrandGuideline(kind);
    const timestamp = now();
    if (!current) {
      if (expectedRevision !== void 0) throw new Error("Brand guideline does not exist yet");
      this.db.exec("BEGIN IMMEDIATE");
      try {
        this.db.prepare("INSERT INTO brand_guidelines (kind, payload_json, revision, active_revision, created_at, updated_at) VALUES (?, ?, 1, NULL, ?, ?)").run(kind, JSON.stringify(payload), timestamp, timestamp);
        this.db.prepare("INSERT INTO brand_guideline_versions (kind, revision, payload_json, action, activated_at, created_at) VALUES (?, 1, ?, 'create', NULL, ?)").run(kind, JSON.stringify(payload), timestamp);
        this.db.exec("COMMIT");
      } catch (error) {
        this.db.exec("ROLLBACK");
        throw error;
      }
      return this.getBrandGuideline(kind);
    }
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand guideline changed since it was opened");
    const revision = current.currentRevision + 1;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_guidelines SET payload_json = ?, revision = ?, updated_at = ? WHERE kind = ? AND revision = ?").run(JSON.stringify(payload), revision, timestamp, kind, expectedRevision);
      if (!changed.changes) throw new Error("Brand guideline changed since it was opened");
      this.db.prepare("INSERT INTO brand_guideline_versions (kind, revision, payload_json, action, activated_at, created_at) VALUES (?, ?, ?, 'update', NULL, ?)").run(kind, revision, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandGuideline(kind);
  }
  activateBrandGuideline(kind, expectedRevision) {
    const current = this.getBrandGuideline(kind);
    if (!current) throw new Error("Create a brand guideline draft before activating it");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand guideline changed since it was opened");
    if (current.gaps.length) throw new Error(`Complete the guideline before activating it: ${current.gaps.join(", ")}`);
    if (current.kind === "identity") {
      const assets = this.listBrandAssets();
      if (!assets.some((asset) => asset.id === current.logoAssetId && asset.role === "logo")) throw new Error("The selected logo is unavailable");
      if (current.visualAssetIds.some((id) => !assets.some((asset) => asset.id === id && asset.role === "visual_reference"))) throw new Error("A selected visual reference is unavailable");
    }
    if (current.activeRevision === current.currentRevision) return current;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_guidelines SET active_revision = ?, updated_at = ? WHERE kind = ? AND revision = ?").run(current.currentRevision, timestamp, kind, expectedRevision);
      if (!changed.changes) throw new Error("Brand guideline changed since it was opened");
      this.db.prepare("UPDATE brand_guideline_versions SET activated_at = ? WHERE kind = ? AND revision = ?").run(timestamp, kind, current.currentRevision);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandGuideline(kind);
  }
  restoreBrandGuideline(kind, sourceRevision, expectedRevision) {
    const current = this.getBrandGuideline(kind);
    if (!current) throw new Error("Brand guideline does not exist");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand guideline changed since it was opened");
    const source = this.db.prepare("SELECT payload_json FROM brand_guideline_versions WHERE kind = ? AND revision = ?").get(kind, sourceRevision);
    if (!source) throw new Error("Brand guideline revision not found");
    const payload = normalizeBrandGuidelineInput(kind, JSON.parse(source.payload_json));
    const revision = current.currentRevision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE brand_guidelines SET payload_json = ?, revision = ?, updated_at = ? WHERE kind = ? AND revision = ?").run(JSON.stringify(payload), revision, timestamp, kind, expectedRevision);
      if (!changed.changes) throw new Error("Brand guideline changed since it was opened");
      this.db.prepare("INSERT INTO brand_guideline_versions (kind, revision, payload_json, action, activated_at, created_at) VALUES (?, ?, ?, 'restore', NULL, ?)").run(kind, revision, JSON.stringify(payload), timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandGuideline(kind);
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
  assertBrandRecordReferences(payload) {
    if (payload.kind !== "offering" || !payload.segmentIds?.length) return;
    const placeholders = payload.segmentIds.map(() => "?").join(", ");
    const rows = this.db.prepare(`SELECT id, kind FROM brand_records WHERE id IN (${placeholders})`).all(...payload.segmentIds);
    const validSegmentIds = new Set(rows.filter((row) => row.kind === "segment").map((row) => row.id));
    if (payload.segmentIds.some((id) => !validSegmentIds.has(id))) throw new Error("Offering segment links must reference existing customer segments");
  }
  listBrandRecords(input = {}) {
    const where = [input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
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
    for (const row of this.db.prepare("SELECT kind, count(*) AS total FROM brand_records WHERE archived_at IS NULL GROUP BY kind").all()) facets[row.kind] = Number(row.total);
    return {
      items: rows.map((row) => this.toBrandRecordSummary(row)),
      total: rows.length,
      facets
    };
  }
  getBrandRecord(id, revision) {
    const current = this.db.prepare("SELECT * FROM brand_records WHERE id = ?").get(id);
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
  createBrandRecord(input) {
    const payload = normalizeBrandRecordInput(input);
    this.assertBrandRecordReferences(payload);
    const id = randomUUID();
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO brand_records (id, kind, name, payload_json, status, revision, created_at, updated_at) VALUES (?, ?, ?, ?, 'active', 1, ?, ?)").run(id, payload.kind, payload.name, encoded, timestamp, timestamp);
      this.db.prepare("INSERT INTO brand_record_versions (record_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'active', 'create', ?)").run(id, encoded, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandRecord(id);
  }
  updateBrandRecord(id, input, expectedRevision) {
    const current = this.getBrandRecord(id);
    if (!current) throw new Error("Brand Profile record not found");
    if (current.archivedAt) throw new Error("Archived Brand Profile records must be restored before editing");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile record changed since it was opened");
    const payload = normalizeBrandRecordInput(input);
    if (payload.kind !== current.kind) throw new Error("Brand Profile record kind cannot change");
    this.assertBrandRecordReferences(payload);
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
  transitionBrandRecord(id, status, expectedRevision) {
    if (!["active", "disabled"].includes(status)) throw new Error("Unsupported Brand Profile record status");
    const current = this.getBrandRecord(id);
    if (!current) throw new Error("Brand Profile record not found");
    if (current.archivedAt) throw new Error("Archived Brand Profile records must be restored before changing status");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Profile record changed since it was opened");
    if (current.status === status) throw new Error(`Brand Profile record is already ${status}`);
    return this.reviseBrandRecordState(current, status, null, `transition:${status}`);
  }
  archiveBrandRecord(id, expectedRevision, restore = false) {
    const current = this.getBrandRecord(id);
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
    const where = [input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
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
    for (const row of this.db.prepare("SELECT status, count(*) AS total FROM brand_claims WHERE archived_at IS NULL GROUP BY status").all()) facets[row.status] = Number(row.total);
    return {
      items: rows.map((row) => this.toBrandClaimSummary(row)),
      total: rows.length,
      facets
    };
  }
  getBrandClaim(id, revision) {
    const current = this.db.prepare("SELECT * FROM brand_claims WHERE id = ?").get(id);
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
  createBrandClaim(input) {
    const payload = normalizeBrandClaimInput(input);
    const id = randomUUID();
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO brand_claims (id, claim, payload_json, status, revision, created_at, updated_at) VALUES (?, ?, ?, 'draft', 1, ?, ?)").run(id, payload.claim, encoded, timestamp, timestamp);
      this.db.prepare("INSERT INTO brand_claim_versions (claim_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'draft', 'create', ?)").run(id, encoded, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getBrandClaim(id);
  }
  updateBrandClaim(id, input, expectedRevision) {
    const current = this.getBrandClaim(id);
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
  transitionBrandClaim(id, status, expectedRevision) {
    if (!["draft", "approved"].includes(status)) throw new Error("Unsupported Brand Claim status");
    const current = this.getBrandClaim(id);
    if (!current) throw new Error("Brand Claim not found");
    if (current.archivedAt) throw new Error("Archived Brand Claims must be restored before approval");
    if (expectedRevision === void 0 || current.currentRevision !== expectedRevision) throw new Error("Brand Claim changed since it was opened");
    if (current.status === status) throw new Error(`Brand Claim is already ${status}`);
    if (status === "approved" && !current.proof.length) throw new Error("Brand Claim needs proof before approval");
    return this.reviseBrandClaimState(current, status, null, `transition:${status}`);
  }
  archiveBrandClaim(id, expectedRevision, restore = false) {
    const current = this.getBrandClaim(id);
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
    const where = [input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
    if (input.role) {
      if (!["logo", "visual_reference", "product_media", "competitor_logo"].includes(input.role)) throw new Error("Unsupported Brand asset role");
      where.push("role = ?");
      values.push(input.role);
    }
    if (input.recordId) {
      where.push("record_id = ?");
      values.push(input.recordId);
    }
    return this.db.prepare(`SELECT id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE ${where.join(" AND ")} ORDER BY created_at DESC, id`).all(...values).map((row) => this.toBrandAsset(row));
  }
  createBrandAsset(input) {
    if (!["logo", "visual_reference", "product_media", "competitor_logo"].includes(input.role)) throw new Error("Unsupported Brand asset role");
    const bytes = Buffer.from(input.data);
    if (!bytes.length || bytes.length > 8e6) throw new Error("Brand assets must be between 1 byte and 8 MB");
    const detected = detectImageAsset(bytes);
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    const recordId = input.recordId || null;
    if (input.role === "product_media") {
      const record = recordId ? this.getBrandRecord(recordId) : null;
      if (!record || record.kind !== "offering" || record.archivedAt) throw new Error("Product media requires an active Product/Service record");
    } else if (input.role === "competitor_logo") {
      const record = recordId ? this.getBrandRecord(recordId) : null;
      if (!record || record.kind !== "competitor" || record.archivedAt) throw new Error("Competitor logos require an active Competitor record");
    } else if (recordId) throw new Error("Only product media and competitor logos may be linked to a Brand Profile record");
    const existing = this.db.prepare("SELECT id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE role = ? AND record_id IS ? AND sha256 = ?").get(input.role, recordId, sha256);
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      if (input.role === "logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE role = 'logo' AND archived_at IS NULL AND sha256 != ?").run(timestamp, sha256);
      if (input.role === "competitor_logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE role = 'competitor_logo' AND record_id = ? AND archived_at IS NULL AND sha256 != ?").run(timestamp, recordId, sha256);
      if (existing) this.db.prepare("UPDATE brand_assets SET archived_at = NULL WHERE id = ?").run(existing.id);
      else this.db.prepare("INSERT INTO brand_assets (id, role, record_id, filename, mime_type, byte_size, sha256, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(randomUUID(), input.role, recordId, boundedText(input.filename, "Asset filename", 300, true), detected.mimeType, bytes.length, sha256, bytes, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.listBrandAssets({
      role: input.role,
      recordId: recordId ?? void 0
    }).find((asset) => asset.sha256 === sha256);
  }
  getBrandAssetData(id) {
    const row = this.db.prepare("SELECT * FROM brand_assets WHERE id = ?").get(id);
    return row ? { asset: this.toBrandAsset(row), data: row.data } : null;
  }
  archiveBrandAsset(id, restore = false) {
    const row = this.db.prepare("SELECT id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE id = ?").get(id);
    if (!row) throw new Error("Brand asset not found");
    if (restore ? !row.archived_at : Boolean(row.archived_at)) throw new Error("Brand asset archive state changed");
    if (restore && row.role === "logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE role = 'logo' AND archived_at IS NULL").run(now());
    if (restore && row.role === "competitor_logo") this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE role = 'competitor_logo' AND record_id = ? AND archived_at IS NULL").run(now(), row.record_id);
    this.db.prepare("UPDATE brand_assets SET archived_at = ? WHERE id = ?").run(restore ? null : now(), id);
    const result = this.db.prepare("SELECT id, role, record_id, filename, mime_type, byte_size, sha256, created_at, archived_at FROM brand_assets WHERE id = ?").get(id);
    return this.toBrandAsset(result);
  }
  brandProfileOverview() {
    const profile = this.getBrandProfile();
    const counts = {
      segment: 0,
      persona: 0,
      offering: 0,
      competitor: 0,
      approvedClaims: 0,
      visualAssets: 0
    };
    for (const row of this.db.prepare("SELECT kind, count(*) total FROM brand_records WHERE archived_at IS NULL AND status = 'active' GROUP BY kind").all()) counts[row.kind] = Number(row.total);
    counts.approvedClaims = Number(this.db.prepare("SELECT count(*) total FROM brand_claims WHERE archived_at IS NULL AND status = 'approved'").get().total);
    const assets = this.listBrandAssets();
    counts.visualAssets = assets.filter((asset) => asset.role === "visual_reference").length;
    const identity = this.getActiveBrandGuideline("identity");
    const voice = this.getActiveBrandGuideline("voice");
    const guidelineDetail = (kind, active) => {
      const current = this.getBrandGuideline(kind);
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
        key: "offerings",
        label: "S\u1EA3n ph\u1EA9m & D\u1ECBch v\u1EE5",
        complete: Boolean(counts.offering),
        detail: `${counts.offering} m\u1EE5c \u0111ang d\xF9ng`
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
      offerings: "T\u1EA1o \xEDt nh\u1EA5t m\u1ED9t S\u1EA3n ph\u1EA9m/D\u1ECBch v\u1EE5 Active.",
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
      researchReady: ["profile", "audience", "offerings", "market"].every((key) => complete.has(key)),
      publishingReady: ["profile", "identity", "voice", "offerings", "claims"].every((key) => complete.has(key)),
      gaps,
      counts,
      assets
    };
  }
  createBrandContextSnapshot(input = {}) {
    const profile = this.getBrandProfile();
    if (!profile) throw new Error("Create Brand Profile before generating context");
    const eligibleRecords = this.listBrandRecords({
      status: "active",
      limit: 500
    }).items;
    const eligibleClaims = this.listBrandClaims({
      status: "approved",
      limit: 500
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
    const identity = this.getActiveBrandGuideline("identity");
    const voice = this.getActiveBrandGuideline("voice");
    if (!identity) gaps.push("Ch\u01B0a c\xF3 Quy chu\u1EA9n nh\u1EADn di\u1EC7n Active.");
    if (!voice) gaps.push("Ch\u01B0a c\xF3 Quy chu\u1EA9n gi\u1ECDng th\u01B0\u01A1ng hi\u1EC7u Active.");
    const guidelineAssetIds = new Set(identity?.kind === "identity" ? [identity.logoAssetId, ...identity.visualAssetIds].filter(Boolean) : []);
    const currentAssets = this.listBrandAssets();
    const allAssets = [...currentAssets, ...this.listBrandAssets({ archived: true })];
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
function brandProfileContext(store) {
  return {
    profile: () => store.getBrandProfile(),
    guideline: (kind) => store.getBrandGuideline(kind),
    assets: (filter) => store.listBrandAssets(filter),
    record: (id) => store.getBrandRecord(id),
    records: (filter) => store.listBrandRecords({ kind: filter?.kind, query: filter?.query, archived: filter?.archived, limit: 500 }).items,
    assetData: (id) => store.getBrandAssetData(id),
    createContextSnapshot: (input) => store.createBrandContextSnapshot(input),
    contextSnapshot: (id) => store.getBrandContextSnapshot(id)
  };
}

// src/mini-apps/brand-profile/server/routes.ts
function createBrandProfileRouter(store, router) {
  router.get("/api/brand-profile/overview", (_request, response, next) => {
    try {
      response.json(store.brandProfileOverview());
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-profile", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      if (revision !== void 0 && (!Number.isInteger(revision) || revision < 1)) throw new Error("Brand Profile revision must be a positive integer");
      const profile = store.getBrandProfile(revision);
      if (!profile) return response.status(404).json({ error: "Brand Profile not found" });
      response.json(profile);
    } catch (error) {
      next(error);
    }
  });
  router.put("/api/brand-profile", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.saveBrandProfile(input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-guidelines/:kind", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const guideline = store.getBrandGuideline(request.params.kind, revision);
      if (!guideline) return response.status(404).json({ error: "Brand guideline not found" });
      response.json(guideline);
    } catch (error) {
      next(error);
    }
  });
  router.put("/api/brand-guidelines/:kind", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.saveBrandGuideline(request.params.kind, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-guidelines/:kind/activate", (request, response, next) => {
    try {
      response.json(store.activateBrandGuideline(request.params.kind, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-guidelines/:kind/restore", (request, response, next) => {
    try {
      response.json(store.restoreBrandGuideline(request.params.kind, request.body?.sourceRevision, request.body?.revision));
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
          limit: Number(request.query.limit ?? 200)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records", (request, response, next) => {
    try {
      response.status(201).json(store.createBrandRecord(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-records/:id", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const record = store.getBrandRecord(request.params.id, revision);
      if (!record) return response.status(404).json({ error: "Brand Profile record not found" });
      response.json(record);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/brand-records/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateBrandRecord(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionBrandRecord(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveBrandRecord(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-records/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveBrandRecord(request.params.id, request.body?.revision, true));
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
          limit: Number(request.query.limit ?? 200)
        })
      );
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims", (request, response, next) => {
    try {
      response.status(201).json(store.createBrandClaim(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/brand-claims/:id", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      const claim = store.getBrandClaim(request.params.id, revision);
      if (!claim) return response.status(404).json({ error: "Brand Claim not found" });
      response.json(claim);
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/brand-claims/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateBrandClaim(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionBrandClaim(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveBrandClaim(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/brand-claims/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveBrandClaim(request.params.id, request.body?.revision, true));
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
          archived: request.query.archived === "1"
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
        })
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
      response.status(201).json(store.createBrandContextSnapshot(request.body ?? {}));
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
