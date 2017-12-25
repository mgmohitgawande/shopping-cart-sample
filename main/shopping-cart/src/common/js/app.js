define([
    'angularAMD',
    'angular',
    'uirouter',
    'ngmap'

], function (angularAMD, angular, uirouter, ngmap) {
    var shoppingCart = angular.module('shoppingCart', ['ui.router', 'ngMap', 'ngStorage'])
    
    let serverBase = 'http://localhost:8001/api/'
    
    shoppingCart.constant('shoppingCartSettings', {
        serverBaseUri: serverBase,
    });

    shoppingCart.config(function ($stateProvider, $urlRouterProvider){
        console.log('doing ')
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', angularAMD.route({
                url: '/home',
                templateUrl: '../../src/shop/view/home.html',
                controller: 'homeCtrl',
                controllerUrl: '../../src/shop/js/controller/homeCtrl.js',
                authenticate: false,
                data: {
                    pageTitle: 'home'
                }
            }))
            .state('cart', angularAMD.route({
                url: '/cart',
                templateUrl: '../../src/shop/view/cart.html',
                controller: 'cartCtrl',
                controllerUrl: '../../src/shop/js/controller/cartCtrl.js',
                authenticate: false,
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
                data: {
                    pageTitle: 'cart'
                }
            }))
    });
    angularAMD.bootstrap(shoppingCart, false, document.getElementById('mainView'));
    return shoppingCart
})