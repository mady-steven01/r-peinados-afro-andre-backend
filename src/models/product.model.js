const mongoose = require( 'mongoose' );

/** Paso 1: Definir una estructura de datos */
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [ true, 'El nombre del producto es obligatorio' ]
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: [ 0, 'El precio minimo para el producto es 0' ],
        default: 0
    },
    urlImage: {
        type: String,
        trim: true
    },
    state: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [ false, 'El ID del usuario es obligatorio' ]
    }
},{
    timestamps: true,
    versionKey: false
});

/** Paso 2: Vinculamos la estructura de datos a una coleccion dando como resultado un Modelo de datos */
const ProductModel = mongoose.model(
    'products',         // Nombre de la coleccion donde se agruparan los documentos
    ProductSchema       // Estructura de datos de la Entidad
);

// Exponemos la funcionalidad para que otros archivos puedan hacer uso de ella
module.exports = ProductModel;


