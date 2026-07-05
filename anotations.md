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

## UPDATE ENVIRONMENT
// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;
Notice that these lines of code try to get the value from the environment variable first, but then fall back to other hardcoded values ('production' and 3000) if the environment variables are not found.

In order for your Node.js server to get the information from your .env file, you need to pass that file to it when you start the server. Update your nodemon.json file. Change the "exec": "node server.js", line to be the following:
"exec": "node --env-file=.env server.js",
This ensures that when the server is run in development mode, the .env file will be passed to it.

## Project Structure
Your project will have two main folders that serve different purposes:

public/: Contains static files that browsers can access directly (CSS, images, client-side JavaScript)
src/views/: Contains HTML files that Express serves through routes
This separation reflects how modern web applications work. Files in public/ are served exactly as they exist on your server—no processing, no security checks, no logic. They are perfect for assets that never change: stylesheets, images, fonts, and client-side JavaScript files. Anyone can request these directly by typing the URL.

Files in src/views/, on the other hand, are served through your application logic. Your Express app decides whether to serve them, can modify them before serving, can apply security checks, and can even generate them dynamically. This gives you complete control over what users see and when they see it.

## Install and Configure EJS

1. Install the EJS templating engine using npm, by running the following command in the terminal (in your project root directory):
* npm install ejs

2. Configure Express to use EJS by adding these lines to your server.js file. This code should go in your middleware configuration section just after your public static directory configuration:

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

## Create header and footer EJS partials
An EJS partial is a reusable template fragment that contains code you want to use in multiple places. Think of partials as the template equivalent of functions in programming – they let you write something once and use it everywhere.

For example, instead of copying your navigation menu into every page template, you create one navigation partial and include it wherever you need it. You only have to change the navigation in one place and it will be updated everywhere automatically.

1. Create a partials directory inside your src/views directory. This is where you will store your reusable template components.
Create the header partial by creating a new file src/views/partials/header.ejs.

## Convert static pages to EJS templates
Now comes the transformation. You will convert your static HTML files into dynamic EJS templates that use the partials you just created.

Complete the following steps:

1. Rename your .html files to use the .ejs extension. You should rename each of the following files in your src/views directory:
home.html → home.ejs
organizations.html → organizations.ejs
projects.html → projects.ejs

## Update your routes to use templates
1. Next, update your routes to have Node render EJS templates instead of sending static HTML files. The key change is switching from res.sendFile() to res.render().

Update your routes in server.js to look like this:

app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});