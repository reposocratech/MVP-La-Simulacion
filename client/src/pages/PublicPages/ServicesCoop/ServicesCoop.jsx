import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper";
import { formCoopSchema } from "../../../schemas/formCoopSchema"
import { ZodError } from "zod"

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

  const handleChange = (e) =>{
    const{name , value} = e.target
    setSendInfo({...sendInfo , [name] : value})
  }
  const sendMail = async () =>{
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

      }
  }  
  
  }

  return (
     <section >
      <Container>
        <Row className="d-flex align-items-center p-5">
          <Col md={12} lg={3}>
          
    
    <a href="#eventos">Organización de eventos</a>
    <a href="#audiovisual">Producción Audiovisual</a>
    <a href="#talleres">Talleres artes y audiovisual</a>
    <a href="#comunicacion">Comunicación y Publicidad</a>
    <a href="#management">Management artístico</a>
    <a href="#proyectos">Acompañamiento de proyectos</a>
    
    

          </Col>
          <Col md={12} lg={6}>
          <h1>Nuestros servicios:</h1>
          <section id="eventos">
            <h2>Organización de eventos culturales, creativos y comunitarios </h2>
            <p>En La Simulación nos especializamos en la organización de eventos con enfoque cultural, 
artístico y comunitario. No organizamos bodas, comuniones ni eventos tradicionales; 
nuestro trabajo se centra en propuestas con contenido, creatividad y participación. 
Diseñamos, producimos y coordinamos eventos que transforman espacios y activan el 
tejido social, apostando por formatos originales y experiencias con valor cultural, 
educativo o lúdico. 
Convertimos cualquier espacio o evento en una experiencia participativa y significativa. 
Proponemos actividades que fomentan la creatividad y la colaboración, como laboratorios 
creativos, juegos urbanos, intervenciones artísticas o dinámicas de grupo. Nuestra 
metodología pone en el centro a las personas y busca activar el entorno para fortalecer los 
lazos comunitarios y la cultura de proximidad.</p>
          </section>
          <section id="audiovisual">...</section>
          <section id="talleres">...</section>
          <section id="comunicacion">...</section>
          <section id="management">...</section>
          <section id="proyectos">...</section>
          
          </Col>
          <Col md={12} lg={3}>
          <h2>¿Quieres más información?Completa este formulario:</h2>
            <Form className="border border-1 rounded-2 p-4 ">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre" 
                  onChange={handleChange}
                  value={sendInfo.user_name}
                  name="user_name"
                />
              {valErrors.user_name && <Form.Text className="text-danger">{valErrors.user_name}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasiclastName">
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Apellidos" 
                  name="lastName"
                  onChange={handleChange}
                  value={sendInfo.lastName}
                  />
              {valErrors.lastName && <Form.Text className="text-danger">{valErrors.lastName}</Form.Text>}
                </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="porejemplo@tucorreo.com" 
                  name="email"
                  onChange={handleChange}
                  value={sendInfo.email}
                  />
              {valErrors.email && <Form.Text className="text-danger">{valErrors.email}</Form.Text>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Telefono:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Teléfono" 
                  name="phone"
                  onChange={handleChange}
                  value={sendInfo.phone}
                  />
                {valErrors.phone && <Form.Text className="text-danger">{valErrors.phone}</Form.Text>}
                  </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicType">
                <Form.Label>¿Sobre qué servicio deseas consultar?:</Form.Label>
                 <Form.Select
                  name="type"
                  value={sendInfo.type}
                  onChange={handleChange}
                  >
                  <option value="">Nombre del servicio</option>
                  <option value="Organización de eventos">Organización de eventos</option>
                  <option value="Produción Audiovisual">Produción Audiovisual</option>
                  <option value="Talleres artes y audiovisual">Talleres artes y audiovisual</option>
                  <option value="Comunicación y Publicidad">Comunicación y Publicidad</option>
                  <option value="Magnament artistico">Magnament artistico</option>
                  <option value="Acompañamiento de proyectos">Acompañamiento de proyectos</option>
                  </Form.Select>
                  {valErrors.type && <Form.Text className="text-danger">{valErrors.type}</Form.Text>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Escribe tu consulta:</Form.Label>
                <Form.Control 
                  as={"textarea"}
                  placeholder="Cuéntanos qué necesitas" 
                  name="description"
                  onChange={handleChange}
                  value={sendInfo.description}
                  />
                  {valErrors.description && <Form.Text className="text-danger">{valErrors.description}</Form.Text>}
                  </Form.Group>
                  
                  
                <Button
                variant="primary"
                onClick={sendMail}
              >
                Enviar
              </Button>
            </Form>
           
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ServicesCoop;
