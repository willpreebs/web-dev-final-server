import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER" },
    reviews: [{
        type: Types.ObjectId,
        ref: 'reviews',
    }]
    },
    {collection: "users"});
    
export default userSchema;
