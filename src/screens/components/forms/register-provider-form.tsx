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
import { ProviderFormEnum } from "./enums/provider-form";
import { formsTranslates } from "./translations/ptBr";
import { INITIAL_PROVIDER_STATE, addProvider, updateProvider } from "../../../redux/providerReducer";
import Message from "../message/message";
import { useDispatch } from "react-redux";
interface ProvidersProps {
  setShowForm: (value: boolean) => void;
  selectedProvider: Provider;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProvider: React.Dispatch<React.SetStateAction<Provider>>;
}
export interface Provider {
  name: string;
  phoneNumber: string;
  email: string;
  website: string;
  description: string;
  document: string;
}

interface FormControlElement {
  value: string;
}

const translate = formsTranslates.providersForm;

export const TIMEOUT = 2000;

export const RegisterProviderForm = ({
  setShowForm,
  editMode,
  selectedProvider,
  setEditMode,
  setSelectedProvider,
}: ProvidersProps): ReactElement => {
  const [provider, setProvider] = useState<Provider>(selectedProvider);
  const [validated, setValidated] = useState(false);
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);
  const dispatch = useDispatch();

  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: ProviderFormEnum
  ) {
    setProvider({ ...provider, [field]: event.currentTarget.value });
  }

  function addProviders() {
    dispatch(addProvider(provider));
  }

  function resetForm() {
    setProvider(INITIAL_PROVIDER_STATE);
  }

  function editProvider() {
    dispatch(updateProvider(provider));
    setSelectedProvider(INITIAL_PROVIDER_STATE);
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
        addProviders();
      } else {
        editProvider();
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
                label={translate.labels.document}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.document}
                  id={ProviderFormEnum.document}
                  onChange={(event) => onChange(event, ProviderFormEnum.document)}
                  value={provider.document}
                  disabled={editMode}
                  required
                  maxLength={14}
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
                label={translate.labels.name}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.placeholders.name}
                  required
                  id={ProviderFormEnum.name}
                  value={provider.name}
                  onChange={(event) => onChange(event, ProviderFormEnum.name)}
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
                  value={provider.phoneNumber}
                  onChange={(event) =>
                    onChange(event, ProviderFormEnum.phoneNumber)
                  }
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
                  value={provider.email}
                  onChange={(event) => onChange(event, ProviderFormEnum.email)}
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
                  type="text"
                  placeholder={translate.placeholders.website}
                  id={ProviderFormEnum.website}
                  value={provider.website}
                  onChange={(event) =>
                    onChange(event, ProviderFormEnum.website)
                  }
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
                  value={provider.description}
                  onChange={(event) =>
                    onChange(event, ProviderFormEnum.description)
                  }
                />
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
