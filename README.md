# Bienvenidos a NoteApp

## Sobre El Proyecto

Es una aplicacion sencilla de notas con registro de usuarios y estos pueden almacenar notas en una base de datos MongoDB de forma sencilla. Para la elaboracion de este proyecto se hizo con Express para el backend, Mongoose como ODM, y React para el frontend.

## Consideraciones

Para poder correr este proyecto de forma local y adecuadamente hay que seguir los siguientes pasos:

1: En ambas carpetas ejecutar el siuiente comando en la terminal: `npm install`

2: En la carpeta tanto de backend como de frontend hago uso de archivos .env por lo que deberan sustituir los valores de estas variables por las suyas dentro de la carpeta `src` dedichas carpetas:

Backend:
`MONGODB_URI`
`PORT`
Donde MONGODB_URI es la url a tu base de datos en esta ej. `mongodb+srv://...`
Y PORT es el puerto desde el cual correra el backend, en caso de no ponerlo sera 3000 por defecto

Frontend:
`VITE_API_URL`
Donde este es el link que hace referencia al backend, ej. si el PORT lo pusiste en 3000 esta seria `http://localhost:3000`

## Contacto

- **Email:** [bcdld@hotmail.com](mailto:bcdld@hotmail.com)
- **LinkedIn:** [linkedin.com/in/luis-alberto-becerril-moralez](https://www.linkedin.com/in/luis-alberto-becerril-moralez)
- **Portafolio:** [labm-portfolio.vercel.app](https://labm-portfolio.vercel.app)