// load express module
var express = require( 'express' );

// init express
var app = express();

// load module
var router = require( './router/main.js' )(app);

// set html path
app.set( 'views', __dirname + '/views' );

// using ejs engine when html rendering to server 
app.set( 'view engine', 'ejs' );
app.engine( 'html', require('ejs').renderFile );

// listen port 3000
var server = app.listen (
    3000,
    function()
    {
        console.log( 'express start http://192.168.99.100:1002' );
    }
);

// using static file in public directory
app.use( express.static('public') );
