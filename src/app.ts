import express, { Application, Request, Response } from 'express';
// const express = require('express');
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// product route
app.use('/api/products', productRoutes);

// order route
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi, Welcome to RideRevolt! 🚴   ⚡');
});

export default app;
