import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import db from './datastore'
import { walkdir, facesRecognitionApi } from './utils'

db.settings.findOne({}, (err, doc) => {
  console.log('init settings', doc)
  if (doc === null) {
    const defaultSettings = {
      paths: [],
      theme: 'light',
      count: 0
    }
    db.settings.insert(defaultSettings, (err, doc) => {
      console.log(doc)
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
  const photos = walkdir(result.filePaths[0])
  const insertedPhotos = await db.insertPhotos(photos)
  console.log('insert photos', insertedPhotos.length)
  const updatedSettings = await db.updateSettings({}, { $addToSet: { paths: result.filePaths[0] }, $inc: { count: insertedPhotos.length } })
  return updatedSettings
})
ipcMain.handle('remove-directory', async (event, path) => {
  const numRemoved = await db.removePhotos({ source: path })
  console.log('remove photos', numRemoved)
  const updatedSettings = await db.updateSettings({}, { $pull: { paths: path }, $inc: { count: -numRemoved } })
  return updatedSettings
})

ipcMain.handle('load-photos', async (event, keyword) => {
  const re = new RegExp(keyword)
  const query = keyword ? { 'faces.name': re } : {}
  console.log('load photos', query)
  const photos = await db.findPhotos(query)
  return photos
})
ipcMain.handle('load-photo', async (event, id) => {
  const photo = await db.findPhotoById({ _id: id })
  return photo
})
ipcMain.handle('load-photo-faces', async (event, id) => {
  const photo = await db.findPhotoById({ _id: id })
  const base64 = Buffer.from(fs.readFileSync(photo.path), 'binary').toString('base64')
  const faces = await facesRecognitionApi(photo.uuid, base64)
  const updatedPhoto = await db.updatePhotoById({ _id: id }, { $set: { faces: faces } })
  return updatedPhoto.faces
})
