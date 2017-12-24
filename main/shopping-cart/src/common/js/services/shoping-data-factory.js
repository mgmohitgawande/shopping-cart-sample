console.log('in data factory')
define(["shoppingCart"], function(shoppingCart) {
    console.log('in data factory', shoppingCart)
    var dataServiceFactory = {};
    //Data Service
    shoppingCart.factory('dataService', ['$http', 'shoppingCartSettings', function($http, shoppingCartSettings) {
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
        dataServiceFactory.crudApi = crudApi
        return dataServiceFactory
    }])
})
console.log('hiiiiii')