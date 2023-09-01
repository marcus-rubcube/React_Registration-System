import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterClientForm } from "../components/forms/register-client-form";
import { ClientsTable } from "../components/tables/clients-table";

export const RegisterClientScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterClientForm setShowForm={setShowForm} />
      ) : (
        <ClientsTable setShowForm={setShowForm} />
      )}
    </Page>
  );
};
