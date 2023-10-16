import { CategoryState } from "./categoryReducer";
import { ClientState } from "./clientReducer";
import { ProductState } from "./productReducer";
import { ProviderState } from "./providerReducer";
import { PurchaseState } from "./purchaseReducer";
import { SaleState } from "./saleReducer";

export type ReduxState = {
  clients: ClientState;
  providers: ProviderState;
  products: ProductState;
  categories: CategoryState;
  purchases: PurchaseState;
  sales: SaleState;
};
