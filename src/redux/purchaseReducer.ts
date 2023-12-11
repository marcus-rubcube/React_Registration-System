import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Purchase } from "../screens/components/forms/register-purchase-form";

export interface PurchaseState {
  status: number;
  message: string;
  purchasesList: Purchase[];
}

const initialState: PurchaseState = {
  status: STATE.OCIOSO,
  message: "",
  purchasesList: [] as Purchase[],
};

export const buscarCompras = createAsyncThunk("purchase/get", async () => {
  try {
    const response = await fetch("http://localhost:4000/purchase", {
      method: "GET",
    });
    const data = await response.json();
    if (data.status) {
      return {
        status: true,
        lista: data.data,
        message: "",
      };
    } else {
      return {
        status: false,
        lista: [],
        message:
          "Ocorreu um erro ao recuperar os compraes da base de dados.",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      lista: [],
      message:
        "Ocorreu um erro ao recuperar os compraes da base de dados.",
    };
  }
})

export const cadastrarCompra = createAsyncThunk("purchase/post", 
  async (purchase: Purchase) => {
  try {
    const response = await fetch("http://localhost:4000/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerId: purchase.provider.id,
        paymentMethod: purchase.paymentMethod,
        quantity: purchase.quantity,
        value: purchase.value,
        purchaseCode: purchase.purchaseCode,
      }),
    });
    const data = await response.json();
    if (data.status) {
      return {
        status: true,
        message: "",
        compra: data.purchase as Purchase,
      };
    } else {
      return {
        status: false,
        message: "Ocorreu um erro ao cadastrar a compra.",
        compra: purchase,
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: "Ocorreu um erro ao cadastrar a compra:" + error.message,
      compra: purchase,
    };
  }
});

export const atualizarCompra = createAsyncThunk("purchase/put", async (purchase: Purchase) => {
  try {
    const response = await fetch(`http://localhost:4000/purchase/${purchase.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerId: purchase.provider.id,
        paymentMethod: purchase.paymentMethod,
        quantity: purchase.quantity,
        value: purchase.value,
        purchaseCode: purchase.purchaseCode,
      }),
    });
    const data = await response.json();
    if (data.status) {
      return {
        status: true,
        message: "",
        compra: data.purchase as Purchase,
      };
    } else {
      return {
        status: false,
        message: "Ocorreu um erro ao atualizar a compra.",
        compra: purchase,
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: "Ocorreu um erro ao atualizar a compra:" + error.message,
      compra: purchase,
    };
  }
});

export const removerCompra = createAsyncThunk("purchase/delete", async (id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/purchase/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.status) {
      return {
        status: true,
        message: "",
        id: id,
      };
    } else {
      return {
        status: false,
        message: "Ocorreu um erro ao remover a compra.",
        id: id,
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: "Ocorreu um erro ao remover a compra:" + error.message,
      id: id,
    };
  }
});

export const setStatusIdle = createAction("purchase/setStatusIdle");

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buscarCompras.pending, (state, action) => {
      state.status = STATE.PENDENTE;
    });
    builder.addCase(buscarCompras.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.purchasesList = action.payload.lista;
        state.message = action.payload.message as string;
      }
    });
    builder.addCase(buscarCompras.rejected, (state, action) => {
      console.log(action.error);
      state.status = STATE.ERRO;
      state.purchasesList = [];
      state.message = action.error.message as string;
    });
    builder.addCase(cadastrarCompra.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Adicionando categoria...";
    });
    builder.addCase(cadastrarCompra.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.purchasesList.push(action.payload.compra as Purchase);
      }
    });
    builder.addCase(cadastrarCompra.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(atualizarCompra.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Atualizando venda...";
    });
    builder.addCase(atualizarCompra.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        const index = state.purchasesList.findIndex(
          (venda) =>
            venda.id === action.payload.compra?.id
        );
        state.purchasesList[index] = action.payload.compra as Purchase;
      }
    });
    builder.addCase(atualizarCompra.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(removerCompra.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Removendo venda...";
    });
    builder.addCase(removerCompra.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.purchasesList = state.purchasesList.filter(
          (Sale) => Sale.id !== action.payload.id
        );
      }
    });
    builder.addCase(removerCompra.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(setStatusIdle, (state) => {
      state.status = STATE.OCIOSO;
    });
  },


})
export default purchaseSlice.reducer;
