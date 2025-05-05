

import Candidate from '../modals/Candidate.js';
import User from '../modals/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        console.log(full_name, email, password, 'user input');

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser, 'existing user check');

        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'User with this email already exists.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            full_name,
            email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            status: 201,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'Email not found. Please register.',
            });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: 'Incorrect password. Please try again.',
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            'test_secret_key', // Hardcoded secret for testing
            { expiresIn: '2h' }
        );

        // Send success response
        return res.status(200).json({
            status: 200,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                full_name: user.full_name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


