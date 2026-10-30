
gsap.registerPlugin(ScrollTrigger);

// INTRO ANIMATION
function playIntro() {
  const timeline = gsap.timeline();

  timeline
    .from(".intro-title", {
      y: 50,
      opacity: 0,
      duration: 0.7
    })
    .from(".intro-tag", {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, "-=0.3")
    .from(".intro-btn", {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.5
    }, "-=0.2")
    .from(".hero-art", {
      scale: 0.8,
      opacity: 0,
      rotation: -5,
      duration: 0.8
    }, "-=0.5");
}

playIntro();

// REPLAY INTRO
document.getElementById("replayBtn").addEventListener("click", () => {
  gsap.set(
    [".intro-title", ".intro-tag", ".intro-btn", ".hero-art"],
    { clearProps: "all" }
  );

  playIntro();
});

// DARK MODE
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");

  darkModeToggle.setAttribute("aria-pressed", isDark);
});

// SCROLL REVEAL ANIMATIONS
gsap.utils.toArray(".reveal").forEach((section) => {
  gsap.from(section, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// SCRUB ANIMATION
gsap.to(".hero-art", {
  y: -80,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-art",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// PIN ANIMATION
ScrollTrigger.create({
  trigger: "#about",
  start: "top top",
  end: "+=300",
  pin: false
});

// PROGRESS BAR
gsap.to("#progressBar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3
  }
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  document.getElementById("formNote").textContent =
    "Thank you! Your message has been received.";

  this.reset();
});
