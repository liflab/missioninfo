// Variables
var drawResponse = function () { };
var initCurseur = new Array(10);
for (var i = 0; i < 10; i++) {
    initCurseur[i] = { x: 0, y: 0 };
}
var curseur;
var currentColor = '#000000';

var animator;
var num_image = 0;
var totalFrames = 50;
var isPlaying = false;
var isGridShown = true;
var speed = 1;

var axisWidthLength = 24;
var axisHeightLength = 10;
var pxUnit = 50;

///////////////// Drawing /////////////////
function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    if (isGridShown) {
        drawSpaceIndicators();
    }
    currentColor = '#000000';
}

function draw() {
    clear();
    document.getElementById("anim-text").innerHTML = "Temps = " + num_image.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
    currentColor = '#000000';
    if (isGridShown) {
        drawSpaceIndicators();
    }
    drawResponse();
}

function playAnim() {
    if (!isPlaying) {
        curseur = initCurseur.slice();
        num_image = 0
        isPlaying = true;
        document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-pause">'
        animator = setTimeout(playAnimWorker, 500/speed);
    }
    else {
        clearTimeout(animator);
        document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-play">'
        isPlaying = false;
    }
}

function playAnimWorker() {
    draw();
    if (num_image < totalFrames - 1) {
        num_image++;
        animator = setTimeout(playAnimWorker, 500/speed);
    } else {
        document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-play">'
        isPlaying = false;
    }
}

