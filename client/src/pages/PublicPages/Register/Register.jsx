import { useState } from "react"
import {Col, Container, Form, Row} from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { fetchData } from "../../../helpers/axiosHelper"
import { registerSchema } from "../../../schemas/registerSchema"
import { validateForms } from "../../../helpers/validateForms"
import { PiEyeClosed , PiEye } from "react-icons/pi";
import "./register.css"

const initialValue = {
  user_name: "",
  email: "",
  password:"",
  repPassword: ""
}


const Register = () => {
  const [register, setRegister] = useState(initialValue)
  const [valErrors, setValErrors] = useState({})
  const [msgError, setMsgError] = useState()
  const [seePass, setseePass] = useState(false) 
  const [seePassRep, setseePassRep] = useState(false) 
  const navigate = useNavigate() 
    
  
  const handleChange = (e)=>{
    const {name , value} = e.target
    setRegister({...register, [name] : value})
  }
   
  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
        //Comprobación de que los datos metidos se cumplan
        const {valid, errors} = validateForms(registerSchema , register)
        setValErrors(errors)
        //Esperando respuesta de la base de datos
        if(valid){
        let res = await fetchData("/users/register","post", register)
        navigate("/login")}
  } 
    catch (error) {        
        setValErrors({});
        setMsgError(error.response.data);
  }}

  return (    
     <section className='section-register d-flex  justify-content-center ' >
      <Container fluid>
        <Row>
           <h1 className="h1-register text-center text-light p-2 w-100">Crea una cuenta <span className='span-register accent-text align-middle'>C</span></h1>
          <Col className="d-flex justify-content-center">
              <Form className="form-register border border-2 rounded rounded-3 mb-2" >
                <Form.Group className="form-group-custom" controlId="formBasicName">
                  <Form.Label className="fw-bold">Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange}
                    value={register.user_name}
                    name="user_name"
                    />
                    {valErrors.user_name && <Form.Text className="text-error">{valErrors.user_name}</Form.Text>}
                </Form.Group>
                <Form.Group className="form-group-custom" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="porejemplo@tucorreo.com"
                    onChange={handleChange}
                    value={register.email}
                    name="email"
                    />
                    {valErrors.email && <Form.Text className="text-error">{valErrors.email}</Form.Text>}
                </Form.Group>
                <Form.Group className="form-group-custom" controlId="formBasicPassword">
                  <Form.Label className="fw-bold">Contraseña: </Form.Label>
                  <div className="passPos">
                    <Form.Control
                      type={seePass === false ? "password" : "text"}
                      placeholder="Tu contraseña"
                      onChange={handleChange}
                      value={register.password}
                      name="password"
                    />
                    <button
                      type="button" 
                      className="iconPos" 
                      onClick={()=>setseePass(!seePass)}
                      aria-label={seePass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                    {seePass===true? <PiEye /> :<PiEyeClosed />} </button>
                  </div>
                      {valErrors.password && <Form.Text className="text-error">{valErrors.password}</Form.Text>}
                </Form.Group>
                <Form.Group className="form-group-custom" controlId="formBasicRepPassword">
                  <Form.Label className="fw-bold" >Repite tu Contraseña: </Form.Label>
                  <div className="passPos">
                    <Form.Control
                    type="password"
                    placeholder="Tu contraseña"
                    onChange={handleChange}
                    value={register.repPassword}
                    name="repPassword"
                    />
                    <button
                    type="button" 
                    className="iconPos" 
                    onClick={()=>setseePassRep(!seePassRep)}
                    aria-label={seePassRep ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                    {seePassRep===true? <PiEye /> :<PiEyeClosed />} </button>
                  </div>
                    {valErrors.repPassword && <Form.Text className="text-error">{valErrors.repPassword}</Form.Text>}
                </Form.Group>
                    {msgError && <p className="text-danger fw-bold">{msgError}</p>}
                    <button className="submit-button w-100" onClick={onSubmit}>
                      Aceptar
                    </button>
                    <p className="mt-3"> <Link to="/login"> ¿Ya tienes una cuenta?Inicia sesión aqui</Link> </p>
              </Form>
          </Col>
        </Row>
      </Container>
    </section>
    )
    }

export default Register;
