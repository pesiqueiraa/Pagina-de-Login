const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController.js');


// Cria novo usuário
router.post('/users', UserController.createUser);



module.exports = router