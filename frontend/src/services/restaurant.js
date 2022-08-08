import httpCommon from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return httpCommon.get(`?page=${page}`);
  }
  get(id) {
    return httpCommon.get(`/id/${id}`);
  }
  find(query, by = "name", page = 0) {
    return httpCommon.get(`?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return httpCommon.post("/review", data);
  }
  updateReview(data) {
    return httpCommon.put("/review", data);
  }
  deleteReview(id) {
    return httpCommon.delete(`/review/?id=${id}`);
  }
  getCuisines(id) {
    return httpCommon.get("/cuisines");
  }
}

export default new RestaurantDataService();
