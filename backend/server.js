const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const cors = require("cors");

app.use(cors({
    origin: "https://mern-app-1-70kp.onrender.com",  
    methods: ["GET", "POST", "PUT", "DELETE"],       
    credentials: true,                              
}));


const userRoutes = require("./routes/userRoutes");

app.use(express.json());

mongoose
.connect(process.env.URI)
.then(() => {
    console.log("connected succesfully")
    
  const PORT = process.env.PORT || 8000;  // ✅ Default port set
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

}).catch((error) => {
    console.log("error",error)
});

app.use(userRoutes);

