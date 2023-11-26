import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    building: String,
    position: {lat: Number, lng: Number}
})
export default locationSchema;