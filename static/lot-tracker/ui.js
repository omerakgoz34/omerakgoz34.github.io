/* ui.js — HTML rendering: chrome, register, logs, dialogs */

import { LANGS, LANG_LABEL, t as tLang, formatWhen, formatDay, formatTime, fieldLabel } from "./i18n.js";
import { articleOf, initials } from "./database.js";

export function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;")
    .replace(/'/g, "&#39;");
}

function photoHtml(state, name, photoId, size) {
  var cls = size === "lg" ? "lg" : "";
  if (state.photoPreview && size === "lg") {
    return '<img class="thumb ' + cls + '" src="' + esc(state.photoPreview) + '" alt="">';
  }
  if (photoId && state.photoUrls[photoId]) {
    return '<img class="thumb ' + cls + '" src="' + esc(state.photoUrls[photoId]) + '" alt="">';
  }
  if (photoId) {
    return '<div class="avatar ' + cls + '" data-photo="' + esc(photoId) + '" aria-hidden="true">' + esc(initials(name)) + "</div>";
  }
  return '<div class="avatar ' + cls + '" aria-hidden="true">' + esc(initials(name)) + "</div>";
}

function actionLinks(p, t, includeLot) {
  return '<button type="button" class="btn-link" data-edit="' + esc(p.id) + '">' + esc(t("edit")) + "</button>" +
    (includeLot === false ? "" : '<button type="button" class="btn-link" data-lot="' + esc(p.id) + '">' + esc(t("lot")) + "</button>") +
    '<button type="button" class="btn-link" data-logs="' + esc(p.id) + '">' + esc(t("openLogs")) + "</button>" +
    '<button type="button" class="btn-link danger" data-del="' + esc(p.id) + '">' + esc(t("delete")) + "</button>";
}

