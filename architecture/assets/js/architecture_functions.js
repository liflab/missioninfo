const DEBUG = true;
const STROKE_WEIGHT_DEFAULT = 14;
const DELTA = 0.025;

var Stroke_Weight = STROKE_WEIGHT_DEFAULT;
var __StrokeWeight;

console.log("FUNCTIONS LOADED... DEBUG="+DEBUG);

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
}
var play_show = true;

//##########################################################################################################

// Adjust height manually to allow blockly to be responsive
/*
var p5jsDiv = document.getElementById('sketch-col');
var blocklyDiv = document.getElementById('blockly-holder');
*/
//##########################################################################################################

//##########################################################################################################

// Function execute when all things are loaded
function allLoaded() {
    if(__StrokeWeight !== undefined){
        Stroke_Weight = __StrokeWeight;
    }
    activateButtons();
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
    setup();
}
//##########################################################################################################

// Function to activate the right buttons in the progression bar 
function activateButtons() {
    var nb_total_btn = document.querySelectorAll("#btn-group button").length;
    var num = Math.max(currentPageNumber, savedPageNumber);

    for (var i = 1; i < num; i++) {
        document.getElementById("progress_" + i).className = "btn btn-success";
    }
    document.getElementById("progress_" + num).className = "btn btn-warning";
    for (var i = num + 1; i <= nb_total_btn; i++) {
        document.getElementById("progress_" + i).className = "btn btn-default disabled"
    }

    if(document.querySelector("#btn-holder")){
        var bts = '<button type="button" onclick="next_page()" id="btn_next_exercise" style="display:none" class="btn btn-success btn-block"><span class="glyphicon glyphicon-ok"></span> SUIVANT</button>';
        bts+= '<button type="button" onclick="run_code()" id="btn_run_prog" class="btn btn-success btn-block"><span class="glyphicon glyphicon-play"></span> DEMARRER</button>';
        bts+= '<button type="button" onclick="stopAnim(true)" id="btn_stop_prog" class="btn btn-warning btn-block hidden"><span class="glyphicon glyphicon-stop"></span> STOP</button>';
        bts+= '<button type="button" onclick="reset(true)" id="btn_reinit_prog" class="btn btn-warning btn-block"><span class="glyphicon glyphicon-backward"></span> REINITIALISER</button>';
        bts+= '<button type="button" onclick="save_code()" class="btn btn-info btn-block"><span class="glyphicon glyphicon-save"></span> SAUVEGARDER</button>';
        document.querySelector("#btn-holder").innerHTML = bts;
    }

}
//##########################################################################################################

// Functions for blocks coding
function run_code() {
    try {
        code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
        /*
        eval(code);
        checkAnswer();
        save_code();
        */
    }
    catch (err) {
        not_good();
        console.log(err);
        return;
    }
    code = "["+code.trim().substring(0,code.length-1)+"]";
    code = code.replace(/\,([\}\]])/ig,"$1");
    code = code.replace(/ {2}/ig," ");
    code = code.replace(/\/\/.+\n/ig,"");

    console.log(code);

    json_obj = JSON.parse(code);
    run_exercice_code(json_obj);
}

function save_code() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }

    //Test
}

function not_good() {
    popupNotGood();
}

function enable_next() {
    popupGood();
    save_code();
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("progress_" + currentPageNumber.toString()).className = "btn btn-success";

    // Save num page in local storage
    window.localStorage.setItem("max_page_architecture", Math.max(currentPageNumber + 1, savedPageNumber));
}

function invertButtons(){
    play_show = !play_show;

    console.log("Invert ...");
    if(play_show){
        document.querySelector("#anim-play").className="";
        document.querySelector("#anim-stop").className="hidden";

        document.querySelector("#btn_run_prog").className="btn btn-success btn-block";
        document.querySelector("#btn_stop_prog").className="btn btn-success btn-block hidden";

        document.querySelector("#btn_reinit_prog").className="btn btn-warning btn-block";
    }else{
        document.querySelector("#anim-play").className="hidden";
        document.querySelector("#anim-stop").className="";

        document.querySelector("#btn_run_prog").className="btn btn-success btn-block hidden";
        document.querySelector("#btn_stop_prog").className="btn btn-success btn-block";
        document.querySelector("#btn_reinit_prog").className="btn btn-warning btn-block hidden";

    }
}
//##########################################################################################################

