import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Client } from "../screens/components/forms/register-client-form";

export interface ClientState {
  status: number;
  message: string;
  clientsList: Client[];
}

export const INITIAL_CLIENT_STATE = {
  document: "",
  name: "",
  neighborhood: "",
  address: "",
  city: "",
  uf: "SP",
  number: "",
  zipCode: "",
};

const initialState: ClientState = {
  status: STATE.OCIOSO,
  message: "",
  clientsList: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    add: (state: ClientState, action: PayloadAction<Client>) => {
      state.clientsList.push(action.payload);
    },
    remove: (state: ClientState, action: PayloadAction<Client>) => {
      state.clientsList = state.clientsList.filter(
        (client) => client.document !== action.payload.document
      );
    },
    update: (state: ClientState, action: PayloadAction<Client>) => {
      const tempClientList = state.clientsList.filter(
        (client) => client.document !== action.payload.document
      );
      state.clientsList = [...tempClientList, action.payload];
    },
  },
});

export const { add, remove, update } = clientSlice.actions;
export default clientSlice.reducer;
