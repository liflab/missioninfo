// To check the answer
var stringAnswer;
var canvas;
var past_code;
var solution = [
    {"type":"line","coord1":{"x":10,"y":2},"coord2":{"x": 10,"y":6}},
    {"type":"line","coord1":{"x":10,"y":2},"coord2":{"x": 14,"y":2}},
    {"type":"line","coord1":{"x":14,"y":2},"coord2":{"x": 14,"y":6}},
    {"type":"line","coord1":{"x":14,"y":6},"coord2":{"x": 10,"y":6}}
];

var solution_example = [
    {"type":"crayon_color","value":"#ff0000"},
    {"type":"crayon_leve","value":false},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4}
];

popupInfo("Toute maison ou cabane a besoin d'une fondation pour construire !\n\nUtilises les blocs disponibles pour dessiner la première !");

//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

var draw_saved = [];
var draw_gen_saved = [];

function preload(){
    image_robotino = loadImage(ADDR_ROBOTINO_LAND);
    image_background = loadImage(ADDR_BACKGROUND_IMAGE_1);
    image_robotino_out = loadImage(ADDR_ROBOTINO_OUT);
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
    //fill(250);
    image(image_background,0,0);
    //rect(0,0,width,height);
    drawSpaceIndicators();
    drawExercise();
    if(b){
        x=10;
        y=2;
        Crayon["rotation"] = 0;
        Crayon["leve"] = false;
        drawCursor(x,y);
        draw_saved = [];
        draw_gen_saved = [];
    }
    fill(0, 0, 0).stroke(0, 0, 0);
    strokeWeight(0);
}

function drawExercise() {
    strokeWeight(14);
    stroke(200, 0, 0, 70).noFill();
    drawLine(10,2,10,6);
    drawLine(10,2,14,2);
    drawLine(14,2,14,6);
    drawLine(14,6,10,6);
}