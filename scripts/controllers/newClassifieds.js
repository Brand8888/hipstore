(function (){

  angular
		.module("ngClassifieds")
		.controller("newClassifiedsCtrl", function($state, $scope, classifiedFactory, $mdSidenav, $mdDialog, $timeout){

      var vm = this;
      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified;


      $timeout(function(){
        $mdSidenav('left').open();
      });
      // Using Angular $watch sets an event listener to switch back to main url when nav-bar closes with md-is-open as a hook
      $scope.$watch('vm.sidenavOpen', function(sidenav){
        if (sidenav === false){
          $mdSidenav('left')
            .close()
            .then(function(){
              $state.go('classifieds');
            });
        }
      });



      // close sidebar event
      function closeSidebar(){
          vm.sidenavOpen = false;
      }

      function saveClassified(classified){
        if(classified) {

          classified.contact = {

            name: "Bryan Chew",
            phone: "012-321-3212",
            email: "bryanchew@bmail.com"
          };
            // $emit sends data from child to parent controller // $broadcast sends data from parent to child.
            $scope.$emit('newClassified', classified);
            vm.sidenavOpen = false;
        }
      }

    });
})();
