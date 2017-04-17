// Function execute when all things are loaded
function allLoaded() {
    createButtons(2);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
}

var img_background;
function preload() {
    img_background = loadImage("../../assets/img/factory.svg");
}

// Functions for animation & checking
var num_image = 0;
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
        console.log(code);
        save_code();
        playAnim();
        checkAnswer();
        /*}
         catch (err) {
         popupNotGood();
         console.log(err);
         }*/
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

function playAnim() {
    if (!isPlaying) {
        num_image = 0;
        isPlaying = true;
        animator = setTimeout(playAnimWorker, 500);
    }
    else {
        clearTimeout(animator);
        isPlaying = false;
    }
}

function playAnimWorker() {
    if (num_image < logicExercise.shapes.length) {
        logicExercise.draw(num_image);

        var shape2Test = logicExercise.shapes[num_image];
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

        num_image++;

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
}


// Objects used in this activity

var colorsAllowed = ["#ff0000", "#00ff00", "#0000ff"];
var shapesAllowed = ["square", "circle", "triangle"];

function LogicSystem(bucketsProperties) {

    // Init all shapes
    this.shapes = [];
    for (var i = 0; i < shapesAllowed.length; i++) {
        for (var j = 0; j < colorsAllowed.length; j++) {
            this.shapes.push(new Shape(shapesAllowed[i], colorsAllowed[j]));
        }
    }
    arrayShuffle(this.shapes);

    // Init all buckets
    this.buckets = [];
    for (var i = 0; i < bucketsProperties.rules.length; i++) {
        this.buckets.push(new Bucket(bucketsProperties.elems[i], bucketsProperties.rules[i]));
    }

    // Display
    this.draw = function (idx_shape) {
        clear();
        background(255);
        resetMatrix();

        image(img_background, 54, 0, 493, 600);

        translate(280, 55);
        if (idx_shape >= 0 && idx_shape < this.shapes.length)
            this.shapes[idx_shape].draw();
        translate(-142, 465);
        this.buckets[0].draw();
        translate(158, 0);
        this.buckets[1].draw();
        translate(158, 0);
        this.buckets[2].draw();

    };
}

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
}

function TextShape(textStr, color) {
    this.textStr = textStr;     //Must be "square", "circle" or "triangle"
    this.color = color;
    this.size = 25;

    this.draw = function () {
        textSize(this.size);
        fill(this.color);
        noStroke();

        var txtW = textWidth(this.textStr);
        text(this.textStr, -(txtW / 2), this.size / 2);
    };
}

function Bucket(elem, rule) {
    this.elem = elem;
    this.rule = rule;

    this.draw = function () {
        this.elem.draw();
    };

    this.checkShape = function (shape) {
        return eval('(function() {' + rule + '\n}())');
    };
}

function arrayShuffle(array) {
    // fisherYates algo
    var count = array.length,
        randomnumber,
        temp;
    while (count) {
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp
    }
}