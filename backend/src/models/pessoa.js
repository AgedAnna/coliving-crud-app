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
 *           description: Telefone da pessoa
 *         email:
 *           type: string
 *           description: Email da pessoa
 *         tipo:
 *           type: string
 *           description: Tipo da pessoa (e.g., Operador, Hóspede, Proprietário)
 *         dataDeCadastro:
 *           type: string
 *           format: date
 *           description: Data de cadastro da pessoa
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         nome: "João Silva"
 *         telefone: "+55 10 91839-4447"
 *         email: "joao@exemplo.com"
 *         tipo: "Operador"
 *         dataDeCadastro: "2024-02-07"
 */

/**
 * @typedef {Object} Pessoa
 * @property {string} id - ID único da pessoa.
 * @property {string} nome - Nome da pessoa.
 * @property {string} telefone - Telefone da pessoa.
 * @property {string} email - Email da pessoa.
 * @property {string} tipo - Tipo da pessoa.
 * @property {string} dataDeCadastro - Data de cadastro da pessoa.
 * @property {string} [outroCampo] - Outros campos conforme necessário.
 */

module.exports = {};
