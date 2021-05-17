import { app } from 'electron'
import path from 'path'
import Datasource from 'nedb'

console.log(app.getPath('userData'))

const library = new Datasource({
  autoload: true,
  filename: path.join(app.getPath('userData'), 'library.db')
})

const settings = new Datasource({
  autoload: true,
  filename: path.join(app.getPath('userData'), 'settings.db')
})

export default { library, settings }
