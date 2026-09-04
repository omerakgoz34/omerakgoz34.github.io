/* app.js — boot, state, events
 *   render, go, setLang, setTheme
 *   product save, LOT update, backup import/export
 */

import { t as tLang, detectLang, detectTheme } from "./i18n.js";
import {
  articleOf,
  openDb,
  listProducts,
  listLogs,
  listProductLogs,
  getPhoto,
  addProduct,
  updateProduct,
  updateLot,
  removeProduct,
  buildBackup,
  parseBackup,
  importBackup,
  saveBlob,
} from "./database.js";
import { renderApp, renderError, toast } from "./ui.js";

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
  exportReady: null,
  importPending: null,
  importOpen: false,
  importText: "",
  importError: "",
  narrow: typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
};

var observers = [];
var bound = false;

function t(key, vars) {
  return tLang(state.lang, key, vars);
}

function applyPrefs() {
  document.documentElement.lang = state.lang;
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.style.colorScheme = state.theme;
  document.title = t("appName");
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", state.theme === "dark" ? "#16171a" : "#2c3540");
  try {
    localStorage.setItem("lotkeep.lang", state.lang);
    localStorage.setItem("lotkeep.theme", state.theme);
  } catch (_) {}
}

function setLang(lang) {
  state.lang = lang;
  applyPrefs();
  render();
}

function setTheme(theme) {
  state.theme = theme;
  applyPrefs();
  render();
}

async function refreshProducts() {
  state.products = await listProducts();
}

function pageFromLocation() {
  var hash = location.hash || "";
  if (hash.indexOf("logs") >= 0) return "logs";
  if (location.protocol !== "file:" && /(^|\/)logs\/?$/.test(location.pathname || "")) return "logs";
  return "products";
}

function hasDialog() {
  return !!(state.formOpen || state.lotProduct || state.logsProduct || state.deleting || state.exportReady || state.importOpen || state.importPending);
}

function render() {
  var root = document.getElementById("app");
  var boot = document.getElementById("boot");
  if (boot) boot.hidden = true;
  root.hidden = false;
  document.body.classList.toggle("has-dialog", hasDialog());
  if (state.error) {
    root.innerHTML = renderError(state, t);
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
  root.innerHTML = renderApp(state);
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
  root.addEventListener("change", onChange);
  root.addEventListener("cancel", function (e) {
    if (e.target && e.target.tagName === "DIALOG") {
      e.preventDefault();
      closeTopDialog();
    }
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (hasDialog()) {
      e.preventDefault();
      closeTopDialog();
    }
  });
  window.addEventListener("resize", function () {
    var narrow = window.matchMedia("(max-width: 767px)").matches;
    if (narrow !== state.narrow) {
      state.narrow = narrow;
      render();
    }
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
  else if (state.importOpen) { state.importOpen = false; state.importText = ""; state.importError = ""; }
  else if (state.importPending) state.importPending = null;
  else return;
  render();
}

function onClick(e) {
  var el = e.target.closest("[data-nav], [data-act], [data-lot], [data-logs], [data-edit], [data-del]");
  if (!el) return;
  if (el.hasAttribute("data-nav")) {
    e.preventDefault();
    go(el.getAttribute("data-nav"));
    return;
  }
  if (el.hasAttribute("data-lot")) {
    state.lotProduct = state.products.find(function (p) { return p.id === el.getAttribute("data-lot"); });
    render();
    setTimeout(function () { var i = document.getElementById("q-lot"); if (i) i.focus(); }, 0);
    return;
  }
  if (el.hasAttribute("data-logs")) {
    var p = state.products.find(function (x) { return x.id === el.getAttribute("data-logs"); });
    if (!p) return;
    listProductLogs(p.id).then(function (logs) {
      state.productLogs = logs;
      state.logsProduct = p;
      render();
    });
    return;
  }
  if (el.hasAttribute("data-edit")) {
    openForm(state.products.find(function (p) { return p.id === el.getAttribute("data-edit"); }));
    return;
  }
  if (el.hasAttribute("data-del")) {
    state.deleting = state.products.find(function (p) { return p.id === el.getAttribute("data-del"); });
    render();
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
    var p = state.deleting;
    state.deleting = null;
    removeProduct(p).then(function () { return refreshProducts(); }).then(render);
  }
  if (act === "export") startExport();
  if (act === "import") openImport();
  if (act === "pick-import") pickImportFile();
  if (act === "apply-import") applyImportText();
  if (act === "close-export") { state.exportReady = null; render(); }
  if (act === "save-export") saveReady();
  if (act === "share-export") saveReady();
  if (act === "copy-export") copyReady();
  if (act === "close-import") {
    state.importPending = null;
    state.importOpen = false;
    state.importText = "";
    state.importError = "";
    render();
  }
  if (act === "confirm-import") confirmImport();
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

function onChange(e) {
  if (e.target && e.target.id === "lang-sel") setLang(e.target.value);
  if (e.target && e.target.id === "log-filter") {
    state.logFilter = e.target.value;
    render();
  }
}

function openForm(product) {
  clearPhotoDraft();
  state.formOpen = true;
  state.editing = product || null;
  state.removePhoto = false;
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
  if (state.editing) await updateProduct(state.editing, draft);
  else await addProduct(draft);
  state.formOpen = false;
  state.editing = null;
  clearPhotoDraft();
  state.removePhoto = false;
  await refreshProducts();
  render();
}

async function onSaveLot() {
  var lot = document.getElementById("q-lot").value;
  if (!lot.trim()) return;
  await updateLot(state.lotProduct, lot);
  state.lotProduct = null;
  await refreshProducts();
  render();
}

function startExport() {
  buildBackup(state.products).then(function (data) {
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

function saveReady() {
  var pack = state.exportReady;
  if (!pack) return;
  saveBlob(pack.filename, pack.blob).then(function (result) {
    if (result === "failed") toast(t("saveFailed"));
    else if (result !== "cancelled") toast(t("backupExported"));
  });
}

function copyReady() {
  var pack = state.exportReady;
  if (!pack || !pack.json) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(pack.json).then(function () { toast(t("copied")); }).catch(fallbackCopy);
  } else fallbackCopy();
  function fallbackCopy() {
    var ta = document.getElementById("export-json");
    if (!ta) return;
    ta.focus();
    ta.select();
    try { document.execCommand("copy"); toast(t("copied")); } catch (_) { toast(t("saveFailed")); }
  }
}

function onImportFile(e) {
  var file = e.target.files && e.target.files[0];
  e.target.value = "";
  if (!file) return;
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
    Object.keys(state.photoUrls).forEach(function (id) { URL.revokeObjectURL(state.photoUrls[id]); });
    state.photoUrls = {};
    state.photoOrder = [];
    return refreshProducts();
  }).then(function () {
    if (state.page === "logs") return listLogs().then(function (logs) { state.logs = logs; });
  }).then(function () {
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
      getPhoto(id).then(function (rec) {
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
  if (location.protocol === "file:") {
    var nextHash = state.page === "logs" ? "#/logs" : "#/";
    if (location.hash !== nextHash) location.hash = nextHash;
  } else {
    var url = state.page === "logs" ? "/logs" : "/";
    if (location.pathname !== url) history.pushState({ page: state.page }, "", url);
  }
  if (state.page === "logs") {
    listLogs().then(function (logs) { state.logs = logs; render(); });
    return;
  }
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
    await refreshProducts();
    if (state.page === "logs") state.logs = await listLogs();
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
    if (page === "logs") listLogs().then(function (logs) { state.logs = logs; render(); });
    else render();
  }
});

installPreviewBridge();
boot();
