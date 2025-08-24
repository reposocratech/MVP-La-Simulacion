import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import { UserIcon } from '../../UserIcon/UserIcon';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import './navbarUser.css';


export const NavbarUser = () => {

  // Sacamos el user y la función para desloguearse del contexto "AuthContext":
  const {user, logout} = useContext(AuthContext);

  // función navegar para utilizarla en el onClick del logout:
  const navigate = useNavigate();

  // Creamos un objeto para almacenar los campos del user que nos interesa pasar por props al componente "UserIcon":
  const navbarData = {
    userName: user.user_name,
    userType: Number(user.type),
    userAvatar: user.avatar
  }

  // Función que incluye el logout del context y además nos redirige al Home:
  const onLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <Navbar className="navbar-public" expand="lg" sticky="top">
     <Container>
        <Navbar.Brand as={Link} to='/'>
             <img src={logoNav} 
                    alt="Ir a inicio"
                    className='logo-nav-class' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto text-center text-lg-start">
            <Nav.Link className="align-text-bottom" as={Link} to='/'>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about">Conócenos</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacta</Nav.Link>
            <Nav.Link as={Link} to="/services">Servicios</Nav.Link>
          </Nav>
          <div className="d-flex flex-column flex-lg-row align-items-center row-gap-2">
            {/* Pasamos por props el objeto con los datos: */}
            <UserIcon 
                    navbarData={navbarData}
                    className="mt-2 mt-lg-0"/>
            <button className="button-navbar mb-1 mb-lg-0"
                    onClick={onLogout}> Cierra Sesión</button>
          </div>
       </Navbar.Collapse>
     </Container>
   </Navbar>
  )
}
