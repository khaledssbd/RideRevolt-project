import { Types } from 'mongoose';
import { productModel } from '../model';
import { TProduct } from './product.interface';

// create a new product
const postProductIntoDB = async (productData: TProduct) => {
  const product = new productModel(productData); // create an instance by using the model
  const result = await product.save(); // built-in interface method
  return result;
};

// read all products
const getAllProductsFromDB = async () => {
  const result = await productModel.find();
  return result;
};

// read a single product by productId
const getSingleProductFromDB = async (productID: string) => {
  // checking the _id validation
  if (!Types.ObjectId.isValid(productID)) {
    throw new Error('Invalid Product ID');
  }

  const result = await productModel.aggregate([
    { $match: { _id: new Types.ObjectId(productID) } },
  ]);

  return result[0] || null;
};

// update single product
const updateProductInDB = async (productID: string, updatedDoc: TProduct) => {
  // checking the _id validation
  if (!Types.ObjectId.isValid(productID)) {
    throw new Error('Invalid Product ID');
  }

  const result = await productModel.updateOne(
    { _id: new Types.ObjectId(productID) },
    updatedDoc,
  );

  return result;
};

// delete single product
const deleteProductFromDB = async (productID: string) => {
  // checking the _id validation
  if (!Types.ObjectId.isValid(productID)) {
    throw new Error('Invalid Product ID');
  }

  // soft delete - update the isDeleted field to true
  const result = await productModel.updateOne(
    { _id: new Types.ObjectId(productID) },
    { isDeleted: true },
  );
  return result;
};

export const productServices = {
  postProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
