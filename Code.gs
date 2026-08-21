const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Mahila Elevation Leads";

function setupSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Mobile Number",
      "Email",
      "Financial Service Required",
      "Specific Requirement",
      "Consent",
      "Source"
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    sheet.autoResizeColumns(1, 8);
  }
}

function doGet() {
  return jsonResponse({ status: "ok", message: "Mahila Elevation endpoint is live." });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, message: "No data received." });
    }

    const data = JSON.parse(e.postData.contents);
    if (clean(data.website, 100)) {
      return jsonResponse({ success: true });
    }

    const name = clean(data.name, 100);
    const mobile = clean(data.mobile, 20).replace(/\D/g, "");
    const email = clean(data.email, 150);
    const service = clean(data.service, 100);
    const message = clean(data.message, 500);
    const consent = data.consent === true;
    const source = clean(data.source || "Mahila Elevation Website", 100);

    if (name.length < 2) return jsonResponse({ success: false, message: "Invalid name." });
    if (!/^[6-9]\d{9}$/.test(mobile)) return jsonResponse({ success: false, message: "Invalid mobile number." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonResponse({ success: false, message: "Invalid email." });
    if (!service) return jsonResponse({ success: false, message: "Service is required." });
    if (!consent) return jsonResponse({ success: false, message: "Consent is required." });

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp","Name","Mobile Number","Email","Financial Service Required","Specific Requirement","Consent","Source"]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([new Date(), name, mobile, email, service, message, "Yes", source]);
    return jsonResponse({ success: true, message: "Lead saved successfully." });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: "Server error." });
  }
}

function clean(value, maxLength) {
  return String(value || "").trim().substring(0, maxLength);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}