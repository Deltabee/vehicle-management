exports.vehiclelist = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT * FROM vehicle_master';

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


exports.addVehicle = function(req,res){
    var id =  req.body.id;
    var vendor_id =  req.body.vendor_id;
    var registration_number= req.body.registration_number;
    var start_time= req.body.starttime;
    var description= req.body.description;
    var status= req.body. Status;
    var vehicle_type= req.body.vehicletype;
   
   

    req.getConnection(function(err,connection){
        
        var queryString=("INSERT INTO vehicle_master VALUES('',?,?,?,?,?,?,?)",[ id, vendor_id ,registration_number, start_time,  description,status,  vehicle_type]);
        
        
     var result = {};

    return connection.query(queryString, function(err, rows, fields)  {
     
      if (err)
            {
                result.error= err;
            }
     
     else{
         result.success=("trip inserted successfully");
    
     }
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
 
     
     
 });  
    });
};