// models/Product.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

import { IProduct } from '../interfaces/models/product'

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
})

export const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema)
