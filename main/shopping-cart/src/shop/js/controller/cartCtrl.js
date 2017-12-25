define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    console.log('jhkjhhjhkhkh', dataService)
    shoppingCart.register.controller('cartCtrl', ["$rootScope", "$scope", "$localStorage", "$state", "dataService", function ($rootScope, $scope, $localStorage, $state, dataService) {
        dataService.auth().then(function(){
            $scope.cart = [];

            $scope.name = 'MOHIT GAWANDE';
            console.log('wajdoaiwjdoiajwodi', dataService)
            dataService.crudApi('GET', 'Carts?filter[where][ordered]=false&filter[where][user_id]=' + $localStorage.user.id, {}).then(function(response){
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
        }, function(){

        })
    }])
})