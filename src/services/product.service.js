const ProductModel = require("../models/product.model");

async function dbInsertProduct( newProduct ) {
    /** Consulta a la BD (Responsabilidad del Servicio) */
    return await ProductModel.create( newProduct );    // Mongoose registra en MongoDB
}

async function dbGetProducts() {
    return await ProductModel.find({}).populate(['userId']);     // Mongoose obtiene todos los datos en MongoDB
}

async function dbGetProductById( id ) {
    return await ProductModel.findById( id );           // Forma 1: Usando findById
    return await ProductModel.findOne({ _id: id });     // Forma 2: Usando findOne
}

async function dbDeleteProductById( id ) {
    return await ProductModel.findByIdAndDelete( id );           // Forma 1: Usando findByIdAndDelete
    return await ProductModel.findOneAndDelete({ _id: id });     // Forma 2: Usando findOneAndDelete
}

async function dbUpdateProductById( id, newProduct ) {
    // Forma 1: Usando findByIdAndUpdate
    return await ProductModel.findByIdAndUpdate( 
        id,                 // id del documento que se va a actualizar
        newProduct,         // Objeto con los datos a actualizar del documento
        { new: true }       // Retornar los nuevos cambios realizados
    );
    
    // Forma 2: Usando findOneAndUpdate
    return await ProductModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta con el ID del documento que se va a actualizar
        newProduct,         // Objeto con los datos a actualizar del documento
        { new: true }       // Retornar los nuevos cambios realizados
    );
}




module.exports = {
    dbInsertProduct,
    dbGetProducts,
    dbGetProductById,
    dbDeleteProductById,
    dbUpdateProductById
};