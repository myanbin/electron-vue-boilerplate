import { ipcMain, dialog } from 'electron'
import db from './datastore'
import { walkdir } from './utils'

db.settings.findOne({}, (err, doc) => {
  console.log('init settings', doc)
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

ipcMain.handle('load-settings', async event => {
  const settings = await db.findSettings({})
  return settings
})
ipcMain.handle('open-directory', async event => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  })
  const updatedSettings = await db.updateSettings({}, { $addToSet: { paths: result.filePaths[0] } })
  const insertedPhotos = await  db.insertPhotos(walkdir(result.filePaths[0]))
  console.log('insert photos', insertedPhotos.length)
  return updatedSettings
})
ipcMain.handle('remove-directory', async (event, path) => {
  const updatedSettings = await db.updateSettings({}, { $pull: { paths: path } })
  const numRemoved = await db.removePhotos({ source: path })
  console.log('remove photos', numRemoved)
  return updatedSettings
})

ipcMain.handle('load-photos', async event => {
  const photos = await db.findPhotos({})
  return photos
})
ipcMain.handle('load-photo', async (event, id) => {
  const photo = await db.findPhotoById({ _id: id })
  return photo
})
