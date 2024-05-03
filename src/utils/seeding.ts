import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import { ProductModel } from '../models/product'
import { IProduct } from '../interfaces/models/product'
import { dbConfig } from '../config'

// Define MongoDB connection URI
const MONGODB_URI = dbConfig.dbUri

// Connect to MongoDB
mongoose.connect(MONGODB_URI)

// Define function to generate mock products
function generateMockProducts(numProducts: number) {
  const products: IProduct[] = []
  for (let i = 0; i < numProducts; i++) {
    const name = faker.commerce.productName()
    const description = faker.lorem.sentence()
    const price = parseFloat(faker.commerce.price())
    const stock = faker.number.int({ min: 0, max: 100 })

    const product = new ProductModel({ name, description, price, stock })
    products.push(product)
  }
  return products
}

async function seed(numProducts: number) {
  // Generate mock products
  const mockProducts = generateMockProducts(numProducts)

  // Insert mock products into MongoDB
  try {
    await ProductModel.insertMany(mockProducts)
    console.log('Seeding successful!')
  } catch (error) {
    console.error('Seeding failed:', error)
  } finally {
    // Close MongoDB connection
    mongoose.disconnect()
  }
}

// Get number of products from command line arguments
const numProducts = process.argv[2] ? parseInt(process.argv[2], 10) : 10 // Default to 10 products if not specified

// Run seeding function
seed(numProducts)
