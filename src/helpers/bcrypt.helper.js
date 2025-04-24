const bcrypt = require( 'bcrypt' );

function encryptedPassword ( pass ) {

    // Paso 1: Generar una cadena aleatoria para mezclarla con el password original
    const salt = bcrypt.genSaltSync();

    // console.log( 'salt: ', salt );      // Descomente para probar

    // Paso 2: Combinamos el password original con la cadena aleatoria
    const hashPassword = bcrypt.hashSync( 
        pass,   // Password original del usuario
        salt    // Cadena aleatoria
    );
      
    // console.log( 'hashPassword: ', hashPassword );      // Descomente para probar

    return hashPassword;        // Retorna password encriptado
}

const verifyEncriptedPassword = ( pass, hashPass ) => {
    return bcrypt.compareSync( 
        pass,       // Password original del usuario
        hashPass    // Cadena aleatoria
    );
}


module.exports = {
    encryptedPassword,
    verifyEncriptedPassword
}