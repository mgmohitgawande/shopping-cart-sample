define(['shoppingCart', 'dataService'], function(shoppingCart, dataService){

    shoppingCart.register.controller('loginCtrl', ["$rootScope", "$scope", "$location", "$localStorage", "$state", "dataService", function ($rootScope, $scope, $location, $localStorage, $state, dataService) {
            
        $scope.formData = {
            form_type : 'login',
            login : {
                user_name : '',
                password : '',
                showPassword : false
            },
            signup : {
                user_name : '',
                password : '',
                email : '',
                showPassword : false
            }
        }
        $scope.login = function(){
            console.log('login login login')
            dataService.auth.login($scope.formData.login).then(function(){
                console.log('success, login')
                $location.path('/home')
            }, function(){
                console.log('faialure, login')
            })
        }

        $scope.signup = function(){
            dataService.auth.signup($scope.formData.signup).then(function(){
                console.log('success, signup')
                $location.path('/home')
            }, function(){
                console.log('failure, signup')
            })
        }

        

    }])
})