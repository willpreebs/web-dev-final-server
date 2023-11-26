import model from "./model.js";

export const createLocation = (location) => model.create(location);
export const findAllLocations = () => model.find();
export const findLocationById = (locationId) => model.findById(locationId);
export const findLocationByName = (name) =>
  model.findOne({ name: name });
export const updateLocation = (locationId, location) =>
  model.updateOne({ _id: locationId }, { $set: location });
export const deleteLocation = (locationId) => model.deleteOne({ _id: locationId });