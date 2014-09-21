/**
 * Created by maxwellzirbel on 9/21/14.
 */
angular.module('docster.controllers', [])

    .controller('welcomeCtrl', function($scope, $location) {
        $scope.male = function(route){
            $location.path( route );
        };
    })

    .controller('bodyCtrl', function($scope, $location){
        $scope.head = function(route){
            $location.path(route);
        }
    })
    .controller('headCtrl', function($scope, $location){
        $scope.headInjury = function(route){
            $location.path(route);
        }
    })
    .service('docUIDService', function(){
       this.uid = '';
    })
    .controller('locateCtrl', function($scope, $location, $http, docUIDService){

            $scope.doctors = [];
            $http({
                url: 'https://docsterch.herokuapp.com/api/condition',
                method: "POST",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
                data: "c=headache"
            })
           .success(function(data, status, headers, config) {
                //console.log(data);
                $scope.doctors = data;
                angular.forEach(data, function(value, key){
                    console.log(value);
                })
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                console.log(data);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        $scope.doctorClick = function(docUID, route){
            alert(docUID);
            docUIDService.uid = docUID;
            $location.path(route);
        }

        function initialize()
        {
            var myCenter = new google.maps.LatLng(37.7833,-122.4167);
            var mapProp = {
                center:myCenter,
                zoom:13,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("googleMap")
                ,mapProp);
            var marker=new google.maps.Marker({
                position:myCenter
            });

            marker.setMap(map);
        };

        google.maps.event.addDomListener(window, 'load', initialize);
        initialize();
    })
    .controller('docCtrl', function($scope, $location, $http, docUIDService) {
            $scope.uid = docUIDService.uid;
            $scope.profile = [];
            //ajax here
            $http({
                url: 'https://docsterch.herokuapp.com/api/doctors/' + $scope.uid,
                method: "GET"
            })
            .success(function(data, status, headers, config) {
                console.log(data);
                $scope.profile = data;
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                console.log(data);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    });