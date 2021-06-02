import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import exifr from 'exifr'
import db from './datastore'
import { walkdir, facesRecognitionApi } from './utils'

db.settings.findOne({}, (err, doc) => {
  console.log('init settings', doc)
  if (doc === null) {
    const defaultSettings = {
      sources: [],
      theme: 'light'
    }
    db.settings.insert(defaultSettings, (err, doc) => {
      console.log(doc)
    })
  }
})

ipcMain.handle('load-settings', async event => {
  const settings = await db.findSettings()
  const nofacesCount = (await db.findPhotos({ faces: { $exists: false } })).length
  return [settings, nofacesCount]
})
ipcMain.handle('open-directory', async event => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  })
  const photos = walkdir(result.filePaths[0])
  const insertedPhotos = await db.insertPhotos(photos)
  console.log('insert photos', insertedPhotos.length)
  const updatedSettings = await db.updateSettings({}, { $addToSet: { sources: result.filePaths[0] } })
  return [updatedSettings, insertedPhotos.length]
})
ipcMain.handle('remove-directory', async (event, path) => {
  const numRemoved = await db.removePhotos({ source: path })
  console.log('remove photos', numRemoved)
  const updatedSettings = await db.updateSettings({}, { $pull: { sources: path } })
  return [updatedSettings, numRemoved]
})

ipcMain.handle('load-photos', async (event, query) => {
  const photos = await db.findPhotos(query)
  return photos
})
ipcMain.handle('load-photo', async (event, id) => {
  const photo = await db.findPhotoById({ _id: id })
  return photo
})

/**
 * 获取照片的 Exif 信息
 */
ipcMain.handle('load-photo-exif', async (event, id) => {
  const photo = await db.findPhotoById({ _id: id })
  const exif = await exifr.parse(photo.path)
  console.log(exif)
  return exif
})

/**
 * 获取照片中人脸信息（通过人脸识别 API）
 */
ipcMain.handle('load-photo-faces', async (event, id) => {
  const photo = await db.findPhotoById({ _id: id })
  const base64 = Buffer.from(fs.readFileSync(photo.path), 'binary').toString('base64')
  const faces = await facesRecognitionApi(photo.uuid, base64)
  const updatedPhoto = await db.updatePhotoById({ _id: id }, { $set: { faces: faces } })
  return updatedPhoto.faces
})

ipcMain.handle('patchadd-photo-faces', async event => {
  const photos = await db.findPhotos({ faces: { $exists: false } })
  photos.forEach(async (photo) => {
    const base64 = Buffer.from(fs.readFileSync(photo.path), 'binary').toString('base64')
    const faces = await facesRecognitionApi(photo.uuid, base64)
    console.log(faces)
    const updatedPhoto = await db.updatePhotoById({ _id: photo._id }, { $set: { faces: faces } })
    console.log(updatedPhoto)
  })
  return photos
})

ipcMain.handle('update-photo', async (event, id, body) => {
  const updatedPhoto = await db.updatePhotoById({ _id: id }, body)
  console.log(updatedPhoto)
  return updatedPhoto
})

ipcMain.handle('load-peoples', async event => {
  const photos = await db.findPhotos()
  const peoples = []
  photos.forEach(photo => {
    if (photo.faces && photo.faces.length > 0) {
      photo.faces.forEach(face => {
        const idx = peoples.findIndex(item => item.name === face.name)
        if (idx === -1) {
          peoples.push({
            name: face.name,
            info: face.info,
            avatar: face.avatar,
            photos: [photo]
          })
        } else {
          peoples[idx].photos.push(photo)
        }
      })
    }
  })
  console.log(peoples)
  return peoples
})
