import express  from "express";
import RestaurantController from "./restaurants.controller.js";

const router = express.Router();

router.route("/").get(RestaurantController.apigetrestaurants)

export default router