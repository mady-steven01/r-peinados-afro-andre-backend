const { dbGetUserById, dbGetUserByUsername } = require("../services/user.service");


const validateUserExistsByUserName = async (req, res, next) => {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe BD  ---> email
        const dataFound = await dbGetUserByUsername( inputData.username ); // Función para buscar el usuario en la base de datos
        
        if ( dataFound ) 
            return res.status( 404 ).json({ 
                ok: false, 
                msg: 'El usuario ya existe' 
            });

        req.dataFound = dataFound; // Guardamos el usuario en el request para usarlo después
        next();
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ 
            ok: false, 
            msg: 'Error al buscar el usuario'
        });
    }
};

const validateUserDoesNotExistsById = async (req, res, next) => {
    // Paso 1: Obtener los datos a registrar (usuario)
    const id = req.params.id;

    try {
        // Paso 2: Verificar si el usuario existe BD  ---> id
        const dataFound = await dbGetUserById( id ); // Función para buscar el usuario en la base de datos
        // console.log(id, dataFound);
        if ( ! dataFound ) 
            return res.status( 404 ).json({ 
                ok: false, 
                msg: 'El usuario NO existe' 
            });

        req.dataFound = dataFound; // Guardamos el usuario en el request para usarlo después
        next();
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ 
            ok: false, 
            msg: 'Error al buscar el usuario'
        });
    }
};


module.exports = {
    validateUserExistsByUserName,
    validateUserDoesNotExistsById
};