// Variables
var tabAnswer = [];
var drawResponse = function () { };
var currentColor = '#000000';

var slider;
var frame = 0;
var objectsPerFrame = 2;
var totalFrames = 7;
document.getElementById("anim-slider").max = totalFrames - 1 // On commence  à 0
var isPlaying = false;

var axisWidthLength = 12;
var axisHeightLength = 10;
var pxUnit = 50;

//////////////// To check the answer ///////////////
function initAnswer() {
    setup();
    tabAnswer = [];
    drawResponse = function () { };
    currentColor = '#000000';
}

function checkAnswer() {
    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    var figures = false;

    if (tabAnswer.length <= objectsPerFrame * totalFrames) {
        figures = true;

        for (var i = 0; i < totalFrames; i++) {

            var rectangle = false;
            var circle = false;

            for (var j = 0; j < objectsPerFrame; j++) {
                JSONstr = JSON.stringify(tabAnswer[i * objectsPerFrame + j]);

                if (i < 3) {
                    if (!rectangle) {
                        rectangle = JSONstr === '{"type":"square","pos":{"x":' + (3 + i) + ',"y":' + (8 - i) + '},"size":2,"couleur":"#0000ff"}';
                    }
                    if (!circle) {
                        circle = JSONstr === '{"type":"circle","pos":{"x":' + (9 - i) + ',"y":' + (2 + i) + '},"size":2,"couleur":"#00ff00"}';
                    }
                }
                else {
                    if (!rectangle) {
                        rectangle = JSONstr === '{"type":"square","pos":{"x":' + (9 - i) + ',"y":' + (2 + i) + '},"size":2,"couleur":"#ff0000"}';
                    }
                    if (!circle) {
                        circle = JSONstr === '{"type":"circle","pos":{"x":' + (3 + i) + ',"y":' + (8 - i) + '},"size":2,"couleur":"#ff0000"}';
                    }
                }
            }

            figures = figures && rectangle && circle;
        }
    }


    if (figures) {
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

    slider = select("#anim-slider");

    drawSpaceIndicators();
    drawExercise();
    fill(0, 0, 0).stroke(0, 0, 0);
}

function draw() {
    if (frame != slider.value() && slider.value() >= 0 && slider.value() < totalFrames) {
        frame = slider.value();

        clear();
        document.getElementById("anim-slider-text").innerHTML = "Temps = " + frame.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
        drawSpaceIndicators();
        drawExercise();
        fill(0, 0, 0).stroke(0, 0, 0);
        drawResponse();
    }
}

function playAnim() {
    if (!isPlaying) {
        isPlaying = true;
        document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-ban-circle">'
        slider.elt.value = 0;
        setTimeout(playAnimWorker, 500);
    }
}

function playAnimWorker() {
    if (slider.elt.value < totalFrames - 1) {
        slider.elt.value++;
        setTimeout(playAnimWorker, 500);
    } else {
        slider.elt.value = 0;
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
    if (frame < 3) {
        fill(0, 0, 255, 60).noStroke();
        drawSquare({ x: 3 + frame, y: 8 - frame }, 2, false);
        fill(0, 255, 0, 60).noStroke();
        drawCircle({ x: 9 - frame, y: 2 + frame }, 2, false);
    } else {
        fill(255, 0, 0, 60).noStroke();
        drawSquare({ x: 9 - frame, y: 2 + frame }, 2, false);
        fill(255, 0, 0, 60).noStroke();
        drawCircle({ x: 3 + frame, y: 8 - frame }, 2, false);
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

function drawSquare(coord, taille, answer) {
    noStroke();
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
    noStroke();
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
    noStroke();

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