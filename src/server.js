const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

dotenv.config();

connectDb()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contact', require('./routes/contact'));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});