import mongoose from "mongoose";
import { detailsSchema, reviewSchema } from "./schema.js";
const detailsModel = mongoose.model("details", detailsSchema);
const reviewModel = mongoose.model("reviews", reviewSchema);

export { detailsModel, reviewModel }