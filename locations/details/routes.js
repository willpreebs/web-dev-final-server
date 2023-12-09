import * as dao from "../dao.js";
// let currentLocation = null;
function ReviewRoutes(app) {

  const findAllReviews = async (req, res) => {
    res.send(await dao.findAllReviews());
  }

  const getReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    res.send(await dao.getReviewById(reviewId));
  }

  const updateReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    res.send(await dao.updateReview(reviewId, req.body));
  }

  app.get("/", findAllReviews);
  app.get("/:reviewId", getReview);
  app.put("/:reviewId", updateReview);
}
export default ReviewRoutes;