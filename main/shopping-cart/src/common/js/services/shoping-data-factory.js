define(["app"], function(myApp) {
    //Data Service
    myApp.factory('dataService', ['$http', 'myAppSettings', function($http, myAppSettings) {
        
        var test = function(){
            return 'my name'
        }

        return {
            test : test
        }
    }])
})