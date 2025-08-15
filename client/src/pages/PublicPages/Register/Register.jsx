import { useState } from "react"
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { fetchData } from "../../../helpers/axiosHelper"

const initialValue = {
  user_name: "",
  email: "",
  password:"",
  repPassword: ""
}


const Register = () => {
  const [register, setRegister] = useState(initialValue)

  const navigate = useNavigate() 
    
  const handleChange = (e)=>{
    const {name , value} = e.target
    setRegister({...register, [name] : value})
      }
    const onSubmit =async ()=>{
      try {
        let res = await fetchData("/users/register","post", register)
        navigate("/login")
        
        
      } catch (error) {
        console.log("axios" ,error);
        }
      }  
  return (

   <section className="section-ppal">
      <Container>
        <Row className="d-flex align-items-center p-5">
          <Col md={12} lg={6}>
            <div className="image-form">
              <img src="/assets/images/001.jpg" alt="" />
            </div>
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
                </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter password" 
                  onChange={handleChange}
                  value={register.password}
                  name="password"
                  />
             </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRepPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Repeat password" 
                  onChange={handleChange}
                  value={register.repPassword}
                  name="repPassword"
                  />
              </Form.Group>
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
