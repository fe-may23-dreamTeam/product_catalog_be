import { Product } from '../models/product.model';

type Params = {
  page: number;
  perPage: number;
  sortBy: string;
};

const getAll = async ({ page, perPage, sortBy }: Params) => {
  const offset = perPage * (page - 1);
  const order = sortBy === 'Newest' ? 'desc' : 'asc';

  const productsCollection = await Product.find()
    .populate('category')
    .populate('description')
    .sort({
      updatedAt: order,
    })
    .skip(offset)
    .limit(perPage);
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

const getFiltered = async (query: string) => {
  const products = await Product.find({
    name: { $regex: query, $options: 'i' },
  }).populate('category').populate('description');

  return products;
};

export default { getAll, getOne, getFiltered };
