import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";

interface SaleProps {
    setShowForm: (value: boolean) => void;
}

export const SaleTable = ({ setShowForm }: SaleProps) => {
    return (
      <Container className="mt-4">
        <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
          {tableTranslates.sale.goBackButtonLabel}
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{tableTranslates.sale.tableHead.client}</th>
              <th>{tableTranslates.sale.tableHead.quantity}</th>
              <th>{tableTranslates.sale.tableHead.value}</th>
              <th>{tableTranslates.sale.tableHead.paymentMethod}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Márcia Oliveira</td>
              <td>4</td>
              <td>R$ 320,43</td>
              <td>Pix</td>
            </tr>
            {/* Outras linhas da tabela podem ser adicionadas aqui */}
          </tbody>
        </Table>
      </Container>
    );
  };
  