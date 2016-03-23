var app = angular.module('eventCounter', []);

app.controller('eventCounterCtrl', function($scope,  $http) {

	$scope.selectedEvent = undefined;
    $scope.todayEventList = [];
    $scope.pastEventList = [];
    $scope.nextEventList = [];

    $http.get('/events/eventlist').then(function(response){

    	//PASS TODAY PARAMETERS
    	if (response.status == 200){
    		$scope.todayEventList = response.data;
    	}

    });

    $http.get('/events/eventlist').then(function(response){

    	//PASS FUTURE PARAMETERS
    	if (response.status == 200){
    		$scope.nextEventList = response.data;
    	}
    });

    $http.get('/events/eventlist').then(function(response){

    	//PASS PAST PARMETERS
    	if (response.status == 200){
    		$scope.pastEventList = response.data;
    	}
    });

    $scope.showEventInfo = function(event) {

    	$scope.selectedEvent = event;

    	console.log($scope.selectedEvent);
    }
});