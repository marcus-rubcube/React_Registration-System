import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";

interface ProductsProps {
  setShowForm: (value: boolean) => void;
}

export const ProductsTable = ({ setShowForm }: ProductsProps) => {
  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.products.goBackButtonLabel}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.products.tableHead.name}</th>
            <th>{tableTranslates.products.tableHead.description}</th>
            <th>{tableTranslates.products.tableHead.unitPrice}</th>
            <th>{tableTranslates.products.tableHead.stockQuantity}</th>
            <th>{tableTranslates.products.tableHead.brand}</th>
            <th>{tableTranslates.products.tableHead.model}</th>
            <th>{tableTranslates.products.tableHead.manufacturingDate}</th>
            <th>{tableTranslates.products.tableHead.category}</th>
            <th>{tableTranslates.products.tableHead.provider}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Produto Eletrônico</td>
            <td>Descrição do produto eletrônico.</td>
            <td>R$ 999.99</td>
            <td>100</td>
            <td>Marca XYZ</td>
            <td>Modelo ABC123</td>
            <td>2023-08-28</td>
            <td>Eletrônicos</td>
            <td>Empresa Fornecedora Ltda.</td>
          </tr>
          {/* Outras linhas da tabela podem ser adicionadas aqui */}
        </tbody>
      </Table>
    </Container>
  );
};
