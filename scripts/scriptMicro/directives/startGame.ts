(function() {

    var startGame = function(){
        return {
            restrict: 'E',
            scope: {
                action: '&'
            },
            templateUrl: "templates/startGame.html",
            link: function(scope, element, attrs) {

                console.log("startGame");
                let startBTN = document.getElementById("startBTN");
                let container = document.getElementById("container");

                TweenMax.set(startBTN, { x: (container.clientWidth / 2) - (startBTN.clientWidth / 2), y: 0-startBTN.clientHeight});
                let startButtonTween = new TweenMax.to(startBTN, 0.5, { x: (container.clientWidth / 2) - (startBTN.clientWidth / 2), y: (container.clientHeight / 2) - (startBTN.clientHeight / 2), ease:  Back.easeOut});

                element.bind('click', function () {
                    console.log("startGame click");
                    //TweenMax.set(element, { visibility: "hidden" });
                    TweenMax.to(startBTN, 0.5, { x: (container.clientWidth / 2) - (startBTN.clientWidth / 2), y: 0-startBTN.clientHeight, ease:  Back.easeOut});
                });

                element.bind('mouseenter', function () {
                    console.log("startGame mouseenter");
                    TweenMax.to(startBTN, 0.5, { css: { backgroundColor: "#FFFFFF" }, ease: Power2.easeOut });
                });
                element.bind('mouseleave', function () {
                    console.log("startGame mouseleave");
                    TweenMax.to(startBTN, 0.5, { css: { backgroundColor: "#000000" }, ease: Power2.easeOut });
                });
            }
        }
    };


    angular
    .module('scriptMicroApp')
    .directive('startGame', startGame);
}());