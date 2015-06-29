'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$stateParams',
    function($scope, Authentication, $http, $stateParams) {
        // This provides Authentication context.
        $scope.dataUri = null;
        $scope.domainName = window.location.origin;
        $scope.link = null;
        $scope.selfieId =  $stateParams.selfieId;
        //$scope.authentication = Authentication;

        $scope.showWebcam = function() {
            $scope.dataUri = null;
            $scope.selfieId = null;
            $scope.link = null;
            //$scope.fromLink = null;
            window.Webcam.set({
                width: 320,
                height: 240,
                dest_width: 320,
                dest_height: 240
            });
            window.Webcam.attach('#videoCapture');
        };

        $scope.listSelfies = function() {
            $http.get('/selfie')
                .success(function(selfies) {
                    $scope.selfies = selfies;
                    console.log(selfies)
                })
                .error(function() {

                });
        };

        if ($scope.selfieId) {
            $http.get('/selfie/' + $scope.selfieId)
                .success(function(data) {
                    $scope.dataUri = data.dataUri;
                    $scope.caption = data.caption;
                    //$scope.fromLink = true;
                })
                .error(function() {
                    $scope.showWebcam();
                });
        }
        else {
            $scope.showWebcam();
        }

        $scope.listSelfies();


        $scope.snap = function() {
            window.Webcam.snap(function(data_uri) {
                $scope.dataUri = data_uri;
            });
        };

        $scope.delete = function() {
            $scope.dataUri = null;
            $scope.selfieId = null;
            $scope.link = null;
        };

        $scope.save = function() {
            $http.post('/selfie', {
                caption: $scope.caption,
                dataUri: $scope.dataUri
            }).
            success(function(data, status, headers, config) {
                $scope.selfieId = data._id;
                $scope.link = $scope.domainName + "/#!/" + $scope.selfieId;
                $scope.selfies.unshift(data);
            }).
            error(function(data, status, headers, config) {
                $scope.delete();
            });
        };
    }
]);