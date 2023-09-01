import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { PurchaseTable } from "../components/tables/purchase-table";
import { RegisterPurchaseForm } from "../components/forms/register-purchase-form";

export const RegisterPurchaseScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterPurchaseForm setShowForm={setShowForm} />
      ) : (
        <PurchaseTable setShowForm={setShowForm} />
      )}
    </Page>
  );
};
