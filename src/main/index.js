/*
 * @Author: zengzhe
 * @Date: 2023-02-20 15:19:27
 * @LastEditors: zengzhe
 * @LastEditTime: 2023-02-21 14:28:15
 * @Description:
 */
/*
 * @Author: zengzhe
 * @Date: 2023-02-20 15:19:27
 * @LastEditors: zengzhe
 * @LastEditTime: 2023-02-20 15:38:00
 * @Description:
 */
import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { initWindow } from './app'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  initWindow()
})
