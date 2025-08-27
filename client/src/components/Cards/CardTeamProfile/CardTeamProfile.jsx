import './cardTeamProfile.css';

export const CardTeamProfile = ({ data }) => {
  return (
    <article className="team-card ">
      <figure className="team-image-container">
        <img
          src={data.img}
          alt="Imagen perfil"
          className="team-image"
        />
      </figure>
      <div className="p-3 mt-4">
        <p className='text-center fs-5 fw-bold'>{data.name}</p>
        <p>{data.p1}</p>
        <p className='mb-0'>{data.p2}</p>
      </div>
    </article>
  )
}
