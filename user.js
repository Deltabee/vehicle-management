
exports.userlist = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT id,name,lisence_file,mobile_number,balance,DATE_FORMAT(dob,"%d, %b %Y ") as dob,di_number,pin,status, user_type FROM user_master WHERE user_type = 1';

  if(search_key!=''){
    queryString +='AND  name like "%'+search_key+'%" ';
  }
  queryString += ' LIMIT '+start+' , '+end;

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




    exports.addUser = function(req,res){
    var id =  req.body.id;
    var name =  req.body.name;
    var license_file = req.body.licensefile;
    var mobile_number= req.body.mobilenumber;
    var balance = req.body.balance;
    var dob = req.body.DOB;
    var di_number= req.body.dinumber;
    var pin = req.body.pin;
    var status = req.body.status;
    var user_type = req.body.usertype;

    req.getConnection(function(err,connection){
        
        var queryString=("INSERT INTO user_master VALUES('',?,?,?,?,?,?,?,?,?,?)",[id, name ,license_file,mobile_number, balance,dob, di_number,pin, status,user_type]);
        
        
        
     var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');     
    
    });
     
     
     
 
                
     var result = {};

    return connection.query(queryString, function(err, rows, fields)  {
     
      if (err)
            {
                result.error= err;
            }
     
     else{
         result.success=("record inserted successfully");
    
     }
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
 
     
     
 });  
    };
    

