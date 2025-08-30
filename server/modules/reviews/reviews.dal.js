import executeQuery from "../../config/db.js";

class ReviewDal {
  createReview = async(comment, rating, event_id) => {
    try {
      let sql = "INSERT INTO review (rating, description, event_id) VALUES (?, ?, ?)";
      let values = [rating, comment, event_id];
      const result = await executeQuery(sql, values);
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }
}

export default new ReviewDal();