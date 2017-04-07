// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

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
    {"type":"crayon_color","value":"#0000ff"},
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
    {"type":"crayon_leve","value":false},
    {"type":"crayon_color","value":"#ffff00"},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4},
    {"type":"tourner","value":90},
    {"type":"avancer","value":4}
];
var Crayon;
function checkAnswer() {
    console.log("custom overriden");
    if(custom_validation(draw_gen_saved,solution) && two_or_more(past_code)){
        enable_next();
    }else{
        not_good();
    }
}
function two_or_more(past_code){
    var nb_boucle = 2;
    for(var i=0;i<past_code.length;i++){
        if(past_code[i]["type"]=="boucle"){
            nb_boucle--;
        }
    }
    return nb_boucle <=0;
}
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
        draw_gen_saved = [];
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
                strokeWeight(14);
                line(start_x*pxUnit,(axisHeightLength-start_y)*pxUnit,x*pxUnit,(axisHeightLength-y)*pxUnit);
                var cmd = "stroke('"+Crayon["color"]+"');strokeWeight(14);line("+start_x+"*pxUnit,(axisHeightLength-"+start_y+")*pxUnit,"+x+"*pxUnit,(axisHeightLength-"+y+")*pxUnit);strokeWeight(0);";
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
