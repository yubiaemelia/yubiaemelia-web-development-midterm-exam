
// =====================================================
// MIDTERM PRACTICAL EXAMINATION
// Bloom & Petal Studio
// Tailwind CSS + GSAP + ScrollTrigger
// =====================================================

gsap.registerPlugin(ScrollTrigger);


// ---- B1: DARK MODE TOGGLE ----

const darkModeToggle = document.querySelector("#darkModeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");

function updateThemeButton() {
    const isDark = document.documentElement.classList.contains("dark");

    themeIcon.textContent = isDark ? "☀" : "☾";
    themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";

    darkModeToggle.setAttribute("aria-pressed", String(isDark));
}

darkModeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    updateThemeButton();

    // back.out gives the button a short, playful rotation.
    gsap.fromTo(
        darkModeToggle,
        { rotation: -12 },
        {
            rotation: 0,
            duration: 0.45,
            ease: "back.out(1.7)"
        }
    );
});

updateThemeButton();


// ---- EXTRA: CURRENT YEAR ----

document.querySelector("#currentYear").textContent =
    new Date().getFullYear();


// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----

// power2.out creates a smooth, natural entrance for the text.
const introTimeline = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.65,
        ease: "power2.out"
    }
});

introTimeline
    .from(".hero-copy > *", {
        y: 28,
        opacity: 0,
        stagger: 0.1
    })

    // power3.out gives the artwork a smooth landing.
    // "<0.15" starts this animation shortly after the previous one begins.
    .from(".hero-art", {
        y: 40,
        scale: 0.92,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out"
    }, "<0.15")

    // back.out adds a small bounce to the flower illustration.
    .from(".flower-emoji", {
        scale: 0.65,
        rotation: -12,
        duration: 0.55,
        ease: "back.out(1.7)"
    }, "-=0.4");


// ---- D3: REPLAY INTRO BUTTON ----

const replayBtn = document.querySelector("#replayBtn");

replayBtn.addEventListener("click", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    introTimeline.restart();
});


// ---- E1 + E2 + E3: SCROLLTRIGGER AND REDUCED MOTION ----

const motionSettings = gsap.matchMedia();

motionSettings.add(
    {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)"
    },
    (context) => {
        const { reduceMotion, normalMotion } = context.conditions;

        // E3: Keep every section visible when reduced motion is preferred.
        if (reduceMotion) {
            gsap.set(
                [
                    ".hero-copy > *",
                    ".hero-art",
                    ".reveal"
                ],
                {
                    clearProps: "all"
                }
            );

            gsap.set("#progressBar", {
                width: "0%"
            });

            return;
        }

        if (normalMotion) {

            // Play the page-load intro timeline.
            introTimeline.play(0);


            // E1: Give every section below the hero its own ScrollTrigger.
            gsap.utils.toArray(".reveal").forEach((section) => {
                gsap.from(section, {
                    y: 45,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });


            // E2: Scroll-linked progress bar using scrub and ease: "none".
            gsap.fromTo(
                "#progressBar",
                {
                    width: "0%"
                },
                {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true
                    }
                }
            );


            // E3: Pin the hero artwork temporarily on tablet and desktop.
            // Pin spacing is retained to help prevent content overlap.
            ScrollTrigger.create({
                trigger: ".hero-art",
                start: "top 20%",
                end: "+=180",
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });
        }
    }
);
 


// ---- CONTACT FORM: DEMO ONLY ----

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.textContent =
        "Thank you! This demonstration form does not send messages.";

    contactForm.reset();
});


// ---- CLEANUP ----

// Remove matchMedia-created animations and ScrollTriggers on page exit.
window.addEventListener("pagehide", () => {
    motionSettings.revert();
});
