import mongoose from "mongoose";
import { userSchema, adminSchema } from "./schema.js";
const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
export { userModel, adminModel }