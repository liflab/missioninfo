//////////////// To check the answer ///////////////
var tabAnswer;

function initAnswer() {
    setup();
    tabAnswer = [];
}

function checkAnswer() {
    var tete = false;
    var corps = false;
    var brasG = false;
    var brasD = false;
    var jambeG = false;
    var jambeD = false;

    if (tabAnswer.length == 6) {
        for (var i = 0; i < tabAnswer.length; i++) {
            JSONstr = JSON.stringify(tabAnswer[i]);

            if (!tete) {
                tete = JSONstr === '{"type":"circle","pos":{"x":12,"y":16},"size":2,"couleur":"#ff9966"}';
            }
            if (!corps) {
                corps = JSONstr === '{"type":"rect","pos":{"x":12,"y":11},"h":8,"w":4,"couleur":"#00ff00"}';
            }
            if (!brasG) {
                brasG = (JSONstr === '{"type":"line","deb":{"x":6,"y":12},"fin":{"x":10,"y":14},"couleur":"#ff0000"}') || (JSONstr === '{"type":"line","deb":{"x":10,"y":14},"fin":{"x":6,"y":12},"couleur":"#ff0000"}');
            }
            if (!brasD) {
                brasD = (JSONstr === '{"type":"line","deb":{"x":18,"y":12},"fin":{"x":14,"y":14},"couleur":"#ff0000"}') || (JSONstr === '{"type":"line","deb":{"x":14,"y":14},"fin":{"x":18,"y":12},"couleur":"#ff0000"}');
            }
            if (!jambeG) {
                jambeG = (JSONstr === '{"type":"line","deb":{"x":11,"y":2},"fin":{"x":11,"y":7},"couleur":"#0000ff"}') || (JSONstr === '{"type":"line","deb":{"x":11,"y":7},"fin":{"x":11,"y":2},"couleur":"#0000ff"}');
            }
            if (!jambeD) {
                jambeD = (JSONstr === '{"type":"line","deb":{"x":13,"y":2},"fin":{"x":13,"y":7},"couleur":"#0000ff"}') || (JSONstr === '{"type":"line","deb":{"x":13,"y":7},"fin":{"x":13,"y":2},"couleur":"#0000ff"}');
            }
        }
    }

    if (tete && corps && brasG && brasD && jambeG && jambeD) {
        enable_next();
    }
    else {
        not_good();
    }
}

var currentColor = '#000000';

//------------------------------------------------//

///////////////// Create exercise /////////////////
var axisWidthLength = 24;
var axisHeightLength = 18;
var pxUnit = 40;

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    drawSpaceIndicators();
    drawExercise();
    fill(0, 0, 0).stroke(0, 0, 0);
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
        text((axisHeightLength - i), 35, i * pxUnit + 8);

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
    fill(255, 153, 102, 60).noStroke();
    drawCircle({ x: 12, y: 16 }, 2, false);
    fill(0, 255, 0, 60).noStroke();
    drawRect({ x: 12, y: 11 }, 8, 4, false);
    fill(0, 0, 0).stroke(255, 0, 0, 60).strokeWeight(10)
    drawLine({ x: 10, y: 14 }, { x: 6, y: 12 }, false);
    drawLine({ x: 14, y: 14 }, { x: 18, y: 12 }, false);
    fill(0, 0, 0).stroke(0, 0, 255, 60).strokeWeight(10)
    drawLine({ x: 11, y: 7 }, { x: 11, y: 2 }, false);
    drawLine({ x: 13, y: 7 }, { x: 13, y: 2 }, false);
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