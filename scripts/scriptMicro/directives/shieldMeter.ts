(function() {

    var shieldMeter = function(){
        return {
            restrict: 'E',
            scope: {
                datasource: '='
            },
            template : '<div id="shieldMeter"></div>',
            link: function(scope, element, attrs) {

                var shieldMeter = document.getElementById("shieldMeter");

                scope.$watch("datasource.shield", function(newValue, oldValue) {
                    console.log("shield ::: " + newValue);
                    TweenMax.to(shieldMeter, 0.5, { width: newValue + "%" });
                }, true);
            }
        }
    };

    angular
    .module('scriptMicroApp')
    .directive('shieldMeter', shieldMeter);
}());