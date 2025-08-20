import { useNavigate } from 'react-router'

import './userIcon.css'

export const UserIcon = () => {

  const navigate = useNavigate();

  return (
    <div className="me-2">
      <button className="avatar-button" onClick={()=>navigate("/user/profile")}>
        <img src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/users/default-avatar.svg`} 
              alt="Ir a mi perfil de usuario"
              className="avatar-icon" />
      </button>
    </div>
  )
}
