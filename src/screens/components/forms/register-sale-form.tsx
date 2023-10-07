import { ReactElement, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { formsTranslates } from "./translations/ptBr";
import { SaleForm } from "./enums/sale-form";
import { Client } from "./register-client-form";
import { INITIAL_SALE_STATE } from "../../register-sale/register-sale-screen";
import { TIMEOUT } from "./register-provider-form";
import Message from "../message/message";
import { PurchaseForm } from "./enums/purchase-form";

const translate = formsTranslates.saleForm;

interface props {
  setShowForm: (value: boolean) => void;
  clients: Client[];
  sale: Sale[];
  setSale: React.Dispatch<React.SetStateAction<Sale[]>>;
  selectedSale: Sale;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale>>;
}

interface FormControlElement {
  value: string;
}

export interface Sale {
  client: string;
  quantity: number | null;
  value: number | null;
  paymentMethod: string;
  saleCode: string;
}

export const RegisterSaleForm = ({
  setShowForm,
  clients,
  setSelectedSale,
  setEditMode,
  selectedSale,
  setSale,
  editMode,
  sale,
}: props): ReactElement => {
  const [formSale, setFormSale] = useState<Sale>(selectedSale);
  const [showSuccesRegister, setShowSuccessRegister] = useState(false);
  const [validated, setValidated] = useState(false);
  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: SaleForm
  ) {
    setFormSale({ ...formSale, [field]: event.currentTarget.value });
  }

  function addSale() {
    setSale([...sale, formSale]);
  }

  function resetForm() {
    setFormSale(INITIAL_SALE_STATE);
  }

  function editSale() {
    setSale([
      ...sale.filter((saleItem) => saleItem.saleCode !== formSale.saleCode),
      formSale,
    ]);
    setSelectedSale(INITIAL_SALE_STATE);
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
                  value={formSale.saleCode}
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
                  value={formSale.client}
                >
                  <option value="">{translate.placeholders.client}</option>
                  {clients.map((client) => (
                    <option key={client.document} value={client.document}>
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
                  type="text"
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
                  type="text"
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
              onClick={() => setShowForm(false)}
            >
              {translate.buttons.goBack}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
