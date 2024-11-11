const express = require('express');
const courses_router = require('./routes/courses_route');


const app = express();
app.use(express.json());
app.use('/api/courses', courses_router)


app.listen(5000, () => {
    console.log(`listening on port 5000`);
})
