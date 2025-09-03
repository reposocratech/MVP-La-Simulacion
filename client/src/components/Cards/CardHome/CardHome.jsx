import { Card } from "react-bootstrap"
import { useNavigate } from 'react-router';
import './cardHome.css';

// Esta card recibe sus textos y propiedades personalizables por props, desde la page Home:
export const CardHome = ({title, accentLetter, textBody, color, textButton, urlButton}) => {

  // función navegar para "onClick" del botón de la card:
  const navigate = useNavigate();

  return (
    <Card className="card-home h-100">
      <Card.Body className="d-flex flex-column">
        <h3 className="fw-bold fs-5 mb-3">
          <span className="accent-text" style={{ color: color, marginInlineEnd: ".5rem", fontSize:"24px" }}
          >{accentLetter}</span>{title}
          </h3>
        <Card.Text className="my-auto">
          {textBody}
        </Card.Text>
        <button className="card-home-button mt-auto" style={{ backgroundColor: color }}
                onClick={()=>navigate(`${urlButton}`)}> {textButton} </button>
      </Card.Body>
    </Card>
  )
}
