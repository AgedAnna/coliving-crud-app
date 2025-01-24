// src/routes/pessoaRoutes.js

const express = require("express");
const {
  criarPessoaHandler,
  listarPessoasHandler,
  obterPessoaHandler,
  atualizarPessoaHandler,
  deletarPessoaHandler,
  importarPessoasHandler,
} = require("../controllers/pessoaController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pessoas
 *   description: Operações relacionadas a pessoas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pessoa:
 *       type: object
 *       required:
 *         - nome
 *         - telefone
 *         - email
 *         - tipo
 *         - dataDeCadastro
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da pessoa
 *         nome:
 *           type: string
 *           description: Nome da pessoa
 *         telefone:
 *           type: string
 *           description: Número de telefone
 *         email:
 *           type: string
 *           description: Endereço de e-mail
 *         tipo:
 *           type: string
 *           description: Tipo da pessoa (e.g., Operador, Proprietária)
 *         dataDeCadastro:
 *           type: string
 *           format: date
 *           description: Data de cadastro
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         nome: "Maria Oliveira"
 *         telefone: "+55 11 91234-5678"
 *         email: "maria@exemplo.com"
 *         tipo: "Proprietária"
 *         dataDeCadastro: "2025-01-24"
 */

/**
 * @swagger
 * /api/pessoas:
 *   get:
 *     summary: Lista todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pessoa'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pessoas", listarPessoasHandler);

/**
 * @swagger
 * /api/pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pessoa'
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       400:
 *         description: Dados inválidos fornecidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/pessoas", criarPessoaHandler);

/**
 * @swagger
 * /api/pessoas/{id}:
 *   get:
 *     summary: Obtém uma pessoa por ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da pessoa
 *     responses:
 *       200:
 *         description: Detalhes da pessoa retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pessoas/:id", obterPessoaHandler);

/**
 * @swagger
 * /api/pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa existente
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da pessoa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               tipo:
 *                 type: string
 *               dataDeCadastro:
 *                 type: string
 *                 format: date
 *             example:
 *               nome: "João Souza"
 *               telefone: "+55 11 91234-5678"
 *               email: "joao@exemplo.com"
 *               tipo: "Gestora"
 *               dataDeCadastro: "2025-01-25"
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/pessoas/:id", atualizarPessoaHandler);

/**
 * @swagger
 * /api/pessoas/{id}:
 *   delete:
 *     summary: Deleta uma pessoa por ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da pessoa
 *     responses:
 *       200:
 *         description: Pessoa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pessoa deletada com sucesso."
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/pessoas/:id", deletarPessoaHandler);

/**
 * @swagger
 * /api/pessoas/importar:
 *   post:
 *     summary: Importa pessoas em lote
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoas:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Pessoa'
 *             example:
 *               pessoas: [
 *                 {
 *                   "nome": "Maria Oliveira",
 *                   "telefone": "+55 11 91234-5678",
 *                   "email": "maria@exemplo.com",
 *                   "tipo": "Proprietária",
 *                   "dataDeCadastro": "2025-01-24"
 *                 },
 *                 // ... outras pessoas
 *               ]
 *     responses:
 *       200:
 *         description: Pessoas importadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imported:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Dados inválidos fornecidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/pessoas/importar", importarPessoasHandler);

module.exports = router;
