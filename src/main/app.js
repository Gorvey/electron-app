/*
 * @Author: zengzhe
 * @Date: 2023-02-20 15:25:12
 * @LastEditors: zengzhe
 * @LastEditTime: 2023-02-21 16:44:09
 * @Description:
 */
import { app } from 'electron'
import { initMainWindow, initMainView } from './module/create-window'
import { initTabEvent } from './module/tabs'
export const initWindow = async () => {
  initTabEvent()

  await app.whenReady()
  const mainWindow = initMainWindow()
  initMainView(mainWindow)
}
