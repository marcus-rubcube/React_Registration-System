import { Alert, Container } from "react-bootstrap";
import { Page } from "../../common/components/page/page";
import { notFoundTranslate } from "./translations/ptBr";

export const NotFoundScreens = () => {
  return (
    <Page>
      <Container className="mt-4">
        <Alert variant="danger">{notFoundTranslate.message}</Alert>
      </Container>
    </Page>
  );
};
