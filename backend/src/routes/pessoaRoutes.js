const express = require('express');
const {
  criarPessoaHandler,
  listarPessoasHandler,
  obterPessoaHandler,
  atualizarPessoaHandler,
  deletarPessoaHandler,
  importarPessoasHandler,
} = require('../controllers/pessoaController');

const router = express.Router();

router.post('/pessoas', criarPessoaHandler);
router.get('/pessoas', listarPessoasHandler);
router.get('/pessoas/:id', obterPessoaHandler);
router.put('/pessoas/:id', atualizarPessoaHandler);
router.delete('/pessoas/:id', deletarPessoaHandler);
router.post('/pessoas/importar', importarPessoasHandler);

module.exports = router;
