// models/Order.ts
import mongoose, { Schema, Model } from 'mongoose'
import { IOrder, IOrderItem } from '../interfaces/models/order'

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
})

const OrderSchema = new Schema<IOrder>({
  items: { type: [OrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  customerId: { type: Schema.Types.ObjectId, required: true },
})

export const OrderItemModel: Model<IOrderItem> = mongoose.model<IOrderItem>('OrderItem', OrderItemSchema)
export const OrderModel: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema)
