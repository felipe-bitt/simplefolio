import initI18n from "./scripts/i18n";
import initAnimations from "./scripts/animations";

// If anything in the motion setup throws, drop the pre-animation hook so
// no element is left permanently hidden.
try {
  initI18n();
} catch (e) {
  /* i18n is non-critical — the PT-BR default markup stands */
}

try {
  clearTimeout(window.__motionFallback);
  initAnimations();
} catch (e) {
  document.documentElement.classList.remove("js-motion");
}
