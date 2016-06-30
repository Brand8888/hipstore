(function() {

    "use strict";

    angular
  		.module("ngClassifieds")
  		.factory("classifiedFactory", function($http, $firebaseArray){
        // Factory needs to return and object. In this case, the function below returns the entire object classifieds from the json file.

        var ref = new Firebase('https://angular-classifieds.firebaseio.com/');


  	    return {
            ref : $firebaseArray(ref)
          };

        });

})();
