const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');

router.get('/', controller.getProdutos);
router.post('/', controller.createProduto);
router.delete('/:id', controller.deleteProduto);

module.exports = router;
