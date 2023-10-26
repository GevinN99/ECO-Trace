const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('../configs/db');
dotenv.config();
const app = express();

/* Configs */
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

/* Connect to Database */
connectToDatabase()
    .then( () =>
        console.log('Connected to Database!')
    );

/* Routes */
const AuthRoutes = require('./routes/AuthRoutes');
app.use('/auth', AuthRoutes);

/* Connect to Express Server */
const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
