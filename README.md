# Contactify

# Comandos para acessar a Api
-yarn install(instala as dependencias do projeto)
-yarn dev("roda o servidor da api") 
-npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts(cria as migrações)
-npm run typeorm migration:run -- -d ./src/data-source(executa as migrções)