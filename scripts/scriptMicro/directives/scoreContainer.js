app.directive('scoreContainer', function () {
    return {
        restrict: 'E',
        templateUrl: "templates/scoreContainer.html",
        link: function(scope, element, attrs){

            scope.$watch("score", function(newValue, oldValue) {

                var game = {score:oldValue};
                var scoreDisplay = document.getElementById("score");

                if(newValue > 0){
                    TweenLite.to(game, 1, {score:"+="+(newValue-oldValue), roundProps:"score", onUpdate:updateHandler, ease:Linear.easeNone});
                    //TweenLite.to(scoreDisplay, 1, {scale:1.5, ease:Linear.easeNone});
                }else{
                    scoreDisplay.innerHTML = newValue;
                }

                function updateHandler() {
                    scoreDisplay.innerHTML = game.score;
                }

            }, true);



            scope.$watch("hasStarted", function(newValue, oldValue) {
                //console.log("scoreContainer - hasStarted ::: " + newValue);
                //animate in or out, alpha in or out

            }, true);




        }
    };
});