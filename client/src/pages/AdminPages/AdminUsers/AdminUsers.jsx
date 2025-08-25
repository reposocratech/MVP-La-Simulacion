import { Col, Container, Row } from "react-bootstrap";
import { CustomTable } from "../../../components/Table/CustomTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";
import './adminUsers.css';

//datos para pasar al componente table
// la key debe llamarse como el campo de la base de datos para que la identifique y la rellene con los datos que llegan
//label es el nombre que recibe el "titulo" de cada columna
const columns = [
  {key: "user_name", label: "Nombre"},
  {key: "lastname", label: "Apellidos"},
  {key: "email", label: "Email"},
  {
    key: "user_is_confirmed", 
    label: "Confirmado", 
    render: (row) => row.user_is_confirmed === 1 ? "Sí" : "No"
  },
  {
    key: "user_is_disabled", 
    label: "Bloqueado",
    render: (row) => row.user_is_disabled === 1 ? "Sí" : "No"
  },
  {
    key: "user_is_deleted", 
    label: "Borrado",
    render: (row) => row.user_is_deleted === 1 ? "Sí" : "No"
  },
  {key: "actions", label: "Acciones"}
];

const AdminUsers = () => {
  const { token } = useContext(AuthContext);

  const [usersData, setUsersData] = useState([]);
  const [status, setStatus] = useState();

  //función y hook para traer toda la información de usuarios
  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const res = await fetchData("/admin/users", "get", null, token);
        const users = res.data;

        //contadores
        const total = users.length;
        const disabled = users.filter(u => u.user_is_disabled === 1).length;
        const deleted = users.filter(u => u.user_is_deleted === 1).length;
        const pending = users.filter(u => u.user_is_confirmed === 0).length;

        setUsersData(users);
        setStatus({total, disabled, deleted, pending});
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <section className="section-admin-users">
      <Container>
        <h1><span>U</span>Gestión de usuarios</h1>
        <Row className="text-center gy-4 justify-content-center">
          <Col sm={9} md={6} lg={3}>
            <div className="d-flex flex-column justify-content-between h-100">
              <h2>Usuarios Totales</h2>
              <span>{status?.total}</span>
            </div>
          </Col>
           <Col sm={9} md={6} lg={3}>
            <div className="d-flex flex-column justify-content-between h-100">
              <h2>Usuarios Deshabilitados</h2>
              <span>{status?.disabled}</span>
            </div>
          </Col>
           <Col sm={9} md={6} lg={3}>
            <div className="d-flex flex-column justify-content-between h-100">
              <h2>Usuarios Borrados</h2>
              <span>{status?.deleted}</span>
            </div>
          </Col>
           <Col sm={9} md={6} lg={3}>
            <div className="d-flex flex-column justify-content-between h-100">
              <h2>Confirmaciones Pendientes</h2>
              <span>{status?.pending}</span>
            </div>
          </Col>
        </Row>

        <CustomTable 
          columns={columns}
          data={usersData}
        />
      </Container>
    </section>
  )
}

export default AdminUsers;