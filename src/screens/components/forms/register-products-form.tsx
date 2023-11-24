import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { buscarCategorias } from "../../../redux/categoryReducer";
import {
  INITIAL_PRODUCTS_STATE,
  atualizarProduto,
  cadastrarProduto,
} from "../../../redux/productReducer";
import { ProviderState, buscarProviders } from "../../../redux/providerReducer";
import { ReduxState } from "../../../redux/types";
import STATE from "../../../resources/state";
import { Product } from "../../register-products/register-products-screen";
import Message from "../message/message";
import { ProductFormEnum } from "./enums/product-form";
import { TIMEOUT } from "./register-provider-form";
import { formsTranslates } from "./translations/ptBr";

interface ProductsProps {
  setShowForm: (value: boolean) => void;
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
  editMode,
  selectedProduct,
  setEditMode,
  setSelectedProduct,
}: ProductsProps): ReactElement => {
  const [product, setProduct] = useState<Product>(selectedProduct);
  const [validated, setValidated] = useState(false);
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);
  const { status, message } = useSelector(
    (state: ReduxState) => state.products
  );
  const categoryState = useSelector((state: ReduxState) => state.categories);
  const providerState = useSelector((state: ReduxState) => state.providers);
  const dispatch: ThunkDispatch<ProviderState, any, AnyAction> = useDispatch();

  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: ProductFormEnum
  ) {
    if (field === ProductFormEnum.category) {
      const category = categoryState.categoriesList.find(
        (category) => category.name === event.currentTarget.value
      );
      setProduct({ ...product, category: category! });
    } else if (field === ProductFormEnum.provider) {
      const provider = providerState.providerList.find(
        (provider) => provider.name === event.currentTarget.value
      );
      setProduct({ ...product, provider: provider! });
    } else {
      setProduct({ ...product, [field]: event.currentTarget.value });
    }
  }

  useEffect(() => {
    dispatch(buscarCategorias());
    dispatch(buscarProviders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addProducts() {
    dispatch(cadastrarProduto(product));
    if (status === STATE.PENDENTE) {
      return <Spinner />;
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
  }

  function resetForm() {
    setProduct(INITIAL_PRODUCTS_STATE);
  }

  function editProduct() {
    dispatch(atualizarProduto(product));
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

  if (
    categoryState.status === STATE.PENDENTE &&
    providerState.status === STATE.PENDENTE
  ) {
    return (
      <Container>
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
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
                  value={product.manufacturingDate.split('T')[0]}
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
                  value={product.category.name}
                >
                  <option value="">{translate.placeholders.category}</option>
                  {categoryState.categoriesList.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
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
                  value={product.provider.name}
                >
                  <option value="">{translate.placeholders.provider}</option>
                  {providerState.providerList.map((provider) => (
                    <option key={provider.name} value={provider.name}>
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
              onClick={() => {
                resetForm();
                setSelectedProduct(INITIAL_PRODUCTS_STATE);
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
