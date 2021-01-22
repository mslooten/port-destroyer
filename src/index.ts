import { app, BrowserWindow, Tray, Menu, MenuItem } from "electron";
import Positioner from "electron-positioner";
import path from "path";
import isDev from "electron-is-dev";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
let toggle = false;
let tray: Tray;
app.dock.hide();

const createWindow = (): BrowserWindow => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 166,
    height: 65,
    webPreferences: {
      nodeIntegration: true,
    },
    transparent: true,
    frame: false,
    icon: path.join(__dirname, "/assets/death-star_Template.png"),
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.on("blur", () => {
    mainWindow.hide();
    toggle = true;
  });

  // mainWindow.webContents.openDevTools();
  return mainWindow;

  // Moves the window top right on the screen.
  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  let win = createWindow();
  tray = new Tray(path.join(__dirname, "/assets/death-star_Template.png"));

  const ctxMenu = Menu.buildFromTemplate([
    { label: "About", role: "about" },
    { label: "Quit", role: "quit" },
  ]);
  isDev &&
    ctxMenu.append(
      new MenuItem({
        label: "Devtools",
        click: () => win.webContents.openDevTools(),
      })
    );

  tray.on("right-click", () => tray.popUpContextMenu(ctxMenu));
  const positioner = new Positioner(win);

  // Moves the window top right on the screen.
  positioner.move("trayLeft", tray.getBounds());

  tray.on("click", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      win = createWindow();
      toggle = false;
    } else if (toggle === true) {
      win.show();
      toggle = false;
    } else {
      win.hide();
      toggle = true;
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
