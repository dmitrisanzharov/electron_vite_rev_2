import { contextBridge, ipcRenderer } from 'electron';

console.log('preload log');
console.log('contextBridge', contextBridge);

ipcRenderer.invoke('mainToPreload').then(result => {
    console.log('invoke in preload::', result)
})

contextBridge.exposeInMainWorld('electronAPI', {
    anyName: () => ipcRenderer.invoke('mainToPreload', 'ipcRenderer_argument1', 'omg arg2'),
    noMainValue: (arg1: any) => 'mahMan...' + arg1,
    getMemory: () => ipcRenderer.invoke('mainOsApi')
});