exports.getvehiclelist = function(req,res){
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT * FROM vehicles where status = 0';
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
};

exports.vehiclelist = function(req,res){

  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT um.name as vendor_name, v.* from vehicles as v LEFT JOIN user_master as um on um.id=v.vendor_id where v.status=1 ';

  if(search_key!=''){
    queryString +='AND  um.name like "%'+search_key+'%" ';
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
          result.recordsFiltered = rows.length;
          result.success = JSON.stringify(rows);
          
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
 
      }); 
    });
};


exports.addVehicle = function(req,res){
    var vendor_id =  req.body.user_id;
    var reg_number= req.body.reg_number;
    var description= req.body.description;
    
    req.getConnection(function(err,connection){
        
        var queryString="INSERT INTO vehicles(vendor_id, reg_number,description,status) VALUES("+vendor_id+" ,'"+reg_number+"', '"+description+"', 0)";
        
        
         var result = {};

        return connection.query(queryString, function(err, rows, fields)  {
         
          if (err)
          {
              result.error= err;
          }
          else{
             result.success = "Vehicle inserted successfully";
          }
          
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(result)); 
   
         
         
     });  
    });
};


exports.idleVehicleList = function(req,res){

  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT um.name as vendor_name, v.* from vehicles as v LEFT JOIN user_master as um on um.id=v.vendor_id where (v.status=0 or v.status=-1) ';

  if(search_key!=''){
    queryString +='AND  um.name like "%'+search_key+'%" ';
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
          result.recordsFiltered = rows.length;
          result.success = JSON.stringify(rows);
          
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
 
      }); 
    });
};

exports.activateVehicle = function(req,res){
            var id =  req.body.id;
            var data = {}
            req.getConnection(function(err,connection){
              connection.query("update vehicles set status=0 WHERE id=?",[id],function(err, rows, fields){
                  if(!!err){
                    data.error = err;
              }else{
                  data.success = "vehicle deleted Successfully";
              }
               res.setHeader('Content-Type', 'application/json');
               res.send(JSON.stringify(data)); 
        });  
    });
};
exports.deActivateVehicle = function(req,res){
            var id =  req.body.id;
            var data = {}
            req.getConnection(function(err,connection){
              connection.query("update vehicles set status=-1 WHERE id=?",[id],function(err, rows, fields){
                  if(!!err){
                    data.error = err;
              }else{
                  data.success = "vehicle deleted Successfully";
              }
               res.setHeader('Content-Type', 'application/json');
               res.send(JSON.stringify(data)); 
        });  
    });
};