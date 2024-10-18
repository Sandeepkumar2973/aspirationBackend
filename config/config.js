
const cloudinary = require('cloudinary').v2;  // Make sure to use the 'v2' version of the SDK
require('dotenv').config();  // Load environment variables from .env file

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,        // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET,  // Your Cloudinary API secret
});

// Export the configured cloudinary instance
module.exports = cloudinary;
