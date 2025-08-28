import { Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { CustomTable } from "../../../components/Table/CustomTable";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import { AuthContext } from "../../../context/AuthContextProvider";
import { PiEyeClosed , PiEye } from "react-icons/pi";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { validateForms } from "../../../helpers/validateForms";
import { registerSchema } from "../../../schemas/registerSchema";
import './adminadmins.css';

const initialValue = {
  user_name: "",
  email:"", 
  password: "",
  repPassword:""
}

const AdminAdmins = () => {
  const { token } = useContext(AuthContext);

  const [adminsData, setAdminsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [register, setRegister] = useState(initialValue);
  const [seePass, setSeePass] = useState(false);
  const [seePassRep, setSeePassRep] = useState(false);
  const [valErrors, setValErrors] = useState({});
  const [msgError, setMsgError] = useState();

  useEffect(() => {
    const fetchAdmins = async() => {
      try {
        const res = await fetchData("/admin/admins", "get", null, token);
        setAdminsData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
  }

  const handleShowForm = () => {
    if (showForm) {
      setRegister(initialValue);
      setValErrors({});
    }
    setShowForm(!showForm);
  }

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const { valid, errors } = validateForms(registerSchema, register);
      setValErrors(errors);

      if (valid) {
        const res = await fetchData("/admin/registerAdmin", "post", register, token);
        setAdminsData((prev) => [...prev, res.data]);
        setShowForm(false);
        setRegister(initialValue);
      }

    } catch (error) {
      console.log(error);
      setValErrors({});
      setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  const removeAdmin = async(id) => {
    try {
      const values = { id };
      const res = await fetchData(`/admin/removeAdmin`, "put", values, token);
      setAdminsData(adminsData.filter(e => e.user_id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {key: "user_name", label: "Nombre"},
    {key: "email", label: "Email"},
    {
      key: "actions", 
      label: "Acciones",
      render: (row) => (
        <button
          className="btn-table block"
          onClick={() => removeAdmin(row.user_id)}
          disabled={row.user_id === 1}
        >Deshabilitar</button>
      )
    }
  ];

  return (
    <section className="section-admin-admins">
      <Container>
        <h1><span>A</span>Gestión de administradoras</h1>
        <Row className="justify-content-between gap-3">
          <Col lg={6}>
            <CustomTable 
              columns={columns}
              data={adminsData}
            />
          </Col>

          <Col lg={4}>
            <div className="my-5">
              <button
                className="create-button w-100"
                onClick={handleShowForm}
              >Crear Administradora</button>
            </div>
            <AnimatePresence>
            {showForm && 
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form className="border border-2 rounded-4 p-3" onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label className="fw-bold">Nombre:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Nombre" 
                        onChange={handleChange}
                        value={register.user_name}
                        name="user_name"
                      />
                      {valErrors.user_name && <Form.Text className="text-danger">{valErrors.user_name}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="fw-bold">Email:</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="porejemplo@tucorreo.com"
                        onChange={handleChange}
                        value={register.email}
                        name="email"
                      />
                      {valErrors.email && <Form.Text className="text-danger">{valErrors.email}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="fw-bold">Contraseña:</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control 
                          type={seePass === false ? "password" : "text"}
                          placeholder="Tu contraseña"
                          onChange={handleChange}
                          value={register.password}
                          name="password"
                        />
                        <InputGroup.Text id="basic-addon2"><span onClick={()=>setSeePass(!seePass)}>{seePass === true ? <LuEyeClosed /> : <LuEye />}</span></InputGroup.Text>
                      </InputGroup>
                      {valErrors.password && <Form.Text className="text-danger">{valErrors.password}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicRepPassword">
                      <Form.Label className="fw-bold">Repite la contraseña:</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control 
                          type={seePassRep === false ? "password" : "text"} 
                          placeholder="Repite tu contraseña"
                          onChange={handleChange}
                          value={register.repPassword}
                          name="repPassword"
                        />
                        <InputGroup.Text id="basic-addon2"><span onClick={()=>setSeePassRep(!seePassRep)}>{seePassRep === true ? <LuEyeClosed /> : <LuEye />}</span></InputGroup.Text>
                      </InputGroup>
                      {valErrors.repPassword && <Form.Text className="text-danger">{valErrors.repPassword}</Form.Text>}
                    </Form.Group>
                    {msgError && <p className="text-danger">{msgError}</p>}
                    <div className="w-100">
                      <button 
                        className="submit-button w-100"
                        onClick={onSubmit}
                        type="submit"
                      >Enviar</button>
                    </div>
                  </Form>
                </motion.div>
            }
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AdminAdmins;