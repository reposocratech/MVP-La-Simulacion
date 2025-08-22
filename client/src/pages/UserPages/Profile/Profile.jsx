import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContextProvider'
import userPlaceholder from '../../../assets/icons/user-placeholder.png'
import './profile.css'

const Profile = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <main className="profile-page-wrapper">
        <div className="profile-card-section">
          <p className="lead">Cargando datos del usuario...</p>
        </div>
        <aside className="profile-decoration-container" />
      </main>
    )
  }

  return (
    <main className="profile-page-wrapper pt-5 mt-3 ">
      <section className="profile-card-section pt-5">
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
          <Link to="/user/edit-profile" className="custom-button">
            Editar mi perfil
          </Link>
          <Link to="/user/change-password" className="custom-button">
            Cambiar contraseña
          </Link>
          <Link to="/user/change-email" className="custom-button">
            Cambiar email
          </Link>
          <a href="#" className="delete-link">
            Darme de baja
          </a>
        </div>
      </section>

      <aside className="profile-decoration-container my-5" />
    </main>
  )
}

export default Profile
