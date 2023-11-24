import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Product } from "../screens/register-products/register-products-screen";
import { INITIAL_CATEGORY_STATE } from "./categoryReducer";
import { INITIAL_PROVIDER_STATE } from "./providerReducer";

export interface ProductState {
  status: number;
  message: string;
  productList: Product[];
}

export const INITIAL_PRODUCTS_STATE: Product = {
  id: "",
  name: "",
  description: "",
  unitPrice: "",
  stockQuantity: 0,
  brand: "",
  category: INITIAL_CATEGORY_STATE,
  manufacturingDate: "",
  model: "",
  provider: INITIAL_PROVIDER_STATE,
};

const initialState: ProductState = {
  status: STATE.OCIOSO,
  message: "",
  productList: [],
};

export const buscarProducts = createAsyncThunk("product/get", async () => {
  try {
    const response = await fetch("http://localhost:3000/product", {
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
          "Ocorreu um erro ao recuperar os produtos da base de dados.",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      lista: [],
      message:
        "Ocorreu um erro ao recuperar os produtos da base de dados:" +
        error.message,
    };
  }
});

export const cadastrarProduto = createAsyncThunk(
  "product/post",
  async (product: Product) => {
    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          unitPrice: Number(product.unitPrice),
          stockQuantity: Number(product.stockQuantity),
          brand: product.brand,
          manufacturingDate: product.manufacturingDate.split("T")[0],
          categoryId: product.category.id.toString(),
          providerDocument: product.provider.document,
          model: product.model,
        }),
      });
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: "",
          produto: data.product as Product,
        };
      } else {
        return {
          status: false,
          message:
            "Ocorreu um erro ao cadastrar o produto na base de dados.",
          produto: product,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao cadastrar a produto na base de dados:" +
          error.message,
      };
    }
  }
);

export const atualizarProduto = createAsyncThunk(
  "produto/put",
  async (produto: Product) => {
    try {
      const response = await fetch(
        `http://localhost:3000/product/${produto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: produto.name,
            description: produto.description,
            unitPrice: Number(produto.unitPrice),
            stockQuantity: Number(produto.stockQuantity),
            brand: produto.brand,
            manufacturingDate: produto.manufacturingDate.split("T")[0],
            categoryId: produto.category.id.toString(),
            providerDocument: produto.provider.document,
            model: produto.model,
          }),
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          status: true,
          message: data.mensagem,
          produto: produto,
        };
      } else {
        return {
          status: false,
          message:
            "Ocorreu um erro ao atualizar o produto na base de dados.",
          produto: produto,
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao atualizar o produto na base de dados:" +
          error.message,
      };
    }
  }
);

export const removerProduto = createAsyncThunk(
  "produto/delete",
  async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/product/${id}`,
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
          id,
        };
      } else {
        return {
          status: false,
          message: "Ocorreu um erro ao remover o produto na base de dados.",
        };
      }
    } catch (error: any) {
      return {
        status: false,
        message:
          "Ocorreu um erro ao remover o produto na base de dados:" +
          error.message,
      };
    }
  }
);

export const setStatusIdle = createAction("category/setStatusIdle");

const productSlicer = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buscarProducts.pending, (state, action) => {
      state.status = STATE.PENDENTE;
    });
    builder.addCase(buscarProducts.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.productList = action.payload.lista;
        state.message = action.payload.message as string;
      }
    });
    builder.addCase(buscarProducts.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.productList = [];
      state.message = action.error.message as string;
    });
    builder.addCase(cadastrarProduto.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Adicionando categoria...";
    });
    builder.addCase(cadastrarProduto.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.productList.push(action.payload.produto as Product);
      }
    });
    builder.addCase(cadastrarProduto.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(atualizarProduto.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Atualizando produto...";
    });
    builder.addCase(atualizarProduto.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        const index = state.productList.findIndex(
          (produto) =>
            produto.id === action.payload.produto?.id
        );
        state.productList[index] = action.payload.produto as Product;
      }
    });
    builder.addCase(atualizarProduto.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(removerProduto.pending, (state, action) => {
      state.status = STATE.PENDENTE;
      state.message = "Removendo produto...";
    });
    builder.addCase(removerProduto.fulfilled, (state, action) => {
      if (!action.payload.status) {
        state.status = STATE.ERRO;
        state.message = action.payload.message as string;
      } else {
        state.status = STATE.OCIOSO;
        state.message = action.payload.message as string;
        state.productList = state.productList.filter(
          (product) => product.id !== action.payload.id
        );
      }
    });
    builder.addCase(removerProduto.rejected, (state, action) => {
      state.status = STATE.ERRO;
      state.message = action.error.message as string;
    });
    builder.addCase(setStatusIdle, (state) => {
      state.status = STATE.OCIOSO;
    });
  },
});

export default productSlicer.reducer;
