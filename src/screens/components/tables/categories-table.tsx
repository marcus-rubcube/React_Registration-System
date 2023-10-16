import { Alert, Button, Container, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeCategory } from "../../../redux/categoryReducer";
import { CategorieProps, Category } from "../forms/register-categories-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { tableTranslates } from "./translations/ptBr";

export const CategoriesTable = (props: CategorieProps) => {
  const {
    setShowForm,
    categories,
    setEditMode,
    setSelectedCategorie,
  } = props;

  const dispatch = useDispatch();

  const renderTableRow = (category: Category) => {
    function deleteCategory() {
      if (window.confirm(`${tableTranslates.categories.wantToDelete}`)) {
        dispatch(removeCategory(category));
      }
    }

    function updateCategory(category: Category) {
      setSelectedCategorie(category);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>
            <ActionsButton
              update={() => updateCategory(category)}
              deleteItem={() => deleteCategory()}
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
              categories.map((categorie: Category) =>
                renderTableRow(categorie)
              )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
