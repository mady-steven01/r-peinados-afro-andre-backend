const express = require( 'express' );

const { loginUser, reNewToken } = require('../controllers/auth.controller');
const { validateAuthUser } = require('../middlewares/validate-auth-user.middleware');
const { createUser } = require('../controllers/user.controller');

const router = express.Router();

/**Definir las rutas para la entidad usuario 
 * http://localhost:3000/api/auth
*/

// Crear un usuario --> http://localhost:3000/api/auth/register
router.post( '/register', createUser );

// Autenticar usuario --> http://localhost:3000/api/auth/login
router.post( '/login', loginUser );

// Renovar las credenciales (Token) --> http://localhost:3000/api/auth/re-new-token
router.get( '/re-new-token', validateAuthUser, reNewToken );



module.exports = router;