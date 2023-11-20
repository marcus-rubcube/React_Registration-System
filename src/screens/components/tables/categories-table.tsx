import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CategorieProps, Category } from "../forms/register-categories-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { tableTranslates } from "./translations/ptBr";
import {
  CategoryState,
  buscarCategorias,
  removerCategoria,
  setStatusIdle,
} from "../../../redux/categoryReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ReduxState } from "../../../redux/types";

import { useEffect } from "react";
import STATE from "../../../resources/state";
import { toast } from "react-toastify";

export const CategoriesTable = (props: CategorieProps) => {
  const { setShowForm, setEditMode, setSelectedCategorie } = props;

  const dispatch: ThunkDispatch<CategoryState, any, AnyAction> = useDispatch();
  const { status, categoriesList, message } = useSelector(
    (state: ReduxState) => state.categories
  );

  useEffect(() => {
    dispatch(buscarCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTableRow = (category: Category) => {
    function deleteCategory() {
      if (window.confirm(`${tableTranslates.categories.wantToDelete}`)) {
        dispatch(removerCategoria(category.id));
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

  if (status === STATE.ERRO) {
    toast.error(
      () => (
        <div>
          <p>{message}</p>
        </div>
      ),
      { toastId: status }
    );
  } else if (status === STATE.PENDENTE) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button
        type="button"
        onClick={() => {
          setShowForm(true);
          dispatch(setStatusIdle());
        }}
        className="mb-3"
      >
        {tableTranslates.categories.goBackButtonLabel}
      </Button>
      {categoriesList.length === 0 ? (
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
            {categoriesList.length > 0 &&
              categoriesList.map((categorie: Category) =>
                renderTableRow(categorie)
              )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
