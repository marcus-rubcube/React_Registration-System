import { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { formsTranslates } from "./translations/ptBr";
import { SaleForm } from "./enums/sale-form";
import { Client } from "./register-client-form";
import { INITIAL_SALE_STATE } from "../../register-sale/register-sale-screen";
import { TIMEOUT } from "./register-provider-form";
import Message from "../message/message";
import { PurchaseForm } from "./enums/purchase-form";
import { useDispatch, useSelector } from "react-redux";
import { SaleState, atualizarVenda, cadastrarVenda } from "../../../redux/saleReducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import STATE from "../../../resources/state";
import { ReduxState } from "../../../redux/types";
import { toast } from "react-toastify";
import { buscarClientes } from "../../../redux/clientReducer";

const translate = formsTranslates.saleForm;

interface props {
  setShowForm: (value: boolean) => void;
  selectedSale: Sale;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale>>;
}

interface FormControlElement {
  value: string;
}

export interface Sale {
  id: number;
  client: Client;
  quantity: number | null;
  value: number | null;
  paymentMethod: string;
  code: string;
}

export const RegisterSaleForm = ({
  setShowForm,
  setSelectedSale,
  setEditMode,
  selectedSale,
  editMode,
}: props): ReactElement => {
  const [formSale, setFormSale] = useState<Sale>(selectedSale);
  const [showSuccesRegister, setShowSuccessRegister] = useState(false);
  const [validated, setValidated] = useState(false);
  const { status, message } = useSelector((state: ReduxState) => state.sales);
  const dispatch: ThunkDispatch<SaleState, any, AnyAction> = useDispatch();

  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: SaleForm
  ) {
    if (field === SaleForm.client) {

      const client = clients.find(
        (client) => client.name === event.currentTarget.value
      );
      setFormSale({ ...formSale, client: client! });
      return
    }
    setFormSale({ ...formSale, [field]: event.currentTarget.value });
  }

  const clients = useSelector((state: ReduxState) => state.clients.clientsList);

  useEffect(() => {
    dispatch(buscarClientes());
  }, [dispatch]);

  function addSale() {
    dispatch(cadastrarVenda(formSale));
    if (status === STATE.PENDENTE) {
      return <Spinner />
    }
    else if (status === STATE.OCIOSO) {
      onSuccessAction();
    }
    else {
      toast.error(
        () => (
          <div>
            <p>{message}</p>
          </div>
        ),
        { toastId: status }
      )
    }
  }

  function resetForm() {
    setFormSale(INITIAL_SALE_STATE);
  }

  function editSale() {
    dispatch(atualizarVenda(formSale));
    if (status === STATE.PENDENTE) {
      return (
        <Container className="mt-4">
          <Spinner animation="border" role="status"></Spinner>
        </Container>
      );
    } else if (status === STATE.OCIOSO) {
      onSuccessAction();
    } else {
      toast.error(
        () => (
          <div>
            <p>{message}</p>
          </div>
        ),
        { toastId: status }
      );
    }
    resetForm();
  }

  function onSuccessAction() {
    setShowSuccessRegister(true);
    setTimeout(() => {
      setShowSuccessRegister(false);
      if (editMode) {
        setShowForm(true);
      }
      setEditMode(false);
    }, TIMEOUT);
    setValidated(false);
    resetForm();
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      if (!editMode) {
        addSale();
      } else {
        editSale();
      }
      onSuccessAction();
    } else {
      setValidated(true);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  function renderSuccessMessage() {
    if (showSuccesRegister) {
      if (editMode) {
        return (
          <Message
            message={translate.successOnUpdate}
            type="info"
            setShowMessage={setShowSuccessRegister}
          />
        );
      }

      return (
        <Message
          message={translate.successOnRegister}
          type="success"
          setShowMessage={setShowSuccessRegister}
        />
      );
    }
    return <></>;
  }

  return (
    <Container className="mt-5">
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => onSubmit(event)}
      >
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.saleCode}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.saleCode}
                  id={PurchaseForm.purchaseCode}
                  onChange={(event) =>
                    onChange(event, SaleForm.saleCode)
                  }
                  value={formSale.code}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.value}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.client}
                className="mb-3"
              >
                <Form.Select
                  required
                  onChange={(event) => onChange(event, SaleForm.client)}
                  value={formSale.client.name}
                >
                  <option value="">{translate.placeholders.client}</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.client}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.quantity}
                className="mb-3"
              >
                <FormControl
                  type="number"
                  placeholder={translate.placeholders.quantity}
                  id={SaleForm.quantity}
                  required
                  onChange={(event) => onChange(event, SaleForm.quantity)}
                  value={formSale.quantity || ""}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.quantity}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.value}
                className="mb-3"
              >
                <FormControl
                  type="number"
                  placeholder={translate.placeholders.value}
                  id={SaleForm.value}
                  required
                  onChange={(event) => onChange(event, SaleForm.value)}
                  value={formSale.value || ""}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.value}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.paymentMethod}
                className="mb-3"
              >
                <Form.Select
                  required
                  onChange={(event) => onChange(event, SaleForm.paymentMethod)}
                  value={formSale.paymentMethod}
                >
                  <option value="">
                    {translate.placeholders.paymentMethod}
                  </option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="PIX">PIX</option>
                </Form.Select>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.paymentMethod}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {renderSuccessMessage()}
        <Row>
          <Col md={6} className="d-flex justify-content-end">
            <Button type="submit" variant={"primary"}>
              {editMode ? translate.buttons.update : translate.buttons.register}
            </Button>
          </Col>
          <Col md={6}>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                resetForm();
                setSelectedSale(INITIAL_SALE_STATE);
                setEditMode(false);
                setShowForm(false);
              }}
            >
              {translate.buttons.goBack}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
