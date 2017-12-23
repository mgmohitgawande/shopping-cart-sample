define([
    'angularAMD',
    'angular',
    'uirouter',

], function (angularAMD, angular, uirouter) {
    var myApp = angular.module('myApp', ['ui.router'])
    
    let serverBase = 'http://localhost:8001/api'
    
    myApp.constant('myAppSettings', {
        serverBaseUri: serverBase,
    });

    myApp.config(function ($stateProvider){
        console.log('doing  ')
        $stateProvider
            .state('home', angularAMD.route({
                url: '/home',
                templateUrl: '../../src/app/views/home.html',
                controller: 'HomeCtrl',
                controllerUrl: '../../src/app/js/controllers/homeCtrl.js',
                authenticate: false,
                data: {
                    pageTitle: 'Login'
                }
            }))
            .state('login', angularAMD.route({
                url: '/login',
                templateUrl: '../../src/app/views/login.html',
                controller: 'LoginCtrl',
                controllerUrl: '../../src/app/js/controllers/loginCtrl.js',
                authenticate: false,
                data: {
                    pageTitle: 'Login'
                }
            }))
    });
    angularAMD.bootstrap(myApp, false, document.getElementById('mainView'));
    return myApp
})