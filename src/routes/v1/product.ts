// routes/productRoutes.ts
import express from 'express'
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../../controllers/product'
import { requestValidator } from '../../middlewares'
import { productValidationSchema } from '../../utils/schemas'

const router = express.Router()

// Create a new product
router.post('/', requestValidator(productValidationSchema), createProduct)

// Get all products
router.get('/', getAllProducts)

// Get a single product by id
router.get('/:id', getProductById)

// Update a product by id
router.patch('/:id', requestValidator(productValidationSchema), updateProduct)

// Delete a product by id
router.delete('/:id', deleteProduct)

export default router
