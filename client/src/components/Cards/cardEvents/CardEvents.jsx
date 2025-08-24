import './cardEvents.css';

export const CardEvents = ({event}) => {
  return (
    <article className='card rounded-4 overflow-hidden'>
        <div className="row ">
          <div className="col-lg-7">
            <div className="p-3 d-flex flex-column justify-content-between h-100">
              <h4 className='mb-3'>{event.event_title}</h4>
              <p>
                {event.event_description}
              </p>
              <p className='fst-italic'>
                {event.location}
              </p>
              <div>
                <button className='info-button'>Mas información</button>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <img src={event.cover_image} alt="" className='w-100 h-100 object-fit-cover'/>
          </div>
        </div>
    </article>
  )
}
