// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;
/*
 -----------------------------------
4,5         => 4,7.5
4,7.5       => 6.38,8.27
6.38,8.27   => 7.85,6.25
7.85,6.25   => 6.38,4.23
6.38,4.23   => 4,5

-----------------------------------
9,9         => 12,9
12,9        => 9.57,7.24
9.57,7.24   => 10.5,10.09
10.5,10.09  => 11.43,7.24
11.43,7.24  => 9,9

 */
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
//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":2,"y":2};

var draw_saved = [];
var draw_gen_saved = [];

function preload(){
    image_robotino = loadImage("../../../assets/img/robotino/happy-1296589.svg");
    image_background = loadImage(ADDR_BACKGROUND_IMAGE_2);
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
    strokeWeight(8);
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
    updateMaxRange(solution_example.length+1);
    todo_step = solution_example.slice(0);
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
                strokeWeight(8);
                line(start_x*pxUnit,(axisHeightLength-start_y)*pxUnit,x*pxUnit,(axisHeightLength-y)*pxUnit);
                var cmd = "stroke('"+Crayon["color"]+"');strokeWeight(8);line("+start_x+"*pxUnit,(axisHeightLength-"+start_y+")*pxUnit,"+x+"*pxUnit,(axisHeightLength-"+y+")*pxUnit);strokeWeight(0);";
                draw_saved.push(cmd);
                draw_gen_saved.push({"type":"line","color":Crayon["color"],"coord1":{"x":start_x,"y":start_y},"coord2":{"x": x,"y":y}});
                strokeWeight(0);
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