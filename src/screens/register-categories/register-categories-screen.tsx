import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterCategoriesForm } from "../components/forms/register-categories-form";
import { CategoriesTable } from "../components/tables/categories-table";

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
