
function viewportWidth() {
    var viewportwidth;

    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerWidth;
    }

    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewportwidth = document.documentElement.clientWidth;
    }
    else {
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
    }
    return viewportwidth;
}

function viewportHeight() {
    var viewportheight;

    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    }

    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewportheight = document.documentElement.clientHeight;
    }
    else {
        viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }
    return viewportheight;
}


function findAngle(x1, y1, x2, y2)
{
    var radian = findRadian(x1, y1, x2, y2);
    var angle = radian * 180 / Math.PI;
    //console.log("findAngle ::: " + angle);
    return angle;
}

function findHypotenuse(mc1x, mc1y, mc2x, mc2y)
{
    var xdiff = mc2x - mc1x;
    var ydiff = mc2y - mc1y;
    
    var hypotenuse = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));
    return hypotenuse;
}

function findRadian(x1, y1, x2, y2) {
    var xdiff = x1 - x2;
    var ydiff = y1 - y2;
    var radian = Math.atan2(ydiff, xdiff);
    return radian;
}

function getRandomInt(highRange, lowRange)
{
    return Math.floor(Math.random() * (1+highRange-lowRange)) + lowRange;
}