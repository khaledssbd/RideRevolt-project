import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

// Order Schema
const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'User email is required'],
      trim: true,
    },
    product: {
      type: String,
      ref: 'Product',
      required: [true, 'Product _id is required'],
    },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    totalPrice: {
      type: Number,
      required: [true, 'TotalPrice is required'],
    },
    createdAt: { type: String, default: `${Date.now}` },
    updatedAt: { type: String, default: `${Date.now}` },
  },
  { versionKey: false },
);

// // Order update middleware for updateOne
// orderSchema.pre('updateOne', function (next) {
//   this.set({ updatedAt: new Date().toISOString() });
//   next();
// });

// order Model
export const orderModel = model<TOrder>('Order', orderSchema);
