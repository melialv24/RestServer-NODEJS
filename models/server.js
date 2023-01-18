const express = require('express')
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('../database/config.db')


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }

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
       this.app.use( this.paths.usuarios , require('../routes/usuarios'))
       this.app.use( this.paths.auth, require('../routes/auth'))
       this.app.use( this.paths.categorias, require('../routes/categorias'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;