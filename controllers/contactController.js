const Contact = require("../models/ContactModel");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, mobile, message,states,city,Course } = req.body;
    const contact = new Contact({ name, email, message, mobile,states,city,Course });
    await contact.save();
    res.status(201).send("Contact message sent successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
