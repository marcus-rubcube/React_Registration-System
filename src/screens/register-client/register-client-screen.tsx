import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import {
  Client,
  RegisterClientForm,
} from "../components/forms/register-client-form";
import { ClientsTable } from "../components/tables/clients-table";
import { INITIAL_CLIENT_STATE } from "../../redux/clientReducer";

export const RegisterClientScreen = (): ReactElement => {
    const [showForm, setShowForm] = useState(false);
    const [selectedClient, setSelectedClient] =
      useState<Client>(INITIAL_CLIENT_STATE);
    const [editMode, setEditMode] = useState(false);

    return (
      <Page>
        {showForm ? (
          <RegisterClientForm
            setShowForm={setShowForm}
            setSelectedClient={setSelectedClient}
            setEditMode={setEditMode}
            selectedClient={selectedClient}
            editMode={editMode}
          />
        ) : (
          <ClientsTable
            setShowForm={setShowForm}
            setSelectedClient={setSelectedClient}
            setEditMode={setEditMode}
          />
        )}
      </Page>
    );
  };
