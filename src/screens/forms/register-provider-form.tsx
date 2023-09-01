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
import { ProviderFormEnum } from "./enums/provider-form";
import { formsTranslates } from "./translations/ptBr";

interface ProvidersProps {
  setShowForm: (value: boolean) => void;
}

const translate = formsTranslates.providersForm;

export const RegisterProviderForm = ({
  setShowForm,
}: ProvidersProps): ReactElement => {
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
                  required
                  id={ProviderFormEnum.name}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.address}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.address}
                  required
                  id={ProviderFormEnum.address}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.phoneNumber}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.phoneNumber}
                  required
                  id={ProviderFormEnum.phoneNumber}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.email}
                className="mb-3"
              >
                <FormControl
                  type="email"
                  placeholder={translate.placeholders.email}
                  required
                  id={ProviderFormEnum.email}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label={translate.labels.website}
                className="mb-3"
              >
                <FormControl
                  type="url"
                  placeholder={translate.placeholders.website}
                  id={ProviderFormEnum.website}
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
              >
                <FormControl
                  as="textarea"
                  placeholder={translate.placeholders.description}
                  style={{ height: "100px" }}
                  id={ProviderFormEnum.description}
                />
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
