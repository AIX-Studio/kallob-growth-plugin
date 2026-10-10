import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/funnel-studio/manifest.ts
var manifest = {
  id: "funnel-studio",
  version: "1.2.1",
  // App results, external actions, policies and secrets through the SDK (core 2.13.0, spec 046); gift emails go out
  // through the shared Gmail mailbox, `sdk.connections.email` (core 2.17.0, spec 047 phase 3); its Sites tasks use
  // the `network` dispatch option (core 2.5.0).
  // 1.2.0 (spec 048): gift emails first through Gmail in ChatGPT/Codex (`gmail` route codex-plugin, core 2.20.0).
  requiresCore: ">=2.20.0 <3",
  entitlement: "funnel-studio",
  exports: { "funnel-studio.funnels": "1.0" },
  connections: { gmail: { range: "^1.0", operations: ["list", "send-email"] } },
  // The gift can be picked from the Library (spec 047 phase 5): read only.
  uses: { "library.assets": { range: "^1.0", operations: ["read"] } }
};

// src/mini-apps/funnel-studio/release-notes.json
var release_notes_default = [
  {
    version: "1.2.1",
    vi: "Trang \u0111\xEDch do AI vi\u1EBFt d\xF9ng c\xF9ng m\u1ED9t c\xE1ch ch\u1EA1y prompt c\xF3 c\u1EA5u tr\xFAc nh\u01B0 c\xE1c mini-app kh\xE1c; c\xE1ch d\xF9ng v\xE0 k\u1EBFt qu\u1EA3 kh\xF4ng \u0111\u1ED5i.",
    en: "The AI-written landing page runs on the same structured prompt runner as the other mini-apps; how it works and what you get are unchanged."
  },
  {
    version: "1.2.0",
    vi: "T\u1EA1o ph\u1EC5u ch\u1EC9 c\u1EA7n \u0111\u1EB7t t\xEAn v\xE0 ch\u1ECDn lo\u1EA1i: thu kh\xE1ch ti\u1EC1m n\u0103ng, \u0111\u0103ng k\xFD s\u1EF1 ki\u1EC7n ho\u1EB7c b\xE1n h\xE0ng. Sau \u0111\xF3 b\u1EA1n ch\u1ECDn m\u1EABu h\xE0nh tr\xECnh, th\xEAm, b\u1EDBt, \u0111\u1ED5i th\u1EE9 t\u1EF1 c\xE1c b\u01B0\u1EDBc r\u1ED3i m\u1EDBi nh\u1EDD Codex d\u1EF1ng n\u1ED9i dung cho \u0111\xFAng b\u1EA3n nh\xE1p \u0111\xF3; ph\u1EC5u ch\u1EC9 t\u1EA1o phi\xEAn b\u1EA3n khi h\xE0nh tr\xECnh v\xE0 n\u1ED9i dung \u0111\xE3 xong. Ph\u1EA7n Thi\u1EBFt l\u1EADp c\xF3 ki\u1EC3m tra nhanh (ch\u1EC9 \u0111\u1ECDc) ChatGPT Sites v\xE0 Gmail qua Codex. Email t\u1EB7ng qu\xE0 gi\u1EDD g\u1EEDi tr\u01B0\u1EDBc b\u1EB1ng Gmail b\u1EA1n \u0111\xE3 k\u1EBFt n\u1ED1i trong ChatGPT/Codex; ch\u1EC9 khi l\u1EA7n \u0111\xF3 b\xE1o l\u1ED7i r\xF5 r\xE0ng m\u1EDBi g\u1EEDi qua Gmail (Composio), kh\xF4ng bao gi\u1EDD g\u1EEDi hai l\u1EA7n, v\xE0 email ch\u01B0a r\xF5 \u0111\xE3 g\u1EEDi hay ch\u01B0a th\xEC kh\xF4ng t\u1EF1 g\u1EEDi l\u1EA1i. L\u01B0\u1EE3t \u0111\u0103ng k\xFD tr\xEAn Site \u0111\u01B0\u1EE3c k\xE9o v\u1EC1 m\u1ED7i 5 ph\xFAt. C\u1EA7n Growth Studio 0.41.0.",
    en: "Creating a funnel takes only a name and a type: lead generation, event registration or sales. Then you pick a journey template, add, remove and reorder steps, and only then ask Codex to build the content into that same draft; a version can be made once the journey and content are done. Settings has quick read-only checks of ChatGPT Sites and Gmail through Codex. Gift emails now go out first through the Gmail you connected in ChatGPT/Codex; only after that clearly fails do they go through Gmail (Composio), never twice, and an email whose outcome is unclear is never sent again on its own. Site submissions are pulled in every 5 minutes. Needs Growth Studio 0.41.0."
  },
  {
    version: "1.1.0",
    vi: "Email t\u1EB7ng qu\xE0 gi\u1EDD g\u1EEDi qua Gmail d\xF9ng chung c\u1EE7a Growth Studio (K\u1EBFt n\u1ED1i \u2192 Composio \u2192 Gmail): Funnel Studio kh\xF4ng t\u1EF1 gi\u1EEF k\u1EBFt n\u1ED1i Gmail n\u1EEFa, m\u1ED7i email v\u1EABn \u0111i qua Gi\u1EDBi h\u1EA1n h\xE0nh \u0111\u1ED9ng b\xEAn ngo\xE0i v\xE0 c\xF3 bi\xEAn nh\u1EADn. Ph\u1EA7n c\xE0i \u0111\u1EB7t g\u1EEDi hi\u1EC7n r\xF5 h\u1ED9p th\u01B0 \u0111ang d\xF9ng, v\xE0 ch\u1EC9 ch\u1ED7 k\u1EBFt n\u1ED1i Gmail khi ch\u01B0a c\xF3. M\xF3n qu\xE0 gi\u1EDD c\xF3 th\u1EC3 ch\u1ECDn th\u1EB3ng t\u1EEB Th\u01B0 vi\u1EC7n (n\xFAt \u201CCh\u1ECDn qu\xE0 t\u1EEB Th\u01B0 vi\u1EC7n\u201D khi t\u1EA1o ph\u1EC5u). C\u1EA7n Growth Studio 0.38.0.",
    en: "Gift emails now go out through Growth Studio's shared Gmail (Connections \u2192 Composio \u2192 Gmail): Funnel Studio no longer holds its own Gmail connection, and every email still passes the external action limits and gets a receipt. The delivery settings show which mailbox is used, and where to connect Gmail when none is. The gift can now be picked straight from the Library (\u201CChoose the gift from Library\u201D when building a funnel). Needs Growth Studio 0.38.0."
  },
  {
    version: "1.0.0",
    vi: "Mini-app Funnel Studio: vi\u1EBFt m\u1ED9t c\xE2u m\xF4 t\u1EA3 m\xF3n qu\xE0, Codex d\u1EF1ng landing page t\u1EB7ng qu\xE0 (ti\xEAu \u0111\u1EC1, l\u1EE3i \xEDch, c\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p, bi\u1EC3u m\u1EABu c\xF3 \u0111\u1ED3ng \xFD, trang c\u1EA3m \u01A1n), b\u1EA1n xem v\xE0 s\u1EEDa, t\u1EA1o phi\xEAn b\u1EA3n r\u1ED3i \u0111\u01B0a l\xEAn Internet b\u1EB1ng ChatGPT Sites. L\u01B0\u1EE3t \u0111\u0103ng k\xFD tr\xEAn Site \u0111\u01B0\u1EE3c k\xE9o v\u1EC1 Growth Studio m\u1ED7i ph\xFAt v\xE0 m\u1ED7i ng\u01B0\u1EDDi \u0111\xE3 \u0111\u1ED3ng \xFD nh\u1EADn m\u1ED9t email t\u1EB7ng qu\xE0 qua Gmail \u0111\xE3 k\u1EBFt n\u1ED1i.",
    en: "The Funnel Studio mini-app: describe the gift in one sentence and Codex builds a gift landing page (headline, benefits, FAQ, consented form, thank-you step); you review and edit it, create a release and publish it with ChatGPT Sites. Submissions on the Site come back to Growth Studio every minute and each consented person gets one gift email through the connected Gmail."
  }
];

// src/mini-apps/sdk/structured-prompt.ts
function defineStructuredPrompt(definition) {
  if (!/^[a-z0-9-]+\.[a-z0-9-]+$/.test(definition.id)) throw new Error(`Structured prompt id must look like app.purpose: ${definition.id}`);
  if (!Number.isInteger(definition.version) || definition.version < 1) throw new Error(`${definition.id} needs a positive integer version`);
  if (!/^[a-z0-9-]{2,80}$/.test(definition.purpose)) throw new Error(`${definition.id} needs a prompt purpose (content/prompts/<purpose>.md)`);
  return {
    id: definition.id,
    version: definition.version,
    purpose: definition.purpose,
    async run(runtime, input) {
      const prompt = (await runtime.render(definition.purpose, definition.values(input))).replace(/\n{3,}/g, "\n\n");
      const raw = await runtime.runner({ prompt, schema: definition.jsonSchema, label: `${definition.label} (${definition.id} v${definition.version})`, timeoutMs: definition.timeoutMs });
      const parsed = definition.output.safeParse(raw);
      if (!parsed.success) throw new Error(`${definition.label} returned an unexpected shape: ${parsed.error.issues.slice(0, 3).map((issue) => `${issue.path.join(".") || "output"} ${issue.message}`).join("; ")}`);
      return { output: parsed.data, madeBy: { id: definition.id, version: definition.version } };
    }
  };
}
function structuredPromptRuntime(sdk) {
  const key = sdk.manifest.entitlement ?? sdk.manifest.application ?? sdk.manifest.id;
  return {
    runner: sdk.codexStructured,
    render: async (purpose, values) => (await sdk.prompts.application(key, purpose, values)).text
  };
}

// src/mini-apps/funnel-studio/server/email-delivery.ts
function renderEmailTemplate(template, funnel, submission) {
  return template.replaceAll("{{name}}", submission.name).replaceAll("{{gift_title}}", funnel.giftTitle).replaceAll("{{gift_url}}", funnel.giftUrl);
}
var usable = (account) => account.status === "active" && account.can["send-email"] !== false;
var short = (account) => account ? { id: account.id, name: account.name } : null;
var FunnelEmailDelivery = class {
  constructor(repository, connections, cancel) {
    this.repository = repository;
    this.connections = connections;
    this.cancel = cancel;
  }
  repository;
  connections;
  cancel;
  /** The mailbox emails go out from first, and the Composio fallback. */
  async mailboxes() {
    const accounts = (await this.connections.list("gmail")).filter(usable);
    const codex = accounts.find((account) => account.route === "codex-plugin");
    const composio = accounts.find((account) => account.route === "composio");
    return { primary: short(codex ?? composio), fallback: codex ? short(composio) : null };
  }
  message(funnel, submission) {
    return {
      message: { to: submission.email, subject: renderEmailTemplate(funnel.emailSubject, funnel, submission), text: renderEmailTemplate(funnel.emailBody, funnel, submission) },
      record: { recordType: "gift-email", recordId: submission.id, recordRevision: 1, operation: "send_gift_email", targetUrl: funnel.publicUrl }
    };
  }
  /** Queues one email for each consented submission still waiting; returns the mailboxes it found. */
  async queuePending() {
    const mailboxes = await this.mailboxes();
    if (!mailboxes.primary) return mailboxes;
    for (const submission of this.repository.pendingEmailDeliveries()) {
      const funnel = this.repository.get(submission.funnelId);
      if (!funnel || !funnel.publicUrl || funnel.status === "archived") continue;
      try {
        const { message, record } = this.message(funnel, submission);
        const action = await this.connections.email.send(mailboxes.primary.id, message, record);
        this.repository.attachEmailAction(submission.id, action.id);
      } catch (error) {
        this.repository.updateEmailDelivery(submission.id, "failed", error instanceof Error ? error.message : String(error));
      }
    }
    return mailboxes;
  }
  /**
   * After a definite failure of the Codex Gmail send: queue the same email through the Composio mailbox and make it
   * the submission's current action. False when there is no fallback (or the record moved on meanwhile).
   */
  async fallback(failed) {
    const { fallback } = await this.mailboxes();
    const submission = this.repository.getSubmission(failed.recordId);
    const funnel = submission ? this.repository.get(submission.funnelId) : null;
    if (!fallback || !submission || !funnel?.publicUrl || funnel.status === "archived") return false;
    if (!this.repository.isCurrentEmailAction(submission.id, failed.id)) return false;
    const { message, record } = this.message(funnel, submission);
    const action = await this.connections.email.send(fallback.id, message, { ...record, actor: "funnel-studio fallback" });
    if (this.repository.replaceEmailAction(submission.id, failed.id, action.id)) return true;
    this.cancel?.(action.id, "L\u1EA7n g\u1EEDi hi\u1EC7n h\xE0nh \u0111\xE3 thay \u0111\u1ED5i tr\u01B0\u1EDBc khi Composio d\u1EF1 ph\xF2ng \u0111\u01B0\u1EE3c g\u1EAFn v\xE0o");
    return false;
  }
};

// src/mini-apps/funnel-studio/server/repository.ts
import { randomUUID } from "node:crypto";
var parseDraft = (value) => {
  const draft = JSON.parse(value);
  const giftTitle = typeof draft.giftTitle === "string" ? draft.giftTitle : "M\xF3n qu\xE0 c\u1EE7a b\u1EA1n";
  const kind = ["lead", "event", "sales"].includes(draft.kind ?? "") ? draft.kind : "lead";
  const journey = draft.journey && Array.isArray(draft.journey.steps) ? draft.journey : { templateId: null, brief: "", steps: [] };
  return {
    ...draft,
    kind,
    journey,
    zaloQrImageUrl: typeof draft.zaloQrImageUrl === "string" ? draft.zaloQrImageUrl : "",
    facebookUrl: typeof draft.facebookUrl === "string" ? draft.facebookUrl : "",
    emailSubject: typeof draft.emailSubject === "string" && draft.emailSubject.trim() ? draft.emailSubject : `M\xF3n qu\xE0 c\u1EE7a b\u1EA1n: ${giftTitle}`,
    emailBody: typeof draft.emailBody === "string" && draft.emailBody.trim() ? draft.emailBody : "Ch\xE0o {{name}},\n\nC\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u0103ng k\xFD nh\u1EADn {{gift_title}}. B\u1EA1n c\xF3 th\u1EC3 m\u1EDF t\xE0i li\u1EC7u t\u1EA1i \u0111\xE2y:\n{{gift_url}}\n\nN\u1EBFu c\u1EA7n h\u1ED7 tr\u1EE3, h\xE3y qu\xE9t m\xE3 Zalo tr\xEAn trang c\u1EA3m \u01A1n."
  };
};
var mapFunnel = (row) => ({
  ...parseDraft(row.draft_json),
  id: row.id,
  goal: parseDraft(row.draft_json).kind,
  status: row.status,
  revision: row.revision,
  publishedVersion: row.published_version,
  liveVersion: row.live_version,
  publicUrl: row.public_url,
  visits: row.visits,
  conversions: row.conversions,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  archivedAt: row.archived_at
});
var mapRelease = (row) => ({
  id: row.id,
  funnelId: row.funnel_id,
  version: row.version,
  snapshot: parseDraft(row.snapshot_json),
  createdAt: row.published_at,
  deploymentStatus: row.deployment_status ?? null,
  publicUrl: row.public_url ?? null,
  deployedAt: row.deployed_at ?? null
});
var mapSubmission = (row) => ({
  id: row.id,
  funnelId: row.funnel_id,
  name: row.name,
  email: row.email,
  consent: row.consent,
  source: row.source,
  receivedAt: row.received_at,
  emailStatus: row.email_status ?? "pending",
  emailSentAt: row.email_sent_at ?? null,
  emailError: row.email_error ?? null
});
var mapGeneration = (row) => ({
  id: row.id,
  brief: row.brief,
  taskId: row.task_id,
  funnelId: row.funnel_id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  completedAt: row.completed_at ?? null,
  channels: (() => {
    try {
      const value = JSON.parse(row.channels_json || "{}");
      return {
        zaloQrImageUrl: typeof value.zaloQrImageUrl === "string" ? value.zaloQrImageUrl : "",
        facebookUrl: typeof value.facebookUrl === "string" ? value.facebookUrl : ""
      };
    } catch {
      return { zaloQrImageUrl: "", facebookUrl: "" };
    }
  })()
});
var mapDeployment = (row) => ({
  id: row.id,
  funnelId: row.funnel_id,
  releaseId: row.release_id,
  taskId: row.task_id,
  status: row.status,
  publicUrl: row.public_url,
  sitesProjectId: row.sites_project_id,
  sitesVersionId: row.sites_version_id,
  syncUrl: row.sync_url,
  syncCursor: row.sync_cursor,
  lastSyncedAt: row.last_synced_at,
  lastSyncError: row.last_sync_error,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});