function checkAnswer() {
    if(custom_validation(draw_gen_saved,solution)){
        enable_next();
    }else{
        not_good();
    }
}

function custom_validation(drawing_gen, solution){
    if(DEBUG){
        console.log(" <-- custom_validation()");
        console.log("Len(A1) = "+drawing_gen.length);
        console.log("Len(A2) = "+solution.length);
    }
    var str = "";
    if(drawing_gen.length<solution.length){
        if(DEBUG){
            str += ("++++++++++++++++++++++++++++++++++++++<br />");
            str += (JSON.stringify(drawing_gen)+"<br />");
            str += ("======================================<br />");
            str += (JSON.stringify(solution)+"<br />");
            str += ("++++++++++++++++++++++++++++++++++++++<br />");
            document.querySelector("#logging").innerHTML=str;
        }
        return false;
    }
    var t_result = [];
    for(var i=0;i<solution.length;i++){
        var solution_step = solution[i];
            for(var j=0;j<drawing_gen.length;j++){
            //console.log("Looking for "+str_draw(draw_done));
            if(DEBUG){  console.log("COMPARAISON "+(i)+" ["+j+"]")}
            if(is_equivalent(solution_step,drawing_gen[j])){
                //console.log("OUI");
                t_result.push(true);
                break;
            }
        }
        if(t_result.length!=i+1){
            if(DEBUG){
                str += ("++++++++++++++++++++++++++++++++++++++");
                str += (JSON.stringify(drawing_gen));
                str += (JSON.stringify(solution));
                str += ("--------------------------------------");
                document.querySelector("#logging").innerHTML=str;
            }
            return false;
        }
    }
    return true;
};

function is_equivalent(d1,d2){
    if(DEBUG){  console.log("==> Is Equivalent");}
    if(DEBUG){  console.log("--D1-->"); console.log(d1); }
    if(DEBUG){  console.log("--D2-->"); console.log(d2); }
        //console.log("Is it "+str_draw(d2)+" ?");
    if(d1["type"]!=d2["type"]){
        if(DEBUG){  console.log("<== false"); }
        return false;
    }
    if(DEBUG){
        console.log(d1["type"]);
    }
    switch(d1["type"]){
        case "line":
            var v_coord = (
                (
                    value_equivalent(d1["coord1"]["x"],d2["coord1"]["x"]) && value_equivalent(d1["coord1"]["y"],d2["coord1"]["y"]) &&
                    value_equivalent(d1["coord2"]["x"],d2["coord2"]["x"]) && value_equivalent(d1["coord2"]["y"],d2["coord2"]["y"])
                ) ||
                (
                    value_equivalent(d1["coord1"]["x"],d2["coord2"]["x"]) && value_equivalent(d1["coord1"]["y"],d2["coord2"]["y"]) &&
                    value_equivalent(d1["coord2"]["x"],d2["coord1"]["x"]) && value_equivalent(d1["coord2"]["y"],d2["coord1"]["y"])
                )
            );
            var ret = v_coord && (d1["color"]===undefined || (d1["color"]==d2["color"]));
            if(DEBUG){  console.log("<== "+ret); }
            return ret;
        break;
        case "arc":
            if(d1["size"]!=d2["size"] || d1["color"]!=d2["color"] || !value_equivalent(d1["middle"]["x"],d2["middle"]["x"]) || !value_equivalent(d1["middle"]["y"],d2["middle"]["y"])){
                if(DEBUG){  console.log("<== false"); }
                return false;
            }
            var d1_start;
            var d1_end;
            var d2_start;
            var d2_end;
            if(d1["reversed"]==d2["reversed"]){
                d1_start = d1["start_angle"];
                d1_end   = d1["end_angle"];
                d2_start = d2["start_angle"];
                d2_end   = d2["end_angle"];
            }else{
                d1_start = d1["start_angle"];
                d1_end   = d1["end_angle"];
                d2_start = d2["end_angle"];
                d2_end   = d2["start_angle"];
            }
            var value_sub = value_equivalent(Math.abs(d2_end-d2_start),Math.abs(d1_end-d1_start));
            if(DEBUG){  console.log("<== "+value_sub); }
            return value_sub;
            /*
            if(
                d1["reversed"]==d2["reversed"] && value_equivalent(d1["start_angle"],d2["start_angle"]) && value_equivalent(d1["end_angle"],d2["end_angle"]) ||
                d1["reversed"]!=d2["reversed"] && value_equivalent(d1["start_angle"],d2["end_angle"]) && value_equivalent(d1["end_angle"],d2["start_angle"])
            ){
                if(DEBUG){  console.log("<== true"); }
                return true;
            }
            if(DEBUG){  console.log("<== false"); }
            return false;*/
        break;
        default:
            if(DEBUG){  console.log("<== false"); }
            return false;
    }
}

