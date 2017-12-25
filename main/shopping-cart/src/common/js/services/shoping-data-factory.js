console.log('in data factory')
define(["shoppingCart"], function(shoppingCart) {
    console.log('in data factory', shoppingCart)
    var dataServiceFactory = {};
    //Data Service
    shoppingCart.factory('dataService', ['$http', '$state', '$localStorage', 'shoppingCartSettings', function($http, $state, $localStorage, shoppingCartSettings) {
        console.log('akwjdhakjwdhakwhdakuwdhiuh')
        var serviceBase = shoppingCartSettings.serverBaseUri
        var crudApi = function(method, model, params){
            console.log('kkkkk', params)
            return $http({
                method: method,
                url: serviceBase + model,
                // params: method == "GET" ? params : undefined,
                data: params,
                withCredentials: true
            })
        }

        var auth = function(){
            return new Promise(function(success, failure){
                if(!$localStorage.user || !$localStorage.user.id){
                    var newUser = confirm('If new user confirm with "OK" otherwise "cancel"');
                    var userName = prompt('user name:');
                    var password = prompt('password:');
                    if(newUser){
                        console.log('singing up ')
                        crudApi('POST', 'Users', {username : userName, password: password, email : userName+'@abc.com'}).then(function(response){
                            console.log('singing up  done')
                            $localStorage.user = response.data
                            success()
                        }, function(error){
                            console.log('aerror in user creation', error)
                            confirm(error.data.error.message);
                            $state.go('home')
                            failure()

                        })
                    }   else{
                        console.log('logging in ')
                        crudApi('POST', 'Users/login?include=user', {username : userName, password: password}).then(function(response){
                            console.log('logging in  done')
                            $localStorage.user = response.data.user
                            success()
                        }, function(error){
                            confirm(error.data.error.message);
                            $state.go('home')
                            $localStorage.user = undefined;
                            failure()
                        })
                    }
                }   else{
                    success()
                }
            })
        }
        dataServiceFactory.crudApi = crudApi;
        dataServiceFactory.auth = auth;
        return dataServiceFactory
    }])
})
console.log('hiiiiii')