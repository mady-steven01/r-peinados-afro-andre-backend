const mongoose = require( 'mongoose' );

/** Paso 1: Definir una estructura de datos */
const StyleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'El nombre de la estilo es obligatorio' ],
        minlength: [ 3, 'El nombre debe tener al menos 3 caracteres' ],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    urlImage: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [ true, 'El ID del usuario es obligatorio' ]
    }
},{
    timestamps: true,
    versionKey: false
});

/** Paso 2: Vinculamos la estructura de datos a una coleccion dando como resultado un Modelo de datos */
const StyleModel = mongoose.model(
    'styles',        // Nombre de la coleccion donde se agruparan los documentos
    StyleSchema       // Estructura de datos de la Entidad
);

// Exponemos la funcionalidad para que otros archivos puedan hacer uso de ella
module.exports = StyleModel;


