import './ProfileCard.css';

export const ProfileCard = ({ user }) => {
  const serverPublicUrl = import.meta.env.VITE_SERVER_URL_PUBLIC;

  return (
    <div className="profile-card ">
      <figure className="profile-image-container">
        <img
          src={user?.avatar || `${serverPublicUrl}images/users/default-avatar.svg`}
          alt="Icono de usuario"
          className="profile-image"
        />
      </figure>
      <div className="p-3 mt-3">
        <ul className="profile-data-list">
          <li>
            <span className='fw-bold'>Nombre</span>
            <span>
              {user?.user_name}
            </span>
          </li>
          <li>
            <span className='fw-bold'>Apellidos</span>
            <span>
              {user?.lastname || 'No especificado'}
            </span>
          </li>
          <li>
            <span className='fw-bold'>Email</span>
            <span>
              {user?.email}
            </span>
          </li>
          <li>
            <span className='fw-bold'>Teléfono</span>
            <span>
              {user?.phone_number || 'No especificado'}
            </span>
          </li>
          <li>
            <span className='fw-bold'>Especialidad artística</span>
            <span>
              {user?.specialty || 'No especificado'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