var mapIntegrationCheck = (row) => ({
  provider: row.provider,
  status: row.status,
  taskId: row.task_id,
  detail: row.detail,
  identity: row.identity,
  checkedAt: row.checked_at,
  updatedAt: row.updated_at
});
var FunnelStudioRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  listIntegrationChecks() {
    const rows = this.db.prepare("SELECT * FROM funnel_studio_integration_checks ORDER BY provider").all();
    return rows.map(mapIntegrationCheck);
  }
  getIntegrationCheck(provider) {
    const row = this.db.prepare("SELECT * FROM funnel_studio_integration_checks WHERE provider = ?").get(provider);
    return row ? mapIntegrationCheck(row) : null;
  }
  startIntegrationCheck(provider, taskId) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(`
      INSERT INTO funnel_studio_integration_checks
        (provider, status, task_id, detail, identity, checked_at, updated_at)
      VALUES (?, 'running', ?, NULL, NULL, NULL, ?)
      ON CONFLICT(provider) DO UPDATE SET
        status = 'running', task_id = excluded.task_id, detail = NULL,
        identity = NULL, checked_at = NULL, updated_at = excluded.updated_at
    `).run(provider, taskId, now);
    return this.getIntegrationCheck(provider);
  }
  completeIntegrationCheck(provider, result) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const updated = this.db.prepare(`
      UPDATE funnel_studio_integration_checks
      SET status = ?, detail = ?, identity = ?, checked_at = ?, updated_at = ?
      WHERE provider = ? AND status = 'running'
    `).run(
      result.ok ? "passed" : "failed",
      result.detail.slice(0, 1e3),
      result.identity?.slice(0, 300) || null,
      now,
      now,
      provider
    );
    if (!updated.changes) throw new Error("Integration check is no longer running");
    return this.getIntegrationCheck(provider);
  }
  list(includeArchived = false) {
    const rows = this.db.prepare(
      `SELECT f.* FROM funnel_studio_funnels f ${includeArchived ? "" : "WHERE archived_at IS NULL"} ORDER BY updated_at DESC`
    ).all();
    return rows.map(mapFunnel);
  }
  get(id) {
    const row = this.db.prepare("SELECT * FROM funnel_studio_funnels WHERE id = ?").get(id);
    return row ? mapFunnel(row) : null;
  }
  getBySlug(slug) {
    const row = this.db.prepare("SELECT * FROM funnel_studio_funnels WHERE slug = ?").get(slug);
    return row ? mapFunnel(row) : null;
  }
  create(input) {
    const id = randomUUID();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(
      "INSERT INTO funnel_studio_funnels (id, name, slug, draft_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id, input.name, input.slug, JSON.stringify(input), now, now);
    return this.get(id);
  }
  update(id, input, revision) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = this.db.prepare(
      "UPDATE funnel_studio_funnels SET name = ?, slug = ?, draft_json = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? AND archived_at IS NULL"
    ).run(input.name, input.slug, JSON.stringify(input), now, id, revision);
    if (!result.changes) throw new Error("Funnel changed since you opened it");
    return this.get(id);
  }
  updateJourney(id, journey, revision) {
    const funnel = this.get(id);
    if (!funnel) throw new Error("Funnel not found");
    return this.update(id, { ...this.inputFrom(funnel), journey }, revision);
  }
  createRelease(id, revision) {
    const funnel = this.get(id);
    if (!funnel) throw new Error("Funnel not found");
    if (funnel.revision !== revision)
      throw new Error("Funnel changed since you opened it");
    if (funnel.archivedAt)
      throw new Error("Restore this funnel before creating a release");
    const snapshot = this.inputFrom(funnel);
    const latest = funnel.publishedVersion ? this.getRelease(id, funnel.publishedVersion) : null;
    if (latest && JSON.stringify(latest.snapshot) === JSON.stringify(snapshot))
      return { funnel, release: latest };
    const nextVersion = (funnel.publishedVersion ?? 0) + 1;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const releaseId = randomUUID();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare(
        "INSERT INTO funnel_studio_releases (id, funnel_id, version, snapshot_json, published_at) VALUES (?, ?, ?, ?, ?)"
      ).run(releaseId, id, nextVersion, JSON.stringify(snapshot), now);
      this.db.prepare(
        "UPDATE funnel_studio_funnels SET published_version = ?, revision = revision + 1, updated_at = ? WHERE id = ?"
      ).run(nextVersion, now, id);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return {
      funnel: this.get(id),
      release: this.getRelease(id, nextVersion)
    };
  }
  transition(id, status, revision) {
    const archivedAt = status === "archived" ? (/* @__PURE__ */ new Date()).toISOString() : null;
    const result = this.db.prepare(
      "UPDATE funnel_studio_funnels SET status = ?, archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?"
    ).run(status, archivedAt, (/* @__PURE__ */ new Date()).toISOString(), id, revision);
    if (!result.changes) throw new Error("Funnel changed since you opened it");
    return this.get(id);
  }
  listReleases(id) {
    const query = `SELECT r.*, d.status AS deployment_status, d.public_url, CASE WHEN d.status = 'live' THEN d.updated_at END AS deployed_at
      FROM funnel_studio_releases r
      LEFT JOIN funnel_studio_deployments d ON d.id = (
        SELECT d2.id FROM funnel_studio_deployments d2 WHERE d2.release_id = r.id ORDER BY d2.created_at DESC LIMIT 1
      )`;
    const rows = id ? this.db.prepare(`${query} WHERE r.funnel_id = ? ORDER BY r.version DESC`).all(id) : this.db.prepare(`${query} ORDER BY r.published_at DESC`).all();
    return rows.map(mapRelease);
  }
  getRelease(id, version) {
    const row = this.db.prepare(
      "SELECT * FROM funnel_studio_releases WHERE funnel_id = ? AND version = ?"
    ).get(id, version);
    return row ? mapRelease(row) : null;
  }
  getReleaseById(id) {
    const row = this.db.prepare("SELECT * FROM funnel_studio_releases WHERE id = ?").get(id);
    return row ? mapRelease(row) : null;
  }
  createDeployment(input) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(
      "INSERT INTO funnel_studio_deployments (id, funnel_id, release_id, task_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(input.id, input.funnelId, input.releaseId, input.taskId, now, now);
    return this.getDeployment(input.id);
  }
  getDeployment(id) {
    const row = this.db.prepare("SELECT * FROM funnel_studio_deployments WHERE id = ?").get(id);
    return row ? mapDeployment(row) : null;
  }
  latestDeployment(funnelId) {
    const row = this.db.prepare(
      "SELECT * FROM funnel_studio_deployments WHERE funnel_id = ? ORDER BY created_at DESC LIMIT 1"
    ).get(funnelId);
    return row ? mapDeployment(row) : null;
  }
  listDeployments() {
    return this.db.prepare(
      "SELECT * FROM funnel_studio_deployments ORDER BY created_at DESC"
    ).all().map(mapDeployment);
  }
  completeDeployment(id, result) {
    const deployment = this.getDeployment(id);
    if (!deployment) throw new Error("Deployment not found");
    if (deployment.status === "live") {
      if (!deployment.syncUrl) {
        this.db.prepare(
          "UPDATE funnel_studio_deployments SET sync_url = ?, sync_token = ?, last_sync_error = NULL, updated_at = ? WHERE id = ?"
        ).run(result.syncUrl, result.syncToken, (/* @__PURE__ */ new Date()).toISOString(), id);
      }
      return this.getDeployment(id);
    }
    const release = this.getReleaseById(deployment.releaseId);
    if (!release) throw new Error("Release not found");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare(
        "UPDATE funnel_studio_deployments SET status = 'live', public_url = ?, sites_project_id = ?, sites_version_id = ?, sync_url = ?, sync_token = ?, last_sync_error = NULL, updated_at = ? WHERE id = ?"
      ).run(
        result.publicUrl,
        result.sitesProjectId ?? null,
        result.sitesVersionId ?? null,
        result.syncUrl,
        result.syncToken,
        now,
        id
      );
      this.db.prepare(
        "UPDATE funnel_studio_funnels SET status = 'live', live_version = ?, public_url = ?, revision = revision + 1, updated_at = ? WHERE id = ?"
      ).run(release.version, result.publicUrl, now, deployment.funnelId);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return this.getDeployment(id);
  }
  publicRelease(slug) {
    const row = this.db.prepare(
      "SELECT f.* FROM funnel_studio_funnels f JOIN funnel_studio_releases r ON r.funnel_id = f.id AND r.version = f.live_version WHERE f.status = 'live' AND json_extract(r.snapshot_json, '$.slug') = ?"
    ).get(slug);
    if (!row || !row.live_version) return null;
    const funnel = mapFunnel(row);
    return { funnel, release: this.getRelease(funnel.id, row.live_version) };
  }
  recordVisit(id) {
    this.db.prepare(
      "UPDATE funnel_studio_funnels SET visits = visits + 1 WHERE id = ?"
    ).run(id);
  }
  submit(funnelId, input) {
    const existing = this.db.prepare(
      "SELECT * FROM funnel_studio_submissions WHERE funnel_id = ? AND idempotency_key = ?"
    ).get(funnelId, input.idempotencyKey);
    if (existing) return mapSubmission(existing);
    const id = input.id ?? randomUUID();
    const receivedAt = input.receivedAt ?? (/* @__PURE__ */ new Date()).toISOString();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare(
        "INSERT INTO funnel_studio_submissions (id, funnel_id, name, email, consent, source, idempotency_key, received_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).run(
        id,
        funnelId,
        input.name,
        input.email,
        input.consent,
        input.source,
        input.idempotencyKey,
        receivedAt
      );
      this.db.prepare(
        "UPDATE funnel_studio_funnels SET conversions = conversions + 1 WHERE id = ?"
      ).run(funnelId);
      this.db.prepare(
        "INSERT INTO funnel_studio_email_deliveries (submission_id, created_at, updated_at) VALUES (?, ?, ?)"
      ).run(id, receivedAt, receivedAt);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return mapSubmission(
      this.db.prepare("SELECT * FROM funnel_studio_submissions WHERE id = ?").get(id)
    );
  }
  listSubmissions() {
    return this.db.prepare(
      `SELECT s.*, d.status AS email_status, d.sent_at AS email_sent_at, d.last_error AS email_error
           FROM funnel_studio_submissions s
           LEFT JOIN funnel_studio_email_deliveries d ON d.submission_id = s.id
           ORDER BY s.received_at DESC`
    ).all().map(mapSubmission);
  }
  getSubmission(id) {
    const row = this.db.prepare(`SELECT s.*, d.status AS email_status, d.sent_at AS email_sent_at, d.last_error AS email_error
      FROM funnel_studio_submissions s LEFT JOIN funnel_studio_email_deliveries d ON d.submission_id = s.id WHERE s.id = ?`).get(id);
    return row ? mapSubmission(row) : null;
  }
  pendingEmailDeliveries(limit = 100) {
    return this.db.prepare(`SELECT s.*, d.status AS email_status, d.sent_at AS email_sent_at, d.last_error AS email_error
      FROM funnel_studio_submissions s JOIN funnel_studio_email_deliveries d ON d.submission_id = s.id
      WHERE d.status IN ('pending', 'failed') AND d.action_id IS NULL
      ORDER BY s.received_at ASC LIMIT ?`).all(Math.max(1, Math.min(limit, 500))).map(mapSubmission);
  }
  attachEmailAction(submissionId, actionId) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare("UPDATE funnel_studio_email_deliveries SET action_id = ?, status = 'queued', last_error = NULL, updated_at = ? WHERE submission_id = ? AND action_id IS NULL").run(actionId, now, submissionId);
  }
  replaceEmailAction(submissionId, previousActionId, actionId) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = this.db.prepare("UPDATE funnel_studio_email_deliveries SET action_id = ?, status = 'queued', last_error = NULL, updated_at = ? WHERE submission_id = ? AND action_id = ?").run(actionId, now, submissionId, previousActionId);
    return Number(result.changes) === 1;
  }
  isCurrentEmailAction(submissionId, actionId) {
    const row = this.db.prepare("SELECT action_id FROM funnel_studio_email_deliveries WHERE submission_id = ?").get(submissionId);
    return row?.action_id === actionId;
  }
  updateEmailDelivery(submissionId, status, error = null) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare("UPDATE funnel_studio_email_deliveries SET status = ?, sent_at = CASE WHEN ? = 'sent' THEN ? ELSE sent_at END, last_error = ?, updated_at = ? WHERE submission_id = ?").run(status, status, now, error, now, submissionId);
  }
  /** The token now lives in the app's secrets; the row keeps only a marker (spec 046). */
  markSyncTokenSecret(id) {
    this.db.prepare("UPDATE funnel_studio_deployments SET sync_token = '@secret', updated_at = ? WHERE id = ?").run((/* @__PURE__ */ new Date()).toISOString(), id);
  }
  liveSyncSources() {
    return this.db.prepare("SELECT * FROM funnel_studio_deployments WHERE status = 'live' AND sync_url IS NOT NULL AND sync_token IS NOT NULL ORDER BY updated_at DESC").all().map((row) => ({
      deployment: mapDeployment(row),
      token: row.sync_token
    }));
  }
  recordSyncSuccess(deploymentId, cursor, metrics) {
    const deployment = this.getDeployment(deploymentId);
    if (!deployment) throw new Error("Deployment not found");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare("UPDATE funnel_studio_deployments SET sync_cursor = ?, last_synced_at = ?, last_sync_error = NULL, updated_at = ? WHERE id = ?").run(cursor, now, now, deploymentId);
      if (metrics) this.db.prepare("UPDATE funnel_studio_funnels SET visits = ?, conversions = ? WHERE id = ?").run(Math.max(0, metrics.visits), Math.max(0, metrics.conversions), deployment.funnelId);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }
  recordSyncFailure(deploymentId, error) {
    this.db.prepare("UPDATE funnel_studio_deployments SET last_sync_error = ?, updated_at = ? WHERE id = ?").run(error.slice(0, 1e3), (/* @__PURE__ */ new Date()).toISOString(), deploymentId);
  }
  createGenerationRequest(funnelId, brief, taskId, channels, id = randomUUID()) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(
      "INSERT INTO funnel_studio_generation_requests (id, brief, task_id, funnel_id, channels_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).run(id, brief, taskId, funnelId, JSON.stringify(channels), now, now);
    return this.getGenerationRequest(id);
  }
  getGenerationRequest(id) {
    const row = this.db.prepare("SELECT * FROM funnel_studio_generation_requests WHERE id = ?").get(id);
    return row ? mapGeneration(row) : null;
  }
  listGenerationRequests() {
    return this.db.prepare(
      "SELECT * FROM funnel_studio_generation_requests ORDER BY created_at DESC"
    ).all().map(mapGeneration);
  }
  completeGenerationRequest(id) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = this.db.prepare(
      "UPDATE funnel_studio_generation_requests SET completed_at = ?, updated_at = ? WHERE id = ? AND completed_at IS NULL"
    ).run(now, now, id);
    if (!result.changes)
      throw new Error("This generation request was already completed");
    return this.getGenerationRequest(id);
  }
  inputFrom(funnel) {
    const {
      name,
      kind,
      journey,
      slug,
      brand,
      audience,
      headline,
      subheadline,
      cta,
      giftTitle,
      giftDescription,
      giftUrl,
      thankYouHeadline,
      consent,
      zaloQrImageUrl,
      facebookUrl,
      emailSubject,
      emailBody,
      page
    } = funnel;
    return {
      name,
      kind,
      journey,
      slug,
      brand,
      audience,
      headline,
      subheadline,
      cta,
      giftTitle,
      giftDescription,
      giftUrl,
      thankYouHeadline,
      consent,
      zaloQrImageUrl,
      facebookUrl,
      emailSubject,
      emailBody,
      page
    };
  }
};

