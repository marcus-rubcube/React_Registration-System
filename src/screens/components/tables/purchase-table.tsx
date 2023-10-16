import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Purchase } from "../forms/register-purchase-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { useDispatch } from "react-redux";
import { removePurchase } from "../../../redux/purchaseReducer";

interface PurchaseProps {
  setShowForm: (value: boolean) => void;
  purchases: Purchase[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPurchase: React.Dispatch<React.SetStateAction<Purchase>>;
}

export const PurchaseTable = ({
  setShowForm,
  purchases,
  setEditMode,
  setSelectedPurchase,
}: PurchaseProps) => {
  const dispatch = useDispatch();

  const renderTableRow = (purchase: Purchase) => {
    function deletePurchase() {
      if (window.confirm(`${tableTranslates.purchase.wantToDelete}`)) {
        dispatch(removePurchase(purchase));
      }
    }

    function updatePurchase(purchase: Purchase) {
      setSelectedPurchase(purchase);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
          <td>{purchase.purchaseCode}</td>
          <td>{purchase.paymentMethod}</td>
          <td>{purchase.provider}</td>
          <td>{purchase.quantity}</td>
          <td>{`R$ ${purchase.value}`}</td>
          <td>
            <ActionsButton
              deleteItem={() => deletePurchase()}
              update={() => updatePurchase(purchase)}
            />
          </td>
        </tr>
      </>
    );
  };

  function renderContent() {
    if (purchases.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.purchase.noContent}</Alert>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>{tableTranslates.purchase.tableHead.purchaseCode}</th>
            <th>{tableTranslates.purchase.tableHead.paymentMethod}</th>
            <th>{tableTranslates.purchase.tableHead.provider}</th>
            <th>{tableTranslates.purchase.tableHead.quantity}</th>
            <th>{tableTranslates.purchase.tableHead.value}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase: Purchase) => renderTableRow(purchase))}
        </tbody>
      </Table>
    );
  }

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => setShowForm(true)} className="mb-3">
        {tableTranslates.purchase.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
