import "dotenv/config";

import express, { Router } from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import UserRoutes from "../../users/routes.js";
import SearchRoutes from "../../Search/routes.js";
import LocationRoutes from "../../locations/routes.js";
import serverless from "serverless-http";

const LOCAL = false;

const LOCAL_DB = "mongodb://127.0.0.1:27017/Fountains";

const MONGO_ATLAS_USERNAME = process.env.MONGO_ATLAS_USERNAME || "fountainsAdmin";
const MONGO_ATLAS_PASS = process.env.MONGO_ATLAS_PASS || "67HywSBufIfOhfWm";

const DB_NAME = process.env.MONGO_ATLAS_DB_NAME || "FountainGuru";

const REMOTE_DB = `mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASS}@cluster0.3pkvr30.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(LOCAL ? LOCAL_DB : REMOTE_DB);

const app = express();
const router = Router();

app.use(express.json());
app.use(cors());

LocationRoutes(router);
SearchRoutes(router);
UserRoutes(router);

app.use("/", router);

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT);

export const handler = serverless(app);