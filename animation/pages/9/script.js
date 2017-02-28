// Variables
var tabAnswer = [
    { x: 2, y: 5 },
    { x: 3, y: 2 },
    { x: 5, y: 3 },
    { x: 7, y: 6 },
    { x: 9, y: 1 },
    { x: 11, y: 4 }
];
var drawResponse = function () { };
var initCurseur = { x: 0, y: 0 };
var curseur;
var currentColor = '#000000';

var animator;
var num_image = 0;
var totalFrames = 25;
var isPlaying = false;

var axisWidthLength = 12;
var axisHeightLength = 10;
var pxUnit = 50;

//////////////// To check the answer ///////////////
function initAnswer() {
    setup();
    tabAnswer = [
        { x: 2, y: 5 },
        { x: 3, y: 2 },
        { x: 5, y: 3 },
        { x: 7, y: 6 },
        { x: 9, y: 1 },
        { x: 11, y: 4 }
    ];
    initCurseur = { x: 0, y: 0 };
    drawResponse = function () { };
    draw();
}

function checkPos() {
    if (curseur) {
        if (tabAnswer.length > 0) {
            for (var i = 0; i < tabAnswer.length; i++) {
                if (Math.abs(tabAnswer[i].x - curseur.x) <= 0.75 && Math.abs(tabAnswer[i].y - curseur.y) <= 1) {
                    tabAnswer.splice(i, 1);
                    console.log("touché");
                }
            }
        }
        else {
            clearTimeout(animator);
            document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-play">'
            isPlaying = false;
        }
    }
}

function checkAnswer() { }
//------------------------------------------------//

///////////////// Create exercise /////////////////
function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    drawExercise();
    drawSpaceIndicators();
    currentColor = '#000000';
}

function draw() {
    clear();
    document.getElementById("anim-text").innerHTML = "Temps = " + num_image.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
    currentColor = '#000000';
    drawExercise();
    drawSpaceIndicators();
    drawResponse();

    checkPos();
}

function playAnim() {
    if (!isPlaying) {
        curseur = initCurseur;
        num_image = 0
        isPlaying = true;
        document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-pause">'
        animator = setTimeout(playAnimWorker, 500);
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
        animator = setTimeout(playAnimWorker, 500);
    } else {
        // reinit view
        curseur = initCurseur;
        num_image = 0
        draw();

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

function drawExercise() {
    background(111, 210, 228);
    currentColor = "#168C42";
    drawRect({ x: 6, y: 3 }, 6, 12, 0, false);
    currentColor = "#E58000";
    drawCircle({ x: 12, y: 10 }, 3, false);

    currentColor = "#FF0000";
    for (var i = 0; i < tabAnswer.length; i++) {
        drawSquare(tabAnswer[i], 0.25, 5, false);
    }
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

function drawSquare(coord, taille, coins, answer) {
    fill(currentColor).noStroke();
    rectMode(CENTER);

    var sketch_coord = convertCoord(coord);
    var sketch_taille = convertSize(taille);

    rect(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille, coins);
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

function drawTriangle(coord_1, coord_2, coord_3, answer) {
    fill(currentColor).noStroke();

    var sketch_coord_1 = convertCoord(coord_1);
    var sketch_coord_2 = convertCoord(coord_2);
    var sketch_coord_3 = convertCoord(coord_3);

    triangle(sketch_coord_1.x, sketch_coord_1.y, sketch_coord_2.x, sketch_coord_2.y, sketch_coord_3.x, sketch_coord_3.y);
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

function drawHouse(coord_center, color_base, color_roof) {
    currentColor = color_base;
    drawSquare(coord_center, 2, false);
    currentColor = color_roof;
    drawTriangle({ x: coord_center.x - 1.5, y: coord_center.y + 1 }, { x: coord_center.x + 1.5, y: coord_center.y + 1 }, { x: coord_center.x, y: coord_center.y + 2 });
}
//------------------------------------------------//