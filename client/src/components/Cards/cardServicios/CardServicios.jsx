import { useNavigate } from 'react-router';
import './cardServicios.css';

export const CardServicios = ({service}) => {
  const navigate = useNavigate();

  return (
    <article className='card-servicios p-3 rounded-4 overflow-hidden h-100' style={{ backgroundColor: service.bgColor }}>
      <div className='d-flex flex-column justify-content-between h-100'>
        <div className='mb-3'>
          <img src={service.img} alt=""  className="w-100 rounded-4"/>
        </div>
        <h4 className='mb-3'><span>{service.span}</span>{service.title}</h4>
        <p>{service.p1}</p>
        <p>{service.p2}</p>
        <p>{service.p3}</p>
        <p>{service.p4}</p>
        <p>{service.p5}</p>
        <p>{service.p6}</p>
        <button
          className='service-button w-100'
          onClick={() => navigate(service.path)}
        >{service.button}</button>
      </div>
    </article>
  )
}