function timeline(state, items, showProduct, t) {
  if (!items.length) {
    return '<div class="empty"><p>' + esc(t("noLogs")) + '</p><p class="hint">' + esc(t("noLogsHint")) + "</p></div>";
  }
  var groups = [];
  items.forEach(function (log) {
    var day = formatDay(log.at, state.lang);
    if (!groups.length || groups[groups.length - 1].day !== day) groups.push({ day: day, items: [] });
    groups[groups.length - 1].items.push(log);
  });
  return groups.map(function (g) {
    var rows = g.items.map(function (log) {
      var change;
      if (log.field === "created" || log.field === "deleted") {
        change = esc(log.newValue || log.oldValue || "");
      } else {
        change = '<span class="delta"><span class="old">' + esc(log.oldValue) + "</span> → <span class=\"new\">" + esc(log.newValue) + "</span></span>";
      }
      var variant = log.field === "lot" ? "lot" : log.field === "created" ? "ok" : log.field === "deleted" ? "bad" : "";
      return "<tr>" +
        "<td class='mono muted'>" + esc(formatTime(log.at, state.lang)) + "</td>" +
        (showProduct ? "<td>" + esc(log.productName) + "</td>" : "") +
        "<td><span class='badge " + variant + "'>" + esc(fieldLabel(log.field, state.lang)) + "</span></td>" +
        "<td>" + change + "</td></tr>";
    }).join("");
    return '<h3 class="day">' + esc(g.day) + "</h3>" +
      '<div class="table-wrap"><table><thead><tr>' +
      "<th>" + esc(t("updated")) + "</th>" +
      (showProduct ? "<th>" + esc(t("name")) + "</th>" : "") +
      "<th>" + esc(t("field")) + "</th><th></th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  }).join("");
}

function productRows(state, list, t) {
  if (!list.length) {
    var empty = state.query ? t("emptySearch") : t("noProducts");
    var hint = state.query ? "" : '<p class="hint">' + esc(t("noProductsHint")) + "</p>";
    var cta = state.query ? "" : '<p><button class="btn primary" type="button" data-act="add">' + esc(t("addProduct")) + "</button></p>";
    return '<div class="empty"><p>' + esc(empty) + "</p>" + hint + cta + "</div>";
  }
  if (state.narrow) {
    return '<div class="records">' + list.map(function (p) {
      return '<section class="record"><div class="record-top">' +
        photoHtml(state, p.name, p.photoId) +
        "<dl>" +
        "<dt>" + esc(t("name")) + "</dt><dd class='name'>" + esc(p.name) + "</dd>" +
        "<dt>" + esc(t("article")) + "</dt><dd class='mono'>" + esc(articleOf(p)) + "</dd>" +
        "<dt>" + esc(t("lot")) + "</dt><dd class='lot-val'><button type='button' class='btn-link mono' data-lot='" + esc(p.id) + "'>" + esc(p.lot) + "</button></dd>" +
        "<dt>" + esc(t("updated")) + "</dt><dd class='muted'>" + esc(formatWhen(p.updatedAt, state.lang)) + "</dd>" +
        "</dl></div>" +
        '<div class="record-actions">' + actionLinks(p, t, false) + "</div></section>";
    }).join("") + "</div>";
  }
  var rows = list.map(function (p) {
    return "<tr><td><div class='cell-name'>" + photoHtml(state, p.name, p.photoId) + esc(p.name) + "</div></td>" +
      "<td class='mono'>" + esc(articleOf(p)) + "</td>" +
      "<td class='lot-cell'><button type='button' class='btn-link mono' data-lot='" + esc(p.id) + "'>" + esc(p.lot) + "</button></td>" +
      "<td class='muted'>" + esc(formatWhen(p.updatedAt, state.lang)) + "</td>" +
      "<td><div class='row-actions'>" + actionLinks(p, t) + "</div></td></tr>";
  }).join("");
  return '<div class="table-wrap"><table><thead><tr>' +
    "<th>" + esc(t("name")) + "</th><th>" + esc(t("article")) + "</th><th>" + esc(t("lot")) + "</th>" +
    "<th>" + esc(t("updated")) + "</th><th>" + esc(t("actions")) + "</th>" +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>";
}

function renderProducts(state, t) {
  var q = state.query.trim().toLowerCase();
  var list = state.products.filter(function (p) {
    if (!q) return true;
    return (p.name + " " + articleOf(p) + " " + p.lot).toLowerCase().indexOf(q) >= 0;
  });
  return '<div class="toolbar">' +
    '<div class="find"><label for="q">' + esc(t("find")) + "</label>" +
    '<input type="search" id="q" placeholder="' + esc(t("search")) + '" value="' + esc(state.query) + '"></div>' +
    '<div class="toolbar-actions">' +
      '<button class="btn primary" type="button" data-act="add">' + esc(t("addProduct")) + "</button>" +
      '<button class="btn" type="button" data-act="export">' + esc(t("exportBackup")) + "</button>" +
      '<button class="btn" type="button" data-act="import">' + esc(t("importBackup")) + "</button>" +
    "</div></div>" +
    productRows(state, list, t);
}

function renderLogs(state, t) {
  var q = state.logQuery.trim().toLowerCase();
  var list = state.logs.filter(function (l) {
    if (state.logFilter !== "all" && l.field !== state.logFilter && !(state.logFilter === "article" && l.field === "reference")) return false;
    if (!q) return true;
    return (l.productName + " " + (l.oldValue || "") + " " + (l.newValue || "") + " " + l.field).toLowerCase().indexOf(q) >= 0;
  });
  var opts = ["all", "lot", "name", "article", "created", "deleted"].map(function (k) {
    var label = k === "all" ? t("allFields") : fieldLabel(k, state.lang);
    return '<option value="' + k + '"' + (state.logFilter === k ? " selected" : "") + ">" + esc(label) + "</option>";
  }).join("");
  return '<div class="log-tools">' +
    '<div class="find"><label for="lq">' + esc(t("find")) + "</label>" +
    '<input type="search" id="lq" placeholder="' + esc(t("searchLogs")) + '" value="' + esc(state.logQuery) + '"></div>' +
    '<label class="field-filter">' + esc(t("field")) +
    ' <select id="log-filter">' + opts + "</select></label></div>" +
    timeline(state, list, true, t);
}

function dlg(id, title, body, foot, extra) {
  return '<dialog id="' + id + '"' + (extra || "") + ">" +
    '<div class="dlg-title"><h2>' + title + '</h2>' +
    (foot ? "" : "") +
    "</div>" +
    '<div class="dlg-body">' + body + "</div>" +
    (foot ? '<div class="dlg-foot">' + foot + "</div>" : "") +
    "</dialog>";
}

function dialogsHtml(state, t) {
  var html = "";
  if (state.formOpen) {
    var p = state.editing;
    var title = p ? t("editProduct") : t("addProduct");
    var hasPhoto = (p && p.photoId && !state.removePhoto) || state.photoFile;
    var body = "<p>" + esc(t("photoHint")) + "</p>" +
      '<form id="prod-form">' +
      '<div class="form-grid">' +
      '<label for="f-name">' + esc(t("name")) + "</label>" +
      '<input id="f-name" value="' + esc(p ? p.name : "") + '" autocomplete="off">' +
      '<label for="f-art">' + esc(t("article")) + "</label>" +
      '<input id="f-art" class="mono" value="' + esc(p ? articleOf(p) : "") + '" autocomplete="off" spellcheck="false">' +
      '<label for="f-lot">' + esc(t("lot")) + "</label>" +
      '<input id="f-lot" class="mono" value="' + esc(p ? p.lot : "") + '" autocomplete="off" spellcheck="false">' +
      '<label>' + esc(t("photo")) + "</label>" +
      '<div class="photo-edit">' + photoHtml(state, (p && p.name) || t("initialsPhoto"), p && !state.removePhoto ? p.photoId : null, "lg") +
      '<div class="stack"><label class="btn" for="photo-file">' + esc(hasPhoto ? t("changePhoto") : t("uploadPhoto")) + "</label>" +
      (hasPhoto ? '<button type="button" class="btn" data-act="clear-photo">' + esc(t("removePhoto")) + "</button>" : "") +
      "</div></div></div>" +
      '<p id="form-err" class="err"></p>' +
      "</form>";
    var foot = '<button type="button" class="btn" data-act="close-form">' + esc(t("cancel")) + "</button>" +
      '<button type="submit" class="btn primary" form="prod-form">' + esc(t("save")) + "</button>";
    html += dlg("form-dlg", esc(title), body, foot);
  }
  if (state.lotProduct) {
    var lp = state.lotProduct;
    html += dlg(
      "lot-dlg",
      esc(t("updateLot")),
      "<p>" + esc(lp.name) + "</p>" +
      '<form id="lot-form"><div class="form-grid"><label for="q-lot">' + esc(t("newLot")) + "</label>" +
      '<input id="q-lot" class="mono" value="' + esc(lp.lot) + '" autocomplete="off" spellcheck="false"></div></form>',
      '<button type="button" class="btn" data-act="close-lot">' + esc(t("cancel")) + "</button>" +
      '<button type="submit" class="btn primary" form="lot-form">' + esc(t("saveLot")) + "</button>",
    );
  }
  if (state.logsProduct) {
    var gp = state.logsProduct;
    html += dlg(
      "logs-dlg",
      esc(t("changeHistory")),
      "<p>" + esc(gp.name) + "</p>" + timeline(state, state.productLogs, false, t),
      '<button type="button" class="btn" data-act="close-logs">' + esc(t("close")) + "</button>",
      ' class="wide"',
    );
  }
  if (state.deleting) {
    html += dlg(
      "del-dlg",
      esc(t("confirmDeleteTitle")),
      "<p>" + esc(t("confirmDeleteBody", { name: state.deleting.name })) + "</p>",
      '<button type="button" class="btn" data-act="close-del">' + esc(t("cancel")) + "</button>" +
      '<button type="button" class="btn danger" data-act="confirm-del">' + esc(t("delete")) + "</button>",
    );
  }
  if (state.exportReady) {
    html += dlg(
      "ex-dlg",
      esc(t("backupReadyTitle")),
      "<p>" + esc(t("backupReadyBody")) + "</p>" +
      '<textarea id="export-json" readonly>' + esc(state.exportReady.json) + "</textarea>",
      '<button type="button" class="btn" data-act="copy-export">' + esc(t("copyJson")) + "</button>" +
      '<button type="button" class="btn" data-act="share-export">' + esc(t("shareFile")) + "</button>" +
      '<button type="button" class="btn primary" data-act="save-export">' + esc(t("saveFile")) + "</button>" +
      '<button type="button" class="btn" data-act="close-export">' + esc(t("close")) + "</button>",
    );
  }
  if (state.importOpen) {
    html += dlg(
      "imp-open-dlg",
      esc(t("importOpenTitle")),
      "<p>" + esc(t("pasteHint")) + "</p>" +
      '<p><button type="button" class="btn" data-act="pick-import">' + esc(t("chooseFile")) + "</button></p>" +
      '<div class="form-grid"><label for="import-json">' + esc(t("pasteJson")) + "</label>" +
      '<textarea id="import-json" class="import-json" spellcheck="false">' + esc(state.importText) + "</textarea></div>" +
      (state.importError ? '<p class="err">' + esc(state.importError) + "</p>" : ""),
      '<button type="button" class="btn" data-act="close-import">' + esc(t("cancel")) + "</button>" +
      '<button type="button" class="btn primary" data-act="apply-import">' + esc(t("confirmImport")) + "</button>",
    );
  } else if (state.importPending) {
    html += dlg(
      "imp-dlg",
      esc(t("confirmImportTitle")),
      "<p>" + esc(t("confirmImportBody")) + "</p>",
      '<button type="button" class="btn" data-act="close-import">' + esc(t("cancel")) + "</button>" +
      '<button type="button" class="btn danger" data-act="confirm-import">' + esc(t("confirmImport")) + "</button>",
    );
  }
  return html;
}

export function renderApp(state) {
  function t(key, vars) { return tLang(state.lang, key, vars); }
  var page = state.page;
  var inner = page === "logs" ? renderLogs(state, t) : renderProducts(state, t);
  var count = page === "logs" ? t("logCount", { n: state.logs.length }) : t("productCount", { n: state.products.length });
  var langOpts = LANGS.map(function (c) {
    return '<option value="' + c + '"' + (state.lang === c ? " selected" : "") + ">" + esc(LANG_LABEL[c]) + "</option>";
  }).join("");
  return '<div class="app-shell">' +
    '<header class="titlebar">' +
      '<a class="brand" href="#/" data-nav="products">' + esc(t("appName")) + "</a>" +
      '<div class="title-tools">' +
        '<button class="btn" type="button" data-act="theme">' + esc(state.theme === "dark" ? t("light") : t("dark")) + "</button>" +
        '<label>' + esc(t("language")) +
        ' <select id="lang-sel" aria-label="' + esc(t("language")) + '">' + langOpts + "</select></label>" +
      "</div>" +
    "</header>" +
    '<nav class="tabs" aria-label="' + esc(t("appName")) + '">' +
      '<a href="#/" class="' + (page === "products" ? "active" : "") + '" data-nav="products">' + esc(t("products")) + "</a>" +
      '<a href="#/logs" class="' + (page === "logs" ? "active" : "") + '" data-nav="logs">' + esc(t("logs")) + "</a>" +
    "</nav>" +
    '<main class="work">' + inner + "</main>" +
    '<footer class="statusbar">' + esc(t("tagline")) + " · " + esc(count) + "</footer>" +
    "</div>" +
    dialogsHtml(state, t);
}

export function renderError(state, t) {
  return '<main class="error-full"><p>' + esc(t("storageError")) + "</p><p class='muted'>" + esc(state.error) + "</p>" +
    '<button type="button" class="btn primary" data-act="retry">' + esc(t("retry")) + "</button></main>";
}

export function toast(msg) {
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
