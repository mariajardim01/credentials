# 🔐 Credentials API

Uma API RESTful para gerenciamento seguro de credenciais, com autenticação JWT, criptografia de senhas, e validações robustas.  
Deploy: [https://credentials-jieu.onrender.com](https://credentials-jieu.onrender.com)

---

## 📌 Tecnologias utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **TypeScript**
- **Joi** (validação de schema)
- **Bcrypt** (hash de senha)
- **Crypto** (criptografia de credenciais)
- **JWT** (autenticação)
- **Render** (deploy)

---

## 🛠️ Instalação e uso local

1. **Clone o projeto:**

```bash
git clone https://github.com/mariajardim01/credentials.git
cd credentials
```

2. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` com:

```env
DATABASE_URL=postgres://<usuário>:<senha>@<host>:<porta>/<database>
PORT=5000
JWT_SECRET=sua_chave_jwt
ENCRYPTION_KEY=chaveaesde32caracteres_____
```

> A chave `ENCRYPTION_KEY` precisa ter exatamente **32 caracteres**.

3. **Instale as dependências:**

```bash
npm install
```

4. **Rode as migrations e seed:**

```bash
npx prisma migrate dev --name init
npm run seed
```

5. **Inicie a aplicação:**

```bash
npm run dev
```

---

## 📦 Endpoints

### 🔓 Health Check

```
GET /health
```
Retorna `200 OK` caso o servidor esteja funcionando.

---

### 🔐 Autenticação

#### POST /sign-up
Cadastro de usuário:

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "senha123"
}
```

- Retorna `201 Created` em caso de sucesso
- Valida:
  - Todos os campos obrigatórios
  - Senha com no mínimo 6 caracteres
  - E-mail único

#### POST /sign-in
Login de usuário:

```json
{
  "email": "maria@email.com",
  "password": "senha123"
}
```

- Retorna um `token JWT` válido
- Respostas possíveis:
  - `200 OK` com token
  - `401 Unauthorized` (credenciais inválidas)

---

### 🔒 Credenciais

Todos os endpoints abaixo requerem autenticação (`Authorization: Bearer {token}`).

#### POST /credentials
Criação de nova credencial:

```json
{
  "title": "GitHub",
  "url": "https://github.com",
  "username": "mariajardim",
  "password": "minhasenha123"
}
```

- Retorna `201 Created`
- A senha é **criptografada com AES** (via `crypto`) antes de ser armazenada

#### GET /credentials
Retorna todas as credenciais do usuário autenticado com **senha descriptografada**.

- Retorna `200 OK`
- Exemplo de resposta:

```json
[
  {
    "id": 1,
    "title": "GitHub",
    "url": "https://github.com",
    "username": "mariajardim",
    "password": "minhasenha123"
  }
]
```

---

### 🧹 DELETE /erase

Apaga o usuário autenticado **e todas as suas credenciais**.

- Retorna `200 OK`
- Precisa de autenticação
- Útil para deletar dados rapidamente

---

## 👤 Usuário padrão (seed)

Ao iniciar o projeto com `npm run seed`, o banco já virá com:

```json
{
  "name": "Demo",
  "email": "demo@driven.com.br",
  "password": "demo123"
}
```

> A senha já vem **criptografada** com `bcrypt`.

Você pode usar esse usuário para testar a API.

---

## 🧪 Validações

### ✅ Schema de requisição (Joi)
- Campos obrigatórios
- Email válido
- Senha mínima de 6 caracteres
- Validação feita em middleware global

### ✅ Erros tratados (middleware de erro)
- `422 Unprocessable Entity` → erros de schema
- `400 Bad Request` → IDs inválidos
- `409 Conflict` → email ou título já existente
- `401 Unauthorized` → token ausente ou inválido
- `404 Not Found` → credencial inexistente

---

## 🚀 Deploy

O projeto está publicado em:  
🌐 [https://credentials-jieu.onrender.com](https://credentials-jieu.onrender.com)

---

## 📁 Organização

- `src/controllers` – lógica das rotas
- `src/middlewares` – autenticação, validação de schema e erros
- `src/repositories` – abstração da camada de banco
- `src/services` – lógica de negócios e criptografia
- `src/protocols` – tipos e interfaces
- `prisma/schema.prisma` – definição do banco de dados

---

## 📌 Observações finais

- Projeto feito com base nas diretrizes da Driven Education
- Criptografia AES para senhas
- JWT para autenticação segura
- Código modular e validado

---

Feito com 💙 por [Maria Jardim](https://github.com/mariajardim01)
