import { Types } from 'mongoose';
import { orderModel, productModel } from '../model';
import { TOrder } from './order.interface';

// create a new product
const createOrderIntoDB = async (orderData: TOrder) => {
  // Find the product to check the available quantity
  const product = await productModel.findOne({
    _id: new Types.ObjectId(orderData.product),
  });

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < orderData.quantity || product.quantity === 0) {
    throw new Error('Insufficient stock');
  }

  // decrease the ordered quantity from the product's quantity
  const updatedProduct = await productModel.updateOne(
    { _id: new Types.ObjectId(orderData.product) },
    {
      $inc: { quantity: -orderData.quantity },
      $set: { inStock: product.quantity - orderData.quantity > 0 },
    },
  );

  if (!updatedProduct.modifiedCount) {
    throw new Error('Failed to update product stock');
  }

  // Save the order
  const order = new orderModel(orderData);
  const result = await order.save();

  return result;
};



// read total revenue
const getTotalRevenueFromDB = async () => {
  const result = await orderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result;
};


export const orderServices = {
  createOrderIntoDB,
  getTotalRevenueFromDB,
};
