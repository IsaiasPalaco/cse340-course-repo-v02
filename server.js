// 1. Primeiro importamos o framework Express, que nos permite criar um servidor web de forma simples e rápida.
import express from 'express';
// 1.1. Também importamos os módulos 'fileURLToPath' e 'path', que nos permitem trabalhar com caminhos de arquivos e diretórios de forma mais fácil e segura.
import {fileURLToPath} from 'url';
import path from 'path';


// 2. Em seguida, definimos a porta em que o servidor irá escutar as requisições. Caso a variável de ambiente PORT esteja definida, ela será utilizada; caso contrário, o servidor irá escutar na porta 3000. Também definimos o ambiente de execução (NODE_ENV), que pode ser 'development', 'production' ou outro valor definido na variável de ambiente.
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;


// 2.1 Em seguida, definimos as variáveis __filename e __dirname, que armazenam o caminho completo do arquivo atual e o diretório em que ele se encontra, respectivamente. Essas variáveis são úteis para trabalhar com caminhos relativos de arquivos e diretórios.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// 3. Por fim, criamos uma instância do Express, que será utilizada para configurar as rotas e middlewares do servidor.
const app = express();


// 3.1. Aqui configuramos o Express para servir arquivos estáticos a partir do diretório 'public'. Isso significa que qualquer arquivo presente nesse diretório poderá ser acessado diretamente pelo navegador, sem a necessidade de criar uma rota específica para ele.
app.use(express.static(path.join(__dirname, 'public')));
// 3.2. Configuramos o Express para utilizar o EJS como motor de visualização (view engine). Isso significa que podemos criar arquivos de template com a extensão '.ejs' e renderizá-los dinamicamente no servidor, permitindo a criação de páginas web mais complexas e interativas.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


// 4. Definimos as rotas do servidor.
// 4.1. A rota raiz ('/') é definida para responder a requisições GET, enviando o arquivo 'home.html' presente no diretório 'src/views'. Isso significa que quando o usuário acessar a URL raiz do servidor, ele verá a página inicial do site.
app.get('/', async (req, res) => {
    const title = "Home";
    res.render("home", { title });
});
// 4.2. As rotas '/organizations' e '/projects' são definidas para responder a requisições GET, enviando os arquivos 'organizations.html' e 'projects.html', respectivamente, presentes no diretório 'src/views'. Isso significa que quando o usuário acessar essas URLs, ele verá as páginas correspondentes.
app.get('/organizations', async (req, res) => {
    const title = "Our Partner Organizations";
    res.render("organizations", { title });
});

app.get('/projects', async (req, res) => {
    const title = "Service Projects";
    res.render("projects", { title });
});




// 5. Por fim, iniciamos o servidor, fazendo com que ele escute as requisições na porta definida anteriormente (3000). Quando o servidor estiver pronto para receber requisições, ele irá imprimir uma mensagem no console informando a URL de acesso e o ambiente de execução.
app.listen (PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});