function value_equivalent(v1,v2){
    if(DEBUG){ console.log("-->Value_equivalent("+v1+"//"+v2+")");}
    if(v1==v2){
        if(DEBUG){  console.log("<-- true");}
        return true;
    }
    if(v1>0 && v2 <0 || v1 <0 && v2>0){
        if(DEBUG){  console.log("<-- false");}
        return false;
    }
    var r = false;
    var v1_min = v1*(1-DELTA);
    var v1_max = v1*(1+DELTA);
    var v2_min = v2*(1-DELTA);
    var v2_max = v2*(1+DELTA);

    if(v1>0){
        r = v1 >= v2_min && v1 <= v2_max || v2 >= v1_min && v2 <=v1_max;
    }else{
        console.log("////////////");
        console.log(v1_min);
        console.log(v1_max);
        console.log(v2_min);
        console.log(v2_max);
        console.log("////////////");
        r = false;
    }
    if(DEBUG){
        console.log("<-- "+r);
    }
    return r;
}

function str_draw(d){
    return d["type"]+"( {x:"+d["coord1"]["x"]+", y:"+d["coord1"]["y"]+"} => {x:"+d["coord2"]["x"]+", y:"+d["coord2"]["y"]+"})";
}
function solution_length(solution){
    var nb = 0;
    for(var i=0;i<solution.length;i++){
        if(solution[i]["type"]!="boucle")   nb++;
        else                                nb+=solution[i]["nb_iteration"]*solution_length(solution[i]["value"]);
    }
    return nb;
}
//##########################################################################################################
function drawLine(x1,y1,x2,y2){
    line(x1*pxUnit,(axisHeightLength-y1)*pxUnit,x2*pxUnit,(axisHeightLength-y2)*pxUnit);
}

function drawArc(x,y,taille,rad_start_rotation,rad_end_rotation,reversed){
    if(reversed){
        var tmp = rad_start_rotation;
        rad_start_rotation = rad_end_rotation;
        rad_end_rotation = tmp;
    }
    arc(x*pxUnit, (axisHeightLength - y) * pxUnit, taille*pxUnit, taille*pxUnit, rad_start_rotation, rad_end_rotation);
}

const SIZE_CURSOR = 60;
const ADDR_ROBOTINO_LAND = "../../../assets/img/Content.svg";
const ADDR_ROBOTINO_AIR = "../../../assets/img/Roule.svg";
const ADDR_ROBOTINO_OUT = "../../assets/img/arrow_out.png";//"../../../assets/img/Inquiet_c.svg";

var image_robotino;
var image_robotino_out;
var x;
var y;


/*
image_robotino.height = SIZE_CURSOR;
image_robotino.width = 0.921875 * SIZE_CURSOR;
*/
Crayon = {
    "leve":true,
    "color":"#000000",
    "rotation":0
};

