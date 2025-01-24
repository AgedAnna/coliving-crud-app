const axios = require("axios");
const { criarPessoa } = require("./pessoaService");
const Joi = require("joi");

const pessoaSchema = Joi.object({
  Nome: Joi.string().required(),
  Telefone: Joi.string().required(),
  "E-mail": Joi.string().email().required(),
  Tipo: Joi.string().required(),
  "Data de Cadastro": Joi.string().isoDate().required(),
});

const importarPessoas = async () => {
  try {
    const yoloApiUrl = process.env.YOLO_API_URL;
    if (!yoloApiUrl) {
      throw new Error("YOLO_API_URL não está definida no arquivo .env");
    }

    console.log(`Iniciando importação de dados da API da Yolo: ${yoloApiUrl}`);

    const response = await axios.get(yoloApiUrl);
    const data = response.data;

    if (!data.body) {
      throw new Error('Resposta da API da Yolo não contém o campo "body".');
    }

    const bodyParsed = JSON.parse(data.body);

    if (!bodyParsed.clientes || !Array.isArray(bodyParsed.clientes)) {
      throw new Error('Campo "clientes" não encontrado ou não é uma array.');
    }

    const pessoas = bodyParsed.clientes;

    console.log(`Número de clientes recebidos: ${pessoas.length}`);

    for (const pessoa of pessoas) {
      // Validar os dados da pessoa
      const { error, value } = pessoaSchema.validate(pessoa, {
        abortEarly: false,
      });
      if (error) {
        console.error(
          `Dados inválidos para pessoa: ${JSON.stringify(pessoa)} - Erro: ${
            error.message
          }`
        );
        continue;
      }

      const pessoaFormatada = {
        id: value["E-mail"],
        nome: value["Nome"],
        telefone: value["Telefone"],
        email: value["E-mail"],
        tipo: value["Tipo"],
        dataDeCadastro: value["Data de Cadastro"],
      };

      console.log(`Importando pessoa: ${JSON.stringify(pessoaFormatada)}`);

      try {
        await criarPessoa(pessoaFormatada);
        console.log(`Pessoa importada com sucesso: ${pessoaFormatada.email}`);
      } catch (error) {
        console.error(
          `Erro ao importar pessoa com email ${pessoaFormatada.email}:`,
          error
        );
      }
    }

    console.log("Importação concluída com sucesso.");
  } catch (error) {
    console.error("Erro durante a importação:", error);
    throw error;
  }
};

module.exports = { importarPessoas };
