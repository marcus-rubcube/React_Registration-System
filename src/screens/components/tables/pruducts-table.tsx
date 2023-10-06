import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Product } from "../../register-products/register-products-screen";
import { ActionsButton } from "./components/actions-buttons/actions-button";

interface ProductsProps {
  setShowForm: (value: boolean) => void;
  products: Product[];
  setProducts: (value: Product[]) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductsTable = ({
  setShowForm,
  products,
  setEditMode,
  setProducts,
  setSelectedProduct,
}: ProductsProps) => {
  const renderTableRow = (product: Product) => {
    function deleteProduct(name: string) {
      if (window.confirm(`${tableTranslates.providers.wantToDelete}`)) {
        setProducts(products.filter((product) => product.name !== name));
      }
    }

    function updateProduct(product: Product) {
      setSelectedProduct(product);
      setEditMode(true);
      setShowForm(true);
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
          <td>{product.manufacturingDate}</td>
          <td>{product.category}</td>
          <td>{product.provider}</td>
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
    if (products.length === 0) {
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
          {products.map((product: Product) => renderTableRow(product))}
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