function drawCursor(x_sent,y_sent) {

    var image_to_draw;
    var rotation;

    if(x < 0 || y < 0 || x > 16 || y > 14){
        image_to_draw = image_robotino_out;
        if(x<0){    x_sent = 0.5;       rotation = radians(0);  }
        if(y<0){    y_sent = 0.5;       rotation = radians(0);  }
        if(x>16){    x_sent = 15.5;     rotation = radians(90);  }
        if(y>14){    y_sent = 13.5;     rotation = radians(0);  }
    }else{
        image_to_draw = image_robotino;
        rotation = radians(Crayon["rotation"]);
    }
    x_sent = x_sent * pxUnit;
    y_sent = (axisHeightLength - y_sent) * pxUnit;

    translate(x_sent,y_sent);
    rotate(rotation);

    image(image_to_draw, -(0.921875 * SIZE_CURSOR)/2, -(SIZE_CURSOR)/2, 0.921875 * SIZE_CURSOR, SIZE_CURSOR);
    /*
    stroke(0);
    strokeWeight(2);
    var middle_height = Math.sqrt(Math.pow(SIZE_CURSOR,2)-Math.pow(SIZE_CURSOR/2,2));
    triangle(
        0,-middle_height/2,
        SIZE_CURSOR/2,middle_height/2,
        -SIZE_CURSOR/2,middle_height/2
    );
    */

    rotate(-rotation);
    translate(-x_sent,-y_sent);
}

