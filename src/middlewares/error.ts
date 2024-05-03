import { Request, Response, NextFunction } from 'express'
import PrettyError from 'pretty-error'

function errorLogger(error: Error, req: Request, res: Response, next: NextFunction) {
  const pe = new PrettyError()
  console.log(pe.render(error))
  next(error)
}

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  const name: string = (error as any).name || 'Internal Server Error'
  let statusCode: number = (error as any).status || 500
  let message: string = (error as any).message || 'Something went wrong'

  // TODO: improve
  if (message.startsWith('Cast to ObjectId')) {
    statusCode = 404
    message = 'Resource not found'
  }

  const err = {
    statusCode,
    message,
    name: process.env.NODE_ENV === 'development' ? name : undefined,
    stack: process.env.NODE_ENV === 'development' ? (error as any).stack : undefined,
  }

  return res.status(statusCode).json(err)
}

function invalidPathHandler(req: Request, res: Response) {
  const statusCode = 404
  const message = 'Invalid path'

  const response = {
    message,
  }

  return res.status(statusCode).json(response)
}

export { errorLogger, errorHandler, invalidPathHandler }
