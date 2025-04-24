const mongoose = require( 'mongoose' );

const validateId = (req, res, next) => {
    const id = req.params.id;

    /** Valida si el ID no es valido para Mongoose */
    if ( ! mongoose.Types.ObjectId.isValid( id ) )
        return res.status( 400 ).json({ 
            ok: false, 
            msg: 'El id NO válido' 
        });

    next();
};


module.exports = validateId;