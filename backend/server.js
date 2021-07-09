//DOTENV FOR MONGODB SERVER URI, PORT AND SESSION KEY
import dotenv from 'dotenv';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import userRoutes from ''
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// DEFINING GLOBAL VARIABLES
const PORT = process.env.PORT || 5000;
const dbConnectionURL = process.env.DB_CONNECTION_URL;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

// EXPRESS MIDDLEWARE
const app = express();

// CONFIGURING THE MIDDLEWARE TO BE USED
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        message: 'Page not found?'
    });
});

mongoose.connect(dbConnectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("Connected to the database");
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((err) => console.error.bind(console, "Database connection error"));