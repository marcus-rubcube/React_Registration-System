import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Sale } from "../forms/register-sale-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { useDispatch, useSelector } from "react-redux";
import { buscarVendas, removerVenda, setStatusIdle } from "../../../redux/saleReducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ProviderState } from "../../../redux/providerReducer";
import { useEffect } from "react";
import { ReduxState } from "../../../redux/types";
import STATE from "../../../resources/state";
import { toast } from "react-toastify";

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

  const dispatch: ThunkDispatch<ProviderState, any, AnyAction> = useDispatch();
  
  useEffect(() => {
    dispatch(buscarVendas());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const { status, salesList, message } = useSelector(
    (state: ReduxState) => state.sales
  );

  const renderTableRow = (sale: Sale) => {

    function deleteSale() {
      if (window.confirm(`${tableTranslates.sale.wantToDelete}`)) {
        dispatch(removerVenda(sale.id));
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
          <td>{sale.code}</td>
          <td>{sale.client.name}</td>
          <td>{sale.quantity}</td>
          <td>R$ {sale.value}</td>
          <td>{sale.paymentMethod}</td>
          <td>
            <ActionsButton
              deleteItem={() => deleteSale()}
              update={() => updateSale(sale)}
            />
          </td>
        </tr>
      </>
    )

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




  function renderContent() {
    if (salesList.length === 0) {
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
          {salesList.map((sale: Sale) => renderTableRow(sale))}
        </tbody>
      </Table>
    );
  }

  return (
    <Container className="mt-4">
      <Button type="button" onClick={() => {
        setShowForm(true)
        setStatusIdle()
        }} className="mb-3">
        {tableTranslates.sale.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
