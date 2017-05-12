// Function execute when all things are loaded
function allLoaded() {
    createButtons(7);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
    if(text_info !== undefined && text_info!=null){
        popupInfo(text_info);
    }
}

var img_background;

var img_factory;
var img_factory_red;

var img_bucket;
var img_bucket_red;
var img_status_robotino;

var items = [];
var _items = [];

var answers = [];

var moving_interval;
const NB_ITERATION_MOVING_ITEM = 30;
const FRAME_PER_SECOND         = 30;

function preload() {
    img_factory         = loadImage("../../assets/img/background/factory.svg");
    img_factory_red     = loadImage("../../assets/img/background/factory_red.svg");
    img_bucket          = loadImage("../../assets/img/background/cup.png");
    img_bucket_red      = loadImage("../../assets/img/background/cup_red.png");
    img_status_robotino = loadImage("../../assets/img/uncompleted/uncompleted_"+currentPageNumber+".png");

    img_background = img_factory;
    _preload();

    for(var i=0;i<items.length;i++){
        items[i].img = loadImage(items[i].img_url);
    }

}

// Functions for animation et checking
var num_item = 0;
var isPlaying = false;
var animator;

var logicExercise;
var code = "";
var required_box = [];


// Functions for blocks coding
function run_code() {
    // Wait to finish animation before another run
    var status = false;
    try {
        status = isPlaying;
    }
    catch (err) {
    }

    if (!status) {
        //try {
        answers = [];
        code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
        code = "(function(item){\n"+code+"\nreturn null;})";

        var f = eval(code);
        save_code();
        playAnim(f);
        checkAnswer();
    }
}

function save_code() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }
}

function checkAnswer() {
    if (logicExercise === undefined) {
        return;
    }

    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }


    console.log(code);

    var res = true;
    for(var i=0;i<answers.length;i++){
        if(!answers[i]){
            res = false;
            break;
        }
    }

    if(!res){
        popupNotGood("Au moins un des objets n'est pas bien trié !");
        document.querySelector("#btn_run").style.display="block";
        document.querySelector("#btn_next_exercise").style.display="none";
        return;
    }

    console.log(required_box);
    if(required_box.length>0){
        for(var i=0;i<required_box.length;i++){
            var r = required_box[i];
            var val = r.value;
            var name = r.name;
            if(code.indexOf(val)==-1){
                popupNotGood("Il manque le bloc \""+name+"\" !");
                document.querySelector("#btn_run").style.display="block";
                document.querySelector("#btn_next_exercise").style.display="none";
                return;
            }
        }
    }

    popupGood();
    document.querySelector("#btn_run").style.display="none";
    document.querySelector("#btn_next_exercise").style.display="block";
    window.localStorage.setItem("max_page_logique", Math.max(currentPageNumber + 1, savedPageNumber));
}

function playAnim(func) {
    if (!isPlaying) {
        num_item = 0;
        isPlaying = true;
        _items = JSON.parse(JSON.stringify(items));
        for( var i =0;i<_items.length;i++){
            _items[i]["img"] = items[i]["img"];
        }

        animator = setTimeout(function(){
            playAnimWorker(func);
        }, 500);
    }
    else {
        clearTimeout(animator);
        isPlaying = false;
    }
}

function playAnimWorker(func) {
    if(_items.length ==0){
        isPlaying = false;
        logicExercise.draw();
        return;
    }

    var item = _items.shift();
    var bucket_predicted = func(item);

    var is_allowed = false;
    if(bucket_predicted != null){
        is_allowed = logicExercise.buckets[bucket_predicted].check(item);
    }
    answers.push(is_allowed);

    console.log(bucket_predicted+" => "+is_allowed);


    var w = item.img.width;
    var h = item.img.height;
    if(h > w && h>50){
        w = w*50/h;
        h = 50;
    }
    if(w > h && w > 50){
        h = h*50/w;
        w = 50;
    }
    fill(255).noStroke();
    rect(234,18,97,58);
    image(item.img,width/2-w/2-20,20,w,h);

    iteration_pipe  = 0;
    if(bucket_predicted!=null){
        moving_interval = setInterval(function(){
            inPipe(item,bucket_predicted,w,h);
        },1000/FRAME_PER_SECOND);
    }else{
        img_background = img_factory_red;
        setTimeout(function(){
            img_background = img_factory;
        },2000);
    }

    setTimeout(function(){
        if(!is_allowed && bucket_predicted!=null){
            logicExercise.buckets[bucket_predicted].red = true;
            setTimeout(function(){
                logicExercise.buckets[bucket_predicted].red = false;
            },2000);
        }
        clearInterval(moving_interval);


        if(!is_allowed || bucket_predicted == null){
            isPlaying = false;
            logicExercise.draw();
        }else{
            animator = setTimeout(function(){
                playAnimWorker(func);
            }, 500);
        }

    },NB_ITERATION_MOVING_ITEM*1000/FRAME_PER_SECOND);

}

var iteration_pipe = 0;

