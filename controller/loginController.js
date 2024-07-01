import 'dotenv/config';
import BCrypt from 'bcrypt';
import Query from '../config/db.js';
import JWT from 'jsonwebtoken';
import { ProcuraUsuarioByLoginId } from './usuarioController.js';

const SECRET = process.env.SECRET;

// insere novo registro na tabela login
export async function CriaLogin({ email, senha }) {
    try {
        // criptografa a senha
        const senhaCriptografada = BCrypt.hashSync(senha, 10);

        // insere o novo registro
        const new_login = await Query('INSERT INTO login(email, senha) VALUES( $1, $2) RETURNING *', [
            email,
            senhaCriptografada,
        ]);

        return new_login;
    } catch (error) {
        return error;
    }
}

// procura um login pelo email
export async function ProcuraLoginByEmail({ email }) {
    try {
        const user = await Query('SELECT * FROM login WHERE email = $1', [email]);
        return user[0];
    } catch (error) {
        return error;
    }
}

// procura um login pelo id
export async function ProcuraLoginById({ id }) {
    try {
        const usuario = await Query('SELECT * FROM login WHERE id = $1', [id]);
        return usuario[0];
    } catch (error) {
        return error;
    }
}

// loga um usuario no sistema e devolve um JWT
export async function Login({ email, senha }) {
    const login = await ProcuraLoginByEmail({ email });

    if (!login) {
        console.log(`Email ${email} not found.`);
        throw Error(`Usuário com email '${email}' não encontrado`);
    }

    const matchPassword = BCrypt.compareSync(senha, login.senha);

    if (!matchPassword) {
        throw Error(`Usuário ou senha não estão corretos`);
    }

    // procura o usuario pelo id de login
    const usuario = await ProcuraUsuarioByLoginId({ id: login.id });

    const token = JWT.sign(
        {
            login_id: login.id,
            email: login.email,
            ativo: login.ativo,
            usuario_id: usuario.id,
        },
        SECRET,
        { expiresIn: '1h' }
    );

    return token;
}
