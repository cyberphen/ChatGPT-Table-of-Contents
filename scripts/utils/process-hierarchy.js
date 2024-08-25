export function processResponseHierarchy(content, tocList, parentIndex) {
  const headings = content.querySelectorAll("h1, h2, h3, h4");
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1), 10); // Determine heading level
    const subEntry = document.createElement("li");
    subEntry.className = `toc-subentry level-${level}`;
    subEntry.innerHTML = `<a href="#item-${parentIndex}-${index}">${heading.textContent.substring(
      0,
      50
    )}</a>`;
    tocList.appendChild(subEntry);

    heading.id = `item-${parentIndex}-${index}`;

    if (
      heading.nextElementSibling &&
      (heading.nextElementSibling.tagName === "UL" ||
        heading.nextElementSibling.tagName === "OL")
    ) {
      const nestedList = document.createElement("ul");
      nestedList.style.display = "none"; // Initially hide sublist
      processListHierarchy(
        heading.nextElementSibling,
        nestedList,
        parentIndex,
        index,
        level
      );
      subEntry.appendChild(nestedList);

      const expandIcon = document.createElement("span");
      expandIcon.className = "expand-icon";
      expandIcon.innerHTML = "&#9656;"; // Right arrow
      expandIcon.addEventListener("click", () => {
        const isExpanded = nestedList.style.display === "block";
        nestedList.style.display = isExpanded ? "none" : "block";
        expandIcon.innerHTML = isExpanded ? "&#9656;" : "&#9662;"; // Right or down arrow
      });
      subEntry.prepend(expandIcon);
    }
  });
}

export function processListHierarchy(
  list,
  tocList,
  parentIndex,
  headingIndex,
  parentLevel
) {
  const listItems = list.querySelectorAll("li");
  listItems.forEach((item, index) => {
    const subEntry = document.createElement("li");
    const currentLevel = parentLevel + 1 > 4 ? 4 : parentLevel + 1; // Ensure it doesn't go beyond level 4
    subEntry.className = `toc-subentry level-${currentLevel}`;
    subEntry.innerHTML = `<a href="#item-${parentIndex}-${headingIndex}-${index}">${item.textContent.substring(
      0,
      50
    )}</a>`;
    tocList.appendChild(subEntry);

    item.id = `item-${parentIndex}-${headingIndex}-${index}`;

    const nestedList = item.querySelector("ul, ol");
    if (nestedList) {
      const newList = document.createElement("ul");
      newList.style.display = "none"; // Initially hide sublist
      processListHierarchy(
        nestedList,
        newList,
        parentIndex,
        `${headingIndex}-${index}`,
        currentLevel
      );
      subEntry.appendChild(newList);

      const expandIcon = document.createElement("span");
      expandIcon.className = "expand-icon";
      expandIcon.innerHTML = "&#9656;"; // Right arrow
      expandIcon.addEventListener("click", () => {
        const isExpanded = newList.style.display === "block";
        newList.style.display = isExpanded ? "none" : "block";
        expandIcon.innerHTML = isExpanded ? "&#9656;" : "&#9662;"; // Right or down arrow
      });
      subEntry.prepend(expandIcon);
    }
  });
}
