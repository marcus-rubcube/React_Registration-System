import { Alert, Row } from "react-bootstrap";
import { useEffect } from "react";

interface MessageProps {
  message: string;
  type: string;
  setShowMessage: (value: boolean) => void;
}

const TIMEOUT = 2000;

export default function Message({
  message,
  type,
  setShowMessage,
}: MessageProps) {
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, TIMEOUT);
  }, [setShowMessage]);

  return (
    <Row>
      <Alert variant={type}>
        <p>{message}</p>
      </Alert>
    </Row>
  );
}
