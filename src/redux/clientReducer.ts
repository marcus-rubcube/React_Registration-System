import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Client } from "../screens/components/forms/register-client-form";

export interface ClientState {
  status: number;
  message: string;
  clientsList: Client[];
}

export const INITIAL_CLIENT_STATE = {
  id: 0,
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

export const buscarClientes = createAsyncThunk("client/get", async () => {
  try {
    const response = await fetch("http://localhost:4000/client", {
      method: "GET",
    });
    const data = await response.json();
    if (data.status) {
      console.log(data.lista)
      return {
        status: true,
        lista: data.lista,
        message: "",
      };
    } else {
      return {
        status: false,
        lista: [],
        message: "Ocorreu um erro ao recuperar as clientes da base de dados.",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      lista: [],
      message:
        "Ocorreu um erro ao recuperar as clientes da base de dados:" +
        error.message,
    };
  }
});

export const cadastrarCliente = createAsyncThunk(
  "client/post",
  async (client: Client) => {
    try {
      const response = await fetch("http://localhost:4000/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...client,
        document: client.document.replace(/\D/g, ""),
        zipCode: client.zipCode.replace(/\D/g, ""),
        }),
      });
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          client: data.cliente as Client,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao cadastrar a cliente na base de dados.",
          client,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao cadastrar a cliente na base de dados:" +
          error.message,
      };
    }
  }
);

export const atualizarCliente = createAsyncThunk(
  "client/put",
  async (client: Client) => {
    try {
      const response = await fetch(
        `http://localhost:4000/client/${client.document}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(client),
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          client,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao atualizar a cliente na base de dados.",
          client,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao atualizar a cliente na base de dados:" +
          error.message,
      };
    }
  }
);

export const removerCliente = createAsyncThunk(
  "client/delete",
  async (document: string) => {
    try {
      const response = await fetch(`http://localhost:4000/client/${document}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          document: document,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao remover a cliente na base de dados.",
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao remover a cliente na base de dados:" +
          error.message,
      };
    }
  }
);

export const setStatusIdle = createAction("client/setStatusIdle");

const clientsSlicer = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buscarClientes.pending, (state, action) => {
      state.status = STATE.PENDENTE;
    });
    builder.addCase(buscarClientes.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.clientsList = action.payload.lista;
        state.message = action.payload.message as string;
      }
    });
    builder.addCase(buscarClientes.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.clientsList = [];
      state.message = action.error.message as string;
    });
    builder.addCase(cadastrarCliente.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Adicionando cliente...";
    });
    builder.addCase(cadastrarCliente.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.clientsList.push(action.payload.client as Client);
      }
    });
    builder.addCase(cadastrarCliente.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(atualizarCliente.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Atualizando cliente...";
    });
    builder.addCase(atualizarCliente.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        const index = state.clientsList.findIndex(
          (client) => client.document === action.payload.client?.document
        );
        state.clientsList[index] = action.payload.client as Client;
      }
    });
    builder.addCase(atualizarCliente.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(removerCliente.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Removendo cliente...";
    });
    builder.addCase(removerCliente.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.clientsList = state.clientsList.filter(
          (client) => client.document !== action.payload.document
        );
      }
    });
    builder.addCase(removerCliente.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(setStatusIdle, (state) => {
      state.status = STATE.OCIOSO;
    });
  },
});

export default clientsSlicer.reducer;
