(function (){

  angular
		.module("ngClassifieds")
		.controller("editClassifiedsCtrl", function($state, $scope, classifiedFactory, $mdSidenav, $mdDialog, $timeout){

      var vm = this;
      vm.closeSidebar = closeSidebar;
      vm.saveEdit = saveEdit;
      vm.classifieds = classifiedFactory.ref;
      vm.classified = vm.classifieds.$getRecord($state.params.id); //get object by id from Firebase for editing

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

      //SAVE EDIT
      function saveEdit() {
        vm.classifieds.$save(vm.classified).then(function(){
          $scope.$emit('editSaved', 'Edit saved!');
            vm.sidenavOpen = false ;
        });

      }

    });
})();
