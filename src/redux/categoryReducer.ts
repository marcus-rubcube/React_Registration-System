import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import STATE from "../resources/state";
import { Category } from "../screens/components/forms/register-categories-form";

export interface CategoryState {
  status: number;
  message: string;
  categoriesList: Category[];
}

export const INITIAL_CATEGORY_STATE = {
  name: "",
  description: "",
};

const initialState: CategoryState = {
  status: STATE.OCIOSO,
  message: "",
  categoriesList: [],
};

const categoriesSlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state: CategoryState, action: PayloadAction<Category>) => {
      state.categoriesList.push(action.payload);
    },
    removeCategory: (state: CategoryState, action: PayloadAction<Category>) => {
      state.categoriesList = state.categoriesList.filter(
        (category) => category.name !== action.payload.name
      );
    },
    updateCategory: (state: CategoryState, action: PayloadAction<Category>) => {
      const tempCategoriesList = state.categoriesList.filter(
        (category) => category.name !== action.payload.name
      );
      state.categoriesList = [...tempCategoriesList, action.payload];
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categoriesSlicer.actions;
export default categoriesSlicer.reducer;
