import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.R_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(restaurantId, review, user, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectId(restaurantId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteRe = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });
      return deleteRe;
    } catch (e) {
      console.error(`Unable to delete: ${e}`);
      return { error: e };
    }
  }
}
