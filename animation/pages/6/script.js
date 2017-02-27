// Variables
var tabAnswer;
var drawResponse = function () { };
var initCurseur = new Array(10);
for (var i = 0; i < 10; i++) {
    initCurseur[i] = { x: 0, y: 0 };
}
var curseur;
var currentColor = '#000000';

var animator;
var num_image = 0;
var objectsPerFrame = 4;
var totalFrames = 7;
var isPlaying = false;

var axisWidthLength = 14;
var axisHeightLength = 11;
var pxUnit = 50;

//////////////// To check the answer ///////////////
function initAnswer() {
    setup();
    tabAnswer = [];
    var initCurseur = new Array(10);
    for (var i = 0; i < 10; i++) {
        initCurseur[i] = { x: 0, y: 0 };
    }
    drawResponse = function () { };
}

function checkAnswer() {
    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    var face = false;

    if (tabAnswer.length >= objectsPerFrame * totalFrames) {
        face = true;

        for (var i = 0; i < totalFrames; i++) {

            var lineR = false;
            var lineG = false;
            var circleR = false;
            var circleG = false;

            for (var j = 0; j < objectsPerFrame; j++) {
                JSONstr = JSON.stringify(tabAnswer[i * objectsPerFrame + j]);

                if (!lineR) {
                    lineR = (JSONstr === '{"type":"line","deb":{"x":6,"y":7},"fin":{"x":2,"y":' + (5 + i / 2) + '},"couleur":"#ff0000"}') || (JSONstr === '{"type":"line","deb":{"x":2,"y":' + (5 + i / 2) + '},"fin":{"x":6,"y":7},"couleur":"#ff0000"}');
                }
                if (!lineG) {
                    lineG = (JSONstr === '{"type":"line","deb":{"x":8,"y":7},"fin":{"x":12,"y":' + (5 + i / 2) + '},"couleur":"#00ff00"}') || (JSONstr === '{"type":"line","deb":{"x":12,"y":' + (5 + i / 2) + '},"fin":{"x":8,"y":7},"couleur":"#00ff00"}');
                }
                if (!circleR) {
                    circleR = JSONstr === '{"type":"circle","pos":{"x":5,"y":5},"size":2,"couleur":"#ff0000"}';
                }
                if (!circleG) {
                    circleG = JSONstr === '{"type":"circle","pos":{"x":9,"y":5},"size":2,"couleur":"#00ff00"}';
                }
            }

            face = face && lineR && lineG && circleG && circleG;
        }
    }

    if (face) {
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
        curseur = initCurseur.slice();
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
    if (num_image < totalFrames) {
        num_image++;
        animator = setTimeout(playAnimWorker, 500);
    }
    else {
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
    currentColor = "rgba(255,0,0, 0.25)";
    drawLine({ x: 2, y: 5 + num_image / 2 }, { x: 6, y: 7 }, false);
    drawCircle({ x: 5, y: 5 }, 2, false);
    currentColor = "rgba(0,255,0, 0.25)";
    drawLine({ x: 8, y: 7 }, { x: 12, y: 5 + num_image / 2 }, false);
    drawCircle({ x: 9, y: 5 }, 2, false);
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