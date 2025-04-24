const { verifyToken } = require("../helpers/jwt.helper");


function validateAuthUser ( req, res, next ) {
    console.log( 'Hola soy el Middleware de Autenticacion' );
    
    // Paso 1: Obtener el Token del header
    const token = req.header( 'X-Token' );

    if( ! token ) {
        return res.json({
            ok: false,
            msg: 'Error al obtener el Token'
        });
    }

    // Paso 2: Verificar la autenticidad del Token
    const payload = verifyToken( token );

    console.log( payload );

    if( ! payload ) {
        return res.json({
            ok: false,
            msg: 'Token invalido'
        });
    }

    // Paso 3: Elimina las propiedades adicionales
    delete payload.iat;
    delete payload.exp;

    req.authUser = payload;

    // console.log( req );
    next();
}

module.exports = {
    validateAuthUser
}