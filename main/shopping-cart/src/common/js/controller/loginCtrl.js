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
            },
            message : 'Please Login.'
        }

        $scope.login = function(){
            console.log('login login login')
            dataService.auth.login($scope.formData.login).then(function(){
                console.log('success, login')
                $location.path('/home')
            }, function(error){
                console.log('faialure, login', error)
                $scope.formData.message = error.data.error.message;
            })
        }

        $scope.signup = function(){
            dataService.auth.signup($scope.formData.signup).then(function(){
                console.log('success, signup')
                $location.path('/home')
            }, function(error){
                $scope.formData.message = error.data.error.message;
                console.log('failure, signup', error)
            })
        }
    }])
})