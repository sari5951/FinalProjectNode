import { Request, Response } from 'express';
import * as authService from '../services/userLogin.service';

// פונקציה לרישום משתמש חדש
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body; // שליפת הנתונים מבקשת ה-POST
  console.log('Received data:', req.body); 

  if (!username || !password) { // בדיקה האם המשתמש או הסיסמא ריקים
    return res.status(400).json({ message: 'Username and password are required' }); // החזרת הודעת שגיאה במידה וכן
  }

  try {
    await authService.createUser(username, password, role); // קריאה לפונקציה בשירות ליצירת משתמש חדש
    res.status(201).json({ message: 'User created' }); // החזרת הודעת הצלחה
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message }); 
  }
};

// פונקציה להתחברות משתמש קיים
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body; 
  console.log('Login data:', req.body); 

  if (!username || !password) { 
    return res.status(400).json({ message: 'Username and password are required' }); 
  }

  try {
    const token = await authService.authenticateUser(username, password); 

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); 
    }
  } catch (error: any) {
    console.error('Error logging in user:', error); 
    res.status(500).json({ message: 'Internal server error', error: error.message }); 
  }
};
