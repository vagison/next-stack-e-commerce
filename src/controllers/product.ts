// controllers/productController.ts
import { Request, Response, NextFunction } from 'express';
import httpErrors from 'http-errors';
import { ProductModel } from '../models/product';
import { IProduct } from '../interfaces/models/product';
import { paginate, generatePaginatedRes } from '../utils/pagination';

// Create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, stock }: IProduct = req.body;
    const newProduct = new ProductModel({ name, description, price, stock });
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { offset, limit, page } = paginate(req);
    const totalProductsCount = await ProductModel.countDocuments();
    const products = await ProductModel.find().limit(limit).skip(offset);
    const paginatedResponse = generatePaginatedRes(products, {
      total: totalProductsCount,
      page,
      limit,
    });
    return res.json(paginatedResponse);
  } catch (error) {
    next(error);
  }
};

// Get a single product by id
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) throw httpErrors.NotFound('Product not found');

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Update a product by id
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, stock }: IProduct = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, { name, description, price, stock }, { new: true });
    if (!updatedProduct) throw httpErrors.NotFound('Product not found');
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product by id
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw httpErrors.NotFound('Product not found');
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
