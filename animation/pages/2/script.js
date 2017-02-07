// To check the answer
var tabAnswer;

function initAnswer() {
    setup();
    tabAnswer = [];
}

function checkAnswer() {
    var ligneRouge = false;
    var ligneVerte = false;

    if (tabAnswer.length == 2) {
        for (var i = 0; i<tabAnswer.length; i++) {
            if (!ligneRouge) {
                ligneRouge = ligneRouge || tabAnswer[i].deb.x == 1 && tabAnswer[i].deb.y == 2 && tabAnswer[i].fin.x == 3 && tabAnswer[i].fin.y == 4 && tabAnswer[i].couleur === '#ff0000';
                ligneRouge = ligneRouge || tabAnswer[i].deb.x == 3 && tabAnswer[i].deb.y == 4 && tabAnswer[i].fin.x == 1 && tabAnswer[i].fin.y == 2 && tabAnswer[i].couleur === '#ff0000';
            }
            if(!ligneVerte) {
                ligneVerte = ligneVerte || tabAnswer[i].deb.x == 4 && tabAnswer[i].deb.y == 5 && tabAnswer[i].fin.x == 7 && tabAnswer[i].fin.y == 1 && tabAnswer[i].couleur === '#00ff00';
                ligneVerte = ligneVerte || tabAnswer[i].deb.x == 7 && tabAnswer[i].deb.y == 1 && tabAnswer[i].fin.x == 4 && tabAnswer[i].fin.y == 5 && tabAnswer[i].couleur === '#00ff00';
            }
        }
    }
    
    if(ligneRouge && ligneVerte) {
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
    stroke(0, 0, 0);
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
    strokeWeight(10);
    stroke(255, 0, 0, 60);
    line(100, 400, 300, 200);
    stroke(0, 255, 0, 60);
    line(400, 100, 700, 500);
}

function drawLine(coord_deb, coord_fin) {
    tabAnswer.push({
        deb: coord_deb,
        fin: coord_fin,
        couleur: currentColor
    });

    var sketch_deb_x = coord_deb.x * 100;
    var sketch_deb_y = 600 - (coord_deb.y * 100);
    var sketch_fin_x = coord_fin.x * 100;
    var sketch_fin_y = 600 - (coord_fin.y * 100);
    
    line(sketch_deb_x,sketch_deb_y,sketch_fin_x,sketch_fin_y);
}