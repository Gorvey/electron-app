/*
 * @Author: zengzhe
 * @Date: 2023-02-21 16:20:01
 * @LastEditors: zengzhe
 * @LastEditTime: 2023-02-21 17:11:15
 * @Description:
 */
// const tab = {
//   url: '',
//   title: '',
//   icon: ''
// }
import { BrowserWindow, BrowserView, ipcMain } from 'electron'

const defaultBrowserView = (mainWindow) => {
  const [mainWindowWidth, mainWindowHeight] = mainWindow.getContentSize()
  const browserView = new BrowserView()
  mainWindow.addBrowserView(browserView)
  browserView.setBounds({
    width: mainWindowWidth,
    height: mainWindowHeight,
    x: 40,
    y: 0
  })
  return browserView
}
const addNewTab = (event, url) => {
  const webContents = event.sender
  const mainWindow = BrowserWindow.fromWebContents(webContents)
  const tab = defaultBrowserView(mainWindow)
  tab.webContents.loadURL(url)
}
// const selectTab = (event, url) => {
//   const webContents = event.sender
//   const mainWindow = BrowserWindow.fromWebContents(webContents)
//   const tab = defaultBrowserView(mainWindow)
//   tab.webContents.loadURL(url)

// }
const toNewTab = (event, url) => {
  const webContents = event.sender
  // const mainWindow = BrowserWindow.fromWebContents(webContents)
}
export const initTabEvent = () => {
  ipcMain.on('add-new-tab', addNewTab)
  ipcMain.on('to-new-tab', toNewTab)
  // ipcMain.on('close-tab', addNewTab)
  // ipcMain.on('sort-tab', addNewTab)
}
