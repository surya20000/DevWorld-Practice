require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require('mongoose');
const mediaRoutes = require('./routes/media');
const cors = require('cors');
const path = require('path');
app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.use('/api/v1/media', mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

app.get('/',(req, res)=>{
    res.send("Home route")
})

mongoose.connect(process.env.mongoDbUri, { dbName: "Capstone" })
    .then(() => [
        console.log("Connected to MongoDB")
    ])
    .catch((err) => console.log(err));

// // Define a route that sets a cookie
// app.get('/set-cookie', (req, res) => {
//     // Set a cookie named "example" with value "cookie-value"
//     res.cookie('example', 'cookie-value');
//     res.send('Cookie set successfully');
// });

// // Define a route that logs the response headers
// app.get('/verify-cookie', (req, res) => {
//     // Log the response headers
//     console.log('Response Headers:', res.getHeaders());
//     res.send('Response headers logged');
// });


app.listen(process.env.port || 6000, () => {
    console.log("Server is up and running at port:", process.env.port);
});
