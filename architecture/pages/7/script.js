// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

__StrokeWeight = 8;

var solution = [
    {"type":"line","color":"#ffff00","coord1":{"x":2,"y":9},"coord2":{"x":2,"y":10}},
    {"type":"line","color":"#ffff00","coord1":{"x":2,"y":10},"coord2":{"x":2.59,"y":9.19}},
    {"type":"line","color":"#ffff00","coord1":{"x":2.59,"y":9.19},"coord2":{"x":1.64,"y":9.5}},
    {"type":"line","color":"#ffff00","coord1":{"x":1.64,"y":9.5},"coord2":{"x":2.59,"y":9.81}},
    {"type":"line","color":"#ffff00","coord1":{"x":2.59,"y":9.81},"coord2":{"x":2,"y":9}},
    {"type":"line","color":"#ffff00","coord1":{"x":3,"y":12},"coord2":{"x":4.5,"y":12}},
    {"type":"line","color":"#ffff00","coord1":{"x":4.5,"y":12},"coord2":{"x":3.29,"y":11.12}},
    {"type":"line","color":"#ffff00","coord1":{"x":3.29,"y":11.12},"coord2":{"x":3.75,"y":12.55}},
    {"type":"line","color":"#ffff00","coord1":{"x":3.75,"y":12.55},"coord2":{"x":4.21,"y":11.12}},
    {"type":"line","color":"#ffff00","coord1":{"x":4.21,"y":11.12},"coord2":{"x":3,"y":12}},
    {"type":"line","color":"#ffff00","coord1":{"x":12,"y":12},"coord2":{"x":13.18,"y":10.38}},
    {"type":"line","color":"#ffff00","coord1":{"x":13.18,"y":10.38},"coord2":{"x":11.28,"y":11}},
    {"type":"line","color":"#ffff00","coord1":{"x":11.28,"y":11},"coord2":{"x":13.18,"y":11.62}},
    {"type":"line","color":"#ffff00","coord1":{"x":13.18,"y":11.62},"coord2":{"x":12,"y":10}},
    {"type":"line","color":"#ffff00","coord1":{"x":12,"y":10},"coord2":{"x":12,"y":12}}
];
var solution_example = [
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":7},
    {"type":"crayon_leve","value":false},
    {"type":"crayon_color","value":"#ffff00"},
    {"type":"boucle","nb_iteration":5,"value":[
        {"type":"avancer","value":1},
        {"type":"tourner","value":144}
    ]},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":3},
    {"type":"tourner","value":90},
    {"type":"avancer","value":1},
    {"type":"crayon_leve","value":false},
    {"type":"boucle","nb_iteration":5,"value":[
        {"type":"avancer","value":1.5},
        {"type":"tourner","value":144}
    ]},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":9},
    {"type":"crayon_leve","value":false},
    {"type":"tourner","value":270},
    {"type":"boucle","nb_iteration":5,"value":[
        {"type":"tourner","value":144},
        {"type":"avancer","value":2}
    ]}
];
var Crayon;


popupInfo("Selon toi, il n'y a toujours pas assez d'étoiles ...\n" +
            "Dessines d'autres étoiles en t'aidant de ce que tu\n" +
            "as fait à la page précédente !");

//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":2,"y":2};

var draw_saved = [];
var draw_gen_saved = [];

function preload(){
    image_robotino = loadImage(ADDR_ROBOTINO_AIR);
    image_background = loadImage(ADDR_BACKGROUND_IMAGE_2);
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

function drawSpaceIndicators() {
    var sizeSpaceIndicators = 20;
    textAlign(CENTER);
    for (var i = 1; i < axisHeightLength; i++) {
        fill(255, 255, 255).stroke(255, 255, 255).strokeWeight(4)
        line(0, i * pxUnit, sizeSpaceIndicators, i * pxUnit);
        line((axisWidthLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(200, 200, 200).stroke(200, 200, 200).strokeWeight(1)
        line(0, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(255, 255, 255).strokeWeight(0).textSize(18);
        text((axisHeightLength - i), 40, i * pxUnit + 8);

    }
    for (var i = 1; i < axisWidthLength; i++) {
        fill(255, 255, 255).stroke(255, 255, 255).strokeWeight(4)
        line(i * pxUnit, 0, i * pxUnit, sizeSpaceIndicators);
        line(i * pxUnit, (axisHeightLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisHeightLength * pxUnit);

        fill(200, 200, 200).stroke(200, 200, 200).strokeWeight(1)
        line(i * pxUnit, 0, i * pxUnit, axisHeightLength * pxUnit);

        fill(255, 255, 255).strokeWeight(0).textSize(18);
        text(i, i * pxUnit, (axisHeightLength * pxUnit) - 30);
    }
    fill(50, 50, 255).strokeWeight(0).textSize(24).textStyle(BOLD);
    text('X', (axisWidthLength * pxUnit) / 2, (axisHeightLength * pxUnit) - 60);
    text('Y', 60, (axisHeightLength * pxUnit) / 2 + 8);
}

function drawExercise() {
    strokeWeight(__StrokeWeight);
    stroke(255, 255, 0, 45).noFill();
    drawLine(2,9,2,10);
    drawLine(2,10,2,9);
    drawLine(2.59,9.19,2,10);
    drawLine(1.64,9.5,2.59,9.19);
    drawLine(2.59,9.81,1.64,9.5);
    drawLine(2,9,2.59,9.81);
    drawLine(4.5,12,3,12);
    drawLine(3.29,11.12,4.5,12);
    drawLine(3.75,12.55,3.29,11.12);
    drawLine(4.21,11.12,3.75,12.55);
    drawLine(3,12,4.21,11.12);
    drawLine(13.18,10.38,12,12);
    drawLine(11.28,11,13.18,10.38);
    drawLine(13.18,11.62,11.28,11);
    drawLine(12,10,13.18,11.62);
    drawLine(12,12,12,10);
}
