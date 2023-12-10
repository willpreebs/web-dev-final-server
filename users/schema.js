import mongoose, { Schema, Types } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    // role: {
    //     type: String,
    //     enum: ["USER", "ADMIN"],
    //     default: "USER" },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews',
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'locations',
    }]
    },
    {collection: "users"});

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    privileges: String, 
}, {collection: "admins"});
    
export { userSchema, adminSchema }