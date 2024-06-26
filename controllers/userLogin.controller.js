const authService = require('../services/userLogin.service');

// פונקציה לרישום משתמש חדש
exports.signup= async (req, res) => {
  const { username, password, role } = req.body; // שליפת הנתונים מבקשת ה-POST
  console.log('Received data:', req.body); 

  if (!username || !password) { // בדיקה האם המשתמש או הסיסמא ריקים
    return res.status(400).json({ message: 'Username and password are required' }); // החזרת הודעת שגיאה במידה וכן
  }

  try {
    await authService.createUser(username, password, role); // קריאה לפונקציה בשירות ליצירת משתמש חדש
    res.status(201).json({ message: 'User created' }); // החזרת הודעת הצלחה
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message }); 
  }
};

// פונקציה להתחברות משתמש קיים
exports.login = async (req, res) => {
  const { username, password } = req.body; 
  console.log('Login data:', req.body); 

  if (!username || !password) { 
    return res.status(400).json({ message: 'Username and password are required' }); 
  }

  try {
    const token = await authService.authenticateUser(username, password); 
console.log(token);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); 
    }
  } catch (error) {
    console.error('Error logging in user:', error); 
    res.status(500).json({ message: 'Internal server error', error: error.message }); 
  }
};