import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function initAnimations() {
  const root = document.documentElement;

  if (reduced || !root.classList.contains("js-motion")) {
    root.classList.remove("js-motion");
    return;
  }

  // Starting positions. The ruby is hidden here in JS only — never in CSS —
  // so a failed bundle load leaves the stone visible.
  gsap.set(".hero__ruby", { opacity: 0, scale: 0.94, y: 10 });
  gsap.set(".hero__name-line", { clipPath: "inset(0 100% 0 0)", y: 8 });
  gsap.set([".hero__kicker", ".hero__lead", ".hero__actions", ".hero__card"], {
    y: 24,
  });

  // ── One orchestrated hero moment ──────────────────────────────────
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => ScrollTrigger.refresh(),
  });

  tl.to(".hero__ruby", {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
  })
    .to(
      ".hero__name-line",
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
      },
      "-=0.75"
    )
    .to(".hero__rule", { scaleX: 1, duration: 0.6 }, "-=0.4")
    .to(
      [".hero__kicker", ".hero__lead", ".hero__actions"],
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
      "-=0.45"
    )
    .to(".hero__card", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");

  // ── Section headings: a wipe, used consistently as the signature ──
  gsap.utils.toArray(".reveal-title").forEach((el) => {
    gsap.to(el, {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 0.9,
      ease: "power3.inOut",
      scrollTrigger: { trigger: el, start: "top 82%" },
    });
  });

  // ── Scroll progress bar ─────────────────────────────────────────
  const bar = document.querySelector(".progress__bar");
  if (bar) {
    gsap.to(bar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: () => document.body.scrollHeight - window.innerHeight,
        scrub: 0.3,
      },
    });
  }
}
