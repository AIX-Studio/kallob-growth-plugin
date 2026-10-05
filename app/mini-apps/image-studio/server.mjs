import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/image-studio/manifest.ts
var manifest = {
  id: "image-studio",
  version: "1.1.0",
  requiresCore: ">=2.0.0 <3"
};

// src/mini-apps/image-studio/release-notes.json
var release_notes_default = [
  {
    version: "1.1.0",
    vi: "Ch\u1EA1y tr\xEAn Growth Studio 0.21: \u0111\u01B0\u1EE3c c\xE0i c\xF9ng l\xFAc khi Growth Studio c\u1EADp nh\u1EADt, kh\xF4ng ph\u1EA3i ch\u1EDD t\u1EA3i th\xEAm.",
    en: "Runs on Growth Studio 0.21: installed together with Growth Studio updates, with no extra download afterwards."
  },
  {
    version: "1.0.2",
    vi: "Sau m\u1ED7i l\u1EA7n Image Studio c\u1EADp nh\u1EADt, Studio cho b\u1EA1n bi\u1EBFt c\xF3 g\xEC m\u1EDBi.",
    en: "After every Image Studio update, Studio tells you what is new."
  },
  {
    version: "1.0.1",
    vi: "Th\xEAm ki\u1EC3u \u1EA3nh B\xECa t\u1EA1p ch\xED trong nh\xF3m C\xE1 nh\xE2n: ch\xE2n dung c\u1EE7a b\u1EA1n th\xE0nh b\xECa t\u1EA1p ch\xED, c\xF3 t\xEAn v\xE0 m\u1ED9t d\xF2ng t\xEDt.",
    en: "New Magazine cover style under Personal: your portrait as a magazine cover with your name and a headline."
  },
  {
    version: "1.0.0",
    vi: "Image Studio gi\u1EDD l\xE0 m\u1ED9t mini-app ri\xEAng, t\u1EF1 c\u1EADp nh\u1EADt m\xE0 kh\xF4ng c\u1EA7n c\u1EADp nh\u1EADt c\u1EA3 Growth Studio.",
    en: "Image Studio is now its own mini-app and updates without updating all of Growth Studio."
  }
];

// src/mini-apps/image-studio/server/codex.ts
function imageAssetSaveTool(service) {
  return {
    definition: {
      name: "image_asset_save",
      title: "Save image options to Growth Studio",
      description: "For an Image Studio task: hand the images you generated to Growth Studio, where the founder picks, revises or approves them. Pass the absolute path of each generated file (PNG, JPEG or WebP) and a short caption. Studio copies the files; leave the originals in place. After calling, end your turn.",
      inputSchema: {
        type: "object",
        properties: {
          task_id: { type: "string", description: "Growth Studio task id from the task prompt." },
          images: {
            type: "array",
            minItems: 1,
            maxItems: 6,
            items: {
              type: "object",
              properties: {
                path: { type: "string", description: "Absolute path of the generated image file." },
                caption: { type: "string", description: "One short line on what makes this option different, in the founder's language." }
              },
              required: ["path"],
              additionalProperties: false
            }
          }
        },
        required: ["task_id", "images"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
    },
    async call(args) {
      const taskId = String(args.task_id ?? "").trim();
      if (!taskId) throw new Error("task_id is required.");
      try {
        const saved = await service.saveOptions(taskId, args.images);
        return { text: `Saved ${saved.images.length} images to Growth Studio as round ${saved.round}. The founder chooses there. End your turn now; a change request will arrive as the next message.` };
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`${/[.!?]$/.test(reason) ? reason : `${reason}.`} Fix this and call image_asset_save again.`);
      }
    }
  };
}
var imageTaskKind = {
  type: "image-studio",
  deliver: (task) => `Save the image options with the image_asset_save tool (task_id ${JSON.stringify(task.id)}), then end your turn.`
};

// src/mini-apps/image-studio/server/migrations/0001-baseline.ts
var baseline = {
  id: "0001-baseline",
  transaction: false,
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS image_assets (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL,
        kind TEXT NOT NULL CHECK (kind IN ('reference', 'option')),
        round INTEGER NOT NULL DEFAULT 0,
        caption TEXT NOT NULL DEFAULT '',
        file_name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        bytes INTEGER NOT NULL,
        approved_at TEXT,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS image_assets_task_idx ON image_assets(task_id, round DESC, created_at);
      CREATE INDEX IF NOT EXISTS image_assets_approved_idx ON image_assets(approved_at DESC) WHERE approved_at IS NOT NULL;
      CREATE TABLE IF NOT EXISTS image_my_photos (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL CHECK (kind IN ('portrait', 'product', 'other')),
        name TEXT NOT NULL DEFAULT '',
        file_name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        bytes INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS image_style_assets (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL DEFAULT '',
        file_name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        bytes INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    if (!columns(db, "image_assets").has("final_file_name")) db.exec("ALTER TABLE image_assets ADD COLUMN final_file_name TEXT");
  }
};
var columns = (db, table) => new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));

// src/mini-apps/image-studio/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline]
};

