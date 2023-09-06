import { Product } from '../models/product.model';

type Params = {
  page: number;
  perPage: number;
  sortBy: string;
};

const allProducts = () => {
  return Product.find().populate('category').populate('description');
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
  })
    .populate('category')
    .populate('description');

  return products;
};

const getRandom = async (limit: number) => {
  const products = await allProducts();
  const randomProducts = [];
  const indexes: number[] = [];
  let i = 0;

  while (i < limit) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (indexes.includes(randomIndex)) {
      continue;
    } else {
      indexes.push(randomIndex);
      i++;
      randomProducts.push(products[randomIndex]);
    }
  }

  return randomProducts;
};

const getNew = async () => {
  const products = await allProducts().sort({ createdAt: 'desc' }).limit(8);

  return products;
};

export default {
  getNew,
  getAll,
  getOne,
  getFiltered,
  getRandom,
};
