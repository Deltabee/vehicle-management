exports.triplist = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  /*var queryString = "SELECT id,owner_id,DATE_FORMAT(start_date,'%d, %b %Y ') as start_date, start_time, vehicle_id, requester_id FROM ongoing_trips ";*/
  var queryString = "SELECT um.name as vendor_name, v.reg_number, og.*, DATE_FORMAT(og.start_date,'%d, %b %Y ') as start_date FROM ongoing_trips as og INNER JOIN user_master as um on um.id=og.owner_id INNER JOIN vehicles as v ON v.id = og.vehicle_id where og.status=1";
  if(search_key!=''){
    queryString += ' AND um.name like "%'+search_key+'%"';
  }
  queryString += " LIMIT "+start+" , "+end;
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

exports.getOnGoingSingle = function(req,res){
 
 req.getConnection(function(err,connection){ 
  var id = req.params.id;
  var queryString = "SELECT id,owner_id,DATE_FORMAT(start_date,'%d, %b %Y ') as start_date, start_time, vehicle_id, requester_id FROM ongoing_trips";
   
  queryString += " where id = '"+id+"'";
  
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



exports.addTrip = function(req,res){
          var owner_id=  req.body.owner_id;
          var start_date = req.body.start_date;
          var start_time= req.body.start_time;
          var vehicle_id = req.body.vehicle_id;
          var requester_id= req.body.requester_id;
          var date = new Date(start_date);
          var newDate =  date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate();

          req.getConnection(function(err,connection){
              var result = {};
              var queryString = 'insert into ongoing_trips(owner_id, start_date, start_time, vehicle_id, requester_id, status) values('+owner_id+',"'+newDate+'","'+start_time+'", '+vehicle_id+', '+requester_id+', 1)';
              return connection.query(queryString, function(err, rows, fields)  {
                    if (err)
                    {
                      result.error= err;
                    }
                    else
                    {
                      
                      var queryString1 = "update vehicles set trip_id="+rows.insertId+", status=1 where id="+vehicle_id;
                      connection.query(queryString1, function(err, rows, fields)  {

                          result.success="Trip inserted successfully";
                      });
                      
                    }

                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(result)); 
              });  
          });
};
exports.updateOnGoingSingle= function(req,res){
    
    var id =  req.body.id;
    var owner_id=  req.body.owner_id;
    var start_date = req.body.start_date;
    var start_time= req.body.start_time;
    var vehicle_id = req.body.vehicle_id;
    var requester_id= req.body.requester_id;
    var date = new Date(start_date);
    var newDate =  date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate();
    
    var data = {};
    req.getConnection(function(err,connection){ 

      var queryString = "SELECT * from ongoing_trips where id="+id;
      connection.query(queryString, function(err, rows, fields){
          if(!!err){
                data.error = err;
              }else{
                  if(rows[0].vehicle_id==vehicle_id){

                  }else{
                    connection.query("update vehicles set status = 0 where id="+vehicle_id, function(err, rows, fields){

                    });
                  }
                  connection.query("UPDATE ongoing_trips SET owner_id=?, start_date=?, start_time=?, vehicle_id=?, requester_id=?  WHERE id=?",[owner_id , newDate,start_time, vehicle_id ,  requester_id,id],function(err, rows, fields){
                        if(!!err){
                            data.error = err;
                        }else{
                            data.success = "Trip Updated Successfully";
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(data)); 
                    });
              }
      });
    });     
};

exports.completedTripList = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  /*var queryString = "SELECT id,owner_id,DATE_FORMAT(start_date,'%d, %b %Y ') as start_date, start_time, vehicle_id, requester_id FROM ongoing_trips ";*/
  var queryString = "SELECT um.name as vendor_name, og.*, DATE_FORMAT(og.start_date,'%d, %b %Y ') as start_date, DATE_FORMAT(og.end_date,'%d, %b %Y ') as trip_end_date FROM ongoing_trips as og INNER JOIN user_master as um on um.id=og.owner_id where og.status=2";
  if(search_key!=''){
    queryString += ' AND um.name like "%'+search_key+'%"';
  }
  queryString += " LIMIT "+start+" , "+end;
  
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


exports.cancelledTripList = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  /*var queryString = "SELECT id,owner_id,DATE_FORMAT(start_date,'%d, %b %Y ') as start_date, start_time, vehicle_id, requester_id FROM ongoing_trips ";*/
  var queryString = "SELECT um.name as vendor_name, v.reg_number, og.*, DATE_FORMAT(og.start_date,'%d, %b %Y ') as start_date FROM ongoing_trips as og INNER JOIN user_master as um on um.id=og.owner_id INNER JOIN vehicles as v ON v.id = og.vehicle_id where og.status=0";
  if(search_key!=''){
    queryString += ' AND um.name like "%'+search_key+'%"';
  }
  queryString += " LIMIT "+start+" , "+end;
  
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


exports.addToComplete= function(step){

    return function(req,res){
      
      var id =  req.body.id;
      var endDate=  req.body.endDate;
      var end_time = req.body.endTime;
      var amount= req.body.amount;
      
      var date = new Date(endDate);
      var newDate =  date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate();
      
      var vehicle_id ='';
      var user_id = '';
      var data = {};
      res.setHeader('Content-Type', 'application/json');

      req.getConnection(function(err,connection){ 
        
       step(

          function SlectFromTrip() {
            connection.query('SELECT * from ongoing_trips where id= ?;', [ id ], this);
          },

          function updateVehicle(error, rows) {
              if (error) {
                
                data.error = "Error in trip Selection";
                res.send(JSON.stringify(data))
              }
              else {
                  vehicle_id = rows[0].vehicle_id;
                  user_id = rows[0].requester_id;
                  connection.query('update vehicles set status = 0 where id= ?;', [ vehicle_id ], this);
              }
            },

            function selectFromUser(error, rows) {
              if (error) {
                data.error = "Error in vehicles updation";
                
                res.send(JSON.stringify(data))
              }
              else {
                  connection.query('SELECT * from user_master where id= ?;', [ user_id ], this);
              }
            },

            function UpdateUserBalance(error, rows) {
              if (error) {
                data.error = "Error in user balance updation";
                
                res.send(JSON.stringify(data))
              }
              else {
                    var balance = rows[0].balance;
                    var newBalance = parseInt(balance) - parseInt(amount);
                  connection.query("update user_master set balance=? where id= ?;", [newBalance, user_id ], this);
              }
            },
            function UpdateTripStatus(error, rows) {
              if (error) {
                data.error = "Error in trip updation";
                
                res.send(JSON.stringify(data))
              }
              else {
                  data.success = "Trip Completed successfully";
                  connection.query("update ongoing_trips set status=?, end_date=?, end_time=?, amount=? where id=?",[2, newDate, end_time, amount, id], this);
              }
            },
            function (error, rows){
              if (error) {
                  data.error = error;
              }
              res.send(JSON.stringify(data)); 

            }


        ); 
     });    
    };
}
exports.CancelTrip= function(req,res){
    
    var id =  req.body.id;
    var data = {};
    req.getConnection(function(err,connection){ 
  
      connection.query("update vehicles set status = 0 where trip_id="+id, function(err, rows, fields){

        });
  
      connection.query("UPDATE ongoing_trips SET status=0 WHERE id="+id,function(err, rows, fields){
            if(!!err){
                data.error = err;
            }else{
                data.success = "Trip Cancelled Successfully";
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data)); 
        });
  });
};
