(function() {

    var healthMeter = function(){
        return {
            restrict: 'E',
            scope: {
                datasource: '='
            },
            template : '<div id="healthMeter"></div>',
            link: function(scope, element, attrs) {

                let healthMeter = document.getElementById("healthMeter");

                scope.$watch("datasource.health", function(newValue:number, oldValue:number) {
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