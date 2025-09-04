import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { validateForms } from "../../helpers/validateForms";
import { reviewSchema } from "../../schemas/reviewSchema";
import { fetchData } from "../../helpers/axiosHelper";
import './formReview.css';
import { useParams } from "react-router";

const initialValue = {
  description:"",
  review_name:""
}


export const FormReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(initialValue);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  const [dataReview, setDataReview] = useState([])
  
  const {id} = useParams()

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating);
  };

  const handleChange = (e) =>{
    const {name , value} = e.target
    setComment({...comment,[name]:value})    
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
       const data = {
        rating: rating,
        description: comment.description,
        review_name: comment.review_name
        }
      //Comprobación de que los datos sean validos
      const {valid, errors} = validateForms(reviewSchema, (data));
      setValError(errors);
  
      if (valid){
        //LLamada a la base de datos para insertarles 
        const res = await fetchData(`/reviews/createReview/${id}`, "post", data);
        setRating(0)
        setComment(initialValue);
        
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
       <Form.Group className="mb-3" controlId="formBasicReview_Name">
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="review_name"
          onChange={handleChange}
          value={comment.review_name}
        />
        {valError.review_name && <Form.Text className="text-danger fw-bold">{valError.review_name}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicReview_Description">
        <Form.Control 
          as="textarea" 
          rows={3}
          name="description"
          placeholder="Escribe tu opinión de cómo fue el evento/ taller"
          onChange={handleChange}
          value={comment.description}
        />
        {valError.description && <Form.Text className="text-danger fw-bold">{valError.description}</Form.Text>}
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
              <p className="fw-bold text-start">{review.review_name} </p>
              <p className="text-start">{review.description}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </Form>
  )
}
