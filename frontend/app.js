var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$http', '$window', function($scope, $filter, $http, $window) {
    
    $scope.name = '';
    $scope.age = '';
    $scope.nationality = '';
    $scope.records = [];
    
    $scope.create = function() {
        var newPerson = { 
            name: $scope.name, 
            age: $scope.age, 
            nationality: $scope.nationality 
        };

        console.log(newPerson);
        $http.post('http://localhost:3000/person', JSON.stringify(newPerson))
            .success(function (response) {
                console.log(response);
            })
            .error(function (data, status) {

                console.log(data);

            });
    };

    $scope.refresh = function() {
            $http.get('http://localhost:3000/person', {})
            .success(function (response) {
                console.log(response);
                $scope.records = response;

            })
            .error(function (data, status) {

                console.log(data);

            });

    };
    
}]);
