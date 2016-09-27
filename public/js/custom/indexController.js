var values ={};
customApp.factory("flash", function($rootScope) {
  var queue = [];
  var currentMessage = "";

  $rootScope.$on("$routeChangeSuccess", function() {
    currentMessage = queue.shift() || "";
  });

  return {
    setMessage: function(message) {
      queue.push(message);
    },
    getMessage: function() {
      return currentMessage;
    }
  };
});


customApp.controller('indexController', function ($scope, $http, $location, flash) {
    $scope.templates =
      [{ name: 'template1.html', url: 'header.html'}];
    $scope.header = $scope.templates[0];
	 $scope.noError = true;	
     $scope.ErrorMessage = '';
     $scope.login = function() {
   
        $http.post("/login", {userName:$scope.username, password: $scope.password})
        .success(function(response,status,headers,config){
          if (response.error) {
	        	$scope.noError = false;	
	        	$scope.ErrorMessage = response.error;
            }else{
            	$location.path("/dashboard");
            }
        }); 
    }
});