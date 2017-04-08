// To check the answer
var stringAnswer;
var canvas;
var past_code;
var past_code_generated;

var solution = [{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":-1.5707963267948966,"end_angle":-1.4835298641951802,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":-1.3089969389957472,"end_angle":-1.2217304763960306,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":-1.0471975511965976,"end_angle":-0.9599310885968813,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":-0.7853981633974483,"end_angle":-0.6981317007977318,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":-0.5235987755982988,"end_angle":-0.4363323129985824,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":-0.2617993877991494,"end_angle":-0.17453292519943295,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":0,"end_angle":0.08726646259971647,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":0.2617993877991494,"end_angle":0.3490658503988659,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":0.5235987755982988,"end_angle":0.6108652381980153,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":0.7853981633974483,"end_angle":0.8726646259971648,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":1.0471975511965976,"end_angle":1.1344640137963142,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":1.3089969389957472,"end_angle":1.3962634015954636,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":1.5707963267948966,"end_angle":1.6580627893946132,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":1.8325957145940461,"end_angle":1.9198621771937625,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":2.0943951023931953,"end_angle":2.1816615649929116,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":2.356194490192345,"end_angle":2.443460952792061,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":2.6179938779914944,"end_angle":2.705260340591211,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":2.8797932657906435,"end_angle":2.9670597283903604,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":3.141592653589793,"end_angle":3.2288591161895095,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":3.4033920413889422,"end_angle":3.490658503988659,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":3.6651914291880923,"end_angle":3.752457891787808,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":3.9269908169872414,"end_angle":4.014257279586958,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":4.1887902047863905,"end_angle":4.276056667386107,"reversed":false},{"type":"arc","color":"#ff0000","middle":{"x":8,"y":5},"size":4,"start_angle":4.4505895925855405,"end_angle":4.537856055185257,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":4.71238898038469,"end_angle":4.799655442984406,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":4.97418836818384,"end_angle":5.061454830783555,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":5.235987755982989,"end_angle":5.323254218582705,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":5.497787143782138,"end_angle":5.585053606381854,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":5.759586531581287,"end_angle":5.8468529941810035,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":6.021385919380437,"end_angle":6.108652381980153,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":6.283185307179586,"end_angle":6.3704517697793035,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":6.544984694978735,"end_angle":6.632251157578453,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":6.8067840827778845,"end_angle":6.894050545377602,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":7.068583470577034,"end_angle":7.155849933176751,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":7.3303828583761845,"end_angle":7.4176493209759,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":7.592182246175334,"end_angle":7.67944870877505,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":7.853981633974483,"end_angle":7.941248096574199,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":8.115781021773632,"end_angle":8.203047484373348,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":8.377580409572781,"end_angle":8.464846872172497,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":8.639379797371932,"end_angle":8.726646259971647,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":8.901179185171081,"end_angle":8.988445647770797,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":9.16297857297023,"end_angle":9.250245035569947,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":9.42477796076938,"end_angle":9.512044423369096,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":9.68657734856853,"end_angle":9.773843811168245,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":9.94837673636768,"end_angle":10.035643198967394,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":10.210176124166829,"end_angle":10.297442586766545,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":10.471975511965978,"end_angle":10.559241974565694,"reversed":false},{"type":"arc","color":"#0000ff","middle":{"x":8,"y":5},"size":5,"start_angle":10.733774899765127,"end_angle":10.821041362364843,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":10.995574287564276,"end_angle":11.082840750163992,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":11.257373675363425,"end_angle":11.344640137963141,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":11.519173063162574,"end_angle":11.606439525762292,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":11.780972450961725,"end_angle":11.868238913561441,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":12.042771838760874,"end_angle":12.13003830136059,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":12.304571226560023,"end_angle":12.39183768915974,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":12.566370614359172,"end_angle":12.653637076958889,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":12.828170002158322,"end_angle":12.915436464758038,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":13.08996938995747,"end_angle":13.177235852557187,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":13.35176877775662,"end_angle":13.439035240356338,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":13.613568165555769,"end_angle":13.700834628155487,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":13.875367553354918,"end_angle":13.962634015954636,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":14.137166941154067,"end_angle":14.224433403753785,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":14.39896632895322,"end_angle":14.486232791552935,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":14.660765716752369,"end_angle":14.748032179352084,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":14.922565104551518,"end_angle":15.009831567151233,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":15.184364492350667,"end_angle":15.271630954950382,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":15.446163880149816,"end_angle":15.533430342749531,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":15.707963267948966,"end_angle":15.79522973054868,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":15.969762655748115,"end_angle":16.05702911834783,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":16.231562043547264,"end_angle":16.318828506146982,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":16.49336143134641,"end_angle":16.58062789394613,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":16.755160819145562,"end_angle":16.84242728174528,"reversed":false},{"type":"arc","color":"#ffff00","middle":{"x":8,"y":5},"size":6,"start_angle":17.016960206944713,"end_angle":17.104226669544428,"reversed":false}];
var solution_example = [{"type":"crayon_color","value":"#ff0000"},{"type":"boucle","nb_iteration":24,"value":[ {"type":"arc","taille":4,"rotation": {"type":"tourner","value":5}},{"type":"tourner","value":10}]},{"type":"crayon_color","value":"#0000ff"},{"type":"boucle","nb_iteration":24,"value":[ {"type":"arc","taille":5,"rotation": {"type":"tourner","value":5}},{"type":"tourner","value":10}]},{"type":"crayon_color","value":"#ffff00"},{"type":"boucle","nb_iteration":24,"value":[ {"type":"arc","taille":6,"rotation": {"type":"tourner","value":5}},{"type":"tourner","value":10}]}];

var Crayon;
//------------------------------------------------//
///////////////// Create exercise /////////////////
var axisWidthLength = 16;
var axisHeightLength = 14;
var pxUnit = 50;

const START_COORD = {"x":8,"y":5};

var draw_saved = [];
var draw_gen_saved = [];



function preload(){
    image_robotino = loadImage(ADDR_ROBOTINO_LAND);
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
    stroke(255,0,0,45).noFill();

    drawArc(8,5,4,-1.5707963267948966,-1.4835298641951802,false);
    drawArc(8,5,4,-1.3089969389957472,-1.2217304763960306,false);
    drawArc(8,5,4,-1.0471975511965976,-0.9599310885968813,false);
    drawArc(8,5,4,-0.7853981633974483,-0.6981317007977318,false);
    drawArc(8,5,4,-0.5235987755982988,-0.4363323129985824,false);
    drawArc(8,5,4,-0.2617993877991494,-0.17453292519943295,false);
    drawArc(8,5,4,0,0.08726646259971647,false);
    drawArc(8,5,4,0.2617993877991494,0.3490658503988659,false);
    drawArc(8,5,4,0.5235987755982988,0.6108652381980153,false);
    drawArc(8,5,4,0.7853981633974483,0.8726646259971648,false);
    drawArc(8,5,4,1.0471975511965976,1.1344640137963142,false);
    drawArc(8,5,4,1.3089969389957472,1.3962634015954636,false);
    drawArc(8,5,4,1.5707963267948966,1.6580627893946132,false);
    drawArc(8,5,4,1.8325957145940461,1.9198621771937625,false);
    drawArc(8,5,4,2.0943951023931953,2.1816615649929116,false);
    drawArc(8,5,4,2.356194490192345,2.443460952792061,false);
    drawArc(8,5,4,2.6179938779914944,2.705260340591211,false);
    drawArc(8,5,4,2.8797932657906435,2.9670597283903604,false);
    drawArc(8,5,4,3.141592653589793,3.2288591161895095,false);
    drawArc(8,5,4,3.4033920413889422,3.490658503988659,false);
    drawArc(8,5,4,3.6651914291880923,3.752457891787808,false);
    drawArc(8,5,4,3.9269908169872414,4.014257279586958,false);
    drawArc(8,5,4,4.1887902047863905,4.276056667386107,false);
    drawArc(8,5,4,4.4505895925855405,4.537856055185257,false);
    stroke(0,0,255,45).noFill();
    drawArc(8,5,5,4.71238898038469,4.799655442984406,false);
    drawArc(8,5,5,4.97418836818384,5.061454830783555,false);
    drawArc(8,5,5,5.235987755982989,5.323254218582705,false);
    drawArc(8,5,5,5.497787143782138,5.585053606381854,false);
    drawArc(8,5,5,5.759586531581287,5.8468529941810035,false);
    drawArc(8,5,5,6.021385919380437,6.108652381980153,false);
    drawArc(8,5,5,6.283185307179586,6.3704517697793035,false);
    drawArc(8,5,5,6.544984694978735,6.632251157578453,false);
    drawArc(8,5,5,6.8067840827778845,6.894050545377602,false);
    drawArc(8,5,5,7.068583470577034,7.155849933176751,false);
    drawArc(8,5,5,7.3303828583761845,7.4176493209759,false);
    drawArc(8,5,5,7.592182246175334,7.67944870877505,false);
    drawArc(8,5,5,7.853981633974483,7.941248096574199,false);
    drawArc(8,5,5,8.115781021773632,8.203047484373348,false);
    drawArc(8,5,5,8.377580409572781,8.464846872172497,false);
    drawArc(8,5,5,8.639379797371932,8.726646259971647,false);
    drawArc(8,5,5,8.901179185171081,8.988445647770797,false);
    drawArc(8,5,5,9.16297857297023,9.250245035569947,false);
    drawArc(8,5,5,9.42477796076938,9.512044423369096,false);
    drawArc(8,5,5,9.68657734856853,9.773843811168245,false);
    drawArc(8,5,5,9.94837673636768,10.035643198967394,false);
    drawArc(8,5,5,10.210176124166829,10.297442586766545,false);
    drawArc(8,5,5,10.471975511965978,10.559241974565694,false);
    drawArc(8,5,5,10.733774899765127,10.821041362364843,false);
    stroke(255,255,0,45).noFill();
    drawArc(8,5,6,10.995574287564276,11.082840750163992,false);
    drawArc(8,5,6,11.257373675363425,11.344640137963141,false);
    drawArc(8,5,6,11.519173063162574,11.606439525762292,false);
    drawArc(8,5,6,11.780972450961725,11.868238913561441,false);
    drawArc(8,5,6,12.042771838760874,12.13003830136059,false);
    drawArc(8,5,6,12.304571226560023,12.39183768915974,false);
    drawArc(8,5,6,12.566370614359172,12.653637076958889,false);
    drawArc(8,5,6,12.828170002158322,12.915436464758038,false);
    drawArc(8,5,6,13.08996938995747,13.177235852557187,false);
    drawArc(8,5,6,13.35176877775662,13.439035240356338,false);
    drawArc(8,5,6,13.613568165555769,13.700834628155487,false);
    drawArc(8,5,6,13.875367553354918,13.962634015954636,false);
    drawArc(8,5,6,14.137166941154067,14.224433403753785,false);
    drawArc(8,5,6,14.39896632895322,14.486232791552935,false);
    drawArc(8,5,6,14.660765716752369,14.748032179352084,false);
    drawArc(8,5,6,14.922565104551518,15.009831567151233,false);
    drawArc(8,5,6,15.184364492350667,15.271630954950382,false);
    drawArc(8,5,6,15.446163880149816,15.533430342749531,false);
    drawArc(8,5,6,15.707963267948966,15.79522973054868,false);
    drawArc(8,5,6,15.969762655748115,16.05702911834783,false);
    drawArc(8,5,6,16.231562043547264,16.318828506146982,false);
    drawArc(8,5,6,16.49336143134641,16.58062789394613,false);
    drawArc(8,5,6,16.755160819145562,16.84242728174528,false);
    drawArc(8,5,6,17.016960206944713,17.104226669544428,false);

    strokeWeight(0);
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
