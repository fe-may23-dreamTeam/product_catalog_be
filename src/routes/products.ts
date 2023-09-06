/* eslint-disable no-shadow */
import express, { Request, Response, NextFunction } from 'express';
import productsController from '../controllers/product.controller';

const router = express.Router();

interface ReqQuery {
  query: string;
}

const isQuery = (
  req: Request<{}, {}, {}, ReqQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req.query;

  if (query) {
    return next();
  }

  return next('route');
};

const isType = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.query;

  if (type) {
    return next();
  }

  return next('route');
};
const checkPhoneDetails = (req: Request, res: Response, next: NextFunction) => {
  const { color, capacity } = req.query;

  if (color || capacity) {
    return next();
  }

  return next('route');
};

router.get('/', isQuery, productsController.getFiltered);
router.get('/', isType, productsController.getByType);
router.get('/', productsController.getAll);
router.get('/new', productsController.getNew);
router.get('/discount', productsController.getDiscount);
router.get('/:id', checkPhoneDetails, productsController.getOneByDetails);
router.get('/:id', productsController.getOne);
router.get('/:id/recommended', productsController.getRecommended);

export default router;
