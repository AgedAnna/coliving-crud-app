// src/services/pessoaService.js
const dynamoDB = require("../utils/db");
const {
  PutCommand,
  QueryCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

/**
 * Cria uma nova pessoa na tabela DynamoDB.
 * @param {Object} pessoa - Objeto Pessoa a ser criado.
 */
const criarPessoa = async (pessoa) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_PESSOAS || "peoples",
    Item: pessoa,
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    console.log(`Pessoa criada com sucesso: ${JSON.stringify(pessoa)}`);
  } catch (error) {
    console.error(`Erro ao criar pessoa: ${error}`);
    throw error;
  }
};

/**
 * Lista todas as pessoas na tabela DynamoDB.
 * @returns {Promise<Array>} - Lista de pessoas.
 */
const listarPessoas = async (filtros = {}) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_PESSOAS || "peoples",
  };

  let FilterExpression = "";
  const ExpressionAttributeValues = {};

  if (filtros.nome) {
    if (FilterExpression) FilterExpression += " AND ";
    FilterExpression += "contains(nome, :nome)";
    ExpressionAttributeValues[":nome"] = filtros.nome;
  }

  if (filtros.email) {
    if (FilterExpression) FilterExpression += " AND ";
    FilterExpression += "email = :email"; // Busca exata para email
    ExpressionAttributeValues[":email"] = filtros.email;
  }

  if (filtros.tipo) {
    if (FilterExpression) FilterExpression += " AND ";
    FilterExpression += "tipo = :tipo";
    ExpressionAttributeValues[":tipo"] = filtros.tipo;
  }

  if (filtros.dataInicio && filtros.dataFim) {
    if (FilterExpression) FilterExpression += " AND ";
    FilterExpression += "dataDeCadastro BETWEEN :dataInicio AND :dataFim";
    ExpressionAttributeValues[":dataInicio"] = filtros.dataInicio;
    ExpressionAttributeValues[":dataFim"] = filtros.dataFim;
  }

  if (FilterExpression) {
    params.FilterExpression = FilterExpression;
    params.ExpressionAttributeValues = ExpressionAttributeValues;
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params));
    console.log("Resposta do DynamoDB:", JSON.stringify(data.Items, null, 2));
    return data.Items;
  } catch (error) {
    console.error("Erro ao listar pessoas:", error);
    throw error;
  }
};

/**
 * Obtém uma pessoa por ID.
 * @param {string} id - ID da pessoa.
 * @returns {Promise<Object|null>} - Objeto Pessoa ou null se não encontrado.
 */
const obterPessoaPorId = async (id) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_PESSOAS || "peoples",
    Key: { id },
  };

  try {
    const data = await dynamoDB.send(new GetCommand(params));
    console.log(`Pessoa obtida com ID ${id}: ${JSON.stringify(data.Item)}`);
    return data.Item || null;
  } catch (error) {
    console.error(`Erro ao obter pessoa com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Obtém uma pessoa por email usando o GSI EmailIndex.
 * @param {string} email - Email da pessoa.
 * @returns {Promise<Object|null>} - Objeto Pessoa ou null se não encontrado.
 */
const obterPessoaPorEmail = async (email) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_PESSOAS || "peoples",
    IndexName: "EmailIndex", // Nome exato do índice
    KeyConditionExpression: "email = :e",
    ExpressionAttributeValues: {
      ":e": email,
    },
  };

  console.log(`Consultando pessoa com email: ${email}`);

  try {
    const data = await dynamoDB.send(new QueryCommand(params));
    console.log(
      `Resultado da consulta por email ${email}: ${JSON.stringify(data)}`
    );
    return data.Items && data.Items.length > 0 ? data.Items[0] : null;
  } catch (error) {
    console.error(`Erro ao consultar por email (${email}):`, error);
    throw error;
  }
};

/**
 * Atualiza uma pessoa na tabela DynamoDB.
 * @param {string} id - ID da pessoa.
 * @param {Object} atualizacoes - Campos a serem atualizados.
 * @returns {Promise<Object|null>} - Objeto Pessoa atualizado ou null se não encontrado.
 */
const atualizarPessoa = async (id, atualizacoes) => {
  // Construir a expressão de atualização dinamicamente
  const campos = [];
  const valores = {};
  const nomesAtributos = {};

  for (const [chave, valor] of Object.entries(atualizacoes)) {
    campos.push(`#${chave} = :${chave}`);
    valores[`:${chave}`] = valor;
    nomesAtributos[`#${chave}`] = chave;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_PESSOAS || "peoples",
    Key: { id },
    UpdateExpression: `SET ${campos.join(", ")}`,
    ExpressionAttributeNames: nomesAtributos,
    ExpressionAttributeValues: valores,
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await dynamoDB.send(new UpdateCommand(params));
    console.log(
      `Pessoa atualizada com ID ${id}: ${JSON.stringify(data.Attributes)}`
    );
    return data.Attributes || null;
  } catch (error) {
    console.error(`Erro ao atualizar pessoa com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deleta uma pessoa da tabela DynamoDB.
 * @param {string} id - ID da pessoa.
 * @returns {Promise<void>}
 */
const deletarPessoa = async (id) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_PESSOAS || "peoples",
    Key: { id },
  };

  try {
    await dynamoDB.send(new DeleteCommand(params));
    console.log(`Pessoa com ID ${id} deletada com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar pessoa com ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  criarPessoa,
  listarPessoas,
  obterPessoaPorId,
  atualizarPessoa,
  deletarPessoa,
  obterPessoaPorEmail,
};
