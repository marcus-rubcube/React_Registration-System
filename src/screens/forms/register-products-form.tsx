import { ReactElement } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { ProductFormEnum } from "./enums/product-form";
import { formsTranslates } from "./translations/ptBr";

interface ProductsProps {
  setShowForm: (value: boolean) => void;
}

const translate = formsTranslates.productsForm;

export const RegisterProductForm = ({
  setShowForm,
}: ProductsProps): ReactElement => {
  // receber infos da API
  const categories = ["Eletrônicos", "Eletrodomésticos", "Móveis", "Roupas"];

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
                label={translate.labels.name}
                className="mb-3"
                id={ProductFormEnum.name}
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.name}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label={translate.labels.description}
                className="mb-3"
                id={ProductFormEnum.description}
              >
                <FormControl
                  as="textarea"
                  placeholder={translate.placeholders.description}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.unitPrice}
                className="mb-3"
                id={ProductFormEnum.unitPrice}
              >
                <FormControl
                  type="number"
                  step="0.01"
                  placeholder={translate.placeholders.unitPrice}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.stockQuantity}
                className="mb-3"
                id={ProductFormEnum.stockQuantity}
              >
                <FormControl
                  type="number"
                  placeholder={translate.labels.stockQuantity}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.brand}
                className="mb-3"
                id={ProductFormEnum.brand}
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.brand}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.model}
                className="mb-3"
                id={ProductFormEnum.model}
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.model}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.manufacturingDate}
                className="mb-3"
                id={ProductFormEnum.manufacturingDate}
              >
                <FormControl
                  type="date"
                  placeholder={translate.placeholders.manufacturingDate}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingSelect"
                label={translate.labels.category}
                className="mb-3"
                id={ProductFormEnum.category}
              >
                <Form.Select required>
                  <option value="">{translate.placeholders.category}</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.provider}
                className="mb-3"
                id={ProductFormEnum.provider}
              >
                <Form.Select required>
                  <option value="">{translate.placeholders.provider}</option>
                  {providers.map((provider, index) => (
                    <option key={index} value={provider}>
                      {provider}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="d-flex justify-content-end">
            <Button type="submit" variant="primary">
              {translate.buttons.register}
            </Button>
          </Col>
          <Col md={6}>
            <Button
              type="button"
              variant="secondary"
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
