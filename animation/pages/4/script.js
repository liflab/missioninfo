// Variables
var tabAnswer;
var drawResponse = function () { };
var initCurseur = { x: 0, y: 0 };
var curseur;
var currentColor = '#000000';

var animator;
var num_image = 0;
var totalFrames = 13;
var isPlaying = false;

var axisWidthLength = 12;
var axisHeightLength = 10;
var pxUnit = 50;

//////////////// To check the answer ///////////////
function initAnswer() {
    setup();
    tabAnswer = [];
    initCurseur = { x: 0, y: 0 };
    drawResponse = function () { };
}

function checkAnswer() {
    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    var circle = false;
    if (tabAnswer.length >= totalFrames) {
        circle = true;
        for (var i = 0; i < totalFrames; i++) {
            JSONstr = JSON.stringify(tabAnswer[i]);
            circle = circle && JSONstr === '{"type":"circle","pos":{"x":' + i + ',"y":5},"size":2,"couleur":"#00ff00"}';
        }
    }

    if (circle) {
        enable_next();
    }
    else {
        not_good();
    }
}
//------------------------------------------------//

///////////////// Create exercise /////////////////
function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();
    
    drawSpaceIndicators();
    drawExercise();
    currentColor = '#000000';
}

function draw() {
    clear();
    document.getElementById("anim-text").innerHTML = "Temps = " + num_image.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
    currentColor = '#000000';
    drawSpaceIndicators();
    drawExercise();
    drawResponse();

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
    currentColor = "rgba(0,255,0, 0.25)";
    drawCircle({ x: num_image, y: 5 }, 2, false);
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

    if (answer) {
        tabAnswer.push({
            type: 'square',
            pos: coord,
            size: taille,
            couleur: currentColor
        });
    }

    var sketch_coord = convertCoord(coord);
    var sketch_taille = convertSize(taille);

    rect(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille);
}

function drawRect(coord, hauteur, largeur, answer) {
    fill(currentColor).noStroke();
    rectMode(CENTER);

    if (answer) {
        tabAnswer.push({
            type: 'rect',
            pos: coord,
            h: hauteur,
            w: largeur,
            couleur: currentColor
        });
    }

    var sketch_coord = convertCoord(coord);
    var sketch_hauteur = convertSize(hauteur);
    var sketch_largeur = convertSize(largeur);

    rect(sketch_coord.x, sketch_coord.y, sketch_largeur, sketch_hauteur);
}

function drawCircle(coord, taille, answer) {
    fill(currentColor).noStroke();

    if (answer) {
        tabAnswer.push({
            type: 'circle',
            pos: coord,
            size: taille,
            couleur: currentColor
        });
    }

    var sketch_coord = convertCoord(coord);
    var sketch_taille = convertSize(taille);

    ellipse(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille);
}

function drawLine(coord_deb, coord_fin, answer) {
    stroke(currentColor).strokeWeight(10);

    if (answer) {
        tabAnswer.push({
            type: 'line',
            deb: coord_deb,
            fin: coord_fin,
            couleur: currentColor
        });
    }

    var sketch_coord_deb = convertCoord(coord_deb);
    var sketch_coord_fin = convertCoord(coord_fin);

    line(sketch_coord_deb.x, sketch_coord_deb.y, sketch_coord_fin.x, sketch_coord_fin.y);
}
//------------------------------------------------//