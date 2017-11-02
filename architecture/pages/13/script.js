// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"line","color":"#0000ff","coord1":{"x":5,"y":7},"coord2":{"x":6.5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":7},"coord2":{"x":5.75,"y":8.3}},{"type":"line","color":"#0000ff","coord1":{"x":5.75,"y":8.3},"coord2":{"x":5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":7},"coord2":{"x":6.5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":7},"coord2":{"x":7.56,"y":5.94}},{"type":"line","color":"#0000ff","coord1":{"x":7.56,"y":5.94},"coord2":{"x":7.95,"y":7.39}},{"type":"line","color":"#0000ff","coord1":{"x":7.95,"y":7.39},"coord2":{"x":6.5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":7},"coord2":{"x":7.56,"y":5.94}},{"type":"line","color":"#0000ff","coord1":{"x":7.56,"y":5.94},"coord2":{"x":7.56,"y":4.44}},{"type":"line","color":"#0000ff","coord1":{"x":7.56,"y":4.44},"coord2":{"x":8.86,"y":5.19}},{"type":"line","color":"#0000ff","coord1":{"x":8.86,"y":5.19},"coord2":{"x":7.56,"y":5.94}},{"type":"line","color":"#0000ff","coord1":{"x":7.56,"y":5.94},"coord2":{"x":7.56,"y":4.44}},{"type":"line","color":"#0000ff","coord1":{"x":7.56,"y":4.44},"coord2":{"x":6.5,"y":3.38}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":3.38},"coord2":{"x":7.95,"y":2.99}},{"type":"line","color":"#0000ff","coord1":{"x":7.95,"y":2.99},"coord2":{"x":7.56,"y":4.44}},{"type":"line","color":"#0000ff","coord1":{"x":7.56,"y":4.44},"coord2":{"x":6.5,"y":3.38}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":3.38},"coord2":{"x":5,"y":3.38}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":3.38},"coord2":{"x":5.75,"y":2.08}},{"type":"line","color":"#0000ff","coord1":{"x":5.75,"y":2.08},"coord2":{"x":6.5,"y":3.38}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":3.38},"coord2":{"x":5,"y":3.38}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":3.38},"coord2":{"x":3.94,"y":4.44}},{"type":"line","color":"#0000ff","coord1":{"x":3.94,"y":4.44},"coord2":{"x":3.55,"y":2.99}},{"type":"line","color":"#0000ff","coord1":{"x":3.55,"y":2.99},"coord2":{"x":5,"y":3.38}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":3.38},"coord2":{"x":3.94,"y":4.44}},{"type":"line","color":"#0000ff","coord1":{"x":3.94,"y":4.44},"coord2":{"x":3.94,"y":5.94}},{"type":"line","color":"#0000ff","coord1":{"x":3.94,"y":5.94},"coord2":{"x":2.64,"y":5.19}},{"type":"line","color":"#0000ff","coord1":{"x":2.64,"y":5.19},"coord2":{"x":3.94,"y":4.44}},{"type":"line","color":"#0000ff","coord1":{"x":3.94,"y":4.44},"coord2":{"x":3.94,"y":5.94}},{"type":"line","color":"#0000ff","coord1":{"x":3.94,"y":5.94},"coord2":{"x":5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":7},"coord2":{"x":3.55,"y":7.39}},{"type":"line","color":"#0000ff","coord1":{"x":3.55,"y":7.39},"coord2":{"x":3.94,"y":5.94}},{"type":"line","color":"#0000ff","coord1":{"x":3.94,"y":5.94},"coord2":{"x":5,"y":7}}];
var solution_example = [{"type":"tourner","value":90},{"type":"crayon_color","value":"#0000ff"},{"type":"crayon_leve","value":false},{"type":"boucle","nb_iteration":8,"value":[ {"type":"boucle","nb_iteration":3,"value":[ {"type":"avancer","value":1.5},{"type":"tourner","value":-120}]},{"type":"avancer","value":1.5},{"type":"tourner","value":45}]}];


