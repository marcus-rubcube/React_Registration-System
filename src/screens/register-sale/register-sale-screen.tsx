import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterSaleForm, Sale } from "../components/forms/register-sale-form";
import { SaleTable } from "../components/tables/sale-table";
import { Client } from "../components/forms/register-client-form";

export const INITIAL_SALE_STATE: Sale = {
  paymentMethod: "",
  client: "",
  quantity: null,
  value: null,
  saleCode: "",
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
  const [sale, setSale] = useState<Sale[]>([]);
  return (
    <Page>
      {showForm ? (
        <RegisterSaleForm
          setShowForm={setShowForm}
          clients={clients}
          editMode={editMode}
          setSelectedSale={setSelectedSale}
          setEditMode={setEditMode}
          selectedSale={selectedSale}
          setSale={setSale}
          sale={sale}
        />
      ) : (
        <SaleTable
          setShowForm={setShowForm}
          setSelectedSale={setSelectedSale}
          setEditMode={setEditMode}
          setSales={setSale}
          sales={sale}
        />
      )}
    </Page>
  );
};
