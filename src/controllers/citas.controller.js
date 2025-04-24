// const verifyProperties = require("../helpers/verify-properies.helper");
// const { dbInsertCitas, dbGetCitas, dbGetCitaById, dbDeleteCitaById, dbUpdateCitaById } = require("../services/cita.service");



// async function getCitas( req, res ) {

//     try {
//         const data = await dbGetCitas();

//         res.json({
//             ok: true,
//             data: data
//         });        
//     } 
//     catch ( error ) {
//         console.error( error );         // Imprime error al Desarrollador
//         // Envia un mensaje de error legible al usuario
//         res.json({
//             ok: false,
//             msg: 'Ha ocurrido una excepcion al obtener todos los datos'
//         });
//     }

// }

// async function createCitas( req, res ) {
//     const inputData = req.body;
//     const userId = req.authUser.id;

//     inputData.userId = userId;

//     try {
//         const data = await dbInsertCitas( inputData );

//         res.json({
//             ok: true,
//             data: data
//         });    
//     } 
//     catch ( error ) {
//         /** Validamos si existen los errores de validacion */
//         if( error?.name === 'ValidationError' ) {
//             const errors = verifyProperties( error );       // Extrae los mensajes de error por cada propiedad

//             console.error( errors );           // Imprime error al Desarrollador
//             // Envia un mensaje de error legible al usuario
//             return res.json({
//                 ok: false,
//                 errors
//             });
//         }

//         console.error( error );       // Imprime error al Desarrollador
//         // Envia un mensaje de error legible al usuario
//         res.json({                  
//             ok: false,
//             errors
//         });
//     }

// }

// async function getCitaById( req, res ) {
//     const id = req.params.id;

//     try {
//         const data = await dbGetCitaById( id );

//         res.json({
//             ok: true,
//             data: data
//         });
//     } 
//     catch ( error ) {
//         console.error( error );       // Imprime error al Desarrollador
//         // Envia un mensaje de error legible al usuario
//         res.json({                  
//             ok: false,
//             msg: 'Ha ocurrido una excepcion al obtener los datos por ID'
//         });
//     }
    
// } 

// async function deleteCitaById( req, res ) {
//     const id = req.params.id;
    
//     try {
//         const data = await dbDeleteCitaById( id );

//         res.json({
//             ok: true,
//             data: data
//         });
//     } 
//     catch ( error ) {
//         console.error( error );       // Imprime error al Desarrollador
//         // Envia un mensaje de error legible al usuario
//         res.json({                  
//             ok: false,
//             msg: 'Ha ocurrido una excepcion al eliminar los datos por ID'
//         });
//     }

// }

// function updateCitaByIdPut( req, res ) {
//     const id = req.params.id;
//     res.json({
//         ok: true,
//         msg: `Actualiza todos los recursos de las citas por ID: ${ id }`
//     });
// }

// async function updateCitaByIdPatch( req, res ) {
//     const id = req.params.id;
//     const inputData = req.body;
    
//     try {
//         const data = await dbUpdateCitaById( id, inputData );

//         res.json({
//             ok: true,
//             data: data
//         });
//     } 
//     catch ( error ) {
//         console.error( error );       // Imprime error al Desarrollador
//         // Envia un mensaje de error legible al usuario
//         res.json({                  
//             ok: false,
//             msg: 'Ha ocurrido una excepcion al actualizar los datos por ID'
//         });
//     }

// }

// // module.exports = getProducts;  // Export Default
// module.exports = {
//     getCitas,
//     createCitas,
//     getCitaById,
//     deleteCitaById,
//     updateCitaByIdPut,
//     updateCitaByIdPatch
// };


const verifyProperties = require("../helpers/verify-properies.helper");
const { dbInsertCitas, dbGetCitas, dbGetCitaById, dbDeleteCitaById, dbUpdateCitaById } = require("../services/cita.service");



async function getCitas( req, res ) {

    try {
        const data = await dbGetCitas();

        res.json({
            ok: true,
            data: data
        });        
    } 
    catch ( error ) {
        console.error( error );         // Imprime si hay un error
        // Envia un mensaje de error legible al usuario
        res.json({
            ok: false,
            msg: 'Ha ocurrido una excepcion al obtener todos los datos'
        });
    }

}

async function createCitas( req, res ) {
    const inputData = req.body;
    const userId = req.authUser.id;

    inputData.userId = userId;

    try {
        const data = await dbInsertCitas( inputData );

        res.json({
            ok: true,
            data: data
        });    
    } 
    catch ( error ) {
        /** Validamos si existen los errores de validacion */
        if( error?.name === 'ValidationError' ) {
            const errors = verifyProperties( error );       // Extrae los mensajes de error

            console.error( errors );           // Imprime si hay un error
            // Envia un mensaje de error legible al usuario
            return res.json({
                ok: false,
                errors
            });
        }

        console.error( error );       // Imprime si hay un error
        // Envia un mensaje de error legible al usuario
        res.json({                  
            ok: false,
            errors
        });
    }

}

async function getCitaById( req, res ) {
    const id = req.params.id;

    try {
        const data = await dbGetCitaById( id );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime si hay un error
        // Envia un mensaje de error legible al usuario
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al obtener los datos por ID'
        });
    }
    
} 

async function deleteCitaById( req, res ) {
    const id = req.params.id;
    
    try {
        const data = await dbDeleteCitaById( id );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime si hay un error
        // Envia un mensaje de error legible al usuario
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al eliminar los datos por ID'
        });
    }

}

function updateCitaByIdPut( req, res ) {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: `Actualiza todos los recursos de las citas por ID: ${ id }`
    });
}

async function updateCitaByIdPatch( req, res ) {
    const id = req.params.id;
    const inputData = req.body;
    
    try {
        const data = await dbUpdateCitaById( id, inputData );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime si hay un error
        // Envia un mensaje de error legible al usuario
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al actualizar los datos por ID'
        });
    }

}

// module.exports = getProducts;  // Export Default
module.exports = {
    getCitas,
    createCitas,
    getCitaById,
    deleteCitaById,
    updateCitaByIdPut,
    updateCitaByIdPatch
};