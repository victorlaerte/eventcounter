(function(){
    'use strict';

    var Config = function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : '/partials/home',
            controller : 'HomeCtrl'
        })
        .when('/event/:eventId', {
            templateUrl : '/partials/event',
            controller : 'ShowEventCtrl'
        })
        .when('/event-form', {
            templateUrl : '/partials/event-form',
            controller : 'AddEventCtrl'
        });
    };

    var HomeCtrl = function($scope, $http) {
        $http.get('/api/events/today').success(function(events) {
            $scope.todayEventList = events;
        });
        $http.get('/api/events/future').success(function(events) {
            $scope.nextEventList = events;
        });
        $http.get('/api/events/past').success(function(events) {
            $scope.pastEventList = events;
        });
    };

    var ShowEventCtrl = function($scope, $http, $routeParams, $window) {
        $http.get('/api/events/' + $routeParams.eventId).success(function(event) {
            $scope.event = event;
            $scope.hasGeolocation = !!$window.navigator.geolocation;

            $scope.doCheckin = function() {
                $window.navigator.geolocation.getCurrentPosition(function(position) {
                    var url = '/api/events/' + $routeParams.eventId + '/checkin';
                    var data = {
                        coords : {
                            latitude : position.coords.latitude,
                            longitude : position.coords.longitude,
                            accuracy : position.coords.accuracy
                        }
                    };

                    $http.post(url, data).success(function() {
                        alert('Check-in realizado com sucesso!');
                    }).error(function() {
                        alert('Houve uma falha durante o check-in, tente novamente em alguns instantes.');
                    });
                });
            };
        });
    };

    var AddEventCtrl = function($scope, $http, $location) {
        angular.extend($scope, {
            eventToAdd : {},
            dateOptions : {
                dateDisabled: false,
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(2010),
                startingDay: 1
            }
        });

        $scope.sendEventRequest = function() {
            $http.post('/api/events', $scope.eventToAdd).then(function(response) {
                $location.path('/');
            }, function(response) {
                console.log(response);
            });
        };
    };

    var EventDatatableDirective = function() {
        return {
            restrict : 'E',
            scope : {
                title : '@',
                events : '='
            },
            templateUrl : '/directives/event-datatable'
        };
    };

    angular.module('eventCounter', ['ngAnimate', 'ngRoute', 'ui.bootstrap'])
        .config(['$routeProvider', Config])
        .controller('HomeCtrl', ['$scope', '$http', HomeCtrl])
        .controller('ShowEventCtrl', ['$scope', '$http', '$routeParams', '$window', ShowEventCtrl])
        .controller('AddEventCtrl', ['$scope', '$http', '$location', AddEventCtrl])
        .directive('eventDatatable', EventDatatableDirective)
    ;
})();
