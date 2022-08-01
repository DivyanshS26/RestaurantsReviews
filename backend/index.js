import app from "./server.js";
import dotenv from "dotenv";
import mongodb from "mongodb"
import RestaurantsDOA from "./doa/restaurantsDOA.js";
import ReviewsDOA from "./doa/reviewsDOA.js"

dotenv.config();

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.R_DB_URI,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true }
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await RestaurantsDOA.injectDB(client)
    await ReviewsDOA.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
