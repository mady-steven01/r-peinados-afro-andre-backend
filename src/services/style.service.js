const StyleModel = require("../models/styles.model");

async function dbInsertStyle( newStyle ) {
    return await StyleModel.create( newStyle );
}

async function dbGetStyles() {
    return await StyleModel.find({});     // Mongoose obtiene todos los datos en MongoDB
}

async function dbGetStyleById( id ) {
    return await StyleModel.findById( id );           // Forma 1: Usando findById
    return await StyleModel.findOne({ _id: id });     // Forma 2: Usando findOne
}

async function dbDeleteStyleById( id ) {
    return await StyleModel.findByIdAndDelete( id );           // Forma 1: Usando findByIdAndDelete
    return await StyleModel.findOneAndDelete({ _id: id });     // Forma 2: Usando findOneAndDelete
}

async function dbUpdateStyleById( id, newStyle ) {
    // Forma 1: Usando findByIdAndUpdate
    return await StyleModel.findByIdAndUpdate( 
        id,                 // id del documento que se va a actualizar
        newStyle,         // Objeto con los datos a actualizar del documento
        { new: true }       // Retornar los nuevos cambios realizados
    );
    
    // Forma 2: Usando findOneAndUpdate
    return await StyleModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta con el ID del documento que se va a actualizar
        newStyle,         // Objeto con los datos a actualizar del documento
        { new: true }       // Retornar los nuevos cambios realizados
    );
}


module.exports = {
    dbInsertStyle,
    dbGetStyles,
    dbGetStyleById,
    dbDeleteStyleById,
    dbUpdateStyleById
}