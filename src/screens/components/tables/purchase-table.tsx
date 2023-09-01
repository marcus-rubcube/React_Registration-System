import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";

interface PurchaseProps {
    setShowForm: (value: boolean) => void;
}

export const PurchaseTable = ({ setShowForm }: PurchaseProps) => {
    return (
      <Container className="mt-4">
        <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
          {tableTranslates.purchase.goBackButtonLabel}
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{tableTranslates.purchase.tableHead.provider}</th>
              <th>{tableTranslates.purchase.tableHead.quantity}</th>
              <th>{tableTranslates.purchase.tableHead.value}</th>
              <th>{tableTranslates.purchase.tableHead.paymentMethod}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caetano Veloso</td>
              <td>2</td>
              <td>R$ 521,60</td>
              <td>Cartão de Crédito</td>
            </tr>
            {/* Outras linhas da tabela podem ser adicionadas aqui */}
          </tbody>
        </Table>
      </Container>
    );
  };
  