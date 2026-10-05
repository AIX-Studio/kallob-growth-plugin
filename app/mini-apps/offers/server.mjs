import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/offers/manifest.ts
var manifest = {
  id: "offers",
  version: "1.2.0",
  requiresCore: ">=2.0.0 <3",
  exports: { "offers.catalog": "1.0" }
};

// src/mini-apps/offers/release-notes.json
var release_notes_default = [
  {
    version: "1.2.0",
    vi: "Ch\u1EA1y tr\xEAn Growth Studio 0.21: \u0111\u01B0\u1EE3c c\xE0i c\xF9ng l\xFAc khi Growth Studio c\u1EADp nh\u1EADt, kh\xF4ng ph\u1EA3i ch\u1EDD t\u1EA3i th\xEAm.",
    en: "Runs on Growth Studio 0.21: installed together with Growth Studio updates, with no extra download afterwards."
  },
  {
    version: "1.1.0",
    vi: "Offers gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Offers is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/offers/server/store.ts
import { randomUUID } from "node:crypto";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var offerTextLimits = {
  name: 200,
  summary: 4e3,
  functionalResult: 4e3,
  emotionalResult: 4e3,
  socialResult: 4e3,
  timeToResult: 2e3,
  effortRequired: 3e3,
  content: 12e4
};
function normalizeOfferInput(input) {
  const normalized = {};
  for (const [field, limit] of Object.entries(offerTextLimits)) {
    const raw = input[field];
    if (raw !== void 0 && typeof raw !== "string") throw new Error(`Offer field ${field} must be text`);
    const value = String(raw ?? "").trim();
    if (value.length > limit) throw new Error(`Offer field ${field} exceeds ${limit} characters`);
    Object.assign(normalized, { [field]: value });
  }
  if (!normalized.name) throw new Error("Offer name is required");
  return normalized;
}
function offerText(value) {
  return typeof value === "string" ? value.trim() : "";
}
function legacyOfferMarkdown(payload) {
  const sections = [
    ["Offer in one sentence", offerText(payload.summary)],
    ["Customer", offerText(payload.buyer)],
    ["Problem", offerText(payload.problem)],
    ["Desired outcome", offerText(payload.desiredOutcome)],
    ["Mechanism", offerText(payload.mechanism)],
    ["What the customer receives", offerText(payload.deliverables)],
    ["Price and purchase", offerText(payload.pricePurchase)],
    ["Buying occasions", offerText(payload.buyingOccasions)],
    ["Obstacles before purchase", offerText(payload.obstaclesBefore)],
    ["Obstacles during use", offerText(payload.obstaclesDuring)],
    ["Obstacles after delivery", offerText(payload.obstaclesAfter)],
    ["Why they should believe", offerText(payload.perceivedLikelihood)],
    ["Fulfillment", offerText(payload.fulfillment)],
    ["Bonuses", offerText(payload.bonuses)],
    ["Objections", offerText(payload.objections)],
    ["Guarantee", offerText(payload.guarantee)],
    ["Urgency", offerText(payload.urgency)],
    ["Constraints", offerText(payload.constraints)],
    ["Eligibility", offerText(payload.eligibility)],
    ["Call to action", offerText(payload.cta)],
    ["Purchase URL", offerText(payload.url)],
    ["Internal notes", offerText(payload.notes)]
  ];
  const options = Array.isArray(payload.options) ? payload.options.flatMap((option, index) => {
    if (!option || typeof option !== "object") return [];
    const item = option;
    const name = offerText(item.name) || `Package ${index + 1}`;
    const details = [offerText(item.price), offerText(item.description)].filter(Boolean).join("\n\n");
    return details ? [[`Package: ${name}`, details]] : [];
  }) : [];
  return [...sections, ...options].filter(([, body]) => body).map(([title, body]) => `## ${title}

${body}`).join("\n\n");
}
function migrateOfferPayload(encoded) {
  let payload = {};
  try {
    payload = JSON.parse(encoded);
  } catch {
  }
  return normalizeOfferInput({
    name: offerText(payload.name) || "Untitled Offer",
    summary: offerText(payload.summary),
    functionalResult: offerText(payload.functionalResult) || offerText(payload.functionalValue),
    emotionalResult: offerText(payload.emotionalResult) || offerText(payload.emotionalValue),
    socialResult: offerText(payload.socialResult) || offerText(payload.socialValue),
    timeToResult: offerText(payload.timeToResult) || offerText(payload.timeToValue),
    effortRequired: offerText(payload.effortRequired) || offerText(payload.effortSacrifice),
    content: offerText(payload.content) || legacyOfferMarkdown(payload)
  });
}
var OffersStore = class {
  constructor(db, tasks) {
    this.db = db;
    this.tasks = tasks;
  }
  db;
  tasks;
  toOfferSummary(row, payload) {
    const input = payload ?? migrateOfferPayload(row.payload_json);
    return {
      ...input,
      id: row.id,
      status: row.status,
      revision: Number(row.revision),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archivedAt: row.archived_at
    };
  }
  listOffers(input = {}) {
    const where = [input.archived ? "archived_at IS NOT NULL" : "archived_at IS NULL"];
    const values = [];
    if (input.status) {
      if (!["active", "disabled"].includes(input.status)) throw new Error("Unsupported Offer status");
      where.push("status = ?");
      values.push(input.status);
    }
    if (input.query?.trim()) {
      where.push("(name LIKE ? OR payload_json LIKE ?)");
      const pattern = `%${input.query.trim()}%`;
      values.push(pattern, pattern);
    }
    const limit = Math.max(1, Math.min(Number(input.limit ?? 200), 500));
    const rows = this.db.prepare(`SELECT * FROM offers WHERE ${where.join(" AND ")} ORDER BY updated_at DESC, id LIMIT ?`).all(...values, limit);
    const facets = { active: 0, disabled: 0 };
    for (const row of this.db.prepare("SELECT status, count(*) AS total FROM offers WHERE archived_at IS NULL GROUP BY status").all()) facets[row.status] = Number(row.total);
    return {
      items: rows.map((row) => this.toOfferSummary(row)),
      total: rows.length,
      facets
    };
  }
  getOffer(id, revision) {
    const current = this.db.prepare("SELECT * FROM offers WHERE id = ?").get(id);
    if (!current) return null;
    let selected = current;
    let payload = migrateOfferPayload(current.payload_json);
    if (revision !== void 0) {
      const version = this.db.prepare("SELECT revision, payload_json, status, action, created_at FROM offer_versions WHERE offer_id = ? AND revision = ?").get(id, revision);
      if (!version) return null;
      selected = {
        ...current,
        payload_json: version.payload_json,
        status: version.status,
        revision: version.revision,
        updated_at: version.created_at
      };
      payload = migrateOfferPayload(version.payload_json);
    }
    const versions = this.db.prepare("SELECT revision, status, action, created_at FROM offer_versions WHERE offer_id = ? ORDER BY revision DESC").all(id).map((version) => ({
      revision: Number(version.revision),
      status: version.status,
      action: version.action,
      createdAt: version.created_at
    }));
    return {
      ...this.toOfferSummary(selected, payload),
      currentRevision: Number(current.revision),
      isHistorical: Number(selected.revision) !== Number(current.revision),
      versions
    };
  }
  createOffer(input) {
    const payload = normalizeOfferInput(input);
    const id = randomUUID();
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO offers (id, name, payload_json, status, revision, created_at, updated_at) VALUES (?, ?, ?, 'disabled', 1, ?, ?)").run(id, payload.name, encoded, timestamp, timestamp);
      this.db.prepare("INSERT INTO offer_versions (offer_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'disabled', 'create', ?)").run(id, encoded, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getOffer(id);
  }
  updateOffer(id, input, expectedRevision) {
    const current = this.getOffer(id);
    if (!current) throw new Error("Offer not found");
    if (current.archivedAt) throw new Error("Archived Offers must be restored before editing");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Offer changed since it was opened");
    const payload = normalizeOfferInput(input);
    const revision = current.revision + 1;
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE offers SET name = ?, payload_json = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(payload.name, encoded, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Offer changed since it was opened");
      this.db.prepare("INSERT INTO offer_versions (offer_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(id, revision, encoded, current.status, "update", timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getOffer(id);
  }
  transitionOffer(id, status, expectedRevision) {
    if (!["active", "disabled"].includes(status)) throw new Error("Unsupported Offer status");
    const current = this.getOffer(id);
    if (!current) throw new Error("Offer not found");
    if (current.archivedAt) throw new Error("Archived Offers must be restored before changing status");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Offer changed since it was opened");
    if (current.status === status) throw new Error(`Offer is already ${status}`);
    const revision = current.revision + 1;
    const timestamp = now();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE offers SET status = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL").run(status, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Offer changed since it was opened");
      this.db.prepare("INSERT INTO offer_versions (offer_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(id, revision, JSON.stringify(this.offerPayload(current)), status, `transition:${status}`, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getOffer(id);
  }
  duplicateOffer(id) {
    const current = this.getOffer(id);
    if (!current) throw new Error("Offer not found");
    const payload = this.offerPayload(current);
    payload.name = `${payload.name} \u2014 B\u1EA3n sao`;
    return this.createOffer(payload);
  }
  archiveOffer(id, expectedRevision, restore = false) {
    const current = this.getOffer(id);
    if (!current) throw new Error("Offer not found");
    if (expectedRevision === void 0 || current.revision !== expectedRevision) throw new Error("Offer changed since it was opened");
    if (restore ? !current.archivedAt : Boolean(current.archivedAt)) throw new Error("Offer archive state changed since it was opened");
    const revision = current.revision + 1;
    const timestamp = now();
    const action = restore ? "restore" : "archive";
    const nextStatus = restore ? current.status : "disabled";
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const changed = this.db.prepare("UPDATE offers SET archived_at = ?, status = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?").run(restore ? null : timestamp, nextStatus, revision, timestamp, id, expectedRevision);
      if (!changed.changes) throw new Error("Offer changed since it was opened");
      this.db.prepare("INSERT INTO offer_versions (offer_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(id, revision, JSON.stringify(this.offerPayload(current)), nextStatus, action, timestamp);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getOffer(id);
  }
  offerPayload(offer) {
    const payload = {};
    for (const field of Object.keys(offerTextLimits)) Object.assign(payload, { [field]: offer[field] });
    return payload;
  }
  /**
   * Codex's Offer Engine result for a task: a new Offer (linked to the task)
   * or a revision of the one it already made. The Offer and the task change in
   * one transaction (the SDK's tasks share this database connection).
   */
  applyOfferEngineResult(taskId, input) {
    const currentTask = this.tasks.getTask(taskId);
    if (!currentTask || currentTask.source.type !== "offer-engine") throw new Error("Offer Engine result references an invalid task");
    const payload = normalizeOfferInput(input);
    const linkedId = currentTask.source.offerId;
    const linkedOffer = linkedId ? this.getOffer(linkedId) : null;
    if (linkedId && !linkedOffer) throw new Error("Offer Engine task references a missing Offer");
    if (linkedOffer) {
      const currentPayload = this.offerPayload(linkedOffer);
      const updated = JSON.stringify(currentPayload) !== JSON.stringify(payload);
      const offer = updated ? this.updateOffer(linkedOffer.id, payload, linkedOffer.currentRevision) : linkedOffer;
      const latestTask = this.tasks.getTask(taskId);
      const task2 = latestTask.status === "done" && !latestTask.lastError ? latestTask : this.tasks.updateTask(taskId, { status: "done", lastError: null }, latestTask.revision);
      return { task: task2, offer, created: false, updated };
    }
    const offerId = randomUUID();
    const timestamp = now();
    const encoded = JSON.stringify(payload);
    let task;
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("INSERT INTO offers (id, name, payload_json, status, revision, created_at, updated_at) VALUES (?, ?, ?, 'disabled', 1, ?, ?)").run(offerId, payload.name, encoded, timestamp, timestamp);
      this.db.prepare("INSERT INTO offer_versions (offer_id, revision, payload_json, status, action, created_at) VALUES (?, 1, ?, 'disabled', 'engine:create', ?)").run(offerId, encoded, timestamp);
      task = this.tasks.updateTask(taskId, { status: "done", lastError: null, source: { ...currentTask.source, offerId } }, currentTask.revision);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      if (error instanceof Error && /changed since/.test(error.message)) throw new Error("Offer Engine task changed before its result was imported");
      throw error;
    }
    return { task, offer: this.getOffer(offerId), created: true, updated: false };
  }
};

// src/mini-apps/offers/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS offers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'disabled')),
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE INDEX IF NOT EXISTS offers_status_updated_idx ON offers(archived_at, status, updated_at DESC);
      CREATE TABLE IF NOT EXISTS offer_versions (
        offer_id TEXT NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL,
        action TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY(offer_id, revision)
      );
      CREATE INDEX IF NOT EXISTS offer_versions_offer_idx ON offer_versions(offer_id, revision DESC);
    `);
    migrateOffersSchema(db);
  }
};
function migrateOffersSchema(db) {
  const table = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'offers'").get();
  if (table?.sql?.includes("'disabled'")) return;
  const offers = db.prepare("SELECT * FROM offers").all();
  const versions = db.prepare("SELECT offer_id, revision, payload_json, status, action, created_at FROM offer_versions ORDER BY offer_id, revision").all();
  db.exec("PRAGMA foreign_keys = OFF; BEGIN IMMEDIATE;");
  try {
    db.exec(`
      CREATE TABLE offers_next (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'disabled')),
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        archived_at TEXT
      );
      CREATE TABLE offer_versions_next (
        offer_id TEXT NOT NULL REFERENCES offers_next(id) ON DELETE CASCADE,
        revision INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        status TEXT NOT NULL,
        action TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY(offer_id, revision)
      );
    `);
    const insertOffer = db.prepare("INSERT INTO offers_next (id, name, payload_json, status, revision, created_at, updated_at, archived_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    for (const row of offers) {
      const payload = migrateOfferPayload(row.payload_json);
      const status = row.status === "active" ? "active" : "disabled";
      insertOffer.run(row.id, payload.name, JSON.stringify(payload), status, row.revision, row.created_at, row.updated_at, row.archived_at);
    }
    const insertVersion = db.prepare("INSERT INTO offer_versions_next (offer_id, revision, payload_json, status, action, created_at) VALUES (?, ?, ?, ?, ?, ?)");
    for (const version of versions) {
      const status = version.status === "active" ? "active" : "disabled";
      insertVersion.run(version.offer_id, version.revision, JSON.stringify(migrateOfferPayload(version.payload_json)), status, version.action, version.created_at);
    }
    db.exec(`
      DROP TABLE offer_versions;
      DROP TABLE offers;
      ALTER TABLE offers_next RENAME TO offers;
      ALTER TABLE offer_versions_next RENAME TO offer_versions;
      CREATE INDEX offers_status_updated_idx ON offers(archived_at, status, updated_at DESC);
      CREATE INDEX offer_versions_offer_idx ON offer_versions(offer_id, revision DESC);
      COMMIT;
      PRAGMA foreign_keys = ON;
    `);
  } catch (error) {
    db.exec("ROLLBACK; PRAGMA foreign_keys = ON;");
    throw error;
  }
}

// src/mini-apps/offers/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/offers/server/repository.ts
function createOffersRepository(sdk) {
  return Object.assign(new OffersStore(sdk.db, sdk.tasks), {
    createTask: (...args) => sdk.tasks.createTask(...args),
    getTask: (id) => sdk.tasks.getTask(id),
    updateTask: (...args) => sdk.tasks.updateTask(...args),
    addEvent: (input) => sdk.events.addEvent(input)
  });
}

// src/mini-apps/offers/server/routes.ts
function createOffersRouter({ service, store, port, router }) {
  router.get("/api/offers", (request, response, next) => {
    void (async () => {
      const status = String(request.query.status ?? "");
      if (status && !["active", "disabled"].includes(status)) throw new Error("Unsupported Offer status");
      response.json(
        await service.listOffers({
          query: String(request.query.q ?? ""),
          status,
          archived: request.query.archived === "1",
          limit: Number(request.query.limit ?? 200)
        })
      );
    })().catch(next);
  });
  router.post("/api/offer-engine", async (request, response, next) => {
    try {
      const sourceUrl = `http://127.0.0.1:${port}/mini-apps/offers`;
      response.status(201).json(await service.startOfferEngine({ name: request.body?.name, intent: request.body?.intent }, sourceUrl));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/offers/:id", (request, response, next) => {
    try {
      const revision = request.query.revision === void 0 ? void 0 : Number(request.query.revision);
      if (revision !== void 0 && (!Number.isInteger(revision) || revision < 1)) throw new Error("Offer revision must be a positive integer");
      const offer = store.getOffer(request.params.id, revision);
      if (!offer) return response.status(404).json({ error: "Offer not found" });
      response.json(offer);
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/offers", (request, response, next) => {
    try {
      response.status(201).json(store.createOffer(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/offers/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(store.updateOffer(request.params.id, input, revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/offers/:id/transition", (request, response, next) => {
    try {
      response.json(store.transitionOffer(request.params.id, request.body?.status, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/offers/:id/duplicate", (request, response, next) => {
    try {
      response.status(201).json(store.duplicateOffer(request.params.id));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/offers/:id/archive", (request, response, next) => {
    try {
      response.json(store.archiveOffer(request.params.id, request.body?.revision));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/offers/:id/restore", (request, response, next) => {
    try {
      response.json(store.archiveOffer(request.params.id, request.body?.revision, true));
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/offers/server/task-kind.ts
var text = (value) => String(value ?? "").trim();
function offerEngineTaskKind(repository, prompts) {
  return {
    type: "offer-engine",
    result: {
      envelope: "offer",
      // The import saves the Offer and closes the task itself.
      afterImport: "keep",
      apply({ task, envelope, result }) {
        const offer = envelope ?? {};
        const imported = repository.applyOfferEngineResult(task.id, {
          name: text(offer.name),
          summary: text(offer.summary),
          functionalResult: text(offer.functionalResult),
          emotionalResult: text(offer.emotionalResult),
          socialResult: text(offer.socialResult),
          timeToResult: text(offer.timeToResult),
          effortRequired: text(offer.effortRequired),
          content: result.content
        });
        if (imported.created || imported.updated) {
          repository.addEvent({
            level: "success",
            eventType: imported.created ? "offer.engine.imported" : "offer.engine.revised",
            title: imported.created ? "Offer Engine result saved" : "Offer Engine revision saved",
            detail: `${imported.offer.name} \xB7 v${imported.offer.revision}`
          });
        }
      },
      revisionNote: async () => (await prompts.application("offers-management", "result-revision-note", {})).text
    }
  };
}

// src/mini-apps/offers/server/service.ts
import fs from "node:fs/promises";
import path from "node:path";
var OffersService = class {
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
  async startOfferEngine(input, sourceUrl) {
    const name = String(input?.name ?? "").trim();
    const intent = String(input?.intent ?? "").trim();
    if (!name || name.length > 200) throw new Error("Offer name is required and must stay under 200 characters");
    if (!intent || intent.length > 4e3) throw new Error("Describe the initial Offer outcome in no more than 4000 characters");
    const parsedSource = new URL(sourceUrl);
    if (parsedSource.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(parsedSource.hostname)) throw new Error("Offer Engine source must be the local Growth Studio");
    await this.prompts.assertApplication("offers-management");
    const task = this.store.createTask({
      title: `Thi\u1EBFt k\u1EBF Offer \xB7 ${name}`.slice(0, 180),
      description: intent,
      priority: "medium",
      source: {
        type: "offer-engine",
        referenceId: null,
        label: "Offer Engine \xB7 Codex",
        evidence: [],
        affectedGroups: ["marketing"],
        initialOfferName: name,
        initialIntent: intent
      }
    });
    const resultDirectory = path.join(this.projectRoot, ".growth-studio", "task-results");
    const resultPath = path.join(resultDirectory, `${task.id}.json`);
    const temporaryResultPath = `${resultPath}.tmp`;
    await fs.mkdir(resultDirectory, { recursive: true });
    void (async () => {
      try {
        const prompt = await this.prompts.application("offers-management", "engine-start", {
          sourceUrl,
          initialName: name,
          initialIntent: intent,
          temporaryResultPathJson: temporaryResultPath,
          resultPathJson: resultPath,
          taskIdJson: task.id
        });
        const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${task.id}`, `Growth Studio \xB7 Offer \xB7 ${name}`, prompt.text + this.codex.studioChannel(task.id), this.projectRoot);
        const latest = this.store.getTask(task.id);
        if (!latest) return;
        this.store.updateTask(
          task.id,
          {
            status: "active",
            codexThreadId: receipt.threadId,
            codexMessageId: receipt.messageId,
            codexAssignedAt: receipt.queuedAt,
            lastError: null
          },
          latest.revision
        );
        this.store.addEvent({
          level: "success",
          eventType: "offer.engine.started",
          title: "Offer Engine opened in Codex",
          detail: `${name} \xB7 ${receipt.threadId} \xB7 Kallob Cloud prompt v${prompt.version}`
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not start Offer Engine in Codex";
        const latest = this.store.getTask(task.id);
        if (latest) this.store.updateTask(task.id, { lastError: message }, latest.revision);
        this.store.addEvent({
          level: "failed",
          eventType: "offer.engine.failed",
          title: "Could not start Offer Engine",
          detail: message
        });
      }
    })();
    return { task };
  }
  async listOffers(input = {}) {
    await this.reconcileResults();
    return this.store.listOffers(input);
  }
};

// src/mini-apps/offers/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const repository = createOffersRepository(sdk);
    const service = new OffersService(repository, sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.reconcileResults);
    const catalog = {
      list: (filter) => repository.listOffers(filter),
      get: (id, revision) => repository.getOffer(id, revision)
    };
    return {
      router: createOffersRouter({ service, store: repository, port: sdk.port, router: sdk.router() }),
      exports: { "offers.catalog": catalog },
      taskKinds: [offerEngineTaskKind(repository, sdk.prompts)]
    };
  }
});
export {
  index_default as default
};
