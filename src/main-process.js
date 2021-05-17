import { ipcMain, dialog } from 'electron'

ipcMain.handle('open-directory-dialog', async event => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  })
  if (!result.canceled && result.filePaths) {
    return result.filePaths[0]
  } else {
    return undefined
  }
})
