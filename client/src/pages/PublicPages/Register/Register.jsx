import { useState } from "react"
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap"
import { Link} from "react-router"
import { fetchData } from "../../../helpers/axiosHelper"
import { registerSchema } from "../../../schemas/registerSchema"
import { validateForms } from "../../../helpers/validateForms"
import { LuEye, LuEyeClosed } from "react-icons/lu"
import "./register.css"
import flor from '../../../assets/decorative/flor-redondeada.svg';
import destellos from '../../../assets/decorative/pareja-destellos.svg';

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
  const [msgRembr, setMsgRembr] = useState("")
  
  
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
        setMsgRembr("Te hemos enviado un email de confirmación , Verificalo")
        }
  }
    catch (error) {
        setValErrors({});
        setMsgError(error.response.data);
  }}
  
  return (
     <section className='section-register d-flex  justify-content-center ' >
      <Container fluid>
        <Row>          
           <h1 className="h1-register text-center text-light p-2 my-5 w-100">Crea una cuenta <span className='span-register accent-text align-middle'>C</span></h1>
          <Col className="d-flex justify-content-center">
           <div className="form-container p-2">
              <img src={flor} alt="" className='flor-register' />
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
                  <InputGroup className="mb-3">
                    <Form.Control
                    type={seePass === false ? "password" : "text"}
                    placeholder="Tu contraseña"
                    onChange={handleChange}
                    value={register.password}
                    name="password"
                    />
                    <InputGroup.Text id="basic-addon2"><span onClick={()=>setseePass(!seePass)}>{seePass === true ? <LuEyeClosed /> : <LuEye />}</span></InputGroup.Text>
                  </InputGroup>
                      {valErrors.password && <Form.Text className="text-error">{valErrors.password}</Form.Text>}
                </Form.Group>
                <Form.Group className="form-group-custom" controlId="formBasicRepPassword">
                  <Form.Label className="fw-bold" >Repite tu Contraseña: </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                    type={seePassRep === false ? "password" : "text"}
                    placeholder="Tu contraseña"
                    onChange={handleChange}
                    value={register.repPassword}
                    name="repPassword"
                    />
                    <InputGroup.Text id="basic-addon2"><span onClick={()=>setseePassRep(!seePassRep)}>{seePassRep === true ? <LuEyeClosed /> : <LuEye />}</span></InputGroup.Text>
                   </InputGroup>
                    {valErrors.repPassword && <Form.Text className="text-error">{valErrors.repPassword}</Form.Text>}
                </Form.Group>
                    {msgError && <p className="text-danger fw-bold">{msgError}</p>}
                    <button className="submit-button w-100" onClick={onSubmit}>
                      Aceptar
                    </button>
                    {msgRembr? <p className="msg-ok-form">{msgRembr} </p> : ""}
                    <p className="mt-3"> <Link to="/login"> ¿Ya tienes una cuenta?Inicia sesión aqui</Link> </p>
              </Form>
              <img src={destellos} alt="" className='destellos-register' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    )
}
                     
export default Register;
