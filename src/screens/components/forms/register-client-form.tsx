import { ReactElement, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import {
  ViaCepResponse,
  fetchAddressByZipCode,
} from "../../../api/via-cep/via-cep-service";
import { documentFormatter } from "../../../utils/document-formatter";
import { zipCodeFormatter } from "../../../utils/zipcode-formatter";
import { ClientFormEnum } from "./enums/client-form";
import { formsTranslates } from "./translations/ptBr";
import { INITIAL_CLIENT_STATE } from "../../register-client/register-client-screen";

interface ClientsProps {
  setShowForm: (value: boolean) => void;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  clients: Client[];
  selectedClient: Client;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client>>;
}

export interface Client {
  document: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  uf: string;
  number: string;
  zipCode: string;
}

interface FormControlElement {
  value: string;
}

const translate = formsTranslates.clientForms;

export const RegisterClientForm = ({
  setShowForm,
  clients,
  setClients,
  editMode,
  selectedClient,
  setSelectedClient,
  setEditMode,
}: ClientsProps): ReactElement => {
  const federalUnits = [
    { value: "SP", label: translate.federalUnits.SP },
    { value: "AC", label: translate.federalUnits.AC },
    { value: "AL", label: translate.federalUnits.AL },
    { value: "AP", label: translate.federalUnits.AP },
    { value: "AM", label: translate.federalUnits.AM },
    { value: "BA", label: translate.federalUnits.BA },
    { value: "CE", label: translate.federalUnits.CE },
    { value: "DF", label: translate.federalUnits.DF },
    { value: "ES", label: translate.federalUnits.ES },
    { value: "GO", label: translate.federalUnits.GO },
    { value: "MA", label: translate.federalUnits.MA },
    { value: "MT", label: translate.federalUnits.MT },
    { value: "MS", label: translate.federalUnits.MS },
    { value: "MG", label: translate.federalUnits.MG },
    { value: "PA", label: translate.federalUnits.PA },
    { value: "PB", label: translate.federalUnits.PB },
    { value: "PR", label: translate.federalUnits.PR },
    { value: "PE", label: translate.federalUnits.PE },
    { value: "PI", label: translate.federalUnits.PI },
    { value: "RJ", label: translate.federalUnits.RJ },
    { value: "RN", label: translate.federalUnits.RN },
    { value: "RS", label: translate.federalUnits.RS },
    { value: "RO", label: translate.federalUnits.RO },
    { value: "RR", label: translate.federalUnits.RR },
    { value: "SC", label: translate.federalUnits.SC },
    { value: "SE", label: translate.federalUnits.SE },
    { value: "TO", label: translate.federalUnits.TO },
    { value: "EX", label: translate.federalUnits.EX },
  ];

  const [client, setClient] = useState<Client>(selectedClient);
  const [validated, setValidated] = useState(false);
  const [showSuccessRegister, setShowSuccessRegister] = useState(false);

  function onChange(
    event: React.ChangeEvent<FormControlElement>,
    field: ClientFormEnum
  ) {
    if (field === ClientFormEnum.document) {
      const formattedDocument = documentFormatter(event.currentTarget.value);
      setClient({ ...client, [field]: formattedDocument });
    } else if (field === ClientFormEnum.zipCode) {
      const formattedZipCode = zipCodeFormatter(event.currentTarget.value);
      setClient({ ...client, [field]: formattedZipCode });
    } else {
      setClient({ ...client, [field]: event.currentTarget.value });
    }
  }

  function addClient() {
    setClients([...clients, client]);
  }

  function editClient() {
    setClients([
      ...clients.filter(
        (clientItem) => clientItem.document !== client.document
      ),
      client,
    ]);
    setSelectedClient(INITIAL_CLIENT_STATE);
  }

  function resetForm(){
    setClient(INITIAL_CLIENT_STATE);
  }

  function onSuccessAction() {
    setShowSuccessRegister(true);
    setTimeout(() => {
      setShowSuccessRegister(false);
      if (editMode) {
        setShowForm(false);
      }
      setEditMode(false);
    }, 2000);
    setValidated(false);
    resetForm();
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      if (!editMode) {
        addClient();
      } else {
        editClient();
      }
      onSuccessAction();
    } else {
      setValidated(true);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  async function getAddressInfos() {
    if (client.zipCode) {
      await fetchAddressByZipCode(client.zipCode)
        .then((res: ViaCepResponse) => {
          setClient({
            ...client,
            address: res.logradouro,
            city: res.localidade,
            neighborhood: res.bairro,
            uf: res.uf,
          });
        })
        .catch((err) => console.log(err));
    }
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
                label={translate.formLabels.document}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.formPlaceholder.document}
                  id={ClientFormEnum.document}
                  onChange={(event) => onChange(event, ClientFormEnum.document)}
                  value={client.document}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.document}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label={translate.formLabels.name} className="mb-3">
                <FormControl
                  type="text"
                  placeholder={translate.formPlaceholder.name}
                  id={ClientFormEnum.name}
                  required
                  onChange={(event) => onChange(event, ClientFormEnum.name)}
                  value={client.name}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel
                label={translate.formLabels.zipCode}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.formLabels.zipCode}
                  id={ClientFormEnum.zipCode}
                  onChange={(event) => onChange(event, ClientFormEnum.zipCode)}
                  value={client.zipCode}
                  required
                  onBlur={getAddressInfos}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.zipCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <Form.Group>
              <FloatingLabel
                label={translate.formLabels.address}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.formPlaceholder.address}
                  id={ClientFormEnum.address}
                  onChange={(event) => onChange(event, ClientFormEnum.address)}
                  value={client.address}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <FloatingLabel
                label={translate.formLabels.number}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.formPlaceholder.number}
                  id={ClientFormEnum.number}
                  onChange={(event) => onChange(event, ClientFormEnum.number)}
                  value={client.number}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.number}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel
                label={translate.formLabels.neighborhood}
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder={translate.formPlaceholder.neighborhood}
                  id={ClientFormEnum.neighborhood}
                  onChange={(event) =>
                    onChange(event, ClientFormEnum.neighborhood)
                  }
                  value={client.neighborhood}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.neighborhood}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group>
              <FloatingLabel label={translate.formLabels.city} className="mb-3">
                <FormControl
                  type="text"
                  placeholder={translate.formPlaceholder.city}
                  id={ClientFormEnum.city}
                  onChange={(event) => onChange(event, ClientFormEnum.city)}
                  value={client.city}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {translate.feedbackMessage.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <FloatingLabel label={translate.formLabels.uf} className="mb-3">
              <Form.Select
                aria-label={translate.formLabels.ufAriaLabel}
                id={ClientFormEnum.uf}
                onChange={(event) => onChange(event, ClientFormEnum.uf)}
                value={client.uf}
              >
                {federalUnits.map((uf) => (
                  <option key={uf.value} value={uf.value}>
                    {uf.label}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        {showSuccessRegister && (
          <Row>
            <Alert variant={editMode ? "info" : "success"}>
              {editMode
                ? translate.successOnUpdate
                : translate.successOnRegister}
            </Alert>
          </Row>
        )}
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
                setSelectedClient(INITIAL_CLIENT_STATE);
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
