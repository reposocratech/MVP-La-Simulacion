import executeQuery from "../../config/db.js";

class ReviewDal {
  seeReview = async (id) => {
    try {
   let sql = "SELECT * FROM review WHERE event_id = ? ORDER BY review_id DESC"
   let result = await executeQuery(sql , id)
   return result;
    } catch (error) {
      throw { message: "Error en bd" }; 
      
    }
  }

  seeAvgRating = async (id) =>{
    try {
    let sql = "SELECT COUNT (*) AS total_reviews , AVG(rating) AS average_rating FROM review WHERE event_id = ? "
    let result = await executeQuery(sql , id) 
    return result ;
    } catch (error) {
      throw { message: "Error en bd" };  
    }
  }

  seeAllReview = async () => {
    try {
   let sql = `SELECT review_id , review.description, review.rating, event.event_title ,review_name
  FROM review
  LEFT JOIN event ON review.event_id = event.event_id ORDER BY review_id DESC
`;
   let result = await executeQuery(sql)
   return result;
    } catch (error) {
      throw { message: "Error en bd" }; 
      
    }
  }

    delReview = async (review_id) =>{
    try {
      let sql = "DELETE FROM review WHERE review_id = ?  "             
      let values = [review_id]
      await executeQuery(sql , values)
    } catch (error) {
      console.log(error);
      
       throw { message: "Error en bd" };         
    }
  }


  createReview = async(data,id) => {
    try {
      let sql = "INSERT INTO review (rating, description, review_name , event_id) VALUES (?, ?, ? ,?)";
      let values = [data.rating,data.description ,data.review_name , id];
      const result = await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      
      throw { message: "Error en base de datos" };
    }
  }
}

export default new ReviewDal();