import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";

interface ProvidersProps {
  setShowForm: (value: boolean) => void;
}

export const ProvidersTable = ({ setShowForm }: ProvidersProps) => {
  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.providers.goBackButtonLabel}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.providers.tableHead.name}</th>
            <th>{tableTranslates.providers.tableHead.address}</th>
            <th>{tableTranslates.providers.tableHead.phoneNumber}</th>
            <th>{tableTranslates.providers.tableHead.email}</th>
            <th>{tableTranslates.providers.tableHead.website}</th>
            <th>{tableTranslates.providers.tableHead.companyDescription}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empresa Fornecedora Ltda.</td>
            <td>Rua dos Fornecedores, nº 123</td>
            <td>(11) 1234-5678</td>
            <td>fornecedor@example.com</td>
            <td>www.fornecedor.com</td>
            <td>Uma descrição da empresa fornecedora.</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
