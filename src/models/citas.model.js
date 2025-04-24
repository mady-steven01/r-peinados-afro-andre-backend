// const mongoose = require( 'mongoose' );

// /** Paso 1: Definir una estructura de datos */
// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: [ true, 'EL nombre del usuario es obligatorio' ]
//     },
//     username: {
//         type: String,
//         trim: true,
//         lowercase: [ true, 'El username es un correo en minusculas' ],
//         required: [ true, 'El username es obligatorio' ]
//     },
//     password: {
//         type: String,
//         trim: true,
//         required: [ true, 'El password es obligatorio' ]
//     },
//     time: {
//         type: String,
//         trim: true,
//         required: [ true, 'la hora es obligatoria' ]
//     },
//     date: {
//         type: String,
//         trim: true,
//         required: [ true, 'la fecha es obligatoria' ]
//     },
//     urlImage: {
//         type: String,
//     },
// },
// {
//     timestamps: true,
//     versionKey: false
// });

// /** Paso 2: Vinculamos la estructura de datos a una coleccion dando como resultado un Modelo de datos */
// const CitasModel = mongoose.model(
//     'citas',            // Nombre de la coleccion donde se agruparan los documentos
//     CitaSchema          // Estructura de datos de la Entidad
// );

// // Exponemos la funcionalidad para que otros archivos puedan hacer uso de ella
// module.exports = CitasModel;

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { logInfo } = require('../helpers/logger.helper');

/**
 * @module CitasModel
 * @description Mongoose model for appointments (citas) collection
 */

/**
 * @typedef {Object} CitaSchema
 * @property {string} name - User's full name
 * @property {string} username - User's email (used as username)
 * @property {string} password - Hashed password
 * @property {string} time - Appointment time
 * @property {string|Date} date - Appointment date
 * @property {string} [urlImage] - Optional URL for user's image
 * @property {Date} createdAt - Auto-generated creation date
 * @property {Date} updatedAt - Auto-generated update date
 */
const CitaSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre del usuario es obligatorio'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'El username (email) es obligatorio'],
        unique: true,
        validate: {
            validator: isEmail,
            message: props => `${props.value} no es un email válido`
        },
        index: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        select: false // Never return password in queries by default
    },
    time: {
        type: String,
        trim: true,
        required: [true, 'La hora de la cita es obligatoria'],
        match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
    },
    date: {
        type: Date,
        required: [true, 'La fecha de la cita es obligatoria'],
        min: [Date.now, 'La fecha no puede ser anterior a hoy']
    },
    urlImage: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true; // Optional field
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} no es una URL válida`
        }
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password; // Always remove password from JSON output
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password; // Always remove password from Object output
            return ret;
        }
    }
});

// Indexes for better query performance
CitaSchema.index({ username: 1 }); // Already defined as unique
CitaSchema.index({ date: 1, time: 1 }, { unique: true }); // Prevent duplicate appointments

// Middleware example: Log after saving a new appointment
CitaSchema.post('save', function(doc, next) {
    logInfo(`Nueva cita creada para ${doc.name}`, { 
        id: doc._id,
        date: doc.date,
        time: doc.time 
    });
    next();
});

/**
 * @class CitasModel
 * @description Mongoose model for the 'citas' collection
 */
const CitasModel = mongoose.model('citas', CitaSchema);

module.exports = CitasModel;