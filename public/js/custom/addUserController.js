
customApp.controller('addUserController', function ($scope, $http) {
		$scope.user = {};
		$scope.addUser = function(){
			var uploadUrl = '/addUser';
			/*fileUpload.uploadFileToUrl(uploadUrl, $scope.user);*/
			console.log($scope.user);
			$http.post("/addUser", $scope.user).success(function(response,status,headers,config){
            
            

        });
      } 
});