// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Supplier, ProductSizeQuantity, Size, CategoriesProduct, Product, Agent, User, Stock, UserStock } = initSchema(schema);

export {
  Supplier, feat/stocks-and-products
  ProductSizeQuantity,
  Size,
  CategoriesProduct,
  Product,
  Agent,
  User,
  Stock,
  UserStock
};