// routes/productRoutes.ts
import express from 'express';
import { createUser, getUserById } from '../../controllers/user';
import { userValidationSchema } from '../../utils/schemas';
import { requestValidator } from '../../middlewares';

const router = express.Router();

// Create a new user
router.post('/', requestValidator(userValidationSchema), createUser);

// Get a user by id
router.get('/:id', getUserById);

export default router;
