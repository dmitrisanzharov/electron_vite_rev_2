import path from 'node:path';
import os from 'node:os';
import { app, BrowserWindow, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';

// console.log('ipcMain', ipcMain);
// console.log('os', os);
const total = os.totalmem();
console.log('total: ', total);
const free = os.freemem();
console.log('free: ', free);

ipcMain.handle('mainToPreload', (event, arg1, arg2) => {
    // console.log('arg1: ', arg1);
    // console.log('arg2: ', arg2);

    return 'main to preload return, that is then showed in Renderer';
});

ipcMain.handle('mainOsApi', () => {
    const total = os.totalmem();
    const free = os.freemem();

    return { total, free };
});

if (started) {
    app.quit();
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs')
        }
    });

    // devServer URL if in development or load the Index.html if in prod

    const devServerUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL;
    const pathToProdIndexHtml = path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`);

    if (devServerUrl) {
        mainWindow.loadURL(devServerUrl);
    } else {
        mainWindow.loadFile(pathToProdIndexHtml);
    }

    // load the dev tools
    mainWindow.webContents.openDevTools();

    // end of create Window function
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        const noActiveWindows = BrowserWindow.getAllWindows().length === 0;

        if (noActiveWindows) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
