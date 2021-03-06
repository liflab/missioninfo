// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"line","color":"#0000ff","coord1":{"x":4,"y":4},"coord2":{"x":4,"y":8}},{"type":"line","color":"#0000ff","coord1":{"x":4,"y":8},"coord2":{"x":8,"y":8}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":8},"coord2":{"x":8,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":7,"y":2.5},"coord2":{"x":7,"y":6.5}},{"type":"line","color":"#0000ff","coord1":{"x":7,"y":6.5},"coord2":{"x":11,"y":6.5}},{"type":"line","color":"#0000ff","coord1":{"x":11,"y":6.5},"coord2":{"x":11,"y":2.5}},{"type":"line","color":"#0000ff","coord1":{"x":11,"y":6.5},"coord2":{"x":8,"y":7.99}},{"type":"line","color":"#0000ff","coord1":{"x":4,"y":7.99},"coord2":{"x":7,"y":6.5}}];
var solution_example = [{"type":"crayon_color","value":"#0000ff"},{"type":"crayon_leve","value":false},{"type":"boucle","nb_iteration":3,"value":[ {"type":"tourner","value":90},{"type":"avancer","value":4}]},{"type":"crayon_leve","value":true},{"type":"avancer","value":1.5},{"type":"tourner","value":90},{"type":"avancer","value":1},{"type":"crayon_leve","value":false},{"type":"boucle","nb_iteration":3,"value":[ {"type":"tourner","value":90},{"type":"avancer","value":4}]},{"type":"crayon_leve","value":true},{"type":"tourner","value":180},{"type":"avancer","value":4},{"type":"tourner","value":-90},{"type":"tourner","value":26.42},{"type":"crayon_leve","value":false},{"type":"avancer","value":3.35},{"type":"crayon_leve","value":true},{"type":"tourner","value":180},{"type":"avancer","value":3.35},{"type":"tourner","value":-26.42},{"type":"tourner","value":180},{"type":"avancer","value":4},{"type":"tourner","value":26.42},{"type":"crayon_leve","value":false},{"type":"avancer","value":3.35}];
var Crayon;


popupInfo("Il faut retourner à la création de notre cabane !\n" +
    "Nous avions fait une première fondation rouge au début.\n" +
    "Il faut dresser les premiers murs et le toit en bleu !");

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
    image(image_background,0,0,800,700);
    drawSpaceIndicators();
    drawExercise();
    if(b){
        x=START_COORD['x'];
        y=START_COORD['y'];
        Crayon["rotation"] = -90;
        Crayon["leve"] = true;
        Crayon["color"] = "#000000";
        drawCursor(x,y);
        draw_saved = [];
        draw_gen_saved = [];
    }
    fill(0, 0, 0).stroke(0, 0, 0);
    strokeWeight(0);
}

function drawExercise() {
    strokeWeight(14);
    stroke(255,0,0,255).noFill();
    drawLine(4,4,7,2.5);
    drawLine(7,2.5,11,2.5);
    drawLine(11,2.5,8,4);
    drawLine(8,4,4,4);

    stroke(0, 0, 255, 45).noFill();
    drawLine(4,4,4,8);
    drawLine(8,4,8,8);
    drawLine(7,2.5,7,6.5);
    drawLine(11,2.5,11,6.5);

    drawLine(4,8,8,8);
    drawLine(8,8,11,6.5);
    drawLine(11,6.5,7,6.5);
    drawLine(7,6.5,4,8);
}
