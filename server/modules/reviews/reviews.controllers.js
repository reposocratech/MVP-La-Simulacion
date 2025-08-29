import reviewsDal from "./reviews.dal.js";

class ReviewController {
  createReview = async(req, res) => {
    try {
      const { comment, rating, event_id } = req.body;
      await reviewsDal.createReview(comment, rating, event_id);
      res.status(200).json({ message: "Reseña enviada correctamente" });
    } catch (error) {
      res.status(500).json({ message:"Error de server" });
    }
  }
}

export default new ReviewController();