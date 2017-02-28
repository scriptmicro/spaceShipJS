(function() {

    var barContainer = function(){
        return {
            restrict: 'E',
            scope: {
                datasource: '='
            },
            templateUrl: "templates/barContainer.html",
            link: function(scope, element, attrs){

                angular.element(document).ready(function() {
                    console.log("DOM");
                });
            }
        }
    };

    angular
    .module('scriptMicroApp')
    .directive('barContainer', barContainer);
}());