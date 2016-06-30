(function() {

	"use strict";

	angular
		.module("ngClassifieds")
		.controller("classifiedsCtrl", function($scope, $http, classifiedFactory, $mdSidenav, $mdToast, $mdDialog, $state){

			var vm = this;
	
			vm.openSidebar = openSidebar;
			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;
			vm.editClassified = editClassified;
			vm.deleteClassified = deleteClassified;
			// read from firebase
			vm.classifieds = classifiedFactory.ref;
			//to get the category to load- Wait all data loaded then get the category
			vm.classifieds.$loaded().then(function(classifieds){
					vm.categories = getCategories(classifieds);
			});


			// when save button is clicked creates
			// creates id
			$scope.$on('newClassified', function(event, classified){
				vm.classifieds.$add(classified);
				showToast('Classified Created!!');
			});

			// Scope to emit message after pressing Edit Save button.
				$scope.$on('editSaved', function(event,message){
						showToast( message );

				});




					// ~ mdSidenav is a ready made method from Angular ~
					// Open Side-Bar//
			function openSidebar() {
				$state.go('classifieds.new');

			}

					// Close Side-Bar//
			function closeSidebar() {
					$mdSidenav('left').close();


			}


			function redirectYo(){
						$state.go('classifieds');

			}


			function saveClassified(classified) {
				if(classified){

					classified.contact = contact;
					vm.classifieds.push(classified);
					vm.classified = {};
					vm.closeSidebar();
						showToast("Classified saved!");
					}
			}
			// Edit
				function editClassified(classified) {
					$state.go('classifieds.edit', {
						id: classified.$id
					});
			}

			// Save-Edit
				function saveEdit() {
				vm.editing =false;
				vm.classified= {};
				closeSidebar();
					showToast("Classified edited!");
			}

			// Delete item
				function deleteClassified(deleteEvent, classified){
				var confirm = $mdDialog.confirm()
						.title('Are you sure you want to delete ' + classified.name + '?')
						.ok('Hell Yeah')
						.cancel('I changed my mind')
						.targetEvent(deleteEvent); //attach event object & tell us about what kind of event triggered the delete classified click
					$mdDialog.show(confirm).then(function(){
						vm.classifieds.$remove(classified);
						showToast('Classified Deleted!');
					}, function() {

					});

				}

			// Show alert
			function showToast(message){
				$mdToast.show(
					$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(3000)
				);
			}

			// Filter by categories
				function getCategories(classifieds){
					var categories = [];

						// iterate through each items in classifieds and pull out the categories array

						angular.forEach(classifieds, function(item){
								angular.forEach(item.categories, function(category){
									categories.push(category);
								});
						});
						// returns all uniques categories
						return _.uniq(categories);
				}



			});


})();
