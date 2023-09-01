import { Product } from '../models/product.model';

const getAll = async (page: number, perPage: number) => {
  const offset = perPage * (page - 1);
  const productsCollection = await Product.find().skip(offset).limit(perPage);
  const productsCollectionCount = await Product.count();

  const data = {
    totalProducts: productsCollectionCount,
    data: productsCollection,
  };

  return data;
};

const getOne = async (productId: string) => {
  const foundProduct = await Product.findById(productId)
    .populate('description')
    .populate('category');

  return foundProduct;
};

export default { getAll, getOne };
