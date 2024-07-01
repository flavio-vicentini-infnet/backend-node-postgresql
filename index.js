import express from 'express';
import { router as usuariosRoutes } from './routes/usuariosRoutes.js';
import { router as loginsRoutes } from './routes/loginsRoutes.js';
import { router as cursosRoutes } from './routes/cursosRoutes.js';

const app = express();

const port = 3333;
const host = '127.0.0.1';

app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/login', loginsRoutes);
app.use('/cursos', cursosRoutes);

app.listen(port, host, () => {
    console.log(`App listen on http://${host}:${port}`);
});
