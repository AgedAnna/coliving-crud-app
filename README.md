# Coliving CRUD App - Backend e Frontend

## Descrição

O **Coliving CRUD App** é uma aplicação completa (backend + frontend) desenvolvida para gerenciar informações de clientes. O backend foi implementado em **Node.js** com **Express** e utiliza **Amazon DynamoDB** como banco de dados NoSQL, enquanto o frontend é construído com **React** utilizando **Ant Design** e **Chakra UI**.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [Configuração do Backend](#configuração-do-backend)
  - [Configuração do Frontend](#configuração-do-frontend)
- [Uso](#uso)
  - [Rodando o Backend](#rodando-o-backend)
  - [Rodando o Frontend](#rodando-o-frontend)
- [Documentação da API](#documentação-da-api)

---

## Tecnologias Utilizadas

### Backend
- **Node.js** (v18.x ou superior)
- **Express.js**
- **Amazon DynamoDB**
- **AWS SDK for JavaScript (v3)**
- **Joi** (Validação de Dados)
- **Swagger UI Express** (Documentação da API)
- **Nodemon** (Desenvolvimento)
- **Jest** e **Supertest** (Testes)
- **dotenv** (Gerenciamento de Variáveis de Ambiente)

### Frontend
- **React.js**
- **TypeScript**
- **Ant Design** (Design System)
- **Chakra UI**
- **Axios** (HTTP Client)
- **Vite** (Bundler)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado no seu sistema:

- **Node.js** (v18.x ou superior)
- **npm** (v8.x ou superior)
- **AWS Account** com acesso ao **DynamoDB**
- **AWS CLI** configurado (opcional, para comandos AWS)
- **Postman** ou **cURL** para testar a API

---

## Instalação

### Configuração do Backend

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/agedanna/coliving-crud-app.git

2. **Acesse o Diretório do Backend:**

   ```bash
    cd backend

3. **Instale as Dependências:**

   ```bash
    npm install

4. **Configure as Variáveis de Ambiente:**
    Crie um arquivo .env na raiz do diretório backend com o seguinte conteúdo:
   ```bash
    AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
    AWS_REGION=us-east-1
    DYNAMODB_TABLE_PESSOAS=peoples
    YOLO_API_URL=YOUR_API_URL
    PORT=3000

5. **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    O backend estará disponível em: http://localhost:3000.

### Configuração do Frontend

1. **Acesse o Diretório do Frontend:**

   ```bash
    cd coliving-crud-app/coliving-frontend

2. **Instale as Dependências:**

   ```bash
    npm install

3. **Configure as Variáveis de Ambiente:**
    Crie um arquivo .env na raiz do diretório frontend com o seguinte conteúdo:
   ```bash
    VITE_BASE_URL=http://localhost:3000/api

4. **Inicie o Servidor de Desenvolvimento:**
   ```bash
    npm run dev

### Documentação da API

    ```bash
    A documentação da API está disponível através do Swagger em:
    https://8dq7txnykc.execute-api.us-east-1.amazonaws.com/dev/api-docs/

