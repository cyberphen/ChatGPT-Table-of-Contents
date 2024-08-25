import { createTOC } from "./toc.js";
import { monitorDOMChanges } from "./dom-monitor.js";

setTimeout(() => {
  const tocList = createTOC();
  monitorDOMChanges(tocList);
}, 3000); // 3 seconds delay, adjust as needed
