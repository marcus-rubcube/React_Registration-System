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
import { INITIAL_CATEGORIE_STATE } from "../../register-categories/register-categories-screen";
import { TIMEOUT } from "./register-provider-form";
import Message from "../message/message";

const translate = formsTranslates.categoriesForm;

export interface Categorie {
  name: string,
  description: string
}

export interface CategorieProps {
  setShowForm: (value: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<Categorie[]>>;
  categories: Categorie[];
  selectedCategorie: Categorie;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategorie: React.Dispatch<React.SetStateAction<Categorie>>;
}

export const RegisterCategoriesForm = (props: CategorieProps): ReactElement => {




  const { setShowForm, setCategories, categories,
    selectedCategorie, editMode, setEditMode, setSelectedCategorie } = props

  const [categorie, setCategorie] = useState<Categorie>(selectedCategorie)
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);
  const [validated, setValidated] = useState(false);

  function addCategorie() {
    setCategories([...categories, categorie])
  }

  function editCategorie() {
    setCategories([
      ...categories.filter(
        (categorieItem) => categorieItem.name !== categorie.name
      ),
      categorie,
    ]);
    setSelectedCategorie(INITIAL_CATEGORIE_STATE);
  }

  function resetForm() {
    setCategorie(INITIAL_CATEGORIE_STATE);
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
        addCategorie();
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
        onSubmit={(event) => onSubmit(event)}>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                label={translate.labels.name}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.name}
                  id={CategoryFormEnum.name}
                  required
                  value={categorie.name}
                  onChange={(event) => {
                    setCategorie({
                      ...categorie,
                      name: event.currentTarget.value
                    })
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
                  value={categorie.description}
                  onChange={(event) => {
                    setCategorie({
                      ...categorie,
                      description: event.currentTarget.value
                    })
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
                resetForm()
                setSelectedCategorie(INITIAL_CATEGORIE_STATE);
                setEditMode(false);
                setShowForm(false);
              }}>
              {translate.buttons.goBack}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
