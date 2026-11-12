// =========================================================
// PRASANTH PORTFOLIO - INTERACTIONS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // Active navigation link
    // -------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const updateActiveLink = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 130;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();


    // -------------------------------
    // Close Bootstrap mobile menu
    // after clicking a nav link
    // -------------------------------
    const navbarCollapse = document.getElementById("portfolioNav");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {
                const collapse =
                    bootstrap.Collapse.getInstance(navbarCollapse);

                if (collapse) {
                    collapse.hide();
                }
            }
        });
    });


    // -------------------------------
    // Contact form demo
    // -------------------------------
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            formMessage.style.display = "block";
            formMessage.textContent =
                "Demo message captured. Connect this form to your backend/email service to receive real messages.";

            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = "none";
            }, 6000);
        });
    }


    // -------------------------------
    // Small scroll reveal effect
    // -------------------------------
    const revealElements = document.querySelectorAll(
        ".glass-panel, .status-panel, .skill-card, .project-card"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal-on-scroll");
    });

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });


    // -------------------------------
    // Floating custom cursor
    // -------------------------------
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursorDot && cursorRing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        const moveCursor = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorDot.style.opacity = "1";
            cursorRing.style.opacity = "1";
        };

        const animateCursor = () => {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);
        };

        document.addEventListener("mousemove", moveCursor);
        animateCursor();

        const interactiveElements = document.querySelectorAll(
            "a, button, .skill-card, .project-card, input, textarea, .form-control"
        );

        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", () => {
                cursorRing.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("cursor-hover");
            });
        });
    }

});
