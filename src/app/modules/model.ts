import { model, Schema } from 'mongoose';
import { TProduct } from './product/product.interface';
import { TOrder } from './order/order.interface';

// Product Schema
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Bike name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Bike brand is required'],
      trim: true,
    },
    price: { type: Number, required: [true, 'Bike price is required'] },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message:
          "{VALUE} is not a valid category. It must be of one of the followings: 'Mountain', 'Road', 'Hybrid', 'Electric'.",
      },
      required: [true, 'Bike category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Bike description is required'],
      trim: true,
    },
    quantity: { type: Number, required: [true, 'Bike quantity is required'] },
    inStock: { type: Boolean, required: [true, 'Bike inStock is required'] },
    createdAt: { type: String, default: `${Date.now}` },
    updatedAt: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
);

// Product update middleware for findOneAndUpdate
productSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: new Date().toISOString() });
  next();
});

// Product Query middleware #1 (for find)
productSchema.pre('find', function (next) {
  // while we are getting all data by using find method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } }); // this.find({ isDeleted: false })
  next();
});

// Product Query middleware #2 (for findOne)
productSchema.pre('findOne', function (next) {
  // while we are getting single data by using findOne method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Product Query middleware #3 (for aggregate)
productSchema.pre('aggregate', function (next) {
  // while we are getting all data by using aggregate(find) method we want to exclude the data that has isDeleted: true
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});




// Order Schema
const orderSchema = new Schema<TOrder>({
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
  updatedAt: { type: String },
});


// Product update middleware for findOneAndUpdate
orderSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: new Date().toISOString() });
  next();
});




// product Model
export const productModel = model<TProduct>('Product', productSchema);

// order Model
export const orderModel = model<TOrder>('Order', orderSchema);