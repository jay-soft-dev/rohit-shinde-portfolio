// 1. Journey tab switcher
const journeyData = {
    be: {
        status: "CURRENT STAGE • 2ND YEAR",
        title: "Bachelor of Engineering (B.E.) — Mechanical",
        meta: "Pursuing",
        description:
            "Building stronger theoretical depth in core mechanical subjects, design workflows, and long-term career readiness across industrial and PSU tracks."
    },
    diploma: {
        status: "COMPLETED • MSBTE BOARD",
        title: "Diploma in Mechanical Engineering",
        meta: "2026 | 73%",
        description:
            "Gained practical engineering fundamentals, technical drawing & CAD exposure, and hands-on shop-floor familiarity."
    },
    ssc: {
        status: "COMPLETED • SSC BOARD",
        title: "Secondary School Certificate (10th)",
        meta: "2023 | 70.60%",
        description:
            "Established foundational academic discipline and quantitative problem-solving habits."
    }
};

const tabs = document.querySelectorAll(".journey-tab");
const panel = document.getElementById("journey-panel");

function renderJourney(key) {
    const item = journeyData[key];
    if (!item || !panel) return;

    panel.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-2 max-w-2xl">
                <div class="text-xs font-mono text-amber-400">${item.status}</div>
                <h3 class="text-xl font-bold text-white">${item.title}</h3>
                <p class="text-stone-400 text-sm leading-relaxed">${item.description}</p>
            </div>
            <div class="self-start md:self-center px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-400/10 font-mono text-sm font-bold text-amber-300">
                ${item.meta}
            </div>
        </div>
    `;
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active", "bg-amber-400", "text-stone-950", "font-bold"));
        tab.classList.add("active");
        renderJourney(tab.getAttribute("data-tab"));
    });
});

renderJourney("be");

// 2. Copy contact helper with toast
const toast = document.getElementById("toast");
const copyBtns = document.querySelectorAll(".copy-btn");

function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("translate-y-16", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
    setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-16", "opacity-0");
    }, 2000);
}

copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const val = btn.getAttribute("data-copy");
        if (!val) return;
        try {
            await navigator.clipboard.writeText(val);
            notify(`Copied: ${val}`);
        } catch {
            notify("Could not copy");
        }
    });
});