// 1. Scroll progress bar
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
});

// 2. Reveal sections on scroll
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// 3. Active nav link based on section in view
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach((sec) => {
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) {
            currentId = sec.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        }
    });
});

// 4. Skill category filter
const filterBtns = document.querySelectorAll(".skill-filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active", "bg-emerald-400", "text-black"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");
        skillCards.forEach((card) => {
            const category = card.getAttribute("data-category");
            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// 5. Expandable details on project/experience cards
const detailCards = document.querySelectorAll(".detail-card");
detailCards.forEach((card) => {
    card.addEventListener("click", () => {
        const box = card.querySelector(".detail-box");
        const detailText = card.getAttribute("data-detail");
        if (!box || !detailText) return;

        box.textContent = detailText;
        box.classList.toggle("hidden");
    });
});

// 6. Copy email / phone helper with toast
const toast = document.getElementById("toast");
const copyButtons = document.querySelectorAll(".copy-btn");

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("translate-y-20", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-20", "opacity-0");
    }, 2200);
}

copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const value = btn.getAttribute("data-copy");
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            showToast(`Copied: ${value}`);
        } catch {
            showToast("Could not copy automatically");
        }
    });
});