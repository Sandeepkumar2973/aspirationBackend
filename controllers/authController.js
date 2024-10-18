const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require('../models/authModel');

exports.signup = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('mobile').matches(/^[0-9]{10}$/).withMessage('Mobile number must be 10 digits'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password ,mobile} = req.body;

            const existingUser = await Admin.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Admin already exists' });
            }

            const admin = new Admin({ username, email,mobile, password });
            await admin.save();

            res.status(201).send('Admin created successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
];

exports.login = [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;

            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await admin.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).send({
                success: true,
                message: "Login successfully",
                admin: {
                    name: admin.username,
                    email: admin.email,
                },
                token,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
];

// exports.login = [
//     body('identifier')
//         .notEmpty()
//         .withMessage('Email or mobile number is required')
//         .custom(value => {
//             if (/^\S+@\S+\.\S+$/.test(value)) {
//                 return true; // Valid email format
//             }
//             if (/^[0-9]{10}$/.test(value)) {
//                 return true; // Valid 10-digit mobile number format
//             }
//             throw new Error('Please provide a valid email or mobile number');
//         }),
//     body('password').notEmpty().withMessage('Password is required'),

//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         try {
//             const { identifier, password } = req.body;

//             // Check if identifier is an email or mobile number
//             const query = /^\S+@\S+\.\S+$/.test(identifier)
//                 ? { email: identifier }
//                 : { mobile: identifier };

//             const admin = await Admin.findOne(query);
//             if (!admin) {
//                 return res.status(400).json({ message: 'Invalid credentials' });
//             }

//             const isMatch = await admin.comparePassword(password);
//             if (!isMatch) {
//                 return res.status(400).json({ message: 'Invalid credentials' });
//             }

//             const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//             res.status(200).send({
//                 success: true,
//                 message: "Login successfully",
//                 admin: {
//                     name: admin.username,
//                     email: admin.email,
//                 },
//                 token,
//             });
//         } catch (error) {
//             res.status(500).send(error.message);
//         }
//     }
// ];