function drawSpaceIndicators() {

    const VALUE_RED     = 0;
    const VALUE_GREEN   = 0;
    const VALUE_BLUE    = 0;
    const GRID_OPACITY  = 0.3;

    var sizeSpaceIndicators = 20;
    textAlign(CENTER);
    for (var i = 1; i < axisHeightLength; i++) {
        fill(VALUE_RED, VALUE_GREEN, VALUE_BLUE).stroke(VALUE_RED, VALUE_GREEN, VALUE_BLUE).strokeWeight(4)
        line(0, i * pxUnit, sizeSpaceIndicators, i * pxUnit);
        line((axisWidthLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(VALUE_RED, VALUE_GREEN, VALUE_BLUE).stroke(VALUE_RED, VALUE_GREEN, VALUE_BLUE, GRID_OPACITY*255).strokeWeight(1)
        line(0, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(VALUE_RED, VALUE_GREEN, VALUE_BLUE).strokeWeight(0).textSize(18)
        text((axisHeightLength - i), 40, i * pxUnit + 8);

    }
    for (var i = 1; i < axisWidthLength; i++) {
        fill(VALUE_RED, VALUE_GREEN, VALUE_BLUE).stroke(VALUE_RED, VALUE_GREEN, VALUE_BLUE).strokeWeight(4)
        line(i * pxUnit, 0, i * pxUnit, sizeSpaceIndicators);
        line(i * pxUnit, (axisHeightLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisHeightLength * pxUnit);

        fill(VALUE_RED, VALUE_GREEN, VALUE_BLUE).stroke(VALUE_RED, VALUE_GREEN, VALUE_BLUE, GRID_OPACITY*255).strokeWeight(1)
        line(i * pxUnit, 0, i * pxUnit, axisHeightLength * pxUnit);

        fill(VALUE_RED, VALUE_GREEN, VALUE_BLUE).strokeWeight(0).textSize(18)
        text(i, i * pxUnit, (axisHeightLength * pxUnit) - 30);
    }
    fill(50, 50, 255).strokeWeight(0).textSize(24).textStyle(BOLD);
    //text('X', (axisWidthLength * pxUnit) / 2, (axisHeightLength * pxUnit) - 60);
    //text('Y', 60, (axisHeightLength * pxUnit) / 2 + 8);
}

function debug_generate_code(code){
    if(code.length==0){
        return;
    }
    var js = JSON.stringify(code);
    console.log("++++++++++++++++++++++++++++++");
    var s = "";//"drawLine("+code[0]["coord1"]["x"]+","+code[0]["coord1"]["y"]+","+code[0]["coord2"]["x"]+","+code[0]["coord2"]["y"]+");\n";
    for(var i=0;i<code.length;i++){
        var next = code[i];
        if(next===undefined) next=code[0];
        switch(next["type"]){
            case "line":
                s += "drawLine("+next["coord2"]["x"]+","+next["coord2"]["y"]+","+next["coord1"]["x"]+","+next["coord1"]["y"]+");\n";
            break;
            case "arc":
                s += "drawArc("+next["middle"]["x"]+","+next["middle"]["y"]+","+next["size"]+","+next["start_angle"]+","+next["end_angle"]+","+(next["reversed"]?("true"):("false"))+");\n";
            break;
            default:
                console.log(next["type"]+" not set !");
        }
    }
    console.log("==============================");
    console.log("------------ SOLUTION ------------");
    console.log(js);
    console.log("------------ DESSINS  ------------");
    console.log(s);
}



var image_background;

const ADDR_BACKGROUND_IMAGE_1 = "../../assets/img/background-1.png";
const ADDR_BACKGROUND_IMAGE_2 = "../../assets/img/background-2.png";
const ADDR_BACKGROUND_IMAGE_3 = "../../assets/img/background-3.png";


/*  =====================================
    =====================================
    ========== FONCTIONS GLOBALES =======
    =====================================
    =====================================
 */

function run_exercice_code(obj){
    reset(true);
    stopAnim(true);

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
}
function formatExerciceCode(obj){
    var r_obj = [];
    var tmp = JSON.parse(JSON.stringify(obj));

    for(var index in tmp){
        var item = tmp[index];
        if(item["type"]!="boucle"){
            r_obj.push(item);
            continue;
        }
        for(var i=0;i<item["nb_iteration"];i++){
            var tab = formatExerciceCode(item["value"]);
            for(var j=0;j<tab.length;j++){
                var step = tab[j];
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
if(document.querySelector("#anim-slider")){
    document.querySelector("#anim-slider").oninput = updateTextRanger;
}

function updateTextRanger(){
    document.querySelector("#anim-slider-text").innerHTML="Temps = "+document.querySelector("#anim-slider").value;
}

function playAnim(){
    invertButtons();
    reset(true);
    stopAnim(true);
    updateMaxRange(solution_length(solution_example));
    todo_step = formatExerciceCode(solution_example.slice(0));

    var speed = 1-document.querySelector("#speed").value;

    draw_saved = [];
    timer_interval = setInterval(__draw,TIME_BETWEEN_INTERVAL*speed);
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
    //reset(true);
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

    var v = Crayon["color"].substr(1);
    var color_red   = parseInt(v.substr(0,2),16);
    var color_green = parseInt(v.substr(2,4),16);
    var color_blue  = parseInt(v.substr(4),16);
    const OPACITY_EXAMPLE = 0.5;
    var opacity = (example_demo)?(OPACITY_EXAMPLE):(1);

    switch(current_step["type"]){
        case "avancer":
            var start_x = x;
            var start_y = y;

            x += (Math.sin(radians(Crayon["rotation"]))*current_step["value"]);
            y += (Math.cos(radians(Crayon["rotation"]))*current_step["value"]);

            x = Math.round(x*100)/100;
            y = Math.round(y*100)/100;

            if(!Crayon["leve"]){
                if(!example_demo){
                    stroke(color_red,color_green,color_blue);
                }else{
                    stroke(color_red,color_green,color_blue,OPACITY_EXAMPLE*255);
                }
                strokeWeight(Stroke_Weight);
                line(start_x*pxUnit,(axisHeightLength-start_y)*pxUnit,x*pxUnit,(axisHeightLength-y)*pxUnit);
                var cmd = "stroke("+color_red+","+color_green+","+color_blue+","+(opacity*255)+");strokeWeight(Stroke_Weight);line("+start_x+"*pxUnit,(axisHeightLength-"+start_y+")*pxUnit,"+x+"*pxUnit,(axisHeightLength-"+y+")*pxUnit);strokeWeight(0);";
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

            if(!Crayon["leve"]){
                if(!example_demo){
                    stroke(color_red,color_green,color_blue);
                }else{
                    stroke(color_red,color_green,color_blue,OPACITY_EXAMPLE*255);
                }
                noFill();
                strokeWeight(Stroke_Weight);
                drawArc(x,y,taille,rad_start_rotation,rad_end_rotation,reversed);
                var cmd = "stroke("+color_red+","+color_green+","+color_blue+","+(opacity*255)+").noFill();";
                cmd+= "strokeWeight(Stroke_Weight);";
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