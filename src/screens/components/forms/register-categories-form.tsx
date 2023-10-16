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
import { CategoryFormEnum } from "./enums/category-form";
import { formsTranslates } from "./translations/ptBr";
import { TIMEOUT } from "./register-provider-form";
import Message from "../message/message";
import { INITIAL_CATEGORY_STATE, addCategory, updateCategory } from "../../../redux/categoryReducer";
import { useDispatch } from "react-redux";

const translate = formsTranslates.categoriesForm;

export interface Category {
  name: string;
  description: string;
}

export interface CategorieProps {
  setShowForm: (value: boolean) => void;
  selectedCategorie: Category;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategorie: React.Dispatch<React.SetStateAction<Category>>;
  categories: Category[];
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
  const dispatch = useDispatch();

  function addCategories() {
    dispatch(addCategory(category))
  }

  function editCategorie() {
    dispatch(updateCategory(category));
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
    }, TIMEOUT);
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
