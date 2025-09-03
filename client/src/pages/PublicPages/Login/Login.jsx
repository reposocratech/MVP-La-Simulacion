import { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContextProvider';
import { loginSchema } from '../../../schemas/loginSchema';
import flor from '../../../assets/decorative/flor-redondeada.svg';
import destellos from '../../../assets/decorative/pareja-destellos.svg';
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { validateForms } from '../../../helpers/validateForms';
import './login.css';

const initialValue = {
  email:"",
  password:""
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(initialValue);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  const [seePass, setseePass] = useState(false);

  const navigate = useNavigate();

  const {user, login} = useContext(AuthContext);

  // Hook que al cargar el componente comprueba si hay usuario en el contexto,
  // de manera que si alguién se logueó, no se le deja ir al login y
  // se le redirige a una página concreta dependiendo del tipo de user:
  useEffect(()=>{
    if (user){
      if(user.type === 1) navigate("/admin/adminPanel"); //redirección del admin
      if(user.type === 2) navigate("/services"); //redirección del "usuario normal"
    }
  }, [user]);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setUserLogin ({...userLogin, [name]:value });
  };

  const onSubmit = async(e)=> {
    e.preventDefault();
    try {
      const { valid, errors } = validateForms(loginSchema, userLogin);
      setValError(errors);

      if(valid){
        //Espera a que la función de login del contexto termine. Si el servidor devuelve un error, este await lo lanzará.
        await login(userLogin);

        setValError({});
      }

    } catch (error) {

      if (error.response){
        setValError({});
        setMsgError(error.response.data.message);

      }else{
        setValError({});
        setMsgError('Algo salió mal, inténtelo de nuevo');
      }
    }
  };

  return (
    <section className='section-login d-flex justify-content-center' >
      <Container fluid>
        <Row>
          <h1 className='h1-login text-center p-2 my-5'>Entra en tu cuenta <span className='span-login accent-text align-middle'>E</span> </h1>
          <Col className="d-flex justify-content-center">
            <div className='form-container-login p-2'>
              <img src={flor} alt="" className='flor-login' />
              <Form className='login-form border border-2 p-4 mt-3 rounded rounded-3'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="porejemplo@tucorreo.com"
                    onChange={handleChange}
                    value={userLogin.email}
                    name="email"
                  />
                  {valError.email && <Form.Text>{valError.email}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type={seePass === false ? "password" : "text"}
                      placeholder="Tu contraseña"
                      onChange={handleChange}
                      value={userLogin.password}
                      name="password"
                    />
                    <InputGroup.Text id="basic-addon2"><span onClick={()=>setseePass(!seePass)}>{seePass === true ? <LuEyeClosed /> : <LuEye />}</span></InputGroup.Text>
                  </InputGroup>
                  {valError.password && <Form.Text className="text-danger fw-bold">{valError.password}</Form.Text>}
                  {msgError && <Form.Text className="text-danger fw-bold">{msgError}</Form.Text>}
                </Form.Group>
                <div className='d-flex flex-column row-gap-4'>
                  <button className='submit-button' onClick={onSubmit}>
                    Iniciar sesión
                  </button>
                  <Link to='/register' className='text-center'>¿Aún no tienes cuenta? Regístrate desde aquí</Link>
                </div>
              </Form>
              <img src={destellos} alt="" className='destellos-login' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login;
