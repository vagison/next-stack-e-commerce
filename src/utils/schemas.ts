import { Schema } from 'express-validator';

const productValidationSchema: Schema = {
  name: {
    in: ['body'],
    isString: true,
    trim: true,
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Name must be between 3 and 50 characters long',
    },
    errorMessage: 'Name is required and must be a string',
  },
  description: {
    in: ['body'],
    isString: true,
    trim: true,
    isLength: {
      options: { min: 10, max: 200 },
      errorMessage: 'Description must be between 10 and 200 characters long',
    },
    errorMessage: 'Description is required and must be a string',
  },
  price: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Price must be a positive number',
    },
    errorMessage: 'Price is required and must be a number',
  },
  stock: {
    in: ['body'],
    isInt: {
      options: { min: 0 },
      errorMessage: 'Stock must be a non-negative integer',
    },
    errorMessage: 'Stock is required and must be an integer',
  },
};

// TODO: Validation should go here
const orderValidationSchema: Schema = {};

// TODO: Validation should go here
const userValidationSchema: Schema = {};

export { productValidationSchema, orderValidationSchema, userValidationSchema };
