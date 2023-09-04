import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import productsController from './controllers/product.controller';
import { corsOptions } from './utils/corsOptions';
import { mongooseConnect } from './utils/db';

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors(corsOptions)).use(express.json());

app.get('/', async (_, res) => {
  res.status(200).send('Hello from DreamTeam');
});

app.get('/products', productsController.getAll);
