// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"arc","color":"#ff0000","middle":{"x":5,"y":7},"size":2,"start_angle":0,"end_angle":-4.71238898038469,"reversed":true},{"type":"line","color":"#ff0000","coord1":{"x":5,"y":6},"coord2":{"x":5,"y":4}},{"type":"arc","color":"#ff0000","middle":{"x":5,"y":3},"size":2,"start_angle":-7.853981633974483,"end_angle":-12.566370614359172,"reversed":true},{"type":"line","color":"#ff0000","coord1":{"x":6,"y":3},"coord2":{"x":8,"y":3}},{"type":"arc","color":"#ff0000","middle":{"x":9,"y":3},"size":2,"start_angle":-15.707963267948966,"end_angle":-20.420352248333657,"reversed":true},{"type":"line","color":"#ff0000","coord1":{"x":9,"y":4},"coord2":{"x":9,"y":6}},{"type":"arc","color":"#ff0000","middle":{"x":9,"y":7},"size":2,"start_angle":-23.56194490192345,"end_angle":-28.274333882308134,"reversed":true},{"type":"line","color":"#ff0000","coord1":{"x":8,"y":7},"coord2":{"x":6,"y":7}}];
var solution_example = [{"type":"crayon_color","value":"#ff0000"},{"type":"boucle","nb_iteration":4,"value":[ {"type":"crayon_leve","value":false},{"type":"arc","taille":2,"rotation": {"type":"tourner","value":-270}},{"type":"crayon_leve","value":true},{"type":"avancer","value":1},{"type":"crayon_leve","value":false},{"type":"avancer","value":2},{"type":"crayon_leve","value":true},{"type":"avancer","value":1},{"type":"crayon_leve","value":false},{"type":"tourner","value":-180}]}];

var Crayon;
//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":5,"y":7};

var draw_saved = [];
var draw_gen_saved = [];

function checkAnswer() {
    console.log("custom overriden");
    if(custom_validation(draw_gen_saved,solution) && one_boucle(past_code)){
        enable_next();
    }else{
        not_good();
    }
}
function one_boucle(past_code){
    for(var i=0;i<past_code.length;i++){
        if(past_code[i]["type"]=="boucle"){
            return true;
        }
    }
    return false;
}

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
        Crayon["rotation"] = 90;
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
    stroke(255,0,0,45).noFill();

    drawArc(5,7,2,0,-4.71238898038469,true);
    drawLine(5,4,5,6);
    drawArc(5,3,2,-7.853981633974483,-12.566370614359172,true);
    drawLine(8,3,6,3);
    drawArc(9,3,2,-15.707963267948966,-20.420352248333657,true);
    drawLine(9,6,9,4);
    drawArc(9,7,2,-23.56194490192345,-28.274333882308134,true);
    drawLine(6,7,8,7);

    strokeWeight(0);
}