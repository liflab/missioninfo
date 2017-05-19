// Constants
const NB_CURSORS = 10;

// Globals variables
var isPlaying = false;

var exBoard;
var page_shapes;
var maxBlocks;
var code = "";

var axisWidthLength;
var axisHeightLength;
var pxUnit;

var currentColor = '#000000';
const colorEx = '#ffffff';
const blendColorEx = 0.8;

var cursors = new Array(NB_CURSORS);

////////////////////////////////////////////
function createBoard() {
    for (let i = 0; i < NB_CURSORS; i++) {
        cursors[i] = new Coord(0, 0);
    }

    exBoard = new Board(page_shapes);
    exBoard.draw(0);
}

function reinitBoard() {
    for (let i = 0; i < NB_CURSORS; i++) {
        cursors[i] = new Coord(0, 0);
    }

    exBoard.clearAnswer();
    exBoard.draw(0);
}

// Objects used in this section
function Board(listShapes) {
    this.shapes = new Array(listShapes.length);
    for (let i = 0; i < listShapes.length; i++) {
        this.shapes[i] = [];
    }

    for (let i = 0; i < listShapes.length; i++) {
        for (let j = 0; j < listShapes[i].length; j++) {
            this.shapes[i].push(Object.assign({}, listShapes[i][j]));
        }
    }

    this.answer = new Array(listShapes.length);
    for (let i = 0; i < listShapes.length; i++) {
        this.answer[i] = [];
    }

    this.clearAnswer = function () {
        for (let i = 0; i < this.shapes.length; i++) {
            this.answer[i] = [];
        }
    };

    this.isAnswerCorrect = function () {
        let res = true;
        for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].length === this.answer[i].length) {
                let answer_tmp = this.answer[i].slice(0);

                for (let j = 0; j < this.shapes[i].length; j++) {
                    let res_tmp = false;
                    for (let k = 0; k < answer_tmp.length; k++) {
                        if (this.shapes[i][j].isEqualTo(answer_tmp[k])) {
                            res_tmp = true;
                            answer_tmp.splice(k, 1);
                            break;
                        }
                    }
                    res = res && res_tmp;
                }
            }
            else {
                res = false;
            }
        }
        return res;
    };

    this.draw = function (nb_frame) {
        clear();
        background(255);

        drawSpaceIndicators();

        let frame_shapes = this.shapes[nb_frame];
        let frame_answer = this.answer[nb_frame];

        for (let i = 0; i < frame_shapes.length; i++) {
            frame_shapes[i].draw(false);
        }
        for (let i = 0; i < frame_answer.length; i++) {
            frame_answer[i].draw(true);
        }
    };

    this.launchAnimation = async function () {
        isPlaying = true;
        await sleep(200);
        for (let i = 0; i < this.shapes.length; i++) {
            if (!isPlaying) {
                return;
            }
            this.draw(i);
            await sleep(500);
        }
        isPlaying = false;
    };
}

/////////////////// Drawing functions & objects
function Coord(x, y) {
    assert(
        typeof x === "number" &&
        typeof y === "number"
    );

    this.x = x;
    this.y = y;

    this.add = function (other) {
        if (other instanceof Coord) {
            return new Coord(this.x + other.x, this.y + other.y);
        }
    };

    this.isEqualTo = function (other) {
        if (other instanceof Coord) {
            return (
                this.x === other.x &&
                this.y === other.y
            );
        }
        return false;
    }
}

// Converters to real pixels
function convertCoord(coord) {
    assert(coord instanceof Coord);

    return new Coord((coord.x * pxUnit), ((axisHeightLength - coord.y) * pxUnit));
}

function convertSize(size) {
    return size * pxUnit;
}

// Shape objects
function Square(shape_color, coord, taille, coins) {
    var test = typeof shape_color === "string";
    test = coord instanceof Coord;
    test = typeof taille === "number";
    test = typeof coins === "number";

    assert(
        typeof shape_color === "string" &&
        coord instanceof Coord &&
        typeof taille === "number" &&
        typeof coins === "number"
    );

    this.shape_color = shape_color;
    this.coord = coord;
    this.taille = taille;
    this.coins = coins;

    this.isEqualTo = function (other) {
        if (other instanceof Square) {
            return (
                this.shape_color === other.shape_color &&
                this.coord.isEqualTo(other.coord) &&
                this.taille === other.taille
            );
        }
        return false;
    };

    this.draw = function (isAnswer) {
        let draw_color = color(this.shape_color);

        if (!isAnswer) {
            draw_color = lerpColor(draw_color, color(colorEx), blendColorEx);
        }

        fill(draw_color).noStroke();
        rectMode(CORNER);

        let sketch_coord = convertCoord(this.coord);
        let sketch_taille = convertSize(this.taille);

        rect(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille, this.coins);
    }
}

function Rectangle(shape_color, coord, height, width, coins) {
    assert(
        typeof shape_color === "string" &&
        coord instanceof Coord &&
        typeof height === "number" &&
        typeof width === "number" &&
        typeof coins === "number"
    );

    this.shape_color = shape_color;
    this.coord = coord;
    this.height = height;
    this.width = width;
    this.coins = coins;

    this.isEqualTo = function (other) {
        if (other instanceof Rectangle) {
            return (
                this.shape_color === other.shape_color &&
                this.coord.isEqualTo(other.coord) &&
                this.height === other.height &&
                this.width === other.width
            );
        }
        return false;
    };

    this.draw = function (isAnswer) {
        let draw_color = color(this.shape_color);

        if (!isAnswer) {
            draw_color = lerpColor(draw_color, color(colorEx), blendColorEx);
        }

        fill(draw_color).noStroke();
        rectMode(CORNER);

        let sketch_coord = convertCoord(this.coord);
        let sketch_height = convertSize(this.height);
        let sketch_width = convertSize(this.width);

        rect(sketch_coord.x, sketch_coord.y, sketch_width, sketch_height, this.coins);
    }
}

function Circle(shape_color, coord, taille) {
    assert(
        typeof shape_color === "string" &&
        coord instanceof Coord &&
        typeof taille === "number"
    );

    this.shape_color = shape_color;
    this.coord = coord;
    this.taille = taille;

    this.isEqualTo = function (other) {
        if (other instanceof Circle) {
            return (
                this.shape_color === other.shape_color &&
                this.coord.isEqualTo(other.coord) &&
                this.taille === other.taille
            );
        }
        return false;
    };

    this.draw = function (isAnswer) {
        let draw_color = color(this.shape_color);

        if (!isAnswer) {
            draw_color = lerpColor(draw_color, color(colorEx), blendColorEx);
        }

        fill(draw_color).noStroke();

        let sketch_coord = convertCoord(this.coord);
        let sketch_taille = convertSize(this.taille);

        ellipse(sketch_coord.x, sketch_coord.y, sketch_taille, sketch_taille);
    }
}

function Line(shape_color, coord_1, coord_2) {
    assert(
        typeof shape_color === "string" &&
        coord_1 instanceof Coord &&
        coord_2 instanceof Coord
    );

    this.shape_color = shape_color;
    this.coord_1 = coord_1;
    this.coord_2 = coord_2;

    this.isEqualTo = function (other) {
        if (other instanceof Line) {
            return (
                (
                    this.shape_color === other.shape_color &&
                    this.coord_1.isEqualTo(other.coord_1) &&
                    this.coord_2.isEqualTo(other.coord_2)
                )
                ||
                (
                    this.shape_color === other.shape_color &&
                    this.coord_1.isEqualTo(other.coord_2) &&
                    this.coord_2.isEqualTo(other.coord_1)
                )
            );
        }
        return false;
    };

    this.draw = function (isAnswer) {
        let draw_color = color(this.shape_color);

        if (!isAnswer) {
            draw_color = lerpColor(draw_color, color(colorEx), blendColorEx);
        }

        stroke(draw_color).strokeWeight(10);

        let sketch_coord_1 = convertCoord(this.coord_1);
        let sketch_coord_2 = convertCoord(this.coord_2);

        line(sketch_coord_1.x, sketch_coord_1.y, sketch_coord_2.x, sketch_coord_2.y);
    }
}

