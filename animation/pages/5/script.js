//////////////// To check the answer ///////////////
var tabAnswer;
var drawResponse = function () { };

function initAnswer() {
    setup();
    tabAnswer = [];
    drawResponse = function () { };
}

function checkAnswer() {
    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    var circles = false;

    if (tabAnswer.length <= 18) {
        circles = true;

        for (var i = 0; i <= 5; i++) {

            var tete = false;
            var oreilleG = false;
            var oreilleD = false;

            for (var j = 0; j <= 2; j++) {
                JSONstr = JSON.stringify(tabAnswer[i * 3 + j]);

                if (!tete) {
                    tete = JSONstr === '{"type":"circle","pos":{"x":' + (4 + i) + ',"y":' + (7 - i) + '},"size":4,"couleur":"#0000ff"}';
                }
                if (!oreilleG) {
                    oreilleG = JSONstr === '{"type":"circle","pos":{"x":' + (2 + i) + ',"y":' + (9 - i) + '},"size":2,"couleur":"#ff0000"}';
                }
                if (!oreilleD) {
                    oreilleD = JSONstr === '{"type":"circle","pos":{"x":' + (6 + i) + ',"y":' + (9 - i) + '},"size":2,"couleur":"#ff0000"}';
                }
            }

            circles = circles && tete && oreilleG && oreilleD;
        }
    }

    if (circles) {
        enable_next();
    }
    else {
        not_good();
    }
}

var currentColor = '#000000';
var frame = 0;

//------------------------------------------------//

///////////////// Create exercise /////////////////
var axisWidthLength = 12;
var axisHeightLength = 10;
var pxUnit = 50;
var slider;

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');

    slider = select("#anim-slider");

    drawSpaceIndicators();
    drawExercise();
    fill(0, 0, 0).stroke(0, 0, 0);
}

function draw() {
    if (frame != slider.value() && slider.value() >= 0 && slider.value() <= 12) {
        frame = slider.value();

        clear();
        document.getElementById("anim-slider-text").innerHTML = "Temps = " + frame.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
        drawSpaceIndicators();
        drawExercise();
        drawResponse();
    }
}

var isPlaying = false;
function playAnim() {
    if (!isPlaying) {
        isPlaying = true;
        document.getElementById("anim-play").innerHTML = '<span class="glyphicon glyphicon-ban-circle">'
        slider.elt.value = 0;
        setTimeout(playAnimWorker, 500);
    }
}

function playAnimWorker() {
    if (slider.elt.value < 5) {
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
    fill(0, 0, 255, 60).noStroke();
    drawCircle({ x: 4 + frame, y: 7 - frame }, 4, false);
    fill(255, 0, 0, 60).noStroke();
    drawCircle({ x: 2 + frame, y: 9 - frame }, 2, false);
    drawCircle({ x: 6 + frame, y: 9 - frame }, 2, false);
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