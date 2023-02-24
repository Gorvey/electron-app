/*
 * @Author: zengzhe
 * @Date: 2023-02-21 14:19:42
 * @LastEditors: zengzhe
 * @LastEditTime: 2023-02-21 16:43:22
 * @Description:
 */
import { app, shell, BrowserWindow, BrowserView, screen } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
export const initMainWindow = () => {
  const primaryScreen = screen.getPrimaryDisplay()
  const { height: screenHeight, width: screenWidth } = primaryScreen.workAreaSize
  const mainWindowHeight = Math.round(screenHeight * 0.85)
  const mainWindowWidth = Math.round(screenWidth * 0.48)
  console.log(mainWindowHeight)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: mainWindowWidth,
    height: mainWindowHeight,
    x: Math.round(screenWidth - mainWindowWidth - 20),
    y: Math.round((screenHeight - mainWindowHeight) / 2),
    useContentSize: false,
    show: true,
    autoHideMenuBar: true,
    resizable: false,
    alwaysOnTop: true,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {})
    // webPreferences: {
    //   preload: join(__dirname, '../preload/webview.js'),
    //   sandbox: false
    // }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  return mainWindow
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  //   mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }
}

export const initMainView = (mainWindow) => {
  // const barView = new BrowserView()
  // const webview = new BrowserView()
  const barView = new BrowserView({
    webPreferences: {
      preload: join(__dirname, '../preload/bar.js'),
      sandbox: false
    }
  })
  const webview = new BrowserView({
    webPreferences: {
      preload: join(__dirname, '../preload/webview.js'),
      sandbox: false
    }
  })
  mainWindow.addBrowserView(barView)
  mainWindow.addBrowserView(webview)
  const [mainWindowHeight, mainWindowWidth] = mainWindow.getSize()
  const barViewWidth = 40
  barView.setBounds({
    width: barViewWidth,
    height: mainWindowHeight,
    x: 0,
    y: 0
  })
  webview.setBounds({
    width: mainWindowWidth,
    height: mainWindowHeight,
    x: barViewWidth,
    y: 0
  })
  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    // webview.webContents.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/webview.html`)
    barView.webContents.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/barView.html`)
  } else {
    // webview.webContents.loadFile(join(__dirname, '../renderer/webview.html'))
    barView.webContents.loadFile(join(__dirname, '../renderer/barView.html'))
  }
  barView.webContents.openDevTools({
    mode: 'detach'
  })
}
