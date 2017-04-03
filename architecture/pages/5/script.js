// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [
    {"type":"line","color":"#0000ff","coord1":{"x":5,"y":10},"coord2":{"x":11,"y":10}},
    {"type":"line","color":"#0000ff","coord1":{"x":11,"y":10},"coord2":{"x":11,"y":4}},
    {"type":"line","color":"#0000ff","coord1":{"x":11,"y":4},"coord2":{"x":5,"y":4}},
    {"type":"line","color":"#0000ff","coord1":{"x":5,"y":4},"coord2":{"x":5,"y":10}},

    {"type":"line","color":"#ff0000","coord1":{"x":7,"y":8},"coord2":{"x":9,"y":8}},
    {"type":"line","color":"#ff0000","coord1":{"x":9,"y":8},"coord2":{"x":9,"y":6}},
    {"type":"line","color":"#ff0000","coord1":{"x":9,"y":6},"coord2":{"x":7,"y":6}},
    {"type":"line","color":"#ff0000","coord1":{"x":7,"y":6},"coord2":{"x":7,"y":8}},

    {"type":"line","color":"#ffff00","coord1":{"x":5,"y":10},"coord2":{"x":7,"y":8}},
    {"type":"line","color":"#ffff00","coord1":{"x":5,"y":4},"coord2":{"x":7,"y":6}},
    {"type":"line","color":"#ffff00","coord1":{"x":11,"y":4},"coord2":{"x":9,"y":6}},
    {"type":"line","color":"#ffff00","coord1":{"x":11,"y":10},"coord2":{"x":9,"y":8}},

    {"type":"line","color":"#ffff00","coord1":{"x":8,"y":10},"coord2":{"x":8,"y":8}},
    {"type":"line","color":"#ffff00","coord1":{"x":8,"y":6},"coord2":{"x":8,"y":4}},
    {"type":"line","color":"#ffff00","coord1":{"x":5,"y":7},"coord2":{"x":7,"y":7}},
    {"type":"line","color":"#ffff00","coord1":{"x":9,"y":7},"coord2":{"x":11,"y":7}},



];
var solution_example = [
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":1},
    {"type":"tourner","value":90},
    {"type":"avancer","value":1},
    {"type":"crayon_leve","value":false},
    {"type":"crayon_color","value":"#ff0000"},
    {"type":"boucle","nb_iteration":4,"value":[
        {"type":"tourner","value":90},
        {"type":"avancer","value":2}
    ]},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":2},
    {"type":"tourner","value":270},
    {"type":"avancer","value":2},
    {"type":"tourner","value":180},
    {"type":"crayon_leve","value":false},
    {"type":"crayon_color","value":"#0000ff"},
    {"type":"boucle","nb_iteration":4,"value":[
        {"type":"avancer","value":6},
        {"type":"tourner","value":90}
    ]},
    {"type":"tourner","value":45},
    {"type":"crayon_color","value":"#ffff00"},
    {"type":"avancer","value":2.83},
    {"type":"tourner","value":45},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":2},
    {"type":"tourner","value":45},
    {"type":"crayon_leve","value":false},
    {"type":"avancer","value":2.83},
    {"type":"tourner","value":135},
    {"type":"tourner","value":90},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":6},
    {"type":"tourner","value":135},
    {"type":"tourner","value":90},
    {"type":"crayon_color","value":"#ffff00"},
    {"type":"crayon_leve","value":false},
    {"type":"avancer","value":2.83},
    {"type":"tourner","value":45},
    {"type":"crayon_leve","value":true},
    {"type":"avancer","value":2},
    {"type":"tourner","value":45},
    {"type":"crayon_leve","value":false},
    {"type":"avancer","value":2.83},
    {"type":"crayon_leve","value":true},
    {"type":"tourner","value":45},
    {"type":"tourner","value":180},
    {"type":"avancer","value":3},
    {"type":"tourner","value":270},
    {"type":"avancer","value":3},
    {"type":"boucle","nb_iteration":4,"value":[
        {"type":"avancer","value":1},
        {"type":"crayon_leve","value":false},
        {"type":"avancer","value":2},
        {"type":"crayon_leve","value":true},
        {"type":"tourner","value":180},
        {"type":"avancer","value":3},
        {"type":"tourner","value":270}
    ]}
];
var Crayon;
//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":8,"y":7};

var draw_saved = [];
var draw_gen_saved = [];


