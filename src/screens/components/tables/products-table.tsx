import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Product } from "../../register-products/register-products-screen";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { buscarProducts, removerProduto } from "../../../redux/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { CategoryState } from "../../../redux/categoryReducer";
import { useEffect } from "react";
import STATE from "../../../resources/state";
import { toast } from "react-toastify";
import { ReduxState } from "../../../redux/types";
import { formatarData } from "../../../utils/formatar-data";

interface ProductsProps {
  setShowForm: (value: boolean) => void;
  products: Product[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductsTable = ({
  setShowForm,
  setEditMode,
  setSelectedProduct,
}: ProductsProps) => {
  const dispatch: ThunkDispatch<CategoryState, any, AnyAction> = useDispatch();

  const { status, productList, message } = useSelector(
    (state: ReduxState) => state.products
  );

  useEffect(() => {
    dispatch(buscarProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTableRow = (product: Product) => {
    function deleteProduct(name: string) {
      if (window.confirm(`${tableTranslates.providers.wantToDelete}`)) {
        dispatch(removerProduto(product.id));
      }
    }

    function updateProduct(product: Product) {
      setSelectedProduct(product);
      setEditMode(true);
      setShowForm(true);
    }

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
      <>
        <tr>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.unitPrice}</td>
          <td>{product.stockQuantity}</td>
          <td>{product.brand}</td>
          <td>{product.model}</td>
          <td>{formatarData(product.manufacturingDate)}</td>
          <td>{product.category.name}</td>
          <td>{product.provider.name}</td>
          <td>
            <ActionsButton
              deleteItem={() => deleteProduct(product.name)}
              update={() => updateProduct(product)}
            />
          </td>
        </tr>
      </>
    );
  };

  function renderContent() {
    if (productList.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.products.noContent}</Alert>
      );
    }

    return (
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product: Product) => renderTableRow(product))}
        </tbody>
      </Table>
    );
  }

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.products.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
