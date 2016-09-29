var values ={};
    
customApp.controller('addUserController', function ($scope, $http) {
	
	$http.post("/")
        .success(function(response,status,headers,config){
            
            console.log(response);

        }); 
});