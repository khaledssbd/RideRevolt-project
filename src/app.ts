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
app.use('/api', productRoutes);

// order route
app.use('/api', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('RideRevolt is Running! 🚴   ⚡');
});

export default app;
