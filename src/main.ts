import path from 'node:path';
import { app, BrowserWindow } from 'electron';

console.log('============================');
// console.log('app', app.isReady());
console.log('BrowserWindow', BrowserWindow);

function createWindow() {
    const mainWindow = new BrowserWindow({});
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
