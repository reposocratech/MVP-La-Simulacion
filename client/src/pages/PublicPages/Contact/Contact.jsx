import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap"
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
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
        const res = await fetchData("/users/contact", "post", formData)
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
    <section className="section-contact">
      <Container>
        <Row className="justify-content-between">
          <Col md={4}>
            <h3 className="text-center mb-3">¿Hablamos? Rellena el siguiente formulario</h3>
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


          <Col md={8}>
            <address>
              <h3 className="text-center mb-5">Puedes encontrarnos en</h3>
              <div className="d-flex gap-3">
                {getMiniCardsData().map(card => (
                  <MiniCardContact
                    key={card.id}
                    card={card}
                  />
                ))}
              </div>
            </address>
            <div className="d-flex gap-3 text-white">
              <section className="px-3 py-5 rounded-4 bg-color-secondary-green text-center ">
                <p className="mb-4 fs-5 fw-bold">También estamos en redes sociales</p>
                <div className="d-flex justify-content-center gap-3">
                  <Link>
                    <FaInstagram color="#FFF" size={32} title="Instagram" />
                  </Link>
                  <Link>
                    <FaLinkedin color="#FFF" size={32} title="LinkedIn" />
                  </Link>
                  <Link>
                    <FaYoutube color="#FFF" size={32} title="YouTube" />
                  </Link>
                </div>
              </section>
              <section className="px-3 py-5 rounded-4 bg-color-secondary-pink text-center">
                <p className="mb-4 fs-5 fw-bold">Descubre nuestra comunidad, Genkoa</p>
                <Link></Link>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

  )
}
