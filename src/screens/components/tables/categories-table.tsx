import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Categorie, CategorieProps } from "../forms/register-categories-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";

export const CategoriesTable = (props: CategorieProps) => {
  const {
    setShowForm,
    setCategories,
    categories,
    setEditMode,
    setSelectedCategorie,
  } = props;

  const renderTableRow = (categorie: Categorie) => {
    function deleteClient(name: string) {
      if (window.confirm(`${tableTranslates.categories.wantToDelete}`)) {
        setCategories(
          categories.filter((categorie) => categorie.name !== name)
        );
      }
    }

    function updateClient(categorie: Categorie) {
      setSelectedCategorie(categorie);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
          <td>{categorie.name}</td>
          <td>{categorie.description}</td>
          <td>
            <ActionsButton
              update={() => updateClient(categorie)}
              deleteItem={() => deleteClient(categorie.name)}
            />
          </td>
        </tr>
      </>
    );
  };

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.categories.goBackButtonLabel}
      </Button>
      {categories.length === 0 ? (
        <Alert className="mt-3">{tableTranslates.categories.noContent}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{tableTranslates.categories.tableHead.name}</th>
              <th>{tableTranslates.categories.tableHead.description}</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((categorie: Categorie) =>
                renderTableRow(categorie)
              )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
