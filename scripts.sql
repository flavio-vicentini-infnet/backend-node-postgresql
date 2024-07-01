CREATE TABLE IF NOT EXISTS login
(
    id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    senha text NOT NULL,
    ativo boolean DEFAULT true,
    created_at date DEFAULT now(),
    updated_at date DEFAULT now()
)

CREATE TABLE IF NOT EXISTS usuario
(
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    nascimento text NOT NULL,
    login_id integer NOT NULL REFERENCES login(id)
)

CREATE TABLE IF NOT EXISTS curso
(
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    descricao text NOT NULL,
    capa text NOT NULL,
    inscritos integer NOT NULL,
    comeca_em date NOT NULL
)

CREATE TABLE IF NOT EXISTS usuario_curso
(
    id SERIAL PRIMARY KEY,
    usuario_id integer REFERENCES usuario(id),
    curso_id integer REFERENCES curso(id),
    inscrito boolean DEFAULT true
)


INSERT INTO curso(
    nome, descricao, capa, inscritos, comeca_em)
VALUES 
('Desenvolvimento Web com React e Next.js', 'Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.', 'https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg', 1234, '2024-06-20'),
('Introdução à Inteligência Artificial', 'Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.', 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg', 5678, '2024-07-15'),
('Fotografia para Iniciantes', 'Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.', 'https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg', 9012, '2024-08-10'),
('Inglês Instrumental para o Mercado de Trabalho', 'Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.', 'https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg', 13579, '2024-09-05'),
('Finanças Pessoais para Iniciantes', 'Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.', 'https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg', 17263, '2024-10-01'),
('Culinária Vegetariana', 'Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.', 'https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg', 21947, '2024-10-20'),
('Yoga para Iniciantes', 'Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.', 'https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg', 26631, '2024-11-15'),
('Produtividade Pessoal', 'Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.', 'https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg', 31315, '2024-12-05');