import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, './config/.env') });

import express from 'express';
const app = express();
import cors from "cors";
import { globalError } from './src/services/asyncHandler.js';
import connection from './DB/connection.js';

// CORS Configuration
var corsOptions = {
    origin: "*", // Allows all origins
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Pass the options to the cors middleware

const port = process.env.PORT || 3000;
app.use(globalError);
connection();
app.use(express.json());

import * as indexRouter from './src/module/index.router.js';

app.use('/user', indexRouter.userRouter);
app.use('/category', indexRouter.categoryRouter);
app.use('/blog', indexRouter.blogRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
