// module.exports = {
//     adminUsername: "sari",
//     adminPassword: "1234"
// }
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mssql', // סוג המסד נתונים שבו אתה עובד
//     dialectOptions: {
//         options: {
//             encrypt: true, // במידה ואתה עובד עם מסד נתונים מאובטח ב-SSL
//             trustServerCertificate: true // במידה ואין לך אישור תעודת אבטחה
//         }
//     }
// });

// module.exports = sequelize;

// config/config.js

// module.exports = {
//     mongoURI: 'mongodb://localhost:27017/MYDB', // כתובת מסד הנתונים של MongoDB
//     jwtSecret: 'your_jwt_secret_key', // מפתח סודי ליצירת טוקנים JWT
//     adminUsername: 'sari', // שם המשתמש של המנהל
//     adminPassword: '1234' // סיסמה של המנהל
// };
const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
mongoose.connect('mongodb://localhost:27017/MYDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;