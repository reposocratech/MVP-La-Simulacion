import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { AuthContext } from '../../../context/AuthContextProvider';
import { ZodError } from 'zod';
import { loginSchema } from '../../../schemas/loginSchema';

const initialValue = {
  email:"",
  password:""
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(initialValue);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();

  const {login} = useContext(AuthContext);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setUserLogin ({...userLogin, [name]:value });
  };

  const onSubmit = async()=> {
    try {
      loginSchema.parse(userLogin);
      //Espera a que la función de login del contexto termine. Si el servidor devuelve un error, este await lo lanzará.
      await login(userLogin);
      setValError({});
    } catch (error) {
      console.log(error);
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
        setMsgError('Algo salío mal, inténtelo de nuevo')
      }
    }
  };
  
  return (
    <section className='d-flex justify-content-center p-4'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="porejemplo@tucorreo.com"
            onChange={handleChange}
            value={userLogin.email}
            name="email"
          />
          {valError.email && <Form.Text className="text-danger fw-bold">{valError.email}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu contraseña"
            onChange={handleChange}
            value={userLogin.password}
            name="password"
          />
          {valError.password && <Form.Text className="text-danger fw-bold">{valError.password}</Form.Text>}
          {msgError && <Form.Text className="text-danger fw-bold">{msgError}</Form.Text>}
        </Form.Group>
        <Button variant="primary"  onClick={onSubmit}>
          Iniciar sesión
        </Button>
        
      </Form>
      <Link to='/register'>¿Aún no tienes cuenta? Regístrate desde aquí</Link>
    </section>
  )
}

export default Login;
