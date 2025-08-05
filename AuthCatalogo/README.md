# API de Exemplo com Autenticação JWT (Node.js/Express)

Esta é uma API de exemplo construída com Node.js e Express que demonstra um fluxo completo de autenticação e autorização usando JSON Web Tokens (JWT), incluindo tokens de acesso (access tokens) e tokens de atualização (refresh tokens) armazenados em cookies HttpOnly.

## Funcionalidades

*   Registro de novos usuários (com hash de senha usando bcrypt).
*   Login de usuários com retorno de access token e refresh token (em cookie HttpOnly).
*   Endpoint protegido que requer um access token válido.
*   Renovação automática de access token usando o refresh token.
*   Logout com invalidação do refresh token (limpeza do cookie).
*   Uso de variáveis de ambiente para configuração segura.
*   Estrutura de projeto organizada (controllers, services, routes, middleware).

## Estrutura do Projeto

```
/auth-api
|-- /src
|   |-- /controllers       # Lógica dos endpoints
|   |-- /middleware        # Middleware (ex: autenticação)
|   |-- /models            # Modelos de dados (usuário em memória)
|   |-- /routes            # Definição das rotas da API
|   |-- /services          # Serviços (ex: geração/validação de token)
|   |-- config.js          # Carrega configuração do .env
|   |-- server.js          # Ponto de entrada da aplicação Express
|-- .env                 # Arquivo de variáveis de ambiente (NÃO INCLUIR EM GIT REAL)
|-- package.json         # Dependências e scripts do projeto
|-- package-lock.json
```

## Pré-requisitos

*   Node.js (versão 14 ou superior recomendada)
*   npm (geralmente vem com o Node.js)

## Instalação e Execução

1.  **Clone o repositório ou extraia o arquivo zip:**
    ```bash
    # Se for um zip:
    unzip auth-api.zip
    cd auth-api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    *   Renomeie ou crie um arquivo `.env` na raiz do projeto (`/auth-api`).
    *   Copie o conteúdo do arquivo `.env.example` (fornecido no zip) ou use o seguinte template, **substituindo os segredos por valores fortes e aleatórios**: 

    ```dotenv
    # .env
    PORT=3001

    # Gere segredos fortes e únicos para produção!
    ACCESS_TOKEN_SECRET="your_very_strong_access_token_secret_here_CHANGE_ME"
    REFRESH_TOKEN_SECRET="your_very_strong_refresh_token_secret_here_CHANGE_ME"

    ACCESS_TOKEN_EXPIRATION="15m"
    REFRESH_TOKEN_EXPIRATION="7d"

    REFRESH_TOKEN_COOKIE_NAME="refreshToken"
    REFRESH_TOKEN_COOKIE_MAX_AGE=604800000 # 7 dias em ms

    # Ajuste para a URL do seu frontend em produção
    CORS_ORIGIN="*" # Permite todos para teste
    ```

4.  **Inicie o Servidor:**
    ```bash
    node src/server.js
    ```
    O servidor estará rodando em `http://localhost:3001` (ou a porta definida no `.env`).

## Testando a API (Exemplos com `curl`)

Abra outro terminal para executar os comandos `curl`.

1.  **Registrar um Usuário:**
    ```bash
    curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "usuario_teste", "password": "senha123"}' \
    http://localhost:3001/auth/register
    ```
    *Resposta Esperada:* `{"message":"User registered successfully"}`

2.  **Fazer Login:** (Salva o cookie de refresh em `cookies.txt`)
    ```bash
    curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "usuario_teste", "password": "senha123"}' \
    -c cookies.txt \
    http://localhost:3001/auth/login
    ```
    *Resposta Esperada:* `{"accessToken":"<SEU_ACCESS_TOKEN>"}` (Copie o access token para o próximo passo)

3.  **Acessar Dados Protegidos:** (Substitua `<SEU_ACCESS_TOKEN>` pelo token obtido no login)
    ```bash
    ACCESS_TOKEN="<SEU_ACCESS_TOKEN>"
    curl -H "Authorization: Bearer $ACCESS_TOKEN" http://localhost:3001/api/data
    ```
    *Resposta Esperada:* `{"message":"Olá, usuario_teste! Estes são dados protegidos de exemplo.","userId":...}`

4.  **Renovar o Access Token (Refresh):** (Usa o cookie salvo em `cookies.txt`)
    ```bash
    curl -X POST -b cookies.txt -c cookies.txt http://localhost:3001/auth/refresh
    ```
    *Resposta Esperada:* `{"accessToken":"<NOVO_ACCESS_TOKEN>"}`

5.  **Fazer Logout:** (Usa e limpa o cookie salvo em `cookies.txt`)
    ```bash
    curl -X POST -b cookies.txt -c cookies.txt http://localhost:3001/auth/logout
    ```
    *Resposta Esperada:* (Nenhum conteúdo, status 204)

6.  **Tentar Acessar Dados Protegidos Após Logout:** (Deve falhar)
    ```bash
    # Use o token antigo ou o novo token do refresh
    ACCESS_TOKEN="<ACCESS_TOKEN_ANTERIOR>"
    curl -H "Authorization: Bearer $ACCESS_TOKEN" http://localhost:3001/api/data
    ```
    *Resposta Esperada:* `{"message":"Invalid or expired token"}` (Status 403)

7.  **Tentar Renovar Token Após Logout:** (Deve falhar)
    ```bash
    curl -X POST -b cookies.txt http://localhost:3001/auth/refresh
    ```
    *Resposta Esperada:* `{"message":"Refresh token not found"}` (Status 401, pois o cookie foi limpo)

## Observações

*   **Segurança:** Os segredos JWT (`ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`) no arquivo `.env` são cruciais para a segurança. Use valores longos, aleatórios e mantenha-os seguros. **Nunca** os coloque diretamente no código ou em repositórios públicos.
*   **Produção:** Para produção, considere usar um banco de dados real (PostgreSQL, MongoDB, etc.) em vez do armazenamento em memória para usuários. Habilite `secure: true` para cookies (`NODE_ENV=production`) e configure o `CORS_ORIGIN` corretamente.
*   **Armazenamento de Refresh Tokens:** Este exemplo usa cookies HttpOnly. Uma alternativa é armazenar os refresh tokens ativos no banco de dados associados ao usuário para permitir a invalidação de sessões específicas.
*   **HTTPS:** Sempre use HTTPS em produção para proteger a comunicação.

