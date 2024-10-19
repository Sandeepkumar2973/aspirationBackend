
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const emailRoutes = require("./routes/emailSuscribeRoutes");
const grievanceRoutes = require("./routes/GrivienceRoutes");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.error("MongoDB connection error:", err))

//test api
app.get("/apitest", (req, res) => {
    res.send({
        message: "Welcome to my  Application",
    });
});


app.use('/api/v1/admin', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/grievance', grievanceRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/emails', emailRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
