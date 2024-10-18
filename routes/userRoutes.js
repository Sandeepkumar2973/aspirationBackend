const express = require('express');
const { register, login, getUserById } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/userBy/:id', getUserById);

module.exports = router;
