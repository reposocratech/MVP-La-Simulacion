import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import { columnReview } from '../../../data/DataReviewAdmin';
import { Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../../components/Table/CustomTable';
import "./adminreviews.css"

export  const AdminReview = () => {
  const { token } = useContext(AuthContext);
  const [reviewData, setreviewData] = useState([]);



  const reviewDelete = async (data ) => {
 
  try {
    //LLamada al back para borrar la reseña seleccionada
    const res = await fetchData("/reviews/delreviewdata", "delete", {review_id: data.review_id}, token);
    setreviewData(reviewData.filter(e=>e.review_id !== data.review_id));
        
  } catch (error) {
    console.log("Error al borrar servicio:",error);
  }
};

  const column = columnReview(reviewDelete );

  

  useEffect(() => {
    const fetchreviewdata = async() => {
      try {
        //Llamada a base de datos para recoger todas la reviews con su evento
        const res = await fetchData("/reviews/adminreviews", "get", null, token);
        const review = res.data.result; 
        setreviewData(review);
      } catch (error) {
        console.log(error);
      }
    }
    fetchreviewdata();
  }, []);
  return (
    <section >
      <Container>
        <h1 className='mrg text-center'><span className='span-editreviewdata  accent-text align-middle' >GR</span> Gestión de Reviews</h1>
        <Row className="text-center gy-4 justify-content-center">       
        <CustomTable 
          columns={column}
          data={reviewData}
        />
        </Row>
      </Container>
    </section>
  )
}

export default AdminReview;