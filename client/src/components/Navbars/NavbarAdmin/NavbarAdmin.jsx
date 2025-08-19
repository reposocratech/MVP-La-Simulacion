import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import './navbarAdmin.css';

export const NavbarAdmin = () => {

  const navigate = useNavigate();

  return (
    <Navbar className="navbar-public" expand="lg">
     <Container fluid className="px-4">
        <Navbar.Brand as={Link} to='/'>
             <img src={`${logoNav}`} 
                    alt="Ir a inicio"
                    className="logo-nav-class" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
            <NavDropdown title="Vistas Usuario" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to="/">Inicio</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/about">Conócenos</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/contact">Contacta</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/services">Servicios</NavDropdown.Item>
           </NavDropdown>
           <NavDropdown title="Gestión Servicios" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to="/admin/events">Eventos-Talleres</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/admin/services">Servicios Coop.</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/admin/rooms">Salas</NavDropdown.Item>
           </NavDropdown>
            <Nav.Link as={Link} to="/admin/users">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/admin/reservations">Reservas</Nav.Link>
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
