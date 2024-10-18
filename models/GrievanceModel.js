const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    images: [{
        type: String,  // URLs of uploaded images
        required: false,
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        // required: true,
    },
}, { timestamps: true });

const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = Grievance;
