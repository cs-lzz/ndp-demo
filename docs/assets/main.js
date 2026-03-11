function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

function wireCopyButtons() {
  $all("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = btn.getAttribute("data-copy");
      const el = target ? $(target) : null;
      if (!el) return;

      const text = el.textContent || "";
      try {
        await copyText(text);
        const old = btn.textContent;
        btn.textContent = "Copied";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = old;
          btn.disabled = false;
        }, 1200);
      } catch {
        const old = btn.textContent;
        btn.textContent = "Copy failed";
        setTimeout(() => {
          btn.textContent = old;
        }, 1400);
      }
    });
  });
}

function smoothAnchors() {
  $all('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });
}

setYear();
wireCopyButtons();
smoothAnchors();

