import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/image-studio/manifest.ts
var manifest = {
  id: "image-studio",
  version: "1.6.0",
  // Prompts that take in other prompts (core 2.22.0, ADR 0007).
  requiresCore: ">=2.22.0 <3",
  entitlement: "image-studio",
  exports: { "image-studio.requests": "1.0" },
  // Approved pictures are written into the shared Library (spec 047 phase 5); it never reads other items.
  uses: { "library.assets": { range: "^1.0", operations: ["write"] } }
};

// src/mini-apps/image-studio/release-notes.json
var release_notes_default = [
  {
    version: "1.6.0",
    vi: "C\xE1ch thi\u1EBFt k\u1EBF \u1EA3nh (gi\u1EEF \u1EA3nh g\u1ED1c, nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF, l\u1EDBp ch\u1EEF) gi\u1EDD l\xE0 m\u1ED9t prompt c\u1EE7a Image Studio, g\u1EEDi k\xE8m cho Codex m\u1ED7i l\u1EA7n. C\u1EA7n Growth Studio 0.43.0.",
    en: "The image design method (keeping input photos, design principles, text layer) is one of Image Studio's own prompts, sent to Codex every time. Needs Growth Studio 0.43.0."
  },
  {
    version: "1.5.0",
    vi: "T\u1EA1o \u1EA3nh theo engine Social Image Design; quy t\u1EAFc gi\u1EEF \u1EA3nh g\u1ED1c, thi\u1EBFt k\u1EBF v\xE0 l\u1EDBp ch\u1EEF n\u1EB1m trong engine thay v\xEC prompt.",
    en: "Images follow the Social Image Design engine; the photo-keeping, design and text-layer rules live in the engine instead of the prompt."
  },
  {
    version: "1.4.0",
    vi: "\u1EA2nh b\u1EA1n duy\u1EC7t nay t\u1EF1 v\xE0o Th\u01B0 vi\u1EC7n chung c\u1EE7a Growth Studio (k\xE8m ti\xEAu \u0111\u1EC1, m\xF4 t\u1EA3 v\xE0 n\u01A1i t\u1EA1o ra), \u0111\u1EC3 Personal Brand v\xE0 c\xE1c mini-app kh\xE1c d\xF9ng l\u1EA1i m\xE0 kh\xF4ng c\u1EA7n t\u1EA3i xu\u1ED1ng r\u1ED3i t\u1EA3i l\xEAn. \u1EA2nh \u0111\xE3 duy\u1EC7t t\u1EEB tr\u01B0\u1EDBc c\u0169ng \u0111\u01B0\u1EE3c \u0111\u01B0a v\xE0o m\u1ED9t l\u1EA7n, kh\xF4ng tr\xF9ng v\xE0 kh\xF4ng sao ch\xE9p t\u1EC7p. C\u1EA7n mini-app Th\u01B0 vi\u1EC7n.",
    en: "Images you approve now go into Growth Studio's shared Library by themselves (with a title, description and where they were made), so Personal Brand and other mini-apps reuse them without downloading and uploading. Images approved earlier are brought in once, with no duplicates and no copied files. Needs the Library mini-app."
  },
  {
    version: "1.3.0",
    vi: "Mini-app kh\xE1c (Personal Brand) c\xF3 th\u1EC3 nh\u1EDD Image Studio t\u1EA1o ho\u1EB7c s\u1EEDa \u1EA3nh cho b\xE0i vi\u1EBFt; c\xE1c y\xEAu c\u1EA7u \u0111\xF3 hi\u1EC7n trong Image Studio nh\u01B0 m\u1ECDi y\xEAu c\u1EA7u kh\xE1c.",
    en: "Other mini-apps (Personal Brand) can ask Image Studio to create or edit an image for an article; those requests show in Image Studio like any other."
  },
  {
    version: "1.2.2",
    vi: "T\xEAn v\xE0 m\xF4 t\u1EA3 c\u1EE7a mini-app trong danh s\xE1ch nay do Kallob qu\u1EA3n l\xFD; c\u1EA7n Growth Studio 0.29.0.",
    en: "The mini-app's name and description in the list now come from Kallob; needs Growth Studio 0.29.0."
  },
  {
    version: "1.2.1",
    vi: "Nh\u1EADt k\xFD ho\u1EA1t \u0111\u1ED9ng ghi \u0111\xFAng prompt \u0111\xE3 d\xF9ng (prompt \u0111i k\xE8m Image Studio).",
    en: "The activity log names the prompt actually used (the one that comes with Image Studio)."
  },
  {
    version: "1.2.0",
    vi: "Prompt v\xE0 c\xE1c c\xF4ng th\u1EE9c \u1EA3nh (gi\u1EA3m gi\xE1, khai tr\u01B0\u01A1ng, ch\xFAc T\u1EBFt\u2026) gi\u1EDD \u0111i k\xE8m Image Studio, c\u1EADp nh\u1EADt c\xF9ng m\u1ED7i b\u1EA3n ph\xE1t h\xE0nh n\xEAn lu\xF4n kh\u1EDBp v\u1EDBi \u1EE9ng d\u1EE5ng.",
    en: "The prompts and picture recipes (sales, openings, T\u1EBFt greetings\u2026) now come with Image Studio and update with each release, so they always match it."
  },
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

// src/mini-apps/sdk/library.ts
var LIBRARY_INTERFACE = "library.assets";
function libraryAssets(sdk) {
  const use = sdk.manifest.uses?.[LIBRARY_INTERFACE];
  if (!use) return null;
  const provider = sdk.miniApps.use(LIBRARY_INTERFACE, use.range);
  return provider ? provider.forApp({ id: sdk.manifest.id, uses: sdk.manifest.uses }) : null;
}

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

// src/mini-apps/image-studio/server/library.ts
var LIBRARY_RECORD = "image";
var line = (text, max) => text.replace(/\s+/g, " ").trim().slice(0, max);
var ImageStudioLibrary = class {
  constructor(library, pictures) {
    this.library = library;
    this.pictures = pictures;
  }
  library;
  pictures;
  retry = null;
  /** Adds (or refreshes) one approved picture; returns its Library item, or null without a Library. */
  add(image) {
    const library = this.library();
    if (!library || !image.approvedAt) return null;
    const file = this.pictures.file(image.id, true);
    if (!file) return null;
    const name = `kallob-image-${image.id.slice(0, 8)}${file.path.endsWith("-final.png") ? "-final" : ""}.${file.mimeType === "image/png" ? "png" : file.mimeType === "image/jpeg" ? "jpg" : file.mimeType === "image/webp" ? "webp" : "img"}`;
    const item = library.create({
      kind: "image",
      title: line(image.headline || image.brief, 120) || "\u1EA2nh t\u1EEB Image Studio",
      description: line(image.brief, 1e3),
      tags: image.recipe ? [line(image.recipe.name.vi, 40)] : [],
      source: { recordType: LIBRARY_RECORD, recordId: image.id, url: "/mini-apps/image-studio/library" },
      file: { path: file.path, name }
    });
    if (item.archivedAt || item.file?.storage !== "data-root" || item.file.name === name) return item;
    return library.update(item.id, { file: { path: file.path, name }, note: "\u1EA2nh ho\xE0n ch\u1EC9nh (c\xF3 ch\u1EEF) t\u1EEB Image Studio" });
  }
  /** After an approval: never fails the approval itself. */
  approved(assetId) {
    try {
      const image = this.pictures.library().find((entry) => entry.id === assetId);
      if (image) this.add(image);
    } catch (error) {
      console.error("Image Studio could not add the approved picture to the Library", error);
    }
  }
  /** Brings every approved picture into the Library once (reruns add nothing); false while no Library runs. */
  backfill() {
    if (!this.library()) return false;
    for (const image of this.pictures.library()) {
      try {
        this.add(image);
      } catch (error) {
        console.error(`Image Studio could not add picture ${image.id} to the Library`, error);
      }
    }
    return true;
  }
  /** At start: backfill now, or every minute until a Library is running. */
  start() {
    if (this.backfill()) return;
    this.retry = setInterval(() => {
      if (this.backfill()) this.stop();
    }, 6e4);
    this.retry.unref?.();
  }
  stop() {
    if (this.retry) clearInterval(this.retry);
    this.retry = null;
  }
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
  const line2 = template.replace(/\{\{([A-Za-z][A-Za-z0-9]*)\}\}/g, (_match, key) => {
    const raw = values[key]?.trim() ?? "";
    if (!raw) missing = true;
    return displayValue(fields.find((field) => field.key === key), raw);
  });
  return missing ? null : line2.trim() || null;
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
    lines: (overlay.lines ?? []).map((line2) => fillLine(line2, fields, values)).filter((line2) => Boolean(line2))
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
  if (!recipe || recipe.overlay.layout === "none") return { overlayWords: "", overlayZone: "", discountBadge: false, shopName: "", shopNameJson: "" };
  return {
    overlayWords: overlayWordList(overlayWords(recipe.overlay, recipe.fields, values)).map((word) => JSON.stringify(word)).join(", "),
    overlayZone: zoneText[recipe.overlay.zone],
    discountBadge: recipe.overlay.layout === "price" && Boolean(recipe.overlay.oldPrice),
    shopName: brandName,
    shopNameJson: brandName
  };
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
  const line2 = text.replace(/\s+/g, " ").trim();
  return line2.length > max ? `${line2.slice(0, max - 1).trimEnd()}\u2026` : line2;
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
  approvedListeners = [];
  /** Called after each approval (the Library adds the picture, spec 047 phase 5); a listener must not throw. */
  onApproved(listener) {
    this.approvedListeners.push(listener);
  }
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
        ...textPlan(recipe, values, this.store.getBrandProfile()?.name?.trim() ?? ""),
        taskIdJson: taskId
      });
      const receipt = await this.codexDesktop.dispatch(`growth-studio.task.${taskId}`, `Growth Studio \xB7 ${task.title}`, prompt.text + this.codex.studioChannel(taskId), this.projectRoot, { openOnCreate: false });
      const latest = this.store.getTask(taskId);
      if (!latest) return;
      this.store.updateTask(taskId, { status: "active", codexThreadId: receipt.threadId, codexMessageId: receipt.messageId, codexAssignedAt: receipt.queuedAt, lastError: null }, latest.revision);
      this.store.addEvent({ level: "success", eventType: "image.request_started", title: "Codex is making image options", detail: `${latest.title} \xB7 ${receipt.threadId} \xB7 ${prompt.label}` });
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
      ...textPlan(task.source.imageRecipe ?? null, task.source.imageValues ?? {}, this.store.getBrandProfile()?.name?.trim() ?? ""),
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
    for (const listener of this.approvedListeners) listener(asset);
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
var server_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const service = new ImageStudioService(createImageStudioRepository(sdk), sdk.kernel, sdk.codex, sdk.prompts, sdk.dataRoot, sdk.attention);
    const library = new ImageStudioLibrary(() => libraryAssets(sdk), service);
    service.onApproved((asset) => library.approved(asset.id));
    const requests = {
      create: (input) => service.createRequest({ brief: input.brief, note: input.note, size: input.size, count: input.count, useStyle: input.useStyle, uploads: input.uploads }),
      request: (taskId) => {
        try {
          return service.request(taskId);
        } catch {
          return null;
        }
      },
      revise: (assetId, note) => service.revise(assetId, note),
      approve: (assetId) => service.approve(assetId),
      fileUrl: (assetId) => `/api/image-studio/images/${encodeURIComponent(assetId)}/file`
    };
    return {
      exports: { "image-studio.requests": requests },
      router: createImageStudioRouter({ service, router: sdk.router(), launcherOnly: sdk.launcherOnly }),
      start: () => {
        service.reconcileAttention();
        library.start();
      },
      stop: () => library.stop(),
      codexTools: [imageAssetSaveTool(service)],
      taskKinds: [imageTaskKind]
    };
  }
});

