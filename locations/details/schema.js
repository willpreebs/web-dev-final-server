
import mongoose, { Schema, Types } from "mongoose";
import * as userDao from "../../users/dao.js";
import { reviewModel } from "./model.js";

const reviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    _id: Schema.Types.ObjectId,
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true,
    },
    lastUpdated: Schema.Types.Date,
    bottlesSaved: Number,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews',
    }]},
    {"collection": "details"});

detailsSchema.pre('updateOne', async function() {
    const update = this.getUpdate();

    if (update.$push) {
        const review = update.$push.reviews;

        const newReviewDocument = new reviewModel({
            _id: new mongoose.Types.ObjectId(),
            ...review
        });

        await newReviewDocument.save();

        await userDao.addReviewToUser(review.user, newReviewDocument._id);

        update.$push.reviews = newReviewDocument._id;
    } else if (update.$set) {
        const newInfo = update.$set;
        console.log(newInfo);
    }
})

export { reviewSchema, detailsSchema }
