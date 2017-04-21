// Function execute when all things are loaded
function allLoaded() {
    createButtons(2);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
}

var img_background;
var img_bucket;
var img_status_robotino;

var items = [];
var _items = [];
function preload() {
    img_background      = loadImage("../../assets/img/background/factory.svg");
    img_bucket          = loadImage("../../assets/img/background/cup.svg");
    img_status_robotino = loadImage("../../assets/img/uncompleted/uncompleted_"+currentPageNumber+".png");

    switch(currentPageNumber){
        case 1:
            items.push({"img":loadImage("../../assets/img/antenna.png")     ,"shape":"other"  ,"color":"blue"});
            items.push({"img":loadImage("../../assets/img/arm.png")         ,"shape":"arm"      ,"color":"orange"});
            items.push({"img":loadImage("../../assets/img/eye.png")         ,"shape":"other"      ,"color":"blue"});
            items.push({"img":loadImage("../../assets/img/eye_white.png")   ,"shape":"other"      ,"color":"white"});
            items.push({"img":loadImage("../../assets/img/foot_other.png")  ,"shape":"leg"     ,"color":"grey"});
            items.push({"img":loadImage("../../assets/img/hand.png")        ,"shape":"other"     ,"color":"white"});
            items.push({"img":loadImage("../../assets/img/hat.png")         ,"shape":"other"      ,"color":"orange"});
            items.push({"img":loadImage("../../assets/img/head.png")        ,"shape":"head"     ,"color":"blue"});
            items.push({"img":loadImage("../../assets/img/helmet_r2d2.png") ,"shape":"head"     ,"color":"blue"});
            items.push({"img":loadImage("../../assets/img/wheel.png")       ,"shape":"other"     ,"color":"grey"});
        break;
    }

}

// Functions for animation & checking
var num_item = 0;
var isPlaying = false;
var animator;

var logicExercise;
var res = true;
var code = "";

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
        code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
        var f = eval("(function(item){\n"+code+"})");
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

    if (res) {
        popupGood();
    }
    else {
        popupNotGood();
    }
}

function playAnim(func) {
    if (!isPlaying) {
        num_item = 0;
        isPlaying = true;
        _items = JSON.parse(JSON.stringify(items));

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
        return;
    }

    var item = _items.shift();
    var bucket_predicted = func(item);
    console.log(bucket_predicted);
    animator = setTimeout(function(){
        playAnimWorker(func);
    }, 500);

    /*
    if (num_item < logicExercise.shapes.length) {
        logicExercise.draw(num_item);

        var shape2Test = logicExercise.shapes[num_item];
        var idx_bucket = eval('(function() {' + code + '\n}())');

        if (idx_bucket === undefined) {
            // On vérifie tous les cas
            var res_undefined = false;
            for (var i = 0; i < logicExercise.buckets.length; i++) {
                res_undefined = res_undefined || logicExercise.buckets[i].checkShape(shape2Test);
            }
            res = !res_undefined;
            console.log("no bucket");
        } else {
            console.log("bucket num : " + idx_bucket);
            res = logicExercise.buckets[idx_bucket - 1].checkShape(shape2Test);// Array begins at 0
        }

        num_item++;

        if (res) {
            animator = setTimeout(playAnimWorker, 2000);
        }
        else {
            isPlaying = false;
        }
    }
    else {
        isPlaying = false;
    }
    */
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
            image(img_bucket,margin+i*(margin+width_bucket),600-height_bucket,width_bucket,height_bucket);
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

    this.draw = function () {
        this.elem.draw();
    };

    this.check = function (item) {
        return this._check(item);
    };

    this._check = function(item){
        var f = eval('function(item) {' + rule + '\n}');
        console.log(f);
        console.log(f(item));
        return f(item);
    }
}