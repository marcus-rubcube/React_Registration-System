import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import {
  Provider,
  RegisterProviderForm,
} from "../components/forms/register-provider-form";
import { ProvidersTable } from "../components/tables/provider-table";

export const INITIAL_PROVIDER_STATE = {
  name: "",
  phoneNumber: "",
  email: "",
  website: "",
  description: "",
  document: "",
};

interface RegisterProvidersProps {
  setProviders: React.Dispatch<React.SetStateAction<Provider[]>>;
  providers: Provider[];
}

export const RegisterProviderScreen = ({
  setProviders,
  providers,
}: RegisterProvidersProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider>(
    INITIAL_PROVIDER_STATE
  );
  const [editMode, setEditMode] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterProviderForm
          setShowForm={setShowForm}
          setProviders={setProviders}
          providers={providers}
          setSelectedProvider={setSelectedProvider}
          setEditMode={setEditMode}
          selectedProvider={selectedProvider}
          editMode={editMode}
        />
      ) : (
        <ProvidersTable
          setShowForm={setShowForm}
          providers={providers}
          setProviders={setProviders}
          setSelectedProvider={setSelectedProvider}
          setEditMode={setEditMode}
        />
      )}
    </Page>
  );
};
