define([
    'angularAMD',
    'angular',
    'uirouter',
    'ngmap',
    'ngstorage'

], function (angularAMD, angular, uirouter, ngmap, ngstorage) {
    var shoppingCart = angular.module('shoppingCart', ['ui.router', 'ngMap', 'ngStorage'])
    
    let serverBase = window.location.origin + '/api/'
    
    shoppingCart.constant('shoppingCartSettings', {
        serverBaseUri: serverBase,
    });

    shoppingCart.config(['$stateProvider', '$urlRouterProvider', 'dataServiceProvider', function ($stateProvider, $urlRouterProvider, dataService){
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', angularAMD.route({
                url: '/home',
                templateUrl: '../../src/shop/view/home.html',
                controller: 'homeCtrl',
                controllerUrl: '../../src/shop/js/controller/homeCtrl.js',
                authenticate: false,
                resolve: {
                    loggedIn: dataService.$get().auth.isLoggedIn
                },
                data: {
                    pageTitle: 'home'
                }
            }))
            .state('login', angularAMD.route({
                url: '/login',
                templateUrl: '../../src/common/view/login.html',
                controller: 'loginCtrl',
                controllerUrl: '../../src/common/js/controller/loginCtrl.js',
                authenticate: false,
                resolve: {
                    loggedIn: dataService.$get().auth.isNotLoggedIn
                },
                data: {
                    pageTitle: 'login'
                }
            }))
            .state('cart', angularAMD.route({
                url: '/cart',
                templateUrl: '../../src/shop/view/cart.html',
                controller: 'cartCtrl',
                controllerUrl: '../../src/shop/js/controller/cartCtrl.js',
                authenticate: false,
                resolve: {
                    loggedIn: dataService.$get().auth.isLoggedIn
                },
                data: {
                    pageTitle: 'cart'
                }
            }))
            .state('checkout', angularAMD.route({
                url: '/checkout?type&item_id',
                templateUrl: '../../src/shop/view/checkout.html',
                controller: 'checkoutCtrl',
                controllerUrl: '../../src/shop/js/controller/checkoutCtrl.js',
                authenticate: false,
                resolve: {
                    loggedIn: dataService.$get().auth.isLoggedIn
                },
                data: {
                    pageTitle: 'cart'
                }
            }))
    }]);
    angularAMD.bootstrap(shoppingCart, false, document.getElementById('mainView'));
    return shoppingCart
})