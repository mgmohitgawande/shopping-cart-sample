require.config({

    baseUrl: "",

    //remove timeouts
    waitSeconds: 0,

    // alias libraries paths
    paths: {
        'jquery': '../shopping-cart/bower_components/jquery/dist/jquery.min',
        'bootstrap': "../shopping-cart/bower_components/bootstrap/dist/js/bootstrap.min",
        'angular': '../shopping-cart/bower_components/angular/angular.min',
        'uirouter': '../shopping-cart/bower_components/angular-ui-router/release/angular-ui-router',
        'angularAMD': '../shopping-cart/bower_components/angularAMD/angularAMD.min',
        'ngmap' : '../shopping-cart/bower_components/ngmap/build/scripts/ng-map.min',
        'ngstorage' : '../shopping-cart/bower_components/ngstorage/ngStorage.min',
        
        "shoppingCart": "src/common/js/app",
        "appCtrl": "src/common/js/controller/appCtrl",
        'dataService': 'src/common/js/services/shoping-data-factory',
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'jquery': {
            'exports': '$'
        },
        'angular': {
            'exports': 'angular'
        },
        'bootstrap' : ['jquery'],
        'angularAMD': ['angular', 'bootstrap'],
        'uirouter': ['angular'],
        'shoppingCart' : ['uirouter', 'angularAMD', "ngmap", "ngstorage"]
        // 'dataService' : ['shoppingCart'],

    },

    // kick start application
    deps: ['shoppingCart', 'dataService', 'jquery', 'bootstrap', "appCtrl", "ngmap"],
    priority: ["angular"],
    urlArgs:"v=0.0.1" 
});