const express = require("express");
const {
  submitContact,
  getContacts,
} = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit_details", submitContact);
router.get("/get_details", getContacts);

module.exports = router;
