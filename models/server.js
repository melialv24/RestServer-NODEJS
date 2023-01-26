const express = require('express')
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('../database/config.db')
const fileUpload = require('express-fileupload')


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
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

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileFir: '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
       this.app.use( this.paths.usuarios , require('../routes/usuarios'))
       this.app.use( this.paths.auth, require('../routes/auth'))
       this.app.use( this.paths.categorias, require('../routes/categorias'))
       this.app.use( this.paths.productos, require('../routes/productos'))
       this.app.use( this.paths.buscar, require('../routes/buscar'))
       this.app.use( this.paths.uploads, require('../routes/uploads'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;