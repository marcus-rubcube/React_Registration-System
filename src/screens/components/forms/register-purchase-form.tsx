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
import { PurchaseForm } from "./enums/purchase-form";
import { Provider, TIMEOUT } from "./register-provider-form";
import Message from "../message/message";
import { INITIAL_PURCHASE_STATE } from "../../register-purchase/register-purchase-screen";
import { useDispatch } from "react-redux";
import { addPurchases, updatePurchase } from "../../../redux/purchaseReducer";

const translate = formsTranslates.purchaseForm;

interface props {
  setShowForm: (value: boolean) => void;
  providers: Provider[];
  purchases: Purchase[];
  selectedPurchase: Purchase;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPurchase: React.Dispatch<React.SetStateAction<Purchase>>;
}

export interface Purchase {
  purchaseCode: string;
  provider: string;
  quantity: number | null;
  value: number | null;
  paymentMethod: string;
}

interface FormControlElement {
  value: string;
}

export const RegisterPurchaseForm = ({
  setShowForm,
  providers,
  editMode,
  purchases,
  selectedPurchase,
  setEditMode,
  setSelectedPurchase,
}: props): ReactElement => {
  const [purchase, setPurchase] = useState<Purchase>(selectedPurchase);
  const [validated, setValidated] = useState(false);
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);

  const dispatch = useDispatch();

  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: PurchaseForm
  ) {
    setPurchase({ ...purchase, [field]: event.currentTarget.value });
  }

  function addPurchase() {
    dispatch(addPurchases(purchase));
  }

  function resetForm() {
    setPurchase(INITIAL_PURCHASE_STATE);
  }

  function editPurchase() {
    dispatch(updatePurchase(purchase));
    setSelectedPurchase(INITIAL_PURCHASE_STATE);
  }

  function onSuccessAction() {
    setShowSuccessRegister(true);
    setTimeout(() => {
      setShowSuccessRegister(false);
      if (editMode) {
        setShowForm(false);
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
        addPurchase();
      } else {
        editPurchase();
      }
      onSuccessAction();
    } else {
      setValidated(true);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  function renderSuccessMessage() {
    if (showSuccessRegister) {
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
                label={translate.labels.purchaseCode}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.purchaseCode}
                  id={PurchaseForm.purchaseCode}
                  onChange={(event) =>
                    onChange(event, PurchaseForm.purchaseCode)
                  }
                  value={purchase.purchaseCode}
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
                label={translate.labels.provider}
                className="mb-3"
                id={PurchaseForm.provider}
              >
                <Form.Select
                  required
                  onChange={(event) => onChange(event, PurchaseForm.provider)}
                  value={purchase.provider}
                >
                  <option value="">{translate.placeholders.provider}</option>
                  {providers.map((provider) => (
                    <option key={provider.document} value={provider.document}>
                      {provider.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
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
                  id={PurchaseForm.quantity}
                  onChange={(event) => onChange(event, PurchaseForm.quantity)}
                  value={purchase.quantity ?? ""}
                  required
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
                  id={PurchaseForm.value}
                  onChange={(event) => onChange(event, PurchaseForm.value)}
                  value={purchase.value ?? ""}
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
                label={translate.labels.paymentMethod}
                className="mb-3"
              >
                <Form.Select
                  required
                  onChange={(event) => onChange(event, PurchaseForm.paymentMethod)}
                  value={purchase.paymentMethod}
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
                setSelectedPurchase(INITIAL_PURCHASE_STATE);
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
