import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import {
  Client,
  RegisterClientForm,
} from "../components/forms/register-client-form";
import { ClientsTable } from "../components/tables/clients-table";

export const INITIAL_CLIENT_STATE = {
  document: "",
  name: "",
  neighborhood: "",
  address: "",
  city: "",
  uf: "SP",
  number: "",
  zipCode: "",
};

export const RegisterClientScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] =
    useState<Client>(INITIAL_CLIENT_STATE);
  const [editMode, setEditMode] = useState(false);

  return (
    <Page>
      {showForm ? (
        <RegisterClientForm
          setShowForm={setShowForm}
          setClients={setClients}
          clients={clients}
          setSelectedClient={setSelectedClient}
          setEditMode={setEditMode}
          selectedClient={selectedClient}
          editMode={editMode}
        />
      ) : (
        <ClientsTable
          setShowForm={setShowForm}
          clients={clients}
          setClients={setClients}
          setSelectedClient={setSelectedClient}
          setEditMode={setEditMode}
        />
      )}
    </Page>
  );
};
