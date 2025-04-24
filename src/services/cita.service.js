// const CitaModel = require("../models/cita.model");

// async function dbInsertCita( newCita ) {
//     /** Consulta a la BD (Responsabilidad de la cita) */
//     return await CitaModel.create( newCita );    // Mongoose registra en MongoDB
// }

// async function dbGetCitas() {
//     return await CitaModel.find({}).populate(['citaId']);     // Mongoose obtiene todos los datos en MongoDB
// }

// async function dbGetCitaById( id ) {
//     return await CitaModel.findById( id );           // Forma 1: Usando findById
//     return await CitaModel.findOne({ _id: id });     // Forma 2: Usando findOne
// }

// async function dbDeleteCitaById( id ) {
//     return await CitaModel.findByIdAndDelete( id );           // Forma 1: Usando findByIdAndDelete
//     return await CitaModel.findOneAndDelete({ _id: id });     // Forma 2: Usando findOneAndDelete
// }

// async function dbUpdateCitaById( id, newCita ) {
//     // Forma 1: Usando findByIdAndUpdate
//     return await CitaModel.findByIdAndUpdate( 
//         id,                 // id del documento que se va a actualizar
//         newProduct,         // Objeto con los datos a actualizar del documento
//         { new: true }       // Retornar los nuevos cambios realizados
//     );
    
//     // Forma 2: Usando findOneAndUpdate
//     return await CitaModel.findOneAndUpdate(
//         { _id: id },        // Objeto de consulta con el ID del documento que se va a actualizar
//         newProduct,         // Objeto con los datos a actualizar del documento
//         { new: true }       // Retornar los nuevos cambios realizados
//     );
// }




// module.exports = {
//     dbInsertCita,
//     dbGetCitas,
//     dbGetCitaById,
//     dbDeleteCitaById,
//     dbUpdateCitaById
// };

const CitaModel = require("../models/cita.model");
const { logError, logInfo } = require("../helpers/logger.helper");

/**
 * @async
 * @function dbInsertCita
 * @description Creates a new appointment in the database
 * @param {Object} newCita - The appointment data to create
 * @returns {Promise<Object>} The created appointment
 * @throws {Error} If there's a database error
 */
async function dbInsertCita(newCita) {
    try {
        const createdCita = await CitaModel.create(newCita);
        logInfo('Appointment created successfully', { id: createdCita._id });
        return createdCita;
    } catch (error) {
        logError('Error creating appointment', { error, newCita });
        throw error;
    }
}

/**
 * @async
 * @function dbGetCitas
 * @description Retrieves all appointments from the database
 * @param {Object} [filters={}] - Optional filters for querying
 * @returns {Promise<Array>} Array of appointments
 * @throws {Error} If there's a database error
 */
async function dbGetCitas(filters = {}) {
    try {
        const citas = await CitaModel.find(filters)
            .select('-password') // Exclude passwords
            .sort({ date: 1, time: 1 }); // Sort by date and time
        
        logInfo('Appointments retrieved', { count: citas.length });
        return citas;
    } catch (error) {
        logError('Error retrieving appointments', { error });
        throw error;
    }
}

/**
 * @async
 * @function dbGetCitaById
 * @description Retrieves a single appointment by ID
 * @param {string} id - The appointment ID
 * @returns {Promise<Object|null>} The found appointment or null if not found
 * @throws {Error} If there's a database error
 */
async function dbGetCitaById(id) {
    try {
        const cita = await CitaModel.findById(id)
            .select('-password'); // Exclude password
        
        if (!cita) {
            logInfo('Appointment not found', { id });
            return null;
        }

        logInfo('Appointment retrieved by ID', { id });
        return cita;
    } catch (error) {
        logError('Error retrieving appointment by ID', { id, error });
        throw error;
    }
}

/**
 * @async
 * @function dbGetCitaByUsername
 * @description Retrieves appointments by username (email)
 * @param {string} username - The username (email) to search for
 * @returns {Promise<Array>} Array of appointments for the user
 * @throws {Error} If there's a database error
 */
async function dbGetCitaByUsername(username) {
    try {
        const citas = await CitaModel.find({ username })
            .select('-password')
            .sort({ date: 1, time: 1 });
        
        logInfo('Appointments retrieved by username', { username, count: citas.length });
        return citas;
    } catch (error) {
        logError('Error retrieving appointments by username', { username, error });
        throw error;
    }
}

/**
 * @async
 * @function dbDeleteCitaById
 * @description Deletes an appointment by ID
 * @param {string} id - The appointment ID to delete
 * @returns {Promise<Object|null>} The deleted appointment or null if not found
 * @throws {Error} If there's a database error
 */
async function dbDeleteCitaById(id) {
    try {
        const deletedCita = await CitaModel.findByIdAndDelete(id);
        
        if (!deletedCita) {
            logInfo('Appointment not found for deletion', { id });
            return null;
        }

        logInfo('Appointment deleted successfully', { id });
        return deletedCita;
    } catch (error) {
        logError('Error deleting appointment', { id, error });
        throw error;
    }
}

/**
 * @async
 * @function dbUpdateCitaById
 * @description Updates an appointment by ID
 * @param {string} id - The appointment ID to update
 * @param {Object} updateData - The data to update
 * @param {boolean} [fullUpdate=false] - Whether to perform a full update (PUT) or partial (PATCH)
 * @returns {Promise<Object|null>} The updated appointment or null if not found
 * @throws {Error} If there's a database error
 */
async function dbUpdateCitaById(id, updateData, fullUpdate = false) {
    try {
        const options = { 
            new: true, // Return the updated document
            runValidators: true // Run model validators on update
        };

        let updatedCita;
        
        if (fullUpdate) {
            // For PUT (full update), replace the entire document
            updatedCita = await CitaModel.findByIdAndUpdate(id, updateData, options);
        } else {
            // For PATCH (partial update), use $set operator
            updatedCita = await CitaModel.findByIdAndUpdate(
                id, 
                { $set: updateData }, 
                options
            );
        }

        if (!updatedCita) {
            logInfo('Appointment not found for update', { id });
            return null;
        }

        logInfo('Appointment updated successfully', { id });
        return updatedCita;
    } catch (error) {
        logError('Error updating appointment', { id, error, updateData });
        throw error;
    }
}

module.exports = {
    dbInsertCita,
    dbGetCitas,
    dbGetCitaById,
    dbGetCitaByUsername,
    dbDeleteCitaById,
    dbUpdateCitaById
};