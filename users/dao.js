import { userModel, adminModel } from "./model.js";
export const createUser = (user) => userModel.create(user);
export const findAllUsers = () => userModel.find();
export const findUserById = (userId) => userModel.findById(userId);
export const findUserByUsername = (username) =>
  userModel.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  userModel.findOne({ username: username, password: password });
export const updateUser = (userId, user) =>
  userModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
export const addReviewToUser = (userId, reviewId) =>
  userModel.updateOne({_id: userId}, {$push: {reviews: reviewId}});
export const addFavoriteLocation = (userId, locationId) =>
  userModel.updateOne({_id: userId}, {$push: {favorites: locationId}});
export const removeFavoriteLocation = (userId, locationId) => 
  userModel.updateOne({_id: userId}, {$pull: {favorites: locationId}});

export const createUserFromAdmin = (admin) => userModel.create({...admin});
export const createAdminFromUser = (user) => adminModel.create({...user, _id: null, privileges: "*"});

export const createAdmin = (admin) => adminModel.create(admin);
export const findAllAdmins = () => adminModel.find();
export const findAdminById = (adminId) => adminModel.findById(adminId);
export const findAdminByUsername = (username) =>
  adminModel.findOne({ username: username });
export const findAdminByCredentials = (username, password) =>
  adminModel.findOne({ username: username, password: password });
export const updateAdmin = (adminId, admin) =>
  adminModel.updateOne({ _id: adminId }, { $set: admin });
export const deleteAdmin = (adminId) => adminModel.deleteOne({ _id: adminId });
