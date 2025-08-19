import { useState } from "react"
import {Button, Form} from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { fetchData } from "../../../helpers/axiosHelper"
import { registerSchema } from "../../../schemas/registerSchema"
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
    <>
     <h2 className="text-center bg-primary mt-5 text-light p-3">Crea una cuenta 😎</h2>
   <section className='d-flex flex-wrap justify-content-center p-4' >
            <Form className="border border-2 rounded-2 p-3  mt-5" >
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
                <Form.Label className="fw-bold">Contraseña:<span onClick={()=>setseePass(!seePass)}>{seePass===true? "🍟":"🥔"} </span></Form.Label>
                <Form.Control 
                  type={seePass === false ? "password" : "text"}   
                  placeholder="Tu contraseña" 
                  onChange={handleChange}
                  value={register.password}
                  name="password"
                  />
                   {valErrors.password && <Form.Text className="text-danger">{valErrors.password}</Form.Text>}
             </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRepPassword">
                <Form.Label className="fw-bold" >Repite tu Contraseña:</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Tu contraseña" 
                  onChange={handleChange}
                  value={register.repPassword}
                  name="repPassword"
                  />
                 {valErrors.repPassword && <Form.Text className="text-danger">{valErrors.repPassword}</Form.Text>}
              </Form.Group>
              {msgError && <p className="text-danger fw-bold">{msgError}</p>}
                <Button
                style={{backgroundColor:"var( --color-primary-green)" , borderColor:"var( --color-primary-green)", color: "black"}}
                onClick={onSubmit}
                className="w-100"
              >
                Aceptar
              </Button>
               <p className="mt-3"> <Link to="/login"> ¿Ya tienes una cuenta?Inicia sesión aqui</Link> </p>
            </Form>
    </section>
    </>
  )
}

export default Register;
