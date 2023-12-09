import locationModel from "./model.js";
import { detailsModel, reviewModel } from "./details/schema.js";

// locations:
export const createLocation = (location) => locationModel.create(location);
export const findAllLocations = () => locationModel.find().populate({path: 'details', populate: {path: 'reviews', populate: {path: 'user'}}});
export const findLocationById = (locationId) => locationModel.findById(locationId).populate({path: 'details', populate: {path: 'reviews', populate: {path: 'user'}}});
export const findLocationByName = (name) =>
  locationModel.findOne({ name: name });
export const updateLocation = (locationId, location) =>
  locationModel.updateOne({ _id: locationId }, { $set: location });
export const deleteLocation = (locationId) => locationModel.deleteOne({ _id: locationId });
export const findLocationsByPlaceId = (placeId) => locationModel.find({place_id: placeId});

// details:
export const addDetailsToLocation = (locationId, detailsId) => locationModel.updateOne({_id: locationId}, {$set: { details: detailsId }});

export const createDetails = (details) => {
  const date = new Date().toJSON();
  return detailsModel.create({...details, lastUpdated: date});
}

export const createDetailsFromFirstReview = (review) => detailsModel.create({location: review.location, reviews: [review._id]});

export const findDetailsById = (detailsId) => detailsModel.findById(detailsId);

export const addReviewToDetails = (detailsId, review) => detailsModel.updateOne({ _id: detailsId }, { $push: {reviews: review}});

export const updateDetails = (detailsId, details) => {
  const date = new Date().toJSON();
  return detailsModel.updateOne({ _id: detailsId }, { $set: { details, lastUpdated: date}});
}

// reviews:

export const getReviewsByUserId = (userId) => reviewModel.find({user: userId});

export const getReviewsByLocation = (locationId) => reviewModel.find({location: locationId});