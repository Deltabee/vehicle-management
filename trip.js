exports.triplist = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT trip_id,owner_id,DATE_FORMAT(start_date,"%d, %b %Y ") as start_date,start_time,multiplier,vehicle_id,requester_id,trip_status FROM trips';

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


exports.addTrip = function(req,res){
    var trip_id =  req.body.id;
    var owner_id =  req.body.owner_id;
    var start_date = req.body.startdate;
    var start_time= req.body.starttime;
    var multiplier = req.body.multiplier;
    var vehicle_id = req.body.vehicle id;
    var requester_id= req.body.requester id;
    var trip_status = req.body.trip status;
   

    req.getConnection(function(err,connection){
        
        var queryString=("INSERT INTO trips VALUES('',?,?,?,?,?,?,?,?)",[trip_id, owner_id ,start_date,start_time, multiplier,vehicle_id,  requester_id,pin, trip_status]);
        
        
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
    

