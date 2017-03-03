(function() {

    var spaceShip = function(){
        return {
            restrict: 'E',
            scope: {
                datasource: '='
            },
            templateUrl: "templates/spaceShip.html",
            link: function(scope, element, attrs) {

                scope.$watch("datasource.shield", function(newValue:number, oldValue:number) {

                    if (newValue < 100){
                        TweenMax.set(element, {backgroundColor:0x0000FF});
                        TweenMax.to(element, 0.5, {backgroundColor:"none"});
                    }
                }, true);

                scope.$watch("datasource.health", function(newValue, oldValue) {

                    if (newValue < 100){
                        TweenMax.set(element, {backgroundColor:0xFF0000});
                        TweenMax.to(element, 0.5, {backgroundColor:"none"});
                    }
                }, true);

            }
        }
    };

    angular
    .module('scriptMicroApp')
    .directive('spaceShip', spaceShip);
}());