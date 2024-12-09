import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

// CRUD operations through controller functions
router.post('/', orderControllers.createOrder);

router.get('/revenue', orderControllers.getTotalRevenue);

export const orderRoutes = router;
