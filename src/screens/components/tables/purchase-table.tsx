import { Alert, Button, Container, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Purchase } from "../forms/register-purchase-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";

interface PurchaseProps {
  setShowForm: (value: boolean) => void;
  purchases: Purchase[];
  setPurchases: (value: Purchase[]) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPurchase: React.Dispatch<React.SetStateAction<Purchase>>;
}

export const PurchaseTable = ({
  setShowForm,
  purchases,
  setEditMode,
  setPurchases,
  setSelectedPurchase,
}: PurchaseProps) => {
  const renderTableRow = (purchase: Purchase) => {
    function deletePurchase(purchaseCode: string) {
      if (window.confirm(`${tableTranslates.purchase.wantToDelete}`)) {
        setPurchases(
          purchases.filter((purchase) => purchase.purchaseCode !== purchaseCode)
        );
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
              deleteItem={() => deletePurchase(purchase.purchaseCode)}
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
