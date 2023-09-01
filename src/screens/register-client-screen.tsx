import { ReactElement, useState } from "react";
import { Page } from "../components/page/page";
import { RegisterClientForm } from "./forms/register-client-form";
import { ClientsTable } from "./tables/clients-table";

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
