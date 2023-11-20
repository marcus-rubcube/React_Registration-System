import { ThunkDispatch } from "@reduxjs/toolkit";
import { ReactElement, useState } from "react";
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
import { useToasts } from "react-toast-notifications";
import { AnyAction } from "redux";
import {
  CategoryState,
  INITIAL_CATEGORY_STATE,
  atualizarCategoria,
  cadastrarCategoria,
} from "../../../redux/categoryReducer";
import { ReduxState } from "../../../redux/types";
import STATE from "../../../resources/state";
import Message from "../message/message";
import { CategoryFormEnum } from "./enums/category-form";
import { formsTranslates } from "./translations/ptBr";

const translate = formsTranslates.categoriesForm;

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategorieProps {
  setShowForm: (value: boolean) => void;
  selectedCategorie: Category;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategorie: React.Dispatch<React.SetStateAction<Category>>;
}

export const RegisterCategoriesForm = (props: CategorieProps): ReactElement => {
  const {
    setShowForm,
    selectedCategorie,
    editMode,
    setEditMode,
    setSelectedCategorie,
  } = props;

  const [category, setCategory] = useState<Category>(selectedCategorie);
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);
  const [validated, setValidated] = useState(false);
  const { addToast, removeAllToasts } = useToasts();
  const { status, message } = useSelector(
    (state: ReduxState) => state.categories
  );
  const dispatch: ThunkDispatch<CategoryState, any, AnyAction> = useDispatch();

  function addCategories() {
    dispatch(cadastrarCategoria(category));
    if (status === STATE.PENDENTE) {
      return <Spinner />;
    } else if (status === STATE.OCIOSO) {
      onSuccessAction();
    } else {
      addToast(message, { appearance: "error" });
      setTimeout(() => {
        removeAllToasts();
      }, 2000);
    }
  }

  function editCategorie() {
    dispatch(atualizarCategoria(category));
    if (status === STATE.PENDENTE) {
      return (
        <Container className="mt-4">
          <Spinner animation="border" role="status"></Spinner>
        </Container>
      );
    } else if (status === STATE.OCIOSO) {
      onSuccessAction();
    } else {
      addToast(message, { appearance: "error" });
      setTimeout(() => {
        removeAllToasts();
      }, 2000);
    }
    setSelectedCategorie(INITIAL_CATEGORY_STATE);
  }

  function resetForm() {
    setCategory(INITIAL_CATEGORY_STATE);
  }

  function onSuccessAction() {
    setShowSuccessRegister(true);
    setTimeout(() => {
      setShowSuccessRegister(false);
      if (editMode) {
        setShowForm(false);
      }
      setEditMode(false);
    }, 3000);
    setValidated(false);
    resetForm();
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      if (!editMode) {
        addCategories();
      } else {
        editCategorie();
      }
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
              <FloatingLabel label={translate.labels.name} className="mb-3">
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.name}
                  id={CategoryFormEnum.name}
                  required
                  value={category.name}
                  onChange={(event) => {
                    setCategory({
                      ...category,
                      name: event.currentTarget.value,
                    });
                  }}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedback.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                label={translate.labels.description}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.description}
                  id={CategoryFormEnum.description}
                  value={category.description}
                  onChange={(event) => {
                    setCategory({
                      ...category,
                      description: event.currentTarget.value,
                    });
                  }}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedback.description}
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
                setSelectedCategorie(INITIAL_CATEGORY_STATE);
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
