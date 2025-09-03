import { useContext, useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { VscClose } from 'react-icons/vsc'
import { AuthContext } from '../../context/AuthContextProvider'
import { validateForms } from '../../helpers/validateForms'
import { editProfileSchema } from '../../schemas/editProfileSchema'
import { fetchData } from '../../helpers/axiosHelper'

const EditProfileForm = ({ setActiveComponent, setSuccessMessage }) => {
  const { user, setUser, token } = useContext(AuthContext)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      formRef.current.focus()
    }
  }, [])

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

      const trimmedData = {
      user_name: (formData.user_name ?? '').trim(),
      lastname: (formData.lastname ?? '').trim(),
      phone_number: (formData.phone_number ?? '').trim() || null,
      specialty: (formData.specialty ?? '').trim() || null,
    }
    const result = validateForms(editProfileSchema, trimmedData)

    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    try {
      const res = await fetchData('/users/editUser', 'put', trimmedData, token)
      setUser(res.data.user)
      setActiveComponent('none')
      setSuccessMessage('Perfil actualizado con éxito!')
    } catch (error) {
      console.error('Error al editar el perfil:', error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors(error.response.data.message)
      } else {
        setErrors('Ha ocurrido un error inesperado. Inténtalo de nuevo.')
      }
    }
  }
  return (
    <div tabIndex={-1} ref={formRef} className="form-container">
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
            isInvalid={!!errors.user_name}
          />
          {errors.user_name && (
            <Form.Control.Feedback type="invalid">
              {errors.user_name}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellidos:</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={formData.lastname || ''}
            onChange={handleChange}
            isInvalid={!!errors.lastname}
          />
          {errors.lastname && (
            <Form.Control.Feedback type="invalid">
              {errors.lastname}
            </Form.Control.Feedback>
          )}
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
