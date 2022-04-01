const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');

const login = async ( req, res ) => {

    const { correo, contrasena } = req.body;


    try {
        
        // check mail
        const usuario = await Usuario.findOne({ correo })
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo o la contraseña no son correctos - correo'
            })
        } 

        // check if user is a activate 
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El correo o la contraseña no son correctos - estado'
            })
        }       
        

        // check password
        const validPass = bcryptjs.compareSync( contrasena , usuario.contrasena);
        if( !validPass ){
            return res.status(400).json({
                msg: 'El correo o la contraseña no son correctos - contraseña'
            })
        }


        // generato JWT
        const token = await generateJWT( usuario.id )

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
   

}


module.exports = {
    login
}