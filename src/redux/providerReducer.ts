import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Provider } from "../screens/components/forms/register-provider-form";

export interface ProviderState {
  status: number;
  message: string;
  providerList: Provider[];
}

export const INITIAL_PROVIDER_STATE = {
  name: "",
  phoneNumber: "",
  email: "",
  website: "",
  description: "",
  document: "",
};

const initialState: ProviderState = {
  status: STATE.OCIOSO,
  message: "",
  providerList: [],
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    addProvider: (state: ProviderState, action: PayloadAction<Provider>) => {
      state.providerList.push(action.payload);
    },
    removeProvider: (state: ProviderState, action: PayloadAction<Provider>) => {
      state.providerList = state.providerList.filter(
        (provider) => provider.document !== action.payload.document
      );
    },
    updateProvider: (state: ProviderState, action: PayloadAction<Provider>) => {
      const tempProviderList = state.providerList.filter(
        (provider) => provider.document !== action.payload.document
      );
      state.providerList = [...tempProviderList, action.payload];
    },
  },
});

export const { addProvider, removeProvider, updateProvider } = providerSlice.actions;
export default providerSlice.reducer;
