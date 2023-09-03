/* eslint-disable no-shadow */
import { Request, Response } from 'express';
import productsService from '../services/product.service';

const DEFAULT_LIMIT = 4;

const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || DEFAULT_LIMIT;
  const sortBy = String(req.query.sortBy) || 'newest';

  try {
    const data = await productsService.getAll({ page, perPage, sortBy });

    res.status(200).send(data);
  } catch {
    res.status(500).send({
      data: null,
    });
  }
};

export default { getAll };
