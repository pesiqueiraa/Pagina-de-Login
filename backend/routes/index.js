const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController.js');


// Cria novo usuário
router.post('/users/cadastro', UserController.createUser);

// Login de usuário
router.post('/users/login', UserController.loginUser);


module.exports = router