import { createRequire as __kgsCreateRequire } from 'node:module'; const require = __kgsCreateRequire(import.meta.url);

// src/mini-apps/sdk/server.ts
function defineMiniApp(module) {
  if (module.schema.id !== module.manifest.id) throw new Error(`Mini-app ${module.manifest.id} registers schema ${module.schema.id}`);
  return module;
}

// src/mini-apps/image-studio/manifest.ts
var manifest = {
  id: "image-studio",
  version: "1.7.0",
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
    version: "1.7.0",
    vi: "Image Studio nay \u0111i theo c\u1EA3 chu k\u1EF3 b\xE1n h\xE0ng: 69 m\u1EABu \u1EA3nh trong 8 nh\xF3m (Thu h\xFAt, T\u1EA1o ni\u1EC1m tin, Ch\u1ED1t \u0111\u01A1n, Ch\u0103m s\xF3c kh\xE1ch, Lan to\u1EA3, D\u1ECBp l\u1EC5, Th\u01B0\u01A1ng hi\u1EC7u & c\u1EEDa h\xE0ng, Ch\xE2n dung), th\xEAm \u1EA3nh s\u1EA3n ph\u1EA9m, \u1EA3nh qu\u1EA3ng c\xE1o, qu\u1EA3ng c\xE1o c\xF3 ng\u01B0\u1EDDi m\u1EABu (b\u1EA1n ho\u1EB7c ng\u01B0\u1EDDi m\u1EABu c\u1EA7m s\u1EA3n ph\u1EA9m, c\xF3 th\u1EC3 l\xE0m theo m\u1ED9t qu\u1EA3ng c\xE1o m\u1EABu), tr\u01B0\u1EDBc \u2013 sau, b\u1EA3ng gi\xE1, b\u1EA3ng size, c\xE1ch \u0111\u1EB7t h\xE0ng, voucher, c\u1EA3m \u01A1n, gi\u1EDBi thi\u1EC7u b\u1EA1n v\xE0 c\xE1c d\u1ECBp 11.11, Black Friday, Noel, Valentine\u2026 M\u1ED7i m\u1EABu ch\u1EC9 h\u1ECFi \u0111i\u1EC1u th\u1EADt c\u1EA7n; ph\u1EA7n l\u1EDBn \xF4 c\xF3 s\u1EB5n l\u1EF1a ch\u1ECDn \u0111\u1EC3 b\u1EA5m, \xF4 \u0111\u1EC3 tr\u1ED1ng th\xEC Kallob t\u1EF1 ch\u1ECDn. Gi\u1EA3m gi\xE1 v\xE0 Flash sale g\u1ED9p l\xE0m m\u1ED9t. Nh\xF3m Ch\xE2n dung ri\xEAng gom m\u1ECDi \u1EA3nh c\u1EE7a ch\xEDnh b\u1EA1n: \u1EA3nh \u0111\u1EA1i di\u1EC7n, \u1EA3nh di\u1EC5n gi\u1EA3 v\xE0 10 ki\u1EC3u \xE1o d\xE0i, sang tr\u1ECDng, studio H\xE0n Qu\u1ED1c, ngo\xE0i tr\u1EDDi, b\xECa t\u1EA1p ch\xED, \u0111en tr\u1EAFng, ho\xE0i c\u1ED5, polaroid, m\xF4 h\xECnh 3D, sinh nh\u1EADt. M\u1ED7i m\u1EABu c\xF3 \u1EA3nh v\xED d\u1EE5 th\u1EADt; b\u1EA5m v\xE0o \u1EA3nh \u0111\u1EC3 xem to, so v\u1EDBi \u1EA3nh g\u1ED1c. M\u1ED7i nh\xF3m c\xF3 \xF4 t\xECm m\u1EABu c\u1EE7a ri\xEAng nh\xF3m \u0111\xF3, c\xF2n Studio t\xECm trong c\u1EA3 69 m\u1EABu (ph\xEDm /, g\xF5 kh\xF4ng d\u1EA5u c\u0169ng \u0111\u01B0\u1EE3c). Ch\u1EEF tr\xEAn \u1EA3nh nay do Codex v\u1EBD th\u1EB3ng v\xE0o \u1EA3nh cho h\xE0i ho\xE0 v\u1EDBi thi\u1EBFt k\u1EBF, kh\xF4ng c\xF2n d\xE1n \u0111\xE8 l\xEAn; m\u1ED7i \u1EA3nh v\u1EBD m\u1ED9t l\u1EA7n cho nhanh, mu\u1ED1n s\u1EEDa th\xEC ghi nh\u1EADn x\xE9t. Studio ch\u1EC9 nh\u1EADn \u0111\xFAng \u1EA3nh Codex v\u1EEBa v\u1EBD cho y\xEAu c\u1EA7u \u0111\xF3, kh\xF4ng bao gi\u1EDD l\u1EA5y nh\u1EA7m m\u1ED9t t\u1EC7p kh\xE1c tr\xEAn m\xE1y. \u1EA2nh \u0111\xE3 duy\u1EC7t v\xE0 link c\u0169 v\u1EABn m\u1EDF \u0111\xFAng. C\u1EA7n Growth Studio 0.43.0.",
    en: "Image Studio now covers the whole sales cycle: 69 recipes in 8 groups (Get noticed, Build trust, Close the sale, Customer care, Word of mouth, Occasions, Brand & shop, Portraits), adding product photos, ads, ads with a model (you or a model holding the product, optionally following a sample ad), before & after, price lists, size charts, how to order, vouchers, thank-yous, referrals and occasions such as 11.11, Black Friday, Christmas and Valentine's. Each recipe asks only what it truly needs; most fields offer ready answers to pick, and Kallob chooses for the ones you leave empty. Price drop and Flash sale are one recipe. A Portraits group gathers every picture of you: headshot, speaker and 10 styles (\xE1o d\xE0i, luxury, Korean studio, outdoors, magazine cover, black and white, retro, polaroid, 3D figure and birthday). Every recipe shows a real example; click a picture to see it large beside its originals. Each group has a search for its own recipes, and Studio searches all 69 (press /, accents optional). Codex now draws the words into the picture so they fit the design, instead of Studio laying them on top; each image is drawn once for speed, and a note asks for changes. Studio takes only the pictures Codex drew for that request, never another file from the computer. Approved images and old links still open in the right place. Needs Growth Studio 0.43.0."
  },
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
import os from "node:os";
import path2 from "node:path";
import { randomUUID } from "node:crypto";

