define(['shoppingCart'], function(shoppingCart){
    console.log('wiuahdiuawhdiuawhdiuahwdiuahwdiuahdiuahdiuahwiduhaiwudhaiuwhdiauhdwiauwhd', shoppingCart)
    shoppingCart.run(['$rootScope', '$location', 'dataService', function($rootScope, $location, dataService){
        $rootScope.logout = function(){
            dataService.auth.logout()
        }
    }])
})