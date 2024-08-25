import { updateTOC } from "./toc-utils/update-toc.js";

export function createTOC() {
  const chatContainer = document.querySelector("body");

  if (!chatContainer) return;

  // Create the TOC container
  const tocContainer = document.createElement("div");
  tocContainer.id = "chat-toc-container";

  const tocTitle = document.createElement("h2");
  tocTitle.textContent = "Table of Contents";
  tocContainer.appendChild(tocTitle);

  const tocList = document.createElement("ul");
  tocContainer.appendChild(tocList);

  // Add the TOC container to the body
  document.body.appendChild(tocContainer);

  // Hide/Show TOC icon
  const toggleIcon = document.createElement("div");
  toggleIcon.id = "toggle-toc-icon";
  toggleIcon.innerHTML = "&#9776;"; // Hamburger menu icon
  toggleIcon.addEventListener("click", () => {
    const toc = document.getElementById("chat-toc-container");
    if (toc) {
      toc.style.display = toc.style.display === "none" ? "block" : "none";
    }
  });
  document.body.appendChild(toggleIcon);

  // Refresh TOC icon
  const refreshIcon = document.createElement("div");
  refreshIcon.id = "refresh-toc-icon";
  refreshIcon.innerHTML = "&#8635;"; // Refresh icon (circular arrow)
  refreshIcon.addEventListener("click", () => {
    updateTOC(tocList);
  });
  document.body.appendChild(refreshIcon);

  // Process existing chat items
  updateTOC(tocList);

  return tocList;
}
