import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterProviderForm } from "../components/forms/register-provider-form";
import { ProvidersTable } from "../components/tables/provider-table";

export const RegisterProviderScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterProviderForm setShowForm={setShowForm} />
      ) : (
        <ProvidersTable setShowForm={setShowForm} />
      )}
    </Page>
  );
};
