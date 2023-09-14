import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { Client, RegisterClientForm } from "../components/forms/register-client-form";
import { ClientsTable } from "../components/tables/clients-table";

export const RegisterClientScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  return (
    <Page>
      {showForm ? (
        <RegisterClientForm setShowForm={setShowForm} setClients={setClients} clients={clients}/>
      ) : (
        <ClientsTable setShowForm={setShowForm} clients={clients}/>
      )}
    </Page>
  );
};
