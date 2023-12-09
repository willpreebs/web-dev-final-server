
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

//  detailsModel.updateOne({ _id: detailsId }, { $push: { reviews: review } });

detailsSchema.pre('updateOne', async function() {
    console.log('updateOne');
    const update = this.getUpdate();

    if (update.$push) {
        const review = update.$push.reviews;

        const newReviewDocument = reviewModel.create({
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
});

export { reviewSchema, detailsSchema, reviewModel, detailsModel }
