<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repo
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo ```__.env.template__``` y renomnrar la copia a ```__.env__```

6. Llenar lavariables de entonno definidas en el ```__.env___```

7. Ejecutar la aplicación en dev:
```
npm run start:dev
```
8. Reconstruir la base se datos con las semillas
```
http://localhost:5000/api/v2/seed
```
## Stack usado

* MongoDB
* Nest
* Docker
## IMPORTANTE

* Reemplezar todas las importaciones de ```__src/..__``` y renomnrar la copia a ```__../..__```
```
'src/pokemon/entities/pokemon.entity';
```
* Por

```
'../pokemon/entities/pokemon.entity';
```


## Production Build
1. Crear el archivo ```.env.prod```
2. Llenar la variables de entono de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. Correr la imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```
