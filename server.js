    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)

    var mysql = require('mysql');                     // mongoose for mysql
    var connection = require('express-myconnection');
    
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    
    var crypto = require('crypto');
    var session = require('express-session');
    
    var admin = require("./admin");
    var router = require("./routes");
    
    
    app.use(express.static(__dirname + '/public'));// set the static files location /public/img will be /img for users
    
    app.use(morgan('dev'));  // log every request to the console

    app.use(bodyParser.urlencoded({'extended':'true'}));
    // parse application/x-www-form-urlencoded
    
    app.use(bodyParser.json());  
    // parse application/json
    
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    // parse  app.use(methodOverride());
    app.use(
        connection(mysql,{

            host: 'localhost',
            user: 'root',
            password : '',
            database:'vehicle_admin'
        },'request')
    );//route index, hello world
    app.use(session({secret: 'ssshhhhh'}));
    
    /*Routing Handler*/
    app.get('*', router.index);
    app.post('/login', admin.login(crypto));
    app.use(app.router);
    /*Routing Handler*/
    
    app.listen(8080);
    console.log("App listening on port 8080");