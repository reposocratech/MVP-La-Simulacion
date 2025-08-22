import { useNavigate } from 'react-router';
import './cardServicios.css';

export const CardServicios = ({service}) => {
  const navigate = useNavigate();

  return (
    <article className='card-servicios p-3 rounded-4 overflow-hidden' style={{ backgroundColor: service.bgColor }}>
      <div className='mb-3'>
        <img src={service.img} alt=""  className="w-100 rounded-4"/>
      </div>
      <div>
        <h4 className='mb-3'><span>{service.span}</span>{service.title}</h4>
        <p className='mb-1'>{service.p1}</p>
        <p className='mb-1'>{service.p2}</p>
        <p className='mb-1'>{service.p3}</p>
        <p className='mb-1'>{service.p4}</p>
        <p className='mb-1'>{service.p5}</p>
        <p className='mb-1'>{service.p6}</p>
      </div>
      <div className='mt-3'>
        <button 
          className='service-button w-100'
          onClick={() => navigate(service.path)}
        >{service.button}</button>
      </div>
    </article>
  )
}