// src/mini-apps/image-studio/server/store.ts
var ImageStudioStore = class {
  constructor(db) {
    this.db = db;
  }
  db;
  addImageAsset(input) {
    this.db.prepare(`INSERT INTO image_assets (id, task_id, kind, round, caption, file_name, mime_type, bytes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(input.id, input.taskId, input.kind, input.round, input.caption, input.fileName, input.mimeType, input.bytes, now());
    return this.getImageAsset(input.id).asset;
  }
  /** The asset and the file name it is stored under (relative to the task's image folder). */
  getImageAsset(id) {
    const row = this.db.prepare("SELECT * FROM image_assets WHERE id = ?").get(id);
    return row ? { asset: toImageAsset(row), fileName: row.file_name, finalFileName: row.final_file_name } : null;
  }
  listImageAssets(taskId) {
    return this.db.prepare("SELECT * FROM image_assets WHERE task_id = ? ORDER BY round DESC, created_at, rowid").all(taskId).map(toImageAsset);
  }
  /** Approved options, newest approval first. */
  listApprovedImages(limit = 500) {
    return this.db.prepare("SELECT * FROM image_assets WHERE approved_at IS NOT NULL ORDER BY approved_at DESC LIMIT ?").all(limit).map(toImageAsset);
  }
  nextImageRound(taskId) {
    const row = this.db.prepare("SELECT MAX(round) AS round FROM image_assets WHERE task_id = ? AND kind = 'option'").get(taskId);
    return Number(row.round ?? 0) + 1;
  }
  /** Approves an option; `finalFileName` is the picture with the words Studio drew on it. */
  approveImageAsset(id, finalFileName = null) {
    this.db.prepare("UPDATE image_assets SET approved_at = COALESCE(approved_at, ?), final_file_name = COALESCE(?, final_file_name) WHERE id = ? AND kind = 'option'").run(now(), finalFileName, id);
    return this.getImageAsset(id).asset;
  }
  addMyPhoto(input) {
    this.db.prepare("INSERT INTO image_my_photos (id, kind, name, file_name, mime_type, bytes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(input.id, input.kind, input.name, input.fileName, input.mimeType, input.bytes, now());
    return this.getMyPhoto(input.id).photo;
  }
  getMyPhoto(id) {
    const row = this.db.prepare("SELECT * FROM image_my_photos WHERE id = ?").get(id);
    return row ? { photo: toMyPhoto(row), fileName: row.file_name } : null;
  }
  listMyPhotos() {
    return this.db.prepare("SELECT * FROM image_my_photos ORDER BY created_at DESC, rowid DESC").all().map(toMyPhoto);
  }
  removeMyPhoto(id) {
    this.db.prepare("DELETE FROM image_my_photos WHERE id = ?").run(id);
  }
  addStyleImage(input) {
    this.db.prepare("INSERT INTO image_style_assets (id, name, file_name, mime_type, bytes, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(input.id, input.name, input.fileName, input.mimeType, input.bytes, now());
    return this.getStyleImage(input.id).image;
  }
  getStyleImage(id) {
    const row = this.db.prepare("SELECT * FROM image_style_assets WHERE id = ?").get(id);
    return row ? { image: toStyleImage(row), fileName: row.file_name } : null;
  }
  /** The saved style set with the file each picture is stored under, oldest first. */
  listStyleImages() {
    return this.db.prepare("SELECT * FROM image_style_assets ORDER BY created_at, rowid").all().map((row) => ({ image: toStyleImage(row), fileName: row.file_name }));
  }
  removeStyleImage(id) {
    this.db.prepare("DELETE FROM image_style_assets WHERE id = ?").run(id);
  }
};
var now = () => (/* @__PURE__ */ new Date()).toISOString();
function toImageAsset(row) {
  return { id: row.id, taskId: row.task_id, kind: row.kind, round: Number(row.round), caption: row.caption, mimeType: row.mime_type, bytes: Number(row.bytes), approvedAt: row.approved_at, hasFinal: Boolean(row.final_file_name), createdAt: row.created_at };
}
function toMyPhoto(row) {
  return { id: row.id, kind: row.kind, name: row.name, mimeType: row.mime_type, bytes: Number(row.bytes), createdAt: row.created_at };
}
function toStyleImage(row) {
  return { id: row.id, name: row.name, mimeType: row.mime_type, bytes: Number(row.bytes), createdAt: row.created_at };
}

// src/mini-apps/image-studio/server/repository.ts
var BRAND_CONTEXT = { name: "brand-profile.context", range: "^1.0" };
function createImageStudioRepository(sdk) {
  const store = new ImageStudioStore(sdk.db);
  const brand = () => sdk.miniApps.use(BRAND_CONTEXT.name, BRAND_CONTEXT.range);
  const imageTask = (taskId) => {
    const task = sdk.tasks.getTask(taskId);
    return task && task.source.type === "image-studio" ? task : null;
  };
  return Object.assign(store, {
    createTask: (input) => sdk.tasks.createTask(input),
    getTask: (id) => sdk.tasks.getTask(id),
    listTasks: (limit) => sdk.tasks.listTasks(limit),
    updateTask: (...args) => sdk.tasks.updateTask(...args),
    addEvent: (input) => sdk.events.addEvent(input),
    imageTask,
    /** The values an image request's words are drawn from (a price, a date), changed without a new round. */
    setImageValues(taskId, values, headline) {
      const task = imageTask(taskId);
      if (!task) throw new Error("Image request not found");
      const source = { ...task.source, imageValues: values, ...headline ? { imageHeadline: headline, imageBrief: headline } : {} };
      return sdk.tasks.updateTask(taskId, { source });
    },
    /** Approved images, newest first, with what their request asked for. */
    listLibraryImages(limit = 500) {
      const tasks = /* @__PURE__ */ new Map();
      return store.listApprovedImages(limit).flatMap((asset) => {
        if (!tasks.has(asset.taskId)) tasks.set(asset.taskId, imageTask(asset.taskId));
        const source = tasks.get(asset.taskId)?.source;
        if (!source) return [];
        return [{ ...asset, brief: source.imageBrief ?? "", headline: source.imageHeadline ?? null, size: source.imageSize ?? null, recipe: source.imageRecipe ?? null }];
      });
    },
    getBrandProfile: () => brand()?.profile() ?? null,
    getBrandGuideline: (kind) => brand()?.guideline(kind) ?? null,
    listBrandAssets: () => brand()?.assets() ?? []
  });
}

// src/mini-apps/image-studio/server/routes.ts
import path from "node:path";
function sendPicture(response, file, mimeType) {
  response.sendFile(file, { dotfiles: "allow", headers: { "content-type": mimeType, "cache-control": "private, max-age=31536000, immutable" } }, (error) => {
    if (error && !response.headersSent) response.status(404).set("cache-control", "no-store").json({ error: "Image file is missing" });
  });
}
function createImageStudioRouter({ service, router, launcherOnly }) {
  router.get("/api/image-studio/requests", (_request, response, next) => {
    try {
      response.json(service.listRequests());
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/requests", async (request, response, next) => {
    try {
      response.status(201).json(await service.createRequest(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/requests/:taskId/resend", async (request, response, next) => {
    try {
      response.json(await service.resend(String(request.params.taskId)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/requests/:taskId/images", launcherOnly, async (request, response, next) => {
    try {
      response.status(201).json(await service.saveOptions(String(request.params.taskId), request.body?.images));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/image-studio/recipes", async (_request, response, next) => {
    try {
      response.json(await service.recipes());
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/image-studio/brand", (_request, response, next) => {
    try {
      response.json(service.brand());
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/image-studio/requests/:taskId/values", (request, response, next) => {
    try {
      response.json(service.updateValues(String(request.params.taskId), request.body?.values));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/image-studio/photos", (_request, response, next) => {
    try {
      response.json(service.myPhotos());
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/photos", async (request, response, next) => {
    try {
      response.status(201).json(await service.addMyPhotos(request.body?.kind, request.body?.images));
    } catch (error) {
      next(error);
    }
  });
  router.delete("/api/image-studio/photos/:id", async (request, response, next) => {
    try {
      response.json(await service.removeMyPhoto(String(request.params.id)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/image-studio/photos/:id/file", (request, response) => {
    const file = service.myPhotoFile(String(request.params.id));
    if (!file) return void response.status(404).set("cache-control", "no-store").json({ error: "Photo not found" });
    sendPicture(response, file.path, file.mimeType);
  });
  router.get("/api/image-studio/style", (_request, response, next) => {
    try {
      response.json(service.styleImages());
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/style", async (request, response, next) => {
    try {
      response.status(201).json(await service.addStyleImages(request.body?.images));
    } catch (error) {
      next(error);
    }
  });
  router.delete("/api/image-studio/style/:id", async (request, response, next) => {
    try {
      response.json(await service.removeStyleImage(String(request.params.id)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/image-studio/style/:id/file", (request, response) => {
    const file = service.styleFile(String(request.params.id));
    if (!file) return void response.status(404).set("cache-control", "no-store").json({ error: "Style image not found" });
    sendPicture(response, file.path, file.mimeType);
  });
  router.get("/api/image-studio/library", (_request, response, next) => {
    try {
      response.json(service.library());
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/images/:id/approve", async (request, response, next) => {
    try {
      response.json(await service.approve(String(request.params.id), request.body?.finalBase64));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/images/:id/variations", async (request, response, next) => {
    try {
      response.json(await service.revise(String(request.params.id), null, true));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/image-studio/images/:id/revise", async (request, response, next) => {
    try {
      response.json(await service.revise(String(request.params.id), request.body?.note));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/image-studio/images/:id/file", (request, response) => {
    const file = service.file(String(request.params.id), request.query.final === "1");
    if (!file) return void response.status(404).set("cache-control", "no-store").json({ error: "Image not found" });
    if (request.query.download === "1") response.attachment(`kallob-image-${file.asset.id.slice(0, 8)}${path.extname(file.path)}`);
    sendPicture(response, file.path, file.mimeType);
  });
  return router;
}

// src/mini-apps/image-studio/server/service.ts
import fs from "node:fs/promises";
import path2 from "node:path";
import { randomUUID } from "node:crypto";

// src/mini-apps/image-studio/contract.ts
var recipeGroups = ["sell", "store", "personal", "season", "content"];

// src/mini-apps/image-studio/overlay-text.ts
function priceNumber(raw) {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}
function formatPrice(raw) {
  const value = priceNumber(raw);
  if (value === null) return raw.trim();
  return `${value.toLocaleString("vi-VN").replace(/,/g, ".")}\u0111`;
}
function formatDate(raw) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
  return match ? `${match[3]}/${match[2]}` : raw.trim();
}
function displayValue(field, raw) {
  if (!field) return raw.trim();
  if (field.type === "price") return formatPrice(raw);
  if (field.type === "date") return formatDate(raw);
  return raw.trim();
}
function discountPercent(oldRaw, newRaw) {
  const before = priceNumber(oldRaw);
  const after = priceNumber(newRaw);
  if (!before || after === null || after >= before) return null;
  return Math.round((before - after) / before * 100);
}
function fillLine(template, fields, values) {
  let missing = false;
  const line = template.replace(/\{\{([A-Za-z][A-Za-z0-9]*)\}\}/g, (_match, key) => {
    const raw = values[key]?.trim() ?? "";
    if (!raw) missing = true;
    return displayValue(fields.find((field) => field.key === key), raw);
  });
  return missing ? null : line.trim() || null;
}
function overlayWords(overlay, fields, values) {
  const fill = (template) => template ? fillLine(template, fields, values) : null;
  const price = (key) => {
    const raw = key ? values[key]?.trim() ?? "" : "";
    return raw ? formatPrice(raw) : null;
  };
  return {
    title: fill(overlay.title),
    oldPrice: price(overlay.oldPrice),
    newPrice: price(overlay.newPrice),
    discount: overlay.oldPrice && overlay.newPrice ? discountPercent(values[overlay.oldPrice] ?? "", values[overlay.newPrice] ?? "") : null,
    quote: fill(overlay.quote),
    lines: (overlay.lines ?? []).map((line) => fillLine(line, fields, values)).filter((line) => Boolean(line))
  };
}
function overlayWordList(words) {
  return [
    words.title,
    words.quote,
    words.oldPrice ? `${words.oldPrice} (struck through)` : null,
    words.newPrice,
    words.discount !== null ? `-${words.discount}% badge` : null,
    ...words.lines
  ].filter((word) => Boolean(word));
}

// src/mini-apps/image-studio/server/service.ts
var IMAGE_APPLICATION_KEY = "image-studio";
var OPTIONS_PER_ROUND = 1;
var MAX_IMAGES_PER_ROUND = 4;
var MAX_STUDIO_INPUTS = 4;
var MAX_REFERENCE_BYTES = 10 * 1024 * 1024;
var MAX_OPTION_BYTES = 25 * 1024 * 1024;
var MAX_FINAL_BYTES = 30 * 1024 * 1024;
var MAX_OPTIONS_PER_SAVE = 6;
var MAX_STYLE_IMAGES = 8;
var MAX_MY_PHOTOS = 40;
var imageSizes = {
  square: { label: "Square (feed post)", aspectRatio: "1:1" },
  portrait: { label: "Portrait (feed post)", aspectRatio: "4:5" },
  landscape: { label: "Landscape (banner, cover)", aspectRatio: "16:9" },
  story: { label: "Story / Reels", aspectRatio: "9:16" }
};
var extensions = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
function sniffImageType(bytes) {
  if (bytes.length >= 8 && bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) return "image/png";
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" && String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP") return "image/webp";
  return null;
}
var RECIPE_PREFIX = "image-recipe-";
var inputKinds = ["product", "portrait", "screenshot", "shop", "any"];
var fieldTypes = ["text", "longtext", "price", "date"];
var myPhotoKinds = ["portrait", "product", "other"];
var bilingual = (input) => ({ vi: String(input?.vi ?? ""), en: String(input?.en ?? "") });
function parseImageRecipe(json) {
  try {
    const value = JSON.parse(json);
    if (!value.key || !recipeGroups.includes(value.group) || !Array.isArray(value.fields)) return null;
    const input = value.input;
    const overlay = value.overlay ?? {};
    const output = value.output ?? {};
    const layout = ["price", "banner", "quote", "none"].includes(String(overlay.layout)) ? overlay.layout : "none";
    const zone = ["bottom", "top", "center"].includes(String(overlay.zone)) ? overlay.zone : "bottom";
    const text = (key) => typeof overlay[key] === "string" ? String(overlay[key]) : void 0;
    return {
      key: String(value.key),
      group: value.group,
      name: bilingual(value.name),
      icon: String(value.icon ?? ""),
      size: typeof value.size === "string" && value.size in imageSizes ? value.size : "square",
      input: input && inputKinds.includes(input.kind) ? { kind: input.kind, required: Boolean(input.required), max: Math.min(Math.max(Number(input.max) || 1, 1), 3), label: bilingual(input.label), hint: bilingual(input.hint) } : null,
      output: { purpose: bilingual(output.purpose), deliverable: bilingual(output.deliverable), channels: bilingual(output.channels) },
      fields: value.fields.filter((field) => field?.key).slice(0, 3).map((field) => ({
        key: String(field.key),
        type: fieldTypes.includes(field.type) ? field.type : "text",
        label: bilingual(field.label),
        placeholder: bilingual(field.placeholder),
        required: Boolean(field.required),
        default: String(field.default ?? "")
      })),
      overlay: { layout, zone, title: text("title"), oldPrice: text("oldPrice"), newPrice: text("newPrice"), quote: text("quote"), lines: Array.isArray(overlay.lines) ? overlay.lines.map(String) : void 0 },
      fixes: Array.isArray(value.fixes) ? value.fixes.map(bilingual).filter((fix) => fix.vi) : [],
      seasons: Array.isArray(value.seasons) ? value.seasons.map((season) => ({ from: String(season.from ?? ""), to: String(season.to ?? "") })).filter((season) => /^\d{2}-\d{2}$/.test(season.from) && /^\d{2}-\d{2}$/.test(season.to)) : [],
      designNotes: String(value.designNotes ?? ""),
      order: Number.isFinite(Number(value.order)) ? Number(value.order) : 999
    };
  } catch {
    return null;
  }
}
var zoneText = {
  bottom: "the lower 35\u201340% of the frame",
  top: "the upper 35\u201340% of the frame",
  center: "the central area of the frame (about 70% of the width and 45% of the height)"
};
function textPlan(recipe, values, brandName) {
  if (!recipe || recipe.overlay.layout === "none") return "none";
  const words = overlayWordList(overlayWords(recipe.overlay, recipe.fields, values)).map((word) => JSON.stringify(word));
  if (brandName) words.push(`the shop name ${JSON.stringify(brandName)} (small)`);
  const badge = recipe.overlay.layout === "price" && recipe.overlay.oldPrice ? " and the top-right corner (a round discount badge)" : "";
  return `Studio draws these words on top afterwards: ${words.join(", ")}. Keep ${zoneText[recipe.overlay.zone]}${badge} calm and clear for them.`;
}
function dataList(recipe, values) {
  if (!recipe) return "none";
  const lines = recipe.fields.filter((field) => values[field.key]?.trim()).map((field) => `- ${field.label.en}: ${displayValue(field, values[field.key])}`);
  return lines.length ? lines.join("\n") : "none";
}
function decodeUpload(upload) {
  const bytes = Buffer.from(String(upload?.dataBase64 ?? ""), "base64");
  const mimeType = sniffImageType(bytes);
  if (!mimeType) throw new Error("Images must be PNG, JPEG or WebP");
  if (bytes.length > MAX_REFERENCE_BYTES) throw new Error("Each image must be at most 10 MB");
  return { bytes, mimeType, name: String(upload?.name ?? "").trim().slice(0, 120) };
}
function shortLine(text, max) {
  const line = text.replace(/\s+/g, " ").trim();
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}\u2026` : line;
}
function recipeHeadline(recipe, values) {
  const summary = recipe.fields.filter((field) => values[field.key]).slice(0, 2).map((field) => displayValue(field, values[field.key]));
  return [recipe.name.vi, ...summary].join(" \xB7 ");
}
var VARIATION_NOTE = "Bi\u1EBFn th\u1EC3 m\u1EDBi: c\xF9ng m\u1EE5c \u0111\xEDch, c\xF9ng s\u1EA3n ph\u1EA9m ho\u1EB7c c\xF9ng ng\u01B0\u1EDDi, nh\u01B0ng b\u1ED1 c\u1EE5c, g\xF3c ch\u1EE5p ho\u1EB7c b\u1ED1i c\u1EA3nh kh\xE1c h\u1EB3n c\xE1c ph\u01B0\u01A1ng \xE1n tr\u01B0\u1EDBc.";
var silentAttention = { request: () => void 0, close: () => void 0, reconcile: () => void 0 };
var ImageStudioService = class {
  constructor(store, codex, codexDesktop, prompts, projectRoot, attention = silentAttention) {
    this.store = store;
    this.codex = codex;
    this.codexDesktop = codexDesktop;
    this.prompts = prompts;
    this.projectRoot = projectRoot;
    this.attention = attention;
  }
  store;
  codex;
  codexDesktop;
  prompts;
  projectRoot;
  attention;
  /** A request whose options wait for the founder's pick, as a notification. */
  pickNotice(taskId) {
    const task = this.store.getTask(taskId);
    if (!task) return null;
    return { key: `images:${taskId}`, kind: "images", taskId, title: task.title, body: "", target: { miniApp: { id: "image-studio", section: "running" } } };
  }
  /** At start-up: the bell shows every request waiting for a pick, and nothing else. */
  reconcileAttention() {
    const waiting = this.store.listTasks(500).filter((task) => task.source.type === "image-studio" && task.status === "review" && !task.question);
    this.attention.reconcile("images", waiting.map((task) => this.pickNotice(task.id)));
  }
  folder(...parts) {
    return path2.join(this.projectRoot, ".growth-studio", "images", ...parts);
  }
  taskFolder(taskId) {
    return this.folder(taskId);
  }
  imageTask(taskId) {
    const task = this.store.imageTask(taskId);
    if (!task) throw new Error("Image request not found");
    return task;
  }
  async writeAsset(taskId, kind, round, caption, bytes, mimeType) {
    const id = randomUUID();
    const fileName = `${id}.${extensions[mimeType]}`;
    await fs.mkdir(this.taskFolder(taskId), { recursive: true });
    await fs.writeFile(path2.join(this.taskFolder(taskId), fileName), bytes);
    return this.store.addImageAsset({ id, taskId, kind, round, caption, fileName, mimeType, bytes: bytes.length });
  }
  /** The recipes Kallob Cloud serves with Image Studio, in their catalog order. */
  async recipes() {
    return (await this.recipeDefinitions()).map(({ designNotes: _notes, order: _order, ...recipe }) => recipe);
  }
  async recipeDefinitions() {
    const prompts = await this.prompts.applicationPromptsWithPrefix(IMAGE_APPLICATION_KEY, RECIPE_PREFIX);
    return prompts.map((prompt) => parseImageRecipe(prompt.template)).filter((recipe) => recipe !== null).sort((a, b) => a.order - b.order);
  }
  /** The brand Studio draws with: name, logo and colours from Brand Profile. */
  brand() {
    const profile = this.store.getBrandProfile();
    const identity = this.store.getBrandGuideline("identity");
    const palette = identity && identity.kind === "identity" ? identity.palette.filter((color) => /^#[0-9a-f]{6}$/i.test(color.hex)) : [];
    const pick = (pattern) => palette.find((color) => pattern.test(`${color.role} ${color.name}`))?.hex ?? null;
    const logoId = identity && identity.kind === "identity" && identity.logoAssetId ? identity.logoAssetId : this.store.listBrandAssets().find((asset) => asset.role === "logo" && !asset.archivedAt)?.id ?? null;
    return {
      name: profile?.name?.trim() ?? "",
      logoUrl: logoId ? `/api/brand-assets/${encodeURIComponent(logoId)}/file` : null,
      primary: pick(/primary|chính|chủ đạo/i) ?? palette[0]?.hex ?? null,
      accent: pick(/accent|nhấn|phụ/i) ?? palette[1]?.hex ?? null
    };
  }
  /** Checks the founder's answers against the recipe's fields. */
  values(fields, given) {
    const raw = given && typeof given === "object" ? given : {};
    const values = {};
    for (const field of fields) {
      const value = String(raw[field.key] ?? "").trim();
      if (value.length > (field.type === "longtext" ? 600 : 200)) throw new Error(`${field.label.en} is too long`);
      if (field.required && !value) throw new Error(`Fill in ${field.label.en}`);
      if (value && field.type === "price" && !/\d/.test(value)) throw new Error(`${field.label.en} must be a price`);
      if (value && field.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`${field.label.en} must be a date`);
      values[field.key] = value;
    }
    return values;
  }
  /** Starts a request: a task, its photos, then Codex in the background. */
  async createRequest(input) {
    const recipe = input?.recipe ? (await this.recipeDefinitions()).find((candidate) => candidate.key === input.recipe) ?? null : null;
    if (input?.recipe && !recipe) throw new Error("This image recipe is not available");
    const values = recipe ? this.values(recipe.fields, input.values) : {};
    const brief = recipe ? "" : String(input?.brief ?? "").trim();
    if (!recipe && (!brief || brief.length > 2e3)) throw new Error("Describe the image in at most 2000 characters");
    const note = String(input?.note ?? "").trim();
    if (note.length > 1e3) throw new Error("Keep the note under 1000 characters");
    const size = typeof input?.size === "string" && input.size in imageSizes ? input.size : recipe?.size ?? "square";
    const count = Math.min(Math.max(Math.trunc(Number(input?.count) || OPTIONS_PER_ROUND), 1), MAX_IMAGES_PER_ROUND);
    const uploads = (Array.isArray(input?.uploads) ? input.uploads : []).map((upload) => ({ ...decodeUpload(upload), save: myPhotoKinds.includes(upload?.save) ? upload.save : null }));
    const photos = (Array.isArray(input?.photoIds) ? input.photoIds : []).map((id) => {
      const found = this.store.getMyPhoto(String(id));
      if (!found) throw new Error("A chosen photo is no longer in My photos");
      return found;
    });
    const assets = (Array.isArray(input?.assetIds) ? input.assetIds : []).map((id) => {
      const found = this.store.getImageAsset(String(id));
      if (!found) throw new Error("A chosen image is no longer in Studio");
      return found;
    });
    const inputCount = uploads.length + photos.length + assets.length;
    const maxInputs = recipe ? recipe.input?.max ?? 0 : MAX_STUDIO_INPUTS;
    if (inputCount > maxInputs) throw new Error(maxInputs ? `Attach at most ${maxInputs} ${maxInputs === 1 ? "photo" : "photos"}` : "This recipe does not take photos");
    if (recipe?.input?.required && !inputCount) throw new Error(`Add ${recipe.input.label.en.toLowerCase()}`);
    const styles = input?.useStyle === false ? [] : this.store.listStyleImages();
    await this.prompts.assertApplication(IMAGE_APPLICATION_KEY);
    const snapshot = recipe ? { key: recipe.key, group: recipe.group, name: recipe.name, icon: recipe.icon, overlay: recipe.overlay, fixes: recipe.fixes, fields: recipe.fields } : void 0;
    const headline = recipe ? recipeHeadline(recipe, values) : null;
    const inputKind = inputCount ? recipe?.input?.kind ?? "any" : "none";
    const task = this.store.createTask({
      title: `T\u1EA1o \u1EA3nh \xB7 ${shortLine(headline ?? brief, 120)}`,
      description: recipe ? [headline, note].filter(Boolean).join("\n") : [brief, note].filter(Boolean).join("\n"),
      priority: "medium",
      source: {
        type: "image-studio",
        referenceId: null,
        label: "Image Studio \xB7 Codex",
        evidence: [],
        affectedGroups: ["marketing"],
        imageBrief: headline ?? brief,
        imageSize: size,
        imageStyleCount: styles.length,
        ...headline ? { imageHeadline: headline } : {},
        ...snapshot ? { imageRecipe: snapshot, imageValues: values } : {},
        ...note ? { imageNote: note } : {},
        imageInputKind: inputKind,
        imageCount: count
      }
    });
    const references = [];
    for (const upload of uploads) {
      references.push(await this.writeAsset(task.id, "reference", 0, upload.name, upload.bytes, upload.mimeType));
      if (upload.save) await this.saveMyPhoto(upload.save, upload.name, upload.bytes, upload.mimeType).catch(() => void 0);
    }
    for (const photo of photos) {
      const bytes = await fs.readFile(this.folder("mine", photo.fileName));
      references.push(await this.writeAsset(task.id, "reference", 0, photo.photo.name, bytes, photo.photo.mimeType));
    }
    for (const asset of assets) {
      const bytes = await fs.readFile(path2.join(this.taskFolder(asset.asset.taskId), asset.fileName));
      references.push(await this.writeAsset(task.id, "reference", 0, asset.asset.caption, bytes, asset.asset.mimeType));
    }
    this.store.addEvent({ level: "success", eventType: "image.request_created", title: "Image request created", detail: task.title });
    void this.dispatch(task.id, references, styles);
    return this.request(task.id);
  }
  /** A request that never reached Codex (the hand-off failed) is sent again, as it was asked. */
  async resend(taskId) {
    const task = this.imageTask(taskId);
    if (task.status === "archived" || task.status === "done") throw new Error("This image request is closed");
    if (task.codexThreadId) throw new Error("Codex already has this request; ask it to continue instead");
    const references = this.store.listImageAssets(taskId).filter((asset) => asset.kind === "reference");
    const styles = (task.source.imageStyleCount ?? 0) > 0 ? this.store.listStyleImages() : [];
    await this.dispatch(taskId, references, styles);
    return this.request(taskId);
  }
  async dispatch(taskId, references, styles) {
    const task = this.store.imageTask(taskId);
    if (!task) return;
    const source = task.source;
    const size = source.imageSize ?? "square";
    const recipe = source.imageRecipe ?? null;
    const values = source.imageValues ?? {};
    const count = source.imageCount ?? OPTIONS_PER_ROUND;
    try {
      const definition = recipe ? (await this.recipeDefinitions()).find((candidate) => candidate.key === recipe.key) ?? null : null;
      const folder = this.taskFolder(taskId);
      const inputList = references.length ? references.map((reference) => `- ${JSON.stringify(path2.join(folder, this.store.getImageAsset(reference.id).fileName))}${reference.caption ? ` (${reference.caption})` : ""}`).join("\n") : "none";
      const styleList = styles.length ? styles.map((style) => `- ${JSON.stringify(this.folder("style", style.fileName))}`).join("\n") : "none";
      const prompt = await this.prompts.application(IMAGE_APPLICATION_KEY, "image-create", {
        recipeName: recipe ? `${recipe.name.vi} (${recipe.name.en})` : "Studio (free brief)",
        outputPurpose: definition?.output.purpose.en || "As the founder's brief says.",
        outputDeliverable: `${definition?.output.deliverable.en || "Images that follow the brief."}${count > 1 ? ` ${count} of them, each a genuinely different direction.` : ""}`,
        outputChannels: definition?.output.channels.en || "As the brief says.",
        brief: recipe ? "none" : source.imageBrief ?? task.description,
        sizeLabel: imageSizes[size].label,
        aspectRatio: imageSizes[size].aspectRatio,
        note: source.imageNote || "none",
        inputKind: references.length ? source.imageInputKind && source.imageInputKind !== "none" ? source.imageInputKind : "any" : "none",
        inputList,
        designNotes: definition?.designNotes || "No recipe: follow the brief, the note and the rules above.",
        // Codex always looks at current designs online before drawing.
        freshResearch: "yes",
        styleList,
        optionCount: count,
        dataList: dataList(recipe, values),
        textPlan: textPlan(recipe, values, this.store.getBrandProfile()?.name?.trim() ?? ""),
        taskIdJson: taskId
      });
      const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${taskId}`, `Growth Studio \xB7 ${task.title}`, prompt.text + this.codex.studioChannel(taskId), this.projectRoot, { openOnCreate: false });
      const latest = this.store.getTask(taskId);
      if (!latest) return;
      this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, latest.revision);
      this.store.addEvent({ level: "success", eventType: "image.request_started", title: "Codex is making image options", detail: `${latest.title} \xB7 ${receipt.threadId} \xB7 Kallob Cloud prompt v${prompt.version}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not start the image request in Codex";
      const latest = this.store.getTask(taskId);
      if (latest) this.store.updateTask(taskId, { lastError: message }, latest.revision);
      this.store.addEvent({ level: "failed", eventType: "image.request_failed", title: "Could not start the image request", detail: message });
    }
  }
  /** Changes the words drawn on a request's pictures (a price, a date) without a new round. */
  updateValues(taskId, given) {
    const task = this.imageTask(taskId);
    const recipe = task.source.imageRecipe;
    if (!recipe) throw new Error("This request has no words to change");
    const values = this.values(recipe.fields, given);
    this.store.setImageValues(taskId, values, recipeHeadline(recipe, values));
    return this.request(taskId);
  }
  styleImages() {
    return this.store.listStyleImages().map((style) => style.image);
  }
  /** Adds pictures to the saved style set that requests follow. */
  async addStyleImages(input) {
    const uploads = (Array.isArray(input) ? input : []).map(decodeUpload);
    if (!uploads.length) throw new Error("Add at least one style image");
    if (this.store.listStyleImages().length + uploads.length > MAX_STYLE_IMAGES) throw new Error(`Keep at most ${MAX_STYLE_IMAGES} style images`);
    await fs.mkdir(this.folder("style"), { recursive: true });
    for (const upload of uploads) {
      const id = randomUUID();
      const fileName = `${id}.${extensions[upload.mimeType]}`;
      await fs.writeFile(this.folder("style", fileName), upload.bytes);
      this.store.addStyleImage({ id, name: upload.name, fileName, mimeType: upload.mimeType, bytes: upload.bytes.length });
    }
    this.store.addEvent({ level: "success", eventType: "image.style_added", title: "Style images added", detail: `${uploads.length} images` });
    return this.styleImages();
  }
  async removeStyleImage(id) {
    const found = this.store.getStyleImage(id);
    if (!found) throw new Error("Style image not found");
    this.store.removeStyleImage(id);
    await fs.unlink(this.folder("style", found.fileName)).catch(() => void 0);
    this.store.addEvent({ level: "warning", eventType: "image.style_removed", title: "Style image removed", detail: found.image.name || found.image.id });
    return this.styleImages();
  }
  styleFile(id) {
    const found = this.store.getStyleImage(id);
    return found ? { path: this.folder("style", found.fileName), mimeType: found.image.mimeType } : null;
  }
  myPhotos() {
    return this.store.listMyPhotos();
  }
  async saveMyPhoto(kind, name, bytes, mimeType) {
    if (this.store.listMyPhotos().length >= MAX_MY_PHOTOS) throw new Error(`Keep at most ${MAX_MY_PHOTOS} photos`);
    const id = randomUUID();
    const fileName = `${id}.${extensions[mimeType]}`;
    await fs.mkdir(this.folder("mine"), { recursive: true });
    await fs.writeFile(this.folder("mine", fileName), bytes);
    return this.store.addMyPhoto({ id, kind, name, fileName, mimeType, bytes: bytes.length });
  }
  /** Keeps the founder's own photos (a portrait, a product, a logo) for later requests. */
  async addMyPhotos(kindInput, input) {
    const kind = myPhotoKinds.includes(kindInput) ? kindInput : null;
    if (!kind) throw new Error("Say what the photo is: portrait, product or other");
    const uploads = (Array.isArray(input) ? input : []).map(decodeUpload);
    if (!uploads.length) throw new Error("Add at least one photo");
    if (this.store.listMyPhotos().length + uploads.length > MAX_MY_PHOTOS) throw new Error(`Keep at most ${MAX_MY_PHOTOS} photos`);
    for (const upload of uploads) await this.saveMyPhoto(kind, upload.name, upload.bytes, upload.mimeType);
    this.store.addEvent({ level: "success", eventType: "image.photos_added", title: "Photos added to My photos", detail: `${uploads.length} ${kind}` });
    return this.myPhotos();
  }
  async removeMyPhoto(id) {
    const found = this.store.getMyPhoto(id);
    if (!found) throw new Error("Photo not found");
    this.store.removeMyPhoto(id);
    await fs.unlink(this.folder("mine", found.fileName)).catch(() => void 0);
    return this.myPhotos();
  }
  myPhotoFile(id) {
    const found = this.store.getMyPhoto(id);
    return found ? { path: this.folder("mine", found.fileName), mimeType: found.photo.mimeType } : null;
  }
  /** Codex's options for a request (image_asset_save): copied into Studio as the next round. */
  async saveOptions(taskId, input) {
    const task = this.imageTask(taskId);
    if (task.status === "archived") throw new Error("This image request is archived");
    const images = Array.isArray(input) ? input : [];
    if (!images.length || images.length > MAX_OPTIONS_PER_SAVE) throw new Error(`Save between 1 and ${MAX_OPTIONS_PER_SAVE} images at once`);
    const files = await Promise.all(images.map(async (image) => {
      const file = String(image?.path ?? "").trim();
      if (!path2.isAbsolute(file)) throw new Error("Each image needs the absolute path of the generated file");
      const stat = await fs.stat(file).catch(() => null);
      if (!stat?.isFile()) throw new Error(`No image file at ${file}`);
      if (stat.size > MAX_OPTION_BYTES) throw new Error(`${file} is larger than 25 MB`);
      const bytes = await fs.readFile(file);
      const mimeType = sniffImageType(bytes);
      if (!mimeType) throw new Error(`${file} is not a PNG, JPEG or WebP image`);
      return { bytes, mimeType, caption: String(image?.caption ?? "").trim().slice(0, 200) };
    }));
    const round = this.store.nextImageRound(taskId);
    const saved = [];
    for (const file of files) saved.push(await this.writeAsset(taskId, "option", round, file.caption, file.bytes, file.mimeType));
    const latest = this.store.getTask(taskId);
    if (latest.lastError) this.store.updateTask(taskId, { lastError: null }, latest.revision);
    this.codex.moveTask(taskId, "review", { clearQuestion: true });
    const notice = this.pickNotice(taskId);
    if (notice) this.attention.request(notice);
    this.store.addEvent({ level: "success", eventType: "image.options_saved", title: "Image options ready to choose", detail: `${task.title} \xB7 round ${round} \xB7 ${saved.length} images` });
    return { round, images: saved };
  }
  /** Asks Codex for new options that apply a change (or new variations) to one option. */
  async revise(assetId, noteInput, variation = false) {
    const found = this.store.getImageAsset(assetId);
    if (!found || found.asset.kind !== "option") throw new Error("Image option not found");
    const task = this.imageTask(found.asset.taskId);
    if (task.status === "archived") throw new Error("This image request is archived");
    if (!task.codexThreadId) throw new Error("This request is not linked to a Codex conversation yet");
    const sender = this.codexDesktop.queueMessage;
    if (!sender) throw new Error("Sending to Codex is not available in this runtime");
    const note = variation ? VARIATION_NOTE : String(noteInput ?? "").trim();
    if (!note || note.length > 1e3) throw new Error("Say what to change in at most 1000 characters");
    const prompt = await this.prompts.application(IMAGE_APPLICATION_KEY, "image-change", {
      baseImagePathJson: path2.join(this.taskFolder(task.id), found.fileName),
      note,
      textPlan: textPlan(task.source.imageRecipe ?? null, task.source.imageValues ?? {}, this.store.getBrandProfile()?.name?.trim() ?? ""),
      optionCount: OPTIONS_PER_ROUND,
      taskIdJson: task.id
    });
    await sender.call(this.codexDesktop, task.codexThreadId, prompt.text);
    const latest = this.store.getTask(task.id);
    this.store.updateTask(task.id, { status: "active", question: null, lastError: null }, latest.revision);
    this.attention.close(`images:${task.id}`);
    this.store.addEvent({ level: "success", eventType: variation ? "image.variation_requested" : "image.revision_requested", title: variation ? "Asked Codex for new variations" : "Asked Codex for a changed image", detail: `${task.title} \xB7 ${note.slice(0, 200)}` });
    return this.request(task.id);
  }
  /**
   * Puts an option into the library; the request is then done. `finalBase64`
   * is the picture with the recipe's words drawn on it (a PNG from the page).
   */
  async approve(assetId, finalBase64) {
    const found = this.store.getImageAsset(assetId);
    if (!found || found.asset.kind !== "option") throw new Error("Image option not found");
    const task = this.imageTask(found.asset.taskId);
    let finalFileName = null;
    if (typeof finalBase64 === "string" && finalBase64) {
      const bytes = Buffer.from(finalBase64, "base64");
      if (sniffImageType(bytes) !== "image/png") throw new Error("The finished picture must be a PNG");
      if (bytes.length > MAX_FINAL_BYTES) throw new Error("The finished picture is too large");
      finalFileName = `${found.asset.id}-final.png`;
      await fs.writeFile(path2.join(this.taskFolder(task.id), finalFileName), bytes);
    }
    const asset = this.store.approveImageAsset(assetId, finalFileName);
    this.codex.moveTask(task.id, "done", { clearQuestion: true });
    this.store.addEvent({ level: "success", eventType: "image.approved", title: "Image approved into the library", detail: task.title });
    return asset;
  }
  request(taskId) {
    const task = this.imageTask(taskId);
    const assets = this.store.listImageAssets(taskId);
    return { task: this.codex.withRunning(task), references: assets.filter((asset) => asset.kind === "reference"), options: assets.filter((asset) => asset.kind === "option") };
  }
  listRequests() {
    return this.store.listTasks(500).filter((task) => task.source.type === "image-studio" && task.status !== "archived").map((task) => this.request(task.id));
  }
  library() {
    return this.store.listLibraryImages();
  }
  /** Where a picture is on disk, to serve it to the Studio page; `final` prefers the finished picture. */
  file(assetId, final = false) {
    const found = this.store.getImageAsset(assetId);
    if (!found) return null;
    const finished = final && found.finalFileName;
    return { path: path2.join(this.taskFolder(found.asset.taskId), finished ? found.finalFileName : found.fileName), mimeType: finished ? "image/png" : found.asset.mimeType, asset: found.asset };
  }
};

// src/mini-apps/image-studio/server/index.ts
var index_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const service = new ImageStudioService(createImageStudioRepository(sdk), sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.attention);
    return {
      router: createImageStudioRouter({ service, router: sdk.router(), launcherOnly: sdk.launcherOnly }),
      start: () => service.reconcileAttention(),
      codexTools: [imageAssetSaveTool(service)],
      taskKinds: [imageTaskKind]
    };
  }
});
export {
  index_default as default
};
