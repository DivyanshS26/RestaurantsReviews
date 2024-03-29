import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let restaurants

export default class RestaurantsDOA {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn.db(process.env.R_NS).collection("restaurants");
    } catch (e) {
      console.log(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
  static async getRestaurantsById(id){
    try{
      const pipeline = [ {
        $match : {
          _id: ObjectId(id)
        },
      },
      {
        $lookup : {
          from: "reviews",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $match : {
                $expr : {
                  $eq: ["$restaurant_id", "$$id"],
                },
              },
            },
            {
              $sort: {
                date: -1,
              }
            }
          ],
          as: "reviews",
        },
      },
      {
        $addFields: {
          reviews: "$reviews",
        },
      },
    ]
    return await restaurants.aggregate(pipeline).next()
    }
    catch(e){
      console.error(`RestaurantsById fault: ${e}`)
      throw e
    }
  }
  static async getRestaurantsCuisines(){
    let cuisines = []
    try{
      cuisines = await restaurants.distinct("cuisine")
      return cuisines
    }
    catch(e){
      console.error(`RestaurantCuisine fault: ${e}`);
      return cuisines
    }
  }
}
