import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Sale } from "../screens/components/forms/register-sale-form";

export interface SaleState {
  status: number;
  message: string;
  salesList: Sale[];
}

const initialState: SaleState = {
  status: STATE.OCIOSO,
  message: "",
  salesList: [],
};

export const buscarVendas = createAsyncThunk("sale/get", async () => {
  try {
    const response = await fetch("http://localhost:4000/sale", {
      method: "GET",
    });
    const data = await response.json();
    if (data.status) {
      return {
        status: true,
        lista: data.lista,
        message: "",
      };
    } else {
      return {
        status: false,
        message:
          "Ocorreu um erro ao recuperar os vendaes da base de dados.",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      lista: [],
      message:
        "Ocorreu um erro ao recuperar os vendaes da base de dados:" +
        error.message,
    };
  }
});


export const cadastrarVenda = createAsyncThunk(
  "sale/post",
  async (sale: Sale) => {
    try {
      const response = await fetch("http://localhost:4000/sale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: sale.client.id,
          paymentMethod: sale.paymentMethod,
          quantity: sale.quantity,
          value: sale.value,
          code: sale.code,
        }),
      });
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          venda: data.sale as Sale,
        };
      } else {
        return {
          status: false,
          message:
            "Ocorreu um erro ao cadastrar o venda na base de dados.",
          venda: sale,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao cadastrar a venda na base de dados:" +
          error.message,
      };
    }
  }
);

export const atualizarVenda = createAsyncThunk(
  "venda/put",
  async (venda: Sale) => {
    try {
      const response = await fetch(
        `http://localhost:4000/sale/${venda.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId: venda.client.id,
            paymentMethod: venda.paymentMethod,
            quantity: venda.quantity,
            value: venda.value,
            code: venda.code,
          }),
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          venda: venda,
        };
      } else {
        console.log("erro");
        return {
          status: false,
          message:
            "Ocorreu um erro ao atualizar o venda na base de dados.",
          venda: venda,
        };
      }
    } catch (error: any) {
      console.log("erro geral");
      return {
        status: false,
        message:
          "Ocorreu um erro ao atualizar o venda na base de dados:" +
          error.message,
      };
    }
  }
);

export const removerVenda = createAsyncThunk(
  "venda/delete",
  async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:4000/sale/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          id
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao remover o venda na base de dados.",
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao remover o venda na base de dados:" +
          error.message,
      };
    }
  }
);

export const setStatusIdle = createAction("sale/setStatusIdle");

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buscarVendas.pending, (state, action) => {
      state.status = STATE.PENDENTE;
    });
    builder.addCase(buscarVendas.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.salesList = action.payload.lista;
        state.message = action.payload.message as string;
      }
    });
    builder.addCase(buscarVendas.rejected, (state, action) => {
      console.log(action.error);
      state.status = STATE.ERRO;
      state.salesList = [];
      state.message = action.error.message as string;
    });
    builder.addCase(cadastrarVenda.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Adicionando categoria...";
    });
    builder.addCase(cadastrarVenda.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.salesList.push(action.payload.venda as Sale);
      }
    });
    builder.addCase(cadastrarVenda.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(atualizarVenda.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Atualizando venda...";
    });
    builder.addCase(atualizarVenda.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        const index = state.salesList.findIndex(
          (venda) =>
            venda.id === action.payload.venda?.id
        );
        state.salesList[index] = action.payload.venda as Sale;
      }
    });
    builder.addCase(atualizarVenda.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(removerVenda.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Removendo venda...";
    });
    builder.addCase(removerVenda.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.salesList = state.salesList.filter(
          (Sale) => Sale.id !== action.payload.id
        );
      }
    });
    builder.addCase(removerVenda.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(setStatusIdle, (state) => {
      state.status = STATE.OCIOSO;
    });
  },
});

export default saleSlice.reducer;
