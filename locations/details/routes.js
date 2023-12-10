import * as dao from "../dao.js";
import * as userDao from "../../users/dao.js";
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

  const deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await dao.getReviewById(reviewId);
    const userId = review.user;
    const locationId = review.location;
    const location = await dao.findLocationById(locationId);
    const detailsId = location.details._id || location.details;
    await userDao.removeReviewFromUser(userId, reviewId);
    await dao.removeReviewFromDetails(detailsId, reviewId);
    res.send(await dao.deleteReview(req.params.reviewId));
  }

  app.get("/", findAllReviews);
  app.get("/:reviewId", getReview);
  app.put("/:reviewId", updateReview);
  app.delete("/:reviewId", deleteReview);
}
export default ReviewRoutes;