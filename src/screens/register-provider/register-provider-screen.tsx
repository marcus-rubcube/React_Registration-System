import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import {
  Provider,
  RegisterProviderForm,
} from "../components/forms/register-provider-form";
import { ProvidersTable } from "../components/tables/provider-table";
import { INITIAL_PROVIDER_STATE } from "../../redux/providerReducer";

interface RegisterProvidersProps {
  providers: Provider[];
}

export const RegisterProviderScreen = ({
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
          setSelectedProvider={setSelectedProvider}
          setEditMode={setEditMode}
          selectedProvider={selectedProvider}
          editMode={editMode}
        />
      ) : (
        <ProvidersTable
          setShowForm={setShowForm}
          providers={providers}
          setSelectedProvider={setSelectedProvider}
          setEditMode={setEditMode}
        />
      )}
    </Page>
  );
};
