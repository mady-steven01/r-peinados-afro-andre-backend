const express = require( 'express' );
const { getCitas, createCita, getCitaById, deleteCitaById, updateCitaByIdPut, updateCitaByIdPatch } = require('../controllers/cita.controller');
const { validateAuthCita } = require('../middlewares/validate-auth-cita.middleware');

const router = express.Router();
// const routes: Routes = [
//   // ... other routes
//   { 
//     path: 'citas/nueva', 
//     component: CitasEditComponent 
//   },
//   { 
//     path: 'citas/editar/:id', 
//     component: CitasEditComponent 
//   }
// ];

// http://localhost:<port>/api/cita/
router.get( '/', getCita );

// http://localhost:<port>/api/Cita/
router.post( '/',  validateAuthCita , createCita );

// http://localhost:<port>/api/citas/<cita-id>
// req.params.pedro = 7654ftgyhuji
router.get( '/:id', getCitaById );

// http://localhost:<port>/api/citas/<cita-id>
router.delete( '/:id', deleteCitaById );


// http://localhost:<port>/api/citas/<cita-id>
router.patch( '/:id', updateCitaByIdPatch );


module.exports = router;