

import Candidate from '../modals/Candidate.js';
import User from '../modals/User.js';

export const register = async (req, res) => {
    try {
        const { full_name, email, password, } = req.body;

        console.log(full_name, email, password, 'userr');
        // Check if candidate with email already exists
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ message: 'Candidate with this email already exists.' });
        }


        // Create new candidate
        const user = new User({
            full_name,
            email,
            password,
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
