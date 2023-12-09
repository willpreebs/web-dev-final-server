import "dotenv/config";

import express, { Router } from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import UserRoutes from "../../users/routes.js";
import SearchRoutes from "../../Search/routes.js";
import LocationRoutes from "../../locations/routes.js";
import ReviewRoutes from "../../locations/details/routes.js";
import serverless from "serverless-http";
import session from "express-session";

const MONGO_ATLAS_USERNAME = process.env.MONGO_ATLAS_USERNAME;
const MONGO_ATLAS_PASS = process.env.MONGO_ATLAS_PASS;
const DB_NAME = process.env.MONGO_ATLAS_DB_NAME;

const LOCAL = false;

const LOCAL_DB = "mongodb://127.0.0.1:27017/Fountains";
const REMOTE_DB = `mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASS}@cluster0.3pkvr30.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(LOCAL ? LOCAL_DB : REMOTE_DB);

const app = express();

const locationRouter = Router();
const searchRouter = Router();
const userRouter = Router();
const reviewRouter = Router();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

const sessionOptions = {
    secret: "any",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));

LocationRoutes(locationRouter);
SearchRoutes(searchRouter);
UserRoutes(userRouter);
ReviewRoutes(reviewRouter);

app.use("/locations", locationRouter);
app.use("/search", searchRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewRouter)

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT);

export const handler = serverless(app);