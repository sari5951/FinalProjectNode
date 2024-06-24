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
const mongoose=require("mongoose");
const UsersSchema=new mongoose.Schema({
    id: String, name: String,
})
module.exports=mongoose.model('Users',UsersSchema)