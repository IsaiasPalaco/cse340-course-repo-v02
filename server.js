// 1. Primeiro importamos o framework Express, que nos permite criar um servidor web de forma simples e rápida.
import express from 'express';

// 2. Em seguida, definimos a porta em que o servidor irá escutar as requisições. Caso a variável de ambiente PORT esteja definida, ela será utilizada; caso contrário, o servidor irá escutar na porta 3000. Também definimos o ambiente de execução (NODE_ENV), que pode ser 'development', 'production' ou outro valor definido na variável de ambiente.
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// 3. Por fim, criamos uma instância do Express, que será utilizada para configurar as rotas e middlewares do servidor.
const app = express();

// 4. Aqui definimos uma rota para a raiz do servidor ('/'). Quando uma requisição GET for feita para essa rota, o servidor irá responder com a mensagem 'Hello from Express!'.
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// 5. Por fim, iniciamos o servidor, fazendo com que ele escute as requisições na porta definida anteriormente (3000). Quando o servidor estiver pronto para receber requisições, ele irá imprimir uma mensagem no console informando a URL de acesso e o ambiente de execução.
app.listen (PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});