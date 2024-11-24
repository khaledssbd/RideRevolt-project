import { Request, Response } from 'express';
import zodOrderValidationSchema from './order.validation';
import { orderServices } from './order.service';

// create a new Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // schema validation using zod
    const zodParsedOrder = zodOrderValidationSchema.parse(orderData);

    //  if any errors happen in zodParsedProduct that will be catched through the catch block
    const result = await orderServices.createOrderIntoDB(zodParsedOrder);

    // response
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(err.message === 'Product not found' ? 404 : 500).json({
      message: err.message || 'Validation failed',
      success: false,
      error: {
        name: err.name,
        ...err,
      },
      stack: err.stack,
    });
  }
};

// read total revenue
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getTotalRevenueFromDB();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result.length > 0 ? result[0] : { totalRevenue: 0 },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong!',
      success: false,
      error: err,
    });
  }
};

export const orderControllers = {
  createOrder,
  getTotalRevenue,
};
