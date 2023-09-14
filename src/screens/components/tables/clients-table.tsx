import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Client } from "../forms/register-client-form";

interface ClientsProps {
  setShowForm: (value: boolean) => void;
  clients: Client[];
}

export const ClientsTable = ({ setShowForm, clients }: ClientsProps) => {
  const renderTableRow = (client: Client) => {
    return (
      <>
        <tr>
          <td>{client.document}</td>
          <td>{client.name}</td>
          <td>{`${client.address},nº ${client.number}`}</td>
          <td>{`${client.city} - ${client.uf}`}</td>
          <td>{client.zipCode}</td>
        </tr>
      </>
    );
  };

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.clients.goBackButtonLabel}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.clients.tableHead.address}</th>
            <th>{tableTranslates.clients.tableHead.name}</th>
            <th>{tableTranslates.clients.tableHead.document}</th>
            <th>{tableTranslates.clients.tableHead.cityAndUF}</th>
            <th>{tableTranslates.clients.tableHead.zipCode}</th>
          </tr>
        </thead>
        <tbody>{clients.map((client: Client) => renderTableRow(client))}</tbody>
      </Table>
    </Container>
  );
};
