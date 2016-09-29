'use strict';


var customApp = angular.module('vehiclesApp', ['ngRoute', 'datatables']);

customApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller: 'indexController',
        templateUrl : 'html/login.html'
    }).when('/vehicles', {
        controller: 'vehiclesController',
        templateUrl : 'html/vehicles.html'
    }).when('/user', {
        controller: 'userController',
        templateUrl : 'html/user.html'
    }).when('/recharges', {
        controller: 'rechargeController',
        templateUrl : 'html/recharge.html'
    }).when('/completed', {
    	controller: 'completedTripController',
    	templateUrl: 'html/completed.html'
    }).when('/idleVehicle', {
        controller: 'idleVehicleController',
        templateUrl: 'html/idleVehicle.html'
    }).when('/dashboard', {
        controller: 'dashboardMainController',
        templateUrl: 'html/dashboard.html'
    }).when('/addUser', {
        controller: 'addUserController',
        templateUrl: 'html/add-user.html'
    }).when('/vendors', {
        controller: 'vendorController',
        templateUrl: 'html/vendors.html'
    }).when('/addVendor', {
        controller: 'addVendorController',
        templateUrl: 'html/add-vendor.html'
    }).otherwise({
        redirectTo: '/'
    });
});

customApp.directive('header', ['$compile','$http','$location', function ($compile, $http,$location) {
    return {
        restrict: 'E',
        templateUrl: '../../html/header.html',
        transclude:true,
        link: function(scope, element, attrs) {
            $http.get("/authentication/admin").success(function(response,status,headers,config){
                 if(response.status =='success'){

                 }else{
                    $location.path("/");
                 }
            }); 
            
            scope.logout = function() {

                $http.get("/logout", {logout: 'admin'}).success(function(response,status,headers,config){
                     $location.path("/");
                }); 
            };
        }
    }
}]);
customApp.directive('footer', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: '../../html/footer.html'
        }
    }]

);

