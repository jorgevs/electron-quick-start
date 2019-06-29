// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const colors = require('colors');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

function createWindow() {
  // Create the browser window.
  console.log(">>> Creating window");

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  });

  secondaryWindow = new BrowserWindow({
    width: 600, height: 300,
    webPreferences: { nodeIntegration: true },
    parent: mainWindow,
    modal: true,
    show: false
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  secondaryWindow.loadFile('secondary.html');

  setTimeout(() => {
    secondaryWindow.show();
    setTimeout(() => {
      secondaryWindow.close();
      secondaryWindow = null;
    }, 3000)
  }, 2000)

  // Open the DevTools. Remove for PRODUCTION!!
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  /*secondaryWindow.on('closed', function () {
    secondaryWindow = null
  })*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

console.log(colors.rainbow('Hello world!'));

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
