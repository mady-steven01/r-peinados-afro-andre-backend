const verifyProperties = ( error ) => {
    const errors = {};      // Define objeto donde se almacenaran los mensajes de error y el nombre del campo que produce el error

    /** Iteramos el objeto de error.errors por cada una de las propiedades que contenga */
    for( const [ key, value ] of Object.entries( error.errors ) ) {
        errors[ key ] = value.message;      // Creamos un objeto de respuesta adecuado para el cliente
    }
    
    return errors;      // Retornamos dicho objeto de respuesta
}


module.exports = verifyProperties;