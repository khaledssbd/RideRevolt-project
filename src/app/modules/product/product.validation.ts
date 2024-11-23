import { z } from 'zod';

// productSchema validation using zod
const zodProductValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(40, { message: 'Name cannot exceed 40 characters' }),

  brand: z
    .string()
    .trim()
    .min(1, { message: 'Brand is required' })
    .max(35, { message: 'Brand cannot exceed 35 characters' }),
  price: z.number().min(1, 'Price must be a positive number'),

  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    errorMap: () => ({
      message:
        "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
    }),
  }),

  description: z.string().min(1, { message: 'Description is required' }).trim(),

  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, { message: 'Quantity is required' }),

  inStock: z
    .boolean()
    .refine((value) => typeof value === 'boolean', 'inStock must be a boolean'),
  
  createdAt: z.string().default(() => new Date().toISOString()),

  updatedAt: z.string().optional(),

  isDeleted: z.boolean().optional(),
});

export default zodProductValidationSchema;
