var values ={};
    
customApp.controller('dashboardMainController',['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http,DTOptionsBuilder,DTColumnBuilder) {
		$scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("trip_id", "Trip ID"),
            DTColumnBuilder.newColumn("owner_id", "Owner ID"),
            DTColumnBuilder.newColumn("start_date", "Start Date"),
            DTColumnBuilder.newColumn("start_time", "Start Time"),
            DTColumnBuilder.newColumn("multiplier", "Multiplier"),
            DTColumnBuilder.newColumn("vehicle_id", "Vehicle ID"),
            DTColumnBuilder.newColumn("requester_id", "Requester ID")
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            dataSrc: "data",
            url: "/get_ongoing_trips",
            type:"GET"
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'asc'])
		
		/*$http.post("/get_ongoing_trips")
        .success(function(response,status,headers,config){
            
            console.log(response);

        }); */
}]);