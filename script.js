// ====== Mobile nav toggle ======
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ====== Active link highlight using IntersectionObserver ======
const sections = ["projects", "skills", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const linksById = new Map();
document.querySelectorAll(".nav__link").forEach((a) => {
  const href = a.getAttribute("href") || "";
  if (href.startsWith("#")) linksById.set(href.slice(1), a);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      document.querySelectorAll(".nav__link").forEach((a) => a.classList.remove("is-active"));
      linksById.get(id)?.classList.add("is-active");
    });
  },
  { root: null, threshold: 0.35 }
);

sections.forEach((s) => observer.observe(s));

// ====== Scroll progress bar ======
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${percent}%`;
});

// ====== Footer year ======
document.getElementById("year").textContent = String(new Date().getFullYear());

// ====== Contact form demo (front-end only) ======
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();

  statusEl.textContent = `Thanks${name ? `, ${name}` : ""}! Your message is ready to send (demo form).`;

  form.reset();
});