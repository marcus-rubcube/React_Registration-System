import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterSaleForm, Sale } from "../components/forms/register-sale-form";
import { SaleTable } from "../components/tables/sale-table";
import { Client } from "../components/forms/register-client-form";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/types";
import { INITIAL_CLIENT_STATE } from "../../redux/clientReducer";

export const INITIAL_SALE_STATE: Sale = {
  id: 0,
  paymentMethod: "",
  client: INITIAL_CLIENT_STATE,
  quantity: null,
  value: null,
  code: "",
};

interface RegisterSaleProps {
  clients: Client[];
}

export const RegisterSaleScreen = ({
  clients,
}: RegisterSaleProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale>(INITIAL_SALE_STATE);
  const [editMode, setEditMode] = useState(false);
  const sales = useSelector((state: ReduxState) => state.sales.salesList);
  return (
    <Page>
      {showForm ? (
        <RegisterSaleForm
          setShowForm={setShowForm}
          editMode={editMode}
          setSelectedSale={setSelectedSale}
          setEditMode={setEditMode}
          selectedSale={selectedSale}
        />
      ) : (
        <SaleTable
          setShowForm={setShowForm}
          setSelectedSale={setSelectedSale}
          setEditMode={setEditMode}
          sales={sales}
        />
      )}
    </Page>
  );
};
