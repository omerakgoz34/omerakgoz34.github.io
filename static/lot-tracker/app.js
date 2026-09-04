/* LOT Tracker — offline warehouse tracker. Edit this file by hand. No build step. */
(function () {
  "use strict";

  const LANGS = ["en", "tr", "de"];
  const LANG_LABEL = { en: "English", tr: "Türkçe", de: "Deutsch" };
  const LANG_LOCALE = { en: "en-GB", tr: "tr-TR", de: "de-DE" };
  const ICONS = {
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
  };

  const dict = {
    en: {
      appName: "LOT Tracker", tagline: "Warehouse product tracker", products: "Products", logs: "Logs",
      addProduct: "Add product", editProduct: "Edit product", name: "Name", reference: "Reference",
      lot: "LOT", photo: "Photo", photoHint: "Optional. Changes are not logged.", save: "Save",
      cancel: "Cancel", delete: "Delete", edit: "Edit", close: "Close",
      search: "Search name, reference, or LOT", searchLogs: "Search products or values",
      noProducts: "No products yet",
      noProductsHint: "Add a product to start tracking names, references, and LOT numbers.",
      emptySearch: "No matching products", changeHistory: "Change history", allChanges: "All changes",
      added: "Added", removed: "Removed", noLogs: "No changes recorded",
      noLogsHint: "Edits to name, reference, and LOT will appear here.",
      updateLot: "Update LOT", newLot: "New LOT number", themeLight: "Light", themeDark: "Dark",
      language: "Language",
      confirmDeleteTitle: "Delete this product?",
      confirmDeleteBody: "“{name}” will be removed from the warehouse list. Change history is kept.",
      uploadPhoto: "Upload photo", changePhoto: "Replace photo", removePhoto: "Remove photo",
      exportBackup: "Export backup", importBackup: "Import backup",
      backupExported: "Backup downloaded", backupImported: "Backup imported",
      backupFailed: "Could not import this file", justNow: "Just now", updated: "Updated",
      more: "More", settings: "Settings", nameRequired: "Enter a product name",
      referenceRequired: "Enter a reference number", lotRequired: "Enter a LOT number",
      referenceTaken: "Another product already uses this reference",
      productCount: "{n} products", logCount: "{n} entries", allFields: "All fields",
      saveLot: "Save LOT", today: "Today", yesterday: "Yesterday", openLogs: "Logs",
      overflow: "Menu", theme: "Theme",
      storageError: "This browser could not open local storage. LOT Tracker needs IndexedDB.",
      retry: "Retry", initialsPhoto: "Product",
    },
    tr: {
      appName: "LOT Takibi", tagline: "Depo ürün takibi", products: "Ürünler", logs: "Kayıtlar",
      addProduct: "Ürün ekle", editProduct: "Ürünü düzenle", name: "Ad", reference: "Referans",
      lot: "LOT", photo: "Fotoğraf", photoHint: "İsteğe bağlı. Fotoğraf değişiklikleri kaydedilmez.",
      save: "Kaydet", cancel: "İptal", delete: "Sil", edit: "Düzenle", close: "Kapat",
      search: "Ad, referans veya LOT ara", searchLogs: "Ürün veya değer ara",
      noProducts: "Henüz ürün yok",
      noProductsHint: "Ad, referans ve LOT numaralarını izlemek için bir ürün ekleyin.",
      emptySearch: "Eşleşen ürün yok", changeHistory: "Değişiklik geçmişi", allChanges: "Tüm değişiklikler",
      added: "Eklendi", removed: "Silindi", noLogs: "Kayıt yok",
      noLogsHint: "Ad, referans ve LOT düzenlemeleri burada görünür.",
      updateLot: "LOT güncelle", newLot: "Yeni LOT numarası", themeLight: "Açık", themeDark: "Koyu",
      language: "Dil",
      confirmDeleteTitle: "Bu ürün silinsin mi?",
      confirmDeleteBody: "“{name}” depo listesinden kaldırılacak. Değişiklik geçmişi saklanır.",
      uploadPhoto: "Fotoğraf yükle", changePhoto: "Fotoğrafı değiştir", removePhoto: "Fotoğrafı kaldır",
      exportBackup: "Yedek dışa aktar", importBackup: "Yedek içe aktar",
      backupExported: "Yedek indirildi", backupImported: "Yedek içe aktarıldı",
      backupFailed: "Bu dosya içe aktarılamadı", justNow: "Az önce", updated: "Güncellendi",
      more: "Daha fazla", settings: "Ayarlar", nameRequired: "Ürün adı girin",
      referenceRequired: "Referans numarası girin", lotRequired: "LOT numarası girin",
      referenceTaken: "Bu referans başka bir üründe kayıtlı",
      productCount: "{n} ürün", logCount: "{n} kayıt", allFields: "Tüm alanlar",
      saveLot: "LOT kaydet", today: "Bugün", yesterday: "Dün", openLogs: "Kayıtlar",
      overflow: "Menü", theme: "Tema",
      storageError: "Tarayıcı yerel depolamayı açamadı. LOT Takibi IndexedDB gerektirir.",
      retry: "Yeniden dene", initialsPhoto: "Ürün",
    },
    de: {
      appName: "LOT-Tracker", tagline: "Lager-Produkttracker", products: "Produkte", logs: "Protokoll",
      addProduct: "Produkt hinzufügen", editProduct: "Produkt bearbeiten", name: "Name",
      reference: "Referenz", lot: "LOT", photo: "Foto",
      photoHint: "Optional. Fotoänderungen werden nicht protokolliert.",
      save: "Speichern", cancel: "Abbrechen", delete: "Löschen", edit: "Bearbeiten", close: "Schließen",
      search: "Name, Referenz oder LOT suchen", searchLogs: "Produkte oder Werte suchen",
      noProducts: "Noch keine Produkte",
      noProductsHint: "Fügen Sie ein Produkt hinzu, um Namen, Referenzen und LOT-Nummern zu verfolgen.",
      emptySearch: "Keine passenden Produkte", changeHistory: "Änderungshistorie",
      allChanges: "Alle Änderungen", added: "Hinzugefügt", removed: "Entfernt",
      noLogs: "Keine Einträge", noLogsHint: "Änderungen an Name, Referenz und LOT erscheinen hier.",
      updateLot: "LOT aktualisieren", newLot: "Neue LOT-Nummer", themeLight: "Hell", themeDark: "Dunkel",
      language: "Sprache",
      confirmDeleteTitle: "Dieses Produkt löschen?",
      confirmDeleteBody: "„{name}“ wird aus der Lagerliste entfernt. Die Änderungshistorie bleibt erhalten.",
      uploadPhoto: "Foto hochladen", changePhoto: "Foto ersetzen", removePhoto: "Foto entfernen",
      exportBackup: "Sicherung exportieren", importBackup: "Sicherung importieren",
      backupExported: "Sicherung heruntergeladen", backupImported: "Sicherung importiert",
      backupFailed: "Diese Datei konnte nicht importiert werden", justNow: "Gerade eben",
      updated: "Aktualisiert", more: "Mehr", settings: "Einstellungen",
      nameRequired: "Produktname eingeben", referenceRequired: "Referenznummer eingeben",
      lotRequired: "LOT-Nummer eingeben", referenceTaken: "Diese Referenz ist bereits vergeben",
      productCount: "{n} Produkte", logCount: "{n} Einträge", allFields: "Alle Felder",
      saveLot: "LOT speichern", today: "Heute", yesterday: "Gestern", openLogs: "Protokoll",
      overflow: "Menü", theme: "Darstellung",
      storageError: "Dieser Browser konnte den lokalen Speicher nicht öffnen. LOT-Tracker benötigt IndexedDB.",
      retry: "Erneut versuchen", initialsPhoto: "Produkt",
    },
  };

  const state = {
    lang: "en",
    theme: "light",
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
    editing: null,
    lotProduct: null,
    logsProduct: null,
    deleting: null,
    menu: null,
  };

  const DB = "lotkeep";
  let dbp = null;

  function t(key, vars) {
    let s = (dict[state.lang] && dict[state.lang][key]) || dict.en[key] || key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.replaceAll("{" + k + "}", String(vars[k])); });
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
  function uid() { return crypto.randomUUID(); }
  function initials(name) {
    return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("") || "?";
  }

  function detectLang() {
    try {
      const s = localStorage.getItem("lotkeep.lang");
      if (LANGS.includes(s)) return s;
    } catch (_) {}
    const n = (navigator.language || "").toLowerCase();
    if (n.startsWith("tr")) return "tr";
    if (n.startsWith("de")) return "de";
    return "en";
  }
  function detectTheme() {
    try {
      const s = localStorage.getItem("lotkeep.theme");
      if (s === "light" || s === "dark") return s;
    } catch (_) {}
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem("lotkeep.lang", lang); } catch (_) {}
    document.documentElement.lang = lang;
    document.title = t("appName");
    render();
  }
  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("lotkeep.theme", theme); } catch (_) {}
    render();
  }

  function formatWhen(ts) {
    const diff = Date.now() - ts;
    if (diff < 45000) return t("justNow");
    const locale = LANG_LOCALE[state.lang];
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (diff < 3600000) return rtf.format(-Math.round(diff / 60000), "minute");
    if (diff < 86400000) return rtf.format(-Math.round(diff / 3600000), "hour");
    if (diff < 7 * 86400000) return rtf.format(-Math.round(diff / 86400000), "day");
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(ts);
  }
  function formatDay(ts) {
    const d = new Date(ts);
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
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
    if (field === "reference") return t("reference");
    if (field === "lot") return t("lot");
    return field;
  }

  function openDb() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("products")) {
          const s = db.createObjectStore("products", { keyPath: "id" });
          s.createIndex("reference", "reference");
          s.createIndex("lot", "lot");
          s.createIndex("updatedAt", "updatedAt");
        }
        if (!db.objectStoreNames.contains("photos")) db.createObjectStore("photos", { keyPath: "id" });
        if (!db.objectStoreNames.contains("logs")) {
          const s = db.createObjectStore("logs", { keyPath: "id" });
          s.createIndex("productId", "productId");
          s.createIndex("at", "at");
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => { dbp = null; reject(req.error); };
    });
    return dbp;
  }
  function withTx(stores, mode, run) {
    return openDb().then((db) => new Promise((resolve, reject) => {
      const tx = db.transaction(stores, mode);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      run(tx);
    }));
  }
  function req(r) {
    return new Promise((resolve, reject) => { r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
  }

  async function refresh() {
    const db = await openDb();
    const products = await req(db.transaction("products").objectStore("products").getAll());
    products.sort((a, b) => b.updatedAt - a.updatedAt);
    state.products = products;
  }
  async function loadLogs() {
    const db = await openDb();
    const logs = await req(db.transaction("logs").objectStore("logs").getAll());
    logs.sort((a, b) => b.at - a.at);
    state.logs = logs;
    return logs;
  }
  async function loadProductLogs(productId) {
    const db = await openDb();
    const logs = await req(db.transaction("logs").objectStore("logs").index("productId").getAll(productId));
    logs.sort((a, b) => b.at - a.at);
    state.productLogs = logs;
    return logs;
  }
  function rememberPhoto(id, url) {
    state.photoUrls[id] = url;
    const i = state.photoOrder.indexOf(id);
    if (i >= 0) state.photoOrder.splice(i, 1);
    state.photoOrder.push(id);
    while (state.photoOrder.length > 24) {
      const drop = state.photoOrder.shift();
      if (drop && state.photoUrls[drop]) {
        URL.revokeObjectURL(state.photoUrls[drop]);
        delete state.photoUrls[drop];
      }
    }
  }

  async function compressImage(file) {
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      let q = 0.72;
      let blob = await new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(), "image/jpeg", q));
      while (blob.size > 400000 && q > 0.45) {
        q -= 0.08;
        blob = await new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(), "image/jpeg", q));
      }
      canvas.width = 0; canvas.height = 0;
      return blob;
    } catch (_) {
      if (file.size > 2000000) throw new Error("Image too large");
      return file;
    }
  }

  async function storePhoto(file) {
    const blob = await compressImage(file);
    const rec = { id: uid(), blob, mimeType: blob.type || "image/jpeg" };
    await withTx("photos", "readwrite", (tx) => tx.objectStore("photos").put(rec));
    return rec.id;
  }
  async function writeLog(product, field, oldValue, newValue, at) {
    await withTx("logs", "readwrite", (tx) => {
      tx.objectStore("logs").put({
        id: uid(), productId: product.id, productName: product.name,
        field, oldValue, newValue, at: at || Date.now(),
      });
    });
  }

  async function addProduct(draft) {
    const now = Date.now();
    const photoId = draft.photoFile ? await storePhoto(draft.photoFile) : null;
    const product = {
      id: uid(), name: draft.name.trim(), reference: draft.reference.trim(),
      lot: draft.lot.trim(), photoId, createdAt: now, updatedAt: now,
    };
    await withTx("products", "readwrite", (tx) => tx.objectStore("products").put(product));
    await writeLog(product, "created", null, product.name, now);
    await refresh();
  }
  async function updateProduct(id, draft) {
    const current = state.products.find((p) => p.id === id);
    if (!current) return;
    const now = Date.now();
    let photoId = current.photoId;
    if (draft.removePhoto && photoId) {
      await withTx("photos", "readwrite", (tx) => tx.objectStore("photos").delete(photoId));
      photoId = null;
    }
    if (draft.photoFile) {
      if (photoId) await withTx("photos", "readwrite", (tx) => tx.objectStore("photos").delete(photoId));
      photoId = await storePhoto(draft.photoFile);
    }
    const next = { ...current, name: draft.name.trim(), reference: draft.reference.trim(), lot: draft.lot.trim(), photoId, updatedAt: now };
    await withTx("products", "readwrite", (tx) => tx.objectStore("products").put(next));
    if (current.name !== next.name) await writeLog(next, "name", current.name, next.name, now);
    if (current.reference !== next.reference) await writeLog(next, "reference", current.reference, next.reference, now);
    if (current.lot !== next.lot) await writeLog(next, "lot", current.lot, next.lot, now);
    await refresh();
  }
  async function updateLot(id, lot) {
    const current = state.products.find((p) => p.id === id);
    const trimmed = lot.trim();
    if (!current || current.lot === trimmed) return;
    const now = Date.now();
    const next = { ...current, lot: trimmed, updatedAt: now };
    await withTx("products", "readwrite", (tx) => tx.objectStore("products").put(next));
    await writeLog(next, "lot", current.lot, trimmed, now);
    await refresh();
  }
  async function removeProduct(id) {
    const current = state.products.find((p) => p.id === id);
    if (!current) return;
    if (current.photoId) await withTx("photos", "readwrite", (tx) => tx.objectStore("photos").delete(current.photoId));
    await withTx("products", "readwrite", (tx) => tx.objectStore("products").delete(id));
    await writeLog(current, "deleted", current.name, null);
    await refresh();
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] || "");
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });
  }
  function base64ToBlob(b64, mime) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }
  async function exportBackup() {
    const photos = [];
    for (const p of state.products) {
      if (!p.photoId) continue;
      const db = await openDb();
      const rec = await req(db.transaction("photos").objectStore("photos").get(p.photoId));
      if (rec) photos.push({ id: rec.id, mimeType: rec.mimeType, base64: await blobToBase64(rec.blob) });
    }
    const data = { version: 1, exportedAt: Date.now(), products: state.products, logs: await loadLogs(), photos };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lot-tracker-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast(t("backupExported"));
  }
  async function importBackup(file) {
    const parsed = JSON.parse(await file.text());
    if (parsed.version !== 1 || !Array.isArray(parsed.products) || !Array.isArray(parsed.logs)) throw new Error("bad");
    await withTx(["products", "logs", "photos"], "readwrite", (tx) => {
      tx.objectStore("products").clear();
      tx.objectStore("logs").clear();
      tx.objectStore("photos").clear();
      parsed.products.forEach((p) => tx.objectStore("products").put(p));
      parsed.logs.forEach((l) => tx.objectStore("logs").put(l));
      (parsed.photos || []).forEach((ph) => {
        tx.objectStore("photos").put({ id: ph.id, mimeType: ph.mimeType, blob: base64ToBlob(ph.base64, ph.mimeType) });
      });
    });
    await refresh();
    if (state.page === "logs") await loadLogs();
    toast(t("backupImported"));
    render();
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function logoSvg() {
    return '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3.5" y="8.5" width="19" height="16" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 14.5h19" stroke="currentColor" stroke-width="1.6"/><path d="M13 8.5v16" stroke="currentColor" stroke-width="1.2" opacity="0.7"/><rect x="17.5" y="5.5" width="11" height="9" rx="1.5" fill="currentColor"/><path d="M20 10h6M20 12.2h4" stroke="var(--accent-fg)" stroke-width="1.3" stroke-linecap="round"/></svg>';
  }
  function photoHtml(name, photoId, size) {
    const cls = size === "lg" ? "lg" : size === "sm" ? "sm" : "";
    if (photoId && state.photoUrls[photoId]) return '<img class="thumb ' + cls + '" src="' + esc(state.photoUrls[photoId]) + '" alt="">';
    if (photoId) return '<div class="avatar ' + cls + '" data-photo="' + esc(photoId) + '" aria-hidden="true">' + esc(initials(name)) + "</div>";
    return '<div class="avatar ' + cls + '" aria-hidden="true">' + esc(initials(name)) + "</div>";
  }

  function closeMenus() { state.menu = null; }

  function renderShell(inner) {
    const page = state.page;
    return '<div class="app">' +
      '<header class="topbar">' +
        '<a class="brand" href="#/" data-nav="products">' + logoSvg() + "<span>" + esc(t("appName")) + "</span></a>" +
        '<nav class="nav-desk">' +
          '<button class="nav-btn' + (page === "products" ? " active" : "") + '" data-nav="products">' + ICONS.pack + esc(t("products")) + "</button>" +
          '<button class="nav-btn' + (page === "logs" ? " active" : "") + '" data-nav="logs">' + ICONS.history + esc(t("logs")) + "</button>" +
        "</nav>" +
        '<div class="spacer">' +
          '<button class="icon-btn" data-act="theme" aria-label="' + esc(t("theme")) + '">' + (state.theme === "dark" ? ICONS.sun : ICONS.moon) + "</button>" +
          '<div class="rel">' +
            '<button class="icon-btn" data-menu="lang" aria-label="' + esc(t("language")) + '">' + ICONS.globe + "</button>" +
            (state.menu === "lang" ? langMenu() : "") +
          "</div>" +
          '<div class="rel">' +
            '<button class="icon-btn" data-menu="more" aria-label="' + esc(t("overflow")) + '">' + ICONS.more + "</button>" +
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
    return '<div class="menu">' +
      '<div class="label">' + esc(t("language")) + "</div>" +
      LANGS.map((c) => '<button data-lang="' + c + '">' + esc(LANG_LABEL[c]) + "</button>").join("") +
      "</div>";
  }
  function moreMenu() {
    return '<div class="menu">' +
      '<div class="label">' + esc(t("settings")) + "</div>" +
      '<button data-act="export">' + ICONS.download + esc(t("exportBackup")) + "</button>" +
      '<button data-act="import">' + ICONS.upload + esc(t("importBackup")) + "</button>" +
      "</div>";
  }

  function productRows(list) {
    if (!list.length) {
      const empty = state.query ? t("emptySearch") : t("noProducts");
      const hint = state.query ? "" : '<p class="hint">' + esc(t("noProductsHint")) + "</p>";
      const cta = state.query ? "" : '<button class="btn btn-primary" style="margin-top:20px" data-act="add">' + ICONS.plus + esc(t("addProduct")) + "</button>";
      return '<div class="empty">' + logoSvg() + "<p>" + esc(empty) + "</p>" + hint + cta + "</div>";
    }
    const cards = list.map((p) =>
      '<article class="card">' + photoHtml(p.name, p.photoId) +
      '<div class="grow"><div style="display:flex;justify-content:space-between;gap:8px">' +
        "<div class='grow'><div class='name'>" + esc(p.name) + "</div><div class='ref'>" + esc(p.reference) + "</div></div>" +
        rowMenu(p) +
      "</div>" +
      '<button class="lot-chip" data-lot="' + esc(p.id) + '"><span class="k">' + esc(t("lot")) + "</span>" + esc(p.lot) + "</button>" +
      '<div class="row-foot"><span class="muted">' + esc(t("updated")) + " " + esc(formatWhen(p.updatedAt)) + "</span>" +
      '<button class="btn btn-ghost btn-sm" data-logs="' + esc(p.id) + '">' + ICONS.history + esc(t("openLogs")) + "</button></div></div></article>"
    ).join("");
    const rows = list.map((p) =>
      "<tr><td><div class='cell-name'>" + photoHtml(p.name, p.photoId, "sm") + esc(p.name) + "</div></td>" +
      "<td class='mono'>" + esc(p.reference) + "</td>" +
      "<td><button class='lot-chip' style='margin:0' data-lot='" + esc(p.id) + "'>" + esc(p.lot) + "</button></td>" +
      "<td class='muted'>" + esc(formatWhen(p.updatedAt)) + "</td>" +
      "<td><div class='actions'><button class='btn btn-ghost btn-sm' data-logs='" + esc(p.id) + "'>" + ICONS.history + esc(t("openLogs")) + "</button>" +
      rowMenu(p) + "</div></td></tr>"
    ).join("");
    return '<ul class="cards">' + cards + "</ul>" +
      '<div class="table-wrap"><table><thead><tr>' +
      "<th>" + esc(t("name")) + "</th><th>" + esc(t("reference")) + "</th><th>" + esc(t("lot")) + "</th><th>" + esc(t("updated")) + "</th><th></th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  }
  function rowMenu(p) {
    const open = state.menu === "row:" + p.id;
    return '<div class="rel"><button class="icon-btn" data-menu="row:' + esc(p.id) + '" aria-label="' + esc(t("more")) + '">' + ICONS.more + "</button>" +
      (open ? '<div class="menu">' +
        '<button data-edit="' + esc(p.id) + '">' + ICONS.pencil + esc(t("edit")) + "</button>" +
        '<button data-logs="' + esc(p.id) + '">' + ICONS.history + esc(t("openLogs")) + "</button>" +
        "<hr><button class='danger' data-del='" + esc(p.id) + "'>" + ICONS.trash + esc(t("delete")) + "</button>" +
      "</div>" : "") + "</div>";
  }

  function renderProducts() {
    const q = state.query.trim().toLowerCase();
    const list = state.products.filter((p) => !q || (p.name + " " + p.reference + " " + p.lot).toLowerCase().includes(q));
    return '<main class="wrap"><div class="toolbar"><div>' +
      '<p class="page-kicker">' + esc(t("tagline")) + "</p>" +
      "<h1 class='page-title'>" + esc(t("products")) + "</h1>" +
      '<p class="page-meta">' + esc(t("productCount", { n: state.products.length })) + "</p></div>" +
      '<button class="btn btn-primary desk-add" data-act="add">' + ICONS.plus + esc(t("addProduct")) + "</button></div>" +
      '<div class="search">' + ICONS.search + '<input type="search" id="q" placeholder="' + esc(t("search")) + '" value="' + esc(state.query) + '"></div>' +
      productRows(list) +
      '<button class="fab" data-act="add" aria-label="' + esc(t("addProduct")) + '">' + ICONS.plus + "</button></main>";
  }

  function renderLogs() {
    const q = state.logQuery.trim().toLowerCase();
    const list = state.logs.filter((l) => {
      if (state.logFilter !== "all" && l.field !== state.logFilter) return false;
      if (!q) return true;
      return (l.productName + " " + (l.oldValue || "") + " " + (l.newValue || "") + " " + l.field).toLowerCase().includes(q);
    });
    const filters = ["all", "lot", "name", "reference", "created", "deleted"].map((k) => {
      const label = k === "all" ? t("allFields") : fieldLabel(k);
      return '<button class="chip' + (state.logFilter === k ? " active" : "") + '" data-filter="' + k + '">' + esc(label) + "</button>";
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
    const groups = [];
    items.forEach((log) => {
      const day = formatDay(log.at);
      if (!groups.length || groups[groups.length - 1].day !== day) groups.push({ day, items: [] });
      groups[groups.length - 1].items.push(log);
    });
    return groups.map((g) => {
      const rows = g.items.map((log) => {
        let body;
        if (log.field === "created" || log.field === "deleted") {
          body = '<span class="muted" style="font-family:var(--mono);font-size:12px">' + esc(log.newValue || log.oldValue || "") + "</span>";
        } else {
          body = '<span class="delta"><span class="old">' + esc(log.oldValue) + "</span>" + ICONS.arrow + '<span class="new">' + esc(log.newValue) + "</span></span>";
        }
        const variant = log.field === "lot" ? "lot" : log.field === "created" ? "ok" : log.field === "deleted" ? "bad" : "";
        return '<div class="log"><time>' + esc(formatTime(log.at)) + "</time><div>" +
          (showProduct ? '<div class="name">' + esc(log.productName) + "</div>" : "") +
          '<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:8px;align-items:center">' +
          '<span class="badge ' + variant + '">' + esc(fieldLabel(log.field)) + "</span>" + body +
          "</div></div></div>";
      }).join("");
      return '<h3 class="day">' + esc(g.day) + "</h3>" + rows;
    }).join("");
  }

  function dialogsHtml() {
    let html = "";
    if (state.editing !== undefined && state.editing !== false && state.formOpen) {
      const p = state.editing;
      const title = p ? t("editProduct") : t("addProduct");
      html += '<dialog id="form-dlg" open><button class="close-x" data-act="close-form">' + ICONS.x + "</button>" +
        '<form id="prod-form"><div class="dlg-head"><h2>' + esc(title) + "</h2><p>" + esc(t("photoHint")) + "</p></div>" +
        '<div class="photo-row">' + photoHtml((p && p.name) || t("initialsPhoto"), p && !state.removePhoto ? p.photoId : null, "lg") +
        '<div class="stack"><button type="button" class="btn btn-outline btn-sm" data-act="pick-photo">' + ICONS.image + esc((p && p.photoId && !state.removePhoto) || state.photoFile ? t("changePhoto") : t("uploadPhoto")) + "</button>" +
        ((p && p.photoId && !state.removePhoto) || state.photoFile ? '<button type="button" class="btn btn-ghost btn-sm" data-act="clear-photo">' + ICONS.trash + esc(t("removePhoto")) + "</button>" : "") +
        "</div></div>" +
        '<div class="field"><label for="f-name">' + esc(t("name")) + '</label><input id="f-name" value="' + esc(p ? p.name : "") + '"></div>' +
        '<div class="field"><label for="f-ref">' + esc(t("reference")) + '</label><input id="f-ref" class="mono" value="' + esc(p ? p.reference : "") + '"></div>' +
        '<div class="field"><label for="f-lot">' + esc(t("lot")) + '</label><input id="f-lot" class="mono" value="' + esc(p ? p.lot : "") + '"></div>' +
        '<div id="form-err" class="err"></div>' +
        '<div class="dlg-actions"><button type="button" class="btn btn-outline" data-act="close-form">' + esc(t("cancel")) + "</button>" +
        '<button type="submit" class="btn btn-primary">' + esc(t("save")) + "</button></div></form></dialog>";
    }
    if (state.lotProduct) {
      const p = state.lotProduct;
      html += '<dialog id="lot-dlg" open><button class="close-x" data-act="close-lot">' + ICONS.x + "</button>" +
        '<form id="lot-form"><div class="dlg-head"><h2>' + esc(t("updateLot")) + "</h2><p>" + esc(p.name) + "</p></div>" +
        '<div class="field"><label for="q-lot">' + esc(t("newLot")) + '</label><input id="q-lot" class="mono" value="' + esc(p.lot) + '"></div>' +
        '<div class="dlg-actions"><button type="button" class="btn btn-outline" data-act="close-lot">' + esc(t("cancel")) + "</button>" +
        '<button type="submit" class="btn btn-primary">' + esc(t("saveLot")) + "</button></div></form></dialog>";
    }
    if (state.logsProduct) {
      const p = state.logsProduct;
      const items = state.productLogs;
      html += '<dialog id="logs-dlg" open><button class="close-x" data-act="close-logs">' + ICONS.x + "</button>" +
        '<div class="dlg-head"><h2>' + esc(t("changeHistory")) + "</h2><p>" + esc(p.name) + "</p></div>" +
        timeline(items, false) + "</dialog>";
    }
    if (state.deleting) {
      html += '<dialog id="del-dlg" open><div class="dlg-head"><h2>' + esc(t("confirmDeleteTitle")) + "</h2>" +
        "<p>" + esc(t("confirmDeleteBody", { name: state.deleting.name })) + "</p></div>" +
        '<div class="dlg-actions"><button class="btn btn-outline" data-act="close-del">' + esc(t("cancel")) + "</button>" +
        '<button class="btn btn-danger" data-act="confirm-del">' + esc(t("delete")) + "</button></div></dialog>";
    }
    return html;
  }

  function render() {
    if (state.error) {
      document.getElementById("app").innerHTML =
        '<main class="error-full"><p>' + esc(t("storageError")) + "</p><p class='muted'>" + esc(state.error) + "</p>" +
        '<button class="btn btn-primary" style="margin-top:12px" data-act="retry">' + esc(t("retry")) + "</button></main>";
      return;
    }
    const inner = state.page === "logs" ? renderLogs() : renderProducts();
    document.getElementById("app").innerHTML = renderShell(inner);
    bind();
    bindPhotos();
  }

  function bind() {
    document.querySelectorAll("[data-nav]").forEach((el) => {
      el.addEventListener("click", (e) => { e.preventDefault(); go(el.getAttribute("data-nav")); });
    });
    document.querySelectorAll("[data-act]").forEach((el) => el.addEventListener("click", onAct));
    document.querySelectorAll("[data-menu]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = el.getAttribute("data-menu");
        state.menu = state.menu === id ? null : id;
        render();
      });
    });
    document.querySelectorAll("[data-lang]").forEach((el) => el.addEventListener("click", () => setLang(el.getAttribute("data-lang"))));
    document.querySelectorAll("[data-lot]").forEach((el) => el.addEventListener("click", () => {
      state.lotProduct = state.products.find((p) => p.id === el.getAttribute("data-lot"));
      state.menu = null; render();
      setTimeout(() => { const i = document.getElementById("q-lot"); if (i) i.focus(); }, 0);
    }));
    document.querySelectorAll("[data-logs]").forEach((el) => el.addEventListener("click", () => {
      const p = state.products.find((x) => x.id === el.getAttribute("data-logs"));
      if (!p) return;
      state.menu = null;
      loadProductLogs(p.id).then(() => { state.logsProduct = p; render(); });
    }));
    document.querySelectorAll("[data-edit]").forEach((el) => el.addEventListener("click", () => openForm(state.products.find((p) => p.id === el.getAttribute("data-edit")))));
    document.querySelectorAll("[data-del]").forEach((el) => el.addEventListener("click", () => {
      state.deleting = state.products.find((p) => p.id === el.getAttribute("data-del"));
      state.menu = null; render();
    }));
    document.querySelectorAll("[data-filter]").forEach((el) => el.addEventListener("click", () => { state.logFilter = el.getAttribute("data-filter"); render(); }));
    const q = document.getElementById("q");
    if (q) q.addEventListener("input", () => { state.query = q.value; /* live filter without full remount of caret: */ state.menu = null; const pos = q.selectionStart; render(); const nq = document.getElementById("q"); if (nq) { nq.focus(); nq.setSelectionRange(pos, pos); } });
    const lq = document.getElementById("lq");
    if (lq) lq.addEventListener("input", () => { state.logQuery = lq.value; const pos = lq.selectionStart; render(); const n = document.getElementById("lq"); if (n) { n.focus(); n.setSelectionRange(pos, pos); } });
    const form = document.getElementById("prod-form");
    if (form) form.addEventListener("submit", onSaveProduct);
    const lotForm = document.getElementById("lot-form");
    if (lotForm) lotForm.addEventListener("submit", onSaveLot);
    document.addEventListener("click", onDocClick, { once: true });
  }

  function bindPhotos() {
    document.querySelectorAll("[data-photo]").forEach((el) => {
      const id = el.getAttribute("data-photo");
      if (!id) return;
      const io = new IntersectionObserver((entries) => {
        if (!entries[0] || !entries[0].isIntersecting) return;
        io.disconnect();
        if (state.photoUrls[id]) {
          swapPhoto(el, state.photoUrls[id]);
          return;
        }
        openDb()
          .then((db) => req(db.transaction("photos").objectStore("photos").get(id)))
          .then((rec) => {
            if (!rec || !el.isConnected) return;
            const url = URL.createObjectURL(rec.blob);
            rememberPhoto(id, url);
            swapPhoto(el, url);
          });
      }, { rootMargin: "120px" });
      io.observe(el);
    });
  }
  function swapPhoto(el, url) {
    const img = document.createElement("img");
    img.className = el.className.replace("avatar", "thumb");
    img.alt = "";
    img.src = url;
    el.replaceWith(img);
  }

  function onDocClick(e) {
    if (state.menu && !e.target.closest(".rel")) { state.menu = null; render(); }
  }

  function onAct(e) {
    const act = e.currentTarget.getAttribute("data-act");
    if (act === "theme") setTheme(state.theme === "dark" ? "light" : "dark");
    if (act === "add") openForm(null);
    if (act === "close-form") { state.formOpen = false; state.editing = null; state.photoFile = null; state.removePhoto = false; render(); }
    if (act === "close-lot") { state.lotProduct = null; render(); }
    if (act === "close-logs") { state.logsProduct = null; state.productLogs = []; render(); }
    if (act === "close-del") { state.deleting = null; render(); }
    if (act === "confirm-del") { const p = state.deleting; state.deleting = null; removeProduct(p.id).then(render); }
    if (act === "export") exportBackup();
    if (act === "import") {
      const inp = document.createElement("input");
      inp.type = "file"; inp.accept = "application/json";
      inp.onchange = () => { if (inp.files[0]) importBackup(inp.files[0]).catch(() => toast(t("backupFailed"))); };
      inp.click();
    }
    if (act === "pick-photo") {
      const inp = document.createElement("input");
      inp.type = "file"; inp.accept = "image/*";
      inp.onchange = () => {
        if (inp.files[0]) { state.photoFile = inp.files[0]; state.removePhoto = false; render(); }
      };
      inp.click();
    }
    if (act === "clear-photo") { state.photoFile = null; state.removePhoto = true; render(); }
    if (act === "retry") boot();
  }

  function openForm(product) {
    state.formOpen = true;
    state.editing = product || null;
    state.photoFile = null;
    state.removePhoto = false;
    state.menu = null;
    render();
  }

  async function onSaveProduct(e) {
    e.preventDefault();
    const name = document.getElementById("f-name").value;
    const reference = document.getElementById("f-ref").value;
    const lot = document.getElementById("f-lot").value;
    const err = document.getElementById("form-err");
    if (!name.trim()) { err.textContent = t("nameRequired"); return; }
    if (!reference.trim()) { err.textContent = t("referenceRequired"); return; }
    if (!lot.trim()) { err.textContent = t("lotRequired"); return; }
    const taken = state.products.some((p) => p.id !== (state.editing && state.editing.id) && p.reference.trim().toLowerCase() === reference.trim().toLowerCase());
    if (taken) { err.textContent = t("referenceTaken"); return; }
    const draft = { name, reference, lot, photoFile: state.photoFile, removePhoto: state.removePhoto };
    if (state.editing) await updateProduct(state.editing.id, draft);
    else await addProduct(draft);
    state.formOpen = false; state.editing = null; state.photoFile = null; state.removePhoto = false;
    render();
  }
  async function onSaveLot(e) {
    e.preventDefault();
    const lot = document.getElementById("q-lot").value;
    if (!lot.trim()) return;
    await updateLot(state.lotProduct.id, lot);
    state.lotProduct = null;
    render();
  }

  function go(page) {
    state.page = page === "logs" ? "logs" : "products";
    state.menu = null;
    location.hash = state.page === "logs" ? "#/logs" : "#/";
    if (state.page === "logs") {
      loadLogs().then(render);
      return;
    }
    state.logs = [];
    render();
  }

  async function boot() {
    state.lang = detectLang();
    state.theme = detectTheme();
    document.documentElement.lang = state.lang;
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    document.title = t("appName");
    state.page = location.hash.indexOf("logs") >= 0 ? "logs" : "products";
    try {
      await openDb();
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
      await refresh();
      if (state.page === "logs") await loadLogs();
      state.error = null;
    } catch (err) {
      state.error = err && err.message ? err.message : String(err);
    }
    render();
  }

  window.addEventListener("hashchange", () => {
    const page = location.hash.indexOf("logs") >= 0 ? "logs" : "products";
    if (page !== state.page) go(page);
  });

  boot();
})();
