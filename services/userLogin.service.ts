import User from '../models/userLogin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const createUser = async (username: string, password: string, role: string): Promise<UserDocument> => {
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

export const authenticateUser = async (username: string, password: string): Promise<string | false> => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return false;
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
