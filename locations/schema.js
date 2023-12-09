import mongoose, {Schema} from "mongoose";
import { detailsModel, reviewModel } from "./details/model.js";
import * as userDao from "../users/dao.js"

const locationSchema = new Schema({
    _id: Schema.ObjectId,
    name: {type: String, required: true},
    building: String,
    position: {lat: Number, lng: Number},
    place_id: {type: String, required: true},
    details: {
        type: Schema.Types.ObjectId,
        ref: 'details',
    },},
    {'collection': 'locations'});

locationSchema.pre('updateOne', async function () {
    const update = this.getUpdate();
    const review = update.$set && update.$set.details;

    if (review && !mongoose.Types.ObjectId.isValid(review)) {
        // console.log("review: " + review);
        
        try {
        const newReviewDocument = new reviewModel({
            ...review
        });
        } catch (err) {
            console.log(err);
        }

        await newReviewDocument.save();
        const reviewId = newReviewDocument._id;
        try {
        const newDetailsDocument = new detailsModel({
            // _id: new mongoose.Types.ObjectId(),
            location: this._conditions._id,
            reviews: [reviewId],
        }); }
        catch (err) {};
        await newDetailsDocument.save();

        update.$set.details = newDetailsDocument._id;

        await userDao.addReviewToUser(review.user, newReviewDocument._id); 
    }


});

export default locationSchema;

