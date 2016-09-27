var users ={};
    
customApp.controller('userController', function ($scope, $http, $location) {
	$http.get("/userList").success(function(response,status,headers,config){
         $scope.users = response.success;
    }); 
});