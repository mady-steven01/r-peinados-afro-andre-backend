const express = require( 'express' );
const { getProducts, createProduct, getProductById, deleteProductById, updateProductByIdPut, updateProductByIdPatch } = require('../controllers/product.controller');
const { validateAuthUser } = require('../middlewares/validate-auth-user.middleware');

const router = express.Router();

// http://localhost:<port>/api/products/
router.get( '/', getProducts );

// http://localhost:<port>/api/products/
router.post( '/',  validateAuthUser , createProduct );

// http://localhost:<port>/api/products/<product-id>
// req.params.pedro = 7654ftgyhuji
router.get( '/:id', getProductById );

// http://localhost:<port>/api/products/<product-id>
router.delete( '/:id', deleteProductById );


// http://localhost:<port>/api/products/<product-id>
router.patch( '/:id', updateProductByIdPatch );


module.exports = router;