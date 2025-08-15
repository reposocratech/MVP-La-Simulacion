import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { AuthContext } from '../../../context/AuthContextProvider';

const initialValue = {
  email:"",
  password:""
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(initialValue);

  const {login} = useContext(AuthContext);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setUserLogin ({...userLogin, [name]:value });
  };

  const onSubmit = async()=> {
    try {
      login(userLogin);
      console.log(userLogin);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <section className='d-flex justify-content-center p-4'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección de Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu email"
            onChange={handleChange}
            value={userLogin.email}
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="text"
            placeholder="introduce tu contraseña"
            onChange={handleChange}
            value={userLogin.password}
            name="password"
          />
        </Form.Group>
        <Button variant="primary"  onClick={onSubmit}>
          Enviar
        </Button>
        <p>¿No estás registrado? <Link to='/register'>Regístrate aquí</Link> </p>
      </Form>
    </section>
  )
}

export default Login;
