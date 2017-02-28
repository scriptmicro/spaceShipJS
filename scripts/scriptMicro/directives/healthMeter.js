(function() {

    var healthMeter = function(){
        return {
            restrict: 'E',
            scope: {
                datasource: '='
            },
            template : '<div id="healthMeter"></div>',
            link: function(scope, element, attrs) {

                var healthMeter = document.getElementById("healthMeter");

                scope.$watch("datasource.health", function(newValue, oldValue) {
                    console.log("health ::: " + newValue); 
                    TweenMax.to(healthMeter, 0.5, { width: newValue + "%" });
                }, true);
            }
        }
    };

    angular
    .module('scriptMicroApp')
    .directive('healthMeter', healthMeter);
}());