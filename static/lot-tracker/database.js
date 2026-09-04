/* database.js — IndexedDB warehouse
 *   openDb, listProducts, listLogs, listProductLogs, getPhoto
 *   addProduct, updateProduct, updateLot, removeProduct
 *   buildBackup, parseBackup, importBackup, saveBlob
 */

var DB_NAME = "lotkeep";
var dbp = null;

export function uid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}

export function articleOf(p) {
  return (p && (p.article || p.reference)) || "";
}

export function initials(name) {
  return (name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) {
    return p[0].toUpperCase();
  }).join("") || "?";
}

function req(r) {
  return new Promise(function (resolve, reject) {
    r.onsuccess = function () { resolve(r.result); };
    r.onerror = function () { reject(r.error); };
  });
}

export function openDb() {
  if (dbp) return dbp;
  dbp = new Promise(function (resolve, reject) {
    var open = indexedDB.open(DB_NAME, 2);
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

export function normalizeProduct(p) {
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

export async function listProducts() {
  var db = await openDb();
  var products = await req(db.transaction("products").objectStore("products").getAll());
  products = products.map(normalizeProduct);
  products.sort(function (a, b) { return b.updatedAt - a.updatedAt; });
  return products;
}

export async function listLogs() {
  var db = await openDb();
  var logs = await req(db.transaction("logs").objectStore("logs").getAll());
  logs.sort(function (a, b) { return b.at - a.at; });
  return logs;
}

export async function listProductLogs(productId) {
  var db = await openDb();
  var logs = await req(db.transaction("logs").objectStore("logs").index("productId").getAll(productId));
  logs.sort(function (a, b) { return b.at - a.at; });
  return logs;
}

export async function getPhoto(id) {
  var db = await openDb();
  return req(db.transaction("photos").objectStore("photos").get(id));
}

export async function compressImage(file) {
  try {
    var bitmap = await createImageBitmap(file);
    var scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
    var canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    var q = 0.72;
    var blob = await new Promise(function (res, rej) {
      canvas.toBlob(function (b) { b ? res(b) : rej(new Error("blob")); }, "image/jpeg", q);
    });
    while (blob.size > 400000 && q > 0.45) {
      q -= 0.08;
      blob = await new Promise(function (res, rej) {
        canvas.toBlob(function (b) { b ? res(b) : rej(new Error("blob")); }, "image/jpeg", q);
      });
    }
    canvas.width = 0;
    canvas.height = 0;
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
      id: uid(),
      productId: product.id,
      productName: product.name,
      field: field,
      oldValue: oldValue,
      newValue: newValue,
      at: at || Date.now(),
    });
  });
}

export async function addProduct(draft) {
  var now = Date.now();
  var photoId = draft.photoFile ? await storePhoto(draft.photoFile) : null;
  var product = {
    id: uid(),
    name: draft.name.trim(),
    article: draft.article.trim(),
    lot: draft.lot.trim(),
    photoId: photoId,
    createdAt: now,
    updatedAt: now,
  };
  await withTx("products", "readwrite", function (tx) { tx.objectStore("products").put(product); });
  await writeLog(product, "created", null, product.name, now);
}

export async function updateProduct(current, draft) {
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
    id: current.id,
    name: draft.name.trim(),
    article: draft.article.trim(),
    lot: draft.lot.trim(),
    photoId: photoId,
    createdAt: current.createdAt,
    updatedAt: now,
  };
  await withTx("products", "readwrite", function (tx) { tx.objectStore("products").put(next); });
  if (current.name !== next.name) await writeLog(next, "name", current.name, next.name, now);
  if (articleOf(current) !== next.article) await writeLog(next, "article", articleOf(current), next.article, now);
  if (current.lot !== next.lot) await writeLog(next, "lot", current.lot, next.lot, now);
}

export async function updateLot(current, lot) {
  var trimmed = lot.trim();
  if (!current || current.lot === trimmed) return;
  var now = Date.now();
  var next = {
    id: current.id,
    name: current.name,
    article: articleOf(current),
    lot: trimmed,
    photoId: current.photoId,
    createdAt: current.createdAt,
    updatedAt: now,
  };
  await withTx("products", "readwrite", function (tx) { tx.objectStore("products").put(next); });
  await writeLog(next, "lot", current.lot, trimmed, now);
}

export async function removeProduct(current) {
  if (!current) return;
  if (current.photoId) {
    await withTx("photos", "readwrite", function (tx) { tx.objectStore("photos").delete(current.photoId); });
  }
  await withTx("products", "readwrite", function (tx) { tx.objectStore("products").delete(current.id); });
  await writeLog(current, "deleted", current.name, null);
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

export async function buildBackup(products) {
  var logs = await listLogs();
  var photos = [];
  var db = await openDb();
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    if (!p.photoId) continue;
    var rec = await req(db.transaction("photos").objectStore("photos").get(p.photoId));
    if (rec && rec.blob) {
      photos.push({
        id: rec.id,
        mimeType: rec.mimeType || rec.blob.type,
        base64: await blobToBase64(rec.blob),
      });
    }
  }
  return {
    version: 2,
    exportedAt: Date.now(),
    products: products.map(normalizeProduct),
    logs: logs,
    photos: photos,
  };
}

export function parseBackup(text) {
  var parsed = JSON.parse(text);
  if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.logs)) throw new Error("bad file");
  if (parsed.version != null && parsed.version !== 1 && parsed.version !== 2) throw new Error("bad file");
  return parsed;
}

export async function importBackup(parsed) {
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
}

export async function saveBlob(filename, blob) {
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
