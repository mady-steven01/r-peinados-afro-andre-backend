const jwt = require( 'jsonwebtoken' );


function generateToken ( payload ) {
    return jwt.sign( 
        payload,                    // Payload (Carga Util)
        process.env.JWT_SEED,       // Seed: Palabra Secreta (Semilla) 
        { expiresIn: '1h' }         // Configuracion (Expiracion del Token)
    );
}

function verifyToken ( token ) {
    const payload =  jwt.verify( 
        token,                      // Token valido 
        process.env.JWT_SEED        // Seed: Palabra Secreta (Semilla) 
    );

    console.log( payload );

    return payload;
}


module.exports = {
    generateToken,
    verifyToken
};