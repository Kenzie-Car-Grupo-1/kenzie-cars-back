# Kenzie Cars

# Install
To run the API. you have to install all required libraries listed at ``package.json``, it is necessary to execute the following command:
```bash
yarn
```
Then, you have to create an ``.env`` file on the project root, filling all the demanded informations that exist on ``.env.example``. Finally, it is necessary to run the migrations to save them at the database. This is made through the following commands:
``` bash
# to generate the migrations
yarn typeorm:generate

# to run the migrations
yarn typeorm:run
```

# Run
You can test all routes at your computer with Insomnia help. To run the api locally, use the following command:
```bash
yarn dev
```
When you run the application, it is gonna work in ``localhost:3000``. -->

## Table of Content

- [General View](#1-general-view)

- [Running locally](#2-running-locally)

- [Diagram ER](#3-diagram-er)

- [Documentation](#4-documentation)

## 1. General View

To develop this project we used these tecnologies.

- **[NodeJs](https://nodejs.org/en/)**

- **[Express](https://expressjs.com/pt-br/)**

- **[TypeScript](https://www.typescriptlang.org/)**

- **[Postgres](https://www.postgresql.org/)**

- **[TypeORM](https://typeorm.io/)**

- **[Yup](https://www.npmjs.com/package/yup)**

The application's base URL is ``https://localhost:3000``

## 2. Running locally

[ Back to the top ](#table-of-content)

### 2.1 Installing dependencies

Clone the project on your machine and install the dependencies with the following command:

```bash
  yarn
```

### 2.2 Environment Variables

Then, create an ``.env`` file, copying ``.env.example`` file format:

```bash
  cp .env.example .env
```

### 4.3 Migrations

Execute the migrations with the command:

```bash
  yarn typeorm migration:run
```

## 3. Diagram ER

[ Back to the top ](#table-of-contents)

You can see the full diagram at the project's root. It shows the attributes of each table and shows the relationships between than on the database.

## 4. Documentation

[ Back to the top ](#table-of-contents)

Link com a **[Documentação](http://localhost:3000/api-docs/#/)**

# Contribution
Team that developed the project


<table>
  <tbody style="display: flex;">
    <tr display="flex">
      <td align="center"><a href="(https://github.com/rafaeldquadros)"><img src="https://avatars.githubusercontent.com/u/103122923?v=4" width="100px;" border-radius="40%" alt="Rafael Quadros"/><br /><sub><b>Rafael Quadros</b></sub></a><br /><a href="https://github.com/Kenzie-Car-Grupo-1/kenzie-cars-front/commits/develop" title="Code">💻</a></td>
      <tr/>
    <tr>
      <td align="center"><a href="(https://github.com/byPedroCruzDev)"><img src="https://avatars.githubusercontent.com/u/98105642?s=400&u=5c365b37eb6591c3fce4b780e43ebea842bcdba1&v=4" width="100px;" alt="Pedro Cruz"/><br /><sub><b>Pedro Cruz</b></sub></a><br /><a href="https://github.com/Kenzie-Car-Grupo-1/kenzie-cars-front/commits/develop" title="Code">💻</a></td>
      <tr/>
    <tr>
      <td align="center"><a href="(https://github.com/KelvinSilva10)"><img src="https://avatars.githubusercontent.com/u/106700893?v=4" width="100px;" alt="Kelvin Silva"/><br /><sub><b>Kelvin Silva</b></sub></a><br /><a href="https://github.com/Kenzie-Car-Grupo-1/kenzie-cars-front/commits/develop" title="Code">💻</a></td>
    <tr>
      <td align="center"><a href="(https://github.com/naoeoneto)"><img src="https://avatars.githubusercontent.com/u/106770927?v=4" width="100px;" alt="Antonio Neto"/><br /><sub><b>Antonio Neto</b></sub></a><br /><a href="https://github.com/Kenzie-Car-Grupo-1/kenzie-cars-front/commits/develop" title="Code">💻</a></td>
      <tr/>
    <tbody/>
<table/>
      
      
 # License

[MIT](LICENSE)