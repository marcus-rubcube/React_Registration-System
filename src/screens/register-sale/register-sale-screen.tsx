import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterSaleForm } from "../components/forms/register-sale-form";
import { SaleTable } from "../components/tables/sale-table";

export const RegisterSaleScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterSaleForm setShowForm={setShowForm} />
      ) : (
        <SaleTable setShowForm={setShowForm} />
      )}
    </Page>
  );
};
