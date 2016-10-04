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
      
      $scope.noError = true;	
      $scope.ErrorMessage = '';
      $scope.login = function() {

      $http.post("/login", {userName:$scope.username, password: $scope.password}).success(function(response,status,headers,config){
            if (response.error) 
            {
            	$scope.noError = false;	
            	$scope.ErrorMessage = response.error;
            }
            else
            {
            	$location.path("/dashboard");
            }
        }); 
      }

      $scope.resetPass = function(){
          $scope.noError = true; 
          $scope.ErrorMessage = '';
          $http.post("/sendEmail", {email:$scope.email}).success(function(response,status,headers,config){
              if(response.error){
                $scope.noError = false; 
                $scope.ErrorMessage = response.error; 
              }else{
                $scope.noError = true; 
                $scope.ErrorMessage = response.success;
              }
          });
      }
});