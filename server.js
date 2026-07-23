// 1. Primeiro importamos o framework Express, que nos permite criar um servidor web de forma simples e rápida.
import express from 'express';


// 1.1. Também importamos os módulos 'fileURLToPath' e 'path', que nos permitem trabalhar com caminhos de arquivos e diretórios de forma mais fácil e segura.
import {fileURLToPath} from 'url';
import path from 'path';
// 1.2. Por fim, importamos a função 'testConnection' do arquivo 'db.js', que será utilizada para testar a conexão com o banco de dados.
import { testConnection } from './src/models/db.js';
// 1.3. Importamos a função 'getAllOrganizations' do arquivo 'organizations.js', que será utilizada para buscar todas as organizações cadastradas no banco de dados.
import router from './src/routes.js';




// 2. Em seguida, definimos a porta em que o servidor irá escutar as requisições. Caso a variável de ambiente PORT esteja definida, ela será utilizada; caso contrário, o servidor irá escutar na porta 3000. Também definimos o ambiente de execução (NODE_ENV), que pode ser 'development', 'production' ou outro valor definido na variável de ambiente.
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;


// 2.1 Em seguida, definimos as variáveis __filename e __dirname, que armazenam o caminho completo do arquivo atual e o diretório em que ele se encontra, respectivamente. Essas variáveis são úteis para trabalhar com caminhos relativos de arquivos e diretórios.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// 3. Por fim, criamos uma instância do Express, que será utilizada para configurar as rotas e middlewares do servidor.
const app = express();

// Allow Express to receive and process common POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// 3.1. Aqui configuramos o Express para servir arquivos estáticos a partir do diretório 'public'. Isso significa que qualquer arquivo presente nesse diretório poderá ser acessado diretamente pelo navegador, sem a necessidade de criar uma rota específica para ele.
app.use(express.static(path.join(__dirname, 'public')));
// 3.2. Configuramos o Express para utilizar o EJS como motor de visualização (view engine). Isso significa que podemos criar arquivos de template com a extensão '.ejs' e renderizá-los dinamicamente no servidor, permitindo a criação de páginas web mais complexas e interativas.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 3.3. Middleware para logar as requisições no console, apenas em ambiente de desenvolvimento. Isso é útil para depuração e monitoramento das requisições recebidas pelo servidor.
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Middleware para adicionar a variável de ambiente NODE_ENV aos locals do Express, permitindo que ela seja acessada nas views EJS. Isso é útil para exibir informações específicas do ambiente de execução na interface do usuário.
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});


// 4. Definimos as rotas do servidor.
app.use(router);

// 4.5. erro 404 - Página não encontrada. Esse middleware é chamado quando nenhuma das rotas anteriores corresponde à requisição. Ele cria um objeto de erro com a mensagem 'Page Not Found' e o status 404, e passa esse erro para o próximo middleware de tratamento de erros.
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});


// 5. Por fim, iniciamos o servidor, fazendo com que ele escute as requisições na porta definida anteriormente (3000). Quando o servidor estiver pronto para receber requisições, ele irá imprimir uma mensagem no console informando a URL de acesso e o ambiente de execução.
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});