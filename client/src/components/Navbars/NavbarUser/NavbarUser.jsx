import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import './navbarUser.css';

export const NavbarUser = () => {

  const navigate = useNavigate();

  return (
    <Navbar className="navbar-public" expand="lg">
     <Container fluid className="px-4">
        <Navbar.Brand as={Link} to='/'>
             <img src={`${logoNav}`} 
                    alt="Ir a inicio"
                    className='logo-nav-class' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
            <Nav.Link className="align-text-bottom" as={Link} to='/'>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about">Conócenos</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacta</Nav.Link>
            <Nav.Link as={Link} to="/services">Servicios</Nav.Link>
          </Nav>
          <div>
            <button className="button-navbar">User Icon</button>
            <button className="button-navbar">Cierra Sesión</button>
          </div>
       </Navbar.Collapse>
     </Container>
   </Navbar>
  )
}
