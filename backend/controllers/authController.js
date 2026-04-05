import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


const registerUser = async (req, res) => {
    const { name, email, password, profile } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const userProfile = {
            ...(profile || {})
        };

        const user = await User.create({
            name,
            email,
            password,
            role: 'student', 
            profile: userProfile
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: user.profile, 
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: user.profile,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMe = async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profile: req.user.profile
    }
    res.status(200).json(user);
};

const updateProfile = async (req, res) => {
    const { name, email, profile = {} } = req.body;

    try {
        console.log('Update profile body:', req.body);
        console.log('Authenticated user:', req.user?._id);

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            user.email = email;
        }

        user.name = name || user.name;

        if (!user.profile) {
            user.profile = {};
        }

        user.profile.mobileNumber = profile.mobileNumber ?? user.profile.mobileNumber ?? '';
        user.profile.department = profile.department ?? user.profile.department ?? '';
        user.profile.course = profile.course ?? user.profile.course ?? '';
        user.profile.year = profile.year ?? user.profile.year ?? '';
        user.profile.studentId = profile.studentId ?? user.profile.studentId ?? '';
        user.profile.guardianName = profile.guardianName ?? user.profile.guardianName ?? '';
        user.profile.guardianPhone = profile.guardianPhone ?? user.profile.guardianPhone ?? '';
        user.profile.address = profile.address ?? user.profile.address ?? '';
        user.profile.roomNumber = profile.roomNumber ?? user.profile.roomNumber ?? '';
        user.profile.hostelName = profile.hostelName ?? user.profile.hostelName ?? '';
        user.profile.joinedDate = profile.joinedDate ?? user.profile.joinedDate ?? '';

        const updatedUser = await user.save();

        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profile: updatedUser.profile,
        });
    } catch (error) {
        console.error('updateProfile error:', error);
        return res.status(500).json({ message: error.message });
    }
};

export { registerUser, loginUser, getMe, updateProfile };
