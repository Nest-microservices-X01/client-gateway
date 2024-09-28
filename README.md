<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Dev
1. Clonar el repo
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `.env.example`
4. Tener levantados los microservicios que se van a consumir
5. Levantar el proyecto con `yarn start:dev`

## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```