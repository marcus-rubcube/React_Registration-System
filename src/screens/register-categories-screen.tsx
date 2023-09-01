import { ReactElement, useState } from "react";
import { Page } from "../components/page/page";
import { RegisterCategoriesForm } from "./forms/register-categories-form";
import { CategoriesTable } from "./tables/categories-table";

export const RegisterCategoriesScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterCategoriesForm setShowForm={setShowForm} />
      ) : (
        <CategoriesTable setShowForm={setShowForm} />
      )}
    </Page>
  );
};
