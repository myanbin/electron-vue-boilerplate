import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const getPhotosFromDirectory = directory => {
  const files = []

  fs.readdirSync(directory).forEach(item => {
    const file = path.join(directory, item)
    const stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      files.splice(0, 0, ...getPhotosFromDirectory(file))
    } else if (file.match(/[.]jpe?g$/i)) {
      files.push({
        uuid: uuidv4(),
        path: file,
        file: item,
        size: stat.size,
        ctime: stat.ctimeMs
      })
    }
  })

  return files
}

const photos = getPhotosFromDirectory(
  '/Users/ybm/Pictures/趣图/'
)

console.log(photos)
localStorage.setItem('library', JSON.stringify(photos))

const settings = {
  paths: [
    '/Users/ybm/Pictures/照片图库.photoslibrary/',
    '/Users/ybm/Pictures/趣图/'
  ],
  theme: 'light'
}

localStorage.setItem('settings', JSON.stringify(settings))
