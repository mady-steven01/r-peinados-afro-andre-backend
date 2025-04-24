const { dbGetStyleById } = require("../services/Style.service");


const validateStyleExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const dataFound = await dbGetStyleById(id); // Función para buscar el estilo en la base de datos
        
        if ( ! dataFound ) 
            return res.status( 404 ).json({ 
                ok: false, 
                msg: 'El estilo no existe' 
            });

        req.dataFound = dataFound; // Guardamos el estilo en el request para usarlo después
        next();
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ 
            ok: false, 
            msg: 'Error al buscar el estilo'
        });
    }
};


module.exports = validateStyleExists;