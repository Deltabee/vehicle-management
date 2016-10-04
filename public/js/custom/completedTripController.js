var values ={};
    
customApp.controller('completedTripController',['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http,DTOptionsBuilder,DTColumnBuilder) {
		$scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("id", "Trip Id").notSortable(),
            /*DTColumnBuilder.newColumn("new_user", "New User"),*/
            DTColumnBuilder.newColumn("vendor_name", "Owner").notSortable(),
            DTColumnBuilder.newColumn("start_date", "Start Date").notSortable(),
            DTColumnBuilder.newColumn("start_time", "Start Time").notSortable(),
            DTColumnBuilder.newColumn("trip_end_date", "End Date").notSortable(),
            DTColumnBuilder.newColumn("end_time", "End Time").notSortable(),
            DTColumnBuilder.newColumn("amount", "Amount Deducted").notSortable()
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            contentType: "application/json;",
            url: "/completedTripList",
            type:"GET",
            dataSrc: function (json) { 
                return JSON.parse(json.success);
            }
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'asc'])
}]);