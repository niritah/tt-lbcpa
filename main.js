const { app, BrowserWindow, Tray, Menu, nativeImage, shell, ipcMain, dialog } = require('electron');
const path = require('path');
const os   = require('os');
const { autoUpdater } = require('electron-updater');

// ── Single instance ──────────────────────────────────────
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); process.exit(0); }

// ── State ────────────────────────────────────────────────
let tray   = null;
let win    = null;

// ── Auto-start with Windows ──────────────────────────────
function setAutoStart(enable) {
  app.setLoginItemSettings({
    openAtLogin: enable,
    path: process.execPath,
    args: ['--autostart']
  });
}

// ── Create main window ───────────────────────────────────
function createWindow() {
  if (win) {
    win.show();
    win.focus();
    return;
  }

  win = new BrowserWindow({
    width:  820,
    height: 700,
    minWidth:  480,
    minHeight: 500,
    title: 'דיווח שעות',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: null
    },
    show: false,
    frame: true,
    autoHideMenuBar: true,
    skipTaskbar: false
  });

  win.loadFile('tt.html');

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
  });

  // Hide to tray instead of closing
  win.on('close', (e) => {
    e.preventDefault();
    win.hide();
  });

  win.on('closed', () => { win = null; });
}

// ── Toggle window ────────────────────────────────────────
function toggleWindow() {
  if (!win) { createWindow(); return; }
  if (win.isVisible() && win.isFocused()) {
    win.hide();
  } else {
    win.show();
    win.focus();
  }
}

// ── Auto-update ──────────────────────────────────────────
function setupAutoUpdater() {
  // Silent check — download in background, prompt user only when ready
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', () => {
    // Update found — downloading silently in background
    if (tray) tray.setToolTip('דיווח שעות — מוריד עדכון…');
  });

  autoUpdater.on('update-downloaded', () => {
    if (tray) tray.setToolTip('דיווח שעות — עדכון מוכן להתקנה');
    createTray();
    dialog.showMessageBox({
      type: 'info',
      title: 'עדכון מוכן',
      message: 'גרסה חדשה הורדה ומוכנה להתקנה.',
      detail: 'לחץ "עדכן עכשיו" כדי להתקין ולהפעיל מחדש.',
      buttons: ['עדכן עכשיו', 'לאחר כיבוי'],
      defaultId: 0,
      cancelId: 1
    }).then(({ response }) => {
      if (response === 0) {
        // Close window and destroy tray BEFORE installer runs
        if (win) { win.removeAllListeners('close'); win.destroy(); win = null; }
        if (tray) { tray.destroy(); tray = null; }
        // isSilent=true → no NSIS GUI → no "cannot be closed" dialog
        autoUpdater.quitAndInstall(true, true);
      }
    });
  });

  autoUpdater.on('error', (err) => {
    // Silently ignore update errors — don't bother user
    console.error('Auto-update error:', err.message);
  });

  // Check for updates 3 seconds after startup, then every 2 hours
  setTimeout(() => autoUpdater.checkForUpdates().catch(() => {}), 3000);
  setInterval(() => autoUpdater.checkForUpdates().catch(() => {}), 2 * 60 * 60 * 1000);
}

// ── Build tray icon ──────────────────────────────────────
function createTray() {
  const iconPath = path.join(__dirname, 'icon.ico');

  if (tray) {
    tray.destroy();
    tray = null;
  }

  tray = new Tray(iconPath);
  tray.setToolTip('דיווח שעות — לירן בן אבי רו"ח');

  const autoStart = app.getLoginItemSettings().openAtLogin;
  const updateReady = autoUpdater.currentVersion !== null;

  const menuItems = [
    {
      label: '⏱  פתח דיווח שעות',
      click: () => createWindow(),
      bold: true
    },
    { type: 'separator' },
    {
      label: '🌅  התחל יום עבודה',
      click: () => {
        createWindow();
        setTimeout(() => {
          if (win) win.webContents.executeJavaScript(`
            (function(){
              const el = document.getElementById('tt-arr');
              if(el){ el.value=''; }
              if(typeof ttSetNow === 'function') ttSetNow('arrive');
            })();
          `).catch(()=>{});
        }, 1200);
      }
    },
    {
      label: '🌙  סיים יום עבודה',
      click: () => {
        createWindow();
        setTimeout(() => {
          if (win) win.webContents.executeJavaScript(`
            (function(){
              if(typeof ttSetNow === 'function'){
                ttSetNow('leave');
                setTimeout(()=>{ if(typeof ttSaveLeave==='function') ttSaveLeave(); }, 300);
              }
            })();
          `).catch(()=>{});
        }, 1200);
      }
    },
    { type: 'separator' },
    {
      label: autoStart ? '✅  פתיחה אוטומטית עם Windows' : '☐  פתיחה אוטומטית עם Windows',
      click: () => {
        const current = app.getLoginItemSettings().openAtLogin;
        setAutoStart(!current);
        setTimeout(createTray, 200);
      }
    },
    { type: 'separator' },
    {
      label: '🔄  בדוק עדכונים',
      click: () => autoUpdater.checkForUpdates().catch(() => {})
    },
    { type: 'separator' },
    {
      label: '✖  יציאה',
      click: () => {
        if (win) {
          win.removeAllListeners('close');
          win.close();
        }
        app.quit();
      }
    }
  ];

  const menu = Menu.buildFromTemplate(menuItems);
  tray.setContextMenu(menu);
  tray.on('click', () => toggleWindow());
  tray.on('double-click', () => createWindow());
}

// ── App ready ────────────────────────────────────────────
app.whenReady().then(() => {
  // Enable auto-start by default on first run
  const settings = app.getLoginItemSettings();
  if (!settings.wasOpenedAtLogin && !settings.openAtLogin) {
    setAutoStart(true);
  }

  createTray();
  setupAutoUpdater();

  // Don't open window on autostart — just sit in tray
  const isAutoStart = process.argv.includes('--autostart');
  if (!isAutoStart) {
    createWindow();
  }

});

// ── Second instance → focus existing window ──────────────
app.on('second-instance', () => {
  if (win) { win.show(); win.focus(); }
  else createWindow();
});

// ── Keep app alive when all windows closed ───────────────
app.on('window-all-closed', () => {
  // Do NOT quit — stay in tray
});
