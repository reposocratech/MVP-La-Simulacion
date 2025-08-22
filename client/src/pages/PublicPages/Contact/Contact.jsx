import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap"
import { FaInstagram, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa";
import { MiniCardContact } from "../../../components/Cards/miniCardContact/MiniCardContact";
import { getMiniCardsData } from "../../../data/MiniCardsData";
import { Link } from "react-router";
import { validateForms } from "../../../helpers/validateForms";
import { fetchData } from "../../../helpers/axiosHelper";
import { contactSchema } from "../../../schemas/contactSchema";
import './contact.css';

const initialValue = {
  name: "",
  lastname: "",
  email: "",
  phone_number: "",
  consult: ""
}

const Contact = () => {
  const [formData, setFormData] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [msgError, setMsgError] = useState();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      //validacion con función
      const { valid, errors } = validateForms(contactSchema, formData);
      setValErrors(errors);

      if (valid){
        const res = await fetchData("/users/contact", "post", formData);
        console.log(res);
        setFormData(initialValue);
      }

    } catch (error) {
      console.log(error);
      setValErrors({});
      setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  return (
    <section>
      <Container>
        <Row className="justify-content-center section-contact flex-wrap d-flex align-items-stretch">
          <Col lg={4} className="d-flex flex-column h-100">
            <h1 className="text-center mb-3 fs-3">¿Hablamos? Rellena el siguiente formulario</h1>
            <Form className="border border-2 rounded-4 p-3">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="fw-bold">Nombre:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre" 
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                />
                {valErrors.name && <Form.Text className="text-danger">{valErrors.name}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastname">
                <Form.Label className="fw-bold">Apellidos:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Apellidos"
                  onChange={handleChange}
                  value={formData.lastname}
                  name="lastname"
                />
                {valErrors.lastname && <Form.Text className="text-danger">{valErrors.lastname}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fw-bold">Email:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="porejemplo@tucorreo.com"
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                />
                {valErrors.email && <Form.Text className="text-danger">{valErrors.email}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label className="fw-bold">Teléfono:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Tu número de teléfono"
                  onChange={handleChange}
                  value={formData.phone_number}
                  name="phone_number"
                />
                {valErrors.phone_number && <Form.Text className="text-danger">{valErrors.phone_number}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConsult">
                <Form.Label className="fw-bold">Escribe tu consulta:</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={3} 
                  placeholder="Cuéntanos qué necesitas"
                  onChange={handleChange}
                  value={formData.consult}
                  name="consult"
                />
                {valErrors.consult && <Form.Text className="text-danger">{valErrors.consult}</Form.Text>}
              </Form.Group>
              {msgError && <p className="text-danger">{msgError}</p>}
              <div className="w-100">
                <button 
                  className="submit-button w-100"
                  onClick={onSubmit}
                >Enviar</button>
              </div>
            </Form>
          </Col>


          <Col lg={8} className="d-flex flex-column h-100">
            <address>
              <h2 className="text-center mb-5 fs-3">Puedes encontrarnos en</h2>
              <div className="row gy-4 align-items-stretch">
                {getMiniCardsData().map(card => (
                  <div className="col-lg-4">
                    <MiniCardContact
                      card={card}
                      key={card.id}
                    />
                  </div>
                ))}
              </div>
            </address>
            <section className="mt-3 section-redes rounded-4 text-white">
              <div className="p-3 rounded-4 text-center  ">
                <p className="mb-3 fs-5 fw-bold">También estamos en redes sociales</p>
                <div className="d-flex justify-content-center gap-4">
                  <a 
                    href="https://www.linkedin.com/company/lasimulacion/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaLinkedin color="var(--color-primary-orange)" size={32} title="LinkedIn" />
                  </a>
                  <a 
                    href="https://www.facebook.com/tu-pagina" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaFacebook color="var(--color-primary-orange)" size={32} title="Facebook" />
                  </a>
                  <a 
                    href="https://www.instagram.com/tu-cuenta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaInstagram color="var(--color-primary-orange)" size={32} title="Instagram" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@tu-cuenta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaTiktok color="var(--color-primary-orange)" size={32} title="TikTok" />
                  </a>
                </div>
              </div>
              <div className="py-4 text-center">
                <p className="mb-4 fs-5 fw-bold">Descubre nuestra comunidad, Genkoa</p>
                <Link></Link>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact;
