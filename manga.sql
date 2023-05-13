CREATE DATABASE IF NOT EXISTS `5-manga`;

USE `5-manga`;

CREATE TABLE mangas (
  id INT PRIMARY KEY auto_increment,
  nomemanga VARCHAR(255),
  synopsis	varchar(1500) ,
  author VARCHAR(255),
  themes VARCHAR(255),
status VARCHAR(255),
  genres VARCHAR(255),
  capamanga VARCHAR(255)
);
CREATE TABLE capitulos (
  id INT not null auto_increment,
  nomemanga VARCHAR(255),
  cap_num INT not null,
  manga_id int not null ,
  PRIMARY KEY (id),
  FOREIGN KEY (manga_id) REFERENCES mangas(id)
);
CREATE TABLE imagens (
  id INT not null auto_increment,
  pag_num INT not null,
  imag_url VARCHAR(255),
  cap_id int not null,
PRIMARY KEY (id),
  FOREIGN KEY (cap_id) REFERENCES capitulos(id) 
);

INSERT INTO mangas (nomemanga, synopsis, author, themes, status, genres, capamanga)VALUES ('Gokushufudou', 'Immortal Tatsu, o lendário yakuza que derrotou sozinho uma gangue rival com um cano de chumbo, é um nome conhecido por causar medo tanto em policiais endurecidos quanto em criminosos cruéis. Logo após seu súbito desaparecimento, ele ressurge com uma ligeira mudança de profissão. Agora equipado com um avental, Tatsu desistiu da violência e está tentando ganhar a vida honestamente como dono de casa.Enquanto se adapta às tarefas domésticas mundanas, Tatsu descobre que ser o dono da casa tem seus próprios desafios, desde o campo de batalha conhecido como vendas no supermercado até falhas na cozinha. Apesar de viver pacificamente, mal-entendidos parecem segui-lo a torto e a direito. Gokushufudou segue a vida cotidiana do ex-yakuza comicamente sério enquanto ele deixa para trás sua perigosa vida anterior para se tornar um marido que fica em casa.', 'Oono, Kousuke (Story & Art)', 'Adult Cast, Organized Crime', 'Em andamento', 'Ação, Aventura, Fantasia', 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/The_Way_of_the_Househusband.jpg/220px-The_Way_of_the_Househusband.jpg');
INSERT INTO capitulos (nomemanga,cap_num, manga_id) VALUES ('Gokushufudou',1, 1);
INSERT INTO imagens (pag_num, imag_url, cap_id)VALUES (1, 'https://static2.mangalivre.net/firefox/G9qi9z2XMGarxZwqtnIbQw/m3853388/7590/160794/166638/01.jpg', 1);

