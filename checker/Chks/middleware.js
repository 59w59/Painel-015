import express from 'express' ;
import jwt from 'jsonwebtoken' ;

const app = express();
app.use(express.json());

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token

    if (!token) {
        return res.sendStatus(403); // Acesso negado se o token não existir
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token inválido ou expirado
        }
        req.user = user; // Adiciona o usuário ao req
        next(); // Continua para a próxima rota
    });
};

// Rota protegida
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

// Rota para fazer login e obter o token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Autenticação simples
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
