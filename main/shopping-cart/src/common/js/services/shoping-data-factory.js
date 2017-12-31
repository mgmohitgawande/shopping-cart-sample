console.log('in data factory')
define(["shoppingCart"], function(shoppingCart) {
    console.log('in data factory', shoppingCart)
    var dataServiceFactory = {};
    //Data Service
    shoppingCart.factory('dataService', ['$http', '$state', '$location', '$localStorage', 'shoppingCartSettings', function($http, $state, $location, $localStorage, shoppingCartSettings) {
        var serviceBase = shoppingCartSettings.serverBaseUri
        var crudApi = function(method, model, params){
            console.log('kkkkk', params, serviceBase)
            return $http({
                method: method,
                url: serviceBase + model,
                // params: method == "GET" ? params : undefined,
                data: params,
                withCredentials: true
            })
        }

        var auth = {
            signup : function(data){
                return new Promise(function(success, failure){
                    crudApi('POST', 'Users', {username : data.username, password: data.password, email : data.email}).then(function(response){
                        console.log('singing up  done')
                        $localStorage.user = response.data
                        success()
                    }, function(error){
                        console.log('aerror in user creation', error)
                        failure()

                    })
                })
            },
            login : function(data){
                console.log('login called in service')
                return new Promise(function(success, failure){
                    crudApi('POST', 'Users/login?include=user', {username : data.username, password: data.password}).then(function(response){
                        console.log('logging in  done')
                        $localStorage.user = response.data.user
                        success()
                    }, function(error){
                        $localStorage.user = undefined;
                        failure()
                    })
                })
            },
            logout : function(){
                delete $localStorage.user;
                $location.path('/login')
            },
            isLoggedIn : function(){
                return new Promise(function(success, failure){
                    console.log('$localStorage$localStorage', $localStorage)
                    if($localStorage && $localStorage.user && $localStorage.user.id){
                        success()
                    }   else{
                        $location.path('/login');
                    }
                })
            },
            isNotLoggedIn : function(){
                return new Promise(function(success, failure){
                    console.log('$localStorage$localStorage', $localStorage)
                    if($localStorage && $localStorage.user && $localStorage.user.id){
                        $location.path('/home');
                    }   else{
                        success()
                    }
                })
            }
        }
        dataServiceFactory.crudApi = crudApi;
        dataServiceFactory.auth = auth;
        return dataServiceFactory
    }])
})
console.log('hiiiiii')