exports.login = function(crypto){
    return function(req,res){
    {
     sess=req.session;
     req.getConnection(function(err,connection){ 
         if(err){
             console.log("Error connecting to Db");
         }
         console.log("DB connection established")
        var userName = req.body.userName;
        var password = req.body.password;
        var queryString = 'SELECT * FROM admin_master where username = "'+userName+'"';
        var result = {};

        return connection.query(queryString, function(err, rows, fields) {

            if (err)
            {
                result.error= err;
            }
            else
            {
                if(rows.length==0)
                {
                    result.error= "User not Exist.";
                }
                else
                {
                    if (rows[0].status==1) 
                    {   //Creating hash with received password value for comparison : DR
                        var passwordn = crypto.createHash('md5').update(password).digest("hex");
                        if (passwordn == rows[0].password) 
                        {
                            sess.userID = rows[0].id;
                            sess.userPrivilege = 1;
                            sess.userLevel = "admin";
                            result.success = rows[0];
                            console.log(sess);
                        }
                        else
                        {
                            result.error = "Password didn't match.";
                        }
                    }
                    else
                    {
                        result.error = "User Not Varified.";
                    }

                }

             }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result)); 
        });

     });
    };
  };
};
exports.authenticated = function(req,res){
      var userLevel = req.params.access;
      sess=req.session;
      var result = {};
     if(typeof sess.userID !=='undefined' && sess.userID!='' && sess.userLevel==userLevel){
         result.success = true;
     }else{
         result.error = false;
     }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result)); 
};
//Logout Route Handling
exports.logout = function(req,res){
    
    sess.userID ='' ;
    sess.userPrivilege = 0;
    sess.userLevel = '';
    result.success = 'Logged out successfully';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result)); 
}

