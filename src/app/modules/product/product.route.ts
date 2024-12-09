import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

// CRUD operations through controller functions
router.post('/', productControllers.createProduct);

router.get('/', productControllers.getAllProducts);

router.get('/:productId', productControllers.getProductById);

router.put('/:productId', productControllers.updateProductById);

router.delete('/:productId', productControllers.deleteProductById);

export const productRoutes = router;
