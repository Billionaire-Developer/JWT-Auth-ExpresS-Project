const express = require('express');
const Database = require('dotenv').config();
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');

const app = express();

//connect Database
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use('./api/auth', authRoute);

//Server
const port = Process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})