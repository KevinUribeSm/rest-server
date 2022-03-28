const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req, res) => {

    const { limit = 16 , offset = 0 } = req.query ;

    const query = { estado: true}
  
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(offset) )
            .limit( Number(limit) )
        
    ]);

    res.json({
        total,
        usuarios
    });

}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password ) {

        const salt = bcryptjs.genSaltSync();
        resto.contrasena = bcryptjs.hashSync( contrasena, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario)

}

const usuariosPost = async (req, res) => {
    
    const { nombre, correo, contrasena, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contrasena, rol});

    // Encriptar la pass
    const salt = bcryptjs.genSaltSync();
    usuario.contrasena = bcryptjs.hashSync( contrasena, salt )

    await usuario.save()
    
    res.send({
        "Hola": "post",
        usuario
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado : false } );

    await res.json(usuario)
}

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete}