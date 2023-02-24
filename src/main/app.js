import { app } from 'electron'
import { initMainWindow, initMainView } from './module/create-window'
export const initWindow = async () => {
  await app.whenReady()
  const mainWindow = initMainWindow()
  initMainView(mainWindow)
}
