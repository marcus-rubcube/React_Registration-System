import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Provider } from "../forms/register-provider-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { removeProvider } from "../../../redux/providerReducer";
import { useDispatch } from "react-redux";

interface ProvidersProps {
  setShowForm: (value: boolean) => void;
  providers: Provider[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProvider: React.Dispatch<React.SetStateAction<Provider>>;
}

export const ProvidersTable = ({
  providers,
  setEditMode,
  setSelectedProvider,
  setShowForm,
}: ProvidersProps) => {
  const dispatch = useDispatch();
  const renderTableRow = (provider: Provider) => {

    function deleteProvider() {
      if (window.confirm(`${tableTranslates.providers.wantToDelete}`)) {
        dispatch(removeProvider(provider));
      }
    }

    function updateProvider(provider: Provider) {
      setSelectedProvider(provider);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
         <td>{provider.document}</td>
          <td>{provider.name}</td>
          <td>{provider.phoneNumber}</td>
          <td>{provider.email}</td>
          <td>{provider.website}</td>
          <td>{provider.description}</td>
          <td>
            <ActionsButton
              deleteItem={() => deleteProvider()}
              update={() => updateProvider(provider)}
            />
          </td>
        </tr>
      </>
    );
  };

  function renderContent() {
    if (providers.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.providers.noContent}</Alert>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.providers.tableHead.document}</th>
            <th>{tableTranslates.providers.tableHead.name}</th>
            <th>{tableTranslates.providers.tableHead.phoneNumber}</th>
            <th>{tableTranslates.providers.tableHead.email}</th>
            <th>{tableTranslates.providers.tableHead.website}</th>
            <th>{tableTranslates.providers.tableHead.companyDescription}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider: Provider) => renderTableRow(provider))}
        </tbody>
      </Table>
    );
  }

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.providers.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
