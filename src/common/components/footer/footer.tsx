import { FooterContainer, FooterText, Wrapper } from "./footer.styles";
import { footerTranslates } from "./translations/ptBr";

interface FooterProps {
  content: string;
}

export const Footer = ({ content }: FooterProps) => {
  return (
    <FooterContainer>
      <Wrapper>
        <FooterText>{content ?? footerTranslates.defaultMessage}</FooterText>
      </Wrapper>
    </FooterContainer>
  );
};
