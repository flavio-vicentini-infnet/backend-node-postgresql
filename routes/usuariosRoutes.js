import { Router } from 'express';
import { CriaUsuario } from '../controller/usuarioController.js';
import { ProcuraLoginByEmail } from '../controller/loginController.js';

export const router = Router();

router.post('/', async (req, res) => {
    try {
        const body = req.body;

        if (!body.nome) {
            return res.status(400).json({ message: `nome de usuário é obrigatório` });
        }

        if (!body.email) {
            return res.status(400).json({ message: `email é obrigatório` });
        }

        if (!body.senha) {
            return res.status(400).json({ message: `senha é obrigatório` });
        }

        if (!body.nascimento) {
            return res.status(400).json({ message: `data de nascimento é obrigatório` });
        }

        // procura se ja tem um email utilizado na tabela 'login'
        const findEmail = await ProcuraLoginByEmail({ email: body.email });

        if (findEmail) {
            return res.status(400).json({ message: 'Usuário já cadastrado com o email informado.' });
        }

        // cria um novo usuario
        const new_usuario = await CriaUsuario({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            nascimento: body.nascimento,
        });

        return res.status(200).json({
            message: `Novo usuário criado com sucesso`,
            data: {
                nome: new_usuario[0].nome,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
