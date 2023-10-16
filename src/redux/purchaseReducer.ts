import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Purchase } from "../screens/components/forms/register-purchase-form";

export interface PurchaseState {
  status: number;
  message: string;
  purchasesList: Purchase[];
}

export const INITIAL_PURCHASE_STATE: Purchase = {
  paymentMethod: "",
  provider: "",
  quantity: null,
  value: null,
  purchaseCode: "",
};

const initialState: PurchaseState = {
  status: STATE.OCIOSO,
  message: "",
  purchasesList: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addPurchases: (state: PurchaseState, action: PayloadAction<Purchase>) => {
      state.purchasesList.push(action.payload);
    },
    removePurchase: (state: PurchaseState, action: PayloadAction<Purchase>) => {
      state.purchasesList = state.purchasesList.filter(
        (provider) => provider.purchaseCode !== action.payload.purchaseCode
      );
    },
    updatePurchase: (state: PurchaseState, action: PayloadAction<Purchase>) => {
      const tempPurchasesList = state.purchasesList.filter(
        (purchase) => purchase.purchaseCode !== action.payload.purchaseCode
      );
      state.purchasesList = [...tempPurchasesList, action.payload];
    },
  },
});

export const { addPurchases, removePurchase, updatePurchase } =
purchaseSlice.actions;
export default purchaseSlice.reducer;
