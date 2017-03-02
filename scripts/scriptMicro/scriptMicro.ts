

var spaceShip;
var game;
var container;
var gameHUD
var barContainer;
var shieldMeter;
var healthMeter;

function init() {

    //startBTN = document.getElementById("startBTN");
    gameHUD = document.getElementById("gameHUD");
    barContainer = document.getElementById("barContainer");

    game = document.getElementById("game");
    container = document.getElementById("container");
    spaceShip = document.getElementById("spaceShip");

    TweenMax.set(gameHUD, { alpha: 0 });// could chnage this to set

    var middleX = (container.clientWidth / 2) - (spaceShip.clientWidth / 2);
    var middleY = (container.clientHeight / 2) - (spaceShip.clientHeight / 2);

    TweenMax.set(spaceShip, { x: (container.clientWidth / 2) - (spaceShip.clientWidth / 2), y: (container.clientHeight / 2) - (spaceShip.clientHeight / 2) });
    //TweenMax.set(spaceShip, { alpha: 0, rotation: 25, scaleX: 0.5, scaleY: 0.5, x: ((viewportHeight() / 2) - (spaceShip.clientHeight/2)), y: ((viewportWidth() / 2) - (spaceShip.clientWidth / 2)) });
    //TweenMax.set(spaceShip, { visibility: "visible" });

    loadFunction();
}

function ready() {
    console.log("ready");
}


function loadFunction() {
    console.log("loadFunction");
    TweenMax.to(document.body, 2, { css: { backgroundColor: "#FFFFFF" }, ease: Power2.easeOut });
    animatespaceShipIn();
}

function animatespaceShipIn() {
    console.log("animatespaceShipIn");
    TweenMax.killTweensOf(spaceShip);
    TweenMax.to(spaceShip, 0.2, {alpha:1, rotation:0, ease: Power3.easeOut, onComplete: hangOutInMiddle});
}

function hangOutInMiddle(params) {
    console.log("hangOutInMiddle");
    TweenMax.to(spaceShip, 0.8, { scaleX: 1, scaleY: 1, ease: Power3.easeIn, ease: Elastic.easeOut });//repeat: 0, yoyo: false,
    TweenMax.to(document.body, 1.5, { css: { backgroundColor: "#32383d" }, ease: Elastic.easeOut });
}


function resize() {
    var w = window.outerWidth;
    var h = window.outerHeight;
    var txt = "resize ::: width=" + w + ", height=" + h;

    //console.log(txt);
}




function mouseMonitor(e) {
    var x = e.pageX;
    var y = e.pageY;

    var spaceShipRect = spaceShip.getBoundingClientRect();
    //console.log(spaceShipRect.top, spaceShipRect.right, spaceShipRect.bottom, spaceShipRect.left);

    // TODO creat a utility JS file that has a find center of object function
    TweenMax.set(spaceShip, { rotation: findAngle(x, y, spaceShipRect.left + (spaceShipRect.width / 2), spaceShipRect.top + (spaceShipRect.height / 2)) + 90 });

    //console.log(x, y);

    //console.log("spaceShip.rotation ::: " + spaceShip._gsTransform.rotation);

    return spaceShip._gsTransform.rotation;
}


