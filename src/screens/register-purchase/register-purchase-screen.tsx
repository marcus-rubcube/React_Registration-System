import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { PurchaseTable } from "../components/tables/purchase-table";
import {
  Purchase,
  RegisterPurchaseForm,
} from "../components/forms/register-purchase-form";
import { Provider } from "../components/forms/register-provider-form";

export const INITIAL_PURCHASE_STATE: Purchase = {
  id: 0,
  paymentMethod: "",
  provider: {
    id: 0,
    name: "",
    phoneNumber: "",
    email: "",
    website: "",
    description: "",
    document: "",
  },
  quantity: null,
  value: null,
  purchaseCode: "",
};

interface RegiterPurchaseProps {
  purchases: Purchase[];
  providers: Provider[];
}

export const RegisterPurchaseScreen = ({
  purchases,
  providers,
}: RegiterPurchaseProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase>(
    INITIAL_PURCHASE_STATE
  );
  const [editMode, setEditMode] = useState(false);

  return (
    <Page>
      {showForm ? (
        <RegisterPurchaseForm
          setShowForm={setShowForm}
          purchases={purchases}
          setSelectedPurchase={setSelectedPurchase}
          setEditMode={setEditMode}
          selectedPurchase={selectedPurchase}
          editMode={editMode}
          providers={providers}
        />
      ) : (
        <PurchaseTable
          setShowForm={setShowForm}
          purchases={purchases}
          setSelectedPurchase={setSelectedPurchase}
          setEditMode={setEditMode}
        />
      )}
    </Page>
  );
};
