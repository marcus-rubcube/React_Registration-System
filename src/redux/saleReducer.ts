import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Sale } from "../screens/components/forms/register-sale-form";

export interface SaleState {
  status: number;
  message: string;
  salesList: Sale[];
}

export const INITIAL_SALE_STATE: Sale = {
  paymentMethod: "",
  client: "",
  quantity: null,
  value: null,
  saleCode: "",
};

const initialState: SaleState = {
  status: STATE.OCIOSO,
  message: "",
  salesList: [],
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    addSales: (state: SaleState, action: PayloadAction<Sale>) => {
      state.salesList.push(action.payload);
    },
    removeSale: (state: SaleState, action: PayloadAction<Sale>) => {
      state.salesList = state.salesList.filter(
        (sale) => sale.saleCode !== action.payload.saleCode
      );
    },
    updateSale: (state: SaleState, action: PayloadAction<Sale>) => {
      const tempSalesList = state.salesList.filter(
        (sale) => sale.saleCode !== action.payload.saleCode
      );
      state.salesList = [...tempSalesList, action.payload];
    },
  },
});

export const { addSales, removeSale, updateSale } = saleSlice.actions;
export default saleSlice.reducer;
