const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol, tieneRol } = require('../middlewares/validar-rol');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, idValido } = require('../helpers/validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    // Captura de error en caso de que el formato del correo no sea válido
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( idValido ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    // Captura de error en caso de que el formato del correo no sea válido
    check('nombre', 'El nombre debe ser obligatorio').not().isEmpty(),
    check('contrasena', 'la contrasena debe ser mayor de 6 dígitos').isLength({ min: 5 }),
    check('correo', 'Formato inválido').isEmail(),
    check('correo').custom( emailExiste),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( idValido ),
    validarCampos
], usuariosDelete);

module.exports = router;