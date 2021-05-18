import { app } from 'electron'
import path from 'path'
import Datasource from 'nedb'

console.log(app.getPath('userData'))

const settings = new Datasource({
  autoload: true,
  filename: path.join(app.getPath('userData'), 'settings.db')
})

const photos = new Datasource({
  autoload: true,
  filename: path.join(app.getPath('userData'), 'photos.db')
})

const findSettings = (query) => {
  return new Promise((resolve, reject) => {
    settings.findOne(query, (err, doc) => {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

const updateSettings = (query, data) => {
  return new Promise((resolve, reject) => {
    settings.update(query, data, { returnUpdatedDocs: true }, (err, numAffected, affectedDocument, upsert) => {
      if (err) {
        reject(err)
      } else {
        resolve(affectedDocument)
      }
    })
  })
}

const findPhotos = (query) => {
  return new Promise((resolve, reject) => {
    photos.find(query, (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}
const findPhotoById = (query) => {
  return new Promise((resolve, reject) => {
    photos.findOne(query, (err, doc) => {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

const insertPhotos = (data) => {
  return new Promise((resolve, reject) => {
    photos.insert(data, (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}
const removePhotos = (query) => {
  return new Promise((resolve, reject) => {
    photos.remove(query, { multi: true }, (err, numRemoved) => {
      if (err) {
        reject(err)
      } else {
        resolve(numRemoved)
      }
    })
  })
}

export default {
  settings,
  photos,
  findSettings,
  updateSettings,
  insertPhotos,
  findPhotos,
  removePhotos,
  findPhotoById
}
