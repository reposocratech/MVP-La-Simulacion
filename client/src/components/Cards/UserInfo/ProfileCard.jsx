import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContextProvider'
import userPlaceholder from '../../../assets/icons/user-placeholder.png'
import './ProfileCard.css'

export const ProfileCard = ({ setActiveComponent }) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <p className="lead">Cargando datos del usuario...</p>
  }

  return (
    <>
      <div className="profile-card pt-5">
        <figure className="profile-image-container">
          <img
            src={userPlaceholder}
            alt="Ícono de usuario"
            className="profile-image"
          />
        </figure>
        <div className="profile-card-body mt-3">
          <h3>¡Hola! Estos son tus datos de usuario:</h3>
          <ul className="profile-data-list">
            <li>
              <span className="label">Nombre:</span>
              <span className="value">
                {user.user_name || 'No especificado'}
              </span>
            </li>
            <li>
              <span className="label">Apellidos:</span>
              <span className="value">
                {user.lastname || 'No especificado'}
              </span>
            </li>
            <li>
              <span className="label">Email:</span>
              <span className="value">{user.email || 'No especificado'}</span>
            </li>
            <li>
              <span className="label">Teléfono:</span>
              <span className="value">
                {user.phone_number || 'No especificado'}
              </span>
            </li>
            <li>
              <span className="label">Especialidad Artística:</span>
              <span className="value">
                {user.specialty || 'No especificado'}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-buttons-container">
        <button
          onClick={() => setActiveComponent('editProfile')}
          className="submit-button custom-button"
        >
          Editar mi perfil
        </button>
        <button
          onClick={() => setActiveComponent('changePassword')}
          className="submit-button custom-button"
        >
          Cambiar contraseña
        </button>
        <button
          onClick={() => setActiveComponent('changeEmail')}
          className="submit-button custom-button"
        >
          Cambiar email
        </button>
        <a href="#" className="delete-link">
          Darme de baja
        </a>
      </div>
    </>
  )
}
