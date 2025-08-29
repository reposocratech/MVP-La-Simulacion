import reviewsDal from "./reviews.dal.js";

class ReviewController {
  createReview = async(req, res) => {
    try {
      const { comment, rating } = req.body;
      await reviewsDal.createReview(comment, rating);
      res.status(200).json("envio ok");
    } catch (error) {
      res.status(500).json({message:"Error de server"});
    }
  }
}

export default new ReviewController();