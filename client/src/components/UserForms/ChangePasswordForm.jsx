import { useContext, useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { VscClose } from 'react-icons/vsc'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import { AuthContext } from '../../context/AuthContextProvider'
import { validateForms } from '../../helpers/validateForms'
import { changePasswordSchema } from '../../schemas/changePasswordSchema'
import { fetchData } from '../../helpers/axiosHelper'

const ChangePasswordForm = ({ setActiveComponent }) => {
  const { token } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    prevPass: '',
    newPass: '',
    repPass: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [showPrevPass, setShowPrevPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showRepPass, setShowRepPass] = useState(false)

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

    const result = validateForms(changePasswordSchema, formData)

    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    try {
      await fetchData('/users/changePass', 'put', formData, token)
      setFormData({
        prevPass: '',
        newPass: '',
        repPass: '',
      })
      setActiveComponent('none')
      alert('Contraseña cambiada con éxito!')
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
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
        <h2>Cambiar contraseña:</h2>
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
          <Form.Label>Contraseña actual:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showPrevPass ? 'text' : 'password'}
              name="prevPass"
              value={formData.prevPass}
              onChange={handleChange}
              isInvalid={!!errors.prevPass}
            />
            <InputGroup.Text>
              <span onClick={() => setShowPrevPass(!showPrevPass)}>
                {showPrevPass ? <LuEyeClosed /> : <LuEye />}
              </span>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nueva contraseña:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showNewPass ? 'text' : 'password'}
              name="newPass"
              value={formData.newPass}
              onChange={handleChange}
              isInvalid={!!errors.newPass}
            />
            <InputGroup.Text>
              <span onClick={() => setShowNewPass(!showNewPass)}>
                {showNewPass ? <LuEyeClosed /> : <LuEye />}
              </span>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repite la contraseña:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showRepPass ? 'text' : 'password'}
              name="repPass"
              value={formData.repPass}
              onChange={handleChange}
              isInvalid={!!errors.repPass}
            />
            <InputGroup.Text>
              <span onClick={() => setShowRepPass(!showRepPass)}>
                {showRepPass ? <LuEyeClosed /> : <LuEye />}
              </span>
            </InputGroup.Text>
          </InputGroup>
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

export default ChangePasswordForm
