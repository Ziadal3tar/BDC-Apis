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

app.use(cors('*'));

// Or you can configure CORS with specific options
app.use(cors({
    origin: 'http://localhost:4200', // allow only this origin
    methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'], // allow only specific HTTP methods
    allowedHeaders: ['Content-Type'], // allow only specific headers
}));

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
