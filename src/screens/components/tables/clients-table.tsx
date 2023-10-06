import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Client } from "../forms/register-client-form";
import { documentFormatter } from "../../../utils/document-formatter";
import { zipCodeFormatter } from "../../../utils/zipcode-formatter";
import { ActionsButton } from "./components/actions-buttons/actions-button";

interface ClientsProps {
  setShowForm: (value: boolean) => void;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client>>;
}

export const ClientsTable = ({
  setShowForm,
  clients,
  setClients,
  setEditMode,
  setSelectedClient,
}: ClientsProps) => {
  const renderTableRow = (client: Client) => {
    function deleteClient(document: string) {
      if (window.confirm(`${tableTranslates.clients.wantToDelete}`)) {
        setClients(clients.filter((client) => client.document !== document));
      }
    }

    function updateClient(client: Client) {
      setSelectedClient(client);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
          <td>{documentFormatter(client.document)}</td>
          <td>{client.name}</td>
          <td>{`${client.address}, nº ${client.number}`}</td>
          <td>{`${client.city} - ${client.uf}`}</td>
          <td>{client.neighborhood}</td>
          <td>{zipCodeFormatter(client.zipCode)}</td>
          <td>
            <ActionsButton
              deleteItem={() => deleteClient(client.document)}
              update={() => updateClient(client)}
            />
          </td>
        </tr>
      </>
    );
  };

  function renderContent() {
    if (clients.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.clients.noContent}</Alert>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.clients.tableHead.document}</th>
            <th>{tableTranslates.clients.tableHead.name}</th>
            <th>{tableTranslates.clients.tableHead.address}</th>
            <th>{tableTranslates.clients.tableHead.cityAndUF}</th>
            <th>{tableTranslates.clients.tableHead.neighborhood}</th>
            <th>{tableTranslates.clients.tableHead.zipCode}</th>
          </tr>
        </thead>
        <tbody>{clients.map((client: Client) => renderTableRow(client))}</tbody>
      </Table>
    );
  }

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.clients.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
