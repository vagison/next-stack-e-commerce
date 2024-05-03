import { Request, Response, NextFunction } from 'express'
import httpErrors from 'http-errors'

import { UserModel } from '../models/user'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName } = req.body

    // Create a new user instance
    const newUser = new UserModel({ firstName, lastName })

    // Save the user to the database
    await newUser.save()

    return res.status(201).json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    // Find the user by ID in the database
    const user = await UserModel.findById(id)

    if (!user) {
      throw httpErrors.NotFound('User not found!')
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
