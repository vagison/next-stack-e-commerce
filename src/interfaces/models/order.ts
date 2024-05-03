import { Types, Document } from 'mongoose'
import { IProduct } from './product'

export interface IOrderItem extends Document {
  product: IProduct
  quantity: number
}

export interface IOrder extends Document {
  items: IOrderItem[]
  totalPrice: number
  customerId: Types.ObjectId
}
