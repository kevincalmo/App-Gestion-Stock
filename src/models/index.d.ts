import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerAgent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Agent, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly last_name: string;
  readonly first_name: string;
  readonly telephon_number: string;
  readonly stockID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAgent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Agent, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly last_name: string;
  readonly first_name: string;
  readonly telephon_number: string;
  readonly stockID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Agent = LazyLoading extends LazyLoadingDisabled ? EagerAgent : LazyAgent

export declare const Agent: (new (init: ModelInit<Agent>) => Agent) & {
  copyOf(source: Agent, mutator: (draft: MutableModel<Agent>) => MutableModel<Agent> | void): Agent;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly sub: string;
  readonly Stocks?: (UserStock | null)[] | null;
  readonly activeStockID?: string | null;
  readonly username?: string | null;
  readonly gender?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly sub: string;
  readonly Stocks: AsyncCollection<UserStock>;
  readonly activeStockID?: string | null;
  readonly username?: string | null;
  readonly gender?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerStock = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Stock, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly users?: (UserStock | null)[] | null;
  readonly Agents?: (Agent | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStock = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Stock, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly users: AsyncCollection<UserStock>;
  readonly Agents: AsyncCollection<Agent>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Stock = LazyLoading extends LazyLoadingDisabled ? EagerStock : LazyStock

export declare const Stock: (new (init: ModelInit<Stock>) => Stock) & {
  copyOf(source: Stock, mutator: (draft: MutableModel<Stock>) => MutableModel<Stock> | void): Stock;
}

type EagerUserStock = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserStock, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly stockId?: string | null;
  readonly user: User;
  readonly stock: Stock;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserStock = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserStock, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly stockId?: string | null;
  readonly user: AsyncItem<User>;
  readonly stock: AsyncItem<Stock>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserStock = LazyLoading extends LazyLoadingDisabled ? EagerUserStock : LazyUserStock

export declare const UserStock: (new (init: ModelInit<UserStock>) => UserStock) & {
  copyOf(source: UserStock, mutator: (draft: MutableModel<UserStock>) => MutableModel<UserStock> | void): UserStock;
}