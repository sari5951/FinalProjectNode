3
//sql
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// module.exports = User;

//mongoDB

// models/user.model.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, 'Username is required.'],
//         unique: true
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required.'],
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'user'],
//         default: 'user',
//     },
// });

// // Pre-save hook to hash password before saving
// userSchema.pre('save', async function(next) {
//     try {
//         if (!this.isModified('password')) {
//             return next();
//         }
//         const hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function(password) {
//     return await bcrypt.compare(password, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;



// models/user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
