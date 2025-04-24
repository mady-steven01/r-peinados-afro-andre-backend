const express = require( 'express' );

const validateId = require('../middlewares/validate-id.middleware');
const { validateAuthUser } = require('../middlewares/validate-auth-user.middleware');
const { getStyle, createStyle, getStyleById, deleteStyleById, updateStyleById } = require('../controllers/styles.controller');
const validateStyleExists = require('../middlewares/validate-styles-exists.middleware');

const router = express.Router();


// http://localhost:<port>/api/styles/
router.get( '/', getStyle );

// http://localhost:<port>/api/styles/
router.post( '/', validateAuthUser, createStyle );

// http://localhost:<port>/api/styles/<style-id>
// req.params.pedro = 7654ftgyhuji
router.get( '/:id', [ validateId, validateStyleExists ], getStyleById );

// http://localhost:<port>/api/styles/<style-id>
router.delete( '/:id', [ validateAuthUser, validateId, validateStyleExists ], deleteStyleById );

// http://localhost:<port>/api/styles/<style-id>
router.patch( '/:id', [ validateAuthUser, validateId, validateStyleExists ], updateStyleById );


module.exports = router;