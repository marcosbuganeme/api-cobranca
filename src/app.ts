import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

class App {
  express: express.Application

  constructor () {
    this.inicializaTodasConfiguracoes()
  }

  inicializaTodasConfiguracoes () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(bodyParser.json({ limit: '1mb' }))
    this.express.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

    this.express.use((req, res, next) => {
      console.time('Request')
      console.log(`Método: ${req.method} || URL: ${req.url}`)
      next()
      console.timeEnd('Request')
    })

    this.express.use(cors())
    this.express.use(helmet())
  }

  routes () {
    this.express.use('/', (req, res) => {
      return res.json('OK')
    })
  }
}

export default new App().express