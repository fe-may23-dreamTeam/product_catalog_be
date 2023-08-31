import { Product } from '../models/product.model';

const getAll = async (page: number, perPage: number) => {
  const offset = perPage * (page - 1);
  const productsCollection = await Product.find()
    .populate('category')
    .populate('description')
    .skip(offset)
    .limit(perPage);
  const productsCollectionCount = await Product.count();

  const data = {
    totalProducts: productsCollectionCount,
    data: productsCollection,
  };

  return data;
};

export default { getAll };
