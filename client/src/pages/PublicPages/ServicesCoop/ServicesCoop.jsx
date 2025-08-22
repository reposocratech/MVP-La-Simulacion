import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper";
import { formCoopSchema } from "../../../schemas/formCoopSchema"
import { ZodError } from "zod"
import "./servicesCoop.css"

const initialValues = {
  user_name: "",
  lastName: "",
  email:"",
  phone: "",
  type:"",
  description:""

}

const ServicesCoop = () => {
  const [sendInfo, setSendInfo] = useState({initialValues})
  const [valErrors, setValErrors] = useState({})
  const [servicesCoop, setServicesCoop] = useState([])
  const [active, setActive] = useState()

  useEffect(() => {
    const servicesCoopData = async () => {
      try {
        const res = await fetchData("/services/servicescoop", "get");
        console.log("Datos recibidos:", res.data);
        setServicesCoop(res.data); 
      } 
      catch (error) {
        throw error; 
      }
  };

    servicesCoopData();
  }, []);
  
  const handleChange = (e) =>{
    const{name , value} = e.target
    setSendInfo({...sendInfo , [name] : value})
  }
  const sendMail = async (e) =>{
    e.preventDefault();
  try {
    formCoopSchema.parse(sendInfo)
    let res = await fetchData("/services/servicescoop" , "post" , sendInfo)

  } catch (error) {
    if(error instanceof ZodError){
        let objTemp = {}
      error.issues.forEach((err)=>{
        objTemp[err.path[0]]=err.message
      })
      setValErrors(objTemp)
  }}}

  return (
     <section className="marg-top" >
      <Container>
        <Row >
          <Col md={12} lg={3} className="sticky-col-sect ">
              <div >
                {servicesCoop.result?.map(service => (        
                <div  className={`textblack p-2   ${active === service.service_id ? "active" : ""} `}>
                  
                  <a className="textblack"  href={`#${service.service_name}`}
                  key={service.service_id}
                  onClick={() => setActive(service.service_id)}
                  >
                  {service.service_name}
                  </a>          
                </div>
                ))}
              </div>
          </Col>

          <Col md={12} lg={6}>
                <h1 className="text-center"><span className='span-servcoop accent-text align-middle'>S</span> Nuestros servicios:</h1>
                {servicesCoop.result?.map(service => (      
                <section id={service.service_name}>
                  <h3 className="text-center" >{service.service_name}</h3>
                  <div className="text-center"> 
                    <img className="i-width mb-4 mt-4" src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/servCoop/${service.image}`} alt="" />
                  </div>
                  <p>{service.service_description} </p>
                </section>
                ))}  
          </Col>

          <Col md={12} lg={3} className="sticky-col ">
            <h5 className="mb-1"  >¿Quieres más información?</h5>
            <Form className="border border-1 rounded-2 p-2 ">
              <Form.Group className="m_form_group"  controlId="formBasicName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre" 
                  onChange={handleChange}
                  value={sendInfo.user_name}
                  name="user_name"
                />
              {valErrors.user_name && <Form.Text className="form-error">{valErrors.user_name}</Form.Text>}
              </Form.Group>
              <Form.Group className="m_form_group"  controlId="formBasiclastName">
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Apellidos" 
                  name="lastName"
                  onChange={handleChange}
                  value={sendInfo.lastName}
                  />
              {valErrors.lastName && <Form.Text className="form-error">{valErrors.lastName}</Form.Text>}
                </Form.Group>
              <Form.Group className="m_form_group"  controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="porejemplo@tucorreo.com" 
                  name="email"
                  onChange={handleChange}
                  value={sendInfo.email}
                  />
              {valErrors.email && <Form.Text className="form-error">{valErrors.email}</Form.Text>}
                  </Form.Group>
                  <Form.Group className="m_form_group"  controlId="formBasicPhone">
                <Form.Label>Telefono:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Teléfono" 
                  name="phone"
                  onChange={handleChange}
                  value={sendInfo.phone}
                  />
                {valErrors.phone && <Form.Text className="form-error">{valErrors.phone}</Form.Text>}
                  </Form.Group>
                    <Form.Group className="m_form_group"  controlId="formBasicType">
                <Form.Label>¿Sobre qué servicio deseas consultar?:</Form.Label>
                 <Form.Select
                  name="type"
                  value={sendInfo.type}
                  onChange={handleChange}
                  >
                  <option value="" >Nombre del servicio</option> 
                  <div >
                  {servicesCoop.result?.map(service => (
                  <>
                  <p><option value="{service.service_name}">{service.service_name}</option></p> 
                  <br />
                  </>  
                  ))}
                  </div>  
                  </Form.Select>
                  {valErrors.type && <Form.Text className="form-error">{valErrors.type}</Form.Text>}
                  </Form.Group>
                  <Form.Group className="m_form_group" controlId="formBasicDescription">
                <Form.Label>Escribe tu consulta:</Form.Label>
                <Form.Control 
                  as={"textarea"}
                  placeholder="Cuéntanos qué necesitas" 
                  name="description"
                  onChange={handleChange}
                  value={sendInfo.description}
                  />
                  {valErrors.description && <Form.Text className="form-error">{valErrors.description}</Form.Text>}
                  </Form.Group>
                  
                  
               <button className="submit-button mt-1 w-100" onClick={sendMail}>
                Enviar
               </button>
            </Form>
           
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ServicesCoop;
