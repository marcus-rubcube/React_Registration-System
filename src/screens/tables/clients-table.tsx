import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";

interface ClientsProps {
  setShowForm: (value: boolean) => void;
}

export const ClientsTable = ({ setShowForm }: ClientsProps) => {
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
        <tbody>
          <tr>
            <td>000.000.000-00</td>
            <td>Maria Aparecida Fake</td>
            <td>Rua das Flores, nº 2569</td>
            <td>Presidente Prudente/SP</td>
            <td>19023-290</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
