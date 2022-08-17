import ReviewsDOA from "../doa/reviewsDOA.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_Id;
      const review = req.body.text;
      const UserInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await ReviewsDOA.addReview(
        restaurantId,
        UserInfo,
        review,
        date
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateReview(req,res,next){
    try{
        const reviewId = req.body.review_id
        const text = req.body.text
        const date = new Date()

        const reviewResponse = await ReviewsDOA.updateReview(
            reviewId,
            req.body.user_id,
            text,
            date,
        )
        var {error} = reviewResponse
        if(error) {
            res.status(400).json({error})
        }

        if(reviewResponse.modifiedCount === 0){
            throw new Error(
                "unable to update review - user may not be original poster",
            )
        }
        res.json({status: "success"})
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req,res,next){
    try{
        const reviewId = req.query.id
        const userId = req.body.user_id
        const reviewResponse = await ReviewsDOA.deleteReview(
            reviewId,
            userId,
        )
        res.json({status: "success"})
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
  }
}