function drawSpaceIndicators() {
    var sizeSpaceIndicators = 20;
    textAlign(CENTER);
    for (var i = 1; i < axisHeightLength; i++) {
        fill(0, 0, 0).stroke(0, 0, 0).strokeWeight(4);
        line(0, i * pxUnit, sizeSpaceIndicators, i * pxUnit);
        line((axisWidthLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(0, 0, 0).stroke(0, 0, 0, 20).strokeWeight(1);
        line(0, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(0, 0, 0).strokeWeight(0).textSize(18).textStyle(NORMAL);
        text((axisHeightLength - i), 35, i * pxUnit + 8);

    }
    for (var i = 1; i < axisWidthLength; i++) {
        fill(0, 0, 0).stroke(0, 0, 0).strokeWeight(4);
        line(i * pxUnit, 0, i * pxUnit, sizeSpaceIndicators);
        line(i * pxUnit, (axisHeightLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisHeightLength * pxUnit);

        fill(0, 0, 0).stroke(0, 0, 0, 20).strokeWeight(1);
        line(i * pxUnit, 0, i * pxUnit, axisHeightLength * pxUnit);

        fill(0, 0, 0).strokeWeight(0).textSize(18).textStyle(NORMAL);
        text(i, i * pxUnit, (axisHeightLength * pxUnit) - 30);
    }
    fill(50, 50, 255).strokeWeight(0).textSize(24).textStyle(BOLD);
    text('X', (axisWidthLength * pxUnit) / 2, (axisHeightLength * pxUnit) - 60);
    text('Y', 60, (axisHeightLength * pxUnit) / 2 + 8);
}

//------------------------------------------------//

///////////////// Helper functions /////////////////
function convertCoord(coord) {
    return {
        x: (coord.x * pxUnit),
        y: ((axisHeightLength - coord.y) * pxUnit)
    };
}

function convertSize(size) {
    return size * pxUnit;
}

function drawSquare(coord, taille, answer) {
    fill(currentColor).noStroke();
    rectMode(CENTER);

    var sketch_coord = convertCoord(coord);
    var sketch_taille = convertSize(taille);

    rect(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille);
}

function drawRect(coord, hauteur, largeur, answer) {
    fill(currentColor).noStroke();
    rectMode(CENTER);

    var sketch_coord = convertCoord(coord);
    var sketch_hauteur = convertSize(hauteur);
    var sketch_largeur = convertSize(largeur);

    rect(sketch_coord.x, sketch_coord.y, sketch_largeur, sketch_hauteur);
}

function drawRect(coord, hauteur, largeur, coins, answer) {
    fill(currentColor).noStroke();
    rectMode(CENTER);

    var sketch_coord = convertCoord(coord);
    var sketch_hauteur = convertSize(hauteur);
    var sketch_largeur = convertSize(largeur);

    rect(sketch_coord.x, sketch_coord.y, sketch_largeur, sketch_hauteur, coins);
}

function drawCircle(coord, taille, answer) {
    fill(currentColor).noStroke();

    var sketch_coord = convertCoord(coord);
    var sketch_taille = convertSize(taille);

    ellipse(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille);
}

function drawLine(coord_deb, coord_fin, answer) {
    stroke(currentColor).strokeWeight(10);

    var sketch_coord_deb = convertCoord(coord_deb);
    var sketch_coord_fin = convertCoord(coord_fin);

    line(sketch_coord_deb.x, sketch_coord_deb.y, sketch_coord_fin.x, sketch_coord_fin.y);
}

function drawMan(coord_center, color_shirt, color_pents, hands_up) {
    currentColor = "#FFC83D";
    drawCircle({ x: coord_center.x, y: coord_center.y + 0.75 }, 0.5, false);
    drawLine({ x: coord_center.x - 0.375, y: coord_center.y + 0.375 }, { x: coord_center.x - 0.625, y: coord_center.y - 0.125 }, false);
    if (hands_up) {
        drawLine({ x: coord_center.x + 0.375, y: coord_center.y + 0.375 }, { x: coord_center.x + 0.625, y: coord_center.y + 0.875 }, false);
    }
    else {
        drawLine({ x: coord_center.x + 0.375, y: coord_center.y + 0.375 }, { x: coord_center.x + 0.625, y: coord_center.y - 0.125 }, false);
    }

    currentColor = color_pents;
    drawLine({ x: coord_center.x - 0.25, y: coord_center.y - 0.5 }, { x: coord_center.x - 0.25, y: coord_center.y - 1.25 }, false);
    drawLine({ x: coord_center.x + 0.25, y: coord_center.y - 0.5 }, { x: coord_center.x + 0.25, y: coord_center.y - 1.25 }, false);

    currentColor = color_shirt;
    drawRect(coord_center, 1, 0.75, 5, false);
    drawRect({ x: coord_center.x - 0.375, y: coord_center.y + 0.375 }, 0.25, 0.25, 5, false);
    drawRect({ x: coord_center.x + 0.375, y: coord_center.y + 0.375 }, 0.25, 0.25, 5, false);
}
//------------------------------------------------//

// Adjust bodyPage height manually to allow blockly to be responsive
var bodyPageDiv = document.getElementById('blockly-div');

var onresize = function () {
    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height;
    // Mobile view -> fixed height (scroll)
    if (width < 768) {
        height = 600;
    }
    // Desktop view -> adapt height
    else {
        height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - document.getElementById('navbar').offsetHeight - document.getElementById('topPage').offsetHeight;
    }
    bodyPageDiv.style.height = height + 'px';
    console.log(height);
};
window.addEventListener('resize', onresize, false);
//##########################################################################################################

// Export blockly namespace into parent page
window.blockly_loaded = function (blockly) {
    return window.Blockly = blockly;
}
//##########################################################################################################

// Function execute when all things are loaded
function allLoaded() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
}
//##########################################################################################################

// Functions for blocks coding
function run_code() {
    document.getElementById("blockly-div").style.display = "none";
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("sketch-div").style.display = "block";
    document.getElementById("btn_change_code").style.display = "block";
    try {
        code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
        console.log(code);
        eval(code);
        save_code();
    }
    catch (err) {
        not_good();
        console.log(err);
    }
}

function change_code() {
    document.getElementById("blockly-div").style.display = "block";
    document.getElementById("btn_run_prog").style.display = "block";
    document.getElementById("sketch-div").style.display = "none";
    document.getElementById("btn_change_code").style.display = "none";
}

function save_code() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }
}

function reinit_code() {
    initAnswer();
}

function not_good() {
    bootbox.alert({
        message: '<div class="text-center">Il y a des erreurs dans ton code. Essaie encore !<br><br><img src="../../assets/img/bad.png" alt="Smiley badface" height="100%"></div>',
        backdrop: true
    });
}

function showHelp() {
    var helpfile = "animation_final_aide.md";
    var url = "../../../aide/aide.html?file=" + helpfile;

    var win = window.open(url, '_blank');
    win.focus();
}

function changeGrid(checkbox) {
    isGridShown = checkbox.checked
}

function changeSpeed(checkbox) {
    if (checkbox.value === "slow")
    {
        speed = 0.5;
    }
    else if (checkbox.value === "fast")
    {
        speed = 2;
    }
    else {
        speed = 1;
    }

}
//##########################################################################################################