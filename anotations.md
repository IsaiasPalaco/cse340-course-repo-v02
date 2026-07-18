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

1. Install nodemon as a development dependency by running the following command in your terminal: 
* npm install --save-dev nodemon

(The save-dev flag adds this to a list of dependencies for development only, because it will not be needed in the production environment.)

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

# CREATE AND CONNECT DATABASE
1. Create database (PostgreSQL)

2. Connect database from NodeJS
Install the pg library, which is a PostgreSQL client for Node.js. You can do this by running the following command in your project directory:

* npm install pg

3. Update the .env file in the root of your project to securely store your database connection information. Add the following lines to the file:

DB_URL=...
ENABLE_SQL_LOGGING=true

Make sure to replace the ... with your actual database details from the External Database URL you found earlier on the Render.com dashboard.

**SQL Debugging**
At some point in the future (certainly before you had active users on your website), you would change the value of your ENABLE_SQL_LOGGING environment variable to be false at Render, so that your application runs much more efficiently. However, at this point, the logging will be helpful as you track down bugs.

4. Create the Database Connection File
This section helps you create a file that will handle the connection to the database. It uses a connection pool approach to make the connection process as efficient as possible.

**Connection Pooling**
Creating a new database connection for every query would be extremely inefficient. Database connections require network handshakes, authentication, and resource allocation, which takes time and server resources. Connection pooling solves this by maintaining a set of reusable connections that can be shared across multiple requests.

When your application needs to run a query, it borrows a connection from the pool, executes the query, and returns the connection to the pool for reuse. This dramatically improves performance and reduces the load on your database server.

`In your src directory, create a new subdirectory named models. Then create a new file named db.js in the src/models/ directory of your project. This file will handle the database connection logic.`

Copy and paste the following code snippet into db.js:

`import { Pool } from 'pg';`

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: true
});

let db = null;

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') {
    db = {
        async query(text, params) {
            try {
                const start = Date.now();
                const res = await pool.query(text, params);
                const duration = Date.now() - start;
                console.log('Executed query:', { 
                    text: text.replace(/\s+/g, ' ').trim(), 
                    duration: `${duration}ms`, 
                    rows: res.rowCount 
                });
                return res;
            } catch (error) {
                console.error('Error in query:', { 
                    text: text.replace(/\s+/g, ' ').trim(), 
                    error: error.message 
                });
                throw error;
            }
        },

        async close() {
            await pool.end();
        }
    };
} else {
    // In production, export the pool directly without logging overhead
    db = pool;
}

const testConnection = async() => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

`export { db as default, testConnection };`

## Update the Main Server File to Test the Connection
Now that you have created the database connection and setup files, you need to update your main server file (server.js) to test the database connection when the server starts.

1. Open the server.js file in the root of your project.
After your other import statements at the top of the server.js file, add the following code to import the testConnection function from the db.js file:
`import { testConnection } from './src/models/db.js';`

2. Update the server startup code to call the testConnection function. Modify the app.listen section to look like this:
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});

# Displaying Database results in EJS
* Create a model file for Organizations

1. Create a new file src/models/organizations.js .
Add a function to query the database and get all the organizations, by adding the following code to the src/models/organizations.js file.

# MIDLEWARES

1. In this step, you will add a middleware function that will log every request to your application. This will help you understand how middleware processes every request that comes to your server.

In your server.js file, add the following code to come after the code that sets the view engine and the views directory, but directly before your route definitions.

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

2. Add middleware to make NODE_ENV available
In this step, you will create another middleware function to make the environment variable NODE_ENV available to all your templates. This will be helpful in the future, when you create an error page and want to display detailed error information only when NODE_ENV is set to development.

Add the following code directly after your previous middleware function that logs every request.

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});