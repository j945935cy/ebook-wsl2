const links = [...document.querySelectorAll(".toc a")];
const searchInput = document.querySelector("#toc-search");
const themeToggle = document.querySelector("[data-theme-toggle]");
const printButton = document.querySelector("[data-print-page]");
const currentPage = document.body.dataset.page || "index.html";
const storedTheme = localStorage.getItem("ebook-theme");
if (storedTheme) {
  document.documentElement.dataset.theme = storedTheme;
}
const syncThemeLabel = () => {
  const dark = document.documentElement.dataset.theme === "dark";
  if (themeToggle) {
    themeToggle.textContent = dark ? "日間模式" : "夜間模式";
  }
};
const markActiveLink = () => {
  for (const link of links) {
    link.classList.toggle("is-active", link.getAttribute("href") === currentPage);
  }
};
const filterToc = () => {
  const keyword = (searchInput?.value || "").trim().toLowerCase();
  for (const link of links) {
    const text = link.textContent.toLowerCase();
    link.classList.toggle("is-hidden", keyword !== "" && !text.includes(keyword));
  }
};
themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("ebook-theme", nextTheme);
  syncThemeLabel();
});
printButton?.addEventListener("click", () => window.print());
searchInput?.addEventListener("input", filterToc);
markActiveLink();
syncThemeLabel();
filterToc();
