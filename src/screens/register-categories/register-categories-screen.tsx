import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import {
  Category,
  RegisterCategoriesForm,
} from "../components/forms/register-categories-form";
import { CategoriesTable } from "../components/tables/categories-table";
import React from "react";
import { INITIAL_CATEGORY_STATE } from "../../redux/categoryReducer";

interface StateCategorieProps {
  categories: Category[];
}

export const RegisterCategoriesScreen = ({
  categories,
}: StateCategorieProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<Category>(
    INITIAL_CATEGORY_STATE
  );
  const [editMode, setEditMode] = useState(false);

  return (
    <Page>
      {showForm ? (
        <RegisterCategoriesForm
          setShowForm={setShowForm}
          selectedCategorie={selectedCategorie}
          setSelectedCategorie={setSelectedCategorie}
          editMode={editMode}
          setEditMode={setEditMode}
          categories={categories}
        />
      ) : (
        <CategoriesTable
          setShowForm={setShowForm}
          selectedCategorie={selectedCategorie}
          setSelectedCategorie={setSelectedCategorie}
          editMode={editMode}
          setEditMode={setEditMode}
          categories={categories}
        />
      )}
    </Page>
  );
};
