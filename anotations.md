# 📓 Meu Caderno de Estudos: Backend com Express.js

## 🚀 Sequência Correta de Desenvolvimento (Pipeline)

Sempre que for estruturar o arquivo principal do servidor (ex: `server.js` ou `app.js`), siga rigorosamente esta ordem para evitar erros de variáveis nulas ou rotas que não leem dados:

1. **Importações**: Trazer o Express, variáveis de ambiente e outras bibliotecas.
2. **Configurações**: Definir variáveis de ambiente (`.env`), portas (`PORT`) e inicializações de banco.
3. **Instanciação**: Criar a aplicação central com `const app = express();`.
4. **Middlewares Globais**: Ativar a pipeline de tratamento de dados (ex: `app.use(express.json());`).
5. **Rotas / Endpoints**: Definir as rotas e os caminhos do sistema (`app.get`, `app.post`).
6. **Inicialização**: Ligar o servidor com o `app.listen()`.

---

## ⚡ Install Nodemon for Development

1. Install nodemon as a development dependency by running the following command in your terminal: npm install --save-dev nodemon . (The save-dev flag adds this to a list of dependencies for development only, because it will not be needed in the production environment.)

2. Create a new file nodemon.json and copy the following configuration settings into this file to tell node the starring command to execute and which file extensions should trigger an update:
{
    "ext": "js css ejs env",
    "exec": "node server.js",
    "ignore": [
        ".git",
        "node_modules"
    ]
}

3. Update your package.json file to add a new script for starting your server in development mode. Replace your scripts section with the following:
"scripts": {
  "dev": "nodemon",
  "start": "node server.js"
},
This adds a new script named dev that uses nodemon to start your server. The start script will run node as normal for production use.

Now, instead of running your server with node server.js, you start it in development mode by running the command: npm run dev . (If you would like to run it in production mode, you run the command: npm run start .)

4. UPDATE ENVIRONMENT
// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;
Notice that these lines of code try to get the value from the environment variable first, but then fall back to other hardcoded values ('production' and 3000) if the environment variables are not found.

In order for your Node.js server to get the information from your .env file, you need to pass that file to it when you start the server. Update your nodemon.json file. Change the "exec": "node server.js", line to be the following:
"exec": "node --env-file=.env server.js",
This ensures that when the server is run in development mode, the .env file will be passed to it.