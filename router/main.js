module.exports = function( app, fs ) {

    app.get( '/', function( req, res ) {
        sess = req.session;
        console.log( sess.username );
        res.render( 'index.html' );
    });

    app.get( '/about', function( req, res ) {
        res.render( 'about.html' );
    });

    app.get( '/ejs', function( req, res ) {
        res.render( 'index', {
            title: 'My Honmpage',
            length: 5
        });
    });

    app.get( '/rest1', function( req, res ) {
        var jsonPath = __dirname + '/../data/data.json';
        fs.readFile( jsonPath, 'utf-8', function( err, data ) {
            res.end( data );
        });
    });

    app.get( '/user/:username', function( req, res ) {
        var jsonPath = __dirname + '/../data/data.json';
        fs.readFile( jsonPath, 'utf-8', function( err, data ) {
            var _data = JSON.parse( data );
            res.json( _data[req.params.username] );
        });
    });

    app.post( '/user/:username', function( req, res ) {
        var result = {};
        var username = req.params.username;
        var jsonPath = __dirname + '/../data/data.json';

        if ( !req.body['password'] || !req.body['name'] ) {
            result['success'] = 0;
            result['error'] = 'invaild request';
            res.json( result );
            return;
        }

        fs.readFile( jsonPath, 'utf-8', function( err, data ) {
            var _data = JSON.parse( data );
            if ( _data[username] ) {
                result['success'] = 0;
                result['error'] = 'duplicate';
                res.json( result );
                return;
            }

            // Add Data
            _data[username] = req.body;

            // SAVE File
            fs.writeFile( jsonPath, JSON.stringify(_data, null, '\t'), 'utf-8', function( err, data ) {
                result['success'] = 1;
                result['data'] = JSON.parse( data );
                res.json( result );
            });
        });
    });

    app.put( '/user/:username', function( req, res ) {
        var result = {};
        var username = req.params.username;
        var jsonPath = __dirname + '/../data/data.json';

        if ( !req.body['password'] || !req.body['name'] ) {
            result['success'] = 0;
            result['error'] = 'invaild request';
            res.json( result );
            return;
        }

        fs.readFile( jsonPath, 'utf-8', function( err, data ) {
            var _data = JSON.parse( data );
            if ( !_data[username] ) {
                result['success'] = 0;
                result['error'] = 'empty User';
                res.json( result );
                return;
            }

            _data[username] = req.body;

            fs.writeFile( jsonPath, JSON.stringify(_data, null, '\t'), 'utf-8', function( err, data ) {
                result['success'] = 1;
                res.json( result );
            });
        });
    });

    app.delete( '/user/:username', function( req, res) {
        var result = {};
        var username = req.params.username;
        var jsonPath = __dirname + '/../data/data.json';

        if ( !req.body['password'] || !req.body['name'] ) {
            result['success'] = 0;
            result['error'] = 'invaild request';
            res.json( result );
            return;
        }

        fs.readFile( jsonPath, 'utf-8', function( err, data ) {
            var _data = JSON.parse( data );
            if ( !_data[username] ) {
                result['success'] = 0;
                result['error'] = 'empty User';
                res.json( result );
                return;
            }

            delete _data[username];

            fs.writeFile( jsonPath, JSON.stringify(_data, null, '\t'), 'utf-8', function( err, data ) {
                result['success'] = 1;
                res.json( result );
            });
        });
    });

    app.get( '/login', function( req, res ) {
        sess = req.session;
        sess.username = 'hongry';
        res.end( 'login\n' );
    });
}
