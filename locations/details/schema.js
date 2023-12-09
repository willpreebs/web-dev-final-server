
import mongoose, { Schema } from "mongoose";


const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    rating: {type: Number, required: true, min: 1, max: 5},
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true
    },
    reviewText: String,
},
{"collection": "reviews"});

const detailsSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true,
    },
    lastUpdated: Schema.Types.Date,
    bottlesSaved: Number,
    filterStatus: {
        type: String, 
        enum: ["green", "yellow", "red"],
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }]},
    {"collection": "details"});

const detailsModel = mongoose.model("details", detailsSchema);
const reviewModel = mongoose.model("reviews", reviewSchema);

export { reviewSchema, detailsSchema, reviewModel, detailsModel }
