var customApp = angular.module('customApp', ['ngRoute']);

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
    }).otherwise({
        redirectTo: '/'
    });
});
