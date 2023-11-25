import "dotenv/config";

import express from 'express';
import cors from 'cors';

import HomeRoutes from './Home/routes.js';

const app = express();
app.use(express.json());
app.use(cors());
HomeRoutes(app);


app.listen(4000);