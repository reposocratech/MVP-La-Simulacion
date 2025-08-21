import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import { UserIcon } from '../../UserIcon/UserIcon';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';

import './navbarAdmin.css';

export const NavbarAdmin = () => {

  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const navbarData = {
    userName: user.user_name,
    userType: user.type,
    userAvatar: user.avatar
  }

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
                    className="logo-nav-class" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
            <NavDropdown title="Vistas Generales" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to="/">Inicio</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/about">Conócenos</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/contact">Contacta</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/services">Servicios</NavDropdown.Item>
           </NavDropdown>
           <NavDropdown title="Servicios" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to="/admin/events">Gestionar Servicios</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/admin/services">Gestionar Eventos/Talleres</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/admin/rooms">Gestionar Salas</NavDropdown.Item>
           </NavDropdown>
            <Nav.Link as={Link} to="/admin/users">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/admin/reservations">Reservas</Nav.Link>
          </Nav>
          <div className="d-flex">
            <UserIcon navbarData={navbarData}/>
            <button className="button-navbar"
                    onClick={onLogout}>Cierra Sesión</button>
          </div>
       </Navbar.Collapse>
     </Container>
   </Navbar>
  )
}
