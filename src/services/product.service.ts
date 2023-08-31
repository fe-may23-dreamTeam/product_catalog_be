import { Product } from '../models/product.model';

const getAll = async (page: number, perPage: number) => {
  const offset = perPage * (page - 1);
  const productsCollection = await Product.find().skip(offset).limit(perPage);
  const productsCollectionCount = await Product.count();

  const totalPages = Math.ceil(productsCollectionCount / perPage);

  const data = {
    totalProducts: productsCollectionCount,
    totalPages,
    perPage,
    currentPage: page,
    data: productsCollection,
  };

  return data;
};

export default { getAll };
