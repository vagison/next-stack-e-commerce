// controllers/productController.ts
import { Request, Response, NextFunction } from 'express'
import httpErrors from 'http-errors'
import { OrderItemModel, OrderModel } from '../models/order'
import { IOrder, IOrderItem } from '../interfaces/models/order'
import { paginate, generatePaginatedRes } from '../utils/pagination'
import { ProductModel } from '../models/product'
import { UserModel } from '../models/user'

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, customerId } = req.body

    const customer = await UserModel.findById(customerId)
    if (!customer) {
      throw httpErrors.NotFound('User not found')
    }

    let totalPrice = 0

    // Check if stock is available for each product and calculate total price
    for (const item of items) {
      const product = await ProductModel.findById(item.productId)
      if (!product || product.stock < item.quantity) {
        throw httpErrors.BadRequest(`Insufficient stock for product ${item.productId}`)
      }
      totalPrice += product.price * item.quantity
    }

    // Create order items array
    const orderItems: IOrderItem[] = items.map((item: any) => ({
      product: item.productId,
      quantity: item.quantity,
    }))

    // Create new order
    const newOrder = new OrderModel({
      items: orderItems,
      totalPrice,
      customerId,
    })

    // Save new order
    await newOrder.save()

    // Update stock for products
    for (const item of items) {
      const product = await ProductModel.findById(item.productId)
      if (product) {
        product.stock -= item.quantity
        await product.save()
      }
    }

    return res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
}

// Get all orders
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId } = req.body

    const orders = await OrderModel.find({ customerId })
    return res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id
    const order = await OrderModel.findById(orderId)
    if (!order) {
      throw httpErrors.NotFound('Order not found')
    } else {
      return res.status(200).json(order)
    }
  } catch (error) {
    next(error)
  }
}
