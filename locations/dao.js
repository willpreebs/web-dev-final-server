import locationModel from "./model.js";
import { detailsModel, reviewModel } from "./details/schema.js";
import * as userDao from "../users/dao.js";

// locations:
export const createLocation = (location) => locationModel.create(location);
export const findAllLocations = () => locationModel.find().populate({ path: 'details', populate: { path: 'reviews', populate: { path: 'user', select: { 'username': 1 } } } });
export const findLocationById = (locationId) => locationModel.findById(locationId).populate({ path: 'details', populate: { path: 'reviews', populate: { path: 'user', select: { 'username': 1 } } } });
export const findLocationByName = (name) =>
  locationModel.findOne({ name: name });
export const updateLocation = (locationId, location) =>
  locationModel.updateOne({ _id: locationId }, { $set: location });
export const deleteLocation = (locationId) => locationModel.deleteOne({ _id: locationId });
export const findLocationsByPlaceId = (placeId) => locationModel.find({ place_id: placeId });

// details:
export const addDetailsToLocation = (locationId, detailsId) => locationModel.updateOne({ _id: locationId }, { $set: { details: detailsId } });

export const createDetails = (details) => {
  const date = new Date().toJSON();
  return detailsModel.create({ ...details, lastUpdated: date });
}

export const createDetailsFromFirstReview = (locationId, reviewId) => detailsModel.create({ location: locationId, reviews: [reviewId] });

export const findDetailsById = (detailsId) => detailsModel.findById(detailsId);

export const addReviewToDetails = async (detailsId, reviewId) => {
  // const newReview = await reviewModel.create({...review});
  // await newReview.save();
  // await userDao.addReviewToUser(review.user, newReview._id);
  return detailsModel.updateOne({ _id: detailsId }, { $push: { reviews: reviewId }});
}

export const updateDetails = (detailsId, details) => {
  const date = new Date().toJSON();
  return detailsModel.updateOne({ _id: detailsId }, { $set: { ...details, lastUpdated: date } });
}

// reviews:

export const findAllReviews = () => reviewModel.find();

export const getReviewsByUserId = (userId) => reviewModel.find({ user: userId }).populate('location');

export const getReviewsByLocation = (locationId) => reviewModel.find({ location: locationId });

export const getReviewById = (reviewId) => reviewModel.findById(reviewId);

export const updateReview = (reviewId, review) => reviewModel.updateOne({_id: reviewId}, { $set: review });

export const deleteReview = (reviewId) => reviewModel.deleteOne({_id: reviewId});

export const createReview = (locationId, review) => reviewModel.create({...review, location: locationId})

// users:

export const addFavoritedUser = (locationId, userId) => locationModel.updateOne({_id: locationId}, {$push: {favoritedUsers: userId}});
export const removeFavoritedUser = (locationId, userId) => locationModel.updateOne({_id: locationId}, {$pull: {favoritedUsers: userId}});