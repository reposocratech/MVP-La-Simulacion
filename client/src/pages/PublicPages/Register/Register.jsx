import { useState } from "react"
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { fetchData } from "../../../helpers/axiosHelper"
import { registerSchema } from "../../../../schemas/registerSchema"
import { ZodError } from "zod"

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
  const navigate = useNavigate() 
    
  const handleChange = (e)=>{
    const {name , value} = e.target
    setRegister({...register, [name] : value})
      }
   
    const onSubmit = async ()=>{
      try {
        registerSchema.parse(register)
        
        let res = await fetchData("/users/register","post", register)
        navigate("/login")
        
        
      } catch (error) {
        console.log("axios" ,error);
      if(error instanceof ZodError){
        let objTemp = {}
      error.issues.forEach((err)=>{
        objTemp[err.path[0]]=err.message
      })
      setValErrors(objTemp)

      }else{
        setValErrors({})
        setMsgError(error.response.data)
      }
        }
      }  
  return (

   <section >
      <Container>
        <Row className="d-flex align-items-center p-5">
          <Col md={12} lg={6}>
          </Col>
          <Col md={12} lg={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter name" 
                  onChange={handleChange}
                  value={register.user_name}
                  name="user_name"
                />
                {valErrors.user_name && <Form.Text className="text-danger">{valErrors.user_name}</Form.Text>}
                </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter email" 
                  onChange={handleChange}
                  value={register.email}
                  name="email"
                  />
                 {valErrors.email && <Form.Text className="text-danger">{valErrors.email}</Form.Text>}
                </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password <span onClick={()=>setseePass(!seePass)}>{seePass===true? "🍟":"🥔"} </span></Form.Label>
                <Form.Control 
                  type={seePass === false ? "password" : "text"}   
                  placeholder="Enter password" 
                  onChange={handleChange}
                  value={register.password}
                  name="password"
                  />
                   {valErrors.password && <Form.Text className="text-danger">{valErrors.password}</Form.Text>}
             </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRepPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Repeat password" 
                  onChange={handleChange}
                  value={register.repPassword}
                  name="repPassword"
                  />
                 {valErrors.repPassword && <Form.Text className="text-danger">{valErrors.repPassword}</Form.Text>}
              </Form.Group>
              {msgError && <p className="text-danger fw-bold">{msgError}</p>}
                <Button
                variant="primary"
                onClick={onSubmit}
              >
                Registrarse
              </Button>
            </Form>
            <p>Si ya estás registrado <Link to="/login">Login aquí</Link> </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register;
