// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Agent, User, Stock, UserStock } = initSchema(schema);

export {
  Agent,
  User,
  Stock,
  UserStock
};