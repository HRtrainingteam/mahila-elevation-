// Paste the deployed Google Apps Script Web App URL here.
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const form = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const buttonText = document.getElementById("buttonText");
const spinner = document.getElementById("spinner");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.replace(/\D/g, "");
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();
  const consent = document.getElementById("consent").checked;
  const website = document.getElementById("website").value;

  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_")) {
    showMessage("The form is ready, but the Google Sheet connection still needs to be configured.", "error");
    return;
  }
  if (name.length < 2) return showMessage("Please enter your full name.", "error");
  if (!/^[6-9]\d{9}$/.test(mobile)) return showMessage("Please enter a valid 10-digit Indian mobile number.", "error");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMessage("Please enter a valid email address.", "error");
  if (!service) return showMessage("Please select the financial area you need help with.", "error");
  if (!consent) return showMessage("Please confirm the consent checkbox to continue.", "error");

  setLoading(true);

  const payload = {
    name,
    mobile,
    email,
    service,
    message,
    consent,
    website,
    source: "Mahila Elevation Website",
    submittedAt: new Date().toISOString()
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    form.reset();
    showMessage("Thank you! Your details have been submitted successfully.", "success");
  } catch (error) {
    console.error(error);
    showMessage("We couldn't submit your details. Please try again.", "error");
  } finally {
    setLoading(false);
  }
});

function setLoading(loading) {
  submitBtn.disabled = loading;
  buttonText.textContent = loading ? "Submitting..." : "Submit My Details";
  spinner.classList.toggle("hidden", !loading);
}
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}
function clearMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}