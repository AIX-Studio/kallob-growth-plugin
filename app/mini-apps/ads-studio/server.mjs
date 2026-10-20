import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/ads-studio/manifest.ts
var manifest = {
  id: "ads-studio",
  version: "0.1.0",
  requiresCore: ">=2.31.0 <3",
  entitlement: "ads-studio"
};

// src/mini-apps/ads-studio/release-notes.json
var release_notes_default = [
  {
    version: "0.1.0",
    vi: "Ads Studio (b\u1EA3n nh\xE1p): k\u1EBFt n\u1ED1i Meta Ads b\u1EB1ng access token ch\u1EC9 \u0111\u1ECDc (c\u1EA5t trong Keychain), t\u1EF1 ch\u1ECDn t\xE0i kho\u1EA3n qu\u1EA3ng c\xE1o c\u1EA7n \u0111\u1ED3ng b\u1ED9, xem campaign v\xE0 s\u1ED1 li\u1EC7u h\u1EB1ng ng\xE0y t\xE1ch ri\xEAng theo t\u1EEBng lo\u1EA1i ti\u1EC1n. \u1EA8n campaign trong Studio kh\xF4ng \u0111\u1ED5i g\xEC tr\xEAn Meta. C\u1EA7n Growth Studio c\xF3 kernel 2.31.0.",
    en: "Ads Studio (draft): connect Meta Ads with a read-only access token (kept in the Keychain), choose which ad accounts sync, and review campaigns and daily metrics kept apart per currency. Hiding a campaign in Studio changes nothing on Meta. Needs Growth Studio with kernel 2.31.0."
  }
];

// src/mini-apps/ads-studio/server/meta-provider.ts
var required = (value, label) => {
  const text2 = typeof value === "string" ? value.trim() : "";
  if (!text2) throw new Error(`Meta did not return ${label}`);
  return text2;
};
var nullable = (value) => typeof value === "string" && value.trim() ? value.trim() : null;
var count = (value) => {
  if (value === null || value === void 0 || value === "") return null;
  const number2 = Number(value);
  return Number.isFinite(number2) ? number2 : null;
};
var decimal = (value) => {
  if (value === null || value === void 0 || value === "") return null;
  const text2 = String(value).trim();
  return /^-?\d+(?:\.\d+)?$/.test(text2) ? text2 : null;
};
var MetaAdsProvider = class {
  constructor(fetcher = fetch, version = process.env.KGS_META_GRAPH_VERSION?.trim() || "v24.0") {
    this.fetcher = fetcher;
    this.version = version;
  }
  fetcher;
  version;
  async identity(accessToken) {
    const value = await this.one("/me", accessToken, { fields: "id,name" });
    return { id: required(value.id, "the user id"), name: required(value.name, "the user name") };
  }
  async permissions(accessToken) {
    const values = await this.pages("/me/permissions", accessToken, {});
    return values.map((value) => ({ permission: required(value.permission, "a permission name"), status: required(value.status, "a permission status") }));
  }
  async accounts(accessToken) {
    const values = await this.pages("/me/adaccounts", accessToken, { fields: "id,account_id,name,account_status,currency,timezone_name", limit: "200" });
    return values.map((value) => {
      const currency = required(value.currency, "an account currency").toUpperCase();
      const timezone = required(value.timezone_name, "an account timezone");
      if (!/^[A-Z]{3}$/.test(currency)) throw new Error("Meta returned an invalid account currency");
      try {
        new Intl.DateTimeFormat("en", { timeZone: timezone }).format();
      } catch {
        throw new Error("Meta returned an invalid IANA account timezone");
      }
      return { id: required(value.id, "an account id"), accountId: required(value.account_id, "an account number"), name: required(value.name, "an account name"), currency, timezone, status: value.account_status === void 0 ? null : String(value.account_status) };
    });
  }
  async campaigns(accessToken, accountId) {
    const values = await this.pages(`/act_${encodeURIComponent(accountId)}/campaigns`, accessToken, { fields: "id,name,status,effective_status,objective,daily_budget,lifetime_budget,updated_time", limit: "200" });
    return values.map((value) => ({
      id: required(value.id, "a campaign id"),
      name: required(value.name, "a campaign name"),
      status: required(value.status, "a campaign status"),
      effectiveStatus: required(value.effective_status, "an effective campaign status"),
      objective: nullable(value.objective),
      dailyBudget: decimal(value.daily_budget),
      lifetimeBudget: decimal(value.lifetime_budget),
      updatedAt: nullable(value.updated_time)
    }));
  }
  async insights(accessToken, accountId, since, until) {
    const values = await this.pages(`/act_${encodeURIComponent(accountId)}/insights`, accessToken, { level: "campaign", time_increment: "1", time_range: JSON.stringify({ since, until }), fields: "campaign_id,campaign_name,date_start,date_stop,spend,impressions,reach,clicks,ctr,cpc,cpm", limit: "200" });
    return values.map((value) => ({
      campaignId: required(value.campaign_id, "an insight campaign id"),
      campaignName: required(value.campaign_name, "an insight campaign name"),
      dateStart: required(value.date_start, "an insight start date"),
      dateStop: required(value.date_stop, "an insight stop date"),
      spend: decimal(value.spend),
      impressions: count(value.impressions),
      reach: count(value.reach),
      clicks: count(value.clicks),
      ctr: decimal(value.ctr),
      cpc: decimal(value.cpc),
      cpm: decimal(value.cpm)
    }));
  }
  async one(path, accessToken, params) {
    const url = this.url(path, params);
    const response = await this.fetcher(url, { headers: { authorization: `Bearer ${accessToken}` }, signal: AbortSignal.timeout(2e4) });
    const payload = await response.json();
    if (!response.ok || payload.error) throw new Error(`Meta Ads: ${payload.error?.message || `request failed (${response.status})`}`);
    return payload;
  }
  async pages(path, accessToken, params) {
    const values = [];
    let after;
    const seen = /* @__PURE__ */ new Set();
    do {
      const page = await this.one(path, accessToken, { ...params, ...after ? { after } : {} });
      values.push(...page.data ?? []);
      after = page.paging?.cursors?.after;
      if (after && seen.has(after)) throw new Error("Meta Ads returned a repeated paging cursor");
      if (after) seen.add(after);
      if (seen.size > 100) throw new Error("Meta Ads pagination exceeded the safety limit");
    } while (after);
    return values;
  }
  url(path, params) {
    const url = new URL(`https://graph.facebook.com/${this.version}${path}`);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    return url;
  }
};

