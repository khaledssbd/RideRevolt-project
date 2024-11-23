import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

// CRUD operations through controller functions
router.post('/orders', orderControllers.createOrder);

router.get('/orders/revenue', orderControllers.getTotalRevenue);

export const orderRoutes = router;
