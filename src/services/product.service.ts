import { IProduct, Product } from '../models/product.model';

type Params = {
  page: number;
  perPage: number;
  sortBy: string;
};

const allProducts = async () => {
  const getAllProducts = await Product.find()
    .populate('category')
    .populate('description');

  return getAllProducts;
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

function getRandom(products: IProduct[], limit: number) {
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
}

export default {
  allProducts,
  getAll,
  getOne,
  getFiltered,
  getRandom,
};
