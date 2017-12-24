define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    console.log('jhkjhhjhkhkh', dataService)
    shoppingCart.register.controller('homeCtrl', ["$rootScope", "$scope", "$state", "dataService", function ($rootScope, $scope, $state, dataService) {


        var getCartDetail = function(user_id){
            return dataService.crudApi('GET', 'Carts?filter[where][user_id]=' + user_id, {})
        }

        var initialSetup = function(){

            $scope.products = [];
            $scope.cart = [];

            Promise.all([
                dataService.crudApi('GET', 'Products', {}),
                getCartDetail('mohit_user_id')
            ]).then(function(results){
                console.log('adwdada', results)
                $rootScope.products = $scope.products = results[0].data;
                $rootScope.cart = $scope.cart = results[1].data;
                
                console.log($rootScope)
                $rootScope.$apply();
                $scope.$apply();
            }, function(error){
                console.log('error initialSetup promise all')
            })
        }
        initialSetup();

        $scope.addProductToCart = function(product){
            return new Promise(function(success, failure){
                var cart_item = {
                    product_title : product.title,
                    product_id : product.id,
                    price : product.price,
                    quantity : product.quantity,
                    user_id : 'mohit_user_id',
                    image_url : product.image_urls && product.image_urls.length ? product.image_urls[0] : undefined,


                }
                dataService.crudApi('POST', 'Carts', cart_item).then(function(response){
                    console.log('response add to cart', response)
                    success(response.data)
                }, function(){
                    failure()
                })
            })
        }
        $scope.buyProduct = function(product){
            $scope.addProductToCart(product).then(function(cart_item){
                console.log('checking out')
                if(cart_item){
                    $state.go('checkout', {
                        type : 'buy',
                        item_id : cart_item.id
                    })
                }
            }, function(error){

            })
        }

    }])
})