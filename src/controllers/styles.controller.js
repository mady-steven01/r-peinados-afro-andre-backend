const verifyProperties = require("../helpers/verify-properies.helper");
const { dbInsertStyle, dbGetStyles, dbGetStyleById, dbDeleteStyleById, dbUpdateStyleById } = require("../services/style.service");

async function createStyle( req, res ) {
    const inputData = req.body;
    
    inputData.userId = req.authUser.id;

    try {
        const data = await dbInsertStyle( inputData );

        res.json({
            ok: true,
            data: data
        });    
    } 
    catch ( error ) {
        /** Validamos si existen los errores de validacion */
        if( error?.name === 'ValidationError' ) {
            const errors = verifyProperties( error );       // Extrae los mensajes de error por cada propiedad

            console.error( errors );           // Imprime error al Desarrollador
            // Envia un mensaje de error legible al cliente
            return res.json({
                ok: false,
                errors
            });
        }

        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al registrar los datos'
        });
    }

}

async function getStyle( req, res ) {

    try {
        const data = await dbGetStyles();

        res.json({
            ok: true,
            data: data
        });        
    } 
    catch ( error ) {
        console.error( error );         // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({
            ok: false,
            msg: 'Ha ocurrido una excepcion al obtener el estilo deseado'
        });
    }

}

async function getStyleById( req, res ) {
    const id = req.params.id;

    try {
        const data = await dbGetStyleById( id );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al obtener una estilo por ID'
        });
    }
    
} 

async function deleteStyleById( req, res ) {
    const id = req.params.id;
    
    try {
        const data = await dbDeleteStyleById( id );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al eliminar un estilo por ID'
        });
    }

}

async function updateStyleById( req, res ) {
    const id = req.params.id;
    const inputData = req.body;
    
    try {
        const data = await dbUpdateStyleById( id, inputData );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al actualizar un estilo por ID'
        });
    }

}


module.exports = {
  createStyle,
  getStyle,
  getStyleById,
  deleteStyleById,
  updateStyleById
}