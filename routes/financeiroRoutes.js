const express = require('express');
const router = express.Router();
const controller = require('../controllers/financeiroController');

router.get('/', controller.getLancamentos);
router.post('/', controller.createLancamento);
router.delete('/:id', controller.deleteLancamento);

module.exports = router;
