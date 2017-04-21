// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"line","color":"#0000ff","coord1":{"x":5,"y":7},"coord2":{"x":5,"y":5.5}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":5.5},"coord2":{"x":3.7,"y":6.25}},{"type":"line","color":"#0000ff","coord1":{"x":3.7,"y":6.25},"coord2":{"x":5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":5.5},"coord2":{"x":5,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":4},"coord2":{"x":3.7,"y":4.75}},{"type":"line","color":"#0000ff","coord1":{"x":3.7,"y":4.75},"coord2":{"x":5,"y":5.5}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":4},"coord2":{"x":6.5,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":4},"coord2":{"x":5.75,"y":2.7}},{"type":"line","color":"#0000ff","coord1":{"x":5.75,"y":2.7},"coord2":{"x":5,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":4},"coord2":{"x":8,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":4},"coord2":{"x":7.25,"y":2.7}},{"type":"line","color":"#0000ff","coord1":{"x":7.25,"y":2.7},"coord2":{"x":6.5,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":4},"coord2":{"x":8,"y":5.5}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":5.5},"coord2":{"x":9.3,"y":4.75}},{"type":"line","color":"#0000ff","coord1":{"x":9.3,"y":4.75},"coord2":{"x":8,"y":4}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":5.5},"coord2":{"x":8,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":7},"coord2":{"x":9.3,"y":6.25}},{"type":"line","color":"#0000ff","coord1":{"x":9.3,"y":6.25},"coord2":{"x":8,"y":5.5}},{"type":"line","color":"#0000ff","coord1":{"x":8,"y":7},"coord2":{"x":6.5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":7},"coord2":{"x":7.25,"y":8.3}},{"type":"line","color":"#0000ff","coord1":{"x":7.25,"y":8.3},"coord2":{"x":8,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":6.5,"y":7},"coord2":{"x":5,"y":7}},{"type":"line","color":"#0000ff","coord1":{"x":5,"y":7},"coord2":{"x":5.75,"y":8.3}},{"type":"line","color":"#0000ff","coord1":{"x":5.75,"y":8.3},"coord2":{"x":6.5,"y":7}}];
var solution_example = [{"type":"crayon_color","value":"#0000ff"},{"type":"tourner","value":180},{"type":"boucle","nb_iteration":4,"value":[ {"type":"boucle","nb_iteration":2,"value":[ {"type":"crayon_leve","value":false},{"type":"boucle","nb_iteration":3,"value":[ {"type":"avancer","value":1.5},{"type":"tourner","value":120}]},{"type":"crayon_leve","value":true},{"type":"avancer","value":1.5}]},{"type":"tourner","value":-90}]}];

var Crayon;

var text_info = "\nEssaies aussi cet autre type de fondations !\n" +
    "Attention, il faut utiliser des boucles dans des boucles !";
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
    stroke(0,0,255,45).noFill();

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

    strokeWeight(0);
}