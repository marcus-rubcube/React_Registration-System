import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { tableTranslates } from "./translations/ptBr";
import { Client } from "../forms/register-client-form";
import { documentFormatter } from "../../../utils/document-formatter";
import { zipCodeFormatter } from "../../../utils/zipcode-formatter";
import { ActionsButton } from "./components/actions-buttons/actions-button";
import { useDispatch, useSelector } from "react-redux";
import { ClientState, buscarClientes, removerCliente, setStatusIdle } from "../../../redux/clientReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ReduxState } from "../../../redux/types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import STATE from "../../../resources/state";

interface ClientsProps {
  setShowForm: (value: boolean) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client>>;
}

export const ClientsTable = ({
  setShowForm,
  setEditMode,
  setSelectedClient,
}: ClientsProps) => {
  const dispatch: ThunkDispatch<ClientState, any, AnyAction> = useDispatch();
  const { status, clientsList, message } = useSelector(
    (state: ReduxState) => state.clients
  );

  useEffect(() => {
    dispatch(buscarClientes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTableRow = (client: Client) => {
    function deleteClient() {
      if (window.confirm(`${tableTranslates.clients.wantToDelete}`)) {
        dispatch(removerCliente(client.document));
      }
    }

    function updateClient(client: Client) {
      setSelectedClient(client);
      setEditMode(true);
      setShowForm(true);
    }

    return (
      <>
        <tr>
          <td>{documentFormatter(client.document)}</td>
          <td>{client.name}</td>
          <td>{`${client.address}, nº ${client.number}`}</td>
          <td>{`${client.city} - ${client.uf}`}</td>
          <td>{client.neighborhood}</td>
          <td>{zipCodeFormatter(client.zipCode)}</td>
          <td>
            <ActionsButton
              deleteItem={() => deleteClient()}
              update={() => updateClient(client)}
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
    if (clientsList.length === 0) {
      return (
        <Alert className="mt-3">{tableTranslates.clients.noContent}</Alert>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{tableTranslates.clients.tableHead.document}</th>
            <th>{tableTranslates.clients.tableHead.name}</th>
            <th>{tableTranslates.clients.tableHead.address}</th>
            <th>{tableTranslates.clients.tableHead.cityAndUF}</th>
            <th>{tableTranslates.clients.tableHead.neighborhood}</th>
            <th>{tableTranslates.clients.tableHead.zipCode}</th>
          </tr>
        </thead>
        <tbody>{clientsList.map((client: Client) => renderTableRow(client))}</tbody>
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
        {tableTranslates.clients.goBackButtonLabel}
      </Button>
      {renderContent()}
    </Container>
  );
};
