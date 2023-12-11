import { ReactElement } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { translateMenu } from "./translations/ptBr";

export const Menu = (): ReactElement => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          {translateMenu.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={translateMenu.registerSelectLabel}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={translateMenu.routes.clients}>
                {translateMenu.clients}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={translateMenu.routes.provider}>
                {translateMenu.provider}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={translateMenu.routes.categories}>
                {translateMenu.categories}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={translateMenu.routes.products}>
                {translateMenu.products}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={translateMenu.registerOperationsLabel}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={translateMenu.routes.purchase}>
                {translateMenu.purchase}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={translateMenu.routes.sale}>
                {translateMenu.sales}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
