define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    console.log('jhkjhhjhkhkh', dataService)
    shoppingCart.register.controller('homeCtrl', ["$rootScope", "$scope", "$localStorage", "$state", "dataService", function ($rootScope, $scope, $localStorage, $state, dataService) {

        dataService.auth().then(function(){
            var getCartDetail = function(user_id){
                return dataService.crudApi('GET', 'Carts?filter[where][ordered]=false&filter[where][user_id]=' + user_id, {})
            }
    
            var initialSetup = function(){
    
                $scope.products = [];
                $scope.cart = [];
    
                Promise.all([
                    dataService.crudApi('GET', 'Products', {}),
                    getCartDetail($localStorage.user.id)
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
                    if(product.quantity){
                        var cart_item = $scope.cart.filter(function(item){
                            return item.product_id == product.id
                        }).map(function(item){
                            item.quantity = item.quantity + product.quantity;
                            return item;
                        })
                        cart_item = cart_item.length ? cart_item[0] : {
                            product_title : product.title,
                            product_id : product.id,
                            price : product.price,
                            quantity : product.quantity,
                            user_id : $localStorage.user.id,
                            image_url : product.image_urls && product.image_urls.length ? product.image_urls[0] : undefined,
        
        
                        }
                        dataService.crudApi(cart_item.id ? 'PUT' : 'POST', 'Carts/' + (!cart_item.id ? '' : (cart_item.id + '?filter[where][ordered]=falsefilter[where][user_id]=' + $localStorage.user.id + '&filter[where][product_id]=' + product.id)) , cart_item).then(function(response){
                            if(!cart_item.id)
                                $scope.cart.push(response.data)
                            console.log('response add to cart', response)
                            success(response.data)
                        }, function(){
                            failure()
                        })
                    }   else{
                        alert('quantity should be greater than 0');
                    }
                })
            }
            $scope.buyProduct = function(product){
                if(product.quantity){
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
                }   else{
                    alert('quantity should be greater than 0');
                }
            }
        }, function(){
            window.location.reload()
        })

    }])
})