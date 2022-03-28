const Role = require('../models/rol');
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    console.log(existeRol)
    if( !existeRol ){
        throw new Error (`El rol ${ rol } ingresado no se encuentra en la base de datos`)
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ) {
        throw new Error (`El correo ${correo}, ya está registrado`)
    } 
}

const idValido = async(id = '') => {
    const idValid = await Usuario.findOne({ id })
    if( !idValid ) {
        throw new Error (`El id no es valido ${id}`)
    } 
}



module.exports = { esRolValido , emailExiste, idValido }