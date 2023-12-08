
import mongoose, { Schema, Types } from "mongoose";
import * as userDao from "../../users/dao.js";
import { reviewModel } from "./model.js";

const reviewSchema = new Schema({
    _id: Schema.ObjectId,
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
    }
},
{"collection": "reviews"});

const detailsSchema = new Schema({
    _id: Schema.ObjectId,
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews',
    }]},
    {"collection": "details"});

detailsSchema.pre('updateOne', async function() {
    const update = this.getUpdate();
    const review = update.$push && update.$push.reviews;

    const newReviewDocument = new reviewModel({
        _id: new mongoose.Types.ObjectId(),
        ...review
    });

    await newReviewDocument.save();

    await userDao.addReviewToUser(review.user, newReviewDocument._id);

    update.$push.reviews = newReviewDocument._id;
})

export { reviewSchema, detailsSchema }
