var FACTORY_WIDTH;
var FACTORY_HEIGHT;
var FACTORY_X;
var FACTORY_Y ;

const JOINT_SIZE = 30;

var Gradient_line;

function initParams(){
    colorMode(RGB);
    FACTORY_WIDTH     = 164;
    FACTORY_HEIGHT    = 200;
    FACTORY_X         = width /2 - FACTORY_WIDTH/2;
    FACTORY_Y         = 0;
}
function setGradient(x, y, w, h, c1, c2, axis) {

    noFill();

    if (axis == Y_AXIS) {  // Top to bottom gradient
        for (var i = y; i <= y+h; i++) {
            var inter = map(i, y, y+h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x+w, i);
        }
    }
    else if (axis == X_AXIS) {  // Left to right gradient
        for (var i = x; i <= x+w; i++) {
            var inter = map(i, x, x+w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y+h);
        }
    }
}