// src/mini-apps/image-studio/contract.ts
var recipeGroups = ["attract", "trust", "close", "care", "spread", "season", "brand", "portrait"];

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
function listCell(raw) {
  const cell = raw.trim();
  return /^\d{1,3}([.,]?\d{3})+$|^\d{4,}$/.test(cell) ? formatPrice(cell) : cell;
}
function listRows(raw) {
  return raw.split("\n").map((line2) => line2.trim()).filter(Boolean).slice(0, 10).map((line2) => line2.split("|").map(listCell));
}
function overlayWords(overlay, fields, values) {
  const fill = (template) => template ? fillLine(template, fields, values) : null;
  const price = (key) => {
    const raw = key ? values[key]?.trim() ?? "" : "";
    return raw ? formatPrice(raw) : null;
  };
  const itemsKey = /^\{\{([A-Za-z][A-Za-z0-9]*)\}\}$/.exec(overlay.items?.trim() ?? "")?.[1];
  const left = fill(overlay.left);
  const right = fill(overlay.right);
  return {
    title: fill(overlay.title),
    oldPrice: price(overlay.oldPrice),
    newPrice: price(overlay.newPrice),
    discount: overlay.oldPrice && overlay.newPrice ? discountPercent(values[overlay.oldPrice] ?? "", values[overlay.newPrice] ?? "") : null,
    quote: fill(overlay.quote),
    lines: (overlay.lines ?? []).map((line2) => fillLine(line2, fields, values)).filter((line2) => Boolean(line2)),
    rows: overlay.layout === "list" && itemsKey ? listRows(values[itemsKey] ?? "") : [],
    labels: overlay.layout === "split" && left && right ? [left, right] : null
  };
}
function hasWords(words) {
  return Boolean(words.title || words.oldPrice || words.newPrice || words.quote || words.lines.length || words.rows.length || words.labels);
}
function printedFields(overlay) {
  const templates = [overlay.title, overlay.quote, overlay.items, overlay.left, overlay.right, ...overlay.lines ?? []].filter((template) => Boolean(template));
  return /* @__PURE__ */ new Set([...templates.flatMap((template) => [...template.matchAll(/\{\{([A-Za-z][A-Za-z0-9]*)\}\}/g)].map((match) => match[1])), ...[overlay.oldPrice, overlay.newPrice].filter((key) => Boolean(key))]);
}
function overlayWordList(words) {
  return [
    ...words.labels ? [`${words.labels[0]} (left half label)`, `${words.labels[1]} (right half label)`] : [],
    words.title,
    words.quote,
    words.oldPrice ? `${words.oldPrice} (struck through)` : null,
    words.newPrice,
    words.discount !== null ? `-${words.discount}% (badge)` : null,
    ...words.rows.map((row) => row.join(" | ")),
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
    const layout = ["price", "banner", "quote", "list", "split", "none"].includes(String(overlay.layout)) ? overlay.layout : "none";
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
        default: String(field.default ?? ""),
        options: Array.isArray(field.options) ? field.options.map(bilingual).filter((option) => option.vi).slice(0, 8) : []
      })),
      overlay: { layout, zone, title: text("title"), oldPrice: text("oldPrice"), newPrice: text("newPrice"), quote: text("quote"), lines: Array.isArray(overlay.lines) ? overlay.lines.map(String) : void 0, items: text("items"), left: text("left"), right: text("right") },
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
var layoutZoneText = {
  list: {
    center: "a calm central panel area (about 80% of the width and up to 70% of the height)",
    bottom: "the lower 55% of the frame",
    top: "the upper 55% of the frame"
  },
  split: {
    bottom: "the top corner of each half and the lower 25% of the frame",
    top: "the top corner of each half and the upper 25% of the frame",
    center: "the top corner of each half and a band across the middle"
  }
};
function textPlan(recipe, values, brandName) {
  const words = recipe && recipe.overlay.layout !== "none" ? overlayWords(recipe.overlay, recipe.fields, values) : null;
  if (!recipe || !words || !hasWords(words)) return { overlayWords: "", overlayZone: "", discountBadge: false, shopName: "", shopNameJson: "" };
  return {
    overlayWords: overlayWordList(words).map((word) => JSON.stringify(word)).join(", "),
    overlayZone: layoutZoneText[recipe.overlay.layout]?.[recipe.overlay.zone] ?? zoneText[recipe.overlay.zone],
    discountBadge: recipe.overlay.layout === "price" && Boolean(recipe.overlay.oldPrice),
    shopName: brandName,
    shopNameJson: brandName
  };
}
function dataList(recipe, values) {
  if (!recipe) return "none";
  const lines = recipe.fields.filter((field) => values[field.key]?.trim()).map((field) => `- ${field.label.en}: ${displayValue(field, values[field.key]).replace(/\n+/g, " / ")}`);
  return lines.length ? lines.join("\n") : "none";
}
function openChoices(recipe, values) {
  if (!recipe) return "none";
  const printed = printedFields(recipe.overlay);
  const open = recipe.fields.filter((field) => !field.required && !printed.has(field.key) && !values[field.key]?.trim());
  return open.length ? open.map((field) => field.options?.length ? `${field.label.en} (for example ${field.options.map((option) => option.en).join(", ")})` : field.label.en).join("; ") : "none";
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
  constructor(store, codex, codexDesktop, prompts, projectRoot, attention = silentAttention, codexHome = process.env.CODEX_HOME || path2.join(os.homedir(), ".codex")) {
    this.store = store;
    this.codex = codex;
    this.codexDesktop = codexDesktop;
    this.prompts = prompts;
    this.projectRoot = projectRoot;
    this.attention = attention;
    this.codexHome = codexHome;
  }
  store;
  codex;
  codexDesktop;
  prompts;
  projectRoot;
  attention;
  codexHome;
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
        // Codex draws the recipe's words into the picture itself (since 1.6.0); older requests have Studio draw them on top.
        ...snapshot ? { imageRecipe: snapshot, imageValues: values, imageWordsInPicture: true } : {},
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
        openChoices: openChoices(recipe, values),
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
    const madeIn = task.codexThreadId ? path2.join(this.codexHome, "generated_images", task.codexThreadId) : null;
    const madeInReal = madeIn ? await fs.realpath(madeIn).catch(() => madeIn) : null;
    const files = await Promise.all(images.map(async (image) => {
      const file = String(image?.path ?? "").trim();
      if (!path2.isAbsolute(file)) throw new Error("Each image needs the absolute path of the generated file");
      const stat = await fs.stat(file).catch(() => null);
      if (!stat?.isFile()) throw new Error(`No image file at ${file}`);
      const real = await fs.realpath(file);
      const inside = madeInReal ? path2.relative(madeInReal, real) : "..";
      if (inside.startsWith("..") || path2.isAbsolute(inside)) {
        throw new Error(`${file} was not made by your image tool in this conversation. Pass the file it saved in ${madeIn ?? "its generated_images folder"}; never search the disk or hand in a file you did not generate here`);
      }
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
var image_studio_package_default = { ...server_default, content: { "prompts": { "image-change": "The founder asked for a change in Image Studio.\n\nStarting image: {{baseImagePathJson}}\nChange: {{note}}\nWords in the image: {{#overlayZone}}the image carries exactly these words, drawn by you as part of the design: {{overlayWords}}{{#shopName}}{{#overlayWords}}, and {{/overlayWords}}the shop name {{shopNameJson}}, small{{/shopName}}. Spell them exactly, with every Vietnamese diacritic, and never let them cover a face or the product.{{/overlayZone}}{{^overlayZone}}none{{/overlayZone}}\n\nMake {{optionCount}} new version(s) that keep what works in the starting image and apply this change (edit the starting image when your image tool supports it, otherwise generate from it as a reference). The founder's words win over every earlier rule; everything they did not ask to change stays as it was, including the same product and the same face. Keep the words above unless the change asks otherwise, and add no other text. Generate each version ONCE (no review, edit or regenerate afterwards), save them with `image_asset_save` (task_id {{taskIdJson}}) exactly as before, passing only the files your image tool saved in this conversation (never a file found elsewhere on the disk), and end your turn.\n", "image-create": 'Create images for a solo founder in Kallob Growth Studio\'s Image Studio.\n\n{{> social-image-design}}\n\nWHAT TO MAKE\nRecipe: {{recipeName}}\nPurpose: {{outputPurpose}}\nWhat the founder was promised: {{outputDeliverable}}\nWhere it will be posted: {{outputChannels}}\nFree brief from the founder: {{brief}}\nFormat: {{sizeLabel}}, aspect ratio {{aspectRatio}}. The founder chose this format: it wins over any shape named in the promise above.\n\nTHE FOUNDER\'S NOTE (highest priority): {{note}}\n\nPRIORITY when instructions conflict: the founder\'s note, then the exact data, then the input photo rules, then the design notes, then your own defaults. When the note asks to keep something (the original background, the pose, the outfit, the text printed on the packaging, a colour), keep it even where a rule below says otherwise.\n\n1. PREPARE THE INPUT PHOTOS (input kind: {{inputKind}})\nPhotos the founder attached; open and study each one before generating ("none" means there are none):\n{{inputList}}\nKeep each photo the way the how-to\'s input-photo rules (14.1) say for this input kind. If a photo shows several people and it is unclear who is meant, ask with growth_task_ask.\n\n2. LEARN HOW THIS KIND OF IMAGE IS DESIGNED\nFollow the how-to\'s design principles (14.2) for every image.\nKallob\'s design notes for this recipe:\n{{designNotes}}\nFresh research: {{freshResearch}}. If yes, before designing look up current strong examples of this kind of image for a Vietnamese audience with web search, note what makes them work (composition, hierarchy, palette, light, props) and design from that. If no, do not browse: rely on the design notes and your own expertise.\nBrand: look selectively in the Business Context (named in the Growth Studio channel below) for brand colours, visual style, audience and anything to avoid; open only the few files that matter and never invent brand rules.\nStyle images the founder keeps for their brand (match their palette, lighting, composition and rendering; never copy their subject or text; "none" means there are none):\n{{styleList}}\n\n3. EXACT DATA AND THE WORDS IN THE IMAGE\nData the founder entered (exact; never invent other prices, offers, dates, claims or testimonials):\n{{dataList}}\nLeft for you to decide (the founder skipped these optional choices: pick what suits this purpose, product and audience best, and say in each caption what you chose; never print them as text): {{openChoices}}\nWords to draw in the image: {{#overlayZone}}you draw these exact words yourself, as part of the design: {{overlayWords}}{{#shopName}}{{#overlayWords}}, and {{/overlayWords}}the shop name {{shopNameJson}}, small{{/shopName}}. Set them mainly in {{overlayZone}}{{#discountBadge}}, with the discount as a round badge in a top corner{{/discountBadge}}; they never cover a face, the product or the founder\'s screenshot.{{/overlayZone}}{{^overlayZone}}none{{/overlayZone}}\n- Apply the how-to\'s text rules (14.3) to these words. Spell every word exactly as given, with every Vietnamese diacritic; never add other words, prices, dates, claims, logos or marketplace marks. Notes in brackets (struck through, badge, left half label) say how a word is shown, they are not words to draw.\n- Make the typography part of the design: a clear hierarchy, a size that reads on a phone feed, strong contrast with what is behind it, colours from the brand, and a layout that fits the subject instead of sitting on top of it. Where the design notes keep an area calm or clear "for the words", that is where you set these words; their "no text" means no other text.\n- When this says "none", text appears only if the brief or note asks for it.\n\n4. MAKE THE BEST\nGenerate exactly {{optionCount}} image(s) with your built-in image generation (no other API or key), each a genuinely different direction. Generate each image ONCE: apply the how-to\'s quality checks while you design and write the generation request, but do not open, review, edit or regenerate an image after it is made. Save what you made straight away; the founder asks for any change in Studio.\n\n5. SAVE\nSave the options to Studio: call the `image_asset_save` tool of the `kallob-growth` MCP server once, with task_id {{taskIdJson}} and every option as {"path": absolute path of the generated file, "caption": one short Vietnamese line on what makes this option different}. Pass the exact files your image tool saved in this conversation (it keeps them in `generated_images/<this conversation>/` under the Codex home, e.g. `~/.codex/generated_images/`); never search the disk for recent images and never pass a file you did not generate here: Studio refuses any other file. Do not copy the files anywhere yourself. This task has no result file: `image_asset_save` is its only return channel.\nThen end your turn. In Studio the founder approves an option or asks for a change; a change request arrives as the next message here.\nAsk with `growth_task_ask` only when you cannot make even a first option; otherwise make sensible choices and let the options do the asking.\n', "image-recipe-about-shop": `{
  "key": "about-shop",
  "group": "brand",
  "name": {
    "vi": "Gi\u1EDBi thi\u1EC7u c\u1EEDa h\xE0ng",
    "en": "About the shop"
  },
  "icon": "info",
  "size": "square",
  "input": {
    "kind": "any",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh c\u1EEDa h\xE0ng ho\u1EB7c ch\u1EE7 shop",
      "en": "Shop or founder photo"
    },
    "hint": {
      "vi": "\u1EA2nh th\u1EADt b\u1EA1n \u0111ang l\xE0m vi\u1EC7c ho\u1EB7c g\xF3c c\u1EEDa h\xE0ng gi\xFAp kh\xE1ch tin h\u01A1n.",
      "en": "A real photo of you at work or of the shop makes customers trust you more."
    }
  },
  "output": {
    "purpose": {
      "vi": "\u1EA2nh ghim \u0111\u1EA7u trang \u0111\u1EC3 kh\xE1ch m\u1EDBi hi\u1EC3u nhanh shop l\xE0 ai v\xE0 cam k\u1EBFt \u0111i\u1EC1u g\xEC.",
      "en": "A pinned image so new customers quickly see who you are and what you promise."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng \u1EA5m \xE1p: con ng\u01B0\u1EDDi ho\u1EB7c kh\xF4ng gian th\u1EADt c\u1EE7a shop, ch\u1EEF V\u1EC0 CH\xDANG T\xD4I, t\xEAn shop v\xE0 m\u1ED9t l\u1EDDi h\u1EE9a ng\u1EAFn.",
      "en": "A warm square image: the real people or place behind the shop, ABOUT US, the shop name and a short promise."
    },
    "channels": {
      "vi": "B\xE0i ghim Facebook, Zalo OA, m\u1EE5c gi\u1EDBi thi\u1EC7u Shopee, trang gi\u1EDBi thi\u1EC7u website.",
      "en": "Pinned Facebook posts, Zalo OA, Shopee shop info, website about pages."
    }
  },
  "fields": [
    {
      "key": "promise",
      "type": "text",
      "label": {
        "vi": "L\u1EDDi h\u1EE9a c\u1EE7a shop",
        "en": "Your promise"
      },
      "placeholder": {
        "vi": "VD: H\xE0ng th\u1EADt, gi\xE1 th\u1EADt, ph\u1EE5c v\u1EE5 t\u1EADn t\xE2m",
        "en": "E.g. Real goods, honest prices, caring service"
      },
      "required": false,
      "options": [
        {
          "vi": "H\xE0ng th\u1EADt, gi\xE1 th\u1EADt, ph\u1EE5c v\u1EE5 t\u1EADn t\xE2m",
          "en": "Real goods, honest prices, caring service"
        },
        {
          "vi": "L\xE0m th\u1EE7 c\xF4ng t\u1EEBng s\u1EA3n ph\u1EA9m",
          "en": "Every piece made by hand"
        },
        {
          "vi": "Nguy\xEAn li\u1EC7u s\u1EA1ch, r\xF5 ngu\u1ED3n g\u1ED1c",
          "en": "Clean ingredients, known origins"
        },
        {
          "vi": "\u0110\u1ED5i tr\u1EA3 trong 7 ng\xE0y n\u1EBFu kh\xF4ng h\xE0i l\xF2ng",
          "en": "Returns within 7 days if you are not happy"
        },
        {
          "vi": "\u0110\u1ED3ng h\xE0nh c\xF9ng b\u1EA1n t\u1EEB n\u0103m 2018",
          "en": "With you since 2018"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "V\u1EC0 CH\xDANG T\xD4I",
    "lines": [
      "{{promise}}"
    ]
  },
  "designNotes": "Warm, human and honest: the face of a small business, not an ad. If a founder photo is given, keep the person exactly and show them at work in their real setting (behind the counter, packing orders, at the workbench), natural and smiling, in the upper 60%. If a shop photo is given, keep the real place recognisable, tidied and in soft daylight. With no photo, show a believable, lived-in corner of a shop from the founder's niche, with hands at work and no faces. Keep the lower 35% calm and even (a soft wall, a table surface or a gentle gradient) for the words. Natural light, warm tones, one brand colour accent. No invented signage, certificates, awards, numbers, logos or text.",
  "fixes": [
    {
      "vi": "\u1EA4m \xE1p, g\u1EA7n g\u0169i h\u01A1n",
      "en": "Warmer, more personal"
    },
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    },
    {
      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",
      "en": "A different setting"
    }
  ],
  "order": 704
}
`, "image-recipe-ad": '{\n  "key": "ad",\n  "group": "attract",\n  "name": {\n    "vi": "\u1EA2nh qu\u1EA3ng c\xE1o",\n    "en": "Ad image"\n  },\n  "icon": "megaphone",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n, ch\u1EEF hay sticker c\u0169 s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i.",\n      "en": "The whole product, well lit. Its old background, text and stickers are removed."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "L\xE0m ng\u01B0\u1EDDi l\u1EA1 \u0111ang l\u01B0\u1EDBt d\u1EEBng l\u1EA1i nh\xECn s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n v\xE0 nh\u1EAFn h\u1ECFi.",\n      "en": "Make people scrolling past stop on your product and message you."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n n\u1ED5i b\u1EADt trong b\u1ED1i c\u1EA3nh h\u1EE3p, l\u1EE3i \xEDch ch\xEDnh v\xE0 l\u1EDDi k\xEAu g\u1ECDi b\xEAn d\u01B0\u1EDBi.",\n      "en": "A square image: your product standing out in a fitting setting, the main benefit and a call to action below."\n    },\n    "channels": {\n      "vi": "Qu\u1EA3ng c\xE1o Facebook, b\xE0i Facebook, Zalo, TikTok, Shopee.",\n      "en": "Facebook ads and posts, Zalo, TikTok, Shopee."\n    }\n  },\n  "fields": [\n    {\n      "key": "benefit",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EE3i \xEDch ch\xEDnh",\n        "en": "Main benefit"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EEF l\u1EA1nh 24 gi\u1EDD",\n        "en": "E.g. Keeps drinks cold for 24 hours"\n      }\n    },\n    {\n      "key": "cta",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi k\xEAu g\u1ECDi",\n        "en": "Call to action"\n      },\n      "placeholder": {\n        "vi": "VD: Nh\u1EAFn tin \u0111\u1EC3 \u0111\u1EB7t h\xE0ng",\n        "en": "E.g. Message us to order"\n      },\n      "options": [\n        {\n          "vi": "Nh\u1EAFn tin \u0111\u1EC3 \u0111\u1EB7t h\xE0ng",\n          "en": "Message us to order"\n        },\n        {\n          "vi": "Mua ngay h\xF4m nay",\n          "en": "Buy today"\n        },\n        {\n          "vi": "Inbox \u0111\u1EC3 \u0111\u01B0\u1EE3c t\u01B0 v\u1EA5n",\n          "en": "Message us for advice"\n        },\n        {\n          "vi": "\u0110\u1EB7t h\xE0ng qua Zalo",\n          "en": "Order on Zalo"\n        },\n        {\n          "vi": "S\u1ED1 l\u01B0\u1EE3ng c\xF3 h\u1EA1n",\n          "en": "Limited stock"\n        },\n        {\n          "vi": "B\u1EA5m xem chi ti\u1EBFt",\n          "en": "Tap for details"\n        }\n      ],\n      "default": "Nh\u1EAFn tin \u0111\u1EC3 \u0111\u1EB7t h\xE0ng"\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "{{benefit}}",\n    "lines": [\n      "{{cta}}"\n    ]\n  },\n  "designNotes": "A scroll-stopping ad that still looks honest. One hero product, exactly as photographed (shape, colour, label, proportions), large and slightly off-centre in the upper 60\u201365% of the frame, in a simple lifestyle or studio setting that shows who uses it and why. If a main benefit is given, let the setting hint at it (condensation and ice for cold, morning light on skin for skincare); if empty, pick the setting the product most obviously suggests. Keep the lower 35% calm and low-detail for the benefit and call to action. Bright, clean light with a crisp contact shadow; one bold accent from the brand colour plus a neutral, at most three colours. In story or landscape format keep the product dominant and the word zone clear. No text, prices, badges, logos, extra products, endorsing people or invented claims.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "B\u1EAFt m\u1EAFt, n\u1ED5i b\u1EADt h\u01A1n",\n      "en": "More eye-catching"\n    },\n    {\n      "vi": "B\u1ED1i c\u1EA3nh \u0111\u1EDDi th\u01B0\u1EDDng h\u01A1n",\n      "en": "A more everyday setting"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 101\n}\n', "image-recipe-ao-dai": `{
  "key": "ao-dai",
  "group": "portrait",
  "name": {
    "vi": "Ch\xE2n dung \xE1o d\xE0i",
    "en": "\xC1o d\xE0i portrait"
  },
  "icon": "flower",
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
      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",
      "en": "Clear face, good light. Two or three photos of the same person look more like you."
    }
  },
  "output": {
    "purpose": {
      "vi": "\u1EA2nh \xE1o d\xE0i \u0111\u1EB9p, chu\u1EA9n Vi\u1EC7t c\u1EE7a ch\xEDnh b\u1EA1n cho \u1EA3nh \u0111\u1EA1i di\u1EC7n, d\u1ECBp T\u1EBFt, 20/10, k\u1EF7 ni\u1EC7m.",
      "en": "A beautiful, truly Vietnamese \xE1o d\xE0i portrait of you for your profile, T\u1EBFt, Women's Day or a milestone."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n m\u1EB7c \xE1o d\xE0i l\u1EE5a trong b\u1ED1i c\u1EA3nh Vi\u1EC7t, gi\u1EEF nguy\xEAn g\u01B0\u01A1ng m\u1EB7t.",
      "en": "A portrait 4:5 image: you in a silk \xE1o d\xE0i in a Vietnamese setting, your face unchanged."
    },
    "channels": {
      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",
      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."
    }
  },
  "fields": [
    {
      "key": "setting",
      "type": "text",
      "label": {
        "vi": "B\u1ED1i c\u1EA3nh",
        "en": "Setting"
      },
      "placeholder": {
        "vi": "VD: Ph\u1ED1 c\u1ED5 H\u1ED9i An",
        "en": "E.g. H\u1ED9i An old town"
      },
      "required": false,
      "options": [
        {
          "vi": "Ph\u1ED1 c\u1ED5 H\u1ED9i An",
          "en": "H\u1ED9i An old town"
        },
        {
          "vi": "\u0110\u1EA1i N\u1ED9i Hu\u1EBF",
          "en": "Hu\u1EBF Imperial City"
        },
        {
          "vi": "H\u1ED3 sen",
          "en": "Lotus pond"
        },
        {
          "vi": "Ph\u1ED1 c\u1ED5 H\xE0 N\u1ED9i",
          "en": "H\xE0 N\u1ED9i old quarter"
        },
        {
          "vi": "Studio n\u1EC1n tr\u01A1n",
          "en": "Plain studio backdrop"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. A well-fitted silk \xE1o d\xE0i with natural drape, high collar and side slits over silk trousers; white, pastel or a jewel tone that separates from the background. One setting: H\u1ED9i An yellow walls with silk lanterns, Hu\u1EBF at golden hour, a lotus pond, the H\xE0 N\u1ED9i old quarter, or a seamless studio backdrop. Soft morning or golden-hour light with gentle backlight, shallow depth of field, a natural graceful pose (a hand on the collar, holding a n\xF3n l\xE1 or a lotus). Never a Chinese qipao cut, a kimono, hanzi signage or invented text.",
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
  "order": 801
}
`, "image-recipe-ask-review": '{\n  "key": "ask-review",\n  "group": "care",\n  "name": {\n    "vi": "Xin \u0111\xE1nh gi\xE1",\n    "en": "Ask for a review"\n  },\n  "icon": "star",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh m\xF3n kh\xE1ch \u0111\xE3 mua \u0111\u1EC3 h\u1ECD nh\u1EDB ngay \u0111\u01A1n n\xE0o; kh\xF4ng c\xF3 c\u0169ng \u0111\u01B0\u1EE3c.",\n      "en": "Add the item they bought so they know which order it is; optional."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Nh\u1EDD kh\xE1ch \u0111\u1EC3 l\u1EA1i \u0111\xE1nh gi\xE1, c\xF3 th\xEAm l\u1EDDi khen th\u1EADt cho ng\u01B0\u1EDDi mua sau.",\n      "en": "Ask buyers for a review, so the next buyer sees real praise."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng th\xE2n thi\u1EC7n: l\u1EDDi nh\u1EDD \u0111\xE1nh gi\xE1 v\xE0 qu\xE0 c\u1EA3m \u01A1n n\u1EBFu c\xF3.",\n      "en": "A friendly square image: your review request and a thank-you reward if you add one."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, in k\xE8m \u0111\u01A1n h\xE0ng, chat Shopee.",\n      "en": "Zalo and Messenger chats, printed into the parcel, Shopee chat."\n    }\n  },\n  "fields": [\n    {\n      "key": "ask",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi nh\u1EDD",\n        "en": "Request"\n      },\n      "placeholder": {\n        "vi": "VD: B\u1EA1n \u01B0ng th\xEC cho shop xin 5 sao nh\xE9!",\n        "en": "E.g. Happy with it? Leave us 5 stars!"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "B\u1EA1n \u01B0ng th\xEC cho shop xin 5 sao nh\xE9!",\n          "en": "Happy with it? Leave us 5 stars!"\n        },\n        {\n          "vi": "\u0110\u1EC3 l\u1EA1i v\xE0i d\xF2ng c\u1EA3m nh\u1EADn gi\xFAp shop nha",\n          "en": "Tell us what you think in a few words"\n        },\n        {\n          "vi": "Ch\u1EE5p \u1EA3nh \u0111\xE1nh gi\xE1 gi\xFAp shop nh\xE9",\n          "en": "Share a photo review with us"\n        },\n        {\n          "vi": "M\u1ED9t \u0111\xE1nh gi\xE1 nh\u1ECF, shop vui c\u1EA3 tu\u1EA7n",\n          "en": "One small review makes our week"\n        }\n      ],\n      "default": "B\u1EA1n \u01B0ng th\xEC cho shop xin 5 sao nh\xE9!"\n    },\n    {\n      "key": "reward",\n      "type": "text",\n      "label": {\n        "vi": "Qu\xE0 c\u1EA3m \u01A1n",\n        "en": "Thank-you reward"\n      },\n      "placeholder": {\n        "vi": "VD: T\u1EB7ng m\xE3 gi\u1EA3m 10% khi \u0111\xE1nh gi\xE1 k\xE8m \u1EA3nh",\n        "en": "E.g. 10% off code for a photo review"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "T\u1EB7ng m\xE3 gi\u1EA3m 10% khi \u0111\xE1nh gi\xE1 k\xE8m \u1EA3nh",\n          "en": "10% off code for a photo review"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n sau khi b\u1EA1n \u0111\xE1nh gi\xE1",\n          "en": "Free shipping next time after your review"\n        },\n        {\n          "vi": "Ho\xE0n 10.000\u0111 khi \u0111\xE1nh gi\xE1 k\xE8m \u1EA3nh",\n          "en": "10,000\u0111 back for a photo review"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 nh\u1ECF \u1EDF \u0111\u01A1n sau",\n          "en": "A small gift with your next order"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "{{ask}}",\n    "lines": [\n      "{{reward}}"\n    ]\n  },\n  "designNotes": "Friendly and light, a small favour asked with a smile. If a product photo is given, keep the product exactly as it is in the upper 60%, slightly off-centre, on a soft surface. Add a gentle row or arc of five simple star shapes in a warm gold near the product, plus one or two small hearts; with no photo, let the stars and a cosy flat-lay (a phone face down, a parcel, a cup) carry the image. Keep the lower 35% calm and even for the words. Soft daylight, a palette from the brand colour with warm gold; at most three colours. No text, numbers, ratings, screenshots, fake reviews, faces, logos or app interfaces.",\n  "fixes": [\n    {\n      "vi": "\u1EA4m \xE1p, g\u1EA7n g\u0169i h\u01A1n",\n      "en": "Warmer and friendlier"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    }\n  ],\n  "order": 402\n}\n', "image-recipe-at-work": `{
  "key": "at-work",
  "group": "trust",
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
        "vi": "VD: l\xE0m b\xE1nh \u1EDF ti\u1EC7m nh\u1ECF",
        "en": "E.g. baking in a small shop"
      },
      "required": false,
      "options": [
        {
          "vi": "L\xE0m b\xE1nh",
          "en": "Baking"
        },
        {
          "vi": "Pha ch\u1EBF \u0111\u1ED3 u\u1ED1ng",
          "en": "Making drinks"
        },
        {
          "vi": "N\u1EA5u \u0103n",
          "en": "Cooking"
        },
        {
          "vi": "May \u0111\u1ED3",
          "en": "Tailoring"
        },
        {
          "vi": "L\xE0m nail, l\xE0m t\xF3c",
          "en": "Nails and hair"
        },
        {
          "vi": "L\xE0m \u0111\u1ED3 th\u1EE7 c\xF4ng",
          "en": "Handmade crafts"
        },
        {
          "vi": "\u0110\xF3ng g\xF3i \u0111\u01A1n h\xE0ng",
          "en": "Packing orders"
        },
        {
          "vi": "D\u1EA1y h\u1ECDc online",
          "en": "Teaching online"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "An environmental portrait, not a studio headshot: waist-up, the person mid-task with the real tools of their trade (dough and an oven, a sewing machine and fabric, a laptop and headset), glancing up at the camera or absorbed in the work. If no trade is given, take it from the shop's Brand Profile and products; never guess something unrelated. A believable small Vietnamese workplace (a shop counter, a home studio, a tidy desk), sized to the business: a solo founder's space, never a glossy corporate office. Soft window light from one side, shallow depth of field, warm natural colour, the tools sharp near the hands. Hands simple and correct; laptops and tools undistorted. Casual-smart clothes that suit the trade (an apron, a linen shirt). No stock-photo smiles at nobody, staged handshakes, extra people or text on screens and signs.",
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
  "order": 201
}
`, "image-recipe-before-after": `{
  "key": "before-after",
  "group": "trust",
  "name": {
    "vi": "Tr\u01B0\u1EDBc \u2013 sau",
    "en": "Before & after"
  },
  "icon": "before-after",
  "size": "square",
  "input": {
    "kind": "any",
    "required": true,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh tr\u01B0\u1EDBc v\xE0 \u1EA3nh sau",
      "en": "Before and after photos"
    },
    "hint": {
      "vi": "\u1EA2nh 1 l\xE0 tr\u01B0\u1EDBc, \u1EA3nh 2 l\xE0 sau. Ch\u1EE5p c\xF9ng g\xF3c, c\xF9ng \xE1nh s\xE1ng th\xEC c\xE0ng thuy\u1EBFt ph\u1EE5c.",
      "en": "Photo 1 is before, photo 2 is after. Same angle and light makes it most convincing."
    }
  },
  "output": {
    "purpose": {
      "vi": "Cho kh\xE1ch th\u1EA5y k\u1EBFt qu\u1EA3 th\u1EADt b\u1EA1n l\xE0m \u0111\u01B0\u1EE3c, \u0111\u1EC3 h\u1ECD tin v\xE0 \u0111\u1EB7t l\u1ECBch hay mua.",
      "en": "Show the real result you deliver so people trust you and book or buy."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng: \u1EA3nh tr\u01B0\u1EDBc b\xEAn tr\xE1i, \u1EA3nh sau b\xEAn ph\u1EA3i, nh\xE3n TR\u01AF\u1EDAC \u2013 SAU v\xE0 th\u1EDDi gian \u0111\u1EA1t k\u1EBFt qu\u1EA3.",
      "en": "A square image: before on the left, after on the right, BEFORE and AFTER labels and how long it took."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story, g\u1EEDi kh\xE1ch \u0111ang h\u1ECFi.",
      "en": "Facebook and Zalo posts, stories, replies to people asking."
    }
  },
  "fields": [
    {
      "key": "time",
      "type": "text",
      "label": {
        "vi": "Sau bao l\xE2u",
        "en": "How long it took"
      },
      "placeholder": {
        "vi": "VD: Sau 2 tu\u1EA7n",
        "en": "E.g. After 2 weeks"
      },
      "required": false,
      "options": [
        {
          "vi": "Sau 1 bu\u1ED5i",
          "en": "After 1 session"
        },
        {
          "vi": "Sau 1 tu\u1EA7n",
          "en": "After 1 week"
        },
        {
          "vi": "Sau 2 tu\u1EA7n",
          "en": "After 2 weeks"
        },
        {
          "vi": "Sau 1 th\xE1ng",
          "en": "After 1 month"
        },
        {
          "vi": "Sau 3 th\xE1ng",
          "en": "After 3 months"
        },
        {
          "vi": "Sau 1 li\u1EC7u tr\xECnh",
          "en": "After 1 course"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "split",
    "zone": "bottom",
    "left": "TR\u01AF\u1EDAC",
    "right": "SAU",
    "title": "{{time}}"
  },
  "designNotes": "Compose two halves side by side, photo 1 left and photo 2 right, same framing, scale and alignment so the eye compares one thing, with a thin clean divider between them. The photos are the proof: never retouch, brighten, smooth, reshape or recolour the subject in either half, and never make the before look worse; the difference must be exactly what the founder's photos show. You may only crop evenly, straighten, and quietly tidy or unify the surroundings outside the subject. Keep the top corners of each half and the bottom 25% calm for the labels and the time line. A soft neutral or brand-tinted frame, at most three colours. No arrows, stickers, text, numbers or invented results.",
  "fixes": [
    {
      "vi": "Hai \u1EA3nh c\xE2n v\xE0 th\u1EB3ng h\xE0ng h\u01A1n",
      "en": "Better matched, aligned halves"
    },
    {
      "vi": "N\u1EC1n g\u1ECDn, s\u1EA1ch h\u01A1n",
      "en": "Tidier, cleaner surroundings"
    },
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 202
}
`, "image-recipe-behind-scenes": `{
  "key": "behind-scenes",
  "group": "trust",
  "name": {
    "vi": "H\u1EADu tr\u01B0\u1EDDng / \u0110\xF3ng \u0111\u01A1n",
    "en": "Behind the scenes"
  },
  "icon": "package",
  "size": "portrait",
  "input": {
    "kind": "shop",
    "required": true,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh shop ho\u1EB7c \u0111\xF3ng \u0111\u01A1n",
      "en": "Shop or packing photo"
    },
    "hint": {
      "vi": "\u1EA2nh th\u1EADt l\xFAc \u0111\xF3ng g\xF3i, \u1EDF x\u01B0\u1EDFng hay trong shop. \u1EA2nh \u0111i\u1EC7n tho\u1EA1i l\xE0 \u0111\u1EE7.",
      "en": "A real photo of packing, your workshop or your shop. A phone photo is enough."
    }
  },
  "output": {
    "purpose": {
      "vi": "Cho kh\xE1ch th\u1EA5y shop c\xF3 th\u1EADt, l\xE0m \u0103n \u0111\u1EC1u \u0111\u1EB7n v\xE0 ch\u0103m ch\xFAt t\u1EEBng \u0111\u01A1n.",
      "en": "Show the shop is real, busy and careful with every order."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: \u1EA3nh h\u1EADu tr\u01B0\u1EDDng c\u1EE7a b\u1EA1n \u0111\u01B0\u1EE3c l\xE0m \u0111\u1EB9p t\u1EF1 nhi\xEAn, k\xE8m m\u1ED9t d\xF2ng ch\u1EEF ng\u1EAFn.",
      "en": "A portrait 4:5 image: your behind-the-scenes photo, naturally enhanced, with one short line."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story.",
      "en": "Facebook and Zalo posts, stories."
    }
  },
  "fields": [
    {
      "key": "caption",
      "type": "text",
      "label": {
        "vi": "D\xF2ng ch\u1EEF",
        "en": "Line"
      },
      "placeholder": {
        "vi": "VD: \u0110\u01A1n h\xF4m nay \u0111\xE3 l\xEAn \u0111\u01B0\u1EDDng",
        "en": "E.g. Today's orders are on their way"
      },
      "required": false,
      "options": [
        {
          "vi": "\u0110\u01A1n h\xF4m nay \u0111\xE3 l\xEAn \u0111\u01B0\u1EDDng",
          "en": "Today's orders are on their way"
        },
        {
          "vi": "\u0110\xF3ng g\xF3i c\u1EA9n th\u1EADn t\u1EEBng \u0111\u01A1n",
          "en": "Every order packed with care"
        },
        {
          "vi": "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 tin shop",
          "en": "Thank you for trusting us"
        },
        {
          "vi": "H\xE0ng m\u1EDBi ra l\xF2",
          "en": "Fresh from the workshop"
        },
        {
          "vi": "M\u1ED9t ng\xE0y \u1EDF x\u01B0\u1EDFng",
          "en": "A day in the workshop"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{caption}}"
  },
  "designNotes": "The photo is the proof that the shop is real, so it must stay the founder's own scene: same place, people, parcels, products and layout, nothing added or removed. Enhance it like a good photographer would: straighten, gently crop, balance exposure, warm natural light, clean colour, a slight depth of field; it should look like a real phone photo on a good day, not a render. Keep the lower 25\u201330% calm (a table edge, floor or soft shadow) for one short line, deepening it slightly if needed. A subtle tone toward the brand colour; at most three colours. No invented signage, labels on parcels, extra stock, extra people, text or logos.",
  "fixes": [
    {
      "vi": "S\xE1ng v\xE0 r\xF5 h\u01A1n",
      "en": "Brighter and clearer"
    },
    {
      "vi": "\u1EA4m v\xE0 t\u1EF1 nhi\xEAn h\u01A1n",
      "en": "Warmer, more natural"
    },
    {
      "vi": "G\u1ECDn, b\u1EDBt b\u1EEBa h\u01A1n",
      "en": "Tidier frame"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 209
}
`, "image-recipe-birthday": '{\n  "key": "birthday",\n  "group": "portrait",\n  "name": {\n    "vi": "\u1EA2nh sinh nh\u1EADt",\n    "en": "Birthday portrait"\n  },\n  "icon": "cake",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh sinh nh\u1EADt c\u1EE7a ch\xEDnh b\u1EA1n \u0111\u1EC3 \u0111\u0103ng, c\u1EA3m \u01A1n kh\xE1ch v\xE0 b\u1EA1n b\xE8 \u0111\xE3 \u0111\u1ED3ng h\xE0nh.",\n      "en": "Your own birthday image to post and thank customers and friends."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n b\xEAn b\xE1nh kem n\u1EBFn lung linh, l\u1EDDi ch\xFAc ph\xEDa tr\xEAn.",\n      "en": "A portrait 4:5 image: you with a candle-lit cake, the greeting above."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Greeting"\n      },\n      "placeholder": {\n        "vi": "VD: Ch\xE0o tu\u1ED5i m\u1EDBi",\n        "en": "E.g. Hello, new year of me"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Happy Birthday",\n          "en": "Happy Birthday"\n        },\n        {\n          "vi": "Ch\xE0o tu\u1ED5i m\u1EDBi",\n          "en": "Hello, new year of me"\n        },\n        {\n          "vi": "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u1ED3ng h\xE0nh",\n          "en": "Thank you for being with me"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}"\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. A joyful, tasteful celebration, not a party-store poster. The person chest-up or waist-up holding or leaning toward a birthday cake with lit candles, a few balloons in one or two soft colours (cream, blush, champagne gold or the brand colour), warm candle and fairy-light bokeh, a simple home or caf\xE9 setting. Keep the upper 30% calm for the greeting. Never put numbers or letters on the cake, balloons or banners; no cartoon confetti overload.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "Vui t\u01B0\u01A1i h\u01A1n",\n      "en": "More joyful"\n    },\n    {\n      "vi": "\u0110\u1ED5i m\xE0u b\xF3ng bay",\n      "en": "Different balloon colours"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 811\n}\n', "image-recipe-black-friday": `{
  "key": "black-friday",
  "group": "season",
  "name": {
    "vi": "Black Friday",
    "en": "Black Friday"
  },
  "icon": "tag",
  "size": "square",
  "input": {
    "kind": "any",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",
      "en": "Your product, shop or you"
    },
    "hint": {
      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m mu\u1ED1n \u0111\u1EA9y trong d\u1ECBp Black Friday; kh\xF4ng c\xF3 \u1EA3nh v\u1EABn l\xE0m \u0111\u01B0\u1EE3c.",
      "en": "Add the product to push for Black Friday; it works without a photo too."
    }
  },
  "output": {
    "purpose": {
      "vi": "B\xE1o \u0111\u1EE3t sale Black Friday, t\u1EA1o c\u1EA3m gi\xE1c \\"gi\u1EA3m l\u1EDBn nh\u1EA5t n\u0103m\\".",
      "en": "Announce a Black Friday sale with a biggest-deal-of-the-year feel."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng t\xF4ng \u0111en sang, n\u1ED5i b\u1EADt: BLACK FRIDAY, \u01B0u \u0111\xE3i n\u1EBFu c\xF3, s\u1EA3n ph\u1EA9m v\xE0 t\xEAn shop.",
      "en": "A sleek, dark square image: BLACK FRIDAY, an offer if any, your product and shop name."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh Shopee, TikTok Shop.",
      "en": "Facebook and Zalo posts, Shopee and TikTok Shop images."
    }
  },
  "fields": [
    {
      "key": "headline",
      "type": "text",
      "label": {
        "vi": "Ti\xEAu \u0111\u1EC1",
        "en": "Headline"
      },
      "placeholder": {
        "vi": "VD: BLACK FRIDAY",
        "en": "E.g. BLACK FRIDAY"
      },
      "required": false,
      "options": [
        {
          "vi": "BLACK FRIDAY",
          "en": "BLACK FRIDAY"
        },
        {
          "vi": "BLACK FRIDAY SALE",
          "en": "BLACK FRIDAY SALE"
        },
        {
          "vi": "SI\xCAU SALE BLACK FRIDAY",
          "en": "BLACK FRIDAY MEGA SALE"
        },
        {
          "vi": "BLACK FRIDAY \xB7 CYBER MONDAY",
          "en": "BLACK FRIDAY \xB7 CYBER MONDAY"
        }
      ],
      "default": "BLACK FRIDAY"
    },
    {
      "key": "offer",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i",
        "en": "Offer"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EA3m \u0111\u1EBFn 70%",
        "en": "E.g. Up to 70% off"
      },
      "required": false,
      "options": [
        {
          "vi": "Gi\u1EA3m \u0111\u1EBFn 70%",
          "en": "Up to 70% off"
        },
        {
          "vi": "Gi\u1EA3m 50% to\xE0n b\u1ED9 c\u1EEDa h\xE0ng",
          "en": "50% off everything"
        },
        {
          "vi": "Mua 1 t\u1EB7ng 1",
          "en": "Buy 1, get 1 free"
        },
        {
          "vi": "Freeship m\u1ECDi \u0111\u01A1n",
          "en": "Free shipping on every order"
        },
        {
          "vi": "Ch\u1EC9 3 ng\xE0y, \u0111\u1EBFn h\u1EBFt 30/11",
          "en": "3 days only, until 30/11"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{headline}}",
    "lines": [
      "{{offer}}"
    ]
  },
  "designNotes": "Sleek, dramatic and premium. A near-black backdrop (matte black, charcoal or deep navy) with one hard spotlight. Put the product in the upper 60\u201365%, slightly off-centre and filling 40\u201360% of that area, on a glossy black podium with a crisp reflection and rim light; with no photo, glossy black shopping bags and gift boxes tied with one accent ribbon are the hero. Keep the lower 35% calm and dark for the headline and an optional offer line. Black and white plus one vivid accent from the brand colour (or red or gold); at most three colours. No neon clutter, confetti, other brands' logos, price tags, text, numbers or % signs; the product must look accurate.",
  "fixes": [
    {
      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",
      "en": "Bigger, clearer product"
    },
    {
      "vi": "S\xF4i \u0111\u1ED9ng, b\u1EAFt m\u1EAFt h\u01A1n",
      "en": "More energetic, eye-catching"
    },
    {
      "vi": "Sang tr\u1ECDng h\u01A1n",
      "en": "More premium"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "seasons": [
    {
      "from": "11-01",
      "to": "11-30"
    }
  ],
  "order": 608
}
`, "image-recipe-bogo": '{\n  "key": "bogo",\n  "group": "close",\n  "name": {\n    "vi": "Mua 1 t\u1EB7ng 1 / Combo",\n    "en": "Buy one get one / Bundle"\n  },\n  "icon": "gift",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m (v\xE0 qu\xE0 t\u1EB7ng)",\n      "en": "Product photo (and the gift)"\n    },\n    "hint": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m ch\xEDnh, th\xEAm \u1EA3nh m\xF3n qu\xE0 t\u1EB7ng n\u1EBFu c\xF3.",\n      "en": "The main product, plus the gift if there is one."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Gi\u1EDBi thi\u1EC7u \u01B0u \u0111\xE3i mua k\xE8m, cho kh\xE1ch th\u1EA5y \u0111\u01B0\u1EE3c nhi\u1EC1u h\u01A1n.",\n      "en": "Show a bundle deal so buyers see they get more."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m v\xE0 qu\xE0 \u0111\u1EB7t c\u1EA1nh nhau h\u1EA5p d\u1EABn, d\xF2ng \u01B0u \u0111\xE3i l\u1EDBn r\xF5 r\xE0ng.",\n      "en": "A square image: the product and the gift side by side, the offer in large clear type."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, Shopee, TikTok Shop.",\n      "en": "Facebook, Zalo, Shopee, TikTok Shop."\n    }\n  },\n  "fields": [\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: Mua 1 t\u1EB7ng 1",\n        "en": "E.g. Buy 1 get 1"\n      },\n      "required": true,\n      "options": [\n        { "vi": "Mua 1 t\u1EB7ng 1", "en": "Buy 1 get 1" },\n        { "vi": "Mua 2 t\u1EB7ng 1", "en": "Buy 2 get 1" },\n        { "vi": "Mua 2 gi\u1EA3m 10%", "en": "Buy 2, 10% off" },\n        { "vi": "Mua k\xE8m qu\xE0 t\u1EB7ng", "en": "Free gift with purchase" },\n        { "vi": "Combo ti\u1EBFt ki\u1EC7m", "en": "Money-saving bundle" },\n        { "vi": "Mua 1 t\u1EB7ng 1 c\xF9ng lo\u1EA1i", "en": "Buy 1 get 1 of the same" }\n      ],\n      "default": "Mua 1 t\u1EB7ng 1"\n    },\n    {\n      "key": "until",\n      "type": "text",\n      "label": {\n        "vi": "\xC1p d\u1EE5ng \u0111\u1EBFn",\n        "en": "Until"\n      },\n      "placeholder": {\n        "vi": "VD: \u0110\u1EBFn h\u1EBFt Ch\u1EE7 nh\u1EADt n\xE0y",\n        "en": "E.g. Until this Sunday"\n      },\n      "required": false,\n      "options": [\n        { "vi": "Ch\u1EC9 h\xF4m nay", "en": "Today only" },\n        { "vi": "\u0110\u1EBFn h\u1EBFt Ch\u1EE7 nh\u1EADt n\xE0y", "en": "Until this Sunday" },\n        { "vi": "Trong tu\u1EA7n n\xE0y", "en": "All this week" },\n        { "vi": "\u0110\u1EBFn h\u1EBFt th\xE1ng n\xE0y", "en": "Until the end of the month" },\n        { "vi": "S\u1ED1 l\u01B0\u1EE3ng c\xF3 h\u1EA1n", "en": "While stocks last" }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{offer}}",\n    "lines": [\n      "{{until}}"\n    ]\n  },\n  "designNotes": "Show both items together, side by side or slightly overlapping, at near-equal scale on one shared surface with matching light, so they read as a pair. With one photo, show two identical units; with two photos, show each product exactly as given, without merging or restyling either. Group them in the lower-centre 55% and keep the top 35\u201340% a clean, low-detail field for the offer headline and the end date. A soft ribbon or gift-wrap cue (kraft paper, tissue) can hint at the gift. Warm, generous palette led by the brand colour, at most three colours, bright enough to stop the scroll in a Facebook or Shopee feed. Never add a third product, labels, text, numbers, price tags or plus/equal symbols.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 301\n}\n', "image-recipe-bw-portrait": '{\n  "key": "bw-portrait",\n  "group": "portrait",\n  "name": {\n    "vi": "Ch\xE2n dung \u0111en tr\u1EAFng",\n    "en": "Black-and-white portrait"\n  },\n  "icon": "contrast",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh c\xF3 chi\u1EC1u s\xE2u cho b\xE0i k\u1EC3 chuy\u1EC7n kh\u1EDFi nghi\u1EC7p, ph\u1ECFng v\u1EA5n, h\u1ED3 s\u01A1 b\xE1o ch\xED.",\n      "en": "A portrait with depth for founder stories, interviews and press kits."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 \u0111en tr\u1EAFng ngh\u1EC7 thu\u1EADt, \xE1nh s\xE1ng m\u1ED9t b\xEAn, gi\u1EEF nguy\xEAn n\xE9t m\u1EB7t th\u1EADt.",\n      "en": "A portrait 4:5 black-and-white image, one side light, your real features kept."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. Editorial black and white: a tight head-and-shoulders crop, a single hard-ish side light (Rembrandt or split) with deep but detailed shadows, a dark grey seamless backdrop. A calm, direct or thoughtful look; a dark sweater, shirt or blazer. Rich tonal range from true black to clean white, fine film grain. Lines and features kept on purpose: this look is honest, not retouched. No colour tint, heavy vignette, smoke or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1ng ph\u1EA3n m\u1EA1nh h\u01A1n",\n      "en": "More contrast"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, d\u1ECBu h\u01A1n",\n      "en": "Softer, gentler"\n    },\n    {\n      "vi": "C\u1EADn m\u1EB7t h\u01A1n",\n      "en": "Closer crop"\n    }\n  ],\n  "order": 807\n}\n', "image-recipe-certificate": '{\n  "key": "certificate",\n  "group": "trust",\n  "name": {\n    "vi": "Ch\u1EE9ng nh\u1EADn / B\xE1o ch\xED",\n    "en": "Certificates & press"\n  },\n  "icon": "award",\n  "size": "square",\n  "input": {\n    "kind": "screenshot",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh ch\u1EE9ng nh\u1EADn ho\u1EB7c b\xE0i b\xE1o",\n      "en": "Certificate or article"\n    },\n    "hint": {\n      "vi": "\u1EA2nh ch\u1EE5p ho\u1EB7c \u1EA3nh m\xE0n h\xECnh gi\u1EA5y ch\u1EE9ng nh\u1EADn, gi\u1EA3i th\u01B0\u1EDFng hay b\xE0i b\xE1o th\u1EADt v\u1EC1 b\u1EA1n.",\n      "en": "A photo or screenshot of a real certificate, award or press article about you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Khoe ch\u1EE9ng nh\u1EADn, gi\u1EA3i th\u01B0\u1EDFng hay b\xE0i b\xE1o th\u1EADt \u0111\u1EC3 kh\xE1ch tin shop l\xE0m th\u1EADt, c\xF3 uy t\xEDn.",\n      "en": "Show a real certificate, award or press article so buyers see you are credible."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: ch\u1EE9ng nh\u1EADn ho\u1EB7c b\xE0i b\xE1o c\u1EE7a b\u1EA1n trong khung \u0111\u1EB9p, gi\u1EEF nguy\xEAn t\u1EEBng ch\u1EEF.",\n      "en": "A square image: your certificate or article in a designed frame, every word unchanged."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, highlight, trang Gi\u1EDBi thi\u1EC7u.",\n      "en": "Facebook and Zalo posts, highlights, About page."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "The document is the proof: never redraw, crop text from, re-letter, translate or improve it, and never add seals, signatures or logos. Design only the frame. For a certificate or award: the document centred, straight and flat, 65\u201375% of the height, in a slim frame or on a soft mat with a gentle drop shadow, on a calm, softly lit wall or desk. For a press article: the page or screen in a clean card or device mockup, centred. A neutral or brand-tinted backdrop with subtle texture; at most three colours. Restrained accents only: a sprig of greenery, soft side light, a thin frame line. Generous margins so it reads at feed size. No ribbons, trophies, confetti or added text.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "Ch\u1EEF tr\xEAn gi\u1EA5y r\xF5 h\u01A1n",\n      "en": "Sharper document text"\n    }\n  ],\n  "order": 208\n}\n', "image-recipe-children-day": `{
  "key": "children-day",
  "group": "season",
  "name": {
    "vi": "Qu\u1ED1c t\u1EBF Thi\u1EBFu nhi 1/6",
    "en": "Children's Day 1/6"
  },
  "icon": "baby",
  "size": "portrait",
  "input": {
    "kind": "any",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",
      "en": "Your product, shop or you"
    },
    "hint": {
      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c \u1EA3nh c\u1EE7a b\u1EA1n n\u1EBFu mu\u1ED1n xu\u1EA5t hi\u1EC7n trong \u1EA3nh.",
      "en": "Add a product, your shop or yourself to appear in the image."
    }
  },
  "output": {
    "purpose": {
      "vi": "Ch\xFAc m\u1EEBng ng\xE0y 1/6 t\u1EDBi c\xE1c b\xE9 v\xE0 b\u1ED1 m\u1EB9, gi\u1EDBi thi\u1EC7u qu\xE0 ho\u1EB7c \u01B0u \u0111\xE3i cho b\xE9.",
      "en": "Celebrate 1 June with kids and parents and show gifts or offers for children."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5 vui t\u01B0\u01A1i: b\xF3ng bay, di\u1EC1u, \u0111\u1ED3 ch\u01A1i, l\u1EDDi ch\xFAc v\xE0 \u01B0u \u0111\xE3i n\u1EBFu c\xF3.",
      "en": "A cheerful portrait 4:5 image: balloons, kites, toys, your greeting and an offer if any."
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
        "vi": "VD: Ch\xFAc m\u1EEBng Qu\u1ED1c t\u1EBF Thi\u1EBFu nhi 1/6",
        "en": "E.g. Happy Children's Day"
      },
      "required": false,
      "options": [
        {
          "vi": "Ch\xFAc m\u1EEBng Qu\u1ED1c t\u1EBF Thi\u1EBFu nhi 1/6",
          "en": "Happy Children's Day, 1 June"
        },
        {
          "vi": "Vui T\u1EBFt Thi\u1EBFu Nhi",
          "en": "Happy Children's Day"
        },
        {
          "vi": "Ch\xFAc c\xE1c b\xE9 lu\xF4n vui kho\u1EBB",
          "en": "Wishing every child joy and health"
        },
        {
          "vi": "M\u1EEBng 1/6, b\xE9 vui h\u1EBFt c\u1EE1",
          "en": "1 June, the happiest day for kids"
        },
        {
          "vi": "Qu\xE0 1/6 cho b\xE9 y\xEAu",
          "en": "1 June gifts for your little one"
        }
      ],
      "default": "Ch\xFAc m\u1EEBng Qu\u1ED1c t\u1EBF Thi\u1EBFu nhi 1/6"
    },
    {
      "key": "offer",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i",
        "en": "Offer"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EA3m 20% \u0111\u1ED3 cho b\xE9",
        "en": "E.g. 20% off for kids"
      },
      "required": false,
      "options": [
        {
          "vi": "Gi\u1EA3m 20% \u0111\u1ED3 cho b\xE9",
          "en": "20% off for kids"
        },
        {
          "vi": "T\u1EB7ng qu\xE0 cho b\xE9 khi mua h\xE0ng",
          "en": "A free gift for kids with every order"
        },
        {
          "vi": "Freeship \u0111\u01A1n \u0111\u1ED3 tr\u1EBB em",
          "en": "Free shipping on kids' orders"
        },
        {
          "vi": "Mua 2 t\u1EB7ng 1",
          "en": "Buy 2, get 1 free"
        },
        {
          "vi": "B\xE9 \u0111\u1EBFn shop \u0111\u01B0\u1EE3c t\u1EB7ng b\xF3ng bay",
          "en": "Free balloons for kids who visit"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "top",
    "title": "{{greeting}}",
    "lines": [
      "{{offer}}"
    ]
  },
  "designNotes": "Bright, playful and safe. Keep the upper 30\u201335% a calm sky-blue or soft pastel field for the greeting and an optional offer line. Below, the product, shop or person among colourful balloons, a paper kite, paper planes, building blocks and a few soft toys, in sunny daylight with gentle shadows. With a portrait, keep the face exactly; with no photo, a cheerful still life of toys and balloons on a pastel set. Children, if any, appear only small and from behind (flying a kite, running), never as close-up faces. Candy pastels plus one brand accent; at most three main colours. No cartoon characters from films or brands, no text, numbers or logos.",
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
    },
    {
      "vi": "Vui nh\u1ED9n, nhi\u1EC1u m\xE0u h\u01A1n",
      "en": "More playful and colourful"
    }
  ],
  "seasons": [
    {
      "from": "05-15",
      "to": "06-01"
    }
  ],
  "order": 604
}
`, "image-recipe-christmas": '{\n  "key": "christmas",\n  "group": "season",\n  "name": {\n    "vi": "Gi\xE1ng sinh / Noel",\n    "en": "Christmas"\n  },\n  "icon": "tree",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",\n      "en": "Your product, shop or you"\n    },\n    "hint": {\n      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c \u1EA3nh c\u1EE7a b\u1EA1n n\u1EBFu mu\u1ED1n xu\u1EA5t hi\u1EC7n trong \u1EA3nh Noel.",\n      "en": "Add a product, your shop or yourself to appear in the Christmas image."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc Gi\xE1ng sinh kh\xE1ch h\xE0ng v\xE0 b\xE1o \u01B0u \u0111\xE3i m\xF9a Noel.",\n      "en": "Wish customers a merry Christmas and announce a Christmas offer."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 \u1EA5m c\xFAng: c\xE2y th\xF4ng, \u0111\xE8n l\u1EA5p l\xE1nh, h\u1ED9p qu\xE0, l\u1EDDi ch\xFAc, \u01B0u \u0111\xE3i n\u1EBFu c\xF3 v\xE0 t\xEAn shop.",\n      "en": "A cosy portrait 4:5 image: a Christmas tree, twinkling lights, gift boxes, your greeting, an offer if any and your shop name."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, Shopee.",\n      "en": "Facebook and Zalo posts, stories, Shopee."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Greeting"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\xE1ng Sinh An L\xE0nh",\n        "en": "E.g. A peaceful Christmas"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\xE1ng Sinh An L\xE0nh",\n          "en": "A peaceful Christmas"\n        },\n        {\n          "vi": "Merry Christmas",\n          "en": "Merry Christmas"\n        },\n        {\n          "vi": "M\u1EEBng Gi\xE1ng Sinh",\n          "en": "Happy Christmas"\n        },\n        {\n          "vi": "Noel \u1EA4m \xC1p",\n          "en": "A warm Christmas"\n        },\n        {\n          "vi": "Merry Christmas & Happy New Year",\n          "en": "Merry Christmas & Happy New Year"\n        }\n      ],\n      "default": "Gi\xE1ng Sinh An L\xE0nh"\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 25% m\xF9a Noel",\n        "en": "E.g. 25% off this Christmas"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 25% m\xF9a Noel",\n          "en": "25% off this Christmas"\n        },\n        {\n          "vi": "G\xF3i qu\xE0 Noel mi\u1EC5n ph\xED",\n          "en": "Free Christmas gift wrapping"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 cho m\u1ECDi \u0111\u01A1n Noel",\n          "en": "A free gift with every Christmas order"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n Gi\xE1ng sinh",\n          "en": "Free shipping on Christmas orders"\n        },\n        {\n          "vi": "Mua 2 t\u1EB7ng 1",\n          "en": "Buy 2, get 1 free"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}",\n    "lines": [\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "Cosy and magical. Keep the upper 35% a calm field (deep green, burgundy or soft night blue with gentle snowfall bokeh) for the greeting and an optional offer line. Below, the product, shop or person beside a decorated Christmas tree with warm fairy lights, ribbon-tied gift boxes, pine branches, pinecones and candles, warm golden light; a shop photo gets wreaths and string lights. With a portrait, keep the face exactly; with no photo, the tree and a pile of gifts are the hero. Red, green and gold, or the brand colour with gold. Santa or reindeer only as small ornaments; no film or brand characters, no text on gifts or cards, no numbers or logos.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "\u1EA4m c\xFAng h\u01A1n",\n      "en": "Cosier"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "11-25",\n      "to": "12-25"\n    }\n  ],\n  "order": 609\n}\n', "image-recipe-compare": '{\n  "key": "compare",\n  "group": "trust",\n  "name": {\n    "vi": "So s\xE1nh g\xF3i / s\u1EA3n ph\u1EA9m",\n    "en": "Compare plans"\n  },\n  "icon": "compare",\n  "size": "portrait",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photos"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh t\u1EEBng g\xF3i ho\u1EB7c s\u1EA3n ph\u1EA9m n\u1EBFu c\xF3; kh\xF4ng c\xF3 th\xEC Kallob t\u1EF1 l\xE0m n\u1EC1n.",\n      "en": "Add a photo of each plan or product if you have one; otherwise Kallob designs the background."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Gi\xFAp kh\xE1ch th\u1EA5y ngay kh\xE1c bi\u1EC7t gi\u1EEFa c\xE1c g\xF3i \u0111\u1EC3 ch\u1ECDn \u0111\xFAng g\xF3i, b\u1EDBt h\u1ECFi \u0111i h\u1ECFi l\u1EA1i.",\n      "en": "Help people see the differences at once and pick the right plan with fewer questions."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA3ng so s\xE1nh g\u1ECDn, d\u1EC5 \u0111\u1ECDc gi\u1EEFa c\xE1c g\xF3i ho\u1EB7c s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n.",\n      "en": "A portrait 4:5 image: a clean, readable comparison table of your plans or products."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, g\u1EEDi kh\xE1ch trong tin nh\u1EAFn, \u1EA3nh Shopee.",\n      "en": "Facebook and Zalo posts, chat replies, Shopee images."\n    }\n  },\n  "fields": [\n    {\n      "key": "table",\n      "type": "longtext",\n      "label": {\n        "vi": "B\u1EA3ng so s\xE1nh (m\u1ED7i d\xF2ng m\u1ED9t h\xE0ng, ng\u0103n c\u1ED9t b\u1EB1ng |)",\n        "en": "Comparison (one row per line, columns split by |)"\n      },\n      "placeholder": {\n        "vi": "VD:\\nG\xF3i | C\u01A1 b\u1EA3n | N\xE2ng cao\\nS\u1ED1 bu\u1ED5i | 4 | 8\\nH\u1ED7 tr\u1EE3 qua Zalo | Kh\xF4ng | C\xF3\\nGi\xE1 | 990000 | 1790000",\n        "en": "E.g.\\nPlan | Basic | Advanced\\nSessions | 4 | 8\\nZalo support | No | Yes\\nPrice | 990000 | 1790000"\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "list",\n    "zone": "center",\n    "title": "SO S\xC1NH",\n    "items": "{{table}}"\n  },\n  "designNotes": "The table is the message, so the picture is a calm stage for it. Keep a large clear centre panel area, about 70% of the height and 85% of the width, even in tone and low in detail. With product photos, place them small and accurate along the top edge, one per column, side by side in the same light and scale; with none, use a quiet backdrop that suits the niche (a soft gradient, paper texture, an out-of-focus workspace). A light neutral base with the brand colour as one accent; at most three colours. No ticks, crosses, icons, badges, text, numbers, prices or invented features; never favour one plan visually.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m r\xF5 h\u01A1n",\n      "en": "Clearer product photos"\n    }\n  ],\n  "order": 204\n}\n', "image-recipe-customer-birthday": '{\n  "key": "customer-birthday",\n  "group": "care",\n  "name": {\n    "vi": "Sinh nh\u1EADt kh\xE1ch",\n    "en": "Customer birthday"\n  },\n  "icon": "cake",\n  "size": "square",\n  "input": null,\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc m\u1EEBng sinh nh\u1EADt kh\xE1ch quen \u0111\u1EC3 h\u1ECD th\u1EA5y \u0111\u01B0\u1EE3c nh\u1EDB \u0111\u1EBFn v\xE0 gh\xE9 l\u1EA1i.",\n      "en": "Wish a regular a happy birthday so they feel remembered and come back."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng vui, \u1EA5m: l\u1EDDi ch\xFAc sinh nh\u1EADt v\xE0 qu\xE0 sinh nh\u1EADt n\u1EBFu c\xF3.",\n      "en": "A cheerful square image: your birthday wish and a birthday gift if you add one."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger.",\n      "en": "Zalo and Messenger chats."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Wish"\n      },\n      "placeholder": {\n        "vi": "VD: Ch\xFAc m\u1EEBng sinh nh\u1EADt b\u1EA1n!",\n        "en": "E.g. Happy birthday to you!"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Ch\xFAc m\u1EEBng sinh nh\u1EADt b\u1EA1n!",\n          "en": "Happy birthday to you!"\n        },\n        {\n          "vi": "Sinh nh\u1EADt vui v\u1EBB, b\u1EA1n nh\xE9!",\n          "en": "Have a lovely birthday!"\n        },\n        {\n          "vi": "Ch\xFAc b\u1EA1n tu\u1ED5i m\u1EDBi th\u1EADt nhi\u1EC1u ni\u1EC1m vui",\n          "en": "Wishing you a year full of joy"\n        },\n        {\n          "vi": "Happy Birthday",\n          "en": "Happy Birthday"\n        }\n      ],\n      "default": "Ch\xFAc m\u1EEBng sinh nh\u1EADt b\u1EA1n!"\n    },\n    {\n      "key": "gift",\n      "type": "text",\n      "label": {\n        "vi": "Qu\xE0 sinh nh\u1EADt",\n        "en": "Birthday gift"\n      },\n      "placeholder": {\n        "vi": "VD: T\u1EB7ng b\u1EA1n m\xE3 gi\u1EA3m 20% trong th\xE1ng sinh nh\u1EADt",\n        "en": "E.g. 20% off all through your birthday month"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "T\u1EB7ng b\u1EA1n m\xE3 gi\u1EA3m 20% trong th\xE1ng sinh nh\u1EADt",\n          "en": "20% off all through your birthday month"\n        },\n        {\n          "vi": "Gi\u1EA3m 50.000\u0111 cho \u0111\u01A1n sinh nh\u1EADt",\n          "en": "50,000\u0111 off your birthday order"\n        },\n        {\n          "vi": "Freeship c\u1EA3 th\xE1ng sinh nh\u1EADt",\n          "en": "Free shipping all birthday month"\n        },\n        {\n          "vi": "T\u1EB7ng b\u1EA1n m\u1ED9t m\xF3n qu\xE0 nh\u1ECF \u1EDF \u0111\u01A1n t\u1EDBi",\n          "en": "A small gift with your next order"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}",\n    "lines": [\n      "{{gift}}"\n    ]\n  },\n  "designNotes": "A joyful, tasteful birthday card for a customer, not a party-store poster. No people: a small birthday cake with lit candles in the lower 60% of the frame, slightly off-centre, with a wrapped gift box, a ribbon and a few balloons in one or two soft colours (cream, blush, champagne gold, or the brand colour), warm candle and fairy-light bokeh. Keep the upper 35\u201340% calm (a soft wall or out-of-focus balloons) for the wish and the gift. Warm, gentle light; at most three colours. Never write numbers, names or letters on the cake, balloons, cards or banners; no cartoon confetti overload, logos or text.",\n  "fixes": [\n    {\n      "vi": "\u1EA4m \xE1p, g\u1EA7n g\u0169i h\u01A1n",\n      "en": "Warmer and friendlier"\n    },\n    {\n      "vi": "Sang tr\u1ECDng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "More elegant and minimal"\n    },\n    {\n      "vi": "Vui t\u01B0\u01A1i, nhi\u1EC1u m\xE0u h\u01A1n",\n      "en": "More playful and colourful"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 403\n}\n', "image-recipe-customer-photo": `{
  "key": "customer-photo",
  "group": "spread",
  "name": {
    "vi": "\u0110\u0103ng l\u1EA1i \u1EA3nh kh\xE1ch",
    "en": "Customer photo repost"
  },
  "icon": "camera",
  "size": "square",
  "input": {
    "kind": "any",
    "required": true,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh kh\xE1ch g\u1EEDi",
      "en": "The customer's photo"
    },
    "hint": {
      "vi": "\u1EA2nh kh\xE1ch ch\u1EE5p v\u1EDBi s\u1EA3n ph\u1EA9m (nh\u1EDB h\u1ECFi kh\xE1ch tr\u01B0\u1EDBc nh\xE9). \u1EA2nh \u0111\u01B0\u1EE3c gi\u1EEF nguy\xEAn.",
      "en": "A photo the customer took with your product (ask them first). It is kept exactly as is."
    }
  },
  "output": {
    "purpose": {
      "vi": "C\u1EA3m \u01A1n kh\xE1ch v\xE0 khoe \u1EA3nh th\u1EADt c\u1EE7a kh\xE1ch \u0111\u1EC3 ng\u01B0\u1EDDi sau tin mua.",
      "en": "Thank a customer and show their real photo so others trust you."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng: \u1EA3nh c\u1EE7a kh\xE1ch gi\u1EEF nguy\xEAn trong khung \u0111\u1EB9p, l\u1EDDi c\u1EA3m \u01A1n v\xE0 t\xEAn kh\xE1ch.",
      "en": "A square image: the customer's photo unchanged in a designed frame, a thank-you and their name."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story, highlight.",
      "en": "Facebook and Zalo posts, stories, highlights."
    }
  },
  "fields": [
    {
      "key": "customerName",
      "type": "text",
      "label": {
        "vi": "T\xEAn kh\xE1ch",
        "en": "Customer's name"
      },
      "placeholder": {
        "vi": "VD: Ch\u1ECB Hoa, H\xE0 N\u1ED9i",
        "en": "E.g. Ms Hoa, Hanoi"
      }
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "C\u1EA2M \u01A0N B\u1EA0N \u0110\xC3 TIN CH\u1ECCN",
    "lines": [
      "{{customerName}}"
    ]
  },
  "designNotes": "The customer's photo is the proof and the star: keep it exactly as given. Never retouch, slim, beautify, recolour or redraw the person, their face or the product; never crop off a face or the product, and never add people or items to it. Design only the frame: the photo as a slightly tilted polaroid or a rounded card with a soft shadow, filling 60\u201370% of the frame in the upper part, on a calm brand-coloured or warm neutral background with a light paper or linen texture. A few small hearts, a short ribbon or a tiny flower sprig at one corner, nothing more. Keep the lower 25\u201330% calm and even for the thank-you and the name. No stars, ratings, quotes, logos or text; it should feel grateful, not like an advert.",
  "fixes": [
    {
      "vi": "Khung \u0111\u01A1n gi\u1EA3n h\u01A1n",
      "en": "Simpler frame"
    },
    {
      "vi": "\u1EA4m \xE1p h\u01A1n",
      "en": "Warmer"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 501
}
`, "image-recipe-double-day": '{\n  "key": "double-day",\n  "group": "season",\n  "name": {\n    "vi": "Ng\xE0y \u0111\xF4i sale",\n    "en": "Double-day sale"\n  },\n  "icon": "percent",\n  "size": "square",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",\n      "en": "Your product, shop or you"\n    },\n    "hint": {\n      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m mu\u1ED1n \u0111\u1EA9y trong \u0111\u1EE3t sale; kh\xF4ng c\xF3 \u1EA3nh v\u1EABn l\xE0m \u0111\u01B0\u1EE3c.",\n      "en": "Add the product to push in the sale; it works without a photo too."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o \u0111\u1EE3t sale ng\xE0y \u0111\xF4i (9.9, 10.10, 11.11, 12.12), k\xE9o kh\xE1ch v\xE0o mua \u0111\xFAng ng\xE0y.",\n      "en": "Announce a double-day sale (9.9, 10.10, 11.11, 12.12) and get people to buy on the day."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng s\xF4i \u0111\u1ED9ng ki\u1EC3u si\xEAu sale: ng\xE0y sale th\u1EADt to, \u01B0u \u0111\xE3i n\u1EBFu c\xF3, s\u1EA3n ph\u1EA9m v\xE0 t\xEAn shop.",\n      "en": "An energetic square mega-sale image: the sale day in big type, an offer if any, your product and shop name."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh b\xECa v\xE0 s\u1EA3n ph\u1EA9m Shopee, TikTok Shop.",\n      "en": "Facebook and Zalo posts, Shopee and TikTok Shop banners and product images."\n    }\n  },\n  "fields": [\n    {\n      "key": "day",\n      "type": "text",\n      "label": {\n        "vi": "Ng\xE0y sale",\n        "en": "Sale day"\n      },\n      "placeholder": {\n        "vi": "VD: 11.11",\n        "en": "E.g. 11.11"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "9.9",\n          "en": "9.9"\n        },\n        {\n          "vi": "10.10",\n          "en": "10.10"\n        },\n        {\n          "vi": "11.11",\n          "en": "11.11"\n        },\n        {\n          "vi": "12.12",\n          "en": "12.12"\n        }\n      ]\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m \u0111\u1EBFn 50%",\n        "en": "E.g. Up to 50% off"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m \u0111\u1EBFn 50%",\n          "en": "Up to 50% off"\n        },\n        {\n          "vi": "Freeship m\u1ECDi \u0111\u01A1n",\n          "en": "Free shipping on every order"\n        },\n        {\n          "vi": "Mua 1 t\u1EB7ng 1",\n          "en": "Buy 1, get 1 free"\n        },\n        {\n          "vi": "\u0110\u1ED3ng gi\xE1 99k",\n          "en": "Everything 99k"\n        },\n        {\n          "vi": "Voucher 50k cho \u0111\u01A1n t\u1EEB 299k",\n          "en": "A 50k voucher on orders from 299k"\n        },\n        {\n          "vi": "Ch\u1EC9 trong 24 gi\u1EDD",\n          "en": "24 hours only"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "SI\xCAU SALE {{day}}",\n    "lines": [\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "Marketplace mega-sale energy. Keep the upper 35% a calm, saturated field (deep brand colour or bold orange-red to magenta gradient) for the big sale day and an optional offer line. Below, the product as the hero, slightly off-centre and filling 40\u201360% of that area, on a glossy podium, surrounded by flying 3D gift boxes, shopping bags, coupons without writing, confetti and light bursts with dynamic diagonals; with no photo, stacked gift boxes and shopping bags are the hero. Bright punchy light, the product true to life. At most three colours from the brand. No Shopee, Lazada, TikTok or other marketplace logos, mascots, app screens or their signature orange; no text, numbers, dates, prices or % signs drawn in the picture.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "S\xF4i \u0111\u1ED9ng, b\u1EAFt m\u1EAFt h\u01A1n",\n      "en": "More energetic, eye-catching"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "08-25",\n      "to": "12-12"\n    }\n  ],\n  "order": 606\n}\n', "image-recipe-event": '{\n  "key": "event",\n  "group": "attract",\n  "name": {\n    "vi": "S\u1EF1 ki\u1EC7n / Workshop",\n    "en": "Event or workshop"\n  },\n  "icon": "event",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh ng\u01B0\u1EDDi chia s\u1EBB ho\u1EB7c \u0111\u1ECBa \u0111i\u1EC3m",\n      "en": "Speaker or venue photo"\n    },\n    "hint": {\n      "vi": "\u1EA2nh ng\u01B0\u1EDDi \u0111\u1EE9ng l\u1EDBp, ng\u01B0\u1EDDi chia s\u1EBB ho\u1EB7c n\u01A1i t\u1ED5 ch\u1EE9c.",\n      "en": "A photo of the host, the speaker or the venue."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "M\u1EDDi ng\u01B0\u1EDDi quan t\xE2m \u0111\u1EBFn d\u1EF1 s\u1EF1 ki\u1EC7n ho\u1EB7c workshop c\u1EE7a b\u1EA1n v\xE0 \u0111\u0103ng k\xFD.",\n      "en": "Invite interested people to your event or workshop and get them to sign up."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: ch\u1EE7 \u0111\u1EC1 s\u1EF1 ki\u1EC7n n\u1ED5i b\u1EADt, th\u1EDDi gian v\xE0 \u0111\u1ECBa \u0111i\u1EC3m ho\u1EB7c h\xECnh th\u1EE9c online.",\n      "en": "A portrait 4:5 image: the event topic up front, the time and the place or online link type."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, nh\xF3m c\u1ED9ng \u0111\u1ED3ng, story.",\n      "en": "Facebook and Zalo posts, community groups, stories."\n    }\n  },\n  "fields": [\n    {\n      "key": "topic",\n      "type": "text",\n      "label": {\n        "vi": "Ch\u1EE7 \u0111\u1EC1",\n        "en": "Topic"\n      },\n      "placeholder": {\n        "vi": "VD: Workshop pha c\xE0 ph\xEA t\u1EA1i nh\xE0",\n        "en": "E.g. Home coffee brewing workshop"\n      },\n      "required": true\n    },\n    {\n      "key": "time",\n      "type": "text",\n      "label": {\n        "vi": "Th\u1EDDi gian",\n        "en": "Time"\n      },\n      "placeholder": {\n        "vi": "VD: 9h s\xE1ng Ch\u1EE7 nh\u1EADt 19/10",\n        "en": "E.g. 9 am Sunday 19/10"\n      }\n    },\n    {\n      "key": "place",\n      "type": "text",\n      "label": {\n        "vi": "\u0110\u1ECBa \u0111i\u1EC3m",\n        "en": "Place"\n      },\n      "placeholder": {\n        "vi": "VD: Online qua Zoom",\n        "en": "E.g. Online on Zoom"\n      },\n      "options": [\n        {\n          "vi": "Online qua Zoom",\n          "en": "Online on Zoom"\n        },\n        {\n          "vi": "Online qua Google Meet",\n          "en": "Online on Google Meet"\n        },\n        {\n          "vi": "Livestream tr\xEAn Facebook",\n          "en": "Live on Facebook"\n        },\n        {\n          "vi": "T\u1EA1i c\u1EEDa h\xE0ng",\n          "en": "At our shop"\n        },\n        {\n          "vi": "\u0110\u0103ng k\xFD \u0111\u1EC3 nh\u1EADn \u0111\u1ECBa ch\u1EC9",\n          "en": "Sign up to get the address"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "{{topic}}",\n    "lines": [\n      "{{time}}",\n      "{{place}}"\n    ]\n  },\n  "designNotes": "An inviting, credible event poster. With a photo of the host or speaker, keep the face and clothes exactly as given, waist-up in the upper 60%, warm and welcoming, in a setting that fits the topic. With a venue photo, keep the place recognisable, brightened and tidy, set up for a small group. With no photo, show the activity itself, ready for guests: a workshop table with the tools of the topic, notebooks and coffee, or a laptop with a soft screen glow at a neat desk if the place is online. Keep the lower 40% calm and even for the topic, time and place. Warm, natural light; the brand colour with one neutral, at most three colours. No text, screens with words, logos, signage, badges or invented crowds of faces.",\n  "fixes": [\n    {\n      "vi": "\u1EA4m c\xFAng, g\u1EA7n g\u0169i h\u01A1n",\n      "en": "Warmer, more welcoming"\n    },\n    {\n      "vi": "Chuy\xEAn nghi\u1EC7p, sang h\u01A1n",\n      "en": "More professional"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 105\n}\n', "image-recipe-faq": '{\n  "key": "faq",\n  "group": "trust",\n  "name": {\n    "vi": "H\u1ECFi \u0111\xE1p",\n    "en": "FAQ"\n  },\n  "icon": "faq",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh s\u1EA3n ph\u1EA9m ho\u1EB7c shop n\u1EBFu c\xE2u h\u1ECFi n\xF3i v\u1EC1 n\xF3; kh\xF4ng c\xF3 th\xEC Kallob t\u1EF1 l\xE0m n\u1EC1n.",\n      "en": "Add a product or shop photo if the question is about it; otherwise Kallob designs the background."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Tr\u1EA3 l\u1EDDi s\u1EB5n c\xE2u kh\xE1ch hay h\u1ECFi, \u0111\u1EC3 kh\xE1ch y\xEAn t\xE2m v\xE0 ch\u1ED1t nhanh h\u01A1n.",\n      "en": "Answer a question buyers often ask, so they feel safe and decide faster."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: c\xE2u h\u1ECFi n\u1ED5i b\u1EADt v\xE0 c\xE2u tr\u1EA3 l\u1EDDi ng\u1EAFn c\u1EE7a b\u1EA1n trong khung gi\u1EEFa \u1EA3nh.",\n      "en": "A square image: the question up front and your short answer in a centre panel."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, g\u1EEDi kh\xE1ch trong tin nh\u1EAFn.",\n      "en": "Facebook and Zalo posts, stories, chat replies."\n    }\n  },\n  "fields": [\n    {\n      "key": "question",\n      "type": "text",\n      "label": {\n        "vi": "C\xE2u h\u1ECFi",\n        "en": "Question"\n      },\n      "placeholder": {\n        "vi": "VD: C\xF3 \u0111\u01B0\u1EE3c ki\u1EC3m h\xE0ng kh\xF4ng?",\n        "en": "E.g. Can I check before paying?"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "C\xF3 giao t\u1EADn n\u01A1i kh\xF4ng?",\n          "en": "Do you deliver?"\n        },\n        {\n          "vi": "C\xF3 \u0111\u01B0\u1EE3c ki\u1EC3m h\xE0ng kh\xF4ng?",\n          "en": "Can I check before paying?"\n        },\n        {\n          "vi": "Bao l\xE2u th\xEC nh\u1EADn \u0111\u01B0\u1EE3c h\xE0ng?",\n          "en": "How long does delivery take?"\n        },\n        {\n          "vi": "C\xF3 \u0111\u1ED5i size \u0111\u01B0\u1EE3c kh\xF4ng?",\n          "en": "Can I change the size?"\n        },\n        {\n          "vi": "C\xF3 b\u1EA3o h\xE0nh kh\xF4ng?",\n          "en": "Is there a warranty?"\n        },\n        {\n          "vi": "Thanh to\xE1n b\u1EB1ng c\xE1ch n\xE0o?",\n          "en": "How can I pay?"\n        },\n        {\n          "vi": "H\xE0ng c\xF3 gi\u1ED1ng \u1EA3nh kh\xF4ng?",\n          "en": "Does it look like the photos?"\n        }\n      ]\n    },\n    {\n      "key": "answer",\n      "type": "text",\n      "label": {\n        "vi": "C\xE2u tr\u1EA3 l\u1EDDi",\n        "en": "Answer"\n      },\n      "placeholder": {\n        "vi": "VD: C\xF3 \u1EA1, b\u1EA1n \u0111\u01B0\u1EE3c m\u1EDF h\u1ED9p ki\u1EC3m tr\u01B0\u1EDBc khi tr\u1EA3 ti\u1EC1n.",\n        "en": "E.g. Yes, you can open and check it before paying."\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "center",\n    "title": "{{question}}",\n    "lines": [\n      "{{answer}}"\n    ]\n  },\n  "designNotes": "A friendly, reassuring card. Keep the centre 60\u201365% clear and even in tone for a dark rounded panel with the question and answer. With a product or shop photo, keep it accurate and recognisable, placed at one side or the lower edge, softly lit, never behind the words. With none, use a calm backdrop that hints at the topic of the question (a parcel on a doorstep for delivery, hands opening a box for checking, a measuring tape for sizes) softly out of focus around the edges. Warm light, the brand colour as accent on a neutral base; at most three colours. No question marks, speech bubbles, text, numbers, logos or invented promises.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "H\u1EE3p n\u1ED9i dung c\xE2u h\u1ECFi h\u01A1n",\n      "en": "Better match the question"\n    }\n  ],\n  "order": 206\n}\n', "image-recipe-fb-cover": '{\n  "key": "fb-cover",\n  "group": "brand",\n  "name": {\n    "vi": "\u1EA2nh b\xECa Facebook",\n    "en": "Facebook cover"\n  },\n  "icon": "cover",\n  "size": "landscape",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh b\xECa trang c\xE1 nh\xE2n n\xF3i ngay b\u1EA1n l\xE0 ai v\xE0 l\xE0m g\xEC, kh\xE1ch v\xE0o l\xE0 nh\u1EDB.",\n      "en": "A profile cover that says at once who you are and what you do."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh ngang 16:9: b\u1EA1n \u1EDF m\u1ED9t b\xEAn, b\xEAn c\xF2n l\u1EA1i \u0111\u1EC3 t\xEAn v\xE0 c\xE2u gi\u1EDBi thi\u1EC7u ng\u1EAFn n\u1EBFu b\u1EA1n \u0111i\u1EC1n.",\n      "en": "A landscape 16:9 image: you on one side, your name and a short line about you on the other if you add them."\n    },\n    "channels": {\n      "vi": "\u1EA2nh b\xECa Facebook, Zalo, LinkedIn, \u0111\u1EA7u trang website.",\n      "en": "Facebook, Zalo and LinkedIn covers, website headers."\n    }\n  },\n  "fields": [\n    {\n      "key": "name",\n      "type": "text",\n      "label": {\n        "vi": "T\xEAn hi\u1EC3n th\u1ECB",\n        "en": "Display name"\n      },\n      "placeholder": {\n        "vi": "VD: Ng\u1ECDc Anh",\n        "en": "E.g. Ngoc Anh"\n      },\n      "required": false\n    },\n    {\n      "key": "tagline",\n      "type": "text",\n      "label": {\n        "vi": "B\u1EA1n l\xE0m g\xEC",\n        "en": "What you do"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\xFAp shop nh\u1ECF b\xE1n h\xE0ng online",\n        "en": "E.g. Helping small shops sell online"\n      },\n      "required": false\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{name}}",\n    "lines": [\n      "{{tagline}}"\n    ]\n  },\n  "designNotes": "A wide personal-brand banner. Place the person waist-up on the right third, looking toward the open side, in a setting from their world (a bright workspace, a caf\xE9 table, a softly blurred city) with shallow depth of field. Keep the upper-left half a calm, even field (a soft gradient, a clean wall, open sky) for the name and line; with no words, it stays a clean, breathing space. Facebook crops the edges on phones and its profile circle covers the lower-left corner, so keep the face and anything important inside the central 70% and away from the lower-left. Smart-casual clothes, soft natural light, one brand colour as an accent. No collage, icons, arrows, logos or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "Ch\u1EEBa ch\u1ED7 ch\u1EEF r\u1ED9ng h\u01A1n",\n      "en": "More room for the words"\n    },\n    {\n      "vi": "B\u1ED1i c\u1EA3nh \u0111\xFAng ngh\u1EC1 h\u01A1n",\n      "en": "A setting closer to my work"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 702\n}\n', "image-recipe-figure-3d": `{
  "key": "figure-3d",
  "group": "portrait",
  "name": {
    "vi": "M\xF4 h\xECnh 3D c\u1EE7a b\u1EA1n",
    "en": "You as a 3D figure"
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
      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",
      "en": "Clear face, good light. Two or three photos of the same person look more like you."
    }
  },
  "output": {
    "purpose": {
      "vi": "\u1EA2nh vui b\u1EAFt trend: ch\xEDnh b\u1EA1n th\xE0nh m\xF4 h\xECnh s\u01B0u t\u1EA7m, khoe ngh\u1EC1 qua ph\u1EE5 ki\u1EC7n.",
      "en": "A fun trend shot: you as a collectible figure, your trade shown through its props."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: m\xF4 h\xECnh 1/7 c\u1EE7a b\u1EA1n tr\xEAn b\xE0n l\xE0m vi\u1EC7c, c\u1EA1nh h\u1ED9p s\u01B0u t\u1EA7m.",
      "en": "A portrait 4:5 image: a 1/7-scale figure of you on a desk beside its collector's box."
    },
    "channels": {
      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",
      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."
    }
  },
  "fields": [
    {
      "key": "props",
      "type": "text",
      "label": {
        "vi": "Ph\u1EE5 ki\u1EC7n ngh\u1EC1",
        "en": "Trade props"
      },
      "placeholder": {
        "vi": "VD: laptop, ly c\xE0 ph\xEA",
        "en": "E.g. laptop, coffee cup"
      },
      "required": false,
      "options": [
        {
          "vi": "Laptop v\xE0 ly c\xE0 ph\xEA",
          "en": "Laptop and coffee"
        },
        {
          "vi": "S\u1EA3n ph\u1EA9m c\u1EE7a shop",
          "en": "The shop's products"
        },
        {
          "vi": "Micro v\xE0 s\u1ED5 tay",
          "en": "Microphone and notebook"
        },
        {
          "vi": "M\xE1y \u1EA3nh",
          "en": "Camera"
        },
        {
          "vi": "D\u1EE5ng c\u1EE5 l\xE0m b\xE1nh",
          "en": "Baking tools"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "A photorealistic photo of a 1/7-scale painted PVC collectible figure of the person, full body, on a round clear acrylic base on a real wooden desk. The figure keeps the person's face, hairstyle, glasses and outfit from the photo, in a realistic (not chibi) sculpt with fine paint detail. The props are small sculpted pieces at its feet or in its hands; if none were chosen, pick ones that fit the brand. Behind it, a monitor showing the figure's 3D sculpt in a modelling app and a premium collector's box with the figure's artwork. Soft daylight, shallow depth of field. No words, brand names or logos on the box, base or screen.",
  "fixes": [
    {
      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",
      "en": "Look more like me"
    },
    {
      "vi": "Chi ti\u1EBFt m\xF4 h\xECnh r\xF5 h\u01A1n",
      "en": "More figure detail"
    },
    {
      "vi": "\u0110\u1ED5i ph\u1EE5 ki\u1EC7n",
      "en": "Different props"
    },
    {
      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",
      "en": "Warmer light"
    }
  ],
  "order": 810
}
`, "image-recipe-freeship": '{\n  "key": "freeship",\n  "group": "close",\n  "name": {\n    "vi": "Freeship",\n    "en": "Free shipping"\n  },\n  "icon": "truck",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh s\u1EA3n ph\u1EA9m n\u1EBFu mu\u1ED1n n\xF3 xu\u1EA5t hi\u1EC7n trong \u1EA3nh.",\n      "en": "Add a product photo if it should appear in the image."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o mi\u1EC5n ph\xED giao h\xE0ng \u0111\u1EC3 kh\xE1ch ch\u1ED1t \u0111\u01A1n nhanh h\u01A1n.",\n      "en": "Announce free shipping so buyers order sooner."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: ch\u1EEF FREESHIP th\u1EADt l\u1EDBn, m\u1EE9c \u0111\u01A1n t\u1ED1i thi\u1EC3u v\xE0 th\u1EDDi gian \xE1p d\u1EE5ng n\u1EBFu c\xF3.",\n      "en": "A square image: a big FREESHIP, plus the minimum order and the period if given."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh b\xECa shop.",\n      "en": "Facebook and Zalo posts, shop cover."\n    }\n  },\n  "fields": [\n    {\n      "key": "minOrder",\n      "type": "price",\n      "label": {\n        "vi": "\u0110\u01A1n t\u1ED1i thi\u1EC3u",\n        "en": "Minimum order"\n      },\n      "placeholder": {\n        "vi": "VD: 199000",\n        "en": "E.g. 199000"\n      },\n      "required": false\n    },\n    {\n      "key": "period",\n      "type": "text",\n      "label": {\n        "vi": "Th\u1EDDi gian",\n        "en": "Period"\n      },\n      "placeholder": {\n        "vi": "VD: C\u1EA3 tu\u1EA7n n\xE0y",\n        "en": "E.g. All this week"\n      },\n      "required": false,\n      "options": [\n        { "vi": "Ch\u1EC9 h\xF4m nay", "en": "Today only" },\n        { "vi": "Cu\u1ED1i tu\u1EA7n n\xE0y", "en": "This weekend" },\n        { "vi": "C\u1EA3 tu\u1EA7n n\xE0y", "en": "All this week" },\n        { "vi": "C\u1EA3 th\xE1ng n\xE0y", "en": "All this month" },\n        { "vi": "To\xE0n qu\u1ED1c", "en": "Nationwide" },\n        { "vi": "N\u1ED9i th\xE0nh", "en": "Within the city" }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "FREESHIP",\n    "lines": [\n      "Cho \u0111\u01A1n t\u1EEB {{minOrder}}",\n      "{{period}}"\n    ]\n  },\n  "designNotes": "A friendly, locally believable delivery scene: kraft parcel boxes, or a Vietnamese delivery motorbike with a cargo box (not an American truck), as a clean 3D or semi-flat illustration in the lower part of the frame. If a product photo is given, show it exactly as given as the parcel contents peeking out of an open box. Keep the upper 45% a bright, flat or gently graded field for FREESHIP, the minimum order and the period. Cheerful palette: the brand colour plus a fresh blue-teal or yellow accent that contrasts with marketplace orange; at most three colours. Sparing motion lines. No platform logos, courier branding, road signs, text, numbers or a cluttered map.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 302\n}\n', "image-recipe-giveaway": '{\n  "key": "giveaway",\n  "group": "attract",\n  "name": {\n    "vi": "Minigame / Giveaway",\n    "en": "Giveaway"\n  },\n  "icon": "giveaway",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh ph\u1EA7n qu\xE0",\n      "en": "Prize photo"\n    },\n    "hint": {\n      "vi": "\u1EA2nh r\xF5 m\xF3n qu\xE0 s\u1EBD t\u1EB7ng. Kh\xF4ng c\xF3 \u1EA3nh, Kallob v\u1EBD m\u1ED9t h\u1ED9p qu\xE0 \u0111\u1EB9p.",\n      "en": "A clear photo of the prize. Without one, Kallob draws a gift box."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o minigame t\u1EB7ng qu\xE0 \u0111\u1EC3 nhi\u1EC1u ng\u01B0\u1EDDi th\xEDch, b\xECnh lu\u1EADn, chia s\u1EBB v\xE0 bi\u1EBFt \u0111\u1EBFn shop.",\n      "en": "Announce a giveaway so more people like, comment, share and discover your shop."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng vui, r\u1ED9n r\xE0ng: ph\u1EA7n qu\xE0 n\u1ED5i b\u1EADt, ch\u1EEF MINIGAME, qu\xE0 t\u1EB7ng, c\xE1ch tham gia v\xE0 ng\xE0y k\u1EBFt th\xFAc.",\n      "en": "A fun, lively square image: the prize up front, MINIGAME, the prize, how to join and the end date."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, Instagram, TikTok.",\n      "en": "Facebook, Zalo, Instagram and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "prize",\n      "type": "text",\n      "label": {\n        "vi": "Ph\u1EA7n qu\xE0",\n        "en": "Prize"\n      },\n      "placeholder": {\n        "vi": "VD: 3 chai serum 30ml",\n        "en": "E.g. 3 bottles of serum, 30 ml"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "1 s\u1EA3n ph\u1EA9m b\u1EA5t k\u1EF3 c\u1EE7a shop",\n          "en": "Any one product from the shop"\n        },\n        {\n          "vi": "Voucher 200.000\u0111",\n          "en": "A 200,000\u0111 voucher"\n        },\n        {\n          "vi": "Combo s\u1EA3n ph\u1EA9m b\xE1n ch\u1EA1y",\n          "en": "A best-seller bundle"\n        },\n        {\n          "vi": "Freeship c\u1EA3 th\xE1ng",\n          "en": "Free shipping for a month"\n        }\n      ]\n    },\n    {\n      "key": "how",\n      "type": "text",\n      "label": {\n        "vi": "C\xE1ch tham gia",\n        "en": "How to join"\n      },\n      "placeholder": {\n        "vi": "VD: Like + b\xECnh lu\u1EADn + chia s\u1EBB",\n        "en": "E.g. Like + comment + share"\n      },\n      "options": [\n        {\n          "vi": "Like + b\xECnh lu\u1EADn + chia s\u1EBB",\n          "en": "Like + comment + share"\n        },\n        {\n          "vi": "Tag 3 ng\u01B0\u1EDDi b\u1EA1n v\xE0o b\xECnh lu\u1EADn",\n          "en": "Tag 3 friends in the comments"\n        },\n        {\n          "vi": "Theo d\xF5i trang + b\xECnh lu\u1EADn",\n          "en": "Follow the page + comment"\n        },\n        {\n          "vi": "Chia s\u1EBB c\xF4ng khai b\xE0i vi\u1EBFt",\n          "en": "Share this post publicly"\n        },\n        {\n          "vi": "B\xECnh lu\u1EADn \u0111o\xE1n \u0111\xFAng \u0111\u1EC3 nh\u1EADn qu\xE0",\n          "en": "Comment the right guess to win"\n        }\n      ],\n      "default": "Like + b\xECnh lu\u1EADn + chia s\u1EBB"\n    },\n    {\n      "key": "endDate",\n      "type": "date",\n      "label": {\n        "vi": "Ng\xE0y k\u1EBFt th\xFAc",\n        "en": "End date"\n      }\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "MINIGAME",\n    "lines": [\n      "Qu\xE0: {{prize}}",\n      "{{how}}",\n      "K\u1EBFt th\xFAc {{endDate}}"\n    ]\n  },\n  "designNotes": "Festive and generous, so people want to join. With a prize photo, keep the prize exactly as given (shape, colour, label), large and centred in the upper 55\u201360%, raised on a small podium or open gift box with a soft glow behind it. With no photo, draw an elegant wrapped gift box with a ribbon in that spot, never an invented product. Light celebration around it: a few confetti pieces, streamers or balloons at the edges, kept off the prize. Keep the lower 40% calm and even in tone for MINIGAME, the prize, how to join and the end date. Bright, cheerful light; the brand colour with one warm accent (gold or coral), at most three colours. No text, numbers, prices, logos, social icons, trophies or crowds of extra products.",\n  "fixes": [\n    {\n      "vi": "Ph\u1EA7n qu\xE0 to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer prize"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 102\n}\n', "image-recipe-grand-opening": '{\n  "key": "grand-opening",\n  "group": "brand",\n  "name": {\n    "vi": "Khai tr\u01B0\u01A1ng",\n    "en": "Grand opening"\n  },\n  "icon": "store",\n  "size": "portrait",\n  "input": {\n    "kind": "shop",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh c\u1EEDa h\xE0ng",\n      "en": "Shop photo"\n    },\n    "hint": {\n      "vi": "\u1EA2nh m\u1EB7t ti\u1EC1n ho\u1EB7c b\xEAn trong c\u1EEDa h\xE0ng.",\n      "en": "The shopfront or the inside of the shop."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o ng\xE0y khai tr\u01B0\u01A1ng v\xE0 k\xE9o kh\xE1ch \u0111\u1EBFn ng\xE0y \u0111\u1EA7u.",\n      "en": "Announce the opening day and draw people in."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 kh\xF4ng kh\xED vui, sang: ch\u1EEF KHAI TR\u01AF\u01A0NG, ng\xE0y, \u0111\u1ECBa ch\u1EC9 v\xE0 \u01B0u \u0111\xE3i khai tr\u01B0\u01A1ng.",\n      "en": "A festive portrait 4:5 image: GRAND OPENING, the date, the address and the opening offer."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, in t\u1EDD r\u01A1i.",\n      "en": "Facebook and Zalo posts, flyers."\n    }\n  },\n  "fields": [\n    {\n      "key": "date",\n      "type": "date",\n      "label": {\n        "vi": "Ng\xE0y khai tr\u01B0\u01A1ng",\n        "en": "Opening day"\n      },\n      "placeholder": {\n        "vi": "",\n        "en": ""\n      },\n      "required": true\n    },\n    {\n      "key": "address",\n      "type": "text",\n      "label": {\n        "vi": "\u0110\u1ECBa ch\u1EC9",\n        "en": "Address"\n      },\n      "placeholder": {\n        "vi": "VD: 12 L\xEA L\u1EE3i, Q.1",\n        "en": "E.g. 12 Le Loi, District 1"\n      },\n      "required": true\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i khai tr\u01B0\u01A1ng",\n        "en": "Opening offer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 20% ba ng\xE0y \u0111\u1EA7u",\n        "en": "E.g. 20% off for three days"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 20% ba ng\xE0y \u0111\u1EA7u",\n          "en": "20% off for the first three days"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 cho 50 kh\xE1ch \u0111\u1EA7u ti\xEAn",\n          "en": "A gift for the first 50 customers"\n        },\n        {\n          "vi": "Mua 1 t\u1EB7ng 1 ng\xE0y khai tr\u01B0\u01A1ng",\n          "en": "Buy one, get one on opening day"\n        },\n        {\n          "vi": "Freeship tu\u1EA7n \u0111\u1EA7u",\n          "en": "Free shipping the first week"\n        },\n        {\n          "vi": "\u0110\u1ED3ng gi\xE1 99.000\u0111",\n          "en": "Everything 99.000\u0111"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "KHAI TR\u01AF\u01A0NG",\n    "lines": [\n      "{{date}} \xB7 {{address}}",\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "Celebratory and trustworthy. If a shop photo is given, keep the real storefront recognisable, brightened, in daylight or warm evening glow. Frame it with Vietnamese opening cues: tall l\u1EB5ng hoa khai tr\u01B0\u01A1ng at the sides, red ribbon, balloons, or a soft m\xFAa l\xE2n accent in the background; with no photo, compose these cues around an empty centre. Keep the lower 35\u201340% calm for the date, address and opening offer. Red-gold for a traditional feel, or the brand colours for a modern shop. Never invent signage, a shop name or text on ribbons.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 706\n}\n', "image-recipe-highlights": `{
  "key": "highlights",
  "group": "trust",
  "name": {
    "vi": "\u0110i\u1EC3m n\u1ED5i b\u1EADt s\u1EA3n ph\u1EA9m",
    "en": "Product highlights"
  },
  "icon": "star",
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
      "vi": "N\xF3i nhanh v\xEC sao s\u1EA3n ph\u1EA9m \u0111\xE1ng mua, \u0111\u1EC3 kh\xE1ch \u0111ang ph\xE2n v\xE2n y\xEAn t\xE2m ch\u1ECDn.",
      "en": "Say at a glance why the product is worth buying, so hesitant buyers choose it."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n n\u1ED5i b\u1EADt, k\xE8m t\u1ED1i \u0111a 3 \u0111i\u1EC3m m\u1EA1nh d\u1EC5 \u0111\u1ECDc.",
      "en": "A portrait 4:5 image: your product up front with up to three easy-to-read selling points."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh s\u1EA3n ph\u1EA9m Shopee, g\u1EEDi kh\xE1ch trong tin nh\u1EAFn.",
      "en": "Facebook and Zalo posts, Shopee product images, chat replies."
    }
  },
  "fields": [
    {
      "key": "points",
      "type": "longtext",
      "label": {
        "vi": "\u0110i\u1EC3m n\u1ED5i b\u1EADt (m\u1ED7i d\xF2ng m\u1ED9t \xFD)",
        "en": "Selling points (one per line)"
      },
      "placeholder": {
        "vi": "VD:\\nCotton 100%, m\u1EB7c m\xE1t c\u1EA3 ng\xE0y\\nKh\xF4ng nh\u0103n sau khi gi\u1EB7t\\n\u0110\u1ED5i size mi\u1EC5n ph\xED 7 ng\xE0y",
        "en": "E.g.\\n100% cotton, cool all day\\nNo wrinkles after washing\\nFree size exchange for 7 days"
      },
      "required": true
    }
  ],
  "overlay": {
    "layout": "list",
    "zone": "bottom",
    "title": "\u0110I\u1EC2M N\u1ED4I B\u1EACT",
    "items": "{{points}}"
  },
  "designNotes": "One hero product, fully visible and accurate, in the upper 55\u201360% of the frame, centred or slightly off-centre, filling about half of that area, on a clean surface with a soft shadow. Keep the lower 40% calm and even in tone (a smooth gradient or plain surface) for a panel of up to three selling points. Bright, even light so materials and colours look true. A light neutral backdrop with one accent built from the brand colour; at most three colours. At most one small prop that hints at the product's use, never another product. No icons, ticks, callout lines, badges, text, numbers or claims drawn into the picture; the words come only from the founder.",
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
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 203
}
`, "image-recipe-hiring": `{
  "key": "hiring",
  "group": "brand",
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
      "required": true,
      "options": [
        {
          "vi": "Nh\xE2n vi\xEAn b\xE1n h\xE0ng",
          "en": "Sales assistant"
        },
        {
          "vi": "Nh\xE2n vi\xEAn ph\u1EE5c v\u1EE5",
          "en": "Waiter / waitress"
        },
        {
          "vi": "Nh\xE2n vi\xEAn pha ch\u1EBF",
          "en": "Barista"
        },
        {
          "vi": "Nh\xE2n vi\xEAn \u0111\xF3ng g\xF3i",
          "en": "Packer"
        },
        {
          "vi": "Nh\xE2n vi\xEAn livestream",
          "en": "Livestream host"
        },
        {
          "vi": "C\u1ED9ng t\xE1c vi\xEAn b\xE1n online",
          "en": "Online sales partner"
        },
        {
          "vi": "Nh\xE2n vi\xEAn ch\u0103m s\xF3c kh\xE1ch h\xE0ng",
          "en": "Customer care"
        }
      ]
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
      },
      "required": false,
      "options": [
        {
          "vi": "L\u01B0\u01A1ng tho\u1EA3 thu\u1EADn",
          "en": "Pay negotiable"
        },
        {
          "vi": "L\u01B0\u01A1ng c\u1EE9ng + th\u01B0\u1EDFng doanh s\u1ED1",
          "en": "Base pay + sales bonus"
        },
        {
          "vi": "Theo gi\u1EDD, tr\u1EA3 l\u01B0\u01A1ng h\xE0ng tu\u1EA7n",
          "en": "Hourly, paid weekly"
        },
        {
          "vi": "Hoa h\u1ED3ng theo \u0111\u01A1n",
          "en": "Commission per order"
        }
      ]
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
  "order": 708
}
`, "image-recipe-holiday-hours": '{\n  "key": "holiday-hours",\n  "group": "brand",\n  "name": {\n    "vi": "L\u1ECBch ngh\u1EC9 l\u1EC5",\n    "en": "Holiday closing"\n  },\n  "icon": "calendar",\n  "size": "square",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh shop, s\u1EA3n ph\u1EA9m ho\u1EB7c logo",\n      "en": "Shop, product or logo photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh m\u1EB7t ti\u1EC1n, qu\u1EA7y h\xE0ng hay s\u1EA3n ph\u1EA9m \u0111\u1EC3 th\xF4ng b\xE1o mang \u0111\xFAng d\u1EA5u \u1EA5n shop b\u1EA1n.",\n      "en": "Add your shopfront, counter or a product so the notice looks like your shop."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o kh\xE1ch l\u1ECBch ngh\u1EC9 \u0111\u1EC3 kh\xF4ng ai \u0111\u1EB7t h\xE0ng r\u1ED3i ch\u1EDD.",\n      "en": "Tell customers when you are closed."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng g\u1ECDn g\xE0ng: TH\xD4NG B\xC1O L\u1ECACH NGH\u1EC8, ngh\u1EC9 t\u1EEB ng\xE0y n\xE0o \u0111\u1EBFn ng\xE0y n\xE0o, ng\xE0y l\xE0m l\u1EA1i.",\n      "en": "A tidy square image: CLOSING NOTICE, closed from and to, back on."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, \u1EA3nh ghim \u0111\u1EA7u trang.",\n      "en": "Facebook and Zalo posts, pinned image."\n    }\n  },\n  "fields": [\n    {\n      "key": "from",\n      "type": "date",\n      "label": {\n        "vi": "Ngh\u1EC9 t\u1EEB",\n        "en": "Closed from"\n      },\n      "placeholder": {\n        "vi": "",\n        "en": ""\n      },\n      "required": true\n    },\n    {\n      "key": "to",\n      "type": "date",\n      "label": {\n        "vi": "\u0110\u1EBFn h\u1EBFt",\n        "en": "Until"\n      },\n      "placeholder": {\n        "vi": "",\n        "en": ""\n      },\n      "required": true\n    },\n    {\n      "key": "reason",\n      "type": "text",\n      "label": {\n        "vi": "D\u1ECBp",\n        "en": "Occasion"\n      },\n      "placeholder": {\n        "vi": "VD: T\u1EBFt Nguy\xEAn \u0110\xE1n",\n        "en": "E.g. Lunar New Year"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Ngh\u1EC9 T\u1EBFt Nguy\xEAn \u0110\xE1n",\n          "en": "Lunar New Year break"\n        },\n        {\n          "vi": "Ngh\u1EC9 l\u1EC5 30/4 \u2013 1/5",\n          "en": "30/4 \u2013 1/5 holiday"\n        },\n        {\n          "vi": "Ngh\u1EC9 l\u1EC5 Qu\u1ED1c kh\xE1nh 2/9",\n          "en": "National Day holiday"\n        },\n        {\n          "vi": "Ngh\u1EC9 T\u1EBFt D\u01B0\u01A1ng l\u1ECBch",\n          "en": "New Year break"\n        },\n        {\n          "vi": "Ngh\u1EC9 Gi\u1ED7 T\u1ED5 H\xF9ng V\u01B0\u01A1ng",\n          "en": "Hung Kings holiday"\n        },\n        {\n          "vi": "Shop ngh\u1EC9 ph\xE9p",\n          "en": "Shop on leave"\n        },\n        {\n          "vi": "S\u1EEDa sang c\u1EEDa h\xE0ng",\n          "en": "Shop renovation"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "center",\n    "title": "TH\xD4NG B\xC1O L\u1ECACH NGH\u1EC8",\n    "lines": [\n      "{{reason}}",\n      "Ngh\u1EC9 t\u1EEB {{from}} \u0111\u1EBFn h\u1EBFt {{to}}"\n    ]\n  },\n  "designNotes": "Calm, warm and polite: a notice, not an ad. Leave the central 55\u201360% a clean, paper-textured or soft-gradient panel area for the dates. If a shop photo is given, show the real place softly behind (shutters down or a quiet, tidy counter, gentle evening light), still recognisable but calm and slightly blurred so the dates read first. If a product or logo is given, place it small near a lower corner, never in the centre. Seasonal decoration only in the top band and corners, by occasion: for T\u1EBFt a branch of hoa mai (South) or hoa \u0111\xE0o (North) and l\xEC x\xEC envelopes; for 30/4\u20131/5, 2/9 or Gi\u1ED7 T\u1ED5 restrained red-gold bunting and a lotus; for leave or renovation, or when empty, a simple leafy plant and the brand colour. Never draw calendars, digits, Chinese characters or couplet text.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 707\n}\n', "image-recipe-how-to-order": '{\n  "key": "how-to-order",\n  "group": "close",\n  "name": {\n    "vi": "C\xE1ch \u0111\u1EB7t h\xE0ng",\n    "en": "How to order"\n  },\n  "icon": "steps",\n  "size": "portrait",\n  "input": null,\n  "output": {\n    "purpose": {\n      "vi": "Ch\u1EC9 kh\xE1ch 3 b\u01B0\u1EDBc \u0111\u1EB7t h\xE0ng th\u1EADt d\u1EC5, g\u1EEDi khi kh\xE1ch h\u1ECFi \\"\u0111\u1EB7t sao shop?\\".",\n      "en": "Show buyers three easy steps to order, sent when they ask how to buy."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: ti\xEAu \u0111\u1EC1 C\xC1CH \u0110\u1EB6T H\xC0NG v\xE0 3 b\u01B0\u1EDBc ng\u1EAFn g\u1ECDn, d\u1EC5 l\xE0m theo.",\n      "en": "A portrait 4:5 image: HOW TO ORDER and three short, easy steps."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, b\xE0i ghim Facebook, \u1EA3nh b\xECa shop.",\n      "en": "Zalo and Messenger chats, pinned Facebook posts, shop cover."\n    }\n  },\n  "fields": [\n    {\n      "key": "steps",\n      "type": "longtext",\n      "label": {\n        "vi": "C\xE1c b\u01B0\u1EDBc (m\u1ED7i d\xF2ng m\u1ED9t b\u01B0\u1EDBc)",\n        "en": "Steps (one per line)"\n      },\n      "placeholder": {\n        "vi": "VD: 1. Nh\u1EAFn tin t\xEAn s\u1EA3n ph\u1EA9m + size\\n2. G\u1EEDi \u0111\u1ECBa ch\u1EC9, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i\\n3. Nh\u1EADn h\xE0ng, ki\u1EC3m tra r\u1ED3i thanh to\xE1n",\n        "en": "E.g. 1. Message the product name + size\\n2. Send your address and phone number\\n3. Receive, check, then pay"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "1. Nh\u1EAFn tin t\xEAn s\u1EA3n ph\u1EA9m + size\\n2. G\u1EEDi \u0111\u1ECBa ch\u1EC9, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i\\n3. Nh\u1EADn h\xE0ng, ki\u1EC3m tra r\u1ED3i thanh to\xE1n",\n          "en": "1. Message the product name + size\\n2. Send your address and phone number\\n3. Receive, check, then pay"\n        },\n        {\n          "vi": "1. Ch\u1ECDn m\xF3n, nh\u1EAFn Zalo cho shop\\n2. H\u1EB9n gi\u1EDD nh\u1EADn ho\u1EB7c giao t\u1EADn n\u01A1i\\n3. Nh\u1EADn h\xE0ng, thanh to\xE1n khi nh\u1EADn",\n          "en": "1. Pick your items, message us on Zalo\\n2. Choose a pickup or delivery time\\n3. Pay when you receive it"\n        },\n        {\n          "vi": "1. B\u1EA5m link s\u1EA3n ph\u1EA9m tr\xEAn Shopee\\n2. Ch\u1ECDn ph\xE2n lo\u1EA1i, b\u1EA5m Mua ngay\\n3. Ch\u1EDD shop \u0111\xF3ng g\xF3i v\xE0 giao",\n          "en": "1. Tap the product link on Shopee\\n2. Pick the variant, tap Buy now\\n3. Wait for us to pack and ship"\n        }\n      ],\n      "default": "1. Nh\u1EAFn tin t\xEAn s\u1EA3n ph\u1EA9m + size\\n2. G\u1EEDi \u0111\u1ECBa ch\u1EC9, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i\\n3. Nh\u1EADn h\xE0ng, ki\u1EC3m tra r\u1ED3i thanh to\xE1n"\n    }\n  ],\n  "overlay": {\n    "layout": "list",\n    "zone": "center",\n    "title": "C\xC1CH \u0110\u1EB6T H\xC0NG",\n    "items": "{{steps}}"\n  },\n  "designNotes": "A friendly, tidy backdrop that says shopping is easy. Build it from simple, semi-flat or soft 3D cues placed only around the edges and corners: a smartphone with a blank chat screen, a kraft parcel, a small delivery motorbike, a hand receiving a box, a soft dotted path linking them. Keep the centre 60\u201365% a calm, flat, even area for the steps panel. Light, clean ground with the brand colour as the main accent plus one fresh secondary, at most three colours. No text, numbers, step badges, chat bubbles with words, bank details, account numbers, QR codes, app or courier logos.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "Vui t\u01B0\u01A1i, d\u1EC5 th\u01B0\u01A1ng h\u01A1n",\n      "en": "More playful and friendly"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 307\n}\n', "image-recipe-how-to-use": `{
  "key": "how-to-use",
  "group": "care",
  "name": {
    "vi": "H\u01B0\u1EDBng d\u1EABn s\u1EED d\u1EE5ng / b\u1EA3o qu\u1EA3n",
    "en": "How to use & care"
  },
  "icon": "steps",
  "size": "portrait",
  "input": {
    "kind": "product",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",
      "en": "Product photo"
    },
    "hint": {
      "vi": "\u1EA2nh r\xF5 s\u1EA3n ph\u1EA9m \u0111\u1EC3 kh\xE1ch nh\u1EADn ra ngay \u0111\xE2y l\xE0 m\xF3n c\u1EE7a h\u1ECD.",
      "en": "A clear product photo so the buyer recognises their item."
    }
  },
  "output": {
    "purpose": {
      "vi": "Ch\u1EC9 kh\xE1ch d\xF9ng v\xE0 gi\u1EEF s\u1EA3n ph\u1EA9m \u0111\xFAng c\xE1ch, \xEDt h\u1ECFi l\u1EA1i, \xEDt \u0111\u1ED5i tr\u1EA3.",
      "en": "Show buyers how to use and care for the product, so fewer questions and returns."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: s\u1EA3n ph\u1EA9m ph\xEDa tr\xEAn, ti\xEAu \u0111\u1EC1 v\xE0 t\u1EEBng b\u01B0\u1EDBc r\xF5 r\xE0ng b\xEAn d\u01B0\u1EDBi.",
      "en": "A portrait 4:5 image: the product on top, a title and each step clearly listed below."
    },
    "channels": {
      "vi": "Tin nh\u1EAFn Zalo, Messenger, in k\xE8m \u0111\u01A1n h\xE0ng, \u1EA3nh s\u1EA3n ph\u1EA9m Shopee.",
      "en": "Zalo and Messenger chats, printed into the parcel, Shopee product images."
    }
  },
  "fields": [
    {
      "key": "steps",
      "type": "longtext",
      "label": {
        "vi": "C\xE1c b\u01B0\u1EDBc (m\u1ED7i d\xF2ng m\u1ED9t b\u01B0\u1EDBc)",
        "en": "Steps (one per line)"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EB7t tay b\u1EB1ng n\u01B0\u1EDBc l\u1EA1nh\\nKh\xF4ng d\xF9ng thu\u1ED1c t\u1EA9y\\nPh\u01A1i trong b\xF3ng r\xE2m",
        "en": "E.g. Hand wash in cold water\\nNo bleach\\nDry in the shade"
      },
      "required": true
    },
    {
      "key": "heading",
      "type": "text",
      "label": {
        "vi": "Ti\xEAu \u0111\u1EC1",
        "en": "Title"
      },
      "placeholder": {
        "vi": "VD: H\u01AF\u1EDANG D\u1EAAN S\u1EEC D\u1EE4NG",
        "en": "E.g. HOW TO USE"
      },
      "required": false,
      "options": [
        {
          "vi": "H\u01AF\u1EDANG D\u1EAAN S\u1EEC D\u1EE4NG",
          "en": "HOW TO USE"
        },
        {
          "vi": "C\xC1CH B\u1EA2O QU\u1EA2N",
          "en": "HOW TO CARE"
        },
        {
          "vi": "C\xC1CH GI\u1EB6T \u1EE6I",
          "en": "WASH & IRON"
        },
        {
          "vi": "C\xC1CH PHA",
          "en": "HOW TO BREW"
        },
        {
          "vi": "L\u01AFU \xDD KHI D\xD9NG",
          "en": "GOOD TO KNOW"
        }
      ],
      "default": "H\u01AF\u1EDANG D\u1EAAN S\u1EEC D\u1EE4NG"
    }
  ],
  "overlay": {
    "layout": "list",
    "zone": "bottom",
    "title": "{{heading}}",
    "items": "{{steps}}"
  },
  "designNotes": "Clear and helpful, like a tidy instruction card. If a product photo is given, keep the product exactly as it is, fully visible, in the upper 40% of the frame, centred, on a clean matte surface with a soft shadow. With no photo, use a simple, fitting still life from the product's world (folded fabric, a cup, a bathroom shelf) in that upper area. Keep the lower 55\u201360% calm, plain and even in tone for the title and a list of up to eight steps. Bright, even light; a light neutral background with one soft accent from the brand colour; at most three colours. No text, numbers, icons, arrows, hands demonstrating, extra products or invented features.",
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
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 401
}
`, "image-recipe-korean-studio": '{\n  "key": "korean-studio",\n  "group": "portrait",\n  "name": {\n    "vi": "Ch\xE2n dung studio H\xE0n Qu\u1ED1c",\n    "en": "Korean studio portrait"\n  },\n  "icon": "camera",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh studio ki\u1EC3u H\xE0n trong tr\u1EBBo, nh\u1EB9 nh\xE0ng, h\u1EE3p \u1EA3nh \u0111\u1EA1i di\u1EC7n, h\u1ED3 s\u01A1 v\xE0 trang gi\u1EDBi thi\u1EC7u.",\n      "en": "A clear, gentle Korean-style studio portrait for your profile, CV or about page."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n tr\xEAn n\u1EC1n m\xE0u pastel tr\u01A1n, \xE1nh s\xE1ng m\u1EC1m ki\u1EC3u studio H\xE0n, gi\u1EEF nguy\xEAn g\u01B0\u01A1ng m\u1EB7t.",\n      "en": "A portrait 4:5 image: you on a plain pastel backdrop in soft Korean studio light, your face unchanged."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "backdrop",\n      "type": "text",\n      "label": {\n        "vi": "M\xE0u n\u1EC1n",\n        "en": "Backdrop"\n      },\n      "placeholder": {\n        "vi": "VD: Kem",\n        "en": "E.g. Cream"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Kem",\n          "en": "Cream"\n        },\n        {\n          "vi": "H\u1ED3ng ph\u1EA5n",\n          "en": "Powder pink"\n        },\n        {\n          "vi": "Xanh pastel",\n          "en": "Pastel blue"\n        },\n        {\n          "vi": "X\xE1m nh\u1EA1t",\n          "en": "Light grey"\n        },\n        {\n          "vi": "Xanh b\u01A1",\n          "en": "Sage green"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. The clean Korean photo-studio look: chest-up or head-and-shoulders, centred, facing the camera with a soft, friendly expression. A seamless plain backdrop in one pastel colour, large soft frontal light with a clamshell fill, bright catchlights, even and airy exposure, gentle skin glow while keeping real texture. Neat hair, simple clothes in a solid colour (a white shirt, a knit, a blazer) that complements the backdrop. No props, patterns, filters that change the face, or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "S\xE1ng v\xE0 trong h\u01A1n",\n      "en": "Brighter, clearer"\n    },\n    {\n      "vi": "\u0110\u1ED5i m\xE0u n\u1EC1n",\n      "en": "Different backdrop colour"\n    },\n    {\n      "vi": "C\u01B0\u1EDDi t\u01B0\u01A1i h\u01A1n",\n      "en": "A warmer smile"\n    }\n  ],\n  "order": 803\n}\n', "image-recipe-livestream": '{\n  "key": "livestream",\n  "group": "attract",\n  "name": {\n    "vi": "B\xE1o livestream",\n    "en": "Livestream notice"\n  },\n  "icon": "live",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh b\u1EA1n ho\u1EB7c s\u1EA3n ph\u1EA9m",\n      "en": "You or your product"\n    },\n    "hint": {\n      "vi": "\u1EA2nh ng\u01B0\u1EDDi s\u1EBD live ho\u1EB7c s\u1EA3n ph\u1EA9m s\u1EBD b\xE1n trong bu\u1ED5i live.",\n      "en": "A photo of the host or of a product you will sell on the live."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o tr\u01B0\u1EDBc gi\u1EDD livestream \u0111\u1EC3 kh\xE1ch h\u1EB9n gi\u1EDD v\xE0o xem v\xE0 mua.",\n      "en": "Announce your live session so people set a reminder, watch and buy."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: kh\xF4ng kh\xED livestream, ch\u1EEF LIVESTREAM, gi\u1EDD live v\xE0 \u0111i\u1EC1u \u0111\u1EB7c bi\u1EC7t trong bu\u1ED5i live.",\n      "en": "A portrait 4:5 image: a live-show mood, LIVESTREAM, the time and what is special on the live."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, TikTok, Shopee Live.",\n      "en": "Facebook and Zalo posts, stories, TikTok, Shopee Live."\n    }\n  },\n  "fields": [\n    {\n      "key": "time",\n      "type": "text",\n      "label": {\n        "vi": "Gi\u1EDD live",\n        "en": "Live time"\n      },\n      "placeholder": {\n        "vi": "VD: 20h t\u1ED1i th\u1EE9 S\xE1u 17/10",\n        "en": "E.g. 8 pm Friday 17/10"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "20h t\u1ED1i nay",\n          "en": "8 pm tonight"\n        },\n        {\n          "vi": "21h t\u1ED1i nay",\n          "en": "9 pm tonight"\n        },\n        {\n          "vi": "12h tr\u01B0a nay",\n          "en": "Noon today"\n        },\n        {\n          "vi": "20h t\u1ED1i mai",\n          "en": "8 pm tomorrow"\n        }\n      ]\n    },\n    {\n      "key": "highlight",\n      "type": "text",\n      "label": {\n        "vi": "Trong bu\u1ED5i live c\xF3 g\xEC",\n        "en": "What is on"\n      },\n      "placeholder": {\n        "vi": "VD: X\u1EA3 kho gi\xE1 s\u1ED1c",\n        "en": "E.g. Clearance at shock prices"\n      },\n      "options": [\n        {\n          "vi": "X\u1EA3 kho gi\xE1 s\u1ED1c",\n          "en": "Clearance at shock prices"\n        },\n        {\n          "vi": "M\u1EDF h\xE0ng m\u1EDBi v\u1EC1",\n          "en": "Unboxing new arrivals"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 cho ng\u01B0\u1EDDi xem",\n          "en": "Gifts for viewers"\n        },\n        {\n          "vi": "Flash sale ch\u1EC9 c\xF3 trong live",\n          "en": "Live-only flash sale"\n        },\n        {\n          "vi": "Gi\u1EA3i \u0111\xE1p m\u1ECDi th\u1EAFc m\u1EAFc",\n          "en": "All your questions answered"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "LIVESTREAM",\n    "lines": [\n      "{{time}}",\n      "{{highlight}}"\n    ]\n  },\n  "designNotes": "Feel like a live show about to start. With a photo of the host, keep the face, hair and clothes exactly as given, chest-up in the upper 60%, smiling toward the camera in a tidy live-selling corner: a ring light glow, a phone on a tripod at the edge, a softly blurred rack or shelf of goods behind. With a product photo, keep the product exactly as given on a small lit stage with the same live-set cues. With no photo, show that live set empty and inviting. Keep the lower 35\u201340% calm for LIVESTREAM, the time and what is on. Energetic but clean: the brand colour with one hot accent (red or magenta for live), at most three colours. No text, LIVE badges, viewer counts, hearts, comments, platform logos or screen UI.",\n  "fixes": [\n    {\n      "vi": "Ng\u01B0\u1EDDi ho\u1EB7c s\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer host or product"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 104\n}\n', "image-recipe-long-holiday": '{\n  "key": "long-holiday",\n  "group": "season",\n  "name": {\n    "vi": "L\u1EC5 d\xE0i ng\xE0y",\n    "en": "Long holiday"\n  },\n  "icon": "flag",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",\n      "en": "Your product, shop or you"\n    },\n    "hint": {\n      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c \u1EA3nh c\u1EE7a b\u1EA1n n\u1EBFu mu\u1ED1n xu\u1EA5t hi\u1EC7n trong \u1EA3nh l\u1EC5.",\n      "en": "Add a product, your shop or yourself to appear in the holiday image."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc m\u1EEBng d\u1ECBp l\u1EC5 30/4 \u2013 1/5 ho\u1EB7c Qu\u1ED1c kh\xE1nh 2/9 v\xE0 b\xE1o \u01B0u \u0111\xE3i l\u1EC5.",\n      "en": "Mark the 30/4 \u2013 1/5 or 2/9 National Day holiday and announce a holiday offer."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 \u0111\u1ECF v\xE0ng trang tr\u1ECDng, vui t\u01B0\u01A1i: l\u1EDDi ch\xFAc ho\u1EB7c t\xEAn \u0111\u1EE3t sale l\u1EC5, \u01B0u \u0111\xE3i n\u1EBFu c\xF3 v\xE0 t\xEAn shop.",\n      "en": "A portrait 4:5 image in festive red and gold: your greeting or holiday sale name, an offer if any and your shop name."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, Shopee.",\n      "en": "Facebook and Zalo posts, stories, Shopee."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc ho\u1EB7c t\xEAn \u0111\u1EE3t sale",\n        "en": "Greeting or sale name"\n      },\n      "placeholder": {\n        "vi": "VD: M\u1EEBng \u0110\u1EA1i l\u1EC5 30/4 \u2013 1/5",\n        "en": "E.g. Celebrating 30/4 \u2013 1/5"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "K\u1EF3 Ngh\u1EC9 L\u1EC5 Vui V\u1EBB",\n          "en": "Happy holidays"\n        },\n        {\n          "vi": "M\u1EEBng \u0110\u1EA1i L\u1EC5 30/4 \u2013 1/5",\n          "en": "Celebrating 30/4 \u2013 1/5"\n        },\n        {\n          "vi": "Ch\xE0o M\u1EEBng Qu\u1ED1c Kh\xE1nh 2/9",\n          "en": "Happy National Day, 2 September"\n        },\n        {\n          "vi": "Sale L\u1EC5 30/4 \u2013 1/5",\n          "en": "30/4 \u2013 1/5 holiday sale"\n        },\n        {\n          "vi": "Sale Qu\u1ED1c Kh\xE1nh 2/9",\n          "en": "National Day sale, 2 September"\n        }\n      ],\n      "default": "K\u1EF3 Ngh\u1EC9 L\u1EC5 Vui V\u1EBB"\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 30% su\u1ED1t k\u1EF3 ngh\u1EC9 l\u1EC5",\n        "en": "E.g. 30% off all holiday long"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 30% su\u1ED1t k\u1EF3 ngh\u1EC9 l\u1EC5",\n          "en": "30% off all holiday long"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n trong d\u1ECBp l\u1EC5",\n          "en": "Free shipping over the holiday"\n        },\n        {\n          "vi": "Mua 2 t\u1EB7ng 1",\n          "en": "Buy 2, get 1 free"\n        },\n        {\n          "vi": "\u0110\u1ED3ng gi\xE1 99k",\n          "en": "Everything 99k"\n        },\n        {\n          "vi": "Shop v\u1EABn m\u1EDF c\u1EEDa xuy\xEAn l\u1EC5",\n          "en": "We stay open through the holiday"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}",\n    "lines": [\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "Festive, proud and respectful. Keep the upper 35% a calm deep red or warm gold gradient for the headline and an optional offer line. Below, the product, shop or person framed by lotus flowers, warm sunlight and a soft skyline of a Vietnamese landmark (H\u1ED3 G\u01B0\u01A1m with Th\xE1p R\xF9a, Ch\xF9a M\u1ED9t C\u1ED9t, H\u1ED9i An lanterns, H\u1EA1 Long Bay) or holiday travel cues (beach, straw hat, suitcase). Read the headline: for 2/9 lean civic and dignified; for 30/4 \u2013 1/5 or a plain holiday wish, sunnier and more travel-like. Red and golden yellow plus one brand accent. At most a few small, accurate flags (red field, one centred five-pointed gold star) flying in the distance; never crop, bend, wear or print on the flag or use it as a sale backdrop. No slogans, leaders, soldiers, weapons, maps, text or numbers.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "Trang tr\u1ECDng h\u01A1n",\n      "en": "More dignified"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "04-10",\n      "to": "05-01"\n    },\n    {\n      "from": "08-15",\n      "to": "09-02"\n    }\n  ],\n  "order": 605\n}\n', "image-recipe-low-stock": '{\n  "key": "low-stock",\n  "group": "close",\n  "name": {\n    "vi": "S\u1EAFp h\u1EBFt h\xE0ng",\n    "en": "Almost gone"\n  },\n  "icon": "hourglass",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n, ch\u1EEF hay sticker c\u0169 s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i.",\n      "en": "The whole product, well lit. Its old background, text and stickers are removed."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Nh\u1EAFc kh\xE1ch \u0111ang ph\xE2n v\xE2n r\u1EB1ng h\xE0ng s\u1EAFp h\u1EBFt, \u0111\u1EC3 h\u1ECD ch\u1ED1t ngay.",\n      "en": "Tell people on the fence that it is nearly gone, so they buy now."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt, ch\u1EEF S\u1EAEP H\u1EBET H\xC0NG v\xE0 s\u1ED1 l\u01B0\u1EE3ng c\xF2n l\u1EA1i n\u1EBFu c\xF3.",\n      "en": "A square image: the product up front, ALMOST GONE and how many are left if given."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, story, tin nh\u1EAFn Zalo, livestream.",\n      "en": "Facebook posts, stories, Zalo chats, livestreams."\n    }\n  },\n  "fields": [\n    {\n      "key": "left",\n      "type": "text",\n      "label": {\n        "vi": "C\xF2n l\u1EA1i",\n        "en": "What is left"\n      },\n      "placeholder": {\n        "vi": "VD: Ch\u1EC9 c\xF2n 5 s\u1EA3n ph\u1EA9m",\n        "en": "E.g. Only 5 left"\n      },\n      "required": false,\n      "options": [\n        { "vi": "Ch\u1EC9 c\xF2n 5 s\u1EA3n ph\u1EA9m", "en": "Only 5 left" },\n        { "vi": "Ch\u1EC9 c\xF2n 3 s\u1EA3n ph\u1EA9m", "en": "Only 3 left" },\n        { "vi": "C\xF2n nh\u1EEFng size cu\u1ED1i", "en": "Last few sizes" },\n        { "vi": "C\xF2n v\xE0i m\xE0u cu\u1ED1i", "en": "Last few colours" },\n        { "vi": "L\xF4 cu\u1ED1i, h\u1EBFt l\xE0 th\xF4i", "en": "Last batch, then it is gone" },\n        { "vi": "H\u1EBFt \u0111\u1EE3t n\xE0y ph\u1EA3i ch\u1EDD th\xE1ng sau", "en": "After this, next month at the earliest" }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "S\u1EAEP H\u1EBET H\xC0NG",\n    "lines": [\n      "{{left}}"\n    ]\n  },\n  "designNotes": "Scarcity, shown honestly. Place the product, exactly as in the photo, in the lower 60% of the frame on a nearly empty shelf, display stand or clean surface, with a sense of space around it that hints the rest has sold; never invent extra units unless the photo shows several. Keep the top 35% a calm, darker or saturated field for S\u1EAEP H\u1EBET H\xC0NG and the remaining quantity. A focused spotlight or rim light on the product, the surroundings slightly dimmer. Warm red, amber or deep brand tone, at most three colours. No clocks with digits, sold-out stamps, empty-box clutter, text, numbers, price tags or logos.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "G\u1EA5p g\xE1p h\u01A1n",\n      "en": "More urgent"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 308\n}\n', "image-recipe-loyalty": '{\n  "key": "loyalty",\n  "group": "care",\n  "name": {\n    "vi": "Tri \xE2n kh\xE1ch th\xE2n thi\u1EBFt",\n    "en": "Loyal customer thanks"\n  },\n  "icon": "crown",\n  "size": "square",\n  "input": null,\n  "output": {\n    "purpose": {\n      "vi": "Tri \xE2n kh\xE1ch mua nhi\u1EC1u \u0111\u1EC3 h\u1ECD th\u1EA5y m\xECnh \u0111\u1EB7c bi\u1EC7t v\xE0 g\u1EAFn b\xF3 v\u1EDBi shop.",\n      "en": "Thank your best customers so they feel special and stay loyal."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng sang nh\u01B0 th\u1EBB th\xE0nh vi\xEAn: h\u1EA1ng kh\xE1ch, l\u1EDDi tri \xE2n v\xE0 quy\u1EC1n l\u1EE3i n\u1EBFu c\xF3.",\n      "en": "A premium square image like a membership card: the tier, a thank-you line and a benefit if you add one."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, nh\xF3m kh\xE1ch quen.",\n      "en": "Zalo and Messenger chats, regular-customer groups."\n    }\n  },\n  "fields": [\n    {\n      "key": "tier",\n      "type": "text",\n      "label": {\n        "vi": "H\u1EA1ng kh\xE1ch",\n        "en": "Tier"\n      },\n      "placeholder": {\n        "vi": "VD: Th\xE0nh vi\xEAn V\xE0ng",\n        "en": "E.g. Gold member"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Kh\xE1ch th\xE2n thi\u1EBFt",\n          "en": "Loyal customer"\n        },\n        {\n          "vi": "Th\xE0nh vi\xEAn B\u1EA1c",\n          "en": "Silver member"\n        },\n        {\n          "vi": "Th\xE0nh vi\xEAn V\xE0ng",\n          "en": "Gold member"\n        },\n        {\n          "vi": "Th\xE0nh vi\xEAn Kim c\u01B0\u01A1ng",\n          "en": "Diamond member"\n        },\n        {\n          "vi": "VIP",\n          "en": "VIP"\n        }\n      ],\n      "default": "Kh\xE1ch th\xE2n thi\u1EBFt"\n    },\n    {\n      "key": "benefit",\n      "type": "text",\n      "label": {\n        "vi": "Quy\u1EC1n l\u1EE3i",\n        "en": "Benefit"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 10% m\u1ECDi \u0111\u01A1n h\xE0ng",\n        "en": "E.g. 10% off every order"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 10% m\u1ECDi \u0111\u01A1n h\xE0ng",\n          "en": "10% off every order"\n        },\n        {\n          "vi": "Freeship m\u1ECDi \u0111\u01A1n",\n          "en": "Free shipping on every order"\n        },\n        {\n          "vi": "Qu\xE0 t\u1EB7ng m\u1ED7i th\xE1ng",\n          "en": "A gift every month"\n        },\n        {\n          "vi": "\u0110\u01B0\u1EE3c mua h\xE0ng m\u1EDBi tr\u01B0\u1EDBc",\n          "en": "First pick of new arrivals"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "center",\n    "title": "{{tier}}",\n    "lines": [\n      "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 lu\xF4n \u0111\u1ED3ng h\xE0nh c\xF9ng shop",\n      "{{benefit}}"\n    ]\n  },\n  "designNotes": "Premium and personal, like an exclusive membership card. A rich, elegant backdrop: subtle foil, satin or marble texture with a soft sheen, fine ornamental line work or a slim laurel at the edges and corners, gentle light catching the surface. Keep the centre 60% completely calm and even in tone for a panel with the tier and the thank-you words. Match the tier: silver for B\u1EA1c, warm gold for V\xE0ng or Kh\xE1ch th\xE2n thi\u1EBFt, icy blue-white sparkle for Kim c\u01B0\u01A1ng, deep black or burgundy with gold for VIP; blend in the brand colour; at most three colours. No text, numbers, card numbers, chips, barcodes, QR codes, logos, crowns with letters or people.",\n  "fixes": [\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "\u0110\u1ED5i ch\u1EA5t li\u1EC7u n\u1EC1n kh\xE1c",\n      "en": "A different backdrop texture"\n    }\n  ],\n  "order": 405\n}\n', "image-recipe-luxury": '{\n  "key": "luxury",\n  "group": "portrait",\n  "name": {\n    "vi": "Ch\xE2n dung sang tr\u1ECDng",\n    "en": "Luxury portrait"\n  },\n  "icon": "crown",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh ch\xE2n dung \u0111\u1EB3ng c\u1EA5p, sang tr\u1ECDng \u0111\u1EC3 kh\u1EB3ng \u0111\u1ECBnh v\u1ECB th\u1EBF khi b\xE1n h\xE0ng cao c\u1EA5p hay l\xE0m th\u01B0\u01A1ng hi\u1EC7u c\xE1 nh\xE2n.",\n      "en": "A refined, high-end portrait that signals status for premium selling or your personal brand."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n trong trang ph\u1EE5c v\xE0 b\u1ED1i c\u1EA3nh cao c\u1EA5p, \xE1nh s\xE1ng t\u1EA1p ch\xED, gi\u1EEF nguy\xEAn g\u01B0\u01A1ng m\u1EB7t.",\n      "en": "A portrait 4:5 image: you in upscale clothes and setting, editorial light, your face unchanged."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "setting",\n      "type": "text",\n      "label": {\n        "vi": "B\u1ED1i c\u1EA3nh",\n        "en": "Setting"\n      },\n      "placeholder": {\n        "vi": "VD: S\u1EA3nh kh\xE1ch s\u1EA1n 5 sao",\n        "en": "E.g. Five-star hotel lobby"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "S\u1EA3nh kh\xE1ch s\u1EA1n 5 sao",\n          "en": "Five-star hotel lobby"\n        },\n        {\n          "vi": "Studio n\u1EC1n t\u1ED1i",\n          "en": "Dark studio"\n        },\n        {\n          "vi": "Ban c\xF4ng l\xFAc ho\xE0ng h\xF4n",\n          "en": "Balcony at sunset"\n        },\n        {\n          "vi": "Ti\u1EC7c t\u1ED1i sang tr\u1ECDng",\n          "en": "Elegant evening party"\n        },\n        {\n          "vi": "Xe h\u01A1i sang tr\u1ECDng",\n          "en": "Luxury car"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. Quiet luxury, not flashy: a tailored suit, a silk blouse, an elegant evening dress or fine knitwear in black, ivory, champagne, deep navy or emerald; minimal fine jewellery or a classic watch. One upscale setting: a marble-and-brass hotel lobby, a dark studio with a single sculpted key light, a city balcony at sunset, a candlelit dinner or the leather interior of a luxury car. Editorial light with soft shadows and rich, warm tones; a confident, calm pose and gaze. Real skin texture with polished grooming. No logos, brand names, money, gold piles or invented text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "Sang h\u01A1n, tinh t\u1EBF h\u01A1n",\n      "en": "More refined"\n    },\n    {\n      "vi": "\u0110\u1ED5i trang ph\u1EE5c kh\xE1c",\n      "en": "Different outfit"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 802\n}\n', "image-recipe-magazine-cover": '{\n  "key": "magazine-cover",\n  "group": "portrait",\n  "name": {\n    "vi": "B\xECa t\u1EA1p ch\xED",\n    "en": "Magazine cover"\n  },\n  "icon": "magazine",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh g\xE2y ch\xFA \xFD \u0111\u1EC3 khoe m\u1ED9t c\u1ED9t m\u1ED1c: b\u1EA1n l\xEAn b\xECa t\u1EA1p ch\xED nh\u01B0 m\u1ED9t ng\u01B0\u1EDDi trong ngh\u1EC1 \u0111\xE1ng ch\xFA \xFD.",\n      "en": "An eye-catching image for a milestone: you on a magazine cover as someone notable in your trade."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 ki\u1EC3u b\xECa t\u1EA1p ch\xED: b\u1EA1n \u1EDF gi\u1EEFa, t\xEAn v\xE0 d\xF2ng t\xEDt l\u1EDBn.",\n      "en": "A portrait 4:5 magazine-cover image: you centred, your name and a big headline."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "name",\n      "type": "text",\n      "label": {\n        "vi": "T\xEAn tr\xEAn b\xECa",\n        "en": "Name on the cover"\n      },\n      "placeholder": {\n        "vi": "VD: Ng\u1ECDc Anh",\n        "en": "E.g. Ng\u1ECDc Anh"\n      },\n      "required": false\n    },\n    {\n      "key": "headline",\n      "type": "text",\n      "label": {\n        "vi": "D\xF2ng t\xEDt",\n        "en": "Headline"\n      },\n      "placeholder": {\n        "vi": "VD: 5 n\u0103m kh\u1EDFi nghi\u1EC7p t\u1EEB c\u0103n b\u1EBFp nh\u1ECF",\n        "en": "E.g. Five years from a small kitchen"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "5 n\u0103m kh\u1EDFi nghi\u1EC7p t\u1EEB con s\u1ED1 0",\n          "en": "Five years from zero"\n        },\n        {\n          "vi": "Ng\u01B0\u1EDDi ph\u1EE5 n\u1EEF c\u1EE7a n\u0103m",\n          "en": "Woman of the year"\n        },\n        {\n          "vi": "H\xE0nh tr\xECnh 1.000 kh\xE1ch h\xE0ng",\n          "en": "The road to 1,000 customers"\n        },\n        {\n          "vi": "T\u1EEB \u0111am m\xEA th\xE0nh th\u01B0\u01A1ng hi\u1EC7u",\n          "en": "From passion to brand"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "{{name}}",\n    "lines": [\n      "{{headline}}"\n    ]\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. An editorial magazine-cover portrait shot like a professional cover session: chest-up, centred, looking straight into the camera with a confident, relaxed expression, the face sharp in the upper half. A clean studio backdrop in one rich colour (or the brand colour), soft key light with a gentle rim light, polished but real skin. Smart, styled clothes that suit their trade. Set the name large and the headline below it in the lower third in bold cover typography; a short masthead word may sit at the top. No barcode, invented cover lines or other text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "Gi\u1ED1ng b\xECa t\u1EA1p ch\xED th\u1EADt h\u01A1n",\n      "en": "More like a real cover"\n    },\n    {\n      "vi": "\u0110\u1ED5i m\xE0u n\u1EC1n",\n      "en": "Different backdrop colour"\n    },\n    {\n      "vi": "T\u1EF1 tin, cu\u1ED1n h\xFAt h\u01A1n",\n      "en": "More confident"\n    }\n  ],\n  "order": 805\n}\n', "image-recipe-mid-autumn": '{\n  "key": "mid-autumn",\n  "group": "season",\n  "name": {\n    "vi": "Trung thu",\n    "en": "Mid-Autumn"\n  },\n  "icon": "moon",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",\n      "en": "Your product, shop or you"\n    },\n    "hint": {\n      "vi": "Th\xEAm h\u1ED9p b\xE1nh, s\u1EA3n ph\u1EA9m ho\u1EB7c \u1EA3nh c\u1EE7a b\u1EA1n n\u1EBFu mu\u1ED1n n\xF3 l\xE0 t\xE2m \u0111i\u1EC3m.",\n      "en": "Add a mooncake box, a product or yourself to make it the centre."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc Trung thu ho\u1EB7c b\xE1n qu\xE0 Trung thu v\u1EDBi kh\xF4ng kh\xED \u0111o\xE0n vi\xEAn.",\n      "en": "Greet or sell for Mid-Autumn with a reunion mood."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: tr\u0103ng r\u1EB1m, l\u1ED3ng \u0111\xE8n \xF4ng sao, \xE1nh v\xE0ng \u1EA5m, l\u1EDDi ch\xFAc, \u01B0u \u0111\xE3i v\xE0 s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n n\u1EBFu c\xF3.",\n      "en": "A portrait 4:5 image: full moon, star lanterns, warm gold light, your greeting, and your offer and product if any."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, Shopee.",\n      "en": "Facebook, Zalo, Shopee."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Greeting"\n      },\n      "placeholder": {\n        "vi": "VD: Trung Thu \u0110o\xE0n Vi\xEAn",\n        "en": "E.g. A happy reunion"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Trung Thu \u0110o\xE0n Vi\xEAn",\n          "en": "A happy reunion"\n        },\n        {\n          "vi": "Trung Thu An L\xE0nh",\n          "en": "A peaceful Mid-Autumn"\n        },\n        {\n          "vi": "Vui T\u1EBFt Trung Thu",\n          "en": "Happy Mid-Autumn Festival"\n        },\n        {\n          "vi": "Tr\u0103ng Tr\xF2n, Sum V\u1EA7y",\n          "en": "Full moon, family together"\n        },\n        {\n          "vi": "Qu\xE0 Trung Thu G\u1EEDi Tr\u1ECDn Y\xEAu Th\u01B0\u01A1ng",\n          "en": "Mid-Autumn gifts full of love"\n        }\n      ],\n      "default": "Trung Thu \u0110o\xE0n Vi\xEAn"\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 15% h\u1ED9p b\xE1nh Trung thu",\n        "en": "E.g. 15% off mooncake boxes"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 15% h\u1ED9p b\xE1nh Trung thu",\n          "en": "15% off mooncake boxes"\n        },\n        {\n          "vi": "\u0110\u1EB7t s\u1EDBm gi\u1EA3m 10%",\n          "en": "Order early, get 10% off"\n        },\n        {\n          "vi": "Mua 5 h\u1ED9p t\u1EB7ng 1 h\u1ED9p",\n          "en": "Buy 5 boxes, get 1 free"\n        },\n        {\n          "vi": "T\u1EB7ng l\u1ED3ng \u0111\xE8n cho m\u1ED7i \u0111\u01A1n",\n          "en": "A free lantern with every order"\n        },\n        {\n          "vi": "Freeship h\u1ED9p qu\xE0 Trung thu",\n          "en": "Free shipping on Mid-Autumn gift boxes"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}",\n    "lines": [\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "A moonlit, nostalgic scene. A large glowing tr\u0103ng r\u1EB1m and a deep indigo-to-navy night sky make the calm upper 35% for the greeting and an optional offer line. Below, the product (a mooncake box with b\xE1nh n\u01B0\u1EDBng and b\xE1nh d\u1EBBo and a pot of tea), the shop or the person, lit warmly by a red or yellow \u0111\xE8n \xF4ng sao and other paper-bamboo lanterns (carp, rabbit); with no photo, a tea tray with mooncakes and lanterns is the hero. Tiny silhouettes of ch\u1ECB H\u1EB1ng or ch\xFA Cu\u1ED9i under the banyan tree on the moon, or children carrying lanterns, as accents. Warm amber against cool blue. No Chinese-style palace lanterns with hanzi, and no text on boxes.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "08-10",\n      "to": "10-05"\n    }\n  ],\n  "order": 601\n}\n', "image-recipe-milestone": `{
  "key": "milestone",
  "group": "spread",
  "name": {
    "vi": "C\u1ED9t m\u1ED1c",
    "en": "Milestone"
  },
  "icon": "trophy",
  "size": "square",
  "input": {
    "kind": "shop",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh shop ho\u1EB7c \u0111\u1ED9i ng\u0169",
      "en": "Shop or team photo"
    },
    "hint": {
      "vi": "\u1EA2nh th\u1EADt c\u1EE7a shop ho\u1EB7c m\u1ECDi ng\u01B0\u1EDDi l\xE0m c\xF9ng b\u1EA1n; kh\xF4ng c\xF3 th\xEC Kallob v\u1EBD n\u1EC1n \u0103n m\u1EEBng.",
      "en": "A real photo of the shop or the people you work with; without one, Kallob draws a celebration backdrop."
    }
  },
  "output": {
    "purpose": {
      "vi": "Khoe m\u1ED9t c\u1ED9t m\u1ED1c v\xE0 c\u1EA3m \u01A1n kh\xE1ch \u0111\xE3 c\xF9ng shop \u0111i t\u1EDBi \u0111\xE2y.",
      "en": "Celebrate a milestone and thank the customers who got you there."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng kh\xF4ng kh\xED \u0103n m\u1EEBng: c\u1ED9t m\u1ED1c th\u1EADt l\u1EDBn \u1EDF gi\u1EEFa v\xE0 m\u1ED9t l\u1EDDi c\u1EA3m \u01A1n.",
      "en": "A celebratory square image: the milestone large in the centre and a thank-you line."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story, \u1EA3nh ghim \u0111\u1EA7u trang.",
      "en": "Facebook and Zalo posts, stories, a pinned post."
    }
  },
  "fields": [
    {
      "key": "milestone",
      "type": "text",
      "label": {
        "vi": "C\u1ED9t m\u1ED1c",
        "en": "Milestone"
      },
      "placeholder": {
        "vi": "VD: 1.000 \u0111\u01A1n h\xE0ng",
        "en": "E.g. 1,000 orders"
      },
      "required": true,
      "options": [
        {
          "vi": "1.000 \u0111\u01A1n h\xE0ng",
          "en": "1,000 orders"
        },
        {
          "vi": "10.000 ng\u01B0\u1EDDi theo d\xF5i",
          "en": "10,000 followers"
        },
        {
          "vi": "5.000 kh\xE1ch h\xE0ng",
          "en": "5,000 customers"
        },
        {
          "vi": "Tr\xF2n 1 n\u0103m",
          "en": "One year today"
        },
        {
          "vi": "3 n\u0103m \u0111\u1ED3ng h\xE0nh",
          "en": "3 years together"
        }
      ]
    },
    {
      "key": "thanks",
      "type": "text",
      "label": {
        "vi": "L\u1EDDi c\u1EA3m \u01A1n",
        "en": "Thank-you line"
      },
      "placeholder": {
        "vi": "VD: C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u1ED3ng h\xE0nh",
        "en": "E.g. Thank you for being with us"
      },
      "options": [
        {
          "vi": "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u1ED3ng h\xE0nh",
          "en": "Thank you for being with us"
        },
        {
          "vi": "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 tin ch\u1ECDn shop",
          "en": "Thank you for choosing us"
        },
        {
          "vi": "Nh\u1EDD c\xF3 b\u1EA1n, shop m\u1EDBi c\xF3 h\xF4m nay",
          "en": "We got here because of you"
        },
        {
          "vi": "C\xF9ng nhau \u0111i ti\u1EBFp nh\xE9!",
          "en": "Here's to the road ahead!"
        }
      ],
      "default": "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u1ED3ng h\xE0nh"
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "center",
    "title": "{{milestone}}",
    "lines": [
      "{{thanks}}"
    ]
  },
  "designNotes": "A proud, grateful celebration of a shared achievement. Keep a large, clear, even-toned centre area (about 60% of the width and 40% of the height) for a dark panel carrying the milestone and a thank-you line, and put all the celebration at the edges: soft confetti, streamers, a few balloons, gentle bokeh or light rays radiating outward. With a shop or team photo, keep the real place and people recognisable, warmly lit and slightly softened, framed so faces sit at the sides or lower edge, never behind the centre. Without a photo, use a festive brand-coloured backdrop with depth and a hint of gold. At most three colours. Never draw numbers, trophies or ribbons with words, fake follower counts, logos or text; Studio prints the milestone.",
  "fixes": [
    {
      "vi": "Ho\xE0nh tr\xE1ng h\u01A1n",
      "en": "Grander"
    },
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 503
}
`, "image-recipe-model-ad": '{\n  "key": "model-ad",\n  "group": "attract",\n  "name": {\n    "vi": "Qu\u1EA3ng c\xE1o c\xF3 ng\u01B0\u1EDDi m\u1EABu",\n    "en": "Ad with a model"\n  },\n  "icon": "star",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ng\u01B0\u1EDDi + \u1EA3nh s\u1EA3n ph\u1EA9m",\n      "en": "A person + the product"\n    },\n    "hint": {\n      "vi": "\u1EA2nh 1: b\u1EA1n ho\u1EB7c ng\u01B0\u1EDDi m\u1EABu, r\xF5 m\u1EB7t. \u1EA2nh 2: s\u1EA3n ph\u1EA9m. Th\xEAm \u1EA3nh 3 l\xE0 m\u1ED9t qu\u1EA3ng c\xE1o b\u1EA1n th\xEDch n\u1EBFu mu\u1ED1n l\xE0m theo b\u1ED1 c\u1EE5c, \xE1nh s\xE1ng c\u1EE7a n\xF3.",\n      "en": "Photo 1: you or a model, clear face. Photo 2: the product. Add a third, an ad you like, to follow its layout and light."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Qu\u1EA3ng c\xE1o c\xF3 ng\u01B0\u1EDDi d\xF9ng th\u1EADt c\u1EA7m s\u1EA3n ph\u1EA9m: kh\xE1ch th\u1EA5y m\xECnh trong \u0111\xF3 v\xE0 tin h\u01A1n \u1EA3nh s\u1EA3n ph\u1EA9m tr\u01A1n.",\n      "en": "An ad with a real person and the product: customers see themselves in it and trust it more than a plain product shot."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 ki\u1EC3u qu\u1EA3ng c\xE1o chuy\xEAn nghi\u1EC7p: ng\u01B0\u1EDDi m\u1EABu d\xF9ng s\u1EA3n ph\u1EA9m, c\xE2u qu\u1EA3ng c\xE1o v\xE0 l\u1EDDi k\xEAu g\u1ECDi.",\n      "en": "A portrait 4:5 professional ad: the model using the product, a slogan and a call to action."\n    },\n    "channels": {\n      "vi": "Qu\u1EA3ng c\xE1o Facebook, TikTok, Shopee, b\xE0i Zalo.",\n      "en": "Facebook and TikTok ads, Shopee, Zalo posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "look",\n      "type": "text",\n      "label": {\n        "vi": "Ki\u1EC3u qu\u1EA3ng c\xE1o",\n        "en": "Ad look"\n      },\n      "placeholder": {\n        "vi": "VD: T\u1EA1p ch\xED cao c\u1EA5p",\n        "en": "E.g. Premium magazine"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "T\u1EA1p ch\xED cao c\u1EA5p",\n          "en": "Premium magazine"\n        },\n        {\n          "vi": "\u0110\u1EDDi th\u01B0\u1EDDng g\u1EA7n g\u0169i",\n          "en": "Everyday lifestyle"\n        },\n        {\n          "vi": "Studio n\u1EC1n m\xE0u",\n          "en": "Colour studio"\n        },\n        {\n          "vi": "Ngo\xE0i tr\u1EDDi n\u1EAFng \u0111\u1EB9p",\n          "en": "Sunny outdoors"\n        },\n        {\n          "vi": "Poster qu\u1EA3ng c\xE1o l\u1EDBn",\n          "en": "Billboard poster"\n        }\n      ]\n    },\n    {\n      "key": "slogan",\n      "type": "text",\n      "label": {\n        "vi": "C\xE2u qu\u1EA3ng c\xE1o",\n        "en": "Slogan"\n      },\n      "placeholder": {\n        "vi": "VD: Da kho\u1EBB t\u1EEB b\xEAn trong",\n        "en": "E.g. Healthy skin from within"\n      },\n      "required": false\n    },\n    {\n      "key": "cta",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi k\xEAu g\u1ECDi",\n        "en": "Call to action"\n      },\n      "placeholder": {\n        "vi": "VD: Nh\u1EAFn tin \u0111\u1EC3 \u0111\u1EB7t h\xE0ng",\n        "en": "E.g. Message us to order"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Nh\u1EAFn tin \u0111\u1EC3 \u0111\u1EB7t h\xE0ng",\n          "en": "Message us to order"\n        },\n        {\n          "vi": "Mua ngay h\xF4m nay",\n          "en": "Buy today"\n        },\n        {\n          "vi": "Inbox \u0111\u1EC3 \u0111\u01B0\u1EE3c t\u01B0 v\u1EA5n",\n          "en": "Message us for advice"\n        },\n        {\n          "vi": "\u0110\u1EB7t h\xE0ng qua Zalo",\n          "en": "Order on Zalo"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "{{slogan}}",\n    "lines": [\n      "{{cta}}"\n    ]\n  },\n  "designNotes": "The photos are a person, the product and, if there is a third, a sample ad the founder likes. The person keeps their face, skin tone, age and body exactly; the product keeps its shape, colour, label and size. Show the person using or holding the product naturally (applying it, holding it near the face, mid-use), both sharp, the product clearly readable and never hidden by hands. Follow the sample ad only for layout, pose, light and mood; never copy its people, brand, product or words. Without a sample, shoot it like a real campaign in the chosen look. Keep the lower 30% calm for the slogan and call to action. No invented claims, prices, badges, other brands or extra products.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m r\xF5 h\u01A1n",\n      "en": "Clearer product"\n    },\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t ng\u01B0\u1EDDi m\u1EABu h\u01A1n",\n      "en": "Look more like the model"\n    },\n    {\n      "vi": "Sang, chuy\xEAn nghi\u1EC7p h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1EDDi th\u01B0\u1EDDng h\u01A1n",\n      "en": "More everyday"\n    }\n  ],\n  "order": 106\n}\n', "image-recipe-new-arrival": `{
  "key": "new-arrival",
  "group": "close",
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
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: s\u1EA3n ph\u1EA9m trong b\u1ED1i c\u1EA3nh \u0111\u1EB9p nh\u01B0 \u1EA3nh t\u1EA1p ch\xED, d\xF2ng H\xC0NG M\u1EDAI V\u1EC0 v\xE0 t\xEAn s\u1EA3n ph\u1EA9m n\u1EBFu c\xF3.",
      "en": "A portrait 4:5 image: the product in an editorial setting, NEW ARRIVAL and the product name if given."
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
      "required": false
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
  "designNotes": "An editorial launch look: the product, exactly as in the photo, centred or slightly low on a plinth, a stone or terrazzo slab, or a fabric drape, with dramatic soft side light and gentle shadow that bring out texture and craft. Leave the upper 30\u201335% as calm, uniform negative space for H\xC0NG M\u1EDAI V\u1EC0 and the product name. Soft neutrals or one deep tone taken from the product or brand, at most three colours: a dark backdrop reads premium, a light one fresh. One or two props from the product's world, softly out of focus. Calmer than a sale image: no bursts, badges, extra products, text, numbers or logos.",
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
  "order": 303
}
`, "image-recipe-notice": '{\n  "key": "notice",\n  "group": "care",\n  "name": {\n    "vi": "Th\xF4ng b\xE1o / Xin l\u1ED7i",\n    "en": "Notice & apology"\n  },\n  "icon": "info",\n  "size": "square",\n  "input": null,\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o kh\xE1ch chuy\u1EC7n ch\u1EADm tr\u1EC5, h\u1EBFt h\xE0ng hay \u0111\u1ED5i l\u1ECBch m\u1ED9t c\xE1ch ch\xE2n th\xE0nh \u0111\u1EC3 gi\u1EEF l\xF2ng tin.",\n      "en": "Tell customers about a delay, stock-out or schedule change sincerely, so they keep trusting you."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng nh\u1EB9 nh\xE0ng: l\u1EDDi g\u1EEDi kh\xE1ch, l\xFD do, l\u1EDDi xin th\xF4ng c\u1EA3m v\xE0 c\xE1ch shop b\xF9 \u0111\u1EAFp n\u1EBFu c\xF3.",\n      "en": "A calm square image: a note to customers, the reason, an apology and your make-good if you add one."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, b\xE0i Facebook, \u1EA3nh ghim \u0111\u1EA7u trang.",\n      "en": "Zalo and Messenger chats, Facebook posts, pinned image."\n    }\n  },\n  "fields": [\n    {\n      "key": "reason",\n      "type": "text",\n      "label": {\n        "vi": "Chuy\u1EC7n c\u1EA7n b\xE1o",\n        "en": "What happened"\n      },\n      "placeholder": {\n        "vi": "VD: \u0110\u01A1n h\xE0ng s\u1EBD giao ch\u1EADm v\xE0i ng\xE0y",\n        "en": "E.g. Orders will arrive a few days late"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "\u0110\u01A1n h\xE0ng s\u1EBD giao ch\u1EADm v\xE0i ng\xE0y",\n          "en": "Orders will arrive a few days late"\n        },\n        {\n          "vi": "S\u1EA3n ph\u1EA9m t\u1EA1m h\u1EBFt h\xE0ng",\n          "en": "This item is temporarily sold out"\n        },\n        {\n          "vi": "Shop xin \u0111\u1ED5i l\u1ECBch h\u1EB9n",\n          "en": "We need to reschedule your appointment"\n        },\n        {\n          "vi": "Giao h\xE0ng ch\u1EADm do th\u1EDDi ti\u1EBFt",\n          "en": "Deliveries are delayed by the weather"\n        },\n        {\n          "vi": "Shop \u0111ang qu\xE1 t\u1EA3i \u0111\u01A1n, tr\u1EA3 l\u1EDDi ch\u1EADm h\u01A1n",\n          "en": "We are swamped, replies are slower"\n        }\n      ]\n    },\n    {\n      "key": "makeGood",\n      "type": "text",\n      "label": {\n        "vi": "Shop b\xF9 cho b\u1EA1n",\n        "en": "Our make-good"\n      },\n      "placeholder": {\n        "vi": "VD: T\u1EB7ng b\u1EA1n m\xE3 gi\u1EA3m 10% \u0111\u01A1n sau",\n        "en": "E.g. 10% off your next order"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "T\u1EB7ng b\u1EA1n m\xE3 gi\u1EA3m 10% \u0111\u01A1n sau",\n          "en": "10% off your next order"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n sau",\n          "en": "Free shipping next time"\n        },\n        {\n          "vi": "Shop g\u1EEDi k\xE8m qu\xE0 nh\u1ECF",\n          "en": "A small gift in your parcel"\n        },\n        {\n          "vi": "\u01AFu ti\xEAn giao ngay khi c\xF3 h\xE0ng",\n          "en": "First to ship when it is back"\n        },\n        {\n          "vi": "Ho\xE0n ti\u1EC1n n\u1EBFu b\u1EA1n kh\xF4ng mu\u1ED1n ch\u1EDD",\n          "en": "A refund if you would rather not wait"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "center",\n    "title": "G\u1EECI B\u1EA0N \u0110\xD4I L\u1EDCI",\n    "lines": [\n      "{{reason}}",\n      "Mong b\u1EA1n th\xF4ng c\u1EA3m cho shop",\n      "{{makeGood}}"\n    ]\n  },\n  "designNotes": "Calm, sincere and reassuring, like a handwritten note from the owner; never alarming. A soft, quiet still life at the edges of the frame: a sprig of flowers, a cup of tea, a neatly wrapped parcel or a small notebook on linen or light wood, in gentle diffused daylight. Keep the centre 60\u201365% completely clear and even in tone for a panel with the notice. A soft, muted palette adapted from the brand colour with cream or sage; at most three colours. No red, warning signs, exclamation marks, alarms, clocks, crying faces, broken items, trucks in trouble, text, numbers or logos; the mood is an honest apology with a smile.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "\u1EA4m \xE1p, g\u1EA7n g\u0169i h\u01A1n",\n      "en": "Warmer and friendlier"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 407\n}\n', "image-recipe-outdoor": '{\n  "key": "outdoor",\n  "group": "portrait",\n  "name": {\n    "vi": "Ch\xE2n dung ngo\xE0i tr\u1EDDi",\n    "en": "Outdoor portrait"\n  },\n  "icon": "sun",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh ch\xE2n dung g\u1EA7n g\u0169i, t\u01B0\u01A1i s\xE1ng: h\u1EE3p v\u1EDBi ng\u01B0\u1EDDi l\xE0m d\u1ECBch v\u1EE5, coach, b\xE1n h\xE0ng c\xE1 nh\xE2n.",\n      "en": "A warm, bright portrait that feels close: right for service people, coaches and solo sellers."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n ngo\xE0i tr\u1EDDi trong n\u1EAFng chi\u1EC1u, h\u1EADu c\u1EA3nh m\u1EDD, n\u1EE5 c\u01B0\u1EDDi t\u1EF1 nhi\xEAn.",\n      "en": "A portrait 4:5 image: you outdoors in golden light, a soft background, a natural smile."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "setting",\n      "type": "text",\n      "label": {\n        "vi": "B\u1ED1i c\u1EA3nh",\n        "en": "Setting"\n      },\n      "placeholder": {\n        "vi": "VD: Ph\u1ED1 h\xE0ng c\xE2y",\n        "en": "E.g. Leafy street"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Ph\u1ED1 h\xE0ng c\xE2y",\n          "en": "Leafy street"\n        },\n        {\n          "vi": "B\u1EDD s\xF4ng",\n          "en": "Riverside"\n        },\n        {\n          "vi": "C\xF4ng vi\xEAn",\n          "en": "Park"\n        },\n        {\n          "vi": "S\xE2n th\u01B0\u1EE3ng ho\xE0ng h\xF4n",\n          "en": "Rooftop at sunset"\n        },\n        {\n          "vi": "B\xE3i bi\u1EC3n",\n          "en": "Beach"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. Waist-up, an 85mm look with creamy bokeh, the face sharp in the upper third. Golden-hour backlight with a warm rim on the hair and soft fill on the face. One Vietnamese outdoor setting that suits the person: a leafy street with old trees, a riverside path, a park, a rooftop at sunset or a beach in the late afternoon. A relaxed pose (walking slowly, leaning on a railing, a hand in a pocket) and a genuine smile; smart-casual clothes in solid colours. No plastic smoothing, heavy lens flare, crowds or text.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1i t\u1EAFn, r\u1EA1ng r\u1EE1 h\u01A1n",\n      "en": "Brighter, warmer expression"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 804\n}\n', "image-recipe-polaroid": '{\n  "key": "polaroid",\n  "group": "portrait",\n  "name": {\n    "vi": "Polaroid k\u1EF7 ni\u1EC7m",\n    "en": "Polaroid keepsake"\n  },\n  "icon": "image",\n  "size": "square",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh t\u1EEBng ng\u01B0\u1EDDi",\n      "en": "A photo of each person"\n    },\n    "hint": {\n      "vi": "M\u1ED7i \u1EA3nh l\xE0 m\u1ED9t ng\u01B0\u1EDDi: b\u1EA1n, ng\u01B0\u1EDDi th\xE2n, hay ch\xEDnh b\u1EA1n l\xFAc nh\u1ECF. R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng.",\n      "en": "One photo per person: you, family, or yourself as a child. Clear face, good light."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "M\u1ED9t t\u1EA5m \u1EA3nh k\u1EF7 ni\u1EC7m ki\u1EC3u polaroid: b\u1EA1n \u0111\u1EE9ng c\u1EA1nh ng\u01B0\u1EDDi th\xE2n ho\u1EB7c ch\xEDnh m\xECnh l\xFAc nh\u1ECF.",\n      "en": "A polaroid-style keepsake: you beside a loved one or your younger self."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng ki\u1EC3u \u1EA3nh l\u1EA5y li\u1EC1n: m\u1ECDi ng\u01B0\u1EDDi trong \u1EA3nh \u0111\u1EE9ng c\u1EA1nh nhau t\u1EF1 nhi\xEAn.",\n      "en": "A square instant-film photo: everyone in the photos together, naturally."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Each attached photo is a different person; every person keeps their own face, age and skin tone exactly, and faces never blend. A real instant-film photo: a thick white polaroid border (wider at the bottom, left blank), on-camera flash in a dim room with a plain white curtain behind, slight motion blur, warm faded colour and film grain. A natural moment: an arm around the shoulder, a hug, heads leaning together; a child self keeps their real childhood age and size. Only the people in the photos; no celebrities or invented people, and no writing on the border or the image.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t h\u01A1n",\n      "en": "Look more like us"\n    },\n    {\n      "vi": "Th\xE2n m\u1EADt, t\u1EF1 nhi\xEAn h\u01A1n",\n      "en": "Closer, more natural"\n    },\n    {\n      "vi": "Ch\u1EA5t phim c\u0169 h\u01A1n",\n      "en": "More vintage film"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 809\n}\n', "image-recipe-poll": '{\n  "key": "poll",\n  "group": "attract",\n  "name": {\n    "vi": "B\xECnh ch\u1ECDn A hay B",\n    "en": "A or B poll"\n  },\n  "icon": "vote",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 2,\n    "label": {\n      "vi": "\u1EA2nh 2 m\u1EABu",\n      "en": "Photos of the two options"\n    },\n    "hint": {\n      "vi": "\u1EA2nh 1 l\xE0 m\u1EABu A (b\xEAn tr\xE1i), \u1EA3nh 2 l\xE0 m\u1EABu B (b\xEAn ph\u1EA3i).",\n      "en": "Photo 1 is option A (left), photo 2 is option B (right)."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "R\u1EE7 ng\u01B0\u1EDDi xem ch\u1ECDn A hay B \u0111\u1EC3 h\u1ECD b\xECnh lu\u1EADn, gi\xFAp b\xE0i lan r\u1ED9ng v\xE0 b\u1EA1n bi\u1EBFt kh\xE1ch th\xEDch g\xEC.",\n      "en": "Ask followers to pick A or B so they comment, the post spreads and you learn what they like."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng chia \u0111\xF4i: m\u1EABu A b\xEAn tr\xE1i, m\u1EABu B b\xEAn ph\u1EA3i, c\xE2u h\u1ECFi b\xECnh ch\u1ECDn b\xEAn d\u01B0\u1EDBi.",\n      "en": "A square image split in two: option A on the left, option B on the right, the poll question below."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, Instagram.",\n      "en": "Facebook and Zalo posts, stories, Instagram."\n    }\n  },\n  "fields": [\n    {\n      "key": "question",\n      "type": "text",\n      "label": {\n        "vi": "C\xE2u h\u1ECFi",\n        "en": "Question"\n      },\n      "placeholder": {\n        "vi": "VD: B\u1EA1n ch\u1ECDn m\u1EABu n\xE0o?",\n        "en": "E.g. Which one would you pick?"\n      },\n      "options": [\n        {\n          "vi": "B\u1EA1n ch\u1ECDn m\u1EABu n\xE0o?",\n          "en": "Which one would you pick?"\n        },\n        {\n          "vi": "B\u1EA1n th\xEDch m\xE0u n\xE0o h\u01A1n?",\n          "en": "Which colour do you prefer?"\n        },\n        {\n          "vi": "Team A hay team B?",\n          "en": "Team A or team B?"\n        },\n        {\n          "vi": "M\u1EABu n\xE0o n\xEAn v\u1EC1 th\xEAm h\xE0ng?",\n          "en": "Which one should we restock?"\n        },\n        {\n          "vi": "\u0110i ch\u01A1i cu\u1ED1i tu\u1EA7n b\u1EA1n ch\u1ECDn m\u1EABu n\xE0o?",\n          "en": "Which one for a weekend out?"\n        }\n      ],\n      "default": "B\u1EA1n ch\u1ECDn m\u1EABu n\xE0o?"\n    }\n  ],\n  "overlay": {\n    "layout": "split",\n    "zone": "bottom",\n    "left": "A",\n    "right": "B",\n    "title": "{{question}}",\n    "lines": [\n      "B\xECnh lu\u1EADn A ho\u1EB7c B nh\xE9!"\n    ]\n  },\n  "designNotes": "A fair duel. Compose two equal halves side by side, photo 1 on the left and photo 2 on the right, each product kept exactly as given (shape, colour, pattern, label), centred in its half at the same scale, same camera height, same light and the same backdrop so neither looks favoured. A subtle split: two soft tones of the brand colour, or one clean surface with a thin gap of light between the halves. Keep the top corners clear for the A and B labels and the bottom 25% calm and low-detail for the question. Bright, even studio light, at most three colours. Never merge, restyle or improve one product more than the other; no text, letters, numbers, VS symbols, prices or extra products.",\n  "fixes": [\n    {\n      "vi": "Hai m\u1EABu to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer products"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 103\n}\n', "image-recipe-pre-order": `{
  "key": "pre-order",
  "group": "close",
  "name": {
    "vi": "\u0110\u1EB7t tr\u01B0\u1EDBc",
    "en": "Pre-order"
  },
  "icon": "calendar",
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
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m s\u1EAFp v\u1EC1, \u1EA3nh m\u1EABu t\u1EEB nh\xE0 cung c\u1EA5p c\u0169ng \u0111\u01B0\u1EE3c.",
      "en": "The product that is coming; a supplier's sample photo is fine."
    }
  },
  "output": {
    "purpose": {
      "vi": "Nh\u1EADn \u0111\u1EB7t tr\u01B0\u1EDBc h\xE0ng s\u1EAFp v\u1EC1, gi\u1EEF ch\xE2n kh\xE1ch v\xE0 bi\u1EBFt tr\u01B0\u1EDBc s\u1ED1 l\u01B0\u1EE3ng c\u1EA7n nh\u1EADp.",
      "en": "Take pre-orders for incoming stock, hold buyers' interest and know how much to order."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: s\u1EA3n ph\u1EA9m nh\u01B0 \u1EA3nh ra m\u1EAFt, ch\u1EEF \u0110\u1EB6T TR\u01AF\u1EDAC, ng\xE0y h\xE0ng v\u1EC1 v\xE0 \u01B0u \u0111\xE3i \u0111\u1EB7t tr\u01B0\u1EDBc n\u1EBFu c\xF3.",
      "en": "A portrait 4:5 image: the product in a launch-style shot, PRE-ORDER, the arrival date and the pre-order perk if given."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story, nh\xF3m kh\xE1ch quen.",
      "en": "Facebook and Zalo posts, stories, regular-customer groups."
    }
  },
  "fields": [
    {
      "key": "arrival",
      "type": "date",
      "label": {
        "vi": "Ng\xE0y h\xE0ng v\u1EC1",
        "en": "Arrival date"
      },
      "required": false
    },
    {
      "key": "perk",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i \u0111\u1EB7t tr\u01B0\u1EDBc",
        "en": "Pre-order perk"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EA3m 10% khi \u0111\u1EB7t tr\u01B0\u1EDBc",
        "en": "E.g. 10% off when you pre-order"
      },
      "required": false,
      "options": [
        { "vi": "Gi\u1EA3m 10% khi \u0111\u1EB7t tr\u01B0\u1EDBc", "en": "10% off when you pre-order" },
        { "vi": "C\u1ECDc 30%, nh\u1EADn h\xE0ng tr\u1EA3 n\u1ED1t", "en": "30% deposit, the rest on delivery" },
        { "vi": "T\u1EB7ng qu\xE0 cho 20 \u0111\u01A1n \u0111\u1EA7u", "en": "A gift for the first 20 orders" },
        { "vi": "Freeship khi \u0111\u1EB7t tr\u01B0\u1EDBc", "en": "Free shipping on pre-orders" },
        { "vi": "Gi\u1EEF h\xE0ng, kh\xF4ng c\u1EA7n c\u1ECDc", "en": "We hold it for you, no deposit" }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "\u0110\u1EB6T TR\u01AF\u1EDAC",
    "lines": [
      "H\xE0ng v\u1EC1 {{arrival}}",
      "{{perk}}"
    ]
  },
  "designNotes": "An anticipation look, like a product reveal. Place the product, exactly as in the photo, in the upper 55\u201360% of the frame, centred on a plinth or soft surface, lit by a dramatic beam or a gentle glow from behind, with a slightly unveiled feel (a lifted silk cloth, a half-open box, soft haze). Keep the lower 35\u201340% calm and even for \u0110\u1EB6T TR\u01AF\u1EDAC, the arrival date and the perk. A premium palette: a deep tone or the brand colour with one warm highlight, at most three colours. No calendars with digits, countdown clocks, coming-soon stamps, extra products, text, numbers, prices or logos.",
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
  "order": 309
}
`, "image-recipe-price-list": `{
  "key": "price-list",
  "group": "close",
  "name": {
    "vi": "B\u1EA3ng gi\xE1 / Menu",
    "en": "Price list / Menu"
  },
  "icon": "menu",
  "size": "portrait",
  "input": {
    "kind": "any",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh qu\xE1n ho\u1EB7c s\u1EA3n ph\u1EA9m",
      "en": "Shop or product photo"
    },
    "hint": {
      "vi": "\u1EA2nh qu\xE1n, qu\u1EA7y h\xE0ng ho\u1EB7c v\xE0i s\u1EA3n ph\u1EA9m, d\xF9ng l\xE0m n\u1EC1n ph\xEDa sau b\u1EA3ng gi\xE1.",
      "en": "Your shop, counter or a few products, used as the backdrop behind the list."
    }
  },
  "output": {
    "purpose": {
      "vi": "Cho kh\xE1ch xem \u0111\u1EE7 gi\xE1 m\u1ED9t l\u1EA7n, g\u1EEDi ngay khi kh\xE1ch h\u1ECFi gi\xE1.",
      "en": "Show all your prices at once, ready to send when someone asks."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA3ng gi\xE1 g\u1ECDn g\xE0ng, m\u1ED7i d\xF2ng m\u1ED9t m\xF3n v\xE0 gi\xE1, tr\xEAn n\u1EC1n h\u1EE3p v\u1EDBi shop.",
      "en": "A portrait 4:5 image: a neat list, one item and its price per row, on a backdrop that suits your shop."
    },
    "channels": {
      "vi": "Tin nh\u1EAFn Zalo, Messenger, b\xE0i ghim Facebook, in \u0111\u1EC3 \u1EDF qu\u1EA7y.",
      "en": "Zalo and Messenger chats, pinned Facebook posts, printed at the counter."
    }
  },
  "fields": [
    {
      "key": "heading",
      "type": "text",
      "label": {
        "vi": "Ti\xEAu \u0111\u1EC1",
        "en": "Title"
      },
      "placeholder": {
        "vi": "VD: B\u1EA2NG GI\xC1",
        "en": "E.g. PRICE LIST"
      },
      "required": false,
      "options": [
        { "vi": "B\u1EA2NG GI\xC1", "en": "PRICE LIST" },
        { "vi": "MENU", "en": "MENU" },
        { "vi": "B\u1EA2NG GI\xC1 D\u1ECACH V\u1EE4", "en": "SERVICE PRICES" },
        { "vi": "B\u1EA2NG GI\xC1 S\u1EC8", "en": "WHOLESALE PRICES" },
        { "vi": "M\xD3N M\u1EDAI", "en": "NEW ON THE MENU" }
      ],
      "default": "B\u1EA2NG GI\xC1"
    },
    {
      "key": "items",
      "type": "longtext",
      "label": {
        "vi": "C\xE1c m\xF3n v\xE0 gi\xE1 (m\u1ED7i d\xF2ng: T\xEAn | gi\xE1)",
        "en": "Items and prices (one per line: Name | price)"
      },
      "placeholder": {
        "vi": "VD: C\xE0 ph\xEA s\u1EEFa | 25000\\nB\u1EA1c x\u1EC9u | 29000\\nTr\xE0 \u0111\xE0o cam s\u1EA3 | 35000",
        "en": "E.g. Iced milk coffee | 25000\\nBac xiu | 29000\\nPeach lemongrass tea | 35000"
      },
      "required": true
    }
  ],
  "overlay": {
    "layout": "list",
    "zone": "center",
    "title": "{{heading}}",
    "items": "{{items}}"
  },
  "designNotes": "A backdrop that frames a menu board. If a photo is given, keep the real shop or products recognisable but push them to the edges and the top and bottom bands, softly out of focus and slightly darkened, so the centre 60\u201365% reads as one calm, even area for a list panel. With no photo, build a fitting backdrop from the seller's niche: a caf\xE9 counter, a wooden table with a few ingredients, a salon shelf, fabric or a soft textured gradient, with props only along the edges. Warm, inviting light; palette from the brand colour, at most three colours. Nothing busy, bright or high-contrast behind the centre. No text, numbers, prices, chalk writing, signage, logos or invented products.",
  "fixes": [
    {
      "vi": "N\u1EC1n gi\u1EEFa tr\u01A1n h\u01A1n \u0111\u1EC3 b\u1EA3ng d\u1EC5 \u0111\u1ECDc",
      "en": "A plainer centre so the list reads easily"
    },
    {
      "vi": "\u1EA4m c\xFAng, m\u1EDDi g\u1ECDi h\u01A1n",
      "en": "Warmer, more inviting"
    },
    {
      "vi": "Sang tr\u1ECDng h\u01A1n",
      "en": "More premium"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 305
}
`, "image-recipe-pro-avatar": '{\n  "key": "pro-avatar",\n  "group": "portrait",\n  "name": {\n    "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n chuy\xEAn nghi\u1EC7p",\n    "en": "Professional headshot"\n  },\n  "icon": "avatar",\n  "size": "square",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng, m\u1ED9t ng\u01B0\u1EDDi. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light, one person. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh ch\xE2n dung ch\u1EC9n chu cho h\u1ED3 s\u01A1 c\xF4ng vi\u1EC7c, website, b\xE0i gi\u1EDBi thi\u1EC7u.",\n      "en": "A polished headshot for work profiles, websites and bios."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng ch\u1EE5p ki\u1EC3u studio: trang ph\u1EE5c l\u1ECBch s\u1EF1, n\u1EC1n g\u1ECDn, \xE1nh s\xE1ng \u0111\u1EB9p, v\u1EABn \u0111\xFAng l\xE0 b\u1EA1n.",\n      "en": "A square studio-style headshot: smart clothes, clean background, flattering light, still clearly you."\n    },\n    "channels": {\n      "vi": "LinkedIn, Zalo, Facebook, website.",\n      "en": "LinkedIn, Zalo, Facebook, websites."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Head and shoulders, the face about 60% of the frame, eyes on the upper third, camera at eye level. Shoulders turned slightly, direct eye contact, a relaxed natural smile. A soft key light at 45\xB0 with fill from the other side and visible catchlights. Plain backdrop (light grey, off-white, muted blue) or a softly blurred modern office. Solid navy, black, white or grey business clothing. Keep identity exactly, including skin texture, glasses and hairline; retouch only stray hairs and blemishes. Never beautify, change ethnicity, add jewellery or make it a fashion shoot.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "T\u01B0\u01A1i t\u1EAFn, r\u1EA1ng r\u1EE1 h\u01A1n",\n      "en": "Brighter, warmer expression"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    },\n    {\n      "vi": "\xC1nh s\xE1ng \u1EA5m h\u01A1n",\n      "en": "Warmer light"\n    }\n  ],\n  "order": 800\n}\n', "image-recipe-product-photo": `{
  "key": "product-photo",
  "group": "brand",
  "name": {
    "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m n\u1EC1n \u0111\u1EB9p",
    "en": "Product photo"
  },
  "icon": "camera",
  "size": "square",
  "input": {
    "kind": "product",
    "required": true,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",
      "en": "Product photo"
    },
    "hint": {
      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n c\u0169, ch\u1EEF hay sticker d\xE1n th\xEAm s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i; nh\xE3n th\u1EADt gi\u1EEF nguy\xEAn.",
      "en": "The whole product, well lit. Its old background and added stickers are removed; the real label stays."
    }
  },
  "output": {
    "purpose": {
      "vi": "Bi\u1EBFn \u1EA3nh ch\u1EE5p v\u1ED9i th\xE0nh \u1EA3nh s\u1EA3n ph\u1EA9m \u0111\u1EB9p, \u0111\xFAng h\xE0ng th\u1EADt, \u0111\u1EC3 \u0111\u0103ng b\xE1n \u1EDF m\u1ECDi n\u01A1i.",
      "en": "Turn a quick snapshot into a beautiful, true-to-life product photo you can sell with anywhere."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m th\u1EADt c\u1EE7a b\u1EA1n gi\u1EEF nguy\xEAn h\xECnh d\xE1ng, m\xE0u v\xE0 ch\u1EEF tr\xEAn nh\xE3n, \u0111\u1EB7t tr\xEAn n\u1EC1n m\u1EDBi \u0111\u1EB9p, kh\xF4ng ch\u1EEF.",
      "en": "A square image: your real product, its shape, colour and label text unchanged, on a beautiful new background, no words."
    },
    "channels": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m Shopee, TikTok Shop, website, b\xE0i Facebook, Zalo.",
      "en": "Shopee and TikTok Shop listings, websites, Facebook and Zalo posts."
    }
  },
  "fields": [
    {
      "key": "backdrop",
      "type": "text",
      "label": {
        "vi": "Ki\u1EC3u n\u1EC1n",
        "en": "Backdrop"
      },
      "placeholder": {
        "vi": "VD: B\xE0n g\u1ED7 \u1EA5m",
        "en": "E.g. Warm wooden table"
      },
      "required": false,
      "options": [
        {
          "vi": "N\u1EC1n tr\u1EAFng s\u1EA1ch ki\u1EC3u s\xE0n TM\u0110T",
          "en": "Clean white, marketplace style"
        },
        {
          "vi": "B\xE0n g\u1ED7 \u1EA5m",
          "en": "Warm wooden table"
        },
        {
          "vi": "Ngo\xE0i tr\u1EDDi t\u1EF1 nhi\xEAn",
          "en": "Natural outdoors"
        },
        {
          "vi": "Sang tr\u1ECDng t\u1ED1i m\xE0u",
          "en": "Dark and premium"
        },
        {
          "vi": "Pastel t\u01B0\u01A1i",
          "en": "Fresh pastel"
        },
        {
          "vi": "\u0110\xE1 c\u1EA9m th\u1EA1ch s\xE1ng",
          "en": "Light marble"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "A true-to-life product photo a buyer can trust. Keep the founder's product exactly: shape, proportions, colour, material, label text and printed details, never redrawn, re-lettered or improved; remove only the old background, clutter and added stickers or watermarks. One product, centred or slightly off-centre, filling 55\u201370% of the frame, sitting naturally on its surface with a soft contact shadow and matching light direction and colour. Backdrop by the chosen style: pure white with a soft shadow for marketplaces, warm wood, natural daylight outdoors, dark premium, fresh pastel or light marble. When empty, pick what suits the product: food and handmade on warm wood, cosmetics on pastel or marble, electronics on clean white. At most two small related props, never in front of the product. No text, prices, logos, badges, hands or extra products.",
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
  "order": 700
}
`, "image-recipe-proof-number": `{
  "key": "proof-number",
  "group": "trust",
  "name": {
    "vi": "Con s\u1ED1 ch\u1EE9ng minh",
    "en": "Proof in numbers"
  },
  "icon": "number",
  "size": "square",
  "input": {
    "kind": "any",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh shop ho\u1EB7c s\u1EA3n ph\u1EA9m",
      "en": "Shop or product photo"
    },
    "hint": {
      "vi": "Th\xEAm \u1EA3nh th\u1EADt c\u1EE7a shop, s\u1EA3n ph\u1EA9m ho\u1EB7c kh\xE1ch n\u1EBFu c\xF3; kh\xF4ng c\xF3 th\xEC Kallob t\u1EF1 l\xE0m n\u1EC1n.",
      "en": "Add a real photo of your shop, product or customers if you have one; otherwise Kallob designs the background."
    }
  },
  "output": {
    "purpose": {
      "vi": "Khoe m\u1ED9t con s\u1ED1 th\u1EADt (kh\xE1ch, \u0111\u01A1n, n\u0103m kinh nghi\u1EC7m) \u0111\u1EC3 ng\u01B0\u1EDDi m\u1EDBi th\u1EA5y shop \u0111\xE1ng tin.",
      "en": "Show one real number (customers, orders, years) so newcomers see you are trusted."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng: m\u1ED9t con s\u1ED1 th\u1EADt l\u1EDBn \u1EDF gi\u1EEFa v\xE0 d\xF2ng gi\u1EA3i th\xEDch b\xEAn d\u01B0\u1EDBi.",
      "en": "A square image: one big number in the centre and what it means below."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story, \u1EA3nh b\xECa.",
      "en": "Facebook and Zalo posts, stories, cover images."
    }
  },
  "fields": [
    {
      "key": "number",
      "type": "text",
      "label": {
        "vi": "Con s\u1ED1",
        "en": "Number"
      },
      "placeholder": {
        "vi": "VD: 1.200+",
        "en": "E.g. 1,200+"
      },
      "required": true
    },
    {
      "key": "meaning",
      "type": "text",
      "label": {
        "vi": "Con s\u1ED1 n\xE0y l\xE0 g\xEC",
        "en": "What it counts"
      },
      "placeholder": {
        "vi": "VD: kh\xE1ch h\xE0ng \u0111\xE3 tin ch\u1ECDn",
        "en": "E.g. happy customers"
      },
      "required": false,
      "options": [
        {
          "vi": "kh\xE1ch h\xE0ng \u0111\xE3 tin ch\u1ECDn",
          "en": "happy customers"
        },
        {
          "vi": "\u0111\u01A1n h\xE0ng \u0111\xE3 giao",
          "en": "orders delivered"
        },
        {
          "vi": "\u0111\xE1nh gi\xE1 5 sao",
          "en": "5-star reviews"
        },
        {
          "vi": "n\u0103m kinh nghi\u1EC7m",
          "en": "years of experience"
        },
        {
          "vi": "h\u1ECDc vi\xEAn \u0111\xE3 theo h\u1ECDc",
          "en": "students taught"
        },
        {
          "vi": "kh\xE1ch quay l\u1EA1i mua l\u1EA7n 2",
          "en": "customers who came back"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "center",
    "title": "{{number}}",
    "lines": [
      "{{meaning}}"
    ]
  },
  "designNotes": "A confident, quiet image that lets one number speak. Keep the centre 55\u201360% clear and even in tone for a dark rounded panel with the number and its meaning. With a photo, keep the real shop, product or customers recognisable and arrange it around the edges or softly blurred behind the panel, never under the number at full detail. With none, use a calm backdrop from the founder's niche: soft light, gentle depth, a subtle texture. Brand colour as the main accent on a neutral base; at most three colours. One restrained celebratory touch at most (a soft light glow, a few small stars at a corner). No charts, trophies, crowds, text, digits, logos or invented figures.",
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
    },
    {
      "vi": "\u1EA2nh shop r\xF5 h\u01A1n",
      "en": "Show my shop more clearly"
    }
  ],
  "order": 205
}
`, "image-recipe-quote": `{
  "key": "quote",
  "group": "attract",
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
  "order": 100
}
`, "image-recipe-referral": '{\n  "key": "referral",\n  "group": "spread",\n  "name": {\n    "vi": "Gi\u1EDBi thi\u1EC7u b\u1EA1n nh\u1EADn qu\xE0",\n    "en": "Refer a friend"\n  },\n  "icon": "users",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm m\xF3n b\xE1n ch\u1EA1y \u0111\u1EC3 \u1EA3nh g\u1EA7n v\u1EDBi shop h\u01A1n; kh\xF4ng c\xF3 th\xEC Kallob v\u1EBD h\u1ED9p qu\xE0.",\n      "en": "Add a best seller to make it feel like your shop; without one, Kallob draws gift boxes."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "M\u1EDDi kh\xE1ch c\u0169 gi\u1EDBi thi\u1EC7u b\u1EA1n b\xE8, c\u1EA3 hai c\xF9ng nh\u1EADn qu\xE0.",\n      "en": "Get past buyers to bring friends, with a gift for both."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: ch\u1EEF GI\u1EDAI THI\u1EC6U B\u1EA0N \xB7 NH\u1EACN QU\xC0, qu\xE0 cho ng\u01B0\u1EDDi gi\u1EDBi thi\u1EC7u v\xE0 qu\xE0 cho b\u1EA1n m\u1EDBi.",\n      "en": "A square image: REFER A FRIEND, GET A GIFT, the reward for the referrer and the gift for the new friend."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, g\u1EEDi k\xE8m \u0111\u01A1n h\xE0ng ho\u1EB7c tin nh\u1EAFn c\u1EA3m \u01A1n.",\n      "en": "Facebook and Zalo posts, sent with orders or thank-you messages."\n    }\n  },\n  "fields": [\n    {\n      "key": "reward",\n      "type": "text",\n      "label": {\n        "vi": "Qu\xE0 cho ng\u01B0\u1EDDi gi\u1EDBi thi\u1EC7u",\n        "en": "Reward for the referrer"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 50.000\u0111 \u0111\u01A1n sau",\n        "en": "E.g. 50,000\u0111 off the next order"\n      },\n      "required": true,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 50.000\u0111 \u0111\u01A1n sau",\n          "en": "50,000\u0111 off the next order"\n        },\n        {\n          "vi": "Gi\u1EA3m 10% \u0111\u01A1n sau",\n          "en": "10% off the next order"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n sau",\n          "en": "Free shipping on the next order"\n        },\n        {\n          "vi": "T\u1EB7ng 1 ph\u1EA7n qu\xE0 nh\u1ECF",\n          "en": "A small free gift"\n        },\n        {\n          "vi": "T\u1EB7ng voucher 100.000\u0111",\n          "en": "A 100,000\u0111 voucher"\n        }\n      ]\n    },\n    {\n      "key": "friendReward",\n      "type": "text",\n      "label": {\n        "vi": "Qu\xE0 cho b\u1EA1n m\u1EDBi",\n        "en": "Gift for the new friend"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 10% \u0111\u01A1n \u0111\u1EA7u",\n        "en": "E.g. 10% off the first order"\n      },\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 10% \u0111\u01A1n \u0111\u1EA7u",\n          "en": "10% off the first order"\n        },\n        {\n          "vi": "Gi\u1EA3m 30.000\u0111 \u0111\u01A1n \u0111\u1EA7u",\n          "en": "30,000\u0111 off the first order"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n \u0111\u1EA7u",\n          "en": "Free shipping on the first order"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 cho \u0111\u01A1n \u0111\u1EA7u",\n          "en": "A free gift with the first order"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "GI\u1EDAI THI\u1EC6U B\u1EA0N \xB7 NH\u1EACN QU\xC0",\n    "lines": [\n      "B\u1EA1n nh\u1EADn: {{reward}}",\n      "B\u1EA1n m\u1EDBi nh\u1EADn: {{friendReward}}"\n    ]\n  },\n  "designNotes": "Warm, generous and personal: the feeling of one friend passing a good thing to another. With a product photo, keep the product exactly as given, upright in the upper 60% beside two matching wrapped gift boxes, one gift for each side; with no photo, show two hands passing a wrapped gift box between them, or two identical gift boxes tied together with one ribbon, in the upper 60%. Keep the lower 35\u201340% calm and even for the title and both rewards. Soft daylight on a clean surface, the brand colour as the main tone with one warm accent; at most three colours. No faces needed, no phones with fake chat screens, and no text, numbers, prices, coupons showing values, logos or extra products.",\n  "fixes": [\n    {\n      "vi": "Qu\xE0 t\u1EB7ng n\u1ED5i b\u1EADt h\u01A1n",\n      "en": "Make the gifts stand out more"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 500\n}\n', "image-recipe-reorder": '{\n  "key": "reorder",\n  "group": "care",\n  "name": {\n    "vi": "Nh\u1EAFc mua l\u1EA1i",\n    "en": "Reorder reminder"\n  },\n  "icon": "repeat",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "\u1EA2nh m\xF3n kh\xE1ch hay mua, r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng.",\n      "en": "The item they usually buy, fully visible and well lit."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Nh\u1EAFc kh\xE1ch c\u0169 mua l\u1EA1i m\xF3n s\u1EAFp d\xF9ng h\u1EBFt, c\xF3 \u0111\u01A1n m\xE0 kh\xF4ng c\u1EA7n qu\u1EA3ng c\xE1o.",\n      "en": "Remind past buyers to restock before they run out, sales without ads."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n tr\xEAn n\u1EC1n m\u1EDBi, l\u1EDDi nh\u1EAFc mua l\u1EA1i v\xE0 \u01B0u \u0111\xE3i n\u1EBFu c\xF3.",\n      "en": "A square image: your product on a new background, the reminder line and a perk if you add one."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, chat Shopee.",\n      "en": "Zalo and Messenger chats, Shopee chat."\n    }\n  },\n  "fields": [\n    {\n      "key": "reminder",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi nh\u1EAFc",\n        "en": "Reminder"\n      },\n      "placeholder": {\n        "vi": "VD: S\u1EAFp h\u1EBFt r\u1ED3i ph\u1EA3i kh\xF4ng b\u1EA1n?",\n        "en": "E.g. Running low?"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "S\u1EAFp h\u1EBFt r\u1ED3i ph\u1EA3i kh\xF4ng b\u1EA1n?",\n          "en": "Running low?"\n        },\n        {\n          "vi": "\u0110\u1EBFn l\xFAc mua th\xEAm r\u1ED3i \u0111\xF3!",\n          "en": "Time to restock!"\n        },\n        {\n          "vi": "B\u1EA1n d\xF9ng h\u1EBFt ch\u01B0a? Shop g\u1EEDi th\xEAm nh\xE9",\n          "en": "All used up? We can send more"\n        },\n        {\n          "vi": "Nh\u1EAFn shop \u0111\u1EC3 giao l\u1EA1i li\u1EC1n nha",\n          "en": "Message us and we ship right away"\n        }\n      ],\n      "default": "S\u1EAFp h\u1EBFt r\u1ED3i ph\u1EA3i kh\xF4ng b\u1EA1n?"\n    },\n    {\n      "key": "perk",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i mua l\u1EA1i",\n        "en": "Reorder perk"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 10% khi mua l\u1EA1i",\n        "en": "E.g. 10% off when you reorder"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 10% khi mua l\u1EA1i",\n          "en": "10% off when you reorder"\n        },\n        {\n          "vi": "Freeship cho \u0111\u01A1n mua l\u1EA1i",\n          "en": "Free shipping on your reorder"\n        },\n        {\n          "vi": "Mua 2 t\u1EB7ng 1 cho kh\xE1ch c\u0169",\n          "en": "Buy 2 get 1 free for returning buyers"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 nh\u1ECF khi \u0111\u1EB7t l\u1EA1i trong tu\u1EA7n",\n          "en": "A small gift if you reorder this week"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "{{reminder}}",\n    "lines": [\n      "{{perk}}"\n    ]\n  },\n  "designNotes": "Familiar and helpful, like a friendly nudge from a shop the buyer already trusts. Keep the product exactly as in the photo, fully visible, in the upper 60\u201365% of the frame, slightly off-centre, filling 40\u201360% of that area, in a homely everyday setting where it is used (a kitchen counter, a bathroom shelf, a desk) with soft morning light. Keep the lower 35% calm and low-detail (a plain surface or soft gradient) for the words. A gentle palette adapted from the brand colour; at most three colours. No text, numbers, prices, timers, empty-bottle clich\xE9s, extra or duplicate products, logos or invented labels.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "B\u1ED1i c\u1EA3nh g\u1EA7n g\u0169i h\u01A1n",\n      "en": "A homelier setting"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 404\n}\n', "image-recipe-reseller": `{
  "key": "reseller",
  "group": "spread",
  "name": {
    "vi": "Tuy\u1EC3n c\u1ED9ng t\xE1c vi\xEAn / \u0111\u1EA1i l\xFD",
    "en": "Become a reseller"
  },
  "icon": "handshake",
  "size": "portrait",
  "input": {
    "kind": "product",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",
      "en": "Product photo"
    },
    "hint": {
      "vi": "M\xF3n CTV s\u1EBD b\xE1n; kh\xF4ng c\xF3 th\xEC Kallob v\u1EBD c\u1EA3nh \u0111\xF3ng h\xE0ng t\u1EA1i nh\xE0.",
      "en": "The item resellers will sell; without one, Kallob draws a home packing scene."
    }
  },
  "output": {
    "purpose": {
      "vi": "T\xECm ng\u01B0\u1EDDi b\xE1n c\xF9ng: bi\u1EBFn kh\xE1ch quen th\xE0nh c\u1ED9ng t\xE1c vi\xEAn, \u0111\u1EA1i l\xFD.",
      "en": "Find people to sell with you: turn regulars into resellers."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5: ch\u1EEF TUY\u1EC2N CTV \xB7 \u0110\u1EA0I L\xDD, quy\u1EC1n l\u1EE3i n\u1ED5i b\u1EADt v\xE0 c\xE1ch li\xEAn h\u1EC7.",
      "en": "A portrait 4:5 image: RESELLERS WANTED, the key benefit and how to get in touch."
    },
    "channels": {
      "vi": "B\xE0i Facebook, nh\xF3m Zalo, nh\xF3m kh\xE1ch quen.",
      "en": "Facebook posts, Zalo groups, regular-customer groups."
    }
  },
  "fields": [
    {
      "key": "benefit",
      "type": "text",
      "label": {
        "vi": "Quy\u1EC1n l\u1EE3i",
        "en": "Benefit"
      },
      "placeholder": {
        "vi": "VD: Chi\u1EBFt kh\u1EA5u \u0111\u1EBFn 30%",
        "en": "E.g. Up to 30% commission"
      },
      "options": [
        {
          "vi": "Chi\u1EBFt kh\u1EA5u \u0111\u1EBFn 30%",
          "en": "Up to 30% commission"
        },
        {
          "vi": "Kh\xF4ng c\u1EA7n v\u1ED1n, kh\xF4ng \xF4m h\xE0ng",
          "en": "No capital, no stock to hold"
        },
        {
          "vi": "C\xF3 h\u1ED7 tr\u1EE3 \u1EA3nh v\xE0 n\u1ED9i dung",
          "en": "Photos and content provided"
        },
        {
          "vi": "Shop giao h\xE0ng thay b\u1EA1n",
          "en": "We ship to your customers"
        },
        {
          "vi": "Chi\u1EBFt kh\u1EA5u cao \xB7 Kh\xF4ng c\u1EA7n v\u1ED1n \xB7 C\xF3 h\u1ED7 tr\u1EE3",
          "en": "High commission \xB7 No capital \xB7 Full support"
        }
      ]
    },
    {
      "key": "contact",
      "type": "text",
      "label": {
        "vi": "Li\xEAn h\u1EC7",
        "en": "Contact"
      },
      "placeholder": {
        "vi": "VD: Nh\u1EAFn Zalo 0901 234 567",
        "en": "E.g. Message Zalo 0901 234 567"
      }
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "top",
    "title": "TUY\u1EC2N CTV \xB7 \u0110\u1EA0I L\xDD",
    "lines": [
      "{{benefit}}",
      "{{contact}}"
    ]
  },
  "designNotes": "Inviting and trustworthy: selling with this shop looks easy and worth it. With a product photo, keep the product exactly as given as the single hero on a tidy table beside a phone and a few sealed parcel boxes, as if ready to ship to a reseller's customers; without a photo, show a bright home-business scene: a person seen from behind, or only their hands, packing orders next to a phone, warm and organised. Keep the scene in the lower 55% and the upper 45% a large, flat, high-contrast brand-colour field for the title, benefit and contact. Optimistic and professional; at most three colours. No piles of cash, money symbols, luxury cars or get-rich imagery, no handshake stock, and no numbers, percentages, logos or text.",
  "fixes": [
    {
      "vi": "Chuy\xEAn nghi\u1EC7p h\u01A1n",
      "en": "More professional"
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
  "order": 504
}
`, "image-recipe-retro": '{\n  "key": "retro",\n  "group": "portrait",\n  "name": {\n    "vi": "Ch\xE2n dung ho\xE0i c\u1ED5",\n    "en": "Retro portrait"\n  },\n  "icon": "hourglass",\n  "size": "portrait",\n  "input": {\n    "kind": "portrait",\n    "required": true,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh ch\xE2n dung c\u1EE7a b\u1EA1n",\n      "en": "Your portrait"\n    },\n    "hint": {\n      "vi": "R\xF5 m\u1EB7t, \u0111\u1EE7 s\xE1ng. Th\xEAm 2\u20133 \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi \u0111\u1EC3 gi\u1ED1ng h\u01A1n.",\n      "en": "Clear face, good light. Two or three photos of the same person look more like you."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "\u1EA2nh b\u1EAFt trend ho\xE0i c\u1ED5: ch\xEDnh b\u1EA1n nh\u01B0 b\u01B0\u1EDBc ra t\u1EEB m\u1ED9t t\u1EA5m \u1EA3nh x\u01B0a, d\u1EC5 \u0111\u01B0\u1EE3c th\u1EA3 tim v\xE0 chia s\u1EBB.",\n      "en": "A nostalgic trend shot: you as if from an old photo, easy to like and share."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: b\u1EA1n trong trang ph\u1EE5c, b\u1ED1i c\u1EA3nh v\xE0 ch\u1EA5t \u1EA3nh c\u1EE7a th\u1EDDi b\u1EA1n ch\u1ECDn.",\n      "en": "A portrait 4:5 image: you in the clothes, setting and film look of the era you choose."\n    },\n    "channels": {\n      "vi": "\u1EA2nh \u0111\u1EA1i di\u1EC7n, story, b\xE0i Facebook, Zalo, TikTok.",\n      "en": "Profile photos, stories, Facebook, Zalo and TikTok posts."\n    }\n  },\n  "fields": [\n    {\n      "key": "era",\n      "type": "text",\n      "label": {\n        "vi": "Th\u1EDDi",\n        "en": "Era"\n      },\n      "placeholder": {\n        "vi": "VD: S\xE0i G\xF2n th\u1EADp ni\xEAn 60",\n        "en": "E.g. 1960s Saigon"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "S\xE0i G\xF2n th\u1EADp ni\xEAn 60",\n          "en": "1960s Saigon"\n        },\n        {\n          "vi": "H\xE0 N\u1ED9i th\u1EDDi bao c\u1EA5p",\n          "en": "H\xE0 N\u1ED9i in the 1980s"\n        },\n        {\n          "vi": "Phim nh\u1EF1a th\u1EADp ni\xEAn 90",\n          "en": "1990s film"\n        },\n        {\n          "vi": "H\u1ED3ng K\xF4ng th\u1EADp ni\xEAn 90",\n          "en": "1990s Hong Kong"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "Keep the face exactly as in the photos (bone structure, eyes, nose, lips, skin tone, age, glasses, hairline, real skin texture); never slim, beautify or blend faces. Recreate the chosen era faithfully. 1960s Saigon: a fitted \xE1o d\xE0i or a crisp shirt, a Vespa or a caf\xE9 on a tree-lined boulevard, soft faded colour slide look. H\xE0 N\u1ED9i in the 1980s: simple period clothes, a bicycle, old shopfronts, muted colours with a slight green cast. 1990s film: candid flash, warm grain, slightly off-centre framing. 1990s Hong Kong: neon street at night, cinematic teal and red, a leather jacket or a slip dress. Period-correct hair and props, real film grain and gentle fading. No modern phones, cars or signs, no readable words.",\n  "fixes": [\n    {\n      "vi": "Gi\u1ED1ng m\u1EB7t t\xF4i h\u01A1n",\n      "en": "Look more like me"\n    },\n    {\n      "vi": "C\u0169 h\u01A1n, \u0111\u1EADm ch\u1EA5t phim h\u01A1n",\n      "en": "More vintage film"\n    },\n    {\n      "vi": "\u0110\u1ED5i trang ph\u1EE5c kh\xE1c",\n      "en": "Different outfit"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 808\n}\n', "image-recipe-return-policy": '{\n  "key": "return-policy",\n  "group": "trust",\n  "name": {\n    "vi": "\u0110\u1ED5i tr\u1EA3 \u2013 b\u1EA3o h\xE0nh",\n    "en": "Returns & warranty"\n  },\n  "icon": "shield",\n  "size": "portrait",\n  "input": null,\n  "output": {\n    "purpose": {\n      "vi": "M\u1ED9t t\u1EA5m th\u1EBB ch\xEDnh s\xE1ch \u0111\u1EC3 g\u1EEDi ngay khi kh\xE1ch c\xF2n lo, gi\xFAp h\u1ECD y\xEAn t\xE2m \u0111\u1EB7t h\xE0ng.",\n      "en": "A policy card to send when buyers hesitate, so they feel safe ordering."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: ti\xEAu \u0111\u1EC1 \u0110\u1ED4I TR\u1EA2 \u2013 B\u1EA2O H\xC0NH v\xE0 t\u1EEBng d\xF2ng ch\xEDnh s\xE1ch c\u1EE7a b\u1EA1n, g\u1ECDn v\xE0 d\u1EC5 \u0111\u1ECDc.",\n      "en": "A portrait 4:5 image: RETURNS & WARRANTY and each line of your policy, clean and readable."\n    },\n    "channels": {\n      "vi": "G\u1EEDi kh\xE1ch qua Zalo, Messenger; ghim b\xE0i Facebook; \u1EA3nh Shopee.",\n      "en": "Sent in Zalo and Messenger chats, pinned Facebook posts, Shopee images."\n    }\n  },\n  "fields": [\n    {\n      "key": "policy",\n      "type": "longtext",\n      "label": {\n        "vi": "Ch\xEDnh s\xE1ch (m\u1ED7i d\xF2ng m\u1ED9t \xFD)",\n        "en": "Policy (one line each)"\n      },\n      "placeholder": {\n        "vi": "VD:\\n\u0110\u01B0\u1EE3c ki\u1EC3m h\xE0ng tr\u01B0\u1EDBc khi tr\u1EA3 ti\u1EC1n\\n\u0110\u1ED5i size mi\u1EC5n ph\xED trong 7 ng\xE0y\\nL\u1ED7i do shop: ho\xE0n ti\u1EC1n 100%\\nB\u1EA3o h\xE0nh 3 th\xE1ng",\n        "en": "E.g.\\nCheck before you pay\\nFree size exchange within 7 days\\nOur mistake: 100% refund\\n3-month warranty"\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "list",\n    "zone": "center",\n    "title": "\u0110\u1ED4I TR\u1EA2 \u2013 B\u1EA2O H\xC0NH",\n    "items": "{{policy}}"\n  },\n  "designNotes": "A calm, trustworthy card that reads clearly on a phone in a chat. Keep a large clear centre panel area, about 70% of the height and 85% of the width, even in tone and low in detail. Around it, a quiet backdrop with one or two soft, relevant cues at the edges: a neatly taped parcel, a folded garment, a gentle shield-like curve of light. Clean, even light. A light neutral base with the brand colour as the accent; at most three colours, never alarming reds. No ticks, icons, stamps, seals, text, numbers, logos or invented guarantees; the policy words come only from the founder.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "G\u1ECDn, d\u1EC5 \u0111\u1ECDc tr\xEAn \u0111i\u1EC7n tho\u1EA1i h\u01A1n",\n      "en": "Easier to read on a phone"\n    }\n  ],\n  "order": 207\n}\n', "image-recipe-sale": '{\n  "key": "sale",\n  "group": "close",\n  "name": {\n    "vi": "\u1EA2nh gi\u1EA3m gi\xE1",\n    "en": "Price drop"\n  },\n  "icon": "sale",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Ch\u1EE5p r\xF5 c\u1EA3 s\u1EA3n ph\u1EA9m, \u0111\u1EE7 s\xE1ng. N\u1EC1n, ch\u1EEF hay sticker c\u0169 s\u1EBD \u0111\u01B0\u1EE3c b\u1ECF \u0111i.",\n      "en": "The whole product, well lit. Its old background, text and stickers are removed."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "B\xE1o gi\u1EA3m gi\xE1 m\u1ED9t s\u1EA3n ph\u1EA9m, k\xE9o kh\xE1ch b\u1EA5m mua ngay; th\xEAm khung gi\u1EDD \u0111\u1EC3 th\xE0nh flash sale.",\n      "en": "Announce a price drop and get people to buy now; add a time window to make it a flash sale."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: s\u1EA3n ph\u1EA9m c\u1EE7a b\u1EA1n tr\xEAn n\u1EC1n m\u1EDBi, gi\xE1 c\u0169 g\u1EA1ch ngang, gi\xE1 m\u1EDBi v\xE0 % gi\u1EA3m n\u1ED5i b\u1EADt, d\xF2ng FLASH SALE n\u1EBFu c\xF3 khung gi\u1EDD.",\n      "en": "A square image: your product on a new background, the old price struck through, the new price and % off, and a FLASH SALE line when there is a time window."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, livestream, \u1EA3nh s\u1EA3n ph\u1EA9m Shopee.",\n      "en": "Facebook and Zalo posts, stories, livestreams, Shopee product images."\n    }\n  },\n  "fields": [\n    {\n      "key": "oldPrice",\n      "type": "price",\n      "label": {\n        "vi": "Gi\xE1 g\u1ED1c",\n        "en": "Original price"\n      },\n      "placeholder": {\n        "vi": "VD: 450000",\n        "en": "E.g. 450000"\n      },\n      "required": true\n    },\n    {\n      "key": "newPrice",\n      "type": "price",\n      "label": {\n        "vi": "Gi\xE1 gi\u1EA3m",\n        "en": "Sale price"\n      },\n      "placeholder": {\n        "vi": "VD: 315000",\n        "en": "E.g. 315000"\n      },\n      "required": true\n    },\n    {\n      "key": "window",\n      "type": "text",\n      "label": {\n        "vi": "Khung gi\u1EDD flash sale",\n        "en": "Flash sale window"\n      },\n      "placeholder": {\n        "vi": "VD: 20h\u201322h t\u1ED1i nay",\n        "en": "E.g. 8\u201310 pm tonight"\n      },\n      "required": false,\n      "options": [\n        { "vi": "Ch\u1EC9 h\xF4m nay", "en": "Today only" },\n        { "vi": "20h\u201322h t\u1ED1i nay", "en": "8\u201310 pm tonight" },\n        { "vi": "12h\u201314h tr\u01B0a nay", "en": "Noon\u20132 pm today" },\n        { "vi": "3 ng\xE0y cu\u1ED1i tu\u1EA7n", "en": "This weekend, 3 days" },\n        { "vi": "\u0110\u1EBFn h\u1EBFt Ch\u1EE7 nh\u1EADt n\xE0y", "en": "Until this Sunday" },\n        { "vi": "Ch\u1EC9 trong 2 gi\u1EDD", "en": "For 2 hours only" }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "price",\n    "zone": "bottom",\n    "oldPrice": "oldPrice",\n    "newPrice": "newPrice",\n    "lines": [\n      "FLASH SALE \xB7 {{window}}"\n    ]\n  },\n  "designNotes": "Put one hero product, fully visible, in the upper 60\u201365% of the frame, slightly off-centre, filling 40\u201370% of that area, on a clean matte surface with a soft shadow. Keep the lower 35% calm and low-detail (a smooth gradient or plain surface) and the top-right corner clear for the % badge. Bright, even studio light so materials look true; a warm red, coral or orange accent field built from the brand colour, at most three colours. Only when a flash sale window is given, make it urgent through energy, not clutter: a hotter red-to-orange or deep red with yellow-gold, a crisp rim light, and one dynamic device (diagonal light streaks or a soft speed-blur behind the product, never across it). No confetti, lightning bolts, clocks, extra props, duplicate products, text, numbers or price tags; the product must look accurate.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "G\u1EA5p g\xE1p, r\u1EF1c l\u1EEDa h\u01A1n",\n      "en": "More urgent, hotter"\n    },\n    {\n      "vi": "Sang tr\u1ECDng h\u01A1n",\n      "en": "More premium"\n    },\n    {\n      "vi": "\u0110\u1ED5i b\u1ED1i c\u1EA3nh kh\xE1c",\n      "en": "A different setting"\n    }\n  ],\n  "order": 300\n}\n', "image-recipe-share-reward": '{\n  "key": "share-reward",\n  "group": "spread",\n  "name": {\n    "vi": "Khoe \u1EA3nh nh\u1EADn qu\xE0",\n    "en": "Share a photo, get a gift"\n  },\n  "icon": "share",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "M\xF3n b\u1EA1n mu\u1ED1n kh\xE1ch khoe; kh\xF4ng c\xF3 th\xEC Kallob v\u1EBD c\u1EA3nh m\u1EDF h\xE0ng chung.",\n      "en": "The item you want buyers to show off; without one, Kallob draws a general unboxing."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "R\u1EE7 kh\xE1ch \u0111\u0103ng \u1EA3nh m\xF3n \u0111\xE3 mua v\xE0 tag shop \u0111\u1EC3 nh\u1EADn qu\xE0.",\n      "en": "Get buyers to post a photo of their purchase and tag you for a gift."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: ch\u1EEF KHOE \u1EA2NH \xB7 NH\u1EACN QU\xC0, c\xE1ch tham gia v\xE0 m\xF3n qu\xE0.",\n      "en": "A square image: SHARE A PHOTO, GET A GIFT, how to take part and the gift."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, g\u1EEDi k\xE8m \u0111\u01A1n h\xE0ng, thi\u1EC7p trong h\u1ED9p.",\n      "en": "Facebook and Zalo posts, sent with orders, an insert card in the box."\n    }\n  },\n  "fields": [\n    {\n      "key": "how",\n      "type": "text",\n      "label": {\n        "vi": "C\xE1ch tham gia",\n        "en": "How to take part"\n      },\n      "placeholder": {\n        "vi": "VD: \u0110\u0103ng \u1EA3nh l\xEAn Facebook, tag shop",\n        "en": "E.g. Post a photo on Facebook and tag the shop"\n      },\n      "options": [\n        {\n          "vi": "\u0110\u0103ng \u1EA3nh l\xEAn Facebook, tag shop",\n          "en": "Post a photo on Facebook and tag the shop"\n        },\n        {\n          "vi": "\u0110\u0103ng story, tag shop",\n          "en": "Post a story and tag the shop"\n        },\n        {\n          "vi": "G\u1EEDi \u1EA3nh cho shop qua Zalo",\n          "en": "Send the shop your photo on Zalo"\n        },\n        {\n          "vi": "\u0110\xE1nh gi\xE1 5 sao k\xE8m \u1EA3nh tr\xEAn Shopee",\n          "en": "Leave a 5-star review with a photo on Shopee"\n        }\n      ],\n      "default": "\u0110\u0103ng \u1EA3nh l\xEAn Facebook, tag shop"\n    },\n    {\n      "key": "gift",\n      "type": "text",\n      "label": {\n        "vi": "Qu\xE0 t\u1EB7ng",\n        "en": "Gift"\n      },\n      "placeholder": {\n        "vi": "VD: Voucher 50.000\u0111",\n        "en": "E.g. A 50,000\u0111 voucher"\n      },\n      "options": [\n        {\n          "vi": "Voucher 50.000\u0111",\n          "en": "A 50,000\u0111 voucher"\n        },\n        {\n          "vi": "Gi\u1EA3m 10% \u0111\u01A1n sau",\n          "en": "10% off the next order"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n sau",\n          "en": "Free shipping on the next order"\n        },\n        {\n          "vi": "T\u1EB7ng 1 ph\u1EA7n qu\xE0 nh\u1ECF",\n          "en": "A small free gift"\n        },\n        {\n          "vi": "B\u1ED1c th\u0103m qu\xE0 cu\u1ED1i th\xE1ng",\n          "en": "A prize draw at the end of the month"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "KHOE \u1EA2NH \xB7 NH\u1EACN QU\xC0",\n    "lines": [\n      "{{how}}",\n      "Nh\u1EADn ngay: {{gift}}"\n    ]\n  },\n  "designNotes": "A friendly invitation to join in. Show a happy moment of a buyer photographing their purchase: hands holding a smartphone over the product on a cosy table, or an unboxing with tissue paper and a small gift tag beside it; with a product photo, keep the product exactly as given as the thing being photographed. The phone screen shows only the photo being taken, never an app interface, likes, comments, usernames or text. Subject in the upper 60%, the lower 35\u201340% calm and even for the call to post and the gift. Bright, natural home light; the brand colour as the main tone with one cheerful accent; at most three colours. One small wrapped gift may sit nearby to hint at the reward. No faces needed, and no logos, hashtags, numbers or text.",\n  "fixes": [\n    {\n      "vi": "Vui t\u01B0\u01A1i h\u01A1n",\n      "en": "More playful"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 502\n}\n', "image-recipe-shop-banner": `{
  "key": "shop-banner",
  "group": "brand",
  "name": {
    "vi": "Banner gian h\xE0ng",
    "en": "Shop banner"
  },
  "icon": "banner",
  "size": "landscape",
  "input": {
    "kind": "any",
    "required": false,
    "max": 3,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m ho\u1EB7c c\u1EEDa h\xE0ng",
      "en": "Product or shop photos"
    },
    "hint": {
      "vi": "Th\xEAm 1\u20133 s\u1EA3n ph\u1EA9m b\xE1n ch\u1EA1y ho\u1EB7c \u1EA3nh c\u1EEDa h\xE0ng \u0111\u1EC3 banner \u0111\xFAng l\xE0 shop b\u1EA1n.",
      "en": "Add one to three best sellers or a shop photo so the banner is clearly your shop."
    }
  },
  "output": {
    "purpose": {
      "vi": "\u0110\u1EA7u trang gian h\xE0ng \u0111\u1EB9p, nh\xECn l\xE0 bi\u1EBFt shop b\xE1n g\xEC v\xE0 \u0111\xE1ng tin.",
      "en": "A shop header that shows at a glance what you sell and that you are worth trusting."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh ngang 16:9: s\u1EA3n ph\u1EA9m ho\u1EB7c kh\xF4ng gian shop c\u1EE7a b\u1EA1n, t\xEAn shop v\xE0 m\u1ED9t c\xE2u slogan n\u1EBFu b\u1EA1n ch\u1ECDn.",
      "en": "A landscape 16:9 image: your products or shop, your shop name and a slogan if you pick one."
    },
    "channels": {
      "vi": "Banner gian h\xE0ng Shopee, TikTok Shop, \u1EA3nh b\xECa Zalo OA, Fanpage, \u0111\u1EA7u trang website.",
      "en": "Shopee and TikTok Shop banners, Zalo OA and Facebook Page covers, website headers."
    }
  },
  "fields": [
    {
      "key": "slogan",
      "type": "text",
      "label": {
        "vi": "C\xE2u slogan",
        "en": "Slogan"
      },
      "placeholder": {
        "vi": "VD: H\xE0ng chu\u1EA9n, gi\xE1 t\u1ED1t, giao nhanh",
        "en": "E.g. Genuine goods, fair prices, fast delivery"
      },
      "required": false,
      "options": [
        {
          "vi": "H\xE0ng chu\u1EA9n, gi\xE1 t\u1ED1t, giao nhanh",
          "en": "Genuine goods, fair prices, fast delivery"
        },
        {
          "vi": "Ch\xEDnh h\xE3ng 100%, \u0111\u1ED5i tr\u1EA3 d\u1EC5 d\xE0ng",
          "en": "100% genuine, easy returns"
        },
        {
          "vi": "Handmade v\u1EDBi c\u1EA3 t\u1EA5m l\xF2ng",
          "en": "Handmade with heart"
        },
        {
          "vi": "Freeship to\xE0n qu\u1ED1c",
          "en": "Free shipping nationwide"
        },
        {
          "vi": "\u0110\u1EB9p m\u1ED7i ng\xE0y, gi\xE1 v\u1EEBa t\xFAi ti\u1EC1n",
          "en": "Look good every day, on any budget"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{slogan}}"
  },
  "designNotes": "A wide, clean storefront header. If photos are given, keep each product or the real shop exactly (shape, colour, label text) and arrange them as a tidy group on the right half, products on a shared surface with soft shadows, like a styled shelf; with no photos, show a calm still life or interior from the shop's niche. Keep the left 45% and the lower 35% a smooth, even field from the brand colour (a soft gradient or a plain wall) for the shop name and slogan. Marketplaces and Zalo crop the edges and overlay buttons, so keep products inside the central 80%. Bright, even light, at most three colours, one brand accent. No text, prices, discount badges, logos, icons or extra products.",
  "fixes": [
    {
      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",
      "en": "Bigger, clearer products"
    },
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
  "order": 703
}
`, "image-recipe-size-chart": '{\n  "key": "size-chart",\n  "group": "close",\n  "name": {\n    "vi": "B\u1EA3ng size / ph\xE2n lo\u1EA1i",\n    "en": "Size chart"\n  },\n  "icon": "ruler",\n  "size": "portrait",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh s\u1EA3n ph\u1EA9m \u0111\u1EC3 kh\xE1ch bi\u1EBFt b\u1EA3ng size n\xE0y c\u1EE7a m\xF3n n\xE0o.",\n      "en": "Add the product so buyers know which item the chart is for."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Gi\xFAp kh\xE1ch t\u1EF1 ch\u1ECDn \u0111\xFAng size hay ph\xE2n lo\u1EA1i, g\u1EEDi ngay khi kh\xE1ch h\u1ECFi, b\u1EDBt \u0111\u1ED5i tr\u1EA3.",\n      "en": "Help buyers pick the right size or variant themselves, sent when they ask, with fewer returns."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5: s\u1EA3n ph\u1EA9m ph\xEDa tr\xEAn, b\u1EA3ng size g\u1ECDn g\xE0ng b\xEAn d\u01B0\u1EDBi, m\u1ED7i d\xF2ng m\u1ED9t size.",\n      "en": "A portrait 4:5 image: the product on top, a neat size table below, one size per row."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, \u1EA3nh s\u1EA3n ph\u1EA9m Shopee, TikTok Shop.",\n      "en": "Zalo and Messenger chats, Shopee and TikTok Shop product images."\n    }\n  },\n  "fields": [\n    {\n      "key": "heading",\n      "type": "text",\n      "label": {\n        "vi": "Ti\xEAu \u0111\u1EC1",\n        "en": "Title"\n      },\n      "placeholder": {\n        "vi": "VD: B\u1EA2NG SIZE",\n        "en": "E.g. SIZE CHART"\n      },\n      "required": false,\n      "options": [\n        { "vi": "B\u1EA2NG SIZE", "en": "SIZE CHART" },\n        { "vi": "CH\u1ECCN SIZE THEO C\xC2N N\u1EB6NG", "en": "SIZE BY WEIGHT" },\n        { "vi": "B\u1EA2NG SIZE GI\xC0Y", "en": "SHOE SIZES" },\n        { "vi": "B\u1EA2NG PH\xC2N LO\u1EA0I", "en": "VARIANTS" },\n        { "vi": "B\u1EA2NG DUNG T\xCDCH", "en": "SIZES AND VOLUMES" }\n      ],\n      "default": "B\u1EA2NG SIZE"\n    },\n    {\n      "key": "rows",\n      "type": "longtext",\n      "label": {\n        "vi": "C\xE1c size (m\u1ED7i d\xF2ng: Size | c\xE2n n\u1EB7ng | chi\u1EC1u cao)",\n        "en": "Sizes (one per line: Size | weight | height)"\n      },\n      "placeholder": {\n        "vi": "VD: S | 45\u201352 kg | 150\u2013158 cm\\nM | 53\u201360 kg | 158\u2013165 cm\\nL | 61\u201368 kg | 165\u2013172 cm",\n        "en": "E.g. S | 45\u201352 kg | 150\u2013158 cm\\nM | 53\u201360 kg | 158\u2013165 cm\\nL | 61\u201368 kg | 165\u2013172 cm"\n      },\n      "required": true\n    }\n  ],\n  "overlay": {\n    "layout": "list",\n    "zone": "bottom",\n    "title": "{{heading}}",\n    "items": "{{rows}}"\n  },\n  "designNotes": "Clean and practical, like a good marketplace detail image. If a product photo is given, show the product exactly as given (same cut, colour and details), laid flat or on an invisible mannequin, centred in the upper 40% of the frame with a soft shadow. With no photo, put a quiet, niche-appropriate cue there instead (a folded garment, a measuring tape, a shoe box) without inventing a specific product. Keep the lower 55\u201360% a smooth, even, light surface for the size table. Bright, neutral daylight; a soft palette from the brand colour, at most three colours. No text, numbers, measurement marks, rulers with digits, tags, logos or extra products.",\n  "fixes": [\n    {\n      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",\n      "en": "Bigger, clearer product"\n    },\n    {\n      "vi": "N\u1EC1n s\xE1ng v\xE0 s\u1EA1ch h\u01A1n",\n      "en": "Lighter, cleaner background"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 306\n}\n', "image-recipe-speaker": `{
  "key": "speaker",
  "group": "portrait",
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
      "key": "setting",
      "type": "text",
      "label": {
        "vi": "B\u1ED1i c\u1EA3nh",
        "en": "Setting"
      },
      "placeholder": {
        "vi": "VD: L\u1EDBp workshop nh\u1ECF",
        "en": "E.g. A small workshop"
      },
      "required": false,
      "options": [
        {
          "vi": "S\xE2n kh\u1EA5u h\u1ED9i th\u1EA3o",
          "en": "Conference stage"
        },
        {
          "vi": "L\u1EDBp workshop nh\u1ECF",
          "en": "A small workshop"
        },
        {
          "vi": "Talkshow tr\xEAn gh\u1EBF",
          "en": "Seated talk show"
        },
        {
          "vi": "Ph\xF2ng h\u1ECDp doanh nghi\u1EC7p",
          "en": "Company meeting room"
        },
        {
          "vi": "S\u1EF1 ki\u1EC7n ngo\xE0i tr\u1EDDi",
          "en": "Outdoor event"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "none"
  },
  "designNotes": "Mid-sentence and mid-gesture: an open hand, engaged expression, a handheld or lapel mic, away from any podium. Camera slightly below eye level, the speaker sharp, the backs of a few audience heads softly out of focus in the foreground. Use the chosen setting; when empty, a modest, believable venue (a hotel conference room or a co-working workshop) with a warm stage light on the speaker and a cooler room. For a talk show, two armchairs and a low table; outdoors, a small stage in late-afternoon light. Any screen behind shows only an abstract colour slide or soft light, never words, logos or charts. Business-casual clothes. Keep the speaker's face exactly; no crowd of identical faces, no podium logos or text.",
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
  "order": 806
}
`, "image-recipe-teachers-day": `{
  "key": "teachers-day",
  "group": "season",
  "name": {
    "vi": "20/11 Nh\xE0 gi\xE1o",
    "en": "Teachers' Day 20/11"
  },
  "icon": "teacher",
  "size": "portrait",
  "input": {
    "kind": "any",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",
      "en": "Your product, shop or you"
    },
    "hint": {
      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m l\xE0m qu\xE0 tri \xE2n, c\u1EEDa h\xE0ng ho\u1EB7c \u1EA3nh c\u1EE7a b\u1EA1n.",
      "en": "Add a product as a thank-you gift, your shop or yourself."
    }
  },
  "output": {
    "purpose": {
      "vi": "Tri \xE2n th\u1EA7y c\xF4 ng\xE0y 20/11 v\xE0 g\u1EE3i \xFD qu\xE0 t\u1EB7ng th\u1EA7y c\xF4.",
      "en": "Thank teachers on 20 November and suggest gifts for them."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5 \u1EA5m \xE1p: hoa, s\xE1ch, b\xFAt, l\u1EDDi tri \xE2n v\xE0 \u01B0u \u0111\xE3i n\u1EBFu c\xF3.",
      "en": "A warm portrait 4:5 image: flowers, books, a pen, your thank-you message and an offer if any."
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
        "vi": "VD: Tri \xE2n th\u1EA7y c\xF4 20/11",
        "en": "E.g. Thank you, teachers"
      },
      "required": false,
      "options": [
        {
          "vi": "Tri \xE2n th\u1EA7y c\xF4 20/11",
          "en": "Thank you, teachers, on 20 November"
        },
        {
          "vi": "Ch\xFAc m\u1EEBng ng\xE0y Nh\xE0 gi\xE1o Vi\u1EC7t Nam 20/11",
          "en": "Happy Vietnamese Teachers' Day"
        },
        {
          "vi": "C\u1EA3m \u01A1n th\u1EA7y c\xF4",
          "en": "Thank you, teachers"
        },
        {
          "vi": "K\xEDnh ch\xFAc th\u1EA7y c\xF4 lu\xF4n m\u1EA1nh kho\u1EBB",
          "en": "Wishing our teachers good health"
        },
        {
          "vi": "Qu\xE0 tri \xE2n th\u1EA7y c\xF4",
          "en": "Thank-you gifts for teachers"
        }
      ],
      "default": "Tri \xE2n th\u1EA7y c\xF4 20/11"
    },
    {
      "key": "offer",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i",
        "en": "Offer"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EA3m 20% qu\xE0 t\u1EB7ng th\u1EA7y c\xF4",
        "en": "E.g. 20% off gifts for teachers"
      },
      "required": false,
      "options": [
        {
          "vi": "Gi\u1EA3m 20% qu\xE0 t\u1EB7ng th\u1EA7y c\xF4",
          "en": "20% off gifts for teachers"
        },
        {
          "vi": "T\u1EB7ng thi\u1EC7p v\xE0 g\xF3i qu\xE0 mi\u1EC5n ph\xED",
          "en": "Free card and gift wrapping"
        },
        {
          "vi": "Freeship \u0111\u01A1n qu\xE0 20/11",
          "en": "Free shipping on 20 November gifts"
        },
        {
          "vi": "\u01AFu \u0111\xE3i ri\xEAng cho gi\xE1o vi\xEAn",
          "en": "A special deal for teachers"
        },
        {
          "vi": "\u0110\u1EB7t hoa, qu\xE0 giao t\u1EADn tr\u01B0\u1EDDng",
          "en": "Flowers and gifts delivered to the school"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{greeting}}",
    "lines": [
      "{{offer}}"
    ]
  },
  "designNotes": "Warm, grateful and calm. The product, shop or person sits in the upper 60%, beside a bouquet of roses or carnations, a stack of hardback books, a fountain pen and a cup of tea on a wooden desk, soft morning window light. With a portrait, keep the face exactly and add flowers and books around the person; with no photo, the bouquet and books are the hero, maybe a white \xE1o d\xE0i silhouette softly out of focus. Keep the lower 35% calm (cream paper texture or soft chalkboard green) for the message and an optional offer line. Cream, sage or chalkboard green and one brand accent. No school logos, writing on books or boards, text, numbers or fake certificates.",
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
      "from": "10-25",
      "to": "11-20"
    }
  ],
  "order": 607
}
`, "image-recipe-testimonial": '{\n  "key": "testimonial",\n  "group": "trust",\n  "name": {\n    "vi": "Feedback kh\xE1ch h\xE0ng",\n    "en": "Customer feedback"\n  },\n  "icon": "quote",\n  "size": "square",\n  "input": {\n    "kind": "screenshot",\n    "required": true,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh ch\u1EE5p feedback",\n      "en": "Feedback screenshot"\n    },\n    "hint": {\n      "vi": "\u1EA2nh ch\u1EE5p m\xE0n h\xECnh tin nh\u1EAFn ho\u1EB7c \u0111\xE1nh gi\xE1 th\u1EADt c\u1EE7a kh\xE1ch.",\n      "en": "A screenshot of a real customer message or review."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Khoe \u0111\xE1nh gi\xE1 th\u1EADt c\u1EE7a kh\xE1ch \u0111\u1EC3 ng\u01B0\u1EDDi sau tin v\xE0 mua.",\n      "en": "Show a real review so the next buyer trusts you."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng: \u1EA3nh ch\u1EE5p feedback c\u1EE7a b\u1EA1n \u0111\u01B0\u1EE3c \u0111\u1EB7t trong khung \u0111\u1EB9p, gi\u1EEF nguy\xEAn t\u1EEBng ch\u1EEF.",\n      "en": "A square image: your feedback screenshot in a designed frame, every word unchanged."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, story, highlight.",\n      "en": "Facebook and Zalo posts, stories, highlights."\n    }\n  },\n  "fields": [],\n  "overlay": {\n    "layout": "none"\n  },\n  "designNotes": "The screenshot is the proof: never redraw, crop text from, re-letter or improve it. Design only the frame: a soft brand-coloured or neutral background with subtle texture, the screenshot in a phone mockup or a rounded card with a gentle drop shadow, centred, 60\u201370% of the height. Restrained accents only: one large faint quotation-mark shape, small hearts or stars in the corners, or a thin frame line. Generous margins so it reads at feed size; minimal branding. A loud poster look makes the review feel staged.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "order": 200\n}\n', "image-recipe-tet": '{\n  "key": "tet",\n  "group": "season",\n  "name": {\n    "vi": "Ch\xFAc T\u1EBFt",\n    "en": "T\u1EBFt greeting"\n  },\n  "icon": "blossom",\n  "size": "portrait",\n  "input": {\n    "kind": "any",\n    "required": false,\n    "max": 3,\n    "label": {\n      "vi": "\u1EA2nh c\u1EE7a b\u1EA1n ho\u1EB7c s\u1EA3n ph\u1EA9m",\n      "en": "You or your product"\n    },\n    "hint": {\n      "vi": "Th\xEAm ch\xE2n dung, s\u1EA3n ph\u1EA9m ho\u1EB7c c\u1EEDa h\xE0ng n\u1EBFu mu\u1ED1n xu\u1EA5t hi\u1EC7n trong \u1EA3nh T\u1EBFt.",\n      "en": "Add a portrait, product or shop photo to appear in the T\u1EBFt image."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "Ch\xFAc T\u1EBFt kh\xE1ch h\xE0ng, \u0111\u1ED1i t\xE1c; \u1EA5m \xE1p v\xE0 mang d\u1EA5u \u1EA5n th\u01B0\u01A1ng hi\u1EC7u.",\n      "en": "Send T\u1EBFt wishes to customers and partners, warm and on-brand."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh d\u1ECDc 4:5 kh\xF4ng kh\xED T\u1EBFt Vi\u1EC7t (mai, \u0111\xE0o, \u0111\u1ECF v\xE0ng), l\u1EDDi ch\xFAc c\u1EE7a b\u1EA1n, \u01B0u \u0111\xE3i \u0111\u1EA7u n\u0103m n\u1EBFu c\xF3 v\xE0 t\xEAn shop.",\n      "en": "A portrait 4:5 image in a Vietnamese T\u1EBFt mood (apricot and peach blossom, red and gold), your greeting, a New Year offer if any, and your shop name."\n    },\n    "channels": {\n      "vi": "B\xE0i Facebook, Zalo, thi\u1EC7p \u0111i\u1EC7n t\u1EED.",\n      "en": "Facebook and Zalo posts, e-cards."\n    }\n  },\n  "fields": [\n    {\n      "key": "greeting",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi ch\xFAc",\n        "en": "Greeting"\n      },\n      "placeholder": {\n        "vi": "VD: Ch\xFAc M\u1EEBng N\u0103m M\u1EDBi",\n        "en": "E.g. Happy New Year"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Ch\xFAc M\u1EEBng N\u0103m M\u1EDBi",\n          "en": "Happy New Year"\n        },\n        {\n          "vi": "An Khang Th\u1ECBnh V\u01B0\u1EE3ng",\n          "en": "Peace and prosperity"\n        },\n        {\n          "vi": "V\u1EA1n S\u1EF1 Nh\u01B0 \xDD",\n          "en": "May all your wishes come true"\n        },\n        {\n          "vi": "Xu\xE2n Sum V\u1EA7y",\n          "en": "A spring of togetherness"\n        },\n        {\n          "vi": "N\u0103m M\u1EDBi Ph\xE1t T\xE0i",\n          "en": "A prosperous New Year"\n        },\n        {\n          "vi": "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u1ED3ng h\xE0nh su\u1ED1t m\u1ED9t n\u0103m",\n          "en": "Thank you for a year together"\n        }\n      ],\n      "default": "Ch\xFAc M\u1EEBng N\u0103m M\u1EDBi"\n    },\n    {\n      "key": "offer",\n      "type": "text",\n      "label": {\n        "vi": "\u01AFu \u0111\xE3i",\n        "en": "Offer"\n      },\n      "placeholder": {\n        "vi": "VD: L\xEC x\xEC 10% cho \u0111\u01A1n \u0111\u1EA7u n\u0103m",\n        "en": "E.g. A 10% lucky-money discount on your first order"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "L\xEC x\xEC 10% cho \u0111\u01A1n \u0111\u1EA7u n\u0103m",\n          "en": "A 10% lucky-money discount on your first order"\n        },\n        {\n          "vi": "M\u1EDF h\xE0ng \u0111\u1EA7u n\u0103m: gi\u1EA3m 15%",\n          "en": "New Year opening deal: 15% off"\n        },\n        {\n          "vi": "T\u1EB7ng bao l\xEC x\xEC cho m\u1ECDi \u0111\u01A1n",\n          "en": "Free lucky-money envelopes with every order"\n        },\n        {\n          "vi": "Freeship \u0111\u01A1n qu\xE0 T\u1EBFt",\n          "en": "Free shipping on T\u1EBFt gifts"\n        },\n        {\n          "vi": "Nh\u1EADn \u0111\u1EB7t qu\xE0 T\u1EBFt \u0111\u1EBFn 27 T\u1EBFt",\n          "en": "T\u1EBFt gift orders until the 27th of the last lunar month"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "top",\n    "title": "{{greeting}}",\n    "lines": [\n      "{{offer}}"\n    ]\n  },\n  "designNotes": "Unmistakably Vietnamese T\u1EBFt: hoa mai v\xE0ng (South) or hoa \u0111\xE0o h\u1ED3ng (North), b\xE1nh ch\u01B0ng or b\xE1nh t\xE9t, m\xE2m ng\u0169 qu\u1EA3, l\xEC x\xEC, blank \xF4ng \u0111\u1ED3 calligraphy paper; warm golden light with bokeh. The portrait, product or shop sits in the lower or centre part, framed by blossom branches; with no photo, let a blossom branch and l\xEC x\xEC envelopes fill the lower half. Keep the upper 35% a calm soft red or cream gradient for the greeting and an optional offer line. Red-gold with cream relief; modern brands can use pastel pink and green. Never Chinese characters, couplet text, Chinese-style dragons, the rabbit (Vietnam uses the cat) or god-of-wealth figures, and no text or numbers anywhere.",\n  "fixes": [\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "N\u1ED5i b\u1EADt, r\u1EF1c r\u1EE1 h\u01A1n",\n      "en": "Bolder, more vivid"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    }\n  ],\n  "seasons": [\n    {\n      "from": "12-10",\n      "to": "02-28"\n    }\n  ],\n  "order": 600\n}\n', "image-recipe-thank-you": '{\n  "key": "thank-you",\n  "group": "care",\n  "name": {\n    "vi": "C\u1EA3m \u01A1n \u0111\xE3 mua",\n    "en": "Thank you for your order"\n  },\n  "icon": "heart",\n  "size": "square",\n  "input": {\n    "kind": "product",\n    "required": false,\n    "max": 1,\n    "label": {\n      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",\n      "en": "Product photo"\n    },\n    "hint": {\n      "vi": "Th\xEAm \u1EA3nh m\xF3n kh\xE1ch v\u1EEBa mua \u0111\u1EC3 t\u1EA5m thi\u1EC7p g\u1EA7n g\u0169i h\u01A1n; kh\xF4ng c\xF3 c\u0169ng \u0111\u01B0\u1EE3c.",\n      "en": "Add the item they bought for a more personal card; it works without one too."\n    }\n  },\n  "output": {\n    "purpose": {\n      "vi": "C\u1EA3m \u01A1n kh\xE1ch v\u1EEBa mua \u0111\u1EC3 h\u1ECD nh\u1EDB shop v\xE0 quay l\u1EA1i.",\n      "en": "Thank a new buyer so they remember you and come back."\n    },\n    "deliverable": {\n      "vi": "1 \u1EA3nh vu\xF4ng nh\u01B0 t\u1EA5m thi\u1EC7p: ch\u1EEF C\u1EA2M \u01A0N B\u1EA0N, l\u1EDDi nh\u1EAFn c\u1EE7a shop v\xE0 qu\xE0 cho \u0111\u01A1n sau n\u1EBFu c\xF3.",\n      "en": "A square card-like image: THANK YOU, your note and a next-order perk if you add one."\n    },\n    "channels": {\n      "vi": "Tin nh\u1EAFn Zalo, Messenger, in k\xE8m trong \u0111\u01A1n h\xE0ng.",\n      "en": "Zalo and Messenger chats, printed into the parcel."\n    }\n  },\n  "fields": [\n    {\n      "key": "message",\n      "type": "text",\n      "label": {\n        "vi": "L\u1EDDi nh\u1EAFn",\n        "en": "Note"\n      },\n      "placeholder": {\n        "vi": "VD: Mong b\u1EA1n s\u1EBD th\xEDch m\xF3n \u0111\u1ED3 n\xE0y",\n        "en": "E.g. We hope you love it"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Mong b\u1EA1n s\u1EBD th\xEDch m\xF3n \u0111\u1ED3 n\xE0y",\n          "en": "We hope you love it"\n        },\n        {\n          "vi": "Shop g\xF3i \u0111\u01A1n n\xE0y b\u1EB1ng c\u1EA3 t\u1EA5m l\xF2ng",\n          "en": "Packed with care, just for you"\n        },\n        {\n          "vi": "Ch\xFAc b\u1EA1n th\u1EADt vui v\u1EDBi m\xF3n \u0111\u1ED3 m\u1EDBi",\n          "en": "Enjoy your new piece"\n        },\n        {\n          "vi": "C\xF3 g\xEC ch\u01B0a \u01B0ng, nh\u1EAFn shop ngay nh\xE9",\n          "en": "Anything not right? Just message us"\n        },\n        {\n          "vi": "H\u1EB9n g\u1EB7p l\u1EA1i b\u1EA1n \u1EDF \u0111\u01A1n sau nh\xE9!",\n          "en": "See you on your next order!"\n        }\n      ],\n      "default": "Mong b\u1EA1n s\u1EBD th\xEDch m\xF3n \u0111\u1ED3 n\xE0y"\n    },\n    {\n      "key": "perk",\n      "type": "text",\n      "label": {\n        "vi": "Qu\xE0 cho \u0111\u01A1n sau",\n        "en": "Next-order perk"\n      },\n      "placeholder": {\n        "vi": "VD: Gi\u1EA3m 10% cho \u0111\u01A1n sau",\n        "en": "E.g. 10% off your next order"\n      },\n      "required": false,\n      "options": [\n        {\n          "vi": "Gi\u1EA3m 10% cho \u0111\u01A1n sau",\n          "en": "10% off your next order"\n        },\n        {\n          "vi": "Freeship cho \u0111\u01A1n sau",\n          "en": "Free shipping on your next order"\n        },\n        {\n          "vi": "Gi\u1EA3m 20.000\u0111 cho \u0111\u01A1n sau",\n          "en": "20,000\u0111 off your next order"\n        },\n        {\n          "vi": "T\u1EB7ng qu\xE0 nh\u1ECF \u1EDF \u0111\u01A1n sau",\n          "en": "A small gift with your next order"\n        }\n      ]\n    }\n  ],\n  "overlay": {\n    "layout": "banner",\n    "zone": "bottom",\n    "title": "C\u1EA2M \u01A0N B\u1EA0N",\n    "lines": [\n      "{{message}}",\n      "{{perk}}"\n    ]\n  },\n  "designNotes": "A warm thank-you card a buyer is glad to find in the parcel or in a chat. If a product photo is given, keep the product exactly as it is and place it in the upper 60% on a soft surface beside gentle gift cues: tissue paper, a kraft box, a ribbon, a small sprig of dried flowers. With no photo, compose these packaging and gift cues alone, cosy and hand-made in feel. Keep the lower 35% calm and even (paper texture or a soft gradient) for the words. Soft daylight, a gentle palette built from the brand colour with cream or blush; at most three colours. No text, numbers, logos, handwriting, prices, extra products or invented stickers; it should feel personal, never like an advert.",\n  "fixes": [\n    {\n      "vi": "\u1EA4m \xE1p, g\u1EA7n g\u0169i h\u01A1n",\n      "en": "Warmer and friendlier"\n    },\n    {\n      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",\n      "en": "Calmer, more minimal"\n    },\n    {\n      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",\n      "en": "Closer to my brand colours"\n    },\n    {\n      "vi": "\u0110\u1ED5i ki\u1EC3u g\xF3i qu\xE0 kh\xE1c",\n      "en": "A different gift wrap"\n    }\n  ],\n  "order": 400\n}\n', "image-recipe-valentine": `{
  "key": "valentine",
  "group": "season",
  "name": {
    "vi": "Valentine 14/2",
    "en": "Valentine's Day"
  },
  "icon": "heart",
  "size": "portrait",
  "input": {
    "kind": "any",
    "required": false,
    "max": 2,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m, c\u1EEDa h\xE0ng ho\u1EB7c b\u1EA1n",
      "en": "Your product, shop or you"
    },
    "hint": {
      "vi": "Th\xEAm s\u1EA3n ph\u1EA9m l\xE0m qu\xE0 t\u1EB7ng, c\u1EEDa h\xE0ng ho\u1EB7c ch\xE2n dung c\u1EE7a b\u1EA1n.",
      "en": "Add a product as the gift, your shop or a portrait of you."
    }
  },
  "output": {
    "purpose": {
      "vi": "G\u1EE3i \xFD qu\xE0 Valentine v\xE0 ch\xFAc kh\xE1ch m\u1ED9t ng\xE0y ng\u1ECDt ng\xE0o, k\xE9o \u0111\u01A1n qu\xE0 t\u1EB7ng.",
      "en": "Wish customers a sweet Valentine's Day and nudge gift orders."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh d\u1ECDc 4:5 l\xE3ng m\u1EA1n: hoa h\u1ED3ng, h\u1ED9p qu\xE0, \xE1nh n\u1EBFn, l\u1EDDi ch\xFAc, \u01B0u \u0111\xE3i n\u1EBFu c\xF3 v\xE0 t\xEAn shop.",
      "en": "A romantic portrait 4:5 image: roses, a gift box, candlelight, your greeting, an offer if any and your shop name."
    },
    "channels": {
      "vi": "B\xE0i Facebook, Zalo, story, Shopee.",
      "en": "Facebook and Zalo posts, stories, Shopee."
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
        "vi": "VD: Valentine Ng\u1ECDt Ng\xE0o",
        "en": "E.g. A sweet Valentine's"
      },
      "required": false,
      "options": [
        {
          "vi": "Valentine Ng\u1ECDt Ng\xE0o",
          "en": "A sweet Valentine's"
        },
        {
          "vi": "Happy Valentine's Day",
          "en": "Happy Valentine's Day"
        },
        {
          "vi": "Trao G\u1EEDi Y\xEAu Th\u01B0\u01A1ng 14/2",
          "en": "Share the love on 14 February"
        },
        {
          "vi": "Qu\xE0 T\u1EB7ng Ng\u01B0\u1EDDi Th\u01B0\u01A1ng",
          "en": "A gift for your loved one"
        },
        {
          "vi": "Valentine N\xE0y, T\u1EB7ng G\xEC?",
          "en": "What to give this Valentine's?"
        }
      ],
      "default": "Valentine Ng\u1ECDt Ng\xE0o"
    },
    {
      "key": "offer",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i",
        "en": "Offer"
      },
      "placeholder": {
        "vi": "VD: T\u1EB7ng thi\u1EC7p v\xE0 g\xF3i qu\xE0 mi\u1EC5n ph\xED",
        "en": "E.g. Free card and gift wrapping"
      },
      "required": false,
      "options": [
        {
          "vi": "T\u1EB7ng thi\u1EC7p v\xE0 g\xF3i qu\xE0 mi\u1EC5n ph\xED",
          "en": "Free card and gift wrapping"
        },
        {
          "vi": "Gi\u1EA3m 14% \u0111\u01A1n qu\xE0 Valentine",
          "en": "14% off Valentine's gifts"
        },
        {
          "vi": "Combo \u0111\xF4i gi\xE1 \u01B0u \u0111\xE3i",
          "en": "A special price on couple combos"
        },
        {
          "vi": "Mua 2 t\u1EB7ng 1",
          "en": "Buy 2, get 1 free"
        },
        {
          "vi": "Freeship \u0111\u01A1n qu\xE0 14/2",
          "en": "Free shipping on 14 February gifts"
        },
        {
          "vi": "Giao qu\xE0 t\u1EADn tay \u0111\xFAng ng\xE0y 14/2",
          "en": "Gifts delivered by hand on 14 February"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{greeting}}",
    "lines": [
      "{{offer}}"
    ]
  },
  "designNotes": "Romantic and tasteful, never cheesy. The product sits in the upper 60% as the gift: on a satin cloth beside a few red or blush roses, a ribbon-tied box, chocolate and a softly glowing candle, warm evening light with creamy bokeh. With a portrait, keep the face exactly and add roses and warm light around the person; with a shop photo, dress it with roses and fairy lights; with no photo, the roses and gift box are the hero. Keep the lower 35% calm (smooth blush or deep wine gradient) for the greeting and an optional offer line. Red, blush and cream built from the brand colour; at most three colours. No heart clip-art, cupids, invented couples, text on boxes, numbers or logos.",
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
    },
    {
      "vi": "L\xE3ng m\u1EA1n, \u1EA5m \xE1p h\u01A1n",
      "en": "More romantic and warm"
    }
  ],
  "seasons": [
    {
      "from": "01-25",
      "to": "02-14"
    }
  ],
  "order": 603
}
`, "image-recipe-voucher": `{
  "key": "voucher",
  "group": "close",
  "name": {
    "vi": "Voucher / M\xE3 gi\u1EA3m gi\xE1",
    "en": "Voucher / Discount code"
  },
  "icon": "ticket",
  "size": "square",
  "input": null,
  "output": {
    "purpose": {
      "vi": "T\u1EB7ng kh\xE1ch m\u1ED9t m\xE3 gi\u1EA3m gi\xE1 \u0111\u1EC3 h\u1ECD \u0111\u1EB7t \u0111\u01A1n ngay, g\u1EEDi trong b\xE0i \u0111\u0103ng ho\u1EB7c khi kh\xE1ch nh\u1EAFn tin.",
      "en": "Give buyers a discount code so they order now, in a post or when they message you."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng: t\u1EA5m voucher nh\u01B0 phi\u1EBFu qu\xE0 t\u1EB7ng, m\u1EE9c gi\u1EA3m th\u1EADt l\u1EDBn, m\xE3 gi\u1EA3m gi\xE1 r\xF5 r\xE0ng v\xE0 h\u1EA1n d\xF9ng.",
      "en": "A square image: a gift-coupon style voucher, the discount large, the code clear, and the expiry."
    },
    "channels": {
      "vi": "Tin nh\u1EAFn Zalo, Messenger, b\xE0i Facebook, livestream.",
      "en": "Zalo and Messenger chats, Facebook posts, livestreams."
    }
  },
  "fields": [
    {
      "key": "code",
      "type": "text",
      "label": {
        "vi": "M\xE3 gi\u1EA3m gi\xE1",
        "en": "Discount code"
      },
      "placeholder": {
        "vi": "VD: KHACHQUEN50",
        "en": "E.g. LOYAL50"
      },
      "required": true
    },
    {
      "key": "value",
      "type": "text",
      "label": {
        "vi": "M\u1EE9c gi\u1EA3m",
        "en": "Discount"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EA3m 50K",
        "en": "E.g. 50K off"
      },
      "required": true,
      "options": [
        { "vi": "Gi\u1EA3m 20K", "en": "20K off" },
        { "vi": "Gi\u1EA3m 50K", "en": "50K off" },
        { "vi": "Gi\u1EA3m 100K", "en": "100K off" },
        { "vi": "Gi\u1EA3m 10%", "en": "10% off" },
        { "vi": "Gi\u1EA3m 15%", "en": "15% off" },
        { "vi": "Gi\u1EA3m 10% \u0111\u01A1n \u0111\u1EA7u ti\xEAn", "en": "10% off your first order" },
        { "vi": "Freeship \u0111\u01A1n b\u1EA5t k\u1EF3", "en": "Free shipping on any order" }
      ]
    },
    {
      "key": "expiry",
      "type": "text",
      "label": {
        "vi": "H\u1EA1n d\xF9ng",
        "en": "Valid until"
      },
      "placeholder": {
        "vi": "VD: D\xF9ng \u0111\u1EBFn h\u1EBFt 31/10",
        "en": "E.g. Valid until 31/10"
      },
      "required": false,
      "options": [
        { "vi": "D\xF9ng \u0111\u1EBFn h\u1EBFt h\xF4m nay", "en": "Valid today only" },
        { "vi": "D\xF9ng \u0111\u1EBFn h\u1EBFt Ch\u1EE7 nh\u1EADt n\xE0y", "en": "Valid until this Sunday" },
        { "vi": "D\xF9ng trong 7 ng\xE0y", "en": "Valid for 7 days" },
        { "vi": "D\xF9ng \u0111\u1EBFn h\u1EBFt th\xE1ng n\xE0y", "en": "Valid until the end of the month" },
        { "vi": "S\u1ED1 l\u01B0\u1EE3ng c\xF3 h\u1EA1n", "en": "Limited number" }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "center",
    "title": "{{value}}",
    "lines": [
      "M\xE3: {{code}}",
      "{{expiry}}"
    ]
  },
  "designNotes": "One large paper coupon or gift ticket, seen straight on or tilted a few degrees, filling about 70% of the frame: perforated tear line or notched semicircle edges, a small stub on one side, a subtle foil or embossed texture. The ticket's middle must be a broad, flat, even area with nothing on it, where Studio places a dark panel with the discount and the code. Set it on a simple surface or soft gradient with one or two light cues of a gift (a ribbon end, a little confetti at the edges only). Palette from the brand colour plus one warm accent like gold or coral, at most three colours. No text, numbers, barcodes, QR codes, percent signs, logos or prices anywhere.",
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
      "vi": "Sang tr\u1ECDng h\u01A1n",
      "en": "More premium"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    }
  ],
  "order": 304
}
`, "image-recipe-win-back": `{
  "key": "win-back",
  "group": "care",
  "name": {
    "vi": "M\u1EDDi kh\xE1ch c\u0169 quay l\u1EA1i",
    "en": "Win back"
  },
  "icon": "handshake",
  "size": "square",
  "input": {
    "kind": "product",
    "required": false,
    "max": 1,
    "label": {
      "vi": "\u1EA2nh s\u1EA3n ph\u1EA9m",
      "en": "Product photo"
    },
    "hint": {
      "vi": "Th\xEAm m\xF3n m\u1EDBi ho\u1EB7c m\xF3n kh\xE1ch t\u1EEBng mua \u0111\u1EC3 g\u1EE3i h\u1ECD gh\xE9 l\u1EA1i; kh\xF4ng c\xF3 c\u0169ng \u0111\u01B0\u1EE3c.",
      "en": "Add something new or an item they used to buy to tempt them back; optional."
    }
  },
  "output": {
    "purpose": {
      "vi": "G\u1ECDi kh\xE1ch l\xE2u kh\xF4ng mua quay l\u1EA1i shop m\u1ED9t c\xE1ch th\xE2n t\xECnh.",
      "en": "Warmly invite customers who have not bought in a while to come back."
    },
    "deliverable": {
      "vi": "1 \u1EA3nh vu\xF4ng th\xE2n t\xECnh: l\u1EDDi nh\u1EAFn ki\u1EC3u \u201Cl\xE2u r\u1ED3i kh\xF4ng g\u1EB7p\u201D v\xE0 \u01B0u \u0111\xE3i quay l\u1EA1i n\u1EBFu c\xF3.",
      "en": "A warm square image: a \u201Clong time no see\u201D line and a come-back perk if you add one."
    },
    "channels": {
      "vi": "Tin nh\u1EAFn Zalo, Messenger, chat Shopee.",
      "en": "Zalo and Messenger chats, Shopee chat."
    }
  },
  "fields": [
    {
      "key": "line",
      "type": "text",
      "label": {
        "vi": "L\u1EDDi nh\u1EAFn",
        "en": "Message"
      },
      "placeholder": {
        "vi": "VD: L\xE2u r\u1ED3i kh\xF4ng g\u1EB7p, shop nh\u1EDB b\u1EA1n!",
        "en": "E.g. Long time no see, we miss you!"
      },
      "required": false,
      "options": [
        {
          "vi": "L\xE2u r\u1ED3i kh\xF4ng g\u1EB7p, shop nh\u1EDB b\u1EA1n!",
          "en": "Long time no see, we miss you!"
        },
        {
          "vi": "B\u1EA1n \u01A1i, shop v\u1EABn \u1EDF \u0111\xE2y n\xE8!",
          "en": "Hey, we are still here for you!"
        },
        {
          "vi": "Shop c\xF3 nhi\u1EC1u m\xF3n m\u1EDBi ch\u1EDD b\u1EA1n",
          "en": "Lots of new things are waiting for you"
        },
        {
          "vi": "Gh\xE9 l\u1EA1i shop m\u1ED9t ch\xFAt nh\xE9",
          "en": "Drop by and see us again"
        }
      ],
      "default": "L\xE2u r\u1ED3i kh\xF4ng g\u1EB7p, shop nh\u1EDB b\u1EA1n!"
    },
    {
      "key": "perk",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i quay l\u1EA1i",
        "en": "Come-back perk"
      },
      "placeholder": {
        "vi": "VD: Nh\u1EADp m\xE3 QUAYLAI gi\u1EA3m 15%",
        "en": "E.g. Code QUAYLAI for 15% off"
      },
      "required": false,
      "options": [
        {
          "vi": "Gi\u1EA3m 10% cho \u0111\u01A1n quay l\u1EA1i",
          "en": "10% off your come-back order"
        },
        {
          "vi": "Freeship \u0111\u01A1n quay l\u1EA1i",
          "en": "Free shipping when you come back"
        },
        {
          "vi": "T\u1EB7ng qu\xE0 nh\u1ECF khi b\u1EA1n quay l\u1EA1i",
          "en": "A small gift when you come back"
        },
        {
          "vi": "Nh\u1EADp m\xE3 QUAYLAI gi\u1EA3m 15%",
          "en": "Code QUAYLAI for 15% off"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{line}}",
    "lines": [
      "{{perk}}"
    ]
  },
  "designNotes": "Warm and a little nostalgic, a friendly \u201Cwe missed you\u201D, never pushy. If a product photo is given, keep the product exactly as it is in the upper 60%, slightly off-centre, in an inviting scene: a sunny shop corner, a table set for a guest, an open door with soft light. With no photo, let that welcoming scene carry the image, with a small cue of reunion such as two cups or an empty chair waiting. Keep the lower 35% calm and even for the words. Golden-hour or soft daylight, a palette from the brand colour with warm neutrals; at most three colours. No text, numbers, prices, sad or guilt-tripping imagery, people's faces, logos or extra products.",
  "fixes": [
    {
      "vi": "\u1EA4m \xE1p, g\u1EA7n g\u0169i h\u01A1n",
      "en": "Warmer and friendlier"
    },
    {
      "vi": "Nh\u1EB9 nh\xE0ng, t\u1ED1i gi\u1EA3n h\u01A1n",
      "en": "Calmer, more minimal"
    },
    {
      "vi": "\u0110\xFAng m\xE0u th\u01B0\u01A1ng hi\u1EC7u h\u01A1n",
      "en": "Closer to my brand colours"
    },
    {
      "vi": "S\u1EA3n ph\u1EA9m to v\xE0 r\xF5 h\u01A1n",
      "en": "Bigger, clearer product"
    }
  ],
  "order": 406
}
`, "image-recipe-women-day": `{
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
      "vi": "1 \u1EA3nh d\u1ECDc 4:5 nh\u1EB9 nh\xE0ng, tinh t\u1EBF v\u1EDBi hoa, l\u1EDDi ch\xFAc c\u1EE7a b\u1EA1n v\xE0 \u01B0u \u0111\xE3i n\u1EBFu c\xF3.",
      "en": "A gentle portrait 4:5 image with flowers, your greeting and an offer if any."
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
      "required": false,
      "options": [
        {
          "vi": "Ch\xFAc m\u1EEBng ng\xE0y Ph\u1EE5 n\u1EEF Vi\u1EC7t Nam 20/10",
          "en": "Happy Vietnamese Women's Day"
        },
        {
          "vi": "Ch\xFAc m\u1EEBng ng\xE0y Qu\u1ED1c t\u1EBF Ph\u1EE5 n\u1EEF 8/3",
          "en": "Happy International Women's Day"
        },
        {
          "vi": "Ch\xFAc m\u1EEBng 20/10",
          "en": "Happy 20 October"
        },
        {
          "vi": "Ch\xFAc m\u1EEBng 8/3",
          "en": "Happy 8 March"
        },
        {
          "vi": "G\u1EEDi nh\u1EEFng ng\u01B0\u1EDDi ph\u1EE5 n\u1EEF tuy\u1EC7t v\u1EDDi",
          "en": "To all the wonderful women"
        },
        {
          "vi": "Ch\xFAc b\u1EA1n lu\xF4n xinh \u0111\u1EB9p v\xE0 h\u1EA1nh ph\xFAc",
          "en": "Stay beautiful and happy"
        }
      ],
      "default": "Ch\xFAc m\u1EEBng ng\xE0y Ph\u1EE5 n\u1EEF Vi\u1EC7t Nam 20/10"
    },
    {
      "key": "offer",
      "type": "text",
      "label": {
        "vi": "\u01AFu \u0111\xE3i",
        "en": "Offer"
      },
      "placeholder": {
        "vi": "VD: Gi\u1EA3m 20% cho ph\xE1i \u0111\u1EB9p",
        "en": "E.g. 20% off for the ladies"
      },
      "required": false,
      "options": [
        {
          "vi": "Gi\u1EA3m 20% cho ph\xE1i \u0111\u1EB9p",
          "en": "20% off for the ladies"
        },
        {
          "vi": "T\u1EB7ng hoa cho m\u1ECDi \u0111\u01A1n h\xF4m nay",
          "en": "A free flower with every order today"
        },
        {
          "vi": "T\u1EB7ng thi\u1EC7p v\xE0 g\xF3i qu\xE0 mi\u1EC5n ph\xED",
          "en": "Free card and gift wrapping"
        },
        {
          "vi": "Freeship cho ch\u1ECB em",
          "en": "Free shipping for the ladies"
        },
        {
          "vi": "Mua qu\xE0 t\u1EB7ng m\u1EB9, t\u1EB7ng v\u1EE3: gi\u1EA3m 15%",
          "en": "Gifts for mum or your wife: 15% off"
        }
      ]
    }
  ],
  "overlay": {
    "layout": "banner",
    "zone": "bottom",
    "title": "{{greeting}}",
    "lines": [
      "{{offer}}"
    ]
  },
  "designNotes": "Gentle and refined, never kitsch. Fresh flowers as the hero: a loose bouquet of roses, peonies or lotus in soft pink, coral and cream, with daylight and shallow depth of field. With a product photo, place the product among the flowers as a gift; with a portrait, keep the face exactly and add flowers and soft light around the person; with no photo, the bouquet and a wrapped gift box carry the image. Keep the lower 35% a calm, smooth field (soft pastel gradient or blurred petals) for the greeting and an optional offer line. Pastel pink, peach and cream with one brand accent. No hearts clip-art, glitter, cartoon figures, text or numbers.",
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
  "order": 602
}
`, "social-image-design": 'C\xC1CH L\xC0M: SOCIAL IMAGE DESIGN\n\nL\xE0m vi\u1EC7c n\xE0y theo c\xE1ch l\xE0m d\u01B0\u1EDBi \u0111\xE2y. Kh\xF4ng d\xF9ng skill, playbook hay framework n\xE0o kh\xE1c \u0111\u01B0\u1EE3c c\xE0i trong Codex. Ch\u1ED7 n\xE0o kh\xE1c v\u1EDBi ph\u1EA7n giao vi\u1EC7c c\u1EE7a task (d\u1EEF li\u1EC7u, gi\u1EDBi h\u1EA1n, khu\xF4n k\u1EBFt qu\u1EA3), l\xE0m theo ph\u1EA7n giao vi\u1EC7c.\n\n## K\u1EBFt qu\u1EA3 c\u1EA7n \u0111\u1EA1t\n\nT\u1EA1o \u1EA3nh cho m\u1EA1ng x\xE3 h\u1ED9i v\xE0 b\xE1n h\xE0ng m\xE0 ng\u01B0\u1EDDi xem hi\u1EC3u trong v\xE0i gi\xE2y tr\xEAn m\xE0n h\xECnh \u0111i\u1EC7n tho\u1EA1i, gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m, \u0111\xFAng ng\u01B0\u1EDDi v\xE0 \u0111\xFAng d\u1EEF ki\u1EC7n founder \u0111\u01B0a ra.\n\nPrimary deliverable: **Review-ready social image options**.\n\nVi\u1EC7c n\xE0y ho\xE0n th\xE0nh khi m\u1ED7i ph\u01B0\u01A1ng \xE1n \u0111\u1EA1t m\u1EE5c \u0111\xEDch \u0111\xE3 h\u1EE9a, gi\u1EEF \u0111\xFAng \u1EA3nh g\u1ED1c theo quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o, kh\xF4ng c\xF3 ch\u1EEF hay d\u1EEF ki\u1EC7n b\u1ECBa, v\xE0 c\xE1c ph\u01B0\u01A1ng \xE1n kh\xE1c nhau th\u1EADt s\u1EF1.\n\n## Khi n\xE0o d\xF9ng\n\n- \u1EA2nh qu\u1EA3ng b\xE1, \u1EA3nh s\u1EA3n ph\u1EA9m, \u1EA3nh \u0111\u1EA1i di\u1EC7n, \u1EA3nh b\xECa, \u1EA3nh d\u1ECBp l\u1EC5, \u1EA3nh tuy\u1EC3n d\u1EE5ng, \u1EA3nh tr\xEDch d\u1EABn hay \u1EA3nh minh h\u1ECDa cho b\xE0i vi\u1EBFt.\n- C\xF3 brief, m\u1EE5c \u0111\xEDch v\xE0 n\u01A1i \u0111\u0103ng; c\xF3 th\u1EC3 c\xF3 \u1EA3nh \u0111\u1EA7u v\xE0o v\xE0 d\u1EEF ki\u1EC7n ch\xEDnh x\xE1c (gi\xE1, ng\xE0y, \u01B0u \u0111\xE3i).\n\nKh\xF4ng d\xF9ng c\xE1ch l\xE0m n\xE0y khi:\n\n- c\u1EA7n video, b\u1ED9 nh\u1EADn di\u1EC7n th\u01B0\u01A1ng hi\u1EC7u \u0111\u1EA7y \u0111\u1EE7 hay thi\u1EBFt k\u1EBF in \u1EA5n k\u1EF9 thu\u1EADt;\n- y\xEAu c\u1EA7u \u0111\xF2i t\u1EA1o \u1EA3nh gi\u1EA3 m\u1EA1o ng\u01B0\u1EDDi th\u1EADt, gi\u1EA5y t\u1EDD hay b\u1EB1ng ch\u1EE9ng.\n\n## \u0110\u1ECBnh ngh\u0129a c\xF4ng vi\u1EC7c\n\n| Th\xE0nh ph\u1EA7n | \u0110\u1ECBnh ngh\u0129a |\n|---|---|\n| Khi b\u1EAFt \u0111\u1EA7u | C\xF3 brief \u1EA3nh, m\u1EE5c \u0111\xEDch v\xE0 n\u01A1i \u0111\u0103ng |\n| Ng\u01B0\u1EDDi ch\u1ECBu tr\xE1ch nhi\u1EC7m | Founder ho\u1EB7c ng\u01B0\u1EDDi ph\u1EE5 tr\xE1ch n\u1ED9i dung |\n| \u0110\u01A1n v\u1ECB c\xF4ng vi\u1EC7c | M\u1ED9t l\u01B0\u1EE3t t\u1EA1o g\u1ED3m s\u1ED1 ph\u01B0\u01A1ng \xE1n task y\xEAu c\u1EA7u, ho\u1EB7c m\u1ED9t l\u01B0\u1EE3t s\u1EEDa |\n| \u0110\u1EA7u ra | C\xE1c ph\u01B0\u01A1ng \xE1n \u1EA3nh m\u1EA1ng x\xE3 h\u1ED9i s\u1EB5n s\xE0ng \u0111\u1EC3 duy\u1EC7t |\n| B\u1EB1ng ch\u1EE9ng ho\xE0n th\xE0nh | M\u1ED7i ph\u01B0\u01A1ng \xE1n \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EF1 ki\u1EC3m theo m\u1EE5c \u0111\xEDch, quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o, l\u1EDBp ch\u1EEF, \u0111\u1ECBnh d\u1EA1ng v\xE0 l\u1ED7i h\xECnh |\n| \u0110i\u1EC3m duy\u1EC7t c\u1EE7a con ng\u01B0\u1EDDi | Founder ch\u1ECDn ph\u01B0\u01A1ng \xE1n ho\u1EB7c y\xEAu c\u1EA7u s\u1EEDa tr\u01B0\u1EDBc khi d\xF9ng |\n| \u0110i\u1EC1u h\u1ECDc \u0111\u01B0\u1EE3c | H\u01B0\u1EDBng thi\u1EBFt k\u1EBF n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn v\xE0 v\xEC sao \u0111\u01B0\u1EE3c \u0111\u1EC1 xu\u1EA5t v\xE0o content learnings |\n\n## Ph\u1EA1m vi\n\n- C\xE1ch l\xE0m n\xE0y lo c\xE1ch thi\u1EBFt k\u1EBF: b\u1ED1 c\u1EE5c, th\u1EE9 b\u1EADc, m\xE0u, \xE1nh s\xE1ng, \u0111\u1EA1o c\u1EE5, gi\u1EEF \u1EA3nh g\u1ED1c v\xE0 t\u1EF1 ki\u1EC3m.\n- Task quy\u1EBFt \u0111\u1ECBnh d\u1EEF ki\u1EC7n ch\xEDnh x\xE1c, l\u1EDBp ch\u1EEF do Studio v\u1EBD, s\u1ED1 ph\u01B0\u01A1ng \xE1n, \u0111\u1ECBnh d\u1EA1ng v\xE0 c\xE1ch l\u01B0u k\u1EBFt qu\u1EA3.\n- Kh\xF4ng \u0111\u0103ng, l\xEAn l\u1ECBch hay g\u1EEDi \u1EA3nh.\n\n## B\u1ED1i c\u1EA3nh c\u1EA7n \u0111\u1ECDc\n\n\u0110\u1ECDc ch\u1ECDn l\u1ECDc m\xE0u th\u01B0\u01A1ng hi\u1EC7u, phong c\xE1ch h\xECnh \u1EA3nh, kh\xE1n gi\u1EA3 v\xE0 \u0111i\u1EC1u c\u1EA7n tr\xE1nh; ch\u1EC9 m\u1EDF v\xE0i t\u1EC7p quan tr\u1ECDng v\xE0 kh\xF4ng b\u1ECBa quy t\u1EAFc th\u01B0\u01A1ng hi\u1EC7u. \u1EA2nh phong c\xE1ch founder l\u01B0u l\xE0 chu\u1EA9n v\u1EC1 b\u1EA3ng m\xE0u, \xE1nh s\xE1ng, b\u1ED1 c\u1EE5c v\xE0 c\xE1ch d\u1EF1ng h\xECnh, kh\xF4ng ph\u1EA3i ch\u1EE7 th\u1EC3 hay ch\u1EEF \u0111\u1EC3 sao ch\xE9p.\n\n- brand colours and visual style\n- audience\n- things to avoid\n- style images\n\n## \u0110\u1EA7u v\xE0o t\u1ED1i thi\u1EC3u\n\n- M\u1EE5c \u0111\xEDch \u1EA3nh, \u0111i\u1EC1u founder \u0111\u01B0\u1EE3c h\u1EE9a v\xE0 n\u01A1i \u0111\u0103ng.\n- \u0110\u1ECBnh d\u1EA1ng v\xE0 t\u1EC9 l\u1EC7 khung.\n- \u1EA2nh \u0111\u1EA7u v\xE0o v\xE0 lo\u1EA1i c\u1EE7a ch\xFAng, n\u1EBFu c\xF3.\n- D\u1EEF ki\u1EC7n ch\xEDnh x\xE1c v\xE0 k\u1EBF ho\u1EA1ch l\u1EDBp ch\u1EEF, n\u1EBFu c\xF3.\n\n## C\xE2u h\u1ECFi \u0111\u1ECBnh h\u01B0\u1EDBng\n\n- Ng\u01B0\u1EDDi xem c\u1EA7n hi\u1EC3u \u0111i\u1EC1u g\xEC trong n\u0103m gi\xE2y \u0111\u1EA7u, \u1EDF k\xEDch th\u01B0\u1EDBc thumbnail \u0111i\u1EC7n tho\u1EA1i?\n- \u0110\xE2u l\xE0 ch\u1EE7 th\u1EC3 ch\xEDnh, v\xE0 \u0111i\u1EC1u g\xEC ph\u1EA3i gi\u1EEF nguy\xEAn tuy\u1EC7t \u0111\u1ED1i t\u1EEB \u1EA3nh g\u1ED1c?\n- \u1EA2nh n\xE0y sang tr\u1ECDng, kh\u1EA9n c\u1EA5p hay \u1EA5m \xE1p nh\u1EDD \u0111\xE2u: \xE1nh s\xE1ng, ch\u1EA5t li\u1EC7u, kho\u1EA3ng tr\u1ED1ng hay m\xE0u?\n\n## Quy tr\xECnh\n\n1. M\u1EDF v\xE0 xem k\u1EF9 t\u1EEBng \u1EA3nh \u0111\u1EA7u v\xE0o; \xE1p d\u1EE5ng quy t\u1EAFc gi\u1EEF \u1EA3nh g\u1ED1c theo lo\u1EA1i (m\u1EE5c 14.1).\n2. \u0110\u1ECDc ghi ch\xFA thi\u1EBFt k\u1EBF c\u1EE7a lo\u1EA1i \u1EA3nh v\xE0 b\u1ED1i c\u1EA3nh th\u01B0\u01A1ng hi\u1EC7u; khi task y\xEAu c\u1EA7u nghi\xEAn c\u1EE9u m\u1EDBi, t\xECm c\xE1c v\xED d\u1EE5 m\u1EA1nh g\u1EA7n \u0111\xE2y cho kh\xE1n gi\u1EA3 Vi\u1EC7t Nam v\xE0 ghi l\u1EA1i \u0111i\u1EC1u l\xE0m ch\xFAng hi\u1EC7u qu\u1EA3 (b\u1ED1 c\u1EE5c, th\u1EE9 b\u1EADc, b\u1EA3ng m\xE0u, \xE1nh s\xE1ng, \u0111\u1EA1o c\u1EE5).\n3. C\xE2n nh\u1EAFc hai \u0111\u1EBFn ba h\u01B0\u1EDBng thi\u1EBFt k\u1EBF (b\u1ED1 c\u1EE5c, b\u1ED1i c\u1EA3nh, c\u1EA3m x\xFAc) v\xE0 ch\u1ECDn h\u01B0\u1EDBng m\u1EA1nh nh\u1EA5t; khi c\u1EA7n nhi\u1EC1u ph\u01B0\u01A1ng \xE1n, m\u1ED7i ph\u01B0\u01A1ng \xE1n l\xE0 m\u1ED9t h\u01B0\u1EDBng kh\xE1c nhau th\u1EADt s\u1EF1.\n4. T\u1EA1o \u1EA3nh theo nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF (m\u1EE5c 14.2) v\xE0 quy t\u1EAFc l\u1EDBp ch\u1EEF (m\u1EE5c 14.3).\n5. Ki\u1EC3m theo m\u1EE5c 10 ngay khi thi\u1EBFt k\u1EBF v\xE0 vi\u1EBFt y\xEAu c\u1EA7u t\u1EA1o \u1EA3nh; m\u1ED7i \u1EA3nh ch\u1EC9 t\u1EA1o m\u1ED9t l\u1EA7n, kh\xF4ng m\u1EDF l\u1EA1i \u0111\u1EC3 s\u1EEDa hay t\u1EA1o l\u1EA1i. Founder y\xEAu c\u1EA7u s\u1EEDa trong Studio.\n\n## C\u1EA5u tr\xFAc k\u1EBFt qu\u1EA3\n\nC\xE1c t\u1EC7p \u1EA3nh theo \u0111\u1ECBnh d\u1EA1ng task y\xEAu c\u1EA7u, m\u1ED7i ph\u01B0\u01A1ng \xE1n k\xE8m m\u1ED9t d\xF2ng m\xF4 t\u1EA3 ng\u1EAFn \u0111i\u1EC1u l\xE0m n\xF3 kh\xE1c c\xE1c ph\u01B0\u01A1ng \xE1n c\xF2n l\u1EA1i.\n\n## Ti\xEAu ch\xED ki\u1EC3m tra\n\n- [ ] \u0110\u1EA1t m\u1EE5c \u0111\xEDch v\xE0 \u0111i\u1EC1u founder \u0111\u01B0\u1EE3c h\u1EE9a.\n- [ ] Gi\u1EEF \u0111\xFAng s\u1EA3n ph\u1EA9m, \u0111\xFAng khu\xF4n m\u1EB7t, \u0111\xFAng \u1EA3nh ch\u1EE5p m\xE0n h\xECnh theo quy t\u1EAFc \u1EA3nh \u0111\u1EA7u v\xE0o.\n- [ ] L\u1EDBp ch\u1EEF \u0111\xFAng k\u1EBF ho\u1EA1ch: kh\xF4ng c\xF3 ch\u1EEF l\u1EA1c, v\xF9ng \u0111\u1EC3 ch\u1EEF \u0111\u01B0\u1EE3c gi\u1EEF s\u1EA1ch, ch\u1EEF trong \u1EA3nh (n\u1EBFu c\xF3) \u0111\xFAng ch\xEDnh t\u1EA3 v\xE0 d\u1EA5u ti\u1EBFng Vi\u1EC7t.\n- [ ] \u0110\xFAng \u0111\u1ECBnh d\u1EA1ng v\xE0 t\u1EC9 l\u1EC7 khung.\n- [ ] Kh\xF4ng l\u1ED7i h\xECnh: s\u1EA3n ph\u1EA9m m\xE9o, th\u1EEBa ng\xF3n tay, ch\u1EEF v\u1EE1.\n- [ ] C\xE1c ph\u01B0\u01A1ng \xE1n kh\xE1c nhau th\u1EADt s\u1EF1.\n\n## Gi\u1EDBi h\u1EA1n v\xE0 khi n\xE0o c\u1EA7n h\u1ECFi l\u1EA1i\n\n- Kh\xF4ng b\u1ECBa gi\xE1, \u01B0u \u0111\xE3i, ng\xE0y, claim hay l\u1EDDi ch\u1EE9ng th\u1EF1c ngo\xE0i d\u1EEF ki\u1EC7n founder nh\u1EADp.\n- Kh\xF4ng bi\u1EBFn s\u1EA3n ph\u1EA9m th\xE0nh s\u1EA3n ph\u1EA9m kh\xE1c hay "\u0111\u1EB9p h\u01A1n"; kh\xF4ng l\xE0m \u0111\u1EB9p, l\xE0m m\u1ECBn da, l\xE0m thon ng\u01B0\u1EDDi khi kh\xF4ng \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- Kh\xF4ng th\xEAm d\u1EA5u hi\u1EC7u s\xE0n th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED, logo hay huy hi\u1EC7u kh\xF4ng \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- H\u1ECFi l\u1EA1i khi kh\xF4ng r\xF5 ng\u01B0\u1EDDi n\xE0o trong \u1EA3nh l\xE0 ng\u01B0\u1EDDi c\u1EA7n gi\u1EEF.\n\n## D\u1EA5u hi\u1EC7u l\xE0m t\u1ED1t\n\n- Ph\u01B0\u01A1ng \xE1n \u0111\u01B0\u1EE3c ch\u1ECDn ngay, kh\xF4ng c\u1EA7n s\u1EEDa.\n- S\u1ED1 l\u01B0\u1EE3t s\u1EEDa trung b\xECnh tr\u01B0\u1EDBc khi duy\u1EC7t.\n- H\u01B0\u1EDBng thi\u1EBFt k\u1EBF \u0111\u01B0\u1EE3c ch\u1ECDn l\u1EB7p l\u1EA1i theo lo\u1EA1i \u1EA3nh.\n\n## Ph\u01B0\u01A1ng ph\xE1p chi ti\u1EBFt\n\n### 14.1 Gi\u1EEF \u1EA3nh g\u1ED1c theo lo\u1EA1i \u1EA3nh \u0111\u1EA7u v\xE0o\n\n- **product** \u2014 t\xE1ch s\u1EA3n ph\u1EA9m: b\u1ECF n\u1EC1n g\u1ED1c v\xE0 m\u1ECDi th\u1EE9 \u0111\xE8 l\xEAn \u1EA3nh (ch\u1EEF, sticker, watermark, tem gi\xE1, khung). Gi\u1EEF ch\xEDnh x\xE1c s\u1EA3n ph\u1EA9m: h\xECnh d\xE1ng, t\u1EC9 l\u1EC7, m\xE0u, ch\u1EA5t li\u1EC7u, logo v\xE0 ch\u1EEF in tr\xEAn s\u1EA3n ph\u1EA9m ho\u1EB7c bao b\xEC. Kh\xF4ng bi\u1EBFn n\xF3 th\xE0nh s\u1EA3n ph\u1EA9m kh\xE1c hay "c\u1EA3i ti\u1EBFn".\n- **portrait** \u2014 ng\u01B0\u1EDDi trong \u1EA3nh ph\u1EA3i nh\u1EADn ra \u0111\u01B0\u1EE3c l\xE0 c\xF9ng m\u1ED9t ng\u01B0\u1EDDi. Gi\u1EEF n\xE9t m\u1EB7t v\xE0 khu\xF4n m\u1EB7t, m\xE0u da v\xE0 k\u1EBFt c\u1EA5u da th\u1EADt, tu\u1ED5i, ch\xE2n t\xF3c, r\xE2u, d\u1EA5u ri\xEAng (n\u1ED1t ru\u1ED3i, s\u1EB9o), k\xEDnh (c\xF9ng g\u1ECDng), t\u1EC9 l\u1EC7 c\u01A1 th\u1EC3 v\xE0 m\xE0u t\xF3c. T\u01B0 th\u1EBF, c\u1EED ch\u1EC9, trang ph\u1EE5c, ph\u1EE5 ki\u1EC7n, ki\u1EC3u t\xF3c, b\u1ED1i c\u1EA3nh, \xE1nh s\xE1ng v\xE0 g\xF3c m\xE1y c\xF3 th\u1EC3 \u0111\u1ED5i cho h\u1EE3p lo\u1EA1i \u1EA3nh; bi\u1EC3u c\u1EA3m ch\u1EC9 ch\u1EC9nh nh\u1EB9. Kh\xF4ng l\xE0m m\u1ECBn hay l\xE0m s\xE1ng da, kh\xF4ng l\xE0m thon m\u1EB7t hay ng\u01B0\u1EDDi, kh\xF4ng th\xEAm trang \u0111i\u1EC3m hay trang s\u1EE9c, kh\xF4ng l\xE0m \u0111\u1EB9p tr\u1EEB khi \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u. B\u1ECF n\u1EC1n g\u1ED1c, ng\u01B0\u1EDDi kh\xE1c v\xE0 m\u1ECDi ch\u1EEF. Nhi\u1EC1u \u1EA3nh c\xF9ng m\u1ED9t ng\u01B0\u1EDDi: d\xF9ng t\u1EA5t c\u1EA3 \u0111\u1EC3 gi\u1EEF n\xE9t gi\u1ED1ng.\n- **screenshot** \u2014 gi\u1EEF \u1EA3nh ch\u1EE5p m\xE0n h\xECnh y nguy\xEAn, t\u1EEBng ch\u1EEF, t\xEAn, emoji v\xE0 m\u1ED1c gi\u1EDD; ch\u1EC9 \u0111\xF3ng khung v\xE0 tr\xECnh b\xE0y. Kh\xF4ng g\xF5 l\u1EA1i, d\u1ECBch hay l\xE0m m\u1EDD g\xEC tr\u1EEB khi \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u.\n- **shop** \u2014 d\xF9ng \u0111\u1ECBa \u0111i\u1EC3m l\xE0m b\u1ED1i c\u1EA3nh th\u1EADt v\xE0 gi\u1EEF c\xE1c \u0111\u1EB7c \u0111i\u1EC3m nh\u1EADn ra \u0111\u01B0\u1EE3c.\n- **any** \u2014 d\xF9ng \u1EA3nh theo brief v\xE0 ghi ch\xFA (m\u1ED9t ch\u1EE7 th\u1EC3 c\u1EA7n c\xF3, m\u1ED9t s\u1EA3n ph\u1EA9m, ho\u1EB7c ch\xEDnh founder).\n- **none** \u2014 kh\xF4ng c\xF3 \u1EA3nh \u0111\u1EA7u v\xE0o.\n\n### 14.2 Nguy\xEAn t\u1EAFc thi\u1EBFt k\u1EBF cho m\u1ECDi \u1EA3nh\n\n- M\u1ED9t ch\u1EE7 th\u1EC3 ch\xEDnh v\xE0 th\u1EE9 b\u1EADc r\xF5 (\u01B0u \u0111\xE3i, r\u1ED3i s\u1EA3n ph\u1EA9m, r\u1ED3i trang tr\xED), t\u1ED1i \u0111a ba m\xE0u; ph\u1EA3i \u0111\u1ECDc \u0111\u01B0\u1EE3c trong d\u01B0\u1EDBi n\u0103m gi\xE2y \u1EDF k\xEDch th\u01B0\u1EDBc thumbnail \u0111i\u1EC7n tho\u1EA1i.\n- Sang tr\u1ECDng \u0111\u1EBFn t\u1EEB \xE1nh s\xE1ng d\u1ECBu, ch\u1EA5t li\u1EC7u v\xE0 kho\u1EA3ng tr\u1ED1ng; kh\u1EA9n c\u1EA5p \u0111\u1EBFn t\u1EEB m\xE0u v\xE0 \xE1nh s\xE1ng, kh\xF4ng bao gi\u1EDD t\u1EEB vi\u1EC7c ch\u1ED3ng hi\u1EC7u \u1EE9ng. \u1EA2nh trang tr\xED qu\xE1 tay tr\xF4ng r\u1EBB.\n- Hi\u1EC7n s\u1EA3n ph\u1EA9m \u0111\xFAng nh\u01B0 \u1EA3nh ch\u1EE5p v\xE0 th\u1EA5y tr\u1ECDn v\u1EB9n; kh\xF4ng nh\xE2n b\u1EA3n s\u1EA3n ph\u1EA9m, kh\xF4ng th\xEAm d\u1EA5u hi\u1EC7u s\xE0n.\n- Gi\u1EEF v\u0103n h\xF3a Vi\u1EC7t Nam c\u1EE5 th\u1EC3: hoa mai \u1EDF mi\u1EC1n Nam, hoa \u0111\xE0o \u1EDF mi\u1EC1n B\u1EAFc, b\xE1nh ch\u01B0ng v\xE0 b\xE1nh t\xE9t, l\xEC x\xEC, \u0111\xE8n \xF4ng sao, \xE1o d\xE0i. Kh\xF4ng d\xF9ng ch\u1EEF H\xE1n, r\u1ED3ng ki\u1EC3u Trung Qu\u1ED1c hay con th\u1ECF trong m\u01B0\u1EDDi hai con gi\xE1p (Vi\u1EC7t Nam l\xE0 con m\xE8o).\n- N\u1ED5i b\u1EADt kh\u1ECFi m\xE0u cam c\u1EE7a s\xE0n th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED thay v\xEC h\xF2a l\u1EABn v\xE0o \u0111\xF3.\n\n### 14.3 L\u1EDBp ch\u1EEF\n\n- Khi task giao cho b\u1EA1n t\u1EF1 v\u1EBD m\u1ED9t s\u1ED1 ch\u1EEF: v\u1EBD \u0111\xFAng c\xE1c ch\u1EEF \u0111\xF3 nh\u01B0 m\u1ED9t ph\u1EA7n c\u1EE7a thi\u1EBFt k\u1EBF (th\u1EE9 b\u1EADc r\xF5, \u0111\u1EE7 l\u1EDBn \u0111\u1EC3 \u0111\u1ECDc tr\xEAn \u0111i\u1EC7n tho\u1EA1i, t\u01B0\u01A1ng ph\u1EA3n m\u1EA1nh v\u1EDBi n\u1EC1n, m\xE0u th\u01B0\u01A1ng hi\u1EC7u), \u0111\u1EB7t ch\u1EE7 y\u1EBFu trong v\xF9ng \u0111\u01B0\u1EE3c ch\u1EC9 \u0111\u1ECBnh v\xE0 kh\xF4ng che m\u1EB7t, s\u1EA3n ph\u1EA9m hay \u1EA3nh ch\u1EE5p m\xE0n h\xECnh. Ngo\xE0i c\xE1c ch\u1EEF \u0111\xF3, kh\xF4ng th\xEAm ch\u1EEF n\xE0o kh\xE1c.\n- Khi Studio s\u1EBD v\u1EBD ch\u1EEF l\xEAn tr\xEAn \u1EA3nh: kh\xF4ng v\u1EBD ch\u1EEF, s\u1ED1, gi\xE1, logo, huy hi\u1EC7u hay tem gi\xE1 n\xE0o trong \u1EA3nh. Gi\u1EEF v\xF9ng \u0111\u01B0\u1EE3c ch\u1EC9 \u0111\u1ECBnh y\xEAn, \xEDt chi ti\u1EBFt, \u0111\u1EC1u t\xF4ng \u0111\u1EC3 ch\u1EEF \u0111\u1ECDc \u0111\u01B0\u1EE3c ngay, v\xE0 thi\u1EBFt k\u1EBF b\u1EE9c \u1EA3nh quanh kho\u1EA3ng tr\u1ED1ng \u0111\xF3 (t\u01B0\u01A1ng ph\u1EA3n, \xE1nh s\xE1ng, kho\u1EA3ng tr\u1ED1ng). \u1EA2nh v\u1EABn ph\u1EA3i tr\xF4ng ho\xE0n ch\u1EC9nh tr\u01B0\u1EDBc khi th\xEAm ch\u1EEF.\n- Khi kh\xF4ng c\xF3 l\u1EDBp ch\u1EEF: ch\u1EC9 \u0111\u01B0a ch\u1EEF v\xE0o \u1EA3nh khi brief ho\u1EB7c ghi ch\xFA y\xEAu c\u1EA7u, vi\u1EBFt \u0111\xFAng ch\xEDnh x\xE1c v\u1EDBi d\u1EA5u ti\u1EBFng Vi\u1EC7t.\n- Khi c\xF3 ch\u1EEF \u0111\u01B0\u1EE3c y\xEAu c\u1EA7u: gi\u1EEF nguy\xEAn ch\xEDnh t\u1EA3, d\u1EA5u, ng\xE0y, gi\u1EDD, gi\xE1, t\xEAn v\xE0 l\u1EDDi k\xEAu g\u1ECDi h\xE0nh \u0111\u1ED9ng.\n' } } };
export {
  image_studio_package_default as default
};
