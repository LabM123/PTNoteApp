const app = require('./src/server')
const dbConfig = require('./src/config/dbConfig')
require('dotenv').config()

const PORT = process.env.PORT || 3000

dbConfig()
    .then(()=>{
        console.log('Conexion exitosa con base de datos')
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http:///localhost:${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })