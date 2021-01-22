/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

import killport from "kill-port";

let activePort: number;

document.querySelector("form").addEventListener("submit", (e: Event) => {
  e.preventDefault();
  if (activePort) {
    kill(activePort);
  }
});

document
  .querySelector("#port")
  .addEventListener("input", (event: InputEvent): void => {
    const input = document.querySelector("#port") as HTMLInputElement;
    const value = input.value;
    activePort = parseInt(value, 10);
  });
document.querySelector("#kill").addEventListener("click", (): void => {
  if (activePort) {
    kill(activePort);
  }
});

function kill(port: number) {
  killport(port)
    .then((): void => {
      // success state
      document.querySelector<HTMLElement>("#x").style.display = "none";
      document.querySelector<HTMLElement>("#check").style.display = "block";
      setTimeout(() => {
        document.querySelector<HTMLElement>("#check").style.display = "none";
        document.querySelector<HTMLElement>("#x").style.display = "block";
      }, 1500);
    })
    .catch((): void => {
      // error state
      document.querySelector<HTMLElement>("#x").style.display = "none";
      document.querySelector<HTMLElement>("#error").style.display = "block";
      setTimeout(() => {
        document.querySelector<HTMLElement>("#x").style.display = "block";
        document.querySelector<HTMLElement>("#error").style.display = "none";
      }, 1500);
    });
}
