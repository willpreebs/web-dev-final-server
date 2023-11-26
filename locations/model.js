import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("locations", schema);
export default model;