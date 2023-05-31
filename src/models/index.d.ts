import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerRemiseEpiItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RemiseEpiItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly description?: string | null;
  readonly sizeID: string;
  readonly productID: string;
  readonly remisesepiID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRemiseEpiItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RemiseEpiItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly description?: string | null;
  readonly sizeID: string;
  readonly productID: string;
  readonly remisesepiID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RemiseEpiItem = LazyLoading extends LazyLoadingDisabled ? EagerRemiseEpiItem : LazyRemiseEpiItem

export declare const RemiseEpiItem: (new (init: ModelInit<RemiseEpiItem>) => RemiseEpiItem) & {
  copyOf(source: RemiseEpiItem, mutator: (draft: MutableModel<RemiseEpiItem>) => MutableModel<RemiseEpiItem> | void): RemiseEpiItem;
}

type EagerRemisesEpi = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RemisesEpi, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly agentID: string;
  readonly stockID: string;
  readonly RemiseEpiItems?: (RemiseEpiItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRemisesEpi = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RemisesEpi, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly agentID: string;
  readonly stockID: string;
  readonly RemiseEpiItems: AsyncCollection<RemiseEpiItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RemisesEpi = LazyLoading extends LazyLoadingDisabled ? EagerRemisesEpi : LazyRemisesEpi

export declare const RemisesEpi: (new (init: ModelInit<RemisesEpi>) => RemisesEpi) & {
  copyOf(source: RemisesEpi, mutator: (draft: MutableModel<RemisesEpi>) => MutableModel<RemisesEpi> | void): RemisesEpi;
}

type EagerSupplier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Supplier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySupplier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Supplier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Supplier = LazyLoading extends LazyLoadingDisabled ? EagerSupplier : LazySupplier

export declare const Supplier: (new (init: ModelInit<Supplier>) => Supplier) & {
  copyOf(source: Supplier, mutator: (draft: MutableModel<Supplier>) => MutableModel<Supplier> | void): Supplier;
}

type EagerProductSizeQuantity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductSizeQuantity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sizeID: string;
  readonly productID: string;
  readonly quantity: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProductSizeQuantity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductSizeQuantity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sizeID: string;
  readonly productID: string;
  readonly quantity: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductSizeQuantity = LazyLoading extends LazyLoadingDisabled ? EagerProductSizeQuantity : LazyProductSizeQuantity

export declare const ProductSizeQuantity: (new (init: ModelInit<ProductSizeQuantity>) => ProductSizeQuantity) & {
  copyOf(source: ProductSizeQuantity, mutator: (draft: MutableModel<ProductSizeQuantity>) => MutableModel<ProductSizeQuantity> | void): ProductSizeQuantity;
}

type EagerSize = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Size, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: string;
  readonly categoriesproductID: string;
  readonly ProductSizeQuantities?: (ProductSizeQuantity | null)[] | null;
  readonly RemiseEpiItems?: (RemiseEpiItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySize = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Size, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: string;
  readonly categoriesproductID: string;
  readonly ProductSizeQuantities: AsyncCollection<ProductSizeQuantity>;
  readonly RemiseEpiItems: AsyncCollection<RemiseEpiItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Size = LazyLoading extends LazyLoadingDisabled ? EagerSize : LazySize

export declare const Size: (new (init: ModelInit<Size>) => Size) & {
  copyOf(source: Size, mutator: (draft: MutableModel<Size>) => MutableModel<Size> | void): Size;
}

type EagerCategoriesProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoriesProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly Sizes?: (Size | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoriesProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoriesProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly Sizes: AsyncCollection<Size>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CategoriesProduct = LazyLoading extends LazyLoadingDisabled ? EagerCategoriesProduct : LazyCategoriesProduct

export declare const CategoriesProduct: (new (init: ModelInit<CategoriesProduct>) => CategoriesProduct) & {
  copyOf(source: CategoriesProduct, mutator: (draft: MutableModel<CategoriesProduct>) => MutableModel<CategoriesProduct> | void): CategoriesProduct;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: string;
  readonly stockID: string;
  readonly categoriesproductID: string;
  readonly ProductSizeQuantities?: (ProductSizeQuantity | null)[] | null;
  readonly picture?: string | null;
  readonly RemiseEpiItems?: (RemiseEpiItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: string;
  readonly stockID: string;
  readonly categoriesproductID: string;
  readonly ProductSizeQuantities: AsyncCollection<ProductSizeQuantity>;
  readonly picture?: string | null;
  readonly RemiseEpiItems: AsyncCollection<RemiseEpiItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

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
  readonly RemisesEPIS?: (RemisesEpi | null)[] | null;
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
  readonly RemisesEPIS: AsyncCollection<RemisesEpi>;
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
  readonly Agents?: (RemisesEpi | null)[] | null;
  readonly Products?: (RemisesEpi | null)[] | null;
  readonly RemisesEPIS?: (RemisesEpi | null)[] | null;
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
  readonly Agents: AsyncCollection<RemisesEpi>;
  readonly Products: AsyncCollection<RemisesEpi>;
  readonly RemisesEPIS: AsyncCollection<RemisesEpi>;
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