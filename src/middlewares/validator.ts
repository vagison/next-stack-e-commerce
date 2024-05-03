import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult, Schema } from 'express-validator'
import createError from 'http-errors'

export default function validate(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check schema
      await checkSchema(schema).run(req)

      // Get validation errors
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const err = createError.BadRequest(errors.array()[0].msg)
        return next(err)
      }

      // Continue
      return next()
    } catch (error) {
      // Handle unexpected errors
      return next(error)
    }
  }
}
