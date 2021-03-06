exports.getVendorsList = function(req, res){
  req.getConnection(function(err,connection){ 

  var queryString = 'SELECT * FROM user_master WHERE user_type = 2 and status="Y"';
  
  var result = {}; 
  return connection.query(queryString, function(err, rows, fields) {
        if (err)
        {
          result.error= err;
            
        }
        else
        {
          result.success = JSON.stringify(rows);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
 
      }); 
    });
}

exports.vendorList = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT id,name,lisence_file,license_number,mobile_number,balance,DATE_FORMAT(dob,"%d, %b %Y ") as dob,di_number,pin, status, user_type FROM user_master WHERE user_type = 2 ';
  
  if(search_key!=''){
    queryString +='AND  name like "%'+search_key+'%" ';
  }
  queryString += 'LIMIT '+start+' , '+end;

  var result = {}; 
  return connection.query(queryString, function(err, rows, fields) {
        if (err)
        {
          result.error= err;
            
        }
        else
        {
          result.draw = draw;
          result.recordsTotal = rows.length;
          if(rows.length >= length){
            result.recordsFiltered = length;
          }else{
            result.recordsFiltered = rows.length;
          }
          result.success = JSON.stringify(rows);
          
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
 
      }); 
    });
};

exports.addVendor = function(formidable,fs){
      return function(req,res){
           { 
                        
            req.getConnection(function(err,connection){
                 
            var form = new formidable.IncomingForm();
            var $data = form.parse(req, function(err, fields, files) {
              if (err) {
                
                return;
              }
              /*res.writeHead(200, {'content-type': 'text/plain'});*/
              // This last line responds to the form submission with a list of the parsed data and files.
              $data = JSON.parse(fields.model);
               
              var name =  $data.first_name;
              var license_number = $data.license_number;
              var mobile_number= $data.mobile;
              var balance = 0;
              var dob = $data.dob;
              var di_number= $data.diNumber;
              var pin = $data.pin;
              var status = $data.verified;
              var user_type = 2;
              var datetimestamp = Date.now();

              var date = new Date(dob);
              var newDate =  date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate();

              var licensefileName = datetimestamp+"-"+files.file.name;
              var result = {};    
              var newfile = 'public/uploads/'+licensefileName;
                fs.copy(files.file.path, newfile, function(err) {
                  if (err) {
                    
                    req.flash("error", "Oops, something went wrong! (reason: copy)");
                    
                  }
                  fs.unlink(files.file.path, function(err) {
                    if (err) {
                      req.flash("error", "Oops, something went wrong! (reason: deletion)");
                      
                    }
                    
                  });
                });

              
                var queryString = "INSERT INTO `user_master`(`name`, `lisence_file`, `license_number`, `mobile_number`, `balance`, `dob`, `di_number`, `pin`, `user_type`, `status`) VALUES ('"+name+"','"+licensefileName+"','"+license_number+"','"+mobile_number+"',"+balance+",'"+newDate+"','"+di_number+"','"+pin+"',"+user_type+",'"+status+"')";
                return connection.query(queryString, function(err, rows, fields)  {
                 
                  if (err)
                    {
                        result.error= err;
                    }
                 
                 else{

                     result.success= "Record Inserted Successfully.";
                
                 }
                    
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(result)); 
         
         });
        });  
      });  
    };
  };  
};



exports.singleVendorData = function(req,res){
 
 req.getConnection(function(err,connection){ 
  var id = req.params.id;
  var queryString = 'SELECT id,name,lisence_file,license_number,mobile_number,balance,DATE_FORMAT(dob,"%d, %b %Y ") as dob,di_number,pin,status, user_type FROM user_master WHERE user_type = 2';
   
  queryString += " AND id = '"+id+"'";
  
  var result = {}; 
  return connection.query(queryString, function(err, rows, fields) {
        if (err)
        {
          result.error= err;
            
        }
        else
        {
          result.success = JSON.stringify(rows[0]);
         }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
        
      }); 
    });    
};