
(function() {
 angular
      .module('ngClassifieds', ['ngMaterial', 'ui.router', 'firebase'])
      .config(function( $mdThemingProvider, $stateProvider, $urlRouterProvider) {

        $mdThemingProvider.theme('default')
          .primaryPalette('teal')
          .accentPalette('orange');



        $urlRouterProvider.otherwise('/classifieds');






        $stateProvider
            .state('/',{
              url: "/classifieds",
              templateUrl: "templates/classifieds.html",
              controller: "classifiedsCtrl as vm"
            })
            .state('classifieds',{
              url: "/classifieds",
              templateUrl: "templates/classifieds.html",
              controller: "classifiedsCtrl as vm"
            })
            // Angular registers example.new as the nested route.
            .state('classifieds.new',{
                url: "/new",
                templateUrl: "templates/newClassifieds.html",
                controller: "newClassifiedsCtrl as vm"
            })
            .state('classifieds.edit',{
                  url: "/edit/:id",
                  templateUrl: "templates/editClassifieds.html",
                  controller: "editClassifiedsCtrl as vm",
                  params: {
                    classified: null
                  }
                });
            });
})();
