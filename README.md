# Contactify

# Comandos para acessar a Api
1- yarn install(instala as dependencias do projeto)
2- npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts(cria as migrações)
3- npm run typeorm migration:run -- -d ./src/data-source(executa as migrções)
4- yarn dev("roda o servidor da api") 

# Url base: http://127.0.0.1:3001/

# Rotas de client
POST  clients/ (cria o cliente)

POST  login/ (autentica o cliente)

GET clients/ (busca todos os clientes registrados)

GET clients/profile (busca um unico cliente referenciado no token passado)

PATCH clients/profile (edita um unico cliente referenciado no token passado)

DELETE clients/profile (deleta um unico cliente referenciado no token passado)

# Rotas de contato

POST contacts/ (cria um contato relacionado ao cliente referenciado no token passado )

GET contacts/:id ( busca dados de um contato referenciado no :id da rota )

PATCH contacts/:id ( edita dados de um contato referenciado no :id da rota )

DELETE contacts/:id ( Deleta um contato referenciado no :id da rota )

# Rotas que não precisam de authenticação:
POST  clients/ (cria o cliente)

POST  login/ (autentica o cliente)

# Rotas que precisam de authenticação:
GET clients/ (busca todos os clientes registrados)

GET clients/profile (busca um unico cliente referenciado no token passado)

PATCH clients/profile (edita um unico cliente referenciado no token passado)

DELETE clients/profile (deleta um unico cliente referenciado no token passado)

POST contacts/ (cria um contato relacionado ao cliente referenciado no token passado )

GET contacts/:id ( busca dados de um contato referenciado no :id da rota )

PATCH contacts/:id ( edita dados de um contato referenciado no :id da rota )

DELETE contacts/:id ( Deleta um contato referenciado no :id da rota )


# Regras de negócio

## criação de clientes
-todos os campos são obrigatórios
-não pode ter 2 clientes com o mesmo email
## edição de clientes
- O cliente só pode editar os própios dados
## deleção de clientes
- O cliente só pode deletar a ele própio
## consulta de um cliente
- O cliente só pode acessar os própios dados
## criação de um contato
- O cliente só pode criar contatos relacionados a ele mesmo,
- o cliente não pode cadastrar um contato relacionado a outro cliente;
## consulta de um contato
- o cliente só poderar fazer consulta dos dados de seus própios contatos;

## edição de um contato 
- o cliente só poderar fazer edição dos dados de seus própios contatos

## deleção de um contato 
- o cliente só poderar fazer deleção dos dados de seus própios contatos


# Exemplos de requisição e respostas:

## requisição/resposta POST  clients/ (cria o cliente)
-Requisição
{
		"name": "ana",
		"email": "ana@gmail.com",
	  "password": "1234",
		"phone": "33331111"
	}
-Resposta
{
	"name": "ana",
	"email": "ana@gmail.com",
	"phone": "33331111",
	"id": "dd391d1b-af9f-466f-9151-f9c9eaba6bd6",
	"createdAt": "2023-04-03T02:25:28.560Z"
}

## requisição/resposta POST  login/ (autentica o cliente)
-Requisição
{
	  "email": "ana@gmail.com",
	  "password": "1234"
	}
-Resposta
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkMzkxZDFiLWFmOWYtNDY2Zi05MTUxLWY5YzllYWJhNmJkNiIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY4MDQ4ODg2NCwiZXhwIjoxNjgwNTc1MjY0LCJzdWIiOiJkZDM5MWQxYi1hZjlmLTQ2NmYtOTE1MS1mOWM5ZWFiYTZiZDYifQ.YDrKwPIbmz2HjJ7bmaaf2Hr-Oa_1yNbQv8LyeffbuVk"
}

## requisição/resposta  GET clients/ (busca todos os clientes registrados)

-Resposta
[
	{
		"id": "055480f1-fbb7-4464-90d1-11b3913a28ae",
		"name": "song-bird",
		"email": "maria@email.com",
		"phone": "21996837459",
		"createdAt": "2023-04-03T00:49:36.953Z",
		"contacts": [
			{
				"id": "be8c5dce-fa18-44a0-b62d-3edc2f8a1a77",
				"name": "Pedro ",
				"email": "felipe@mail.com",
				"phone": "21996837459",
				"createdAt": "2023-04-03T00:51:49.938Z"
			}
		]
	},
	{
		"id": "dd391d1b-af9f-466f-9151-f9c9eaba6bd6",
		"name": "ana",
		"email": "ana@gmail.com",
		"phone": "33331111",
		"createdAt": "2023-04-03T02:25:28.560Z",
		"contacts": []
	}
]

## requisição/resposta GET clients/profile (busca um unico cliente referenciado no token passado){
    -Resposta
{
	"id": "dd391d1b-af9f-466f-9151-f9c9eaba6bd6",
	"name": "ana",
	"email": "ana@gmail.com",
	"password": "$2a$10$fW6pvkYNWE6kWnnZ5Ecm.uOtOaECYGm34Zi.23nM7oukYWcTUdUaq",
	"phone": "33331111",
	"createdAt": "2023-04-03T02:25:28.560Z",
	"contacts": []
}

## requisição/resposta PATCH clients/profile (edita um unico cliente referenciado no token passado);
-Requisição
{
		"name": "anaaaa",
		"email": "ana@gmail.com",
	    "password": "1234",
		"phone": "33331111"
	}
-Resposta 
{
	"id": "dd391d1b-af9f-466f-9151-f9c9eaba6bd6",
	"name": "anaaaa",
	"email": "ana@gmail.com",
	"phone": "33331111",
	"createdAt": "2023-04-03T02:25:28.560Z"
}

## requisição/resposta DELETE clients/profile (deleta um unico cliente referenciado no token passado);
-Resposta: status 204

## requisição/resposta POST contacts/ (cria um contato relacionado ao cliente referenciado no token passado )
-Requisição

{
		"name": "ssssss",
		"email": "sssss@gmail.com",
		"phone": "3333"
	}

    -Resposta:
    {
	"name": "ssssss",
	"email": "sssss@gmail.com",
	"phone": "3333",
	"client": "dd391d1b-af9f-466f-9151-f9c9eaba6bd6",
	"id": "6a1223cb-c5fe-4e96-9ef2-14268ebdb73a",
	"createdAt": "2023-04-03T02:35:11.317Z"
}

## requisição/resposta GET contacts/:id ( busca dados de um contato referenciado no :id da rota )

-Resposta
 {
	"id": "6a1223cb-c5fe-4e96-9ef2-14268ebdb73a",
	"name": "ssssss",
	"email": "sssss@gmail.com",
	"phone": "3333",
	"createdAt": "2023-04-03T02:35:11.317Z"
}

## requisição/resposta PATCH contacts/:id ( edita dados de um contato referenciado no :id da rota )

-Requisição
{
	"name": "Felipe",
	"email": "felipe@gmail.com",
	"phone": "3333"
}

-Resposta
{
	"id": "6a1223cb-c5fe-4e96-9ef2-14268ebdb73a",
	"name": "Felipe",
	"email": "felipe@gmail.com",
	"phone": "3333",
	"createdAt": "2023-04-03T02:35:11.317Z"
}

## requisição/resposta DELETE contacts/:id ( Deleta um contato referenciado no :id da rota ):

Resposta: status 204