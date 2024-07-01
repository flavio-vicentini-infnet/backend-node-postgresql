import { Router } from 'express';
import {
    CancelaInscricao,
    InscreveUsuario,
    ProcuraCursoById,
    ProcuraUsuarioCurso,
    ListaCursoUsuario,
    ListaTodosCursos,
} from '../controller/cursoController.js';
import isAuth from '../config/auth.js';

export const router = Router();

// lista todos os cursos disponiveis
router.get('/', async (req, res) => {
    try {
        const cursos = await ListaTodosCursos();

        return res.status(200).json({
            message: 'Cursos cadastrados',
            data: cursos,
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// inscreve usuário em um curso
router.post('/:idCurso', isAuth, async (req, res) => {
    try {
        const curso_id = req.params.idCurso;
        const usuario_id = req.user.usuario_id;

        // procura se existe curso com id
        const findCurso = await ProcuraCursoById({ id: curso_id });

        if (findCurso.length == 0) {
            return res.status(404).json({ message: `Curso com id ${curso_id} não encontrado` });
        }

        // inscreve o usuario em um curso
        const inscricao = await InscreveUsuario({ usuario_id: usuario_id, curso_id: curso_id });

        return res.status(200).json({
            message: 'Usuário cadastrado no curso',
            data: inscricao,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// cancela inscrição de usuário em um curso
router.delete('/:idCurso', isAuth, async (req, res) => {
    try {
        const curso_id = req.params.idCurso;
        const usuario_id = req.user.usuario_id;

        // check se o curso existe
        const procuraCurso = await ProcuraCursoById({ id: curso_id });

        if (procuraCurso.length == 0) {
            return res.status(404).json({ message: `Curso com id ${curso_id} não encontrado` });
        }

        // check se o usuário está inscrito no curso
        const inscricao = await ProcuraUsuarioCurso({ usuario_id: usuario_id, curso_id: curso_id });

        if (inscricao.length == 0) {
            return res
                .status(404)
                .json({ message: `Usuário com id ${usuario_id} não está inscrito no curso de id ${curso_id}` });
        }

        // cancela matricula do usuário
        const matriculaUpdate = await CancelaInscricao({ usuario_id: usuario_id, curso_id: curso_id });

        return res.status(200).json({
            message: 'Matrícula cancelada',
            data: matriculaUpdate,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// lista cursos que usuário está inscrito
router.get('/:idUsuario', isAuth, async (req, res) => {
    try {
        const usuario_id_params = req.params.idUsuario;
        const usuario_id_token = req.user.usuario_id;

        if (usuario_id_params != usuario_id_token) {
            return res.status(403).json({ message: `ID de Usuário inválido para o Token` });
        }

        const cursos = await ListaCursoUsuario({ usuario_id: usuario_id_params });

        return res.status(200).json({
            message: 'Cursos cadastrados',
            data: cursos,
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
