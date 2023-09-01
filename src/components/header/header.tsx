import { ReactElement } from "react";
import { Alert } from "react-bootstrap";

import { headerTranslates } from "./translations/ptBr";

interface props {
  content: string;
}

export const Header = ({ content }: props): ReactElement => {
  return (
    <header>
      <Alert variant="light"className={"text-center mb-0"}>
        {content ?? headerTranslates.defaultMessage}
      </Alert>
    </header>
  );
};
