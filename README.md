# 🛍️ FakeStore Catalog & Auth API

Este projeto consiste em uma **aplicação fullstack** que simula uma loja virtual com **catálogo de produtos**, **carrinho de compras**, **checkout** e **autenticação JWT**.  
O frontend é feito em **React + Vite**, e o backend em **Node.js + Express**, utilizando **JWT** e **cookies HttpOnly** para autenticação.

---

## 🚀 Pré-requisitos

- **Node.js v20+**  
- **npm** (vem junto com o Node)

---

## 📦 Instalação & Execução

O projeto possui **duas pastas principais**:  
- **Frontend** → `/CatalogoDeProdutos`  
- **Backend** → `/Authcatalogo`  

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2️⃣ Instale as dependências

Abra **dois terminais** (ou abas no VSCode), um para cada parte do projeto.

#### **Terminal 1 - Frontend (CatalogoDeProdutos)**

```bash
cd CatalogoDeProdutos
npm install
npm run dev
```

O frontend será iniciado via **Vite**.

#### **Terminal 2 - Backend (Authcatalogo)**

```bash
cd Authcatalogo
npm install
npm run dev
```

O backend subirá um servidor **Express** na porta configurada (padrão: `http://localhost:5000`).

---

## 📂 Estrutura do Projeto

```
.
├── catalogo/          # Frontend React (Vite + Tailwind + Context API)
│   ├── src/
│   │   ├── Pages/     # Páginas: Home, Checkout, ProductPage, Login/Register...
│   │   ├── contexts/  # Contextos: Auth, Cart, Products
│   │   ├── Components # Navbar, Input, Button, Card...
│   │   └── main.tsx   # Entrada do React Router + Providers
│
└── Authcatalogo/      # Backend Node.js (Express + JWT + bcrypt)
    ├── src/
    │   ├── controllers/ # Lógica de autenticação
    │   ├── models/      # Model User (simulação)
    │   ├── routes/      # Rotas: /auth e /api
    │   ├── services/    # Serviço de tokens JWT
    │   └── server.js    # Inicialização do servidor
```

---

## 🔑 Autenticação

- **Login**: `POST /auth/login` → retorna um `accessToken` e define o `refreshToken` em cookie HttpOnly.  
- **Register**: `POST /auth/register` → cria usuário e faz login automático.  
- **Refresh Token**: `POST /auth/refresh` → retorna novo `accessToken`.  
- **Logout**: `POST /auth/logout` → limpa cookie de refresh.  

---

## 🛠️ Tecnologias Principais

**Frontend**  
- React + Vite  
- TailwindCSS  
- React Router DOM  
- Context API  

**Backend**  
- Node.js + Express  
- JWT para autenticação  
- bcrypt para hash de senhas  
- Cookie-Parser e CORS configurados  

---

Pronto! Ao rodar os dois terminais, acesse:

```
http://localhost:5173
```

e faça login para utilizar o carrinho e checkout autenticado. 🎉
