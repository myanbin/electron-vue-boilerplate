import fs from 'fs'
import path from 'path'
import axios from 'axios'
import qs from 'qs'
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

export const facesRecognitionApi = async (uuid, base64) => {
  const response_1 = await axios.post(
    'https://ai.xinhua-news.cn/auth/session',
    qs.stringify({
      'username': 'photolib',
      'password': 'photos@library'
    }),
    {
      headers: {
        'Origin': 'https://ai.xinhua-news.cn',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  )
  const response_2 = await axios.post(
    'https://ai.xinhua-news.cn/saas/face/FaceDetection',
    {
      fileID: uuid,
      type: 1,
      img: base64
    },
    {
      headers: {
        'Authorization': `Bearer ${response_1.data.result.id_token}`
      },
      'maxBodyLength': Infinity
    }
  )
  const faces = response_2.data.result.objects.filter(face => face.name !== 'unknown').map(face => ({ name: face.name, info: face.info, position: face.position }))
  return faces
}
