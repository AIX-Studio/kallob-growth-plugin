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
  version: "2.7.0",
  // 2.0.0: one short form → one page on this Studio, copy by the structured Codex runner (no task card); the brand
  // from Brand Profile (`brand-profile.context`) and a sales page's Offer from Mini CRM (`offers.catalog`), both
  // optional. ChatGPT Sites, the five-minute sync, gift emails and journeys are gone (hosting comes later).
  // 2.2.0: one sidebar item per page kind with its count (`count` on navigation items and `refreshNavigation`, core
  // 2.33.0; older cores simply show no counts).
  // 2.3.0: Trang trung gian and Quiz on the menu (coming, explained), and Cài đặt: what every page shares, saved in
  // `funnel_studio_settings` (migration 0005); nothing reads it yet.
  // 2.4.0: a funnel is a chain of pages (14 page types from docs/funnel-page-rules, every token in pages/tokens.ts),
  // orders with COD or VietQR; products and prices from Mini CRM (`crm.selling` ^2.0), leads and orders back to it
  // as `crm.ingest` events (1.2: activity.logged) when Cài đặt says so.
  // 2.5.0: the publish checklist of docs/funnel-page-rules/00-common (ad tags kept, pixel events, data policy, mobile
  // phones, NFC, YouTube on tap, Zalo taps, contrast for any brand colour) and a per-funnel list of what is missing.
  requiresCore: ">=2.28.0 <3",
  entitlement: "funnel-studio",
  // `funnel-studio.measurement` 1.0 (markus-dev 21571b1): real lifetime counters for Personal Brand's measurement cycles.
  exports: { "funnel-studio.funnels": "1.0", "funnel-studio.measurement": "1.0" },
  publishes: { "crm.ingest": "^1.2" },
  // 2.6.0: an order marked paid or cancelled in Mini CRM is marked so here too.
  // 2.7.0: the bank, COD and shipping fee come from Mini CRM (`crm.selling` 2.1 `delivery`); the old Cài đặt values
  // are handed to it once (`adoptShopSettings`). With an older Mini CRM the default rule applies.
  subscribes: { "crm.changes": "^1.0" }
};

// src/mini-apps/funnel-studio/release-notes.json
var release_notes_default = [
  {
    version: "2.7.0",
    vi: "T\xE0i kho\u1EA3n nh\u1EADn ti\u1EC1n, COD v\xE0 ph\xED giao gi\u1EDD l\u1EA5y t\u1EEB Mini CRM \u203A Thanh to\xE1n & giao h\xE0ng, c\xF9ng n\u01A1i Chatbot \u0111\u1ECDc; m\u1EE5c Thanh to\xE1n \u1EDF C\xE0i \u0111\u1EB7t ch\u1EC9 c\xF2n hi\u1EC3n th\u1ECB v\xE0 c\xF3 n\xFAt s\u1EEDa \u1EDF Mini CRM. Nh\u1EEFng g\xEC b\u1EA1n \u0111\xE3 nh\u1EADp \u1EDF \u0111\xE2y \u0111\u01B0\u1EE3c chuy\u1EC3n sang Mini CRM m\u1ED9t l\u1EA7n (n\u1EBFu b\xEAn \u0111\xF3 ch\u01B0a \u0111i\u1EC1n). Shop nh\u1EADn ti\u1EC1n b\u1EB1ng \u1EA3nh m\xE3 QR \u1EDF Mini CRM th\xEC trang \u0111\u01A1n hi\u1EC7n \u0111\xFAng \u1EA3nh \u0111\xF3 c\xF9ng s\u1ED1 ti\u1EC1n v\xE0 m\xE3 \u0111\u01A1n.",
    en: "The receiving account, COD and shipping fee now come from Mini CRM \u203A Payment & delivery, where the Chatbot reads them too; the Payment section of Settings only shows them, with a link to edit in Mini CRM. What you entered here moves to Mini CRM once (where nothing was filled in there). A shop paid by its QR picture in Mini CRM shows that picture on the order page with the amount and the order code."
  },
  {
    version: "2.6.0",
    vi: 'B\u1EA5m "\u0110\xE3 nh\u1EADn ti\u1EC1n" hay "Hu\u1EF7" m\u1ED9t \u0111\u01A1n trong Mini CRM th\xEC \u0111\u01A1n \u0111\xF3 trong Funnel Studio c\u0169ng \u0111\u1ED5i theo, v\xE0 trang \u0111\u01A1n c\u1EE7a kh\xE1ch b\xE1o \u0111\xFAng "Shop \u0111\xE3 nh\u1EADn ti\u1EC1n". Kh\xF4ng c\xF2n hai n\u01A1i n\xF3i hai tr\u1EA1ng th\xE1i kh\xE1c nhau.',
    en: "Marking an order paid or cancelled in Mini CRM now marks it so in Funnel Studio too, and the customer's order page says the shop received the money. The two apps no longer disagree."
  },
  {
    version: "2.5.0",
    vi: "R\xE0 l\u1EA1i m\u1ECDi trang theo checklist c\u1EE7a b\u1ED9 rule. Ngu\u1ED3n qu\u1EA3ng c\xE1o (utm, fbclid, ttclid) \u0111\u01B0\u1EE3c gi\u1EEF su\u1ED1t ph\u1EC5u v\xE0 l\u01B0u c\xF9ng kh\xE1ch, \u0111\u01A1n, file CSV. Pixel b\u1EAFn \u0111\xFAng s\u1EF1 ki\u1EC7n chu\u1EA9n (Lead, CompleteRegistration, Schedule, InitiateCheckout, Purchase m\u1ED9t l\u1EA7n m\u1ED7i \u0111\u01A1n). M\u1ECDi trang c\xF3 link Ch\xEDnh s\xE1ch d\u1EEF li\u1EC7u, ngay c\u1EA1nh \xF4 \u0111\u1ED3ng \xFD; ch\u01B0a vi\u1EBFt th\xEC d\xF9ng b\u1EA3n m\u1EABu c\xF3 t\xEAn shop. Ch\u1EC9 nh\u1EADn s\u1ED1 di \u0111\u1ED9ng Vi\u1EC7t Nam 10 s\u1ED1. Ch\u1EEF lu\xF4n l\u01B0u d\u1EA1ng chu\u1EA9n NFC. Video YouTube ch\u1EC9 t\u1EA3i khi kh\xE1ch b\u1EA5m. \u0110\u1EBFm l\u01B0\u1EE3t b\u1EA5m Zalo t\u1EEBng trang. Trang \u0111\u0103ng k\xFD s\u1EF1 ki\u1EC7n t\u1EF1 \u0111\xF3ng khi bu\u1ED5i \u0111\xE3 qua v\xE0 d\u1EABn sang b\u1EA3n ghi. Ch\xE2n trang c\xF3 email c\u1EE7a shop. Tab C\xE1c b\u01B0\u1EDBc b\xE1o tr\u01B0\u1EDBc nh\u1EEFng g\xEC c\xF2n thi\u1EBFu (ch\u01B0a c\xF3 c\xE1ch thanh to\xE1n, s\u1EA3n ph\u1EA9m ch\u01B0a c\xF3 gi\xE1, ch\u01B0a c\xF3 link ph\xF2ng\u2026) k\xE8m n\xFAt s\u1EEDa; Th\xF4ng tin c\u1EE7a quiz c\xF3 b\u1EA3ng \u0111\xE1p \xE1n \u2192 k\u1EBFt qu\u1EA3. S\u1EEDa t\u01B0\u01A1ng ph\u1EA3n ch\u1EEF v\u1EDBi m\u1ECDi m\xE0u th\u01B0\u01A1ng hi\u1EC7u, trang k\u1EBFt qu\u1EA3 quiz b\u1ECB tr\xE0n ngang, avatar ng\u01B0\u1EDDi t\u01B0 v\u1EA5n. Studio kh\xF4ng c\xF2n t\u1EAFt khi Codex app d\u1EEBng gi\u1EEFa ch\u1EEBng.",
    en: "Every page reviewed against the rules' checklist. Ad tags (utm, fbclid, ttclid) are kept through the funnel and saved with leads, orders and the CSV. Pixels fire the standard events (Lead, CompleteRegistration, Schedule, InitiateCheckout, Purchase once per order). Every page links a data policy, beside the consent box; a default naming the shop until one is written. Only 10-digit Vietnamese mobiles are taken. Text is stored in NFC. YouTube loads on tap. Zalo taps are counted per page. Event sign-ups close once the session is over and point to the replay. Footers show the shop email. The Steps tab says what is missing (payment, prices, room link\u2026) with a fix button; a quiz's details show which result each answer leans to. Fixed text contrast for any brand colour, a quiz result page scrolling sideways, the consultant avatar. Studio no longer stops when the Codex app quits mid-call."
  },
  {
    version: "2.4.0",
    vi: "M\u1ED7i ph\u1EC5u gi\u1EDD l\xE0 m\u1ED9t chu\u1ED7i trang theo b\u1ED9 rule \u0111\xE3 nghi\xEAn c\u1EE9u (14 lo\u1EA1i trang): Nh\u1EADn qu\xE0 \u2192 giao qu\xE0 \u2192 b\xE1n h\xE0ng \u2192 \u0111\u1EB7t h\xE0ng; S\u1EF1 ki\u1EC7n \u2192 x\xE1c nh\u1EADn l\u1ECBch \u2192 ph\xF2ng xem t\u1EF1 \u0111\u1ED5i tr\u01B0\u1EDBc gi\u1EDD / \u0111ang di\u1EC5n ra / xem l\u1EA1i; T\u01B0 v\u1EA5n \u2192 x\xE1c nh\u1EADn l\u1ECBch; B\xE1n h\xE0ng \u2192 \u0111\u1EB7t h\xE0ng (COD ho\u1EB7c chuy\u1EC3n kho\u1EA3n VietQR, \u0111\u1ECBa ch\u1EC9 2 c\u1EA5p) \u2192 m\u1EDDi mua th\xEAm m\u1ED9t m\xF3n \u2192 x\xE1c nh\u1EADn \u0111\u01A1n c\xF3 m\xE3 QR l\u01B0u \u0111\u01B0\u1EE3c; Trang trung gian v\u1EDBi nh\u1EADn x\xE9t th\u1EADt v\xE0 \u1EA3nh t\u1EF1 ch\u1EE5p, \u0111\u1EBFm l\u01B0\u1EE3t b\u1EA5m sang Shopee/TikTok Shop/Zalo; Quiz \u2192 k\u1EBFt qu\u1EA3 k\xE8m g\u1EE3i \xFD s\u1EA3n ph\u1EA9m \u2192 c\u1EA3m \u01A1n. Codex vi\u1EBFt t\u1EEBng trang, gi\u1EEF c\xF9ng gi\u1ECDng; s\u1EA3n ph\u1EA9m v\xE0 gi\xE1 l\u1EA5y t\u1EEB Mini CRM; kh\xE1ch v\xE0 \u0111\u01A1n sang Mini CRM khi b\u1EADt trong C\xE0i \u0111\u1EB7t. Tab C\xE1c b\u01B0\u1EDBc cho xem, s\u1EEDa v\xE0 vi\u1EBFt l\u1EA1i t\u1EEBng trang k\xE8m s\u1ED1 li\u1EC7u. M\u1EE5c m\u1EDBi \u0110\u01A1n \u0111\u1EB7t h\xE0ng \u0111\u1EC3 ghi \u0111\xE3 thanh to\xE1n ho\u1EB7c hu\u1EF7. M\u1ECDi m\xE0u, ch\u1EEF, kho\u1EA3ng c\xE1ch c\u1EE7a trang n\u1EB1m trong m\u1ED9t file token.",
    en: "A funnel is now a chain of pages built from the researched rules (14 page types): gift \u2192 gift delivery \u2192 sales \u2192 order; event \u2192 confirmation \u2192 a room that changes before / live / replay; booking \u2192 confirmation; sales \u2192 order form (COD or VietQR, two-level address) \u2192 one upsell \u2192 order confirmation with a saveable QR; bridge pages with an honest review and own photos, counting clicks to Shopee/TikTok Shop/Zalo; quiz \u2192 result with a product \u2192 thank-you. Codex writes each page in one voice; products and prices come from Mini CRM; leads and orders go to Mini CRM when Settings says so. The Steps tab previews, edits and rewrites each page with its numbers. New Orders page to mark orders paid or cancelled. Every colour, type and spacing value of the pages lives in one tokens file."
  },
  {
    version: "2.3.0",
    vi: "Thanh b\xEAn c\xF3 \u0111\u1EE7 6 lo\u1EA1i ph\u1EC5u: th\xEAm Trang trung gian v\xE0 Quiz (\u0111ang l\xE0m, m\u1EDF ra xem \u0111\u01B0\u1EE3c lo\u1EA1i \u0111\xF3 d\xF9ng khi n\xE0o v\xE0 ph\u1EC5u ch\u1EA1y th\u1EBF n\xE0o). C\xF3 th\xEAm m\u1EE5c C\xE0i \u0111\u1EB7t cho nh\u1EEFng th\u1EE9 m\u1ECDi trang d\xF9ng chung: th\u01B0\u01A1ng hi\u1EC7u v\xE0 li\xEAn h\u1EC7, t\xEAn mi\u1EC1n, m\xE3 theo d\xF5i qu\u1EA3ng c\xE1o (Facebook, TikTok, Google), form v\xE0 d\u1EEF li\u1EC7u kh\xE1ch, th\xF4ng b\xE1o kh\xE1ch m\u1EDBi, thanh to\xE1n chuy\u1EC3n kho\u1EA3n/COD v\xE0 c\xE1c trang ph\xE1p l\xFD; k\xEAnh ch\u0103m s\xF3c, s\u1EA3n ph\u1EA9m v\xE0 file d\u1EABn sang K\u1EBFt n\u1ED1i, Mini CRM v\xE0 Th\u01B0 vi\u1EC7n. M\u1ED7i m\u1EE5c l\u01B0u ri\xEAng. C\xE1c trang ch\u01B0a d\xF9ng nh\u1EEFng c\xE0i \u0111\u1EB7t n\xE0y.",
    en: "The sidebar now has all six funnel kinds: Bridge page and Quiz are added (coming; each explains when to use it and how its funnel runs). A new Settings item holds what every page shares: brand and contact, domain, ad tracking (Facebook, TikTok, Google), forms and lead data, new-lead alerts, bank transfer/COD payment and legal pages; follow-up channels, products and files link to Connections, Mini CRM and the Library. Each section saves on its own. Pages do not use these settings yet."
  },
  {
    version: "2.2.0",
    vi: "M\u1ED7i lo\u1EA1i trang c\xF3 m\u1EE5c ri\xEAng tr\xEAn thanh b\xEAn, k\xE8m s\u1ED1 trang: Nh\u1EADn qu\xE0, \u0110\u0103ng k\xFD s\u1EF1 ki\u1EC7n, \u0110\u1EB7t l\u1ECBch t\u01B0 v\u1EA5n, B\xE1n h\xE0ng, r\u1ED3i Kh\xE1ch \u0111\u1EC3 l\u1EA1i th\xF4ng tin. M\u1ED7i m\u1EE5c l\xE0 danh s\xE1ch trang c\u1EE7a lo\u1EA1i \u0111\xF3; n\xFAt t\u1EA1o m\u1EDF th\u1EB3ng \u0111\xFAng c\xE1c \xF4 c\u1EE7a lo\u1EA1i \u0111\xF3, kh\xF4ng ph\u1EA3i ch\u1ECDn lo\u1EA1i n\u1EEFa. Lo\u1EA1i ch\u01B0a c\xF3 trang n\xE0o hi\u1EC7n h\xECnh minh ho\u1EA1 v\xE0 n\xFAt t\u1EA1o. M\u1EDF m\u1ED9t trang c\xF3 th\xEAm tab Kh\xE1ch: nh\u1EEFng ng\u01B0\u1EDDi \u0111\u1EC3 l\u1EA1i th\xF4ng tin tr\xEAn ri\xEAng trang \u0111\xF3, c\xF3 n\xFAt G\u1ECDi, Nh\u1EAFn Zalo v\xE0 T\u1EA3i CSV.",
    en: "Each page type has its own sidebar item with its count: Free gift, Event sign-up, Book a call, Sales, then Leads. Each item lists that type's pages, and its create button opens that type's fields directly, with no type to pick. A type with no pages yet shows a drawing and the create button. A page now has a Leads tab with the people who left their details on that page, with Call, Zalo and Download CSV."
  },
  {
    version: "2.1.0",
    vi: 'Trang \u0111\u1EB9p h\u01A1n h\u1EB3n, h\u1ECDc theo LadiPage, Webcake, Kit, Luma, Calendly v\xE0 Stan. Ph\u1EA7n \u0111\u1EA7u trang v\u1EBD ch\xEDnh th\u1EE9 kh\xE1ch nh\u1EADn: qu\xE0 l\xE0 m\u1ED9t cu\u1ED1n s\xE1ch mang t\xEAn m\xF3n qu\xE0, s\u1EF1 ki\u1EC7n l\xE0 t\u1EA5m v\xE9, t\u01B0 v\u1EA5n l\xE0 th\u1EBB ng\u01B0\u1EDDi s\u1EBD g\u1ECDi, b\xE1n h\xE0ng l\xE0 th\u1EBB gi\xE1. Gi\u1EDD, n\u01A1i, gi\xE1 th\xE0nh c\xE1c chip c\xF3 bi\u1EC3u t\u01B0\u1EE3ng. C\xF3 3 giao di\u1EC7n \u0111\u1EC3 ch\u1ECDn (Hi\u1EC7n \u0111\u1EA1i, \u1EA4m \xE1p, \u0110\u1EADm) v\u1EDBi font hi\u1EC3n th\u1ECB ti\u1EBFng Vi\u1EC7t chu\u1EA9n, \u0111\u1ED5i ngay trong Studio m\xE0 kh\xF4ng ph\u1EA3i vi\u1EBFt l\u1EA1i ch\u1EEF. Form \u01B0u ti\xEAn \u0111i\u1EC7n tho\u1EA1i: hi\u1EC7n ngay sau ph\u1EA7n \u0111\u1EA7u v\u1EDBi trang qu\xE0 v\xE0 s\u1EF1 ki\u1EC7n, nh\xE3n lu\xF4n hi\u1EC7n, gi\u1EA3i th\xEDch v\xEC sao c\u1EA7n s\u1ED1 \u0111i\u1EC7n tho\u1EA1i, email v\xE0 ghi ch\xFA g\u1EADp l\u1EA1i, c\xF3 thanh n\xFAt d\xEDnh \u0111\xE1y v\xE0 n\xFAt Zalo n\u1ED5i. Codex vi\u1EBFt c\xE2u ng\u1EAFn d\u1EC5 hi\u1EC3u, n\xFAt n\xF3i theo ng\xF4i "t\xF4i" ("Gi\u1EEF ch\u1ED7 cho t\xF4i"), t\xF4 n\u1ED5i v\xE0i ch\u1EEF trong ti\xEAu \u0111\u1EC1, th\xEAm 3 b\u01B0\u1EDBc "sau khi b\u1EA1n \u0111\u1EC3 l\u1EA1i th\xF4ng tin" v\xE0 m\u1ED9t d\xF2ng tr\u1EA5n an d\u01B0\u1EDBi n\xFAt. Trang c\u1EA3m \u01A1n g\u1ECDi t\xEAn kh\xE1ch v\xE0 nh\u1EAFc s\u1ED1 s\u1EBD li\xEAn h\u1EC7. Trong Studio: xem tr\u01B0\u1EDBc tr\xEAn \u0111i\u1EC7n tho\u1EA1i ho\u1EB7c m\xE1y t\xEDnh, copy link, th\u1EBB ch\u1ECDn lo\u1EA1i trang c\xF3 h\xECnh minh ho\u1EA1, n\xFAt G\u1ECDi v\xE0 Nh\u1EAFn Zalo cho t\u1EEBng kh\xE1ch.',
    en: 'Much better looking pages, after LadiPage, Webcake, Kit, Luma, Calendly and Stan. The top of the page draws what the visitor gets: the gift as a book with its title, the event as a ticket, the call as a caller card, the product with its price; time, place and price become chips with icons. Three looks to pick from (Modern, Warm, Bold) with fonts that render Vietnamese properly, switched in Studio without rewriting the copy. A phone-first form: right after the top for gifts and events, labels always visible, why the phone number is needed, email and note folded away, a sticky action bar and a floating Zalo button. Codex writes short plain sentences, first-person buttons ("Gi\u1EEF ch\u1ED7 cho t\xF4i"), highlights a few words of the headline, adds three "after you leave your details" steps and a reassuring line under the button. The thank-you greets the visitor by name and shows the number that will be contacted. In Studio: preview on a phone or a computer, copy the link, page-type cards with a drawing, Call and Zalo buttons on each lead.'
  },
  {
    version: "2.0.0",
    vi: "L\xE0m l\u1EA1i cho \u0111\u01A1n gi\u1EA3n: ch\u1ECDn m\u1ED9t trong 4 lo\u1EA1i trang (nh\u1EADn qu\xE0, \u0111\u0103ng k\xFD s\u1EF1 ki\u1EC7n, \u0111\u1EB7t l\u1ECBch t\u01B0 v\u1EA5n, b\xE1n h\xE0ng), \u0111i\u1EC1n v\xE0i \xF4 l\xE0 Codex vi\u1EBFt trang cho b\u1EA1n, theo t\xEAn, logo, m\xE0u v\xE0 Zalo trong Brand Profile. Trang ch\u1EA1y ngay tr\xEAn m\xE1y n\xE0y \u0111\u1EC3 b\u1EA1n m\u1EDF th\u1EED v\xE0 g\u1EEDi th\u1EED. Form th\u1ED1ng nh\u1EA5t cho m\u1ECDi lo\u1EA1i: h\u1ECD t\xEAn, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i/Zalo, email (kh\xF4ng b\u1EAFt bu\u1ED9c) v\xE0 m\u1ED9t \xF4 ghi ch\xFA; ai \u0111i\u1EC1n \u0111\u1EC1u hi\u1EC7n \u1EDF trang m\u1EDBi Kh\xE1ch \u0111\u1EC3 l\u1EA1i th\xF4ng tin, t\xECm v\xE0 l\u1ECDc theo trang \u0111\u01B0\u1EE3c, t\u1EA3i CSV m\u1EDF b\u1EB1ng Excel. S\u1EEDa trang b\u1EB1ng tay t\u1EEBng ph\u1EA7n ho\u1EB7c g\xF5 m\u1ED9t c\xE2u nh\u1EDD Codex s\u1EEDa; t\u1EA1m d\u1EEBng, l\u01B0u tr\u1EEF, kh\xF4i ph\u1EE5c trang. Qu\xE0 c\xF3 th\u1EC3 l\xE0 link ho\u1EB7c file b\u1EA1n t\u1EA3i l\xEAn. C\xE1c ph\u1EC5u v\xE0 kh\xE1ch c\u0169 v\u1EABn c\xF2n nguy\xEAn. \u0110\xE3 b\u1ECF: h\xE0nh tr\xECnh nhi\u1EC1u b\u01B0\u1EDBc, \u0111\u01B0a l\xEAn ChatGPT Sites, \u0111\u1ED3ng b\u1ED9 5 ph\xFAt v\xE0 email t\u1EB7ng qu\xE0; vi\u1EC7c \u0111\u01B0a trang l\xEAn Internet s\u1EBD c\xF3 sau.",
    en: "Rebuilt to be simple: pick one of 4 page types (free gift, event sign-up, book a call, sales), fill a few fields and Codex writes the page in your Brand Profile's name, logo, colour and Zalo. The page runs on this computer right away so you can open it and try the form. One form for every type: name, phone/Zalo, email (optional) and a note; everyone who fills it shows up on the new Leads page, searchable, filterable by page and downloadable as a CSV for Excel. Edit any part by hand or ask Codex in one sentence; pause, archive and restore pages. A gift can be a link or a file you upload. Earlier funnels and their leads are kept. Removed: multi-step journeys, publishing to ChatGPT Sites, the 5-minute sync and gift emails; putting pages on the Internet comes later."
  },
  {
    version: "1.4.0",
    vi: "Personal Brand \u0111\u1ECDc \u0111\u01B0\u1EE3c s\u1ED1 l\u01B0\u1EE3t xem v\xE0 l\u01B0\u1EE3t \u0111\u0103ng k\xFD t\xEDch lu\u1EF9 c\u1EE7a c\xE1c ph\u1EC5u c\xF3 s\u1ED1 li\u1EC7u th\u1EADt cho k\u1EF3 \u0111\xE1nh gi\xE1 (kh\xF4ng d\xF9ng s\u1ED1 m\xF4 ph\u1ECFng).",
    en: "Personal Brand can read the lifetime views and sign-ups of funnels with real numbers for its assessment cycles (never simulated numbers)."
  },
  {
    version: "1.3.0",
    vi: "M\u1ED7i ph\u1EC5u gi\u1EDD gi\u1EEF m\u1ED9t \u201Cngu\u1ED3n s\u1EF1 th\u1EADt\u201D: v\u1EA5n \u0111\u1EC1, k\u1EBFt qu\u1EA3 mong mu\u1ED1n, d\u1EEF ki\u1EC7n \u0111\u01B0\u1EE3c ph\xE9p d\xF9ng, ngu\u1ED3n tham chi\u1EBFu v\xE0 d\u1EEF ki\u1EC7n c\xF2n thi\u1EBFu; Codex ch\u1EC9 vi\u1EBFt t\u1EEB nh\u1EEFng d\u1EEF ki\u1EC7n \u0111\xF3 v\xE0 ghi r\xF5 ph\u1EA7n c\xF2n thi\u1EBFu thay v\xEC t\u1EF1 kh\u1EB3ng \u0111\u1ECBnh. M\u1ED7i lo\u1EA1i ph\u1EC5u c\xF3 th\xF4ng tin ri\xEAng: thu kh\xE1ch (lo\u1EA1i qu\xE0, c\xE1ch giao), s\u1EF1 ki\u1EC7n (h\xECnh th\u1EE9c, th\u1EDDi gian, \u0111\u1ECBa \u0111i\u1EC3m), b\xE1n h\xE0ng (c\xE1ch b\xE1n, hi\u1EC3n th\u1ECB gi\xE1, \u0111\u01B0\u1EDDng d\u1EABn thanh to\xE1n); s\u1EF1 ki\u1EC7n ch\u01B0a c\xF3 th\u1EDDi gian v\xE0 \u0111\u1ECBa \u0111i\u1EC3m, hay b\xE1n tr\u1EF1c ti\u1EBFp ch\u01B0a c\xF3 \u0111\u01B0\u1EDDng d\u1EABn thanh to\xE1n th\xEC ch\u01B0a t\u1EA1o \u0111\u01B0\u1EE3c phi\xEAn b\u1EA3n. Codex d\u1EF1ng tr\u1ECDn g\xF3i n\u1ED9i dung g\u1ED3m trang, trang c\u1EA3m \u01A1n, email v\xE0 k\u1EBF ho\u1EA1ch ch\u0103m s\xF3c (lu\xF4n c\u1EA7n s\u1EF1 \u0111\u1ED3ng \xFD, kh\xF4ng t\u1EF1 b\u1EADt). Ph\u1EA7n Ch\u0103m s\xF3c t\u1EF1 \u0111\u1ED9ng v\xE0 Ph\xE2n t\xEDch ch\u1EC9 hi\u1EC7n s\u1ED1 li\u1EC7u th\u1EADt \u0111o \u0111\u01B0\u1EE3c, kh\xF4ng c\xF2n s\u1ED1 m\u1EABu; trang c\u1EA3m \u01A1n n\xF3i \u0111\xFAng theo lo\u1EA1i ph\u1EC5u, v\xE0 bi\u1EC3u m\u1EABu lu\xF4n c\u1EA7n m\xE3 ch\u1ED1ng g\u1EEDi tr\xF9ng.",
    en: "Each funnel now keeps a \u201Csource of truth\u201D: the problem, the desired outcome, the facts allowed in the copy, source references and the facts still missing; Codex writes only from those facts and lists what is missing instead of claiming it. Each funnel type has its own details: lead generation (kind of gift, how it is delivered), events (format, time, place), sales (how you sell, whether the price shows, checkout link); an event without a time and place, or a direct sale without a checkout link, cannot be released yet. Codex builds the whole content bundle: page, thank-you step, email and follow-up plan (always consent-based, never switched on by itself). Automated follow-up and Analytics show only real measured numbers, no more sample figures; the thank-you step speaks to the funnel type, and the form always needs its duplicate-protection code."
  },
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

// src/mini-apps/sdk/crm-ingest.ts
import { randomUUID } from "node:crypto";

// src/mini-apps/sdk/crm-lifecycle.ts
var activityActions = {
  messaged: { stage: "aware", raises: true, vi: "Nh\u1EAFn tin", en: "Messaged" },
  followed: { stage: "aware", raises: true, vi: "Theo d\xF5i", en: "Followed" },
  viewed_content: { stage: "aware", raises: true, vi: "Xem n\u1ED9i dung", en: "Viewed content" },
  lead_captured: { stage: "aware", raises: true, vi: "\u0110\u1EC3 l\u1EA1i th\xF4ng tin", en: "Lead captured" },
  interested_in: { stage: "consider", raises: true, vi: "Quan t\xE2m s\u1EA3n ph\u1EA9m", en: "Interested in" },
  asked_price: { stage: "consider", raises: true, vi: "H\u1ECFi gi\xE1", en: "Asked price" },
  quote_sent: { stage: "consider", raises: true, vi: "\u0110\xE3 b\xE1o gi\xE1", en: "Quote sent" },
  order_created: { stage: "buy", raises: true, vi: "T\u1EA1o \u0111\u01A1n", en: "Order created" },
  payment_reported: { stage: "buy", raises: true, vi: "Kh\xE1ch b\xE1o \u0111\xE3 chuy\u1EC3n", en: "Payment reported" },
  order_cancelled: { stage: "buy", raises: false, vi: "Hu\u1EF7 \u0111\u01A1n", en: "Order cancelled" },
  order_paid: { stage: "use", raises: true, vi: "\u0110\xE3 nh\u1EADn ti\u1EC1n", en: "Order paid" },
  delivered: { stage: "use", raises: true, vi: "\u0110\xE3 giao", en: "Delivered" },
  support_requested: { stage: "use", raises: false, vi: "C\u1EA7n h\u1ED7 tr\u1EE3", en: "Support requested" },
  complained: { stage: "use", raises: false, vi: "Ph\xE0n n\xE0n", en: "Complained" },
  feedback_given: { stage: "use", raises: false, vi: "G\xF3p \xFD", en: "Feedback" },
  referred: { stage: "affiliate", raises: true, vi: "Gi\u1EDBi thi\u1EC7u kh\xE1ch", en: "Referred someone" },
  referral_converted: { stage: "affiliate", raises: true, vi: "Ng\u01B0\u1EDDi \u0111\u01B0\u1EE3c gi\u1EDBi thi\u1EC7u \u0111\xE3 mua", en: "Referral bought" },
  // 1.13.0: no stage, lift no one.
  insight: { stage: null, raises: false, vi: "Ph\xE1t hi\u1EC7n", en: "Insight" },
  note_added: { stage: null, raises: false, vi: "Ghi ch\xFA", en: "Note" },
  called: { stage: null, raises: false, vi: "G\u1ECDi \u0111i\u1EC7n", en: "Call" },
  met: { stage: null, raises: false, vi: "G\u1EB7p m\u1EB7t", en: "Meeting" }
};
var insightKinds = {
  likes: { vi: "Th\xEDch", en: "Likes" },
  dislikes: { vi: "Kh\xF4ng th\xEDch", en: "Dislikes" },
  needs: { vi: "C\u1EA7n", en: "Needs" },
  budget: { vi: "Ng\xE2n s\xE1ch", en: "Budget" },
  situation: { vi: "Ho\xE0n c\u1EA3nh", en: "Situation" },
  concern: { vi: "B\u0103n kho\u0103n", en: "Concern" },
  habit: { vi: "Th\xF3i quen mua", en: "Buying habit" }
};
var insightKindValues = Object.keys(insightKinds);
var isInsightKind = (value) => typeof value === "string" && Object.hasOwn(insightKinds, value);
var activityActionValues = Object.keys(activityActions);
var isActivityAction = (value) => typeof value === "string" && Object.hasOwn(activityActions, value);
var QUIET_AFTER_MS = 90 * 864e5;

// src/mini-apps/sdk/crm-ingest-contract.ts
var CRM_INGEST = { topic: "crm.ingest", version: "1.3" };
var TYPES = /* @__PURE__ */ new Set(["contact.observed", "identity.linked", "lead.captured", "conversation.updated", "selling.updated", "order.changed", "activity.logged", "signal.raised"]);
var OBJECT_KINDS = /* @__PURE__ */ new Set(["product", "order", "offer", "campaign", "content", "customer", "other"]);
var identitiesOk = (value) => Array.isArray(value) && value.length > 0 && value.length <= 10 && value.every((identity) => isObject(identity) && text(identity.scheme, 200) && text(identity.value, 320));
var ORDER_CODE = /^[A-Z0-9]{4,24}$/;
var SUPPORTED_MAJOR = Number(CRM_INGEST.version.split(".")[0]);
var text = (value, max) => typeof value === "string" && value.trim().length > 0 && value.length <= max;
var optionalText = (value, max) => value === void 0 || typeof value === "string" && value.length <= max;
var isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
function identityKey(identity) {
  return `${identity.scheme}|${identity.value}`;
}
function checkCrmIngestEvent(body) {
  const invalid = (reason) => ({ ok: false, kind: "invalid", reason });
  if (!isObject(body)) return invalid("not an object");
  const version = typeof body.version === "string" ? body.version : "";
  const major = /^\d+\.\d+$/.test(version) ? Number(version.split(".")[0]) : NaN;
  if (!Number.isFinite(major)) return invalid(`version ${JSON.stringify(body.version)}`);
  if (major !== SUPPORTED_MAJOR) return { ok: false, kind: "unsupported", reason: `crm.ingest ${version} (this CRM reads ${SUPPORTED_MAJOR}.x)` };
  if (!text(body.eventId, 200)) return invalid("eventId");
  if (typeof body.type !== "string" || !TYPES.has(body.type)) {
    return typeof body.type === "string" && /^[a-z]+\.[a-z_]+$/.test(body.type) ? { ok: false, kind: "unsupported", reason: `type ${body.type}` } : invalid("type");
  }
  if (!text(body.occurredAt, 40) || !Number.isFinite(Date.parse(String(body.occurredAt)))) return invalid("occurredAt");
  if (!["customer", "operator", "ai"].includes(String(body.actor))) return invalid("actor");
  const source = body.source;
  if (!isObject(source) || !text(source.app, 64) || !text(source.channel, 64) || !text(source.accountId, 200)) return invalid("source");
  if (!optionalText(source.accountName, 200) || !optionalText(source.conversationId, 200) || !optionalText(source.threadId, 200) || !optionalText(source.threadName, 300)) return invalid("source");
  if (source.threadKind !== void 0 && source.threadKind !== "user" && source.threadKind !== "group") return invalid("source.threadKind");
  const subject = body.subject;
  if (!isObject(subject) || !Array.isArray(subject.identities) || !subject.identities.length || subject.identities.length > 10) return invalid("subject.identities");
  for (const identity of subject.identities) {
    if (!isObject(identity) || !text(identity.scheme, 200) || !text(identity.value, 320)) return invalid("subject.identities");
  }
  if (!optionalText(subject.displayName, 200) || !optionalText(subject.avatar, 2e3)) return invalid("subject");
  if (body.link !== void 0 && (!isObject(body.link) || !text(body.link.app, 64) || !text(body.link.path, 500))) return invalid("link");
  const payload = body.payload;
  if (!isObject(payload)) return invalid("payload");
  switch (body.type) {
    case "contact.observed":
      if (payload.labels !== void 0 && (!Array.isArray(payload.labels) || payload.labels.length > 50)) return invalid("payload.labels");
      break;
    case "identity.linked":
      if (!(text(payload.customerId, 100) || isObject(payload.newLead) && text(payload.newLead.name, 200))) return invalid("payload: customerId or newLead.name");
      if (body.actor !== "operator") return invalid("identity.linked comes from an operator");
      break;
    case "lead.captured":
    case "conversation.updated": {
      if (!text(source.conversationId, 200)) return invalid("source.conversationId");
      if (!Array.isArray(payload.messages) || payload.messages.length > 200) return invalid("payload.messages");
      for (const message of payload.messages) {
        if (!isObject(message) || !text(message.id, 200) || !["incoming", "outgoing"].includes(String(message.direction)) || typeof message.text !== "string" || typeof message.senderId !== "string") return invalid("payload.messages");
      }
      if (!text(payload.sourceMessageId, 200)) return invalid("payload.sourceMessageId");
      if (!isObject(payload.record)) return invalid("payload.record");
      break;
    }
    case "selling.updated": {
      if (!text(source.conversationId, 200)) return invalid("source.conversationId");
      if (payload.profile !== void 0 && !isObject(payload.profile)) return invalid("payload.profile");
      if (payload.focusProductId !== void 0 && !optionalText(payload.focusProductId, 100)) return invalid("payload.focusProductId");
      if (payload.cards !== void 0 && (!Array.isArray(payload.cards) || payload.cards.length > 10 || payload.cards.some((card) => !isObject(card) || !text(card.productId, 100) || typeof card.stage !== "string"))) return invalid("payload.cards");
      const order = payload.order;
      if (order !== void 0) {
        if (!isObject(order) || typeof order.code !== "string" || !ORDER_CODE.test(order.code) || !["update", "cancel"].includes(String(order.action))) return invalid("payload.order");
        if (!Array.isArray(order.items) || order.items.length > 30 || !Array.isArray(order.promotionIds) || !isObject(order.fulfillment)) return invalid("payload.order");
      }
      break;
    }
    case "order.changed":
      if (typeof payload.code !== "string" || !ORDER_CODE.test(payload.code)) return invalid("payload.code");
      if (!["payment_sent", "payment_reported", "paid", "cancelled"].includes(String(payload.change))) return invalid("payload.change");
      if ((payload.change === "paid" || payload.change === "cancelled") && body.actor !== "operator") return invalid("only an operator says an order is paid or cancelled");
      break;
    case "activity.logged": {
      if (!isActivityAction(payload.action)) return invalid("payload.action is not in the action list");
      const object = payload.object;
      if (object !== void 0 && (!isObject(object) || !OBJECT_KINDS.has(String(object.kind)) || !text(object.id, 200) || !optionalText(object.name, 300))) return invalid("payload.object");
      const value = payload.value;
      if (value !== void 0 && (!isObject(value) || typeof value.amount !== "number" || !Number.isFinite(value.amount) || value.amount < 0 || !text(value.currency, 3))) return invalid("payload.value");
      if (!optionalText(payload.summary, 2e3) || !optionalText(payload.evidence, 2e3)) return invalid("payload.summary/evidence");
      if (payload.referredBy !== void 0 && (!isObject(payload.referredBy) || !identitiesOk(payload.referredBy.identities) || !optionalText(payload.referredBy.displayName, 200))) return invalid("payload.referredBy");
      if (payload.action === "referred" && payload.referredBy === void 0) return invalid("referred needs payload.referredBy");
      if (payload.action === "order_paid" && body.actor !== "operator") return invalid("only an operator says an order is paid");
      if (payload.action === "insight" && (!isObject(payload.insight) || !isInsightKind(payload.insight.kind) || !text(payload.insight.value, 300))) return invalid("payload.insight");
      break;
    }
    case "signal.raised":
      if (!text(payload.key, 120) || !text(payload.title, 180) || !optionalText(payload.detail, 2e3) || !optionalText(payload.objectId, 200)) return invalid("payload.key/title/detail/objectId");
      if (payload.dueAt !== void 0 && (typeof payload.dueAt !== "string" || !Number.isFinite(Date.parse(payload.dueAt)))) return invalid("payload.dueAt");
      if (payload.priority !== void 0 && !["high", "medium", "low"].includes(String(payload.priority))) return invalid("payload.priority");
      if (!Array.isArray(payload.closesOn) || !payload.closesOn.length || payload.closesOn.length > 8 || !payload.closesOn.every(isActivityAction)) return invalid("payload.closesOn");
      break;
  }
  return { ok: true, event: body };
}

// src/mini-apps/sdk/crm-ingest.ts
function crmIngest(sdk) {
  return {
    publish(type, input) {
      const event = { ...input, eventId: input.eventId ?? randomUUID(), type, version: CRM_INGEST.version, occurredAt: input.occurredAt ?? (/* @__PURE__ */ new Date()).toISOString(), source: { ...input.source, app: sdk.manifest.id } };
      const check = checkCrmIngestEvent(event);
      if (!check.ok) throw new Error(`crm.ingest ${type} is not valid: ${check.reason}`);
      sdk.topics.publish(CRM_INGEST.topic, { id: event.eventId, subject: identityKey(check.event.subject.identities[0]), body: event });
    }
  };
}

// src/mini-apps/sdk/offer-reads.ts
function offerReads(sdk) {
  const catalog = () => sdk.miniApps.use("offers.catalog", "^1.0");
  return {
    getOffer: (id, revision) => catalog()?.get(id, revision) ?? null,
    listOffers: (filter) => catalog()?.list(filter) ?? { items: [], total: 0, facets: { active: 0, disabled: 0 } }
  };
}

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

// src/mini-apps/funnel-studio/server/repository.ts
import { randomUUID as randomUUID2 } from "node:crypto";

// src/mini-apps/funnel-studio/contract.ts
var funnelKinds = ["lead", "event", "booking", "sales", "bridge", "quiz"];
var funnelThemes = ["modern", "warm", "bold"];
var bookingModes = ["call", "zalo", "online", "meet"];
var utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "ttclid"];

// src/mini-apps/funnel-studio/server/plan.ts
var pagePaths = {
  "lead-magnet": "",
  "event-registration": "",
  booking: "",
  sales: "ban",
  bridge: "",
  quiz: "",
  "thank-you": "cam-on",
  "gift-delivery": "qua",
  "quiz-result": "ket-qua",
  confirmation: "xac-nhan",
  "order-form": "dat-hang",
  upsell: "mua-them",
  "order-confirmation": "don",
  "event-room": "phong"
};
var pageLabels = {
  "lead-magnet": "Trang nh\u1EADn qu\xE0",
  "event-registration": "Trang \u0111\u0103ng k\xFD s\u1EF1 ki\u1EC7n",
  booking: "Trang \u0111\u0103ng k\xFD t\u01B0 v\u1EA5n",
  sales: "Trang b\xE1n h\xE0ng",
  bridge: "Trang trung gian",
  quiz: "Trang quiz",
  "thank-you": "Trang c\u1EA3m \u01A1n",
  "gift-delivery": "Trang giao qu\xE0",
  "quiz-result": "Trang k\u1EBFt qu\u1EA3 quiz",
  confirmation: "Trang x\xE1c nh\u1EADn l\u1ECBch",
  "order-form": "Trang \u0111\u1EB7t h\xE0ng",
  upsell: "Trang m\u1EDDi mua th\xEAm",
  "order-confirmation": "Trang x\xE1c nh\u1EADn \u0111\u01A1n",
  "event-room": "Ph\xF2ng xem \u2013 xem l\u1EA1i"
};
var page = (type, first = false) => ({ kind: "page", type, path: first ? "" : pagePaths[type], content: null });
var off = (type) => ({ kind: "off-page", type });
var sells = (brief) => brief.kind === "sales" ? Boolean(brief.product?.productId) : brief.kind === "lead" || brief.kind === "event" ? Boolean(brief.sellProduct?.productId) : brief.kind === "quiz" ? brief.results.some((result) => result.product?.productId) : false;
function planSteps(brief) {
  const order = (upsell) => [page("order-form"), ...upsell ? [page("upsell")] : [], page("order-confirmation")];
  switch (brief.kind) {
    case "lead":
      return [page("lead-magnet", true), page("gift-delivery"), off("zalo-nurture"), ...sells(brief) ? [page("sales"), ...order(false)] : []];
    case "event":
      return [page("event-registration", true), page("confirmation"), off("reminders"), page("event-room"), ...sells(brief) ? [off("post-event-offer"), ...order(false)] : []];
    case "booking":
      return [page("booking", true), page("confirmation"), off("reminders"), off("call")];
    // Without a Mini CRM product (2.x sales pages) there is nothing to order on a page: a checkout link or Zalo closes.
    case "sales":
      return brief.product?.productId ? [page("sales", true), ...order(Boolean(brief.upsell?.productId))] : [page("sales", true)];
    case "bridge":
      return [page("bridge", true), off("marketplace")];
    case "quiz":
      return [page("quiz", true), page("quiz-result"), page("thank-you"), off("zalo-nurture"), ...sells(brief) ? order(false) : []];
  }
}
var entryType = {
  lead: "lead-magnet",
  event: "event-registration",
  booking: "booking",
  sales: "sales",
  bridge: "bridge",
  quiz: "quiz"
};
function nextPage(steps, type) {
  const index = steps.findIndex((step) => step.kind === "page" && step.type === type);
  if (index < 0) return null;
  return steps.slice(index + 1).find((step) => step.kind === "page") ?? null;
}

// src/mini-apps/funnel-studio/server/repository.ts
var mapOrder = (row) => ({
  id: row.id,
  funnelId: row.funnel_id,
  funnelName: row.funnel_name ?? "",
  funnelSlug: row.funnel_slug ?? "",
  code: row.code,
  leadId: row.lead_id,
  name: row.name,
  phone: row.phone,
  province: row.province,
  ward: row.ward,
  street: row.street,
  note: row.note,
  items: JSON.parse(row.items_json),
  shipping: row.shipping,
  total: row.total,
  payment: row.payment,
  status: row.status,
  upsell: row.upsell,
  utm: JSON.parse(row.utm_json || "{}"),
  createdAt: row.created_at,
  updatedAt: row.updated_at
});
var stepsOf = (draft) => {
  if (draft.steps?.length) return draft.steps;
  const planned = planSteps(draft.brief);
  return planned.map((step, index) => index === 0 && step.kind === "page" ? { ...step, content: draft.page ?? null } : step);
};
var isLegacyPage = (content) => Boolean(content && typeof content === "object" && "formTitle" in content && "offerTitle" in content);
var idle = { status: "idle", instruction: "", error: null, startedAt: null };
var mapFunnel = (row) => {
  const draft = JSON.parse(row.draft_json);
  const steps = stepsOf(draft);
  const first = steps[0]?.kind === "page" ? steps[0].content : null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    kind: draft.kind,
    status: row.status,
    revision: row.revision,
    brief: draft.brief,
    page: isLegacyPage(first) ? first : null,
    steps,
    generation: draft.generation ?? idle,
    theme: draft.theme ?? "modern",
    visits: row.visits,
    conversions: row.conversions,
    metricsProvenance: { source: row.metrics_source ?? "measured", updatedAt: row.metrics_updated_at },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    archivedAt: row.archived_at
  };
};
var mapLead = (row) => ({
  id: row.id,
  funnelId: row.funnel_id,
  funnelName: row.funnel_name ?? "",
  name: row.name,
  phone: row.phone,
  email: row.email,
  note: row.note,
  source: row.source,
  utm: JSON.parse(row.utm_json || "{}"),
  receivedAt: row.received_at
});
var like = (query) => `%${query.replace(/[\\%_]/g, (character) => `\\${character}`)}%`;
var FunnelStudioRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  /** The package's own database, for its other stores (settings). */
  get database() {
    return this.db;
  }
  /** Newest change first; archived ones only when asked for. */
  list(filter = {}) {
    const where = [filter.archived ? "status = 'archived'" : "status <> 'archived'"];
    const values = [];
    if (filter.kind) {
      where.push("json_extract(draft_json, '$.kind') = ?");
      values.push(filter.kind);
    }
    if (filter.status && !filter.archived) {
      where.push("status = ?");
      values.push(filter.status);
    }
    if (filter.query?.trim()) {
      where.push("(name LIKE ? ESCAPE '\\' OR slug LIKE ? ESCAPE '\\')");
      values.push(like(filter.query.trim()), like(filter.query.trim()));
    }
    const clause = `WHERE ${where.join(" AND ")}`;
    const total = this.db.prepare(`SELECT COUNT(*) AS count FROM funnel_studio_funnels ${clause}`).get(...values).count;
    const limit = Math.max(1, Math.min(200, filter.limit ?? 200));
    const offset = Math.max(0, filter.offset ?? 0);
    const rows = this.db.prepare(`SELECT * FROM funnel_studio_funnels ${clause} ORDER BY updated_at DESC, id LIMIT ? OFFSET ?`).all(...values, limit, offset);
    return { items: rows.map(mapFunnel), total };
  }
  /** How many pages of each kind are not archived (the sidebar's counts). */
  counts() {
    const rows = this.db.prepare("SELECT json_extract(draft_json, '$.kind') AS kind, COUNT(*) AS count FROM funnel_studio_funnels WHERE status <> 'archived' GROUP BY 1").all();
    const counts = Object.fromEntries(funnelKinds.map((kind) => [kind, 0]));
    for (const row of rows) if (row.kind in counts) counts[row.kind] = row.count;
    return counts;
  }
  /** Every funnel that is not archived (for other apps' reads). */
  all() {
    return this.db.prepare("SELECT * FROM funnel_studio_funnels WHERE status <> 'archived' ORDER BY updated_at DESC, id").all().map(mapFunnel);
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
    const id = randomUUID2();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const draft = { kind: input.brief.kind, brief: input.brief, generation: input.generation, theme: input.theme ?? "modern", steps: planSteps(input.brief) };
    this.db.prepare(
      "INSERT INTO funnel_studio_funnels (id, name, slug, status, draft_json, revision, created_at, updated_at) VALUES (?, ?, ?, 'draft', ?, 1, ?, ?)"
    ).run(id, input.name, input.slug, JSON.stringify(draft), now, now);
    return this.get(id);
  }
  /** The founder's edit: refused when someone else changed the funnel since `revision`. */
  update(id, revision, change) {
    const current = this.get(id);
    if (!current) throw new Error("Kh\xF4ng t\xECm th\u1EA5y trang");
    if (current.revision !== revision) throw new Error("Trang v\u1EEBa \u0111\u01B0\u1EE3c thay \u0111\u1ED5i \u1EDF n\u01A1i kh\xE1c. H\xE3y t\u1EA3i l\u1EA1i r\u1ED3i th\u1EED l\u1EA1i.");
    return this.write(current, change);
  }
  /** One page Codex wrote during a run: never conflicts, since edits are refused while it runs. */
  saveStepContent(id, type, content, progress) {
    const current = this.get(id);
    if (!current || current.generation.status !== "running") return null;
    const steps = current.steps.map((step) => step.kind === "page" && step.type === type ? { ...step, content } : step);
    return this.write(current, { steps, generation: { ...current.generation, ...progress } });
  }
  /** The end of a run: live once its first page exists, or the error the founder can act on. */
  finishGeneration(id, outcome) {
    const current = this.get(id);
    if (!current || current.generation.status !== "running") return null;
    if ("ok" in outcome) {
      const ready = current.steps[0]?.kind === "page" && Boolean(current.steps[0].content);
      return this.write(current, { generation: idle, status: current.status === "draft" && ready ? "live" : current.status });
    }
    return this.write(current, { generation: { ...current.generation, status: "failed", error: outcome.error } });
  }
  write(current, change) {
    const brief = change.brief ?? current.brief;
    let steps = change.steps ?? current.steps;
    if (change.page !== void 0 && steps[0]?.kind === "page") steps = [{ ...steps[0], content: change.page }, ...steps.slice(1)];
    const draft = {
      kind: brief.kind,
      brief,
      generation: change.generation ?? current.generation,
      theme: change.theme ?? current.theme,
      steps
    };
    const status = change.status ?? current.status;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(
      "UPDATE funnel_studio_funnels SET name = ?, status = ?, draft_json = ?, revision = revision + 1, updated_at = ?, archived_at = ? WHERE id = ?"
    ).run(change.name ?? current.name, status, JSON.stringify(draft), now, status === "archived" ? current.archivedAt ?? now : null, current.id);
    return this.get(current.id);
  }
  /** Funnels whose Codex run was in flight; a Studio restart loses the run. */
  runningGenerations() {
    return this.db.prepare("SELECT * FROM funnel_studio_funnels").all().map(mapFunnel).filter((funnel) => funnel.generation.status === "running");
  }
  recordVisit(id) {
    this.db.prepare(
      "UPDATE funnel_studio_funnels SET visits = visits + 1, metrics_source = 'measured', metrics_updated_at = ? WHERE id = ?"
    ).run((/* @__PURE__ */ new Date()).toISOString(), id);
  }
  /** One lead, once per idempotency key: a second send of the same form returns the first lead. */
  submit(funnelId, input) {
    const existing = this.db.prepare("SELECT id FROM funnel_studio_submissions WHERE funnel_id = ? AND idempotency_key = ?").get(funnelId, input.idempotencyKey);
    if (existing) return { lead: this.getLead(existing.id), duplicate: true };
    const id = randomUUID2();
    const receivedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      this.db.prepare(
        "INSERT INTO funnel_studio_submissions (id, funnel_id, name, phone, email, note, consent, source, idempotency_key, received_at, utm_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      ).run(id, funnelId, input.name, input.phone, input.email, input.note, input.consent, input.source, input.idempotencyKey, receivedAt, JSON.stringify(input.utm ?? {}));
      this.db.prepare(
        "UPDATE funnel_studio_funnels SET conversions = conversions + 1, metrics_source = 'measured', metrics_updated_at = ? WHERE id = ?"
      ).run(receivedAt, funnelId);
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
    return { lead: this.getLead(id), duplicate: false };
  }
  /** The latest lead of this phone on this funnel since `since` (the repeat window of Cài đặt). */
  recentLead(funnelId, phone, since) {
    const row = this.db.prepare("SELECT id FROM funnel_studio_submissions WHERE funnel_id = ? AND phone = ? AND received_at >= ? ORDER BY received_at DESC LIMIT 1").get(funnelId, phone, since);
    return row ? this.getLead(row.id) : null;
  }
  getLead(id) {
    const row = this.db.prepare(
      "SELECT s.*, f.name AS funnel_name FROM funnel_studio_submissions s LEFT JOIN funnel_studio_funnels f ON f.id = s.funnel_id WHERE s.id = ?"
    ).get(id);
    return row ? mapLead(row) : null;
  }
  /** Newest first, optionally of one page and matching a name, phone, email or note. */
  listLeads(filter = {}) {
    const where = [];
    const values = [];
    if (filter.funnelId) {
      where.push("s.funnel_id = ?");
      values.push(filter.funnelId);
    }
    if (filter.query?.trim()) {
      where.push("(s.name LIKE ? ESCAPE '\\' OR s.phone LIKE ? ESCAPE '\\' OR s.email LIKE ? ESCAPE '\\' OR s.note LIKE ? ESCAPE '\\')");
      const pattern2 = like(filter.query.trim());
      values.push(pattern2, pattern2, pattern2, pattern2);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = this.db.prepare(`SELECT COUNT(*) AS count FROM funnel_studio_submissions s ${clause}`).get(...values).count;
    const limit = Math.max(1, Math.min(5e3, filter.limit ?? 100));
    const offset = Math.max(0, filter.offset ?? 0);
    const rows = this.db.prepare(
      `SELECT s.*, f.name AS funnel_name FROM funnel_studio_submissions s LEFT JOIN funnel_studio_funnels f ON f.id = s.funnel_id ${clause} ORDER BY s.received_at DESC, s.id LIMIT ? OFFSET ?`
    ).all(...values, limit, offset);
    return { items: rows.map(mapLead), total };
  }
  /** A visit of one page of the chain; the first page's also counts as the funnel's visit. */
  recordStepVisit(funnelId, type) {
    this.db.prepare("INSERT INTO funnel_studio_step_stats (funnel_id, step_type, visits) VALUES (?, ?, 1) ON CONFLICT (funnel_id, step_type) DO UPDATE SET visits = visits + 1").run(funnelId, type);
  }
  /** What a page exists for, done once more: a form sent, a click out, an order. */
  recordStepAction(funnelId, type) {
    this.db.prepare("INSERT INTO funnel_studio_step_stats (funnel_id, step_type, actions) VALUES (?, ?, 1) ON CONFLICT (funnel_id, step_type) DO UPDATE SET actions = actions + 1").run(funnelId, type);
  }
  /** A click out of a bridge page counts as the funnel's conversion. */
  recordConversion(funnelId) {
    this.db.prepare("UPDATE funnel_studio_funnels SET conversions = conversions + 1, metrics_source = 'measured', metrics_updated_at = ? WHERE id = ?").run((/* @__PURE__ */ new Date()).toISOString(), funnelId);
  }
  /** A tap on a page's Zalo button (rule C-79). */
  recordZaloClick(funnelId, type) {
    this.db.prepare("INSERT INTO funnel_studio_step_stats (funnel_id, step_type, zalo) VALUES (?, ?, 1) ON CONFLICT (funnel_id, step_type) DO UPDATE SET zalo = zalo + 1").run(funnelId, type);
  }
  stepStats(funnelId) {
    const rows = this.db.prepare("SELECT step_type, visits, actions, zalo FROM funnel_studio_step_stats WHERE funnel_id = ?").all(funnelId);
    return Object.fromEntries(rows.map((row) => [row.step_type, { visits: row.visits, actions: row.actions, zalo: row.zalo }]));
  }
  /** One order, once per idempotency key (a second tap returns the first order). */
  createOrder(input) {
    const existing = this.db.prepare("SELECT id FROM funnel_studio_orders WHERE funnel_id = ? AND idempotency_key = ?").get(input.funnelId, input.idempotencyKey);
    if (existing) return { order: this.getOrder(existing.id), duplicate: true };
    const id = randomUUID2();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(
      "INSERT INTO funnel_studio_orders (id, funnel_id, code, lead_id, name, phone, province, ward, street, note, items_json, shipping, total, payment, upsell, source, idempotency_key, created_at, updated_at, utm_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(id, input.funnelId, input.code, input.leadId, input.name, input.phone, input.province, input.ward, input.street, input.note, JSON.stringify(input.items), input.shipping, input.total, input.payment, input.upsell, input.source, input.idempotencyKey, now, now, JSON.stringify(input.utm ?? {}));
    return { order: this.getOrder(id), duplicate: false };
  }
  getOrder(id) {
    const row = this.db.prepare("SELECT o.*, f.name AS funnel_name, f.slug AS funnel_slug FROM funnel_studio_orders o LEFT JOIN funnel_studio_funnels f ON f.id = o.funnel_id WHERE o.id = ?").get(id);
    return row ? mapOrder(row) : null;
  }
  codeTaken(code) {
    return Boolean(this.db.prepare("SELECT 1 FROM funnel_studio_orders WHERE code = ?").get(code));
  }
  updateOrder(id, change) {
    const current = this.getOrder(id);
    if (!current) throw new Error("Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n.");
    this.db.prepare("UPDATE funnel_studio_orders SET items_json = ?, total = ?, upsell = ?, status = ?, updated_at = ? WHERE id = ?").run(JSON.stringify(change.items ?? current.items), change.total ?? current.total, change.upsell ?? current.upsell, change.status ?? current.status, (/* @__PURE__ */ new Date()).toISOString(), id);
    return this.getOrder(id);
  }
  /** Newest first, optionally of one funnel, one status, or matching a name, phone or code. */
  listOrders(filter = {}) {
    const where = [];
    const values = [];
    if (filter.funnelId) {
      where.push("o.funnel_id = ?");
      values.push(filter.funnelId);
    }
    if (filter.status) {
      where.push("o.status = ?");
      values.push(filter.status);
    }
    if (filter.query?.trim()) {
      where.push("(o.name LIKE ? ESCAPE '\\' OR o.phone LIKE ? ESCAPE '\\' OR o.code LIKE ? ESCAPE '\\')");
      const pattern2 = like(filter.query.trim());
      values.push(pattern2, pattern2, pattern2);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = this.db.prepare(`SELECT COUNT(*) AS count FROM funnel_studio_orders o ${clause}`).get(...values).count;
    const limit = Math.max(1, Math.min(500, filter.limit ?? 100));
    const offset = Math.max(0, filter.offset ?? 0);
    const rows = this.db.prepare(`SELECT o.*, f.name AS funnel_name, f.slug AS funnel_slug FROM funnel_studio_orders o LEFT JOIN funnel_studio_funnels f ON f.id = o.funnel_id ${clause} ORDER BY o.created_at DESC, o.id LIMIT ? OFFSET ?`).all(...values, limit, offset);
    return { items: rows.map(mapOrder), total };
  }
};

// src/mini-apps/funnel-studio/server/routes.ts
var page2 = (request) => ({
  offset: Math.max(0, Number(request.query.offset) || 0),
  limit: Math.max(1, Math.min(200, Number(request.query.limit) || 50))
});
var revisionOf = (request) => Number(request.body?.revision);
var csvCell = (value) => {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};
function createFunnelStudioRouter(service, router, settings2 = service.settings) {
  router.get("/api/funnel-studio/funnels", (request, response) => {
    const kind = String(request.query.kind ?? "");
    response.json(service.repository.list({
      kind: funnelKinds.includes(kind) ? kind : "",
      query: String(request.query.q ?? ""),
      status: String(request.query.status ?? ""),
      archived: request.query.archived === "1",
      ...page2(request)
    }));
  });
  router.get("/api/funnel-studio/settings", (_request, response) => {
    service.handOverPayment();
    response.json(settings2.get());
  });
  router.get("/api/funnel-studio/shop-payment", (_request, response) => {
    response.json(service.shopPayment());
  });
  router.put("/api/funnel-studio/settings", (request, response, next) => {
    try {
      response.json(settings2.save(request.body?.settings, revisionOf(request)));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/funnel-studio/counts", (_request, response) => {
    response.json(service.repository.counts());
  });
  router.get("/api/funnel-studio/funnels/:id", (request, response) => {
    const funnel = service.repository.get(request.params.id);
    funnel ? response.json(funnel) : response.status(404).json({ error: "Kh\xF4ng t\xECm th\u1EA5y trang." });
  });
  router.post("/api/funnel-studio/funnels", (request, response, next) => {
    try {
      response.status(201).json(service.create(request.body));
    } catch (error) {
      next(error);
    }
  });
  router.patch("/api/funnel-studio/funnels/:id", (request, response, next) => {
    try {
      response.json(service.update(request.params.id, request.body, revisionOf(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/funnel-studio/funnels/:id/regenerate", (request, response, next) => {
    try {
      response.json(service.regenerate(request.params.id, revisionOf(request), request.body?.type));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/funnel-studio/funnels/:id/rewrite", (request, response, next) => {
    try {
      response.json(service.rewrite(request.params.id, request.body?.instruction, revisionOf(request), request.body?.type));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/funnel-studio/funnels/:id/checks", (request, response, next) => {
    try {
      response.json({ items: service.checks(request.params.id) });
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/funnel-studio/funnels/:id/stats", (request, response, next) => {
    try {
      response.json(service.stepStats(request.params.id));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/funnel-studio/funnels/:id/transition", (request, response, next) => {
    try {
      response.json(service.transition(request.params.id, request.body?.status, revisionOf(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/funnel-studio/funnels/:id/theme", (request, response, next) => {
    try {
      response.json(service.setTheme(request.params.id, request.body?.theme, revisionOf(request)));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/funnel-studio/gifts", (request, response, next) => {
    try {
      response.status(201).json(service.saveGift(request.body ?? {}));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/funnel-studio/brand", (_request, response) => {
    response.json(service.brand());
  });
  router.get("/api/funnel-studio/offers", (_request, response) => {
    response.json({ items: service.offers() });
  });
  router.get("/api/funnel-studio/products", (_request, response) => {
    response.json({ items: service.products() });
  });
  router.get("/api/funnel-studio/orders", (request, response) => {
    response.json(service.repository.listOrders({ funnelId: String(request.query.funnelId ?? "") || void 0, status: String(request.query.status ?? ""), query: String(request.query.q ?? ""), ...page2(request) }));
  });
  router.post("/api/funnel-studio/orders/:id/status", (request, response, next) => {
    try {
      response.json(service.setOrderStatus(request.params.id, request.body?.status));
    } catch (error) {
      next(error);
    }
  });
  router.get("/api/funnel-studio/leads", (request, response) => {
    response.json(service.repository.listLeads({ funnelId: String(request.query.funnelId ?? "") || void 0, query: String(request.query.q ?? ""), ...page2(request) }));
  });
  router.get("/api/funnel-studio/leads.csv", (request, response) => {
    const { items } = service.repository.listLeads({ funnelId: String(request.query.funnelId ?? "") || void 0, query: String(request.query.q ?? ""), limit: 5e3 });
    const time2 = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
    const tags = (utm) => Object.entries(utm).map(([key, value]) => `${key}=${value}`).join(" ");
    const rows = [["H\u1ECD t\xEAn", "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", "Email", "Ghi ch\xFA", "Trang", "\u0110\u1EBFn t\u1EEB", "Ngu\u1ED3n qu\u1EA3ng c\xE1o", "Th\u1EDDi gian"], ...items.map((lead) => [lead.name, lead.phone, lead.email, lead.note, lead.funnelName, lead.source, tags(lead.utm), time2.format(new Date(lead.receivedAt))])];
    response.type("text/csv; charset=utf-8").attachment(`khach-de-lai-thong-tin-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`).send(`\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}\r
`);
  });
  const query = (request) => Object.fromEntries(Object.entries(request.query).filter(([, value]) => typeof value === "string"));
  const notFound = (message) => `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><p>${message}</p>`;
  const send = (response, html) => html ? response.set("cache-control", "no-store").type("html").send(html) : response.status(404).type("html").send(notFound("Kh\xF4ng t\xECm th\u1EA5y trang n\xE0y."));
  router.get("/funnel-studio/f/:slug", (request, response) => {
    send(response, service.publicStep(request.params.slug, "", request.query.preview === "1", query(request)));
  });
  router.get("/funnel-studio/f/:slug/gift", (request, response) => {
    const download = service.giftDownload(request.params.slug);
    if (!download) return response.status(404).type("html").send(notFound("Kh\xF4ng t\xECm th\u1EA5y file qu\xE0."));
    response.type(download.gift.mimeType).attachment(download.gift.filename).send(download.data);
  });
  router.get("/funnel-studio/f/:slug/anh/:imageId", (request, response) => {
    const image = service.bridgeImage(request.params.slug, request.params.imageId);
    if (!image) return response.status(404).end();
    response.set("cache-control", "public, max-age=86400").type(image.image.mimeType).send(image.data);
  });
  router.get("/funnel-studio/f/:slug/di", (request, response) => {
    const destination = service.bridgeClick(request.params.slug, request.query.preview === "1");
    if (!destination) return response.status(404).type("html").send(notFound("Kh\xF4ng t\xECm th\u1EA5y trang n\xE0y."));
    response.set("cache-control", "no-store").redirect(302, destination);
  });
  router.get("/funnel-studio/f/:slug/lich.ics", (request, response) => {
    const calendar = service.calendar(request.params.slug);
    if (!calendar) return response.status(404).end();
    response.type("text/calendar; charset=utf-8").attachment("lich.ics").send(calendar);
  });
  router.get("/funnel-studio/f/:slug/chinh-sach/:key", (request, response) => {
    send(response, service.legalPage(request.params.slug, request.params.key));
  });
  router.get("/funnel-studio/f/:slug/don/:orderId/qr.png", (request, response) => {
    const picture = service.orderQr(request.params.slug, request.params.orderId);
    if (!picture) return response.status(404).end();
    response.set("cache-control", "no-store").type(picture.type).send(Buffer.from(picture.bytes));
  });
  router.get("/funnel-studio/f/:slug/don/:orderId", (request, response) => {
    send(response, service.publicStep(request.params.slug, "don", request.query.preview === "1", query(request), request.params.orderId));
  });
  router.get("/funnel-studio/f/:slug/:path", (request, response) => {
    send(response, service.publicStep(request.params.slug, request.params.path, request.query.preview === "1", query(request)));
  });
  router.post("/api/public/funnels/:slug/submissions", (request, response, next) => {
    try {
      response.status(201).json(service.submit(request.params.slug, request.body ?? {}, String(request.body?.source ?? "")));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/public/funnels/:slug/orders", (request, response, next) => {
    try {
      response.status(201).json(service.order(request.params.slug, request.body ?? {}, String(request.body?.source ?? "")));
    } catch (error) {
      next(error);
    }
  });
  router.post("/api/public/funnels/:slug/zalo", (request, response) => {
    let body = request.body ?? {};
    if (typeof request.body === "string") {
      try {
        body = JSON.parse(request.body);
      } catch {
        body = {};
      }
    }
    service.zaloClick(request.params.slug, body.type, body.preview === true);
    response.status(204).end();
  });
  router.post("/api/public/orders/:id/upsell", (request, response, next) => {
    try {
      response.json(service.answerUpsell(request.params.id, request.body?.accept === true));
    } catch (error) {
      next(error);
    }
  });
  return router;
}

// src/mini-apps/funnel-studio/server/service.ts
import { randomInt, randomUUID as randomUUID3 } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

// node_modules/zod/v3/external.js
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

// node_modules/zod/v3/helpers/util.js
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
    const obj2 = {};
    for (const item of items) {
      obj2[item] = item;
    }
    return obj2;
  };
  util2.getValidEnumValues = (obj2) => {
    const validKeys = util2.objectKeys(obj2).filter((k) => typeof obj2[obj2[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj2[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj2) => {
    return util2.objectKeys(obj2).map(function(e) {
      return obj2[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj2) => Object.keys(obj2) : (object) => {
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
  const t2 = typeof data;
  switch (t2) {
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

// node_modules/zod/v3/ZodError.js
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
var quotelessJson = (obj2) => {
  const json = JSON.stringify(obj2, null, 2);
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

// node_modules/zod/v3/locales/en.js
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

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path: path2, errorMaps, issueData } = params;
  const fullPath = [...path2, ...issueData.path || []];
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

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path2, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path2;
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
    return _ZodEnum.create(this.options.filter((opt2) => !values.includes(opt2)), {
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

// src/mini-apps/funnel-studio/server/page-writer.ts
var text2 = (max) => external_exports.string().trim().min(1).max(max);
var pageContentSchema = external_exports.object({
  eyebrow: text2(60),
  headline: text2(140),
  introduction: text2(500),
  offerTitle: text2(160),
  offerDetail: text2(500),
  benefitsTitle: text2(100),
  benefits: external_exports.array(text2(180)).min(1).max(6),
  creatorTitle: external_exports.string().trim().max(100),
  creatorNote: external_exports.string().trim().max(500),
  formTitle: text2(100),
  formDescription: text2(240),
  cta: text2(40),
  noteLabel: text2(80),
  consent: text2(400),
  faq: external_exports.array(external_exports.object({ question: text2(160), answer: text2(500) })).max(6),
  // Before 2.4 the thank-you was part of the page; since then it is a page of its own.
  thankYou: external_exports.object({ headline: text2(140), body: text2(500), ctaLabel: text2(40) }).optional(),
  // Since 2.1; pages written before have none.
  highlight: external_exports.string().trim().max(60).optional(),
  nextSteps: external_exports.array(text2(120)).max(3).optional(),
  reassurance: external_exports.string().trim().max(90).optional()
}).passthrough();

// src/mini-apps/funnel-studio/server/pages/copy.ts
var str = (max) => ({ json: { type: "string", minLength: 1, maxLength: max }, zod: external_exports.string().trim().min(1).max(max) });
var opt = (max) => ({ json: { type: "string", maxLength: max }, zod: external_exports.string().trim().max(max) });
var int = (min, max) => ({ json: { type: "integer", minimum: min, maximum: max }, zod: external_exports.number().int().min(min).max(max) });
var list = (item, min, max) => ({ json: { type: "array", minItems: min, maxItems: max, items: item.json }, zod: external_exports.array(item.zod).min(Math.min(min, 1)).max(max + 1) });
var obj = (fields) => ({
  json: { type: "object", additionalProperties: false, required: Object.keys(fields), properties: Object.fromEntries(Object.entries(fields).map(([key, field2]) => [key, field2.json])) },
  zod: external_exports.object(Object.fromEntries(Object.entries(fields).map(([key, field2]) => [key, field2.zod])))
});
var faq = (min, max) => list(obj({ question: str(160), answer: str(500) }), min, max);
var entryFields = {
  eyebrow: str(60),
  headline: str(140),
  highlight: opt(60),
  introduction: str(500),
  offerTitle: str(160),
  offerDetail: str(500),
  benefitsTitle: str(100),
  benefits: list(str(180), 3, 5),
  creatorTitle: opt(100),
  creatorNote: opt(500),
  formTitle: str(100),
  formDescription: str(240),
  cta: str(40),
  reassurance: str(90),
  noteLabel: str(80),
  consent: str(400),
  nextSteps: list(str(120), 3, 3),
  faq: faq(3, 5)
};
var copyShapes = {
  "lead-magnet": obj(entryFields),
  "event-registration": obj({ ...entryFields, agenda: list(str(140), 0, 5) }),
  booking: obj({ ...entryFields, fitFor: list(str(120), 2, 3), notFor: list(str(120), 1, 2) }),
  sales: obj({
    eyebrow: str(60),
    headline: str(140),
    highlight: opt(60),
    introduction: str(500),
    problemTitle: str(100),
    problems: list(str(160), 3, 3),
    solutionTitle: str(100),
    solution: str(600),
    benefitsTitle: str(100),
    benefits: list(str(180), 3, 5),
    howTitle: str(100),
    howSteps: list(str(140), 3, 3),
    creatorTitle: opt(100),
    creatorNote: opt(500),
    offerNote: str(200),
    cta: str(40),
    reassurance: str(90),
    finalTitle: str(120),
    faq: faq(3, 6)
  }),
  bridge: obj({
    eyebrow: str(60),
    headline: str(140),
    highlight: opt(60),
    introduction: str(500),
    reviewTitle: str(100),
    review: str(900),
    pros: list(str(160), 2, 4),
    cons: list(str(160), 1, 2),
    fitFor: list(str(120), 1, 3),
    notFor: list(str(120), 1, 2),
    verdict: str(300),
    cta: str(40),
    faq: faq(0, 3)
  }),
  quiz: obj({
    eyebrow: str(60),
    headline: str(140),
    highlight: opt(60),
    introduction: str(400),
    promise: str(200),
    timeNote: str(60),
    startCta: str(40),
    questions: list(obj({ question: str(140), answers: list(obj({ text: str(100), weights: list(int(0, 3), 2, 5) }), 2, 4) }), 4, 7),
    results: list(obj({ name: str(60), teaser: str(200) }), 2, 5),
    formTitle: str(100),
    formDescription: str(240),
    cta: str(40),
    skipLabel: str(60),
    consent: str(400)
  }),
  "thank-you": obj({ headline: str(120), body: str(400), contactPromise: str(160), nextTitle: str(100), nextBody: str(300), cta: str(40) }),
  "gift-delivery": obj({ headline: str(120), introduction: str(300), firstAction: str(200), keyPointsTitle: str(100), keyPoints: list(str(200), 3, 5), nextTitle: str(100), nextBody: str(300), cta: str(40) }),
  "quiz-result": obj({
    results: list(obj({ headline: str(120), explanation: str(600), why: str(300), actions: list(str(160), 2, 3), cta: str(40) }), 2, 5),
    formTitle: str(100),
    formDescription: str(200)
  }),
  confirmation: obj({ headline: str(120), body: str(300), prepareTitle: str(80), prepare: list(str(160), 1, 3), reminderTitle: str(100), reminderBody: str(240), rescheduleNote: str(200) }),
  upsell: obj({ headline: str(120), why: str(160), benefits: list(str(140), 2, 3), acceptCta: str(40), declineLabel: str(60) }),
  "event-room": obj({
    beforeHeadline: str(120),
    beforeBody: str(300),
    liveHeadline: str(120),
    liveBody: str(200),
    offerTitle: str(120),
    offerBody: str(400),
    offerPoints: list(str(140), 3, 3),
    offerCta: str(40),
    replayHeadline: str(120),
    replayBody: str(300),
    expiredHeadline: str(120),
    expiredBody: str(300)
  })
};
var writtenPageTypes = Object.keys(copyShapes);
var isWritten = (type) => type in copyShapes;
var writers = /* @__PURE__ */ new Map();
function pageCopyWriter(type) {
  const existing = writers.get(type);
  if (existing) return existing;
  const shape = copyShapes[type];
  const writer = defineStructuredPrompt({
    id: `funnel-studio.page-${type}`,
    version: 1,
    label: `Funnel Studio ${type} page`,
    timeoutMs: 6 * 6e4,
    purpose: `page-${type}`,
    values: (input) => ({
      funnelKind: input.funnelKind,
      brief: JSON.stringify(input.brief, null, 2),
      facts: JSON.stringify(input.facts, null, 2),
      hasFacts: Object.keys(input.facts).length > 0,
      brand: JSON.stringify(input.brand, null, 2),
      hasBrand: Boolean(input.brand.name || input.brand.summary || input.brand.positioning),
      product: input.product ? JSON.stringify(input.product, null, 2) : "",
      hasProduct: Boolean(input.product),
      chain: input.chain.length ? input.chain.map((page3) => `- ${page3.type}: ${page3.headline}`).join("\n") : "",
      hasChain: input.chain.length > 0,
      rewrite: Boolean(input.current),
      current: input.current ? JSON.stringify(input.current, null, 2) : "",
      instruction: input.instruction
    }),
    jsonSchema: shape.json,
    output: shape.zod
  });
  writers.set(type, writer);
  return writer;
}
var keysOf = (schema2, into = /* @__PURE__ */ new Set()) => {
  if (schema2 && typeof schema2 === "object") {
    const value = schema2;
    for (const [key, child] of Object.entries(value.properties ?? {})) {
      into.add(key);
      keysOf(child, into);
    }
    if (value.items) keysOf(value.items, into);
  }
  return into;
};
function brokenPageCopy(type, output) {
  const names = keysOf(copyShapes[type].json);
  const strings = [];
  const walk = (value) => {
    if (typeof value === "string") strings.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk(output);
  for (const value of strings) {
    const words = value.trim().split(/[\s\]\[?!.,:;"']+/).filter(Boolean);
    if (words.some((word) => names.has(word) || /^[a-z]+[A-Z]/.test(word) && [...names].some((name) => word.toLowerCase().includes(name.toLowerCase()))))
      return `c\xF3 ch\u1EEF \u201C${value.trim().slice(0, 60)}\u201D thay cho n\u1ED9i dung`;
    if (/[A-Za-z]+_[A-Za-z]+/.test(value)) return `c\xF3 ch\u1EEF \u201C${value.trim().slice(0, 60)}\u201D thay cho n\u1ED9i dung`;
    if (/<\|[^>]*\|>|[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) return "c\xF3 k\xFD t\u1EF1 l\u1EA1";
  }
  return null;
}

// src/mini-apps/funnel-studio/server/pages/context.ts
var withLead = (url2, context, extra = {}) => {
  const params = new URLSearchParams(extra);
  if (context.lead) params.set("k", context.lead.id);
  if (context.preview) params.set("preview", "1");
  const query = params.toString();
  return query ? `${url2}${url2.includes("?") ? "&" : "?"}${query}` : url2;
};
var firstName = (name) => name.trim().split(/\s+/).pop() ?? "";

// src/mini-apps/funnel-studio/server/pages/tokens.ts
var themeFonts = {
  modern: { stylesheet: "family=Be+Vietnam+Pro:wght@400;500;600;700;800", display: '"Be Vietnam Pro"', body: '"Be Vietnam Pro"', themeColor: "#f6f7f9", accent: "#2547d0" },
  warm: { stylesheet: "family=Petrona:wght@600;700&family=Be+Vietnam+Pro:wght@400;500;600;700", display: '"Petrona"', body: '"Be Vietnam Pro"', themeColor: "#fbf8f3", accent: "#b4471d" },
  bold: { stylesheet: "family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Be+Vietnam+Pro:wght@400;500;600;700", display: '"Bricolage Grotesque"', body: '"Be Vietnam Pro"', themeColor: "#0f1115", accent: "#d4f24a" }
};
var themeSwatches = {
  modern: { ground: "#f6f7f9", accent: themeFonts.modern.accent },
  warm: { ground: "#fbf8f3", accent: themeFonts.warm.accent },
  bold: { ground: "#0f1115", accent: themeFonts.bold.accent }
};
var DARK_INK = "#111827";
var LIGHT_INK = "#ffffff";
function inkOn(hex) {
  const [r, g, b] = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255).map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.42 ? DARK_INK : LIGHT_INK;
}
function brandStyle(theme, brandAccent) {
  const accent = brandAccent && /^#[0-9a-f]{6}$/i.test(brandAccent) ? brandAccent : themeFonts[theme].accent;
  const light = inkOn(accent) === DARK_INK;
  return `--brand-accent:${accent};--brand-on-accent:${inkOn(accent)};--brand-accent-ink-mix:${light ? "30%" : "82%"};--brand-accent-dark-mix:${light ? "90%" : "35%"}`;
}
var tokensCss = `
:root{
  color-scheme:light;
  /* Brand (runtime): --brand-accent / --brand-on-accent come from brandStyle(). */
  --accent:var(--brand-accent,#2547d0);
  --on-accent:var(--brand-on-accent,#ffffff);
  --accent-ink:color-mix(in oklab,var(--accent) var(--brand-accent-ink-mix,82%),var(--ink));
  --accent-soft:color-mix(in oklab,var(--accent) 16%,var(--surface));
  --accent-faint:color-mix(in oklab,var(--accent) 8%,var(--surface));
  --accent-ring:color-mix(in oklab,var(--accent) 22%,transparent);
  --accent-glow:color-mix(in oklab,var(--accent) 20%,transparent);
  --accent-mark:color-mix(in oklab,var(--accent) 38%,transparent);
  /* Accent text on the hero ground: darkened on a light hero, lightened on a dark one (bold). */
  --hero-accent:color-mix(in oklab,var(--accent) var(--brand-accent-ink-mix,82%),var(--hero-ink));
  /* Neutrals (modern). */
  --bg:#f6f7f9;--bg-alt:#eef1f6;--surface:#ffffff;--ink:#101828;--ink-2:#475467;--line:#e4e7ec;
  --field-line:color-mix(in oklab,var(--ink) 18%,transparent);
  --hero-bg:var(--bg);--hero-ink:var(--ink);--hero-ink-2:var(--ink-2);
  --hero-line:color-mix(in oklab,var(--hero-ink) 20%,transparent);
  --chip-bg:color-mix(in oklab,var(--accent) 14%,var(--hero-bg));
  --chip-icon:var(--hero-accent);
  --paper-edge:linear-gradient(90deg,#ddd8cf,#ffffff 45%,#e7e2d9);
  --spine:rgb(0 0 0/.18);
  /* Status and channels. */
  --danger:#b42318;--danger-soft:#fef3f2;--success:#16a34a;--success-ink:#067647;--success-soft:#ecfdf3;--warning:#b54708;--warning-soft:#fffaeb;
  --zalo:#0068ff;--on-zalo:#ffffff;
  --notice-bg:#101828;--notice-ink:#e4e7ec;
  --overlay:rgb(16 24 40/.55);
  /* Type. */
  --font-display:"Be Vietnam Pro",system-ui,sans-serif;
  --font-body:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --display-weight:800;--display-track:-0.025em;--weight-strong:700;--weight-medium:600;--weight-body:400;
  --text-body:clamp(1.0625rem,.3vw + 1rem,1.125rem);--leading-body:1.65;--leading-tight:1.18;--leading-snug:1.3;--leading-relaxed:1.55;
  --text-h1:clamp(2.125rem,4.4vw + 1rem,3.75rem);--text-h2:clamp(1.625rem,2vw + 1rem,2.375rem);--text-h3:clamp(1.25rem,.6vw + 1.05rem,1.5rem);
  --text-lead:clamp(1.125rem,.6vw + 1rem,1.3rem);--text-price:clamp(2rem,3vw + 1rem,2.75rem);--text-object:clamp(1.5rem,2.4vw,1.9rem);
  --text-title:1.35rem;--text-md:17px;--text-base:16px;--text-sm:15px;--text-xs:14px;--text-2xs:13px;--text-3xs:12px;--text-4xs:11px;
  --track-label:.08em;--mark-pad:.06em;--track-wide:.12em;--track-tight:-.01em;
  /* Space. */
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;--space-6:24px;--space-7:28px;--space-8:32px;--space-10:40px;--space-12:48px;--space-14:56px;
  --section-y:clamp(56px,8vw,104px);--gutter:clamp(18px,4vw,32px);--gap-hero:clamp(32px,6vw,72px);--page-max:1120px;--prose-max:38rem;--narrow-max:46rem;
  /* Shape. */
  --radius-sm:6px;--radius:12px;--radius-md:14px;--radius-lg:18px;--radius-xl:20px;--radius-pill:999px;--radius-round:50%;
  --line-w:1px;--line-w-2:1.5px;--line-w-3:2px;--focus-w:3px;
  --shadow-lg:0 28px 56px -18px rgb(16 24 40/.28);--shadow-md:0 10px 22px -10px rgb(16 24 40/.5);--shadow-sm:0 8px 18px -10px rgb(16 24 40/.45);
  --shadow-avatar:0 0 0 3px var(--surface),0 0 0 5px var(--accent-soft);--shadow-focus:0 0 0 4px var(--accent-ring);
  --shadow-card:0 1px 2px rgb(16 24 40/.06),0 8px 24px -12px rgb(16 24 40/.18);--shadow-drop:drop-shadow(0 24px 36px rgb(16 24 40/.24));
  /* Sizes. */
  --tap:54px;--tap-sm:48px;--field-h:50px;--icon-tile:40px;--avatar:52px;--avatar-lg:68px;--fab:54px;
  /* Motion. */
  --ease-out:cubic-bezier(.16,1,.3,1);--fast:.15s;--slow:.25s;
}
:root[data-theme=warm]{
  --bg:#fbf8f3;--bg-alt:#f3ece2;--surface:#fffdf9;--ink:#221c16;--ink-2:#5e5449;--line:#e6dccf;
  --font-display:"Petrona","Be Vietnam Pro",system-ui,serif;
  --display-weight:700;--display-track:-0.015em;
}
:root[data-theme=bold]{
  --bg:#ffffff;--bg-alt:#f3f4ef;--surface:#ffffff;--ink:#0f1115;--ink-2:#4b5563;--line:#e5e7eb;
  --hero-bg:#0f1115;--hero-ink:#f5f5f0;--hero-ink-2:#b3b6ad;
  --hero-accent:color-mix(in oklab,var(--accent) var(--brand-accent-dark-mix,90%),var(--hero-ink));
  --font-display:"Bricolage Grotesque","Be Vietnam Pro",system-ui,sans-serif;
  --display-weight:800;--display-track:-0.03em;
}
`;

// src/mini-apps/funnel-studio/server/pages/kit.ts
var escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
var t = escapeHtml;
var scriptJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
var paths = {
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
  phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
  timer: '<path d="M10 2h4"/><path d="M12 14l3-3"/><circle cx="12" cy="14" r="8"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  sparkle: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
};
var icon = (name, size = 18) => `<svg class="i" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
function headline(text5, highlight) {
  const words = (highlight ?? "").trim();
  const at = words ? text5.indexOf(words) : -1;
  if (at < 0) return t(text5);
  return `${t(text5.slice(0, at))}<mark>${t(words)}</mark>${t(text5.slice(at + words.length))}`;
}
var initial = (name) => (name.trim().split(/\s+/).pop() ?? "").slice(0, 1).toUpperCase() || "K";
var money = (value) => `${new Intl.NumberFormat("vi-VN").format(Math.round(value))}\u0111`;
var fontLink = (theme) => `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?${themeFonts[theme].stylesheet}&display=swap">`;
function tracking(settings2, preview) {
  const { facebookPixelId, tiktokPixelId, googleAnalyticsId, googleTagManagerId } = settings2.tracking;
  if (preview || !(facebookPixelId || tiktokPixelId || googleAnalyticsId || googleTagManagerId)) return { bar: "", script: "" };
  const ids = scriptJson({ facebookPixelId, tiktokPixelId, googleAnalyticsId, googleTagManagerId });
  const bar = `<div class="consent-bar" hidden role="region" aria-label="Cookie"><p>Trang d\xF9ng cookie qu\u1EA3ng c\xE1o \u0111\u1EC3 bi\u1EBFt b\u1EA1n \u0111\u1EBFn t\u1EEB \u0111\xE2u. B\u1EA1n \u0111\u1ED3ng \xFD kh\xF4ng?</p><div><button type="button" class="button small ghost" data-consent="no">T\u1EEB ch\u1ED1i</button><button type="button" class="button small" data-consent="yes">\u0110\u1ED3ng \xFD</button></div></div>`;
  const script = `(()=>{const ids=${ids},key='kgs-consent',bar=document.querySelector('.consent-bar');let choice=null;try{choice=localStorage.getItem(key)}catch{}
const load=()=>{const add=src=>{const s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);return s};
if(ids.facebookPixelId){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document);add('https://connect.facebook.net/en_US/fbevents.js');fbq('init',ids.facebookPixelId);fbq('track','PageView')}
if(ids.tiktokPixelId){window.ttq=window.ttq||[];add('https://analytics.tiktok.com/i18n/pixel/events.js?sdkid='+encodeURIComponent(ids.tiktokPixelId))}
if(ids.googleAnalyticsId){add('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ids.googleAnalyticsId));window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',ids.googleAnalyticsId)}
if(ids.googleTagManagerId){window.dataLayer=window.dataLayer||[];dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});add('https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(ids.googleTagManagerId))}};
window.kgsTrack=(event,data)=>{try{if(window.fbq)fbq('track',event,data||{});if(window.gtag)gtag('event',event,data||{});if(window.ttq&&ttq.track)ttq.track(event,data||{})}catch{}};
if(choice==='yes')load();else if(choice!=='no'&&bar){bar.hidden=false;bar.addEventListener('click',e=>{const v=e.target.closest('[data-consent]')?.dataset.consent;if(!v)return;try{localStorage.setItem(key,v)}catch{}bar.hidden=true;if(v==='yes')load()})}})()`;
  return { bar, script };
}
function footer(input) {
  const { brand, settings: settings2, slug } = input;
  const who = [brand.name, settings2.brand.taxId ? `MST ${settings2.brand.taxId}` : ""].filter(Boolean).join(" \xB7 ");
  const email = settings2.brand.email ?? "";
  const contact = [settings2.brand.hotline ? `Hotline <a href="tel:${t(settings2.brand.hotline.replace(/\s+/g, ""))}">${t(settings2.brand.hotline)}</a>` : "", email ? `<a href="mailto:${t(email)}">${t(email)}</a>` : "", settings2.brand.address ? t(settings2.brand.address) : "", settings2.brand.workingHours ? t(settings2.brand.workingHours) : ""].filter(Boolean).join(" \xB7 ");
  const legal = [["privacy", "Ch\xEDnh s\xE1ch d\u1EEF li\u1EC7u", "default"], ["terms", "\u0110i\u1EC1u kho\u1EA3n", settings2.legal.terms], ["returns", "\u0110\u1ED5i tr\u1EA3", settings2.legal.returnPolicy]].filter(([, , text5]) => text5.trim()).map(([key, label]) => `<a href="${legalUrl(slug, key)}">${label}</a>`).join("");
  return `<footer><div class="wrap">${who ? `<p class="footer-who">${t(who)}</p>` : ""}${contact ? `<p>${contact}</p>` : ""}${legal ? `<nav class="footer-legal" aria-label="Ch\xEDnh s\xE1ch">${legal}</nav>` : ""}<p>Th\xF4ng tin b\u1EA1n \u0111\u1EC3 l\u1EA1i ch\u1EC9 d\xF9ng \u0111\u1EC3 li\xEAn h\u1EC7 v\u1EC1 n\u1ED9i dung c\u1EE7a trang n\xE0y.</p></div></footer>`;
}
var legalUrl = (slug, key) => `/funnel-studio/f/${encodeURIComponent(slug)}/chinh-sach/${key}`;
var privacyUrl = (slug) => legalUrl(slug, "privacy");
var sourceScript = (slug, type, preview) => `(()=>{const key='kgs-source:'+${scriptJson(slug)};let s=null;try{s=JSON.parse(sessionStorage.getItem(key)||'null')}catch{}
const q=new URLSearchParams(location.search),tags={};for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','fbclid','ttclid'])if(q.get(k))tags[k]=q.get(k);
// The first page of this funnel in this tab sets the source; arriving again from a tagged link (a new ad) replaces it.
if(!s||Object.keys(tags).length){s={utm:tags,referrer:Object.keys(tags).length||!s?(document.referrer||''):s.referrer};try{sessionStorage.setItem(key,JSON.stringify(s))}catch{}}
window.kgsSource=()=>s;window.kgsTrack=window.kgsTrack||(()=>{});
document.addEventListener('click',e=>{const a=e.target.closest('a[href*="zalo.me"]');if(!a)return;try{navigator.sendBeacon(${scriptJson(`/api/public/funnels/${encodeURIComponent(slug)}/zalo`)},new Blob([JSON.stringify({type:${scriptJson(type)},preview:${preview}})],{type:'application/json'}))}catch{}if(window.kgsTrack)kgsTrack('Contact')})})()`;
function shell(input) {
  const { brand, preview, theme } = input;
  const track = tracking(input.settings, preview);
  const logo2 = brand.logoUrl ? `<img src="${t(brand.logoUrl)}" alt="">` : "";
  const bar = input.bar !== false && (brand.name || logo2) ? `<header class="bar"><div class="wrap"><span class="brand">${logo2}${t(brand.name)}</span>${brand.zaloUrl ? `<a class="top-zalo" href="${t(brand.zaloUrl)}" target="_blank" rel="noopener">${icon("chat", 16)}Nh\u1EAFn Zalo</a>` : ""}</div></header>` : "";
  const notice = preview ? `<div class="notice">B\u1EA3n xem tr\u01B0\u1EDBc trong Funnel Studio \xB7 kh\xF4ng \u0111\u01B0\u1EE3c t\xEDnh l\u01B0\u1EE3t xem${input.status ? ` \xB7 ${t(input.status)}` : ""}</div>` : "";
  const zalo = input.zalo && brand.zaloUrl ? `<a class="zalo" href="${t(brand.zaloUrl)}" target="_blank" rel="noopener" aria-label="Nh\u1EAFn Zalo">${icon("chat", 24)}</a>` : "";
  const title = `${input.title}${brand.name ? ` \xB7 ${brand.name}` : ""}${input.settings.publishing.siteTitle ? ` \xB7 ${input.settings.publishing.siteTitle}` : ""}`;
  const share = input.settings.publishing.shareImageUrl ? `<meta property="og:image" content="${t(input.settings.publishing.shareImageUrl)}">` : "";
  const favicon = input.settings.publishing.faviconUrl ? `<link rel="icon" href="${t(input.settings.publishing.faviconUrl)}">` : "";
  return `<!doctype html><html lang="vi" data-theme="${theme}" style="${brandStyle(theme, brand.accent)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${t(title)}</title><meta name="description" content="${t(input.description)}"><meta property="og:title" content="${t(input.title)}"><meta property="og:description" content="${t(input.description)}">${share}${favicon}<meta name="theme-color" content="${themeFonts[theme].themeColor}">${preview || !input.index ? '<meta name="robots" content="noindex">' : ""}${fontLink(theme)}<style>${tokensCss}${blocksCss}</style></head><body class="type-${input.type}">${notice}${bar}
${input.body}
${footer(input)}${zalo}${track.bar}<script>${sourceScript(input.slug, input.type, preview)}</script>${track.script ? `<script>${track.script}</script>` : ""}${input.script ? `<script>${input.script}</script>` : ""}</body></html>`;
}
function waitingPage(input) {
  const page3 = shell({ ...input, description: input.message, index: false, body: `<main class="wrap waiting"><div><h1>${t(input.title)}</h1><p>${t(input.message)}</p></div></main>` });
  return input.refresh ? page3.replace("<head>", '<head><meta http-equiv="refresh" content="5">') : page3;
}
function leadForm(input) {
  if (!input.open) return `<div class="closed">${input.closed ?? "Trang \u0111ang t\u1EA1m d\u1EEBng nh\u1EADn th\xF4ng tin. B\u1EA1n quay l\u1EA1i sau nh\xE9."}</div>`;
  const note = input.noteLabel ? `<label class="field"><span>${t(input.noteLabel)} <small>(kh\xF4ng b\u1EAFt bu\u1ED9c)</small></span><textarea name="note" maxlength="1000"></textarea></label>` : "";
  const email = input.email ? `<label class="field"><span>Email <small>(kh\xF4ng b\u1EAFt bu\u1ED9c)</small></span><input type="email" name="email" autocomplete="email" inputmode="email" maxlength="254"></label>` : "";
  return `<form id="${input.id}" class="lead-form" novalidate><h3>${t(input.title)}</h3>${input.description ? `<p class="form-lead">${t(input.description)}</p>` : ""}
<label class="field"><span>H\u1ECD v\xE0 t\xEAn</span><input type="text" name="name" autocomplete="name" required maxlength="120"></label>
<label class="field"><span>S\u1ED1 \u0111i\u1EC7n tho\u1EA1i (Zalo)</span><input type="tel" name="phone" autocomplete="tel" inputmode="tel" required placeholder="VD: 0912 345 678" aria-describedby="${input.id}-hint"><span class="hint" id="${input.id}-hint">Ch\u1EC9 d\xF9ng \u0111\u1EC3 li\xEAn h\u1EC7 v\u1EDBi b\u1EA1n v\u1EC1 ${t(input.offerName)}. Kh\xF4ng spam.</span></label>
${input.extra ?? ""}${email || note ? `<details class="more"><summary>${icon("plus", 16)}${email && note ? "Th\xEAm email ho\u1EB7c ghi ch\xFA" : email ? "Th\xEAm email" : "Th\xEAm ghi ch\xFA"}</summary>${email}${note}</details>` : ""}
<label class="consent"><input type="checkbox" name="consent" required><span>${t(input.consent)} <a href="${t(input.privacy)}" target="_blank" rel="noopener">Ch\xEDnh s\xE1ch d\u1EEF li\u1EC7u</a></span></label>
<button class="button wide" type="submit">${t(input.cta)}${icon("arrow", 18)}</button>${input.reassurance ? `<span class="reassure center">${icon("shield", 15)}${t(input.reassurance)}</span>` : ""}<p class="error" role="alert"></p></form>`;
}
var formHelpers = `const normal=v=>{v=String(v||'').replace(/[\\s.()-]/g,'');if(v.startsWith('+84'))v='0'+v.slice(3);else if(v.startsWith('84')&&v.length>=11)v='0'+v.slice(2);return v};
const phoneOk=v=>/^0[35789]\\d{8}$/.test(normal(v));
const newKey=()=>(window.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
const post=async(url,body)=>{const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Ch\u01B0a g\u1EEDi \u0111\u01B0\u1EE3c, b\u1EA1n th\u1EED l\u1EA1i nh\xE9.');return j};
const bindPhone=(form)=>{const phone=form.elements.phone,hint=form.querySelector('#'+form.id+'-hint');if(!phone||!hint)return;const text=hint.textContent;phone.addEventListener('blur',()=>{if(!phone.value.trim())return;const ok=phoneOk(phone.value);phone.setAttribute('aria-invalid',String(!ok));hint.textContent=ok?text:'S\u1ED1 di \u0111\u1ED9ng c\u1EA7n 10 s\u1ED1, b\u1EAFt \u0111\u1EA7u b\u1EB1ng 03, 05, 07, 08 ho\u1EB7c 09. VD: 0912 345 678';hint.classList.toggle('bad',!ok)})};
const check=(form,error)=>{const d=new FormData(form);if(!String(d.get('name')||'').trim()){error.textContent='H\xE3y \u0111i\u1EC1n h\u1ECD t\xEAn.';form.elements.name.focus();return null}if(!phoneOk(d.get('phone'))){error.textContent='S\u1ED1 di \u0111\u1ED9ng c\u1EA7n 10 s\u1ED1, b\u1EAFt \u0111\u1EA7u b\u1EB1ng 03, 05, 07, 08 ho\u1EB7c 09.';form.elements.phone.focus();return null}if(form.elements.consent&&d.get('consent')!=='on'){error.textContent='H\xE3y t\xEDch \u0111\u1ED3ng \xFD tr\u01B0\u1EDBc khi g\u1EEDi.';return null}return d};
const busy=(button,on,label)=>{button.disabled=on;if(on){button.dataset.label=button.innerHTML;button.textContent=label||'\u0110ang g\u1EEDi\u2026'}else if(button.dataset.label)button.innerHTML=button.dataset.label};`;
function leadFormScript(formId, endpoint, extraBody = "{}", pixelEvent = "Lead") {
  return `(()=>{${formHelpers}const form=document.getElementById(${scriptJson(formId)});if(!form)return;const error=form.querySelector('.error'),button=form.querySelector('button[type=submit]'),key=newKey();bindPhone(form);
form.addEventListener('submit',async e=>{e.preventDefault();error.textContent='';const d=check(form,error);if(!d)return;busy(button,true);
try{const src=window.kgsSource?kgsSource():{utm:{},referrer:document.referrer};const r=await post(${scriptJson(endpoint)},Object.assign({name:d.get('name'),phone:d.get('phone'),email:d.get('email'),note:d.get('note'),consent:true,idempotencyKey:key,source:src.referrer,utm:src.utm},${extraBody}));if(window.kgsTrack)kgsTrack(${scriptJson(pixelEvent)});
if(r.nextUrl){location.href=r.nextUrl;return}form.innerHTML='<div class="done"><h3>'+(r.thankYou&&r.thankYou.headline||'C\u1EA3m \u01A1n b\u1EA1n!')+'</h3><p>'+(r.thankYou&&r.thankYou.body||'')+'</p></div>'}catch(c){error.textContent=c.message;busy(button,false)}})})()`;
}
function dock(label, cta, href) {
  return `<div class="dock"><span>${t(label)}</span><a class="button" href="${t(href)}">${t(cta)}</a></div>`;
}
var dockScript = (watch) => `(()=>{const dock=document.querySelector('.dock');if(!dock||!('IntersectionObserver'in window))return;const els=${scriptJson(watch)}.map(s=>document.querySelector(s)).filter(Boolean),seen=new Map();
const update=()=>{const show=els.length&&els.every(el=>seen.has(el)&&!seen.get(el));dock.classList.toggle('show',show);document.body.classList.toggle('docked',show&&matchMedia('(max-width:860px)').matches)};
const io=new IntersectionObserver(es=>{for(const e of es)seen.set(e.target,e.isIntersecting);update()});els.forEach(el=>io.observe(el));
dock.querySelector('a')?.addEventListener('click',e=>{const href=e.currentTarget.getAttribute('href')||'';if(!href.startsWith('#'))return;const target=document.querySelector(href);const field=target&&target.querySelector('input:not([type=hidden]),textarea');if(field)setTimeout(()=>field.focus({preventScroll:true}),450)})})()`;
var copyScript = `(()=>{document.addEventListener('click',async e=>{const b=e.target.closest('[data-copy]');if(!b)return;const v=b.dataset.copy;let ok=false;try{await navigator.clipboard.writeText(v);ok=true}catch{const a=document.createElement('textarea');a.value=v;document.body.appendChild(a);a.select();try{ok=document.execCommand('copy')}catch{}a.remove()}const old=b.dataset.label||b.textContent;b.dataset.label=old;b.textContent=ok?'\u0110\xE3 ch\xE9p':'Ch\xE9p kh\xF4ng \u0111\u01B0\u1EE3c';setTimeout(()=>{b.textContent=old},1600)})})()`;
var blocksCss = `
*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font-body);font-size:var(--text-body);line-height:var(--leading-body);font-weight:var(--weight-body);caret-color:var(--accent);overflow-wrap:break-word}
::selection{background:var(--accent);color:var(--on-accent)}
a{color:inherit;text-underline-offset:3px}
:focus-visible{outline:var(--focus-w) solid var(--accent);outline-offset:var(--focus-w);border-radius:var(--radius-sm)}
.i{flex:none;display:block}
.wrap{width:min(var(--page-max),100%);margin:0 auto;padding:0 var(--gutter)}
.narrow{width:min(var(--narrow-max),100%);margin:0 auto;padding:0 var(--gutter)}
h1,h2,h3{font-family:var(--font-display);font-weight:var(--display-weight);letter-spacing:var(--display-track);line-height:var(--leading-tight);text-wrap:balance;margin:0}
h1{font-size:var(--text-h1)}h2{font-size:var(--text-h2)}h3{font-size:var(--text-h3);letter-spacing:var(--track-tight)}
p{margin:0}
.muted{color:var(--ink-2)}
.mt-3{margin-top:var(--space-3)}.mt-4{margin-top:var(--space-4)}.mt-6{margin-top:var(--space-6)}.on-hero{color:var(--hero-ink)}.full-height{min-height:100vh}
.fieldset{border:0;padding:0;margin:0 0 var(--space-4);min-width:0}.field-legend{padding:0;margin-bottom:var(--space-2);font-size:var(--text-sm);font-weight:var(--weight-medium)}
.notice{background:var(--notice-bg);color:var(--notice-ink);font-size:var(--text-2xs);line-height:var(--leading-snug);text-align:center;padding:var(--space-2) var(--space-4)}
.bar{background:var(--hero-bg);color:var(--hero-ink)}
.bar .wrap,.top{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);min-height:var(--space-14);padding-top:var(--space-3);padding-bottom:var(--space-3)}
.brand{display:flex;align-items:center;gap:var(--space-2);font-weight:var(--weight-strong);font-size:var(--text-base)}
.brand img{width:var(--space-8);height:var(--space-8);object-fit:contain;border-radius:var(--radius-sm);background:var(--surface)}
.top-zalo{display:inline-flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);font-weight:var(--weight-medium);text-decoration:none;color:var(--hero-ink);padding:var(--space-2) var(--space-3);border-radius:var(--radius-pill);border:var(--line-w) solid var(--hero-line)}
.eyebrow{display:inline-flex;align-items:center;gap:var(--space-1);font-size:var(--text-3xs);font-weight:var(--weight-strong);letter-spacing:var(--track-label);text-transform:uppercase;color:var(--accent-ink);margin-bottom:var(--space-3)}
.hero{background:var(--hero-bg);color:var(--hero-ink);position:relative;overflow:hidden}
.hero::before{content:"";position:absolute;inset:-25% -15% auto auto;width:72%;height:130%;background:radial-gradient(closest-side,var(--accent-glow),transparent);pointer-events:none}
.hero .eyebrow{color:var(--hero-accent)}
.hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:var(--gap-hero);align-items:center;padding:var(--space-6) 0 var(--section-y)}
.hero-solo{position:relative;padding-top:var(--space-10);padding-bottom:var(--section-y)}
mark{background:linear-gradient(transparent 60%,var(--accent-mark) 60%);color:inherit;padding:0 var(--mark-pad)}
.lead{margin-top:var(--space-4);max-width:var(--prose-max);font-size:var(--text-lead);color:var(--hero-ink-2)}
/* Outside the hero (cards on the page ground) the lead reads in the page's own ink. */
.page-narrow .lead,.card .lead{color:var(--ink-2)}
.chips{display:flex;flex-wrap:wrap;gap:var(--space-2);margin:var(--space-6) 0 0;padding:0;list-style:none}
.chips li{display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-3);border-radius:var(--radius-pill);background:var(--chip-bg);color:var(--hero-ink);font-size:var(--text-sm);font-weight:var(--weight-medium);line-height:var(--leading-snug)}
.chips li .i{color:var(--chip-icon)}
.hero-cta{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-3) var(--space-4);margin-top:var(--space-8)}
.button{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);min-height:var(--tap);padding:var(--space-3) var(--space-6);border:0;border-radius:var(--radius);background:var(--accent);color:var(--on-accent);font-family:var(--font-body);font-size:var(--text-md);font-weight:var(--weight-strong);line-height:var(--leading-tight);text-decoration:none;text-align:center;cursor:pointer;box-shadow:var(--shadow-sm);transition:transform var(--fast) ease,filter var(--fast) ease}
.button:hover{filter:brightness(.94)}.button:active{transform:translateY(1px)}.button:disabled{opacity:.6;cursor:progress}
.button.ghost{background:transparent;color:var(--ink);box-shadow:none;border:var(--line-w-2) solid var(--line)}
.button.zalo-button{background:var(--zalo);color:var(--on-zalo)}
.button.small{min-height:var(--space-10);padding:var(--space-2) var(--space-4);font-size:var(--text-sm)}
.button.wide{width:100%}
.text-link{display:inline-flex;align-items:center;gap:var(--space-1);background:none;border:0;padding:var(--space-2) 0;font-family:var(--font-body);font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--ink-2);text-decoration:underline;cursor:pointer}
.reassure{display:inline-flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);color:var(--hero-ink-2)}
.reassure.center{display:flex;justify-content:center;margin-top:var(--space-3);color:var(--ink-2);font-size:var(--text-2xs);text-align:center}
.object{position:relative;display:grid;place-items:center;min-height:340px;padding:var(--space-6) 0}
@media (prefers-reduced-motion:no-preference){.object>*{animation:settle 1s var(--ease-out) both}@keyframes settle{from{translate:0 18px;rotate:var(--settle-from,-6deg)}}}
.book{--settle-from:-8deg;position:relative;width:min(300px,72vw);aspect-ratio:3/4;padding:var(--space-8) var(--space-6) var(--space-6) var(--space-10);border-radius:var(--radius-sm) var(--radius-lg) var(--radius-lg) var(--radius-sm);background:var(--accent);color:var(--on-accent);display:flex;flex-direction:column;transform:perspective(1400px) rotateY(-14deg) rotate(-2deg);box-shadow:var(--shadow-lg)}
.book::before{content:"";position:absolute;left:0;top:0;bottom:0;width:var(--space-3);border-radius:var(--radius-sm) 0 0 var(--radius-sm);background:var(--spine)}
.book::after{content:"";position:absolute;right:-9px;top:var(--space-2);bottom:var(--space-2);width:10px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;background:var(--paper-edge);z-index:-1}
.book-badge{align-self:flex-start;font-size:var(--text-3xs);font-weight:var(--weight-strong);letter-spacing:var(--track-label);text-transform:uppercase;padding:var(--space-1) var(--space-2);border-radius:var(--radius-pill);background:color-mix(in oklab,var(--on-accent) 16%,transparent)}
.book-title{margin-top:auto;font-family:var(--font-display);font-weight:var(--display-weight);font-size:var(--text-object);line-height:var(--leading-tight);letter-spacing:var(--track-tight);text-wrap:balance}
.book-by{margin-top:var(--space-4);padding-top:var(--space-3);border-top:var(--line-w) solid color-mix(in oklab,var(--on-accent) 30%,transparent);display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);font-size:var(--text-xs);font-weight:var(--weight-medium)}
.ticket{--settle-from:5deg;--notch:radial-gradient(circle 13px at calc(100% - 112px) 0,transparent 97%,var(--ink) 0) top/100% 51% no-repeat,radial-gradient(circle 13px at calc(100% - 112px) 100%,transparent 97%,var(--ink) 0) bottom/100% 51% no-repeat;position:relative;width:min(430px,88vw);display:grid;grid-template-columns:minmax(0,1fr) 112px;background:var(--surface);color:var(--ink);border-radius:var(--radius-lg);transform:rotate(2deg);filter:var(--shadow-drop);-webkit-mask:var(--notch);mask:var(--notch)}
.ticket-main{padding:var(--space-6) var(--space-5);display:grid;gap:var(--space-3);border-right:var(--line-w-3) dashed var(--line)}
.ticket-label{font-size:var(--text-3xs);font-weight:var(--weight-strong);letter-spacing:var(--track-label);text-transform:uppercase;color:var(--accent-ink)}
.ticket-title{font-family:var(--font-display);font-weight:var(--display-weight);font-size:var(--text-title);line-height:var(--leading-tight);letter-spacing:var(--track-tight)}
.ticket-row{display:flex;gap:var(--space-2);align-items:flex-start;font-size:var(--text-sm);line-height:var(--leading-snug);color:var(--ink-2)}.ticket-row .i{color:var(--accent-ink)}
.ticket-stub{display:grid;place-content:center;gap:var(--space-1);padding:var(--space-4) var(--space-2);text-align:center;background:var(--accent);color:var(--on-accent)}
.ticket-stub span{font-size:var(--text-4xs);font-weight:var(--weight-strong);letter-spacing:var(--track-wide);text-transform:uppercase;opacity:.85}.ticket-stub b{font-family:var(--font-display);font-size:var(--text-base);line-height:var(--leading-snug);overflow-wrap:anywhere}
.call-stack{--settle-from:-5deg;position:relative;isolation:isolate}
.call-stack::before{content:"";position:absolute;inset:var(--space-4) calc(var(--space-4) * -1) calc(var(--space-4) * -1) var(--space-4);border-radius:var(--radius-xl);background:color-mix(in oklab,var(--accent) 26%,var(--surface));transform:rotate(4deg);z-index:0}
.call{position:relative;z-index:1;width:min(380px,82vw);padding:var(--space-6);border-radius:var(--radius-xl);background:var(--surface);color:var(--ink);box-shadow:var(--shadow-lg);transform:rotate(-2deg);display:grid;gap:var(--space-4)}
.call-head{display:flex;align-items:center;gap:var(--space-3)}
.avatar{flex:none;width:var(--avatar);height:var(--avatar);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--accent);color:var(--on-accent);font-family:var(--font-display);font-weight:var(--weight-strong);font-size:var(--text-h3);overflow:hidden;box-shadow:var(--shadow-avatar)}.avatar img{width:100%;height:100%;object-fit:contain;background:var(--surface)}
.call-head strong{display:block;font-size:var(--text-base);line-height:var(--leading-snug)}.call-head span:not(.avatar):not(.call-ring){font-size:var(--text-2xs);color:var(--ink-2)}
.call-ring{margin-left:auto;width:var(--icon-tile);height:var(--icon-tile);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--success);color:var(--surface)}
.call-topic{font-family:var(--font-display);font-weight:var(--display-weight);font-size:var(--text-title);line-height:var(--leading-snug);letter-spacing:var(--track-tight)}
.call-meta{display:flex;flex-wrap:wrap;gap:var(--space-2)}.call-meta span{display:inline-flex;align-items:center;gap:var(--space-1);padding:var(--space-1) var(--space-3);border-radius:var(--radius-pill);background:var(--accent-soft);font-size:var(--text-xs);font-weight:var(--weight-medium)}
.call-note{font-size:var(--text-xs);color:var(--ink-2);padding-top:var(--space-3);border-top:var(--line-w) solid var(--line)}
.product{--settle-from:5deg;width:min(380px,86vw);padding:var(--space-6);border-radius:var(--radius-xl);background:var(--surface);color:var(--ink);box-shadow:var(--shadow-lg);transform:rotate(1.5deg);display:grid;gap:var(--space-3)}
.product img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius)}
.pill{justify-self:start;display:inline-flex;align-items:center;gap:var(--space-1);font-size:var(--text-3xs);font-weight:var(--weight-strong);letter-spacing:var(--track-label);text-transform:uppercase;padding:var(--space-1) var(--space-2);border-radius:var(--radius-pill);background:var(--accent-soft);color:var(--accent-ink)}
.product-name{font-family:var(--font-display);font-weight:var(--display-weight);font-size:var(--text-title);line-height:var(--leading-tight);letter-spacing:var(--track-tight)}
.price{font-family:var(--font-display);font-weight:var(--display-weight);font-size:var(--text-price);line-height:var(--leading-tight);letter-spacing:var(--track-tight);color:var(--accent-ink);font-variant-numeric:tabular-nums}
.product ul{margin:0;padding:var(--space-3) 0 0;border-top:var(--line-w) solid var(--line);list-style:none;display:grid;gap:var(--space-2);font-size:var(--text-sm);line-height:var(--leading-snug)}
.product li{display:flex;gap:var(--space-2)}.product li .i{color:var(--accent-ink)}
section.band{padding:var(--section-y) 0}section.band.alt{background:var(--bg-alt)}
.band-head{max-width:var(--narrow-max)}.band-head p{margin-top:var(--space-3);color:var(--ink-2)}
.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,440px);gap:var(--gap-hero);align-items:start}
.checks{margin:var(--space-7) 0 0;padding:0;list-style:none;display:grid;gap:var(--space-4);max-width:var(--prose-max)}
.checks li{display:grid;grid-template-columns:var(--space-8) minmax(0,1fr);gap:var(--space-3);align-items:start;line-height:var(--leading-relaxed)}
.tick{width:var(--space-8);height:var(--space-8);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--accent);color:var(--on-accent)}
.tick.no{background:var(--bg-alt);color:var(--ink-2)}
.card{background:var(--surface);color:var(--ink);border-radius:var(--radius-xl);padding:var(--space-7);box-shadow:var(--shadow-lg);scroll-margin-top:var(--space-4)}
.card.flat{box-shadow:var(--shadow-card)}
.form-card{position:sticky;top:var(--space-5)}
.lead-form h3{margin-bottom:var(--space-2)}.form-lead{color:var(--ink-2);font-size:var(--text-base);margin-bottom:var(--space-5)}
.field{display:grid;gap:var(--space-1);margin-bottom:var(--space-4)}
.field>span:first-child{font-size:var(--text-sm);font-weight:var(--weight-medium)}.field small{font-weight:var(--weight-body);color:var(--ink-2)}
.field-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--space-3)}
input[type=text],input[type=tel],input[type=email],input[type=number],textarea,select{width:100%;min-height:var(--field-h);font-family:var(--font-body);font-size:var(--text-base);line-height:var(--leading-snug);color:var(--ink);background:var(--surface);border:var(--line-w-2) solid var(--field-line);border-radius:var(--radius);padding:var(--space-3);transition:border-color var(--fast),box-shadow var(--fast)}
textarea{min-height:88px;resize:vertical}
input::placeholder,textarea::placeholder{color:var(--ink-2)}
input:focus,textarea:focus,select:focus{outline:none;border-color:var(--accent);box-shadow:var(--shadow-focus)}
input[aria-invalid=true]{border-color:var(--danger)}
.hint{font-size:var(--text-2xs);line-height:var(--leading-snug);color:var(--ink-2)}.hint.bad{color:var(--danger)}
details.more{margin:calc(var(--space-1) * -1) 0 var(--space-4)}details.more>summary{display:inline-flex;align-items:center;gap:var(--space-1);cursor:pointer;font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--accent-ink);list-style:none}details.more>summary::-webkit-details-marker{display:none}
details.more[open]>summary{margin-bottom:var(--space-3)}details.more[open]>summary .i{transform:rotate(45deg)}
.consent{display:flex;gap:var(--space-2);align-items:flex-start;font-size:var(--text-xs);line-height:var(--leading-relaxed);color:var(--ink-2);margin:var(--space-1) 0 var(--space-4);cursor:pointer}.consent input{width:var(--space-5);height:var(--space-5);flex:none;accent-color:var(--accent)}
.error{color:var(--danger);font-size:var(--text-xs);min-height:var(--space-5);margin-top:var(--space-2)}.error:empty{display:none}
.done{text-align:center}.done h3{margin-bottom:var(--space-2)}.done p{color:var(--ink-2)}
.closed{padding:var(--space-5);border-radius:var(--radius-md);background:var(--bg-alt);color:var(--ink-2);text-align:center}
.steps{margin:var(--space-8) 0 0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-6);counter-reset:step}
.steps li{position:relative;padding-top:var(--space-14);line-height:var(--leading-relaxed);counter-increment:step}
.steps li::before{content:counter(step);position:absolute;top:0;left:0;width:var(--icon-tile);height:var(--icon-tile);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--surface);border:var(--line-w-3) solid var(--accent);font-family:var(--font-display);font-weight:var(--weight-strong);font-size:var(--text-md);color:var(--accent-ink)}
.steps li:not(:last-child)::after{content:"";position:absolute;top:var(--space-5);left:var(--space-12);right:calc(var(--space-3) * -1);height:var(--line-w-3);background:var(--line)}
.creator{display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-5);align-items:start;max-width:var(--narrow-max)}
.creator .avatar{width:var(--avatar-lg);height:var(--avatar-lg)}
.creator p{margin-top:var(--space-2);color:var(--ink-2)}
.creator a{display:inline-flex;align-items:center;gap:var(--space-2);margin-top:var(--space-3);font-weight:var(--weight-medium);color:var(--accent-ink)}
.faq{margin-top:var(--space-7);max-width:var(--narrow-max);border-top:var(--line-w) solid var(--line)}
.faq details{border-bottom:var(--line-w) solid var(--line)}
.faq summary{display:flex;justify-content:space-between;gap:var(--space-4);padding:var(--space-5) 0;cursor:pointer;font-weight:var(--weight-medium);line-height:var(--leading-snug);list-style:none}.faq summary::-webkit-details-marker{display:none}
.faq summary .i{color:var(--accent-ink);transition:transform var(--slow) ease}.faq details[open] summary .i{transform:rotate(45deg)}
.faq details p{padding:0 0 var(--space-5);color:var(--ink-2);max-width:var(--prose-max)}
.final{background:var(--hero-bg);color:var(--hero-ink);text-align:center;border-top:var(--line-w) solid var(--line)}
.final h2{max-width:24ch;margin:0 auto}.final p{margin:var(--space-3) auto 0;color:var(--hero-ink-2);max-width:var(--prose-max)}.final .button{margin-top:var(--space-7)}
.problems{margin:var(--space-6) 0 0;padding:0;list-style:none;display:grid;gap:var(--space-3);max-width:var(--prose-max)}
.problems li{display:flex;gap:var(--space-3);align-items:flex-start;padding:var(--space-4);border-radius:var(--radius-md);background:var(--surface);border:var(--line-w) solid var(--line)}
.problems li .i{color:var(--danger)}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:var(--space-3);margin-top:var(--space-6)}
.gallery img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--radius)}
.cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-5);margin-top:var(--space-6)}
.cols h3{font-size:var(--text-md);margin-bottom:var(--space-3)}
.verdict{margin-top:var(--space-6);padding:var(--space-5);border-radius:var(--radius-md);background:var(--accent-faint);border-left:4px solid var(--accent)}
.disclosure{margin-top:var(--space-4);font-size:var(--text-2xs);color:var(--ink-2)}
.go-domain{display:block;margin-top:var(--space-2);font-size:var(--text-2xs);color:var(--ink-2)}.hero .go-domain{color:var(--hero-ink-2)}
.inapp{display:none;margin-top:var(--space-3);padding:var(--space-3);border-radius:var(--radius);background:var(--warning-soft);color:var(--warning);font-size:var(--text-xs)}.inapp.show{display:block}
.quiz{max-width:var(--narrow-max);margin:0 auto}
.progress{height:6px;border-radius:var(--radius-pill);background:var(--bg-alt);overflow:hidden;margin-bottom:var(--space-5)}.progress i{display:block;height:100%;width:0;background:var(--accent);transition:width var(--slow) var(--ease-out)}
.question{display:none}.question.on{display:block}
.question h2{font-size:var(--text-h3)}
.answers{display:grid;gap:var(--space-3);margin-top:var(--space-5)}
.answer{display:flex;align-items:center;gap:var(--space-3);width:100%;min-height:var(--tap);padding:var(--space-3) var(--space-4);border:var(--line-w-2) solid var(--line);border-radius:var(--radius);background:var(--surface);color:var(--ink);font-family:var(--font-body);font-size:var(--text-base);font-weight:var(--weight-medium);text-align:left;cursor:pointer;transition:border-color var(--fast)}
.answer:hover{border-color:var(--accent)}.answer.picked{border-color:var(--accent);background:var(--accent-faint)}
.quiz-nav{display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-4);font-size:var(--text-xs);color:var(--ink-2)}
.result-name{display:inline-block;margin:var(--space-2) 0 var(--space-4);padding:var(--space-2) var(--space-4);border-radius:var(--radius-pill);background:var(--accent-soft);color:var(--accent-ink);font-weight:var(--weight-strong)}
.recommend{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:var(--space-4);align-items:center;margin-top:var(--space-6)}
.recommend .price{font-size:var(--text-h3)}
.key-points{counter-reset:k;margin:var(--space-5) 0 0;padding:0;list-style:none;display:grid;gap:var(--space-3)}
.key-points li{display:grid;grid-template-columns:var(--space-8) minmax(0,1fr);gap:var(--space-3);counter-increment:k}
.key-points li::before{content:counter(k);width:var(--space-8);height:var(--space-8);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-ink);font-weight:var(--weight-strong)}
.first-action{display:flex;gap:var(--space-3);align-items:flex-start;padding:var(--space-4);border-radius:var(--radius-md);background:var(--accent-faint);margin-top:var(--space-5)}
.first-action .i{color:var(--accent-ink)}
.gift-file{display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);border-radius:var(--radius-md);border:var(--line-w) solid var(--line);background:var(--surface);margin-top:var(--space-5)}
.gift-file .i{color:var(--accent-ink)}.gift-file span{flex:1;min-width:0;overflow-wrap:anywhere}
.facts{margin:var(--space-5) 0 0;padding:var(--space-4);border-radius:var(--radius-md);background:var(--bg-alt);display:grid;gap:var(--space-2);font-size:var(--text-sm)}
.facts div{display:flex;gap:var(--space-2)}.facts .i{color:var(--accent-ink)}
.actions{display:grid;gap:var(--space-3);margin-top:var(--space-6)}
.calendar-links{display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3)}
.ok-badge{width:60px;height:60px;border-radius:var(--radius-round);display:grid;place-items:center;background:var(--success-soft);color:var(--success-ink);margin-bottom:var(--space-4)}
.center{text-align:center}.center .ok-badge{margin-left:auto;margin-right:auto}
.page-narrow{padding-top:var(--space-10);padding-bottom:var(--section-y)}
.choice{display:flex;gap:var(--space-2);flex-wrap:wrap}
.choice label{position:relative}
.choice input{position:absolute;opacity:0;inset:0}
.choice span{display:inline-flex;align-items:center;min-height:var(--space-10);padding:var(--space-2) var(--space-4);border-radius:var(--radius-pill);border:var(--line-w-2) solid var(--line);background:var(--surface);font-size:var(--text-sm);font-weight:var(--weight-medium);cursor:pointer}
.choice input:checked+span{border-color:var(--accent);background:var(--accent-faint);color:var(--accent-ink)}
.choice input:focus-visible+span{outline:var(--focus-w) solid var(--accent);outline-offset:2px}
.pay{display:grid;gap:var(--space-3)}
.pay label{display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-3);align-items:start;padding:var(--space-4);border:var(--line-w-2) solid var(--line);border-radius:var(--radius);background:var(--surface);cursor:pointer}
.pay label:has(input:checked){border-color:var(--accent);background:var(--accent-faint)}
.pay input{width:var(--space-5);height:var(--space-5);accent-color:var(--accent)}
.pay strong{display:block}.pay small{color:var(--ink-2);font-size:var(--text-2xs)}
.summary{display:grid;gap:var(--space-2);font-size:var(--text-sm)}
.summary-row{display:flex;justify-content:space-between;gap:var(--space-3)}.summary-row span:last-child{font-variant-numeric:tabular-nums;white-space:nowrap}
.summary-total{display:flex;justify-content:space-between;gap:var(--space-3);padding-top:var(--space-3);margin-top:var(--space-2);border-top:var(--line-w) solid var(--line);font-weight:var(--weight-strong);font-size:var(--text-md)}
.qty{display:inline-flex;align-items:center;border:var(--line-w-2) solid var(--line);border-radius:var(--radius)}
.qty button{width:var(--tap-sm);height:var(--tap-sm);display:grid;place-items:center;border:0;background:none;color:var(--ink);cursor:pointer}
.qty output{min-width:var(--space-8);text-align:center;font-weight:var(--weight-strong);font-variant-numeric:tabular-nums}
.line-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:var(--space-3);align-items:center;padding-bottom:var(--space-4);margin-bottom:var(--space-4);border-bottom:var(--line-w) solid var(--line)}
.line-item strong{display:block}.line-item small{display:block;color:var(--ink-2)}
.qr-card{display:grid;justify-items:center;gap:var(--space-3);padding:var(--space-5);border-radius:var(--radius-xl);background:var(--surface);border:var(--line-w) solid var(--line)}
.qr-card img{width:min(260px,70vw);height:auto;image-rendering:pixelated}
.transfer{width:100%;display:grid;gap:var(--space-2);font-size:var(--text-sm)}
.transfer div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:var(--space-2);align-items:center;padding:var(--space-2) 0;border-bottom:var(--line-w) solid var(--line)}
.transfer dt{color:var(--ink-2);font-size:var(--text-2xs)}.transfer dd{margin:0;font-weight:var(--weight-strong);overflow-wrap:anywhere}
.transfer button{display:inline-flex;align-items:center;gap:var(--space-1);border:var(--line-w) solid var(--line);background:var(--surface);color:var(--ink);border-radius:var(--radius-sm);padding:var(--space-1) var(--space-3);font-family:var(--font-body);font-size:var(--text-2xs);font-weight:var(--weight-medium);cursor:pointer;min-height:var(--space-10)}
.status-line{display:flex;align-items:center;gap:var(--space-2);padding:var(--space-3) var(--space-4);border-radius:var(--radius);background:var(--warning-soft);color:var(--warning);font-size:var(--text-xs);font-weight:var(--weight-medium)}
.status-line.ok{background:var(--success-soft);color:var(--success-ink)}
.upsell{max-width:var(--narrow-max);margin:0 auto}
.upsell .product{transform:none;width:100%;margin-top:var(--space-5)}
.was{color:var(--ink-2);text-decoration:line-through;font-size:var(--text-base);margin-left:var(--space-2)}
.room-video{position:relative;width:100%;aspect-ratio:16/9;border-radius:var(--radius-xl);overflow:hidden;background:var(--notice-bg)}
.room-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
button.room-video{display:block;padding:0;border:0;cursor:pointer}button.room-video img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.85}
.room-video .play{position:absolute;left:50%;top:50%;translate:-50% -50%;width:var(--tap);height:var(--tap);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--accent);color:var(--on-accent);box-shadow:var(--shadow-md)}
.countdown{display:flex;gap:var(--space-3);margin-top:var(--space-5)}
.countdown div{display:grid;justify-items:center;min-width:72px;padding:var(--space-3);border-radius:var(--radius);background:var(--surface);color:var(--ink);box-shadow:var(--shadow-card)}
.countdown b{font-family:var(--font-display);font-size:var(--text-h2);line-height:var(--leading-tight);font-variant-numeric:tabular-nums}.countdown span{font-size:var(--text-3xs);color:var(--ink-2);text-transform:uppercase;letter-spacing:var(--track-label)}
.room-state{display:none}.room-state.on{display:block}
.legal-text{white-space:pre-wrap;max-width:var(--prose-max)}
footer{padding:var(--space-7) 0 calc(var(--space-7) + env(safe-area-inset-bottom));color:var(--ink-2);font-size:var(--text-2xs);text-align:center;background:var(--bg);display:grid;gap:var(--space-2)}
footer .wrap{display:grid;gap:var(--space-2)}.footer-who{font-weight:var(--weight-medium);color:var(--ink)}
.footer-legal{display:flex;justify-content:center;flex-wrap:wrap;gap:var(--space-4)}
.dock{position:fixed;left:0;right:0;bottom:0;z-index:20;display:none;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom));background:color-mix(in oklab,var(--surface) 94%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:var(--line-w) solid var(--line);transform:translateY(110%);transition:transform var(--slow) var(--ease-out)}
.dock.show{transform:none}.dock span{flex:1;min-width:0;font-size:var(--text-xs);font-weight:var(--weight-medium);line-height:var(--leading-snug);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dock .button{min-height:var(--tap-sm);padding:var(--space-3) var(--space-4);font-size:var(--text-base)}
.zalo{position:fixed;right:var(--space-4);bottom:calc(var(--space-5) + env(safe-area-inset-bottom));z-index:21;width:var(--fab);height:var(--fab);border-radius:var(--radius-round);display:grid;place-items:center;background:var(--zalo);color:var(--on-zalo);box-shadow:var(--shadow-md);text-decoration:none;transition:bottom var(--slow) var(--ease-out)}
body.docked .zalo{bottom:calc(84px + env(safe-area-inset-bottom))}
.consent-bar{position:fixed;left:var(--space-3);right:var(--space-3);bottom:calc(var(--space-3) + env(safe-area-inset-bottom));z-index:30;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-3);padding:var(--space-4);border-radius:var(--radius-md);background:var(--surface);color:var(--ink);box-shadow:var(--shadow-lg);font-size:var(--text-xs)}
.consent-bar[hidden]{display:none}.consent-bar div{display:flex;gap:var(--space-2)}
.waiting{min-height:70vh;display:grid;place-items:center;text-align:center;color:var(--ink-2)}.waiting h1{font-size:var(--text-h2);color:var(--ink);margin-bottom:var(--space-3)}
@media (max-width:860px){
  .hero-grid{grid-template-columns:1fr;gap:var(--space-7);padding-bottom:var(--space-14)}
  .object{min-height:0;padding:var(--space-2) 0 var(--space-4)}
  .book{width:min(230px,62vw)}
  .ticket,.product{width:min(340px,100%)}.call{width:min(310px,calc(100vw - 88px))}
  .split,.cols{grid-template-columns:1fr}
  .form-card{position:static}
  .form-first .split>aside{order:-1}
  .steps{grid-template-columns:1fr;gap:var(--space-5)}.steps li{padding:var(--space-1) 0 0 var(--space-14);min-height:var(--icon-tile)}.steps li:not(:last-child)::after{top:var(--space-12);bottom:calc(var(--space-4) * -1);left:19px;right:auto;width:var(--line-w-3);height:auto}
  .dock{display:flex}
  .hero-cta .button{flex:1 1 100%}
  .card{padding:var(--space-5)}
  .field-row{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

// src/mini-apps/funnel-studio/server/pages/after.ts
var hello = (context, fallback2) => context.lead ? `${fallback2.replace(/[.!]$/, "")}, ${firstName(context.lead.name)}!` : fallback2;
var zaloButton = (context, label, primary = true) => context.brand.zaloUrl ? `<a class="button ${primary ? "zalo-button" : "ghost"} wide" href="${t(context.brand.zaloUrl)}" target="_blank" rel="noopener">${icon("chat", 18)}${t(label)}</a>` : "";
var simple = (context, title, description, body, script = "") => shell({ type: context.step.type, title, description, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, zalo: true, body, script });
var eventStart = (startsAt) => {
  if (!startsAt || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startsAt)) return null;
  const date = /* @__PURE__ */ new Date(`${startsAt}:00+07:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};
var calendarStamp = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
function renderThankYou(context, page3) {
  const next = context.next ? `<a class="text-link" href="${t(withLead(context.next, context))}">${t(page3.cta)}${icon("arrow", 16)}</a>` : "";
  const zalo = zaloButton(context, context.brand.name ? `Nh\u1EAFn Zalo cho ${context.brand.name}` : "Nh\u1EAFn Zalo cho shop");
  const action = zalo ? `${zalo}${next}` : context.next ? `<a class="button wide" href="${t(withLead(context.next, context))}">${t(page3.cta)}${icon("arrow", 18)}</a>` : "";
  const body = `<main class="narrow page-narrow center"><div class="card"><div class="ok-badge">${icon("circleCheck", 30)}</div><h1>${t(hello(context, page3.headline))}</h1><p class="lead">${t(page3.body)}</p><p class="muted mt-4">${t(page3.contactPromise)}</p>
${action ? `<div class="actions"><h3>${t(page3.nextTitle)}</h3><p class="muted">${t(page3.nextBody)}</p>${action}</div>` : ""}</div></main>`;
  return simple(context, page3.headline, page3.body, body);
}
function renderGift(context, page3) {
  const brief = context.funnel.brief;
  const title = brief.kind === "lead" ? brief.giftTitle : "M\xF3n qu\xE0";
  const file = brief.kind === "lead" && brief.giftFile ? brief.giftFile : null;
  const open = context.giftUrl ? `<div class="gift-file">${icon(file ? "file" : "external", 22)}<span><strong>${t(title)}</strong>${file ? `<br><small class="muted">${t(file.filename)} \xB7 ${Math.max(1, Math.round(file.byteSize / 1024))} KB</small>` : ""}</span><a class="button small" href="${t(context.giftUrl)}"${file ? " download" : ' target="_blank" rel="noopener"'}>${icon(file ? "download" : "external", 16)}${file ? "T\u1EA3i v\u1EC1" : "M\u1EDF qu\xE0"}</a></div>` : `<div class="status-line">${icon("clock", 16)}Qu\xE0 \u0111ang \u0111\u01B0\u1EE3c chu\u1EA9n b\u1ECB. Shop s\u1EBD g\u1EEDi qua Zalo cho b\u1EA1n.</div>`;
  const next = context.next ? `<a class="button wide" href="${t(withLead(context.next, context))}">${t(page3.cta)}${icon("arrow", 18)}</a>${zaloButton(context, "H\u1ECFi shop qua Zalo", false)}` : zaloButton(context, page3.cta);
  const body = `<main class="narrow page-narrow"><div class="card"><span class="eyebrow">${icon("gift", 14)} Qu\xE0 c\u1EE7a b\u1EA1n</span><h1>${t(hello(context, page3.headline))}</h1><p class="lead">${t(page3.introduction)}</p>${open}
<div class="first-action">${icon("sparkle", 20)}<div><strong>Vi\u1EC7c nh\u1ECF \u0111\u1EA7u ti\xEAn</strong><p>${t(page3.firstAction)}</p></div></div>
<h2 class="mt-6">${t(page3.keyPointsTitle)}</h2><ol class="key-points">${page3.keyPoints.map((point) => `<li><span>${t(point)}</span></li>`).join("")}</ol>
${next ? `<div class="actions"><h3>${t(page3.nextTitle)}</h3><p class="muted">${t(page3.nextBody)}</p>${next}</div>` : ""}</div></main>`;
  return simple(context, page3.headline, page3.introduction, body);
}
function renderQuizResult(context, page3, quiz) {
  const brief = context.funnel.brief;
  const index = Math.max(0, Math.min(page3.results.length - 1, Number(context.query.r) || 0));
  const copy = page3.results[index];
  const name = quiz?.results[index]?.name ?? (brief.kind === "quiz" ? brief.results[index]?.name : "") ?? "";
  const product = brief.kind === "quiz" ? brief.results[index]?.product ?? null : null;
  const order = context.products.length ? `${context.base}/dat-hang` : null;
  const recommend = product ? `<div class="card flat mt-6"><span class="pill">${icon("star", 12)} G\u1EE3i \xFD cho b\u1EA1n</span><div class="recommend"><div><strong class="product-name">${t(product.name)}</strong><p class="muted">${t(copy.why)}</p></div>${product.price ? `<span class="price">${money(product.price)}</span>` : ""}</div>${order && product.price ? `<a class="button wide mt-4" href="${t(withLead(order, context, { p: product.productId }))}">${t(copy.cta)}${icon("arrow", 18)}</a>` : zaloButton(context, copy.cta)}</div>` : `<div class="card flat mt-6"><p>${t(copy.why)}</p>${zaloButton(context, copy.cta)}</div>`;
  const ask = !context.lead && context.open ? `<div class="card mt-6">${leadForm({ id: "result-form", title: page3.formTitle, description: page3.formDescription, cta: "G\u1EEDi cho t\xF4i qua Zalo", reassurance: "", consent: context.settings.form.consentText || "T\xF4i \u0111\u1ED3ng \xFD \u0111\u1EC3 shop li\xEAn h\u1EC7 qua \u0111i\u1EC7n tho\u1EA1i ho\u1EB7c Zalo v\u1EC1 k\u1EBFt qu\u1EA3 n\xE0y.", noteLabel: "", offerName: "k\u1EBFt qu\u1EA3 quiz", open: true, privacy: privacyUrl(context.funnel.slug) })}</div>` : "";
  const body = `<main class="narrow page-narrow"><p class="muted">K\u1EBFt qu\u1EA3 c\u1EE7a b\u1EA1n${context.lead ? `, ${t(firstName(context.lead.name))}` : ""}</p><strong class="result-name">${t(name)}</strong><h1>${t(copy.headline)}</h1><p class="lead">${t(copy.explanation)}</p>
<h2 class="mt-6">B\u1EA1n n\xEAn l\xE0m</h2><ul class="checks">${copy.actions.map((action) => `<li><span class="tick">${icon("check", 16)}</span><span>${t(action)}</span></li>`).join("")}</ul>${recommend}${ask}</main>`;
  const script = ask ? leadFormScript("result-form", `/api/public/funnels/${encodeURIComponent(context.funnel.slug)}/submissions`, `{note:${scriptJson(`K\u1EBFt qu\u1EA3 quiz: ${name}`)},quiz:{result:${index},answers:[]}}`) : "";
  return simple(context, copy.headline, copy.explanation, body, script);
}
function renderConfirmation(context, page3) {
  const brief = context.funnel.brief;
  const start = brief.kind === "event" ? eventStart(brief.startsAt) : null;
  const minutes = brief.kind === "event" ? brief.durationMinutes || 60 : 0;
  const title = brief.kind === "event" ? brief.eventTitle : brief.kind === "booking" ? brief.topic : "";
  const place = brief.kind === "event" ? brief.place : "";
  const calendar = start ? `<div class="calendar-links"><a class="button small ghost" target="_blank" rel="noopener" href="${t(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${calendarStamp(start)}/${calendarStamp(new Date(start.getTime() + minutes * 6e4))}&details=${encodeURIComponent(`${context.base}/phong`)}&location=${encodeURIComponent(place)}`)}">${icon("calendar", 16)}Google Calendar</a><a class="button small ghost" href="${t(`${context.base}/lich.ics`)}">${icon("calendar", 16)}L\u1ECBch \u0111i\u1EC7n tho\u1EA1i (.ics)</a></div>` : "";
  const reminder = brief.kind === "event" && brief.zaloGroupUrl ? `<a class="button zalo-button wide" href="${t(brief.zaloGroupUrl)}" target="_blank" rel="noopener">${icon("bell", 18)}V\xE0o nh\xF3m Zalo nh\u1EADn nh\u1EAFc l\u1ECBch</a>` : zaloButton(context, "Nh\u1EADn nh\u1EAFc l\u1ECBch qua Zalo");
  const remind = reminder ? `<h3>${t(page3.reminderTitle)}</h3><p class="muted">${t(page3.reminderBody)}</p>${reminder}` : context.lead ? `<p class="muted">Shop s\u1EBD li\xEAn h\u1EC7 s\u1ED1 ${t(context.lead.phone.slice(0, 4))} \u2022\u2022\u2022 ${t(context.lead.phone.slice(-3))} tr\u01B0\u1EDBc gi\u1EDD h\u1EB9n.</p>` : "";
  const period = brief.kind === "booking" ? /Buổi tiện nghe máy: ([^\n]+)/.exec(context.lead?.note ?? "")?.[1] ?? "" : "";
  const facts = [...context.facts, ...period ? [{ label: "Bu\u1ED5i b\u1EA1n ch\u1ECDn", value: period }] : []];
  const room = brief.kind === "event" && context.next ? `<a class="text-link" href="${t(withLead(context.next, context))}">M\u1EDF ph\xF2ng xem c\u1EE7a bu\u1ED5i${icon("arrow", 16)}</a>` : "";
  const body = `<main class="narrow page-narrow"><div class="card"><div class="ok-badge">${icon("circleCheck", 30)}</div><h1>${t(hello(context, page3.headline))}</h1><p class="lead">${t(page3.body)}</p>
${facts.length ? `<div class="facts">${facts.map((item) => `<div>${icon("check", 16)}<span><strong>${t(item.label)}:</strong> ${t(item.value)}</span></div>`).join("")}</div>` : ""}
${remind || calendar || room ? `<div class="actions">${remind}${calendar}${room}</div>` : ""}
<h2 class="mt-6">${t(page3.prepareTitle)}</h2><ul class="checks">${page3.prepare.map((item) => `<li><span class="tick">${icon("check", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul>
<p class="muted mt-6">${t(page3.rescheduleNote)}${context.settings.brand.hotline ? ` Hotline: <a href="tel:${t(context.settings.brand.hotline.replace(/\s+/g, ""))}">${t(context.settings.brand.hotline)}</a>.` : ""}</p></div></main>`;
  return simple(context, page3.headline, page3.body, body);
}
var youtubeId = (url2) => /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([\w-]{11})/.exec(url2)?.[1] ?? null;
function renderEventRoom(context, page3) {
  const brief = context.funnel.brief;
  if (brief.kind !== "event") throw new Error("Not an event funnel");
  const start = eventStart(brief.startsAt);
  const minutes = brief.durationMinutes || 60;
  const replayHours = brief.replayHours ?? 48;
  const join = brief.joinUrl ?? "";
  const video = youtubeId(join);
  const product = brief.sellProduct?.productId ? brief.sellProduct : null;
  const orderUrl = product && context.next ? withLead(context.next, context, { p: product.productId }) : "";
  const watch = video ? `<button type="button" class="room-video" data-video="${video}" aria-label="Ph\xE1t video ${t(brief.eventTitle)}"><img src="https://i.ytimg.com/vi/${video}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy"><span class="play">${icon("play", 28)}</span></button>` : join ? `<a class="button wide" href="${t(join)}" target="_blank" rel="noopener">${icon("play", 18)}V\xE0o ph\xF2ng${/zoom\./i.test(join) ? " Zoom (m\u1EDF \u1EE9ng d\u1EE5ng)" : ""}</a>` : `<div class="status-line">${icon("clock", 16)}Link ph\xF2ng s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi qua Zalo tr\u01B0\u1EDBc gi\u1EDD b\u1EAFt \u0111\u1EA7u.</div>`;
  const offer = product ? `<div class="card mt-6" data-offer hidden><span class="pill">${icon("gift", 12)} \u01AFu \u0111\xE3i c\u1EE7a bu\u1ED5i</span><h2 class="mt-3">${t(page3.offerTitle)}</h2><p class="muted mt-3">${t(page3.offerBody)}</p><ul class="checks">${page3.offerPoints.map((item) => `<li><span class="tick">${icon("check", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul><div class="recommend"><strong class="product-name">${t(product.name)}</strong>${product.price ? `<span class="price">${money(product.price)}</span>` : ""}</div>${orderUrl ? `<a class="button wide mt-4" href="${t(orderUrl)}">${t(page3.offerCta)}${icon("arrow", 18)}</a>` : ""}</div>` : "";
  const body = `<main class="narrow page-narrow">
<section class="room-state" data-state="before"><span class="eyebrow">${t(brief.eventTitle)}</span><h1>${t(page3.beforeHeadline)}</h1><p class="lead">${t(page3.beforeBody)}</p><div class="countdown" aria-live="polite"><div><b data-d>0</b><span>ng\xE0y</span></div><div><b data-h>0</b><span>gi\u1EDD</span></div><div><b data-m>0</b><span>ph\xFAt</span></div></div>${brief.zaloGroupUrl ? `<div class="actions"><a class="button zalo-button wide" href="${t(brief.zaloGroupUrl)}" target="_blank" rel="noopener">${icon("bell", 18)}V\xE0o nh\xF3m Zalo c\u1EE7a bu\u1ED5i</a></div>` : ""}</section>
<section class="room-state" data-state="live"><span class="pill">${icon("play", 12)} \u0110ang di\u1EC5n ra</span><h1 class="mt-3">${t(page3.liveHeadline)}</h1><p class="lead">${t(page3.liveBody)}</p><div class="mt-6">${watch}</div></section>
<section class="room-state" data-state="replay"><span class="pill">${icon("play", 12)} Xem l\u1EA1i</span><h1 class="mt-3">${t(page3.replayHeadline)}</h1><p class="lead">${t(page3.replayBody)}</p><div class="mt-6">${watch}</div><p class="muted mt-3" data-replay-until></p></section>
<section class="room-state" data-state="closed"><h1>${t(page3.expiredHeadline)}</h1><p class="lead">${t(page3.expiredBody)}</p><div class="actions">${zaloButton(context, "H\u1ECFi bu\u1ED5i ti\u1EBFp theo qua Zalo")}</div></section>
${offer}</main>`;
  const script = `(()=>{const start=${start ? start.getTime() : "null"},minutes=${minutes},replay=${replayHours},force=${scriptJson(context.query.state ?? "")};
const states=[...document.querySelectorAll('.room-state')],offer=document.querySelector('[data-offer]');
const tick=()=>{const now=Date.now();let s='before';if(force)s=force;else if(!start)s='live';else if(now<start)s='before';else if(now<start+minutes*60000)s='live';else if(replay>0&&now<start+(minutes+replay*60)*60000)s='replay';else s='closed';
states.forEach(el=>el.classList.toggle('on',el.dataset.state===s));
if(offer)offer.hidden=!(s==='replay'||(s==='live'&&(!start||now>=start+minutes*60000*0.65))||(force==='live'));
if(s==='before'&&start){const left=Math.max(0,start-now);document.querySelector('[data-d]').textContent=Math.floor(left/864e5);document.querySelector('[data-h]').textContent=Math.floor(left/36e5)%24;document.querySelector('[data-m]').textContent=Math.floor(left/6e4)%60}
const until=document.querySelector('[data-replay-until]');if(until&&start)until.textContent='B\u1EA3n xem l\u1EA1i m\u1EDF \u0111\u1EBFn '+new Date(start+(minutes+replay*60)*60000).toLocaleString('vi-VN',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})+'.'};
tick();setInterval(tick,30000);
document.querySelectorAll('[data-video]').forEach(b=>b.addEventListener('click',()=>{const w=document.createElement('div');w.className='room-video';const f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.video+'?autoplay=1';f.title=b.getAttribute('aria-label')||'Video';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;w.appendChild(f);b.replaceWith(w)}))})()`;
  return simple(context, page3.beforeHeadline, page3.beforeBody, body, script);
}

// src/mini-apps/funnel-studio/server/pages/entry.ts
var factIcon = { "Th\u1EDDi gian": "clock", "\u0110\u1ECBa \u0111i\u1EC3m": "pin", "Ph\xED tham d\u1EF1": "ticket", "H\xECnh th\u1EE9c": "phone", "Th\u1EDDi l\u01B0\u1EE3ng": "timer", "Gi\xE1": "tag", "G\u1ECDi l\u1EA1i": "bell" };
var submitUrl = (context) => `/api/public/funnels/${encodeURIComponent(context.funnel.slug)}/submissions`;
var brandName = (context) => context.brand.name;
var logo = (context) => context.brand.logoUrl ? `<img src="${t(context.brand.logoUrl)}" alt="">` : "";
var fact = (context, label) => context.facts.find((item) => item.label === label)?.value ?? "";
var faqBlock = (faq2) => faq2.length ? `<section class="band alt"><div class="wrap"><h2>C\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p</h2><div class="faq">${faq2.map((item) => `<details><summary><span>${t(item.question)}</span>${icon("plus", 18)}</summary><p>${t(item.answer)}</p></details>`).join("")}</div></div></section>` : "";
var creatorBlock = (context, title, note) => {
  if (!note) return "";
  const caller = brandName(context) || title;
  return `<section class="band"><div class="wrap creator"><span class="avatar">${logo(context) || t(initial(caller))}</span><div>${title ? `<h3>${t(title)}</h3>` : ""}<p>${t(note)}</p>${context.brand.zaloUrl ? `<a href="${t(context.brand.zaloUrl)}" target="_blank" rel="noopener">${icon("chat", 18)}H\u1ECFi tr\u01B0\u1EDBc qua Zalo</a>` : ""}</div></div></section>`;
};
var heroTop = (context) => brandName(context) || logo(context) || context.brand.zaloUrl ? `<div class="top"><span class="brand">${logo(context)}${t(brandName(context))}</span>${context.brand.zaloUrl ? `<a class="top-zalo" href="${t(context.brand.zaloUrl)}" target="_blank" rel="noopener">${icon("chat", 16)}Nh\u1EAFn Zalo</a>` : ""}</div>` : "";
function renderOptIn(context, raw) {
  const page3 = raw;
  const kind = context.funnel.kind;
  const brief = context.funnel.brief;
  const chips = kind === "lead" ? [{ value: "Mi\u1EC5n ph\xED", icon: "gift" }] : context.facts.map((item) => ({ value: item.label === "G\u1ECDi l\u1EA1i" ? `G\u1ECDi l\u1EA1i ${item.value}` : item.value, icon: factIcon[item.label] ?? "check" }));
  const benefits = page3.benefits.slice(0, 5);
  const steps = (page3.nextSteps ?? []).filter(Boolean).slice(0, 3);
  const reassurance = page3.reassurance?.trim() ?? "";
  const caller = brandName(context) || page3.creatorTitle;
  const consultant = brief.kind === "booking" ? brief.consultant?.trim() ?? "" : "";
  const object = kind === "lead" ? `<div class="book" role="img" aria-label="${t(page3.offerTitle)}"><span class="book-badge">${t(page3.eyebrow)}</span><strong class="book-title">${t(page3.offerTitle)}</strong><span class="book-by"><span>${t(brandName(context) || "Qu\xE0 t\u1EB7ng")}</span>${icon("gift", 20)}</span></div>` : kind === "event" ? `<div class="ticket"><div class="ticket-main"><span class="ticket-label">${t(page3.eyebrow)}</span><strong class="ticket-title">${t(page3.offerTitle)}</strong>${fact(context, "Th\u1EDDi gian") ? `<span class="ticket-row">${icon("clock")}<span>${t(fact(context, "Th\u1EDDi gian"))}</span></span>` : ""}${fact(context, "\u0110\u1ECBa \u0111i\u1EC3m") ? `<span class="ticket-row">${icon("pin")}<span>${t(fact(context, "\u0110\u1ECBa \u0111i\u1EC3m"))}</span></span>` : ""}</div><div class="ticket-stub"><span>V\xE9 v\xE0o c\u1EEDa</span><b>${t(fact(context, "Ph\xED tham d\u1EF1") || "Mi\u1EC5n ph\xED")}</b></div></div>` : kind === "sales" ? `<div class="product"><span class="pill">${t(page3.eyebrow)}</span><strong class="product-name">${t(page3.offerTitle)}</strong>${fact(context, "Gi\xE1") ? `<span class="price">${t(fact(context, "Gi\xE1"))}</span>` : ""}<ul>${benefits.slice(0, 3).map((item) => `<li>${icon("check", 16)}<span>${t(item)}</span></li>`).join("")}</ul></div>` : `<div class="call-stack"><div class="call"><div class="call-head"><span class="avatar">${logo(context) || t(initial(consultant || caller || "T\u01B0 v\u1EA5n"))}</span><div><strong>${t(consultant || caller || "Ng\u01B0\u1EDDi t\u01B0 v\u1EA5n")}</strong><span>${t(page3.eyebrow)}</span></div><span class="call-ring">${icon("phone", 18)}</span></div><strong class="call-topic">${t(page3.offerTitle)}</strong><div class="call-meta">${fact(context, "H\xECnh th\u1EE9c") ? `<span>${icon("phone", 15)}${t(fact(context, "H\xECnh th\u1EE9c"))}</span>` : ""}${fact(context, "Th\u1EDDi l\u01B0\u1EE3ng") ? `<span>${icon("timer", 15)}${t(fact(context, "Th\u1EDDi l\u01B0\u1EE3ng"))}</span>` : ""}</div><p class="call-note">${t(fact(context, "G\u1ECDi l\u1EA1i") ? `B\u1EA1n \u0111\u1EC3 l\u1EA1i s\u1ED1, ch\xFAng t\xF4i g\u1ECDi l\u1EA1i ${fact(context, "G\u1ECDi l\u1EA1i")} \u0111\u1EC3 ch\u1ED1t gi\u1EDD.` : "B\u1EA1n \u0111\u1EC3 l\u1EA1i s\u1ED1, ch\xFAng t\xF4i li\xEAn h\u1EC7 \u0111\u1EC3 ch\u1ED1t gi\u1EDD ph\xF9 h\u1EE3p.")}</p></div></div>`;
  const periods = brief.kind === "booking" ? brief.periods?.length ? brief.periods : ["S\xE1ng", "Chi\u1EC1u", "T\u1ED1i"] : [];
  const extra = periods.length ? `<fieldset class="fieldset"><legend class="field-legend">Bu\u1ED5i b\u1EA1n ti\u1EC7n nghe m\xE1y</legend><div class="choice">${periods.map((period, index) => `<label><input type="radio" name="period" value="${t(period)}"${index === 0 ? " checked" : ""}><span>${t(period)}</span></label>`).join("")}</div></fieldset>` : "";
  const over = brief.kind === "event" && (() => {
    const start = eventStart(brief.startsAt);
    return Boolean(start && Date.now() > start.getTime() + (brief.durationMinutes || 60) * 6e4);
  })();
  const open = context.open && !over;
  const room = `${context.base}/phong${context.preview ? "?preview=1" : ""}`;
  const form = leadForm({
    id: "lead-form",
    title: page3.formTitle,
    description: page3.formDescription,
    cta: page3.cta,
    reassurance,
    consent: page3.consent,
    noteLabel: page3.noteLabel,
    offerName: page3.offerTitle,
    open,
    extra,
    email: kind !== "booking",
    privacy: privacyUrl(context.funnel.slug),
    closed: over ? `<strong>Bu\u1ED5i n\xE0y \u0111\xE3 di\u1EC5n ra.</strong><br><a href="${t(room)}">Xem b\u1EA3n ghi \u1EDF ph\xF2ng xem</a>` : void 0
  });
  const agenda = kind === "event" && page3.agenda?.length ? `<section class="band"><div class="wrap"><h2>Trong bu\u1ED5i n\xE0y</h2><ul class="checks">${page3.agenda.map((item) => `<li><span class="tick">${icon("clock", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul></div></section>` : "";
  const fit = kind === "booking" && (page3.fitFor?.length || page3.notFor?.length) ? `<section class="band"><div class="wrap"><h2>Bu\u1ED5i n\xE0y d\xE0nh cho ai</h2><div class="cols"><div><h3>N\xEAn \u0111\u1EB7t n\u1EBFu b\u1EA1n</h3><ul class="checks">${(page3.fitFor ?? []).map((item) => `<li><span class="tick">${icon("check", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul></div><div><h3>Ch\u01B0a n\xEAn \u0111\u1EB7t n\u1EBFu b\u1EA1n</h3><ul class="checks">${(page3.notFor ?? []).map((item) => `<li><span class="tick no">${icon("x", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul></div></div></div></section>` : "";
  const alternate = kind === "booking";
  const body = `<header class="hero"><div class="wrap">${heroTop(context)}
<div class="hero-grid"><div><h1>${headline(page3.headline, page3.highlight)}</h1><p class="lead">${t(page3.introduction)}</p>${chips.length ? `<ul class="chips">${chips.map((chip) => `<li>${icon(chip.icon, 17)}<span>${t(chip.value)}</span></li>`).join("")}</ul>` : ""}
<div class="hero-cta">${open ? `<a class="button" href="#dang-ky">${t(page3.cta)}${icon("arrow", 18)}</a>${reassurance ? `<span class="reassure">${icon("shield", 15)}${t(reassurance)}</span>` : ""}` : ""}</div></div>
<div class="object">${object}</div></div></div></header>
<main class="${kind === "booking" ? "" : "form-first"}"><section class="band${alternate ? " alt" : ""}"><div class="wrap split"><div><h2>${t(page3.benefitsTitle)}</h2><p class="muted mt-3">${t(page3.offerDetail)}</p><ul class="checks">${benefits.map((item) => `<li><span class="tick">${icon("check", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul></div><aside class="card form-card" id="dang-ky">${form}</aside></div></section>
${agenda}${fit}${steps.length ? `<section class="band${alternate ? "" : " alt"}"><div class="wrap"><h2>Sau khi b\u1EA1n \u0111\u1EC3 l\u1EA1i th\xF4ng tin</h2><ol class="steps">${steps.map((step) => `<li>${t(step)}</li>`).join("")}</ol></div></section>` : ""}
${creatorBlock(context, page3.creatorTitle, page3.creatorNote)}${faqBlock(page3.faq)}
${open ? `<section class="band final"><div class="wrap"><h2>${t(page3.offerTitle)}</h2>${reassurance ? `<p>${t(reassurance)}</p>` : ""}<a class="button" href="#dang-ky">${t(page3.cta)}${icon("arrow", 18)}</a></div></section>` : ""}</main>
${open ? dock(chips[0]?.value ?? page3.offerTitle, page3.cta, "#dang-ky") : ""}`;
  const extraBody = periods.length ? `{note:[(new FormData(form).get('period')?'Bu\u1ED5i ti\u1EC7n nghe m\xE1y: '+new FormData(form).get('period'):''),new FormData(form).get('note')].filter(Boolean).join('\\n')}` : "{}";
  return shell({
    type: context.step.type,
    title: page3.headline,
    description: page3.introduction,
    theme: context.funnel.theme,
    brand: context.brand,
    settings: context.settings,
    slug: context.funnel.slug,
    preview: context.preview,
    index: true,
    bar: false,
    zalo: kind === "booking" || kind === "sales",
    status: context.open ? "" : "trang \u0111ang t\u1EA1m d\u1EEBng",
    body,
    // Standard pixel events (rule C-57): a gift or quiz lead, an event sign-up, a booked call.
    script: open ? `${leadFormScript("lead-form", submitUrl(context), extraBody, kind === "event" ? "CompleteRegistration" : kind === "booking" ? "Schedule" : "Lead")};${dockScript([".hero-cta", "#dang-ky"])}` : ""
  });
}
var payChips = (context) => {
  const { fee, freeFrom, cod } = context.delivery;
  return [
    cod ? "Thanh to\xE1n khi nh\u1EADn h\xE0ng" : "",
    context.bank ? context.bank.picture ? "Chuy\u1EC3n kho\u1EA3n" : "Chuy\u1EC3n kho\u1EA3n VietQR" : "",
    fee === 0 ? "Mi\u1EC5n ph\xED giao h\xE0ng" : fee ? `Ph\xED giao: ${money(fee)}${freeFrom !== null ? `, mi\u1EC5n ph\xED t\u1EEB ${money(freeFrom)}` : ""}` : ""
  ].filter(Boolean);
};
function renderSales(context, page3) {
  const product = context.product;
  const brief = context.funnel.brief;
  const legacyCheckout = brief.kind === "sales" && !product && brief.checkoutUrl ? brief.checkoutUrl : "";
  const orderUrl = context.next && product ? withLead(context.next, context, { p: product.productId }) : legacyCheckout || (context.brand.zaloUrl || "#");
  const priceText = product?.price ? money(product.price) : brief.kind === "sales" ? brief.price : "";
  const name = product?.name || (brief.kind === "sales" ? brief.productName : "");
  const chips = [...priceText ? [{ text: priceText, icon: "tag" }] : [], ...payChips(context).map((text5) => ({ text: text5, icon: "check" }))];
  const cta = (extra = "") => context.open ? `<a class="button${extra}" href="${t(orderUrl)}"${legacyCheckout ? ' target="_blank" rel="noopener"' : ""}>${t(page3.cta)}${icon("arrow", 18)}</a>` : "";
  const offerCard = `<div class="product"><strong class="product-name">${t(name)}</strong>${priceText ? `<span class="price">${t(priceText)}</span>` : ""}<p class="muted">${t(page3.offerNote)}</p><ul>${page3.benefits.slice(0, 3).map((item) => `<li>${icon("check", 16)}<span>${t(item)}</span></li>`).join("")}</ul>${cta(" wide")}${page3.reassurance ? `<span class="reassure center">${icon("shield", 15)}${t(page3.reassurance)}</span>` : ""}</div>`;
  const body = `<header class="hero"><div class="wrap">${heroTop(context)}
<div class="hero-grid"><div><span class="eyebrow">${t(page3.eyebrow)}</span><h1>${headline(page3.headline, page3.highlight)}</h1><p class="lead">${t(page3.introduction)}</p>${chips.length ? `<ul class="chips">${chips.map((chip) => `<li>${icon(chip.icon, 17)}<span>${t(chip.text)}</span></li>`).join("")}</ul>` : ""}
<div class="hero-cta">${cta()}${page3.reassurance ? `<span class="reassure">${icon("shield", 15)}${t(page3.reassurance)}</span>` : ""}</div></div>
<div class="object">${offerCard}</div></div></div></header>
<main><section class="band alt"><div class="wrap"><div class="band-head"><h2>${t(page3.problemTitle)}</h2></div><ul class="problems">${page3.problems.map((item) => `<li>${icon("x", 18)}<span>${t(item)}</span></li>`).join("")}</ul></div></section>
<section class="band"><div class="wrap"><div class="band-head"><h2>${t(page3.solutionTitle)}</h2><p>${t(page3.solution)}</p></div></div></section>
<section class="band alt"><div class="wrap"><h2>${t(page3.benefitsTitle)}</h2><ul class="checks">${page3.benefits.map((item) => `<li><span class="tick">${icon("check", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul></div></section>
<section class="band"><div class="wrap"><h2>${t(page3.howTitle)}</h2><ol class="steps">${page3.howSteps.map((step) => `<li>${t(step)}</li>`).join("")}</ol></div></section>
${creatorBlock(context, page3.creatorTitle, page3.creatorNote)}${faqBlock(page3.faq)}
<section class="band final" id="mua"><div class="wrap"><h2>${t(page3.finalTitle)}</h2>${priceText ? `<p class="price on-hero">${t(priceText)}</p>` : ""}${cta()}</div></section></main>
${context.open ? dock(priceText ? `${name} \xB7 ${priceText}` : name, page3.cta, orderUrl) : ""}`;
  return shell({
    type: "sales",
    title: page3.headline,
    description: page3.introduction,
    theme: context.funnel.theme,
    brand: context.brand,
    settings: context.settings,
    slug: context.funnel.slug,
    preview: context.preview,
    index: context.step.path === "",
    bar: false,
    zalo: true,
    body,
    script: context.open ? dockScript([".hero-cta", "#mua"]) : ""
  });
}
function renderBridge(context, page3) {
  const brief = context.funnel.brief;
  if (brief.kind !== "bridge") throw new Error("Not a bridge funnel");
  let domain = "";
  try {
    domain = new URL(brief.destinationUrl).hostname.replace(/^www\./, "");
  } catch {
    domain = "";
  }
  const go = `${context.base}/di${context.preview ? "?preview=1" : ""}`;
  const button = `<a class="button" href="${t(go)}" rel="nofollow sponsored noopener">${t(page3.cta)}${icon("external", 18)}</a><span class="go-domain">M\u1EDF ${t(domain || "trang b\xE1n")}</span>`;
  const list2 = (items, good) => `<ul class="checks">${items.map((item) => `<li><span class="tick${good ? "" : " no"}">${icon(good ? "check" : "x", 16)}</span><span>${t(item)}</span></li>`).join("")}</ul>`;
  const body = `<header class="hero"><div class="narrow hero-solo"><span class="eyebrow">${t(page3.eyebrow)}</span><h1>${headline(page3.headline, page3.highlight)}</h1><p class="lead">${t(page3.introduction)}</p><div class="hero-cta">${button}</div><p class="inapp">N\u1EBFu n\xFAt kh\xF4ng m\u1EDF \u0111\u01B0\u1EE3c \u1EE9ng d\u1EE5ng, b\u1EA5m \u22EF \u1EDF g\xF3c tr\xEAn r\u1ED3i ch\u1ECDn \u201CM\u1EDF b\u1EB1ng tr\xECnh duy\u1EC7t\u201D.</p></div></header>
<main>${context.images.length ? `<section class="band"><div class="narrow"><div class="gallery">${context.images.map((src) => `<img src="${t(src)}" alt="\u1EA2nh t\u1EF1 ch\u1EE5p ${t(brief.productName)}" width="400" height="400" loading="lazy" decoding="async">`).join("")}</div></div></section>` : ""}
<section class="band alt"><div class="narrow"><h2>${t(page3.reviewTitle)}</h2><p class="mt-4">${t(page3.review)}</p><div class="cols"><div><h3>\u0110i\u1EC3m th\xEDch</h3>${list2(page3.pros, true)}</div><div><h3>\u0110i\u1EC3m ch\u01B0a \u01B0ng</h3>${list2(page3.cons, false)}</div></div></div></section>
<section class="band"><div class="narrow"><div class="cols"><div><h3>H\u1EE3p v\u1EDBi</h3>${list2(page3.fitFor, true)}</div><div><h3>Ch\u01B0a h\u1EE3p v\u1EDBi</h3>${list2(page3.notFor, false)}</div></div><div class="verdict"><strong>T\xF3m l\u1EA1i</strong><p>${t(page3.verdict)}</p></div><div class="hero-cta">${button}</div>${brief.affiliate ? `<p class="disclosure">Trang c\xF3 link ti\u1EBFp th\u1ECB li\xEAn k\u1EBFt: khi b\u1EA1n mua qua link n\xE0y, ng\u01B0\u1EDDi vi\u1EBFt c\xF3 th\u1EC3 nh\u1EADn hoa h\u1ED3ng, gi\xE1 b\u1EA1n tr\u1EA3 kh\xF4ng \u0111\u1ED5i.</p>` : ""}</div></section>
${faqBlock(page3.faq)}</main>`;
  const script = `(()=>{if(/FBAN|FBAV|Instagram|Zalo|TikTok|musical_ly|Line\\//i.test(navigator.userAgent))document.querySelectorAll('.inapp').forEach(el=>el.classList.add('show'))})()`;
  return shell({ type: "bridge", title: page3.headline, description: page3.introduction, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: true, zalo: true, body, script });
}
function renderQuiz(context, page3) {
  const results = page3.results.map((result) => result.name);
  const questions = page3.questions.map((question) => ({ question: question.question, answers: question.answers.map((answer) => ({ text: answer.text, weights: results.map((_, index) => answer.weights[index] ?? 0) })) }));
  const resultUrl = context.next ?? `${context.base}/ket-qua`;
  const form = leadForm({ id: "quiz-form", title: page3.formTitle, description: page3.formDescription, cta: page3.cta, reassurance: "", consent: page3.consent, noteLabel: "", offerName: "k\u1EBFt qu\u1EA3 quiz", open: context.open, privacy: privacyUrl(context.funnel.slug) });
  const body = `<main class="hero full-height"><div class="narrow hero-solo">${heroTop(context)}
<section class="quiz-screen on" data-screen="cover"><span class="eyebrow">${t(page3.eyebrow)}</span><h1>${headline(page3.headline, page3.highlight)}</h1><p class="lead">${t(page3.introduction)}</p><ul class="chips"><li>${icon("sparkle", 17)}<span>${t(page3.promise)}</span></li><li>${icon("timer", 17)}<span>${t(page3.timeNote)}</span></li></ul><div class="hero-cta"><button type="button" class="button" data-start>${t(page3.startCta)}${icon("arrow", 18)}</button></div></section>
<section class="quiz-screen card" data-screen="questions" hidden><div class="progress" aria-hidden="true"><i></i></div>${questions.map((question, index) => `<div class="question" data-q="${index}"><p class="muted">C\xE2u ${index + 1}/${questions.length}</p><h2>${t(question.question)}</h2><div class="answers">${question.answers.map((answer, a) => `<button type="button" class="answer" data-a="${a}">${t(answer.text)}</button>`).join("")}</div></div>`).join("")}<div class="quiz-nav"><button type="button" class="text-link" data-back>Quay l\u1EA1i</button><span></span></div></section>
<section class="quiz-screen card" data-screen="result" hidden><p class="muted">K\u1EBFt qu\u1EA3 c\u1EE7a b\u1EA1n</p><strong class="result-name" data-result-name></strong><p data-result-teaser></p><div class="mt-6">${form}</div><a class="text-link" data-skip href="#">${t(page3.skipLabel)}</a></section>
</div></main>`;
  const script = `(()=>{${formHelpers}const q=${scriptJson(questions)},r=${scriptJson(page3.results)},next=${scriptJson(resultUrl)},preview=${context.preview ? "true" : "false"};
const screens=[...document.querySelectorAll('.quiz-screen')],show=n=>screens.forEach(s=>{const on=s.dataset.screen===n;s.hidden=!on;s.classList.toggle('on',on)});
const qs=[...document.querySelectorAll('.question')],bar=document.querySelector('.progress i');let at=0;const picks=[];
const go=i=>{at=i;qs.forEach((el,n)=>el.classList.toggle('on',n===i));bar.style.width=(i/q.length*100)+'%'};
const score=()=>{const s=r.map(()=>0);picks.forEach((a,i)=>q[i].answers[a].weights.forEach((w,k)=>s[k]+=w));let best=0;s.forEach((v,k)=>{if(v>s[best])best=k});return best};
let result=0;const url=(extra)=>{const p=new URLSearchParams(Object.assign({r:String(result)},extra));if(preview)p.set('preview','1');return next+(next.includes('?')?'&':'?')+p};
document.querySelector('[data-start]').addEventListener('click',()=>{show('questions');go(0)});
qs.forEach((el,i)=>el.addEventListener('click',e=>{const b=e.target.closest('.answer');if(!b)return;picks[i]=Number(b.dataset.a);el.querySelectorAll('.answer').forEach(x=>x.classList.toggle('picked',x===b));
if(i+1<q.length)setTimeout(()=>go(i+1),180);else{result=score();bar.style.width='100%';document.querySelector('[data-result-name]').textContent=r[result].name;document.querySelector('[data-result-teaser]').textContent=r[result].teaser;setTimeout(()=>show('result'),180)}}));
document.querySelector('[data-back]').addEventListener('click',()=>{if(at>0)go(at-1);else show('cover')});
document.querySelector('[data-skip]').addEventListener('click',e=>{e.preventDefault();location.href=url({s:'1'})});
const form=document.getElementById('quiz-form');if(!form)return;const error=form.querySelector('.error'),button=form.querySelector('button[type=submit]'),key=newKey();bindPhone(form);
form.addEventListener('submit',async e=>{e.preventDefault();error.textContent='';const d=check(form,error);if(!d)return;busy(button,true);
try{const src=window.kgsSource?kgsSource():{utm:{},referrer:document.referrer};const res=await post(${scriptJson(submitUrl(context))},{name:d.get('name'),phone:d.get('phone'),consent:true,idempotencyKey:key,source:src.referrer,utm:src.utm,note:'K\u1EBFt qu\u1EA3 quiz: '+r[result].name,quiz:{result,answers:picks}});if(window.kgsTrack)kgsTrack('Lead');location.href=url({k:res.leadId||''})}catch(c){error.textContent=c.message;busy(button,false)}})})()`;
  return shell({ type: "quiz", title: page3.headline, description: page3.introduction, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: true, bar: false, body, script: `${script};${copyScript}` });
}
var bookingModeLabels = {
  call: "G\u1ECDi \u0111i\u1EC7n tho\u1EA1i",
  zalo: "G\u1ECDi qua Zalo",
  online: "H\u1ECDp online (Google Meet/Zoom)",
  meet: "G\u1EB7p tr\u1EF1c ti\u1EBFp"
};

// src/mini-apps/funnel-studio/server/pages/order.ts
var provinces = [
  "H\xE0 N\u1ED9i",
  "TP H\u1ED3 Ch\xED Minh",
  "H\u1EA3i Ph\xF2ng",
  "\u0110\xE0 N\u1EB5ng",
  "C\u1EA7n Th\u01A1",
  "Hu\u1EBF",
  "An Giang",
  "B\u1EAFc Ninh",
  "C\xE0 Mau",
  "Cao B\u1EB1ng",
  "\u0110\u1EAFk L\u1EAFk",
  "\u0110i\u1EC7n Bi\xEAn",
  "\u0110\u1ED3ng Nai",
  "\u0110\u1ED3ng Th\xE1p",
  "Gia Lai",
  "H\xE0 T\u0129nh",
  "H\u01B0ng Y\xEAn",
  "Kh\xE1nh H\xF2a",
  "Lai Ch\xE2u",
  "L\xE2m \u0110\u1ED3ng",
  "L\u1EA1ng S\u01A1n",
  "L\xE0o Cai",
  "Ngh\u1EC7 An",
  "Ninh B\xECnh",
  "Ph\xFA Th\u1ECD",
  "Qu\u1EA3ng Ng\xE3i",
  "Qu\u1EA3ng Ninh",
  "Qu\u1EA3ng Tr\u1ECB",
  "S\u01A1n La",
  "T\xE2y Ninh",
  "Th\xE1i Nguy\xEAn",
  "Thanh H\xF3a",
  "Tuy\xEAn Quang",
  "V\u0129nh Long"
];
function shippingRule(text5) {
  const value = text5.trim().toLowerCase();
  if (!value) return { fee: 0, freeFrom: null, known: false };
  const amounts = [...value.matchAll(/(\d[\d.,]*)\s*(k|nghìn|ngàn|tr|triệu)?/g)].map((match) => {
    const number = Number(match[1].replace(/[.,](?=\d{3}\b)/g, "").replace(",", "."));
    const unit = match[2] ?? "";
    return unit === "k" || unit === "ngh\xECn" || unit === "ng\xE0n" ? number * 1e3 : unit === "tr" || unit === "tri\u1EC7u" ? number * 1e6 : number;
  }).filter((number) => Number.isFinite(number) && number > 0);
  if (/^miễn phí\s*$/.test(value) || /^free\s*$/.test(value)) return { fee: 0, freeFrom: null, known: true };
  const free = /miễn phí\s*(?:từ|cho đơn từ|khi mua từ|đơn từ)\s*(\d[\d.,]*\s*(?:k|nghìn|ngàn|tr|triệu)?)/.exec(value);
  const freeFrom = free ? amounts[amounts.length - 1] ?? null : null;
  return { fee: amounts[0] && amounts[0] !== freeFrom ? amounts[0] : 0, freeFrom, known: amounts.length > 0 };
}
function renderOrderForm(context) {
  const product = context.product;
  const brief = context.funnel.brief;
  const digital = brief.kind === "sales" && brief.delivery === "digital";
  const canTransfer = Boolean(context.bank);
  const canCod = context.delivery.cod && !digital;
  const title = "\u0110\u1EB7t h\xE0ng";
  if (!product || !product.price) {
    const body2 = `<main class="narrow page-narrow"><div class="card center"><h1>Ch\u01B0a \u0111\u1EB7t h\xE0ng \u0111\u01B0\u1EE3c</h1><p class="lead">S\u1EA3n ph\u1EA9m n\xE0y ch\u01B0a c\xF3 gi\xE1 \u0111\u1EC3 \u0111\u1EB7t tr\xEAn trang. B\u1EA1n nh\u1EAFn shop \u0111\u1EC3 \u0111\u01B0\u1EE3c b\xE1o gi\xE1 nh\xE9.</p>${context.brand.zaloUrl ? `<div class="actions"><a class="button zalo-button wide" href="${t(context.brand.zaloUrl)}" target="_blank" rel="noopener">${icon("chat", 18)}Nh\u1EAFn Zalo cho shop</a></div>` : ""}</div></main>`;
    return shell({ type: "order-form", title, description: title, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, zalo: true, body: body2 });
  }
  if (!canTransfer && !canCod) {
    const body2 = `<main class="narrow page-narrow"><div class="card center"><h1>Shop ch\u01B0a m\u1EDF nh\u1EADn \u0111\u01A1n</h1><p class="lead">Shop ch\u01B0a thi\u1EBFt l\u1EADp c\xE1ch thanh to\xE1n. B\u1EA1n nh\u1EAFn shop \u0111\u1EC3 \u0111\u1EB7t h\xE0ng nh\xE9.</p></div></main>`;
    return shell({ type: "order-form", title, description: title, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, zalo: true, body: body2 });
  }
  const rule = { fee: context.delivery.fee ?? 0, freeFrom: context.delivery.fee ? context.delivery.freeFrom : null, known: context.delivery.fee !== null };
  const lead = context.lead;
  const address = digital ? "" : `<div class="field-row"><label class="field"><span>T\u1EC9nh / th\xE0nh ph\u1ED1</span><select name="province" required autocomplete="address-level1"><option value="">Ch\u1ECDn t\u1EC9nh, th\xE0nh</option>${provinces.map((name) => `<option>${t(name)}</option>`).join("")}</select></label><label class="field"><span>Ph\u01B0\u1EDDng / x\xE3</span><input type="text" name="ward" required maxlength="120" placeholder="T\xEAn m\u1EDBi ho\u1EB7c c\u0169 \u0111\u1EC1u \u0111\u01B0\u1EE3c" autocomplete="address-level3"></label></div>
<label class="field"><span>S\u1ED1 nh\xE0, t\xEAn \u0111\u01B0\u1EDDng</span><input type="text" name="street" required maxlength="240" autocomplete="street-address"></label>`;
  const methods = `<div class="pay">${canCod ? `<label><input type="radio" name="payment" value="cod"${canTransfer ? "" : " checked"}><span><strong>Tr\u1EA3 ti\u1EC1n khi nh\u1EADn h\xE0ng (COD)</strong><small>B\u1EA1n tr\u1EA3 cho ng\u01B0\u1EDDi giao h\xE0ng${context.settings.legal.returnPolicy ? ", \u0111\u01B0\u1EE3c xem h\xE0ng tr\u01B0\u1EDBc khi tr\u1EA3" : ""}.</small></span></label>` : ""}${canTransfer ? `<label><input type="radio" name="payment" value="transfer" checked><span><strong>${context.bank?.picture ? "Chuy\u1EC3n kho\u1EA3n" : "Chuy\u1EC3n kho\u1EA3n VietQR"}</strong><small>${context.bank?.picture ? "Qu\xE9t m\xE3 QR c\u1EE7a shop \u1EDF b\u01B0\u1EDBc sau." : `Qu\xE9t m\xE3 \u1EDF b\u01B0\u1EDBc sau, ${t(context.bank.bankName)}.`}</small></span></label>` : ""}</div>`;
  const body = `<main class="narrow page-narrow"><form id="order-form" class="card" novalidate><span class="eyebrow">${icon("truck", 14)} ${digital ? "\u0110\u1EB7t mua" : "Giao t\u1EADn n\u01A1i"}</span><h1>${t(title)}</h1>
<div class="line-item mt-6"><div><strong>${t(product.name)}</strong>${product.option ? `<small>${t(product.option)}</small>` : ""}<small>${money(product.price)} / s\u1EA3n ph\u1EA9m</small></div><div class="qty"><button type="button" data-step="-1" aria-label="B\u1EDBt">${icon("minus", 16)}</button><output name="qty">1</output><button type="button" data-step="1" aria-label="Th\xEAm">${icon("plus", 16)}</button></div></div>
<label class="field"><span>H\u1ECD v\xE0 t\xEAn ng\u01B0\u1EDDi nh\u1EADn</span><input type="text" name="name" required maxlength="120" autocomplete="name" value="${t(lead?.name ?? "")}"></label>
<label class="field"><span>S\u1ED1 \u0111i\u1EC7n tho\u1EA1i</span><input type="tel" name="phone" required inputmode="tel" autocomplete="tel" placeholder="VD: 0912 345 678" aria-describedby="order-form-hint" value="${t(lead?.phone ?? "")}"><span class="hint" id="order-form-hint">Shop g\u1ECDi s\u1ED1 n\xE0y \u0111\u1EC3 x\xE1c nh\u1EADn \u0111\u01A1n${digital ? " v\xE0 g\u1EEDi h\xE0ng qua Zalo" : " v\xE0 giao h\xE0ng"}.</span></label>
${address}<label class="field"><span>Ghi ch\xFA <small>(kh\xF4ng b\u1EAFt bu\u1ED9c)</small></span><textarea name="note" maxlength="500" placeholder="Gi\u1EDD nh\u1EADn h\xE0ng, m\xE0u, size\u2026"></textarea></label>
<h2 class="mt-6">Thanh to\xE1n</h2><div class="mt-4">${methods}</div>
<h2 class="mt-6">Ki\u1EC3m tra \u0111\u01A1n</h2><div class="summary mt-4"><div class="summary-row"><span data-line>${t(product.name)} \xD7 1</span><span data-subtotal>${money(product.price)}</span></div>${digital ? "" : `<div class="summary-row"><span>Ph\xED giao h\xE0ng</span><span data-shipping>${rule.known ? money(rule.fee) : "Shop b\xE1o khi g\u1ECDi"}</span></div>`}<div class="summary-total"><span>T\u1ED5ng c\u1ED9ng</span><span data-total>${money(product.price + (digital ? 0 : rule.fee))}</span></div></div>
<p class="hint mt-4">Th\xF4ng tin ch\u1EC9 d\xF9ng \u0111\u1EC3 giao \u0111\u01A1n n\xE0y. B\u1EA1n xem l\u1EA1i \u0111\u01B0\u1EE3c \u0111\u01A1n b\u1EA5t c\u1EE9 l\xFAc n\xE0o t\u1EEB link ri\xEAng \u1EDF b\u01B0\u1EDBc sau.</p>
<button class="button wide mt-6" type="submit" data-submit>\u0110\u1EB7t h\xE0ng${icon("arrow", 18)}</button><p class="reassure center" data-call aria-live="polite"></p><p class="error" role="alert"></p></form></main>`;
  const script = `(()=>{${formHelpers}const form=document.getElementById('order-form'),error=form.querySelector('.error'),button=form.querySelector('[data-submit]'),key=newKey(),price=${product.price},digital=${digital},fee=${rule.fee},freeFrom=${rule.freeFrom ?? "null"},known=${rule.known};let qty=1;
const fmt=n=>new Intl.NumberFormat('vi-VN').format(n)+'\u0111';
const update=()=>{const sub=price*qty,ship=digital?0:(freeFrom!==null&&sub>=freeFrom?0:fee);form.querySelector('output').textContent=qty;form.querySelector('[data-line]').textContent=${scriptJson(product.name)}+' \xD7 '+qty;form.querySelector('[data-subtotal]').textContent=fmt(sub);const s=form.querySelector('[data-shipping]');if(s)s.textContent=known?fmt(ship):'Shop b\xE1o khi g\u1ECDi';form.querySelector('[data-total]').textContent=fmt(sub+ship);
const p=normal(form.elements.phone.value),call=form.querySelector('[data-call]');call.textContent=phoneOk(p)?'Shop s\u1EBD g\u1ECDi '+p.slice(0,4)+' '+p.slice(4,7)+' '+p.slice(7)+' \u0111\u1EC3 x\xE1c nh\u1EADn \u0111\u01A1n.':''};
if(window.kgsTrack)kgsTrack('InitiateCheckout',{value:price,currency:'VND'});form.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{qty=Math.max(1,Math.min(20,qty+Number(b.dataset.step)));update()}));form.elements.phone.addEventListener('input',update);update();
form.addEventListener('submit',async e=>{e.preventDefault();error.textContent='';const d=new FormData(form);if(!String(d.get('name')||'').trim()){error.textContent='H\xE3y \u0111i\u1EC1n t\xEAn ng\u01B0\u1EDDi nh\u1EADn.';return}if(!phoneOk(d.get('phone'))){error.textContent='S\u1ED1 \u0111i\u1EC7n tho\u1EA1i c\u1EA7n 10 s\u1ED1, b\u1EAFt \u0111\u1EA7u b\u1EB1ng 0.';return}
if(!digital&&(!d.get('province')||!String(d.get('ward')||'').trim()||!String(d.get('street')||'').trim())){error.textContent='H\xE3y \u0111i\u1EC1n \u0111\u1EE7 \u0111\u1ECBa ch\u1EC9 giao h\xE0ng.';return}if(!d.get('payment')){error.textContent='H\xE3y ch\u1ECDn c\xE1ch thanh to\xE1n.';return}
busy(button,true,'\u0110ang \u0111\u1EB7t\u2026');try{const src=window.kgsSource?kgsSource():{utm:{},referrer:document.referrer};const r=await post(${scriptJson(`/api/public/funnels/${encodeURIComponent(context.funnel.slug)}/orders`)},{productId:${scriptJson(product.productId)},quantity:qty,name:d.get('name'),phone:d.get('phone'),province:d.get('province')||'',ward:d.get('ward')||'',street:d.get('street')||'',note:d.get('note')||'',payment:d.get('payment'),leadId:${scriptJson(lead?.id ?? "")},idempotencyKey:key,source:src.referrer,utm:src.utm});location.href=r.nextUrl+(${context.preview ? "true" : "false"}?(r.nextUrl.includes('?')?'&':'?')+'preview=1':'')}catch(c){error.textContent=c.message;busy(button,false)}})})()`;
  return shell({ type: "order-form", title, description: `\u0110\u1EB7t ${product.name}`, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, zalo: true, body, script });
}
function renderUpsell(context, page3) {
  const order = context.order;
  const brief = context.funnel.brief;
  const upsell = brief.kind === "sales" ? brief.upsell ?? null : null;
  const done = order ? `${context.base}/don/${encodeURIComponent(order.id)}` : context.base;
  if (!order || !upsell || order.upsell !== "offered") {
    return shell({ type: "upsell", title: "\u0110\u01A1n c\u1EE7a b\u1EA1n", description: "", theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, body: `<main class="narrow page-narrow"><div class="card center"><h1>\u0110\u01A1n c\u1EE7a b\u1EA1n \u0111\xE3 ghi nh\u1EADn</h1><div class="actions"><a class="button wide" href="${t(done)}">Xem \u0111\u01A1n h\xE0ng${icon("arrow", 18)}</a></div></div></main>` });
  }
  const body = `<main class="narrow page-narrow upsell"><div class="status-line ok">${icon("circleCheck", 16)}\u0110\xE3 nh\u1EADn \u0111\u01A1n ${t(order.code)}. C\xF2n m\u1ED9t b\u01B0\u1EDBc nh\u1ECF:</div>
<div class="card mt-6"><h1>${t(firstName(order.name) ? `${firstName(order.name)} \u01A1i, ${page3.headline.charAt(0).toLowerCase()}${page3.headline.slice(1)}` : page3.headline)}</h1><p class="lead">${t(page3.why)}</p>
<div class="product"><span class="pill">${icon("plus", 12)} Th\xEAm v\xE0o \u0111\u01A1n ${t(order.code)}</span><strong class="product-name">${t(upsell.name)}</strong><span class="price">${money(upsell.price)}</span><ul>${page3.benefits.map((item) => `<li>${icon("check", 16)}<span>${t(item)}</span></li>`).join("")}</ul></div>
<p class="muted mt-4">Giao c\xF9ng \u0111\u01A1n, kh\xF4ng th\xEAm ph\xED giao. T\u1ED5ng m\u1EDBi: <strong>${money(order.total + upsell.price)}</strong>.</p>
<div class="actions"><button type="button" class="button wide" data-answer="yes">${t(page3.acceptCta)}${icon("plus", 18)}</button><button type="button" class="text-link" data-answer="no">${t(page3.declineLabel)}</button></div><p class="error" role="alert"></p></div></main>`;
  const script = `(()=>{${formHelpers}const error=document.querySelector('.error');document.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',async()=>{busy(b,true,'\u0110ang c\u1EADp nh\u1EADt\u2026');try{const r=await post(${scriptJson(`/api/public/orders/${encodeURIComponent(order.id)}/upsell`)},{accept:b.dataset.answer==='yes'});location.href=r.nextUrl+(${context.preview ? "true" : "false"}?'?preview=1':'')}catch(c){error.textContent=c.message;busy(b,false)}}))})()`;
  return shell({ type: "upsell", title: page3.headline, description: page3.why, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, body, script });
}
function renderOrderConfirmation(context) {
  const order = context.order;
  if (!order) {
    return shell({ type: "order-confirmation", title: "Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n", description: "", theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, body: `<main class="narrow page-narrow"><div class="card center"><h1>Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n n\xE0y</h1><p class="lead">Link \u0111\u01A1n c\xF3 th\u1EC3 \u0111\xE3 sai. B\u1EA1n nh\u1EAFn shop k\xE8m s\u1ED1 \u0111i\u1EC7n tho\u1EA1i \u0111\u1EC3 \u0111\u01B0\u1EE3c ki\u1EC3m tra nh\xE9.</p></div></main>`, zalo: true });
  }
  const bank = context.bank;
  const transfer = order.payment === "transfer" && bank;
  const qrUrl = `${context.base}/don/${encodeURIComponent(order.id)}/qr.png`;
  const row = (label, value, copy = value) => `<div><div><dt>${t(label)}</dt><dd>${t(value)}</dd></div><button type="button" data-copy="${t(copy)}">${icon("copy", 14)}Ch\xE9p</button></div>`;
  const status = order.status === "paid" ? `<div class="status-line ok">${icon("circleCheck", 16)}Shop \u0111\xE3 nh\u1EADn ti\u1EC1n. \u0110\u01A1n \u0111ang \u0111\u01B0\u1EE3c chu\u1EA9n b\u1ECB.</div>` : order.status === "cancelled" ? `<div class="status-line">${icon("x", 16)}\u0110\u01A1n \u0111\xE3 hu\u1EF7.</div>` : transfer ? `<div class="status-line">${icon("clock", 16)}\u0110\u01A1n \u0111ang ch\u1EDD b\u1EA1n chuy\u1EC3n kho\u1EA3n. Shop gi\u1EEF \u0111\u01A1n trong 24 gi\u1EDD.</div>` : `<div class="status-line ok">${icon("phone", 16)}Shop s\u1EBD g\u1ECDi ${t(order.phone.slice(0, 4))} \u2022\u2022\u2022 ${t(order.phone.slice(-3))} \u0111\u1EC3 x\xE1c nh\u1EADn \u0111\u01A1n${context.settings.brand.workingHours ? ` (${t(context.settings.brand.workingHours)})` : ""}.</div>`;
  const pay = transfer && order.status === "open" ? `<h2 class="mt-6">Chuy\u1EC3n kho\u1EA3n</h2><div class="qr-card mt-4"><img src="${t(qrUrl)}" alt="${bank.picture ? "M\xE3 QR nh\u1EADn ti\u1EC1n c\u1EE7a shop" : `M\xE3 VietQR chuy\u1EC3n ${money(order.total)} cho ${t(bank.accountName)}`}" width="260" height="260"><a class="button small" href="${t(qrUrl)}" download="qr-${t(order.code)}">${icon("download", 16)}L\u01B0u \u1EA3nh m\xE3 QR</a><p class="hint center">${bank.picture ? "M\u1EDF app ng\xE2n h\xE0ng \u2192 Qu\xE9t QR \u2192 ch\u1ECDn \u1EA3nh v\u1EEBa l\u01B0u, r\u1ED3i nh\u1EADp \u0111\xFAng s\u1ED1 ti\u1EC1n v\xE0 n\u1ED9i dung b\xEAn d\u01B0\u1EDBi." : "M\u1EDF app ng\xE2n h\xE0ng \u2192 Qu\xE9t QR \u2192 ch\u1ECDn \u1EA3nh v\u1EEBa l\u01B0u. Ho\u1EB7c ch\xE9p t\u1EEBng d\xF2ng b\xEAn d\u01B0\u1EDBi."}</p>
<dl class="transfer">${bank.picture ? "" : `${row("Ng\xE2n h\xE0ng", bank.bankName)}${row("S\u1ED1 t\xE0i kho\u1EA3n", bank.accountNumber)}${row("Ch\u1EE7 t\xE0i kho\u1EA3n", bank.accountName)}`}${row("S\u1ED1 ti\u1EC1n", money(order.total), String(order.total))}${row("N\u1ED9i dung", order.code)}</dl></div>` : order.payment === "cod" && order.status === "open" ? `<p class="lead mt-6">B\u1EA1n tr\u1EA3 <strong>${money(order.total)}</strong> khi nh\u1EADn h\xE0ng.</p>` : "";
  const body = `<main class="narrow page-narrow"><div class="card"><div class="ok-badge">${icon("circleCheck", 30)}</div><h1>C\u1EA3m \u01A1n ${t(firstName(order.name))}, \u0111\u01A1n ${t(order.code)} \u0111\xE3 \u0111\u01B0\u1EE3c ghi nh\u1EADn</h1><div class="mt-4">${status}</div>${pay}
<h2 class="mt-6">\u0110\u01A1n c\u1EE7a b\u1EA1n</h2><div class="summary mt-4">${order.items.map((item) => `<div class="summary-row"><span>${t(item.name)}${item.option ? ` (${t(item.option)})` : ""} \xD7 ${item.quantity}</span><span>${money(item.price * item.quantity)}</span></div>`).join("")}${order.shipping ? `<div class="summary-row"><span>Ph\xED giao h\xE0ng</span><span>${money(order.shipping)}</span></div>` : ""}<div class="summary-total"><span>T\u1ED5ng c\u1ED9ng</span><span>${money(order.total)}</span></div></div>
${order.province ? `<div class="facts">${`<div>${icon("truck", 16)}<span><strong>Giao \u0111\u1EBFn:</strong> ${t([order.street, order.ward, order.province].filter(Boolean).join(", "))}</span></div>`}</div>` : ""}
<p class="hint mt-4">L\u01B0u l\u1EA1i link trang n\xE0y \u0111\u1EC3 xem \u0111\u01A1n b\u1EA5t c\u1EE9 l\xFAc n\xE0o.</p>
<div class="actions">${context.brand.zaloUrl ? `<a class="button ghost wide" href="${t(context.brand.zaloUrl)}" target="_blank" rel="noopener">${icon("chat", 18)}H\u1ECFi shop qua Zalo</a>` : ""}${context.lead || order ? "" : ""}</div></div></main>`;
  const purchase = order.status !== "cancelled" && !context.preview ? `(()=>{const k='kgs-purchase-'+${scriptJson(order.id)};try{if(localStorage.getItem(k))return;localStorage.setItem(k,'1')}catch{}if(window.kgsTrack)kgsTrack('Purchase',{value:${order.total},currency:'VND'})})()` : "";
  return shell({ type: "order-confirmation", title: `\u0110\u01A1n ${order.code}`, description: `\u0110\u01A1n ${order.code}`, theme: context.funnel.theme, brand: context.brand, settings: context.settings, slug: context.funnel.slug, preview: context.preview, index: false, zalo: true, body, script: `${copyScript};${purchase}` });
}

// src/mini-apps/funnel-studio/server/pages/render.ts
var fallback = {
  "thank-you": () => ({ headline: "C\u1EA3m \u01A1n b\u1EA1n!", body: "Shop \u0111\xE3 nh\u1EADn th\xF4ng tin c\u1EE7a b\u1EA1n.", contactPromise: "Shop s\u1EBD li\xEAn h\u1EC7 v\u1EDBi b\u1EA1n s\u1EDBm qua \u0111i\u1EC7n tho\u1EA1i ho\u1EB7c Zalo.", nextTitle: "B\u01B0\u1EDBc ti\u1EBFp theo", nextBody: "Nh\u1EAFn Zalo cho shop \u0111\u1EC3 \u0111\u01B0\u1EE3c tr\u1EA3 l\u1EDDi nhanh nh\u1EA5t.", cta: "Xem ti\u1EBFp" }),
  "gift-delivery": (title) => ({ headline: "Qu\xE0 c\u1EE7a b\u1EA1n \u0111\xE2y", introduction: `${title} \u0111\xE3 s\u1EB5n s\xE0ng. B\u1EA1n m\u1EDF ngay b\xEAn d\u01B0\u1EDBi.`, firstAction: "M\u1EDF qu\xE0 v\xE0 \u0111\u1ECDc ph\u1EA7n \u0111\u1EA7u ti\xEAn ngay h\xF4m nay.", keyPointsTitle: "Trong qu\xE0 c\xF3 g\xEC", keyPoints: ["M\u1EDF qu\xE0 ngay tr\xEAn trang n\xE0y.", "L\u01B0u l\u1EA1i \u0111\u1EC3 xem b\u1EA5t c\u1EE9 l\xFAc n\xE0o.", "C\xF3 c\xE2u h\u1ECFi, nh\u1EAFn Zalo cho shop."], nextTitle: "C\u1EA7n th\xEAm gi\xFAp \u0111\u1EE1?", nextBody: "Nh\u1EAFn Zalo cho shop n\u1EBFu b\u1EA1n mu\u1ED1n h\u1ECFi th\xEAm.", cta: "Xem ti\u1EBFp" }),
  confirmation: () => ({ headline: "\u0110\xE3 gi\u1EEF ch\u1ED7 cho b\u1EA1n", body: "Shop \u0111\xE3 nh\u1EADn \u0111\u0103ng k\xFD c\u1EE7a b\u1EA1n.", prepareTitle: "Chu\u1EA9n b\u1ECB", prepare: ["L\u01B0u l\u1ECBch v\xE0o \u0111i\u1EC7n tho\u1EA1i \u0111\u1EC3 kh\xF4ng qu\xEAn."], reminderTitle: "Nh\u1EADn nh\u1EAFc l\u1ECBch", reminderBody: "Shop nh\u1EAFc b\u1EA1n tr\u01B0\u1EDBc gi\u1EDD b\u1EAFt \u0111\u1EA7u qua Zalo.", rescheduleNote: "C\u1EA7n \u0111\u1ED5i l\u1ECBch, b\u1EA1n nh\u1EAFn Zalo ho\u1EB7c g\u1ECDi cho shop." }),
  upsell: () => ({ headline: "Th\xEAm m\xF3n n\xE0y v\xE0o \u0111\u01A1n?", why: "D\xF9ng c\xF9ng m\xF3n b\u1EA1n v\u1EEBa \u0111\u1EB7t.", benefits: ["Giao c\xF9ng \u0111\u01A1n, kh\xF4ng th\xEAm ph\xED giao."], acceptCta: "Th\xEAm v\xE0o \u0111\u01A1n", declineLabel: "Kh\xF4ng, c\u1EA3m \u01A1n" }),
  "event-room": () => ({ beforeHeadline: "Bu\u1ED5i s\u1EAFp b\u1EAFt \u0111\u1EA7u", beforeBody: "Quay l\u1EA1i trang n\xE0y \u0111\xFAng gi\u1EDD \u0111\u1EC3 v\xE0o ph\xF2ng.", liveHeadline: "Bu\u1ED5i \u0111ang di\u1EC5n ra", liveBody: "B\u1EA5m \u0111\u1EC3 v\xE0o ph\xF2ng ngay.", offerTitle: "\u01AFu \u0111\xE3i c\u1EE7a bu\u1ED5i", offerBody: "\u01AFu \u0111\xE3i d\xE0nh cho ng\u01B0\u1EDDi tham gia bu\u1ED5i n\xE0y.", offerPoints: ["D\xE0nh ri\xEAng cho ng\u01B0\u1EDDi tham gia.", "\u0110\u1EB7t ngay tr\xEAn trang.", "Shop g\u1ECDi x\xE1c nh\u1EADn \u0111\u01A1n."], offerCta: "\u0110\u1EB7t ngay", replayHeadline: "Xem l\u1EA1i bu\u1ED5i", replayBody: "B\u1EA3n xem l\u1EA1i m\u1EDF trong th\u1EDDi gian c\xF3 h\u1EA1n.", expiredHeadline: "Bu\u1ED5i \u0111\xE3 k\u1EBFt th\xFAc", expiredBody: "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 quan t\xE2m. Nh\u1EAFn Zalo \u0111\u1EC3 bi\u1EBFt bu\u1ED5i ti\u1EBFp theo." })
};
var isOptInShape = (content) => Boolean(content && typeof content === "object" && "formTitle" in content);
function renderStep(context, quiz = null) {
  const { step, funnel } = context;
  const content = step.content;
  const wait = () => waitingPage({
    type: step.type,
    theme: funnel.theme,
    brand: context.brand,
    settings: context.settings,
    slug: funnel.slug,
    preview: context.preview,
    title: funnel.generation.status === "running" ? "Codex \u0111ang vi\u1EBFt trang\u2026" : `${pageLabels[step.type]} ch\u01B0a vi\u1EBFt xong`,
    message: funnel.generation.status === "running" ? "Trang s\u1EBD t\u1EF1 hi\u1EC7n khi xong, th\u01B0\u1EDDng trong v\xE0i ph\xFAt." : "H\xE3y m\u1EDF Funnel Studio v\xE0 b\u1EA5m Vi\u1EBFt l\u1EA1i trang n\xE0y.",
    refresh: funnel.generation.status === "running"
  });
  switch (step.type) {
    case "lead-magnet":
    case "event-registration":
    case "booking":
      return content ? renderOptIn(context, content) : wait();
    // A 2.x sales page kept the opt-in shape (a form to close by phone or a checkout link): it keeps that layout.
    case "sales":
      return content ? isOptInShape(content) ? renderOptIn(context, content) : renderSales(context, content) : wait();
    case "bridge":
      return content ? renderBridge(context, content) : wait();
    case "quiz":
      return content ? renderQuiz(context, content) : wait();
    case "quiz-result":
      return content ? renderQuizResult(context, content, quiz) : wait();
    case "thank-you":
      return renderThankYou(context, content ?? fallback["thank-you"]());
    case "gift-delivery":
      return renderGift(context, content ?? fallback["gift-delivery"](funnel.brief.kind === "lead" ? funnel.brief.giftTitle : "Qu\xE0"));
    case "confirmation":
      return renderConfirmation(context, content ?? fallback.confirmation());
    case "event-room":
      return renderEventRoom(context, content ?? fallback["event-room"]());
    case "order-form":
      return renderOrderForm(context);
    case "upsell":
      return renderUpsell(context, content ?? fallback.upsell());
    case "order-confirmation":
      return renderOrderConfirmation(context);
  }
}

// src/mini-apps/funnel-studio/server/settings.ts
var defaultSettings = () => ({
  brand: { defaultTheme: "modern", hotline: "", address: "", taxId: "", workingHours: "", email: "" },
  publishing: { customDomain: "", siteTitle: "", shareImageUrl: "", faviconUrl: "" },
  tracking: { facebookPixelId: "", tiktokPixelId: "", googleAnalyticsId: "", googleTagManagerId: "", keepUtm: true },
  form: { consentText: "T\xF4i \u0111\u1ED3ng \xFD \u0111\u1EC3 ch\u1EE7 trang li\xEAn h\u1EC7 qua \u0111i\u1EC7n tho\u1EA1i, Zalo ho\u1EB7c email v\u1EC1 n\u1ED9i dung c\u1EE7a trang n\xE0y.", blockRepeatHours: 24, mergeSamePhone: true, sendToCrm: false, googleSheetsUrl: "", webhookUrl: "" },
  notifications: { studioBell: true, email: "", zalo: false, dailySummary: false },
  payment: { bankName: "", accountNumber: "", accountName: "", transferNote: "", cod: true, shippingFee: "", handedOverAt: "" },
  legal: { privacyPolicy: "", terms: "", returnPolicy: "" }
});
var text3 = (value, field2, max) => {
  const result = String(value ?? "").trim();
  if (result.length > max) throw new Error(`${field2} d\xE0i qu\xE1 ${max} k\xFD t\u1EF1.`);
  return result;
};
var flag = (value, fallback2) => typeof value === "boolean" ? value : fallback2;
var url = (value, field2) => {
  const result = text3(value, field2, 2e3);
  if (!result) return "";
  let parsed;
  try {
    parsed = new URL(result);
  } catch {
    throw new Error(`${field2} ph\u1EA3i l\xE0 m\u1ED9t \u0111\u01B0\u1EDDng d\u1EABn \u0111\u1EA7y \u0111\u1EE7, b\u1EAFt \u0111\u1EA7u b\u1EB1ng https://`);
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) throw new Error(`${field2} ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng https://`);
  return parsed.toString();
};
var pattern = (value, field2, test, example) => {
  const result = text3(value, field2, 60);
  if (result && !test.test(result)) throw new Error(`${field2} ch\u01B0a \u0111\xFAng d\u1EA1ng, v\xED d\u1EE5 ${example}.`);
  return result;
};
function validateSettings(raw, current) {
  const input = raw ?? {};
  const b = { ...current.brand, ...input.brand }, p = { ...current.publishing, ...input.publishing }, t2 = { ...current.tracking, ...input.tracking };
  const f = { ...current.form, ...input.form }, n = { ...current.notifications, ...input.notifications }, pay = { ...current.payment, ...input.payment }, l = { ...current.legal, ...input.legal };
  const theme = b.defaultTheme;
  if (!funnelThemes.includes(theme)) throw new Error("Giao di\u1EC7n m\u1EB7c \u0111\u1ECBnh kh\xF4ng h\u1EE3p l\u1EC7.");
  const domain = text3(p.customDomain, "T\xEAn mi\u1EC1n", 253).toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (domain && !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/.test(domain)) throw new Error("T\xEAn mi\u1EC1n ch\u01B0a \u0111\xFAng d\u1EA1ng, v\xED d\u1EE5 trang.tenban.vn.");
  const hours = Number(f.blockRepeatHours);
  if (!Number.isInteger(hours) || hours < 0 || hours > 720) throw new Error("S\u1ED1 gi\u1EDD ch\u1EB7n g\u1EEDi tr\xF9ng ph\u1EA3i t\u1EEB 0 \u0111\u1EBFn 720.");
  const email = text3(n.email, "Email nh\u1EADn th\xF4ng b\xE1o", 254).toLowerCase();
  const shopEmail = text3(b.email, "Email c\u1EE7a shop", 254).toLowerCase();
  if (shopEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shopEmail)) throw new Error("Email c\u1EE7a shop ch\u01B0a \u0111\xFAng.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email nh\u1EADn th\xF4ng b\xE1o ch\u01B0a \u0111\xFAng.");
  const account = text3(pay.accountNumber, "S\u1ED1 t\xE0i kho\u1EA3n", 40).replace(/\s+/g, "");
  if (account && !/^\d{6,20}$/.test(account)) throw new Error("S\u1ED1 t\xE0i kho\u1EA3n ch\u1EC9 g\u1ED3m 6\u201320 ch\u1EEF s\u1ED1.");
  return {
    brand: { defaultTheme: theme, hotline: text3(b.hotline, "Hotline", 40), address: text3(b.address, "\u0110\u1ECBa ch\u1EC9", 300), taxId: text3(b.taxId, "M\xE3 s\u1ED1 thu\u1EBF", 20), workingHours: text3(b.workingHours, "Gi\u1EDD l\xE0m vi\u1EC7c", 120), email: shopEmail },
    publishing: { customDomain: domain, siteTitle: text3(p.siteTitle, "T\xEAn hi\u1EC3n th\u1ECB", 120), shareImageUrl: url(p.shareImageUrl, "\u1EA2nh chia s\u1EBB"), faviconUrl: url(p.faviconUrl, "Bi\u1EC3u t\u01B0\u1EE3ng trang") },
    tracking: {
      facebookPixelId: pattern(t2.facebookPixelId, "Facebook Pixel ID", /^\d{10,20}$/, "1234567890123456"),
      tiktokPixelId: pattern(t2.tiktokPixelId, "TikTok Pixel ID", /^[A-Z0-9]{10,30}$/, "C4ABCDEF1234567890"),
      googleAnalyticsId: pattern(t2.googleAnalyticsId, "Google Analytics ID", /^G-[A-Z0-9]{4,20}$/, "G-ABC123XYZ"),
      googleTagManagerId: pattern(t2.googleTagManagerId, "Google Tag Manager ID", /^GTM-[A-Z0-9]{4,12}$/, "GTM-ABCD123"),
      keepUtm: flag(t2.keepUtm, true)
    },
    form: { consentText: text3(f.consentText, "C\xE2u \u0111\u1ED3ng \xFD", 500) || defaultSettings().form.consentText, blockRepeatHours: hours, mergeSamePhone: flag(f.mergeSamePhone, true), sendToCrm: flag(f.sendToCrm, false), googleSheetsUrl: url(f.googleSheetsUrl, "Google Sheets"), webhookUrl: url(f.webhookUrl, "Webhook") },
    notifications: { studioBell: flag(n.studioBell, true), email, zalo: flag(n.zalo, false), dailySummary: flag(n.dailySummary, false) },
    payment: { bankName: text3(pay.bankName, "Ng\xE2n h\xE0ng", 80), accountNumber: account, accountName: text3(pay.accountName, "Ch\u1EE7 t\xE0i kho\u1EA3n", 80).toUpperCase(), transferNote: text3(pay.transferNote, "N\u1ED9i dung chuy\u1EC3n kho\u1EA3n", 60), cod: flag(pay.cod, true), shippingFee: text3(pay.shippingFee, "Ph\xED giao h\xE0ng", 80), handedOverAt: current.payment.handedOverAt ?? "" },
    legal: { privacyPolicy: text3(l.privacyPolicy, "Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt", 2e4), terms: text3(l.terms, "\u0110i\u1EC1u kho\u1EA3n", 2e4), returnPolicy: text3(l.returnPolicy, "Ch\xEDnh s\xE1ch \u0111\u1ED5i tr\u1EA3", 2e4) }
  };
}
var FunnelSettingsStore = class {
  constructor(db) {
    this.db = db;
  }
  db;
  get() {
    const row = this.db.prepare("SELECT settings_json, revision, updated_at FROM funnel_studio_settings WHERE id = 'default'").get();
    if (!row) return { settings: defaultSettings(), revision: 0, updatedAt: null };
    const saved = JSON.parse(row.settings_json);
    const base = defaultSettings();
    const settings2 = Object.fromEntries(Object.entries(base).map(([key, value]) => [key, { ...value, ...saved[key] ?? {} }]));
    return { settings: settings2, revision: row.revision, updatedAt: row.updated_at };
  }
  /** The old Thanh toán reached Mini CRM (2.7.0): stamped without a new revision, so an open Cài đặt still saves. */
  markPaymentHandedOver(at = (/* @__PURE__ */ new Date()).toISOString()) {
    const { settings: settings2, revision, updatedAt } = this.get();
    const next = { ...settings2, payment: { ...settings2.payment, handedOverAt: at } };
    this.db.prepare(
      "INSERT INTO funnel_studio_settings (id, settings_json, revision, updated_at) VALUES ('default', ?, ?, ?) ON CONFLICT(id) DO UPDATE SET settings_json = excluded.settings_json"
    ).run(JSON.stringify(next), Math.max(revision, 0), updatedAt ?? at);
  }
  save(raw, revision) {
    const current = this.get();
    if (current.revision !== revision) throw new Error("C\xE0i \u0111\u1EB7t v\u1EEBa \u0111\u01B0\u1EE3c thay \u0111\u1ED5i \u1EDF n\u01A1i kh\xE1c. H\xE3y t\u1EA3i l\u1EA1i r\u1ED3i th\u1EED l\u1EA1i.");
    const settings2 = validateSettings(raw, current.settings);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(
      "INSERT INTO funnel_studio_settings (id, settings_json, revision, updated_at) VALUES ('default', ?, 1, ?) ON CONFLICT(id) DO UPDATE SET settings_json = excluded.settings_json, revision = revision + 1, updated_at = excluded.updated_at"
    ).run(JSON.stringify(settings2), now);
    return this.get();
  }
};

// src/mini-apps/sdk/viet-banks.ts
var VIET_BANKS = [
  { bin: "970436", code: "VCB", name: "Vietcombank" },
  { bin: "970415", code: "ICB", name: "VietinBank" },
  { bin: "970418", code: "BIDV", name: "BIDV" },
  { bin: "970405", code: "VBA", name: "Agribank" },
  { bin: "970407", code: "TCB", name: "Techcombank" },
  { bin: "970422", code: "MB", name: "MB Bank" },
  { bin: "970416", code: "ACB", name: "ACB" },
  { bin: "970432", code: "VPB", name: "VPBank" },
  { bin: "970423", code: "TPB", name: "TPBank" },
  { bin: "970403", code: "STB", name: "Sacombank" },
  { bin: "970437", code: "HDB", name: "HDBank" },
  { bin: "970441", code: "VIB", name: "VIB" },
  { bin: "970443", code: "SHB", name: "SHB" },
  { bin: "970426", code: "MSB", name: "MSB" },
  { bin: "970448", code: "OCB", name: "OCB" },
  { bin: "970440", code: "SEAB", name: "SeABank" },
  { bin: "970431", code: "EIB", name: "Eximbank" },
  { bin: "970449", code: "LPB", name: "LPBank" },
  { bin: "970454", code: "VCCB", name: "B\u1EA3n Vi\u1EC7t (BVBank)" },
  { bin: "970428", code: "NAB", name: "Nam A Bank" },
  { bin: "970409", code: "BAB", name: "Bac A Bank" },
  { bin: "970412", code: "PVCB", name: "PVcomBank" },
  { bin: "970425", code: "ABB", name: "ABBANK" },
  { bin: "970452", code: "KLB", name: "KienlongBank" }
];

// src/mini-apps/funnel-studio/server/vietqr.ts
function bankBin(name) {
  const wanted = name.trim().toLowerCase();
  if (!wanted) return null;
  return VIET_BANKS.find((bank) => bank.name.toLowerCase() === wanted || bank.code.toLowerCase() === wanted)?.bin ?? null;
}
var field = (id, value) => `${id}${String(value.length).padStart(2, "0")}${value}`;
function crc16(text5) {
  let crc = 65535;
  for (const byte of Buffer.from(text5, "utf8")) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i += 1) crc = crc & 32768 ? (crc << 1 ^ 4129) & 65535 : crc << 1 & 65535;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
function transferNote(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/[^A-Za-z0-9 ]/g, " ").replace(/\s+/g, " ").trim().slice(0, 25);
}
function vietQrPayload(input) {
  if (!/^\d{6}$/.test(input.bin)) throw new Error("M\xE3 ng\xE2n h\xE0ng kh\xF4ng h\u1EE3p l\u1EC7.");
  if (!/^[0-9A-Za-z]{4,19}$/.test(input.accountNumber)) throw new Error("S\u1ED1 t\xE0i kho\u1EA3n kh\xF4ng h\u1EE3p l\u1EC7.");
  const account = field("00", "A000000727") + field("01", field("00", input.bin) + field("01", input.accountNumber)) + field("02", "QRIBFTTA");
  const amount = input.amount && input.amount > 0 ? field("54", String(Math.round(input.amount))) : "";
  const note = transferNote(input.note);
  const body = field("00", "01") + field("01", amount ? "12" : "11") + field("38", account) + field("53", "704") + amount + field("58", "VN") + (note ? field("62", field("08", note)) : "") + "6304";
  return body + crc16(body);
}

// src/mini-apps/funnel-studio/server/qr.ts
import { deflateSync } from "node:zlib";
var ECC_PER_BLOCK = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28];
var BLOCKS = [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49];
var MASK = 2;
var bit = (value, index) => (value >>> index & 1) !== 0;
function rawModules(version) {
  let result = (16 * version + 128) * version + 64;
  if (version >= 2) {
    const align = Math.floor(version / 7) + 2;
    result -= (25 * align - 10) * align - 55;
    if (version >= 7) result -= 36;
  }
  return result;
}
var dataCodewords = (version) => Math.floor(rawModules(version) / 8) - ECC_PER_BLOCK[version] * BLOCKS[version];
function multiply(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i -= 1) {
    z = z << 1 ^ (z >>> 7) * 285;
    z ^= (y >>> i & 1) * x;
  }
  return z;
}
function divisor(degree) {
  const result = new Array(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i += 1) {
    for (let j = 0; j < result.length; j += 1) {
      result[j] = multiply(result[j], root);
      if (j + 1 < result.length) result[j] ^= result[j + 1];
    }
    root = multiply(root, 2);
  }
  return result;
}
function remainder(data, div) {
  const result = div.map(() => 0);
  for (const byte of data) {
    const factor = byte ^ result.shift();
    result.push(0);
    div.forEach((coefficient, index) => {
      result[index] ^= multiply(coefficient, factor);
    });
  }
  return result;
}
function alignmentPositions(version, size) {
  if (version === 1) return [];
  const count = Math.floor(version / 7) + 2;
  const step = version === 32 ? 26 : Math.ceil((version * 4 + 4) / (count * 2 - 2)) * 2;
  const result = [6];
  for (let position = size - 7; result.length < count; position -= step) result.splice(1, 0, position);
  return result;
}
function qrModules(text5) {
  const bytes = [...Buffer.from(text5, "utf8")];
  let version = 1;
  for (; version <= 40; version += 1) {
    const countBits = version < 10 ? 8 : 16;
    if (4 + countBits + bytes.length * 8 <= dataCodewords(version) * 8) break;
  }
  if (version > 40) throw new Error("N\u1ED9i dung qu\xE1 d\xE0i cho m\u1ED9t m\xE3 QR.");
  const capacity = dataCodewords(version) * 8;
  const bits = [];
  const append = (value, length) => {
    for (let i = length - 1; i >= 0; i -= 1) bits.push(value >>> i & 1);
  };
  append(4, 4);
  append(bytes.length, version < 10 ? 8 : 16);
  for (const byte of bytes) append(byte, 8);
  append(0, Math.min(4, capacity - bits.length));
  append(0, (8 - bits.length % 8) % 8);
  for (let pad = 236; bits.length < capacity; pad ^= 236 ^ 17) append(pad, 8);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((byte, value) => byte << 1 | value, 0));
  const blocks = BLOCKS[version];
  const eccLength = ECC_PER_BLOCK[version];
  const raw = Math.floor(rawModules(version) / 8);
  const shortBlocks = blocks - raw % blocks;
  const shortLength = Math.floor(raw / blocks);
  const div = divisor(eccLength);
  const parts = [];
  for (let i = 0, k = 0; i < blocks; i += 1) {
    const chunk2 = data.slice(k, k + shortLength - eccLength + (i < shortBlocks ? 0 : 1));
    k += chunk2.length;
    const ecc = remainder(chunk2, div);
    if (i < shortBlocks) chunk2.push(0);
    parts.push(chunk2.concat(ecc));
  }
  const codewords = [];
  for (let i = 0; i < parts[0].length; i += 1)
    parts.forEach((part, j) => {
      if (i !== shortLength - eccLength || j >= shortBlocks) codewords.push(part[i]);
    });
  const size = version * 4 + 17;
  const modules = Array.from({ length: size }, () => new Array(size).fill(false));
  const fixed = Array.from({ length: size }, () => new Array(size).fill(false));
  const set = (x, y, dark) => {
    modules[y][x] = dark;
    fixed[y][x] = true;
  };
  for (let i = 0; i < size; i += 1) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
    for (let dy = -4; dy <= 4; dy += 1) for (let dx = -4; dx <= 4; dx += 1) {
      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      const x = cx + dx, y = cy + dy;
      if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, distance !== 2 && distance !== 4);
    }
  }
  const align = alignmentPositions(version, size);
  align.forEach((ax, i) => align.forEach((ay, j) => {
    if (i === 0 && j === 0 || i === 0 && j === align.length - 1 || i === align.length - 1 && j === 0) return;
    for (let dy = -2; dy <= 2; dy += 1) for (let dx = -2; dx <= 2; dx += 1) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  const format = 0 << 3 | MASK;
  let rem = format;
  for (let i = 0; i < 10; i += 1) rem = rem << 1 ^ (rem >>> 9) * 1335;
  const formatBits = (format << 10 | rem) ^ 21522;
  for (let i = 0; i <= 5; i += 1) set(8, i, bit(formatBits, i));
  set(8, 7, bit(formatBits, 6));
  set(8, 8, bit(formatBits, 7));
  set(7, 8, bit(formatBits, 8));
  for (let i = 9; i < 15; i += 1) set(14 - i, 8, bit(formatBits, i));
  for (let i = 0; i < 8; i += 1) set(size - 1 - i, 8, bit(formatBits, i));
  for (let i = 8; i < 15; i += 1) set(8, size - 15 + i, bit(formatBits, i));
  set(8, size - 8, true);
  if (version >= 7) {
    let r = version;
    for (let i = 0; i < 12; i += 1) r = r << 1 ^ (r >>> 11) * 7973;
    const versionBits = version << 12 | r;
    for (let i = 0; i < 18; i += 1) {
      const a = size - 11 + i % 3, b = Math.floor(i / 3);
      set(a, b, bit(versionBits, i));
      set(b, a, bit(versionBits, i));
    }
  }
  let index = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vertical = 0; vertical < size; vertical += 1) {
      for (let j = 0; j < 2; j += 1) {
        const x = right - j;
        const upward = (right + 1 & 2) === 0;
        const y = upward ? size - 1 - vertical : vertical;
        if (!fixed[y][x] && index < codewords.length * 8) {
          modules[y][x] = bit(codewords[index >>> 3], 7 - (index & 7));
          index += 1;
        }
      }
    }
  }
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) if (!fixed[y][x] && x % 3 === 0) modules[y][x] = !modules[y][x];
  return modules;
}
var crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
  return c >>> 0;
});
var crc32 = (bytes) => {
  let c = 4294967295;
  for (const byte of bytes) c = crcTable[(c ^ byte) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
};
var chunk = (type, data) => {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
};
function qrPng(text5, scale = 8) {
  const modules = qrModules(text5);
  const count = modules.length + 8;
  const size = count * scale;
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    const row = Buffer.alloc(size + 1, 255);
    row[0] = 0;
    const my = Math.floor(y / scale) - 4;
    if (my >= 0 && my < modules.length)
      for (let x = 0; x < size; x += 1) {
        const mx = Math.floor(x / scale) - 4;
        if (mx >= 0 && mx < modules.length && modules[my][mx]) row[x + 1] = 0;
      }
    rows.push(row);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 0;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", header), chunk("IDAT", deflateSync(Buffer.concat(rows))), chunk("IEND", Buffer.alloc(0))]);
}

// src/mini-apps/sdk/delivery.ts
var defaultDelivery = () => ({ fee: null, freeFrom: null, cod: true, note: "" });
function shippingFee(subtotal, delivery) {
  if (delivery.fee === null) return null;
  if (delivery.freeFrom !== null && subtotal >= delivery.freeFrom) return 0;
  return delivery.fee;
}
var money2 = (amount) => `${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}\u0111`;
function shippingSummary(delivery) {
  return delivery.fee === null ? "Ph\xED giao: shop b\xE1o khi x\xE1c nh\u1EADn \u0111\u01A1n" : delivery.fee === 0 ? "Mi\u1EC5n ph\xED giao h\xE0ng" : `Ph\xED giao ${money2(delivery.fee)}${delivery.freeFrom !== null ? `, mi\u1EC5n ph\xED cho \u0111\u01A1n t\u1EEB ${money2(delivery.freeFrom)}` : ""}`;
}

// src/mini-apps/sdk/orders.ts
var orderStatuses = [
  { value: "open", label: "Ch\u1EDD ti\u1EC1n" },
  { value: "paid", label: "\u0110\xE3 nh\u1EADn ti\u1EC1n" },
  { value: "cancelled", label: "\u0110\xE3 hu\u1EF7" }
];
var orderStatusValues = orderStatuses.map((item) => item.value);
function parsePrice(value) {
  const text5 = value.trim().toLowerCase().replace(/\s+/g, "");
  const match = /^(\d[\d.,]*)(k|nghìn|ngàn|tr|triệu|đ|vnd|vnđ|d)?$/.exec(text5);
  if (!match) return 0;
  const unit = match[2] ?? "";
  if (unit === "tr" || unit === "tri\u1EC7u") return Math.round(Number(match[1].replace(",", ".")) * 1e6);
  const number = Number(match[1].replace(/[.,]/g, ""));
  return unit === "k" || unit === "ngh\xECn" || unit === "ng\xE0n" ? number * 1e3 : number;
}

// src/mini-apps/funnel-studio/server/service.ts
function localToday(at = /* @__PURE__ */ new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}`;
}
var nfc = (value) => String(value ?? "").normalize("NFC");
var required = (value, field2, max) => {
  const result = nfc(value).trim();
  if (!result) throw new Error(`H\xE3y \u0111i\u1EC1n ${field2}.`);
  if (result.length > max) throw new Error(`${field2[0].toUpperCase()}${field2.slice(1)} d\xE0i qu\xE1 ${max} k\xFD t\u1EF1.`);
  return result;
};
var optional = (value, max) => nfc(value).trim().slice(0, max);
var optionalUrl = (value, field2) => {
  const result = optional(value, 2e3);
  if (!result) return "";
  let url2;
  try {
    url2 = new URL(result);
  } catch {
    throw new Error(`${field2} ph\u1EA3i l\xE0 m\u1ED9t \u0111\u01B0\u1EDDng d\u1EABn \u0111\u1EA7y \u0111\u1EE7, b\u1EAFt \u0111\u1EA7u b\u1EB1ng https://`);
  }
  if (!["http:", "https:"].includes(url2.protocol) || url2.username || url2.password)
    throw new Error(`${field2} ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng http:// ho\u1EB7c https://`);
  return url2.toString();
};
var normalizePhone = (value) => {
  const digits = String(value ?? "").replace(/[\s.\-()]/g, "");
  const local = digits.startsWith("+84") ? `0${digits.slice(3)}` : digits.startsWith("84") && digits.length >= 11 ? `0${digits.slice(2)}` : digits;
  if (!/^0[35789]\d{8}$/.test(local)) throw new Error("S\u1ED1 \u0111i\u1EC7n tho\u1EA1i ch\u01B0a \u0111\xFAng. H\xE3y nh\u1EADp s\u1ED1 di \u0111\u1ED9ng 10 s\u1ED1, v\xED d\u1EE5 0912 345 678.");
  return local;
};
function cleanUtm(raw) {
  if (!raw || typeof raw !== "object") return {};
  const value = raw;
  return Object.fromEntries(utmKeys.map((key) => [key, String(value[key] ?? "").trim().slice(0, 200)]).filter(([, text5]) => text5).map(([key, text5]) => [key, key === "fbclid" || key === "ttclid" ? text5 : text5.toLowerCase()]));
}
var nfcDeep = (value) => typeof value === "string" ? value.normalize("NFC") : Array.isArray(value) ? value.map(nfcDeep) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, nfcDeep(item)])) : value;
function defaultPrivacyPolicy(shop, contact) {
  const who = shop || "Ch\u1EE7 trang";
  return [
    `${who} thu h\u1ECD t\xEAn, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i (Zalo) v\xE0 email (n\u1EBFu b\u1EA1n \u0111i\u1EC1n) khi b\u1EA1n \u0111\u1EC3 l\u1EA1i th\xF4ng tin ho\u1EB7c \u0111\u1EB7t h\xE0ng tr\xEAn trang n\xE0y.`,
    "Ch\xFAng t\xF4i ch\u1EC9 d\xF9ng c\xE1c th\xF4ng tin \u0111\xF3 \u0111\u1EC3: g\u1EEDi qu\xE0 ho\u1EB7c n\u1ED9i dung b\u1EA1n \u0111\u0103ng k\xFD, x\xE1c nh\u1EADn l\u1ECBch h\u1EB9n ho\u1EB7c \u0111\u01A1n h\xE0ng, giao h\xE0ng v\xE0 li\xEAn h\u1EC7 l\u1EA1i v\u1EDBi b\u1EA1n v\u1EC1 \u0111\xFAng n\u1ED9i dung c\u1EE7a trang.",
    "Ch\xFAng t\xF4i kh\xF4ng b\xE1n, kh\xF4ng cho thu\xEA v\xE0 kh\xF4ng chia s\u1EBB th\xF4ng tin c\u1EE7a b\u1EA1n cho b\xEAn kh\xE1c, tr\u1EEB \u0111\u01A1n v\u1ECB giao h\xE0ng khi b\u1EA1n \u0111\u1EB7t h\xE0ng.",
    "Th\xF4ng tin \u0111\u01B0\u1EE3c l\u01B0u t\u1EDBi khi b\u1EA1n y\xEAu c\u1EA7u xo\xE1. \xD4 \u0111\u1ED3ng \xFD tr\xEAn form kh\xF4ng bao gi\u1EDD \u0111\u01B0\u1EE3c t\xEDch s\u1EB5n; b\u1EA1n c\xF3 th\u1EC3 r\xFAt l\u1EA1i s\u1EF1 \u0111\u1ED3ng \xFD b\u1EA5t c\u1EE9 l\xFAc n\xE0o.",
    `Mu\u1ED1n xem, s\u1EEDa, xo\xE1 th\xF4ng tin ho\u1EB7c ng\u1EEBng nh\u1EADn li\xEAn h\u1EC7, b\u1EA1n nh\u1EAFn "HU\u1EF6" qua Zalo${contact ? ` ho\u1EB7c li\xEAn h\u1EC7 ${contact}` : ""}. Ch\xFAng t\xF4i x\u1EED l\xFD trong 15 ng\xE0y.`
  ].join("\n\n");
}
var giftMaxBytes = 20 * 1024 * 1024;
var time = (date) => new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Ho_Chi_Minh" }).format(date);
function pageFacts(brief) {
  const start = brief.kind === "event" ? eventStart(brief.startsAt) : null;
  const facts = brief.kind === "event" ? [["Th\u1EDDi gian", start ? `${time(start)}${brief.durationMinutes ? ` \xB7 ${brief.durationMinutes} ph\xFAt` : ""}` : brief.schedule], ["\u0110\u1ECBa \u0111i\u1EC3m", brief.place], ["Ph\xED tham d\u1EF1", brief.price || "Mi\u1EC5n ph\xED"]] : brief.kind === "booking" ? [["H\xECnh th\u1EE9c", bookingModeLabels[brief.mode]], ["Th\u1EDDi l\u01B0\u1EE3ng", brief.duration], ["G\u1ECDi l\u1EA1i", brief.callbackWithin ?? ""]] : brief.kind === "sales" ? [["Gi\xE1", brief.product?.price ? `${new Intl.NumberFormat("vi-VN").format(brief.product.price)}\u0111` : brief.price]] : [];
  return facts.filter(([, value]) => value).map(([label, value]) => ({ label, value }));
}
var eventOver = (brief, now = Date.now()) => {
  const start = eventStart(brief.startsAt);
  return Boolean(start && now > start.getTime() + (brief.durationMinutes || 60) * 6e4);
};
function plainError(error) {
  const detail = error instanceof Error ? error.message : String(error);
  if (/unexpected shape/i.test(detail)) return "Codex tr\u1EA3 v\u1EC1 n\u1ED9i dung ch\u01B0a \u0111\xFAng khu\xF4n c\u1EE7a trang. H\xE3y b\u1EA5m Th\u1EED l\u1EA1i.";
  if (/timed out/i.test(detail)) return "Codex vi\u1EBFt qu\xE1 l\xE2u n\xEAn Studio \u0111\xE3 d\u1EEBng l\u1EA1i. H\xE3y b\u1EA5m Th\u1EED l\u1EA1i.";
  if (/Unable to start Codex CLI/i.test(detail)) return "Kh\xF4ng m\u1EDF \u0111\u01B0\u1EE3c Codex tr\xEAn m\xE1y n\xE0y. H\xE3y ki\u1EC3m tra Codex \u0111\xE3 \u0111\u01B0\u1EE3c c\xE0i v\xE0 \u0111\u0103ng nh\u1EADp, r\u1ED3i b\u1EA5m Th\u1EED l\u1EA1i.";
  if (/exited with code/i.test(detail)) return `Codex d\u1EEBng gi\u1EEFa ch\u1EEBng. H\xE3y b\u1EA5m Th\u1EED l\u1EA1i. (${detail.slice(0, 200)})`;
  return detail;
}
var orderAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var FunnelStudioService = class {
  constructor(repository, deps = {}) {
    this.repository = repository;
    this.deps = deps;
    this.settings = new FunnelSettingsStore(repository.database);
  }
  repository;
  deps;
  running = /* @__PURE__ */ new Map();
  settings;
  /** A run lost to a Studio restart cannot report back: say so, and let the founder try again. */
  recoverInterrupted() {
    for (const funnel of this.repository.runningGenerations())
      this.repository.finishGeneration(funnel.id, { error: "Studio \u0111\xE3 kh\u1EDFi \u0111\u1ED9ng l\u1EA1i khi Codex \u0111ang vi\u1EBFt trang. H\xE3y b\u1EA5m Th\u1EED l\u1EA1i." });
  }
  /** Mini CRM products a funnel can sell, each price option as its own choice (only plain amounts can be ordered). */
  products() {
    const selling = this.deps.selling?.() ?? null;
    const products = selling?.catalog(localToday()).products ?? [];
    return products.flatMap((product) => (product.prices.length ? product.prices : [{ name: "", price: "", description: "" }]).map((option) => ({
      productId: product.id,
      name: product.name,
      option: option.name,
      price: parsePrice(option.price),
      priceText: option.price,
      summary: product.summary
    })));
  }
  productRef(raw, field2) {
    if (!raw || typeof raw !== "object") return null;
    const value = raw;
    const productId = optional(value.productId, 200);
    if (!productId) return null;
    const option = optional(value.option, 120);
    const selling = this.deps.selling?.() ?? null;
    const product = selling?.product(productId) ?? null;
    if (!product) {
      const name = optional(value.name, 180);
      if (!name) throw new Error(`Kh\xF4ng t\xECm th\u1EA5y ${field2} trong Mini CRM.`);
      return { productId, name, option, price: Math.max(0, Math.round(Number(value.price) || 0)) };
    }
    const chosen = product.prices.find((price2) => price2.name === option) ?? product.prices[0];
    const price = value.price !== void 0 && value.price !== "" && Number(value.price) > 0 ? Math.round(Number(value.price)) : parsePrice(chosen?.price ?? "");
    return { productId, name: product.name, option: chosen?.name ?? "", price };
  }
  validateBrief(raw, kind) {
    const value = raw ?? {};
    const chosen = kind ?? value.kind;
    if (!funnelKinds.includes(chosen)) throw new Error("H\xE3y ch\u1ECDn lo\u1EA1i ph\u1EC5u.");
    const audience = required(value.audience, "trang d\xE0nh cho ai", 500);
    if (chosen === "event") {
      const startsAt = optional(value.startsAt, 16);
      if (startsAt && !eventStart(startsAt)) throw new Error("Gi\u1EDD b\u1EAFt \u0111\u1EA7u ch\u01B0a \u0111\xFAng.");
      const duration = Math.round(Number(value.durationMinutes) || 0);
      return {
        kind: chosen,
        audience,
        eventTitle: required(value.eventTitle, "t\xEAn v\xE0 ch\u1EE7 \u0111\u1EC1 s\u1EF1 ki\u1EC7n", 180),
        schedule: startsAt ? "" : required(value.schedule, "th\u1EDDi gian di\u1EC5n ra", 300),
        place: required(value.place, "\u0111\u1ECBa \u0111i\u1EC3m ho\u1EB7c n\u1EC1n t\u1EA3ng", 500),
        price: optional(value.price, 120),
        startsAt: startsAt || void 0,
        durationMinutes: duration > 0 ? Math.min(600, duration) : void 0,
        speaker: optional(value.speaker, 300) || void 0,
        joinUrl: optionalUrl(value.joinUrl, "Link ph\xF2ng") || void 0,
        zaloGroupUrl: optionalUrl(value.zaloGroupUrl, "Link nh\xF3m Zalo") || void 0,
        replayHours: value.replayHours === void 0 || value.replayHours === "" ? void 0 : Math.max(0, Math.min(720, Math.round(Number(value.replayHours) || 0))),
        sellProduct: this.productRef(value.sellProduct, "s\u1EA3n ph\u1EA9m ch\xE0o b\xE1n sau bu\u1ED5i")
      };
    }
    if (chosen === "booking") {
      const mode = value.mode;
      if (!bookingModes.includes(mode)) throw new Error("H\xE3y ch\u1ECDn h\xECnh th\u1EE9c t\u01B0 v\u1EA5n.");
      const periods = Array.isArray(value.periods) ? value.periods.map((period) => optional(period, 40)).filter(Boolean).slice(0, 4) : [];
      return {
        kind: chosen,
        audience,
        topic: required(value.topic, "n\u1ED9i dung t\u01B0 v\u1EA5n", 300),
        mode,
        duration: required(value.duration, "th\u1EDDi l\u01B0\u1EE3ng bu\u1ED5i t\u01B0 v\u1EA5n", 80),
        consultant: optional(value.consultant, 200) || void 0,
        callbackWithin: optional(value.callbackWithin, 80) || void 0,
        periods: periods.length ? periods : void 0
      };
    }
    if (chosen === "sales") {
      const product = this.productRef(value.product, "s\u1EA3n ph\u1EA9m");
      const upsell = this.productRef(value.upsell, "m\xF3n m\u1EDDi mua th\xEAm");
      if (upsell && product && upsell.productId === product.productId && upsell.option === product.option) throw new Error("M\xF3n m\u1EDDi mua th\xEAm ph\u1EA3i kh\xE1c m\xF3n ch\xEDnh.");
      if (upsell && product?.price && upsell.price > product.price * 0.3)
        throw new Error(`M\xF3n m\u1EDDi mua th\xEAm n\xEAn t\u1ED1i \u0111a 30% gi\xE1 m\xF3n ch\xEDnh (t\u1ED1i \u0111a ${new Intl.NumberFormat("vi-VN").format(Math.floor(product.price * 0.3))}\u0111).`);
      const offerId = optional(value.offerId, 200);
      return {
        kind: chosen,
        audience,
        productName: product?.name ?? required(value.productName, "t\xEAn s\u1EA3n ph\u1EA9m", 180),
        productSummary: required(value.productSummary, "s\u1EA3n ph\u1EA9m gi\xFAp \u0111\u01B0\u1EE3c g\xEC", 600),
        price: product?.price ? `${new Intl.NumberFormat("vi-VN").format(product.price)}\u0111` : required(value.price, "gi\xE1", 120),
        checkoutUrl: optionalUrl(value.checkoutUrl, "Link thanh to\xE1n"),
        offerId: offerId || null,
        product,
        delivery: value.delivery === "digital" ? "digital" : "ship",
        upsell
      };
    }
    if (chosen === "bridge") {
      const images = Array.isArray(value.images) ? value.images.map((image) => this.giftFileRecord(image)) : [];
      if (!images.length) throw new Error("H\xE3y t\u1EA3i l\xEAn \xEDt nh\u1EA5t 1 \u1EA3nh b\u1EA1n t\u1EF1 ch\u1EE5p s\u1EA3n ph\u1EA9m (trang ch\u1EC9 c\xF3 n\xFAt b\u1ECB Google v\xE0 Facebook ch\u1EB7n qu\u1EA3ng c\xE1o).");
      if (images.some((image) => !/^image\//.test(image.mimeType))) throw new Error("\u1EA2nh s\u1EA3n ph\u1EA9m ph\u1EA3i l\xE0 file \u1EA3nh.");
      const destinationUrl = optionalUrl(value.destinationUrl, "Link \u0111\xEDch");
      if (!destinationUrl) throw new Error("H\xE3y d\xE1n link \u0111\xEDch (Shopee, TikTok Shop, Zalo\u2026).");
      return {
        kind: chosen,
        audience,
        productName: required(value.productName, "t\xEAn s\u1EA3n ph\u1EA9m", 180),
        destinationUrl,
        affiliate: value.affiliate === true,
        review: required(value.review, "v\xEC sao b\u1EA1n gi\u1EDBi thi\u1EC7u (k\u1EC3 c\u1EA3 \u0111i\u1EC3m ch\u01B0a hay)", 1e3),
        images: images.slice(0, 6)
      };
    }
    if (chosen === "quiz") {
      const results = (Array.isArray(value.results) ? value.results : []).map((result) => {
        const item = result ?? {};
        return { name: optional(item.name, 80), product: this.productRef(item.product, "s\u1EA3n ph\u1EA9m g\u1EE3i \xFD") };
      }).filter((result) => result.name);
      if (results.length < 2) throw new Error("Quiz c\u1EA7n \xEDt nh\u1EA5t 2 k\u1EBFt qu\u1EA3.");
      if (results.length > 5) throw new Error("Quiz c\xF3 t\u1ED1i \u0111a 5 k\u1EBFt qu\u1EA3.");
      return { kind: chosen, audience, goal: required(value.goal, "quiz gi\xFAp kh\xE1ch bi\u1EBFt \u0111i\u1EC1u g\xEC", 300), results, giftNote: optional(value.giftNote, 300) };
    }
    const giftFile = value.giftFile && typeof value.giftFile === "object" ? this.giftFileRecord(value.giftFile) : null;
    const giftUrl = optionalUrl(value.giftUrl, "Link qu\xE0");
    if (!giftUrl && !giftFile) throw new Error("H\xE3y d\xE1n link qu\xE0 ho\u1EB7c t\u1EA3i file qu\xE0 l\xEAn.");
    return {
      kind: "lead",
      audience,
      giftTitle: required(value.giftTitle, "m\xF3n qu\xE0 l\xE0 g\xEC", 180),
      giftOutcome: required(value.giftOutcome, "qu\xE0 gi\xFAp ng\u01B0\u1EDDi nh\u1EADn \u0111\u01B0\u1EE3c g\xEC", 600),
      giftUrl: giftFile ? "" : giftUrl,
      giftFile,
      sellProduct: this.productRef(value.sellProduct, "s\u1EA3n ph\u1EA9m b\xE1n sau qu\xE0")
    };
  }
  nameOf(brief) {
    switch (brief.kind) {
      case "lead":
        return brief.giftTitle;
      case "event":
        return brief.eventTitle;
      case "booking":
        return `T\u01B0 v\u1EA5n: ${brief.topic}`;
      case "sales":
      case "bridge":
        return brief.productName;
      case "quiz":
        return `Quiz: ${brief.goal}`;
    }
  }
  uniqueSlug(value) {
    const base = value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, (match) => match === "\u0111" ? "d" : "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "trang";
    let slug = base;
    for (let suffix = 2; this.repository.getBySlug(slug); suffix += 1) slug = `${base.slice(0, 54)}-${suffix}`;
    return slug;
  }
  /** One short form → one funnel; Codex writes every page of its chain in the background. */
  create(raw) {
    if (!this.deps.ai) throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng \u0111\u1EC3 vi\u1EBFt trang.");
    const brief = this.validateBrief(raw?.brief);
    const name = this.nameOf(brief).slice(0, 160);
    const funnel = this.repository.create({ name, slug: this.uniqueSlug(name), brief, theme: this.settings.get().settings.brand.defaultTheme, generation: { status: "running", instruction: "", error: null, startedAt: (/* @__PURE__ */ new Date()).toISOString(), target: null, done: 0, total: 0 } });
    this.write(funnel.id, null);
    return funnel;
  }
  /** Writes every page again from the brief, or one page when `type` is given. */
  regenerate(id, revision, type) {
    return this.start(id, revision, "", this.pageType(id, type, false));
  }
  /** Codex changes one page after a one-line request, keeping what the request does not touch. */
  rewrite(id, rawInstruction, revision, type) {
    const instruction = required(rawInstruction, "\u0111i\u1EC1u b\u1EA1n mu\u1ED1n s\u1EEDa", 1e3);
    const target = this.pageType(id, type, true);
    const step = this.repository.get(id)?.steps.find((item) => item.kind === "page" && item.type === target);
    if (!step || step.kind !== "page" || !step.content) throw new Error("Trang ch\u01B0a c\xF3 n\u1ED9i dung \u0111\u1EC3 s\u1EEDa. H\xE3y b\u1EA5m Vi\u1EBFt l\u1EA1i \u0111\u1EC3 Codex vi\u1EBFt trang.");
    return this.start(id, revision, instruction, target);
  }
  /** The written page `type` names (the first page when `fallbackFirst`), or null for every page. */
  pageType(id, type, fallbackFirst) {
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    const pages = funnel.steps.filter((step) => step.kind === "page" && isWritten(step.type));
    if (type === void 0 || type === null || type === "") return fallbackFirst ? pages[0]?.type : null;
    const found = pages.find((step) => step.type === type);
    if (!found) throw new Error("Trang n\xE0y kh\xF4ng do Codex vi\u1EBFt.");
    return found.type;
  }
  start(id, revision, instruction, target) {
    if (!this.deps.ai) throw new Error("Codex ch\u01B0a s\u1EB5n s\xE0ng \u0111\u1EC3 vi\u1EBFt trang.");
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    if (funnel.status === "archived") throw new Error("Ph\u1EC5u \u0111\xE3 l\u01B0u tr\u1EEF. H\xE3y kh\xF4i ph\u1EE5c tr\u01B0\u1EDBc.");
    if (funnel.generation.status === "running") throw new Error("Codex \u0111ang vi\u1EBFt ph\u1EC5u n\xE0y.");
    const updated = this.repository.update(id, revision, { generation: { status: "running", instruction, error: null, startedAt: (/* @__PURE__ */ new Date()).toISOString(), target, done: 0, total: 0 } });
    this.write(id, target);
    return updated;
  }
  /** Resolves when the funnel's current Codex run has finished (tests and shutdown). */
  settled(id) {
    return this.running.get(id) ?? Promise.resolve();
  }
  productFor(funnel, type) {
    const brief = funnel.brief;
    if (type === "upsell") return brief.kind === "sales" ? brief.upsell ?? null : null;
    if (brief.kind === "sales") return brief.product ?? null;
    if (brief.kind === "lead" || brief.kind === "event") return brief.sellProduct ?? null;
    return null;
  }
  /** The pages of a run, in order: each one written from the brief, the brand and what the pages before it say. */
  write(id, target) {
    const run = (async () => {
      const start = this.repository.get(id);
      if (!start || !this.deps.ai) return;
      const types = target ? [target] : start.steps.filter((step) => step.kind === "page" && isWritten(step.type)).map((step) => step.type);
      try {
        const profile = this.deps.brand?.()?.profile() ?? null;
        const brand = { name: profile?.name ?? "", summary: profile?.summary ?? "", positioning: profile?.positioning ?? "" };
        for (const [index, type] of types.entries()) {
          const funnel = this.repository.get(id);
          if (!funnel || funnel.generation.status !== "running") return;
          this.repository.saveStepContent(id, type, funnel.steps.find((step) => step.kind === "page" && step.type === type)?.content ?? null, { target: type, done: index, total: types.length });
          const current = funnel.steps.find((step) => step.kind === "page" && step.type === type);
          const { giftFile: _gift, images: _images, ...brief } = funnel.brief;
          const product = this.productFor(funnel, type);
          const quiz = funnel.steps.find((step) => step.kind === "page" && step.type === "quiz");
          const input = {
            type,
            funnelKind: funnel.kind,
            brief: { ...brief, ...funnel.brief.kind === "booking" ? { mode: bookingModeLabels[funnel.brief.mode] } : {}, ...type === "quiz-result" && quiz?.content ? { quizResults: quiz.content.results } : {} },
            facts: { ...Object.fromEntries(pageFacts(funnel.brief).map((fact2) => [fact2.label, fact2.value])), ...this.sellingFacts(funnel) },
            brand,
            product: product ? { name: product.name, option: product.option, price: product.price ? `${new Intl.NumberFormat("vi-VN").format(product.price)}\u0111` : "ch\u01B0a c\xF3 gi\xE1" } : null,
            chain: funnel.steps.filter((step) => step.kind === "page" && step.type !== type && step.content).map((step) => ({ type: pageLabels[step.type], headline: String(step.content.headline ?? step.content.beforeHeadline ?? "") })).filter((page3) => page3.headline),
            current: funnel.generation.instruction ? current.content : null,
            instruction: funnel.generation.instruction
          };
          let problem = null;
          let output = null;
          for (let attempt = 0; attempt < 2; attempt += 1) {
            output = (await pageCopyWriter(type).run(this.deps.ai, input)).output;
            problem = brokenPageCopy(type, output);
            if (!problem) break;
          }
          if (problem) throw new Error(`Codex tr\u1EA3 v\u1EC1 n\u1ED9i dung l\u1ED7i \u1EDF ${pageLabels[type]} (${problem}). H\xE3y b\u1EA5m Th\u1EED l\u1EA1i.`);
          this.repository.saveStepContent(id, type, nfcDeep(output), { target: type, done: index + 1, total: types.length });
        }
        this.repository.finishGeneration(id, { ok: true });
      } catch (error) {
        this.repository.finishGeneration(id, { error: plainError(error) });
      }
    })();
    this.running.set(id, run);
    void run.finally(() => {
      if (this.running.get(id) === run) this.running.delete(id);
    });
  }
  /** The founder's own edit of the brief and the first page; never while Codex is writing. */
  update(id, raw, revision) {
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    if (funnel.generation.status === "running") throw new Error("Codex \u0111ang vi\u1EBFt ph\u1EC5u n\xE0y. H\xE3y ch\u1EDD xong r\u1ED3i s\u1EEDa.");
    if (funnel.status === "archived") throw new Error("Ph\u1EC5u \u0111\xE3 l\u01B0u tr\u1EEF. H\xE3y kh\xF4i ph\u1EE5c tr\u01B0\u1EDBc.");
    const value = raw ?? {};
    const brief = this.validateBrief(value.brief, funnel.kind);
    let page3 = funnel.page;
    if (value.page !== void 0 && value.page !== null) {
      const parsed = pageContentSchema.safeParse(value.page);
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        throw new Error(`N\u1ED9i dung trang ch\u01B0a h\u1EE3p l\u1EC7 \u1EDF \u201C${issue?.path.join(".") || "trang"}\u201D: ${issue?.message ?? ""}`.trim());
      }
      page3 = parsed.data;
    }
    return this.repository.update(id, revision, { name: required(value.name, "t\xEAn ph\u1EC5u", 160), brief, ...page3 ? { page: page3 } : {} });
  }
  /** Another look for the same copy; allowed while Codex writes, since it touches no copy. */
  setTheme(id, rawTheme, revision) {
    const theme = rawTheme;
    if (!funnelThemes.includes(theme)) throw new Error("Giao di\u1EC7n kh\xF4ng h\u1EE3p l\u1EC7.");
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    if (funnel.status === "archived") throw new Error("Ph\u1EC5u \u0111\xE3 l\u01B0u tr\u1EEF. H\xE3y kh\xF4i ph\u1EE5c tr\u01B0\u1EDBc.");
    return this.repository.update(id, revision, { theme });
  }
  transition(id, rawStatus, revision) {
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    const status = rawStatus;
    const ready = funnel.steps[0]?.kind === "page" && Boolean(funnel.steps[0].content);
    if (status === "paused") {
      if (funnel.status !== "live") throw new Error("Ch\u1EC9 t\u1EA1m d\u1EEBng \u0111\u01B0\u1EE3c ph\u1EC5u \u0111ang ch\u1EA1y.");
      return this.repository.update(id, revision, { status });
    }
    if (status === "live") {
      if (funnel.status === "archived") throw new Error("Ph\u1EC5u \u0111\xE3 l\u01B0u tr\u1EEF. H\xE3y kh\xF4i ph\u1EE5c tr\u01B0\u1EDBc.");
      if (!ready) throw new Error("Trang \u0111\u1EA7u c\u1EE7a ph\u1EC5u ch\u01B0a c\xF3 n\u1ED9i dung.");
      return this.repository.update(id, revision, { status });
    }
    if (status === "archived") {
      if (funnel.generation.status === "running") throw new Error("Codex \u0111ang vi\u1EBFt ph\u1EC5u n\xE0y. H\xE3y ch\u1EDD xong r\u1ED3i l\u01B0u tr\u1EEF.");
      return this.repository.update(id, revision, { status });
    }
    if (status === "draft") {
      if (funnel.status !== "archived") throw new Error("Ph\u1EC5u n\xE0y ch\u01B0a b\u1ECB l\u01B0u tr\u1EEF.");
      return this.repository.update(id, revision, { status: ready ? "live" : "draft" });
    }
    throw new Error("Tr\u1EA1ng th\xE1i kh\xF4ng h\u1EE3p l\u1EC7.");
  }
  brand() {
    const context = this.deps.brand?.() ?? null;
    const profile = context?.profile() ?? null;
    const guideline = context?.guideline("identity") ?? null;
    const identity = guideline?.kind === "identity" ? guideline : null;
    const logos = context?.assets({ role: "logo" }) ?? [];
    const logo2 = logos.find((asset) => asset.id === identity?.logoAssetId) ?? logos[0];
    const palette = identity?.palette ?? [];
    const accent = (palette.find((item) => /primary|chính|chủ đạo|accent|nhấn/i.test(item.role)) ?? palette[0])?.hex ?? null;
    return {
      name: profile?.name ?? "",
      logoUrl: logo2?.url ?? null,
      accent: accent && /^#[0-9a-f]{6}$/i.test(accent) ? accent : null,
      zaloUrl: profile?.zaloUrl ?? ""
    };
  }
  /** Active Offers of Mini CRM a sales page can start from; empty while Mini CRM is not running. */
  offers() {
    return (this.deps.offers?.listOffers({ status: "active", audience: "customer", limit: 200 }).items ?? []).map((offer) => ({ id: offer.id, name: offer.name, summary: offer.summary }));
  }
  /**
   * How the shop takes a transfer, from Mini CRM's "Thanh toán & giao hàng" (2.7.0): its account (each order gets a
   * VietQR with the amount and code) or its own QR picture (`picture`); null while neither is filled in or Mini CRM
   * is not running.
   */
  bank() {
    this.handOverPayment();
    const payment = this.deps.selling?.()?.payment() ?? null;
    if (!payment) return null;
    if (payment.method === "qr") return { bin: "", bankName: "", accountNumber: "", accountName: "", picture: true };
    if (!payment.bankBin || !payment.accountNumber) return null;
    return { bin: payment.bankBin, bankName: payment.bankName, accountNumber: payment.accountNumber, accountName: payment.accountName, picture: false };
  }
  /** The shipping fee, free-shipping threshold and COD, from Mini CRM (2.7.0); its default while Mini CRM is not running. */
  delivery() {
    this.handOverPayment();
    const rule = this.deps.selling?.()?.delivery?.();
    return rule ? { fee: rule.fee, freeFrom: rule.freeFrom, cod: rule.cod, note: rule.note } : defaultDelivery();
  }
  /** For the writers of a funnel that takes orders (2.7.0): how the shop ships and is paid, from Mini CRM, so its FAQ answers it. */
  sellingFacts(funnel) {
    if (!funnel.steps.some((step) => step.kind === "page" && step.type === "order-form")) return {};
    const digital = funnel.brief.kind === "sales" && funnel.brief.delivery === "digital";
    const bank = this.bank();
    const delivery = this.delivery();
    const pay = [bank ? bank.picture ? "chuy\u1EC3n kho\u1EA3n b\u1EB1ng m\xE3 QR c\u1EE7a shop" : `chuy\u1EC3n kho\u1EA3n VietQR (${bank.bankName})` : "", delivery.cod && !digital ? "tr\u1EA3 ti\u1EC1n khi nh\u1EADn h\xE0ng (COD)" : ""].filter(Boolean).join(", ");
    return {
      ...digital ? {} : { "Giao h\xE0ng": [shippingSummary(delivery), delivery.note].filter(Boolean).join(". ") },
      "Thanh to\xE1n": pay || "shop b\xE1o khi x\xE1c nh\u1EADn \u0111\u01A1n"
    };
  }
  /** What Cài đặt › Thanh toán shows (2.7.0): Mini CRM's transfer and delivery rule; `crm`: Mini CRM is running. */
  shopPayment() {
    const crm = Boolean(this.deps.selling?.());
    return { crm, bank: this.bank(), delivery: this.delivery(), deliverySet: Boolean(this.deps.selling?.()?.delivery?.().set) };
  }
  /** Whether the old Cài đặt › Thanh toán reached Mini CRM (or had nothing to hand over) in this process. */
  handedOver = false;
  /**
   * Funnel Studio up to 2.6 kept its own bank, COD and shipping fee; 2.7 hands them to Mini CRM once, where Mini
   * CRM's are not filled in, and from then on reads Mini CRM only. Tried again later while Mini CRM is not running.
   */
  handOverPayment() {
    if (this.handedOver) return;
    const record = this.settings.get();
    const old = record.settings.payment;
    const rule = shippingRule(old.shippingFee);
    const delivery = old.shippingFee.trim() || !old.cod ? { fee: rule.known ? rule.fee : null, freeFrom: rule.freeFrom, cod: old.cod, note: "" } : void 0;
    const bin = bankBin(old.bankName);
    const account = bin && old.accountNumber ? { bankBin: bin, accountNumber: old.accountNumber, accountName: old.accountName } : void 0;
    if (old.handedOverAt || !delivery && !account) {
      this.handedOver = true;
      return;
    }
    const selling = this.deps.selling?.();
    if (!selling?.adoptShopSettings) return;
    selling.adoptShopSettings({ delivery, account });
    this.settings.markPaymentHandedOver();
    this.handedOver = true;
  }
  /** Every product a funnel may sell: its main product, the one after the gift or event, each quiz result's, the upsell. */
  funnelProducts(funnel) {
    const brief = funnel.brief;
    const all = brief.kind === "sales" ? [brief.product, brief.upsell] : brief.kind === "lead" || brief.kind === "event" ? [brief.sellProduct] : brief.kind === "quiz" ? brief.results.map((result) => result.product) : [];
    return all.filter((item) => Boolean(item?.productId));
  }
  stepOf(funnel, path2) {
    return funnel.steps.find((step) => step.kind === "page" && step.path === path2) ?? null;
  }
  /** One page of a funnel as visitors get it: counted unless the founder previews it from Studio. */
  publicStep(slug, path2, preview, query, orderId) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.status === "archived") return null;
    const step = this.stepOf(funnel, path2);
    if (!step) return null;
    const ready = Boolean(step.content) || !isWritten(step.type);
    if (funnel.status === "live" && ready && !preview) {
      this.repository.recordStepVisit(funnel.id, step.type);
      if (path2 === "") this.repository.recordVisit(funnel.id);
    }
    const leadRecord = query.k ? this.repository.getLead(query.k) : null;
    const lead = leadRecord && leadRecord.funnelId === funnel.id ? { id: leadRecord.id, name: leadRecord.name, phone: leadRecord.phone, note: leadRecord.note } : null;
    const products = this.funnelProducts(funnel);
    const found = orderId ?? query.o ? this.repository.getOrder(orderId ?? query.o) : null;
    const order = found ?? (preview && (step.type === "upsell" || step.type === "order-confirmation") ? this.sampleOrder(funnel, products[0] ?? null, step.type === "upsell") : null);
    const wanted = query.p ? products.find((item) => item.productId === query.p) : null;
    const product = step.type === "upsell" ? this.productFor(funnel, "upsell") : wanted ?? this.productFor(funnel, step.type) ?? products[0] ?? null;
    const next = nextPage(funnel.steps, step.type);
    const base = `/funnel-studio/f/${encodeURIComponent(funnel.slug)}`;
    const brief = funnel.brief;
    const giftUrl = brief.kind === "lead" ? brief.giftFile ? `${base}/gift` : brief.giftUrl || null : null;
    const context = {
      funnel,
      step,
      brand: this.brand(),
      settings: this.settings.get().settings,
      facts: pageFacts(brief),
      preview,
      open: funnel.status === "live",
      base,
      next: next ? `${base}${next.path ? `/${next.path}` : ""}` : null,
      lead,
      order: order && order.funnelId === funnel.id ? order : null,
      product,
      products,
      bank: this.bank(),
      delivery: this.delivery(),
      query,
      giftUrl,
      images: brief.kind === "bridge" ? brief.images.map((image) => `${base}/anh/${image.id}`) : []
    };
    const quiz = funnel.steps.find((item) => item.kind === "page" && item.type === "quiz")?.content ?? null;
    return renderStep(context, quiz);
  }
  sampleOrder(funnel, product, upsell) {
    if (!product?.price) return null;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const transfer = Boolean(this.bank());
    return {
      id: "xem-truoc",
      funnelId: funnel.id,
      funnelName: funnel.name,
      funnelSlug: funnel.slug,
      code: "DHMAU123",
      name: "Nguy\u1EC5n Th\u1ECB Lan",
      phone: "0912345678",
      utm: {},
      province: "TP H\u1ED3 Ch\xED Minh",
      ward: "Ph\u01B0\u1EDDng B\u1EBFn Ngh\xE9",
      street: "12 L\xEA L\u1EE3i",
      note: "",
      items: [{ productId: product.productId, name: product.name, option: product.option, quantity: 1, price: product.price, upsell: false }],
      shipping: 0,
      total: product.price,
      payment: transfer ? "transfer" : "cod",
      status: "open",
      upsell: upsell ? "offered" : "none",
      createdAt: now,
      updatedAt: now
    };
  }
  /** A page of the founder's legal text from Cài đặt, in the funnel's look. */
  legalPage(slug, key) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.status === "archived") return null;
    const settings2 = this.settings.get().settings;
    const contact = [settings2.brand.hotline, settings2.brand.email].filter(Boolean).join(" ho\u1EB7c ");
    const page3 = key === "privacy" ? ["Ch\xEDnh s\xE1ch d\u1EEF li\u1EC7u c\xE1 nh\xE2n", settings2.legal.privacyPolicy || defaultPrivacyPolicy(this.brand().name, contact)] : key === "terms" ? ["\u0110i\u1EC1u kho\u1EA3n", settings2.legal.terms] : key === "returns" ? ["Ch\xEDnh s\xE1ch \u0111\u1ED5i tr\u1EA3", settings2.legal.returnPolicy] : null;
    if (!page3 || !page3[1].trim()) return null;
    return shell({ type: "thank-you", title: page3[0], description: page3[0], theme: funnel.theme, brand: this.brand(), settings: settings2, slug: funnel.slug, preview: false, index: false, body: `<main class="narrow page-narrow"><h1>${t(page3[0])}</h1><div class="legal-text mt-6">${t(page3[1])}</div></main>` });
  }
  /** A form on a page of the chain: one lead (once per key, and once per phone in the repeat window), then the next page. */
  submit(slug, raw, source) {
    const funnel = this.repository.getBySlug(slug);
    const first = funnel?.steps[0];
    if (!funnel || funnel.status === "archived" || !first || first.kind !== "page" || !first.content) throw new Error("Kh\xF4ng t\xECm th\u1EA5y trang n\xE0y.");
    if (funnel.status !== "live") throw new Error("Trang \u0111ang t\u1EA1m d\u1EEBng nh\u1EADn th\xF4ng tin.");
    const name = required(raw.name, "h\u1ECD t\xEAn", 120);
    const phone = normalizePhone(raw.phone);
    const email = optional(raw.email, 254).toLowerCase();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email ch\u01B0a \u0111\xFAng.");
    if (raw.consent !== true) throw new Error("H\xE3y t\xEDch \u0111\u1ED3ng \xFD tr\u01B0\u1EDBc khi g\u1EEDi.");
    const idempotencyKey = String(raw.idempotencyKey ?? "").trim();
    if (idempotencyKey.length < 8 || idempotencyKey.length > 200) throw new Error("H\xE3y t\u1EA3i l\u1EA1i trang r\u1ED3i g\u1EEDi l\u1EA1i.");
    const from = raw.quiz && typeof raw.quiz === "object" && Array.isArray(raw.quiz.answers) && !raw.quiz.answers.length ? "quiz-result" : first.type;
    const settings2 = this.settings.get().settings;
    const consent = first.content.consent ?? settings2.form.consentText;
    const repeat = settings2.form.blockRepeatHours > 0 ? this.repository.recentLead(funnel.id, phone, new Date(Date.now() - settings2.form.blockRepeatHours * 36e5).toISOString()) : null;
    if (funnel.brief.kind === "event" && from === "event-registration" && eventOver(funnel.brief)) throw new Error("Bu\u1ED5i n\xE0y \u0111\xE3 di\u1EC5n ra. B\u1EA1n xem b\u1EA3n ghi \u1EDF ph\xF2ng xem nh\xE9.");
    const utm = settings2.tracking.keepUtm ? cleanUtm(raw.utm) : {};
    const { lead, duplicate } = repeat ? { lead: repeat, duplicate: true } : this.repository.submit(funnel.id, { name, phone, email, note: optional(raw.note, 1e3), consent, source: optional(source, 500) || "Tr\u1EF1c ti\u1EBFp", idempotencyKey, utm });
    if (!duplicate) {
      this.repository.recordStepAction(funnel.id, from);
      if (settings2.form.sendToCrm) this.toCrm("activity.logged", funnel, { name, phone, email }, { action: "lead_captured", object: { kind: "campaign", id: funnel.id, name: funnel.name }, summary: `\u0110\u1EC3 l\u1EA1i th\xF4ng tin \u1EDF ${pageLabels[from]} \u201C${funnel.name}\u201D`, evidence: optional(raw.note, 500) });
    }
    const next = nextPage(funnel.steps, from);
    const base = `/funnel-studio/f/${encodeURIComponent(funnel.slug)}`;
    const quizResult = raw.quiz && typeof raw.quiz === "object" ? Math.max(0, Math.round(Number(raw.quiz.result) || 0)) : null;
    const legacySale = funnel.brief.kind === "sales" && !funnel.brief.product;
    const nextUrl = legacySale ? funnel.brief.kind === "sales" && funnel.brief.checkoutUrl || null : next ? `${base}${next.path ? `/${next.path}` : ""}?k=${encodeURIComponent(lead.id)}${quizResult !== null && next.type === "quiz-result" ? `&r=${quizResult}` : ""}` : null;
    return { id: funnel.id, leadId: lead.id, thankYou: { headline: "C\u1EA3m \u01A1n b\u1EA1n!", body: "Shop s\u1EBD li\xEAn h\u1EC7 v\u1EDBi b\u1EA1n s\u1EDBm.", ctaLabel: "\u0110\xE3 hi\u1EC3u" }, nextUrl };
  }
  /** The Mini CRM event for a person who acted on a page; Mini CRM need not be running (events wait for it). */
  toCrm(type, funnel, person, payload) {
    if (!this.deps.crm) return;
    try {
      this.deps.crm.publish(type, {
        source: { channel: "web", accountId: funnel.slug, accountName: funnel.name },
        subject: { identities: [{ scheme: "phone", value: person.phone }, ...person.email ? [{ scheme: "email", value: person.email }] : []], displayName: person.name },
        actor: "customer",
        link: { app: "funnel-studio", path: `/mini-apps/funnel-studio/leads/${funnel.id}` },
        payload
      });
    } catch (error) {
      console.error("Funnel Studio could not send to Mini CRM", error);
    }
  }
  orderToCrm(funnel, order) {
    if (!this.deps.crm || !this.settings.get().settings.form.sendToCrm) return;
    const person = { name: order.name, phone: order.phone };
    this.toCrm("activity.logged", funnel, person, { action: "order_created", object: { kind: "order", id: order.code, name: order.items.map((item) => item.name).join(", ") }, value: { amount: order.total, currency: "VND" }, summary: `\u0110\u1EB7t \u0111\u01A1n ${order.code} \u1EDF \u201C${funnel.name}\u201D` });
    try {
      this.deps.crm.publish("selling.updated", {
        // An order is its own conversation on a web page (CRM keys selling changes by conversation).
        source: { channel: "web", accountId: funnel.slug, accountName: funnel.name, conversationId: `order:${order.id}` },
        subject: { identities: [{ scheme: "phone", value: order.phone }], displayName: order.name },
        actor: "customer",
        payload: {
          order: {
            code: order.code,
            action: order.status === "cancelled" ? "cancel" : "update",
            items: order.items.map((item) => ({ productId: item.productId, quantity: item.quantity, note: item.option })),
            promotionIds: [],
            total: order.total,
            fulfillment: { method: order.province ? "delivery" : "", name: order.name, phone: order.phone, address: [order.street, order.ward, order.province].filter(Boolean).join(", "), time: "", note: [order.payment === "cod" ? "COD" : "Chuy\u1EC3n kho\u1EA3n", order.note].filter(Boolean).join(" \xB7 ") },
            confirmed: true
          }
        }
      });
    } catch (error) {
      console.error("Funnel Studio could not send the order to Mini CRM", error);
    }
  }
  newOrderCode() {
    for (; ; ) {
      const code = `DH${Array.from({ length: 6 }, () => orderAlphabet[randomInt(orderAlphabet.length)]).join("")}`;
      if (!this.repository.codeTaken(code)) return code;
    }
  }
  /** An order from an order page: the product at the funnel's price, shipping from Cài đặt, then the upsell or the order. */
  order(slug, raw, source) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.status === "archived") throw new Error("Kh\xF4ng t\xECm th\u1EA5y trang n\xE0y.");
    if (funnel.status !== "live") throw new Error("Trang \u0111ang t\u1EA1m d\u1EEBng nh\u1EADn \u0111\u01A1n.");
    if (!funnel.steps.some((step) => step.kind === "page" && step.type === "order-form")) throw new Error("Ph\u1EC5u n\xE0y kh\xF4ng nh\u1EADn \u0111\u01A1n.");
    const product = this.funnelProducts(funnel).find((item) => item.productId === String(raw.productId ?? ""));
    if (!product || !product.price) throw new Error("S\u1EA3n ph\u1EA9m n\xE0y ch\u01B0a \u0111\u1EB7t \u0111\u01B0\u1EE3c tr\xEAn trang.");
    const quantity = Math.round(Number(raw.quantity) || 0);
    if (quantity < 1 || quantity > 20) throw new Error("S\u1ED1 l\u01B0\u1EE3ng t\u1EEB 1 \u0111\u1EBFn 20.");
    const name = required(raw.name, "t\xEAn ng\u01B0\u1EDDi nh\u1EADn", 120);
    const phone = normalizePhone(raw.phone);
    const settings2 = this.settings.get().settings;
    const digital = funnel.brief.kind === "sales" && funnel.brief.delivery === "digital";
    const province = digital ? "" : required(raw.province, "t\u1EC9nh, th\xE0nh ph\u1ED1", 80);
    const ward = digital ? "" : required(raw.ward, "ph\u01B0\u1EDDng, x\xE3", 120);
    const street = digital ? "" : required(raw.street, "s\u1ED1 nh\xE0, t\xEAn \u0111\u01B0\u1EDDng", 240);
    const payment = raw.payment;
    const delivery = this.delivery();
    if (payment === "cod" && (!delivery.cod || digital)) throw new Error("Shop kh\xF4ng nh\u1EADn thanh to\xE1n khi giao h\xE0ng.");
    if (payment === "transfer" && !this.bank()) throw new Error("Shop ch\u01B0a c\xF3 t\xE0i kho\u1EA3n nh\u1EADn chuy\u1EC3n kho\u1EA3n.");
    if (payment !== "cod" && payment !== "transfer") throw new Error("H\xE3y ch\u1ECDn c\xE1ch thanh to\xE1n.");
    const idempotencyKey = String(raw.idempotencyKey ?? "").trim();
    if (idempotencyKey.length < 8 || idempotencyKey.length > 200) throw new Error("H\xE3y t\u1EA3i l\u1EA1i trang r\u1ED3i \u0111\u1EB7t l\u1EA1i.");
    const subtotal = product.price * quantity;
    const shipping = digital ? 0 : shippingFee(subtotal, delivery) ?? 0;
    const leadId = optional(raw.leadId, 80);
    const lead = leadId ? this.repository.getLead(leadId) : null;
    const hasUpsell = funnel.steps.some((step) => step.kind === "page" && step.type === "upsell") && Boolean(this.productFor(funnel, "upsell")?.price);
    const { order, duplicate } = this.repository.createOrder({
      funnelId: funnel.id,
      code: this.newOrderCode(),
      leadId: lead?.funnelId === funnel.id ? lead.id : null,
      name,
      phone,
      province,
      ward,
      street,
      note: optional(raw.note, 500),
      items: [{ productId: product.productId, name: product.name, option: product.option, quantity, price: product.price, upsell: false }],
      shipping,
      total: subtotal + shipping,
      payment,
      upsell: hasUpsell ? "offered" : "none",
      source: optional(source, 500) || "Tr\u1EF1c ti\u1EBFp",
      idempotencyKey,
      utm: settings2.tracking.keepUtm ? cleanUtm(raw.utm) : {}
    });
    if (!duplicate) {
      this.repository.recordStepAction(funnel.id, "order-form");
      if (funnel.brief.kind === "sales") this.repository.recordConversion(funnel.id);
      this.orderToCrm(funnel, order);
    }
    const base = `/funnel-studio/f/${encodeURIComponent(funnel.slug)}`;
    return { id: order.id, code: order.code, total: order.total, nextUrl: order.upsell === "offered" ? `${base}/mua-them?o=${encodeURIComponent(order.id)}` : `${base}/don/${encodeURIComponent(order.id)}` };
  }
  /** The customer's answer to the upsell: the item joins the unshipped order (same delivery, one QR for the new total). */
  answerUpsell(orderId, accept) {
    const order = this.repository.getOrder(orderId);
    if (!order) throw new Error("Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n.");
    const funnel = this.repository.get(order.funnelId);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    const base = `/funnel-studio/f/${encodeURIComponent(funnel.slug)}`;
    const done = { nextUrl: `${base}/don/${encodeURIComponent(order.id)}` };
    if (order.upsell !== "offered" || order.status !== "open") return done;
    const upsell = this.productFor(funnel, "upsell");
    if (!accept || !upsell?.price) {
      this.repository.updateOrder(order.id, { upsell: "declined" });
      return done;
    }
    const updated = this.repository.updateOrder(order.id, {
      upsell: "accepted",
      items: [...order.items, { productId: upsell.productId, name: upsell.name, option: upsell.option, quantity: 1, price: upsell.price, upsell: true }],
      total: order.total + upsell.price
    });
    this.repository.recordStepAction(funnel.id, "upsell");
    this.orderToCrm(funnel, updated);
    return done;
  }
  /** The founder marks an order paid or cancelled (after checking the bank, or a call); Mini CRM hears it. */
  setOrderStatus(orderId, rawStatus) {
    const status = rawStatus;
    if (status !== "paid" && status !== "cancelled" && status !== "open") throw new Error("Tr\u1EA1ng th\xE1i \u0111\u01A1n kh\xF4ng h\u1EE3p l\u1EC7.");
    const order = this.repository.getOrder(orderId);
    if (!order) throw new Error("Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n.");
    const updated = this.repository.updateOrder(orderId, { status });
    const funnel = this.repository.get(order.funnelId);
    if (funnel && this.deps.crm && this.settings.get().settings.form.sendToCrm && status !== "open") {
      try {
        this.deps.crm.publish("order.changed", {
          source: { channel: "web", accountId: funnel.slug, accountName: funnel.name, conversationId: `order:${order.id}` },
          subject: { identities: [{ scheme: "phone", value: order.phone }], displayName: order.name },
          actor: "operator",
          payload: { code: order.code, change: status }
        });
      } catch (error) {
        console.error("Funnel Studio could not send the order change to Mini CRM", error);
      }
    }
    return updated;
  }
  /**
   * Mini CRM broadcast an order paid or cancelled (`crm.changes`, ADR 0008; synchronous, in the event's savepoint).
   * For an order one of these pages took, the founder pressed it in Mini CRM: the order here follows, so both apps
   * and the customer's order page say the same. Nothing is sent back (Mini CRM already has it).
   */
  crmChanged(body) {
    const change = body;
    const conversationId = change?.order?.source?.app === "funnel-studio" ? change.order.source.conversationId ?? "" : "";
    if (!conversationId.startsWith("order:")) return;
    const order = this.repository.getOrder(conversationId.slice("order:".length));
    if (!order || order.status !== "open") return;
    const status = change.type === "order.paid" ? "paid" : change.type === "order.cancelled" ? "cancelled" : null;
    if (status) this.repository.updateOrder(order.id, { status });
  }
  /** The VietQR of an open transfer order as a PNG a phone can save, or the shop's own QR picture from Mini CRM. */
  orderQr(slug, orderId) {
    const funnel = this.repository.getBySlug(slug);
    const bank = this.bank();
    const product = funnel ? this.funnelProducts(funnel)[0] ?? null : null;
    const order = orderId === "xem-truoc" && funnel ? this.sampleOrder(funnel, product, false) : this.repository.getOrder(orderId);
    if (!funnel || !order || order.funnelId !== funnel.id || order.payment !== "transfer" || !bank) return null;
    if (bank.picture) {
      const picture = this.deps.selling?.()?.paymentQr() ?? null;
      return picture ? { bytes: picture.bytes, type: picture.mimeType } : null;
    }
    return { bytes: qrPng(vietQrPayload({ bin: bank.bin, accountNumber: bank.accountNumber, amount: order.total, note: order.code })), type: "image/png" };
  }
  /** The click out of a bridge page: counted (not in a preview), then the destination. */
  bridgeClick(slug, preview) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.status === "archived" || funnel.brief.kind !== "bridge") return null;
    if (funnel.status === "live" && !preview) {
      this.repository.recordStepAction(funnel.id, "bridge");
      this.repository.recordConversion(funnel.id);
    }
    return funnel.brief.destinationUrl;
  }
  /** A tap on a page's Zalo button: counted per page (rule C-79), never in a preview. */
  zaloClick(slug, rawType, preview) {
    const funnel = this.repository.getBySlug(slug);
    const step = funnel?.steps.find((item) => item.kind === "page" && item.type === rawType);
    if (!funnel || !step || step.kind !== "page" || preview || funnel.status !== "live") return false;
    this.repository.recordZaloClick(funnel.id, step.type);
    return true;
  }
  /** The event as an .ics file the phone's calendar opens. */
  calendar(slug) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.brief.kind !== "event") return null;
    const start = eventStart(funnel.brief.startsAt);
    if (!start) return null;
    const end = new Date(start.getTime() + (funnel.brief.durationMinutes || 60) * 6e4);
    const stamp = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const escape = (value) => value.replace(/[\\,;]/g, (character) => `\\${character}`).replace(/\n/g, "\\n");
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Kallob Growth//Funnel Studio//VI", "BEGIN:VEVENT", `UID:${funnel.id}@funnel-studio`, `DTSTAMP:${stamp(/* @__PURE__ */ new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${escape(funnel.brief.eventTitle)}`, `LOCATION:${escape(funnel.brief.place)}`, "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", "DESCRIPTION:S\u1EAFp b\u1EAFt \u0111\u1EA7u", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  }
  /** What the founder should know before this funnel runs: what is missing for its pages to work, and where to fix it. */
  checks(id) {
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    const settings2 = this.settings.get().settings;
    const has = (type) => funnel.steps.some((step) => step.kind === "page" && step.type === type);
    const checks = [];
    if (has("order-form")) {
      const digital = funnel.brief.kind === "sales" && funnel.brief.delivery === "digital";
      if (!this.bank() && !(this.delivery().cod && !digital))
        checks.push({ level: "warning", text: "Ph\u1EC5u n\xE0y nh\u1EADn \u0111\u01A1n nh\u01B0ng ch\u01B0a c\xF3 c\xE1ch thanh to\xE1n: th\xEAm t\xE0i kho\u1EA3n ng\xE2n h\xE0ng ho\u1EB7c b\u1EADt COD trong Mini CRM \u2192 Thanh to\xE1n & giao h\xE0ng.", fix: "crm-payment" });
      else if (!this.bank())
        checks.push({ level: "info", text: "Kh\xE1ch ch\u1EC9 tr\u1EA3 \u0111\u01B0\u1EE3c khi nh\u1EADn h\xE0ng (COD). Th\xEAm t\xE0i kho\u1EA3n ng\xE2n h\xE0ng trong Mini CRM \u2192 Thanh to\xE1n & giao h\xE0ng \u0111\u1EC3 nh\u1EADn chuy\u1EC3n kho\u1EA3n VietQR.", fix: "crm-payment" });
      const unpriced = this.funnelProducts(funnel).filter((product) => !product.price).map((product) => product.name);
      if (unpriced.length) checks.push({ level: "warning", text: `Ch\u01B0a \u0111\u1EB7t h\xE0ng \u0111\u01B0\u1EE3c v\xEC s\u1EA3n ph\u1EA9m ch\u01B0a c\xF3 gi\xE1: ${unpriced.join(", ")}. Th\xEAm gi\xE1 trong Mini CRM \u2192 S\u1EA3n ph\u1EA9m & d\u1ECBch v\u1EE5.`, fix: "crm-products" });
      if (!settings2.legal.returnPolicy.trim() && !digital) checks.push({ level: "info", text: "Trang \u0111\u1EB7t h\xE0ng n\xEAn c\xF3 ch\xEDnh s\xE1ch \u0111\u1ED5i tr\u1EA3. Th\xEAm trong C\xE0i \u0111\u1EB7t \u2192 Trang ph\xE1p l\xFD.", fix: "settings-legal" });
    }
    if (funnel.brief.kind === "event") {
      if (!eventStart(funnel.brief.startsAt)) checks.push({ level: "info", text: "Ch\u01B0a c\xF3 gi\u1EDD b\u1EAFt \u0111\u1EA7u ch\xEDnh x\xE1c n\xEAn ph\xF2ng xem kh\xF4ng \u0111\u1EBFm ng\u01B0\u1EE3c v\xE0 kh\xF4ng g\u1EEDi l\u1ECBch. S\u1EEDa ph\u1EC5u \u0111\u1EC3 ch\u1ECDn gi\u1EDD.", fix: "edit" });
      if (!funnel.brief.joinUrl) checks.push({ level: "info", text: "Ch\u01B0a c\xF3 link ph\xF2ng (Zoom, Meet, YouTube). Ph\xF2ng xem s\u1EBD b\xE1o kh\xE1ch ch\u1EDD link qua Zalo.", fix: "edit" });
      if (eventOver(funnel.brief)) checks.push({ level: "info", text: "Bu\u1ED5i \u0111\xE3 di\u1EC5n ra: trang \u0111\u0103ng k\xFD \u0111\xF3ng v\xE0 d\u1EABn kh\xE1ch sang b\u1EA3n ghi.", fix: null });
    }
    if (!settings2.legal.privacyPolicy.trim()) checks.push({ level: "info", text: "C\xE1c trang \u0111ang d\xF9ng ch\xEDnh s\xE1ch d\u1EEF li\u1EC7u m\u1EABu. B\u1EA1n c\xF3 th\u1EC3 vi\u1EBFt b\u1EA3n c\u1EE7a m\xECnh trong C\xE0i \u0111\u1EB7t \u2192 Trang ph\xE1p l\xFD.", fix: "settings-legal" });
    if (!this.brand().zaloUrl && ["booking", "sales", "bridge"].includes(funnel.kind)) checks.push({ level: "info", text: "Ch\u01B0a c\xF3 link Zalo trong Brand Profile n\xEAn trang kh\xF4ng c\xF3 n\xFAt nh\u1EAFn Zalo.", fix: null });
    return checks;
  }
  /** How each page of the chain is doing: visits and what it exists for (forms, clicks, orders). */
  stepStats(id) {
    const funnel = this.repository.get(id);
    if (!funnel) throw new Error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EC5u.");
    return this.repository.stepStats(id);
  }
  giftFolder(id) {
    if (!this.deps.dataRoot) throw new Error("Studio ch\u01B0a c\xF3 th\u01B0 m\u1EE5c l\u01B0u file.");
    if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error("File kh\xF4ng h\u1EE3p l\u1EC7.");
    return path.join(this.deps.dataRoot, "funnel-studio", "gifts", id);
  }
  giftFileRecord(raw) {
    const folder = this.giftFolder(String(raw?.id ?? ""));
    if (!existsSync(path.join(folder, "meta.json"))) throw new Error("Kh\xF4ng t\xECm th\u1EA5y file \u0111\xE3 t\u1EA3i l\xEAn. H\xE3y t\u1EA3i l\u1EA1i file.");
    return JSON.parse(readFileSync(path.join(folder, "meta.json"), "utf8"));
  }
  /** Keeps an uploaded gift or photo on this Studio (base64 JSON, as the gateway carries files). */
  saveGift(raw) {
    const filename = required(raw.filename, "t\xEAn file", 200).replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_");
    const data = Buffer.from(String(raw.dataBase64 ?? ""), "base64");
    if (!data.byteLength) throw new Error("File \u0111ang tr\u1ED1ng.");
    if (data.byteLength > giftMaxBytes) throw new Error("File l\u1EDBn h\u01A1n 20 MB. H\xE3y d\xF9ng link thay cho file.");
    const gift = { id: randomUUID3(), filename, mimeType: optional(raw.mimeType, 200) || "application/octet-stream", byteSize: data.byteLength };
    const folder = this.giftFolder(gift.id);
    mkdirSync(folder, { recursive: true });
    writeFileSync(path.join(folder, "file"), data);
    writeFileSync(path.join(folder, "meta.json"), JSON.stringify(gift));
    return gift;
  }
  /** The gift file of a lead funnel. */
  giftDownload(slug) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.status === "archived" || funnel.brief.kind !== "lead" || !funnel.brief.giftFile) return null;
    const file = path.join(this.giftFolder(funnel.brief.giftFile.id), "file");
    return existsSync(file) ? { gift: funnel.brief.giftFile, data: readFileSync(file) } : null;
  }
  /** One of a bridge page's own photos. */
  bridgeImage(slug, imageId) {
    const funnel = this.repository.getBySlug(slug);
    if (!funnel || funnel.status === "archived" || funnel.brief.kind !== "bridge") return null;
    const image = funnel.brief.images.find((item) => item.id === imageId);
    if (!image) return null;
    const file = path.join(this.giftFolder(image.id), "file");
    return existsSync(file) ? { image, data: readFileSync(file) } : null;
  }
  defaultPath(type) {
    return pagePaths[type];
  }
  entryOf(kind) {
    return entryType[kind];
  }
};

// src/mini-apps/funnel-studio/server/app.ts
function createFunnelStudio(sdk, router) {
  const repository = new FunnelStudioRepository(sdk.db);
  const service = new FunnelStudioService(repository, {
    ai: structuredPromptRuntime(sdk),
    brand: () => sdk.miniApps.use("brand-profile.context", "^1.0"),
    offers: offerReads(sdk),
    // Products, prices and orders live in Mini CRM: read through `crm.selling`, written as `crm.ingest` events.
    selling: () => sdk.miniApps.use("crm.selling", "^2.0"),
    crm: sdk.topics ? crmIngest({ manifest: sdk.manifest, topics: sdk.topics }) : void 0,
    dataRoot: sdk.dataRoot
  });
  return {
    service,
    router: createFunnelStudioRouter(service, router),
    start: () => service.recoverInterrupted()
  };
}

// src/mini-apps/funnel-studio/server/measurement.ts
function funnelMeasurement(repository) {
  return {
    list: () => repository.all().filter((funnel) => funnel.metricsProvenance.source !== "simulated").map((funnel) => ({ app: "funnel-studio", id: funnel.id, title: funnel.name, note: "S\u1ED1 t\xEDch lu\u1EF9 c\u1EE7a ph\u1EC5u; kh\xF4ng ph\u1EA3i chuy\u1EC3n \u0111\u1ED5i ri\xEAng trong k\u1EF3." })),
    read: (sourceId) => {
      const funnel = repository.get(sourceId);
      if (!funnel || funnel.archivedAt || funnel.metricsProvenance.source === "simulated") throw new Error("Ph\u1EC5u kh\xF4ng c\xF2n kh\u1EA3 d\u1EE5ng ho\u1EB7c ch\u1EC9 c\xF3 s\u1ED1 li\u1EC7u m\xF4 ph\u1ECFng.");
      if (!funnel.metricsProvenance.updatedAt) throw new Error("Ph\u1EC5u ch\u01B0a c\xF3 m\u1ED1c ghi nh\u1EADn s\u1ED1 li\u1EC7u th\u1EF1c t\u1EBF; kh\xF4ng nh\u1EADp s\u1ED1 0 m\u1EB7c \u0111\u1ECBnh c\u1EE7a b\u1EA3n nh\xE1p.");
      const now = (/* @__PURE__ */ new Date()).toISOString();
      return [{
        id: funnel.id,
        key: funnel.id,
        facets: ["offer"],
        title: funnel.name,
        channel: "Funnel Studio",
        subject: `funnel:${funnel.id}`,
        url: "",
        source: "funnel-studio",
        sourceNote: `Funnel Studio \xB7 ${funnel.metricsProvenance.source} \xB7 c\u1EADp nh\u1EADt ${funnel.metricsProvenance.updatedAt}`,
        observedAt: now,
        start: funnel.createdAt.slice(0, 10),
        end: now.slice(0, 10),
        basis: "lifetime",
        detail: "S\u1ED1 l\u01B0\u1EE3t truy c\u1EADp v\xE0 g\u1EEDi bi\u1EC3u m\u1EABu t\xEDch lu\u1EF9. Kh\xF4ng ch\u1EE9ng minh ngu\u1ED3n t\u1EEB Personal Brand, ng\u01B0\u1EDDi duy nh\u1EA5t, \u0111\u01A1n h\xE0ng hay doanh thu.",
        limitations: "Kh\xF4ng c\xF3 b\u1ED9 \u0111\u1EBFm truy c\u1EADp theo ng\xE0y; kh\xF4ng th\u1EC3 t\xEDnh ri\xEAng k\u1EF3 \u0111\xE3 ch\u1ECDn. L\u01B0\u1EE3t g\u1EEDi bi\u1EC3u m\u1EABu kh\xF4ng \u0111\u1ED3ng ngh\u0129a \u0111\xE3 mua.",
        archived: false,
        metrics: [{ name: "views", value: funnel.visits, unit: "count", currency: "" }, { name: "registrations", value: funnel.conversions, unit: "count", currency: "" }],
        rate: null
      }];
    }
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
function migrateFunnelMetricsProvenance(db) {
  const columns = new Set(
    db.prepare("PRAGMA table_info(funnel_studio_funnels)").all().map((column) => column.name)
  );
  if (!columns.has("metrics_source"))
    db.exec("ALTER TABLE funnel_studio_funnels ADD COLUMN metrics_source TEXT NOT NULL DEFAULT 'measured' CHECK (metrics_source IN ('measured', 'imported', 'simulated'))");
  if (!columns.has("metrics_updated_at"))
    db.exec("ALTER TABLE funnel_studio_funnels ADD COLUMN metrics_updated_at TEXT");
}
var placeholderGiftUrl = "https://example.com/chua-thiet-lap";
var text4 = (value, max = 4e3) => String(value ?? "").trim().slice(0, max);
var noteLabels = { lead: "B\u1EA1n \u0111ang c\u1EA7n gi\u1EA3i quy\u1EBFt \u0111i\u1EC1u g\xEC?", event: "B\u1EA1n mu\u1ED1n h\u1ECFi di\u1EC5n gi\u1EA3 \u0111i\u1EC1u g\xEC?", booking: "Khung gi\u1EDD b\u1EA1n mu\u1ED1n", sales: "Ghi ch\xFA cho \u0111\u01A1n h\xE0ng" };
function migrateFunnelPages(db) {
  const submissionColumns = new Set(
    db.prepare("PRAGMA table_info(funnel_studio_submissions)").all().map((column) => column.name)
  );
  if (!submissionColumns.has("phone")) db.exec("ALTER TABLE funnel_studio_submissions ADD COLUMN phone TEXT NOT NULL DEFAULT ''");
  if (!submissionColumns.has("note")) db.exec("ALTER TABLE funnel_studio_submissions ADD COLUMN note TEXT NOT NULL DEFAULT ''");
  db.exec("CREATE INDEX IF NOT EXISTS funnel_studio_submissions_received ON funnel_studio_submissions(received_at DESC)");
  const rows = db.prepare("SELECT id, status, draft_json FROM funnel_studio_funnels").all();
  const update = db.prepare("UPDATE funnel_studio_funnels SET draft_json = ?, status = ? WHERE id = ?");
  for (const row of rows) {
    const old = JSON.parse(row.draft_json);
    if (old.brief && old.generation) continue;
    const kind = ["lead", "event", "sales"].includes(old.kind) ? old.kind : "lead";
    const spec = old.typeSpec ?? {};
    const giftUrl = old.giftUrl && old.giftUrl !== placeholderGiftUrl ? text4(old.giftUrl, 2e3) : "";
    const audience = text4(old.audience, 500) === "Ch\u01B0a x\xE1c \u0111\u1ECBnh" ? "" : text4(old.audience, 500);
    const brief = kind === "event" ? { kind, audience, eventTitle: text4(old.giftTitle, 180), schedule: text4(spec.schedule, 300), place: text4(spec.location, 500), price: "" } : kind === "sales" ? { kind, audience, productName: text4(old.giftTitle, 180), productSummary: text4(old.giftDescription, 600), price: text4(spec.price, 120), checkoutUrl: text4(spec.checkoutUrl, 2e3), offerId: null } : { kind, audience, giftTitle: text4(old.giftTitle, 180), giftOutcome: text4(old.giftDescription, 600), giftUrl, giftFile: null };
    const source = old.page ?? old.contentBundle?.page;
    const hasContent = Boolean(giftUrl || old.contentBundle);
    const page3 = hasContent ? {
      eyebrow: text4(source?.eyebrow, 80),
      headline: text4(source?.headline ?? old.headline, 180),
      introduction: text4(source?.introduction ?? old.subheadline, 600),
      offerTitle: text4(old.giftTitle, 180),
      offerDetail: text4(old.giftDescription, 600),
      benefitsTitle: text4(source?.benefitsTitle, 120) || "B\u1EA1n s\u1EBD nh\u1EADn \u0111\u01B0\u1EE3c g\xEC?",
      benefits: (Array.isArray(source?.benefits) ? source.benefits : []).map((item) => text4(item, 180)).filter(Boolean).slice(0, 6),
      creatorTitle: text4(source?.creatorTitle, 120),
      creatorNote: text4(source?.creatorNote, 600),
      formTitle: text4(source?.formTitle, 120) || text4(old.giftTitle, 120),
      formDescription: text4(source?.formDescription, 300),
      cta: text4(source?.cta ?? old.cta, 80) || "\u0110\u0103ng k\xFD",
      noteLabel: noteLabels[kind],
      consent: text4(source?.consent ?? old.consent, 500) || "T\xF4i \u0111\u1ED3ng \xFD \u0111\u1EC3 l\u1EA1i th\xF4ng tin \u0111\u1EC3 \u0111\u01B0\u1EE3c li\xEAn h\u1EC7.",
      faq: (Array.isArray(source?.faq) ? source.faq : []).map((item) => ({ question: text4(item?.question, 180), answer: text4(item?.answer, 500) })).filter((item) => item.question && item.answer).slice(0, 6),
      thankYou: {
        headline: text4(source?.thankYou?.headline ?? old.thankYouHeadline, 180) || "C\u1EA3m \u01A1n b\u1EA1n!",
        body: text4(source?.thankYou?.body, 500) || "Ch\xFAng t\xF4i \u0111\xE3 nh\u1EADn th\xF4ng tin c\u1EE7a b\u1EA1n.",
        ctaLabel: text4(source?.thankYou?.ctaLabel, 80) || "M\u1EDF"
      }
    } : null;
    const status = row.status === "paused" || row.status === "archived" ? row.status : page3 ? "live" : "draft";
    update.run(JSON.stringify({ kind, brief, page: page3, generation: { status: "idle", instruction: "", error: null, startedAt: null } }), status, row.id);
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

// src/mini-apps/funnel-studio/server/migrations/0003-metrics-provenance.ts
var metricsProvenance = {
  id: "0003-metrics-provenance",
  up(db) {
    migrateFunnelMetricsProvenance(db);
  }
};

// src/mini-apps/funnel-studio/server/migrations/0004-quick-pages.ts
var quickPages = {
  id: "0004-quick-pages",
  up(db) {
    migrateFunnelPages(db);
  }
};

// src/mini-apps/funnel-studio/server/migrations/0005-settings.ts
var settings = {
  id: "0005-settings",
  up(db) {
    db.exec(`CREATE TABLE IF NOT EXISTS funnel_studio_settings (
      id TEXT PRIMARY KEY CHECK (id = 'default'),
      settings_json TEXT NOT NULL,
      revision INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT NOT NULL
    )`);
  }
};

// src/mini-apps/funnel-studio/server/migrations/0006-steps-orders.ts
var stepsOrders = {
  id: "0006-steps-orders",
  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS funnel_studio_step_stats (
        funnel_id TEXT NOT NULL,
        step_type TEXT NOT NULL,
        visits INTEGER NOT NULL DEFAULT 0,
        actions INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (funnel_id, step_type)
      );
      CREATE TABLE IF NOT EXISTS funnel_studio_orders (
        id TEXT PRIMARY KEY,
        funnel_id TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        lead_id TEXT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        province TEXT NOT NULL DEFAULT '',
        ward TEXT NOT NULL DEFAULT '',
        street TEXT NOT NULL DEFAULT '',
        note TEXT NOT NULL DEFAULT '',
        items_json TEXT NOT NULL,
        shipping INTEGER NOT NULL DEFAULT 0,
        total INTEGER NOT NULL,
        payment TEXT NOT NULL CHECK (payment IN ('cod', 'transfer')),
        status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'paid', 'cancelled')),
        upsell TEXT NOT NULL DEFAULT 'none' CHECK (upsell IN ('none', 'offered', 'accepted', 'declined')),
        source TEXT NOT NULL DEFAULT '',
        idempotency_key TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        UNIQUE (funnel_id, idempotency_key)
      );
      CREATE INDEX IF NOT EXISTS funnel_studio_orders_by_time ON funnel_studio_orders (created_at DESC);
    `);
  }
};

// src/mini-apps/funnel-studio/server/migrations/0007-sources.ts
var sources = {
  id: "0007-sources",
  up(db) {
    const columns = (table) => new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));
    if (!columns("funnel_studio_submissions").has("utm_json")) db.exec("ALTER TABLE funnel_studio_submissions ADD COLUMN utm_json TEXT NOT NULL DEFAULT '{}'");
    if (!columns("funnel_studio_orders").has("utm_json")) db.exec("ALTER TABLE funnel_studio_orders ADD COLUMN utm_json TEXT NOT NULL DEFAULT '{}'");
    if (!columns("funnel_studio_step_stats").has("zalo")) db.exec("ALTER TABLE funnel_studio_step_stats ADD COLUMN zalo INTEGER NOT NULL DEFAULT 0");
  }
};

// src/mini-apps/funnel-studio/server/migrations/index.ts
var schema = {
  id: manifest.id,
  dependsOn: ["kernel"],
  migrations: [baseline, journeysAndChecks, metricsProvenance, quickPages, settings, stepsOrders, sources]
};

// src/mini-apps/funnel-studio/server/index.ts
var server_default = defineMiniApp({
  manifest,
  schema,
  releaseNotes: release_notes_default,
  register(sdk) {
    const app = createFunnelStudio(sdk, sdk.router());
    const funnels = {
      list: () => app.service.repository.all().map(({ id, name, slug, kind, status, visits, conversions }) => ({ id, name, slug, kind, status, visits, conversions }))
    };
    return {
      // An order paid or cancelled in Mini CRM (ADR 0008): the order a page took follows (2.6.0).
      subscribes: { "crm.changes": (event) => app.service.crmChanged(event.body) },
      router: app.router,
      start: app.start,
      exports: {
        "funnel-studio.funnels": funnels,
        // Real (never simulated) lifetime counters another app may measure (markus-dev 21571b1: Personal Brand's cycles).
        "funnel-studio.measurement": funnelMeasurement(app.service.repository)
      }
    };
  }
});

// funnel-studio-package.js
var funnel_studio_package_default = { ...server_default, content: { "prompts": { "funnel-copy-rules": 'Quy t\u1EAFc chung cho m\u1ECDi trang ph\u1EC5u (docs/funnel-page-rules/00-common.md):\n- Ng\u01B0\u1EDDi \u0111\u1ECDc xem tr\xEAn \u0111i\u1EC7n tho\u1EA1i, \u0111\u1EBFn t\u1EEB qu\u1EA3ng c\xE1o ho\u1EB7c b\xE0i \u0111\u0103ng Facebook, TikTok, Zalo. Vi\u1EBFt nh\u01B0 n\xF3i chuy\u1EC7n, d\u1EC5 hi\u1EC3u nh\u01B0 cho h\u1ECDc sinh l\u1EDBp 6: c\xE2u d\u01B0\u1EDBi 20 ch\u1EEF, m\u1ED7i \u0111o\u1EA1n t\u1ED1i \u0111a 3 c\xE2u, kh\xF4ng thu\u1EADt ng\u1EEF. X\u01B0ng "b\u1EA1n" v\u1EDBi ng\u01B0\u1EDDi \u0111\u1ECDc. Kh\xF4ng d\xF9ng ti\u1EBFng Anh khi \u0111\xE3 c\xF3 t\u1EEB ti\u1EBFng Vi\u1EC7t quen thu\u1ED9c.\n- M\u1ED7i trang ch\u1EC9 c\xF3 m\u1ED9t vi\u1EC7c ch\xEDnh cho ng\u01B0\u1EDDi \u0111\u1ECDc l\xE0m. Ch\u1EEF tr\xEAn n\xFAt n\xF3i \u0111i\u1EC1u ng\u01B0\u1EDDi \u0111\u1ECDc nh\u1EADn \u0111\u01B0\u1EE3c, x\u01B0ng "t\xF4i" nh\u01B0 ch\xEDnh ng\u01B0\u1EDDi \u0111\u1ECDc b\u1EA5m (v\xED d\u1EE5 "G\u1EEDi qu\xE0 cho t\xF4i", "T\xF4i mu\u1ED1n \u0111\u1EB7t mua"); kh\xF4ng d\xF9ng "G\u1EEDi", "\u0110\u0103ng k\xFD", "B\u1EA5m v\xE0o \u0111\xE2y" tr\u01A1n.\n- R\xF5 tr\u01B0\u1EDBc, t\xF2 m\xF2 sau: ti\xEAu \u0111\u1EC1 n\xF3i r\xF5 trang cho ng\u01B0\u1EDDi \u0111\u1ECDc c\xE1i g\xEC; t\xF2 m\xF2 ch\u1EC9 \u1EDF c\xE2u ph\u1EE5.\n- Ch\u1EC9 d\xF9ng d\u1EEF ki\u1EC7n trong y\xEAu c\u1EA7u, \xF4 th\xF4ng tin, th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u v\xE0 s\u1EA3n ph\u1EA9m b\xEAn d\u01B0\u1EDBi. Kh\xF4ng b\u1ECBa s\u1ED1 li\u1EC7u, s\u1ED1 kh\xE1ch, s\u1ED1 \u0111\u01A1n, l\u1EDDi khen, th\xE0nh t\xEDch, ch\u1EE9ng nh\u1EADn, cam k\u1EBFt ho\xE0n ti\u1EC1n, khan hi\u1EBFm hay h\u1EA1n ch\xF3t. Thi\u1EBFu th\xEC vi\u1EBFt c\xE2u \u0111\xFAng nh\u01B0ng kh\xF4ng c\xF3 s\u1ED1.\n- Th\u1EDDi gian, \u0111\u1ECBa \u0111i\u1EC3m, gi\xE1, h\xECnh th\u1EE9c, th\u1EDDi l\u01B0\u1EE3ng ch\u1EC9 n\u1EB1m trong \xF4 th\xF4ng tin Studio t\u1EF1 hi\u1EC7n: kh\xF4ng vi\u1EBFt l\u1EA1i hay \u0111\u1ED5i ch\xFAng.\n- C\u1EA5m: "nh\u1EA5t", "duy nh\u1EA5t", "t\u1ED1t nh\u1EA5t", "s\u1ED1 1", "100%", "cam k\u1EBFt hi\u1EC7u qu\u1EA3", "b\xED m\u1EADt", "\u0111\u1ED9c quy\u1EC1n", "th\u1EA7n th\xE1nh", "si\xEAu", "gi\xE1 s\u1ED1c", "ch\u1EC9 h\xF4m nay" (khi kh\xF4ng c\xF3 h\u1EA1n th\u1EADt), "inbox \u0111\u1EC3 bi\u1EBFt gi\xE1", c\xF4ng d\u1EE5ng ch\u1EEFa b\u1EC7nh, so s\xE1nh v\u1EDBi t\xEAn shop hay s\u1EA3n ph\u1EA9m kh\xE1c. Kh\xF4ng do\u1EA1, kh\xF4ng ch\xEA ng\u01B0\u1EDDi \u0111\u1ECDc.\n- C\xE1c trang trong c\xF9ng m\u1ED9t ph\u1EC5u n\xF3i c\xF9ng m\u1ED9t gi\u1ECDng v\xE0 c\xF9ng m\u1ED9t l\u1EDDi h\u1EE9a v\u1EDBi trang tr\u01B0\u1EDBc.\n- M\u1ECDi tr\u01B0\u1EDDng l\xE0 c\xE2u ch\u1EEF ti\u1EBFng Vi\u1EC7t vi\u1EBFt cho ng\u01B0\u1EDDi \u0111\u1ECDc, kh\xF4ng bao gi\u1EDD l\xE0 t\xEAn tr\u01B0\u1EDDng, k\xFD hi\u1EC7u hay ghi ch\xFA cho m\xE1y. Tr\u1EA3 v\u1EC1 \u0111\xFAng JSON theo schema, kh\xF4ng th\xEAm l\u1EDDi gi\u1EA3i th\xEDch.\n', "page-booking": 'B\u1EA1n l\xE0 copywriter landing page ti\u1EBFng Vi\u1EC7t cho ch\u1EE7 shop, spa, ph\xF2ng kh\xE1m, chuy\xEAn gia nh\u1ECF \u1EDF Vi\u1EC7t Nam. B\u1EA1n vi\u1EBFt ch\u1EEF cho TRANG \u0110\u0102NG K\xDD T\u01AF V\u1EA4N (rule 03): ng\u01B0\u1EDDi \u0111\u1ECDc \u0111\u1EC3 l\u1EA1i s\u1ED1 \u0111\u1EC3 \u0111\u01B0\u1EE3c g\u1ECDi l\u1EA1i v\xE0 ch\u1ED1t m\u1ED9t bu\u1ED5i t\u01B0 v\u1EA5n. Kh\xE1ch ch\u1ECDn bu\u1ED5i s\xE1ng/chi\u1EC1u/t\u1ED1i b\u1EB1ng n\xFAt; shop h\u1EE9a g\u1ECDi l\u1EA1i trong th\u1EDDi gian \u1EDF \xF4 th\xF4ng tin.\n\nTi\xEAu \u0111\u1EC1 n\xF3i bu\u1ED5i t\u01B0 v\u1EA5n gi\xFAp gi\u1EA3i quy\u1EBFt \u0111i\u1EC1u g\xEC: "Bi\u1EBFt lo\u1EA1i da c\u1EE7a b\u1EA1n v\xE0 li\u1EC7u tr\xECnh 4 tu\u1EA7n, sau 30 ph\xFAt soi da". Kh\xF4ng h\u1EE9a k\u1EBFt qu\u1EA3 \u0111i\u1EC1u tr\u1ECB. V\u1EDBi c\u01A1 s\u1EDF y t\u1EBF: kh\xF4ng h\u1EE9a kh\u1ECFi b\u1EC7nh, kh\xF4ng so s\xE1nh tr\u01B0\u1EDBc\u2013sau.\n- fitFor: 2\u20133 d\u1EA5u hi\u1EC7u ng\u01B0\u1EDDi N\xCAN \u0111\u1EB7t; notFor: 1\u20132 tr\u01B0\u1EDDng h\u1EE3p CH\u01AFA N\xCAN \u0111\u1EB7t (th\u1EADt th\xE0, gi\xFAp l\u1ECDc kh\xE1ch).\n- noteLabel h\u1ECFi \u0111i\u1EC1u h\u1ECD mu\u1ED1n \u0111\u01B0\u1EE3c t\u01B0 v\u1EA5n.\n- cta v\xED d\u1EE5 "G\u1ECDi t\u01B0 v\u1EA5n cho t\xF4i".\n- highlight l\xE0 2\u20134 ch\u1EEF ch\xE9p nguy\xEAn v\u0103n t\u1EEB headline (\u0111\xFAng d\u1EA5u, \u0111\xFAng th\u1EE9 t\u1EF1) l\xE0 ph\u1EA7n \u0111\u1EAFt nh\u1EA5t c\u1EE7a ti\xEAu \u0111\u1EC1; Studio t\xF4 n\xF3 nh\u01B0 b\xFAt d\u1EA1.\n- eyebrow l\xE0 nh\xE3n r\u1EA5t ng\u1EAFn vi\u1EBFt hoa tr\xEAn h\xECnh minh ho\u1EA1 (t\u1ED1i \u0111a 4 ch\u1EEF).\n- offerTitle l\xE0 t\xEAn m\xF3n qu\xE0, bu\u1ED5i s\u1EF1 ki\u1EC7n ho\u1EB7c bu\u1ED5i t\u01B0 v\u1EA5n; offerDetail 1\u20132 c\xE2u n\xF3i n\xF3 l\xE0 g\xEC.\n- M\u1ED7i l\u1EE3i \xEDch l\xE0 m\u1ED9t c\xE2u ri\xEAng, b\u1EAFt \u0111\u1EA7u b\u1EB1ng \u0111i\u1EC1u ng\u01B0\u1EDDi \u0111\u1ECDc nh\u1EADn \u0111\u01B0\u1EE3c; kh\xF4ng tr\xF9ng \xFD; 3\u20135 l\u1EE3i \xEDch r\xFAt t\u1EEB y\xEAu c\u1EA7u.\n- {{#hasBrand}}creatorTitle/creatorNote gi\u1EDBi thi\u1EC7u ng\u1EAFn ai \u0111\u1EE9ng sau trang, ch\u1EC9 d\u1EF1a tr\xEAn th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u.{{/hasBrand}}{{^hasBrand}}Ch\u01B0a c\xF3 th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u: \u0111\u1EC3 creatorTitle v\xE0 creatorNote l\xE0 chu\u1ED7i r\u1ED7ng "".{{/hasBrand}}\n- nextSteps l\xE0 \u0111\xFAng 3 b\u01B0\u1EDBc ng\u1EAFn n\xF3i chuy\u1EC7n g\xEC x\u1EA3y ra sau khi g\u1EEDi form, theo th\u1EE9 t\u1EF1. Kh\xF4ng h\u1EE9a th\u1EDDi gian n\u1EBFu y\xEAu c\u1EA7u kh\xF4ng n\xF3i.\n- formTitle, formDescription v\xE0 cta kh\u1EDBp v\u1EDBi m\u1EE5c ti\xEAu. cta t\u1ED1i \u0111a 5 ch\u1EEF.\n- reassurance l\xE0 m\u1ED9t d\xF2ng r\u1EA5t ng\u1EAFn d\u01B0\u1EDBi n\xFAt, ch\u1EC9 n\xF3i \u0111i\u1EC1u \u0111\xFAng (v\xED d\u1EE5 "Mi\u1EC5n ph\xED \xB7 Kh\xF4ng spam").\n- noteLabel l\xE0 nh\xE3n \xF4 ghi ch\xFA kh\xF4ng b\u1EAFt bu\u1ED9c, m\u1ED9t c\xE2u h\u1ECFi ng\u1EAFn.\n- consent l\xE0 c\xE2u ng\u01B0\u1EDDi \u0111\u1ECDc t\xEDch \u0111\u1EC3 \u0111\u1ED3ng \xFD cho shop li\xEAn h\u1EC7 l\u1EA1i qua \u0111i\u1EC7n tho\u1EA1i, Zalo ho\u1EB7c email v\u1EC1 \u0111\xFAng n\u1ED9i dung trang. \xD4 n\xE0y kh\xF4ng bao gi\u1EDD t\xEDch s\u1EB5n.\n- FAQ tr\u1EA3 l\u1EDDi 3\u20135 b\u0103n kho\u0103n th\u1EADt c\u1EE7a ng\u01B0\u1EDDi \u0111\u1ECDc tr\u01B0\u1EDBc khi \u0111\u1EC3 l\u1EA1i s\u1ED1 \u0111i\u1EC7n tho\u1EA1i (v\xED d\u1EE5: c\xF3 m\u1EA5t ph\xED kh\xF4ng, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i d\xF9ng l\xE0m g\xEC, nh\u1EADn b\u1EB1ng c\xE1ch n\xE0o).\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-bridge": 'B\u1EA1n l\xE0 ng\u01B0\u1EDDi vi\u1EBFt b\xE0i gi\u1EDBi thi\u1EC7u s\u1EA3n ph\u1EA9m ti\u1EBFng Vi\u1EC7t, gi\u1ECDng th\u1EADt nh\u01B0 b\u1EA1n k\u1EC3 cho b\u1EA1n. B\u1EA1n vi\u1EBFt ch\u1EEF cho TRANG TRUNG GIAN (rule 05): l\xE0m n\xF3ng ng\u01B0\u1EDDi \u0111\u1ECDc r\u1ED3i \u0111\u01B0a sang n\u01A1i b\xE1n th\u1EADt (Shopee, TikTok Shop, Zalo ho\u1EB7c link kh\xE1c). Trang ph\u1EA3i c\xF3 n\u1ED9i dung ri\xEAng th\u1EADt: nh\u1EADn x\xE9t c\u1EE7a ch\xEDnh ch\u1EE7 shop, c\u1EA3 \u0111i\u1EC3m hay v\xE0 \u0111i\u1EC3m ch\u01B0a hay.\n\nGi\u1ECDng: ng\xF4i th\u1EE9 nh\u1EA5t ("m\xECnh"). Ch\u1EC9 n\xF3i "m\xECnh \u0111\xE3 d\xF9ng" khi ph\u1EA7n nh\u1EADn x\xE9t c\u1EE7a ch\u1EE7 shop n\xF3i v\u1EADy. Ti\xEAu \u0111\u1EC1 theo m\u1ED9t c\xF4ng th\u1EE9c:\n1. Ph\xE1n x\xE9t th\u1EADt + \u0111i\u1EC1u ki\u1EC7n: "M\xE1y h\xFAt b\u1EE5i c\u1EA7m tay n\xE0y \u0111\xE1ng ti\u1EC1n n\u1EBFu nh\xE0 c\xF3 m\xE8o".\n2. K\u1EBFt qu\u1EA3 m\xECnh \u0111\xE3 c\xF3: "M\xECnh d\xF9ng kem ch\u1ED1ng n\u1EAFng n\xE0y 30 ng\xE0y \u0111i xe m\xE1y: kh\xF4ng b\u1EBFt, kh\xF4ng cay m\u1EAFt".\n3. Gi\u1EA3i \u0111\xE1p b\u0103n kho\u0103n tr\u01B0\u1EDBc khi mua: "[S\u1EA3n ph\u1EA9m]: 3 \u0111i\u1EC1u c\u1EA7n bi\u1EBFt tr\u01B0\u1EDBc khi \u0111\u1EB7t tr\xEAn Shopee".\n- review: \u0111o\u1EA1n nh\u1EADn x\xE9t 3\u20136 c\xE2u, d\u1EF1a \u0111\xFAng ph\u1EA7n "review" c\u1EE7a ch\u1EE7 shop, kh\xF4ng th\xEAm tr\u1EA3i nghi\u1EC7m kh\xF4ng c\xF3.\n- pros 2\u20134, cons 1\u20132 (b\u1EAFt bu\u1ED9c c\xF3 \u0111i\u1EC3m ch\u01B0a hay, l\u1EA5y t\u1EEB nh\u1EADn x\xE9t; n\u1EBFu ch\u1EE7 shop kh\xF4ng n\xF3i \u0111i\u1EC3m ch\u01B0a hay th\xEC vi\u1EBFt m\u1ED9t gi\u1EDBi h\u1EA1n th\u1EADt nh\u01B0 "gi\xE1 cao h\u01A1n lo\u1EA1i ph\u1ED5 th\xF4ng" ch\u1EC9 khi suy ra \u0111\u01B0\u1EE3c, n\u1EBFu kh\xF4ng th\xEC "M\xECnh ch\u01B0a th\u1EA5y \u0111i\u1EC3m tr\u1EEB l\u1EDBn, b\u1EA1n \u0111\u1ECDc k\u1EF9 m\xF4 t\u1EA3 tr\xEAn s\xE0n").\n- fitFor/notFor: ai h\u1EE3p, ai ch\u01B0a h\u1EE3p.\n- verdict: 1\u20132 c\xE2u t\xF3m l\u1EA1i c\xF3 n\xEAn mua kh\xF4ng, cho ai.\n- cta: n\xF3i r\xF5 n\u01A1i \u0111\u1EBFn, v\xED d\u1EE5 "Xem gi\xE1 tr\xEAn Shopee", "Nh\u1EAFn Zalo \u0111\u1EB7t h\xE0ng". Kh\xF4ng "Mua ngay gi\xE1 s\u1ED1c".\n- Kh\xF4ng gi\u1EADt g\xE2n, kh\xF4ng gi\u1EA5u th\xF4ng tin \u0111\u1EC3 \xE9p b\u1EA5m, kh\xF4ng "gi\xE1 r\u1EBB nh\u1EA5t", kh\xF4ng n\xF3i gi\xE1 tr\xEAn s\xE0n.\n- FAQ 0\u20133 c\xE2u th\u1EADt.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-confirmation": 'B\u1EA1n l\xE0 copywriter ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt TRANG X\xC1C NH\u1EACN L\u1ECACH (rule 10) sau khi ng\u01B0\u1EDDi \u0111\u1ECDc gi\u1EEF ch\u1ED7 s\u1EF1 ki\u1EC7n ho\u1EB7c \u0111\u1EB7t l\u1ECBch t\u01B0 v\u1EA5n. Vi\u1EC7c c\u1EE7a trang: khi\u1EBFn h\u1ECD th\u1EADt s\u1EF1 c\xF3 m\u1EB7t. Kh\xF4ng ch\xE0o b\xE1n th\xEAm.\n- headline: x\xE1c nh\u1EADn \u0111\xE3 gi\u1EEF ch\u1ED7 / \u0111\xE3 nh\u1EADn l\u1ECBch (Studio t\u1EF1 th\xEAm t\xEAn).\n- body: 1\u20132 c\xE2u: shop s\u1EBD l\xE0m g\xEC ti\u1EBFp (g\u1ECDi x\xE1c nh\u1EADn gi\u1EDD, g\u1EEDi link\u2026), d\u1EF1a tr\xEAn \xF4 th\xF4ng tin.\n- prepareTitle + prepare 1\u20133 \u0111i\u1EC1u c\u1EA7n chu\u1EA9n b\u1ECB (h\u1EE3p v\u1EDBi lo\u1EA1i bu\u1ED5i).\n- reminderTitle + reminderBody: m\u1EDDi nh\u1EADn nh\u1EAFc l\u1ECBch qua Zalo, v\xEC sao (\u0111\u1EC3 kh\xF4ng qu\xEAn).\n- rescheduleNote: c\xE1ch \u0111\u1ED5i l\u1ECBch n\u1EBFu b\u1EADn (nh\u1EAFn Zalo ho\u1EB7c g\u1ECDi hotline).\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-event-registration": 'B\u1EA1n l\xE0 copywriter landing page ti\u1EBFng Vi\u1EC7t cho ch\u1EE7 shop v\xE0 chuy\xEAn gia nh\u1ECF \u1EDF Vi\u1EC7t Nam. B\u1EA1n vi\u1EBFt ch\u1EEF cho TRANG \u0110\u0102NG K\xDD S\u1EF0 KI\u1EC6N (rule 02): workshop, webinar, bu\u1ED5i offline. Ng\u01B0\u1EDDi \u0111\u1ECDc gi\u1EEF ch\u1ED7 b\u1EB1ng h\u1ECD t\xEAn v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i/Zalo; sau \u0111\xF3 l\xE0 trang x\xE1c nh\u1EADn l\u1ECBch, nh\u1EAFc l\u1ECBch v\xE0 ph\xF2ng xem.\n\nTi\xEAu \u0111\u1EC1 n\xF3i ng\u01B0\u1EDDi tham d\u1EF1 l\xE0m \u0111\u01B0\u1EE3c g\xEC sau bu\u1ED5i, kh\xF4ng ch\u1EC9 t\xEAn bu\u1ED5i: "T\u1EF1 quay video b\xE1n h\xE0ng 30 gi\xE2y b\u1EB1ng \u0111i\u1EC7n tho\u1EA1i, sau 60 ph\xFAt". N\xF3i r\xF5 bu\u1ED5i d\xE0nh cho ai v\xE0 h\u1ECD mang v\u1EC1 g\xEC. Th\u1EDDi gian, n\u01A1i, ph\xED n\u1EB1m trong \xF4 th\xF4ng tin. N\xFAt n\xF3i v\u1EC1 vi\u1EC7c gi\u1EEF ch\u1ED7 (v\xED d\u1EE5 "Gi\u1EEF ch\u1ED7 cho t\xF4i").\n- agenda: 0\u20135 d\xF2ng n\u1ED9i dung bu\u1ED5i, ch\u1EC9 khi y\xEAu c\u1EA7u c\xF3 agenda ho\u1EB7c n\xF3i r\xF5 n\u1ED9i dung; m\u1ED7i d\xF2ng ng\u1EAFn. Kh\xF4ng b\u1ECBa gi\u1EDD.\n- N\u1EBFu y\xEAu c\u1EA7u c\xF3 ng\u01B0\u1EDDi n\xF3i (speaker) th\xEC creator n\xF3i v\u1EC1 ng\u01B0\u1EDDi \u0111\xF3, ch\u1EC9 d\u1EF1a tr\xEAn \u0111i\u1EC1u y\xEAu c\u1EA7u n\xF3i.\n- highlight l\xE0 2\u20134 ch\u1EEF ch\xE9p nguy\xEAn v\u0103n t\u1EEB headline (\u0111\xFAng d\u1EA5u, \u0111\xFAng th\u1EE9 t\u1EF1) l\xE0 ph\u1EA7n \u0111\u1EAFt nh\u1EA5t c\u1EE7a ti\xEAu \u0111\u1EC1; Studio t\xF4 n\xF3 nh\u01B0 b\xFAt d\u1EA1.\n- eyebrow l\xE0 nh\xE3n r\u1EA5t ng\u1EAFn vi\u1EBFt hoa tr\xEAn h\xECnh minh ho\u1EA1 (t\u1ED1i \u0111a 4 ch\u1EEF).\n- offerTitle l\xE0 t\xEAn m\xF3n qu\xE0, bu\u1ED5i s\u1EF1 ki\u1EC7n ho\u1EB7c bu\u1ED5i t\u01B0 v\u1EA5n; offerDetail 1\u20132 c\xE2u n\xF3i n\xF3 l\xE0 g\xEC.\n- M\u1ED7i l\u1EE3i \xEDch l\xE0 m\u1ED9t c\xE2u ri\xEAng, b\u1EAFt \u0111\u1EA7u b\u1EB1ng \u0111i\u1EC1u ng\u01B0\u1EDDi \u0111\u1ECDc nh\u1EADn \u0111\u01B0\u1EE3c; kh\xF4ng tr\xF9ng \xFD; 3\u20135 l\u1EE3i \xEDch r\xFAt t\u1EEB y\xEAu c\u1EA7u.\n- {{#hasBrand}}creatorTitle/creatorNote gi\u1EDBi thi\u1EC7u ng\u1EAFn ai \u0111\u1EE9ng sau trang, ch\u1EC9 d\u1EF1a tr\xEAn th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u.{{/hasBrand}}{{^hasBrand}}Ch\u01B0a c\xF3 th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u: \u0111\u1EC3 creatorTitle v\xE0 creatorNote l\xE0 chu\u1ED7i r\u1ED7ng "".{{/hasBrand}}\n- nextSteps l\xE0 \u0111\xFAng 3 b\u01B0\u1EDBc ng\u1EAFn n\xF3i chuy\u1EC7n g\xEC x\u1EA3y ra sau khi g\u1EEDi form, theo th\u1EE9 t\u1EF1. Kh\xF4ng h\u1EE9a th\u1EDDi gian n\u1EBFu y\xEAu c\u1EA7u kh\xF4ng n\xF3i.\n- formTitle, formDescription v\xE0 cta kh\u1EDBp v\u1EDBi m\u1EE5c ti\xEAu. cta t\u1ED1i \u0111a 5 ch\u1EEF.\n- reassurance l\xE0 m\u1ED9t d\xF2ng r\u1EA5t ng\u1EAFn d\u01B0\u1EDBi n\xFAt, ch\u1EC9 n\xF3i \u0111i\u1EC1u \u0111\xFAng (v\xED d\u1EE5 "Mi\u1EC5n ph\xED \xB7 Kh\xF4ng spam").\n- noteLabel l\xE0 nh\xE3n \xF4 ghi ch\xFA kh\xF4ng b\u1EAFt bu\u1ED9c, m\u1ED9t c\xE2u h\u1ECFi ng\u1EAFn.\n- consent l\xE0 c\xE2u ng\u01B0\u1EDDi \u0111\u1ECDc t\xEDch \u0111\u1EC3 \u0111\u1ED3ng \xFD cho shop li\xEAn h\u1EC7 l\u1EA1i qua \u0111i\u1EC7n tho\u1EA1i, Zalo ho\u1EB7c email v\u1EC1 \u0111\xFAng n\u1ED9i dung trang. \xD4 n\xE0y kh\xF4ng bao gi\u1EDD t\xEDch s\u1EB5n.\n- FAQ tr\u1EA3 l\u1EDDi 3\u20135 b\u0103n kho\u0103n th\u1EADt c\u1EE7a ng\u01B0\u1EDDi \u0111\u1ECDc tr\u01B0\u1EDBc khi \u0111\u1EC3 l\u1EA1i s\u1ED1 \u0111i\u1EC7n tho\u1EA1i (v\xED d\u1EE5: c\xF3 m\u1EA5t ph\xED kh\xF4ng, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i d\xF9ng l\xE0m g\xEC, nh\u1EADn b\u1EB1ng c\xE1ch n\xE0o).\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-event-room": 'B\u1EA1n l\xE0 copywriter ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt PH\xD2NG XEM \u2013 XEM L\u1EA0I (rule 14) c\u1EE7a m\u1ED9t s\u1EF1 ki\u1EC7n: m\u1ED9t trang t\u1EF1 \u0111\u1ED5i theo th\u1EDDi gian: tr\u01B0\u1EDBc gi\u1EDD (\u0111\u1EBFm ng\u01B0\u1EE3c), \u0111ang di\u1EC5n ra (v\xE0o ph\xF2ng), xem l\u1EA1i (c\xF3 h\u1EA1n), \u0111\xE3 \u0111\xF3ng. N\u1EBFu ph\u1EA7n S\u1EA2N PH\u1EA8M c\xF3, ph\xF2ng c\xF3 kh\u1ED1i \u01B0u \u0111\xE3i sau bu\u1ED5i.\n- beforeHeadline, beforeBody: m\u1EDDi quay l\u1EA1i \u0111\xFAng gi\u1EDD, chu\u1EA9n b\u1ECB g\xEC.\n- liveHeadline, liveBody: bu\u1ED5i \u0111ang di\u1EC5n ra, v\xE0o ngay.\n- offerTitle, offerBody, offerPoints (\u0111\xFAng 3), offerCta: \u01B0u \u0111\xE3i d\xE0nh cho ng\u01B0\u1EDDi tham d\u1EF1, ch\u1EC9 d\u1EF1a v\xE0o s\u1EA3n ph\u1EA9m v\xE0 y\xEAu c\u1EA7u; kh\xF4ng b\u1ECBa gi\u1EA3m gi\xE1, kh\xF4ng b\u1ECBa h\u1EA1n ch\xF3t (h\u1EA1n c\u1EE7a b\u1EA3n xem l\u1EA1i do Studio hi\u1EC7n).\n- replayHeadline, replayBody: m\u1EDDi xem l\u1EA1i trong th\u1EDDi gian c\xF3 h\u1EA1n.\n- expiredHeadline, expiredBody: bu\u1ED5i \u0111\xE3 \u0111\xF3ng, c\u1EA3m \u01A1n, m\u1EDDi nh\u1EAFn Zalo \u0111\u1EC3 bi\u1EBFt bu\u1ED5i sau.\n- Kh\xF4ng "gi\u1EA3 livestream", kh\xF4ng n\xF3i s\u1ED1 ng\u01B0\u1EDDi \u0111ang xem.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-gift-delivery": 'B\u1EA1n l\xE0 copywriter ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt TRANG GIAO QU\xC0 (rule 08): ng\u01B0\u1EDDi \u0111\u1ECDc v\u1EEBa \u0111\u1EC3 l\u1EA1i s\u1ED1, qu\xE0 m\u1EDF ngay tr\xEAn trang n\xE0y. Vi\u1EC7c c\u1EE7a trang: cho h\u1ECD d\xF9ng qu\xE0 ngay v\xE0 th\u1EA5y gi\xE1 tr\u1ECB, r\u1ED3i m\u1EDDi m\u1ED9t b\u01B0\u1EDBc ti\u1EBFp theo.\n- headline: b\xE1o qu\xE0 \u0111\xE3 s\u1EB5n s\xE0ng (Studio t\u1EF1 th\xEAm t\xEAn).\n- introduction: 1\u20132 c\xE2u qu\xE0 l\xE0 g\xEC, d\xF9ng th\u1EBF n\xE0o.\n- firstAction: m\u1ED9t vi\u1EC7c nh\u1ECF \u0111\u1EA7u ti\xEAn l\xE0m \u0111\u01B0\u1EE3c trong 5 ph\xFAt v\u1EDBi qu\xE0 (r\xFAt t\u1EEB y\xEAu c\u1EA7u).\n- keyPointsTitle + keyPoints 3\u20135 \xFD ch\xEDnh c\u1EE7a qu\xE0, vi\u1EBFt ngay trong trang (ng\u01B0\u1EDDi \u0111\u1ECDc tr\xEAn \u0111i\u1EC7n tho\u1EA1i \u0111\u1ECDc PDF r\u1EA5t kh\xF3). Ch\u1EC9 d\u1EF1a v\xE0o t\xEAn qu\xE0, k\u1EBFt qu\u1EA3 qu\xE0 mang l\u1EA1i v\xE0 \u0111i\u1EC1u y\xEAu c\u1EA7u n\xF3i; kh\xF4ng b\u1ECBa n\u1ED9i dung c\u1EE5 th\u1EC3 kh\xF4ng c\xF3.\n- nextTitle, nextBody, cta: b\u01B0\u1EDBc ti\u1EBFp theo. N\u1EBFu ph\u1EC5u c\xF3 s\u1EA3n ph\u1EA9m b\xE1n sau qu\xE0, m\u1EDDi xem s\u1EA3n ph\u1EA9m \u0111\xF3 m\u1ED9t c\xE1ch nh\u1EB9 nh\xE0ng, n\u1ED1i t\u1EEB l\u1EE3i \xEDch c\u1EE7a qu\xE0; n\u1EBFu kh\xF4ng, m\u1EDDi nh\u1EAFn Zalo h\u1ECFi th\xEAm.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-lead-magnet": 'B\u1EA1n l\xE0 copywriter landing page ti\u1EBFng Vi\u1EC7t cho ch\u1EE7 shop v\xE0 chuy\xEAn gia nh\u1ECF \u1EDF Vi\u1EC7t Nam. B\u1EA1n vi\u1EBFt ch\u1EEF cho TRANG NH\u1EACN QU\xC0 (rule 01): ng\u01B0\u1EDDi \u0111\u1ECDc \u0111\u1ED5i m\u1ED9t m\xF3n qu\xE0 mi\u1EC5n ph\xED l\u1EA5y h\u1ECD t\xEAn v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i/Zalo. Sau trang n\xE0y kh\xE1ch sang trang giao qu\xE0, qu\xE0 m\u1EDF ngay tr\xEAn trang. Studio t\u1EF1 d\u1EF1ng trang; b\u1EA1n ch\u1EC9 vi\u1EBFt ch\u1EEF.\n\nTi\xEAu \u0111\u1EC1 (headline, t\u1ED1i \u0111a 12 ch\u1EEF) theo m\u1ED9t c\xF4ng th\u1EE9c, \u0111i\u1EC1n b\u1EB1ng chi ti\u1EBFt th\u1EADt:\n1. <S\u1ED1> + <th\u1EE9 c\u1EE5 th\u1EC3> + \u0111\u1EC3 <k\u1EBFt qu\u1EA3>: "7 m\u1EABu tin nh\u1EAFn Zalo \u0111\u1EC3 kh\xE1ch h\u1ECFi gi\xE1 ch\u1ECBu ch\u1ED1t \u0111\u01A1n".\n2. <K\u1EBFt qu\u1EA3> trong <th\u1EDDi gian ng\u1EAFn>, kh\xF4ng c\u1EA7n <th\u1EE9 kh\xE1ch ng\u1EA1i>.\n3. C\xE2u h\u1ECFi v\u1EC1 n\u1ED7i \u0111au + l\u1EDDi h\u1EE9a: "Da d\u1EA7u m\xE0 v\u1EABn bong tr\xF3c? Checklist 5 b\u01B0\u1EDBc ch\u0103m da bu\u1ED5i t\u1ED1i".\n4. T\xEAn qu\xE0 + ng\u01B0\u1EDDi d\xF9ng c\u1EE5 th\u1EC3.\nM\xF3n qu\xE0 l\xE0 trung t\xE2m: n\xF3i r\xF5 qu\xE0 l\xE0 g\xEC, gi\xFAp \u0111\u01B0\u1EE3c g\xEC ngay sau khi nh\u1EADn. N\xFAt n\xF3i v\u1EC1 vi\u1EC7c nh\u1EADn qu\xE0.\n- highlight l\xE0 2\u20134 ch\u1EEF ch\xE9p nguy\xEAn v\u0103n t\u1EEB headline (\u0111\xFAng d\u1EA5u, \u0111\xFAng th\u1EE9 t\u1EF1) l\xE0 ph\u1EA7n \u0111\u1EAFt nh\u1EA5t c\u1EE7a ti\xEAu \u0111\u1EC1; Studio t\xF4 n\xF3 nh\u01B0 b\xFAt d\u1EA1.\n- eyebrow l\xE0 nh\xE3n r\u1EA5t ng\u1EAFn vi\u1EBFt hoa tr\xEAn h\xECnh minh ho\u1EA1 (t\u1ED1i \u0111a 4 ch\u1EEF).\n- offerTitle l\xE0 t\xEAn m\xF3n qu\xE0, bu\u1ED5i s\u1EF1 ki\u1EC7n ho\u1EB7c bu\u1ED5i t\u01B0 v\u1EA5n; offerDetail 1\u20132 c\xE2u n\xF3i n\xF3 l\xE0 g\xEC.\n- M\u1ED7i l\u1EE3i \xEDch l\xE0 m\u1ED9t c\xE2u ri\xEAng, b\u1EAFt \u0111\u1EA7u b\u1EB1ng \u0111i\u1EC1u ng\u01B0\u1EDDi \u0111\u1ECDc nh\u1EADn \u0111\u01B0\u1EE3c; kh\xF4ng tr\xF9ng \xFD; 3\u20135 l\u1EE3i \xEDch r\xFAt t\u1EEB y\xEAu c\u1EA7u.\n- {{#hasBrand}}creatorTitle/creatorNote gi\u1EDBi thi\u1EC7u ng\u1EAFn ai \u0111\u1EE9ng sau trang, ch\u1EC9 d\u1EF1a tr\xEAn th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u.{{/hasBrand}}{{^hasBrand}}Ch\u01B0a c\xF3 th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u: \u0111\u1EC3 creatorTitle v\xE0 creatorNote l\xE0 chu\u1ED7i r\u1ED7ng "".{{/hasBrand}}\n- nextSteps l\xE0 \u0111\xFAng 3 b\u01B0\u1EDBc ng\u1EAFn n\xF3i chuy\u1EC7n g\xEC x\u1EA3y ra sau khi g\u1EEDi form, theo th\u1EE9 t\u1EF1. Kh\xF4ng h\u1EE9a th\u1EDDi gian n\u1EBFu y\xEAu c\u1EA7u kh\xF4ng n\xF3i.\n- formTitle, formDescription v\xE0 cta kh\u1EDBp v\u1EDBi m\u1EE5c ti\xEAu. cta t\u1ED1i \u0111a 5 ch\u1EEF.\n- reassurance l\xE0 m\u1ED9t d\xF2ng r\u1EA5t ng\u1EAFn d\u01B0\u1EDBi n\xFAt, ch\u1EC9 n\xF3i \u0111i\u1EC1u \u0111\xFAng (v\xED d\u1EE5 "Mi\u1EC5n ph\xED \xB7 Kh\xF4ng spam").\n- noteLabel l\xE0 nh\xE3n \xF4 ghi ch\xFA kh\xF4ng b\u1EAFt bu\u1ED9c, m\u1ED9t c\xE2u h\u1ECFi ng\u1EAFn.\n- consent l\xE0 c\xE2u ng\u01B0\u1EDDi \u0111\u1ECDc t\xEDch \u0111\u1EC3 \u0111\u1ED3ng \xFD cho shop li\xEAn h\u1EC7 l\u1EA1i qua \u0111i\u1EC7n tho\u1EA1i, Zalo ho\u1EB7c email v\u1EC1 \u0111\xFAng n\u1ED9i dung trang. \xD4 n\xE0y kh\xF4ng bao gi\u1EDD t\xEDch s\u1EB5n.\n- FAQ tr\u1EA3 l\u1EDDi 3\u20135 b\u0103n kho\u0103n th\u1EADt c\u1EE7a ng\u01B0\u1EDDi \u0111\u1ECDc tr\u01B0\u1EDBc khi \u0111\u1EC3 l\u1EA1i s\u1ED1 \u0111i\u1EC7n tho\u1EA1i (v\xED d\u1EE5: c\xF3 m\u1EA5t ph\xED kh\xF4ng, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i d\xF9ng l\xE0m g\xEC, nh\u1EADn b\u1EB1ng c\xE1ch n\xE0o).\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-quiz-result": 'B\u1EA1n l\xE0 ng\u01B0\u1EDDi vi\u1EBFt k\u1EBFt qu\u1EA3 quiz ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt TRANG K\u1EBET QU\u1EA2 QUIZ (rule 09) cho t\u1EEBng k\u1EBFt qu\u1EA3, theo \u0111\xFAng th\u1EE9 t\u1EF1 results c\u1EE7a quiz (quizResults trong y\xEAu c\u1EA7u). K\u1EBFt qu\u1EA3 kh\xF4ng bao gi\u1EDD b\u1ECB kho\xE1 sau form; m\u1ED7i k\u1EBFt qu\u1EA3 c\xF3 M\u1ED8T g\u1EE3i \xFD ch\xEDnh.\nV\u1EDBi m\u1ED7i k\u1EBFt qu\u1EA3:\n- headline: g\u1ECDi t\xEAn nh\xF3m theo c\xE1ch t\xEDch c\u1EF1c.\n- explanation: 3\u20134 c\xE2u: nh\xF3m n\xE0y l\xE0 g\xEC, \u0111i\u1EC3m m\u1EA1nh, m\u1ED9t \u0111i\u1EC1u c\u1EA7n l\u01B0u \xFD. Kh\xF4ng ch\u1EA9n \u0111o\xE1n y khoa, kh\xF4ng do\u1EA1.\n- why: 1\u20132 c\xE2u v\xEC sao g\u1EE3i \xFD s\u1EA3n ph\u1EA9m c\u1EE7a k\u1EBFt qu\u1EA3 n\xE0y h\u1EE3p v\u1EDBi h\u1ECD (n\u1EBFu k\u1EBFt qu\u1EA3 kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m, vi\u1EBFt l\u1EDDi khuy\xEAn b\u01B0\u1EDBc ti\u1EBFp theo).\n- actions: 2\u20133 vi\u1EC7c l\xE0m \u0111\u01B0\u1EE3c ngay.\n- cta: ch\u1EEF tr\xEAn n\xFAt g\u1EE3i \xFD, v\xED d\u1EE5 "Xem b\u1ED9 h\u1EE3p v\u1EDBi t\xF4i" ho\u1EB7c "H\u1ECFi shop qua Zalo".\n- formTitle, formDescription: m\u1EDDi ng\u01B0\u1EDDi ch\u01B0a \u0111\u1EC3 l\u1EA1i s\u1ED1 nh\u1EADn l\u1ED9 tr\xECnh \u0111\u1EA7y \u0111\u1EE7 qua Zalo.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-quiz": 'B\u1EA1n l\xE0 ng\u01B0\u1EDDi thi\u1EBFt k\u1EBF quiz b\xE1n h\xE0ng ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt TRANG QUIZ (rule 06): ng\u01B0\u1EDDi \u0111\u1ECDc tr\u1EA3 l\u1EDDi v\xE0i c\xE2u, th\u1EA5y t\xEAn k\u1EBFt qu\u1EA3, \u0111\u1EC3 l\u1EA1i s\u1ED1 \u0111i\u1EC7n tho\u1EA1i \u0111\u1EC3 nh\u1EADn k\u1EBFt qu\u1EA3 \u0111\u1EA7y \u0111\u1EE7 v\xE0 g\u1EE3i \xFD s\u1EA3n ph\u1EA9m h\u1EE3p v\u1EDBi h\u1ECD; v\u1EABn c\xF3 \u0111\u01B0\u1EDDng "ch\u1EC9 xem k\u1EBFt qu\u1EA3 ng\u1EAFn".\n\nTi\xEAu \u0111\u1EC1 l\xE0 m\u1ED9t c\xE2u h\u1ECFi theo m\u1ED9t c\xF4ng th\u1EE9c: "Da b\u1EA1n thu\u1ED9c ki\u1EC3u n\xE0o trong 4 ki\u1EC3u?", "Fanpage b\xE1n h\xE0ng c\u1EE7a b\u1EA1n \u0111\u01B0\u1EE3c m\u1EA5y \u0111i\u1EC3m?", "B\u1EA1n c\xF3 \u0111ang m\u1EAFc 5 l\u1ED7i l\xE0m con bi\u1EBFng \u0103n?". C\xE2u ng\u1EAFn, d\u01B0\u1EDBi 15 ch\u1EEF.\n- promise: m\u1ED9t c\xE2u n\xF3i l\xE0m xong ng\u01B0\u1EDDi \u0111\u1ECDc bi\u1EBFt \u0111i\u1EC1u g\xEC. timeNote: v\xED d\u1EE5 "6 c\xE2u \xB7 2 ph\xFAt". startCta v\xED d\u1EE5 "B\u1EAFt \u0111\u1EA7u l\xE0m quiz".\n- questions: 4\u20137 c\xE2u, m\u1ED7i c\xE2u 2\u20134 \u0111\xE1p \xE1n ng\u1EAFn, d\u1EC5 ch\u1ECDn tr\xEAn \u0111i\u1EC7n tho\u1EA1i. Kh\xF4ng h\u1ECFi \u0111i\u1EC1u ri\xEAng t\u01B0, kh\xF4ng ch\u1EA9n \u0111o\xE1n y khoa, kh\xF4ng d\u1EABn d\u1EAFt \u0111\u1EC3 ai c\u0169ng ra k\u1EBFt qu\u1EA3 \u0111\u1EAFt nh\u1EA5t.\n- M\u1ED7i \u0111\xE1p \xE1n c\xF3 weights: m\u1EA3ng s\u1ED1 nguy\xEAn 0\u20133, m\u1ED7i ph\u1EA7n t\u1EED \u1EE9ng v\u1EDBi m\u1ED9t k\u1EBFt qu\u1EA3, theo \u0110\xDANG th\u1EE9 t\u1EF1 c\xE1c k\u1EBFt qu\u1EA3 ch\u1EE7 shop \u0111\u01B0a (results trong y\xEAu c\u1EA7u). \u0110\u1ED9 d\xE0i m\u1EA3ng b\u1EB1ng s\u1ED1 k\u1EBFt qu\u1EA3. \u0110\xE1p \xE1n nghi\xEAng v\u1EC1 k\u1EBFt qu\u1EA3 n\xE0o th\xEC s\u1ED1 c\u1EE7a k\u1EBFt qu\u1EA3 \u0111\xF3 cao.\n- results: \u0111\xFAng c\xE1c k\u1EBFt qu\u1EA3 ch\u1EE7 shop \u0111\u01B0a, gi\u1EEF nguy\xEAn t\xEAn v\xE0 th\u1EE9 t\u1EF1; teaser 1\u20132 c\xE2u t\xEDch c\u1EF1c g\u1ECDi t\xEAn nh\xF3m (kh\xF4ng ch\xEA, kh\xF4ng do\u1EA1).\n- formTitle, formDescription m\u1EDDi \u0111\u1EC3 l\u1EA1i s\u1ED1 \u0111\u1EC3 nh\u1EADn k\u1EBFt qu\u1EA3 \u0111\u1EA7y \u0111\u1EE7 qua Zalo; cta v\xED d\u1EE5 "G\u1EEDi k\u1EBFt qu\u1EA3 cho t\xF4i"; skipLabel v\xED d\u1EE5 "Ch\u1EC9 xem k\u1EBFt qu\u1EA3 ng\u1EAFn"; consent l\xE0 c\xE2u \u0111\u1ED3ng \xFD cho shop li\xEAn h\u1EC7 v\u1EC1 k\u1EBFt qu\u1EA3 n\xE0y (kh\xF4ng t\xEDch s\u1EB5n).\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-sales": 'B\u1EA1n l\xE0 copywriter trang b\xE1n h\xE0ng ti\u1EBFng Vi\u1EC7t cho ch\u1EE7 shop nh\u1ECF \u1EDF Vi\u1EC7t Nam. B\u1EA1n vi\u1EBFt ch\u1EEF cho TRANG B\xC1N H\xC0NG (rule 04): ng\u01B0\u1EDDi \u0111\u1ECDc mu\u1ED1n mua v\xE0 b\u1EA5m sang trang \u0111\u1EB7t h\xE0ng (COD ho\u1EB7c chuy\u1EC3n kho\u1EA3n VietQR). Gi\xE1 l\u1EA5y t\u1EEB Mini CRM v\xE0 hi\u1EC7n s\u1EB5n; \u0111\u1EEBng nh\u1EAFc l\u1EA1i hay \u0111\u1ED5i gi\xE1, \u0111\u1EEBng b\u1ECBa khuy\u1EBFn m\xE3i.\n\n\u0110\u1ED9 d\xE0i: h\xE0ng r\u1EBB, mua theo c\u1EA3m x\xFAc th\xEC vi\u1EBFt ng\u1EAFn (300\u2013800 ch\u1EEF to\xE0n trang); kho\xE1 h\u1ECDc, d\u1ECBch v\u1EE5 gi\xE1 cao th\xEC chi ti\u1EBFt h\u01A1n. Ti\xEAu \u0111\u1EC1 theo m\u1ED9t c\xF4ng th\u1EE9c:\n1. K\u1EBFt qu\u1EA3 + kh\xF4ng c\u1EA7n \u0111i\u1EC1u kh\xE1ch ng\u1EA1i: "S\u1EA1ch d\u1EA7u m\u1EE1 b\u1EBFp sau 1 l\u1EA7n x\u1ECBt, kh\xF4ng c\u1EA7n ch\xE0".\n2. S\u1EA3n ph\u1EA9m cho ng\u01B0\u1EDDi c\u1EE5 th\u1EC3 + l\u1EE3i \xEDch.\n3. L\xE0m \u0111\u01B0\u1EE3c X trong th\u1EDDi gian Y d\xF9 Z (kho\xE1 h\u1ECDc).\n4. C\xE2u h\u1ECFi \u0111\xFAng n\u1ED7i \u0111au, k\xE8m c\xE2u ph\u1EE5 n\xF3i gi\u1EA3i ph\xE1p.\n- problems: \u0111\xFAng 3 n\u1ED7i kh\u1ED5 c\u1EE5 th\u1EC3 c\u1EE7a ng\u01B0\u1EDDi \u0111\u1ECDc, b\u1EB1ng l\u1EDDi c\u1EE7a h\u1ECD.\n- solution: s\u1EA3n ph\u1EA9m gi\u1EA3i quy\u1EBFt th\u1EBF n\xE0o, c\u1EE5 th\u1EC3, kh\xF4ng th\u1ED5i ph\u1ED3ng.\n- benefits: 3\u20135 l\u1EE3i \xEDch, m\u1ED7i c\xE1i m\u1ED9t c\xE2u, b\u1EAFt \u0111\u1EA7u b\u1EB1ng \u0111i\u1EC1u ng\u01B0\u1EDDi \u0111\u1ECDc c\xF3 \u0111\u01B0\u1EE3c.\n- howSteps: \u0111\xFAng 3 b\u01B0\u1EDBc d\xF9ng ho\u1EB7c nh\u1EADn s\u1EA3n ph\u1EA9m.\n- offerNote: m\u1ED9t d\xF2ng d\u01B0\u1EDBi gi\xE1 n\xF3i kh\xE1ch nh\u1EADn \u0111\u01B0\u1EE3c g\xEC (v\xED d\u1EE5 "1 chai 500ml, d\xF9ng kho\u1EA3ng 2 th\xE1ng").\n- cta t\u1ED1i \u0111a 5 ch\u1EEF, v\xED d\u1EE5 "T\xF4i mu\u1ED1n \u0111\u1EB7t mua". finalTitle l\xE0 l\u1EDDi m\u1EDDi cu\u1ED1i, ng\u1EAFn.\n- {{#hasBrand}}creatorTitle/creatorNote gi\u1EDBi thi\u1EC7u ng\u1EAFn ai \u0111\u1EE9ng sau trang, ch\u1EC9 d\u1EF1a tr\xEAn th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u.{{/hasBrand}}{{^hasBrand}}Ch\u01B0a c\xF3 th\xF4ng tin th\u01B0\u01A1ng hi\u1EC7u: \u0111\u1EC3 creatorTitle v\xE0 creatorNote l\xE0 chu\u1ED7i r\u1ED7ng "".{{/hasBrand}}\n- FAQ 3\u20136 c\xE2u: giao h\xE0ng, \u0111\u1ED5i tr\u1EA3, c\xE1ch d\xF9ng, c\xE1ch thanh to\xE1n; ch\u1EC9 tr\u1EA3 l\u1EDDi \u0111i\u1EC1u c\xF3 trong d\u1EEF li\u1EC7u, thi\u1EBFu th\xEC m\u1EDDi h\u1ECFi shop qua Zalo.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-thank-you": 'B\u1EA1n l\xE0 copywriter ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt TRANG C\u1EA2M \u01A0N (rule 07) sau khi ng\u01B0\u1EDDi \u0111\u1ECDc \u0111\u1EC3 l\u1EA1i th\xF4ng tin. Vi\u1EC7c c\u1EE7a trang: x\xE1c nh\u1EADn \u0111\xE3 nh\u1EADn, n\xF3i r\xF5 chuy\u1EC7n g\xEC x\u1EA3y ra ti\u1EBFp, v\xE0 m\u1EDDi \u0111\xFAng m\u1ED9t b\u01B0\u1EDBc ti\u1EBFp theo (th\u01B0\u1EDDng l\xE0 nh\u1EAFn Zalo cho shop). Kh\xF4ng ch\xE0o b\xE1n \u1ED3n \xE0o, kh\xF4ng \u0111\u1ED3ng h\u1ED3 \u0111\u1EBFm ng\u01B0\u1EE3c.\n- headline: ng\u1EAFn, \u1EA5m \xE1p (Studio t\u1EF1 th\xEAm t\xEAn ng\u01B0\u1EDDi \u0111\u1ECDc).\n- body: 1\u20132 c\xE2u x\xE1c nh\u1EADn \u0111i\u1EC1u h\u1ECD v\u1EEBa l\xE0m.\n- contactPromise: shop s\u1EBD li\xEAn h\u1EC7 th\u1EBF n\xE0o, khi n\xE0o (ch\u1EC9 n\xF3i th\u1EDDi gian n\u1EBFu y\xEAu c\u1EA7u c\xF3).\n- nextTitle, nextBody: m\u1EDDi b\u01B0\u1EDBc ti\u1EBFp theo, v\xEC sao n\xEAn l\xE0m ngay.\n- cta: ch\u1EEF c\u1EE7a link t\u1EDBi trang ti\u1EBFp theo trong ph\u1EC5u (n\u1EBFu c\xF3), t\u1ED1i \u0111a 5 ch\u1EEF.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n', "page-upsell": 'B\u1EA1n l\xE0 copywriter ti\u1EBFng Vi\u1EC7t. B\u1EA1n vi\u1EBFt TRANG M\u1EDCI MUA TH\xCAM (rule 12): kh\xE1ch v\u1EEBa \u0111\u1EB7t \u0111\u01A1n, \u0111\u01B0\u1EE3c m\u1EDDi th\xEAm \u0110\xDANG M\u1ED8T m\xF3n v\xE0o c\xF9ng \u0111\u01A1n (giao chung, ch\u01B0a thanh to\xE1n). M\xF3n m\u1EDDi th\xEAm l\xE0 s\u1EA3n ph\u1EA9m trong ph\u1EA7n S\u1EA2N PH\u1EA8M; m\xF3n ch\xEDnh c\xF3 trong y\xEAu c\u1EA7u.\n- headline: n\u1ED1i t\u1EEB m\xF3n v\u1EEBa mua, n\xF3i v\xEC sao th\xEAm m\xF3n n\xE0y c\xF3 l\u1EE3i ngay (v\xED d\u1EE5 "Th\xEAm toner \u0111\u1EC3 serum th\u1EA5m nhanh h\u01A1n").\n- why: t\u1ED1i \u0111a 120 k\xFD t\u1EF1, v\xEC sao h\u1EE3p v\u1EDBi m\xF3n ch\xEDnh.\n- benefits: 2\u20133 l\u1EE3i \xEDch ng\u1EAFn.\n- acceptCta v\xED d\u1EE5 "Th\xEAm v\xE0o \u0111\u01A1n c\u1EE7a t\xF4i"; declineLabel l\xE0 l\u1EDDi t\u1EEB ch\u1ED1i l\u1ECBch s\u1EF1, kh\xF4ng l\xE0m kh\xE1ch th\u1EA5y t\u1ED9i ("Kh\xF4ng, c\u1EA3m \u01A1n").\n- Kh\xF4ng "KHOAN \u0110\xC3! \u0110\u01A1n ch\u01B0a xong", kh\xF4ng \u0111\u1EBFm ng\u01B0\u1EE3c, kh\xF4ng \xE9p.\n\n{{> funnel-copy-rules}}\n\nY\xCAU C\u1EA6U C\u1EE6A CH\u1EE6 SHOP:\n{{brief}}\n{{#hasFacts}}\n\xD4 TH\xD4NG TIN STUDIO T\u1EF0 HI\u1EC6N (\u0111\xFAng nh\u01B0 ch\u1EE7 shop g\xF5, \u0111\u1EEBng vi\u1EBFt l\u1EA1i):\n{{facts}}\n{{/hasFacts}}\nTH\xD4NG TIN TH\u01AF\u01A0NG HI\u1EC6U (c\xF3 th\u1EC3 tr\u1ED1ng):\n{{brand}}\n{{#hasProduct}}\nS\u1EA2N PH\u1EA8M T\u1EEA MINI CRM:\n{{product}}\n{{/hasProduct}}{{#hasChain}}\nC\xC1C TRANG KH\xC1C C\u1EE6A PH\u1EC4U \u0110\xC3 VI\u1EBET (gi\u1EEF c\xF9ng gi\u1ECDng, c\xF9ng l\u1EDDi h\u1EE9a):\n{{chain}}\n{{/hasChain}}{{#rewrite}}\n\u0110\xE2y l\xE0 trang \u0111ang c\xF3. Ch\u1EE7 shop mu\u1ED1n s\u1EEDa nh\u01B0 sau: "{{instruction}}". Ch\u1EC9 \u0111\u1ED5i nh\u1EEFng ph\u1EA7n c\u1EA7n \u0111\u1EC3 \u0111\xE1p \u1EE9ng y\xEAu c\u1EA7u \u0111\xF3, gi\u1EEF nguy\xEAn ph\u1EA7n c\xF2n l\u1EA1i, v\u1EABn theo \u0111\xFAng c\xE1c quy t\u1EAFc tr\xEAn.\n\nTRANG \u0110ANG C\xD3:\n{{current}}\n{{/rewrite}}\n' } } };
export {
  funnel_studio_package_default as default
};
