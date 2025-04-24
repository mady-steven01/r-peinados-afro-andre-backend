const express = require( 'express' );

const { getUsers, createUser, getUserById, deleteUserById, updateUserById } = require('../controllers/user.controller');
const validateId = require('../middlewares/validate-id.middleware');
const { validateUserExistsByUserName, validateUserDoesNotExistsById } = require('../middlewares/validate-user-exists.middleware');

const router = express.Router();


// http://localhost:<port>/api/users/
router.get( '/', getUsers );

// http://localhost:<port>/api/users/
router.post( 
    '/', 
    validateUserExistsByUserName, 
    createUser 
);

// http://localhost:<port>/api/users/<style-id>
// req.params.mady = 7654ftgyhuji
router.get( 
    '/:id', 
    [ validateId, validateUserDoesNotExistsById ], 
    getUserById 
);

// http://localhost:<port>/api/users/<style-id>
router.delete( 
    '/:id', 
    [ validateId, validateUserDoesNotExistsById ], 
    deleteUserById 
);

// http://localhost:<port>/api/users/<style-id>
router.patch( 
    '/:id', 
    [ validateId, validateUserDoesNotExistsById ], 
    updateUserById 
);


module.exports = router;