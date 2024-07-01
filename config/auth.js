import jwt from 'jsonwebtoken';
import { ProcuraUsuarioByLoginId } from '../controller/usuarioController.js';

const SECRET = process.env.SECRET;

export default async function isAuth(req, res, next) {
    try {
        const token = req.headers['authorization'] || '';

        if (!token) {
            res.status(403).json({ message: 'Token inválido' });
            res.end();
            return;
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET);

        // procura o usuario pelo login id
        const user = await ProcuraUsuarioByLoginId({ id: decoded.login_id });

        if (!user) {
            res.status(403).json({ message: 'Token inválido' });
            res.end();
            return;
        }

        req.user = decoded;

        next();
    } catch (error) {
        res.status(403).json({ message: error });
        res.end();
        return;
    }
}
