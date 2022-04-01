const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'Necesitas un token para realizar la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, '3st03sunk37j3j3j3');

        // obtener usuario autenticado
        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'token no válido - usuario no existe en la db'
            });
        }
        
        // verificar si el estado del usuario es false ( borrado )
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'token no válido - estado: false'
            });
        }

        req.usuario = usuario;
        
        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no válido'
        })
    }
}

module.exports = { validarJWT }