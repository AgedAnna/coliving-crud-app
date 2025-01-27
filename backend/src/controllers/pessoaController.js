const { v4: uuidv4 } = require("uuid");
const {
  criarPessoa,
  listarPessoas,
  obterPessoaPorId,
  atualizarPessoa,
  deletarPessoa,
  obterPessoaPorEmail,
} = require("../services/pessoaService");
const { importarPessoas } = require("../services/importService");

const criarPessoaHandler = async (req, res) => {
  try {
    const { nome, telefone, email, tipo } = req.body;

    if (!nome || !telefone || !email || !tipo) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const pessoaExistente = await obterPessoaPorEmail(email);
    if (pessoaExistente) {
      return res
        .status(409)
        .json({ message: "Pessoa com este email já existe." });
    }

    const novaPessoa = {
      id: uuidv4(),
      nome,
      telefone,
      email,
      tipo,
      dataDeCadastro: new Date().toISOString(),
    };

    await criarPessoa(novaPessoa);
    return res.status(201).json(novaPessoa);
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);

    if (error.name === "ValidationException") {
      return res.status(400).json({ message: "Requisição inválida." });
    }

    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const listarPessoasHandler = async (req, res) => {
  try {
    const { nome, email, tipo, dataInicio, dataFim } = req.query;

    const filtros = {};

    if (nome) {
      filtros.nome = nome;
    }

    if (email) {
      filtros.email = filtros.email;
    }

    if (tipo) {
      filtros.tipo = tipo;
    }

    if (dataInicio && dataFim) {
      filtros.dataDeCadastro = {
        $gte: new Date(dataInicio),
        $lte: new Date(dataFim),
      };
    }

    const pessoas = await listarPessoas(filtros);
    res.status(200).json(pessoas);
  } catch (error) {
    console.error("Erro ao listar pessoas:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterPessoaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const pessoa = await obterPessoaPorId(id);

    if (!pessoa) {
      res.status(404).json({ message: "Pessoa não encontrada." });
      return;
    }

    res.status(200).json(pessoa);
  } catch (error) {
    console.error("Erro ao obter pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const atualizarPessoaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const pessoaAtualizada = await atualizarPessoa(id, atualizacoes);

    if (!pessoaAtualizada) {
      res.status(404).json({ message: "Pessoa não encontrada." });
      return;
    }

    res.status(200).json(pessoaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarPessoaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deletarPessoa(id);
    res.status(200).json({ message: "Pessoa deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const importarPessoasHandler = async (req, res) => {
  try {
    await importarPessoas();
    res.status(200).json({ message: "Importação concluída com sucesso." });
  } catch (error) {
    console.error("Erro ao importar pessoas:", error);
    res.status(500).json({ message: "Erro na importação dos dados." });
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
