import { updateTOC } from "./toc-utils.js";

export function monitorDOMChanges(tocList) {
  let previousContentStates = [];
  let unchangedCount = 0;
  const maxUnchangedCount = 5; // Number of checks before considering the response stopped

  const intervalId = setInterval(() => {
    const chatItems = document.querySelectorAll(
      "article.w-full.text-token-text-primary"
    );
    const currentContentStates = Array.from(chatItems).map(
      (item) => item.innerHTML
    );

    let contentChanged = false;

    if (previousContentStates.length === currentContentStates.length) {
      for (let i = 0; i < currentContentStates.length; i++) {
        if (currentContentStates[i] !== previousContentStates[i]) {
          contentChanged = true;
          break;
        }
      }
    } else {
      contentChanged = true; // Content length changed, meaning new content arrived
    }

    if (!contentChanged) {
      unchangedCount++;
      if (unchangedCount >= maxUnchangedCount) {
        clearInterval(intervalId);
        console.log("No further DOM manipulation detected. Interval cleared.");
      }
    } else {
      updateTOC(tocList);
      previousContentStates = currentContentStates;
      unchangedCount = 0; // Reset the unchanged count if content changed
    }
  }, 1000);
}
