    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mysql = require('mysql');                     // mongoose for mysql
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var crypto = require('crypto');
    // configuration =================
    var connection = mysql.createConnection(
                {
                  host     : 'localhost',
                  user     : 'root',
                  password : '',
                  database : 'vehicle_admin',
                }
            );
    connection.connect();

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html','utf-8'); // load the single view file (angular will handle the page changes on the front-end)
    });
    app.post('/login', function(req, res) {
        var userName = req.body.userName;
        var password = req.body.password;

        var queryString = 'SELECT * FROM user_master where username = "'+userName+'"';

        console.log(password);

        connection.query(queryString, function(err, rows, fields) {
            res.setHeader('Content-Type', 'application/json');
            if (err){
                res.send(JSON.stringify(err));
            }else{
                if(rows.length==0){
                    res.send(JSON.stringify({error: "User not Exist."}));
                }else{
                    if (rows[0].status==1) {
                        var passwordn = crypto.createHash('md5').update(password).digest("hex");
                        if (passwordn == rows[0].password) {

                            res.send(JSON.stringify(rows[0]));
                        }else{
                            res.send(JSON.stringify({error: "Password didn't match."}));
                        }
                    }else{
                        res.send(JSON.stringify({error: "User Not Varified."}));
                    }
                    
                }
                
            }
        });
    });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");