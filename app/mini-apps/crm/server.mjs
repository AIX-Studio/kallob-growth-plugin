import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/crm/manifest.ts
var manifest = {
  id: "crm",
  version: "1.1.0",
  requiresCore: ">=1.4.0 <2",
  exports: { "crm.customers": "1.0" }
};

// src/mini-apps/crm/release-notes.json
var release_notes_default = [
  {
    version: "1.1.0",
    vi: "Mini CRM gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio. M\u1EE5c S\u1EA3n ph\u1EA9m & D\u1ECBch v\u1EE5 m\u1EDF th\u1EB3ng Brand Profile.",
    en: "Mini CRM is now its own mini-app and updates without updating all of Growth Studio. Products & Services opens Brand Profile directly."
  }
];

// src/mini-apps/crm/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS crm_customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        kind TEXT NOT NULL CHECK (kind IN ('person', 'business')),
        stage TEXT NOT NULL CHECK (stage IN ('lead', 'prospect', 'customer', 'inactive')),
        payload_json TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS crm_customers_listing_idx ON crm_customers(archived_at, stage, updated_at DESC);
      CREATE TABLE IF NOT EXISTS crm_opportunities (
        id TEXT PRIMARY KEY,
        customer_id TEXT NOT NULL REFERENCES crm_customers(id),
        name TEXT NOT NULL,
        offer_id TEXT,
        stage TEXT NOT NULL CHECK (stage IN ('new', 'discussion', 'proposal', 'won', 'lost')),
        payload_json TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        closed_at TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS crm_opportunities_listing_idx ON crm_opportunities(archived_at, stage, updated_at DESC);
      CREATE INDEX IF NOT EXISTS crm_opportunities_customer_idx ON crm_opportunities(customer_id, archived_at, updated_at DESC);
      CREATE TABLE IF NOT EXISTS crm_interactions (
        id TEXT PRIMARY KEY,
        customer_id TEXT NOT NULL REFERENCES crm_customers(id),
        opportunity_id TEXT REFERENCES crm_opportunities(id),
        kind TEXT NOT NULL CHECK (kind IN ('call', 'meeting', 'message', 'email', 'note', 'support')),
        occurred_at TEXT NOT NULL,
        summary TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS crm_interactions_customer_idx ON crm_interactions(customer_id, archived_at, occurred_at DESC);
      CREATE INDEX IF NOT EXISTS crm_interactions_opportunity_idx ON crm_interactions(opportunity_id, archived_at, occurred_at DESC);
    `);
    db.exec(`
      CREATE TABLE IF NOT EXISTS crm_opportunity_offers (
        opportunity_id TEXT NOT NULL REFERENCES crm_opportunities(id) ON DELETE CASCADE,
        offer_id TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY(opportunity_id, offer_id)
      );
      CREATE INDEX IF NOT EXISTS crm_opportunity_offers_offer_idx ON crm_opportunity_offers(offer_id, opportunity_id);
      CREATE TABLE IF NOT EXISTS crm_opportunity_products (
        opportunity_id TEXT NOT NULL REFERENCES crm_opportunities(id) ON DELETE CASCADE,
        product_id TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY(opportunity_id, product_id)
      );
      CREATE INDEX IF NOT EXISTS crm_opportunity_products_product_idx ON crm_opportunity_products(product_id, opportunity_id);
      INSERT OR IGNORE INTO crm_opportunity_offers (opportunity_id, offer_id, position)
        SELECT id, offer_id, 0 FROM crm_opportunities WHERE offer_id IS NOT NULL;
    `);
  }
};

// src/mini-apps/sdk/schema.ts
var quote = (name) => `"${name.replace(/"/g, '""')}"`;
function dropForeignKeys(db, table, targets) {
  const row = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(table);
  if (!row?.sql) return false;
  const names = targets.map((target) => target.replace(/[^\w]/g, "")).join("|");
  const reference = new RegExp(`\\s+REFERENCES\\s+["'\`]?(?:${names})["'\`]?\\s*\\([^)]*\\)(?:\\s+ON\\s+(?:DELETE|UPDATE)\\s+(?:CASCADE|SET\\s+NULL|SET\\s+DEFAULT|RESTRICT|NO\\s+ACTION))*`, "gi");
  if (!reference.test(row.sql)) return false;
  reference.lastIndex = 0;
  const next = `${table}__rebuild`;
  const createNext = row.sql.replace(reference, "").replace(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:"[^"]+"|'[^']+'|`[^`]+`|\S+)/i, `CREATE TABLE ${quote(next)}`);
  const indexes = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL").all(table);
  const triggers = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'trigger' AND tbl_name = ? AND sql IS NOT NULL").all(table);
  const columns = db.prepare(`PRAGMA table_info(${quote(table)})`).all().map((column) => quote(column.name)).join(", ");
  db.exec(`DROP TABLE IF EXISTS ${quote(next)}`);
  db.exec(createNext);
  db.exec(`INSERT INTO ${quote(next)} (${columns}) SELECT ${columns} FROM ${quote(table)}`);
  db.exec(`DROP TABLE ${quote(table)}`);
  db.exec(`ALTER TABLE ${quote(next)} RENAME TO ${quote(table)}`);
  for (const statement of [...indexes, ...triggers]) db.exec(statement.sql);
  return true;
}
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

