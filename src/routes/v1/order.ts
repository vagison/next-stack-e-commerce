// routes/productRoutes.ts
import express from 'express'
// import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../../controllers/order'
import { createOrder, getAllOrders, getOrderById } from '../../controllers/order'
import { requestValidator } from '../../middlewares'
import { orderValidationSchema } from '../../utils/schemas'

const router = express.Router()

// Create a new order
router.post('/', requestValidator(orderValidationSchema), createOrder)

// Get all orders for a customer
router.get('/', getAllOrders)

// Get a single order by id
router.get('/:id', getOrderById)

export default router
