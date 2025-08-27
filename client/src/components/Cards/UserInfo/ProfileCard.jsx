import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContextProvider'
import { fetchData } from '../../../helpers/axiosHelper'
import userPlaceholder from '../../../../../server/public/images/users/default-avatar.svg'
import './ProfileCard.css'

export const ProfileCard = ({ setActiveComponent }) => {
  const { user, setUser, token, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetchData('/users/editAvatar', 'put', formData, token)
      setUser(res.data.user)
    } catch (err) {
      console.error('Error al subir la imagen:', err)
      setError(
        err.response?.data?.message ||
          'Hubo un error al subir la imagen. Inténtalo de nuevo.'
      )
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
      )
    ) {
      return
    }

    setLoading(true)
    try {
      const res = await fetchData(
        `/deleteUser/${user.user_id}`,
        'delete',
        null,
        token
      )
      alert(res.data.message)
      logout()
      navigate('/')
    } catch (err) {
      console.error('Error al dar de baja la cuenta:', err)
      setError(
        err.response?.data?.message ||
          'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="profile-card pt-5">
        <figure
          className="profile-image-container"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={
              user?.avatar
                ? `${import.meta.env.VITE_SERVER_URL_PUBLIC}images/users/${
                    user.avatar
                  }`
                : userPlaceholder
            }
            alt="Ícono de usuario"
            className="profile-image rounded-circle"
          />
        </figure>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {loading && <p>Subiendo imagen...</p>}
        {error && <p className="text-danger fw-bold mt-5">{error}</p>}

        <div className="profile-card-body mt-5">
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
        <button onClick={handleDeleteAccount} className="delete-link">
          Darme de baja
        </button>
      </div>
    </>
  )
}

export default ProfileCard
