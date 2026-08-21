// Google Apps Script Web App endpoint for Mahila Elevation.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRYm8E6tUwd0BpotSlHv9TIyoZPdXCrIbkXx_m9_O8zGpcIzg3ylsOi3s6zXmYDimdhg/exec";

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
    // Apps Script accepts the JSON string through doPost(e.postData.contents).
    // no-cors is used because GitHub Pages and Apps Script are different origins.
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