# PDV - DESAFIO 05 CUBOS ACADEMY - B2BT08

PDV - É uma API RESTful desenvolvida com Node.js e Express 4 que através de operações CRUD, com persistência em banco de dados PostgresSQL responde requisições de transações em um modelo PDV.

Características
--------
- Cadastrar e atualizar cadastros de usuários, produtos e clientes.
- Validação dos campos de entrada do cadastro.
- Atribuir uma imagem ao produto.
- Excluir produto.
- Cadastrar e listar pedidos.
- Enviar email de confirmação do pedido para o cliente.
- Listar, detalhar e filtrar cadastros.

Preparação
---------------
1. Caso ainda não possua, você vai precisar do [Node.js](http://nodejs.org/) instalado na sua máquina.  
2. Clonar o repositório:

		git clone git@github.com:Cesarrfgomes/pdv.git

3. Instalar os pacotes e dependências:

		npm install	

5. Executar o servidor:

		npm run dev

Uso
-----
- Você pode executar o servidor localmente com a url: [http://localhost:3000/](http://localhost:3000/). 
- Para isso, escolha um navegador, ou uma ferramenta de teste de API como o [Insomnia](http://www.[insomnia.rest]).
- O esquema para criar o banco de dados e suas tabelas você encontra no arquivo "squema.sql" dentro da pasta "bancoDeDados".
- Todo valor (dinheiro) deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000).

- Deploy: https://lazy-gray-alligator-gown.cyclic.app
  
## Endpoints

### Cadastrar Usuário

- **Endpoint:** ```[POST] /usuario```
- **Descrição:** O endpoint realiza o cadastro de um novo usuário.
- **Corpo da Solicitação:**
	```json
	{
	  "nome": "Rodrigo",
	  "email": "rodrigo@email.com.br",
	  "senha": "abc123"
	}
	```
- **Resposta com sucesso:**
  - Status code: 201 Created 
  - Conteúdo:
    ```json
    {
	  "id": 10,
	  "nome": "Rodrigo",
	  "email": "rodrigo@email.com.br"
	}
	  
    ```

### Login do Usuário

- **Endpoint:** ```[POST] /login```
- **Descrição:** O endpoint faz o login do usuário.
- **Corpo da Solicitação:**
    ```json
  	{
	  "email": "rodrigo@email.com.br",
	  "senha": "abc123"
    }
	```
- **Resposta com sucesso:**
  - Status code: 201 Created
  - Conteúdo:
    ```json
   	{
	  "usuario": {
		"id": 10,
		"nome": "Rodrigo",
		"email": "rodrigo@email.com.br"
	  },
	  "token":
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5OTY3MjI4NiwiZXhwIjoxNjk5Njc1ODg2fQ.eizNSCWIxsx-VWHr43KVYBTPjvO4Tow89GPtLSmFhEY"
	}
	```

### Detalhar Usuário

- **Endpoint:** ```[GET] /usuario```
- **Descrição:** O endpoint detalha o cadastro do usuário. 
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    {
	  "id": 10,
	  "nome": "Rodrigo",
	  "email": "rodrigo@email.com"
    }
    ```  

### Editar Usuário

- **Endpoint:** ```[PUT] /usuario```
- **Descrição:** O endpoint edita um cadastro de usuário.
- **Corpo da Solicitação:**
    ```json
    {
	  "nome": "Rodrigo",
	  "email": "rodrigo@email.com",
	  "senha": "abc123"
    }
	```
- **Resposta com sucesso:**
  - Status code: 204 No Content


### Listar Categorias
- **Endpoint:** ```[GET] /categoria```
- **Descrição:** O endpoint lista as categorias de produtos.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    [
	  {
		"descricao": "Informática"
	  },
	  {
		"descricao": "Celulares"
	  },
	  {
		"descricao": "Beleza e Perfumaria"
	  },
	  {
		"descricao": "Mercado"
	  }
	  .
	  .
	  .
  	]
    ```

### Cadastrar Produtos
- **Endpoint:** ```[POST] /produto```
- **Descrição:** O endpoint cadastra um novo produto.
- **Corpo da Solicitação:** 
<p align="left">
	&emsp;<img src="./png/multipart_form_01.png" height="350" tittle="">
</p>

- **Resposta com sucesso:**
  - Status code: 201 Created
  - Conteúdo:
	```json
	[
	  {
		"id": 32,
		"descricao": "Teclado Gamer Professional",
		"quantidade_estoque": 25,
		"valor": 9700,
		"categoria_id": 1,
		"produto_imagem": "https://cubos-pdv.s3.us-east-005.backblazeb2.com/produto/32/teclado-color.jpg"
	  }
	]
    ```

### Editar Produto
- **Endpoint:** ```[PUT] /produto/id```
- **Descrição:** O endpoint edita um produto cadastrado.
- **Corpo da Solicitação:**
<p align="left">
	&emsp;<img src="./png/multipart_form_02.png" height="350" tittle="">
</p>

 - **Resposta com sucesso:**
   - Status code: 204 No Content

### Listar Produtos

- **Endpoint:** ```GET /produto```
- **Descrição:** O endpoint lista os produtos cadastrados.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    [
	  {
		"id": 1,
		"descricao": "Teclado ABNT2 sem fio Microseta",
		"quantidade_estoque": 100,
		"valor": 15000,
		"categoria_id": 1,
		"produto_imagem": "https://cubos-pdv.s3.us-east-005.backblazeb2.com/produto/1/teclado-color.jpg"
	  },
	  {
		"id": 2,
		"descricao": "Teclado ABNT2 Logitida",
		"quantidade_estoque": 100,
		"valor": 12000,
		"categoria_id": 1,
		"produto_imagem": "https://cubos-pdv.s3.us-east-005.backblazeb2.com/produto/2/teclado-color.jpg"
	  },
	  {
		"id": 3,
		"descricao": "Teclado/Mouse ABNT2 sem fio Microseta",
		"quantidade_estoque": 120,
		"valor": 19000,
		"categoria_id": 1,
		"produto_imagem": null
	  },
	  {
		"id": 4,
		"descricao": "Teclado ABNT2 Microseta",
		"quantidade_estoque": 60,
		"valor": 8000,
		"categoria_id": 1,
		"produto_imagem": null
	  }
	  .
	  .
	  .
	]
	
	```

### Detalhar Produto

- **Endpoint:** ```GET /produto/id```
- **Descrição:** O endpoint detalha o cadastro de um produto.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    {
	  "id": 22,
	  "descricao": "Computador Core I7 3,6Ghz Acor",
	  "quantidade_estoque": 50,
	  "valor": 410000,
	  "categoria_id": 1,
	  "produto_imagem": "https://cubos-pdv.s3.us-east-005.backblazeb2.com/produto/22/notebook-acor-aspire.jpg"
    }
	```

### Cadastrar Cliente
- **Endpoint:** ```[POST] /cliente```
- **Descrição:** O endpoint cadastra um novo cliente.
- **Corpo da Solicitação:**
    ```json
    {	
	  "nome": "Manoel Silva",
	  "email": "manoel_silva@email.com",
	  "cpf": "12345678906",
	  "cep": "",
	  "rua": "",
	  "numero": "",
	  "bairro": "",
	  "cidade" : "",
	  "estado" : ""
    }
    ```
- **Resposta com sucesso:**
  - Status code: 201 Created
  - Conteúdo:
	```json
	[
	  {
		"id": 6,
		"nome": "Manoel Silva",
		"email": "manoel_silva@email.com",
		"cpf": "12345678906",
		"cep": "",
		"rua": "",
		"numero": "",
		"bairro": "",
		"cidade": "",
		"estado": ""
	  }
	]
    ```

### Editar Cliente
- **Endpoint:** ```[PUT] /cliente/id```
- **Descrição:** O endpoint edita o cadastro de um cliente.
- **Corpo da Solicitação:**
    ```json
    {	
	  "nome": "Manoel Silva",
	  "email": "manoel_silva@email.com",
	  "cpf": "12345678906",
	  "cep": "60000000",
	  "rua": "F",
	  "numero": "600",
	  "bairro": "bairro",
	  "cidade" : "cidade",
	  "estado" : "estado"
    }
    ```
- **Resposta com sucesso:**
  - Status code: 204 No Content


### Cadastrar Pedido
- **Endpoint:** ```[POST] /pedido```
- **Descrição:** O endpoint cadastra um novo pedido.
- **Corpo da Solicitação:**
    ```json
	{
	  "cliente_id": 9,
	  "observacao": "crédito aprovado",
	  "pedido_produtos":[ 
		  {
			"produto_id": 3,
			"quantidade_produto": 2
		  },
		  {
      		"produto_id": 3,
      		"quantidade_produto": 2
    	  },
		  {
      		"produto_id": 7,
      		"quantidade_produto": 1
    	  }
	  ]
	}
    ```
- **Resposta com sucesso:**
  - Status code: 201 Created
  - Conteúdo:
	```json
	{
	  "cliente_id": 9,
	  "observacao": "crédito aprovado",
	  "pedido_produtos": [
		{
		  "produto_id": 3,
		  "quantidade_produto": 4
		},
		{
		  "produto_id": 7,
		  "quantidade_produto": 1
		}
	  ]
	}

    ```

### Listar Pedidos

- **Endpoint:** ```GET /pedido```
- **Descrição:** O endpoint lista os produtos cadastrados.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    [
	  {
		"pedido": {
		  "id": 4,
		  "cliente_id": 9,
		  "observacao": "crédito aprovado",
		  "valor_total": 436000
	  	},
		"pedido_produtos": [
		  {
			"id": 11,
			"pedido_id": 4,
			"produto_id": 3,
			"quantidade_produto": 4,
			"valor_produto": 19000
		  },
		  {
			"id": 12,
			"pedido_id": 4,
			"produto_id": 7,
			"quantidade_produto": 1,
			"valor_produto": 360000
		  }
		]
	  },
	  {
		"pedido": {
		  "id": 5,
		  "cliente_id": 8,
		  "observacao": "crédito aprovado",
		  "valor_total": 413000
		},
		"pedido_produtos": [
		  {
			"id": 13,
			"pedido_id": 5,
			"produto_id": 2,
			"quantidade_produto": 1,
			"valor_produto": 15000
		  },
		  {
			"id": 14,
			"pedido_id": 5,
			"produto_id": 3,
			"quantidade_produto": 2,
			"valor_produto": 19000
		  },
		  {
			"id": 15,
			"pedido_id": 5,
			"produto_id": 8,
			"quantidade_produto": 1,
			"valor_produto": 360000
		  }
		]
	  },
	  .
	  .
	  .
	]

	```   