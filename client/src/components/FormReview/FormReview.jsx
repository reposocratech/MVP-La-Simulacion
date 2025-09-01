import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { validateForms } from "../../helpers/validateForms";
import { reviewSchema } from "../../schemas/reviewSchema";
import { fetchData } from "../../helpers/axiosHelper";
import './formReview.css';
import { useParams } from "react-router";

export const FormReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  const [dataReview, setDataReview] = useState([])
  
  const {id} = useParams()

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating);
  };

  const handleChange = (e) =>{
    const {value} = e.target
    setComment(value)    
  }

   useEffect(() => {
      const fetchReview = async() => {
        try {
          //LLamada a la base de datos para recoger los datos de las review del evento
          const res = await fetchData(`/reviews/seereviews/${id}`, "get");
          const review = res.data.result;      
          setDataReview(review);
        } catch (error) {
          console.log(error);
        }
      }
      fetchReview();
    }, [rating]);

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      //Comprobación de que los datos sean validos
      const {valid, errors} = validateForms(reviewSchema, {comment , rating});
      setValError(errors);
  
      if (valid){
        const data = {comment, rating, id};
        //LLamada a la base de datos para insertarles 
        const res = await fetchData(`/reviews/createReview/${id}`, "post", data);
        console.log(res);
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.log(error);
      setValError({});
      setMsgError(error?.response?.data || "Error inesperado en el servidor");       
    }
  }


  return (
    <Form className='form-review shadow'>
      <div className="mb-3">
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          size={30}
          fillColor="var(--color-primary-violet)"
          emptyColor="#CCC"
          transition
        />
        <br />
        {valError.rating && <Form.Text className="text-danger fw-bold">{valError.rating}</Form.Text>}
      </div>
      <Form.Group className="mb-3" controlId="formBasicRoom_Description">
        <Form.Control 
          as="textarea" 
          rows={3}
          placeholder="Escribe tu opinión de cómo fue el evento/ taller"
          onChange={handleChange}
          value={comment}
        />
        {valError.comment && <Form.Text className="text-danger fw-bold">{valError.comment}</Form.Text>}
      </Form.Group>
        {msgError && <p className="text-danger">{msgError}</p>}
        <div className='mt-3'>
        <button className='submit-button' onClick={onSubmit}>Enviar</button>
        </div>
         <div className="reviews mt-4">
        <h4>Reseñas del evento:</h4>
        {dataReview.length === 0 ? (
          <p>No hay reseñas para este evento aún.</p>
        ) : (
          dataReview.map((review, idx) => (          
            <div key={idx} className="review-item mb-3">
              <div className="d-flex align-items-center">
                <hr />
                <Rating
                  initialValue={Number(review.rating)}
                  size={20}
                  fillColor="var(--color-primary-violet)"
                  emptyColor="#CCC"
                  readonly
                />                
              </div>
              <p>{review.description}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </Form>
  )
}
