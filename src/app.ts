import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import consola from 'consola'

import connectToDb from './utils/db'
import { corsConfig } from './config'
import routes from './routes/v1'
import { errorHandler, errorLogger, invalidPathHandler } from './middlewares'

async function start() {
  await connectToDb()
  const app: Express = express()
  app.enable('trust proxy')
  app.use(morgan('[:date[iso]] - :remote-addr - :user-agent - :method - :url - :status - :response-time ms'))
  app.use(cors(corsConfig))
  app.use(bodyParser.json())
  app.use('/v1', routes)
  app.use(invalidPathHandler)
  app.use(errorLogger)
  app.use(errorHandler)
  // app.get('/v1', (req: Request, res: Response) => {
  //   res.send('Express + TypeScript Server!!!???')
  // })
  const port = +(process.env.PORT as string) || 3000
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

start()
