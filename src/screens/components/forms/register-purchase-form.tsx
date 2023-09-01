import { ReactElement } from "react";
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

const translate = formsTranslates.purchaseForm;

interface props {
    setShowForm: (value: boolean) => void;
}

export const RegisterPurchaseForm = ({ setShowForm }: props): ReactElement => {
  const providers = [
    "Apple",
    "Samsung",
    "Produtos Ltda.",
    "Vendedores anônimos",
  ];

  return (
    <Container className="mt-5">
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.provider}
                className="mb-3"
               
              >
                <Form.Select required
                 id={PurchaseForm.provider}>
                  <option value="">{translate.placeholders.provider}</option>
                  {providers.map((provider, index) => (
                    <option key={index} value={provider}>
                      {provider}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.provider}
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
                  id={PurchaseForm.quantity}
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
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.paymentMethod}
                  id={PurchaseForm.paymentMethod}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.placeholders.paymentMethod}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="d-flex justify-content-end">
            <Button type="submit" variant={"primary"}>
              {translate.buttons.register}
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
