exports.rechargelist = function(req,res){
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var search_key = req.query.search.value;
  var end = parseInt(start) + parseInt(length);
  req.getConnection(function(err,connection){ 
  var queryString = 'SELECT um.name as user_name, r.* FROM recharges as r INNER JOIN user_master as um ON um.id = r.user_id ';

  if(search_key!=''){
    queryString +='where um.name like "%'+search_key+'%" ';
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

exports.addRecharge = function(req,res){
          var user_id=  req.body.user_id;
          var chennel_id = req.body.chennel;
          var balanceValue= req.body.balanceValue;
          var blanceRecieved = req.body.blanceRecieved;
          var chennel = 'Offline';
          if(chennel_id == 1){
            chennel = 'Online';
          }
          req.getConnection(function(err,connection){
              var result = {};
              var queryString = 'insert into recharges(user_id, chennel, value, balance, chennel_id) values('+user_id+',"'+chennel+'",'+balanceValue+', '+blanceRecieved+', '+chennel_id+')';
              return connection.query(queryString, function(err, rows, fields)  {
                    if (err)
                    {
                      result.error= err;
                    }
                    else
                    {
                      queryString1 = 'select balance from user_master where id = '+user_id;
                      connection.query(queryString1, function(err, rows, fields)  {
                          if (err)
                          {
                            result.error= err;
                          }
                          else
                          {
                            var oldBalance = rows[0].balance;
                            var newBalance = parseInt(blanceRecieved) + parseInt(oldBalance);
                            queryString2 = 'UPDATE user_master SET balance = "'+newBalance+'" where id = '+user_id;
                              connection.query(queryString2, function(err, rows, fields)  {
                                  if (err)
                                  {
                                    result.error= err;
                                  }
                                  else
                                  {
                                    result.success="Rechagred successfully";
                                    res.setHeader('Content-Type', 'application/json');
                                    res.send(JSON.stringify(result)); 
                                  }
                              });
                          }
                      });
                    }
                });  
          });
};