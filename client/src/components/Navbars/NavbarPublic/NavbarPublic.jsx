import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import './navbarPublic.css';

export const NavbarPublic = () => {

  // función navegar para utilizarla en los botones de register y login:
  const navigate = useNavigate();

  return (
    <Navbar className="navbar-public" expand="lg" sticky='top'>
     <Container>
        <Navbar.Brand as={Link} to="/">
             <img src={logoNav} 
                    alt="Ir a inicio"
                    className="logo-nav-class" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link className="align-text-bottom" as={Link} to='/'>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about">Conócenos</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacta</Nav.Link>
            <Nav.Link as={Link} to="/services">Servicios</Nav.Link>
          </Nav>
          <div className='d-flex flex-column flex-lg-row align-items-center row-gap-3'>
            <button className="button-navbar mt-2 mt-lg-0" onClick={()=>navigate("/register")}>Regístrate</button>
            <button className="button-navbar mb-1 mb-lg-0 ms-lg-2" onClick={()=>navigate("/login")}>Accede</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