// src/mini-apps/ads-studio/server/repository.ts
import { randomUUID } from "node:crypto";
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var nullable2 = (value) => value === null || value === void 0 ? null : String(value);
var money = (value) => Number.isFinite(value) ? value.toFixed(2).replace(/\.00$/, "") : null;
var sumDecimals = (values) => {
  const present = values.filter((value) => value !== null);
  if (!present.length) return null;
  const scale = Math.max(...present.map((value) => value.split(".")[1]?.length ?? 0));
  const factor = 10n ** BigInt(scale);
  const total = present.reduce((sum, value) => {
    const [whole2, fraction2 = ""] = value.split(".");
    const sign2 = whole2.startsWith("-") ? -1n : 1n;
    const absolute2 = whole2.replace("-", "");
    return sum + sign2 * (BigInt(absolute2) * factor + BigInt(fraction2.padEnd(scale, "0") || "0"));
  }, 0n);
  const sign = total < 0n ? "-" : "", absolute = total < 0n ? -total : total;
  const whole = absolute / factor, fraction = scale ? String(absolute % factor).padStart(scale, "0").replace(/0+$/, "") : "";
  return `${sign}${whole}${fraction ? `.${fraction}` : ""}`;
};
var sumNullable = (values) => {
  const present = values.filter((value) => value !== null);
  return present.length ? present.reduce((total, value) => total + Number(value), 0) : null;
};
var AdsRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  /** A Studio restart cannot leave an account apparently syncing forever. */
  recoverInterruptedSyncs() {
    this.db.prepare("UPDATE ads_studio_accounts SET sync_state = 'error', last_error = 'Studio restarted before synchronization finished.', revision = revision + 1, updated_at = ? WHERE sync_state = 'syncing'").run(now());
  }
  connections() {
    return this.db.prepare("SELECT * FROM ads_studio_connections ORDER BY created_at, id").all().map(toConnection);
  }
  connection(id) {
    const row = this.db.prepare("SELECT * FROM ads_studio_connections WHERE id = ?").get(id);
    return row ? toConnection(row) : null;
  }
  createConnection(input) {
    const timestamp = now();
    this.db.prepare("INSERT INTO ads_studio_connections (id, name, status, token_hint, meta_user_id, granted_scopes_json, created_at, updated_at) VALUES (?, ?, 'active', ?, ?, ?, ?, ?)").run(input.id, input.name, input.tokenHint, input.metaUserId, JSON.stringify(input.grantedScopes), timestamp, timestamp);
    return this.connection(input.id);
  }
  /** With `revision`, the change applies only to the connection as it was opened. */
  updateConnection(id, patch, revision) {
    const current = this.connection(id);
    if (!current) throw new Error("Meta Ads connection not found");
    if (revision !== void 0 && current.revision !== revision) throw new Error("Connection changed since it was opened");
    const next = { ...current, ...patch };
    const changed = this.db.prepare("UPDATE ads_studio_connections SET status = ?, token_hint = ?, meta_user_id = ?, granted_scopes_json = ?, last_synced_at = ?, last_error = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(next.status, next.tokenHint, next.metaUserId, JSON.stringify(next.grantedScopes), next.lastSyncedAt, next.lastError, now(), id, current.revision);
    if (Number(changed.changes) !== 1) throw new Error("Connection changed since it was opened");
    return this.connection(id);
  }
  upsertAccounts(connectionId, accounts) {
    const timestamp = now();
    const find = this.db.prepare("SELECT id FROM ads_studio_accounts WHERE connection_id = ? AND provider_account_id = ?");
    const insert = this.db.prepare(`INSERT INTO ads_studio_accounts (id, connection_id, provider_account_id, name, currency, timezone, provider_status, last_discovered_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const update = this.db.prepare(`UPDATE ads_studio_accounts SET name = ?, currency = ?, timezone = ?, provider_status = ?, last_discovered_at = ?, revision = revision + 1, updated_at = ? WHERE id = ?`);
    for (const account of accounts) {
      const existing = find.get(connectionId, account.accountId);
      if (existing) update.run(account.name, account.currency, account.timezone, account.status, timestamp, timestamp, existing.id);
      else insert.run(randomUUID(), connectionId, account.accountId, account.name, account.currency, account.timezone, account.status, timestamp, timestamp, timestamp);
    }
    return this.accounts(connectionId);
  }
  accounts(connectionId) {
    const rows = connectionId ? this.db.prepare("SELECT * FROM ads_studio_accounts WHERE connection_id = ? ORDER BY enabled DESC, name, id").all(connectionId) : this.db.prepare("SELECT * FROM ads_studio_accounts ORDER BY enabled DESC, name, id").all();
    return rows.map(toAccount);
  }
  requireAccount(id) {
    const row = this.db.prepare("SELECT * FROM ads_studio_accounts WHERE id = ?").get(id);
    if (!row) throw new Error("Ad account not found");
    return toAccount(row);
  }
  setAccountEnabled(id, enabled, revision) {
    const changed = this.db.prepare("UPDATE ads_studio_accounts SET enabled = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(enabled ? 1 : 0, now(), id, revision);
    if (Number(changed.changes) !== 1) throw new Error(this.db.prepare("SELECT 1 FROM ads_studio_accounts WHERE id = ?").get(id) ? "Ad account changed since it was opened" : "Ad account not found");
    return this.requireAccount(id);
  }
  markSync(id, state, error, completed = false) {
    const timestamp = now();
    this.db.prepare("UPDATE ads_studio_accounts SET sync_state = ?, last_error = ?, last_synced_at = CASE WHEN ? THEN ? ELSE last_synced_at END, revision = revision + 1, updated_at = ? WHERE id = ?").run(state, error, completed ? 1 : 0, timestamp, timestamp, id);
    return this.requireAccount(id);
  }
  upsertCampaigns(accountId, campaigns, syncedAt = now()) {
    const find = this.db.prepare("SELECT id FROM ads_studio_campaigns WHERE account_id = ? AND provider_campaign_id = ?");
    const insert = this.db.prepare(`INSERT INTO ads_studio_campaigns (id, account_id, provider_campaign_id, name, status, effective_status, objective, daily_budget, lifetime_budget, provider_updated_at, last_synced_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const update = this.db.prepare(`UPDATE ads_studio_campaigns SET name = ?, status = ?, effective_status = ?, objective = ?, daily_budget = ?, lifetime_budget = ?, provider_updated_at = ?, last_synced_at = ?, revision = revision + 1, updated_at = ? WHERE id = ?`);
    const ids = /* @__PURE__ */ new Map();
    for (const campaign of campaigns) {
      const existing = find.get(accountId, campaign.id);
      const id = existing?.id ?? randomUUID();
      if (existing) update.run(campaign.name, campaign.status, campaign.effectiveStatus, campaign.objective, campaign.dailyBudget, campaign.lifetimeBudget, campaign.updatedAt, syncedAt, syncedAt, id);
      else insert.run(id, accountId, campaign.id, campaign.name, campaign.status, campaign.effectiveStatus, campaign.objective, campaign.dailyBudget, campaign.lifetimeBudget, campaign.updatedAt, syncedAt, syncedAt, syncedAt);
      ids.set(campaign.id, id);
    }
    return ids;
  }
  replaceInsights(accountId, ids, insights, since, until, observedAt = now()) {
    this.db.prepare("DELETE FROM ads_studio_insight_daily WHERE account_id = ? AND date BETWEEN ? AND ?").run(accountId, since, until);
    const insert = this.db.prepare(`INSERT INTO ads_studio_insight_daily (id, account_id, campaign_id, date, spend, impressions, reach, clicks, ctr, cpc, cpm, observed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    let kept = 0;
    for (const insight of insights) {
      const campaignId = ids.get(insight.campaignId) ?? this.db.prepare("SELECT id FROM ads_studio_campaigns WHERE account_id = ? AND provider_campaign_id = ?").get(accountId, insight.campaignId)?.id;
      if (!campaignId) continue;
      insert.run(randomUUID(), accountId, campaignId, insight.dateStart, insight.spend, insight.impressions, insight.reach, insight.clicks, insight.ctr, insight.cpc, insight.cpm, observedAt);
      kept++;
    }
    return kept;
  }
  campaigns(input = {}) {
    const where = [input.archived ? "c.archived_at IS NOT NULL" : "c.archived_at IS NULL"];
    const params = [];
    if (input.accountId) {
      where.push("c.account_id = ?");
      params.push(input.accountId);
    }
    if (input.status) {
      where.push("c.effective_status = ?");
      params.push(input.status);
    }
    if (input.query?.trim()) {
      where.push("(c.name LIKE ? ESCAPE '\\' OR a.name LIKE ? ESCAPE '\\')");
      const value = `%${input.query.trim().replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
      params.push(value, value);
    }
    const limit = Math.max(1, Math.min(200, Math.trunc(Number(input.limit) || 50)));
    const offset = Math.max(0, Math.trunc(Number(input.offset) || 0));
    const join = "FROM ads_studio_campaigns c JOIN ads_studio_accounts a ON a.id = c.account_id";
    const total = Number(this.db.prepare(`SELECT count(*) AS total ${join} WHERE ${where.join(" AND ")}`).get(...params).total);
    const rows = this.db.prepare(`SELECT c.*, a.name AS account_name, a.currency, a.timezone ${join} WHERE ${where.join(" AND ")} ORDER BY c.updated_at DESC, c.id LIMIT ? OFFSET ?`).all(...params, limit, offset);
    return { items: rows.map(toCampaign), total };
  }
  campaign(id, since, until) {
    const row = this.db.prepare(`SELECT c.*, a.name AS account_name, a.currency, a.timezone FROM ads_studio_campaigns c JOIN ads_studio_accounts a ON a.id = c.account_id WHERE c.id = ?`).get(id);
    if (!row) throw new Error("Campaign not found");
    const campaign = toCampaign(row);
    const daily = this.daily("campaign_id = ?", [id], since, until);
    return { ...campaign, metrics: totals(daily, campaign.currency), daily };
  }
  setCampaignArchived(id, archived, revision) {
    const result = this.db.prepare("UPDATE ads_studio_campaigns SET archived_at = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").run(archived ? now() : null, now(), id, revision);
    if (Number(result.changes) !== 1) throw new Error(this.db.prepare("SELECT 1 FROM ads_studio_campaigns WHERE id = ?").get(id) ? "Campaign changed since it was opened" : "Campaign not found");
    return this.campaign(id, "1970-01-01", "2999-12-31");
  }
  performance(since, until) {
    const accounts = this.accounts().filter((account) => account.enabled);
    const currencies = [...new Set(accounts.map((account) => account.currency))].sort();
    const groups = currencies.map((currency) => {
      const ids = accounts.filter((account) => account.currency === currency).map((account) => account.id);
      if (!ids.length) return { ...totals([], currency), accountCount: 0, campaignCount: 0 };
      const marks = ids.map(() => "?").join(",");
      const daily2 = this.daily(`i.account_id IN (${marks})`, ids, since, until);
      const campaignCount = Number(this.db.prepare(`SELECT count(DISTINCT c.id) AS total FROM ads_studio_campaigns c WHERE c.archived_at IS NULL AND c.account_id IN (${marks})`).get(...ids).total);
      return { ...totals(daily2, currency), accountCount: ids.length, campaignCount };
    });
    const rows = this.db.prepare(`SELECT i.*, a.currency FROM ads_studio_insight_daily i JOIN ads_studio_accounts a ON a.id = i.account_id WHERE a.enabled = 1 AND i.date BETWEEN ? AND ? ORDER BY i.date, a.currency`).all(since, until);
    const byDate = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const key = `${row.date}:${row.currency}`;
      byDate.set(key, [...byDate.get(key) ?? [], row]);
    }
    const daily = [...byDate.values()].map((items) => ({ date: String(items[0].date), currency: String(items[0].currency), spend: sumDecimals(items.map((item) => nullable2(item.spend))), impressions: sumNullable(items.map((item) => item.impressions === null ? null : Number(item.impressions))), reach: items.length === 1 && items[0].reach !== null ? Number(items[0].reach) : null, clicks: sumNullable(items.map((item) => item.clicks === null ? null : Number(item.clicks))), ctr: null, cpc: null, cpm: null }));
    return { since, until, groups, daily, warning: currencies.length > 1 ? "Totals are separated by currency. Ads Studio never adds unlike currencies together." : null };
  }
  overview(connectionCount) {
    const one = (sql) => Number(this.db.prepare(sql).get().total);
    const latest = this.db.prepare("SELECT max(last_synced_at) AS value FROM ads_studio_accounts").get();
    return { connections: connectionCount, enabledAccounts: one("SELECT count(*) AS total FROM ads_studio_accounts WHERE enabled = 1"), campaigns: one("SELECT count(*) AS total FROM ads_studio_campaigns WHERE archived_at IS NULL"), lastSyncedAt: latest.value, attention: one("SELECT count(*) AS total FROM ads_studio_accounts WHERE enabled = 1 AND sync_state = 'error'") };
  }
  daily(clause, params, since, until) {
    const rows = this.db.prepare(`SELECT i.* FROM ads_studio_insight_daily i WHERE ${clause} AND i.date BETWEEN ? AND ? ORDER BY i.date`).all(...params, since, until);
    return rows.map((row) => ({ date: String(row.date), spend: nullable2(row.spend), impressions: row.impressions === null ? null : Number(row.impressions), reach: row.reach === null ? null : Number(row.reach), clicks: row.clicks === null ? null : Number(row.clicks), ctr: nullable2(row.ctr), cpc: nullable2(row.cpc), cpm: nullable2(row.cpm) }));
  }
};
function toConnection(row) {
  let grantedScopes = [];
  try {
    const parsed = JSON.parse(String(row.granted_scopes_json ?? "[]"));
    if (Array.isArray(parsed)) grantedScopes = parsed.map(String);
  } catch {
  }
  return { id: String(row.id), name: String(row.name), status: String(row.status), tokenHint: String(row.token_hint ?? ""), metaUserId: nullable2(row.meta_user_id), grantedScopes, lastSyncedAt: nullable2(row.last_synced_at), lastError: nullable2(row.last_error), revision: Number(row.revision), createdAt: String(row.created_at), updatedAt: String(row.updated_at) };
}
function toAccount(row) {
  return { id: String(row.id), connectionId: String(row.connection_id), providerAccountId: String(row.provider_account_id), name: String(row.name), currency: String(row.currency), timezone: String(row.timezone), providerStatus: nullable2(row.provider_status), enabled: Number(row.enabled) === 1, syncState: String(row.sync_state), lastDiscoveredAt: String(row.last_discovered_at), lastSyncedAt: nullable2(row.last_synced_at), lastError: nullable2(row.last_error), revision: Number(row.revision), createdAt: String(row.created_at), updatedAt: String(row.updated_at) };
}
function toCampaign(row) {
  return { id: String(row.id), accountId: String(row.account_id), accountName: String(row.account_name), providerCampaignId: String(row.provider_campaign_id), name: String(row.name), status: String(row.status), effectiveStatus: String(row.effective_status), objective: nullable2(row.objective), dailyBudget: nullable2(row.daily_budget), lifetimeBudget: nullable2(row.lifetime_budget), currency: String(row.currency), timezone: String(row.timezone), providerUpdatedAt: nullable2(row.provider_updated_at), lastSyncedAt: String(row.last_synced_at), revision: Number(row.revision), archivedAt: nullable2(row.archived_at) };
}
function totals(daily, currency) {
  const spendText = sumDecimals(daily.map((item) => item.spend)), spend = spendText === null ? null : Number(spendText), impressions = sumNullable(daily.map((item) => item.impressions)), reach = sumNullable(daily.map((item) => item.reach)), clicks = sumNullable(daily.map((item) => item.clicks));
  return { spend: spendText, impressions, reach: daily.length === 1 ? reach : null, clicks, ctr: impressions && clicks !== null ? money(clicks / impressions * 100) : null, cpc: clicks && spend !== null ? money(spend / clicks) : null, cpm: impressions && spend !== null ? money(spend / impressions * 1e3) : null, currency };
}

// src/mini-apps/ads-studio/server/routes.ts
var body = (request) => request.body ?? {};
var text = (value) => typeof value === "string" && value.trim() ? value.trim() : void 0;
var number = (value) => Number.isFinite(Number(value)) ? Number(value) : void 0;
var dates = (request) => {
  const until = text(request.query.until) ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const start = /* @__PURE__ */ new Date(`${until}T12:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 29);
  const since = text(request.query.since) ?? start.toISOString().slice(0, 10);
  if (![since, until].every((value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)))) throw new Error("Date must use YYYY-MM-DD");
  if (since > until) throw new Error("Start date must be on or before end date");
  return { since, until };
};
function createAdsStudioRouter(service, router) {
  const base = "/api/ads-studio";
  const send = (handler) => (request, response, next) => {
    Promise.resolve().then(() => handler(request)).then((value) => response.json(value), next);
  };
  router.get(`${base}/overview`, send(() => service.repository.overview(service.connections().filter((item) => item.status !== "archived").length)));
  router.get(`${base}/connections`, send(() => service.connections()));
  router.post(`${base}/connections`, send((request) => service.createConnection(body(request))));
  router.post(`${base}/connections/:id/credential`, send((request) => service.replaceCredential(String(request.params.id), body(request))));
  router.post(`${base}/connections/:id/discover`, send((request) => service.rediscover(String(request.params.id))));
  router.post(`${base}/connections/:id/archive`, send((request) => service.setConnectionArchived(String(request.params.id), true, Number(body(request).revision))));
  router.post(`${base}/connections/:id/restore`, send((request) => service.setConnectionArchived(String(request.params.id), false, Number(body(request).revision))));
  router.get(`${base}/accounts`, send((request) => service.repository.accounts(text(request.query.connectionId))));
  router.post(`${base}/accounts/:id/enabled`, send((request) => service.repository.setAccountEnabled(String(request.params.id), body(request).enabled === true, Number(body(request).revision))));
  router.post(`${base}/sync`, send((request) => {
    const input = body(request), accountIds = input.accountIds;
    return service.sync({ connectionId: text(input.connectionId), accountIds: Array.isArray(accountIds) ? accountIds.map(String) : void 0, since: input.since, until: input.until });
  }));
  router.get(`${base}/campaigns`, send((request) => service.repository.campaigns({ query: text(request.query.q), archived: request.query.archived === "true", accountId: text(request.query.accountId), status: text(request.query.status), limit: number(request.query.limit), offset: number(request.query.offset) })));
  router.get(`${base}/campaigns/:id`, send((request) => {
    const range = dates(request);
    return service.repository.campaign(String(request.params.id), range.since, range.until);
  }));
  router.post(`${base}/campaigns/:id/archive`, send((request) => service.repository.setCampaignArchived(String(request.params.id), true, Number(body(request).revision))));
  router.post(`${base}/campaigns/:id/restore`, send((request) => service.repository.setCampaignArchived(String(request.params.id), false, Number(body(request).revision))));
  router.get(`${base}/performance`, send((request) => {
    const range = dates(request);
    return service.repository.performance(range.since, range.until);
  }));
  return router;
}

// src/mini-apps/ads-studio/server/service.ts
import { randomUUID as randomUUID2 } from "node:crypto";
var secretKey = (connectionId) => `meta-ads:${connectionId}`;
var nonEmpty = (value, label) => {
  const text2 = typeof value === "string" ? value.trim() : "";
  if (!text2) throw new Error(`${label} is required`);
  return text2;
};
var date = (value, fallback) => {
  const text2 = typeof value === "string" ? value : fallback;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text2) || Number.isNaN(Date.parse(`${text2}T00:00:00Z`))) throw new Error("Date must use YYYY-MM-DD");
  return text2;
};
var dateInTimezone = (timezone, input = /* @__PURE__ */ new Date()) => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(input).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
var daysBefore = (yyyyMmDd, days) => {
  const value = /* @__PURE__ */ new Date(`${yyyyMmDd}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() - days);
  return value.toISOString().slice(0, 10);
};
var AdsService = class {
  constructor(repository, provider, secrets) {
    this.repository = repository;
    this.provider = provider;
    this.secrets = secrets;
  }
  repository;
  provider;
  secrets;
  connections() {
    return this.repository.connections().map((connection) => {
      const accounts = this.repository.accounts(connection.id);
      return { id: connection.id, name: connection.name, status: connection.status, tokenHint: connection.tokenHint, grantedScopes: connection.grantedScopes, lastSyncedAt: connection.lastSyncedAt, lastError: connection.lastError, revision: connection.revision, createdAt: connection.createdAt, updatedAt: connection.updatedAt, accountCount: accounts.length, enabledAccountCount: accounts.filter((account) => account.enabled).length };
    });
  }
  async createConnection(input) {
    const accessToken = nonEmpty(input.accessToken, "Access token");
    const verified = await this.verify(accessToken);
    const id = randomUUID2();
    await this.secrets.set(secretKey(id), accessToken);
    try {
      const connection = this.repository.createConnection({ id, name: typeof input.name === "string" && input.name.trim() ? input.name.trim() : `${verified.identity.name} \xB7 Meta Ads`, tokenHint: accessToken.slice(-4), metaUserId: verified.identity.id, grantedScopes: verified.scopes });
      this.repository.upsertAccounts(connection.id, verified.accounts);
      return this.connections().find((item) => item.id === id);
    } catch (error) {
      await this.secrets.remove(secretKey(id));
      throw error;
    }
  }
  async replaceCredential(connectionId, input) {
    const current = this.requireConnection(connectionId);
    if (current.revision !== Number(input.revision)) throw new Error("Connection changed since it was opened");
    const accessToken = nonEmpty(input.accessToken, "Access token");
    const verified = await this.verify(accessToken);
    if (current.metaUserId && verified.identity.id !== current.metaUserId) throw new Error("This token belongs to a different Meta identity. Create a separate connection instead.");
    const previousToken = await this.secrets.get(secretKey(connectionId));
    await this.secrets.set(secretKey(connectionId), accessToken);
    try {
      this.repository.updateConnection(connectionId, { status: "active", lastError: null, tokenHint: accessToken.slice(-4), metaUserId: verified.identity.id, grantedScopes: verified.scopes }, current.revision);
    } catch (error) {
      if (previousToken) await this.secrets.set(secretKey(connectionId), previousToken);
      else await this.secrets.remove(secretKey(connectionId));
      throw error;
    }
    this.repository.upsertAccounts(connectionId, verified.accounts);
    return this.connections().find((item) => item.id === connectionId);
  }
  async rediscover(connectionId) {
    this.requireConnection(connectionId);
    const token = await this.requireToken(connectionId);
    try {
      const accounts = await this.provider.accounts(token);
      this.repository.upsertAccounts(connectionId, accounts);
      this.repository.updateConnection(connectionId, { status: "active", lastError: null });
      return this.repository.accounts(connectionId);
    } catch (error) {
      this.repository.updateConnection(connectionId, { status: "error", lastError: message(error) });
      throw error;
    }
  }
  setConnectionArchived(connectionId, archived, revision) {
    const connection = this.requireConnection(connectionId);
    const updated = this.repository.updateConnection(connectionId, { status: archived ? "archived" : "active", lastError: archived ? null : connection.lastError }, revision);
    return this.connections().find((item) => item.id === updated.id);
  }
  async sync(input = {}) {
    const startedAt = (/* @__PURE__ */ new Date()).toISOString();
    const requested = new Set(input.accountIds ?? []);
    const accounts = this.repository.accounts(input.connectionId).filter((account) => {
      const connection = this.repository.connection(account.connectionId);
      return account.enabled && connection?.status === "active" && (!requested.size || requested.has(account.id));
    });
    if (!accounts.length) throw new Error("Enable at least one ad account before synchronizing");
    const results = [];
    for (const account of accounts) {
      this.repository.markSync(account.id, "syncing", null);
      try {
        const connection = this.requireConnection(account.connectionId);
        if (connection.status === "archived" || connection.status === "paused") throw new Error("The Meta Ads connection is not active");
        const token = await this.requireToken(account.connectionId);
        const today = dateInTimezone(account.timezone);
        const since = date(input.since, daysBefore(today, 29)), until = date(input.until, today);
        if (since > until) throw new Error("Start date must be on or before end date");
        const [campaigns, insights] = await Promise.all([this.provider.campaigns(token, account.providerAccountId), this.provider.insights(token, account.providerAccountId, since, until)]);
        const ids = this.repository.upsertCampaigns(account.id, campaigns);
        const metricRows = this.repository.replaceInsights(account.id, ids, insights, since, until);
        this.repository.markSync(account.id, "ready", null, true);
        results.push({ accountId: account.id, campaigns: campaigns.length, metricRows, error: null });
      } catch (error) {
        const reason = message(error);
        this.repository.markSync(account.id, "error", reason);
        results.push({ accountId: account.id, campaigns: 0, metricRows: 0, error: reason });
      }
    }
    for (const connectionId of new Set(accounts.map((account) => account.connectionId))) {
      const accountIds = new Set(accounts.filter((account) => account.connectionId === connectionId).map((account) => account.id));
      const failures = results.filter((result) => accountIds.has(result.accountId) && result.error);
      this.repository.updateConnection(connectionId, failures.length ? { status: "error", lastError: failures.map((result) => result.error).join("; ") } : { status: "active", lastError: null, lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString() });
    }
    return { startedAt, finishedAt: (/* @__PURE__ */ new Date()).toISOString(), accounts: results, succeeded: results.filter((result) => !result.error).length, failed: results.filter((result) => result.error).length };
  }
  async verify(accessToken) {
    const [identity, permissions, accounts] = await Promise.all([this.provider.identity(accessToken), this.provider.permissions(accessToken), this.provider.accounts(accessToken)]);
    const scopes = permissions.filter((item) => item.status === "granted").map((item) => item.permission);
    if (!scopes.some((scope) => scope === "ads_read" || scope === "ads_management")) throw new Error("The token needs ads_read or ads_management permission");
    if (!accounts.length) throw new Error("Meta returned no accessible ad accounts");
    return { identity, scopes, accounts };
  }
  requireConnection(id) {
    const connection = this.repository.connection(id);
    if (!connection) throw new Error("Meta Ads connection not found");
    return connection;
  }
  async requireToken(id) {
    const token = await this.secrets.get(secretKey(id));
    if (!token) throw new Error("Meta Ads credential is missing. Replace the access token in Settings.");
    return token;
  }
};
var message = (error) => error instanceof Error ? error.message : String(error);

// src/mini-apps/ads-studio/server/app.ts
function createAdsStudio(sdk, router, provider = new MetaAdsProvider()) {
  const repository = new AdsRepository(sdk.db);
  repository.recoverInterruptedSyncs();
  const service = new AdsService(repository, provider, sdk.secrets);
  return { repository, service, router: createAdsStudioRouter(service, router) };
}

// src/mini-apps/ads-studio/server/migrations/0001-ads.ts
var ads = {
  id: "0001-ads",
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS ads_studio_connections (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'needs_scope', 'needs_configuration', 'error', 'archived')),
        token_hint TEXT NOT NULL DEFAULT '',
        meta_user_id TEXT,
        granted_scopes_json TEXT NOT NULL DEFAULT '[]',
        last_synced_at TEXT,
        last_error TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ads_studio_accounts (
        id TEXT PRIMARY KEY,
        connection_id TEXT NOT NULL REFERENCES ads_studio_connections(id) ON DELETE CASCADE,
        provider_account_id TEXT NOT NULL,
        name TEXT NOT NULL,
        currency TEXT NOT NULL,
        timezone TEXT NOT NULL,
        provider_status TEXT,
        enabled INTEGER NOT NULL DEFAULT 0,
        sync_state TEXT NOT NULL DEFAULT 'idle' CHECK (sync_state IN ('idle', 'syncing', 'ready', 'error')),
        last_discovered_at TEXT NOT NULL,
        last_synced_at TEXT,
        last_error TEXT,
        revision INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        UNIQUE (connection_id, provider_account_id)
      );
      CREATE INDEX IF NOT EXISTS ads_studio_accounts_connection ON ads_studio_accounts(connection_id, enabled, name);

      CREATE TABLE IF NOT EXISTS ads_studio_campaigns (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL REFERENCES ads_studio_accounts(id) ON DELETE CASCADE,
        provider_campaign_id TEXT NOT NULL,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        effective_status TEXT NOT NULL,
        objective TEXT,
        daily_budget TEXT,
        lifetime_budget TEXT,
        provider_updated_at TEXT,
        last_synced_at TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        archived_at TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        UNIQUE (account_id, provider_campaign_id)
      );
      CREATE INDEX IF NOT EXISTS ads_studio_campaigns_collection ON ads_studio_campaigns(archived_at, updated_at DESC, id);

      CREATE TABLE IF NOT EXISTS ads_studio_insight_daily (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL REFERENCES ads_studio_accounts(id) ON DELETE CASCADE,
        campaign_id TEXT NOT NULL REFERENCES ads_studio_campaigns(id) ON DELETE CASCADE,
        date TEXT NOT NULL,
        spend TEXT,
        impressions INTEGER,
        reach INTEGER,
        clicks INTEGER,
        ctr TEXT,
        cpc TEXT,
        cpm TEXT,
        observed_at TEXT NOT NULL,
        UNIQUE (account_id, campaign_id, date)
      );
      CREATE INDEX IF NOT EXISTS ads_studio_insights_period ON ads_studio_insight_daily(date, account_id, campaign_id);
    `);
  }
};

// src/mini-apps/ads-studio/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [ads]
};

// src/mini-apps/ads-studio/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    return { router: createAdsStudio(sdk, sdk.router()).router };
  }
});
export {
  index_default as default
};
