// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"arc","color":"#ff0000","middle":{"x":6,"y":8},"size":4,"start_angle":0,"end_angle":-3.141592653589793,"reversed":true},{"type":"arc","color":"#ff0000","middle":{"x":9,"y":6.5},"size":4,"start_angle":-6.283185307179586,"end_angle":-9.42477796076938,"reversed":true},{"type":"line","color":"#ff0000","coord1":{"x":9,"y":8.5},"coord2":{"x":6,"y":9.99}}];
var solution_example = [{"type":"crayon_leve","value":true},{"type":"avancer","value":4},{"type":"tourner","value":90},{"type":"avancer","value":2},{"type":"crayon_color","value":"#ff0000"},{"type":"crayon_leve","value":false},{"type":"arc","taille":4,"rotation": {"type":"tourner","value":-180}},{"type":"crayon_leve","value":true},{"type":"tourner","value":-90},{"type":"avancer","value":1.5},{"type":"tourner","value":-90},{"type":"avancer","value":3},{"type":"crayon_leve","value":false},{"type":"arc","taille":4,"rotation": {"type":"tourner","value":-180}},{"type":"crayon_leve","value":true},{"type":"tourner","value":90},{"type":"avancer","value":2},{"type":"tourner","value":-90},{"type":"tourner","value":26.42},{"type":"crayon_leve","value":false},{"type":"avancer","value":3.35}];

var Crayon;

var text_info = "Une fois les murs dressés, un toit arrondi serait plaisant, non ?\n" +
    "Essaies d'en faire un en utilisant \n" +
    "le nouveau bloc \"Dessin d'un Arc de Cercle\".";
//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":4,"y":4};

var draw_saved = [];
var draw_gen_saved = [];



function preload(){
    image_robotino = loadImage(ADDR_ROBOTINO_AIR);
    image_background = loadImage(ADDR_BACKGROUND_IMAGE_3);
    setup();
}
function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    reset(true);
}
function reset(b){
    if(b===undefined){
        b=false;
    }
    image(image_background,0,0,800,700);
    drawSpaceIndicators();
    drawExercise();
    if(b){
        debug_generate_code(draw_gen_saved);
        x=START_COORD['x'];
        y=START_COORD['y'];
        Crayon["rotation"] = 0;
        Crayon["leve"] = false;
        Crayon["color"] = "#000000";
        drawCursor(x,y);
        draw_saved = [];
        draw_gen_saved = [];
    }
    fill(0, 0, 0).stroke(0, 0, 0);
    strokeWeight(0);
}

function drawSpaceIndicators() {
    var sizeSpaceIndicators = 20;
    textAlign(CENTER);
    for (var i = 1; i < axisHeightLength; i++) {
        fill(0, 0, 0).stroke(0, 0, 0).strokeWeight(4)
        line(0, i * pxUnit, sizeSpaceIndicators, i * pxUnit);
        line((axisWidthLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(0, 0, 0).stroke(0, 0, 0, 20).strokeWeight(1)
        line(0, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(0, 0, 0).strokeWeight(0).textSize(18)
        text((axisHeightLength - i), 40, i * pxUnit + 8);

    }
    for (var i = 1; i < axisWidthLength; i++) {
        fill(0, 0, 0).stroke(0, 0, 0).strokeWeight(4)
        line(i * pxUnit, 0, i * pxUnit, sizeSpaceIndicators);
        line(i * pxUnit, (axisHeightLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisHeightLength * pxUnit);

        fill(0, 0, 0).stroke(0, 0, 0, 20).strokeWeight(1)
        line(i * pxUnit, 0, i * pxUnit, axisHeightLength * pxUnit);

        fill(0, 0, 0).strokeWeight(0).textSize(18)
        text(i, i * pxUnit, (axisHeightLength * pxUnit) - 30);
    }
    fill(50, 50, 255).strokeWeight(0).textSize(24).textStyle(BOLD);
    text('X', (axisWidthLength * pxUnit) / 2, (axisHeightLength * pxUnit) - 60);
    text('Y', 60, (axisHeightLength * pxUnit) / 2 + 8);
}

function drawExercise() {
    strokeWeight(14);
    stroke(255,0,0,255).noFill();
    drawLine(4,4,7,2.5);
    drawLine(7,2.5,11,2.5);
    drawLine(11,2.5,8,4);
    drawLine(8,4,4,4);

    stroke(0, 0, 255, 255).noFill();
    drawLine(4,4,4,8);
    drawLine(8,4,8,8);
    drawLine(7,2.5,7,6.5);
    drawLine(11,2.5,11,6.5);

    drawLine(4,8,8,8);
    drawLine(8,8,11,6.5);
    drawLine(11,6.5,7,6.5);
    drawLine(7,6.5,4,8);

    stroke(255,0,0,45).noFill();
    drawArc(6,8,4,0,-3.141592653589793,true);
    drawArc(9,6.5,4,-6.283185307179586,-9.42477796076938,true);
    drawLine(6,9.99,9,8.5);
    strokeWeight(0);
}
