import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const walkdir = directory => {
  const files = []

  fs.readdirSync(directory).forEach(item => {
    const file = path.join(directory, item)
    const stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      files.splice(0, 0, ...walkdir(file))
    } else if (file.match(/[.]jpe?g$/i)) {
      files.push({
        uuid: uuidv4(),
        path: file,
        file: item,
        source: directory,
        size: stat.size,
        ctime: stat.ctimeMs
      })
    }
  })

  return files
}
