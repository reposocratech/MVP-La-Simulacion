import { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { VscClose } from 'react-icons/vsc'
import { AuthContext } from '../../context/AuthContextProvider'
import { validateForms } from '../../helpers/validateForms'
import { changeEmailSchema } from '../../schemas/changeEmailSchema'
import { fetchData } from '../../helpers/axiosHelper'

const ChangeEmailForm = ({ setActiveComponent }) => {
  const { setUser, token } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    newEmail: '',
    repeatNewEmail: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    setErrors({})

    const result = validateForms(changeEmailSchema, formData)

    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    try {
      const res = await fetchData('/users/changeEmail', 'put', formData, token)

      setUser(res.data.user)
      setActiveComponent('none')
      alert('Email cambiado con éxito!')
    } catch (error) {
      console.error('Error al cambiar el email:', error)
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
        <h2>Cambiar email:</h2>
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
          <Form.Label>Email actual:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nueva email:</Form.Label>
          <Form.Control
            type="email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            isInvalid={!!errors.newEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newEmail}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirmar nueva email:</Form.Label>
          <Form.Control
            type="email"
            name="repeatNewEmail"
            value={formData.repeatNewEmail}
            onChange={handleChange}
            isInvalid={!!errors.repeatNewEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.repeatNewEmail}
          </Form.Control.Feedback>
        </Form.Group>

        {serverError && <p className="text-danger fw-bold">{serverError}</p>}

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

export default ChangeEmailForm
