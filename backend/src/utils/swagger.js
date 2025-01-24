const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Configura o Swagger no aplicativo Express.
 * @param {import('express').Express} app
 */
function setupSwagger(app) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Coliving CRUD API",
        version: "1.0.0",
        description: "API para gerenciamento de pessoas no Coliving.",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
        // Se quiser expor no ambiente de produção (AWS API Gateway), substitua aqui
        // {
        //   url: "https://SEU-API-ID.execute-api.us-east-1.amazonaws.com/dev",
        // },
      ],
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js"],
  };

  const specs = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = { setupSwagger };
