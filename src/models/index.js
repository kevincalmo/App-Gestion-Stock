// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ProductSizeQuantity, Size, CategoriesProduct, Product, Agent, User, Stock, UserStock } = initSchema(schema);

export {
  ProductSizeQuantity,
  Size,
  CategoriesProduct,
  Product,
  Agent,
  User,
  Stock,
  UserStock
};