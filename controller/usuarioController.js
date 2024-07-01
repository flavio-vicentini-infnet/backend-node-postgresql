import BCrypt from 'bcrypt';
import Query from '../config/db.js';
import { CriaLogin } from './loginController.js';

// cria um novo usuario e um novo login
export async function CriaUsuario({ nome, email, senha, nascimento }) {
    try {
        // insere o novo registro na tabela 'login'
        const new_login = await CriaLogin({ email: email, senha: senha });

        // insere o novo registro na tabela 'usuario'
        const new_usuario = await Query('INSERT INTO usuario(nome, nascimento, login_id) VALUES($1, $2, $3) RETURNING *', [
            nome,
            nascimento,
            new_login[0].id,
        ]);

        return new_usuario;
    } catch (error) {
        return error;
    }
}

// procura um usuario pelo id de login
export async function ProcuraUsuarioByLoginId({ id }) {
    try {
        const usuario = await Query('SELECT * FROM usuario WHERE login_id = $1', [id]);
        return usuario[0];
    } catch (error) {
        return error;
    }
}
