import express  from "express";
import RestaurantController from "./restaurants.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(RestaurantController.apigetrestaurants)
router.route("/id/:id").get(RestaurantController.apiGetRestaurantsById)
router.route("/cuisines").get(RestaurantController.apiGetRestaurantsCuisines)
router.route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)


export default router