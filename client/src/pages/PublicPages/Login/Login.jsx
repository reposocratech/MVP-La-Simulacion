import { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContextProvider';
import { ZodError } from 'zod';
import { loginSchema } from '../../../schemas/loginSchema';
import './login.css';

const initialValue = {
  email:"",
  password:""
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(initialValue);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setUserLogin ({...userLogin, [name]:value });
  };

  const onSubmit = async(e)=> {
    e.preventDefault();
    try {
      loginSchema.parse(userLogin);
      //Espera a que la función de login del contexto termine. Si el servidor devuelve un error, este await lo lanzará.
      await login(userLogin);
      setValError({});
      navigate('/admin/createroom')
    } catch (error) {
      
      if(error instanceof ZodError){
        let objectTemp = {}
        error.issues.forEach((er)=>{
        objectTemp[er.path[0]]=er.message
        })
        setValError(objectTemp)
        setMsgError(null);
      }else if (error.response){
        setValError({}); 
        setMsgError(error.response.data.message);
      }else{
        setValError({});
        setMsgError('Algo salío mal, inténtelo de nuevo');
      }
    }
  };
  
  return (
    <section className='section-login d-flex justify-content-center' >
      <Container fluid>
        <Row>
          <h1 className='h1-login text-center p-2 my-5'>Entra en tu cuenta <span className='span-login accent-text align-middle'>E</span> </h1>
          <Col className="d-flex justify-content-center">
            <Form xs={9} lg={3} className='border border-2 p-4 rounded rounded-3'>
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
                <Form.Control
                  type="password"
                  placeholder="Tu contraseña"
                  onChange={handleChange}
                  value={userLogin.password}
                  name="password"
                />
                {valError.password && <Form.Text className="text-danger fw-bold">{valError.password}</Form.Text>}
                {msgError && <Form.Text className="text-danger fw-bold">{msgError}</Form.Text>}
              </Form.Group>
              <div className='d-flex flex-column gap-4'>
                <button className='submit-button' onClick={onSubmit}>
                  Iniciar sesión
                </button>
                <Link to='/register' className='text-center'>¿Aún no tienes cuenta? Regístrate desde aquí</Link>
              </div>
            </Form> 
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login;
