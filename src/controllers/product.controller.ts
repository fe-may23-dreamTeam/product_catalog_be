/* eslint-disable no-shadow */
import { Request, Response } from 'express';
import productsService from '../services/product.service';

const DEFAULT_LIMIT = 8;

interface ReqQuery {
  query: string;
}

const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || DEFAULT_LIMIT;
  const sortBy = String(req.query.sortBy) || 'Newest';
  const type = String(req.query.type) || '';

  try {
    const data = await productsService.getAll({
      page,
      perPage,
      sortBy,
      type,
    });

    res.status(200).send(data);
  } catch {
    res.status(500).send({
      data: null,
    });
  }
};

const getOne = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const foundProduct = await productsService.getOne(productId);

    if (foundProduct) {
      res.status(200).send(foundProduct);
    } else {
      res.status(404).send('Not found');
    }
  } catch {
    res.status(500).send('Error');
  }
};

const getOneByDetails = async (req: Request, res: Response) => {
  const color = req.query.color as string;
  const capacity = req.query.capacity as string;
  const { id } = req.params;

  try {
    const product = await productsService.getOneByDetails({
      id,
      color,
      capacity,
    });

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      data: null,
    });
  }
};

const getFiltered = async (
  req: Request<{}, {}, {}, ReqQuery>,
  res: Response,
) => {
  const { query } = req.query;

  try {
    const filteredProducts = await productsService.getFiltered(query);

    if (filteredProducts.length) {
      res.status(200).send(filteredProducts);
    } else {
      res.status(404).send('Not found');
    }
  } catch {
    res.status(500).send({
      data: null,
    });
  }
};

const getRecommended = async (_: Request, res: Response) => {
  try {
    const randomProducts = await productsService.getRandom(10);

    res.status(200).send(randomProducts);
  } catch {
    res.status(500).send('Error');
  }
};

const getNew = async (_: Request, res: Response) => {
  try {
    const products = await productsService.getNew();

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      data: null,
    });
  }
};

const getDiscount = async (_: Request, res: Response) => {
  try {
    const products = await productsService.getDiscount();

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      data: null,
    });
  }
};

export default {
  getDiscount,
  getNew,
  getAll,
  getOne,
  getFiltered,
  getRecommended,
  getOneByDetails,
};
