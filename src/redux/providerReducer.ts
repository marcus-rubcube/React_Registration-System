import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Provider } from "../screens/components/forms/register-provider-form";

export interface ProviderState {
  status: number;
  message: string;
  providerList: Provider[];
}

export const INITIAL_PROVIDER_STATE = {
  id: 0,
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

export const buscarProviders = createAsyncThunk("provider/get", async () => {
  try {
    const response = await fetch("http://localhost:4000/provider", {
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
        lista: [],
        message:
          "Ocorreu um erro ao recuperar os fornecedores da base de dados.",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      lista: [],
      message:
        "Ocorreu um erro ao recuperar os fornecedores da base de dados:" +
        error.message,
    };
  }
});

export const cadastrarFornecedor = createAsyncThunk(
  "provider/post",
  async (provider: Provider) => {
    try {
      const response = await fetch("http://localhost:4000/provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(provider),
      });
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          fornecedor: data.provider as Provider,
        };
      } else {
        return {
          status: false,
          message:
            "Ocorreu um erro ao cadastrar o fornecedor na base de dados.",
          fornecedor: provider,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao cadastrar a fornecedor na base de dados:" +
          error.message,
      };
    }
  }
);

export const atualizarFornecedor = createAsyncThunk(
  "fornecedor/put",
  async (fornecedor: Provider) => {
    try {
      const response = await fetch(
        `http://localhost:4000/provider/${fornecedor.document}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fornecedor),
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          fornecedor: fornecedor,
        };
      } else {
        console.log("erro");
        return {
          status: false,
          message:
            "Ocorreu um erro ao atualizar o fornecedor na base de dados.",
          fornecedor: fornecedor,
        };
      }
    } catch (error: any) {
      console.log("erro geral");
      return {
        status: false,
        message:
          "Ocorreu um erro ao atualizar o fornecedor na base de dados:" +
          error.message,
      };
    }
  }
);

export const removerFornecedor = createAsyncThunk(
  "fornecedor/delete",
  async (document: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/provider/${document}`,
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
          document,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao remover o fornecedor na base de dados.",
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao remover o fornecedor na base de dados:" +
          error.message,
      };
    }
  }
);

export const setStatusIdle = createAction("category/setStatusIdle");

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buscarProviders.pending, (state, action) => {
      state.status = STATE.PENDENTE;
    });
    builder.addCase(buscarProviders.fulfilled, (state, action) => {
      if (!action.payload.status) {
        console.log("09");
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.providerList = action.payload.lista;
        state.message = action.payload.message as string;
      }
    });
    builder.addCase(buscarProviders.rejected, (state, action) => {
      console.log(action.error);
      state.status = STATE.ERRO;
      state.providerList = [];
      state.message = action.error.message as string;
    });
    builder.addCase(cadastrarFornecedor.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Adicionando categoria...";
    });
    builder.addCase(cadastrarFornecedor.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.providerList.push(action.payload.fornecedor as Provider);
      }
    });
    builder.addCase(cadastrarFornecedor.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(atualizarFornecedor.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Atualizando fornecedor...";
    });
    builder.addCase(atualizarFornecedor.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        const index = state.providerList.findIndex(
          (fornecedor) =>
            fornecedor.document === action.payload.fornecedor?.document
        );
        state.providerList[index] = action.payload.fornecedor as Provider;
      }
    });
    builder.addCase(atualizarFornecedor.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(removerFornecedor.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Removendo fornecedor...";
    });
    builder.addCase(removerFornecedor.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.providerList = state.providerList.filter(
          (provider) => provider.document !== action.payload.document
        );
      }
    });
    builder.addCase(removerFornecedor.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(setStatusIdle, (state) => {
      state.status = STATE.OCIOSO;
    });
  },
});

export default providerSlice.reducer;
