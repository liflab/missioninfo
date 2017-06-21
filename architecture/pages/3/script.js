// To check the answer
var canvas;
var past_code;

var solution = [
    {"type":"line","color":"#ff0000","coord1":{"x":10,"y":6},"coord2":{"x":14,"y":6}},
    {"type":"line","color":"#ff0000","coord1":{"x":14,"y":6},"coord2":{"x":14,"y":2}},
    {"type":"line","color":"#ff0000","coord1":{"x":14,"y":2},"coord2":{"x":10,"y":2}},
    {"type":"line","color":"#ff0000","coord1":{"x":10,"y":2},"coord2":{"x":10,"y":6}},

    {"type":"line","color":"#0000ff","coord1":{"x":10,"y":12},"coord2":{"x":14,"y":12}},
    {"type":"line","color":"#0000ff","coord1":{"x":14,"y":12},"coord2":{"x":14,"y":8}},
    {"type":"line","color":"#0000ff","coord1":{"x":14,"y":8},"coord2":{"x":10,"y":8}},
    {"type":"line","color":"#0000ff","coord1":{"x":10,"y":8},"coord2":{"x":10,"y":12}},
];

var solution_example = [
    {"type":"crayon_color","value":"#ff0000"},
    {"type":"crayon_leve","value":false},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":2},
    {"type":"crayon_color","value":"#0000bb"},
    {"type":"crayon_leve","value":false},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4}
];
var Crayon;

popupInfo("Pour dessiner, tu as un crayon. \n" +
    "Tu peux le lever pour arrêter d'écrire, et le poser pour continuer. \n" +
    "Tu as différentes couleurs disponibles également. \n" +
    "Les blocs ont été répartis dans deux catégories\"Mouvements\", et \"Crayon\".");
//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":10,"y":6};

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
    image(image_background,0,0);
    drawSpaceIndicators();
    drawExercise();
    if(b){
        x=START_COORD['x'];
        y=START_COORD['y'];
        Crayon["rotation"] = 0;
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

    stroke(0, 0, 200, 70).noFill();
    drawLine(10,8,10,12);
    drawLine(10,8,14,8);
    drawLine(14,8,14,12);
    drawLine(14,12,10,12);
}
