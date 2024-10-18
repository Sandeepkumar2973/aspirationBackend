const mongoose = require('mongoose');

const EmailSuscribeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const EmailSuscribe = mongoose.model('EmailSuscribe', EmailSuscribeSchema);

module.exports = EmailSuscribe;
