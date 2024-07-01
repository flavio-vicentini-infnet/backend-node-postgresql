import Query from '../config/db.js';

export async function ListaTodosCursos() {
    try {
        const cursos = await Query('SELECT * FROM curso');
        return cursos;
    } catch (error) {
        return error;
    }
}

export async function ProcuraCursoById({ id }) {
    try {
        const curso = await Query('SELECT * FROM curso WHERE id = $1', [id]);
        return curso;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// procura na tabela 'usuario_curso' se um usuario esta inscrito num curso
export async function ProcuraUsuarioCurso({ usuario_id, curso_id }) {
    try {
        const inscricao = await Query('SELECT * FROM usuario_curso WHERE usuario_id = $1 AND curso_id = $2', [
            usuario_id,
            curso_id,
        ]);

        return inscricao;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// inscreve um usuario em um curso
export async function InscreveUsuario({ usuario_id, curso_id }) {
    try {
        const inscricao = await Query(`INSERT INTO usuario_curso(usuario_id, curso_id) VALUES($1, $2) RETURNING *`, [
            usuario_id,
            curso_id,
        ]);

        return inscricao;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// cancela a inscricao de um usuario em um curso
export async function CancelaInscricao({ usuario_id, curso_id }) {
    try {
        const inscricaoUpdate = await Query(
            `UPDATE usuario_curso SET inscrito = false WHERE usuario_id = $1 AND curso_id = $2 RETURNING *`,
            [usuario_id, curso_id]
        );

        return inscricaoUpdate;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// lista os cursos que um usuario esta matriculado
export async function ListaCursoUsuario({ usuario_id }) {
    try {
        const cursos = await Query(
            `SELECT usuario.nome usuario_nome, curso.id id, curso.nome nome, curso.descricao descricao, curso.capa capa, curso.inscritos inscricoes, curso.comeca_em inicio, usuario_curso.inscrito inscrito
	            FROM usuario_curso 
                INNER JOIN usuario ON usuario_curso.usuario_id = usuario.id
                INNER JOIN curso ON usuario_curso.curso_id = curso.id
                INNER JOIN login ON usuario.login_id = login.id
                WHERE usuario.id = $1`,
            [usuario_id]
        );

        return cursos;
    } catch (error) {
        console.log(error);
        return error;
    }
}
