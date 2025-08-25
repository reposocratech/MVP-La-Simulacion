import Spinner from 'react-bootstrap/Spinner';
import './spinnerLoading.css'

export const SpinnerLoading = () => {
  return (
    <div className='d-flex justify-content-center align-items-end mt-5'>
      <Spinner
          animation="border"
          role="status"
          variant="success"
          className="spinner-web">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
}

