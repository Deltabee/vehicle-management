var values ={};
    
customApp.controller('vendorController',['$scope','$route', '$http','$compile','$location', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope,$route, $http,$compile,$location,DTOptionsBuilder,DTColumnBuilder) {
        var vm = this;
        vm.delete = deleteRow;
		$scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("id", "Vendor ID").notSortable(),
            DTColumnBuilder.newColumn("name", "Name").notSortable(),
            DTColumnBuilder.newColumn("lisence_file", "License File").notSortable(),
            DTColumnBuilder.newColumn("license_number", "License Number").notSortable(),
            DTColumnBuilder.newColumn("status", "Verfied[Y/N]").notSortable(),
            DTColumnBuilder.newColumn("mobile_number", "Mobile").notSortable(),
            DTColumnBuilder.newColumn("dob", "DOB").notSortable(),
            DTColumnBuilder.newColumn("di_number", "Di Number").notSortable(),
            DTColumnBuilder.newColumn("pin", "Pin").notSortable(),
            DTColumnBuilder.newColumn(null, "Action").notSortable().renderWith(actionsHtml)
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            contentType: "application/json;",
            url: "/vendorList",
            type:"GET",
            dataSrc: function (res) {  
            	var log = []; 
                var generateResponse = JSON.parse(res.success);
                angular.forEach(generateResponse,function(item,index){
                    item.lisence_file = '<img src="./uploads/'+item.lisence_file+'" width="100px"/>';
                    log.push(item);
                });
                return log;
      		}
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'asc'])
        .withOption('createdRow', createdRow);

        function createdRow(row, data, dataIndex) {
        
            $compile(angular.element(row).contents())($scope);
        }
        function actionsHtml(data, type, full, meta) {
            $d = full;
            return '<a href="#/editVendor/'+$d.id+'"><i class="material-icons">mode_edit</i></a>&nbsp;<a class="deleteOnGoingTrip" href="javascript:void(0)" ng-click="vendor.delete('+$d.id+')"><i class="material-icons">delete</i></a>';
        }
        

        function deleteRow(id) {
           $http.post("/deleteUser", {id: id}).success(function(response,status,headers,config){
               $route.reload();
            });
        }
		
}]);