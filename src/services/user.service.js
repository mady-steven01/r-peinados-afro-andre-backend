
const { encryptedPassword } = require("../helpers/bcrypt.helper");
const removePropertiesToObject = require("../helpers/delete-document-properties.helper");
const UserModel = require("../models/user.model");

async function dbInsertUser( newUser ) {
    // return await UserModel.create( newUser );  // Esto Registra en la base de datos inmediatamente

    // Paso 1: Prepara el objeto BJSON para registrar en DB
    const dbUser = new UserModel( newUser );
    console.log( 'dbUser', dbUser );

    // Paso 2: Encripta y actualiza password en su respectiva propiedad
    dbUser.password = encryptedPassword( dbUser.password );
    
    // Paso 3: Registra el objecto BJSON con los cambios hechos
    await dbUser.save();      

    // Paso 4: Convierte un BJON en un Objeto JavaScript
    const objsUser = removePropertiesToObject({ obj: dbUser, properties: [ 'password', 'createdAt', 'updatedAt' ] });

    // Paso 6: Retorno al cliente el Objeto JavaScript con los campos eliminados
    return objsUser;
}

async function dbGetUsers() {
    // Mongoose obtiene todos los datos en MongoDB
    return await UserModel.find(
        {},                                                 // Objeto de consulta vacio por que queremos todos los documentos sin filtrar
        { password: 0, createdAt: 0, updatedAt: 0 }         // Excluir las propiedades: Sintaxis con objeto de configuracion de consulta
    );
}

async function dbGetUserById( id ) {
    // Forma 1: Usando findById
    return await UserModel.findById( 
        id,                                                 // findById solo ocupa usar el id del documento que requerimos encontrar
        { password: 0, createdAt: 0, updatedAt: 0, _id: 0 } // Excluir las propiedades: Sintaxis con objeto de configuracion de consulta
    );           
    // Forma 2: Usando findOne
    return await UserModel.findOne( { _id: id } )           // findOne ocupa usar el objeto de consulta para indicar la propiedad y el valor por el que deseamos filtrar en este caso _id
        .select('-password -createdAt -updatedAt -_id');    // Excluir las propiedades: Sintaxis usando el metodo select para configurar la consulta
}

async function dbDeleteUserById( id ) {
    // Forma 1: Usando findByIdAndDelete
    return await UserModel.findByIdAndDelete( 
        id,                     // findById solo ocupa usar el id del documento que requerimos encontrar
        { password: 0 }         // Excluir las propiedades: Sintaxis con objeto de configuracion de consulta
    );           
    // Forma 2: Usando findOneAndDelete
    return await UserModel.findOneAndDelete(
        { _id: id },            // findOne ocupa usar el objeto de consulta para indicar la propiedad y el valor por el que deseamos filtrar en este caso _id
        { password: 0 }         // Excluir las propiedades: Sintaxis con objeto de configuracion de consulta
    );     
}

async function dbUpdateUserById( id, newUser ) {
    // Forma 1: Usando findByIdAndUpdate
    return await UserModel.findByIdAndUpdate( 
        id,                                     // findByIdAndUpdate solo ocupa usar el id del documento que requerimos encontrar
        newUser,                                // Objeto con los datos a actualizar del documento
        { new: true, select: '-password' }      // Excluir las propiedades: Sintaxis con objeto de configuracion de consulta
    );
    
    // Forma 2: Usando findOneAndUpdate
    return await UserModel.findOneAndUpdate(
        { _id: id },        // findOneAndUpdate ocupa usar el objeto de consulta para indicar la propiedad y el valor por el que deseamos filtrar en este caso _id
        newUser,            // Objeto con los datos a actualizar del documento
        { new: true }       // Retorna los cambios nuevos de actualizacion: Sintaxis con objeto de configuracion de consulta
    ).select( '-password' );// Excluir las propiedades: Sintaxis usando el metodo select para configurar la consulta
}

const dbGetUserByUsername = async ( email ) => {
    return await UserModel.findOne({ username: email }).select( '-createdAt -updatedAt' );  // Excluir las propiedades: Sintaxis usando el metodo select para configurar la consulta
}


module.exports = {
    dbInsertUser,
    dbGetUsers,
    dbGetUserById,
    dbDeleteUserById,
    dbUpdateUserById,
    dbGetUserByUsername
}