require.config({

    baseUrl: "",

    //remove timeouts
    waitSeconds: 0,

    // alias libraries paths
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': "../bower_components/bootstrap/dist/js/bootstrap.min",
        'angular': '../bower_components/angular/angular.min',
        'uirouter': '../bower_components/angular-ui-router/release/angular-ui-router',
        'angularAMD': '../bower_components/angularAMD/angularAMD.min',
        "app": "src/common/js/app",
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
        'angularAMD': ['angular'],
        'uirouter': ['angular'],
        'app' : ['uirouter', 'angularAMD', 'angular'],
        'dataService' : ['app'],

    },

    // kick start application
    deps: ['app', 'dataService'],
    priority: ["angular"],
    urlArgs:"v=0.0.1" 
});