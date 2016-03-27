var app = angular.module('eventCounter', ['ngAnimate', 'ui.bootstrap']);

app.controller('eventCounterCtrl', function($scope, $http) {

    $scope.init = function() {

        $scope.selectedEvent = undefined;
        $scope.todayEventList = [];
        $scope.pastEventList = [];
        $scope.nextEventList = [];
        $scope.eventToAdd = {};
        $scope.showForm = false;
        $scope.dateOptions = {
            dateDisabled: false,
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(2010),
            startingDay: 1
        };

        $http.get('/events/eventlist/today').then(function(response) {

            //PASS TODAY PARAMETERS
            if (response.status == 200) {
                $scope.todayEventList = response.data;
                console.log(JSON.stringify($scope.todayEventList));
            }

        });

        $http.get('/events/eventlist/future').then(function(response) {

            //PASS FUTURE PARAMETERS
            if (response.status == 200) {
                $scope.nextEventList = response.data;
            }
        });

        $http.get('/events/eventlist/past').then(function(response) {

            //PASS PAST PARMETERS
            if (response.status == 200) {
                $scope.pastEventList = response.data;
            }
        });
    }

    $scope.showEventInfo = function(event) {

        $scope.selectedEvent = event;
    }

    $scope.sendEventRequest = function() {

        //DO ALL VALIDATIONS

        $http.post('/events/addevent', $scope.eventToAdd).then(function(response) {
            console.log(response);
            $scope.init();
        }, function(response) {
            console.log(response);
        });
    }

     $scope.init();
});
