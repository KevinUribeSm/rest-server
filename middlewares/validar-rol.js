const tieneRol = ( ...roles) => {
    return ( req, res, next) => {

        console.log(roles, req.usuario.rol)

        next();

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }

    }
}

module.exports = {
    tieneRol
}