module.exports = function( app, fs ) {

    app.get( '/', function( req, res ) {
        res.render( 'index.html' );
    });

    app.get( '/about', function( req, res ) {
        res.render( 'about.html' );
    });

    app.get( '/ejs', function( req, res ) {
        res.render( 'index', {
            title: 'My Honmpage',
            length: 5
        })
    });

    app.get( '/rest1', function( req, res ) {
        fs.readFile( __dirname + '/../data/' + 'data.json', 'utf-8', function( err, data ) {
            res.end( data );
        });
    });

    app.get( '/rest2/:arg', function( req, res ) {
        fs.readFile( __dirname + '/../data/' + 'data.json', 'utf-8', function( err, data ) {
            var _data = JSON.parse( data );
            res.json( _data[req.params.arg] );
        });
    });

}
