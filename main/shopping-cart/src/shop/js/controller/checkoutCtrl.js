define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    console.log('jhkjhhjhkhkh', dataService)
    shoppingCart.register.controller('checkoutCtrl', ["$scope", "$state", "dataService", function ($scope, $state, dataService) {
        $scope.products = [];

        $scope.name = 'MOHIT GAWANDE';
        console.log('wajdoaiwjdoiajwodi', dataService)
        dataService.crudApi('GET', 'Products', {}).then(function(response){
            $scope.products = response.data
        })

    }])
})