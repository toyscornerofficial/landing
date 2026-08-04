
document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Load AOS (with fallback)
    // ==========================
    function initAOS() {
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: "ease-in-out"
            });
        } else {
            console.warn("AOS failed to load. Showing content without animations.");
document.querySelectorAll("[data-aos]").forEach(el => {
    el.removeAttribute("data-aos");
});
}
}

if (typeof AOS === "undefined") {
    const aosScript = document.createElement("script");
    aosScript.src = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
    aosScript.onload = initAOS;
    aosScript.onerror = initAOS;
    document.head.appendChild(aosScript);
} else {
    initAOS();
}

// ==========================
// Loader
// ==========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
if (loader) loader.style.display = "none";
});

// ==========================
// Navbar Scroll Effect
// ==========================
    const navbar = document.getElementById("mainNavbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
});
}

// ==========================
// Sidebar
// ==========================
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const closeSidebar = document.getElementById("closeSidebar");

function openSidebar() {
    sidebar?.classList.add("active");
    overlay?.classList.add("active");
}

function shutSidebar() {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
}

menuBtn?.addEventListener("click", openSidebar);
closeSidebar?.addEventListener("click", shutSidebar);
overlay?.addEventListener("click", shutSidebar);

document.querySelectorAll(".sidebar-menu a").forEach(item => {
    item.addEventListener("click", shutSidebar);
});

// ==========================
// Scroll Top Button
// ==========================
    const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
}

// ==========================
// Active Nav + ScrollSpy
// ==========================
    const sections = document.querySelectorAll("section[id]");
    const desktopLinks = document.querySelectorAll("#navMenu .nav-link[data-section]");
    const sidebarLinks = document.querySelectorAll("#sidebarMenu a[data-section]");

function setActiveLink(id) {
    desktopLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.section === id);
});

sidebarLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.section === id);
});
}

document.querySelectorAll("[data-section]").forEach(link => {
    link.addEventListener("click", () => {
        setActiveLink(link.dataset.section);
});
});

if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
}
});
}, {
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0
});

sections.forEach(sec => spy.observe(sec));
}

setActiveLink("home");

// ==========================
// Gallery Lightbox
// ==========================
    const galleryItems = document.querySelectorAll(".gallery-item");

if (galleryItems.length) {

    const galleryImages = Array.from(
        document.querySelectorAll(".gallery-item img")
    ).map(img => ({
        src: img.src.replace("w=800", "w=1600"),
        alt: img.alt
    }));

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCounter = document.getElementById("lightboxCounter");

    let currentImageIndex = 0;

    function showLightboxImage(index) {
        currentImageIndex =
            (index + galleryImages.length) % galleryImages.length;

        const item = galleryImages[currentImageIndex];

        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxCounter.textContent =
            `${currentImageIndex + 1} / ${galleryImages.length}`;
    }

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            showLightboxImage(parseInt(item.dataset.index, 10));
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
});
});

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("lightboxClose")
    ?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});

document.getElementById("lightboxPrev")
    ?.addEventListener("click", () => {
        showLightboxImage(currentImageIndex - 1);
});

document.getElementById("lightboxNext")
    ?.addEventListener("click", () => {
        showLightboxImage(currentImageIndex + 1);
});

document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;

switch (e.key) {
    case "Escape":
        closeLightbox();
        break;
    case "ArrowLeft":
        showLightboxImage(currentImageIndex - 1);
        break;
    case "ArrowRight":
        showLightboxImage(currentImageIndex + 1);
        break;
}
});
}

});
