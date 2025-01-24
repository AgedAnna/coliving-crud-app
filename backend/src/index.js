const express = require("express");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const { setupSwagger } = require("./utils/swagger");
const pessoaRoutes = require("./routes/pessoaRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", pessoaRoutes);

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("API do Coliving CRUD");
});

const handler = serverless(app);
module.exports.handler = handler;

if (process.env.NODE_ENV !== "production") {
  setupSwagger(app);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}
