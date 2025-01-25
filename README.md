




# Coliving CRUD App - Backend

## Descrição

O **Coliving CRUD App** é uma aplicação backend desenvolvida em **Node.js** com **Express**, projetada para gerenciar informações de clientes e integrar-se com a API externa da **Yolo** para importação de dados. A aplicação utiliza o **Amazon DynamoDB** como banco de dados NoSQL para armazenamento eficiente e escalável dos dados.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
  - [Iniciar o Servidor](#iniciar-o-servidor)
  - [Endpoints da API](#endpoints-da-api)
    - [1. Criar uma Nova Pessoa](#1-criar-uma-nova-pessoa)
    - [2. Listar Todas as Pessoas](#2-listar-todas-as-pessoas)
    - [3. Obter uma Pessoa por ID](#3-obter-uma-pessoa-por-id)
    - [4. Obter uma Pessoa por Email](#4-obter-uma-pessoa-por-email)
    - [5. Atualizar uma Pessoa](#5-atualizar-uma-pessoa)
    - [6. Deletar uma Pessoa](#6-deletar-uma-pessoa)
    - [7. Importar Dados da API da Yolo](#7-importar-dados-da-api-da-yolo)
- [Documentação da API](#documentação-da-api)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Tecnologias Utilizadas

- **Node.js** (v18.x ou superior)
- **Express.js**
- **Amazon DynamoDB**
- **AWS SDK for JavaScript (v3)**
- **Joi** (Validação de Dados)
- **Swagger UI Express** (Documentação da API)
- **Nodemon** (Desenvolvimento)
- **Jest** e **Supertest** (Testes)
- **dotenv** (Gerenciamento de Variáveis de Ambiente)

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado no seu sistema:

- **Node.js** (v18.x ou superior)
- **npm** (v8.x ou superior)
- **AWS Account** com acesso ao **DynamoDB**
- **AWS CLI** configurado (opcional, para comandos AWS)
- **Postman** ou **cURL** para testar a API

## Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/agedanna/coliving-crud-app.git


## Acesse o Diretório do Backend:

```bash
    cd coliving-crud-app/backend
```

## Instale as Dependências:
```bash
    npm install
```

## Crie um Arquivo .env na Raiz do Diretório backend
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
AWS_REGION=us-east-1
DYNAMODB_TABLE_PESSOAS=peoples
YOLO_API_URL=YOUR_URL
PORT=3000

## Iniciar o Servidor

```bash
    npm npm run dev
```