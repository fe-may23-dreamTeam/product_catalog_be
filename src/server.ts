/* eslint-disable no-shadow */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongooseConnect } from './utils/db';
import productsRouter from './routes/products';

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors({ origin: process.env.CLIENT_URL })).use(express.json());

app.get('/', async (_, res) => {
  res.status(200).send('Hello from DreamTeam');
});

app.use('/products', productsRouter);