function inPipe(item, bucket,width_image,height_image){
    var from = logicExercise.joint_factory;
    var to   = logicExercise.joints_buckets[bucket];

    var diff_x = (to.x-from.x)/NB_ITERATION_MOVING_ITEM;
    var diff_y = (to.y-from.y)/NB_ITERATION_MOVING_ITEM;

    logicExercise.draw();

    image(item.img,width/2-width_image/2-20,20,width_image,height_image);
    image(item.img,from.x+diff_x*iteration_pipe-width_image/2,from.y+diff_y*iteration_pipe-height_image/2,width_image,height_image);

    //console.log("{\"x\":"+from.x+",\"y\":"+from.y+"} // {\"x\":"+to.x+",\"y\":"+to.y+"} == {\"x\":"+diff_x+",\"y\":"+diff_y+"}");
    iteration_pipe++;
}


// Objects used in this activity

function LogicSystem(bucketsProperties) {

    this.buckets_center = [];
    this.joint_factory  = {"x":0,"y":0};
    this.joints_buckets = [];


    // Init all buckets
    this.buckets = [];
    for (var i = 0; i < bucketsProperties.rules.length; i++) {
        this.buckets.push(new Bucket(bucketsProperties.elems[i], bucketsProperties.rules[i]));
    }

    // Display
    this.draw = function (idx_shape) {
        this.joint_factory = {"x":width/2-JOINT_SIZE/2,"y":FACTORY_HEIGHT};

        clear();
        background(255);
        resetMatrix();

        image(img_background, FACTORY_X, FACTORY_Y, FACTORY_WIDTH, FACTORY_HEIGHT);
        image(img_status_robotino, 0, 0, 100, 114);


        var margin = 20;
        var width_bucket = (width-margin*(1+this.buckets.length)) / this.buckets.length;
        var height_bucket = width_bucket*1.41;

        if(height_bucket > 150){
            height_bucket = 150;
            width_bucket = height_bucket * 0.71;
            margin = (width - (width_bucket*this.buckets.length))/(this.buckets.length+1);
        }

        for(var i=0;i<this.buckets.length;i++){
            if(this.buckets[i].red){
                image(img_bucket_red,margin+i*(margin+width_bucket),600-height_bucket,width_bucket,height_bucket);
            }else{
                image(img_bucket,margin+i*(margin+width_bucket),600-height_bucket,width_bucket,height_bucket);
            }
            if(this.buckets_center.length<this.buckets.length){
                this.buckets_center.push({"x":margin+i*(margin+width_bucket)+width_bucket/2,"y":600-height_bucket/2});
                this.joints_buckets.push({"x":margin+i*(margin+width_bucket)+width_bucket/2,"y":600-height_bucket-10});
            }
        }


        stroke(0,0,0).fill(60,60,60);

        arc(this.joint_factory.x,this.joint_factory.y,JOINT_SIZE,JOINT_SIZE,0,Math.PI*2);
        for(var i=0;i<this.buckets.length;i++){

            arc(this.joints_buckets[i].x,this.joints_buckets[i].y,JOINT_SIZE,JOINT_SIZE,0,Math.PI*2);
            strokeWeight(JOINT_SIZE+4);
            stroke(0,0,0);
            line(this.joints_buckets[i].x,this.joints_buckets[i].y,this.joint_factory.x,this.joint_factory.y);
            strokeWeight(JOINT_SIZE);
            stroke(60,60,60);
            line(this.joints_buckets[i].x,this.joints_buckets[i].y,this.joint_factory.x,this.joint_factory.y);
            strokeWeight(1);
            this.buckets[i].elem.draw(this.buckets_center[i].x,this.buckets_center[i].y);
        }

    };
}
/*
function Shape(style, color) {
    this.style = style;     //Must be "square", "circle" or "triangle"
    this.color = color;
    this.size = 50;

    this.draw = function () {
        fill(this.color);
        noStroke();

        if (this.style === "square") {
            rectMode(CENTER);
            rect(0, 0, this.size, this.size);
        }
        else if (this.style === "circle") {
            ellipse(0, 0, this.size, this.size);
        }
        else if (this.style === "triangle") {
            triangle(-this.size / 2, +this.size / 2, +this.size / 2, +this.size / 2, 0, -this.size / 2);
        }
    };
}*/

function TextShape(textStr, color) {
    this.textStr = textStr;     //Must be "square", "circle" or "triangle"
    this.color = color;
    this.size = 25;

    this.draw = function (x,y) {
        textSize(this.size);
        fill(this.color);
        stroke(0,0,0);
        strokeWeight(5);
        textFont("white");

        var txtW = textWidth(this.textStr);
        text(this.textStr, x-(txtW/2),y);
    };
}

function Bucket(elem, rule) {
    this.elem = elem;
    this.rule = rule;
    this.red  = false;

    this.draw = function () {
        this.elem.draw();
    };

    this.check = function (item) {
        var f = eval('(function(item) {' + this.rule + '\n})');
        return f(item);
    };
}

function popupItems(){
    var str = "";
    str += "<h3>Objets</h3>";
    str += "<div class=\"text-center\">";
        for(var i=0;i<items.length;i++){
            var item = items[i];
            str += "<img class='margin-right' src='"+item.img_url+"' alt='Objet' height='30' />";
        }
    str += "</div>";
    bootbox.alert(str);
}