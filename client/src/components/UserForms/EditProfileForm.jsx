import { useContext, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { VscClose } from 'react-icons/vsc'
import { AuthContext } from '../../context/AuthContextProvider'
import { validateForms } from '../../helpers/validateForms'
import { editProfileSchema } from '../../schemas/editProfileSchema'
import { fetchData } from '../../helpers/axiosHelper'

const EditProfileForm = ({ setActiveComponent }) => {
  const { user, setUser, token } = useContext(AuthContext)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        user_name: user.user_name || '',
        lastname: user.lastname || '',
        phone_number: user.phone_number || '',
        specialty: user.specialty || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setServerError('')

    const result = validateForms(editProfileSchema, formData)

    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    try {
      const res = await fetchData('/users/editUser', 'put', formData, token)
      setUser(res.data.user)
      setActiveComponent('none')
      alert('Perfil actualizado con éxito!')
    } catch (error) {
      console.error('Error al editar el perfil:', error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message)
      } else {
        setServerError('Ha ocurrido un error inesperado. Inténtalo de nuevo.')
      }
    }
  }

  return (
    <div className="form-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Completa o edita tus datos:</h2>
        <Button
          variant="link"
          onClick={() => setActiveComponent('none')}
          className="close-button"
        >
          <VscClose size={30} />
        </Button>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="user_name"
            value={formData.user_name || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellidos:</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={formData.lastname || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            value={formData.phone_number || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Especialidad artística:</Form.Label>
          <Form.Control
            type="text"
            name="specialty"
            value={formData.specialty || ''}
            onChange={handleChange}
          />
        </Form.Group>

        {serverError && <p className="text-danger fw-bold">{serverError}</p>}

        {Object.keys(errors).length > 0 && (
          <div className="text-danger fw-bold mb-3">
            <p>Por favor, revisa los siguientes errores:</p>
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="d-flex justify-content-end mt-4">
          <Button
            onClick={() => setActiveComponent('none')}
            className="cancel-button me-2"
          >
            Cancelar
          </Button>
          <Button className="submit-button" type="submit">
            Aceptar
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default EditProfileForm
