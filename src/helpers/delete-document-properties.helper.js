const mongoose = require( 'mongoose' );

// Valida si un objeto no es una lista
function isJavaScriptObject( obj ) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

// Verificamos si es una instancia creada por un modelo de Mongoose
function isMongooseObject( obj ) {
    return obj instanceof mongoose.Document;
}

function convertBJSONtoJSObj( obj ) {
    let newObj;

    if ( isMongooseObject( obj ) )
        newObj = obj.toObject();        // Convertir un BJSON --> JavaScript Object
    else if ( isJavaScriptObject( obj ) )
        newObj = { ...obj };            // Usa el operador spread para crear una copia del objeto original
    else
        throw new Error( "El objeto no es ni JavaScript ni Mongoose" );

    return newObj;
}

function removePropertiesToObject({ obj, properties }) {

    try {
        const newObj = convertBJSONtoJSObj( obj );

        for( const property of properties ) {
            if( newObj.hasOwnProperty( property ) ) {
                delete newObj[ property ];
            }
        }

        return newObj;
    } 
    catch ( error ) {
        console.error( 'Error al eliminar propiedades:', error );
        return null;    // O puedes lanzar el error si prefieres que se maneje en otro lugar
    }
    
}


module.exports = removePropertiesToObject;