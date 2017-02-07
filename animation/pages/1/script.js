// To check the answer
var matrixAnswer;

function initAnswer() {
    setup();
    matrixAnswer = new Array(8);
    for (var i = 0; i < 10; i++) {
        matrixAnswer[i] = new Array(6);
    }
}

function checkAnswer() {
    if (matrixAnswer[2][2] === 'C-2-#ff0000' && matrixAnswer[5][3] === 'SQ-4-#00ff00') {
        enable_next();
    }
    else {
        not_good();
    }
}

var currentColor = '#000000';

//------------------------------------------------//

function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    noLoop();

    drawSpaceIndicators();
    drawExercise();
    fill(0, 0, 0);
}

function drawSpaceIndicators() {
    fill(0, 0, 0);
    stroke(0, 0, 0);
    textSize(24);
    textAlign(CENTER);
    for (var i = 1; i < 6; i++) {
        strokeWeight(4);
        line(0, i * 100, 20, i * 100);
        line(780, i * 100, 800, i * 100);
        strokeWeight(1);
        text((6 - i), 40, i * 100 + 8);

    }
    for (var i = 1; i < 8; i++) {
        strokeWeight(4);
        line(i * 100, 0, i * 100, 20);
        line(i * 100, 580, i * 100, 600);
        strokeWeight(1);
        text(i, i * 100, 565);
    }
    text('X', 355, 595);
    text('Y', 15, 260);
}

function drawExercise() {
    noStroke();
    fill(255, 0, 0, 60);
    ellipse(200, 400, 200, 200);
    rectMode(CORNER);
    fill(0, 255, 0, 60);
    rect(300, 100, 400, 400);
}

function drawRect(coord, taille) {
    noStroke();
    rectMode(CENTER);
    matrixAnswer[coord.x][coord.y] = 'SQ-' + taille + '-' + currentColor;

    var sketch_x = coord.x * 100;
    var sketch_y = 600 - (coord.y * 100);
    var sketch_taille = taille * 100;

    rect(sketch_x, sketch_y, sketch_taille, sketch_taille);
}

function drawCircle(coord, taille) {
    noStroke();
    matrixAnswer[coord.x][coord.y] = 'C-' + taille + '-' + currentColor;

    var sketch_x = coord.x * 100;
    var sketch_y = 600 - (coord.y * 100);
    var sketch_taille = taille * 100;

    ellipse(sketch_x, sketch_y, sketch_taille, sketch_taille);
}