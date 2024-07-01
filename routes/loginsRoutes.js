import { Router } from 'express';
import { Login } from '../controller/loginController.js';

export const router = Router();

router.post('/', async (req, res) => {
    try {
        const body = req.body;

        if (!body.email) {
            return res.status(400).json({ message: `email é obrigatório` });
        }

        if (!body.senha) {
            return res.status(400).json({ message: `senha é obrigatório` });
        }

        const user = await Login({ email: body.email, senha: body.senha });

        res.setHeader('Authorization', 'Bearer ' + user);

        return res.status(200).json({ message: `Usuario ${body.email} logado`, data: { token: user } });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
