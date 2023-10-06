import { ReactElement, useState } from "react";
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
import { Provider, TIMEOUT } from "./register-provider-form";
import {
  INITIAL_PRODUCTS_STATE,
  Product,
} from "../../register-products/register-products-screen";
import Message from "../message/message";

interface ProductsProps {
  setShowForm: (value: boolean) => void;
  providers: Provider[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedProduct: Product;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
}

interface FormControlElement {
  value: string;
}

const translate = formsTranslates.productsForm;

export const RegisterProductForm = ({
  setShowForm,
  providers,
  editMode,
  products,
  selectedProduct,
  setEditMode,
  setProducts,
  setSelectedProduct,
}: ProductsProps): ReactElement => {
  // receber infos da API
  const categories = ["Eletrônicos", "Eletrodomésticos", "Móveis", "Roupas"];
  const [product, setProduct] = useState<Product>(selectedProduct);
  const [validated, setValidated] = useState(false);
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);

  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: ProductFormEnum
  ) {
    setProduct({ ...product, [field]: event.currentTarget.value });
  }

  function addProducts() {
    setProducts([...products, product]);
  }

  function resetForm() {
    setProduct(INITIAL_PRODUCTS_STATE);
  }

  function editProduct() {
    setProducts([
      ...products.filter((productItem) => productItem.name !== product.name),
      product,
    ]);
    setSelectedProduct(INITIAL_PRODUCTS_STATE);
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
        addProducts();
      } else {
        editProduct();
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
                label={translate.labels.name}
                className="mb-3"
                id={ProductFormEnum.name}
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.name}
                  value={product.name}
                  onChange={(event) => onChange(event, ProductFormEnum.name)}
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
                  value={product.description}
                  style={{ height: "100px" }}
                  onChange={(event) =>
                    onChange(event, ProductFormEnum.description)
                  }
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
                  value={product.unitPrice}
                  onChange={(event) =>
                    onChange(event, ProductFormEnum.unitPrice)
                  }
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
                  value={product.stockQuantity}
                  onChange={(event) =>
                    onChange(event, ProductFormEnum.stockQuantity)
                  }
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
                  value={product.brand}
                  onChange={(event) => onChange(event, ProductFormEnum.brand)}
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
                  value={product.model}
                  onChange={(event) => onChange(event, ProductFormEnum.model)}
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
                  value={product.manufacturingDate}
                  onChange={(event) =>
                    onChange(event, ProductFormEnum.manufacturingDate)
                  }
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
                <Form.Select
                  required
                  onChange={(event) =>
                    onChange(event, ProductFormEnum.category)
                  }
                  value={product.category}
                >
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
                <Form.Select
                  required
                  onChange={(event) =>
                    onChange(event, ProductFormEnum.provider)
                  }
                  value={product.provider}
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
        {renderSuccessMessage()}
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
