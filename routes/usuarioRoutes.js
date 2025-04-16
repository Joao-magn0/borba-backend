const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.post('/registro', controller.createUsuario);
router.post('/login', controller.loginUsuario);

module.exports = router;
