const docIds = new Set(["overview", "install", "foundations", "colors", "typography", "inputs", "buttons", "security", "alerts", "dialogs", "feedback", "badges", "chips", "kpis", "lists", "tables", "steppers", "shell", "footer", "logos", "icons"]);
if (location.hash && docIds.has(location.hash.slice(1)) && !document.getElementById(location.hash.slice(1))) location.replace(`/docs/${location.hash}`);
const menu = document.querySelector(".menu");
menu?.addEventListener("click", () => {
  const nav = document.querySelector(".topbar nav");
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});

if ("IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("in-view"); current.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll("main > section, .redline").forEach((element) => observer.observe(element));
}
