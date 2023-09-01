import { Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";

interface CategoriesProps {
  setShowForm: (value: boolean) => void;
}

export const CategoriesTable = ({ setShowForm }: CategoriesProps) => {
  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.categories.goBackButtonLabel}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.categories.tableHead.name}</th>
            <th>{tableTranslates.categories.tableHead.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Celular</td>
            <td>
              {
                "Celulares dos mais diversos tipos, com sistemas android, ios e windows phone"
              }
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
