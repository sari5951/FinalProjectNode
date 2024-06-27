// routes/users.route.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const UserService = require('../services/user.service');
const authMiddleware = require('../middleware/authMiddleware.middleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware.middleware');





// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
        res.status(500).send('Server Error');
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(`Error fetching user by ID: ${error.message}`);
        res.status(500).send('Server Error');
    }
});

// POST sign in
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Assuming you want to generate and send a JWT token upon successful sign in
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(`Error signing in: ${error.message}`);
        res.status(500).send('Server Error');
    }
});

// POST register new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(`Error registering user: ${error.message}`);
        res.status(500).send('Server Error');
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        res.status(500).send('Server Error');
    }
});
router.post('/AddCustomer', authMiddleware, authorizationMiddleware('admin'), async (req, res) => {
    try {
        const customer = req.body;
        if (!customer) {
            console.error("Error adding customer: No customer data provided");
            return res.status(400).send("Error adding customer: No customer data provided");
        }
        const newCustomer = await UserService.AddCustomer(customer);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(`Error adding customer: ${error.message}`);
        res.status(500).send(`Error adding customer: ${error.message}`);
    }
});

module.exports = router;
