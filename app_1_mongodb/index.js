const express = require('express');
const mongoose = require("mongoose");
const courses_router = require('./routes/courses_route');

const url = "mongodb+srv://moaz:moaz@learn-mongo-db.jtmfs.mongodb.net/my_db?retryWrites=true&w=majority&appName=learn-mongo-db";
mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));






const app = express();
app.use(express.json());
app.use('/api/courses', courses_router)


app.listen(5000, () => {
    console.log(`listening on port 5000`);
})

// module.exports = {User};
