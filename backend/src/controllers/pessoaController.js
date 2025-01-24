const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const tableName = process.env.DYNAMODB_TABLE_PESSOAS;

const listarPessoasHandler = async (req, res) => {
  console.log("Iniciando listarPessoasHandler");
  try {
    const params = {
      TableName: tableName,
    };

    console.log("Parâmetros do DynamoDB Scan:", params);

    const data = await dynamoDb.scan(params).promise();
    console.log("Dados recebidos do DynamoDB:", data);

    res.status(200).json(data.Items);
  } catch (error) {
    console.error("Erro ao listar pessoas:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const criarPessoaHandler = async (req, res) => {
  console.log("Iniciando criarPessoaHandler");
  try {
    const { nome, telefone, email, tipo, dataDeCadastro } = req.body;

    if (!nome || !telefone || !email || !tipo || !dataDeCadastro) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const item = {
      id: uuidv4(),
      nome,
      telefone,
      email,
      tipo,
      dataDeCadastro,
    };

    const params = {
      TableName: tableName,
      Item: item,
    };

    console.log("Parâmetros do DynamoDB Put:", params);

    await dynamoDb.put(params).promise();

    res.status(201).json(item);
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterPessoaHandler = async (req, res) => {
  console.log("Iniciando obterPessoaHandler");
  try {
    const { id } = req.params;

    const params = {
      TableName: tableName,
      Key: { id },
    };

    console.log("Parâmetros do DynamoDB Get:", params);

    const data = await dynamoDb.get(params).promise();

    console.log("Dados recebidos do DynamoDB:", data);

    if (data.Item) {
      res.status(200).json(data.Item);
    } else {
      res.status(404).json({ message: "Pessoa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao obter pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const atualizarPessoaHandler = async (req, res) => {
  console.log("Iniciando atualizarPessoaHandler");
  try {
    const { id } = req.params;
    const { nome, telefone, email, tipo, dataDeCadastro } = req.body;

    const getParams = {
      TableName: tableName,
      Key: { id },
    };

    console.log(
      "Parâmetros do DynamoDB Get para verificar existência:",
      getParams
    );

    const getData = await dynamoDb.get(getParams).promise();

    if (!getData.Item) {
      return res.status(404).json({ message: "Pessoa não encontrada." });
    }

    const updateExpression = [];
    const expressionAttributeValues = {};

    if (nome) {
      updateExpression.push("nome = :nome");
      expressionAttributeValues[":nome"] = nome;
    }
    if (telefone) {
      updateExpression.push("telefone = :telefone");
      expressionAttributeValues[":telefone"] = telefone;
    }
    if (email) {
      updateExpression.push("email = :email");
      expressionAttributeValues[":email"] = email;
    }
    if (tipo) {
      updateExpression.push("tipo = :tipo");
      expressionAttributeValues[":tipo"] = tipo;
    }
    if (dataDeCadastro) {
      updateExpression.push("dataDeCadastro = :dataDeCadastro");
      expressionAttributeValues[":dataDeCadastro"] = dataDeCadastro;
    }

    if (updateExpression.length === 0) {
      return res.status(400).json({ message: "Nenhum campo para atualizar." });
    }

    const updateParams = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: "SET " + updateExpression.join(", "),
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    console.log("Parâmetros do DynamoDB Update:", updateParams);

    const updateData = await dynamoDb.update(updateParams).promise();

    console.log("Dados atualizados recebidos do DynamoDB:", updateData);

    res.status(200).json(updateData.Attributes);
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarPessoaHandler = async (req, res) => {
  console.log("Iniciando deletarPessoaHandler");
  try {
    const { id } = req.params;

    const getParams = {
      TableName: tableName,
      Key: { id },
    };

    console.log(
      "Parâmetros do DynamoDB Get para verificar existência:",
      getParams
    );

    const getData = await dynamoDb.get(getParams).promise();

    if (!getData.Item) {
      return res.status(404).json({ message: "Pessoa não encontrada." });
    }

    const deleteParams = {
      TableName: tableName,
      Key: { id },
    };

    console.log("Parâmetros do DynamoDB Delete:", deleteParams);

    await dynamoDb.delete(deleteParams).promise();

    res.status(200).json({ message: "Pessoa deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const importarPessoasHandler = async (req, res) => {
  console.log("Iniciando importarPessoasHandler");
  try {
    const { pessoas } = req.body;

    if (!Array.isArray(pessoas) || pessoas.length === 0) {
      return res
        .status(400)
        .json({ message: "A lista de pessoas está vazia ou inválida." });
    }

    const putRequests = pessoas.map((pessoa) => ({
      PutRequest: {
        Item: {
          id: uuidv4(),
          ...pessoa,
        },
      },
    }));

    const params = {
      RequestItems: {
        [tableName]: putRequests,
      },
    };

    console.log("Parâmetros do DynamoDB BatchWrite:", params);

    const data = await dynamoDb.batchWrite(params).promise();

    console.log("Resposta do DynamoDB BatchWrite:", data);

    res.status(200).json({ imported: pessoas.length });
  } catch (error) {
    console.error("Erro ao importar pessoas:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  criarPessoaHandler,
  listarPessoasHandler,
  obterPessoaHandler,
  atualizarPessoaHandler,
  deletarPessoaHandler,
  importarPessoasHandler,
};
