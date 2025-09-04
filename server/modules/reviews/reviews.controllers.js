import reviewsDal from "./reviews.dal.js";

class ReviewController {
  seeReview = async(req , res) => {
    try {
    const {id} = req.params
    const result = await reviewsDal.seeReview(id);          
    res.status(200).json({message: "Datos Ok" , result }); 
    } catch (error) {            
      res.status(500).json({message: "server error"});
    }
  }

  seeAvgRating = async (req , res) =>{
    try {
    const {id} = req.params
    const result = await reviewsDal.seeAvgRating(id); 
    res.status(200).json({message: "Datos Ok" , result });
    } catch (error) {
    res.status(500).json({message: "server error"});  
    }
  }


  seeAllReview = async(req , res) => {
    try {
    const result = await reviewsDal.seeAllReview();          
    res.status(200).json({message: "Datos Ok" , result }); 
    } catch (error) {            
      res.status(500).json({message: "server error"});
    }
  }

  delReview = async (req , res) =>{
    try {
        const {review_id} = req.body
        await reviewsDal.delReview( review_id )
        res.status(200).json({message: "Borrado Ok" });  
    } catch (error) {
      console.log(error);
       res.status(500).json({message: "server error"});        
    }
  }


  createReview = async(req, res) => {
    try {
      const {id} = req.params
      const { rating, description, review_name } = req.body;
      const data = {
        rating: rating,
        description:description,
        review_name:review_name
      } 
      await reviewsDal.createReview(data, id);
      res.status(200).json({ message: "Reseña enviada correctamente" });
    } catch (error) {
      console.log(error);  
      res.status(500).json({ message:"Error de server" });
    }
  }
}

export default new ReviewController();