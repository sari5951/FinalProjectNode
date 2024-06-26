const User = require('../models/userLogin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// פונקציה ליצירת משתמש חדש
exports.createUser = async (username, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

// פונקציה לאימות משתמש קיים
exports.authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }
    const match = await user.comparePassword(password);
    if (match) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
    }
    return false; // אם הסיסמה אינה תואמת
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  }
};