const express = require('express')

class Server {

    constructor() {
        this.app = express()
        this.port = 3000;
        this.userPath = '/api/usuario'

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares() {
        this.app.use( express.static('public'));

        // Parseo y lectura del body
        this.app.use( express.json() )
        
    }

    routes() {
    
        this.app.use(this.userPath, require('../routes/usuarios'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }

}

module.exports = Server;