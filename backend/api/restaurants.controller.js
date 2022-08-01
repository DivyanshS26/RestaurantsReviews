import RestaurantsDOA from "../doa/restaurantsDOA.js";

export default class RestaurantController {
  static async apigetrestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDOA.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      enteries: restaurantsPerPage,
      total: totalNumRestaurants,
    };

    res.json(response);
  }
  static async apiGetRestaurantsById(req, res, next) {
    try {
      let id = req.params.id;
      let restaurant = await RestaurantsDOA.getRestaurantsById(id);
      if (!restaurant) {
        res.status(400).json({ error: "restaurant not found" });
        return;
      }
      res.json(restaurant);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiGetRestaurantsCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDOA.getRestaurantsCuisines();
      res.json(cuisines);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
