const usuariosGet = (req, res) => {

    const { q, nombre = 'sin nombre', edad} = req.query
    res.send({
        "Hola": "get",
        "id": 1,
        q,
        nombre,
        edad
    });
}

const usuariosPut = (req, res) => {
    res.send({
        "Hola": "put",
        "id": 1
    });
}

const usuariosPost = (req, res) => {
    
    const { nombre, edad } = req.body
    
    res.send({
        "Hola": "post",
        "id": 1,
        nombre,
        edad
    });
}

const usuariosDelete = (req, res) => {

    const id = req.params.id;

    res.send({
        "Hola": "delete",
        "id": 1,
        id
    });
}

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete}