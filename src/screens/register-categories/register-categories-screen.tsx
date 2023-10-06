import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { Categorie, RegisterCategoriesForm } from "../components/forms/register-categories-form";
import { CategoriesTable } from "../components/tables/categories-table";
import React from "react";

export const INITIAL_CATEGORIE_STATE = {
  name:"",
  description: ""
}

interface StateCategorieProps  {
  setCategories: React.Dispatch<React.SetStateAction<Categorie[]>>;
  categories: Categorie[];
}

export const RegisterCategoriesScreen = ({setCategories, categories}:StateCategorieProps): ReactElement => {

  const [showForm, setShowForm] = useState(false);
  const [selectedCategorie,setSelectedCategorie] = useState<Categorie>(INITIAL_CATEGORIE_STATE);
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
        setCategories={setCategories}
         />
      ) : (
        <CategoriesTable 
        setShowForm={setShowForm}
        selectedCategorie={selectedCategorie}
        setSelectedCategorie={setSelectedCategorie}
        editMode={editMode}
        setEditMode={setEditMode}
        categories={categories}
        setCategories={setCategories}
         />
      )}
    </Page>
  );
};
