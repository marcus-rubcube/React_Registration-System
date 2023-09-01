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
import { CategoryFormEnum } from "./enums/category-form";
import { formsTranslates } from "./translations/ptBr";

const translate = formsTranslates.categoriesForm;

interface props {
    setShowForm: (value: boolean) => void;
}

export const RegisterCategoriesForm = ({ setShowForm }: props): ReactElement => {
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
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.name}
                  id={CategoryFormEnum.name}
                  required
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
                controlId="floatingInput"
                label={translate.labels.description}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.description}
                  id={CategoryFormEnum.description}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedback.description}
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
