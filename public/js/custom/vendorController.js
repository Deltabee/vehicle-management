var values ={};
    
customApp.controller('vendorController',['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http,DTOptionsBuilder,DTColumnBuilder) {
		$scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("id", "Vendor ID"),
            DTColumnBuilder.newColumn("name", "Name"),
            DTColumnBuilder.newColumn("lisence_file", "License File"),
            DTColumnBuilder.newColumn("status", "Verfied[Y/N]"),
            DTColumnBuilder.newColumn("mobile_number", "Mobile"),
            DTColumnBuilder.newColumn("dob", "DOB"),
            DTColumnBuilder.newColumn("di_number", "Di Number"),
            DTColumnBuilder.newColumn("pin", "Pin")
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            contentType: "application/json;",
            url: "/vendorList",
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