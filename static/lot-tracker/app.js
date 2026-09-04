/* LOT Tracker — source = output. Edit this file. No build step. */
(function () {
  "use strict";

  var LANGS = ["en", "tr", "de"];
  var LANG_LABEL = { en: "English", tr: "Türkçe", de: "Deutsch" };
  var LANG_LOCALE = { en: "en-GB", tr: "tr-TR", de: "de-DE" };
  var SOURCE_FILES = [
    "index.html",
    "app.js",
    "styles.css",
    "pico.blue.min.css",
    "favicon.svg",
    "README.txt",
  ];

  var ICONS = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 14.3A8.5 8.5 0 1 1 9.7 3a7 7 0 0 0 11.3 11.3z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
    pack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 3"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21V9M7 14l5-5 5 5M5 3h14"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 16l-5-5-11 8"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5"/></svg>',
    files: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  };

  var dict = {
    en: {
      appName: "LOT Tracker", tagline: "Warehouse product tracker", products: "Products", logs: "Logs",
      addProduct: "Add product", editProduct: "Edit product", name: "Name", article: "Artikel",
      lot: "LOT", photo: "Photo", photoHint: "Optional. Photo changes are not logged.", save: "Save",
      cancel: "Cancel", delete: "Delete", edit: "Edit", close: "Close",
      search: "Search name, Artikel, or LOT", searchLogs: "Search products or values",
      noProducts: "No products yet",
      noProductsHint: "Add a product to start tracking names, Artikel numbers, and LOT numbers.",
      emptySearch: "No matching products", changeHistory: "Change history", allChanges: "All changes",
      added: "Added", removed: "Removed", noLogs: "No changes recorded",
      noLogsHint: "Edits to name, Artikel, and LOT will appear here.",
      updateLot: "Update LOT", newLot: "New LOT number", language: "Language",
      confirmDeleteTitle: "Delete this product?",
      confirmDeleteBody: "“{name}” will be removed from the warehouse list. Change history is kept.",
      uploadPhoto: "Upload photo", changePhoto: "Replace photo", removePhoto: "Remove photo",
      exportBackup: "Export backup", importBackup: "Import backup",
      backupExported: "Backup ready", backupImported: "Backup imported",
      backupFailed: "Could not import this file", justNow: "Just now", updated: "Updated",
      more: "More", settings: "Settings", nameRequired: "Enter a product name",
      articleRequired: "Enter an Artikel number", lotRequired: "Enter a LOT number",
      articleTaken: "Another product already uses this Artikel number",
      productCount: "{n} products", logCount: "{n} entries", allFields: "All fields",
      saveLot: "Save LOT", today: "Today", yesterday: "Yesterday", openLogs: "Logs",
      overflow: "Menu", theme: "Theme",
      storageError: "This browser could not open local storage. LOT Tracker needs IndexedDB.",
      retry: "Retry", initialsPhoto: "Product",
      loadingDatabase: "Loading the database, please wait...",
      confirmImportTitle: "Replace all data?",
      confirmImportBody: "Importing this backup will replace every product, photo, and log on this device.",
      confirmImport: "Replace and import",
      backupReadyTitle: "Backup ready",
      backupReadyBody: "Save the JSON file to this device, share it, or copy the text.",
      saveFile: "Save file", shareFile: "Share", copyJson: "Copy JSON", copied: "Copied",
      downloadSource: "Download source files",
      sourceTitle: "Source files",
      sourceHint: "These ARE the app. Open index.html after unzipping — no install, no build.",
      sourceDownloaded: "Source zip ready",
      preparing: "Preparing…",
      saveFailed: "Could not save the file. Copy the JSON instead.",
      pasteJson: "Paste JSON",
      pasteHint: "Choose a backup file, or paste the JSON here, then import.",
      chooseFile: "Choose JSON file",
      confirmPasteImport: "Import pasted JSON",
      viewFile: "View",
      copyFile: "Copy file",
      importOpenTitle: "Import backup",
      sourceViewTitle: "File",
    },
    tr: {
      appName: "LOT Takibi", tagline: "Depo ürün takibi", products: "Ürünler", logs: "Kayıtlar",
      addProduct: "Ürün ekle", editProduct: "Ürünü düzenle", name: "Ad", article: "Artikel",
      lot: "LOT", photo: "Fotoğraf", photoHint: "İsteğe bağlı. Fotoğraf değişiklikleri kaydedilmez.",
      save: "Kaydet", cancel: "İptal", delete: "Sil", edit: "Düzenle", close: "Kapat",
      search: "Ad, artikel veya LOT ara", searchLogs: "Ürün veya değer ara",
      noProducts: "Henüz ürün yok",
      noProductsHint: "Ad, artikel ve LOT numaralarını izlemek için bir ürün ekleyin.",
      emptySearch: "Eşleşen ürün yok", changeHistory: "Değişiklik geçmişi", allChanges: "Tüm değişiklikler",
      added: "Eklendi", removed: "Silindi", noLogs: "Kayıt yok",
      noLogsHint: "Ad, artikel ve LOT düzenlemeleri burada görünür.",
      updateLot: "LOT güncelle", newLot: "Yeni LOT numarası", language: "Dil",
      confirmDeleteTitle: "Bu ürün silinsin mi?",
      confirmDeleteBody: "“{name}” depo listesinden kaldırılacak. Değişiklik geçmişi saklanır.",
      uploadPhoto: "Fotoğraf yükle", changePhoto: "Fotoğrafı değiştir", removePhoto: "Fotoğrafı kaldır",
      exportBackup: "Yedek dışa aktar", importBackup: "Yedek içe aktar",
      backupExported: "Yedek hazır", backupImported: "Yedek içe aktarıldı",
      backupFailed: "Bu dosya içe aktarılamadı", justNow: "Az önce", updated: "Güncellendi",
      more: "Daha fazla", settings: "Ayarlar", nameRequired: "Ürün adı girin",
      articleRequired: "Artikel numarası girin", lotRequired: "LOT numarası girin",
      articleTaken: "Bu artikel başka bir üründe kayıtlı",
      productCount: "{n} ürün", logCount: "{n} kayıt", allFields: "Tüm alanlar",
      saveLot: "LOT kaydet", today: "Bugün", yesterday: "Dün", openLogs: "Kayıtlar",
      overflow: "Menü", theme: "Tema",
      storageError: "Tarayıcı yerel depolamayı açamadı. LOT Takibi IndexedDB gerektirir.",
      retry: "Yeniden dene", initialsPhoto: "Ürün",
      loadingDatabase: "Veritabanı yükleniyor, lütfen bekleyin...",
      confirmImportTitle: "Tüm veri değiştirilsin mi?",
      confirmImportBody: "Bu yedek, bu cihazdaki tüm ürün, fotoğraf ve kayıtların üzerine yazılır.",
      confirmImport: "Değiştir ve içe aktar",
      backupReadyTitle: "Yedek hazır",
      backupReadyBody: "JSON dosyasını kaydedin, paylaşın veya metni kopyalayın.",
      saveFile: "Dosyayı kaydet", shareFile: "Paylaş", copyJson: "JSON kopyala", copied: "Kopyalandı",
      downloadSource: "Kaynak dosyaları indir",
      sourceTitle: "Kaynak dosyalar",
      sourceHint: "Uygulama bu dosyalardır. Zip’ten sonra index.html dosyasını açın — kurulum yok.",
      sourceDownloaded: "Kaynak zip hazır",
      preparing: "Hazırlanıyor…",
      saveFailed: "Dosya kaydedilemedi. JSON’u kopyalayın.",
      pasteJson: "JSON yapıştır",
      pasteHint: "Bir yedek dosyası seçin veya JSON’u buraya yapıştırıp içe aktarın.",
      chooseFile: "JSON dosyası seç",
      confirmPasteImport: "Yapıştırılan JSON’u içe aktar",
      viewFile: "Görüntüle",
      copyFile: "Dosyayı kopyala",
      importOpenTitle: "Yedek içe aktar",
      sourceViewTitle: "Dosya",
    },
    de: {
      appName: "LOT-Tracker", tagline: "Lager-Produkttracker", products: "Produkte", logs: "Protokoll",
      addProduct: "Produkt hinzufügen", editProduct: "Produkt bearbeiten", name: "Name", article: "Artikel",
      lot: "LOT", photo: "Foto", photoHint: "Optional. Fotoänderungen werden nicht protokolliert.",
      save: "Speichern", cancel: "Abbrechen", delete: "Löschen", edit: "Bearbeiten", close: "Schließen",
      search: "Name, Artikel oder LOT suchen", searchLogs: "Produkte oder Werte suchen",
      noProducts: "Noch keine Produkte",
      noProductsHint: "Fügen Sie ein Produkt hinzu, um Namen, Artikel- und LOT-Nummern zu verfolgen.",
      emptySearch: "Keine passenden Produkte", changeHistory: "Änderungshistorie",
      allChanges: "Alle Änderungen", added: "Hinzugefügt", removed: "Entfernt",
      noLogs: "Keine Einträge", noLogsHint: "Änderungen an Name, Artikel und LOT erscheinen hier.",
      updateLot: "LOT aktualisieren", newLot: "Neue LOT-Nummer", language: "Sprache",
      confirmDeleteTitle: "Dieses Produkt löschen?",
      confirmDeleteBody: "„{name}“ wird aus der Lagerliste entfernt. Die Änderungshistorie bleibt erhalten.",
      uploadPhoto: "Foto hochladen", changePhoto: "Foto ersetzen", removePhoto: "Foto entfernen",
      exportBackup: "Sicherung exportieren", importBackup: "Sicherung importieren",
      backupExported: "Sicherung bereit", backupImported: "Sicherung importiert",
      backupFailed: "Diese Datei konnte nicht importiert werden", justNow: "Gerade eben",
      updated: "Aktualisiert", more: "Mehr", settings: "Einstellungen",
      nameRequired: "Produktname eingeben", articleRequired: "Artikelnummer eingeben",
      lotRequired: "LOT-Nummer eingeben", articleTaken: "Diese Artikelnummer ist bereits vergeben",
      productCount: "{n} Produkte", logCount: "{n} Einträge", allFields: "Alle Felder",
      saveLot: "LOT speichern", today: "Heute", yesterday: "Gestern", openLogs: "Protokoll",
      overflow: "Menü", theme: "Darstellung",
      storageError: "Dieser Browser konnte den lokalen Speicher nicht öffnen. LOT-Tracker benötigt IndexedDB.",
      retry: "Erneut versuchen", initialsPhoto: "Produkt",
      loadingDatabase: "Datenbank wird geladen, bitte warten...",
      confirmImportTitle: "Alle Daten ersetzen?",
      confirmImportBody: "Dieser Import ersetzt alle Produkte, Fotos und Protokolle auf diesem Gerät.",
      confirmImport: "Ersetzen und importieren",
      backupReadyTitle: "Sicherung bereit",
      backupReadyBody: "JSON-Datei speichern, teilen oder den Text kopieren.",
      saveFile: "Datei speichern", shareFile: "Teilen", copyJson: "JSON kopieren", copied: "Kopiert",
      downloadSource: "Quelldateien herunterladen",
      sourceTitle: "Quelldateien",
      sourceHint: "Das ist die App. Nach dem Entpacken index.html öffnen — keine Installation.",
      sourceDownloaded: "Quell-Zip bereit",
      preparing: "Wird vorbereitet…",
      saveFailed: "Datei konnte nicht gespeichert werden. JSON kopieren.",
      pasteJson: "JSON einfügen",
      pasteHint: "Sicherungsdatei wählen oder JSON hier einfügen, dann importieren.",
      chooseFile: "JSON-Datei wählen",
      confirmPasteImport: "Eingefügtes JSON importieren",
      viewFile: "Anzeigen",
      copyFile: "Datei kopieren",
      importOpenTitle: "Sicherung importieren",
      sourceViewTitle: "Datei",
    },
  };

  var state = {
    lang: window.__lkLang || "en",
    theme: window.__lkTheme || "light",
    page: "products",
    products: [],
    logs: [],
    productLogs: [],
    photoUrls: {},
    photoOrder: [],
    query: "",
    logQuery: "",
    logFilter: "all",
    error: null,
    formOpen: false,
    editing: null,
    lotProduct: null,
    logsProduct: null,
    deleting: null,
    photoFile: null,
    photoPreview: null,
    removePhoto: false,
    menu: null,
    settingsOpen: false,
    exportReady: null,
    importPending: null,
    importOpen: false,
    importText: "",
    importError: "",
    sourceOpen: false,
    sourceReady: null,
    sourceListing: null,
    sourceView: null,
  };

  var DB = "lotkeep";
  var dbp = null;
  var observers = [];
  var bound = false;

  function t(key, vars) {
    var s = (dict[state.lang] && dict[state.lang][key]) || dict.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replaceAll("{" + k + "}", String(vars[k])); });
    return s;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&" + "amp;")
      .replace(/</g, "&" + "lt;")
      .replace(/>/g, "&" + "gt;")
      .replace(/"/g, "&" + "quot;")
      .replace(/'/g, "&#39;");
  }
  function uid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }
  function initials(name) {
    return (name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p[0].toUpperCase(); }).join("") || "?";
  }
  function articleOf(p) { return (p && (p.article || p.reference)) || ""; }

  function detectLang() {
    try {
      var s = localStorage.getItem("lotkeep.lang");
      if (LANGS.indexOf(s) >= 0) return s;
    } catch (_) {}
    var n = (navigator.language || "").toLowerCase();
    if (n.indexOf("tr") === 0) return "tr";
    if (n.indexOf("de") === 0) return "de";
    return "en";
  }
  function detectTheme() {
    try {
      var s = localStorage.getItem("lotkeep.theme");
      if (s === "light" || s === "dark") return s;
    } catch (_) {}
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyPrefs() {
    document.documentElement.lang = state.lang;
    document.documentElement.setAttribute("data-theme", state.theme);
    document.documentElement.style.colorScheme = state.theme;
    document.title = t("appName");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "dark" ? "#071422" : "#e8f1fb");
    try {
      localStorage.setItem("lotkeep.lang", state.lang);
      localStorage.setItem("lotkeep.theme", state.theme);
    } catch (_) {}
  }
  function setLang(lang) { state.lang = lang; state.menu = null; applyPrefs(); render(); }
  function setTheme(theme) { state.theme = theme; applyPrefs(); render(); }

  function formatWhen(ts) {
    var diff = Date.now() - ts;
    if (diff < 45000) return t("justNow");
    var locale = LANG_LOCALE[state.lang];
    var rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (diff < 3600000) return rtf.format(-Math.round(diff / 60000), "minute");
    if (diff < 86400000) return rtf.format(-Math.round(diff / 3600000), "hour");
    if (diff < 7 * 86400000) return rtf.format(-Math.round(diff / 86400000), "day");
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(ts);
  }
  function formatDay(ts) {
    var d = new Date(ts);
    var now = new Date();
    var startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    if (startThat === startToday) return t("today");
    if (startThat === startToday - 86400000) return t("yesterday");
    return new Intl.DateTimeFormat(LANG_LOCALE[state.lang], { dateStyle: "medium" }).format(d);
  }
  function formatTime(ts) {
    return new Intl.DateTimeFormat(LANG_LOCALE[state.lang], { hour: "2-digit", minute: "2-digit" }).format(ts);
  }
  function fieldLabel(field) {
    if (field === "created") return t("added");
    if (field === "deleted") return t("removed");
    if (field === "name") return t("name");
    if (field === "article" || field === "reference") return t("article");
    if (field === "lot") return t("lot");
    return field;
  }

  function req(r) {
    return new Promise(function (resolve, reject) {
      r.onsuccess = function () { resolve(r.result); };
      r.onerror = function () { reject(r.error); };
    });
  }
  function openDb() {
    if (dbp) return dbp;
    dbp = new Promise(function (resolve, reject) {
      var open = indexedDB.open(DB, 2);
      open.onupgradeneeded = function (ev) {
        var db = open.result;
        var tx = open.transaction;
        if (!db.objectStoreNames.contains("products")) {
          var s = db.createObjectStore("products", { keyPath: "id" });
          s.createIndex("article", "article", { unique: false });
          s.createIndex("lot", "lot", { unique: false });
          s.createIndex("updatedAt", "updatedAt", { unique: false });
        }
        if (!db.objectStoreNames.contains("photos")) db.createObjectStore("photos", { keyPath: "id" });
        if (!db.objectStoreNames.contains("logs")) {
          var l = db.createObjectStore("logs", { keyPath: "id" });
          l.createIndex("productId", "productId", { unique: false });
          l.createIndex("at", "at", { unique: false });
        }
        if (!db.objectStoreNames.contains("meta")) db.createObjectStore("meta", { keyPath: "key" });
        if (ev.oldVersion < 2 && db.objectStoreNames.contains("products")) {
          var store = tx.objectStore("products");
          var cursor = store.openCursor();
          cursor.onsuccess = function (e) {
            var c = e.target.result;
            if (!c) return;
            var v = c.value;
            if (!v.article && v.reference) {
              v.article = v.reference;
              c.update(v);
            }
            c.continue();
          };
        }
      };
      open.onsuccess = function () { resolve(open.result); };
      open.onerror = function () { dbp = null; reject(open.error); };
    });
    return dbp;
  }
  function withTx(stores, mode, run) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(stores, mode);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
        tx.onabort = function () { reject(tx.error || new Error("IndexedDB aborted")); };
        run(tx);
      });
    });
  }

  function normalizeProduct(p) {
    return {
      id: p.id || uid(),
      name: p.name || "",
      article: articleOf(p),
      lot: p.lot || "",
      photoId: p.photoId || null,
      createdAt: p.createdAt || Date.now(),
      updatedAt: p.updatedAt || Date.now(),
    };
  }

  async function refresh() {
    var db = await openDb();
    var products = await req(db.transaction("products").objectStore("products").getAll());
    products = products.map(normalizeProduct);
    products.sort(function (a, b) { return b.updatedAt - a.updatedAt; });
    state.products = products;
  }
  async function loadLogs() {
    var db = await openDb();
    var logs = await req(db.transaction("logs").objectStore("logs").getAll());
    logs.sort(function (a, b) { return b.at - a.at; });
    state.logs = logs;
    return logs;
  }
  async function loadProductLogs(productId) {
    var db = await openDb();
    var logs = await req(db.transaction("logs").objectStore("logs").index("productId").getAll(productId));
    logs.sort(function (a, b) { return b.at - a.at; });
    state.productLogs = logs;
    return logs;
  }

  async function compressImage(file) {
    try {
      var bitmap = await createImageBitmap(file);
      var scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
      var canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      var q = 0.72;
      var blob = await new Promise(function (res, rej) { canvas.toBlob(function (b) { b ? res(b) : rej(new Error("blob")); }, "image/jpeg", q); });
      while (blob.size > 400000 && q > 0.45) {
        q -= 0.08;
        blob = await new Promise(function (res, rej) { canvas.toBlob(function (b) { b ? res(b) : rej(new Error("blob")); }, "image/jpeg", q); });
      }
      canvas.width = 0; canvas.height = 0;
      return blob;
    } catch (_) {
      if (file.size > 2000000) throw new Error("Image too large");
      return file;
    }
  }
  async function storePhoto(file) {
    var blob = await compressImage(file);
    var rec = { id: uid(), blob: blob, mimeType: blob.type || "image/jpeg" };
    await withTx("photos", "readwrite", function (tx) { tx.objectStore("photos").put(rec); });
    return rec.id;
  }
  async function writeLog(product, field, oldValue, newValue, at) {
    await withTx("logs", "readwrite", function (tx) {
      tx.objectStore("logs").put({
        id: uid(), productId: product.id, productName: product.name,
        field: field, oldValue: oldValue, newValue: newValue, at: at || Date.now(),
      });
    });
  }

  async function addProduct(draft) {
    var now = Date.now();
    var photoId = draft.photoFile ? await storePhoto(draft.photoFile) : null;
    var product = {
      id: uid(), name: draft.name.trim(), article: draft.article.trim(),
      lot: draft.lot.trim(), photoId: photoId, createdAt: now, updatedAt: now,
    };
    await withTx("products", "readwrite", function (tx) { tx.objectStore("products").put(product); });
    await writeLog(product, "created", null, product.name, now);
    await refresh();
  }
  async function updateProduct(id, draft) {
    var current = state.products.find(function (p) { return p.id === id; });
    if (!current) return;
    var now = Date.now();
    var photoId = current.photoId;
    if (draft.removePhoto && photoId) {
      await withTx("photos", "readwrite", function (tx) { tx.objectStore("photos").delete(photoId); });
      photoId = null;
    }
    if (draft.photoFile) {
      if (photoId) await withTx("photos", "readwrite", function (tx) { tx.objectStore("photos").delete(photoId); });
      photoId = await storePhoto(draft.photoFile);
    }
    var next = {
      id: current.id, name: draft.name.trim(), article: draft.article.trim(),
      lot: draft.lot.trim(), photoId: photoId, createdAt: current.createdAt, updatedAt: now,
    };
    await withTx("products", "readwrite", function (tx) { tx.objectStore("products").put(next); });
    if (current.name !== next.name) await writeLog(next, "name", current.name, next.name, now);
    if (articleOf(current) !== next.article) await writeLog(next, "article", articleOf(current), next.article, now);
    if (current.lot !== next.lot) await writeLog(next, "lot", current.lot, next.lot, now);
    await refresh();
  }
  async function updateLot(id, lot) {
    var current = state.products.find(function (p) { return p.id === id; });
    var trimmed = lot.trim();
    if (!current || current.lot === trimmed) return;
    var now = Date.now();
    var next = { id: current.id, name: current.name, article: articleOf(current), lot: trimmed, photoId: current.photoId, createdAt: current.createdAt, updatedAt: now };
    await withTx("products", "readwrite", function (tx) { tx.objectStore("products").put(next); });
    await writeLog(next, "lot", current.lot, trimmed, now);
    await refresh();
  }
  async function removeProduct(id) {
    var current = state.products.find(function (p) { return p.id === id; });
    if (!current) return;
    if (current.photoId) await withTx("photos", "readwrite", function (tx) { tx.objectStore("photos").delete(current.photoId); });
    await withTx("products", "readwrite", function (tx) { tx.objectStore("products").delete(id); });
    await writeLog(current, "deleted", current.name, null);
    await refresh();
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () {
        var s = String(r.result);
        var i = s.indexOf(",");
        resolve(i >= 0 ? s.slice(i + 1) : s);
      };
      r.onerror = function () { reject(r.error); };
      r.readAsDataURL(blob);
    });
  }
  function base64ToBlob(b64, mime) {
    var raw = String(b64 || "");
    var comma = raw.indexOf(",");
    if (raw.indexOf("data:") === 0 && comma >= 0) raw = raw.slice(comma + 1);
    var bin = atob(raw);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime || "application/octet-stream" });
  }

  function crcTable() {
    if (crcTable._t) return crcTable._t;
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    crcTable._t = t;
    return t;
  }
  function crc32(u8) {
    var table = crcTable();
    var c = 0xffffffff;
    for (var i = 0; i < u8.length; i++) c = table[(c ^ u8[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }
  function zipStore(files) {
    var encoder = new TextEncoder();
    var locals = [];
    var centrals = [];
    var offset = 0;
    files.forEach(function (f) {
      var name = encoder.encode(f.name);
      var data = f.bytes;
      var crc = crc32(data);
      var loc = new Uint8Array(30 + name.length + data.length);
      var v = new DataView(loc.buffer);
      v.setUint32(0, 0x04034b50, true);
      v.setUint16(4, 20, true);
      v.setUint32(14, crc, true);
      v.setUint32(18, data.length, true);
      v.setUint32(22, data.length, true);
      v.setUint16(26, name.length, true);
      loc.set(name, 30);
      loc.set(data, 30 + name.length);
      locals.push(loc);
      var cen = new Uint8Array(46 + name.length);
      var cv = new DataView(cen.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, data.length, true);
      cv.setUint32(24, data.length, true);
      cv.setUint16(28, name.length, true);
      cv.setUint32(42, offset, true);
      cen.set(name, 46);
      centrals.push(cen);
      offset += loc.length;
    });
    var cenSize = centrals.reduce(function (n, x) { return n + x.length; }, 0);
    var end = new Uint8Array(22);
    var ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, cenSize, true);
    ev.setUint32(16, offset, true);
    var out = new Uint8Array(offset + cenSize + 22);
    var p = 0;
    locals.forEach(function (x) { out.set(x, p); p += x.length; });
    centrals.forEach(function (x) { out.set(x, p); p += x.length; });
    out.set(end, p);
    return new Blob([out], { type: "application/zip" });
  }

  async function buildBackup() {
    var logs = await loadLogs();
    var photos = [];
    var db = await openDb();
    for (var i = 0; i < state.products.length; i++) {
      var p = state.products[i];
      if (!p.photoId) continue;
      var rec = await req(db.transaction("photos").objectStore("photos").get(p.photoId));
      if (rec && rec.blob) {
        photos.push({ id: rec.id, mimeType: rec.mimeType || rec.blob.type, base64: await blobToBase64(rec.blob) });
      }
    }
    return {
      version: 2,
      exportedAt: Date.now(),
      products: state.products.map(normalizeProduct),
      logs: logs,
      photos: photos,
    };
  }

  async function saveBlob(filename, blob) {
    var file = new File([blob], filename, { type: blob.type || "application/octet-stream" });
    if (window.showSaveFilePicker) {
      try {
        var handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{ description: filename, accept: { [blob.type || "application/octet-stream"]: ["." + (filename.split(".").pop() || "bin")] } }],
        });
        var writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return "downloaded";
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }
    if (navigator.canShare) {
      try {
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: filename });
          return "shared";
        }
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }
    try {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      a.target = "_blank";
      a.style.position = "fixed";
      a.style.left = "-9999px";
      document.body.appendChild(a);
      a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 4000);
      return "downloaded";
    } catch (_) {
      return "failed";
    }
  }

  function parseBackup(text) {
    var parsed = JSON.parse(text);
    if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.logs)) throw new Error("bad file");
    if (parsed.version != null && parsed.version !== 1 && parsed.version !== 2) throw new Error("bad file");
    return parsed;
  }

  async function importBackup(parsed) {
    var photos = Array.isArray(parsed.photos) ? parsed.photos : [];
    await withTx(["products", "logs", "photos", "meta"], "readwrite", function (tx) {
      tx.objectStore("products").clear();
      tx.objectStore("logs").clear();
      tx.objectStore("photos").clear();
      parsed.products.forEach(function (p) { tx.objectStore("products").put(normalizeProduct(p)); });
      parsed.logs.forEach(function (l) {
        var field = l.field === "reference" ? "article" : l.field;
        tx.objectStore("logs").put({
          id: l.id || uid(),
          productId: l.productId,
          productName: l.productName,
          field: field,
          oldValue: l.oldValue == null ? null : l.oldValue,
          newValue: l.newValue == null ? null : l.newValue,
          at: l.at || Date.now(),
        });
      });
      photos.forEach(function (ph) {
        if (!ph || !ph.id || !ph.base64) return;
        tx.objectStore("photos").put({
          id: ph.id,
          mimeType: ph.mimeType || "image/jpeg",
          blob: base64ToBlob(ph.base64, ph.mimeType),
        });
      });
    });
    Object.keys(state.photoUrls).forEach(function (id) { URL.revokeObjectURL(state.photoUrls[id]); });
    state.photoUrls = {};
    state.photoOrder = [];
    await refresh();
    if (state.page === "logs") await loadLogs();
  }

  async function collectSource() {
    var files = [];
    var listing = [];
    for (var i = 0; i < SOURCE_FILES.length; i++) {
      var name = SOURCE_FILES[i];
      var res = await fetch("./" + name, { cache: "no-store" });
      if (!res.ok) throw new Error(name);
      var buf = new Uint8Array(await res.arrayBuffer());
      var text = "";
      try { text = new TextDecoder("utf-8").decode(buf); } catch (_) { text = ""; }
      files.push({ name: name, bytes: buf });
      listing.push({ name: name, size: buf.length, text: text });
    }
    return {
      listing: listing,
      blob: zipStore(files),
      json: null,
      filename: "lot-tracker-source.zip",
    };
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  function logoSvg() {
    return '<svg class="mark" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3.5" y="8.5" width="19" height="16" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 14.5h19" stroke="currentColor" stroke-width="1.6"/><path d="M13 8.5v16" stroke="currentColor" stroke-width="1.2" opacity="0.7"/><rect x="17.5" y="5.5" width="11" height="9" rx="1.5" fill="currentColor"/><path d="M20 10h6M20 12.2h4" stroke="#eef5fc" stroke-width="1.3" stroke-linecap="round"/></svg>';
  }
  function photoHtml(name, photoId, size) {
    var cls = size === "lg" ? "lg" : size === "sm" ? "sm" : "";
    if (state.photoPreview && size === "lg") {
      return '<img class="thumb ' + cls + '" src="' + esc(state.photoPreview) + '" alt="">';
    }
    if (photoId && state.photoUrls[photoId]) return '<img class="thumb ' + cls + '" src="' + esc(state.photoUrls[photoId]) + '" alt="">';
    if (photoId) return '<div class="avatar ' + cls + '" data-photo="' + esc(photoId) + '" aria-hidden="true">' + esc(initials(name)) + "</div>";
    return '<div class="avatar ' + cls + '" aria-hidden="true">' + esc(initials(name)) + "</div>";
  }

  function pageFromLocation() {
    var hash = location.hash || "";
    if (hash.indexOf("logs") >= 0) return "logs";
    if (location.protocol !== "file:" && /(^|\/)logs\/?$/.test(location.pathname || "")) return "logs";
    return "products";
  }

  function renderShell(inner) {
    var page = state.page;
    return '<div class="app-shell">' +
      '<header class="topbar">' +
        '<a class="brand" href="#/" data-nav="products">' + logoSvg() + "<span>" + esc(t("appName")) + "</span></a>" +
        '<nav class="nav-desk">' +
          '<a href="#/" class="' + (page === "products" ? "secondary" : "outline") + '" data-nav="products">' + ICONS.pack + esc(t("products")) + "</a>" +
          '<a href="#/logs" class="' + (page === "logs" ? "secondary" : "outline") + '" data-nav="logs">' + ICONS.history + esc(t("logs")) + "</a>" +
        "</nav>" +
        '<div class="top-actions">' +
          '<button class="icon-btn outline" type="button" data-act="theme" aria-label="' + esc(t("theme")) + '">' + (state.theme === "dark" ? ICONS.sun : ICONS.moon) + "</button>" +
          '<div class="rel">' +
            '<button class="icon-btn outline" type="button" data-menu="lang" aria-label="' + esc(t("language")) + '">' + ICONS.globe + "</button>" +
            (state.menu === "lang" ? langMenu() : "") +
          "</div>" +
          '<div class="rel">' +
            '<button class="icon-btn outline" type="button" data-menu="more" aria-label="' + esc(t("overflow")) + '">' + ICONS.more + "</button>" +
            (state.menu === "more" ? moreMenu() : "") +
          "</div>" +
        "</div>" +
      "</header>" +
      inner +
      '<nav class="bottom"><div class="bottom-grid">' +
        '<a href="#/" class="' + (page === "products" ? "active" : "") + '" data-nav="products">' + ICONS.pack + esc(t("products")) + "</a>" +
        '<a href="#/logs" class="' + (page === "logs" ? "active" : "") + '" data-nav="logs">' + ICONS.history + esc(t("logs")) + "</a>" +
      "</div></nav></div>" +
      dialogsHtml();
  }
  function langMenu() {
    return '<div class="menu"><div class="label">' + esc(t("language")) + "</div>" +
      LANGS.map(function (c) {
        return '<button type="button" data-lang="' + c + '">' + (state.lang === c ? "• " : "") + esc(LANG_LABEL[c]) + "</button>";
      }).join("") +
      "</div>";
  }
  function moreMenu() {
    return '<div class="menu"><div class="label">' + esc(t("settings")) + "</div>" +
      '<button type="button" data-act="settings">' + ICONS.files + esc(t("settings")) + "</button>" +
      '<button type="button" data-act="export">' + ICONS.download + esc(t("exportBackup")) + "</button>" +
      '<button type="button" data-act="import">' + ICONS.upload + esc(t("importBackup")) + "</button>" +
      '<button type="button" data-act="source">' + ICONS.files + esc(t("downloadSource")) + "</button>" +
      "</div>";
  }

  function productRows(list) {
    if (!list.length) {
      var empty = state.query ? t("emptySearch") : t("noProducts");
      var hint = state.query ? "" : '<p class="hint">' + esc(t("noProductsHint")) + "</p>";
      var cta = state.query ? "" : '<button class="desk-add" type="button" data-act="add">' + ICONS.plus + esc(t("addProduct")) + "</button>";
      return '<div class="empty">' + logoSvg() + "<p>" + esc(empty) + "</p>" + hint + cta + "</div>";
    }
    var cards = list.map(function (p) {
      return '<article class="card">' + photoHtml(p.name, p.photoId) +
        '<div class="grow"><div class="head-row">' +
          "<div class='grow'><p class='name'>" + esc(p.name) + "</p><p class='ref'>" + esc(articleOf(p)) + "</p></div>" +
          rowMenu(p) +
        "</div>" +
        '<button type="button" class="lot-chip" data-lot="' + esc(p.id) + '"><span class="k">' + esc(t("lot")) + "</span>" + esc(p.lot) + "</button>" +
        '<div class="row-foot"><span class="muted">' + esc(t("updated")) + " " + esc(formatWhen(p.updatedAt)) + "</span>" +
        '<button type="button" class="outline w-auto" data-logs="' + esc(p.id) + '">' + ICONS.history + esc(t("openLogs")) + "</button></div></div></article>";
    }).join("");
    var rows = list.map(function (p) {
      return "<tr><td><div class='cell-name'>" + photoHtml(p.name, p.photoId, "sm") + esc(p.name) + "</div></td>" +
        "<td class='mono'>" + esc(articleOf(p)) + "</td>" +
        "<td><button type='button' class='lot-chip' data-lot='" + esc(p.id) + "'>" + esc(p.lot) + "</button></td>" +
        "<td class='muted'>" + esc(formatWhen(p.updatedAt)) + "</td>" +
        "<td><div class='actions'><button type='button' class='outline w-auto' data-logs='" + esc(p.id) + "'>" + ICONS.history + esc(t("openLogs")) + "</button>" +
        rowMenu(p) + "</div></td></tr>";
    }).join("");
    return '<ul class="cards">' + cards + "</ul>" +
      '<div class="table-wrap"><table class="striped"><thead><tr>' +
      "<th>" + esc(t("name")) + "</th><th>" + esc(t("article")) + "</th><th>" + esc(t("lot")) + "</th><th>" + esc(t("updated")) + "</th><th></th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  }
  function rowMenu(p) {
    var open = state.menu === "row:" + p.id;
    return '<div class="rel"><button type="button" class="icon-btn outline" data-menu="row:' + esc(p.id) + '" aria-label="' + esc(t("more")) + '">' + ICONS.more + "</button>" +
      (open ? '<div class="menu">' +
        '<button type="button" data-edit="' + esc(p.id) + '">' + ICONS.pencil + esc(t("edit")) + "</button>" +
        '<button type="button" data-logs="' + esc(p.id) + '">' + ICONS.history + esc(t("openLogs")) + "</button>" +
        "<hr><button type='button' class='contrast' data-del='" + esc(p.id) + "'>" + ICONS.trash + esc(t("delete")) + "</button>" +
      "</div>" : "") + "</div>";
  }

  function renderProducts() {
    var q = state.query.trim().toLowerCase();
    var list = state.products.filter(function (p) {
      if (!q) return true;
      return (p.name + " " + articleOf(p) + " " + p.lot).toLowerCase().indexOf(q) >= 0;
    });
    return '<main class="wrap"><div class="toolbar"><div>' +
      '<p class="page-kicker">' + esc(t("tagline")) + "</p>" +
      "<h1 class='page-title'>" + esc(t("products")) + "</h1>" +
      '<p class="page-meta">' + esc(t("productCount", { n: state.products.length })) + "</p></div>" +
      '<button class="desk-add" type="button" data-act="add">' + ICONS.plus + esc(t("addProduct")) + "</button></div>" +
      '<div class="search">' + ICONS.search + '<input type="search" id="q" placeholder="' + esc(t("search")) + '" value="' + esc(state.query) + '"></div>' +
      productRows(list) +
      '<button class="fab" type="button" data-act="add" aria-label="' + esc(t("addProduct")) + '">' + ICONS.plus + "</button></main>";
  }

  function renderLogs() {
    var q = state.logQuery.trim().toLowerCase();
    var list = state.logs.filter(function (l) {
      if (state.logFilter !== "all" && l.field !== state.logFilter && !(state.logFilter === "article" && l.field === "reference")) return false;
      if (!q) return true;
      return (l.productName + " " + (l.oldValue || "") + " " + (l.newValue || "") + " " + l.field).toLowerCase().indexOf(q) >= 0;
    });
    var filters = ["all", "lot", "name", "article", "created", "deleted"].map(function (k) {
      var label = k === "all" ? t("allFields") : fieldLabel(k);
      return '<button type="button" class="' + (state.logFilter === k ? "active" : "outline") + '" data-filter="' + k + '">' + esc(label) + "</button>";
    }).join("");
    return '<main class="wrap"><p class="page-kicker">' + esc(t("allChanges")) + "</p>" +
      "<h1 class='page-title'>" + esc(t("logs")) + "</h1>" +
      '<p class="page-meta">' + esc(t("logCount", { n: list.length })) + "</p>" +
      '<div class="search">' + ICONS.search + '<input type="search" id="lq" placeholder="' + esc(t("searchLogs")) + '" value="' + esc(state.logQuery) + '"></div>' +
      '<div class="filters">' + filters + "</div>" + timeline(list, true) + "</main>";
  }

  function timeline(items, showProduct) {
    if (!items.length) {
      return '<div class="empty"><p>' + esc(t("noLogs")) + '</p><p class="hint">' + esc(t("noLogsHint")) + "</p></div>";
    }
    var groups = [];
    items.forEach(function (log) {
      var day = formatDay(log.at);
      if (!groups.length || groups[groups.length - 1].day !== day) groups.push({ day: day, items: [] });
      groups[groups.length - 1].items.push(log);
    });
    return groups.map(function (g) {
      var rows = g.items.map(function (log) {
        var body;
        if (log.field === "created" || log.field === "deleted") {
          body = '<span class="muted mono">' + esc(log.newValue || log.oldValue || "") + "</span>";
        } else {
          body = '<span class="delta"><span class="old">' + esc(log.oldValue) + "</span>" + ICONS.arrow + '<span class="new">' + esc(log.newValue) + "</span></span>";
        }
        var variant = log.field === "lot" ? "lot" : log.field === "created" ? "ok" : log.field === "deleted" ? "bad" : "";
        return '<div class="log"><time>' + esc(formatTime(log.at)) + "</time><div>" +
          (showProduct ? '<p class="name">' + esc(log.productName) + "</p>" : "") +
          '<div class="head-row" style="margin-top:6px;flex-wrap:wrap;align-items:center">' +
          '<span class="badge ' + variant + '">' + esc(fieldLabel(log.field)) + "</span>" + body +
          "</div></div></div>";
      }).join("");
      return '<h3 class="day">' + esc(g.day) + "</h3>" + rows;
    }).join("");
  }

  function dialogsHtml() {
    var html = "";
    if (state.formOpen) {
      var p = state.editing;
      var title = p ? t("editProduct") : t("addProduct");
      var hasPhoto = (p && p.photoId && !state.removePhoto) || state.photoFile;
      html += '<dialog id="form-dlg"><article><button type="button" class="close-x" data-act="close-form" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
        '<form id="prod-form"><header><h2>' + esc(title) + "</h2><p>" + esc(t("photoHint")) + "</p></header>" +
        '<div class="photo-row">' + photoHtml((p && p.name) || t("initialsPhoto"), p && !state.removePhoto ? p.photoId : null, "lg") +
        '<div class="stack"><label class="file-btn" for="photo-file">' + ICONS.image + esc(hasPhoto ? t("changePhoto") : t("uploadPhoto")) + "</label>" +
        (hasPhoto ? '<button type="button" class="outline" data-act="clear-photo">' + ICONS.trash + esc(t("removePhoto")) + "</button>" : "") +
        "</div></div>" +
        '<label for="f-name">' + esc(t("name")) + '</label><input id="f-name" value="' + esc(p ? p.name : "") + '" autocomplete="off">' +
        '<label for="f-art">' + esc(t("article")) + '</label><input id="f-art" class="mono" value="' + esc(p ? articleOf(p) : "") + '" autocomplete="off" spellcheck="false">' +
        '<label for="f-lot">' + esc(t("lot")) + '</label><input id="f-lot" class="mono" value="' + esc(p ? p.lot : "") + '" autocomplete="off" spellcheck="false">' +
        '<p id="form-err" class="err"></p>' +
        '<footer><button type="button" class="outline" data-act="close-form">' + esc(t("cancel")) + "</button>" +
        '<button type="submit">' + esc(t("save")) + "</button></footer></form></article></dialog>";
    }
    if (state.lotProduct) {
      var lp = state.lotProduct;
      html += '<dialog id="lot-dlg"><article><button type="button" class="close-x" data-act="close-lot" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
        '<form id="lot-form"><header><h2>' + esc(t("updateLot")) + "</h2><p>" + esc(lp.name) + "</p></header>" +
        '<label for="q-lot">' + esc(t("newLot")) + '</label><input id="q-lot" class="mono" value="' + esc(lp.lot) + '" autocomplete="off" spellcheck="false">' +
        '<footer><button type="button" class="outline" data-act="close-lot">' + esc(t("cancel")) + "</button>" +
        '<button type="submit">' + esc(t("saveLot")) + "</button></footer></form></article></dialog>";
    }
    if (state.logsProduct) {
      var gp = state.logsProduct;
      html += '<dialog id="logs-dlg"><article style="max-width:36rem"><button type="button" class="close-x" data-act="close-logs" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
        "<header><h2>" + esc(t("changeHistory")) + "</h2><p>" + esc(gp.name) + "</p></header>" +
        timeline(state.productLogs, false) + "</article></dialog>";
    }
    if (state.deleting) {
      html += '<dialog id="del-dlg"><article><header><h2>' + esc(t("confirmDeleteTitle")) + "</h2>" +
        "<p>" + esc(t("confirmDeleteBody", { name: state.deleting.name })) + "</p></header>" +
        '<footer><button type="button" class="outline" data-act="close-del">' + esc(t("cancel")) + "</button>" +
        '<button type="button" class="contrast" data-act="confirm-del">' + esc(t("delete")) + "</button></footer></article></dialog>";
    }
    if (state.settingsOpen) {
      html += '<dialog id="set-dlg"><article><button type="button" class="close-x" data-act="close-settings" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
        "<header><h2>" + esc(t("settings")) + "</h2></header>" +
        '<p class="muted">' + esc(t("language")) + "</p><div class='lang-row'>" +
        LANGS.map(function (c) {
          return '<button type="button" class="' + (state.lang === c ? "" : "outline") + '" data-lang="' + c + '">' + esc(LANG_LABEL[c]) + "</button>";
        }).join("") + "</div>" +
        '<div class="settings-list">' +
          '<button type="button" data-act="export">' + ICONS.download + esc(t("exportBackup")) + "</button>" +
          '<button type="button" data-act="import">' + ICONS.upload + esc(t("importBackup")) + "</button>" +
          '<button type="button" class="outline" data-act="source">' + ICONS.files + esc(t("downloadSource")) + "</button>" +
        "</div></article></dialog>";
    }
    if (state.exportReady) {
      html += '<dialog id="ex-dlg"><article><button type="button" class="close-x" data-act="close-export" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
        "<header><h2>" + esc(t("backupReadyTitle")) + "</h2><p>" + esc(t("backupReadyBody")) + "</p></header>" +
        '<div class="export-box"><textarea id="export-json" readonly>' + esc(state.exportReady.json) + "</textarea></div>" +
        '<footer>' +
          '<button type="button" class="outline" data-act="copy-export">' + ICONS.copy + esc(t("copyJson")) + "</button>" +
          '<button type="button" class="outline" data-act="share-export">' + ICONS.share + esc(t("shareFile")) + "</button>" +
          '<button type="button" data-act="save-export">' + ICONS.download + esc(t("saveFile")) + "</button>" +
        "</footer></article></dialog>";
    }
    if (state.importOpen) {
      html += '<dialog id="imp-open-dlg"><article><button type="button" class="close-x" data-act="close-import" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
        "<header><h2>" + esc(t("importOpenTitle")) + "</h2><p>" + esc(t("pasteHint")) + "</p></header>" +
        '<div class="stack" style="margin-bottom:0.75rem">' +
          '<button type="button" class="outline" data-act="pick-import">' + ICONS.upload + esc(t("chooseFile")) + "</button>" +
        "</div>" +
        '<label for="import-json">' + esc(t("pasteJson")) + "</label>" +
        '<textarea id="import-json" class="import-json" spellcheck="false">' + esc(state.importText) + "</textarea>" +
        (state.importError ? '<p class="err">' + esc(state.importError) + "</p>" : "") +
        '<footer><button type="button" class="outline" data-act="close-import">' + esc(t("cancel")) + "</button>" +
        '<button type="button" class="contrast" data-act="apply-import">' + esc(t("confirmImport")) + "</button></footer></article></dialog>";
    } else if (state.importPending) {
      html += '<dialog id="imp-dlg"><article><header><h2>' + esc(t("confirmImportTitle")) + "</h2>" +
        "<p>" + esc(t("confirmImportBody")) + "</p></header>" +
        '<footer><button type="button" class="outline" data-act="close-import">' + esc(t("cancel")) + "</button>" +
        '<button type="button" class="contrast" data-act="confirm-import">' + esc(t("confirmImport")) + "</button></footer></article></dialog>";
    }
    if (state.sourceOpen) {
      if (state.sourceView) {
        html += '<dialog id="src-view-dlg"><article style="max-width:42rem"><button type="button" class="close-x" data-act="close-source-view" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
          "<header><h2>" + esc(t("sourceViewTitle")) + "</h2><p class='mono'>" + esc(state.sourceView.name) + "</p></header>" +
          '<div class="export-box"><textarea id="source-text" readonly>' + esc(state.sourceView.text) + "</textarea></div>" +
          '<footer><button type="button" class="outline" data-act="close-source-view">' + esc(t("close")) + "</button>" +
          '<button type="button" data-act="copy-source-file">' + ICONS.copy + esc(t("copyFile")) + "</button></footer></article></dialog>";
      } else {
        var rows = (state.sourceListing || []).map(function (f) {
          return '<li><button type="button" class="src-row" data-view-src="' + esc(f.name) + '"><span>' + esc(f.name) + '</span><span class="sz">' + esc(formatBytes(f.size)) + " · " + esc(t("viewFile")) + "</span></button></li>";
        }).join("");
        html += '<dialog id="src-dlg"><article><button type="button" class="close-x" data-act="close-source" aria-label="' + esc(t("close")) + '">' + ICONS.x + "</button>" +
          "<header><h2>" + esc(t("sourceTitle")) + "</h2><p>" + esc(t("sourceHint")) + "</p></header>" +
          (rows ? '<ul class="source-list">' + rows + "</ul>" : "<p>" + esc(t("preparing")) + "</p>") +
          '<footer><button type="button" class="outline" data-act="close-source">' + esc(t("close")) + "</button>" +
          (state.sourceReady ? '<button type="button" data-act="save-source">' + ICONS.download + esc(t("saveFile")) + "</button>" : "") +
          "</footer></article></dialog>";
      }
    }
    return html;
  }

  function formatBytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
    return (n / (1024 * 1024)).toFixed(1) + " MB";
  }

  function render() {
    var root = document.getElementById("app");
    var boot = document.getElementById("boot");
    if (boot) boot.hidden = true;
    root.hidden = false;
    if (state.error) {
      root.innerHTML =
        '<main class="error-full"><p>' + esc(t("storageError")) + "</p><p class='muted'>" + esc(state.error) + "</p>" +
        '<button type="button" data-act="retry">' + esc(t("retry")) + "</button></main>";
      openDialogs();
      return;
    }
    var focus = null;
    var sel = null;
    var active = document.activeElement;
    if (active && (active.id === "q" || active.id === "lq" || active.id === "f-name" || active.id === "f-art" || active.id === "f-lot" || active.id === "q-lot" || active.id === "import-json")) {
      focus = active.id;
      sel = [active.selectionStart, active.selectionEnd];
    }
    root.innerHTML = renderShell(state.page === "logs" ? renderLogs() : renderProducts());
    openDialogs();
    bindPhotos();
    if (focus) {
      var el = document.getElementById(focus);
      if (el) {
        el.focus();
        if (sel && typeof el.setSelectionRange === "function") {
          try { el.setSelectionRange(sel[0], sel[1]); } catch (_) {}
        }
      }
    }
    window.__lkReady = true;
  }

  function openDialogs() {
    document.querySelectorAll("#app dialog").forEach(function (d) {
      try {
        if (typeof d.showModal === "function" && !d.open) d.showModal();
        else d.setAttribute("open", "");
      } catch (_) {
        d.setAttribute("open", "");
      }
    });
  }

  function bindOnce() {
    if (bound) return;
    bound = true;
    var root = document.getElementById("app");
    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("input", onInput);
    root.addEventListener("cancel", function (e) {
      if (e.target && e.target.tagName === "DIALOG") {
        e.preventDefault();
        closeTopDialog();
      }
    }, true);
    document.addEventListener("click", function (e) {
      if (!state.menu) return;
      if (e.target.closest("[data-menu], .menu")) return;
      state.menu = null;
      render();
    });
    document.getElementById("import-file").addEventListener("change", onImportFile);
    document.getElementById("photo-file").addEventListener("change", onPhotoFile);
  }

  function closeTopDialog() {
    if (state.formOpen) { state.formOpen = false; state.editing = null; clearPhotoDraft(); }
    else if (state.lotProduct) state.lotProduct = null;
    else if (state.logsProduct) { state.logsProduct = null; state.productLogs = []; }
    else if (state.deleting) state.deleting = null;
    else if (state.exportReady) state.exportReady = null;
    else if (state.sourceView) state.sourceView = null;
    else if (state.importOpen) { state.importOpen = false; state.importText = ""; state.importError = ""; }
    else if (state.importPending) state.importPending = null;
    else if (state.sourceOpen) { state.sourceOpen = false; state.sourceReady = null; state.sourceView = null; }
    else if (state.settingsOpen) state.settingsOpen = false;
    else return;
    render();
  }

  function onClick(e) {
    var el = e.target.closest("[data-nav], [data-act], [data-menu], [data-lang], [data-lot], [data-logs], [data-edit], [data-del], [data-filter], [data-view-src]");
    if (!el) return;
    if (el.hasAttribute("data-nav")) {
      e.preventDefault();
      go(el.getAttribute("data-nav"));
      return;
    }
    if (el.hasAttribute("data-menu")) {
      e.stopPropagation();
      var id = el.getAttribute("data-menu");
      state.menu = state.menu === id ? null : id;
      render();
      return;
    }
    if (el.hasAttribute("data-lang")) { setLang(el.getAttribute("data-lang")); return; }
    if (el.hasAttribute("data-lot")) {
      state.lotProduct = state.products.find(function (p) { return p.id === el.getAttribute("data-lot"); });
      state.menu = null; render();
      setTimeout(function () { var i = document.getElementById("q-lot"); if (i) i.focus(); }, 0);
      return;
    }
    if (el.hasAttribute("data-logs")) {
      var p = state.products.find(function (x) { return x.id === el.getAttribute("data-logs"); });
      if (!p) return;
      loadProductLogs(p.id).then(function () { state.logsProduct = p; state.menu = null; render(); });
      return;
    }
    if (el.hasAttribute("data-edit")) {
      openForm(state.products.find(function (p) { return p.id === el.getAttribute("data-edit"); }));
      return;
    }
    if (el.hasAttribute("data-del")) {
      state.deleting = state.products.find(function (p) { return p.id === el.getAttribute("data-del"); });
      state.menu = null; render();
      return;
    }
    if (el.hasAttribute("data-filter")) { state.logFilter = el.getAttribute("data-filter"); render(); return; }
    if (el.hasAttribute("data-view-src")) {
      var name = el.getAttribute("data-view-src");
      var hit = (state.sourceListing || []).find(function (f) { return f.name === name; });
      if (hit) { state.sourceView = { name: hit.name, text: hit.text || "" }; render(); }
      return;
    }
    if (el.hasAttribute("data-act")) onAct(el.getAttribute("data-act"));
  }

  function onAct(act) {
    if (act === "theme") setTheme(state.theme === "dark" ? "light" : "dark");
    if (act === "add") openForm(null);
    if (act === "close-form") { state.formOpen = false; state.editing = null; clearPhotoDraft(); render(); }
    if (act === "close-lot") { state.lotProduct = null; render(); }
    if (act === "close-logs") { state.logsProduct = null; state.productLogs = []; render(); }
    if (act === "close-del") { state.deleting = null; render(); }
    if (act === "confirm-del") {
      var p = state.deleting; state.deleting = null;
      removeProduct(p.id).then(render);
    }
    if (act === "settings") { state.settingsOpen = true; state.menu = null; render(); }
    if (act === "close-settings") { state.settingsOpen = false; render(); }
    if (act === "export") startExport();
    if (act === "import") openImport();
    if (act === "pick-import") pickImportFile();
    if (act === "apply-import") applyImportText();
    if (act === "close-export") { state.exportReady = null; render(); }
    if (act === "save-export") saveReady("export");
    if (act === "share-export") saveReady("export");
    if (act === "copy-export") copyReady("export");
    if (act === "close-import") {
      state.importPending = null;
      state.importOpen = false;
      state.importText = "";
      state.importError = "";
      render();
    }
    if (act === "confirm-import") confirmImport();
    if (act === "source") startSource();
    if (act === "close-source") { state.sourceOpen = false; state.sourceReady = null; state.sourceView = null; render(); }
    if (act === "close-source-view") { state.sourceView = null; render(); }
    if (act === "copy-source-file") copySourceFile();
    if (act === "save-source") saveReady("source");
    if (act === "clear-photo") { clearPhotoDraft(); state.removePhoto = true; render(); }
    if (act === "retry") boot();
  }

  function onSubmit(e) {
    if (e.target && e.target.id === "prod-form") { e.preventDefault(); onSaveProduct(); }
    if (e.target && e.target.id === "lot-form") { e.preventDefault(); onSaveLot(); }
  }
  function onInput(e) {
    if (e.target && e.target.id === "q") { state.query = e.target.value; render(); }
    if (e.target && e.target.id === "lq") { state.logQuery = e.target.value; render(); }
    if (e.target && e.target.id === "import-json") { state.importText = e.target.value; state.importError = ""; }
  }

  function openForm(product) {
    clearPhotoDraft();
    state.formOpen = true;
    state.editing = product || null;
    state.removePhoto = false;
    state.menu = null;
    render();
    setTimeout(function () { var i = document.getElementById("f-name"); if (i) i.focus(); }, 0);
  }
  function clearPhotoDraft() {
    if (state.photoPreview) URL.revokeObjectURL(state.photoPreview);
    state.photoFile = null;
    state.photoPreview = null;
  }

  async function onSaveProduct() {
    var name = document.getElementById("f-name").value;
    var article = document.getElementById("f-art").value;
    var lot = document.getElementById("f-lot").value;
    var err = document.getElementById("form-err");
    if (!name.trim()) { err.textContent = t("nameRequired"); return; }
    if (!article.trim()) { err.textContent = t("articleRequired"); return; }
    if (!lot.trim()) { err.textContent = t("lotRequired"); return; }
    var taken = state.products.some(function (p) {
      return p.id !== (state.editing && state.editing.id) && articleOf(p).trim().toLowerCase() === article.trim().toLowerCase();
    });
    if (taken) { err.textContent = t("articleTaken"); return; }
    var draft = { name: name, article: article, lot: lot, photoFile: state.photoFile, removePhoto: state.removePhoto };
    if (state.editing) await updateProduct(state.editing.id, draft);
    else await addProduct(draft);
    state.formOpen = false; state.editing = null; clearPhotoDraft(); state.removePhoto = false;
    render();
  }
  async function onSaveLot() {
    var lot = document.getElementById("q-lot").value;
    if (!lot.trim()) return;
    await updateLot(state.lotProduct.id, lot);
    state.lotProduct = null;
    render();
  }

  function startExport() {
    state.menu = null;
    state.settingsOpen = false;
    buildBackup().then(function (data) {
      var json = JSON.stringify(data, null, 2);
      var filename = "lot-tracker-backup-" + new Date().toISOString().slice(0, 10) + ".json";
      var blob = new Blob([json], { type: "application/json" });
      state.exportReady = { blob: blob, json: json, filename: filename };
      render();
      toast(t("backupExported"));
      saveBlob(filename, blob).then(function (result) {
        if (result === "failed") toast(t("saveFailed"));
      });
    }).catch(function () { toast(t("backupFailed")); });
  }

  function openImport() {
    state.menu = null;
    state.settingsOpen = false;
    state.importOpen = true;
    state.importError = "";
    render();
    setTimeout(function () {
      var ta = document.getElementById("import-json");
      if (ta) ta.focus();
    }, 0);
  }

  function pickImportFile() {
    var input = document.getElementById("import-file");
    if (!input) return;
    input.value = "";
    input.click();
  }

  function applyImportText() {
    var ta = document.getElementById("import-json");
    var text = ta ? ta.value : state.importText;
    state.importText = text;
    try {
      var parsed = parseBackup(text);
      state.importOpen = false;
      state.importError = "";
      state.importPending = parsed;
      render();
    } catch (_) {
      state.importError = t("backupFailed");
      render();
    }
  }

  function startSource() {
    state.menu = null;
    state.settingsOpen = false;
    state.sourceOpen = true;
    state.sourceReady = null;
    state.sourceListing = null;
    render();
    collectSource().then(function (pack) {
      state.sourceListing = pack.listing;
      state.sourceReady = { blob: pack.blob, filename: pack.filename, json: "" };
      render();
    }).catch(function () { toast(t("backupFailed")); });
  }

  function saveReady(kind) {
    var pack = kind === "source" ? state.sourceReady : state.exportReady;
    if (!pack) return;
    saveBlob(pack.filename, pack.blob).then(function (result) {
      if (result === "failed") toast(t("saveFailed"));
      else if (result !== "cancelled") toast(kind === "source" ? t("sourceDownloaded") : t("backupExported"));
    });
  }
  function copyReady(kind) {
    var pack = kind === "source" ? state.sourceReady : state.exportReady;
    if (!pack || !pack.json) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pack.json).then(function () { toast(t("copied")); }).catch(fallbackCopy);
    } else fallbackCopy();
    function fallbackCopy() {
      var ta = document.getElementById("export-json");
      if (!ta) return;
      ta.focus(); ta.select();
      try { document.execCommand("copy"); toast(t("copied")); } catch (_) { toast(t("saveFailed")); }
    }
  }

  function copySourceFile() {
    if (!state.sourceView || !state.sourceView.text) return;
    var text = state.sourceView.text;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(t("copied")); }).catch(fallback);
    } else fallback();
    function fallback() {
      var ta = document.getElementById("source-text");
      if (!ta) return;
      ta.focus(); ta.select();
      try { document.execCommand("copy"); toast(t("copied")); } catch (_) { toast(t("saveFailed")); }
    }
  }

  function onImportFile(e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    state.menu = null;
    file.text().then(function (text) {
      try {
        var parsed = parseBackup(text);
        state.importOpen = false;
        state.importText = text;
        state.importError = "";
        state.importPending = parsed;
        render();
      } catch (_) {
        state.importOpen = true;
        state.importText = text;
        state.importError = t("backupFailed");
        render();
      }
    }).catch(function () { toast(t("backupFailed")); });
  }
  function confirmImport() {
    var parsed = state.importPending;
    state.importPending = null;
    importBackup(parsed).then(function () {
      toast(t("backupImported"));
      render();
    }).catch(function () { toast(t("backupFailed")); render(); });
  }
  function onPhotoFile(e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (state.photoPreview) URL.revokeObjectURL(state.photoPreview);
    state.photoFile = file;
    state.photoPreview = URL.createObjectURL(file);
    state.removePhoto = false;
    render();
  }

  function bindPhotos() {
    observers.forEach(function (o) { o.disconnect(); });
    observers = [];
    document.querySelectorAll("[data-photo]").forEach(function (el) {
      var id = el.getAttribute("data-photo");
      if (!id) return;
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0] || !entries[0].isIntersecting) return;
        io.disconnect();
        if (state.photoUrls[id]) { swapPhoto(el, state.photoUrls[id]); return; }
        openDb()
          .then(function (db) { return req(db.transaction("photos").objectStore("photos").get(id)); })
          .then(function (rec) {
            if (!rec || !el.isConnected) return;
            var url = URL.createObjectURL(rec.blob);
            rememberPhoto(id, url);
            swapPhoto(el, url);
          });
      }, { rootMargin: "120px" });
      io.observe(el);
      observers.push(io);
    });
  }
  function rememberPhoto(id, url) {
    state.photoUrls[id] = url;
    state.photoOrder.push(id);
    if (state.photoOrder.length > 24) {
      var drop = state.photoOrder.shift();
      if (state.photoUrls[drop]) {
        URL.revokeObjectURL(state.photoUrls[drop]);
        delete state.photoUrls[drop];
      }
    }
  }
  function swapPhoto(el, url) {
    var img = document.createElement("img");
    img.className = el.className.replace("avatar", "thumb");
    img.alt = "";
    img.src = url;
    el.replaceWith(img);
  }

  function go(page) {
    state.page = page === "logs" ? "logs" : "products";
    state.menu = null;
    if (location.protocol === "file:") {
      var nextHash = state.page === "logs" ? "#/logs" : "#/";
      if (location.hash !== nextHash) location.hash = nextHash;
    } else {
      var url = state.page === "logs" ? "/logs" : "/";
      if (location.pathname !== url) history.pushState({ page: state.page }, "", url);
    }
    if (state.page === "logs") { loadLogs().then(render); return; }
    state.logs = [];
    render();
  }

  function installPreviewBridge() {
    if (window.parent === window) return;
    var parentOrigin = null;
    try {
      if (document.referrer) parentOrigin = new URL(document.referrer).origin;
    } catch (_) {}
    if (typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length) {
      parentOrigin = location.ancestorOrigins[0];
    }
    if (!parentOrigin) return;
    function post(msg) { window.parent.postMessage(msg, parentOrigin); }
    function loc() {
      post({
        channel: "grok-preview-bridge", version: 1, type: "location",
        path: location.pathname || "/", search: location.search, hash: location.hash,
      });
    }
    window.addEventListener("message", function (event) {
      if (event.source !== window.parent || event.origin !== parentOrigin) return;
      var data = event.data || {};
      if (data.channel !== "grok-preview-bridge") return;
      if (data.type === "hello") {
        loc();
        post({ channel: "grok-preview-bridge", version: 1, type: "routes", paths: ["/", "/logs"] });
        post({ channel: "grok-preview-bridge", version: 1, type: "ready" });
      }
      if (data.type === "navigate" && typeof data.path === "string") {
        if (data.path.indexOf("logs") >= 0) go("logs"); else go("products");
      }
      if (data.type === "history" && (data.delta === 1 || data.delta === -1)) history.go(data.delta);
    });
  }

  async function boot() {
    state.lang = detectLang();
    state.theme = detectTheme();
    applyPrefs();
    state.page = pageFromLocation();
    try {
      await openDb();
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
      await refresh();
      if (state.page === "logs") await loadLogs();
      state.error = null;
    } catch (err) {
      state.error = err && err.message ? err.message : String(err);
    }
    bindOnce();
    render();
  }

  window.addEventListener("hashchange", function () {
    var page = pageFromLocation();
    if (page !== state.page) go(page);
  });
  window.addEventListener("popstate", function () {
    var page = pageFromLocation();
    if (page !== state.page) {
      state.page = page;
      if (page === "logs") loadLogs().then(render);
      else render();
    }
  });

  installPreviewBridge();
  boot();
})();