// src/mini-apps/crm/server/migrations/0002-soft-cross-app-references.ts
var softCrossAppReferences = {
  id: "0002-soft-cross-app-references",
  transaction: false,
  up(db) {
    withForeignKeysOff(db, ["crm_opportunities", "crm_opportunity_offers", "crm_opportunity_products"], () => {
      dropForeignKeys(db, "crm_opportunities", ["offers"]);
      dropForeignKeys(db, "crm_opportunity_offers", ["offers"]);
      dropForeignKeys(db, "crm_opportunity_products", ["brand_records"]);
    });
  }
};

// src/mini-apps/crm/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline, softCrossAppReferences]
};

// src/mini-apps/crm/server/store.ts
import { randomUUID } from "node:crypto";
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
var crmCustomerKinds = /* @__PURE__ */ new Set(["person", "business"]);
var crmCustomerStages = /* @__PURE__ */ new Set(["lead", "prospect", "customer", "inactive"]);
var crmPreferredChannels = /* @__PURE__ */ new Set(["", "phone", "email", "zalo", "facebook", "other"]);
var crmOpportunityStages = /* @__PURE__ */ new Set(["new", "discussion", "proposal", "won", "lost"]);
var crmInteractionKinds = /* @__PURE__ */ new Set(["call", "meeting", "message", "email", "note", "support"]);
function normalizeCrmCustomerInput(input) {
  const legacy = input;
  const kind = String(input.kind ?? "person");
  const stage = String(input.stage ?? "lead");
  const preferredChannel = String(input.preferredChannel ?? "");
  if (!crmCustomerKinds.has(kind)) throw new Error("Unsupported CRM customer type");
  if (!crmCustomerStages.has(stage)) throw new Error("Unsupported CRM relationship stage");
  if (!crmPreferredChannels.has(preferredChannel)) throw new Error("Unsupported CRM preferred channel");
  const email = boundedText(input.email, "CRM customer email", 320).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("CRM customer email is invalid");
  return {
    kind,
    name: boundedText(input.name, "CRM customer name", 200, true),
    companyName: kind === "business" ? boundedText(input.companyName ?? legacy.contactName, "CRM company name", 200) : "",
    phone: boundedText(input.phone, "CRM customer phone", 80),
    email,
    preferredChannel,
    source: boundedText(input.source, "CRM customer source", 200),
    stage,
    tags: boundedStringList(input.tags ?? [], "CRM customer tags", 20, 60),
    notes: boundedText(input.notes, "CRM customer notes", 2e4)
  };
}
function normalizeCrmOpportunityInput(input) {
  const legacy = input;
  const stage = String(input.stage ?? "new");
  if (!crmOpportunityStages.has(stage)) throw new Error("Unsupported CRM opportunity stage");
  const rawAmount = input.amount;
  const amount = rawAmount === void 0 || rawAmount === null ? null : Number(rawAmount);
  if (amount !== null && (!Number.isFinite(amount) || amount < 0)) throw new Error("CRM opportunity amount must be zero or greater");
  const currency = boundedText(input.currency ?? "VND", "CRM opportunity currency", 3, true).toUpperCase();
  if (!["VND", "USD"].includes(currency)) throw new Error("CRM opportunity currency must be VND or USD");
  const expectedCloseDate = input.expectedCloseDate ? boundedText(input.expectedCloseDate, "CRM expected close date", 10, true) : null;
  if (expectedCloseDate && !/^\d{4}-\d{2}-\d{2}$/.test(expectedCloseDate)) throw new Error("CRM expected close date is invalid");
  return {
    customerId: boundedText(input.customerId, "CRM customer ID", 80, true),
    name: boundedText(input.name, "CRM opportunity name", 200, true),
    offerIds: boundedStringList(input.offerIds ?? (legacy.offerId ? [legacy.offerId] : []), "CRM Offer IDs", 20, 80),
    productIds: boundedStringList(input.productIds ?? [], "CRM product IDs", 50, 80),
    amount,
    currency,
    expectedCloseDate,
    stage,
    notes: boundedText(input.notes, "CRM opportunity notes", 2e4),
    lostReason: boundedText(input.lostReason, "CRM lost reason", 2e3)
  };
}
function normalizeCrmInteractionInput(input) {
  const kind = String(input.kind ?? "note");
  if (!crmInteractionKinds.has(kind)) throw new Error("Unsupported CRM interaction type");
  const occurredAt = input.occurredAt ? boundedText(input.occurredAt, "CRM interaction time", 40, true) : now();
  if (!Number.isFinite(Date.parse(occurredAt))) throw new Error("CRM interaction time is invalid");
  return {
    customerId: boundedText(input.customerId, "CRM customer ID", 80, true),
    opportunityId: input.opportunityId ? boundedText(input.opportunityId, "CRM opportunity ID", 80, true) : null,
    kind,
    occurredAt: new Date(occurredAt).toISOString(),
    summary: boundedText(input.summary, "CRM interaction summary", 8e3, true)
  };
}
var CrmStore = class {
  constructor(db, links) {
    this.db = db;
    this.links = links;
    this.tasks = links.tasks;
    this.events = links.events;
  }
  db;
  links;
  tasks;
  events;
  toCrmCustomerSummary(row) {
    const stored = JSON.parse(row.payload_json);
    if (stored.companyName === void 0) {
      if (stored.kind === "business") {
        stored.companyName = String(stored.name ?? "");
        stored.name = stored.contactName?.trim() || stored.name;
      } else stored.companyName = "";
    }
    const payload = normalizeCrmCustomerInput(stored);
    return {
      ...payload,
      id: row.id,
      revision: Number(row.revision),
      openOpportunityCount: Number(row.open_opportunity_count ?? 0),
      openTaskCount: Number(row.open_task_count ?? 0),
      lastInteractionAt: row.last_interaction_at ?? null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  /**
   * Open follow-up tasks per customer and per opportunity. The tasks are the
   * kernel's (read through the SDK); CRM keeps its ids in their source.
   */
  openTaskCounts() {
    const customers = /* @__PURE__ */ new Map();
    const opportunities = /* @__PURE__ */ new Map();
    for (const task of this.tasks.findTasks({ sourceType: "crm", open: true, limit: 1e4 })) {
      const source = task.source;
      if (source.crmCustomerId) customers.set(source.crmCustomerId, (customers.get(source.crmCustomerId) ?? 0) + 1);
      if (source.crmOpportunityId) opportunities.set(source.crmOpportunityId, (opportunities.get(source.crmOpportunityId) ?? 0) + 1);
    }
    return { customers, opportunities };
  }
  /**
   * Names of linked Offers and products, looked up once per call through the
   * providers' interfaces. `undefined` means the provider is not running (the
   * name is unknown); `null` means it has no such row.
   */
  catalogNames() {
    const offers = this.links.offers();
    const brand = this.links.brand();
    const offerNames = /* @__PURE__ */ new Map();
    const productNames = /* @__PURE__ */ new Map();
    return {
      offer(id) {
        if (!offers) return void 0;
        if (!offerNames.has(id)) offerNames.set(id, offers.get(id)?.name ?? null);
        return offerNames.get(id);
      },
      product(id) {
        if (!brand) return void 0;
        if (!productNames.has(id)) productNames.set(id, brand.record(id)?.name ?? null);
        return productNames.get(id);
      }
    };
  }
  toCrmOpportunitySummary(row, names = this.catalogNames()) {
    const payload = normalizeCrmOpportunityInput(JSON.parse(row.payload_json));
    const offerIds = this.db.prepare("SELECT offer_id FROM crm_opportunity_offers WHERE opportunity_id = ? ORDER BY position, offer_id").all(row.id).map((link) => link.offer_id);
    const productIds = this.db.prepare("SELECT product_id FROM crm_opportunity_products WHERE opportunity_id = ? ORDER BY position, product_id").all(row.id).map((link) => link.product_id);
    const offers = offerIds.map((id) => ({ id, name: names.offer(id) })).filter((item) => item.name !== null);
    const products = productIds.map((id) => ({ id, name: names.product(id) })).filter((item) => item.name !== null);
    return {
      ...payload,
      offerIds: offers.map((item) => item.id),
      productIds: products.map((item) => item.id),
      id: row.id,
      customerName: row.customer_name ?? "",
      offerNames: offers.flatMap((item) => item.name ? [item.name] : []),
      productNames: products.flatMap((item) => item.name ? [item.name] : []),
      revision: Number(row.revision),
      openTaskCount: Number(row.open_task_count ?? 0),
      closedAt: row.closed_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  toCrmInteraction(row) {
    return {
      id: row.id,
      customerId: row.customer_id,
      customerName: row.customer_name ?? "",
      opportunityId: row.opportunity_id,
      opportunityName: row.opportunity_name ?? null,
      kind: row.kind,
      occurredAt: row.occurred_at,
      summary: row.summary,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  listCrmCustomers(input = {}) {
    const where = [input.archived ? "c.archived_at IS NOT NULL" : "c.archived_at IS NULL"];
    const values = [];
    if (input.stage) {
      if (!crmCustomerStages.has(input.stage)) throw new Error("Unsupported CRM relationship stage");
      where.push("c.stage = ?");
      values.push(input.stage);
    }
    if (input.query?.trim()) {
      where.push("(c.name LIKE ? OR c.payload_json LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`
      SELECT c.*,
        (SELECT COUNT(*) FROM crm_opportunities o WHERE o.customer_id = c.id AND o.archived_at IS NULL AND o.stage NOT IN ('won', 'lost')) AS open_opportunity_count,
        (SELECT MAX(i.occurred_at) FROM crm_interactions i WHERE i.customer_id = c.id AND i.archived_at IS NULL) AS last_interaction_at
      FROM crm_customers c WHERE ${where.join(" AND ")} ORDER BY c.updated_at DESC, c.id LIMIT ?
    `).all(...values, limit);
    const facets = { lead: 0, prospect: 0, customer: 0, inactive: 0 };
    for (const row of this.db.prepare("SELECT stage, COUNT(*) AS total FROM crm_customers WHERE archived_at IS NULL GROUP BY stage").all()) facets[row.stage] = Number(row.total);
    const openTasks = this.openTaskCounts().customers;
    return { items: rows.map((row) => this.toCrmCustomerSummary({ ...row, open_task_count: openTasks.get(row.id) ?? 0 })), total: rows.length, facets };
  }
  getCrmCustomer(id) {
    const row = this.db.prepare(`
      SELECT c.*,
        (SELECT COUNT(*) FROM crm_opportunities o WHERE o.customer_id = c.id AND o.archived_at IS NULL AND o.stage NOT IN ('won', 'lost')) AS open_opportunity_count,
        (SELECT MAX(i.occurred_at) FROM crm_interactions i WHERE i.customer_id = c.id AND i.archived_at IS NULL) AS last_interaction_at
      FROM crm_customers c WHERE c.id = ?
    `).get(id);
    if (!row) return null;
    return {
      ...this.toCrmCustomerSummary({ ...row, open_task_count: this.openTaskCounts().customers.get(id) ?? 0 }),
      opportunities: this.listCrmOpportunities({ customerId: id, limit: 200 }).items,
      interactions: this.listCrmInteractions({ customerId: id, limit: 200 }),
      tasks: this.listCrmTasks(id)
    };
  }
  assertCrmCustomerDuplicate(input, excludeId) {
    if (!input.email && !input.phone) return;
    const duplicate = this.db.prepare(`
      SELECT id FROM crm_customers
      WHERE archived_at IS NULL AND id != ? AND (
        (? != '' AND lower(json_extract(payload_json, '$.email')) = lower(?)) OR
        (? != '' AND json_extract(payload_json, '$.phone') = ?)
      ) LIMIT 1
    `).get(excludeId ?? "", input.email, input.email, input.phone, input.phone);
    if (duplicate) throw new Error("A CRM customer with this email or phone already exists");
  }
  createCrmCustomer(input) {
    const payload = normalizeCrmCustomerInput(input);
    this.assertCrmCustomerDuplicate(payload);
    const id = randomUUID();
    const timestamp = now();
    this.db.prepare("INSERT INTO crm_customers (id, name, kind, stage, payload_json, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 1, ?, ?)").run(id, payload.name, payload.kind, payload.stage, JSON.stringify(payload), timestamp, timestamp);
    this.events.addEvent({ level: "success", eventType: "crm.customer.created", title: "CRM customer created", detail: payload.name });
    return this.getCrmCustomer(id);
  }
  updateCrmCustomer(id, input, expectedRevision) {
    const current = this.getCrmCustomer(id);
    if (!current) throw new Error("CRM customer not found");
    if (current.archivedAt) throw new Error("Restore the CRM customer before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM customer changed since it was opened");
    const payload = normalizeCrmCustomerInput({ ...current, ...input, stage: current.stage });
    this.assertCrmCustomerDuplicate(payload, id);
    const timestamp = now();
    const changed = this.db.prepare("UPDATE crm_customers SET name = ?, kind = ?, payload_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.name, payload.kind, JSON.stringify(payload), timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("CRM customer changed since it was opened");
    this.events.addEvent({ level: "success", eventType: "crm.customer.updated", title: "CRM customer updated", detail: payload.name });
    return this.getCrmCustomer(id);
  }
  transitionCrmCustomer(id, stage, expectedRevision) {
    if (!crmCustomerStages.has(stage)) throw new Error("Unsupported CRM relationship stage");
    const current = this.getCrmCustomer(id);
    if (!current) throw new Error("CRM customer not found");
    if (current.archivedAt) throw new Error("Restore the CRM customer before changing status");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM customer changed since it was opened");
    if (current.stage === stage) throw new Error(`CRM customer is already ${stage}`);
    const payload = normalizeCrmCustomerInput({ ...current, stage });
    const timestamp = now();
    const changed = this.db.prepare("UPDATE crm_customers SET stage = ?, payload_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(stage, JSON.stringify(payload), timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("CRM customer changed since it was opened");
    this.events.addEvent({ level: "success", eventType: "crm.customer.transitioned", title: "CRM relationship updated", detail: `${current.name} \xB7 ${stage}` });
    return this.getCrmCustomer(id);
  }
  archiveCrmCustomer(id, expectedRevision, restore = false) {
    const current = this.getCrmCustomer(id);
    if (!current) throw new Error("CRM customer not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM customer changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("CRM customer archive state changed since it was opened");
    if (!restore && current.openOpportunityCount) throw new Error("Close or archive open opportunities before archiving this CRM customer");
    if (!restore && current.openTaskCount) throw new Error("Complete or archive open CRM tasks before archiving this customer");
    const timestamp = now();
    const changed = this.db.prepare("UPDATE crm_customers SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("CRM customer changed since it was opened");
    this.events.addEvent({ level: "success", eventType: restore ? "crm.customer.restored" : "crm.customer.archived", title: restore ? "CRM customer restored" : "CRM customer archived", detail: current.name });
    return this.getCrmCustomer(id);
  }
  /**
   * Every linked Offer and product must be available (an active row of its
   * provider; a product is a Brand Profile record of kind `offering`). While
   * a provider is not running, the links an opportunity already has are kept
   * as they are, and a new one is refused.
   */
  assertCrmOpportunityLinks(payload, current) {
    const offers = this.links.offers();
    if (offers) {
      for (const offerId of payload.offerIds) {
        const offer = offers.get(offerId);
        if (!offer || offer.archivedAt) throw new Error("CRM opportunity references an unavailable Offer");
      }
    } else if (payload.offerIds.some((id) => !current?.offerIds.includes(id))) throw new Error("Offers is not available: start it before linking an Offer");
    const brand = this.links.brand();
    if (brand) {
      for (const productId of payload.productIds) {
        const product = brand.record(productId);
        if (!product || product.archivedAt || product.kind !== "offering") throw new Error("CRM opportunity references an unavailable product");
      }
    } else if (payload.productIds.some((id) => !current?.productIds.includes(id))) throw new Error("Brand Profile is not available: start it before linking a product");
  }
  /** The Offers and products whose name contains `query` (active or archived), from their providers. */
  catalogMatches(query) {
    const needle = query.toLocaleLowerCase();
    const named = (items) => [...new Set(items.filter((item) => item.name.toLocaleLowerCase().includes(needle)).map((item) => item.id))];
    const offers = this.links.offers();
    const brand = this.links.brand();
    return {
      offerIds: offers ? named([false, true].flatMap((archived) => offers.list({ query, archived, limit: 500 }).items)) : [],
      productIds: brand ? named([false, true].flatMap((archived) => brand.records({ query, archived }))) : []
    };
  }
  replaceCrmOpportunityLinks(opportunityId, payload) {
    this.db.prepare("DELETE FROM crm_opportunity_offers WHERE opportunity_id = ?").run(opportunityId);
    this.db.prepare("DELETE FROM crm_opportunity_products WHERE opportunity_id = ?").run(opportunityId);
    const insertOffer = this.db.prepare("INSERT INTO crm_opportunity_offers (opportunity_id, offer_id, position) VALUES (?, ?, ?)");
    payload.offerIds.forEach((offerId, position) => insertOffer.run(opportunityId, offerId, position));
    const insertProduct = this.db.prepare("INSERT INTO crm_opportunity_products (opportunity_id, product_id, position) VALUES (?, ?, ?)");
    payload.productIds.forEach((productId, position) => insertProduct.run(opportunityId, productId, position));
  }
  listCrmOpportunities(input = {}) {
    const where = [input.archived ? "o.archived_at IS NOT NULL" : "o.archived_at IS NULL"];
    const values = [];
    if (input.stage) {
      if (!crmOpportunityStages.has(input.stage)) throw new Error("Unsupported CRM opportunity stage");
      where.push("o.stage = ?");
      values.push(input.stage);
    }
    if (input.customerId) {
      where.push("o.customer_id = ?");
      values.push(input.customerId);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      const matches = this.catalogMatches(input.query.trim());
      const linked = [
        ...matches.offerIds.length ? [`EXISTS (SELECT 1 FROM crm_opportunity_offers link WHERE link.opportunity_id = o.id AND link.offer_id IN (${matches.offerIds.map(() => "?").join(", ")}))`] : [],
        ...matches.productIds.length ? [`EXISTS (SELECT 1 FROM crm_opportunity_products link WHERE link.opportunity_id = o.id AND link.product_id IN (${matches.productIds.map(() => "?").join(", ")}))`] : []
      ];
      where.push(`(${["o.name LIKE ?", "c.name LIKE ?", "o.payload_json LIKE ?", ...linked].join(" OR ")})`);
      values.push(pattern, pattern, pattern, ...matches.offerIds, ...matches.productIds);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`
      SELECT o.*, c.name AS customer_name
      FROM crm_opportunities o JOIN crm_customers c ON c.id = o.customer_id
      WHERE ${where.join(" AND ")} ORDER BY o.updated_at DESC, o.id LIMIT ?
    `).all(...values, limit);
    const facets = { new: 0, discussion: 0, proposal: 0, won: 0, lost: 0 };
    for (const row of this.db.prepare("SELECT stage, COUNT(*) AS total FROM crm_opportunities WHERE archived_at IS NULL GROUP BY stage").all()) facets[row.stage] = Number(row.total);
    const openTasks = this.openTaskCounts().opportunities;
    const names = this.catalogNames();
    return { items: rows.map((row) => this.toCrmOpportunitySummary({ ...row, open_task_count: openTasks.get(row.id) ?? 0 }, names)), total: rows.length, facets };
  }
  getCrmOpportunity(id) {
    const row = this.db.prepare(`
      SELECT o.*, c.name AS customer_name
      FROM crm_opportunities o JOIN crm_customers c ON c.id = o.customer_id WHERE o.id = ?
    `).get(id);
    if (!row) return null;
    return {
      ...this.toCrmOpportunitySummary({ ...row, open_task_count: this.openTaskCounts().opportunities.get(id) ?? 0 }),
      interactions: this.listCrmInteractions({ opportunityId: id, limit: 200 }),
      tasks: this.listCrmTasks(row.customer_id, id)
    };
  }
  createCrmOpportunity(input) {
    const payload = normalizeCrmOpportunityInput(input);
    const customer = this.getCrmCustomer(payload.customerId);
    if (!customer || customer.archivedAt) throw new Error("CRM opportunity requires an active customer");
    this.assertCrmOpportunityLinks(payload);
    const id = randomUUID();
    const timestamp = now();
    const closedAt = ["won", "lost"].includes(payload.stage) ? timestamp : null;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO crm_opportunities (id, customer_id, name, offer_id, stage, payload_json, revision, closed_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)").run(id, payload.customerId, payload.name, payload.offerIds[0] ?? null, payload.stage, JSON.stringify(payload), closedAt, timestamp, timestamp);
      this.replaceCrmOpportunityLinks(id, payload);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    if (payload.stage === "won" && customer.stage !== "customer") this.transitionCrmCustomer(customer.id, "customer", customer.revision);
    this.events.addEvent({ level: "success", eventType: "crm.opportunity.created", title: "CRM opportunity created", detail: `${payload.name} \xB7 ${customer.name}` });
    return this.getCrmOpportunity(id);
  }
  updateCrmOpportunity(id, input, expectedRevision) {
    const current = this.getCrmOpportunity(id);
    if (!current) throw new Error("CRM opportunity not found");
    if (current.archivedAt) throw new Error("Restore the CRM opportunity before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM opportunity changed since it was opened");
    const payload = normalizeCrmOpportunityInput({ ...current, ...input, stage: current.stage, lostReason: current.lostReason });
    const customer = this.getCrmCustomer(payload.customerId);
    if (!customer || customer.archivedAt) throw new Error("CRM opportunity requires an active customer");
    this.assertCrmOpportunityLinks(payload, current);
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE crm_opportunities SET customer_id = ?, name = ?, offer_id = ?, payload_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.customerId, payload.name, payload.offerIds[0] ?? null, JSON.stringify(payload), timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("CRM opportunity changed since it was opened");
      this.replaceCrmOpportunityLinks(id, payload);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "crm.opportunity.updated", title: "CRM opportunity updated", detail: payload.name });
    return this.getCrmOpportunity(id);
  }
  transitionCrmOpportunity(id, stage, expectedRevision, lostReason = "") {
    if (!crmOpportunityStages.has(stage)) throw new Error("Unsupported CRM opportunity stage");
    const current = this.getCrmOpportunity(id);
    if (!current) throw new Error("CRM opportunity not found");
    if (current.archivedAt) throw new Error("Restore the CRM opportunity before changing stage");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM opportunity changed since it was opened");
    if (current.stage === stage) throw new Error(`CRM opportunity is already ${stage}`);
    const payload = normalizeCrmOpportunityInput({ ...current, stage, lostReason: stage === "lost" ? lostReason : "" });
    const timestamp = now();
    const closedAt = ["won", "lost"].includes(stage) ? timestamp : null;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE crm_opportunities SET stage = ?, payload_json = ?, closed_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(stage, JSON.stringify(payload), closedAt, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("CRM opportunity changed since it was opened");
      const customer = this.getCrmCustomer(current.customerId);
      if (stage === "won" && customer && !customer.archivedAt && customer.stage !== "customer") {
        const customerPayload = normalizeCrmCustomerInput({ ...customer, stage: "customer" });
        this.db.prepare("UPDATE crm_customers SET stage = 'customer', payload_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(JSON.stringify(customerPayload), timestamp, customer.id, customer.revision);
      }
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    this.events.addEvent({ level: "success", eventType: "crm.opportunity.transitioned", title: "CRM opportunity stage updated", detail: `${current.name} \xB7 ${stage}` });
    return this.getCrmOpportunity(id);
  }
  archiveCrmOpportunity(id, expectedRevision, restore = false) {
    const current = this.getCrmOpportunity(id);
    if (!current) throw new Error("CRM opportunity not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM opportunity changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("CRM opportunity archive state changed since it was opened");
    if (restore) {
      const customer = this.getCrmCustomer(current.customerId);
      if (!customer || customer.archivedAt) throw new Error("Restore the CRM customer before restoring this opportunity");
    }
    const timestamp = now();
    const changed = this.db.prepare("UPDATE crm_opportunities SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("CRM opportunity changed since it was opened");
    this.events.addEvent({ level: "success", eventType: restore ? "crm.opportunity.restored" : "crm.opportunity.archived", title: restore ? "CRM opportunity restored" : "CRM opportunity archived", detail: current.name });
    return this.getCrmOpportunity(id);
  }
  listCrmInteractions(input = {}) {
    const where = [input.archived ? "i.archived_at IS NOT NULL" : "i.archived_at IS NULL"];
    const values = [];
    if (input.customerId) {
      where.push("i.customer_id = ?");
      values.push(input.customerId);
    }
    if (input.opportunityId) {
      where.push("i.opportunity_id = ?");
      values.push(input.opportunityId);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT i.*, c.name AS customer_name, o.name AS opportunity_name FROM crm_interactions i JOIN crm_customers c ON c.id = i.customer_id LEFT JOIN crm_opportunities o ON o.id = i.opportunity_id WHERE ${where.join(" AND ")} ORDER BY i.occurred_at DESC, i.id LIMIT ?`).all(...values, limit);
    return rows.map((row) => this.toCrmInteraction(row));
  }
  getCrmInteraction(id) {
    const row = this.db.prepare("SELECT i.*, c.name AS customer_name, o.name AS opportunity_name FROM crm_interactions i JOIN crm_customers c ON c.id = i.customer_id LEFT JOIN crm_opportunities o ON o.id = i.opportunity_id WHERE i.id = ?").get(id);
    return row ? this.toCrmInteraction(row) : null;
  }
  assertCrmInteractionRelations(input) {
    const customer = this.getCrmCustomer(input.customerId);
    if (!customer || customer.archivedAt) throw new Error("CRM interaction requires an active customer");
    if (!input.opportunityId) return;
    const opportunity = this.getCrmOpportunity(input.opportunityId);
    if (!opportunity || opportunity.archivedAt || opportunity.customerId !== input.customerId) throw new Error("CRM interaction opportunity must belong to the same active customer");
  }
  createCrmInteraction(input) {
    const payload = normalizeCrmInteractionInput(input);
    this.assertCrmInteractionRelations(payload);
    const id = randomUUID();
    const timestamp = now();
    this.db.prepare("INSERT INTO crm_interactions (id, customer_id, opportunity_id, kind, occurred_at, summary, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)").run(id, payload.customerId, payload.opportunityId, payload.kind, payload.occurredAt, payload.summary, timestamp, timestamp);
    this.db.prepare("UPDATE crm_customers SET updated_at = ? WHERE id = ?").run(timestamp, payload.customerId);
    this.events.addEvent({ level: "success", eventType: "crm.interaction.created", title: "CRM interaction recorded", detail: payload.summary.slice(0, 160) });
    return this.getCrmInteraction(id);
  }
  updateCrmInteraction(id, input, expectedRevision) {
    const current = this.getCrmInteraction(id);
    if (!current) throw new Error("CRM interaction not found");
    if (current.archivedAt) throw new Error("Restore the CRM interaction before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM interaction changed since it was opened");
    const payload = normalizeCrmInteractionInput({ ...current, ...input });
    this.assertCrmInteractionRelations(payload);
    const timestamp = now();
    const changed = this.db.prepare("UPDATE crm_interactions SET customer_id = ?, opportunity_id = ?, kind = ?, occurred_at = ?, summary = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.customerId, payload.opportunityId, payload.kind, payload.occurredAt, payload.summary, timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("CRM interaction changed since it was opened");
    this.events.addEvent({ level: "success", eventType: "crm.interaction.updated", title: "CRM interaction updated", detail: payload.summary.slice(0, 160) });
    return this.getCrmInteraction(id);
  }
  archiveCrmInteraction(id, expectedRevision, restore = false) {
    const current = this.getCrmInteraction(id);
    if (!current) throw new Error("CRM interaction not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("CRM interaction changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("CRM interaction archive state changed since it was opened");
    const timestamp = now();
    const changed = this.db.prepare("UPDATE crm_interactions SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, timestamp, id, expectedRevision);
    if (!changed.changes) throw new Error("CRM interaction changed since it was opened");
    this.events.addEvent({ level: "success", eventType: restore ? "crm.interaction.restored" : "crm.interaction.archived", title: restore ? "CRM interaction restored" : "CRM interaction archived", detail: current.summary.slice(0, 160) });
    return this.getCrmInteraction(id);
  }
  /** A customer's (or one of its opportunities') follow-up tasks, open ones first, soonest due first. */
  listCrmTasks(customerId, opportunityId) {
    const done = (task) => task.status === "done" ? 1 : 0;
    return this.tasks.findTasks({ sourceType: "crm", limit: 1e4 }).filter((task) => {
      const source = task.source;
      return task.status !== "archived" && source.crmCustomerId === customerId && (!opportunityId || source.crmOpportunityId === opportunityId);
    }).sort((left, right) => done(left) - done(right) || (left.dueAt ?? "").localeCompare(right.dueAt ?? "") || right.updatedAt.localeCompare(left.updatedAt)).slice(0, 200);
  }
  createCrmTask(input) {
    const customerId = boundedText(input.customerId, "CRM customer ID", 80, true);
    const opportunityId = input.opportunityId ? boundedText(input.opportunityId, "CRM opportunity ID", 80, true) : null;
    const customer = this.getCrmCustomer(customerId);
    if (!customer || customer.archivedAt) throw new Error("CRM task requires an active customer");
    if (opportunityId) {
      const opportunity = this.getCrmOpportunity(opportunityId);
      if (!opportunity || opportunity.archivedAt || opportunity.customerId !== customerId) throw new Error("CRM task opportunity must belong to the same active customer");
    }
    const title = boundedText(input.title, "CRM task title", 180, true);
    const description = boundedText(input.description, "CRM task description", 4e3);
    const priority = String(input.priority ?? "medium");
    if (!["high", "medium", "low"].includes(priority)) throw new Error("Unsupported CRM task priority");
    const dueAt = input.dueAt ? boundedText(input.dueAt, "CRM task due date", 40, true) : null;
    if (dueAt && !Number.isFinite(Date.parse(dueAt))) throw new Error("CRM task due date is invalid");
    const source = { type: "crm", referenceId: null, label: "Mini CRM", evidence: [], affectedGroups: ["sales", "customer-support"], crmCustomerId: customerId, crmOpportunityId: opportunityId ?? void 0 };
    const task = this.tasks.createTask({ title, description, priority, dueAt, source });
    this.events.addEvent({ level: "success", eventType: "crm.task.created", title: "CRM follow-up task created", detail: `${title} \xB7 ${customer.name}` });
    return task;
  }
  getCrmOverview() {
    const facets = this.listCrmCustomers({ limit: 1 }).facets;
    const total = Object.values(facets).reduce((sum, value) => sum + value, 0);
    const opportunityRows = this.db.prepare("SELECT stage, json_extract(payload_json, '$.amount') AS amount, json_extract(payload_json, '$.currency') AS currency FROM crm_opportunities WHERE archived_at IS NULL").all();
    const openRows = opportunityRows.filter((row) => !["won", "lost"].includes(row.stage));
    const currency = openRows.find((row) => row.currency)?.currency ?? "VND";
    const pipelineAmount = openRows.filter((row) => (row.currency ?? "VND") === currency).reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
    const nowValue = now();
    const dueTasks = this.tasks.findTasks({ sourceType: "crm", open: true, withDue: true, limit: 8 });
    const overdueTaskCount = this.tasks.findTasks({ sourceType: "crm", open: true, dueBefore: nowValue, limit: 1e4 }).length;
    return {
      customers: { total, ...facets },
      opportunities: { open: openRows.length, won: opportunityRows.filter((row) => row.stage === "won").length, lost: opportunityRows.filter((row) => row.stage === "lost").length, pipelineAmount, currency },
      overdueTaskCount,
      dueTasks,
      recentInteractions: this.listCrmInteractions({ limit: 8 })
    };
  }
};

// src/mini-apps/crm/server/repository.ts
var OFFERS_CATALOG = { name: "offers.catalog", range: "^1.0" };
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.1" };
function createCrmRepository(sdk) {
  return new CrmStore(sdk.db, {
    tasks: {
      createTask: (...args) => sdk.tasks.createTask(...args),
      findTasks: (...args) => sdk.tasks.findTasks(...args)
    },
    events: { addEvent: (input) => sdk.events.addEvent(input) },
    offers: () => sdk.miniApps.use(OFFERS_CATALOG.name, OFFERS_CATALOG.range),
    brand: () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range)
  });
}

// src/mini-apps/crm/server/routes.ts
function createCrmRouter(store, router) {
  router.get("/api/crm/overview", (_request, response, next) => {
    try {
      response.json(store.getCrmOverview());
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/crm/customers", (request, response, next) => {
    try {
      const stage = String(request.query.stage ?? "");
      response.json(store.listCrmCustomers({ query: String(request.query.q ?? ""), stage, archived: request.query.archived === "1", limit: Number(request.query.limit ?? 200) }));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/crm/customers/:id", (request, response, next) => {
    try {
      const customer = store.getCrmCustomer(request.params.id);
      if (!customer) return response.status(404).json({ error: "CRM customer not found" });
      response.json(customer);
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/customers", (request, response, next) => {
    try {
      response.status(201).json(store.createCrmCustomer(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/crm/customers/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateCrmCustomer(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/customers/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionCrmCustomer(request.params.id, request.body?.stage, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/customers/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveCrmCustomer(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/customers/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveCrmCustomer(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/crm/opportunities", (request, response, next) => {
    try {
      const stage = String(request.query.stage ?? "");
      response.json(store.listCrmOpportunities({ query: String(request.query.q ?? ""), stage, customerId: request.query.customerId ? String(request.query.customerId) : void 0, archived: request.query.archived === "1", limit: Number(request.query.limit ?? 200) }));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/crm/opportunities/:id", (request, response, next) => {
    try {
      const opportunity = store.getCrmOpportunity(request.params.id);
      if (!opportunity) return response.status(404).json({ error: "CRM opportunity not found" });
      response.json(opportunity);
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/opportunities", (request, response, next) => {
    try {
      response.status(201).json(store.createCrmOpportunity(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/crm/opportunities/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateCrmOpportunity(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/opportunities/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionCrmOpportunity(request.params.id, request.body?.stage, request.body?.revision, request.body?.lostReason));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/opportunities/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveCrmOpportunity(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/opportunities/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveCrmOpportunity(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/interactions", (request, response, next) => {
    try {
      response.status(201).json(store.createCrmInteraction(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/crm/interactions/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateCrmInteraction(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/interactions/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveCrmInteraction(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/interactions/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveCrmInteraction(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/crm/tasks", (request, response, next) => {
    try {
      response.status(201).json(store.createCrmTask(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/crm/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createCrmRepository(sdk);
    const customers = {
      get: (id) => repository.getCrmCustomer(id),
      list: (filter) => repository.listCrmCustomers(filter)
    };
    return {
      router: createCrmRouter(repository, sdk.router()),
      exports: { "crm.customers": customers }
    };
  }
});
export {
  index_default as default
};
