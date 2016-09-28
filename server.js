    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var url = require('url'); 

    var mysql = require('mysql');                     // mongoose for mysql
    var connection = require('express-myconnection');
    
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    
    var crypto = require('crypto');
    var session = require('express-session');
    
    var admin = require("./admin");
    var user = require("./user");
    var vendor = require("./vendor");
    var recharge=require("./recharge");
    var trip = require("./trip");
    var vehicle = require("./vehicle");
    var router = require("./routes");
    
    
    app.use(express.static(__dirname + '/public'));// set the static files location /public/img will be /img for users
    
    app.use(morgan('dev'));  // log every request to the console

    app.use(bodyParser.urlencoded({'extended':'true'}));
    // parse application/x-www-form-urlencoded
    app.use(url); 
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
    /*Adimin login & other functionality*/
    app.post('/login', admin.login(crypto));
    app.get('/authentication/:access', admin.authenticated);
    app.get('/logout', admin.logout); 

    /*User list & other functionality*/
    app.get('/userList', user.userlist);


    /*Vendore list & other functionality*/
    app.get('/vendorList', vendor.vendorList); 

     /*Recharge list & other functionality*/
    app.get('/rechargeList',  recharge.rechargelist);
    
     /*Trip list & other functionality*/
    app.get('/tripList', trip.triplist);
    
     /*VEHICLElist & other functionality*/
    app.get('/vehicleList', vehicle.vehiclelist);

     /*Add user*/
    app.post('/addUser',user.addUser);
    

    app.use(app.router);
    /*Routing Handler*/
    
    app.listen(8080);
    console.log("App listening on port 8080");