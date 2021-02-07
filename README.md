# SOS Manaus

Plataforma web para centralizar doações para os hospitais de Manaus.

[Disponível aqui](http://sosmanaus.ddns.net:5000/)

## Tecnologias utilizadas

- React.js para front-end
- Node.js para back-end
- Banco de dados SQLite

## Requisitos

Para executar os módulos do projeto é necessário ter os seguintes requisitos instalados no sistema:

- Node 12.x ou superior
- Yarn 1.21 ou superior

## Executando o projeto

### Clonando o projeto

```bash
$ git clone https://github.com/felipedmsantos95/sos-manaus
$ cd sos-manaus
```

### Executando Backend

1. Para rodar a API pela primeira vez, acessar o diretório `./server/` e executar o comando abaixo para instalar as dependências:

		yarn

2. Para configurar o banco de dados:

        yarn knex:migrate

3. Uma vez instaladas as dependências, pelo comando abaixo é possível executar o backend da aplicação, por padrão ele estará disponível para requisições através da porta 3333 no endereço http://localhost:3333/:

		yarn start

### Executando Frontend Web

Com o backend sendo executado, pode-se executar os passos abaixo para rodar o frontend da aplicação localmente.

1. Acessar o diretório `./web/` e executar o comando abaixo para instalar as dependências:

		yarn

2. Uma vez instaladas as dependências, pelo comando abaixo é possível executar o frontend da aplicação:

		yarn start

3. Feito isso, através de um navegador de internet (preferencialmente o Chrome ou o Firefox), através do endereço abaixo, será possível interagir com a aplicação desenvolvida.

		http://localhost:3000/
