import { Col, Container, Row } from "react-bootstrap";
import { CustomTable } from "../../../components/Table/CustomTable";
import './adminUsers.css';

const columns = [
  {key: "name", label: "Nombre"},
  {key: "lastname", label: "Apellidos"},
  {key: "email", label: "Email"},
  {key: "confirm", label: "Confirmado"},
  {key: "blocked", label: "Bloqueado"},
  {key: "deleted", label: "Borrado"},
  {key: "actions", label: "Acciones"}
];

const AdminUsers = () => {
  return (
    <section className="section-admin-users">
      <Container>
        <h1><span>U</span>Gestión de usuarios</h1>
        <Row className="text-center">
          <Col md={6} lg={3}>
            <div>
              <h2>Usuarios Totales</h2>
              <span>4</span>
            </div>
          </Col>
           <Col md={6} lg={3}>
            <div>
              <h2>Usuarios Deshabilitados</h2>
              <span>4</span>
            </div>
          </Col>
           <Col md={6} lg={3}>
            <div>
              <h2>Usuarios Borrados</h2>
              <span>4</span>
            </div>
          </Col>
           <Col md={6} lg={3}>
            <div>
              <h2>Confirmaciones Pendientes</h2>
              <span>4</span>
            </div>
          </Col>
        </Row>

        <CustomTable columns={columns}/>
      </Container>
    </section>
  )
}

export default AdminUsers;