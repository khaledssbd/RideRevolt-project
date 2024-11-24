import { Request, Response } from 'express';
import { productServices } from './product.service';
import zodProductValidationSchema from './product.validation';

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // schema validation using zod
    const zodParsedProduct = zodProductValidationSchema.parse(productData);

    //  if any errors happen in zodParsedProduct that will be catched through the catch block
    const result = await productServices.postProductIntoDB(zodParsedProduct);

    // response
    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: err.name,
        ...err,
      },
      stack: err.stack,
    });
  }
};

// read all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDB();

    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong!',
      success: false,
      error: err,
    });
  }
};

// read a single product by productId
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);

    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(err.message === 'Invalid Product ID' ? 404 : 500).json({
      message: err.message || 'Something went wrong!',
      success: false,
      error: err,
    });
  }
};

// update single product
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const result = await productServices.updateProductInDB(
      productId,
      productData,
    );

    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(err.message === 'Invalid Product ID' ? 404 : 500).json({
      message: err.message || 'Something went wrong!',
      success: false,
      error: err,
    });
  }
};

// delete single product
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);

    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (err: any) {
    res.status(err.message === 'Invalid Product ID' ? 404 : 500).json({
      message: err.message || 'Something went wrong!',
      success: false,
      error: err,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
