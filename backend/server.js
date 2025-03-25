const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");

app.use(cors({
    origin: "https://mern-app-1-70kp.onrender.com",  
    methods: ["GET", "POST", "PUT", "DELETE"],       
    credentials: true,                              
}));

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // ✅ Ensure Server Listens on Correct Port
    const PORT = process.env.PORT || 5000

