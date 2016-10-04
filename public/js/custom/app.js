'use strict';


var customApp = angular.module('vehiclesApp', ['ngRoute', 'datatables', 'ui.materialize']);

customApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller: 'indexController',
        templateUrl : 'html/login.html',
    }).when('/resetPassword',{
        controller:'resetPasswordController',
        templateUrl : 'html/resetPassword.html',
    }).when('/newPassword/:token/:id',{
        controller:'newPasswordController',
        templateUrl : 'html/changePassword.html'
    }).when('/vehicles', {
        controller: 'vehiclesController as vehicle',
        templateUrl : 'html/vehicles.html',
        activetab: 'vehicles'
    }).when('/user', {
        controller: 'userController as user',
        templateUrl : 'html/user.html',
        activetab: 'users'
    }).when('/recharges', {
        controller: 'rechargeController as recharge',
        templateUrl : 'html/recharge.html',
        activetab: 'recharges'
    }).when('/completed', {
    	controller: 'completedTripController',
    	templateUrl: 'html/completed.html',
        activetab: 'dashboard'
    }).when('/cancelTrips', {
        controller: 'cancelTripsController',
        templateUrl: 'html/cancel-trips.html',
        activetab: 'dashboard'
    }).when('/idleVehicle', {
        controller: 'idleVehicleController as idleVehicle',
        templateUrl: 'html/idleVehicle.html',
        activetab: 'vehicles'
    }).when('/dashboard', {
        controller: 'dashboardMainController as action',
        templateUrl: 'html/dashboard.html',
        activetab: 'dashboard'
    }).when('/addUser', {
        controller: 'addUserController',
        templateUrl: 'html/add-user.html',
        activetab: 'users'
    }).when('/vendors', {
        controller: 'vendorController as vendor',
        templateUrl: 'html/vendors.html',
        activetab: 'vendors'
    }).when('/addVendor', {
        controller: 'addVendorController',
        templateUrl: 'html/add-vendor.html',
        activetab: 'vendors'
    }).when('/addTrip', {
        controller: 'addTripController',
        templateUrl: 'html/add-trip.html',
        activetab: 'dashboard'
    }).when('/addRecharge', {
        controller: 'addRechargeController',
        templateUrl: 'html/add-recharge.html',
        activetab: 'recharges'
    }).when('/addVehicle', {
        controller: 'addVehicleController',
        templateUrl: 'html/add-vehicle.html',
        activetab: 'vehicles'
    }).when('/editOnGoingTrip/:id', {
        controller: 'editOnGoingTripController',
        templateUrl: 'html/edit-ongoing-trip.html',
        activetab: 'dashboard'
    }).when('/editUser/:id', {
        controller: 'editUserController',
        templateUrl: 'html/edit-user.html',
        activetab: 'users'
    }).when('/editVendor/:id', {
        controller: 'editVendorController',
        templateUrl: 'html/edit-vendor.html',
        activetab: 'vendors'
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


customApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

customApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(fields, uploadUrl, file){

        fd.append('file', file);
        for(var i = 0; i < fields.length; i++){
            fd.append(fields[i].name, fields[i].data)
        }

        
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);
customApp.controller('headerController', function($scope, $route) {
       $scope.$route = $route;
});