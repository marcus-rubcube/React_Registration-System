import { ReactElement, useState } from "react";
import { Page } from "../components/page/page";
import { RegisterProductForm } from "./forms/register-products-form";
import { ProductsTable } from "./tables/pruducts-table";

export const RegisterProductsScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterProductForm setShowForm={setShowForm} />
      ) : (
        <ProductsTable setShowForm={setShowForm} />
      )}
    </Page>
  );
};
