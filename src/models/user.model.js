const mongoose = require( 'mongoose' );

/** Paso 1: Definir una estructura de datos */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [ true, 'EL nombre del usuario es obligatorio' ]
    },
    username: {
        type: String,
        trim: true,
        lowercase: [ true, 'El username es un correo en minusculas' ],
        required: [ true, 'El username es obligatorio' ]
    },
    password: {
        type: String,
        trim: true,
        required: [ true, 'El password es obligatorio' ]
    },
    role: {
        type: String,
        enum: [ 'registered', 'moderator', 'admin' ],
        default: 'registered'
    },
    urlImage: {
        type: String,
    },
    style: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
});

/** Paso 2: Vinculamos la estructura de datos a una coleccion dando como resultado un Modelo de datos */
const UserModel = mongoose.model(
    'users',            // Nombre de la coleccion donde se agruparan los documentos
    UserSchema          // Estructura de datos de la Entidad
);

// Exponemos la funcionalidad para que otros archivos puedan hacer uso de ella
module.exports = UserModel;


