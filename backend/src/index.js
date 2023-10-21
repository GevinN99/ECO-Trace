const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDatabase = require('../configs/db');
dotenv.config();
const app = express();

/* Configs */
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

/* Connect to Database */
connectToDatabase()
    .then( () =>
        console.log('Connected to Database!')
    );

/* Routes */
const UserRoutes = require('./routes/UserRoutes');
app.use('/user', UserRoutes);

const AdminRoutes = require('./routes/AdminRoutes');
app.use('/admin', AdminRoutes);

const mrfAdminRoutes = require('./routes/mrfAdminRoutes');
app.use('/mrfAdmin', mrfAdminRoutes);

/* Connect to Express Server */
const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
