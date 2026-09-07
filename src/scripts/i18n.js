// Bilingual toggle (PT-BR / EN).
// Any element with data-pt / data-en has its innerHTML swapped on toggle.
// The choice is persisted in localStorage so it survives reloads.

const STORAGE_KEY = "felipe-portfolio-lang";
const SUPPORTED = ["pt", "en"];

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
  } catch (e) {
    /* localStorage unavailable — fall through to default */
  }
  return "pt";
}

function storeLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    /* ignore */
  }
}

function applyLang(lang) {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-pt]").forEach((el) => {
    const value = el.getAttribute("data-" + lang);
    if (value !== null) el.innerHTML = value;
  });

  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.textContent = lang === "pt" ? "EN" : "PT";
    btn.setAttribute(
      "aria-label",
      lang === "pt" ? "Switch to English" : "Mudar para português"
    );
  }

  storeLang(lang);
}

export default function initI18n() {
  applyLang(readStoredLang());

  const btn = document.getElementById("lang-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.lang.startsWith("pt") ? "pt" : "en";
    applyLang(current === "pt" ? "en" : "pt");
  });
}
