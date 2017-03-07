// load modules
var express = require( 'express' );
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

// set html path
app.set( 'views', __dirname + '/views' );

// using ejs engine when server renders html
app.set( 'view engine', 'ejs' );
app.engine( 'html', require('ejs').renderFile );

// listen port 3000
var server = app.listen (
    3000,
    function() {
        console.log( 'express start http://192.168.99.100:1002' );
    }
);

// using static file in public directory
app.use( express.static('public') );

// using ejs
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use(
    session({
        secret: '#@test@#',
        resave: false,
        saveUninitialized: true
    })
);

// load custom router
var router = require( './router/main.js' )( app, fs );
