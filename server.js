const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Models (ensure schemas are registered with mongoose)
require('./models/testModel');
require('./models/studentModel');
require('./models/employeeModel');
require('./models/countryModel');
require('./models/stateModel');
require('./models/cityModel');
require('./models/adminModel');
require('./models/imageModel');

// Route files
const testRoute = require('./routes/testRouter');
const stdRoute = require('./routes/studentRouter');
const countryRouter = require('./routes/countryRouter');
const stateRouter = require('./routes/stateRouter');
const cityRouter = require('./routes/cityRouter');
const adminRouter = require('./routes/adminRouter');
const imageRouter = require('./routes/imageRouter');

// Initialize express app
const app = express();

// Database connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected');
    } catch (err) {
        console.error('DB connection error:', err.message);
    }
}
connectDB();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(cors());

// Static files
app.use('/public', express.static('public'));

// Health check
app.get('/', (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/api', testRoute);
app.use('/api', stdRoute);
app.use('/api', countryRouter);
app.use('/api', stateRouter);
app.use('/api', cityRouter);
app.use('/api', adminRouter);
app.use('/api', imageRouter);

// Port
const port = process.env.PORT || 3243;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
