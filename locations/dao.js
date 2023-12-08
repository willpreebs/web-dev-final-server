import locationModel from "./model.js";
import { detailsModel, reviewModel } from "./details/model.js";

// locations:
export const createLocation = (location) => locationModel.create(location);
export const findAllLocations = () => locationModel.find();
export const findLocationById = (locationId) => locationModel.findById(locationId);
export const findLocationByName = (name) =>
  locationModel.findOne({ name: name });
export const updateLocation = (locationId, location) =>
  locationModel.updateOne({ _id: locationId }, { $set: location });
export const deleteLocation = (locationId) => locationModel.deleteOne({ _id: locationId });
export const findLocationsByPlaceId = (placeId) => locationModel.find({place_id: placeId});

// details:
export const addNewDetails = (locationId, review) => locationModel.updateOne({_id: locationId}, {$set: {details: review}});

export const findDetailsById = (detailsId) => detailsModel.findById(detailsId);

export const addReviewToDetails = (detailsId, review) => detailsModel.updateOne({ _id: detailsId }, { $push: {reviews: review}});

// reviews:

export const getReviewsByUserId = (userId) => reviewModel.find({user: userId});