import { ReactElement } from "react";

import { Header } from "../header/header";
import { headerTranslates } from "../header/translations/ptBr";
import { Footer } from "../footer/footer";
import { footerTranslates } from "../footer/translations/ptBr";
import { Menu } from "../menu/menu";

interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps): ReactElement => {
  return (
    <div>
      <Header content={headerTranslates.mainTitle} />
      <Menu />
      <div>{children}</div>
      <Footer content={footerTranslates.companyInfos} />
    </div>
  );
};
