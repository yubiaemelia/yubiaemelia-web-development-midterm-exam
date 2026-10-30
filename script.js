
// DARK MODE
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");

  darkModeToggle.setAttribute("aria-pressed", isDark);
  darkModeToggle.textContent = isDark
    ? "Light Mode"
    : "Toggle Dark Mode";
});

// HERO INTRO ANIMATION
function playIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(
      [".intro-title", ".intro-tag", ".intro-btn", ".hero-art"],
      { clearProps: "all" }
    );
    return;
  }

  gsap.killTweensOf(
    [".intro-title", ".intro-tag", ".intro-btn", ".hero-art"]
  );

  gsap.set(".intro-title", { opacity: 0, y: 40 });
  gsap.set(".intro-tag", { opacity: 0, y: 30 });
  gsap.set(".intro-btn", { opacity: 0, y: 20 });
  gsap.set(".hero-art", { opacity: 0, scale: 0.8 });

  const intro = gsap.timeline();

  intro.to(".intro-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  intro.to(".intro-tag", {
    opacity: 1,
    y: 0,
    duration: 0.7
  }, "-=0.4");

  intro.to(".intro-btn", {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.15
  }, "-=0.3");

  intro.to(".hero-art", {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "back.out(1.7)"
  }, "-=0.6");
}

// PLAY INTRO ON PAGE LOAD
window.addEventListener("load", () => {
  playIntro();
});

// REPLAY INTRO BUTTON
document.getElementById("replayBtn").addEventListener("click", () => {
  playIntro();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// SCROLL REVEAL ANIMATION
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      once: true
    }
  });
});

// SCROLL PROGRESS BAR
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollHeight > 0
    ? scrollTop / scrollHeight
    : 0;

  gsap.set("#progressBar", {
    scaleX: progress
  });
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent("Carlos Cake Inquiry");
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href =
    `mailto:carloscake@gmail.com?subject=${subject}&body=${body}`;

  document.getElementById("formNote").textContent =
    "Opening your email application...";
});