// src/mini-apps/funnel-studio/server/routes.ts
var escapeHtml = (value) => value.replace(
  /[&<>'"]/g,
  (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]
);
var scriptString = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
function publicPage(service, slug) {
  const published = service.recordVisit(slug);
  if (!published) return null;
  const funnel = published.release.snapshot;
  const page = service.publicView(slug).page;
  const text = (value) => escapeHtml(value);
  const endpoint = `/api/public/funnels/${encodeURIComponent(slug)}/submissions`;
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${text(funnel.headline)}</title><style>
  :root{color-scheme:dark;font-family:Inter,system-ui,sans-serif;background:#08110f;color:#f4f7f6;--accent:${page.theme === "quiet-luxury" ? "#d6b76b" : page.theme === "warm" ? "#ef8f6b" : page.theme === "modern" ? "#7c8cff" : "#36c8b5"}}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 20% 0,color-mix(in srgb,var(--accent) 22%,transparent) 0,transparent 42%),#08110f}.shell{width:min(1080px,100%);margin:auto;padding:28px}header{display:flex;justify-content:space-between;align-items:center;margin-bottom:56px;color:#a8bbb6}.brand{font-weight:800;color:#f4f7f6;font-size:20px}.layout{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:start}.eyebrow{color:var(--accent);font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}h1{font-size:clamp(42px,6vw,70px);line-height:1.02;letter-spacing:-.045em;margin:16px 0 20px}h2{font-size:30px}p{color:#a8bbb6;font-size:18px;line-height:1.65}.gift{border-left:3px solid var(--accent);padding-left:18px;margin-top:30px}.gift strong{display:block;font-size:18px}.gift span{display:block;color:#a8bbb6;margin-top:6px}.panel{background:#111b18;border:1px solid #29403a;border-radius:18px;padding:28px;box-shadow:0 24px 80px #0008}.panel h2{margin:0 0 8px;font-size:24px}.field{display:grid;gap:7px;margin:18px 0}.field label{font-size:13px;font-weight:750;color:#cbd6d3}.field input{width:100%;border:1px solid #355149;border-radius:10px;padding:14px;background:#09110f;color:#fff;font:inherit}.consent{display:flex;gap:10px;align-items:flex-start;color:#a8bbb6;font-size:13px;line-height:1.45;margin:18px 0}.consent input{margin-top:3px}button,.download{width:100%;border:0;border-radius:10px;padding:14px 18px;background:var(--accent);color:#05211d;font-weight:850;font-size:16px;cursor:pointer;text-decoration:none;display:block;text-align:center}.message{min-height:20px;color:#ff9a92;margin-top:12px;font-size:13px}.thankyou{display:none}.thankyou h2{font-size:30px}.thankyou .download{margin-top:22px}.content{padding:76px 0}.benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px}.benefits article,.creator,.faq details{border:1px solid #29403a;border-radius:14px;padding:20px;background:#0d1714}.benefits strong{color:var(--accent);font-size:13px}.creator{margin-top:24px}.faq{display:grid;gap:10px;margin:24px 0 80px}.faq summary{cursor:pointer;font-weight:700}.faq p{font-size:15px;margin-bottom:0}@media(max-width:760px){header{margin-bottom:30px}.layout,.benefits{grid-template-columns:1fr;gap:30px}h1{font-size:44px}.panel{padding:22px}.content{padding:48px 0}}
  .support-qr{display:block;width:min(220px,100%);margin:20px auto 10px;border-radius:14px;background:#fff;padding:10px}.support-note{text-align:center;font-size:14px}.facebook-link{display:block;margin-top:18px;text-align:center;color:var(--accent);font-weight:700;text-decoration:none}
  </style></head><body><div class="shell"><header><span class="brand">${text(funnel.brand)}</span><span>${text(page.eyebrow)}</span></header><main><div class="layout"><section><span class="eyebrow">${text(page.eyebrow)}</span><h1>${text(page.headline)}</h1><p>${text(page.introduction)}</p><div class="gift"><strong>${text(funnel.giftTitle)}</strong><span>${text(funnel.giftDescription)}</span></div></section><section class="panel"><form id="form"><div id="form-copy"><h2>${text(page.formTitle)}</h2><p>${text(page.formDescription)}</p><div class="field"><label for="name">H\u1ECD v\xE0 t\xEAn</label><input id="name" name="name" autocomplete="name" required></div><div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></div><label class="consent"><input name="consent" type="checkbox" required><span>${text(page.consent)}</span></label><button type="submit">${text(page.cta)}</button><div class="message" role="alert"></div></div><div class="thankyou"><span class="eyebrow">\u0110\xE3 \u0111\u0103ng k\xFD th\xE0nh c\xF4ng</span><h2>${text(page.thankYou.headline)}</h2><p>Qu\xE0 s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi t\u1EDBi email c\u1EE7a b\u1EA1n trong v\xF2ng 15 ph\xFAt.</p>${funnel.zaloQrImageUrl ? `<img class="support-qr" src="${text(funnel.zaloQrImageUrl)}" alt="M\xE3 QR k\u1EBFt n\u1ED1i Zalo"><p class="support-note">Qu\xE9t m\xE3 \u0111\u1EC3 k\u1EBFt n\u1ED1i Zalo n\u1EBFu b\u1EA1n c\u1EA7n h\u1ED7 tr\u1EE3.</p>` : ""}${funnel.facebookUrl ? `<a class="facebook-link" href="${text(funnel.facebookUrl)}" target="_blank" rel="noopener noreferrer">Theo d\xF5i ho\u1EB7c tham gia \u0111\u1EC3 nh\u1EADn th\xEAm th\xF4ng tin</a>` : ""}</div></form></section></div><section class="content">${page.benefits.length ? `<h2>${text(page.benefitsTitle)}</h2><div class="benefits">${page.benefits.map((benefit, index) => `<article><strong>0${index + 1}</strong><p>${text(benefit)}</p></article>`).join("")}</div>` : ""}<div class="creator"><span class="eyebrow">NG\u01AF\u1EDCI T\u1EA0O</span><h2>${text(page.creatorTitle)}</h2><p>${text(page.creatorNote)}</p></div>${page.faq.length ? `<h2>C\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p</h2><div class="faq">${page.faq.map((item) => `<details><summary>${text(item.question)}</summary><p>${text(item.answer)}</p></details>`).join("")}</div>` : ""}</section></main></div><script>
  const form=document.querySelector('#form'),copy=document.querySelector('#form-copy'),done=document.querySelector('.thankyou'),message=document.querySelector('.message'),button=form.querySelector('button');let key=crypto.randomUUID();form.addEventListener('submit',async event=>{event.preventDefault();message.textContent='';button.disabled=true;button.textContent='\u0110ang g\u1EEDi\u2026';try{const data=new FormData(form);const response=await fetch(${scriptString(endpoint)},{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:data.get('name'),email:data.get('email'),consent:data.get('consent')==='on',idempotencyKey:key})});const result=await response.json();if(!response.ok)throw new Error(result.error||'Kh\xF4ng th\u1EC3 g\u1EEDi th\xF4ng tin');copy.style.display='none';done.style.display='block'}catch(error){message.textContent=error.message||'C\xF3 l\u1ED7i x\u1EA3y ra';button.disabled=false;button.textContent=${scriptString(page.cta)}}});
  </script></body></html>`;
}
function createFunnelStudioRouter(service, router, scheduler) {
  router.get(
    "/api/funnel-studio/generation-requests",
    (_request, response, next) => {
      try {
        response.json({ items: service.generationRequests() });
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/api/funnel-studio/generation-requests/:id",
    (request, response, next) => {
      try {
        response.json(service.generationRequest(request.params.id));
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    "/api/funnel-studio/generation-requests",
    async (request, response, next) => {
      try {
        response.status(201).json(
          await service.startGeneration(
            String(request.body?.funnelId ?? ""),
            request.body?.brief,
            request.body?.channels ?? {}
          )
        );
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    "/api/funnel-studio/generate-page",
    async (request, response, next) => {
      try {
        response.json(await service.generatePage(request.body ?? {}));
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/api/funnel-studio/funnels",
    (request, response) => response.json({
      items: service.repository.list(request.query.archived === "1")
    })
  );
  router.post("/api/funnel-studio/funnels", (request, response, next) => {
    try {
      response.status(201).json(service.create(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/funnel-studio/funnels/drafts", (request, response, next) => {
    try {
      response.status(201).json(service.createDraft(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/funnel-studio/funnels/:id", (request, response) => {
    const funnel = service.repository.get(request.params.id);
    funnel ? response.json(funnel) : response.status(404).json({ error: "Funnel not found" });
  });
  router.patch("/api/funnel-studio/funnels/:id", (request, response, next) => {
    try {
      const { revision, ...input } = request.body ?? {};
      response.json(service.update(request.params.id, input, Number(revision)));
    } catch (error) {
      next(error);
    }
  });
  router.patch(
    "/api/funnel-studio/funnels/:id/journey",
    (request, response, next) => {
      try {
        const { revision, ...journey } = request.body ?? {};
        response.json(
          service.updateJourney(request.params.id, journey, Number(revision))
        );
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    "/api/funnel-studio/funnels/:id/release",
    (request, response, next) => {
      try {
        response.json(
          service.createRelease(
            request.params.id,
            Number(request.body?.revision)
          )
        );
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    "/api/funnel-studio/funnels/:id/deploy",
    async (request, response, next) => {
      try {
        response.status(202).json(
          await service.startDeployment(request.params.id, {
            revision: Number(request.body?.revision),
            version: request.body?.version ? Number(request.body.version) : void 0
          })
        );
      } catch (error) {
        next(error);
      }
    }
  );
  router.get("/api/funnel-studio/deployments", (_request, response, next) => {
    try {
      response.json({ items: service.deploymentViews() });
    } catch (error) {
      next(error);
    }
  });
  router.post(
    "/api/funnel-studio/funnels/:id/transition",
    (request, response, next) => {
      try {
        const status = String(request.body?.status ?? "");
        if (!["paused", "archived", "draft"].includes(status))
          throw new Error("Unsupported funnel status");
        response.json(
          service.repository.transition(
            request.params.id,
            status,
            Number(request.body?.revision)
          )
        );
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/api/funnel-studio/releases",
    (_request, response) => response.json({ items: service.repository.listReleases() })
  );
  router.get(
    "/api/funnel-studio/submissions",
    (_request, response) => response.json({ items: service.repository.listSubmissions() })
  );
  router.get(
    "/api/funnel-studio/integration-checks",
    (_request, response) => response.json({ items: service.integrationChecks() })
  );
  router.post(
    "/api/funnel-studio/integration-checks/:provider",
    async (request, response, next) => {
      try {
        const provider = String(request.params.provider);
        if (provider !== "sites" && provider !== "gmail")
          throw new Error("K\u1EBFt n\u1ED1i n\xE0y ch\u01B0a \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3");
        response.status(202).json(await service.startIntegrationCheck(provider));
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/api/funnel-studio/sync",
    (_request, response) => response.json(scheduler?.status() ?? { intervalMs: 3e5, running: false, gmailConnected: false, gmailAccount: null, emailDeliveryPrimary: "codex-gmail", composioFallbackConnected: false, lastRunAt: null, nextRunAt: null, lastError: "B\u1ED9 \u0111\u1ED3ng b\u1ED9 ch\u01B0a \u0111\u01B0\u1EE3c kh\u1EDFi \u0111\u1ED9ng", sources: [] })
  );
  router.post("/api/funnel-studio/sync", (_request, response, next) => {
    if (!scheduler) return response.status(503).json({ error: "B\u1ED9 \u0111\u1ED3ng b\u1ED9 ch\u01B0a \u0111\u01B0\u1EE3c kh\u1EDFi \u0111\u1ED9ng" });
    scheduler.tick().then((status) => response.json(status), next);
  });
  router.get("/api/public/funnels/:slug", (request, response) => {
    const funnel = service.publicView(request.params.slug);
    funnel ? response.json(funnel) : response.status(404).json({ error: "Published funnel not found" });
  });
  router.post(
    "/api/public/funnels/:slug/submissions",
    (request, response, next) => {
      try {
        response.status(201).json(
          service.submit(
            request.params.slug,
            request.body ?? {},
            String(request.get("referer") ?? "Tr\u1EF1c ti\u1EBFp")
          )
        );
      } catch (error) {
        next(error);
      }
    }
  );
  router.get("/funnel-studio/f/:slug", (request, response) => {
    const html = publicPage(service, request.params.slug);
    html ? response.type("html").send(html) : response.status(404).type("html").send("<h1>Ph\u1EC5u ch\u01B0a \u0111\u01B0\u1EE3c xu\u1EA5t b\u1EA3n</h1>");
  });
  return router;
}

// src/mini-apps/funnel-studio/server/service.ts
import { createHash, randomUUID as randomUUID2 } from "node:crypto";

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../kallob/kallob-growth-studio/node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema2, params) => {
  return new ZodArray({
    type: schema2,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema2) {
  if (schema2 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema2.shape) {
      const fieldSchema = schema2.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema2._def,
      shape: () => newShape
    });
  } else if (schema2 instanceof ZodArray) {
    return new ZodArray({
      ...schema2._def,
      type: deepPartialify(schema2.element)
    });
  } else if (schema2 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodTuple) {
    return ZodTuple.create(schema2.items.map((item) => deepPartialify(item)));
  } else {
    return schema2;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema2) {
    return this.augment({ [key]: schema2 });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema2 = this._def.items[itemIndex] || this._def.rest;
      if (!schema2)
        return null;
      return schema2._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema2, params) => {
  return new ZodPromise({
    type: schema2,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema2, effect, params) => {
  return new ZodEffects({
    schema: schema2,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema2, params) => {
  return new ZodEffects({
    schema: schema2,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// src/mini-apps/funnel-studio/server/landing-page-writer.ts
var landingPageSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "theme",
    "eyebrow",
    "headline",
    "introduction",
    "benefitsTitle",
    "benefits",
    "creatorTitle",
    "creatorNote",
    "formTitle",
    "formDescription",
    "cta",
    "consent",
    "faq",
    "thankYou"
  ],
  properties: {
    theme: {
      type: "string",
      enum: ["editorial", "quiet-luxury", "modern", "warm"]
    },
    eyebrow: { type: "string", minLength: 1, maxLength: 80 },
    headline: { type: "string", minLength: 1, maxLength: 180 },
    introduction: { type: "string", minLength: 1, maxLength: 600 },
    benefitsTitle: { type: "string", minLength: 1, maxLength: 120 },
    benefits: {
      type: "array",
      minItems: 0,
      maxItems: 6,
      items: { type: "string", minLength: 1, maxLength: 180 }
    },
    creatorTitle: { type: "string", minLength: 1, maxLength: 120 },
    creatorNote: { type: "string", minLength: 1, maxLength: 600 },
    formTitle: { type: "string", minLength: 1, maxLength: 120 },
    formDescription: { type: "string", minLength: 1, maxLength: 300 },
    cta: { type: "string", minLength: 1, maxLength: 80 },
    consent: { type: "string", minLength: 1, maxLength: 500 },
    faq: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "answer"],
        properties: {
          question: { type: "string", minLength: 1, maxLength: 180 },
          answer: { type: "string", minLength: 1, maxLength: 500 }
        }
      }
    },
    thankYou: {
      type: "object",
      additionalProperties: false,
      required: ["headline", "body", "ctaLabel"],
      properties: {
        headline: { type: "string", minLength: 1, maxLength: 180 },
        body: { type: "string", minLength: 1, maxLength: 500 },
        ctaLabel: { type: "string", minLength: 1, maxLength: 80 }
      }
    }
  }
};
var output = external_exports.object({
  theme: external_exports.enum(["editorial", "quiet-luxury", "modern", "warm"]),
  eyebrow: external_exports.string().min(1).max(80),
  headline: external_exports.string().min(1).max(180),
  introduction: external_exports.string().min(1).max(600),
  benefitsTitle: external_exports.string().min(1).max(120),
  benefits: external_exports.array(external_exports.string().min(1).max(180)).max(6),
  creatorTitle: external_exports.string().min(1).max(120),
  creatorNote: external_exports.string().min(1).max(600),
  formTitle: external_exports.string().min(1).max(120),
  formDescription: external_exports.string().min(1).max(300),
  cta: external_exports.string().min(1).max(80),
  consent: external_exports.string().min(1).max(500),
  faq: external_exports.array(external_exports.object({ question: external_exports.string().min(1).max(180), answer: external_exports.string().min(1).max(500) })).min(2).max(5),
  thankYou: external_exports.object({ headline: external_exports.string().min(1).max(180), body: external_exports.string().min(1).max(500), ctaLabel: external_exports.string().min(1).max(80) })
});
var landingPageWriter = defineStructuredPrompt({
  id: "funnel-studio.landing-page-writer",
  version: 1,
  label: "Funnel Studio landing page generation",
  timeoutMs: 4 * 6e4,
  purpose: "landing-page-writer",
  values: (input) => ({ brief: JSON.stringify(input.brief, null, 2) }),
  jsonSchema: landingPageSchema,
  output
});

// src/mini-apps/funnel-studio/server/service.ts
var clean = (value, field, max) => {
  const result = String(value ?? "").trim();
  if (!result) throw new Error(`${field} is required`);
  if (result.length > max)
    throw new Error(`${field} must stay under ${max} characters`);
  return result;
};
var cleanOptional = (value, max) => String(value ?? "").trim().slice(0, max);
var cleanOptionalUrl = (value, field) => {
  const result = cleanOptional(value, 2e3);
  if (!result) return "";
  const url = new URL(result);
  if (url.protocol !== "https:") throw new Error(`${field} ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng https://`);
  return url.toString();
};
var landingPageFrom = (input) => {
  const page = input.page;
  const benefits = (page?.benefits ?? [
    `Hi\u1EC3u r\xF5 v\u1EA5n \u0111\u1EC1 ${input.giftTitle} gi\xFAp b\u1EA1n gi\u1EA3i quy\u1EBFt.`,
    "L\xE0m theo t\u1EEBng b\u01B0\u1EDBc thay v\xEC ph\u1EA3i t\u1EF1 \u0111o\xE1n.",
    "C\xF3 th\u1EC3 \xE1p d\u1EE5ng ngay sau khi nh\u1EADn t\xE0i li\u1EC7u."
  ]).map((item, index) => clean(item, `L\u1EE3i \xEDch ${index + 1}`, 180)).slice(0, 6);
  const faq = (page?.faq ?? [
    { question: "T\xE0i li\u1EC7u n\xE0y ph\xF9 h\u1EE3p v\u1EDBi ai?", answer: input.audience },
    {
      question: "T\xF4i nh\u1EADn t\xE0i li\u1EC7u b\u1EB1ng c\xE1ch n\xE0o?",
      answer: "\u0110i\u1EC1n h\u1ECD t\xEAn, email v\xE0 x\xE1c nh\u1EADn \u0111\u1ED3ng \xFD; t\xE0i li\u1EC7u s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi qua email trong v\xF2ng 15 ph\xFAt."
    }
  ]).map((item, index) => ({
    question: clean(item.question, `C\xE2u h\u1ECFi ${index + 1}`, 180),
    answer: clean(item.answer, `C\xE2u tr\u1EA3 l\u1EDDi ${index + 1}`, 500)
  })).slice(0, 6);
  return {
    theme: ["editorial", "quiet-luxury", "modern", "warm"].includes(
      page?.theme ?? ""
    ) ? page.theme : "editorial",
    eyebrow: cleanOptional(page?.eyebrow, 80) || "T\xC0I LI\u1EC6U MI\u1EC4N PH\xCD",
    headline: clean(page?.headline ?? input.headline, "Ti\xEAu \u0111\u1EC1 ch\xEDnh", 180),
    introduction: clean(
      page?.introduction ?? input.subheadline,
      "L\u1EDDi gi\u1EDBi thi\u1EC7u",
      600
    ),
    benefitsTitle: cleanOptional(page?.benefitsTitle, 120) || "B\u1EA1n s\u1EBD nh\u1EADn \u0111\u01B0\u1EE3c g\xEC?",
    benefits,
    creatorTitle: cleanOptional(page?.creatorTitle, 120) || `\u0110\u01B0\u1EE3c chu\u1EA9n b\u1ECB b\u1EDFi ${input.brand}`,
    creatorNote: cleanOptional(page?.creatorNote, 600) || `${input.brand} t\u1EA1o t\xE0i li\u1EC7u n\xE0y cho ${input.audience.toLowerCase()}.`,
    formTitle: cleanOptional(page?.formTitle, 120) || `Nh\u1EADn ${input.giftTitle}`,
    formDescription: cleanOptional(page?.formDescription, 300) || "\u0110i\u1EC1n th\xF4ng tin \u0111\u1EC3 m\u1EDF \u0111\u01B0\u1EDDng d\u1EABn nh\u1EADn qu\xE0.",
    cta: clean(page?.cta ?? input.cta, "N\xFAt k\xEAu g\u1ECDi h\xE0nh \u0111\u1ED9ng", 80),
    consent: clean(page?.consent ?? input.consent, "N\u1ED9i dung \u0111\u1ED3ng \xFD", 500),
    faq,
    thankYou: {
      headline: clean(
        page?.thankYou?.headline ?? input.thankYouHeadline,
        "L\u1EDDi c\u1EA3m \u01A1n",
        180
      ),
      body: cleanOptional(page?.thankYou?.body, 500) || `${input.giftTitle} s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi qua email trong v\xF2ng 15 ph\xFAt.`,
      ctaLabel: cleanOptional(page?.thankYou?.ctaLabel, 80) || `M\u1EDF ${input.giftTitle}`
    }
  };
};
var FunnelStudioService = class {
  constructor(repository, ai, automation) {
    this.repository = repository;
    this.ai = ai;
    this.automation = automation;
  }
  repository;
  ai;
  automation;
  registerGenerationResult() {
    if (!this.automation) return;
    this.automation.platform.appResults.register({
      purpose: "gift-funnel-draft",
      schema: funnelGenerationResultSchema,
      apply: (task, payload) => this.applyGenerationResult(task, payload),
      nextTaskStatus: "done"
    });
    this.automation.platform.appResults.register({
      purpose: "sites-deployment",
      schema: funnelDeploymentResultSchema,
      apply: (task, payload) => this.applyDeploymentResult(task, payload),
      nextTaskStatus: "done"
    });
    this.automation.platform.appResults.register({
      purpose: "integration-check",
      schema: funnelIntegrationCheckResultSchema,
      apply: (task, payload) => this.applyIntegrationCheckResult(task, payload),
      nextTaskStatus: "done"
    });
    this.automation.platform.externalActions.registerApp({
      isStillApproved: (action) => {
        const submission = this.repository.getSubmission(action.recordId);
        if (!submission) return { ok: false, reason: "L\u01B0\u1EE3t \u0111\u0103ng k\xFD kh\xF4ng c\xF2n t\u1ED3n t\u1EA1i" };
        if (!submission.consent) return { ok: false, reason: "L\u01B0\u1EE3t \u0111\u0103ng k\xFD kh\xF4ng c\xF3 s\u1EF1 \u0111\u1ED3ng \xFD" };
        if (!this.repository.isCurrentEmailAction(action.recordId, action.id))
          return { ok: false, reason: "\u0110\xE2y kh\xF4ng c\xF2n l\xE0 l\u1EA7n g\u1EEDi hi\u1EC7n h\xE0nh" };
        return { ok: true };
      },
      onChanged: (action) => {
        if (action.recordType !== "gift-email") return;
        if (!this.repository.isCurrentEmailAction(action.recordId, action.id)) return;
        if (action.state === "sent" || action.state === "confirmed")
          this.repository.updateEmailDelivery(action.recordId, "sent");
        else if (action.state === "failed" && action.transport === "codex-plugin" && this.automation?.email)
          void this.automation.email.fallback(action).then((replaced) => {
            if (!replaced) this.repository.updateEmailDelivery(action.recordId, "failed", action.failureReason ?? action.note);
          }, (error) => this.repository.updateEmailDelivery(action.recordId, "failed", `Gmail qua ChatGPT/Codex kh\xF4ng g\u1EEDi \u0111\u01B0\u1EE3c; Composio d\u1EF1 ph\xF2ng ch\u01B0a ch\u1EA1y \u0111\u01B0\u1EE3c: ${error instanceof Error ? error.message : String(error)}`));
        else if (action.state === "failed" || action.state === "cancelled")
          this.repository.updateEmailDelivery(action.recordId, "failed", action.failureReason ?? action.note);
        else if (action.state === "uncertain")
          this.repository.updateEmailDelivery(action.recordId, "uncertain", action.failureReason ?? action.note);
      }
    });
  }
  integrationChecks() {
    return this.repository.listIntegrationChecks();
  }
  async startIntegrationCheck(provider) {
    if (!this.automation) throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng \u0111\u1EC3 ki\u1EC3m tra k\u1EBFt n\u1ED1i");
    if (!["sites", "gmail"].includes(provider))
      throw new Error("K\u1EBFt n\u1ED1i n\xE0y ch\u01B0a \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3");
    const current = this.repository.getIntegrationCheck(provider);
    if (current?.status === "running" && current.taskId) {
      const existingTask = this.automation.store.getTask(current.taskId);
      if (existingTask && !["done", "archived"].includes(existingTask.status)) return current;
    }
    const task = this.automation.store.createTask({
      title: provider === "sites" ? "Ki\u1EC3m tra ChatGPT Sites" : "Ki\u1EC3m tra Gmail qua Codex",
      description: provider === "sites" ? "X\xE1c nh\u1EADn Codex c\xF3 th\u1EC3 d\xF9ng plugin Sites m\xE0 kh\xF4ng t\u1EA1o ho\u1EB7c thay \u0111\u1ED5i website." : "X\xE1c nh\u1EADn Codex c\xF3 th\u1EC3 d\xF9ng Gmail m\xE0 kh\xF4ng \u0111\u1ECDc th\u01B0 ho\u1EB7c g\u1EEDi email.",
      priority: "medium",
      source: {
        // The app's own task kind; `resultPurpose` routes growth_app_result_save to its handler (spec 046).
        type: "funnel-studio",
        referenceId: provider,
        label: `Funnel Studio \xB7 ${provider === "sites" ? "ChatGPT Sites" : "Gmail"}`,
        evidence: [],
        affectedGroups: ["marketing"],
        resultPurpose: "integration-check"
      }
    });
    const check = this.repository.startIntegrationCheck(provider, task.id);
    void this.dispatchIntegrationCheck(task.id, provider);
    return check;
  }
  async dispatchIntegrationCheck(taskId, provider) {
    if (!this.automation) return;
    const task = this.automation.store.getTask(taskId);
    if (!task) return;
    try {
      const prompt = await this.automation.render(`integration-check-${provider}`, { taskIdJson: taskId }) + this.automation.kernel.studioChannel(taskId);
      const receipt = await this.automation.codexDesktop.dispatch(
        `growth-studio.task.${taskId}`,
        `Growth Studio \xB7 ${task.title}`,
        prompt,
        this.automation.projectRoot,
        { openOnCreate: false }
      );
      const latest = this.automation.store.getTask(taskId);
      if (latest) this.automation.store.updateTask(taskId, {
        status: "active",
        codexThreadId: receipt.threadId,
        codexMessageId: receipt.messageId,
        codexAssignedAt: receipt.queuedAt,
        lastError: null
      }, latest.revision);
    } catch (error) {
      const latest = this.automation.store.getTask(taskId);
      if (latest) this.automation.store.updateTask(taskId, {
        lastError: error instanceof Error ? error.message : String(error)
      }, latest.revision);
      this.repository.completeIntegrationCheck(provider, {
        ok: false,
        detail: error instanceof Error ? error.message : String(error)
      });
    }
  }
  async startDeployment(funnelId, options) {
    if (!this.automation)
      throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng \u0111\u1EC3 \u0111\u01B0a trang l\xEAn Internet");
    const funnel = this.repository.get(funnelId);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u");
    let release;
    if (options.version) {
      const selected = this.repository.getRelease(funnelId, options.version);
      if (!selected) throw new Error("Kh\xF4ng t\xECm th\u1EA5y phi\xEAn b\u1EA3n \u0111\xE3 ch\u1ECDn");
      release = selected;
    } else {
      release = this.createRelease(
        funnelId,
        Number(options.revision)
      ).release;
    }
    const current = this.repository.latestDeployment(funnelId);
    if (current?.releaseId === release.id && current.status === "live")
      return this.deploymentView(current);
    if (current?.releaseId === release.id && current.status === "queued")
      return this.deploymentView(current);
    const deploymentId = randomUUID2();
    const task = this.automation.store.createTask({
      title: `\u0110\u01B0a \u201C${funnel.name}\u201D l\xEAn Internet \xB7 v${release.version}`,
      description: `Xu\u1EA5t b\u1EA3n phi\xEAn b\u1EA3n v${release.version} c\u1EE7a ph\u1EC5u \u201C${funnel.name}\u201D b\u1EB1ng ChatGPT Sites.`,
      priority: "high",
      source: {
        // The app's own task kind; `resultPurpose` routes growth_app_result_save to its handler (spec 046).
        type: "funnel-studio",
        referenceId: deploymentId,
        label: "Funnel Studio \xB7 ChatGPT Sites",
        evidence: [],
        affectedGroups: ["marketing"],
        resultPurpose: "sites-deployment"
      }
    });
    const deployment = this.repository.createDeployment({
      id: deploymentId,
      funnelId,
      releaseId: release.id,
      taskId: task.id
    });
    void this.dispatchDeployment(task.id, release);
    return this.deploymentView(deployment);
  }
  deploymentViews() {
    return this.repository.listDeployments().map((item) => this.deploymentView(item));
  }
  deploymentView(deployment) {
    if (!this.automation)
      throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng \u0111\u1EC3 \u0111\u01B0a trang l\xEAn Internet");
    const task = this.automation.store.getTask(deployment.taskId);
    if (!task) throw new Error("Kh\xF4ng t\xECm th\u1EA5y Task xu\u1EA5t b\u1EA3n");
    return {
      ...deployment,
      task: this.automation.kernel.withRunning(task),
      funnel: this.repository.get(deployment.funnelId),
      release: this.repository.getReleaseById(deployment.releaseId)
    };
  }
  async startGeneration(funnelId, rawBrief, rawChannels = {}) {
    if (!this.automation)
      throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng cho Funnel Studio");
    const funnel = this.repository.get(funnelId);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u");
    if (!funnel.journey.templateId || funnel.journey.steps.length < 2)
      throw new Error("H\xE3y ch\u1ECDn v\xE0 l\u01B0u h\xE0nh tr\xECnh tr\u01B0\u1EDBc khi giao cho Codex");
    const brief = clean(rawBrief, "Y\xEAu c\u1EA7u", 4e3);
    if (brief.length < 12)
      throw new Error("H\xE3y m\xF4 t\u1EA3 m\xF3n qu\xE0 ho\u1EB7c m\u1EE5c ti\xEAu r\xF5 h\u01A1n m\u1ED9t ch\xFAt");
    const requestId = randomUUID2();
    const channels = {
      zaloQrImageUrl: cleanOptionalUrl(rawChannels.zaloQrImageUrl, "\u1EA2nh QR Zalo"),
      facebookUrl: cleanOptionalUrl(rawChannels.facebookUrl, "Li\xEAn k\u1EBFt Facebook")
    };
    const task = this.automation.store.createTask({
      title: `D\u1EF1ng \u201C${funnel.name}\u201D \xB7 ${brief.replace(/\s+/g, " ").slice(0, 90)}`,
      description: brief,
      priority: "medium",
      source: {
        type: "funnel-studio",
        referenceId: requestId,
        label: "Funnel Studio \xB7 Codex",
        evidence: [],
        affectedGroups: ["marketing"],
        resultPurpose: "gift-funnel-draft"
      }
    });
    const request = this.repository.createGenerationRequest(
      funnel.id,
      brief,
      task.id,
      channels,
      requestId
    );
    void this.dispatchGeneration(task.id, funnel, brief);
    return this.generationRequest(request.id);
  }
  generationRequests() {
    return this.repository.listGenerationRequests().map((item) => this.generationRequest(item.id));
  }
  generationRequest(id) {
    if (!this.automation)
      throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng cho Funnel Studio");
    const request = this.repository.getGenerationRequest(id);
    if (!request) throw new Error("Kh\xF4ng t\xECm th\u1EA5y y\xEAu c\u1EA7u d\u1EF1ng ph\u1EC5u");
    const task = this.automation.store.getTask(request.taskId);
    if (!task) throw new Error("Kh\xF4ng t\xECm th\u1EA5y Task c\u1EE7a y\xEAu c\u1EA7u n\xE0y");
    return {
      ...request,
      task: this.automation.kernel.withRunning(task),
      funnel: request.funnelId ? this.repository.get(request.funnelId) : null
    };
  }
  async dispatchGeneration(taskId, funnel, brief) {
    if (!this.automation) return;
    const task = this.automation.store.getTask(taskId);
    if (!task) return;
    try {
      const prompt = await this.automation.render("gift-funnel-draft", {
        brief,
        taskIdJson: taskId,
        funnelName: funnel.name,
        funnelKind: funnel.kind,
        journey: JSON.stringify(funnel.journey, null, 2),
        funnelNameJson: funnel.name
      }) + this.automation.kernel.studioChannel(taskId);
      const receipt = await this.automation.codexDesktop.dispatch(
        `growth-studio.task.${taskId}`,
        `Growth Studio \xB7 ${task.title}`,
        prompt,
        this.automation.projectRoot,
        { openOnCreate: false }
      );
      const latest = this.automation.store.getTask(taskId);
      if (latest)
        this.automation.store.updateTask(
          taskId,
          {
            status: "active",
            codexThreadId: receipt.threadId,
            codexMessageId: receipt.messageId,
            codexAssignedAt: receipt.queuedAt,
            lastError: null
          },
          latest.revision
        );
    } catch (error) {
      const latest = this.automation.store.getTask(taskId);
      if (latest)
        this.automation.store.updateTask(
          taskId,
          { lastError: error instanceof Error ? error.message : String(error) },
          latest.revision
        );
    }
  }
  async dispatchDeployment(taskId, release) {
    if (!this.automation) return;
    const task = this.automation.store.getTask(taskId);
    if (!task) return;
    try {
      const prompt = await this.automation.render("sites-deployment", {
        version: release.version,
        snapshot: JSON.stringify(release.snapshot, null, 2),
        taskIdJson: taskId
      }) + this.automation.kernel.studioChannel(taskId);
      const receipt = await this.automation.codexDesktop.dispatch(
        `growth-studio.task.${taskId}`,
        `Growth Studio \xB7 ${task.title}`,
        prompt,
        this.automation.projectRoot,
        { openOnCreate: false, network: true }
      );
      const latest = this.automation.store.getTask(taskId);
      if (latest)
        this.automation.store.updateTask(
          taskId,
          {
            status: "active",
            codexThreadId: receipt.threadId,
            codexMessageId: receipt.messageId,
            codexAssignedAt: receipt.queuedAt,
            lastError: null
          },
          latest.revision
        );
    } catch (error) {
      const latest = this.automation.store.getTask(taskId);
      if (latest)
        this.automation.store.updateTask(
          taskId,
          { lastError: error instanceof Error ? error.message : String(error) },
          latest.revision
        );
    }
  }
  applyGenerationResult(task, payload) {
    const requestId = task.source.referenceId;
    if (!requestId) throw new Error("Generation request is missing");
    const request = this.repository.getGenerationRequest(requestId);
    if (!request) throw new Error("Generation request no longer exists");
    if (request.completedAt)
      throw new Error("This generation request already produced a funnel");
    if (!request.funnelId) throw new Error("Generation request has no funnel");
    const current = this.repository.get(request.funnelId);
    if (!current) throw new Error("Funnel no longer exists");
    const input = this.validateInput({
      ...payload,
      name: current.name,
      slug: current.slug,
      kind: current.kind,
      journey: current.journey,
      page: payload.page,
      ...request.channels,
      emailSubject: `M\xF3n qu\xE0 c\u1EE7a b\u1EA1n: ${payload.giftTitle}`,
      emailBody: `Ch\xE0o {{name}},

C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u0103ng k\xFD nh\u1EADn {{gift_title}}. B\u1EA1n c\xF3 th\u1EC3 m\u1EDF t\xE0i li\u1EC7u t\u1EA1i \u0111\xE2y:
{{gift_url}}

N\u1EBFu c\u1EA7n h\u1ED7 tr\u1EE3, h\xE3y qu\xE9t m\xE3 Zalo tr\xEAn trang c\u1EA3m \u01A1n.`
    });
    const funnel = this.repository.update(current.id, input, current.revision);
    this.repository.completeGenerationRequest(request.id);
    return `\u0110\xE3 d\u1EF1ng n\u1ED9i dung cho \u201C${funnel.name}\u201D \u0111\u1EC3 ng\u01B0\u1EDDi d\xF9ng xem v\xE0 ch\u1EC9nh s\u1EEDa.`;
  }
  applyDeploymentResult(task, payload) {
    const deploymentId = task.source.referenceId;
    if (!deploymentId) throw new Error("Deployment request is missing");
    const deployment = this.repository.getDeployment(deploymentId);
    if (!deployment) throw new Error("Deployment request no longer exists");
    const result = this.repository.completeDeployment(deployment.id, payload);
    return `\u0110\xE3 \u0111\u01B0a ph\u1EC5u l\xEAn Internet t\u1EA1i ${result.publicUrl}`;
  }
  applyIntegrationCheckResult(task, payload) {
    const provider = task.source.referenceId;
    if (provider !== "sites" && provider !== "gmail")
      throw new Error("Integration provider is missing");
    if (payload.provider !== provider)
      throw new Error("Integration result does not match the requested provider");
    const result = this.repository.completeIntegrationCheck(provider, payload);
    return result.status === "passed" ? `\u0110\xE3 x\xE1c nh\u1EADn k\u1EBFt n\u1ED1i ${provider === "sites" ? "ChatGPT Sites" : "Gmail"}.` : `K\u1EBFt n\u1ED1i ${provider === "sites" ? "ChatGPT Sites" : "Gmail"} c\u1EA7n \u0111\u01B0\u1EE3c thi\u1EBFt l\u1EADp l\u1EA1i.`;
  }
  uniqueSlug(value) {
    const base = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, (match) => match === "\u0111" ? "d" : "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "pheu-tang-qua";
    let slug = base;
    for (let suffix = 2; this.repository.getBySlug(slug); suffix += 1)
      slug = `${base.slice(0, 54)}-${suffix}`;
    return slug;
  }
  async generatePage(raw) {
    if (!this.ai)
      throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng \u0111\u1EC3 d\u1EF1ng landing page");
    const brief = {
      name: clean(raw.name, "T\xEAn ph\u1EC5u", 160),
      brand: clean(raw.brand, "T\xEAn th\u01B0\u01A1ng hi\u1EC7u", 120),
      audience: clean(raw.audience, "Kh\xE1ch h\xE0ng ph\xF9 h\u1EE3p", 500),
      problem: clean(raw.problem, "V\u1EA5n \u0111\u1EC1", 600),
      outcome: clean(raw.outcome, "K\u1EBFt qu\u1EA3 mong mu\u1ED1n", 600),
      giftTitle: clean(raw.giftTitle, "T\xEAn m\xF3n qu\xE0", 180),
      giftDescription: clean(raw.giftDescription, "M\xF4 t\u1EA3 m\xF3n qu\xE0", 600),
      creatorNote: clean(raw.creatorNote, "Th\xF4ng tin ng\u01B0\u1EDDi t\u1EA1o", 600),
      theme: ["editorial", "quiet-luxury", "modern", "warm"].includes(
        raw.theme ?? ""
      ) ? raw.theme : "editorial",
      consent: clean(raw.consent, "N\u1ED9i dung \u0111\u1ED3ng \xFD", 500)
    };
    const { output: result } = await landingPageWriter.run(this.ai, { brief });
    const compatibility = {
      kind: "lead",
      journey: { templateId: "lead-gift", brief: "B\u1EA3n xem tr\u01B0\u1EDBc", steps: [] },
      name: brief.name,
      slug: "preview",
      brand: brief.brand,
      audience: brief.audience,
      headline: result.headline,
      subheadline: result.introduction,
      cta: result.cta,
      giftTitle: brief.giftTitle,
      giftDescription: brief.giftDescription,
      giftUrl: "https://example.com/preview",
      thankYouHeadline: result.thankYou.headline,
      consent: result.consent,
      zaloQrImageUrl: "",
      facebookUrl: "",
      emailSubject: `M\xF3n qu\xE0 c\u1EE7a b\u1EA1n: ${brief.giftTitle}`,
      emailBody: "Ch\xE0o {{name}},\n\nB\u1EA1n c\xF3 th\u1EC3 nh\u1EADn {{gift_title}} t\u1EA1i \u0111\xE2y:\n{{gift_url}}"
    };
    return landingPageFrom({
      ...compatibility,
      page: { ...result, theme: brief.theme, consent: brief.consent }
    });
  }
  validateInput(raw) {
    const slug = clean(raw.slug, "\u0110\u01B0\u1EDDng d\u1EABn", 80).toLowerCase().replace(/^\/+|\/+$/g, "");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      throw new Error("\u0110\u01B0\u1EDDng d\u1EABn ch\u1EC9 d\xF9ng ch\u1EEF th\u01B0\u1EDDng, s\u1ED1 v\xE0 d\u1EA5u g\u1EA1ch ngang");
    const giftUrl = clean(raw.giftUrl, "\u0110\u01B0\u1EDDng d\u1EABn nh\u1EADn qu\xE0", 2e3);
    const url = new URL(giftUrl);
    if (!["http:", "https:"].includes(url.protocol))
      throw new Error(
        "\u0110\u01B0\u1EDDng d\u1EABn nh\u1EADn qu\xE0 ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng http:// ho\u1EB7c https://"
      );
    const base = {
      kind: ["lead", "event", "sales"].includes(raw.kind) ? raw.kind : "lead",
      journey: this.validateJourney(raw.journey),
      name: clean(raw.name, "T\xEAn ph\u1EC5u", 160),
      slug,
      brand: clean(raw.brand, "T\xEAn th\u01B0\u01A1ng hi\u1EC7u", 120),
      audience: clean(raw.audience, "\u0110\u1ED1i t\u01B0\u1EE3ng", 500),
      headline: clean(raw.headline, "Ti\xEAu \u0111\u1EC1 ch\xEDnh", 180),
      subheadline: clean(raw.subheadline, "M\xF4 t\u1EA3 ng\u1EAFn", 600),
      cta: clean(raw.cta, "N\xFAt k\xEAu g\u1ECDi h\xE0nh \u0111\u1ED9ng", 80),
      giftTitle: clean(raw.giftTitle, "T\xEAn m\xF3n qu\xE0", 180),
      giftDescription: clean(raw.giftDescription, "M\xF4 t\u1EA3 m\xF3n qu\xE0", 600),
      giftUrl,
      thankYouHeadline: clean(raw.thankYouHeadline, "L\u1EDDi c\u1EA3m \u01A1n", 180),
      consent: clean(raw.consent, "N\u1ED9i dung \u0111\u1ED3ng \xFD", 500),
      zaloQrImageUrl: cleanOptionalUrl(raw.zaloQrImageUrl, "\u1EA2nh QR Zalo"),
      facebookUrl: cleanOptionalUrl(raw.facebookUrl, "Li\xEAn k\u1EBFt Facebook"),
      emailSubject: cleanOptional(raw.emailSubject, 180) || `M\xF3n qu\xE0 c\u1EE7a b\u1EA1n: ${clean(raw.giftTitle, "T\xEAn m\xF3n qu\xE0", 180)}`,
      emailBody: cleanOptional(raw.emailBody, 4e3) || "Ch\xE0o {{name}},\n\nB\u1EA1n c\xF3 th\u1EC3 nh\u1EADn {{gift_title}} t\u1EA1i \u0111\xE2y:\n{{gift_url}}"
    };
    return { ...base, page: landingPageFrom({ ...base, page: raw.page }) };
  }
  create(raw) {
    return this.repository.create(this.validateInput(raw));
  }
  createDraft(raw) {
    const name = clean(raw.name, "T\xEAn ph\u1EC5u", 160);
    const kind = ["lead", "event", "sales"].includes(raw.kind) ? raw.kind : null;
    if (!kind) throw new Error("H\xE3y ch\u1ECDn m\u1ED9t lo\u1EA1i ph\u1EC5u");
    const slug = this.uniqueSlug(name);
    const kindCopy = {
      lead: {
        cta: "\u0110\u0103ng k\xFD",
        title: "N\u1ED9i dung d\xE0nh cho b\u1EA1n",
        description: "Ph\u1EC5u \u0111ang ch\u1EDD \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF."
      },
      event: {
        cta: "\u0110\u0103ng k\xFD tham gia",
        title: "S\u1EF1 ki\u1EC7n",
        description: "H\xE0nh tr\xECnh s\u1EF1 ki\u1EC7n \u0111ang ch\u1EDD \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF."
      },
      sales: {
        cta: "Xem s\u1EA3n ph\u1EA9m",
        title: "S\u1EA3n ph\u1EA9m",
        description: "H\xE0nh tr\xECnh b\xE1n h\xE0ng \u0111ang ch\u1EDD \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF."
      }
    }[kind];
    return this.repository.create({
      kind,
      journey: { templateId: null, brief: "", steps: [] },
      name,
      slug,
      brand: "Kallob",
      audience: "Ch\u01B0a x\xE1c \u0111\u1ECBnh",
      headline: name,
      subheadline: "Ph\u1EC5u \u0111ang ch\u1EDD \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF.",
      cta: kindCopy.cta,
      giftTitle: kindCopy.title,
      giftDescription: kindCopy.description,
      giftUrl: "https://example.com/chua-thiet-lap",
      thankYouHeadline: "C\u1EA3m \u01A1n b\u1EA1n.",
      consent: "T\xF4i \u0111\u1ED3ng \xFD cung c\u1EA5p th\xF4ng tin \u0111\u1EC3 nh\u1EADn n\u1ED9i dung li\xEAn quan.",
      zaloQrImageUrl: "",
      facebookUrl: "",
      emailSubject: `Th\xF4ng tin t\u1EEB ${name}`,
      emailBody: "Ch\xE0o {{name}},\n\nC\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 quan t\xE2m."
    });
  }
  updateJourney(id, raw, revision) {
    return this.repository.updateJourney(id, this.validateJourney(raw), revision);
  }
  createRelease(id, revision) {
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u");
    if (!funnel.journey.templateId || funnel.journey.steps.length < 2)
      throw new Error("H\xE3y ho\xE0n t\u1EA5t h\xE0nh tr\xECnh tr\u01B0\u1EDBc khi t\u1EA1o phi\xEAn b\u1EA3n");
    if (funnel.giftUrl === "https://example.com/chua-thiet-lap")
      throw new Error("H\xE3y \u0111\u1EC3 Codex d\u1EF1ng n\u1ED9i dung tr\u01B0\u1EDBc khi t\u1EA1o phi\xEAn b\u1EA3n");
    this.validateInput(this.repository.inputFrom(funnel));
    return this.repository.createRelease(id, revision);
  }
  update(id, raw, revision) {
    return this.repository.update(id, this.validateInput(raw), revision);
  }
  validateJourney(raw) {
    const allowed = /* @__PURE__ */ new Set([
      "page",
      "form",
      "questions",
      "decision",
      "calendar",
      "checkout",
      "result",
      "thank-you",
      "follow-up"
    ]);
    const steps = (raw?.steps ?? []).map((step, index) => ({
      id: clean(step.id, `M\xE3 b\u01B0\u1EDBc ${index + 1}`, 80),
      kind: allowed.has(step.kind) ? step.kind : (() => {
        throw new Error(`Lo\u1EA1i b\u01B0\u1EDBc ${index + 1} kh\xF4ng h\u1EE3p l\u1EC7`);
      })(),
      title: clean(step.title, `T\xEAn b\u01B0\u1EDBc ${index + 1}`, 120),
      description: cleanOptional(step.description, 300)
    }));
    if (steps.length > 12) throw new Error("M\u1ED7i h\xE0nh tr\xECnh c\xF3 t\u1ED1i \u0111a 12 b\u01B0\u1EDBc");
    if (new Set(steps.map((step) => step.id)).size !== steps.length)
      throw new Error("C\xE1c b\u01B0\u1EDBc trong h\xE0nh tr\xECnh ph\u1EA3i c\xF3 m\xE3 ri\xEAng");
    return {
      templateId: cleanOptional(raw?.templateId, 80) || null,
      brief: cleanOptional(raw?.brief, 4e3),
      steps
    };
  }
  publicView(slug) {
    const published = this.repository.publicRelease(slug);
    if (!published) return null;
    const snapshot = published.release.snapshot;
    return {
      slug: snapshot.slug,
      brand: snapshot.brand,
      headline: snapshot.headline,
      subheadline: snapshot.subheadline,
      cta: snapshot.cta,
      giftTitle: snapshot.giftTitle,
      giftDescription: snapshot.giftDescription,
      thankYouHeadline: snapshot.thankYouHeadline,
      consent: snapshot.consent,
      zaloQrImageUrl: snapshot.zaloQrImageUrl,
      facebookUrl: snapshot.facebookUrl,
      page: landingPageFrom(snapshot)
    };
  }
  recordVisit(slug) {
    const published = this.repository.publicRelease(slug);
    if (!published) return null;
    this.repository.recordVisit(published.funnel.id);
    return published;
  }
  submit(slug, raw, source) {
    const published = this.repository.publicRelease(slug);
    if (!published) throw new Error("Published funnel not found");
    const name = clean(raw.name, "H\u1ECD t\xEAn", 120);
    const email = clean(raw.email, "Email", 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error("Email kh\xF4ng h\u1EE3p l\u1EC7");
    if (raw.consent !== true)
      throw new Error("B\u1EA1n c\u1EA7n \u0111\u1ED3ng \xFD tr\u01B0\u1EDBc khi nh\u1EADn qu\xE0");
    const idempotencyKey = String(raw.idempotencyKey ?? "").trim() || createHash("sha256").update(`${email}:${randomUUID2()}`).digest("hex");
    const submission = this.repository.submit(published.funnel.id, {
      name,
      email,
      consent: published.release.snapshot.consent,
      source: source || "Tr\u1EF1c ti\u1EBFp",
      idempotencyKey
    });
    const snapshot = published.release.snapshot;
    return {
      id: submission.id,
      giftTitle: snapshot.giftTitle,
      giftDescription: snapshot.giftDescription,
      thankYouHeadline: snapshot.thankYouHeadline,
      deliveryMessage: "Qu\xE0 s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi t\u1EDBi email c\u1EE7a b\u1EA1n trong v\xF2ng 15 ph\xFAt."
    };
  }
};
var funnelGenerationResultSchema = external_exports.object({
  name: external_exports.string().min(1).max(160),
  slugSuggestion: external_exports.string().max(80).default(""),
  brand: external_exports.string().min(1).max(120),
  audience: external_exports.string().min(1).max(500),
  headline: external_exports.string().min(1).max(180),
  subheadline: external_exports.string().min(1).max(600),
  cta: external_exports.string().min(1).max(80),
  giftTitle: external_exports.string().min(1).max(180),
  giftDescription: external_exports.string().min(1).max(600),
  giftUrl: external_exports.string().url().max(2e3),
  thankYouHeadline: external_exports.string().min(1).max(180),
  consent: external_exports.string().min(1).max(500),
  page: external_exports.object({
    theme: external_exports.enum(["editorial", "quiet-luxury", "modern", "warm"]),
    eyebrow: external_exports.string().min(1).max(80),
    headline: external_exports.string().min(1).max(180),
    introduction: external_exports.string().min(1).max(600),
    benefitsTitle: external_exports.string().min(1).max(120),
    benefits: external_exports.array(external_exports.string().min(1).max(180)).max(6),
    creatorTitle: external_exports.string().min(1).max(120),
    creatorNote: external_exports.string().min(1).max(600),
    formTitle: external_exports.string().min(1).max(120),
    formDescription: external_exports.string().min(1).max(300),
    cta: external_exports.string().min(1).max(80),
    consent: external_exports.string().min(1).max(500),
    faq: external_exports.array(
      external_exports.object({
        question: external_exports.string().min(1).max(180),
        answer: external_exports.string().min(1).max(500)
      })
    ).max(6),
    thankYou: external_exports.object({
      headline: external_exports.string().min(1).max(180),
      body: external_exports.string().min(1).max(500),
      ctaLabel: external_exports.string().min(1).max(80)
    })
  })
});
var funnelDeploymentResultSchema = external_exports.object({
  publicUrl: external_exports.string().url().refine(
    (value) => value.startsWith("https://"),
    "publicUrl must be a public HTTPS URL"
  ),
  sitesProjectId: external_exports.string().min(1).max(200).optional(),
  sitesVersionId: external_exports.string().min(1).max(200).optional(),
  syncUrl: external_exports.string().url().refine((value) => value.startsWith("https://")),
  syncToken: external_exports.string().min(32).max(500)
});
var funnelIntegrationCheckResultSchema = external_exports.object({
  provider: external_exports.enum(["sites", "gmail"]),
  ok: external_exports.boolean(),
  detail: external_exports.string().min(1).max(1e3),
  identity: external_exports.string().min(1).max(300).optional()
});

// src/mini-apps/funnel-studio/server/sync-scheduler.ts
var SECRET_TOKEN = "@secret";
var tokenSecret = (deploymentId) => `sync-token:${deploymentId}`;
var FUNNEL_SYNC_INTERVAL_MS = 5 * 6e4;
var requiredString = (value, field, max) => {
  const result = String(value ?? "").trim();
  if (!result || result.length > max) throw new Error(`Sites sync returned an invalid ${field}`);
  return result;
};
function parsePayload(value) {
  if (!value || typeof value !== "object") throw new Error("Sites sync returned an invalid response");
  const payload = value;
  if (!Array.isArray(payload.items)) throw new Error("Sites sync response is missing items");
  const items = payload.items.map((entry) => {
    if (!entry || typeof entry !== "object") throw new Error("Sites sync returned an invalid submission");
    const row = entry;
    const email = requiredString(row.email, "email", 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Sites sync returned an invalid email");
    const createdAt = requiredString(row.createdAt, "createdAt", 100);
    if (Number.isNaN(new Date(createdAt).getTime())) throw new Error("Sites sync returned an invalid createdAt");
    return {
      id: requiredString(row.id, "id", 200),
      name: requiredString(row.name, "name", 120),
      email,
      consent: requiredString(row.consent, "consent", 500),
      source: requiredString(row.source || "Tr\u1EF1c ti\u1EBFp", "source", 500),
      createdAt
    };
  });
  const metrics = payload.metrics && typeof payload.metrics === "object" ? payload.metrics : null;
  return {
    items,
    nextCursor: typeof payload.nextCursor === "string" ? payload.nextCursor : "",
    ...metrics && Number.isFinite(Number(metrics.visits)) && Number.isFinite(Number(metrics.conversions)) ? { metrics: { visits: Number(metrics.visits), conversions: Number(metrics.conversions) } } : {}
  };
}
var FunnelSyncScheduler = class {
  constructor(repository, email, requester = fetch, intervalMs = FUNNEL_SYNC_INTERVAL_MS, secrets) {
    this.repository = repository;
    this.email = email;
    this.requester = requester;
    this.intervalMs = intervalMs;
    this.secrets = secrets;
  }
  repository;
  email;
  requester;
  intervalMs;
  secrets;
  timer = null;
  running = false;
  lastRunAt = null;
  lastError = null;
  /** The mailboxes the last run found, so `status()` stays synchronous. */
  gmail = null;
  fallbackGmail = null;
  /** Moves tokens a deployment result left in its row into the secret store, then reads them from there. */
  async tokenOf(deploymentId, stored) {
    if (!this.secrets) return stored === SECRET_TOKEN ? null : stored;
    if (stored !== SECRET_TOKEN) {
      await this.secrets.set(tokenSecret(deploymentId), stored);
      this.repository.markSyncTokenSecret(deploymentId);
      return stored;
    }
    return this.secrets.get(tokenSecret(deploymentId));
  }
  start() {
    if (this.timer) return;
    this.timer = setInterval(() => void this.tick(), this.intervalMs);
    this.timer.unref();
    void this.tick();
  }
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
  status() {
    return {
      intervalMs: this.intervalMs,
      running: this.running,
      gmailConnected: Boolean(this.gmail),
      gmailAccount: this.gmail,
      emailDeliveryPrimary: "codex-gmail",
      composioFallbackConnected: Boolean(this.fallbackGmail),
      lastRunAt: this.lastRunAt,
      nextRunAt: this.timer && this.lastRunAt ? new Date(new Date(this.lastRunAt).getTime() + this.intervalMs).toISOString() : null,
      lastError: this.lastError,
      sources: this.repository.liveSyncSources().map(({ deployment }) => deployment)
    };
  }
  async tick() {
    if (this.running) return this.status();
    this.running = true;
    const errors = [];
    try {
      for (const source of this.repository.liveSyncSources()) {
        try {
          const token = await this.tokenOf(source.deployment.id, source.token);
          if (!token) throw new Error("Thi\u1EBFu m\xE3 \u0111\u1ED3ng b\u1ED9 c\u1EE7a ph\u1EC5u n\xE0y; h\xE3y \u0111\u01B0a ph\u1EC5u l\xEAn Internet l\u1EA1i");
          await this.syncSource(source.deployment.id, source.deployment.funnelId, source.deployment.syncUrl, token, source.deployment.syncCursor);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          this.repository.recordSyncFailure(source.deployment.id, message);
          errors.push(message);
        }
      }
      try {
        await this.queuePendingEmails();
      } catch (error) {
        errors.push(error instanceof Error ? error.message : String(error));
      }
      this.lastError = errors.length ? errors.join(" \xB7 ").slice(0, 1e3) : null;
    } finally {
      this.lastRunAt = (/* @__PURE__ */ new Date()).toISOString();
      this.running = false;
    }
    return this.status();
  }
  async syncSource(deploymentId, funnelId, syncUrl, token, cursor) {
    let nextCursor = cursor ?? "";
    let metrics;
    for (let page = 0; page < 100; page += 1) {
      const url = new URL(syncUrl);
      url.searchParams.set("limit", "100");
      if (nextCursor) url.searchParams.set("cursor", nextCursor);
      const response = await this.requester(url, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      if (!response.ok) throw new Error(`Kh\xF4ng th\u1EC3 \u0111\u1ED3ng b\u1ED9 d\u1EEF li\u1EC7u t\u1EEB Sites (HTTP ${response.status})`);
      const payload = parsePayload(await response.json());
      for (const item of payload.items) {
        this.repository.submit(funnelId, {
          id: item.id,
          name: item.name,
          email: item.email,
          consent: item.consent,
          source: item.source,
          idempotencyKey: item.id,
          receivedAt: item.createdAt
        });
      }
      metrics = payload.metrics ?? metrics;
      if (!payload.nextCursor || payload.nextCursor === nextCursor || payload.items.length === 0) {
        nextCursor = payload.nextCursor || nextCursor;
        break;
      }
      nextCursor = payload.nextCursor;
    }
    this.repository.recordSyncSuccess(deploymentId, nextCursor, metrics);
  }
  async queuePendingEmails() {
    this.gmail = null;
    this.fallbackGmail = null;
    const { primary, fallback } = await this.email.queuePending();
    this.gmail = primary;
    this.fallbackGmail = fallback;
  }
};

// src/mini-apps/funnel-studio/server/app.ts
function createFunnelStudio(sdk, router, requester = fetch) {
  const repository = new FunnelStudioRepository(sdk.db);
  const ai = structuredPromptRuntime(sdk);
  const email = new FunnelEmailDelivery(repository, sdk.connections, (actionId, reason) => {
    sdk.externalActions.cancel(actionId, reason, "funnel-studio");
  });
  const service = new FunnelStudioService(repository, ai, {
    store: sdk.tasks,
    kernel: sdk.kernel,
    codexDesktop: sdk.codex,
    platform: { appResults: sdk.appResults, externalActions: sdk.externalActions },
    render: ai.render,
    email,
    projectRoot: sdk.dataRoot
  });
  service.registerGenerationResult();
  const scheduler = new FunnelSyncScheduler(repository, email, requester, void 0, sdk.secrets);
  return {
    service,
    scheduler,
    router: createFunnelStudioRouter(service, router, scheduler),
    start: () => scheduler.start(),
    stop: () => scheduler.stop()
  };
}

// src/mini-apps/funnel-studio/server/schema.ts
function migrateFunnelStudio(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS funnel_studio_funnels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'paused', 'archived')),
      draft_json TEXT NOT NULL,
      revision INTEGER NOT NULL DEFAULT 1,
      published_version INTEGER,
      visits INTEGER NOT NULL DEFAULT 0,
      conversions INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      archived_at TEXT
    );
    CREATE TABLE IF NOT EXISTS funnel_studio_releases (
      id TEXT PRIMARY KEY,
      funnel_id TEXT NOT NULL,
      version INTEGER NOT NULL,
      snapshot_json TEXT NOT NULL,
      published_at TEXT NOT NULL,
      UNIQUE (funnel_id, version)
    );
    CREATE TABLE IF NOT EXISTS funnel_studio_submissions (
      id TEXT PRIMARY KEY,
      funnel_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      consent TEXT NOT NULL,
      source TEXT NOT NULL,
      idempotency_key TEXT NOT NULL,
      received_at TEXT NOT NULL,
      UNIQUE (funnel_id, idempotency_key)
    );
    CREATE TABLE IF NOT EXISTS funnel_studio_generation_requests (
      id TEXT PRIMARY KEY,
      brief TEXT NOT NULL,
      task_id TEXT NOT NULL UNIQUE,
      funnel_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS funnel_studio_deployments (
      id TEXT PRIMARY KEY,
      funnel_id TEXT NOT NULL,
      release_id TEXT NOT NULL,
      task_id TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'live', 'failed')),
      public_url TEXT,
      sites_project_id TEXT,
      sites_version_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS funnel_studio_email_deliveries (
      submission_id TEXT PRIMARY KEY,
      action_id TEXT UNIQUE,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'queued', 'sent', 'failed', 'uncertain')),
      sent_at TEXT,
      last_error TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS funnel_studio_generation_requests_created ON funnel_studio_generation_requests(created_at DESC);
    CREATE INDEX IF NOT EXISTS funnel_studio_submissions_funnel ON funnel_studio_submissions(funnel_id, received_at DESC);
    CREATE INDEX IF NOT EXISTS funnel_studio_deployments_funnel ON funnel_studio_deployments(funnel_id, created_at DESC);
    CREATE TRIGGER IF NOT EXISTS funnel_studio_releases_no_update BEFORE UPDATE ON funnel_studio_releases
      BEGIN SELECT RAISE(ABORT, 'Published releases are immutable'); END;
    CREATE TRIGGER IF NOT EXISTS funnel_studio_releases_no_delete BEFORE DELETE ON funnel_studio_releases
      BEGIN SELECT RAISE(ABORT, 'Published releases are immutable'); END;
    CREATE TRIGGER IF NOT EXISTS funnel_studio_submissions_no_update BEFORE UPDATE ON funnel_studio_submissions
      BEGIN SELECT RAISE(ABORT, 'Funnel submissions are immutable'); END;
    CREATE TRIGGER IF NOT EXISTS funnel_studio_submissions_no_delete BEFORE DELETE ON funnel_studio_submissions
      BEGIN SELECT RAISE(ABORT, 'Funnel submissions are immutable'); END;
  `);
  const columns = db.prepare("PRAGMA table_info(funnel_studio_funnels)").all();
  if (!columns.some((column) => column.name === "public_url"))
    db.exec("ALTER TABLE funnel_studio_funnels ADD COLUMN public_url TEXT");
  if (!columns.some((column) => column.name === "live_version"))
    db.exec(
      "ALTER TABLE funnel_studio_funnels ADD COLUMN live_version INTEGER"
    );
  const generationColumns = new Set(
    db.prepare("PRAGMA table_info(funnel_studio_generation_requests)").all().map((column) => column.name)
  );
  if (!generationColumns.has("channels_json"))
    db.exec("ALTER TABLE funnel_studio_generation_requests ADD COLUMN channels_json TEXT NOT NULL DEFAULT '{}'");
  const deploymentColumns = new Set(
    db.prepare("PRAGMA table_info(funnel_studio_deployments)").all().map((column) => column.name)
  );
  for (const column of ["sync_url", "sync_token", "sync_cursor", "last_synced_at", "last_sync_error"]) {
    if (!deploymentColumns.has(column)) db.exec(`ALTER TABLE funnel_studio_deployments ADD COLUMN ${column} TEXT`);
  }
  db.prepare(
    "UPDATE funnel_studio_funnels SET status = 'draft', live_version = NULL WHERE status = 'live' AND public_url IS NULL"
  ).run();
}
function migrateFunnelJourneys(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS funnel_studio_integration_checks (
      provider TEXT PRIMARY KEY CHECK (provider IN ('sites', 'gmail')),
      status TEXT NOT NULL DEFAULT 'not_checked' CHECK (status IN ('not_checked', 'running', 'passed', 'failed')),
      task_id TEXT,
      detail TEXT,
      identity TEXT,
      checked_at TEXT,
      updated_at TEXT NOT NULL
    );
  `);
  const generationColumns = new Set(
    db.prepare("PRAGMA table_info(funnel_studio_generation_requests)").all().map((column) => column.name)
  );
  if (!generationColumns.has("completed_at")) {
    db.exec("ALTER TABLE funnel_studio_generation_requests ADD COLUMN completed_at TEXT");
    db.exec("UPDATE funnel_studio_generation_requests SET completed_at = updated_at WHERE funnel_id IS NOT NULL");
  }
}

