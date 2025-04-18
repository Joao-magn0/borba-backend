const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/produtoController');

// lista todos os produtos
router.get('/', controller.getProdutos);

// cria um novo produto
router.post('/', controller.createProduto);

// atualiza QUANTIDADE EXATA no produto { quantidade }
router.patch('/:id', controller.updateProduto);

// remove produto
router.delete('/:id', controller.deleteProduto);

module.exports = router;
