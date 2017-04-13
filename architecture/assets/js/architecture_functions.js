Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

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
    activateButtons();
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
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
}

function not_good() {
    popupNotGood();
}

function enable_next() {
    popupGood();
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("progress_" + currentPageNumber.toString()).className = "btn btn-success";

    // Save num page in local storage
    window.localStorage.setItem("max_page_architecture", Math.max(currentPageNumber + 1, savedPageNumber));
}

var play_show = true;
function invertButtons(){
    play_show = !play_show;
    if(play_show){
        document.querySelector("#anim-play").className="";
        document.querySelector("#anim-stop").className="hidden";
    }else{
        document.querySelector("#anim-play").className="hidden";
        document.querySelector("#anim-stop").className="";
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
    var str = "";
    if(drawing_gen.length!=solution.length){
        str += ("++++++++++++++++++++++++++++++++++++++<br />");
        str += (JSON.stringify(drawing_gen)+"<br />");
        str += ("======================================<br />");
        str += (JSON.stringify(solution)+"<br />");
        str += ("++++++++++++++++++++++++++++++++++++++<br />");
        document.querySelector("#logging").innerHTML=str;
        return false;
    }
    var t_result = [];
    for(var i=0;i<solution.length;i++){
        var draw_done = solution[i];
        //console.log("Looking for "+str_draw(draw_done));
        for(var j=0;j<drawing_gen.length;j++){
            if(is_equivalent(draw_done,drawing_gen[j])){
                //console.log("OUI");
                t_result.push(true);
                break;
            }
        }
        if(t_result.length!=i+1){
            str += ("++++++++++++++++++++++++++++++++++++++");
            str += (JSON.stringify(drawing_gen));
            str += (JSON.stringify(solution));
            str += ("--------------------------------------");
            document.querySelector("#logging").innerHTML=str;
            return false;
        }
    }
    return true;
};

function is_equivalent(d1,d2){
    //console.log("Is it "+str_draw(d2)+" ?");
    if(d1["type"]!=d2["type"]){
        return false;
    }
    switch(d1["type"]){
        case "line":
            var v_coord = (
                (
                    d1["coord1"]["x"]==d2["coord1"]["x"] && d1["coord1"]["y"]==d2["coord1"]["y"] &&
                    d1["coord2"]["x"]==d2["coord2"]["x"] && d1["coord2"]["y"]==d2["coord2"]["y"]
                ) ||
                (
                    d1["coord1"]["x"]==d2["coord2"]["x"] && d1["coord1"]["y"]==d2["coord2"]["y"] &&
                    d1["coord2"]["x"]==d2["coord1"]["x"] && d1["coord2"]["y"]==d2["coord1"]["y"]
                )
            );
            return v_coord && (d1["color"]===undefined || (d1["color"]==d2["color"]));
        break;
        case "arc":
            if(d1["size"]!=d2["size"] || d1["color"]!=d2["color"] || d1["middle"]["x"]!=d2["middle"]["x"] || d1["middle"]["y"]!=d2["middle"]["y"]){
                return false;
            }
            if(
                d1["reversed"]==d2["reversed"] && d1["start_angle"]==d2["start_angle"] && d1["end_angle"]==d2["end_angle"] ||
                d1["reversed"]!=d2["reversed"] && d1["start_angle"]==d2["end_angle"] && d1["end_angle"]==d2["start_angle"]
            ){
                return true;
            }
            return false;
        break;
        default:
            return false;
    }
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
const ADDR_ROBOTINO_LAND = "../../../assets/img/robotino/drive-1296591.svg";
const ADDR_ROBOTINO_AIR = "../../../assets/img/robotino/happy-1296589.svg";

var image_robotino;
var x;
var y;


/*
image_robotino.height = SIZE_CURSOR;
image_robotino.width = 0.921875 * SIZE_CURSOR;
*/
Crayon = {
    "leve":false,
    "color":"#000000",
    "rotation":0
};

function drawCursor(x,y) {
    x = x * pxUnit;
    y = (axisHeightLength - y) * pxUnit;

    translate(x,y);
    rotate(radians(Crayon["rotation"]));

    image(image_robotino, -(0.921875 * SIZE_CURSOR)/2, -(SIZE_CURSOR)/2, 0.921875 * SIZE_CURSOR, SIZE_CURSOR);

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

    rotate(radians(-Crayon["rotation"]));
    translate(-x,-y);
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
    invertButtons();
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
    reset(true);
    stopAnim(true);
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