function Triangle(shape_color, coord_1, coord_2, coord_3) {
    assert(
        typeof shape_color === "string" &&
        coord_1 instanceof Coord &&
        coord_2 instanceof Coord &&
        coord_3 instanceof Coord
    );

    this.shape_color = shape_color;
    this.coord_1 = coord_1;
    this.coord_2 = coord_2;
    this.coord_3 = coord_3;

    this.isEqualTo = function (other) {
        if (other instanceof Triangle) {
            return (
                this.shape_color === other.shape_color &&
                ((
                    this.coord_1.isEqualTo(other.coord_1) &&
                    this.coord_2.isEqualTo(other.coord_2) &&
                    this.coord_3.isEqualTo(other.coord_3)
                )
                ||
                (
                    this.coord_1.isEqualTo(other.coord_1) &&
                    this.coord_2.isEqualTo(other.coord_3) &&
                    this.coord_3.isEqualTo(other.coord_2)
                )
                ||
                (
                    this.coord_1.isEqualTo(other.coord_2) &&
                    this.coord_2.isEqualTo(other.coord_1) &&
                    this.coord_3.isEqualTo(other.coord_3)
                )
                ||
                (
                    this.coord_1.isEqualTo(other.coord_2) &&
                    this.coord_2.isEqualTo(other.coord_3) &&
                    this.coord_3.isEqualTo(other.coord_1)
                )
                ||
                (
                    this.coord_1.isEqualTo(other.coord_3) &&
                    this.coord_2.isEqualTo(other.coord_2) &&
                    this.coord_3.isEqualTo(other.coord_1)
                )
                ||
                (
                    this.coord_1.isEqualTo(other.coord_3) &&
                    this.coord_2.isEqualTo(other.coord_1) &&
                    this.coord_3.isEqualTo(other.coord_2)
                ))
            );
        }
        return false;
    };

    this.draw = function (isAnswer) {
        let draw_color = color(this.shape_color);

        if (!isAnswer) {
            draw_color = lerpColor(draw_color, color(colorEx), blendColorEx);
        }

        fill(draw_color).noStroke();

        let sketch_coord_1 = convertCoord(this.coord_1);
        let sketch_coord_2 = convertCoord(this.coord_2);
        let sketch_coord_3 = convertCoord(this.coord_3);

        triangle(sketch_coord_1.x, sketch_coord_1.y, sketch_coord_2.x, sketch_coord_2.y, sketch_coord_3.x, sketch_coord_3.y);
    }
}

// To draw the grid
function drawSpaceIndicators() {
    let sizeSpaceIndicators = 20;
    textAlign(CENTER);
    for (let i = 1; i < axisHeightLength; i++) {
        fill(0, 0, 0).stroke(0, 0, 0).strokeWeight(4);
        line(0, i * pxUnit, sizeSpaceIndicators, i * pxUnit);
        line((axisWidthLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(0, 0, 0).stroke(0, 0, 0, 20).strokeWeight(1);
        line(0, i * pxUnit, axisWidthLength * pxUnit, i * pxUnit);

        fill(0, 0, 0).strokeWeight(0).textSize(18);
        text((axisHeightLength - i), 35, i * pxUnit + 8);

    }
    for (let i = 1; i < axisWidthLength; i++) {
        fill(0, 0, 0).stroke(0, 0, 0).strokeWeight(4);
        line(i * pxUnit, 0, i * pxUnit, sizeSpaceIndicators);
        line(i * pxUnit, (axisHeightLength * pxUnit) - sizeSpaceIndicators, i * pxUnit, axisHeightLength * pxUnit);

        fill(0, 0, 0).stroke(0, 0, 0, 20).strokeWeight(1);
        line(i * pxUnit, 0, i * pxUnit, axisHeightLength * pxUnit);

        fill(0, 0, 0).strokeWeight(0).textSize(18);
        text(i, i * pxUnit, (axisHeightLength * pxUnit) - 30);
    }
    fill(50, 50, 255).strokeWeight(0).textSize(24).textStyle(BOLD);
    text('X', (axisWidthLength * pxUnit) / 2, (axisHeightLength * pxUnit) - 60);
    text('Y', 60, (axisHeightLength * pxUnit) / 2 + 8);
}

// Functions for blocks coding
function runCode() {
    // Wait to finish animation before another run
    if (!isPlaying) {
        reinitBoard();

        try {
            code = "var currentFrame = 0;" + window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
            console.log(code);
            eval(code);
            saveCode();
            document.getElementById("btn_run").innerHTML = '<span class="glyphicon glyphicon-pause"></span> ARRETER';
            exBoard.launchAnimation();
            checkAnswer();
        }
        catch (err) {
            popupNotGood();
            console.log(err);
        }
    } else {
        isPlaying = false;
    }
}

function saveCode() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }
}

function checkAnswer() {
    if (exBoard === undefined) {
        return;
    }

    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    document.getElementById("btn_run").innerHTML = '<span class="glyphicon glyphicon-play"></span> DEMARRER';
    if (exBoard.isAnswerCorrect()) {
        if (maxBlocks === undefined || maxBlocks >= Blockly.getMainWorkspace().getAllBlocks().length) {
            popupGood();
            document.getElementById("btn_run").style.display = "none";
            document.getElementById("btn_next_exercise").style.display = "block";
        }
        else {
            bootbox.alert({
                message: '<div class="text-center">Attention tu as mis trop de blocs!<br><h3>Il faut mettre au maximum : <strong>' + maxBlocks + '</strong> blocs.</h3><br><br><img src="../../../assets/img/bad.svg" alt="Robot badface" height="200px"></div>',
                backdrop: true
            });
        }

    }
    else {
        popupNotGood();
    }
}

// Function execute when all things are loaded
function allLoaded() {
    createButtons(4);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
    //popupInfo(text_info);
}