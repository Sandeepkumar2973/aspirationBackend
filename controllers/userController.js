const UserModel = require('./../models/userModel.js');
const JWT = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email or phone number already registered",
            });
        }

        // Create and save the new user
        const user = new UserModel({ name, email, phone, password, address });
        await user.save();

        res.status(201).send({
            success: true,
            message: "UserModel registered successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};

// UserModel login
exports.login = async (req, res) => {
    try {
        const { phoneOrEmail, password } = req.body;

        // Find user by email or phone
        let user;
        if (!isNaN(phoneOrEmail)) {
            user = await UserModel.findOne({ phone: phoneOrEmail });
        } else {
            user = await UserModel.findOne({ email: phoneOrEmail });
        }

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or phone number",
            });
        }

        // Compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid password",
            });
        }

        // Generate JWT
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;  // Get user ID from the request params
        const user = await UserModel.findById(userId);  // Fetch user by ID

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        // Respond with the user
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message,
        });
    }
};


