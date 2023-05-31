// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RemiseEpiItem, RemisesEpi, Supplier, ProductSizeQuantity, Size, CategoriesProduct, Product, Agent, User, Stock, UserStock } = initSchema(schema);

export {
  RemiseEpiItem,
  RemisesEpi,
  Supplier,
  ProductSizeQuantity,
  Size,
  CategoriesProduct,
  Product,
  Agent,
  User,
  Stock,
  UserStock
};