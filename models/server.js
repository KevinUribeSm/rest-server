const express = require('express')
const { connection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = 3000;
        this.userPath = '/api/usuario';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await connection();
    }


    middlewares() {
        this.app.use( express.static('public'));

        // Parseo y lectura del body
        this.app.use( express.json() )
        
    }

    routes() {
    
        this.app.use(this.userPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }

}

module.exports = Server;