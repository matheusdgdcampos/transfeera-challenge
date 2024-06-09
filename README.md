# Transfeera challenge

### Ferramentas necessárias para rodar o projeto

- Nodejs v18^
- Docker
- docker compose

### Como rodar

Abra um terminal na raiz do projeto e rode o comando abaixo:
```bash
docker compose up -d --build
```

### Configurando variáveis de ambiente
Crie um arquivo na raiz do projeto com o nome ```.env``` em seguida basta copiar os dados do arquivo ```.env.example``` para este arquivo pois são variáveis de um ambiente de teste.
### Carregando massa de dados de recebedores
Basta rodar o comando:
```bash
npm run seed
```

Isso irá carregar toda a massa de dados necessária do projeto (30 recebedores pré cadastrados).

OBS: o container do MongoDB deve já estar em execução ou retornará um erro de falha na conexão com o banco de dados.

### Rodando o servidor
Para rodar o projeto rode o comando:
```bash
npm run start:dev
```
Isso criará um servidor NodeJs local na porta 3000.

### Rodando testes unitários

Digite o seguinte comando no terminal:
```bash
npm run test
```

### Rodando testes E2E

Digite o seguinte comando no terminal:
```bash
npm run test:e2e
```

OBS: Todos os testes rodam em um banco de dados em memória não alterando a estrutura original da massa de dados para testes.

### Testes via Client HTTP

Dentro da pasta ```.github``` estão salvos arquivos JSON com todos os endpoints da aplicação e também as variáveis de ambiente necessárias para realização dos testes utilizando o Postman.

### Documentação Swagger

Para acessar a documentação via swagger após rodar o servidor basta acessar o seguinte endereço http://localhost:3000/doc

