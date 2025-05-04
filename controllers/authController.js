

import Candidate from '../modals/Candidate.js';
import User from '../modals/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const { full_name, email, password, } = req.body;

        console.log(full_name, email, password, 'userr');

        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if candidate with email already exists
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ message: 'Candidate with this email already exists.' });
        }


        // Create new candidate
        const user = new User({
            full_name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            message: 'Candidate registered successfully',
            user,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found, please register' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password does not match' });
        }

        res.status(200).json({
            message: 'Login successful',
            user,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

