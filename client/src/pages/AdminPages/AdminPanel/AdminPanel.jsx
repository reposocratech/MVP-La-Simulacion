import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import './adminPanel.css';


const AdminPanel = () => {

  //función navegar para los "onClick" de los botones del panel
  const navigate = useNavigate();
  
  return (
    <section className="section-panel">
      <Container>
        <h1 className="text-center">
        <span className="accent-text spanLetter-panel">PA</span>
          Panel de Administrador
        </h1>
        <Row className="pt-0 pt-lg-3 pb-3 pb-lg-0">
          <Col xs={12} lg={6}>
            <article className="p-4 h-100">
              <h2 className="fs-4 text-center">Gestión de usuarios y reservas:</h2>
              <p>(Gestión de usuarios administradores, bloquear/activar usuarios, cambiar el estado de una reserva...)</p>
              <div className="buttons-container-1 d-flex flex-column gap-3">
                <button 
                  className="panel-button-gest panel-button-hover"
                  onClick={()=>navigate('/admin/admins')}
                  >Gestionar Administradores</button>
                <button 
                  className="panel-button-gest-light panel-button-hover"
                  onClick={()=>navigate('/admin/users')}
                >Gestionar Usuarios</button>
                <button 
                  className="panel-button-gest panel-button-hover"
                  onClick={()=>navigate('/admin/reservations')}
                  >Gestionar Reservas</button>
              </div>
            </article>
          </Col>
          <Col xs={12} lg={6}>
            <article className="p-4">
              <h2 className="fs-4 text-center">Creación/Edición/Borrado de contenidos:</h2>
              <p>(Añadir servicios, eventos/talleres, salas... o Editar/Borrar los ya creados.)</p>
              <div className="buttons-container-1 d-flex flex-column gap-3">
                <button 
                    className="panel-button-create panel-button-hover"
                    onClick={()=>navigate('/admin/services')}>Servicios de la Cooperativa</button>
                <button 
                    className="panel-button-create-light panel-button-hover"
                    onClick={()=>navigate('/admin/events')}>Eventos y Talleres</button>
                <button 
                    className="panel-button-create panel-button-hover"
                    onClick={()=>navigate('/admin/rooms')}>Salas/Espacios</button>
               
              </div>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AdminPanel;
