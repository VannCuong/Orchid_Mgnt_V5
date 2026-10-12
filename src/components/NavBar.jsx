import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar expand="sm" className="site-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">✿</span>
          Orchid Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Orchids</Nav.Link>
            <Nav.Link as={Link} to="/orchids/new">Add orchid</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
