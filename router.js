///////////////////////////////////////
// Clean-URL client router
// Intercepts internal link clicks, updates the URL via the History API,
// and fetches the real .html file underneath so the URL bar stays clean
// without needing server-side rewrites during local development.

const routes = {
  "/": "index.html",
  "/project": "project.html",
};

// Script(s) each real page needs; re-run after every client-side swap
// into that page since injected <script> tags don't execute automatically.
const pageScripts = {
  "index.html": ["script.js"],
  "project.html": ["project.js", "showcase.js"],
};

const loadedStylesheets = new Set(
  Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((link) =>
    link.getAttribute("href")
  )
);

const ensureStylesheets = (doc) => {
  doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!loadedStylesheets.has(href)) {
      const newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.href = href;
      document.head.appendChild(newLink);
      loadedStylesheets.add(href);
    }
  });
};

const runPageScripts = (file) => {
  (pageScripts[file] || []).forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  });
};

const renderPage = async (file, path, push) => {
  const response = await fetch(file);
  if (!response.ok) throw new Error("Page not found: " + file);

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  ensureStylesheets(doc);
  document.title = doc.title;
  document.body.replaceWith(doc.body);

  if (push) history.pushState({ path }, "", path);
  window.scrollTo(0, 0);
  runPageScripts(file);
};

const navigateTo = (path, file) => {
  file = file || routes[path.split("?")[0]];
  if (!file) {
    window.location.href = path;
    return;
  }
  renderPage(file, path, true).catch(() => {
    window.location.href = path;
  });
};

document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link) return;
  if (link.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;

  let url;
  try {
    url = new URL(link.href, window.location.href);
  } catch (err) {
    return;
  }
  if (url.origin !== window.location.origin) return;

  const file = routes[url.pathname];
  if (!file) return;

  e.preventDefault();
  navigateTo(url.pathname + url.search, file);
});

window.addEventListener("popstate", function () {
  const file = routes[window.location.pathname];
  if (!file) return;

  const path = window.location.pathname + window.location.search;
  renderPage(file, path, false).catch(() => window.location.reload());
});

history.replaceState(
  { path: window.location.pathname + window.location.search },
  "",
  window.location.pathname + window.location.search
);
