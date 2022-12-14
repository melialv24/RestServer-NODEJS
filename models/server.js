const express = require('express')
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('../database/config.db')


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Conexion con base de datos 
        this.conectarDb();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación 
        this.routes();
    }

    async conectarDb(){
        await dbConnection()
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use( express.json() )

        //Directorio publico 
        this.app.use(express.static('public'));
    }

    routes(){
       this.app.use( this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;