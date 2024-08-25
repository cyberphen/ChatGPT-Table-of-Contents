import { processResponseHierarchy } from "./process-hierarchy.js";

export function updateTOC(tocList) {
  try {
    const chatItems = document.querySelectorAll(
      "article.w-full.text-token-text-primary"
    );
    tocList.innerHTML = ""; // Clear existing TOC

    chatItems.forEach((item, index) => {
      const isPrompt = item
        .querySelector("h5.sr-only")
        ?.textContent.includes("You said");
      const isResponse = item
        .querySelector("h4.sr-only")
        ?.textContent.includes("ChatGPT said");
      const itemId = `item-${index}`;

      const content =
        item.querySelector(".whitespace-pre-wrap") ||
        item.querySelector(".markdown.prose");
      const contentText = content
        ? content.textContent.trim().substring(0, 50)
        : "No content";

      const tocEntry = document.createElement("li");
      tocEntry.dataset.id = itemId;
      const type = isPrompt ? "Prompt" : "Response";

      tocEntry.innerHTML = `<a href="#${itemId}">${type} ${
        index + 1
      }: ${contentText}...</a>`;
      tocList.appendChild(tocEntry);

      if (isResponse) {
        const subList = document.createElement("ul");
        subList.style.display = "none"; // Initially hide sublist
        processResponseHierarchy(content, subList, index);
        tocEntry.appendChild(subList);

        const expandIcon = document.createElement("span");
        expandIcon.className = "expand-icon";
        expandIcon.innerHTML = "&#9656;"; // Right arrow
        expandIcon.addEventListener("click", () => {
          const isExpanded = subList.style.display === "block";
          subList.style.display = isExpanded ? "none" : "block";
          expandIcon.innerHTML = isExpanded ? "&#9656;" : "&#9662;"; // Right or down arrow
        });
        tocEntry.prepend(expandIcon);
      }

      item.id = itemId;
    });
  } catch (error) {
    console.error("Error updating TOC:", error);
  }
}
