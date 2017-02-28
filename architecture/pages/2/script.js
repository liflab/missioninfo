// To check the answer
var canvas;
var past_code;

var solution = [
    {"type":"line","color":"#0000ff","coord1":{"x":10,"y":4},"coord2":{"x":10,"y":8}},
    {"type":"line","color":"#0000ff","coord1":{"x":10,"y":8},"coord2":{"x":14,"y":8}},
    {"type":"line","color":"#0000ff","coord1":{"x":14,"y":8},"coord2":{"x":14,"y":4}},
    {"type":"line","color":"#0000ff","coord1":{"x":14,"y":4},"coord2":{"x":10,"y":4}},

    {"type":"line","color":"#ffff00","coord1":{"x":8,"y":4},"coord2":{"x":4,"y":4}},
    {"type":"line","color":"#ffff00","coord1":{"x":4,"y":4},"coord2":{"x":4,"y":8}},
    {"type":"line","color":"#ffff00","coord1":{"x":4,"y":8},"coord2":{"x":8,"y":8}},
    {"type":"line","color":"#ffff00","coord1":{"x":8,"y":8},"coord2":{"x":8,"y":4}},
];

var solution_example = [
    {"type":"crayon_color","value":"#0000ff"},
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

//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":10,"y":4};

var draw_saved = [];
var draw_gen_saved = [];

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
        drawCursor(x,y);
        draw_saved = [];
        draw_gen_saved = [];
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
    fill(255, 255, 0, 45).noStroke();
    rect(
        4*pxUnit-pxUnit/6,
        (axisHeightLength-8)*pxUnit,
        pxUnit/3,
        4*pxUnit,
        20
    );
    rect(
        4*pxUnit,
        (axisHeightLength-8)*pxUnit-pxUnit/6,
        4*pxUnit,
        pxUnit/3,
        20
    );
    rect(
        8*pxUnit-pxUnit/6,
        (axisHeightLength-8)*pxUnit,
        pxUnit/3,
        4*pxUnit,
        20
    );
    rect(
        4*pxUnit,
        (axisHeightLength-4)*pxUnit-pxUnit/6,
        4*pxUnit,
        pxUnit/3,
        20
    );
    fill(0, 0, 255, 45).noStroke();
    rect(
        10*pxUnit,                              // 10 = Coordonnée X
        (axisHeightLength-4)*pxUnit-pxUnit/6,   // 4  = Coordonnée Y
        4*pxUnit,
        pxUnit/3,
        20
    );
    rect(
        10*pxUnit-pxUnit/6,
        (axisHeightLength-8)*pxUnit,
        pxUnit/3,
        4*pxUnit,
        20
    );
    rect(
        10*pxUnit,
        (axisHeightLength-8)*pxUnit-pxUnit/6,
        4*pxUnit,
        pxUnit/3,
        20
    );

    rect(
        14*pxUnit-pxUnit/6,
        (axisHeightLength-8)*pxUnit,
        pxUnit/3,
        4*pxUnit,
        20
    );
}

function run_exercice_code(obj){
    var past_time_max = time_max;

    updateMaxRange(obj.length+1);

    todo_step = obj.slice(0);
    past_code = obj.slice(0);
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
    console.log(current_step);
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
                console.log(cmd);
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
    console.log("-----------------");
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
