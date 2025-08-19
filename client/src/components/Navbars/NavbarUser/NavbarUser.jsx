import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import { UserIcon } from '../../UserIcon/UserIcon';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';

import './navbarUser.css';


export const NavbarUser = () => {

  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <Navbar className="navbar-public" expand="lg" fixed="top">
     <Container>
        <Navbar.Brand as={Link} to='/'>
             <img src={logoNav} 
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
          <div className="d-flex">
            <UserIcon />
            <button className="button-navbar"
                    onClick={onLogout}>Cierra Sesión</button>
          </div>
       </Navbar.Collapse>
     </Container>
   </Navbar>
  )
}
