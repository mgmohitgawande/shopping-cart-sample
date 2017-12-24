define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    console.log('jhkjhhjhkhkh', dataService)
    shoppingCart.register.controller('cartCtrl', ["$rootScope", "$scope", "$state", "dataService", function ($rootScope, $scope, $state, dataService) {
        $scope.cart = [];

        $scope.name = 'MOHIT GAWANDE';
        console.log('wajdoaiwjdoiajwodi', dataService)
        dataService.crudApi('GET', 'Carts', {}).then(function(response){
            $rootScope.cart = $scope.cart = response.data
        })

        $scope.removeItemFromCart = function(item, itemIndex){
            console.log('awdawda', itemIndex, $scope.cart)
            dataService.crudApi('DELETE', 'Carts/' + item.id, {}).then(function(response){
                $scope.cart.splice(itemIndex, 1)
            }).then(function(){
                
            }, function(){

            })
        }

        $scope.checkout = function(){
            console.log('checking out')
            $state.go('checkout', {
                type : 'cart'
            })
        }

    }])
})