const jwt = require('jsonwebtoken')

const generateJWT = ( uid = '') => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid }

        jwt.sign( payload , '3st03sunk37j3j3j3', {
            expiresIn: '5h'
        }, ( err, token ) => {
            
            
            if(err){
                console.log(err)
                reject( 'no se pudo generar el json web token' )
            }else{
                resolve( token );
            }
        })

    })


}






module.exports = generateJWT;