// src/mini-apps/funnel-studio/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    migrateFunnelStudio(db);
  }
};

// src/mini-apps/funnel-studio/server/migrations/0002-journeys-and-checks.ts
var journeysAndChecks = {
  id: "0002-journeys-and-checks",
  up(db) {
    migrateFunnelJourneys(db);
  }
};

// src/mini-apps/funnel-studio/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline, journeysAndChecks]
};

// src/mini-apps/funnel-studio/server/index.ts
var server_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const app = createFunnelStudio(sdk, sdk.router());
    const funnels = {
      list: () => app.service.repository.list().map(({ id, name, slug, kind, status, visits, conversions }) => ({ id, name, slug, kind, status, visits, conversions }))
    };
    return { router: app.router, start: app.start, stop: app.stop, exports: { "funnel-studio.funnels": funnels } };
  }
});

// funnel-studio-package.js
var funnel_studio_package_default = { ...server_default, content: { "prompts": { "gift-funnel-draft": 'GROWTH STUDIO \xB7 FUNNEL STUDIO \xB7 D\u1EF0NG TR\u1EA2I NGHI\u1EC6M PH\u1EC4U\n\nT\xEAn ph\u1EC5u \u0111\xE3 \u0111\u01B0\u1EE3c ng\u01B0\u1EDDi d\xF9ng \u0111\u1EB7t: {{funnelName}}\nLo\u1EA1i ph\u1EC5u: {{funnelKind}}\nH\xE0nh tr\xECnh \u0111\xE3 duy\u1EC7t:\n{{journey}}\n\nTh\xF4ng tin b\u1ED5 sung c\u1EE7a ng\u01B0\u1EDDi d\xF9ng:\n{{brief}}\n\nB\u1EA1n ch\u1ECBu tr\xE1ch nhi\u1EC7m bi\u1EBFn h\xE0nh tr\xECnh \u0111\xE3 duy\u1EC7t th\xE0nh m\u1ED9t Site ho\xE0n ch\u1EC9nh. H\xE3y t\u1EF1 suy lu\u1EADn \u0111\u1ED1i t\u01B0\u1EE3ng, th\xF4ng \u0111i\u1EC7p, c\u1EA5u tr\xFAc n\u1ED9i dung, gi\u1ECDng \u0111i\u1EC7u v\xE0 h\u01B0\u1EDBng tr\xECnh b\xE0y. Kh\xF4ng thay \u0111\u1ED5i t\xEAn, lo\u1EA1i ph\u1EC5u ho\u1EB7c b\u1ECF b\u01B0\u1EDBc trong h\xE0nh tr\xECnh. Kh\xF4ng b\u1EAFt ng\u01B0\u1EDDi d\xF9ng \u0111i\u1EC1n l\u1EA1i nh\u1EEFng g\xEC c\xF3 th\u1EC3 suy ra h\u1EE3p l\xFD.\n\nNguy\xEAn t\u1EAFc:\n- Vi\u1EBFt ti\u1EBFng Vi\u1EC7t t\u1EF1 nhi\xEAn, r\xF5 v\xE0 ng\u1EAFn. Kh\xF4ng d\xF9ng thu\u1EADt ng\u1EEF ti\u1EBFng Anh khi c\xF3 c\xE1ch n\xF3i ph\u1ED5 th\xF4ng.\n- Kh\xF4ng b\u1ECBa th\xE0nh t\xEDch, s\u1ED1 li\u1EC7u, l\u1EDDi ch\u1EE9ng th\u1EF1c, khan hi\u1EBFm, cam k\u1EBFt ho\u1EB7c b\u1EB1ng ch\u1EE9ng.\n- Ch\u1EC9 h\u1ECFi khi thi\u1EBFu m\u1ED9t d\u1EEF ki\u1EC7n quy\u1EBFt \u0111\u1ECBnh khi\u1EBFn ph\u1EC5u kh\xF4ng th\u1EC3 ho\u1EA1t \u0111\u1ED9ng ho\u1EB7c c\xF3 nguy c\u01A1 sai s\u1EF1 th\u1EADt: \u0111\u01B0\u1EDDng d\u1EABn qu\xE0, th\u1EDDi gian/\u0111\u1ECBa \u0111i\u1EC3m s\u1EF1 ki\u1EC7n, d\u1ECBch v\u1EE5 l\u1ECBch ho\u1EB7c checkout b\xEAn ngo\xE0i. Khi c\u1EA7n, d\xF9ng c\xF4ng c\u1EE5 `growth_task_ask` c\u1EE7a MCP server `kallob-growth` v\u1EDBi task_id {{taskIdJson}}, h\u1ECFi \u0111\xFAng m\u1ED9t c\xE2u ng\u1EAFn (c\xF3 t\u1ED1i \u0111a b\u1ED1n l\u1EF1a ch\u1ECDn n\u1EBFu h\u1EEFu \xEDch), r\u1ED3i d\u1EEBng h\u1EB3n \u0111\u1EC3 ch\u1EDD c\xE2u tr\u1EA3 l\u1EDDi.\n- B\u1EA1n \u0111\u01B0\u1EE3c t\u1EF1 ch\u1ECDn 0\u20136 l\u1EE3i \xEDch v\xE0 0\u20136 c\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p; b\u1ECF h\u1EB3n m\u1EE5c kh\xF4ng c\u1EA7n thay v\xEC c\u1ED1 nh\u1ED3i n\u1ED9i dung.\n- \u0110\xE2y ch\u1EC9 l\xE0 b\u1EA3n nh\xE1p ri\xEAng t\u01B0. Kh\xF4ng xu\u1EA5t b\u1EA3n.\n\nKhi \u0111\xE3 \u0111\u1EE7 th\xF4ng tin, g\u1ECDi c\xF4ng c\u1EE5 `growth_app_result_save` c\u1EE7a MCP server `kallob-growth` v\u1EDBi task_id {{taskIdJson}} v\xE0 payload \u0111\xFAng d\u1EA1ng sau (kh\xF4ng th\xEAm kh\xF3a):\n{"name":{{funnelNameJson}},"slugSuggestion":"\u2026","brand":"\u2026","audience":"\u2026","headline":"\u2026","subheadline":"\u2026","cta":"\u2026","giftTitle":"t\xEAn gi\xE1 tr\u1ECB ch\xEDnh, s\u1EF1 ki\u1EC7n ho\u1EB7c s\u1EA3n ph\u1EA9m","giftDescription":"m\xF4 t\u1EA3 gi\xE1 tr\u1ECB ch\xEDnh","giftUrl":"https://\u0111\xEDch-b\u1EAFt-bu\u1ED9c-ph\xF9-h\u1EE3p-v\u1EDBi-h\xE0nh-tr\xECnh","thankYouHeadline":"\u2026","consent":"n\u1ED9i dung \u0111\u1ED3ng \xFD ph\xF9 h\u1EE3p v\u1EDBi d\u1EEF li\u1EC7u \u0111\u01B0\u1EE3c thu","page":{"theme":"editorial|quiet-luxury|modern|warm","eyebrow":"\u2026","headline":"\u2026","introduction":"\u2026","benefitsTitle":"\u2026","benefits":["\u2026"],"creatorTitle":"\u2026","creatorNote":"\u2026","formTitle":"\u2026","formDescription":"\u2026","cta":"\u2026","consent":"\u2026","faq":[{"question":"\u2026","answer":"\u2026"}],"thankYou":{"headline":"\u2026","body":"\u2026","ctaLabel":"\u2026"}}}\nN\u1EBFu c\xF4ng c\u1EE5 t\u1EEB ch\u1ED1i d\u1EEF li\u1EC7u, s\u1EEDa \u0111\xFAng l\u1ED7i v\xE0 g\u1ECDi l\u1EA1i. Sau khi l\u01B0u th\xE0nh c\xF4ng th\xEC k\u1EBFt th\xFAc.\n', "integration-check-gmail": 'GROWTH STUDIO \xB7 FUNNEL STUDIO \xB7 KI\u1EC2M TRA GMAIL\n\nCh\u1EC9 ki\u1EC3m tra quy\u1EC1n truy c\u1EADp Gmail theo c\xE1ch an to\xE0n v\xE0 t\u1ED1i thi\u1EC3u. D\xF9ng Gmail connector/plugin \u0111\u1EC3 x\xE1c nh\u1EADn t\xE0i kho\u1EA3n \u0111\xE3 k\u1EBFt n\u1ED1i; ch\u1EC9 \u0111\u1ECDc th\xF4ng tin nh\u1EADn d\u1EA1ng t\xE0i kho\u1EA3n n\u1EBFu c\xF4ng c\u1EE5 h\u1ED7 tr\u1EE3.\n\nRanh gi\u1EDBi b\u1EAFt bu\u1ED9c:\n- Kh\xF4ng \u0111\u1ECDc n\u1ED9i dung, ti\xEAu \u0111\u1EC1 ho\u1EB7c danh s\xE1ch email.\n- Kh\xF4ng g\u1EEDi email th\u1EED, kh\xF4ng t\u1EA1o nh\xE1p, kh\xF4ng s\u1EEDa nh\xE3n hay thay \u0111\u1ED5i h\u1ED9p th\u01B0.\n- N\u1EBFu connector ch\u01B0a \u0111\u01B0\u1EE3c c\xE0i, ch\u01B0a k\u1EBFt n\u1ED1i ho\u1EB7c b\u1ECB workspace ch\u1EB7n, tr\u1EA3 v\u1EC1 ok=false c\xF9ng m\u1ED9t h\u01B0\u1EDBng x\u1EED l\xFD ng\u1EAFn, c\u1EE5 th\u1EC3.\n\nSau khi ki\u1EC3m tra, g\u1ECDi c\xF4ng c\u1EE5 `growth_app_result_save` c\u1EE7a MCP server `kallob-growth` v\u1EDBi task_id {{taskIdJson}} v\xE0 payload \u0111\xFAng d\u1EA1ng:\n{"provider":"gmail","ok":true|false,"detail":"\u2026","identity":"\u0111\u1ECBa ch\u1EC9 email n\u1EBFu c\xF4ng c\u1EE5 tr\u1EA3 v\u1EC1"}\nK\u1EBFt th\xFAc ngay sau khi l\u01B0u k\u1EBFt qu\u1EA3.\n', "integration-check-sites": 'GROWTH STUDIO \xB7 FUNNEL STUDIO \xB7 KI\u1EC2M TRA CHATGPT SITES\n\nCh\u1EC9 ki\u1EC3m tra quy\u1EC1n truy c\u1EADp plugin Sites theo c\xE1ch ch\u1EC9 \u0111\u1ECDc. D\xF9ng plugin/skill Sites \u0111\u1EC3 x\xE1c nh\u1EADn b\u1EA1n c\xF3 th\u1EC3 \u0111\u1ECDc danh s\xE1ch ho\u1EB7c th\xF4ng tin m\u1ED9t Site m\xE0 t\xE0i kho\u1EA3n hi\u1EC7n t\u1EA1i \u0111\u01B0\u1EE3c ph\xE9p xem.\n\nRanh gi\u1EDBi b\u1EAFt bu\u1ED9c:\n- Kh\xF4ng t\u1EA1o, s\u1EEDa, xu\u1EA5t b\u1EA3n, g\u1EE1 ho\u1EB7c x\xF3a Site.\n- Kh\xF4ng thay \u0111\u1ED5i domain, d\u1EEF li\u1EC7u ho\u1EB7c quy\u1EC1n truy c\u1EADp.\n- N\u1EBFu plugin ch\u01B0a \u0111\u01B0\u1EE3c c\xE0i, ch\u01B0a k\u1EBFt n\u1ED1i ho\u1EB7c b\u1ECB workspace ch\u1EB7n, tr\u1EA3 v\u1EC1 ok=false c\xF9ng m\u1ED9t h\u01B0\u1EDBng x\u1EED l\xFD ng\u1EAFn, c\u1EE5 th\u1EC3.\n\nSau khi ki\u1EC3m tra, g\u1ECDi c\xF4ng c\u1EE5 `growth_app_result_save` c\u1EE7a MCP server `kallob-growth` v\u1EDBi task_id {{taskIdJson}} v\xE0 payload \u0111\xFAng d\u1EA1ng:\n{"provider":"sites","ok":true|false,"detail":"\u2026","identity":"t\xEAn workspace ho\u1EB7c Site n\u1EBFu \u0111\u1ECDc \u0111\u01B0\u1EE3c"}\nK\u1EBFt th\xFAc ngay sau khi l\u01B0u k\u1EBFt qu\u1EA3.\n', "landing-page-writer": "B\u1EA1n l\xE0 copywriter landing page ti\u1EBFng Vi\u1EC7t cho solo founder v\xE0 SME marketer.\n\nH\xE3y t\u1EA1o n\u1ED9i dung ho\xE0n ch\u1EC9nh cho m\u1ED9t landing page t\u1EB7ng qu\xE0. Vi\u1EBFt ti\u1EBFng Vi\u1EC7t t\u1EF1 nhi\xEAn, c\u1EE5 th\u1EC3, d\u1EC5 hi\u1EC3u; kh\xF4ng d\xF9ng ti\u1EBFng Anh khi c\xF3 c\xE1ch n\xF3i ti\u1EBFng Vi\u1EC7t quen thu\u1ED9c. Ti\xEAu \u0111\u1EC1 ng\u1EAFn, c\xF3 l\u1EE3i \xEDch r\xF5 v\xE0 kh\xF4ng gh\xE9p m\xE1y m\xF3c t\xEAn qu\xE0 v\u1EDBi to\xE0n b\u1ED9 k\u1EBFt qu\u1EA3 mong mu\u1ED1n.\n\nCh\u1EC9 d\xF9ng d\u1EEF ki\u1EC7n trong brief. Kh\xF4ng b\u1ECBa s\u1ED1 li\u1EC7u, kh\xE1ch h\xE0ng, th\xE0nh t\xEDch, ch\u1EE9ng nh\u1EADn, khan hi\u1EBFm, cam k\u1EBFt ho\u1EB7c b\u1EB1ng ch\u1EE9ng. N\u1EBFu brief kh\xF4ng c\xF3 b\u1EB1ng ch\u1EE9ng m\u1EA1nh, ph\u1EA7n ng\u01B0\u1EDDi t\u1EA1o ch\u1EC9 gi\u1EA3i th\xEDch m\u1EE5c \u0111\xEDch v\xE0 c\xE1ch t\xE0i li\u1EC7u \u0111\u01B0\u1EE3c chu\u1EA9n b\u1ECB. Gi\u1EEF nguy\xEAn \xFD ngh\u0129a ph\xE1p l\xFD c\u1EE7a n\u1ED9i dung \u0111\u1ED3ng \xFD. M\u1ED7i l\u1EE3i \xEDch ph\u1EA3i kh\xE1c nhau v\xE0 b\u1EAFt \u0111\u1EA7u b\u1EB1ng k\u1EBFt qu\u1EA3 ng\u01B0\u1EDDi \u0111\u1ECDc nh\u1EADn \u0111\u01B0\u1EE3c. FAQ ph\u1EA3i tr\u1EA3 l\u1EDDi nh\u1EEFng b\u0103n kho\u0103n th\u1EF1c t\u1EBF tr\u01B0\u1EDBc khi \u0111\u1EC3 l\u1EA1i th\xF4ng tin.\n\nH\u01B0\u1EDBng tr\xECnh b\xE0y \u0111\xE3 ch\u1ECDn ch\u1EC9 \u1EA3nh h\u01B0\u1EDFng nh\u1ECBp v\xE0 gi\u1ECDng, kh\xF4ng thay \u0111\u1ED5i s\u1EF1 th\u1EADt. Tr\u1EA3 v\u1EC1 \u0111\xFAng JSON theo schema, kh\xF4ng th\xEAm l\u1EDDi gi\u1EA3i th\xEDch.\n\nBRIEF:\n{{brief}}\n", "sites-deployment": 'GROWTH STUDIO \xB7 FUNNEL STUDIO \xB7 \u0110\u01AFA PH\u1EC4U L\xCAN INTERNET\n\nNg\u01B0\u1EDDi d\xF9ng \u0111\xE3 y\xEAu c\u1EA7u xu\u1EA5t b\u1EA3n th\u1EADt phi\xEAn b\u1EA3n v{{version}} b\u1EB1ng ChatGPT Sites \u0111\u1EC3 b\u1EA5t k\u1EF3 ai c\xF3 \u0111\u01B0\u1EDDng d\u1EABn \u0111\u1EC1u xem \u0111\u01B0\u1EE3c tr\xEAn Internet.\n\nN\u1ED9i dung b\u1EA5t bi\u1EBFn c\u1EE7a phi\xEAn b\u1EA3n:\n{{snapshot}}\n\nY\xEAu c\u1EA7u b\u1EAFt bu\u1ED9c:\n- D\xF9ng plugin `sites` c\u1EE7a Codex (skill c\u1EE7a n\xF3, nh\u01B0 sites-building v\xE0 sites-hosting, v\xE0 c\xE1c c\xF4ng c\u1EE5 Sites connector) cho m\u1ECDi vi\u1EC7c d\u1EF1ng v\xE0 l\u01B0u tr\u1EEF Site, nh\u01B0 mini-app Websites; kh\xF4ng thay b\u1EB1ng route localhost, tunnel t\u1EA1m ho\u1EB7c b\u1EA3n xem tr\u01B0\u1EDBc n\u1ED9i b\u1ED9. Vi\u1EC7c n\xE0y ch\u1EA1y n\u1EC1n: kh\xF4ng c\xF3 b\u1EA3n xem tr\u01B0\u1EDBc n\xE0o \u0111\u1EC3 m\u1EDF cho ng\u01B0\u1EDDi d\xF9ng.\n- T\u1EA1o m\u1ED9t Site ho\xE0n ch\u1EC9nh, responsive, b\u1EB1ng ti\u1EBFng Vi\u1EC7t; tri\u1EC3n khai \u0111\xFAng lo\u1EA1i ph\u1EC5u v\xE0 to\xE0n b\u1ED9 c\xE1c b\u01B0\u1EDBc trong snapshot.journey, gi\u1EEF \u0111\xFAng n\u1ED9i dung v\xE0 h\u01B0\u1EDBng tr\xECnh b\xE0y c\u1EE7a snapshot. Kh\xF4ng b\u1ECBa b\u1EB1ng ch\u1EE9ng, s\u1ED1 li\u1EC7u ho\u1EB7c l\u1EDDi ch\u1EE9ng th\u1EF1c.\n- Nh\u1EEFng b\u01B0\u1EDBc thu th\xF4ng tin ph\u1EA3i ho\u1EA1t \u0111\u1ED9ng th\u1EADt tr\xEAn Internet. L\u01B0u ph\u1EA3n h\u1ED3i b\u1EC1n v\u1EEFng b\u1EB1ng D1; c\xF3 tr\u1EA1ng th\xE1i l\u1ED7i v\xE0 th\xE0nh c\xF4ng r\xF5 r\xE0ng; ch\u1ED1ng g\u1EEDi tr\xF9ng h\u1EE3p l\xFD. V\u1EDBi ph\u1EC5u b\xE1n h\xE0ng, kh\xF4ng thu d\u1EEF li\u1EC7u th\u1EBB v\xE0 ch\u1EC9 chuy\u1EC3n sang checkout b\xEAn ngo\xE0i \u0111\xE3 \u0111\u01B0\u1EE3c duy\u1EC7t.\n- M\u1ED7i l\u01B0\u1EE3t xem v\xE0 l\u01B0\u1EE3t \u0111\u0103ng k\xFD ph\u1EA3i \u0111\u01B0\u1EE3c ghi nh\u1EADn trong D1. M\u1ED7i \u0111\u0103ng k\xFD c\xF3 id \u1ED5n \u0111\u1ECBnh, createdAt, ngu\u1ED3n v\xE0 n\u1ED9i dung \u0111\u1ED3ng \xFD.\n- Trang k\u1EBFt th\xFAc ph\u1EA3i ph\u1EA3n \xE1nh \u0111\xFAng h\xE0nh tr\xECnh: ph\u1EC5u t\u1EB7ng qu\xE0 KH\xD4NG m\u1EDF qu\xE0 ngay m\xE0 h\u1EB9n g\u1EEDi qu\xE0 qua email trong v\xF2ng 15 ph\xFAt; s\u1EF1 ki\u1EC7n x\xE1c nh\u1EADn tr\u1EA1ng th\xE1i \u0111\u0103ng k\xFD; ph\u1EC5u b\xE1n h\xE0ng ch\u1EC9 x\xE1c nh\u1EADn mua khi checkout/provider c\xF3 b\u1EB1ng ch\u1EE9ng t\u01B0\u01A1ng \u1EE9ng. N\u1EBFu snapshot c\xF3 zaloQrImageUrl, hi\u1EC7n QR Zalo nh\u01B0 k\xEAnh h\u1ED7 tr\u1EE3. N\u1EBFu c\xF3 facebookUrl, ch\u1EC9 hi\u1EC7n li\xEAn k\u1EBFt nh\u1ECF \u0111\u1EC3 nh\u1EADn th\xEAm th\xF4ng tin; kh\xF4ng d\xF9ng QR Facebook v\xE0 kh\xF4ng m\xF4 t\u1EA3 Facebook l\xE0 k\xEAnh h\u1ED7 tr\u1EE3.\n- T\u1EA1o API GET /api/kgs-sync/submissions cho KGS local. API nh\u1EADn cursor v\xE0 limit, tr\u1EA3 \u0111\xFAng d\u1EA1ng {"items":[{"id":"\u2026","name":"\u2026","email":"\u2026","consent":"\u2026","source":"\u2026","createdAt":"\u2026"}],"nextCursor":"\u2026","metrics":{"visits":0,"conversions":0}}. S\u1EAFp x\u1EBFp \u1ED5n \u0111\u1ECBnh, kh\xF4ng b\u1ECF s\xF3t khi ph\xE2n trang.\n- B\u1EA3o v\u1EC7 API \u0111\u1ED3ng b\u1ED9 b\u1EB1ng Authorization: Bearer <token>. T\u1EF1 t\u1EA1o token ng\u1EABu nhi\xEAn t\u1ED1i thi\u1EC3u 32 byte, l\u01B0u b\u1EB1ng runtime secret c\u1EE7a Sites, tuy\u1EC7t \u0111\u1ED1i kh\xF4ng \u0111\u01B0a token v\xE0o source ho\u1EB7c giao di\u1EC7n tr\xECnh duy\u1EC7t. CORS kh\xF4ng \u0111\u01B0\u1EE3c m\u1EDF cho endpoint n\xE0y.\n- Tri\u1EC3n khai v\u1EDBi audience c\xF4ng khai theo \u0111\xFAng y\xEAu c\u1EA7u hi\u1EC7n t\u1EA1i c\u1EE7a ng\u01B0\u1EDDi d\xF9ng.\n- Ch\u1EC9 coi l\xE0 ho\xE0n t\u1EA5t khi c\xF4ng c\u1EE5 hosting tr\u1EA3 v\u1EC1 deployment succeeded c\xF9ng URL HTTPS th\u1EADt.\n- N\u1EBFu Sites ch\u01B0a \u0111\u01B0\u1EE3c k\u1EBFt n\u1ED1i ho\u1EB7c c\u1EA7n ng\u01B0\u1EDDi d\xF9ng c\u1EA5p quy\u1EC1n, g\u1ECDi c\xF4ng c\u1EE5 `growth_task_ask` c\u1EE7a MCP server `kallob-growth` v\u1EDBi task_id {{taskIdJson}}, h\u1ECFi \u0111\xFAng m\u1ED9t c\xE2u ng\u1EAFn n\xEAu h\xE0nh \u0111\u1ED9ng c\u1EA7n l\xE0m, r\u1ED3i d\u1EEBng \u0111\u1EC3 ch\u1EDD. Kh\xF4ng l\u01B0u k\u1EBFt qu\u1EA3 gi\u1EA3.\n\nSau khi tri\u1EC3n khai th\xE0nh c\xF4ng, g\u1ECDi c\xF4ng c\u1EE5 `growth_app_result_save` c\u1EE7a MCP server `kallob-growth` v\u1EDBi task_id {{taskIdJson}} v\xE0 payload \u0111\xFAng d\u1EA1ng:\n{"publicUrl":"https://\u2026","sitesProjectId":"\u2026","sitesVersionId":"\u2026","syncUrl":"https://\u2026/api/kgs-sync/submissions","syncToken":"\u2026"}\n\nKh\xF4ng d\xF9ng URL localhost. Kh\xF4ng g\u1ECDi growth_app_result_save tr\u01B0\u1EDBc khi deployment \u0111\xE3 th\xE0nh c\xF4ng.\n' } } };
export {
  funnel_studio_package_default as default
};
