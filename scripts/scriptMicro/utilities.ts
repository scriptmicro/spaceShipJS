
function viewportWidth():number {
    let viewportwidth:number;

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

function viewportHeight():number {
    let viewportheight:number;

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


function findAngle(x1:number, y1:number, x2:number, y2:number):number{
    let radian:number = findRadian(x1, y1, x2, y2);
    let angle:number = radian * 180 / Math.PI;
    //console.log("findAngle ::: " + angle);
    return angle;
}

function findHypotenuse(mc1x:number, mc1y:number, mc2x:number, mc2y:number):number{
    let xdiff:number = mc2x - mc1x;
    let ydiff:number = mc2y - mc1y;
    
    let hypotenuse:number = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));
    return hypotenuse;
}

function findRadian(x1:number, y1:number, x2:number, y2:number):number {
    let xdiff = x1 - x2;
    let ydiff = y1 - y2;
    let radian = Math.atan2(ydiff, xdiff);
    return radian;
}

function getRandomInt(highRange:number, lowRange:number):number{
    return Math.floor(Math.random() * (1+highRange-lowRange)) + lowRange;
}