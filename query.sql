CREATE TABLE turmas(
   id INTEGER PRIMARY KEY,
   descricao TEXT NOT NULL,
   horario TEXT NOT NULL,
   vagas INTEGER,
   inicio TEXT,
   docente_id INTEGER NOT NULL,
   created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO turmas (descricao, horario, vagas, inicio, docente_id)
VALUES 
   ("básico", "manhã", 10, "2020-08-01", 4),
   ("intermediário", "manhã", 5, "2020-08-01", 4),
   ("conversação", "noite", 10, "2020-08-01", 5);

CREATE TABLE matriculas(
	id INTEGER PRIMARY KEY,
	estudante_id INTEGER NOT NULL,
	turma_id INTEGER NOT NULL,
	status TEXT NOT NULL,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO matriculas (estudante_id, turma_id, status)
VALUES 
   (1, 1, "confirmado"),
   (2, 2, "confirmado"),
   (3, 3, "cancelado");
