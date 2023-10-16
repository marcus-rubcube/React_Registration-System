import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Product } from "../screens/register-products/register-products-screen";

export interface ProductState {
  status: number;
  message: string;
  productList: Product[];
}

export const INITIAL_PRODUCTS_STATE: Product = {
  name: "",
  description: "",
  unitPrice: "",
  stockQuantity: 0,
  brand: "",
  category: "",
  manufacturingDate: "",
  model: "",
  provider: "",
};

const initialState: ProductState = {
  status: STATE.OCIOSO,
  message: "",
  productList: [],
};

const productSlicer = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state: ProductState, action: PayloadAction<Product>) => {
      state.productList.push(action.payload);
    },
    removeProduct: (state: ProductState, action: PayloadAction<Product>) => {
      state.productList = state.productList.filter(
        (product) => product.name !== action.payload.name
      );
    },
    updateProduct: (state: ProductState, action: PayloadAction<Product>) => {
      const tempProductList = state.productList.filter(
        (provider) => provider.name !== action.payload.name
      );
      state.productList = [...tempProductList, action.payload];
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = productSlicer.actions;
export default productSlicer.reducer;
