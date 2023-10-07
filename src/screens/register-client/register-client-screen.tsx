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

interface RegisterClientsProps {
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  clients: Client[];
}

export const RegisterClientScreen = ({ clients, setClients }:
  RegisterClientsProps): ReactElement => {
    const [showForm, setShowForm] = useState(false);
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