// image-studio-package.js
var image_studio_package_default = { ...server_default, content: { "prompts": { "image-change": "The founder asked for a change in Image Studio.\n\nStarting image: {{baseImagePathJson}}\nChange: {{note}}\nText layer: {{#overlayZone}}Studio draws these words on top afterwards: {{overlayWords}}{{#shopName}}{{#overlayWords}}, {{/overlayWords}}the shop name {{shopNameJson}} (small){{/shopName}}. Keep {{overlayZone}}{{#discountBadge}} and the top-right corner (a round discount badge){{/discountBadge}} calm and clear for them.{{/overlayZone}}{{^overlayZone}}none{{/overlayZone}}\n\nMake {{optionCount}} new version(s) that keep what works in the starting image and apply this change (edit the starting image when your image tool supports it, otherwise generate from it as a reference). The founder's words win over every earlier rule; everything they did not ask to change stays as it was, including the same product and the same face. When the text layer lists words that Studio draws on top, still draw no words, numbers, logos or price tags and keep that area clear. Check each option, save them with `image_asset_save` (task_id {{taskIdJson}}) exactly as before, and end your turn.\n", "image-create": 'Create images for a solo founder in Kallob Growth Studio\'s Image Studio.\n\n{{> social-image-design}}\n\nWHAT TO MAKE\nRecipe: {{recipeName}}\nPurpose: {{outputPurpose}}\nWhat the founder was promised: {{outputDeliverable}}\nWhere it will be posted: {{outputChannels}}\nFree brief from the founder: {{brief}}\nFormat: {{sizeLabel}}, aspect ratio {{aspectRatio}}.\n\nTHE FOUNDER\'S NOTE (highest priority): {{note}}\n\nPRIORITY when instructions conflict: the founder\'s note, then the exact data, then the input photo rules, then the design notes, then your own defaults. When the note asks to keep something (the original background, the pose, the outfit, the text printed on the packaging, a colour), keep it even where a rule below says otherwise.\n\n1. PREPARE THE INPUT PHOTOS (input kind: {{inputKind}})\nPhotos the founder attached; open and study each one before generating ("none" means there are none):\n{{inputList}}\nKeep each photo the way the how-to\'s input-photo rules (14.1) say for this input kind. If a photo shows several people and it is unclear who is meant, ask with growth_task_ask.\n\n2. LEARN HOW THIS KIND OF IMAGE IS DESIGNED\nFollow the how-to\'s design principles (14.2) for every image.\nKallob\'s design notes for this recipe:\n{{designNotes}}\nFresh research: {{freshResearch}}. If yes, before designing look up current strong examples of this kind of image for a Vietnamese audience with web search, note what makes them work (composition, hierarchy, palette, light, props) and design from that. If no, do not browse: rely on the design notes and your own expertise.\nBrand: look selectively in the Business Context (named in the Growth Studio channel below) for brand colours, visual style, audience and anything to avoid; open only the few files that matter and never invent brand rules.\nStyle images the founder keeps for their brand (match their palette, lighting, composition and rendering; never copy their subject or text; "none" means there are none):\n{{styleList}}\n\n3. EXACT DATA AND THE TEXT LAYER\nData the founder entered (exact; never invent other prices, offers, dates, claims or testimonials):\n{{dataList}}\nText layer: {{#overlayZone}}Studio draws these words on top afterwards: {{overlayWords}}{{#shopName}}{{#overlayWords}}, {{/overlayWords}}the shop name {{shopNameJson}} (small){{/shopName}}. Keep {{overlayZone}}{{#discountBadge}} and the top-right corner (a round discount badge){{/discountBadge}} calm and clear for them.{{/overlayZone}}{{^overlayZone}}none{{/overlayZone}}\n- Apply the how-to\'s text-layer rules (14.3): when the text layer lists words that Studio draws on top, the image itself carries no words and keeps the named area clear; when it is "none", text appears only if the brief or note asks for it.\n\n4. MAKE THE BEST\nGenerate exactly {{optionCount}} image(s) with your built-in image generation (no other API or key), each a genuinely different direction. Check every image against the how-to\'s quality checks and regenerate any option that fails before you save it.\n\n5. SAVE\nSave the options to Studio: call the `image_asset_save` tool of the `kallob-growth` MCP server once, with task_id {{taskIdJson}} and every option as {"path": absolute path of the generated file, "caption": one short Vietnamese line on what makes this option different}. Do not copy the files anywhere yourself. This task has no result file: `image_asset_save` is its only return channel.\nThen end your turn. In Studio the founder approves an option or asks for a change; a change request arrives as the next message here.\nAsk with `growth_task_ask` only when you cannot make even a first option; otherwise make sensible choices and let the options do the asking.\n', "image-recipe-ao-dai": '{\n  "key": "ao-dai",\n  "group": "personal",\n  "name": {\n    "vi": "\u1EA2nh \xE1o d\xE0i",\n    "en": "\xC1o d\xE0i portrait"\n  },\n  "icon": "portrait",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n ho\u1EB7c \u1EA3nh \u0111\u0103ng d\u1ECBp T\u1EBFt, l\u1EC5, k\u1EF7 ni\u1EC7m.",\n      "en": "A profile photo or a post for T\u1EBFt and celebrations."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: ch\xEDnh b\u1EA1n m\u1EB7c \xE1o d\xE0i trong b\u1ED1i c\u1EA3nh Vi\u1EC7t (ph\u1ED1 c\u1ED5, hoa sen, hoa \u0111\xE0o\u2026), gi\u1EEF nguy\xEAn g\u01B0\u01A1ng m\u1EB7t.",\n      "en": "A portrait 4:5 image: you in an \xE1o d\xE0i in a Vietnamese setting (old town, lotus, peach blossom\u2026), your face unchanged."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i ch\xFAc m\u1EEBng.",\n      "en": "Profile photo, stories, greeting posts."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Keep the face exactly: bone structure, eyes, nose, lips, skin tone and age. A well-fitted silk \xE1o d\xE0i with natural drape, high collar and side slits over trousers. One setting: H\u1ED9i An yellow walls with silk lanterns, Hu\u1EBF (\u0110\u1EA1i N\u1ED9i, S\xF4ng H\u01B0\u01A1ng at golden hour), the H\xE0 N\u1ED9i old quarter, or a lotus pond. Soft morning or golden-hour light, gentle backlight, shallow depth of field. A white or jewel-tone \xE1o d\xE0i against warm walls, or pastel against green lotus; a n\xF3n l\xE1 or lotus bloom is optional. Never a Chinese qipao cut, a Japanese kimono, hanzi signage or face slimming.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1i t\u1EAFn, r\u1EA1ng r\u1EE1 h\u01A1n",\n      "en": "Brighter, warmer expression"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 8\n}\n', "image-recipe-at-work": `{
  "key": "at-work",
  "group": "personal",
  "name": {
    "vi": "\u1EA2nh \u0111ang l\xE0m vi\u1EC7c",
    "en": "At-work portrait"
  },
  "icon": "briefcase",
  "size": "portrait",
  "input": {
    "kind": "portrait",
    "required": true,
    "max": 3,
    "label": {
      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",
      "en": "Your portrait"
    },
    "hint": {
      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",
      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."
    }
  },
  "output": {
    "purpose": {
      "vi": "Cho kh\xE1ch th\u1EA5y ng\u01B0\u1EDDi th\u1EADt \u0111\u1EE9ng sau shop: b\u1EA1n \u0111ang l\xE0m \u0111\xFAng ngh\u1EC1 c\u1EE7a m\xECnh.",
      "en": "Show customers the real person behind the business, doing the work."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n \u0111ang l\xE0m vi\u1EC7c gi\u1EEFa \u0111\u1ED3 ngh\u1EC1 c\u1EE7a m\xECnh, \xE1nh s\xE1ng c\u1EEDa s\u1ED5 t\u1EF1 nhi\xEAn, nh\u01B0 \u1EA3nh ch\u1EE5p th\u1EADt.",
      "en": "A portrait 4:5 image: you at work among the tools of your trade, natural window light, like a real photo."
    },
    "channels": {
      "vi": "Trang Gi\u1EDBi thi\u1EC7u, b\xE0i Facebook, LinkedIn.",
      "en": "About page, Facebook and LinkedIn posts."
    }
  },
  "fields": [
    {
      "key": "work",
      "type": "text",
      "label": {
        "vi": "B\u1EA1n l\xE0m g\xEC",
        "en": "What you do"
      },
      "placeholder": {
        "vi": "VD: l\xE0m b\xE1nh \u1EDF ti\u1EC7m nh\u1ECF, may \u0111\u1ED3, d\u1EA1y ti\u1EBFng Anh online",
        "en": "E.g. baking in a small shop, tailoring, teaching English online"
      },
      "required": true
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "An environmental portrait, not a studio headshot: waist-up, the person mid-task with the real tools of the trade they named (dough and an oven, a sewing machine and fabric, a laptop and headset), glancing up at the camera or absorbed in the work. A believable small Vietnamese workplace (a shop counter, a home studio, a tidy desk), sized to the business: a solo founder's space, never a glossy corporate office. Soft window light from one side, shallow depth of field, warm natural colour, the tools sharp near the hands. Hands simple and correct; laptops and tools undistorted. Casual-smart clothes that suit the trade (an apron, a linen shirt). No stock-photo smiles at nobody, staged handshakes, extra people or text on screens and signs.",
  "fixes": [
    {
      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",
      "en": "Look more like me"
    },
    {
      "vi": "\u0110\u1ED3 ngh\u1EC1 r\xF5 h\u01A1n",
      "en": "Show the tools more clearly"
    },
    {
      "vi": "T\u1EF1 nhi\xEAn, \xEDt d\xE0n d\u1EF1ng h\u01A1n",
      "en": "More candid, less posed"
    },
    {
      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",
      "en": "Warmer light"
    }
  ],
  "order": 10
}
`, "image-recipe-birthday": '{\n  "key": "birthday",\n  "group": "personal",\n  "name": {\n    "vi": "\u1EA2nh sinh nh\u1EADt",\n    "en": "Birthday photo"\n  },\n  "icon": "cake",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh sinh nh\u1EADt c\u1EE7a ch\xEDnh b\u1EA1n \u0111\u1EC3 \u0111\u0103ng, c\u1EA3m \u01A1n kh\xE1ch v\xE0 b\u1EA1n b\xE8 \u0111\xE3 \u0111\u1ED3ng h\xE0nh.",\n      "en": "Your own birthday photo to post and thank customers and friends."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n b\xEAn b\xE1nh kem, b\xF3ng bay, \xE1nh s\xE1ng \u1EA5m, d\xF2ng ch\u1EEF c\u1EE7a b\u1EA1n ph\xEDa tr\xEAn.",\n      "en": "A portrait 4:5 image: you with a cake, balloons and warm light, your line on top."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story.",\n      "en": "Facebook and Zalo posts, stories."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "D\xF2ng ch\u1EEF",\n        "en": "Line"\n      },\n      "placeholder": {\n        "vi": "VD: Ch\xE0o tu\u1ED5i 30",\n        "en": "E.g. Hello, 30"\n      },\n      "required": true,\n      "default": "Happy Birthday"\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}"\n  },\n  "designNotes": "A joyful, tasteful celebration, not a party-store poster. The person chest-up or waist-up holding or leaning toward a birthday cake with lit candles, a few balloons in one or two soft colours (cream, blush, champagne gold, or the brand colour), warm candle and fairy-light bokeh. A simple home or caf\xE9 setting. Keep the upper 30% calm (a soft wall or balloons out of focus) for the line. Never write numbers or letters on the cake, balloons or banners; no cartoon confetti overload or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "Sang tr\u1ECDng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "More elegant and minimal"\n    },\n    {\n      "vi": "Vui t\u01B0\u01A1i, nhi\u1EC1u m\xE0u h\u01A1n",\n      "en": "More playful and colourful"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 15\n}\n', "image-recipe-bogo": '{\n  "key": "bogo",\n  "group": "sell",\n  "name": {\n    "vi": "Mua 1 t\u1EB7ng 1 / Combo",\n    "en": "Buy one get one / Bundle"\n  },\n  "icon": "gift",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m (v\xE0 qu\xE0 t\u1EB7ng)",\n      "en": "Product photo (and the gift)"\n    },\n    "hint": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m ch\xEDnh, th\xEAm \u1EA3nh m\xF3n qu\xE0 t\u1EB7ng n\u1EBFu c\xF3.",\n      "en": "The main product, plus the gift if there is one."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Gi\u1EDBi thi\u1EC7u \u01B0u \u0111\xE3i mua k\xE8m, cho kh\xE1ch th\u1EA5y \u0111\u01B0\u1EE3c nhi\u1EC1u h\u01A1n.",\n      "en": "Show a bundle deal so buyers see they get more."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m v\xE0 qu\xE0 \u0111\u1EB7t c\u1EA1nh nhau h\u1EA5p d\u1EABn, d\xF2ng \u01B0u \u0111\xE3i l\u1EDBn r\xF5 r\xE0ng.",\n      "en": "A square image: the product and the gift side by side, the offer in large clear type."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, Shopee, TikTok Shop.",\n      "en": "Facebook, Zalo, Shopee, TikTok Shop."\n    }\n  },\n  "fields": [\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: Mua 1 t\u1EB7ng 1",\n        "en": "E.g. Buy 1 get 1"\n      },\n      "required": true,\n      "default": "Mua 1 t\u1EB7ng 1"\n    },\n    {\n      "key": "until",\n      "type": "text",\n      "label": {\n        "vi": "\xC1p d\u1EE5ng \u0111\u1EBFn",\n        "en": "Until"\n      },\n      "placeholder": {\n        "vi": "VD: h\u1EBFt Ch\u1EE7 nh\u1EADt n\xE0y",\n        "en": "E.g. this Sunday"\n      }\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{offer}}",\n    "lines": [\n      "{{until}}"\n    ]\n  },\n  "designNotes": "Show both items together, side by side or slightly overlapping, at near-equal scale on one shared surface with matching light, so they read as a pair. With one photo, show two identical units; with two photos, show each product exactly as given, without merging or restyling either. Group them in the lower-centre 55% and keep the top 35\u201340% a clean, low-detail field for the offer headline. A soft ribbon or gift-wrap cue (kraft paper, tissue) can hint at the gift. Warm, generous palette led by the brand colour. Never add a third product, labels, text or plus/equal symbols.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 2\n}\n', "image-recipe-bw-portrait": '{\n  "key": "bw-portrait",\n  "group": "personal",\n  "name": {\n    "vi": "Ch\xE2n dung \u0111en tr\u1EAFng",\n    "en": "Black-and-white portrait"\n  },\n  "icon": "contrast",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh c\xF3 chi\u1EC1u s\xE2u cho b\xE0i k\u1EC3 chuy\u1EC7n kh\u1EDFi nghi\u1EC7p, ph\u1ECFng v\u1EA5n, h\u1ED3 s\u01A1 b\xE1o ch\xED.",\n      "en": "A portrait with depth for founder stories, interviews and press kits."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 \u0111en tr\u1EAFng ki\u1EC3u t\u1EA1p ch\xED: \xE1nh s\xE1ng b\xEAn, khung c\u1EADn, gi\u1EEF th\u1EADt t\u1EEBng \u0111\u01B0\u1EDDng n\xE9t.",\n      "en": "A portrait 4:5 black-and-white editorial image: side light, tight crop, every feature true."\n    },\n    "channels": {\n      "vi": "B\xE0i k\u1EC3 chuy\u1EC7n, website, b\xE1o ch\xED, LinkedIn.",\n      "en": "Story posts, websites, press, LinkedIn."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Editorial black and white: a tight head-and-shoulders crop, a single hard-ish side light (Rembrandt or split) with deep but detailed shadows, a dark grey seamless backdrop. A calm, direct or thoughtful look, a dark sweater, shirt or blazer. Rich tonal range from true black to clean white, fine film grain. Skin texture, lines and features kept on purpose: this look is honest, not retouched. No colour tint, vignette overload, dramatic smoke or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1ng ph\u1EA3n m\u1EA1nh h\u01A1n",\n      "en": "More contrast"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng d\u1ECBu h\u01A1n",\n      "en": "Softer light"\n    },\n    {\n      "vi": "C\u01B0\u1EDDi nh\u1EB9 h\u01A1n",\n      "en": "A slight smile"\n    }\n  ],\n  "order": 14\n}\n', "image-recipe-fb-cover": '{\n  "key": "fb-cover",\n  "group": "personal",\n  "name": {\n    "vi": "\u1EA2nh b\xECa Facebook",\n    "en": "Facebook cover"\n  },\n  "icon": "cover",\n  "size": "landscape",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh b\xECa trang c\xE1 nh\xE2n n\xF3i ngay b\u1EA1n l\xE0 ai v\xE0 l\xE0m g\xEC, kh\xE1ch v\xE0o l\xE0 nh\u1EDB.",\n      "en": "A profile cover that says at once who you are and what you do."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh ngang 16:9: b\u1EA1n \u1EDF m\u1ED9t b\xEAn, b\xEAn c\xF2n l\u1EA1i l\xE0 t\xEAn v\xE0 c\xE2u gi\u1EDBi thi\u1EC7u ng\u1EAFn c\u1EE7a b\u1EA1n.",\n      "en": "A landscape 16:9 image: you on one side, your name and a short line about you on the other."\n    },\n    "channels": {\n      "vi": "\u1EA2nh b\xECa Facebook, Zalo, LinkedIn, \u0111\u1EA7u trang website.",\n      "en": "Facebook, Zalo and LinkedIn covers, website headers."\n    }\n  },\n  "fields": [\n    {\n      "key": "name",\n      "type": "text",\n      "label": {\n        "vi": "T\xEAn hi\u1EC3n th\u1ECB",\n        "en": "Display name"\n      },\n      "placeholder": {\n        "vi": "VD: Ng\u1ECDc Anh",\n        "en": "E.g. Ngoc Anh"\n      },\n      "required": true\n    },\n    {\n      "key": "tagline",\n      "type": "text",\n      "label": {\n        "vi": "B\u1EA1n l\xE0m g\xEC",\n        "en": "What you do"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\xFAp shop nh\u1ECF b\xE1n h\xE0ng online",\n        "en": "E.g. Helping small shops sell online"\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{name}}",\n    "lines": [\n      "{{tagline}}"\n    ]\n  },\n  "designNotes": "A wide personal-brand banner. Place the person waist-up on the right third, looking toward the open side, in a setting from their world (a bright workspace, a caf\xE9 table, a softly blurred city) with shallow depth of field. Keep the upper-left half a calm, even field (a soft gradient, a clean wall, open sky) for the name and line. Facebook crops the edges on phones and its profile circle covers the lower-left corner, so keep the face and anything important inside the central 70% and away from the lower-left. Smart-casual clothes, soft natural light, one brand colour as an accent. No collage, icons, arrows, logos or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "Ch\u1EEBa ch\u1ED7 ch\u1EEF r\u1ED9ng h\u01A1n",\n      "en": "More room for the words"\n    },\n    {\n      "vi": "B\u1ED1i c\u1EA3nh \u0111\xFAng ngh\u1EC1 h\u01A1n",\n      "en": "A setting closer to my work"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 11\n}\n', "image-recipe-figure-3d": `{
  "key": "figure-3d",
  "group": "personal",
  "name": {
    "vi": "M\xF4 h\xECnh 3D c\u1EE7a b\u1EA1n",
    "en": "Your 3D figurine"
  },
  "icon": "figure",
  "size": "portrait",
  "input": {
    "kind": "portrait",
    "required": true,
    "max": 3,
    "label": {
      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",
      "en": "Your portrait"
    },
    "hint": {
      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",
      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."
    }
  },
  "output": {
    "purpose": {
      "vi": "\u1EA2nh vui b\u1EAFt trend: ch\xEDnh b\u1EA1n th\xE0nh m\xF4 h\xECnh s\u01B0u t\u1EA7m, khoe ngh\u1EC1 qua ph\u1EE5 ki\u1EC7n.",
      "en": "A trending fun post: you as a collectible figurine, your trade shown through its accessories."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: m\xF4 h\xECnh 1/7 c\u1EE7a b\u1EA1n tr\xEAn b\xE0n l\xE0m vi\u1EC7c, \u0111\u1EBF mica tr\xF2n, h\u1ED9p \u0111\u1ED3 ch\u01A1i ph\xEDa sau.",
      "en": "A portrait 4:5 image: a 1/7-scale figurine of you on a desk, a round clear base, its toy box behind."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, TikTok, story.",
      "en": "Facebook, Zalo and TikTok posts, stories."
    }
  },
  "fields": [
    {
      "key": "props",
      "type": "text",
      "label": {
        "vi": "Ph\u1EE5 ki\u1EC7n \u0111i k\xE8m",
        "en": "Accessories"
      },
      "placeholder": {
        "vi": "VD: laptop, ly c\xE0 ph\xEA, h\u1ED9p b\xE1nh c\u1EE7a shop",
        "en": "E.g. a laptop, a coffee cup, a box of my cakes"
      }
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "A photorealistic photo of a 1/7-scale painted PVC collectible figure of the person, full body, standing on a round clear acrylic base on a real wooden desk. The figure keeps the person's face, hairstyle, glasses and outfit from the photo, in a realistic (not chibi) sculpt with fine paint detail. The accessories they named are small sculpted props at the figure's feet or in its hands. Behind it, a computer monitor showing the figure's 3D sculpt in a modelling app and a premium collector's box with the same figure's artwork. Soft daylight, shallow depth of field. No words, brand names or logos on the box, base, screen or anywhere.",
  "fixes": [
    {
      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",
      "en": "Look more like me"
    },
    {
      "vi": "Ph\u1EE5 ki\u1EC7n r\xF5 h\u01A1n",
      "en": "Clearer accessories"
    },
    {
      "vi": "Ki\u1EC3u chibi d\u1EC5 th\u01B0\u01A1ng",
      "en": "Cute chibi style"
    }
  ],
  "order": 17
}
`, "image-recipe-flash-sale": '{\n  "key": "flash-sale",\n  "group": "sell",\n  "name": {\n    "vi": "Flash sale",\n    "en": "Flash sale"\n  },\n  "icon": "flash",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n, ch\u1EEF hay sticker c\u0169 s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i.",\n      "en": "The whole product, well lit. Its old background, text and stickers are removed."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "T\u1EA1o c\u1EA3m gi\xE1c g\u1EA5p: gi\xE1 s\u1ED1c ch\u1EC9 trong m\u1ED9t khung gi\u1EDD.",\n      "en": "Create urgency: a shock price for a short window."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt, ch\u1EEF FLASH SALE, gi\xE1 sale v\xE0 khung gi\u1EDD \xE1p d\u1EE5ng.",\n      "en": "A square image: the product up front, FLASH SALE, the sale price and the time window."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, story, livestream, Shopee.",\n      "en": "Facebook posts, stories, livestreams, Shopee."\n    }\n  },\n  "fields": [\n    {\n      "key": "newPrice",\n      "type": "price",\n      "label": {\n        "vi": "Gi\xE1 sale",\n        "en": "Sale price"\n      },\n      "placeholder": {\n        "vi": "VD: 199000",\n        "en": "E.g. 199000"\n      },\n      "required": true\n    },\n    {\n      "key": "window",\n      "type": "text",\n      "label": {\n        "vi": "Khung gi\u1EDD",\n        "en": "Time window"\n      },\n      "placeholder": {\n        "vi": "VD: 20h\u201322h t\u1ED1i nay",\n        "en": "E.g. 8\u201310 pm tonight"\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "price",\n    "zone": "top",\n    "title": "FLASH SALE",\n    "newPrice": "newPrice",\n    "lines": [\n      "{{window}}"\n    ]\n  },\n  "designNotes": "Make it urgent through energy, not clutter. Place the product in the lower part of the frame, angled slightly, with diagonal light streaks or a speed-blur backdrop running toward it. Keep the top 35% a calm, dark or saturated field for FLASH SALE, the price and the time window. High-contrast red-to-orange or deep red with yellow-gold, adapted from the brand but staying hot. A crisp rim light separates the product from the background. One dynamic device only (streaks or a soft glow). No lightning bolts across the product, clocks with digits, text or marketplace marks; too many effects look cheap.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 1\n}\n', "image-recipe-freeship": '{\n  "key": "freeship",\n  "group": "sell",\n  "name": {\n    "vi": "Freeship",\n    "en": "Free shipping"\n  },\n  "icon": "truck",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh s\u1EA3n ph\u1EA9m n\u1EBFu mu\u1ED1n n\xF3 xu\u1EA5t hi\u1EC7n trong \u1EA3nh.",\n      "en": "Add a product photo if it should appear in the image."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o mi\u1EC5n ph\xED giao h\xE0ng \u0111\u1EC3 kh\xE1ch ch\u1ED1t \u0111\u01A1n nhanh h\u01A1n.",\n      "en": "Announce free shipping so buyers order sooner."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: ch\u1EEF FREESHIP th\u1EADt l\u1EDBn, m\u1EE9c \u0111\u01A1n t\u1ED1i thi\u1EC3u v\xE0 th\u1EDDi gian \xE1p d\u1EE5ng.",\n      "en": "A square image: a big FREESHIP, the minimum order and the period."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh b\xECa shop.",\n      "en": "Facebook and Zalo posts, shop cover."\n    }\n  },\n  "fields": [\n    {\n      "key": "minOrder",\n      "type": "price",\n      "label": {\n        "vi": "\u0110\u01A1n t\u1ED1i thi\u1EC3u",\n        "en": "Minimum order"\n      },\n      "placeholder": {\n        "vi": "VD: 199000",\n        "en": "E.g. 199000"\n      },\n      "required": true\n    },\n    {\n      "key": "period",\n      "type": "text",\n      "label": {\n        "vi": "Th\u1EDDi gian",\n        "en": "Period"\n      },\n      "placeholder": {\n        "vi": "VD: c\u1EA3 tu\u1EA7n n\xE0y",\n        "en": "E.g. all this week"\n      }\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "FREESHIP",\n    "lines": [\n      "Cho \u0111\u01A1n t\u1EEB {{minOrder}}",\n      "{{period}}"\n    ]\n  },\n  "designNotes": "A friendly, locally believable delivery scene: kraft parcel boxes, or a Vietnamese delivery motorbike with a cargo box (not an American truck), as a clean 3D or semi-flat illustration in the lower part of the frame. If a product photo is given, show it as the parcel contents peeking out of an open box. Keep the upper 45% a bright, flat or gently graded field for FREESHIP, the minimum order and the period. Cheerful palette: the brand colour plus a fresh blue-teal or yellow accent that contrasts with marketplace orange. Sparing motion lines. No platform logos, courier branding, road signs, numbers or a cluttered map.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 3\n}\n', "image-recipe-grand-opening": '{\n  "key": "grand-opening",\n  "group": "store",\n  "name": {\n    "vi": "Khai tr\u01B0\u01A1ng",\n    "en": "Grand opening"\n  },\n  "icon": "store",\n  "size": "portrait",\n  "input": {\n    "kind": "shop",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh c\u1EEDa h\xE0ng",\n      "en": "Shop photo"\n    },\n    "hint": {\n      "vi": "\u1EA2nh m\u1EB7t ti\u1EC1n ho\u1EB7c b\xEAn trong c\u1EEDa h\xE0ng.",\n      "en": "The shopfront or the inside of the shop."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o ng\xE0y khai tr\u01B0\u01A1ng v\xE0 k\xE9o kh\xE1ch \u0111\u1EBFn ng\xE0y \u0111\u1EA7u.",\n      "en": "Announce the opening day and draw people in."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 kh\xF4ng kh\xED vui, sang: ch\u1EEF KHAI TR\u01AF\u01A0NG, ng\xE0y, \u0111\u1ECBa ch\u1EC9 v\xE0 \u01B0u \u0111\xE3i khai tr\u01B0\u01A1ng.",\n      "en": "A festive portrait 4:5 image: GRAND OPENING, the date, the address and the opening offer."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, in t\u1EDD r\u01A1i.",\n      "en": "Facebook and Zalo posts, flyers."\n    }\n  },\n  "fields": [\n    {\n      "key": "date",\n      "type": "date",\n      "label": {\n        "vi": "Ng\xE0y khai tr\u01B0\u01A1ng",\n        "en": "Opening day"\n      },\n      "placeholder": {\n        "vi": "",\n        "en": ""\n      },\n      "required": true\n    },\n    {\n      "key": "address",\n      "type": "text",\n      "label": {\n        "vi": "\u0110\u1ECBa ch\u1EC9",\n        "en": "Address"\n      },\n      "placeholder": {\n        "vi": "VD: 12 L\xEA L\u1EE3i, Q.1",\n        "en": "E.g. 12 Le Loi, District 1"\n      },\n      "required": true\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i khai tr\u01B0\u01A1ng",\n        "en": "Opening offer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 20% ba ng\xE0y \u0111\u1EA7u",\n        "en": "E.g. 20% off for three days"\n      }\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "KHAI TR\u01AF\u01A0NG",\n    "lines": [\n      "{{date}} \xB7 {{address}}",\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "Celebratory and trustworthy. If a shop photo is given, keep the real storefront recognisable, brightened, in daylight or warm evening glow. Frame it with Vietnamese opening cues: tall l\u1EB5ng hoa khai tr\u01B0\u01A1ng at the sides, red ribbon, balloons, or a soft m\xFAa l\xE2n accent in the background; with no photo, compose these cues around an empty centre. Keep the lower 35\u201340% calm for the date, address and opening offer. Red-gold for a traditional feel, or the brand colours for a modern shop. Never invent signage, a shop name or text on ribbons.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 5\n}\n', "image-recipe-hiring": `{
  "key": "hiring",
  "group": "store",
  "name": {
    "vi": "Tuy\u1EC3n d\u1EE5ng",
    "en": "We're hiring"
  },
  "icon": "hiring",
  "size": "portrait",
  "input": {
    "kind": "shop",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh shop ho\u1EB7c ch\u1ED7 l\xE0m vi\u1EC7c",
      "en": "Shop or workplace photo"
    },
    "hint": {
      "vi": "\u1EA2nh th\u1EADt n\u01A1i l\xE0m vi\u1EC7c gi\xFAp \u1EE9ng vi\xEAn tin v\xE0 mu\u1ED1n \u0111\u1EBFn h\u01A1n.",
      "en": "A real photo of the workplace makes candidates trust it and want to come."
    }
  },
  "output": {
    "purpose": {
      "vi": "T\xECm ng\u01B0\u1EDDi cho m\u1ED9t v\u1ECB tr\xED, nh\xECn l\xE0 bi\u1EBFt \u0111ang tuy\u1EC3n g\xEC.",
      "en": "Find someone for one role, clear at a glance."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5 th\xE2n thi\u1EC7n, chuy\xEAn nghi\u1EC7p: ch\u1EEF TUY\u1EC2N D\u1EE4NG, v\u1ECB tr\xED v\xE0 m\u1EE9c l\u01B0\u01A1ng.",
      "en": "A friendly, professional portrait 4:5 image: HIRING, the role and the pay."
    },
    "channels": {
      "vi": "B\xE0i Facebook, nh\xF3m vi\u1EC7c l\xE0m, Zalo.",
      "en": "Facebook posts, job groups, Zalo."
    }
  },
  "fields": [
    {
      "key": "role",
      "type": "text",
      "label": {
        "vi": "V\u1ECB tr\xED",
        "en": "Role"
      },
      "placeholder": {
        "vi": "VD: Nh\xE2n vi\xEAn b\xE1n h\xE0ng",
        "en": "E.g. Sales assistant"
      },
      "required": true
    },
    {
      "key": "pay",
      "type": "text",
      "label": {
        "vi": "M\u1EE9c l\u01B0\u01A1ng",
        "en": "Pay"
      },
      "placeholder": {
        "vi": "VD: 7\u20139 tri\u1EC7u + th\u01B0\u1EDFng",
        "en": "E.g. 7\u20139 million + bonus"
      }
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "top",
    "title": "TUY\u1EC2N D\u1EE4NG",
    "lines": [
      "{{role}}",
      "{{pay}}"
    ]
  },
  "designNotes": "Make it feel like a good place to work. If a shop or workplace photo is given, use that real place as the scene (brightened, tidy, welcoming light) and keep it recognisable; otherwise show a bright, tidy scene from the shop's world (a packing table, a caf\xE9 counter, a laptop desk) with one or two staff seen from behind or softly blurred, or clean editorial illustration. Keep the scene in the lower half and the upper half a large, flat, high-contrast field for the role and pay, the first things candidates read. The brand colour as that field with one bold accent; optimistic but professional. No handshake stock, megaphones, pointing 'we want you' figures or text.",
  "fixes": [
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",
      "en": "Bolder, more vivid"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 7
}
`, "image-recipe-holiday-hours": '{\n  "key": "holiday-hours",\n  "group": "store",\n  "name": {\n    "vi": "L\u1ECBch ngh\u1EC9 l\u1EC5",\n    "en": "Holiday closing"\n  },\n  "icon": "calendar",\n  "size": "square",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh shop, s\u1EA3n ph\u1EA9m ho\u1EB7c logo",\n      "en": "Shop, product or logo photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh m\u1EB7t ti\u1EC1n, qu\u1EA7y h\xE0ng hay s\u1EA3n ph\u1EA9m \u0111\u1EC3 th\xF4ng b\xE1o mang \u0111\xFAng d\u1EA5u \u1EA5n shop b\u1EA1n.",\n      "en": "Add your shopfront, counter or a product so the notice looks like your shop."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o kh\xE1ch l\u1ECBch ngh\u1EC9 \u0111\u1EC3 kh\xF4ng ai \u0111\u1EB7t h\xE0ng r\u1ED3i ch\u1EDD.",\n      "en": "Tell customers when you are closed."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng g\u1ECDn g\xE0ng: TH\xD4NG B\xC1O L\u1ECACH NGH\u1EC8, ngh\u1EC9 t\u1EEB ng\xE0y n\xE0o \u0111\u1EBFn ng\xE0y n\xE0o, ng\xE0y l\xE0m l\u1EA1i.",\n      "en": "A tidy square image: CLOSING NOTICE, closed from and to, back on."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh ghim \u0111\u1EA7u trang.",\n      "en": "Facebook and Zalo posts, pinned image."\n    }\n  },\n  "fields": [\n    {\n      "key": "from",\n      "type": "date",\n      "label": {\n        "vi": "Ngh\u1EC9 t\u1EEB",\n        "en": "Closed from"\n      },\n      "placeholder": {\n        "vi": "",\n        "en": ""\n      },\n      "required": true\n    },\n    {\n      "key": "to",\n      "type": "date",\n      "label": {\n        "vi": "\u0110\u1EBFn h\u1EBFt",\n        "en": "Until"\n      },\n      "placeholder": {\n        "vi": "",\n        "en": ""\n      },\n      "required": true\n    },\n    {\n      "key": "reason",\n      "type": "text",\n      "label": {\n        "vi": "D\u1ECBp",\n        "en": "Occasion"\n      },\n      "placeholder": {\n        "vi": "VD: T\u1EBFt Nguy\xEAn \u0110\xE1n",\n        "en": "E.g. Lunar New Year"\n      }\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "center",\n    "title": "TH\xD4NG B\xC1O L\u1ECACH NGH\u1EC8",\n    "lines": [\n      "{{reason}}",\n      "Ngh\u1EC9 t\u1EEB {{from}} \u0111\u1EBFn h\u1EBFt {{to}}"\n    ]\n  },\n  "designNotes": "Calm, warm and polite: a notice, not an ad. Leave the central 55\u201360% a clean, paper-textured or soft-gradient panel area for the dates. If a shop photo is given, show the real place softly behind (shutters down or a quiet, tidy counter, gentle evening light), still recognisable but calm and slightly blurred so the dates read first. If a product or logo is given, place it small near a lower corner, never in the centre. Seasonal decoration only in the top band and corners: for T\u1EBFt a branch of hoa mai (South) or hoa \u0111\xE0o (North), l\xEC x\xEC envelopes, a hint of b\xE1nh ch\u01B0ng; for 30/4\u20131/5 or 2/9 restrained red-gold bunting and a lotus. Soft, even light; red-gold accents for T\u1EBFt and the brand colour otherwise. Never draw calendars, digits, Chinese characters or couplet text.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 6\n}\n', "image-recipe-magazine-cover": `{
  "key": "magazine-cover",
  "group": "personal",
  "name": {
    "vi": "B\xECa t\u1EA1p ch\xED",
    "en": "Magazine cover"
  },
  "icon": "magazine",
  "size": "portrait",
  "input": {
    "kind": "portrait",
    "required": true,
    "max": 3,
    "label": {
      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",
      "en": "Your portrait"
    },
    "hint": {
      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",
      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."
    }
  },
  "output": {
    "purpose": {
      "vi": "\u1EA2nh g\xE2y ch\xFA \xFD \u0111\u1EC3 khoe m\u1ED9t c\u1ED9t m\u1ED1c: b\u1EA1n l\xEAn b\xECa t\u1EA1p ch\xED nh\u01B0 m\u1ED9t ng\u01B0\u1EDDi trong ngh\u1EC1 \u0111\xE1ng ch\xFA \xFD.",
      "en": "An eye-catching way to share a milestone: you on a magazine cover as someone worth knowing in your field."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: ch\xE2n dung b\u1EA1n ki\u1EC3u b\xECa t\u1EA1p ch\xED, t\xEAn b\u1EA1n v\xE0 m\u1ED9t d\xF2ng t\xEDt \u1EDF ph\u1EA7n d\u01B0\u1EDBi.",
      "en": "A portrait 4:5 image: you as a magazine cover, your name and one headline across the lower part."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, LinkedIn, story, \u1EA3nh gi\u1EDBi thi\u1EC7u tr\xEAn website.",
      "en": "Facebook, Zalo and LinkedIn posts, stories, website about pages."
    }
  },
  "fields": [
    {
      "key": "name",
      "type": "text",
      "label": {
        "vi": "T\xEAn tr\xEAn b\xECa",
        "en": "Name on the cover"
      },
      "placeholder": {
        "vi": "VD: Ng\u1ECDc Anh",
        "en": "E.g. Ngoc Anh"
      },
      "required": true
    },
    {
      "key": "headline",
      "type": "text",
      "label": {
        "vi": "D\xF2ng t\xEDt",
        "en": "Headline"
      },
      "placeholder": {
        "vi": "VD: 10 n\u0103m l\xE0m b\xE1nh th\u1EE7 c\xF4ng cho ng\u01B0\u1EDDi S\xE0i G\xF2n",
        "en": "E.g. Ten years of handmade cakes for Saigon"
      },
      "required": true
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{name}}",
    "lines": [
      "{{headline}}"
    ]
  },
  "designNotes": "An editorial magazine-cover portrait, shot like a professional cover session: the person from the chest up, centred, looking straight into the camera with confident, relaxed expression, the face sharp in the upper half. Clean studio backdrop in one rich colour (or the person's brand colour), soft key light with a gentle rim light, polished but real skin texture. Smart, styled clothes that suit their trade. Leave the lower third an even, darker or gradient area with nothing important in it, for the name and headline Studio draws there. No masthead, logo, barcode, cover lines or any text: Studio adds the words.",
  "fixes": [
    {
      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",
      "en": "Look more like me"
    },
    {
      "vi": "N\u1EC1n m\xE0u th\u01B0\u01A1ng hi\u1EC7u c\u1EE7a t\xF4i",
      "en": "My brand colour as the backdrop"
    },
    {
      "vi": "Sang tr\u1ECDng, ki\u1EC3u t\u1EA1p ch\xED th\u1EDDi trang",
      "en": "More fashion-magazine glamour"
    },
    {
      "vi": "Ch\u1EEBa ch\u1ED7 ch\u1EEF r\u1ED9ng h\u01A1n",
      "en": "More room for the words"
    }
  ],
  "order": 18
}
`, "image-recipe-mid-autumn": '{\n  "key": "mid-autumn",\n  "group": "season",\n  "name": {\n    "vi": "Trung thu",\n    "en": "Mid-Autumn"\n  },\n  "icon": "moon",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m (VD: h\u1ED9p b\xE1nh)",\n      "en": "Product photo (e.g. a mooncake box)"\n    },\n    "hint": {\n      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m n\u1EBFu mu\u1ED1n n\xF3 l\xE0 t\xE2m \u0111i\u1EC3m.",\n      "en": "Add a product to make it the centre."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc Trung thu ho\u1EB7c b\xE1n qu\xE0 Trung thu v\u1EDBi kh\xF4ng kh\xED \u0111o\xE0n vi\xEAn.",\n      "en": "Greet or sell for Mid-Autumn with a reunion mood."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: tr\u0103ng r\u1EB1m, l\u1ED3ng \u0111\xE8n \xF4ng sao, \xE1nh v\xE0ng \u1EA5m, l\u1EDDi ch\xFAc v\xE0 s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n n\u1EBFu c\xF3.",\n      "en": "A portrait 4:5 image: full moon, star lanterns, warm gold light, your greeting and product if any."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, Shopee.",\n      "en": "Facebook, Zalo, Shopee."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Greeting"\n      },\n      "placeholder": {\n        "vi": "VD: Trung Thu \u0110o\xE0n Vi\xEAn",\n        "en": "E.g. A happy reunion"\n      },\n      "required": true,\n      "default": "Trung Thu \u0110o\xE0n Vi\xEAn"\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}"\n  },\n  "designNotes": "A moonlit, nostalgic scene. A large glowing tr\u0103ng r\u1EB1m and a deep indigo-to-navy night sky make the calm upper 35% for the greeting. Below, the product (a mooncake box with b\xE1nh n\u01B0\u1EDBng and b\xE1nh d\u1EBBo and a pot of tea) lit warmly by a red or yellow \u0111\xE8n \xF4ng sao and other paper-bamboo lanterns (carp, rabbit). Tiny silhouettes of ch\u1ECB H\u1EB1ng or ch\xFA Cu\u1ED9i under the banyan tree on the moon, or children carrying lanterns, as accents. Warm amber against cool blue. No Chinese-style palace lanterns with hanzi, and no text on boxes.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "08-10",\n      "to": "10-05"\n    }\n  ],\n  "order": 21\n}\n', "image-recipe-new-arrival": `{
  "key": "new-arrival",
  "group": "sell",
  "name": {
    "vi": "H\xE0ng m\u1EDBi v\u1EC1",
    "en": "New arrival"
  },
  "icon": "sparkles",
  "size": "portrait",
  "input": {
    "kind": "product",
    "required": true,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",
      "en": "Product photo"
    },
    "hint": {
      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n, ch\u1EEF hay sticker c\u0169 s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i.",
      "en": "The whole product, well lit. Its old background, text and stickers are removed."
    }
  },
  "output": {
    "purpose": {
      "vi": "Gi\u1EDBi thi\u1EC7u s\u1EA3n ph\u1EA9m m\u1EDBi, g\xE2y t\xF2 m\xF2 \u0111\u1EC3 kh\xE1ch h\u1ECFi gi\xE1.",
      "en": "Introduce a new product and spark questions."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: s\u1EA3n ph\u1EA9m trong b\u1ED1i c\u1EA3nh \u0111\u1EB9p nh\u01B0 \u1EA3nh t\u1EA1p ch\xED, d\xF2ng H\xC0NG M\u1EDAI V\u1EC0 v\xE0 t\xEAn s\u1EA3n ph\u1EA9m.",
      "en": "A portrait 4:5 image: the product in an editorial setting, NEW ARRIVAL and the product name."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Instagram, Zalo.",
      "en": "Facebook, Instagram and Zalo posts."
    }
  },
  "fields": [
    {
      "key": "productName",
      "type": "text",
      "label": {
        "vi": "T\xEAn s\u1EA3n ph\u1EA9m",
        "en": "Product name"
      },
      "placeholder": {
        "vi": "VD: \xC1o kho\xE1c gi\xF3 unisex",
        "en": "E.g. Unisex windbreaker"
      },
      "required": true
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "top",
    "title": "H\xC0NG M\u1EDAI V\u1EC0",
    "lines": [
      "{{productName}}"
    ]
  },
  "designNotes": "An editorial launch look: the product centred or slightly low on a plinth, a stone or terrazzo slab, or a fabric drape, with dramatic soft side light and gentle shadow that bring out texture and craft. Leave the upper 30\u201335% as calm, uniform negative space for H\xC0NG M\u1EDAI V\u1EC0 and the product name. Soft neutrals or one deep tone taken from the product or brand: a dark backdrop reads premium, a light one fresh. One or two props from the product's world, softly out of focus. Calmer than a sale image: no bursts, badges or text.",
  "fixes": [
    {
      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",
      "en": "Bigger, clearer product"
    },
    {
      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",
      "en": "Lighter, cleaner background"
    },
    {
      "vi": "Sang tr\u1ECDng h\u01A1n",
      "en": "More premium"
    },
    {
      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",
      "en": "A different setting"
    }
  ],
  "order": 4
}
`, "image-recipe-outdoor": '{\n  "key": "outdoor",\n  "group": "personal",\n  "name": {\n    "vi": "\u1EA2nh ngo\xE0i tr\u1EDDi",\n    "en": "Outdoor portrait"\n  },\n  "icon": "sun",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh ch\xE2n dung g\u1EA7n g\u0169i, t\u01B0\u01A1i s\xE1ng: h\u1EE3p v\u1EDBi ng\u01B0\u1EDDi l\xE0m d\u1ECBch v\u1EE5, coach, b\xE1n h\xE0ng c\xE1 nh\xE2n.",\n      "en": "A warm, approachable portrait for coaches, service providers and personal sellers."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n ngo\xE0i tr\u1EDDi l\xFAc n\u1EAFng v\xE0ng, h\u1EADu c\u1EA3nh m\u1EDD \u0111\u1EB9p, n\u1EE5 c\u01B0\u1EDDi t\u1EF1 nhi\xEAn.",\n      "en": "A portrait 4:5 image: you outdoors in golden-hour light, a soft blurred background, a natural smile."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, b\xE0i Facebook, Zalo, website.",\n      "en": "Profile photos, Facebook and Zalo posts, websites."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Waist-up, an 85mm look with creamy bokeh, the face sharp and on the upper third. Golden-hour backlight with a warm rim on the hair and soft fill on the face. One Vietnamese outdoor setting that suits the person: a leafy street with old trees, a riverside path, a park, a rooftop at sunset, or a beach in the late afternoon. Relaxed pose (walking slowly, leaning on a railing, a hand in a pocket), a genuine smile. Smart-casual, solid colours that separate from the background. Real skin texture, no plastic smoothing, no lens-flare overload, no crowds or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1i t\u1EAFn, r\u1EA1ng r\u1EE1 h\u01A1n",\n      "en": "Brighter, warmer expression"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 12\n}\n', "image-recipe-polaroid": '{\n  "key": "polaroid",\n  "group": "personal",\n  "name": {\n    "vi": "\u1EA2nh polaroid k\u1EF7 ni\u1EC7m",\n    "en": "Polaroid keepsake"\n  },\n  "icon": "camera",\n  "size": "square",\n  "input": {\n    "kind": "any",\n    "required": true,\n    "max": 4,\n    "label": {\n      "vi": "\u1EA2nh nh\u1EEFng ng\u01B0\u1EDDi trong khung",\n      "en": "Photos of the people"\n    },\n    "hint": {\n      "vi": "\u1EA2nh c\u1EE7a b\u1EA1n v\xE0 ng\u01B0\u1EDDi mu\u1ED1n ch\u1EE5p c\xF9ng: b\u1EA3n th\xE2n l\xFAc nh\u1ECF, b\u1ED1 m\u1EB9, ng\u01B0\u1EDDi th\u01B0\u01A1ng. M\u1ED7i ng\u01B0\u1EDDi m\u1ED9t \u1EA3nh r\xF5 m\u1EB7t.",\n      "en": "You and who you want beside you: your younger self, parents, a partner. One clear face per photo."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "M\u1ED9t t\u1EA5m \u1EA3nh k\u1EF7 ni\u1EC7m ki\u1EC3u polaroid: b\u1EA1n \u0111\u1EE9ng c\u1EA1nh ng\u01B0\u1EDDi th\xE2n ho\u1EB7c ch\xEDnh m\xECnh l\xFAc nh\u1ECF.",\n      "en": "A polaroid-style keepsake: you beside someone you love, or your younger self."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng ki\u1EC3u polaroid: vi\u1EC1n tr\u1EAFng, \u0111\xE8n flash, h\u1EA1t film, nh\u1EEFng ng\u01B0\u1EDDi trong \u1EA3nh gi\u1EEF \u0111\xFAng g\u01B0\u01A1ng m\u1EB7t.",\n      "en": "A square polaroid-style image: white frame, flash, film grain, every face unchanged."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story.",\n      "en": "Facebook and Zalo posts, stories."\n    }\n  },\n  "fields": [\n    {\n      "key": "people",\n      "type": "text",\n      "label": {\n        "vi": "Ai trong \u1EA3nh",\n        "en": "Who is in it"\n      },\n      "placeholder": {\n        "vi": "VD: t\xF4i (\u1EA3nh 1) \xF4m t\xF4i l\xFAc 5 tu\u1ED5i (\u1EA3nh 2)",\n        "en": "E.g. me (photo 1) hugging me at 5 (photo 2)"\n      }\n    }\n  ],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Each attached photo is a different person unless the founder says otherwise; every person keeps their own face, age and skin tone exactly, and faces never blend. A real instant-film photo: a thick white polaroid border (wider at the bottom, left blank), on-camera flash in a dim room with a plain white curtain behind, slight motion blur, warm faded colour and film grain. A natural moment: an arm around the shoulder, a hug, heads leaning together, the child self at their real childhood age and size. Only the people in the photos; no celebrities or invented people, and no writing on the border or image.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t h\u01A1n",\n      "en": "Faces more like the photos"\n    },\n    {\n      "vi": "T\u1EF1 nhi\xEAn, \u1EA5m \xE1p h\u01A1n",\n      "en": "More natural and warm"\n    },\n    {\n      "vi": "M\xE0u film c\u0169 h\u01A1n",\n      "en": "More vintage film colour"\n    }\n  ],\n  "order": 16\n}\n', "image-recipe-pro-avatar": '{\n  "key": "pro-avatar",\n  "group": "personal",\n  "name": {\n    "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n chuy\xEAn nghi\u1EC7p",\n    "en": "Professional headshot"\n  },\n  "icon": "avatar",\n  "size": "square",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh ch\xE2n dung ch\u1EC9n chu cho h\u1ED3 s\u01A1 c\xF4ng vi\u1EC7c, website, b\xE0i gi\u1EDBi thi\u1EC7u.",\n      "en": "A polished headshot for work profiles, websites and bios."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng ch\u1EE5p ki\u1EC3u studio: trang ph\u1EE5c l\u1ECBch s\u1EF1, n\u1EC1n g\u1ECDn, \xE1nh s\xE1ng \u0111\u1EB9p, v\u1EABn \u0111\xFAng l\xE0 b\u1EA1n.",\n      "en": "A square studio-style headshot: smart clothes, clean background, flattering light, still clearly you."\n    },\n    "channels": {\n      "vi": "LinkedIn, Zalo, Facebook, website.",\n      "en": "LinkedIn, Zalo, Facebook, websites."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Head and shoulders, the face about 60% of the frame, eyes on the upper third, camera at eye level. Shoulders turned slightly, direct eye contact, a relaxed natural smile. A soft key light at 45\xB0 with fill from the other side and visible catchlights. Plain backdrop (light grey, off-white, muted blue) or a softly blurred modern office. Solid navy, black, white or grey business clothing. Keep identity exactly, including skin texture, glasses and hairline; retouch only stray hairs and blemishes. Never beautify, change ethnicity, add jewellery or make it a fashion shoot.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1i t\u1EAFn, r\u1EA1ng r\u1EE1 h\u01A1n",\n      "en": "Brighter, warmer expression"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 9\n}\n', "image-recipe-quote": `{
  "key": "quote",
  "group": "content",
  "name": {
    "vi": "Tr\xEDch d\u1EABn / M\u1EB9o",
    "en": "Quote or tip"
  },
  "icon": "lightbulb",
  "size": "square",
  "input": {
    "kind": "portrait",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",
      "en": "Your portrait"
    },
    "hint": {
      "vi": "Th\xEAm \u1EA3nh c\u1EE7a ng\u01B0\u1EDDi n\xF3i c\xE2u n\xE0y \u0111\u1EC3 b\xE0i \u0111\u0103ng mang d\u1EA5u \u1EA5n c\xE1 nh\xE2n.",
      "en": "Add a photo of whoever said it for a personal touch."
    }
  },
  "output": {
    "purpose": {
      "vi": "Chia s\u1EBB m\u1ED9t c\xE2u hay ho\u1EB7c m\u1ED9t m\u1EB9o, \u0111\u1EC3 ng\u01B0\u1EDDi xem l\u01B0u v\xE0 chia s\u1EBB.",
      "en": "Share a line or a tip people save and share."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng: c\xE2u tr\xEDch d\u1EABn l\u1EDBn, d\u1EC5 \u0111\u1ECDc tr\xEAn n\u1EC1n h\u1EE3p ch\u1EE7 \u0111\u1EC1, t\xEAn t\xE1c gi\u1EA3 b\xEAn d\u01B0\u1EDBi.",
      "en": "A square image: the quote large and readable on a fitting background, the author below."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Instagram, LinkedIn.",
      "en": "Facebook, Instagram, LinkedIn posts."
    }
  },
  "fields": [
    {
      "key": "quote",
      "type": "longtext",
      "label": {
        "vi": "C\xE2u tr\xEDch d\u1EABn",
        "en": "Quote"
      },
      "placeholder": {
        "vi": "VD: B\xE1n h\xE0ng l\xE0 gi\xFAp kh\xE1ch mua \u0111\xFAng th\u1EE9 h\u1ECD c\u1EA7n.",
        "en": "E.g. Selling is helping people buy what they need."
      },
      "required": true
    },
    {
      "key": "author",
      "type": "text",
      "label": {
        "vi": "T\xE1c gi\u1EA3",
        "en": "Author"
      },
      "placeholder": {
        "vi": "VD: t\xEAn b\u1EA1n ho\u1EB7c t\xEAn shop",
        "en": "E.g. your name or shop"
      }
    }
  ],
  "overlay": {
    "layout": "quote",
    "zone": "center",
    "quote": "{{quote}}",
    "lines": [
      "\u2014 {{author}}"
    ]
  },
  "designNotes": "The background serves the words. With no portrait: a quiet, textured field (paper, linen, soft gradient, or an out-of-focus calm scene from the founder's niche) with the centre 60\u201370% completely clear and even in tone for a centred quote and the author. With a portrait: keep the person exactly as in the photo, place them at one side or the lower edge looking toward the centre, softly lit, and keep the central text area clear and calm beside them; the face never sits behind the words. One small decorative element at an edge or corner. A limited palette, the brand colour or a muted tone, with enough contrast for the words. No busy patterns, bright spots or hard edges in the text zone, and no text.",
  "fixes": [
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",
      "en": "Bolder, more vivid"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 23
}
`, "image-recipe-sale": '{\n  "key": "sale",\n  "group": "sell",\n  "name": {\n    "vi": "\u1EA2nh gi\u1EA3m gi\xE1",\n    "en": "Price drop"\n  },\n  "icon": "sale",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n, ch\u1EEF hay sticker c\u0169 s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i.",\n      "en": "The whole product, well lit. Its old background, text and stickers are removed."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o gi\u1EA3m gi\xE1 m\u1ED9t s\u1EA3n ph\u1EA9m, k\xE9o kh\xE1ch b\u1EA5m mua ngay.",\n      "en": "Announce a price drop and get people to buy now."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n tr\xEAn n\u1EC1n m\u1EDBi, gi\xE1 c\u0169 g\u1EA1ch ngang, gi\xE1 m\u1EDBi v\xE0 % gi\u1EA3m n\u1ED5i b\u1EADt, t\xEAn shop.",\n      "en": "A square image: your product on a new background, the old price struck through, the new price and % off, your shop name."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh s\u1EA3n ph\u1EA9m Shopee.",\n      "en": "Facebook and Zalo posts, Shopee product images."\n    }\n  },\n  "fields": [\n    {\n      "key": "oldPrice",\n      "type": "price",\n      "label": {\n        "vi": "Gi\xE1 g\u1ED1c",\n        "en": "Original price"\n      },\n      "placeholder": {\n        "vi": "VD: 450000",\n        "en": "E.g. 450000"\n      },\n      "required": true\n    },\n    {\n      "key": "newPrice",\n      "type": "price",\n      "label": {\n        "vi": "Gi\xE1 gi\u1EA3m",\n        "en": "Sale price"\n      },\n      "placeholder": {\n        "vi": "VD: 315000",\n        "en": "E.g. 315000"\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "price",\n    "zone": "bottom",\n    "oldPrice": "oldPrice",\n    "newPrice": "newPrice"\n  },\n  "designNotes": "Put one hero product, fully visible, in the upper 60\u201365% of the frame, slightly off-centre, filling 40\u201370% of that area, on a clean matte surface with a soft shadow. Keep the lower 35% calm and low-detail (a smooth gradient or plain surface) and the top-right corner clear for the % badge. Bright, even studio light so materials look true. A warm red, coral or orange accent field built from the brand colour behind a neutral surface makes red or yellow badges pop; at most three colours. No confetti, extra props, duplicate products, text, numbers or price tags. The product must look accurate, not cheap.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 0\n}\n', "image-recipe-speaker": `{
  "key": "speaker",
  "group": "personal",
  "name": {
    "vi": "\u1EA2nh di\u1EC5n gi\u1EA3",
    "en": "Speaker photo"
  },
  "icon": "mic",
  "size": "landscape",
  "input": {
    "kind": "portrait",
    "required": true,
    "max": 3,
    "label": {
      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",
      "en": "Your portrait"
    },
    "hint": {
      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",
      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."
    }
  },
  "output": {
    "purpose": {
      "vi": "T\u1EA1o uy t\xEDn chuy\xEAn gia: b\u1EA1n \u0111ang chia s\u1EBB tr\u01B0\u1EDBc kh\xE1n gi\u1EA3.",
      "en": "Build expert credibility: you speaking to an audience."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh ngang 16:9: b\u1EA1n tr\xEAn s\xE2n kh\u1EA5u ho\u1EB7c l\u1EDBp workshop, c\u1EA7m micro, kh\xE1n gi\u1EA3 m\u1EDD ph\xEDa tr\u01B0\u1EDBc.",
      "en": "A landscape 16:9 image: you on stage or at a workshop with a microphone, the audience softly blurred."
    },
    "channels": {
      "vi": "H\u1ED3 s\u01A1 di\u1EC5n gi\u1EA3, poster s\u1EF1 ki\u1EC7n, LinkedIn, b\xE0i gi\u1EDBi thi\u1EC7u kho\xE1 h\u1ECDc.",
      "en": "Speaker kits, event posters, LinkedIn, course pages."
    }
  },
  "fields": [
    {
      "key": "topic",
      "type": "text",
      "label": {
        "vi": "B\u1EA1n chia s\u1EBB v\u1EC1",
        "en": "You speak about"
      },
      "placeholder": {
        "vi": "VD: b\xE1n h\xE0ng tr\xEAn TikTok cho shop nh\u1ECF",
        "en": "E.g. TikTok selling for small shops"
      }
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "Mid-sentence and mid-gesture: an open hand, engaged expression, a handheld or lapel mic, away from any podium. Camera slightly below eye level, the speaker sharp, the backs of a few audience heads softly out of focus in the foreground. A modest, believable venue for the topic (a hotel conference room, a co-working workshop, a small stage) with a warm stage light on the speaker and a cooler room. The screen behind shows only an abstract colour slide or soft light, never words, logos or charts. Business-casual clothes. Keep the speaker's face exactly; no crowd of identical faces, no podium logos or text.",
  "fixes": [
    {
      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",
      "en": "Look more like me"
    },
    {
      "vi": "T\u01B0\u01A1i t\u1EAFn, r\u1EA1ng r\u1EE1 h\u01A1n",
      "en": "Brighter, warmer expression"
    },
    {
      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",
      "en": "A different setting"
    },
    {
      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",
      "en": "Warmer light"
    }
  ],
  "order": 13
}
`, "image-recipe-testimonial": '{\n  "key": "testimonial",\n  "group": "content",\n  "name": {\n    "vi": "Feedback kh\xE1ch h\xE0ng",\n    "en": "Customer feedback"\n  },\n  "icon": "quote",\n  "size": "square",\n  "input": {\n    "kind": "screenshot",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh ch\u1EE5p feedback",\n      "en": "Feedback screenshot"\n    },\n    "hint": {\n      "vi": "\u1EA2nh ch\u1EE5p m\xE0n h\xECnh tin nh\u1EAFn ho\u1EB7c \u0111\xE1nh gi\xE1 th\u1EADt c\u1EE7a kh\xE1ch.",\n      "en": "A screenshot of a real customer message or review."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Khoe \u0111\xE1nh gi\xE1 th\u1EADt c\u1EE7a kh\xE1ch \u0111\u1EC3 ng\u01B0\u1EDDi sau tin v\xE0 mua.",\n      "en": "Show a real review so the next buyer trusts you."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: \u1EA3nh ch\u1EE5p feedback c\u1EE7a b\u1EA1n \u0111\u01B0\u1EE3c \u0111\u1EB7t trong khung \u0111\u1EB9p, gi\u1EEF nguy\xEAn t\u1EEBng ch\u1EEF.",\n      "en": "A square image: your feedback screenshot in a designed frame, every word unchanged."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, highlight.",\n      "en": "Facebook and Zalo posts, stories, highlights."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "The screenshot is the proof: never redraw, crop text from, re-letter or improve it. Design only the frame: a soft brand-coloured or neutral background with subtle texture, the screenshot in a phone mockup or a rounded card with a gentle drop shadow, centred, 60\u201370% of the height. Restrained accents only: one large faint quotation-mark shape, small hearts or stars in the corners, or a thin frame line. Generous margins so it reads at feed size; minimal branding. A loud poster look makes the review feel staged.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 22\n}\n', "image-recipe-tet": '{\n  "key": "tet",\n  "group": "season",\n  "name": {\n    "vi": "Ch\xFAc T\u1EBFt",\n    "en": "T\u1EBFt greeting"\n  },\n  "icon": "blossom",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh c\u1EE7a b\u1EA1n ho\u1EB7c s\u1EA3n ph\u1EA9m",\n      "en": "You or your product"\n    },\n    "hint": {\n      "vi": "Th\xEAm ch\xE2n dung ho\u1EB7c s\u1EA3n ph\u1EA9m n\u1EBFu mu\u1ED1n xu\u1EA5t hi\u1EC7n trong \u1EA3nh T\u1EBFt.",\n      "en": "Add a portrait or product to appear in the T\u1EBFt image."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc T\u1EBFt kh\xE1ch h\xE0ng, \u0111\u1ED1i t\xE1c; \u1EA5m \xE1p v\xE0 mang d\u1EA5u \u1EA5n th\u01B0\u01A1ng hi\u1EC7u.",\n      "en": "Send T\u1EBFt wishes to customers and partners, warm and on-brand."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 kh\xF4ng kh\xED T\u1EBFt Vi\u1EC7t (mai, \u0111\xE0o, \u0111\u1ECF v\xE0ng), l\u1EDDi ch\xFAc c\u1EE7a b\u1EA1n v\xE0 t\xEAn shop.",\n      "en": "A portrait 4:5 image in a Vietnamese T\u1EBFt mood (apricot and peach blossom, red and gold), your greeting and shop name."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, thi\u1EC7p \u0111i\u1EC7n t\u1EED.",\n      "en": "Facebook and Zalo posts, e-cards."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Greeting"\n      },\n      "placeholder": {\n        "vi": "VD: Ch\xFAc M\u1EEBng N\u0103m M\u1EDBi",\n        "en": "E.g. Happy New Year"\n      },\n      "required": true,\n      "default": "Ch\xFAc M\u1EEBng N\u0103m M\u1EDBi"\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}"\n  },\n  "designNotes": "Unmistakably Vietnamese T\u1EBFt: hoa mai v\xE0ng (South) or hoa \u0111\xE0o h\u1ED3ng (North), b\xE1nh ch\u01B0ng or b\xE1nh t\xE9t, m\xE2m ng\u0169 qu\u1EA3, l\xEC x\xEC, blank \xF4ng \u0111\u1ED3 calligraphy paper; warm golden light with bokeh. The portrait or product sits in the lower or centre part, framed by blossom branches. Keep the upper 30% a calm soft red or cream gradient for the greeting. Red-gold with cream relief; modern brands can use pastel pink and green. Never Chinese characters, couplet text, Chinese-style dragons, the rabbit (Vietnam uses the cat) or god-of-wealth figures.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "12-10",\n      "to": "02-28"\n    }\n  ],\n  "order": 20\n}\n', "image-recipe-women-day": `{
  "key": "women-day",
  "group": "season",
  "name": {
    "vi": "Ch\xFAc m\u1EEBng 20/10 \xB7 8/3",
    "en": "Women's Day greeting"
  },
  "icon": "flower",
  "size": "portrait",
  "input": {
    "kind": "any",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m ho\u1EB7c ch\xE2n dung",
      "en": "Product or portrait"
    },
    "hint": {
      "vi": "Th\xEAm n\u1EBFu mu\u1ED1n s\u1EA3n ph\u1EA9m ho\u1EB7c b\u1EA1n xu\u1EA5t hi\u1EC7n trong \u1EA3nh.",
      "en": "Add one if your product or you should appear."
    }
  },
  "output": {
    "purpose": {
      "vi": "G\u1EEDi l\u1EDDi ch\xFAc ng\xE0y Ph\u1EE5 n\u1EEF t\u1EDBi kh\xE1ch h\xE0ng, gi\u1EEF th\u01B0\u01A1ng hi\u1EC7u trong t\xE2m tr\xED h\u1ECD.",
      "en": "Greet customers on Women's Day and stay top of mind."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5 nh\u1EB9 nh\xE0ng, tinh t\u1EBF v\u1EDBi hoa v\xE0 l\u1EDDi ch\xFAc c\u1EE7a b\u1EA1n.",
      "en": "A gentle portrait 4:5 image with flowers and your greeting."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story.",
      "en": "Facebook and Zalo posts, stories."
    }
  },
  "fields": [
    {
      "key": "greeting",
      "type": "text",
      "label": {
        "vi": "L\u1EDDi ch\xFAc",
        "en": "Greeting"
      },
      "placeholder": {
        "vi": "VD: Ch\xFAc m\u1EEBng ng\xE0y Ph\u1EE5 n\u1EEF Vi\u1EC7t Nam 20/10",
        "en": "E.g. Happy Vietnamese Women's Day"
      },
      "required": true,
      "default": "Ch\xFAc m\u1EEBng ng\xE0y Ph\u1EE5 n\u1EEF Vi\u1EC7t Nam 20/10"
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{greeting}}"
  },
  "designNotes": "Gentle and refined, never kitsch. Fresh flowers as the hero: a loose bouquet of roses, peonies or lotus in soft pink, coral and cream, with daylight and shallow depth of field. With a product photo, place the product among the flowers as a gift; with a portrait, keep the face exactly and add flowers and soft light around the person. Keep the lower 35% a calm, smooth field (soft pastel gradient or blurred petals) for the greeting. Pastel pink, peach and cream with one brand accent. No hearts clip-art, glitter, cartoon figures or text.",
  "fixes": [
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",
      "en": "Bolder, more vivid"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "seasons": [
    {
      "from": "10-01",
      "to": "10-21"
    },
    {
      "from": "02-25",
      "to": "03-09"
    }
  ],
  "order": 19
}
`, "social-image-design": 'C\xC1CH L\xC0M: SOCIAL IMAGE DESIGN\n\nL\xE0m vi\u1EC7c n\xE0y theo c\xE1ch l\xE0m d\u01B0\u1EDBi \u0111\xE2y. Kh\xF4ng d\xF9ng skill, playbook hay framework n\xE0o kh\xE1c \u0111\u01B0\u1EE3c c\xE0i trong Codex. Ch\u1ED7 n\xE0o kh\xE1c v\u1EDBi ph\u1EA7n giao vi\u1EC7c c\u1EE7a task (d\u1EEF li\u1EC7u, gi\u1EDBi h\u1EA1n, khu\xF4n k\u1EBFt qu\u1EA3), l\xE0m theo ph\u1EA7n giao vi\u1EC7c.\n\n## K\u1EBFt qu\u1EA3 c\u1EA7n \u0111\u1EA1t\n\nT\u1EA1o \u1EA3nh cho m\u1EA1ng x\xE3 h\u1ED9i v\xE0 b\xE1n h\xE0ng m\xE0 ng\u01B0\u1EDDi xem hi\u1EC3u trong v\xE0i gi\xE2y tr\xEAn m\xE0n h\xECnh \u0111i\u1EC7n tho\u1EA1i, gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m, \u0111\xFAng ng\u01B0\u1EDDi v\xE0 \u0111\xFAng d\u1EEF ki\u1EC7n founder \u0111\u01B0a ra.\n\nPrimary deliverable: **Review-ready social image options**.\n\nVi\u1EC7c n\xE0y ho\xE0n th\xE0nh khi m\u1ED7i ph\u01B0\u01A1ng \xE1n \u0111\u1EA1t m\u1EE5c \u0111\xEDch \u0111\xE3 h\u1EE9a, gi\u1EEF \u0111\xFAng \u1EA3nh g\u1ED1c theo quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o, kh\xF4ng c\xF3 ch\u1EEF hay d\u1EEF ki\u1EC7n b\u1ECBa, v\xE0 c\xE1c ph\u01B0\u01A1ng \xE1n kh\xE1c nhau th\u1EADt s\u1EF1.\n\n## Khi n\xE0o d\xF9ng\n\n- \u1EA2nh qu\u1EA3ng b\xE1, \u1EA3nh s\u1EA3n ph\u1EA9m, \u1EA3nh \u0111\u1EA1i di\u1EC7n, \u1EA3nh b\xECa, \u1EA3nh d\u1ECBp l\u1EC5, \u1EA3nh tuy\u1EC3n d\u1EE5ng, \u1EA3nh tr\xEDch d\u1EABn hay \u1EA3nh minh h\u1ECDa cho b\xE0i vi\u1EBFt.\n- C\xF3 brief, m\u1EE5c \u0111\xEDch v\xE0 n\u01A1i \u0111\u0103ng; c\xF3 th\u1EC3 c\xF3 \u1EA3nh \u0111\u1EA7u v\xE0o v\xE0 d\u1EEF ki\u1EC7n ch\xEDnh x\xE1c (gi\xE1, ng\xE0y, \u01B0u \u0111\xE3i).\n\nKh\xF4ng d\xF9ng c\xE1ch l\xE0m n\xE0y khi:\n\n- c\u1EA7n video, b\u1ED9 nh\u1EADn di\u1EC7n th\u01B0\u01A1ng hi\u1EC7u \u0111\u1EA7y \u0111\u1EE7 hay thi\u1EBFt k\u1EBF in \u1EA5n k\u1EF9 thu\u1EADt;\n- y\xEAu c\u1EA7u \u0111\xF2i t\u1EA1o \u1EA3nh gi\u1EA3 m\u1EA1o ng\u01B0\u1EDDi th\u1EADt, gi\u1EA5y t\u1EDD hay b\u1EB1ng ch\u1EE9ng.\n\n## \u0110\u1ECBnh ngh\u0129a c\xF4ng vi\u1EC7c\n\n| Th\xE0nh ph\u1EA7n | \u0110\u1ECBnh ngh\u0129a |\n|---|---|\n| Khi b\u1EAFt \u0111\u1EA7u | C\xF3 brief \u1EA3nh, m\u1EE5c \u0111\xEDch v\xE0 n\u01A1i \u0111\u0103ng |\n| Ng\u01B0\u1EDDi ch\u1ECBu tr\xE1ch nhi\u1EC7m | Founder ho\u1EB7c ng\u01B0\u1EDDi ph\u1EE5 tr\xE1ch n\u1ED9i dung |\n| \u0110\u01A1n v\u1ECB c\xF4ng vi\u1EC7c | M\u1ED9t l\u01B0\u1EE3t t\u1EA1o g\u1ED3m s\u1ED1 ph\u01B0\u01A1ng \xE1n task y\xEAu c\u1EA7u, ho\u1EB7c m\u1ED9t l\u01B0\u1EE3t s\u1EEDa |\n| \u0110\u1EA7u ra | C\xE1c ph\u01B0\u01A1ng \xE1n \u1EA3nh m\u1EA1ng x\xE3 h\u1ED9i s\u1EB5n s\xE0ng \u0111\u1EC3 duy\u1EC7t |\n| B\u1EB1ng ch\u1EE9ng ho\xE0n th\xE0nh | M\u1ED7i ph\u01B0\u01A1ng \xE1n \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EF1 ki\u1EC3m theo m\u1EE5c \u0111\xEDch, quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o, l\u1EDBp ch\u1EEF, \u0111\u1ECBnh d\u1EA1ng v\xE0 l\u1ED7i h\xECnh |\n| \u0110i\u1EC3m duy\u1EC7t c\u1EE7a con ng\u01B0\u1EDDi | Founder ch\u1ECDn ph\u01B0\u01A1ng \xE1n ho\u1EB7c y\xEAu c\u1EA7u s\u1EEDa tr\u01B0\u1EDBc khi d\xF9ng |\n| \u0110i\u1EC1u h\u1ECDc \u0111\u01B0\u1EE3c | H\u01B0\u1EDBng thi\u1EBFt k\u1EBF n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn v\xE0 v\xEC sao \u0111\u01B0\u1EE3c \u0111\u1EC1 xu\u1EA5t v\xE0o content learnings |\n\n## Ph\u1EA1m vi\n\n- C\xE1ch l\xE0m n\xE0y lo c\xE1ch thi\u1EBFt k\u1EBF: b\u1ED1 c\u1EE5c, th\u1EE9 b\u1EADc, m\xE0u, \xE1nh s\xE1ng, \u0111\u1EA1o c\u1EE5, gi\u1EEF \u1EA3nh g\u1ED1c v\xE0 t\u1EF1 ki\u1EC3m.\n- Task quy\u1EBFt \u0111\u1ECBnh d\u1EEF ki\u1EC7n ch\xEDnh x\xE1c, l\u1EDBp ch\u1EEF do Studio v\u1EBD, s\u1ED1 ph\u01B0\u01A1ng \xE1n, \u0111\u1ECBnh d\u1EA1ng v\xE0 c\xE1ch l\u01B0u k\u1EBFt qu\u1EA3.\n- Kh\xF4ng \u0111\u0103ng, l\xEAn l\u1ECBch hay g\u1EEDi \u1EA3nh.\n\n## B\u1ED1i c\u1EA3nh c\u1EA7n \u0111\u1ECDc\n\n\u0110\u1ECDc ch\u1ECDn l\u1ECDc m\xE0u th\u01B0\u01A1ng hi\u1EC7u, phong c\xE1ch h\xECnh \u1EA3nh, kh\xE1n gi\u1EA3 v\xE0 \u0111i\u1EC1u c\u1EA7n tr\xE1nh; ch\u1EC9 m\u1EDF v\xE0i t\u1EC7p quan tr\u1ECDng v\xE0 kh\xF4ng b\u1ECBa quy t\u1EAFc th\u01B0\u01A1ng hi\u1EC7u. \u1EA2nh phong c\xE1ch founder l\u01B0u l\xE0 chu\u1EA9n v\u1EC1 b\u1EA3ng m\xE0u, \xE1nh s\xE1ng, b\u1ED1 c\u1EE5c v\xE0 c\xE1ch d\u1EF1ng h\xECnh, kh\xF4ng ph\u1EA3i ch\u1EE7 th\u1EC3 hay ch\u1EEF \u0111\u1EC3 sao ch\xE9p.\n\n- brand colours and visual style\n- audience\n- things to avoid\n- style images\n\n## \u0110\u1EA7u v\xE0o t\u1ED1i thi\u1EC3u\n\n- M\u1EE5c \u0111\xEDch \u1EA3nh, \u0111i\u1EC1u founder \u0111\u01B0\u1EE3c h\u1EE9a v\xE0 n\u01A1i \u0111\u0103ng.\n- \u0110\u1ECBnh d\u1EA1ng v\xE0 t\u1EC9 l\u1EC7 khung.\n- \u1EA2nh \u0111\u1EA7u v\xE0o v\xE0 lo\u1EA1i c\u1EE7a ch\xFAng, n\u1EBFu c\xF3.\n- D\u1EEF ki\u1EC7n ch\xEDnh x\xE1c v\xE0 k\u1EBF ho\u1EA1ch l\u1EDBp ch\u1EEF, n\u1EBFu c\xF3.\n\n## C\xE2u h\u1ECFi \u0111\u1ECBnh h\u01B0\u1EDBng\n\n- Ng\u01B0\u1EDDi xem c\u1EA7n hi\u1EC3u \u0111i\u1EC1u g\xEC trong n\u0103m gi\xE2y \u0111\u1EA7u, \u1EDF k\xEDch th\u01B0\u1EDBc thumbnail \u0111i\u1EC7n tho\u1EA1i?\n- \u0110\xE2u l\xE0 ch\u1EE7 th\u1EC3 ch\xEDnh, v\xE0 \u0111i\u1EC1u g\xEC ph\u1EA3i gi\u1EEF nguy\xEAn tuy\u1EC7t \u0111\u1ED1i t\u1EEB \u1EA3nh g\u1ED1c?\n- \u1EA2nh n\xE0y sang tr\u1ECDng, kh\u1EA9n c\u1EA5p hay \u1EA5m \xE1p nh\u1EDD \u0111\xE2u: \xE1nh s\xE1ng, ch\u1EA5t li\u1EC7u, kho\u1EA3ng tr\u1ED1ng hay m\xE0u?\n\n## Quy tr\xECnh\n\n1. M\u1EDF v\xE0 xem k\u1EF9 t\u1EEBng \u1EA3nh \u0111\u1EA7u v\xE0o; \xE1p d\u1EE5ng quy t\u1EAFc gi\u1EEF \u1EA3nh g\u1ED1c theo lo\u1EA1i (m\u1EE5c 14.1).\n2. \u0110\u1ECDc ghi ch\xFA thi\u1EBFt k\u1EBF c\u1EE7a lo\u1EA1i \u1EA3nh v\xE0 b\u1ED1i c\u1EA3nh th\u01B0\u01A1ng hi\u1EC7u; khi task y\xEAu c\u1EA7u nghi\xEAn c\u1EE9u m\u1EDBi, t\xECm c\xE1c v\xED d\u1EE5 m\u1EA1nh g\u1EA7n \u0111\xE2y cho kh\xE1n gi\u1EA3 Vi\u1EC7t Nam v\xE0 ghi l\u1EA1i \u0111i\u1EC1u l\xE0m ch\xFAng hi\u1EC7u qu\u1EA3 (b\u1ED1 c\u1EE5c, th\u1EE9 b\u1EADc, b\u1EA3ng m\xE0u, \xE1nh s\xE1ng, \u0111\u1EA1o c\u1EE5).\n3. C\xE2n nh\u1EAFc hai \u0111\u1EBFn ba h\u01B0\u1EDBng thi\u1EBFt k\u1EBF (b\u1ED1 c\u1EE5c, b\u1ED1i c\u1EA3nh, c\u1EA3m x\xFAc) v\xE0 ch\u1ECDn h\u01B0\u1EDBng m\u1EA1nh nh\u1EA5t; khi c\u1EA7n nhi\u1EC1u ph\u01B0\u01A1ng \xE1n, m\u1ED7i ph\u01B0\u01A1ng \xE1n l\xE0 m\u1ED9t h\u01B0\u1EDBng kh\xE1c nhau th\u1EADt s\u1EF1.\n4. T\u1EA1o \u1EA3nh theo nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF (m\u1EE5c 14.2) v\xE0 quy t\u1EAFc l\u1EDBp ch\u1EEF (m\u1EE5c 14.3).\n5. T\u1EF1 xem t\u1EEBng \u1EA3nh v\xE0 ki\u1EC3m theo m\u1EE5c 10; t\u1EA1o l\u1EA1i ph\u01B0\u01A1ng \xE1n n\xE0o kh\xF4ng \u0111\u1EA1t tr\u01B0\u1EDBc khi l\u01B0u.\n\n## C\u1EA5u tr\xFAc k\u1EBFt qu\u1EA3\n\nC\xE1c t\u1EC7p \u1EA3nh theo \u0111\u1ECBnh d\u1EA1ng task y\xEAu c\u1EA7u, m\u1ED7i ph\u01B0\u01A1ng \xE1n k\xE8m m\u1ED9t d\xF2ng m\xF4 t\u1EA3 ng\u1EAFn \u0111i\u1EC1u l\xE0m n\xF3 kh\xE1c c\xE1c ph\u01B0\u01A1ng \xE1n c\xF2n l\u1EA1i.\n\n## Ti\xEAu ch\xED ki\u1EC3m tra\n\n- [ ] \u0110\u1EA1t m\u1EE5c \u0111\xEDch v\xE0 \u0111i\u1EC1u founder \u0111\u01B0\u1EE3c h\u1EE9a.\n- [ ] Gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m, \u0111\xFAng khu\xF4n m\u1EB7t, \u0111\xFAng \u1EA3nh ch\u1EE5p m\xE0n h\xECnh theo quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o.\n- [ ] L\u1EDBp ch\u1EEF \u0111\xFAng k\u1EBF ho\u1EA1ch: kh\xF4ng c\xF3 ch\u1EEF l\u1EA1c, v\xF9ng \u0111\u1EC3 ch\u1EEF \u0111\u01B0\u1EE3c gi\u1EEF s\u1EA1ch, ch\u1EEF trong \u1EA3nh (n\u1EBFu c\xF3) \u0111\xFAng ch\xEDnh t\u1EA3 v\xE0 d\u1EA5u ti\u1EBFng Vi\u1EC7t.\n- [ ] \u0110\xFAng \u0111\u1ECBnh d\u1EA1ng v\xE0 t\u1EC9 l\u1EC7 khung.\n- [ ] Kh\xF4ng l\u1ED7i h\xECnh: s\u1EA3n ph\u1EA9m m\xE9o, th\u1EEBa ng\xF3n tay, ch\u1EEF v\u1EE1.\n- [ ] C\xE1c ph\u01B0\u01A1ng \xE1n kh\xE1c nhau th\u1EADt s\u1EF1.\n\n## Gi\u1EDBi h\u1EA1n v\xE0 khi n\xE0o c\u1EA7n h\u1ECFi l\u1EA1i\n\n- Kh\xF4ng b\u1ECBa gi\xE1, \u01B0u \u0111\xE3i, ng\xE0y, claim hay l\u1EDDi ch\u1EE9ng th\u1EF1c ngo\xE0i d\u1EEF ki\u1EC7n founder nh\u1EADp.\n- Kh\xF4ng bi\u1EBFn s\u1EA3n ph\u1EA9m th\xE0nh s\u1EA3n ph\u1EA9m kh\xE1c hay "\u0111\u1EB9p h\u01A1n"; kh\xF4ng l\xE0m \u0111\u1EB9p, l\xE0m m\u1ECBn da, l\xE0m thon ng\u01B0\u1EDDi khi kh\xF4ng \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- Kh\xF4ng th\xEAm d\u1EA5u hi\u1EC7u s\xE0n th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED, logo hay huy hi\u1EC7u kh\xF4ng \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- H\u1ECFi l\u1EA1i khi kh\xF4ng r\xF5 ng\u01B0\u1EDDi n\xE0o trong \u1EA3nh l\xE0 ng\u01B0\u1EDDi c\u1EA7n gi\u1EEF.\n\n## D\u1EA5u hi\u1EC7u l\xE0m t\u1ED1t\n\n- Ph\u01B0\u01A1ng \xE1n \u0111\u01B0\u1EE3c ch\u1ECDn ngay, kh\xF4ng c\u1EA7n s\u1EEDa.\n- S\u1ED1 l\u01B0\u1EE3t s\u1EEDa trung b\xECnh tr\u01B0\u1EDBc khi duy\u1EC7t.\n- H\u01B0\u1EDBng thi\u1EBFt k\u1EBF \u0111\u01B0\u1EE3c ch\u1ECDn l\u1EB7p l\u1EA1i theo lo\u1EA1i \u1EA3nh.\n\n## Ph\u01B0\u01A1ng ph\xE1p chi ti\u1EBFt\n\n### 14.1 Gi\u1EEF \u1EA3nh g\u1ED1c theo lo\u1EA1i \u1EA3nh \u0111\u1EA7u v\xE0o\n\n- **product** \u2014 t\xE1ch s\u1EA3n ph\u1EA9m: b\u1ECF n\u1EC1n g\u1ED1c v\xE0 m\u1ECDi th\u1EE9 \u0111\xE8 l\xEAn \u1EA3nh (ch\u1EEF, sticker, watermark, tem gi\xE1, khung). Gi\u1EEF ch\xEDnh x\xE1c s\u1EA3n ph\u1EA9m: h\xECnh d\xE1ng, t\u1EC9 l\u1EC7, m\xE0u, ch\u1EA5t li\u1EC7u, logo v\xE0 ch\u1EEF in tr\xEAn s\u1EA3n ph\u1EA9m ho\u1EB7c bao b\xEC. Kh\xF4ng bi\u1EBFn n\xF3 th\xE0nh s\u1EA3n ph\u1EA9m kh\xE1c hay "c\u1EA3i ti\u1EBFn".\n- **portrait** \u2014 ng\u01B0\u1EDDi trong \u1EA3nh ph\u1EA3i nh\u1EADn ra \u0111\u01B0\u1EE3c l\xE0 c\xF9ng m\u1ED9t ng\u01B0\u1EDDi. Gi\u1EEF n\xE9t m\u1EB7t v\xE0 khu\xF4n m\u1EB7t, m\xE0u da v\xE0 k\u1EBFt c\u1EA5u da th\u1EADt, tu\u1ED5i, ch\xE2n t\xF3c, r\xE2u, d\u1EA5u ri\xEAng (n\u1ED1t ru\u1ED3i, s\u1EB9o), k\xEDnh (c\xF9ng g\u1ECDng), t\u1EC9 l\u1EC7 c\u01A1 th\u1EC3 v\xE0 m\xE0u t\xF3c. T\u01B0 th\u1EBF, c\u1EED ch\u1EC9, trang ph\u1EE5c, ph\u1EE5 ki\u1EC7n, ki\u1EC3u t\xF3c, b\u1ED1i c\u1EA3nh, \xE1nh s\xE1ng v\xE0 g\xF3c m\xE1y c\xF3 th\u1EC3 \u0111\u1ED5i cho h\u1EE3p lo\u1EA1i \u1EA3nh; bi\u1EC3u c\u1EA3m ch\u1EC9 ch\u1EC9nh nh\u1EB9. Kh\xF4ng l\xE0m m\u1ECBn hay l\xE0m s\xE1ng da, kh\xF4ng l\xE0m thon m\u1EB7t hay ng\u01B0\u1EDDi, kh\xF4ng th\xEAm trang \u0111i\u1EC3m hay trang s\u1EE9c, kh\xF4ng l\xE0m \u0111\u1EB9p tr\u1EEB khi \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u. B\u1ECF n\u1EC1n g\u1ED1c, ng\u01B0\u1EDDi kh\xE1c v\xE0 m\u1ECDi ch\u1EEF. Nhi\u1EC1u \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi: d\xF9ng t\u1EA5t c\u1EA3 \u0111\u1EC3 gi\u1EEF n\xE9t gi\u1ED1ng.\n- **screenshot** \u2014 gi\u1EEF \u1EA3nh ch\u1EE5p m\xE0n h\xECnh y nguy\xEAn, t\u1EEBng ch\u1EEF, t\xEAn, emoji v\xE0 m\u1ED1c gi\u1EDD; ch\u1EC9 \u0111\xF3ng khung v\xE0 tr\xECnh b\xE0y. Kh\xF4ng g\xF5 l\u1EA1i, d\u1ECBch hay l\xE0m m\u1EDD g\xEC tr\u1EEB khi \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- **shop** \u2014 d\xF9ng \u0111\u1ECBa \u0111i\u1EC3m l\xE0m b\u1ED1i c\u1EA3nh th\u1EADt v\xE0 gi\u1EEF c\xE1c \u0111\u1EB7c \u0111i\u1EC3m nh\u1EADn ra \u0111\u01B0\u1EE3c.\n- **any** \u2014 d\xF9ng \u1EA3nh theo brief v\xE0 ghi ch\xFA (m\u1ED9t ch\u1EE7 th\u1EC3 c\u1EA7n c\xF3, m\u1ED9t s\u1EA3n ph\u1EA9m, ho\u1EB7c ch\xEDnh founder).\n- **none** \u2014 kh\xF4ng c\xF3 \u1EA3nh \u0111\u1EA7u v\xE0o.\n\n### 14.2 Nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF cho m\u1ECDi \u1EA3nh\n\n- M\u1ED9t ch\u1EE7 th\u1EC3 ch\xEDnh v\xE0 th\u1EE9 b\u1EADc r\xF5 (\u01B0u \u0111\xE3i, r\u1ED3i s\u1EA3n ph\u1EA9m, r\u1ED3i trang tr\xED), t\u1ED1i \u0111a ba m\xE0u; ph\u1EA3i \u0111\u1ECDc \u0111\u01B0\u1EE3c trong d\u01B0\u1EDBi n\u0103m gi\xE2y \u1EDF k\xEDch th\u01B0\u1EDBc thumbnail \u0111i\u1EC7n tho\u1EA1i.\n- Sang tr\u1ECDng \u0111\u1EBFn t\u1EEB \xE1nh s\xE1ng d\u1ECBu, ch\u1EA5t li\u1EC7u v\xE0 kho\u1EA3ng tr\u1ED1ng; kh\u1EA9n c\u1EA5p \u0111\u1EBFn t\u1EEB m\xE0u v\xE0 \xE1nh s\xE1ng, kh\xF4ng bao gi\u1EDD t\u1EEB vi\u1EC7c ch\u1ED3ng hi\u1EC7u \u1EE9ng. \u1EA2nh trang tr\xED qu\xE1 tay tr\xF4ng r\u1EBB.\n- Hi\u1EC7n s\u1EA3n ph\u1EA9m \u0111\xFAng nh\u01B0 \u1EA3nh ch\u1EE5p v\xE0 th\u1EA5y tr\u1ECDn v\u1EB9n; kh\xF4ng nh\xE2n b\u1EA3n s\u1EA3n ph\u1EA9m, kh\xF4ng th\xEAm d\u1EA5u hi\u1EC7u s\xE0n.\n- Gi\u1EEF v\u0103n h\xF3a Vi\u1EC7t Nam c\u1EE5 th\u1EC3: hoa mai \u1EDF mi\u1EC1n Nam, hoa \u0111\xE0o \u1EDF mi\u1EC1n B\u1EAFc, b\xE1nh ch\u01B0ng v\xE0 b\xE1nh t\xE9t, l\xEC x\xEC, \u0111\xE8n \xF4ng sao, \xE1o d\xE0i. Kh\xF4ng d\xF9ng ch\u1EEF H\xE1n, r\u1ED3ng ki\u1EC3u Trung Qu\u1ED1c hay con th\u1ECF trong m\u01B0\u1EDDi hai con gi\xE1p (Vi\u1EC7t Nam l\xE0 con m\xE8o).\n- N\u1ED5i b\u1EADt kh\u1ECFi m\xE0u cam c\u1EE7a s\xE0n th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED thay v\xEC h\xF2a l\u1EABn v\xE0o \u0111\xF3.\n\n### 14.3 L\u1EDBp ch\u1EEF\n\n- Khi Studio s\u1EBD v\u1EBD ch\u1EEF l\xEAn tr\xEAn \u1EA3nh: kh\xF4ng v\u1EBD ch\u1EEF, s\u1ED1, gi\xE1, logo, huy hi\u1EC7u hay tem gi\xE1 n\xE0o trong \u1EA3nh. Gi\u1EEF v\xF9ng \u0111\u01B0\u1EE3c ch\u1EC9 \u0111\u1ECBnh y\xEAn, \xEDt chi ti\u1EBFt, \u0111\u1EC1u t\xF4ng \u0111\u1EC3 ch\u1EEF \u0111\u1ECDc \u0111\u01B0\u1EE3c ngay, v\xE0 thi\u1EBFt k\u1EBF b\u1EE9c \u1EA3nh quanh kho\u1EA3ng tr\u1ED1ng \u0111\xF3 (t\u01B0\u01A1ng ph\u1EA3n, \xE1nh s\xE1ng, kho\u1EA3ng tr\u1ED1ng). \u1EA2nh v\u1EABn ph\u1EA3i tr\xF4ng ho\xE0n ch\u1EC9nh tr\u01B0\u1EDBc khi th\xEAm ch\u1EEF.\n- Khi kh\xF4ng c\xF3 l\u1EDBp ch\u1EEF: ch\u1EC9 \u0111\u01B0a ch\u1EEF v\xE0o \u1EA3nh khi brief ho\u1EB7c ghi ch\xFA y\xEAu c\u1EA7u, vi\u1EBFt \u0111\xFAng ch\xEDnh x\xE1c v\u1EDBi d\u1EA5u ti\u1EBFng Vi\u1EC7t.\n- Khi c\xF3 ch\u1EEF \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u: gi\u1EEF nguy\xEAn ch\xEDnh t\u1EA3, d\u1EA5u, ng\xE0y, gi\u1EDD, gi\xE1, t\xEAn v\xE0 l\u1EDDi k\xEAu g\u1ECDi h\xE0nh \u0111\u1ED9ng.\n' } } };
export {
  image_studio_package_default as default
};