var Crayon;

popupInfo("\nEssaies aussi cet autre type de fondations !\n" +
    "Attention, il faut utiliser des boucles dans des boucles !");
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
    if(custom_validation(draw_gen_saved,solution) && two_imbriqued(past_code)){
        enable_next();
    }else{
        not_good();
    }
}
function two_imbriqued(past_code){
    for(var i=0;i<past_code.length;i++){
        if(past_code[i]["type"]=="boucle"){
            var next_code = past_code[i]["value"];
            for(var j=0;j<next_code.length;j++){
                if(next_code[j]["type"]=="boucle"){
                    return true;
                }
            }
        }
    }
    return false;
}

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
        debug_generate_code(draw_gen_saved);
        x=START_COORD['x'];
        y=START_COORD['y'];
        Crayon["rotation"] = 0;
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
    stroke(0,0,255,45).noFill();

    drawLine(6.5,7,5,7);
    drawLine(5.75,8.3,6.5,7);
    drawLine(5,7,5.75,8.3);
    drawLine(6.5,7,5,7);
    drawLine(7.56,5.94,6.5,7);
    drawLine(7.95,7.39,7.56,5.94);
    drawLine(6.5,7,7.95,7.39);
    drawLine(7.56,5.94,6.5,7);
    drawLine(7.56,4.44,7.56,5.94);
    drawLine(8.86,5.19,7.56,4.44);
    drawLine(7.56,5.94,8.86,5.19);
    drawLine(7.56,4.44,7.56,5.94);
    drawLine(6.5,3.38,7.56,4.44);
    drawLine(7.95,2.99,6.5,3.38);
    drawLine(7.56,4.44,7.95,2.99);
    drawLine(6.5,3.38,7.56,4.44);
    drawLine(5,3.38,6.5,3.38);
    drawLine(5.75,2.08,5,3.38);
    drawLine(6.5,3.38,5.75,2.08);
    drawLine(5,3.38,6.5,3.38);
    drawLine(3.94,4.44,5,3.38);
    drawLine(3.55,2.99,3.94,4.44);
    drawLine(5,3.38,3.55,2.99);
    drawLine(3.94,4.44,5,3.38);
    drawLine(3.94,5.94,3.94,4.44);
    drawLine(2.64,5.19,3.94,5.94);
    drawLine(3.94,4.44,2.64,5.19);
    drawLine(3.94,5.94,3.94,4.44);
    drawLine(5,7,3.94,5.94);
    drawLine(3.55,7.39,5,7);
    drawLine(3.94,5.94,3.55,7.39);
    drawLine(5,7,3.94,5.94);
    /*

    drawLine(5,5.5,5,7);
    drawLine(3.7,6.25,5,5.5);
    drawLine(5,7,3.7,6.25);
    drawLine(5,4,5,5.5);
    drawLine(3.7,4.75,5,4);
    drawLine(5,5.5,3.7,4.75);
    drawLine(6.5,4,5,4);
    drawLine(5.75,2.7,6.5,4);
    drawLine(5,4,5.75,2.7);
    drawLine(8,4,6.5,4);
    drawLine(7.25,2.7,8,4);
    drawLine(6.5,4,7.25,2.7);
    drawLine(8,5.5,8,4);
    drawLine(9.3,4.75,8,5.5);
    drawLine(8,4,9.3,4.75);
    drawLine(8,7,8,5.5);
    drawLine(9.3,6.25,8,7);
    drawLine(8,5.5,9.3,6.25);
    drawLine(6.5,7,8,7);
    drawLine(7.25,8.3,6.5,7);
    drawLine(8,7,7.25,8.3);
    drawLine(5,7,6.5,7);
    drawLine(5.75,8.3,5,7);
    drawLine(6.5,7,5.75,8.3);
*/
    strokeWeight(0);
}