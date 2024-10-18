const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { submitEmailSuscribe, getEmailSuscribes } = require("../controllers/emailSuscribeConroller");

const router = express.Router();

router.post("/submit_details", submitEmailSuscribe);
router.get("/get_details", getEmailSuscribes);

module.exports = router;
