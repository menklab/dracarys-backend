## dracarys-backend
backend repo for the dracarys application

the frontend repo can be found [here](https://github.com/menklab/dracarys-frontend)

## Content

- [Main language version](#main-lang-version)
- [System dependencies](#system-dependencies)
- [Database and Redis creation](#db-creation)
- [Services (job queues, cache servers, search engines, etc.)](#additional-services)
- [Describe application](#description-application)
- [Contributing](#contributing)

### <a id="main-lang-version"></a> Main language version

Node 18.12.0 (LTS)

### <a id="installation"></a> Installation

```bash
cp .env.example .env
npm i
npm run start:dev
```

### <a id="db-creation"></a> Database creation

```bash
docker-compose up
```

### <a id="additional-services"></a> Services (job queues, cache servers, search engines, etc.)

- Redis

### <a id="description-application"></a> Describe application structure

- **/src/app** – boilerplate files
- **/src/bootstrap** – interceptors, pipes etc used on bootstrap the app
- **/src/common** – common files (dtos, enums, types, utils etc)
- **/src/modules** – modules
- **/src/modules/common** – common modules that used to prevent cycling dependencies between modules
- **/src/orm/entities** – entities
- **/src/orm/migrations** – migrations
- **/src/orm/seeds** – seeds



### <a id="contributing"></a> Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)


