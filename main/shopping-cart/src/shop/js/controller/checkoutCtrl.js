define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    console.log('jhkjhhjhkhkh', dataService)
    shoppingCart.register.controller('checkoutCtrl', ["$scope", "$localStorage", "$state", 'NgMap', "dataService", function ($scope, $localStorage, $state, ngMap, dataService) {
        $scope.cart = [];
        console.log('$state$state', $state.params)
        var wherePart = {
            where : {
                ordered : false,
                user_id : $localStorage.user.id + "mohit"
            }
        }
        if($state.params.item_id){
            wherePart.where.id = $state.params.item_id
        }
        var model = 'Carts?filter=' + encodeURIComponent(JSON.stringify(wherePart))

        dataService.crudApi('GET', model, {}).then(function(response){
            $scope.cart = response.data;
            if(!$scope.cart.length){
                $state.go('home')
            }
        }, function(error){

        })
        $scope.personalDetails = {
            saved: false,
            enabled : true,
            step_name : 'Personal Detail',
            workingObj : {
                name : '',
                email : '',
                phone : ''
            },
            savedObj : {}
        }
        $scope.deliveryAddress = {
            saved: false,
            enabled : false,
            step_name : 'Delivery Address',
            workingObj : {

            },
            savedObj : {}
        }
        $scope.orderSummary = {
            saved: false,
            enabled : false,
            step_name : 'Order Summay',
            workingObj : {

            },
            savedObj : {}
        }
        $scope.paymentOptions = {
            saved: false,
            enabled : false,
            step_name : 'Payment Options',
            workingObj : {

            },
            savedObj : {}
        }

        $scope.stepStates = [
            $scope.personalDetails, 
            $scope.deliveryAddress, 
            $scope.orderSummary, 
            $scope.paymentOptions
        ];

        ngMap.getMap().then(function(map){
            aaaa = map;
            navigator.geolocation.getCurrentPosition(function(position){
                $scope.deliveryAddress.workingObj.lat = position.coords.latitude;
                $scope.deliveryAddress.workingObj.lng = position.coords.longitude;
            })
        }, function(){

        })

        $scope.selectState = function(state, stateIndex){
            console.log('statestate', state, $scope.stepStates[stateIndex - 1])
            if(state.saved || (stateIndex == 0 || $scope.stepStates[stateIndex - 1].saved)){
                $scope.stepStates.map(function(obj){
                    obj.enabled = false;
                    return obj;
                })
                for(key in state.savedObj){
                    state.workingObj[key] = state.savedObj[key];
                }
                state.enabled = true
            }
        }

        $scope.saveStepDetail = function(state, stateIndex){
            if(state.step_name != 'Order Summay'){
                for(key in state.workingObj){
                    state.savedObj[key] = state.workingObj[key];
                }
            }
            state.saved = true;
            if(stateIndex < $scope.stepStates.length - 1){
                state.enabled = false;
                $scope.stepStates[stateIndex + 1].enabled = true;
            }   else{
                console.log('confirm order')
                Promise.all($scope.cart.map(ob => dataService.crudApi('PATCH', 'Carts/' + ob.id, {ordered: true}))).then(function(){
                    $state.go('home');
                }, function(){
                    $state.go('home');
                })
            }
            console.log('statestatestate', state)
        }
    }])
})