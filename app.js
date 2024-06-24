const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
const userController = require('./controllers/user.controller');
const businessController = require('./controllers/business.controller');
const serviceController = require('./controllers/service.controller');
const meetingController = require('./controllers/meeting.controller');
const categotiesController = require('./controllers/categories.controllers');
const orderController = require('./controllers/order.controller');
const messageController=require('./controllers/message.controller');
const customerController=require('./controllers/customer.controller');
const authMiddleware = require('./middleware/middleware');
const PORT = process.env.PORT || 3000
// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017'; // Update this URI with your MongoDB connection string
const dbName = 'MYDB';
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

app.use('/user', authMiddleware, userController);
app.use('/business', authMiddleware, businessController);
app.use('/meeting', authMiddleware, meetingController);
app.use('/service', authMiddleware, serviceController);
app.use('/listCustemers', authMiddleware, categotiesController);
app.use('/order', authMiddleware, orderController);
app.use('/message' , authMiddleware,messageController );
app.use('/customer',authMiddleware,customerController);

// Connect to MongoDB
MongoClient.connect(uri)
    .then(client => {
        const db = client.db(dbName);

        // Use the database connection in your routes or middleware as needed
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Import the routes
        app.use(routes);
        app.use(routes2);

        const listener = app.listen(process.env.PORT || 3000, () => {
            console.log('Your app is listening on port ' + listener.address().port);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})