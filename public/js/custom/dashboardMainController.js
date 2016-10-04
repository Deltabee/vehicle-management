var values ={};
    
customApp.controller('dashboardMainController',['$scope', '$route', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile', function ($scope, $route, $http,DTOptionsBuilder,DTColumnBuilder, $compile) {
		var vm = this;

        vm.delete = deleteRow;
        vm.Cancel = CancelTrip;
        $scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("id", "Trip Id").notSortable(),
            DTColumnBuilder.newColumn("vendor_name", "Owner").notSortable(),
            DTColumnBuilder.newColumn("start_date", "Start Date").notSortable(),
            DTColumnBuilder.newColumn("start_time", "Start Time").notSortable(),
            DTColumnBuilder.newColumn("reg_number", "Vehicle Id").notSortable(),
            DTColumnBuilder.newColumn("requester_id", "Requester Id").notSortable(),
            DTColumnBuilder.newColumn(null, "Action").notSortable().renderWith(actionsHtml),
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            contentType: "application/json;",
            url: "/tripList",
            type:"GET",
            dataSrc: function (res) { 
               
                var generateResponse = JSON.parse(res.success);
                 
                 return generateResponse;
            }
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'desc'])
        .withOption('createdRow', createdRow);
        
        function createdRow(row, data, dataIndex) {
        
            $compile(angular.element(row).contents())($scope);
        }
        function actionsHtml(data, type, full, meta) {
            $d = full;
            return '<a href="#/editOnGoingTrip/'+$d.id+'"><i class="material-icons">mode_edit</i></a>&nbsp;<a  href="javascript:void(0)" onclick="openModal('+$d.id+')"><i class="material-icons">done</i></a>&nbsp;<a href="javascript:void(0)" ng-click="action.Cancel('+$d.id+')"><i class="material-icons">restore</i></a>';
        }
        

        function deleteRow(id) {

           $http.post("/", {id: id}).success(function(response,status,headers,config){
                $scope.users = response.success;
            });
        }
        function CancelTrip(id){
            $http.post("/CancelTrip", {id: id}).success(function(response,status,headers,config){
                $route.reload();
            });
        }
        $scope.addToComplete = function(){

            var id = $scope.trip_id;
            var endDate = $scope.end_date;
            var endTime = $scope.end_time;
            var amount = $scope.amount;

            $http.post("/addToComplete", {id: id, endDate: endDate, endTime:endTime, amount: amount}).success(function(response,status,headers,config){
                $route.reload();
            });
        }
        
}]);