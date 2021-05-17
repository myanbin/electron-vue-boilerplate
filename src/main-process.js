import db from './datastore'

db.settings.findOne({}, (err, doc) => {
  console.log('doc', doc)
  if (doc === null) {
    const defaultSettings = {
      paths: [],
      theme: 'light'
    }
    db.settings.insert(defaultSettings, (err, doc) => {
      // console.log(doc)
    })
  }
})

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



import { getPhotosFromDirectory } from './utils'
const photos = getPhotosFromDirectory(
  'C:\\Users\\ybm\\Pictures\\Camera Roll'
)

db.library.insert(photos, (err, docs) => {
  // console.log(docs)
})

