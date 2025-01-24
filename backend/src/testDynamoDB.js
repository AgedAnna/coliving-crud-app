const dynamoDB = require("./src/utils/db");
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const listarTabelas = async () => {
  try {
    const data = await dynamoDB.send(new ListTablesCommand({}));
    console.log("Tabelas no DynamoDB:", data.TableNames);
  } catch (error) {
    console.error("Erro ao listar tabelas:", error);
  }
};

listarTabelas();
