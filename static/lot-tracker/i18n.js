/* i18n.js — languages, copy, and date formatting
 *   t, detectLang, detectTheme, formatWhen, formatDay, formatTime, fieldLabel
 */

export const LANGS = ["en", "tr", "de"];
export const LANG_LABEL = { en: "English", tr: "Türkçe", de: "Deutsch" };
export const LANG_LOCALE = { en: "en-GB", tr: "tr-TR", de: "de-DE" };

const dict = {
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
    saveFailed: "Could not save the file. Copy the JSON instead.",
    pasteJson: "Paste JSON",
    pasteHint: "Choose a backup file, or paste the JSON here, then import.",
    chooseFile: "Choose JSON file",
    confirmPasteImport: "Import pasted JSON",
    importOpenTitle: "Import backup",
    find: "Find", light: "Light", dark: "Dark", actions: "Actions", field: "Field",
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
    saveFailed: "Dosya kaydedilemedi. JSON’u kopyalayın.",
    pasteJson: "JSON yapıştır",
    pasteHint: "Bir yedek dosyası seçin veya JSON’u buraya yapıştırıp içe aktarın.",
    chooseFile: "JSON dosyası seç",
    confirmPasteImport: "Yapıştırılan JSON’u içe aktar",
    importOpenTitle: "Yedek içe aktar",
    find: "Ara", light: "Açık", dark: "Koyu", actions: "İşlemler", field: "Alan",
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
    saveFailed: "Datei konnte nicht gespeichert werden. JSON kopieren.",
    pasteJson: "JSON einfügen",
    pasteHint: "Sicherungsdatei wählen oder JSON hier einfügen, dann importieren.",
    chooseFile: "JSON-Datei wählen",
    confirmPasteImport: "Eingefügtes JSON importieren",
    importOpenTitle: "Sicherung importieren",
    find: "Suchen", light: "Hell", dark: "Dunkel", actions: "Aktionen", field: "Feld",
  },
};

export function t(lang, key, vars) {
  var s = (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  if (vars) Object.keys(vars).forEach(function (k) { s = s.replaceAll("{" + k + "}", String(vars[k])); });
  return s;
}

export function detectLang() {
  try {
    var s = localStorage.getItem("lotkeep.lang");
    if (LANGS.indexOf(s) >= 0) return s;
  } catch (_) {}
  var n = (navigator.language || "").toLowerCase();
  if (n.indexOf("tr") === 0) return "tr";
  if (n.indexOf("de") === 0) return "de";
  return "en";
}

export function detectTheme() {
  try {
    var s = localStorage.getItem("lotkeep.theme");
    if (s === "light" || s === "dark") return s;
  } catch (_) {}
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function formatWhen(ts, lang) {
  var diff = Date.now() - ts;
  if (diff < 45000) return t(lang, "justNow");
  var locale = LANG_LOCALE[lang];
  var rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (diff < 3600000) return rtf.format(-Math.round(diff / 60000), "minute");
  if (diff < 86400000) return rtf.format(-Math.round(diff / 3600000), "hour");
  if (diff < 7 * 86400000) return rtf.format(-Math.round(diff / 86400000), "day");
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(ts);
}

export function formatDay(ts, lang) {
  var d = new Date(ts);
  var now = new Date();
  var startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  var startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  if (startThat === startToday) return t(lang, "today");
  if (startThat === startToday - 86400000) return t(lang, "yesterday");
  return new Intl.DateTimeFormat(LANG_LOCALE[lang], { dateStyle: "medium" }).format(d);
}

export function formatTime(ts, lang) {
  return new Intl.DateTimeFormat(LANG_LOCALE[lang], { hour: "2-digit", minute: "2-digit" }).format(ts);
}

export function fieldLabel(field, lang) {
  if (field === "created") return t(lang, "added");
  if (field === "deleted") return t(lang, "removed");
  if (field === "name") return t(lang, "name");
  if (field === "article" || field === "reference") return t(lang, "article");
  if (field === "lot") return t(lang, "lot");
  return field;
}
