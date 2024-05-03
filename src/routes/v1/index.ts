// routes/index.ts
import express from 'express'
import productRoutes from './product'
import orderRoutes from './order'
import userRoutes from './user'

const router = express.Router()

// Mount product routes
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/users', userRoutes)

export default router
