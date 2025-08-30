import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { validateForms } from "../../helpers/validateForms";
import { reviewSchema } from "../../schemas/reviewSchema";
import { fetchData } from "../../helpers/axiosHelper";
import { AuthContext } from "../../context/AuthContextProvider";
import './formReview.css';

export const FormReview = ({event_id}) => {
  const { token } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratingReset, setRatingReset] = useState();
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const {valid, errors} = validateForms(reviewSchema, {comment});
      setValError(errors);
  
      if (valid){
        const data = {comment, rating, event_id};
        const res = await fetchData("/reviews/createReview", "post", data, token);
        console.log(res);
        setRating(0);
        setComment("");
        setRatingReset(prev => prev + 1);
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
          key={ratingReset}
          onClick={setRating}
          ratingValue={rating}
          size={30}
          fillColor="var(--color-primary-violet)"
          emptyColor="#CCC"
          transition
        />
      </div>
      <Form.Group className="mb-3" controlId="formBasicRoom_Description">
        <Form.Control 
          as="textarea" 
          rows={3}
          placeholder="Escribe tu opinión de cómo fue el evento/ taller"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        {valError.comment && <Form.Text className="text-danger fw-bold">{valError.comment}</Form.Text>}
      </Form.Group>
        {msgError && <p className="text-danger">{msgError}</p>}
        <div className='mt-3'>
          <button className='submit-button' onClick={onSubmit}>Enviar</button>
        </div>
    </Form>
  )
}
