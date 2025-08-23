import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { SpinnerLoading } from "../../../components/SpinnerLoading/SpinnerLoading";
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
        <Row className="pt-2 pb-3 pb-lg-0">
          <Col xs={12} lg={6}>
          <div className="spinner-web"></div>
            <article className="p-4 h-100">
              <h2 className="fs-4 text-center">Gestiones:</h2>
              <p>(Bloquear/activar usuarios, cambiar el estado de una reserva, mostrar u ocultar los contenidos publicados...)</p>
              <div className="buttons-container-1 d-flex flex-column gap-3">
                <button className="panel-button-gest panel-button-hover">Gestionar Usuarios</button>
                <button className="panel-button-gest-light panel-button-hover">Gestionar Reservas</button>
                <button className="panel-button-gest panel-button-hover">Gestionar Servicios</button>
                <button className="panel-button-gest-light panel-button-hover">Gestionar Eventos y talleres</button>
                <button className="panel-button-gest panel-button-hover">Gestionar Salas</button>
              </div>
            </article>
          </Col>
          <Col xs={12} lg={6}>
            <article className="p-4">
              <h2 className="fs-4 text-center">Creación/Edición de contenido:</h2>
              <p>(Añadir servicios, eventos/talleres, salas... o Editar los ya creados.)</p>
              <div className="buttons-container-1 d-flex flex-column gap-3">
                <button className="panel-button-create panel-button-hover">Crear Nuevo Servicio de la Cooperativa</button>
                <button className="panel-button-create-light panel-button-hover">Editar Serivicios de la Cooperativa</button>
                <button className="panel-button-create panel-button-hover">Crear Nuevo Evento o Taller</button>
                <button className="panel-button-create-light panel-button-hover">Editar Eventos y Talleres</button>
                <button 
                    className="panel-button-create panel-button-hover"
                    onClick={()=>navigate('/admin/createRoom')}>Crea Nueva Sala/Espacio</button>
                <button className="panel-button-create-light panel-button-hover">Editar Sala/Espacio</button>
              </div>
            </article>
          </Col>
        </Row>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <SpinnerLoading />
          <h1 className="fs-5 mt-3">En seguida estamos...</h1>
        </div>
      </Container>
    </section>
  )
}

export default AdminPanel;
