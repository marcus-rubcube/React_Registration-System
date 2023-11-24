import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ProviderState,
  buscarProviders,
  removerFornecedor,
  setStatusIdle,
} from "../../../redux/providerReducer";
import { ReduxState } from "../../../redux/types";
import STATE from "../../../resources/state";
import { Provider } from "../forms/register-provider-form";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { tableTranslates } from "./translations/ptBr";

interface ProvidersProps {
  setShowForm: (value: boolean) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProvider: React.Dispatch<React.SetStateAction<Provider>>;
}

export const ProvidersTable = ({
  setEditMode,
  setSelectedProvider,
  setShowForm,
}: ProvidersProps) => {
  const dispatch: ThunkDispatch<ProviderState, any, AnyAction> = useDispatch();
  const { status, providerList, message } = useSelector(
    (state: ReduxState) => state.providers
  );

  useEffect(() => {
    dispatch(buscarProviders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTableRow = (provider: Provider) => {
    function deleteProvider() {
      if (window.confirm(`${tableTranslates.providers.wantToDelete}`)) {
        dispatch(removerFornecedor(provider.document));
      }
    }

    function updateProvider(provider: Provider) {
      setSelectedProvider(provider);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
          <td>{provider.document}</td>
          <td>{provider.name}</td>
          <td>{provider.phoneNumber}</td>
          <td>{provider.email}</td>
          <td>{provider.website}</td>
          <td>{provider.description}</td>
          <td>
            <ActionsButton
              deleteItem={() => deleteProvider()}
              update={() => updateProvider(provider)}
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

  function renderContent() {
    if (providerList.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.providers.noContent}</Alert>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.providers.tableHead.document}</th>
            <th>{tableTranslates.providers.tableHead.name}</th>
            <th>{tableTranslates.providers.tableHead.phoneNumber}</th>
            <th>{tableTranslates.providers.tableHead.email}</th>
            <th>{tableTranslates.providers.tableHead.website}</th>
            <th>{tableTranslates.providers.tableHead.companyDescription}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {providerList.map((provider: Provider) => renderTableRow(provider))}
        </tbody>
      </Table>
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
        {tableTranslates.providers.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
