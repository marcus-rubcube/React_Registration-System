import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Sale } from "../forms/register-sale-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { useDispatch } from "react-redux";
import { removeSale } from "../../../redux/saleReducer";

interface SaleProps {
  setShowForm: (value: boolean) => void;
  sales: Sale[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale>>;
}

export const SaleTable = ({
  setShowForm,
  sales,
  setEditMode,
  setSelectedSale
}: SaleProps) => {

  const dispatch = useDispatch();

  const renderTableRow = (sale: Sale) => {

    function deletePurchase() {
      if (window.confirm(`${tableTranslates.sale.wantToDelete}`)) {
        dispatch(removeSale(sale));
      }
    }

    function updateSale(sale: Sale) {
      setSelectedSale(sale);
      setEditMode(true)
      setShowForm(true)
    }

    return (
      <>
        <tr>
          <td>{sale.saleCode}</td>
          <td>{sale.client}</td>
          <td>{sale.quantity}</td>
          <td>R$ {sale.value}</td>
          <td>{sale.paymentMethod}</td>
          <td>
            <ActionsButton
              deleteItem={() => deletePurchase()}
              update={() => updateSale(sale)}
            />
          </td>
        </tr>
      </>
    )

  }




  function renderContent() {
    if (sales.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.sale.noContent}</Alert>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.sale.tableHead.saleCode}</th>
            <th>{tableTranslates.sale.tableHead.client}</th>
            <th>{tableTranslates.sale.tableHead.quantity}</th>
            <th>{tableTranslates.sale.tableHead.value}</th>
            <th>{tableTranslates.sale.tableHead.paymentMethod}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale: Sale) => renderTableRow(sale))}
        </tbody>
      </Table>
    );
  }

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.sale.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
