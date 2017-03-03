(function() {

    var scoreContainer = function(){
        return {
            restrict: 'E',
            templateUrl: "templates/scoreContainer.html",
            link: function(scope, element, attrs){

                scope.$watch("score", function(newValue:number, oldValue:number) {

                    let game = {score:oldValue};
                    let scoreDisplay = document.getElementById("score");

                    if(newValue > 0){
                        TweenLite.to(game, 1, {score:"+="+(newValue-oldValue), roundProps:"score", onUpdate:updateHandler, ease:Linear.easeNone});
                        //TweenLite.to(scoreDisplay, 1, {scale:1.5, ease:Linear.easeNone});
                    }else{
                        scoreDisplay.innerHTML = newValue.toString();
                    }

                    function updateHandler() {
                        scoreDisplay.innerHTML = game.score.toString();
                    }

                }, true);

                scope.$watch("hasStarted", function(newValue:boolean, oldValue:boolean) {
                    //console.log("scoreContainer - hasStarted ::: " + newValue);
                    //animate in or out, alpha in or out

                }, true);
            }
        }
    };

    angular
    .module('scriptMicroApp')
    .directive('scoreContainer', scoreContainer);
}());