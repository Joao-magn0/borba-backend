const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionarioController');

router.get('/', controller.getFuncionarios);
router.post('/', controller.createFuncionario);
router.patch('/:id/consumo', controller.updateConsumo);
router.delete('/:id', controller.deleteFuncionario);

module.exports = router;
