import { CategoryState } from "./categoryReducer";
import { ClientState } from "./clientReducer";
import { ProductState } from "./productReducer";
import { ProviderState } from "./providerReducer";

export type ReduxState = {
  clients: ClientState;
  providers: ProviderState;
  products: ProductState;
  categories: CategoryState;
};
