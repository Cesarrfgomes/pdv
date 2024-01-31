create table usuarios (
	id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null
);

create table categorias (
	id serial primary key,
  descricao text not null
);

insert into categorias
(descricao)
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

-------------Sprint 2-------------

create table produtos(
	id serial primary key,
  descricao text,
  quantidade_estoque int,
  valor int not null,
  categoria_id int references categorias(id)
);

create table clientes(
	id serial primary key,
  nome text not null,
  email text not null unique,
  cpf varchar(11) not null unique,
  cep varchar(8),
  rua text,
  numero text,
  bairro text,
  cidade text,
  estado text
);


------------- Sprint 3 -------------

create table pedidos(
	id serial primary key,
  cliente_id int references clientes(id),
  observacao text,
  valor_total int
);

create table pedido_produtos (
	id serial primary key,
  pedido_id int references pedidos(id),
  produto_id int references produtos(id),
  quantidade_produto int not null,
  valor_produto int
);

alter table produtos add column produto_imagem text;