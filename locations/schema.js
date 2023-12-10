import mongoose, {Schema} from "mongoose";
import { detailsModel, reviewModel } from "./details/schema.js";
import * as userDao from "../users/dao.js"

const locationSchema = new Schema({
    name: {type: String, required: true},
    building: String,
    position: {lat: Number, lng: Number},
    place_id: {type: String, required: true},
    details: {
        type: Schema.Types.ObjectId,
        ref: 'details',
    },
    favoritedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
},
    {'collection': 'locations'});

export default locationSchema;