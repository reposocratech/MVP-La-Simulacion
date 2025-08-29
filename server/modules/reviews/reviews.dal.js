import executeQuery from "../../config/db";

class ReviewDal {
  createReview = async(comment, rating) => {
    try {
      let sql = "INSERT INTO review (rating, description) VALUES (?, ?)";
      let values = [rating, comment];
      const result = await executeQuery(sql, values);
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }
}

export default new ReviewDal();