function preload(){
    image_robotino = loadImage(ADDR_ROBOTINO);
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
    fill(250);
    rect(0,0,width,height);
    drawSpaceIndicators();
    drawExercise();
    if(b){
        x=START_COORD['x'];
        y=START_COORD['y'];
        Crayon["rotation"] = 0;
        Crayon["leve"] = false;
        Crayon["color"] = "#000000";
        drawCursor(x,y);
        draw_saved = [];
    }
    fill(0, 0, 0).stroke(0, 0, 0);
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
    stroke(0, 0, 255, 45).noFill();
    drawLine(5,4,11,4);
    drawLine(5,4,5,10);
    drawLine(5,10,11,10);
    drawLine(11,4,11,10);

    stroke(255, 255, 0, 45).noFill();
    drawLine(8,8,8,10);
    drawLine(7,7,5,7);
    drawLine(8,6,8,4);
    drawLine(9,7,11,7);
    drawLine(5,10,7,8);
    drawLine(5,4,7,6);
    drawLine(9,6,11,4);
    drawLine(9,8,11,10);


    stroke(255, 0, 0, 45).noFill();
    drawLine(7,8,9,8);
    drawLine(9,8,9,6);
    drawLine(9,6,7,6);
    drawLine(7,6,7,8);
}

function run_exercice_code(obj){
    var past_time_max = time_max;

    past_code = obj.slice(0);
    obj = formatExerciceCode(obj);

    updateMaxRange(obj.length+1);

    todo_step = obj.slice(0);
    past_code_generated = obj.slice(0);

    reset(true);
    example_demo = false;
    timer_interval = setInterval(__draw,TIME_BETWEEN_INTERVAL);
    setTimeout(function(){
        example_demo = true;
        todo_step = [];
        updateMaxRange(past_time_max);
        checkAnswer();
    },TIME_BETWEEN_INTERVAL*time_max)
}
function formatExerciceCode(obj){
    var r_obj = [];
    var tmp = obj.slice(0);

    for(var index in tmp){
        var item = tmp[index];
        if(item["type"]!="boucle"){
            r_obj.push(item);
            continue;
        }
        for(var i=0;i<item["nb_iteration"];i++){
            var steps_todo = item["value"];
            for(var j=0;j<steps_todo.length;j++){
                var step = steps_todo[j];
                r_obj.push(step);
            }
        }
    }
    return r_obj;
}

// /////////////////////////////////////////////////////
// PlayTimer
var current_time = 0;
var time_max = 16;
const TIME_BETWEEN_INTERVAL = 500;

var timer_interval;
var todo_step = null;
var current_step = null;

var example_demo = true;

function updateMaxRange(max){
    time_max = max;
    document.querySelector("#anim-slider").setAttribute("max",max);
}
document.querySelector("#anim-slider").oninput = updateTextRanger;
function updateTextRanger(){
    document.querySelector("#anim-slider-text").innerHTML="Temps = "+(("0"+ document.querySelector("#anim-slider").value).slice(-2));
}

function playAnim(){
    updateMaxRange(solution_length(solution_example));
    todo_step = formatExerciceCode(solution_example.slice(0));
    draw_saved = [];
    timer_interval = setInterval(__draw,TIME_BETWEEN_INTERVAL);
}

function __draw(){
    current_time++;
    setRange(current_time);
    if(current_time>time_max){
        current_time = 0;
        clearInterval(timer_interval);
        reset(true);
        return;
    }
    current_step = todo_step.shift();
    if(current_step===undefined){
        return;
    }
    action(current_step);
}
function action(current_step){
    reset();
    for(var i =0;i<draw_saved.length;i++){
        eval(draw_saved[i]);
    }
    switch(current_step["type"]){
        case "avancer":
            var start_x = x;
            var start_y = y;

            x += (Math.sin(radians(Crayon["rotation"]))*current_step["value"]);
            y += (Math.cos(radians(Crayon["rotation"]))*current_step["value"]);

            x = Math.round(x*100)/100;
            y = Math.round(y*100)/100;

            if(!example_demo && !Crayon["leve"]){
                stroke(Crayon["color"]);
                strokeWeight(14);
                line(start_x*pxUnit,(axisHeightLength-start_y)*pxUnit,x*pxUnit,(axisHeightLength-y)*pxUnit);
                var cmd = "stroke('"+Crayon["color"]+"');strokeWeight(14);line("+start_x+"*pxUnit,(axisHeightLength-"+start_y+")*pxUnit,"+x+"*pxUnit,(axisHeightLength-"+y+")*pxUnit);";
                draw_saved.push(cmd);
                draw_gen_saved.push({"type":"line","color":Crayon["color"],"coord1":{"x":start_x,"y":start_y},"coord2":{"x": x,"y":y}});
            }
        break;
        case "tourner":
            Crayon["rotation"]+=current_step["value"];
        break;
        case "crayon_leve":
            Crayon["leve"] = current_step["value"];
        break;
        case "crayon_color":
            Crayon["color"] = current_step["value"];
        break;
    }
    drawCursor(x,y);
}

function setRange(n){
    var t = document.querySelector("#anim-slider");
    if(n>time_max){
        t.value=0;
    }else{
        t.value=n;
    }
    updateTextRanger();
}
// /////////////////////////////////////////////////////
// Cursor

var x = 4;
var y = 4;
