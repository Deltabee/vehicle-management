var values ={};
    
customApp.controller('dashboardMainController', function ($scope, $http) {
	
	$http.post("/get_ongoing_trips")
        .success(function(response,status,headers,config){
            
            console.log(response);

        }); 
});