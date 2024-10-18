const express = require('express');
const { createGrievance, getGrievances, getGrievanceById } = require('./../controllers/GrievanceController.js');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Adjust storage destination

const router = express.Router();

router.post('/create_grievance', upload.array('images', 10), createGrievance);
// Route to get all grievances
router.get('/grievances', getGrievances);

// Route to get a single grievance by ID
router.get('/grievances/:id', getGrievanceById);

module.exports = router;


module.exports = router;
