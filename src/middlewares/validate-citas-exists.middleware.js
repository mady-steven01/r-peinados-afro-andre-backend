// const { dbGetCitaById, dbGetCitaByUsername } = require("../services/cita.service");


// const validateUserExistsByUserName = async (req, res, next) => {
//     // Paso 1: Obtener los datos a registrar (usuario)
//     const inputData = req.body;

//     try {
//         // Paso 2: Verificar si el usuario existe BD  ---> email
//         const dataFound = await dbGetUserByUsername( inputData.username ); // Función para buscar el usuario en la base de datos
        
//         if ( dataFound ) 
//             return res.status( 404 ).json({ 
//                 ok: false, 
//                 msg: 'El usuario ya existe' 
//             });

//         req.dataFound = dataFound; // Guardamos el usuario en el request para usarlo después
//         next();
//     } 
//     catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json({ 
//             ok: false, 
//             msg: 'Error al buscar el usuario'
//         });
//     }
// };

// const validateUserDoesNotExistsById = async (req, res, next) => {
//     // Paso 1: Obtener los datos a registrar (usuario)
//     const id = req.params.id;

//     try {
//         // Paso 2: Verificar si el usuario existe BD  ---> id
//         const dataFound = await dbGetUserById( id ); // Función para buscar el usuario en la base de datos
//         // console.log(id, dataFound);
//         if ( ! dataFound ) 
//             return res.status( 404 ).json({ 
//                 ok: false, 
//                 msg: 'El usuario NO existe' 
//             });

//         req.dataFound = dataFound; // Guardamos el usuario en el request para usarlo después
//         next();
//     } 
//     catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json({ 
//             ok: false, 
//             msg: 'Error al buscar el usuario'
//         });
//     }
// };


// module.exports = {
//     validateUserExistsByUserName,
//     validateUserDoesNotExistsById
// };

const { dbGetCitaById, dbGetCitaByUsername } = require("../services/cita.service");
const { logError, logInfo } = require("../helpers/logger.helper");

/**
 * @middleware validateCitaExistsByUserName
 * @description Validates if an appointment exists by username
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateCitaExistsByUserName = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        logError('Username is required for appointment validation');
        return res.status(400).json({
            success: false,
            message: 'Username is required'
        });
    }

    try {
        const cita = await dbGetCitaByUsername(username);
        
        if (cita) {
            logInfo('Appointment already exists', { username });
            return res.status(409).json({
                success: false,
                message: 'Appointment with this username already exists'
            });
        }

        logInfo('Appointment validation passed - username available', { username });
        next();
    } catch (error) {
        logError('Error validating appointment by username', { username, error });
        res.status(500).json({
            success: false,
            message: 'Error validating appointment',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @middleware validateCitaExistsById
 * @description Validates if an appointment exists by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateCitaExistsById = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        logError('ID is required for appointment validation');
        return res.status(400).json({
            success: false,
            message: 'Appointment ID is required'
        });
    }

    try {
        const cita = await dbGetCitaById(id);
        
        if (!cita) {
            logInfo('Appointment not found', { id });
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Attach the found appointment to the request for later use
        req.cita = cita;
        logInfo('Appointment validation passed - found appointment', { id });
        next();
    } catch (error) {
        logError('Error validating appointment by ID', { id, error });
        res.status(500).json({
            success: false,
            message: 'Error validating appointment',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @middleware validateCitaDoesNotExistById
 * @description Validates if an appointment does NOT exist by ID (for creation)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateCitaDoesNotExistById = async (req, res, next) => {
    const { id } = req.body; // Assuming ID comes in the body for creation

    if (!id) {
        return next(); // If no ID provided, skip this check
    }

    try {
        const cita = await dbGetCitaById(id);
        
        if (cita) {
            logInfo('Appointment ID already exists', { id });
            return res.status(409).json({
                success: false,
                message: 'Appointment with this ID already exists'
            });
        }

        logInfo('Appointment ID validation passed - ID available', { id });
        next();
    } catch (error) {
        logError('Error validating appointment ID', { id, error });
        res.status(500).json({
            success: false,
            message: 'Error validating appointment ID',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    validateCitaExistsByUserName,
    validateCitaExistsById,
    validateCitaDoesNotExistById
};