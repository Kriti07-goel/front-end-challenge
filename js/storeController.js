angular.module('test')
    .controller('storeController', function($scope, $http) {
        $scope.name = 'Kriti Goel';
        $http.get('http://demo5514996.mockable.io/products').
        then(function(response) {
            console.log(response);
            $scope.productsData = response.data.hits;
           
        });
       
    });