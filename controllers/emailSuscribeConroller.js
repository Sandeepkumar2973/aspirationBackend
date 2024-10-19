const EmailSuscribe = require("../models/emailSuscribeModel");

exports.submitEmailSuscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const emailSuscribe = new EmailSuscribe({ email });
        await emailSuscribe.save();
        res.status(201).send("EmailSuscribe message sent successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getEmailSuscribes = async (req, res) => {
    try {
        const emailSuscribes = await EmailSuscribe.find().sort({ createdAt: -1 });
        res.status(200).json(emailSuscribes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
