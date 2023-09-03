/* eslint-disable max-len */
/* eslint-disable no-shadow */
import { Request, Response } from 'express';
import productsService from '../services/product.service';

const DEFAULT_LIMIT = 4;

const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || DEFAULT_LIMIT;
  const sortBy = String(req.query.sortBy) || 'Newest';

  try {
    const data = await productsService.getAll({ page, perPage, sortBy });

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
      res.status(200).json(foundProduct);
    } else {
      res.status(404).send('Not found');
    }
  } catch {
    res.status(500).send('Error');
  }
};

interface ReqQuery {
  query: string,
}

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
  };
};

export default { getAll, getOne, getFiltered };
