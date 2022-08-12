const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/users'

    // Connect to database
    this.connectDB()

    //Middlewares
    this.middlewares()

    // Routes
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    //Lectura y parseo del body
    this.app.use(express.json())

    //Directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    //Llama al archivo en donde están las rutas:
    this.app.use(this.usuariosPath, require('../routes/users'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port)
    })
  }
}

module.exports = Server
