import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import logoNav from '../../../assets/logos/la-simulacion-logo-darkgreen.svg'
import './navbarPublic.css';

export const NavbarPublic = () => {

  const navigate = useNavigate();

  return (
     <Navbar className='navbar-public align-bottom'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
              <img src={`${logoNav}`} 
                    alt="Ir a inicio"
                    className='logo-nav-class' />
          </Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link className='align-text-bottom' as={Link} to='/'>Inicio</Nav.Link>
            <Nav.Link as={Link} to='/about'>Conócenos</Nav.Link>
            <Nav.Link as={Link} to='/contact'>Contacta</Nav.Link>
            <Nav.Link as={Link} to='/services'>Servicios</Nav.Link>
          </Nav>
          <div>
            <button className='button-navbar' onClick={()=>navigate('/register')}>Regístrate</button>
            <button className='button-navbar' onClick={()=>navigate('/login')}>Accede</button>
          </div>
        </Container>
      </Navbar>
  )
}
