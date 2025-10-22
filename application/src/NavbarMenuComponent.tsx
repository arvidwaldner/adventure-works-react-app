import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faHome, faLocation, faUsers, faStore, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "wouter";
import { Navbar, Nav, Container } from 'react-bootstrap';

const navigation = [
  { name: 'Home', href: '/.', icon: faHome },
  { name: 'Departments', href: '/departments', icon: faUsers },
  { name: 'Locations', href: '/locations', icon: faLocation },
  { name: 'Product Categories', href: '/product-categories', icon: faBoxes },
  { name: 'Products', href: '/products', icon: faBoxOpen },
  { name: 'Stores', href: '/stores', icon: faStore }
]

const NavbarMenu = () => {
    const [location] = useLocation();
    const normalize = (p: string) => p.replace(/\/\.$/, '/'); // optional safety

    return (
        <>
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-3" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">Adventure Works</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarColor01" />
            <Navbar.Collapse id="navbarColor01">
              <Nav className="me-auto">
                {navigation.map((item) => {
                  const isActive = normalize(item.href) === normalize(location);
                  return (
                    <Nav.Link
                      key={item.name}
                      as={Link}
                      to={item.href}
                      active={isActive}
                    >
                      {item.name}
                      {item.icon && <FontAwesomeIcon icon={item.icon} className="ms-2" />}
                      {isActive && <span className="visually-hidden">(current)</span>}
                    </Nav.Link>
                  )
                })}
                </Nav>                
            </Navbar.Collapse>
          </Container>
        </Navbar>        
        </>
    );
};

export default NavbarMenu;