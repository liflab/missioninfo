// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"arc","color":"#ff0000","middle":{"x":6,"y":8},"size":4,"start_angle":0,"end_angle":-3.141592653589793,"reversed":true},{"type":"arc","color":"#ff0000","middle":{"x":9,"y":6.5},"size":4,"start_angle":-6.283185307179586,"end_angle":-9.42477796076938,"reversed":true},{"type":"line","color":"#ff0000","coord1":{"x":9,"y":8.5},"coord2":{"x":6,"y":9.99}}];
var solution_example = [{"type":"crayon_leve","value":true},{"type":"avancer","value":4},{"type":"tourner","value":90},{"type":"avancer","value":2},{"type":"crayon_color","value":"#ff0000"},{"type":"crayon_leve","value":false},{"type":"arc","taille":4,"rotation": {"type":"tourner","value":-180}},{"type":"crayon_leve","value":true},{"type":"tourner","value":-90},{"type":"avancer","value":1.5},{"type":"tourner","value":-90},{"type":"avancer","value":3},{"type":"crayon_leve","value":false},{"type":"arc","taille":4,"rotation": {"type":"tourner","value":-180}},{"type":"crayon_leve","value":true},{"type":"tourner","value":90},{"type":"avancer","value":2},{"type":"tourner","value":-90},{"type":"tourner","value":26.42},{"type":"crayon_leve","value":false},{"type":"avancer","value":3.35}];

var Crayon;
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
    stroke(255,0,0,255).noFill();
    drawLine(4,4,7,2.5);
    drawLine(7,2.5,11,2.5);
    drawLine(11,2.5,8,4);
    drawLine(8,4,4,4);

    stroke(0, 0, 255, 255).noFill();
    drawLine(4,4,4,8);
    drawLine(8,4,8,8);
    drawLine(7,2.5,7,6.5);
    drawLine(11,2.5,11,6.5);

    drawLine(4,8,8,8);
    drawLine(8,8,11,6.5);
    drawLine(11,6.5,7,6.5);
    drawLine(7,6.5,4,8);

    stroke(255,0,0,45).noFill();
    drawArc(6,8,4,0,-3.141592653589793,true);
    drawArc(9,6.5,4,-6.283185307179586,-9.42477796076938,true);
    drawLine(6,9.99,9,8.5);
    strokeWeight(0);
}

function run_exercice_code(obj){
    var past_time_max = time_max;

    past_code = obj.slice(0);
    obj = formatExerciceCode(obj);

    updateMaxRange(obj.length+1);

    todo_step = obj.slice(0);
    past_code_generated = obj.slice(0);

    //reset(true);
    example_demo = false;
    var speed = 1-document.querySelector("#speed").value;
    timer_interval = setInterval(__draw,TIME_BETWEEN_INTERVAL*speed);
    invertButtons();
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
    document.querySelector("#anim-slider-text").innerHTML="Temps = "+document.querySelector("#anim-slider").value;
}

function playAnim(){
    updateMaxRange(solution_length(solution_example));
    todo_step = formatExerciceCode(solution_example.slice(0));

    var speed = 1-document.querySelector("#speed").value;

    draw_saved = [];
    timer_interval = setInterval(__draw,TIME_BETWEEN_INTERVAL*speed);
    invertButtons();
}
function stopAnim(b){
    if(b===undefined) b=false;
    //debug_generate_code(draw_gen_saved);

    if(!example_demo){
        example_demo = true;
        if(!b){
            checkAnswer();
        }
    }

    todo_step = [];
    current_time = 0;
    clearInterval(timer_interval);
    reset(true);
    invertButtons();
    document.querySelector("#anim-slider").value="0";
    updateTextRanger();
}

function __draw(){
    current_time++;
    setRange(current_time);
    if(current_time>time_max){
        stopAnim();
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
        case "arc":
            var start_rotation = Crayon["rotation"]-90;
            var rotation_todo = current_step["rotation"];
            var end_rotation = start_rotation + rotation_todo["value"];
            var taille = current_step["taille"];

            var rad_start_rotation = Math.radians(start_rotation);
            var rad_end_rotation = Math.radians(end_rotation);

            var reversed = rotation_todo["value"] < 0;

            if(!example_demo && !Crayon["leve"]) {
                stroke(Crayon["color"]).noFill();
                strokeWeight(14);

                drawArc(x,y,taille,rad_start_rotation,rad_end_rotation,reversed);
                var cmd = "stroke('"+Crayon["color"]+"').noFill();";
                    cmd+= "strokeWeight(14);";
                    cmd+= "drawArc("+x+", "+y+", "+(taille)+", "+(rad_start_rotation)+", "+(rad_end_rotation)+","+(reversed?("true"):("false"))+");";
                    cmd+= "strokeWeight(0);";
                draw_saved.push(cmd);
                draw_gen_saved.push({
                    "type":"arc",
                    "color":Crayon["color"],
                    "middle":{"x":x,"y":y},
                    "size":taille,
                    "start_angle":rad_start_rotation,
                    "end_angle":rad_end_rotation,
                    "reversed":reversed
                });
                strokeWeight(0);
            }
            Crayon["rotation"] += rotation_todo["value"];
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
