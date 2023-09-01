import { ReactElement, useState } from "react";
import { Page } from "../components/page/page";
import { RegisterProviderForm } from "./forms/register-provider-form";
import { ProvidersTable } from "./tables/provider-table";

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
