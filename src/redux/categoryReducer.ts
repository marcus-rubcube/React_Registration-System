import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Category } from "../screens/components/forms/register-categories-form";

export interface CategoryState {
  status: number;
  message: string;
  categoriesList: Category[];
}

export const INITIAL_CATEGORY_STATE = {
  id: "",
  name: "",
  description: "",
};

const initialState: CategoryState = {
  status: STATE.OCIOSO,
  message: "",
  categoriesList: [],
};

export const buscarCategorias = createAsyncThunk("category/get", async () => {
  try {
    const response = await fetch("http://localhost:3000/category", {
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
        message: "Ocorreu um erro ao recuperar as categorias da base de dados.",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      lista: [],
      message:
        "Ocorreu um erro ao recuperar as categorias da base de dados:" +
        error.message,
    };
  }
});

export const cadastrarCategoria = createAsyncThunk(
  "category/post",
  async (category: Category) => {
    try {
      const response = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          category: data.categoria as Category,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao cadastrar a categoria na base de dados.",
          category,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao cadastrar a categoria na base de dados:" +
          error.message,
      };
    }
  }
);

export const atualizarCategoria = createAsyncThunk(
  "category/put",
  async (category: Category) => {
    try {
      const response = await fetch(
        `http://localhost:3000/category/${category.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          category,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao atualizar a categoria na base de dados.",
          category,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao atualizar a categoria na base de dados:" +
          error.message,
      };
    }
  }
);

export const removerCategoria = createAsyncThunk(
  "category/delete",
  async (categoryID: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/category/${categoryID}`,
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
          categoryID,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao remover a categoria na base de dados.",
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao remover a categoria na base de dados:" +
          error.message,
      };
    }
  }
);

export const setStatusIdle = createAction("category/setStatusIdle");

const categoriesSlicer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buscarCategorias.pending, (state, action) => {
      state.status = STATE.PENDENTE;
    });
    builder.addCase(buscarCategorias.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.categoriesList = action.payload.lista;
        state.message = action.payload.message as string;
      }
    });
    builder.addCase(buscarCategorias.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.categoriesList = [];
      state.message = action.error.message as string;
    });
    builder.addCase(cadastrarCategoria.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Adicionando categoria...";
    });
    builder.addCase(cadastrarCategoria.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.categoriesList.push(action.payload.category as Category);
      }
    });
    builder.addCase(cadastrarCategoria.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(atualizarCategoria.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Atualizando categoria...";
    });
    builder.addCase(atualizarCategoria.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        const index = state.categoriesList.findIndex(
          (category) => category.id === action.payload.category?.id
        );
        state.categoriesList[index] = action.payload.category as Category;
      }
    });
    builder.addCase(atualizarCategoria.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(removerCategoria.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Removendo categoria...";
    });
    builder.addCase(removerCategoria.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.categoriesList = state.categoriesList.filter(
          (category) => category.id !== action.payload.categoryID
        );
      }
    });
    builder.addCase(removerCategoria.rejected, (state, action) => {
      console.log(action.error);
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(setStatusIdle, (state) => {
      state.status = STATE.OCIOSO;
    });
  },
});

export default categoriesSlicer.reducer;
