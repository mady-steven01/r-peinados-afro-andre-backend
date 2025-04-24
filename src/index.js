const express = require( 'express' );
const dbConection = require('./config/mongo.config.js');
// const conexionDB = require('./config/mongo.config.js');
const app = express();
const cors = require( 'cors' );

const PORT = process.env.PORT ?? 3001; 


// Ejecuta la configuracion de Mongoose para Mongo
dbConection();      
// conexionDB();       

/** Middleware: Capacidad a Express de aceptar y comprender JSON */
app.use( express.json() );
app.use( cors() );

/** Middleware: Endpoints del sitio */
// http://localhost:<port>/api/products
app.use( '/api/products', require( './routes/product.routes.js' ) );
// http://localhost:<port>/api/styles
app.use( '/api/styles', require( './routes/style.routes.js' ) );
// http://localhost:<port>/api/users
app.use( '/api/users', require( './routes/user.routes.js' ) );
// http://localhost:<port>/api/users
app.use( '/api/auth', require( './routes/auth.routes.js' ) );


/** Lanzar servidor: http://localhost:<port> */
app.listen( PORT, function() {
    console.log( `Servidor lanzado en http://localhost:${ PORT }` );
});