import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import cartPageRoutes from "./routes/cartPageRoutes.js"
import userRoute from "./routes/userRoutes.js"
import oauthRoute from "./routes/oauthRoutes.js"

dotenv.config();

const PORT = process.env.PORT;
const mongoUrl = process.env.Mongo_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cartPageRoutes)
app.use(userRoute)
app.use(oauthRoute)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (err) => {
    console.log(err);
});

database.on('connected', () => {
    console.log('Database Connected');
});


app.listen(PORT, () => {
    console.log(`This server is listening on the port: ${PORT}`);
});