import { z } from 'zod';

// orderSchema validation using zod
const zodOrderValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(40, { message: "Email can't exceed 40 characters" })
    .email({ message: 'Invalid email address' }),

  product: z
    .string()
    .trim()
    .min(1, { message: 'Product is required' })
    .max(35, { message: 'Product cannot exceed 35 characters' }),

  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Price must be a positive number'),

  totalPrice: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Price must be a positive number'),

  createdAt: z.string().default(() => new Date().toISOString()),

  // updatedAt: z.string().optional(),
  updatedAt: z.string().default(() => new Date().toISOString()),
});

export default zodOrderValidationSchema;
