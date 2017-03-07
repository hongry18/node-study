var express = require( 'express' );
var app = express();
var router = require( './router/main.js' )(app);

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.engine( 'html', require('ejs').renderFile );

var server = app.listen (
    3000,
    function()
    {
        console.log( 'express start http://192.168.99.100:1002' );
    }
);
